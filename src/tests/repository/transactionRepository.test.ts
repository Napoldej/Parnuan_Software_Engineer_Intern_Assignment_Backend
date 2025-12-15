import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PrismaClient } from '@prisma/client';

// Create a fresh mock Prisma client per test
let mockPrisma: Partial<PrismaClient> & {
  transaction: {
    create: ReturnType<typeof vi.fn>;
    findMany: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
};

vi.mock('../../helper/prismaSingleTon.js', () => ({
  default: {
    getInstance: () => mockPrisma,
  },
}));

import TransactionRepository from '../../repository/transactionRepository.js';

describe('TransactionRepository', () => {
  beforeEach(() => {
    mockPrisma = {
      transaction: {
        create: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
      },
    } as any;
  });

  it('add_transaction calls prisma.transaction.create with correct data and returns result', async () => {
    const repo = new TransactionRepository();
    const user_id = '507f1f77bcf86cd799439011';
    const input = { title: 'Salary', amount: 1234.56, type: 'Income' as any };
    const fakeResult = { id: 't1', ...input, user_id, created_at: new Date(), is_deleted: false } as any;

    mockPrisma.transaction.create.mockResolvedValueOnce(fakeResult);

    const result = await repo.add_transaction(user_id, input as any);

    expect(mockPrisma.transaction.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: input.title,
        user_id,
        amount: input.amount,
        type: input.type,
      }),
    });
    expect(result).toBe(fakeResult);
  });

  it('read_transactions filters by user and non-deleted', async () => {
    const repo = new TransactionRepository();
    const user_id = '507f1f77bcf86cd799439012';
    const rows = [{ id: 't1' }, { id: 't2' }];
    mockPrisma.transaction.findMany.mockResolvedValueOnce(rows as any);

    const out = await repo.read_transactions(user_id);

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith({
      where: { user_id, is_deleted: false },
    });
    expect(out).toBe(rows);
  });

  it('read_income_transactions filters by user, type=Income and non-deleted', async () => {
    const repo = new TransactionRepository();
    const user_id = '507f1f77bcf86cd799439013';
    const rows = [{ id: 't3' }];
    mockPrisma.transaction.findMany.mockResolvedValueOnce(rows as any);

    const out = await repo.read_income_transactions(user_id);

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith({
      where: { user_id, type: 'Income', is_deleted: false },
    });
    expect(out).toBe(rows);
  });

  it('read_expense_transactions filters by user, type=Expense and non-deleted', async () => {
    const repo = new TransactionRepository();
    const user_id = '507f1f77bcf86cd799439014';
    const rows = [{ id: 't4' }];
    mockPrisma.transaction.findMany.mockResolvedValueOnce(rows as any);

    const out = await repo.read_expense_transactions(user_id);

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith({
      where: { user_id, type: 'Expense', is_deleted: false },
    });
    expect(out).toBe(rows);
  });

  it('delete_transaction performs soft delete update and returns updated row', async () => {
    const repo = new TransactionRepository();
    const transaction_id = '64b8f8e5c0f1d2e3a4b5c6d7';
    const updated = { id: transaction_id, is_deleted: true, deleted_at: new Date() } as any;
    mockPrisma.transaction.update.mockResolvedValueOnce(updated);

    const out = await repo.delete_transaction(transaction_id);

    expect(mockPrisma.transaction.update).toHaveBeenCalledWith({
      where: { id: transaction_id, is_deleted: false },
      data: expect.objectContaining({ is_deleted: true, deleted_at: expect.any(Date) }),
    });
    expect(out).toBe(updated);
  });

  it('edit_transaction updates allowed fields and sets updated_at', async () => {
    const repo = new TransactionRepository();
    const transaction_id = '64b8f8e5c0f1d2e3a4b5c6d8';
    const input = { title: 'New Title', amount: 99.99, type: 'Expense' as any };
    const updated = { id: transaction_id, ...input, updated_at: new Date() } as any;
    mockPrisma.transaction.update.mockResolvedValueOnce(updated);

    const out = await repo.edit_transaction(transaction_id, input as any);

    expect(mockPrisma.transaction.update).toHaveBeenCalledWith({
      where: { id: transaction_id, is_deleted: false },
      data: expect.objectContaining({
        title: input.title,
        amount: input.amount,
        type: input.type,
        updated_at: expect.any(Date),
      }),
    });
    expect(out).toBe(updated);
  });

  it('recoverable_transaction clears soft-delete flag', async () => {
    const repo = new TransactionRepository();
    const transaction_id = '64b8f8e5c0f1d2e3a4b5c6d9';
    const recovered = { id: transaction_id, is_deleted: false } as any;
    mockPrisma.transaction.update.mockResolvedValueOnce(recovered);

    const out = await repo.recoverable_transaction(transaction_id);

    expect(mockPrisma.transaction.update).toHaveBeenCalledWith({
      where: { id: transaction_id, is_deleted: true },
      data: { is_deleted: false },
    });
    expect(out).toBe(recovered);
  });
});
