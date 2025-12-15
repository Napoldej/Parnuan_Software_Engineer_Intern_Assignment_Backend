import { describe, it, expect, vi, beforeEach } from 'vitest';

const createUserMock = vi.fn();

vi.mock('../../repository/userRepository.js', () => {
  class MockUserRepository {
    createUser = createUserMock;
  }
  return { default: MockUserRepository };
});

import UserService from '../../service/userService.js';

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createUserMock.mockReset();
  });

  it('createUser delegates to repository and returns result', async () => {
    const service = new UserService();
    const input = { name: 'Alice', email: 'alice@example.com' };
    const fakeUser = { id: 'u1', ...input } as any;

    createUserMock.mockResolvedValueOnce(fakeUser);

    const out = await service.createUser(input);

    expect(createUserMock).toHaveBeenCalledWith(input);
    expect(out).toBe(fakeUser);
  });
});
