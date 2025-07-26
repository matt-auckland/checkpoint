import { type FastifyInstance } from 'fastify';

export function apiRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return 'Hello World';
  });
}
