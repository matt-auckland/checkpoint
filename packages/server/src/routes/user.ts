import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type { User, UserGetSingleApi, UserPatchSingleApi } from 'shared';

export function userApiRoutes(fastify: FastifyInstance) {
  // all users
  fastify.get('/user', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send('Unable to get users');
        return;
      }

      return (await collections.user.getAllDocuments()) as User[];
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.get<UserGetSingleApi>('/user/:id', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send('Unable to get user');
        return;
      }

      const { id } = request.params;

      return (await collections.user.getSingleDocument(id)) as User;
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.patch<UserPatchSingleApi>('/user/:id', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send('Unable to get user');
        return;
      }

      const { id, patchData } = request.params;

      return await collections.user.patchDocument(id, patchData);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
}
