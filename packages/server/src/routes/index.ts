import { type FastifyInstance } from 'fastify';
import { teamApiRoutes } from './team.ts';
import { userApiRoutes } from './user.ts';
import { authApiRoutes } from './auth.ts';
import { standupApiRoutes } from './standup.ts';

export function apiRoutes(fastify: FastifyInstance) {
  fastify.register(teamApiRoutes);
  fastify.register(userApiRoutes);
  fastify.register(standupApiRoutes);
  fastify.register(authApiRoutes);
}
