import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type { User, UserGetSingleApi } from 'shared';

export function userApiRoutes(fastify: FastifyInstance) {
  // all users
  fastify.get('/user', async (request, reply) => {
    try {
      if (!collections.user) {
        return;
      }

      const users = (await collections.user.getAllDocuments()) as User[];

      return { status: 'ok', users };
    } catch (err) {}
  });
}
