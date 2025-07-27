import { type FastifyInstance } from 'fastify';

export function standupApiRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return 'Hello World';
  });
}
