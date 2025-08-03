import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

import { apiRoutes } from './routes/index.ts';
import { connectToDB } from './lib/mongo.ts';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

const app = Fastify();
await app.register(fastifyCors, {
  origin: frontendOrigin, 
  credentials: true, 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
});

await connectToDB();
app.register(apiRoutes, { prefix: '/api' });

app.listen({ port: PORT , host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
