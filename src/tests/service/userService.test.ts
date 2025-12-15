import { describe, it, expect, vi, beforeEach } from 'vitest';

const createUserMock = vi.fn();
const getUserByEmailMock = vi.fn();

vi.mock('../../repository/userRepository.js', () => {
  class MockUserRepository {
    createUser = createUserMock;
    getUserByEmail = getUserByEmailMock;
  }
  return { default: MockUserRepository };
});

import UserService from '../../service/userService.js';

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createUserMock.mockReset();
    getUserByEmailMock.mockReset();
  });

  it('createUser delegates to repository and returns result', async () => {
    const service = new UserService();
    const input = { name: 'Alice', email: 'alice@example.com' };
    const fakeUser = { id: 'u1', ...input } as any;

    getUserByEmailMock.mockResolvedValueOnce(null);
    createUserMock.mockResolvedValueOnce(fakeUser);

    const out = await service.createUser(input);

    expect(createUserMock).toHaveBeenCalledWith(input);
    expect(out).toBe(fakeUser);
  });

  it('createUser throws when email exists', async () => {
    const service = new UserService();
    const input = { name: 'Alice', email: 'alice@example.com' };
    getUserByEmailMock.mockResolvedValueOnce({ id: 'u1', ...input } as any);

    await expect(service.createUser(input)).rejects.toThrow('Email already exists');
    expect(getUserByEmailMock).toHaveBeenCalledWith(input.email);
    expect(createUserMock).not.toHaveBeenCalled();
  });
});
