import { type FastifyInstance } from 'fastify';
import { collections } from '../lib/mongo.ts';
import type {
  AuthLoginAPI,
  AuthLogoutAPI,
  AuthSignupAPI,
  NewUser,
  User,
} from 'shared';

export async function authAPIRoutes(fastify: FastifyInstance) {
  fastify.post<AuthSignupAPI>('/signup', async (request, reply) => {
    try {
      if (!collections.user) {
        reply.status(500).send({
          message: 'Unable to sign up. System error.',
          error: 'SignUpFail',
        });
        return;
      }

      const { email, fullName } = request.body;

      if (!email || !fullName) {
        reply.status(400).send({
          message: 'Missing email or fullName field, check your input.',
          error: 'SignUpFail',
        });
      }
      const existingUser = await collections.user.getDocumentByField(
        'email',
        email
      );

      if (existingUser) {
        console.error(`SignUP: Account for ${email} already exists`);
        reply.status(400).send({
          message: 'Unable to create account, check your input.',
          error: 'SignUpFail',
        });
      }

      console.log(
        `Sign up ${email}, we ignore the password since this is a toy app 🙂`
      );

      const userInsertData: NewUser = {
        email,
        fullName,
        teams: [],
        settings: {
          colorMode: 'system',
          colorTheme: 'default',
        },
      };

      const res = await collections.user.createDocument(userInsertData);

      if (!res.acknowledged) {
        reply.code(500).send({
          message: 'Unable to create user',
          error: 'AccountCreationFail',
        });
        return;
      }
      const id = res.insertedId.toString();
      const newUser = await collections.user.getDocumentById(id);

      return { user: newUser, token: createJWTToken() };
    } catch (err) {
      console.error(err);
      reply.status(500).send(err);
    }
  });

  fastify.post<AuthLoginAPI>('/login', async (request, reply) => {
    const { email } = request.body;

    console.log(
      `Log in ${email}, we ignore the password since this is a toy app 🙂`
    );
    const user = (await collections.user?.getDocumentByField(
      'email',
      email
    )) as User;

    if (!user) {
      reply.code(500).send({
        message: 'Unable to login, check your login details',
        error: 'LoginFail',
      });
    }
    const token = createJWTToken();
    return { user, token };
  });

  fastify.post<AuthLogoutAPI>('/logout', async (request, reply) => {
    console.log('pretending we logged out user, revoked JWT');
    return;
  });
}

// just a mock function, not a real JWT
export function createJWTToken(): string {
  return `${Date.now()}-auth`;
}
