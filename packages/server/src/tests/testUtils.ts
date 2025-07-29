import { vi } from 'vitest';
import type { CollectionWrapper } from '../lib/mongo.ts';

export function getCollectionsMock(
  overrides: Partial<CollectionWrapper> = {}
): CollectionWrapper {
  return {
    collection: {} as any,
    getAllDocuments: vi.fn(),
    getDocumentById: vi.fn(),
    getDocumentByField: vi.fn(),
    getDocumentsByField: vi.fn(),
    createDocument: vi.fn(),
    updateDocument: vi.fn(),
    deleteDocument: vi.fn(),
    getDocumentWithAggregation: vi.fn(),
    ...overrides,
  };
}
