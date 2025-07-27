import fastify, { type FastifyInstance } from 'fastify';
import { authAPIRoutes, createJWTToken } from '../../src/routes/auth.ts';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { collections } from '../../src/lib/mongo.ts';

describe('createJWTToken', () => {
  it('returns a (fake) string token with a number prefix', () => {
    const token = createJWTToken();

    expect(typeof token).toBe('string');
    const [prefix, suffix] = token.split('-');
    expect(suffix).toBe('auth');
    expect(Number.isNaN(Number(prefix))).toBe(false);
  });
});

describe('Auth API', () => {
  let mockAPI: FastifyInstance;
  let originalUserCollection = collections.user;

  beforeEach(async () => {
    mockAPI = fastify();
    await mockAPI.register(authAPIRoutes);
    await mockAPI.ready();
  });

  afterEach(() => {
    collections.user = originalUserCollection;
  });

  describe('login API', async () => {
    it('returns token and user on success', async () => {
      collections.user = {
        getDocumentByField: vi.fn().mockResolvedValue({}), // empty obj is enough to count as a user in this case
      };
      const response = await mockAPI.inject({
        method: 'POST',
        url: '/login',
        payload: { email: 'test@example.com' },
      });

      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body).toHaveProperty('user');
      expect(body).toHaveProperty('token');
    });

    it('returns error if email is missing', async () => {
      const response = await mockAPI.inject({
        method: 'POST',
        url: '/login',
        payload: {},
      });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('signup API', async () => {
    it('returns token and user on success', async () => {
      collections.user = {
        getDocumentsByField: vi.fn().mockResolvedValue(null), // no existing users found
        getDocumentByField: vi.fn().mockResolvedValue({}), // empty obj is enough to count as a new user in this case
        createDocument: vi.fn().mockResolvedValue({
          acknowledged: true,
          insertedId: '123',
        }), // mock creation of user
      };
      const response = await mockAPI.inject({
        method: 'POST',
        url: '/login',
        payload: { email: 'test@example.com' },
      });

      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body).toHaveProperty('user');
      expect(body).toHaveProperty('token');
    });

    it('returns 400 error if email is missing', async () => {
      collections.user = {}; // pretend collection is defined
      const response = await mockAPI.inject({
        method: 'POST',
        url: '/signup',
        payload: { fullName: 'Son Goku' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('returns 400 error if fullName is missing', async () => {
      collections.user = {}; // pretend collection is defined
      const response = await mockAPI.inject({
        method: 'POST',
        url: '/signup',
        payload: { email: 'example@example.com' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('returns 400 error if email is in use', async () => {
      collections.user = {
        getDocumentsByField: vi.fn().mockResolvedValue({}),
      };

      const response = await mockAPI.inject({
        method: 'POST',
        url: '/signup',
        payload: { email: 'missing@example.com' },
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
