import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PrismaClient } from '@prisma/client';

let mockPrisma: Partial<PrismaClient> & {
  user: {
    create: ReturnType<typeof vi.fn>;
  };
};

vi.mock('../../helper/prismaSingleTon.js', () => ({
  default: {
    getInstance: () => mockPrisma,
  },
}));

import UserRepository from '../../repository/userRepository.js';

describe('UserRepository', () => {
  beforeEach(() => {
    mockPrisma = {
      user: {
        create: vi.fn(),
      },
    } as any;
  });

  it('createUser calls prisma.user.create with correct data and returns result', async () => {
    const repo = new UserRepository();
    const input = { name: 'Alice', email: 'alice@example.com' };
    const fakeUser = { id: 'u1', ...input } as any;

    mockPrisma.user.create.mockResolvedValueOnce(fakeUser);

    const out = await repo.createUser(input);

    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: { name: input.name, email: input.email },
    });
    expect(out).toBe(fakeUser);
  });
});
