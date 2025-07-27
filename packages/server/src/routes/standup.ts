import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type {
  NewStandupData,
  Standup,
  StandupCreateEntryAPI,
  StandupCreateStandupAPI,
  StandupEntryBase,
  StandupGetSingleAPI,
  StandupPostAPI,
  StandupUpdateEntryAPI,
} from 'shared';

import { env } from 'process';

const standupEntriesAggregatePipeline = [
  {
    $lookup: {
      from: env.STANDUP_ENTRY_COLLECTION_NAME,
      localField: '_id',
      foreignField: 'standupId',
      as: 'entries',
    },
  },
];

export function standupApiRoutes(fastify: FastifyInstance) {
  // get all standups
  fastify.get('/standup', async (request, reply) => {
    try {
      if (!collections.standup) {
        reply.status(500).send('Unable to get standups');
        return;
      }

      return (await collections.standup.getAllDocuments()) as Standup[];
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // get single standup
  fastify.get<StandupGetSingleAPI>('/standup/:id', async (request, reply) => {
    try {
      if (!collections.standup) {
        reply.status(500).send('Unable to get standup');
        return;
      }

      const { id } = request.params;
      const { full } = request.query;

      // if we request the full standup we return the entries
      if (full) {
        return await collections.standup.getDocumentWithAggregation(
          id,
          standupEntriesAggregatePipeline
        );
      } else {
        // returning a 404 if the stand up is not found would be nice
        return (await collections.standup.getDocumentById(id)) as Standup;
      }
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // if no stand up exists for this date, we create a new stand up and submit the entry
  // return new stand up with aggregation
  fastify.post<StandupCreateStandupAPI>('/standup/', async (request, reply) => {
    try {
      if (!collections.standup || !collections.standupEntry) {
        reply.status(500).send('Unable to create standup');
        return;
      }

      const { teamId, entry } = request.params;

      const newStandupData: NewStandupData = {
        team: teamId.toString(),
      };

      // create the new standup
      const standupInsertRes =
        await collections.standup.createDocument(newStandupData);

      const newStandupId = standupInsertRes.insertedId.toString();

      const newEntry: StandupEntryBase = {
        ...entry,
        standupId: newStandupId,
        date: new Date(),
      };

      // create new stand up entry
      await collections.standupEntry.createDocument(newEntry);

      return await collections.standup.getDocumentWithAggregation(
        newStandupId,
        standupEntriesAggregatePipeline
      );
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  // insert new entry, return updated stand up with aggregation
  fastify.post<StandupCreateEntryAPI>(
    '/standup/:id/entry',
    async (request, reply) => {
      try {
        if (!collections.standup || !collections.standupEntry) {
          reply.status(500).send('Unable to create standup');
          return;
        }

        const { standupId, entry } = request.params;

        const newEntry: StandupEntryBase = {
          ...entry,
          standupId,
          date: new Date(),
        };

        // create new stand up entry
        await collections.standupEntry.createDocument(newEntry);

        return await collections.standup.getDocumentWithAggregation(
          standupId,
          standupEntriesAggregatePipeline
        );
      } catch (err) {
        console.error(err);
        reply.status(500).send(err);
      }
    }
  );

  // insert new entry, return updated stand up with aggregation
  fastify.patch<StandupUpdateEntryAPI>(
    '/standup/:id/entry',
    async (request, reply) => {
      try {
        if (!collections.standup || !collections.standupEntry) {
          reply.status(500).send('Unable to create standup');
          return;
        }

        const { entry } = request.params;

        // create new stand up entry
        await collections.standupEntry.updateDocument(entry._id, entry);

        return await collections.standup.getDocumentWithAggregation(
          entry.standupId,
          standupEntriesAggregatePipeline
        );
      } catch (err) {
        console.error(err);
        reply.status(500).send(err);
      }
    }
  );
}
