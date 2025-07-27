import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type {
  NewTeamData,
  Team,
  TeamGetSingleAPI,
  TeamUpdateSingleAPI,
  TeamCreateAPI,
} from 'shared';
import {
  uniqueNamesGenerator,
  type Config,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export function teamApiRoutes(fastify: FastifyInstance) {
  // get all teams
  fastify.get('/team', async (request, reply) => {
    try {
      if (!collections.team) {
        reply.status(500).send('Unable to get teams');
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
      if (!collections.team) {
        reply.status(500).send('Unable to get team');
        return;
      }

      const { id } = request.params;

      return (await collections.team.getDocumentById(id)) as Team;
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

  fastify.post<TeamCreateAPI>('/team/', async (request, reply) => {
    try {
      if (!collections.team) {
        reply.status(500).send('Unable to create team');
        return;
      }

      const { userId } = request.body;
      const randomTeamName: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });

      const newTeam: NewTeamData = {
        memberIds: [userId.toString()],
        name: randomTeamName,
        standupHistory: {},
        latestCheckIns: [],
      };

      const res = await collections.team.createDocument(newTeam);
      return await collections.team.getDocumentById(res.insertedId);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
}
