import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type {
  NewTeamData,
  Team,
  TeamGetSingleAPI,
  TeamUpdateSingleAPI,
  TeamCreateAPI,
  CheckInFull,
  User,
  CheckInWithFullName,
  TeamDeleteUserAPI,
  TeamUpdateAddUsersAPI,
  UserLite,
} from 'shared';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { ObjectId } from 'mongodb';
import { attachFullName, dateValidation, prepDateQuery } from '../lib/utils.ts';

export function teamApiRoutes(fastify: FastifyInstance) {
  // get all teams
  fastify.get('/team', async (request, reply) => {
    try {
      if (!collections.team || !collections.user) {
        reply.status(500).send('Unable to access database');
        return;
      }

      return (await collections.team.getAllDocuments()) as Team[];
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // get single team
  fastify.get<TeamGetSingleAPI>('/team/:id', async (request, reply) => {
    try {
      if (!collections.team || !collections.checkIn || !collections.user) {
        reply.status(500).send('Unable to connect to database');
        return;
      }

      const { id } = request.params;
      const queryParams = request.query
      const dateStr = queryParams?.date

      if (dateStr && !dateValidation(dateStr)) {
        reply.status(400).send('Bad date format, use YYYY-MM-DD');
      }

      const team = await collections.team.getDocumentById(id) as Team;
      
      // get recent checkins
      const latestCheckIns = await collections.checkIn?.collection
        .find({ teamId: id })
        .sort({ createdAt: -1 }) // descending = latest first
        .limit(5)
        .toArray() as CheckInFull[]; 

      let checkInsFromDate: CheckInFull[] = []
      // if we're looking for a specific date, get those checkins
      if (dateStr) {
        const query = {
          teamId: id,
          date: prepDateQuery(dateStr)
        }

        checkInsFromDate = await collections.checkIn.collection.find(query).toArray() as CheckInFull[]  
      } 
      // Collect all userIds from latestCheckIns and checkIns
      const allCheckIns = [...(latestCheckIns ?? []), ...(checkInsFromDate ?? [])];
      const userIds: Set<string> = new Set(allCheckIns.map(ci => ci.userId))
      const userObjectIds: ObjectId[] = Array.from(userIds).map(id => new ObjectId(id));
      
      const users = await collections.user.collection.find({ _id: { $in: userObjectIds } }).toArray() as User[];
      
      const latestCheckInsInjected: CheckInWithFullName[] = latestCheckIns.map(ci => attachFullName(ci, users)) 
      
      let checkInsFromDateInjected: CheckInWithFullName[] = []
      if (checkInsFromDate.length) {
        checkInsFromDateInjected = checkInsFromDate.map(ci => attachFullName(ci, users)) 
      }

      team.checkIns = checkInsFromDateInjected
      team.latestCheckIns = latestCheckInsInjected

      return team
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // update a team's members or name
  fastify.patch<TeamUpdateSingleAPI>('/team/:id', async (request, reply) => {
    try {
      if (!collections.team) {
        reply.status(500).send('Unable to update team');
        return;
      }

      const { id } = request.params;
      const { patchData } = request.body;

      await collections.team.updateDocument(id, patchData);
      return await collections.team.getDocumentById(id);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
  
  fastify.post<TeamUpdateAddUsersAPI>('/team/:teamId/member/', async (request, reply) => {
    try {
      if (!collections.team || !collections.user) {
        reply.status(500).send('Unable to update team');
        return;
      }

      const { teamId } = request.params;
      const { UserIds } = request.body

      const team = await collections.team.getDocumentById(teamId);
      if (!team) {
        reply.status(404).send('Team not found');
        return;
      }

      // Filter out user IDs that are already in the team
      const existingUserIds = new Set(team.members.map((m: UserLite) => m._id.toString()));
      const newUserIds = UserIds.filter(id => !existingUserIds.has(id));

      if (newUserIds.length === 0) {
        return team;
      }

      // Lookup users by ID
      const usersToAdd = await collections.user.collection
        .find({ _id: { $in: newUserIds.map(id => new ObjectId(id)) } })
        .toArray();

      await collections.team.collection.updateOne(
        { _id: new ObjectId(teamId) },
        { $addToSet: { members: { $each: usersToAdd } } }
      );

      return await collections.team.getDocumentById(teamId);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.delete<TeamDeleteUserAPI>('/team/:teamId/member/:userId', async (request, reply) => {
    try {
      if (!collections.team) {
        reply.status(500).send('Unable to update team');
        return;
      }

      const { teamId, userId } = request.params;

      await collections.team.collection.updateOne(
        { _id: new ObjectId(teamId) },
        { $pull: { members: { _id: new ObjectId(userId) } } } as any // quick type fix
      );
      return await collections.team.getDocumentById(teamId);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.post<TeamCreateAPI>('/team/', async (request, reply) => {
    try {
      if (!collections.team) {
        reply.status(500).send('Unable to create team');
        return;
      }

      const { user } = request.body;
      const randomTeamName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });

      const newTeam: NewTeamData = {
        members: [user],
        name: randomTeamName,
        checkIns: [],
        latestCheckIns: [],
      };

      const res = await collections.team.createDocument(newTeam);
      return await collections.team.getDocumentById(res.insertedId) as Team;
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
}
