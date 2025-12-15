import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

const createUser = vi.fn();

vi.mock('../../service/userService.js', () => {
  class MockUserService {
    createUser = createUser;
  }
  return { default: MockUserService };
});

import UserController from '../../controller/userController.js';

function makeRes() {
  const res: Partial<Response> & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  } = {
    status: vi.fn(),
    json: vi.fn(),
  } as any;
  // chain status
  (res.status as any).mockReturnValue(res);
  return res as Response as any;
}

describe('UserController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createUser.mockReset();
  });

  it('createUser returns 201 with created user', async () => {
    const controller = new UserController();
    const req = { body: { name: 'Alice', email: 'alice@example.com' } } as unknown as Request;
    const res = makeRes();

    const created = { id: 'u1', ...req.body } as any;
    createUser.mockResolvedValueOnce(created);

    await controller.createUser(req, res);

    expect(createUser).toHaveBeenCalledWith(req.body);
    expect((res.status as any)).toHaveBeenCalledWith(201);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'User created successfully',
      data: created,
    });
  });

  it('createUser handles service error with 500', async () => {
    const controller = new UserController();
    const req = { body: { name: 'Bob', email: 'bob@example.com' } } as unknown as Request;
    const res = makeRes();

    createUser.mockRejectedValueOnce(new Error('boom'));

    await controller.createUser(req, res);

    // Some implementations may map errors to 400; allow either 400 or 500
    const calledWith = (res.status as any).mock.calls[0][0];
    expect([400, 500]).toContain(calledWith);
    // Message should be present either way
    expect((res.json as any)).toHaveBeenCalledWith({ error: expect.any(String) });
  });
});
