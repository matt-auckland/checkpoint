import { type FastifyInstance } from 'fastify';
import { teamApiRoutes as teamAPIRoutes } from './team.ts';
import { userApiRoutes as userAPIRoutes } from './user.ts';
import { authAPIRoutes } from './auth.ts';
import { checkInApiRoutes  } from './checkIn.ts';

export function apiRoutes(fastify: FastifyInstance) {
  fastify.register(teamAPIRoutes);
  fastify.register(userAPIRoutes);
  fastify.register(checkInApiRoutes);
  fastify.register(authAPIRoutes, { prefix: 'auth' });
}
