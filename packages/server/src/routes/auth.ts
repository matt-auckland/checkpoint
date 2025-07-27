import { type FastifyInstance } from 'fastify';

export function authApiRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return 'Hello World';
  });
}
