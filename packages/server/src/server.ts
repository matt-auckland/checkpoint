import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { apiRoutes } from './routes/index.ts';
import { connectToDB } from './lib/mongo.ts';

const app = Fastify();
await app.register(fastifyCors, {
  origin: 'http://localhost:5173', // replace with your Vite dev server
  credentials: true, // if you're using cookies or auth headers
});

await connectToDB();
app.register(apiRoutes, { prefix: '/api' });

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
