import { type FastifyInstance } from 'fastify';
import { teamApiRoutes as teamAPIRoutes } from './team.ts';
import { userApiRoutes as userAPIRoutes } from './user.ts';
import { authAPIRoutes } from './auth.ts';
import { standupApiRoutes as standupAPIRoutes } from './standup.ts';

export function apiRoutes(fastify: FastifyInstance) {
  fastify.register(teamAPIRoutes);
  fastify.register(userAPIRoutes);
  fastify.register(standupAPIRoutes);
  fastify.register(authAPIRoutes);
}
