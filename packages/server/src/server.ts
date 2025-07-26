import Fastify from 'fastify';

const app = Fastify();

app.get('/', async (request, reply) => {
  return 'Hello World';
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
