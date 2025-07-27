import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type { User, UserGetSingleAPI, UserUpdateSingleAPI } from 'shared';

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
  //single user
  fastify.get<UserGetSingleAPI>('/user/:id', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send('Unable to get user');
        return;
      }

      const { id } = request.params;

      return (await collections.user.getDocumentById(id)) as User;
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
  // update a user
  fastify.patch<UserUpdateSingleAPI>('/user/:id', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send('Unable to update user');
        return;
      }

      const { id } = request.params;
      const { patchData } = request.body;

      return await collections.user.updateDocument(id, patchData);
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });
}
