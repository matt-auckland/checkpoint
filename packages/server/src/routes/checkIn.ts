import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type {
  CheckInGetSingleAPI,
  CheckInUpdateEntryAPI,
  CheckInCreateAPI,
  CheckInFull,
  CheckInInsert,
  CheckInGetMultipleAPI,
  CheckInCreateAPI,
} from 'shared';

import { dateValidation, prepDateQuery } from '../lib/utils.ts';

export function checkInApiRoutes(fastify: FastifyInstance) {
  // get all check ins
  fastify.get<CheckInGetMultipleAPI>('/checkin', async (request, reply) => {
    try {
      if (!collections.checkIn) {
        reply.status(500).send('Unable to get check ins');
        return;
      }

      const queryParms = request.query;
      console.log(queryParms);

      const teamId = queryParms.teamId;
      const dateStr = queryParms.date;
      const userId = queryParms.userId;

      if (!teamId && !dateStr && !userId) {
        console.log('get all without params');
        return (await collections.checkIn.getAllDocuments()) as CheckInFull[];
      }

      if (dateStr && !dateValidation(dateStr)) {
        reply.status(400).send('Bad date format, use YYYY-MM-DD');
      }

      const query: Record<string, unknown> = {};
      if (teamId) query.teamId = teamId;
      if (userId) query.userId = userId;

      if (dateStr) {
        query.date = prepDateQuery(dateStr);
      }

      return await collections.checkIn.collection.find(query).toArray();
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // get single checkin by id
  fastify.get<CheckInGetSingleAPI>('/checkin/:id', async (request, reply) => {
    try {
      if (!collections.checkIn) {
        reply.status(500).send('Unable to get checkin');
        return;
      }

      const { id } = request.params;

      // returning a 404 if the check in is not found would be nice
      return (await collections.checkIn.getDocumentById(id)) as CheckInFull;
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.post<CheckInCreateAPI>('/checkin/', async (request, reply) => {
    try {
      if (!collections.checkIn) {
        reply.status(500).send('Unable to create checkin');
        return;
      }

      const entry = request.body;

      const newCheckInData: CheckInInsert = {
        ...entry,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // create the new checkin
      const checkInInsertRes = await collections.checkIn.createDocument(
        newCheckInData
      );

      const newCheckInId = checkInInsertRes.insertedId;
      const newCheckIn = (await collections.checkIn.getDocumentById(
        newCheckInId
      )) as CheckInFull;
      console.log(newCheckIn);
      return newCheckIn;
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // update checkin
  fastify.patch<CheckInUpdateEntryAPI>(
    '/checkin/:id',
    async (request, reply) => {
      try {
        if (!collections.checkIn) {
          reply.status(500).send('Unable to create checkin');
          return;
        }

        const { checkIn } = request.body;
        checkIn.updatedAt = new Date();
        //ideally we'd have some protections around changing certain data like the various IDs
        await collections.checkIn.updateDocument(checkIn._id, checkIn);

        return await collections.checkIn.getDocumentById(checkIn._id);
      } catch (err) {
        console.error(err);
        reply.status(500).send(err);
      }
    }
  );
}
