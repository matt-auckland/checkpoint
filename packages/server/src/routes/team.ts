import { type FastifyInstance } from 'fastify';

export function teamApiRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return 'Hello World';
  });
}
