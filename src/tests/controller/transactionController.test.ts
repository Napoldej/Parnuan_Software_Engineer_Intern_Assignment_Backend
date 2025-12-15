import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

const addTransaction = vi.fn();
const getTransactions = vi.fn();
const getIncomeTransactions = vi.fn();
const getExpenseTransactions = vi.fn();
const deleteTransaction = vi.fn();
const editTransaction = vi.fn();
const recoverTransaction = vi.fn();

vi.mock('../../service/transactionService.js', () => {
  class MockTransactionService {
    addTransaction = addTransaction;
    getTransactions = getTransactions;
    getIncomeTransactions = getIncomeTransactions;
    getExpenseTransactions = getExpenseTransactions;
    deleteTransaction = deleteTransaction;
    editTransaction = editTransaction;
    recoverTransaction = recoverTransaction;
  }
  return { default: MockTransactionService };
});

import TransactionController from '../../controller/transactionController.js';

function makeRes() {
  const res: Partial<Response> & {
    status: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
  } = {
    status: vi.fn(),
    json: vi.fn(),
  } as any;
  (res.status as any).mockReturnValue(res);
  return res as Response as any;
}

describe('TransactionController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    addTransaction.mockReset();
    getTransactions.mockReset();
    getIncomeTransactions.mockReset();
    getExpenseTransactions.mockReset();
    deleteTransaction.mockReset();
    editTransaction.mockReset();
    recoverTransaction.mockReset();
  });

  it('addTransaction returns 201 with created transaction', async () => {
    const controller = new TransactionController();
    const req = { params: { user_id: '507f1f77bcf86cd799439011' }, body: { title: 'Salary', amount: 10, type: 'Income' } } as unknown as Request;
    const res = makeRes();

    const created = { id: 't1', user_id: req.params.user_id, ...req.body } as any;
    addTransaction.mockResolvedValueOnce(created);

    await controller.addTransaction(req, res);

    expect(addTransaction).toHaveBeenCalledWith(req.params.user_id, req.body);
    expect((res.status as any)).toHaveBeenCalledWith(201);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Transaction added successfully',
      data: created,
    });
  });

  it('get_all_Transactions returns 200 with list', async () => {
    const controller = new TransactionController();
    const req = { params: { user_id: '507f1f77bcf86cd799439012' } } as unknown as Request;
    const res = makeRes();

    const rows = [{ id: 't1' }, { id: 't2' }];
    getTransactions.mockResolvedValueOnce(rows as any);

    await controller.get_all_Transactions(req, res);

    expect(getTransactions).toHaveBeenCalledWith(req.params.user_id);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Transactions retrieved successfully',
      data: rows,
    });
  });

  it('get_income_Transactions returns 200 with list', async () => {
    const controller = new TransactionController();
    const req = { params: { user_id: '507f1f77bcf86cd799439013' } } as unknown as Request;
    const res = makeRes();

    const rows = [{ id: 't3' }];
    getIncomeTransactions.mockResolvedValueOnce(rows as any);

    await controller.get_income_Transactions(req, res);

    expect(getIncomeTransactions).toHaveBeenCalledWith(req.params.user_id);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Income transactions retrieved successfully',
      data: rows,
    });
  });

  it('get_expense_Transactions returns 200 with list', async () => {
    const controller = new TransactionController();
    const req = { params: { user_id: '507f1f77bcf86cd799439014' } } as unknown as Request;
    const res = makeRes();

    const rows = [{ id: 't4' }];
    getExpenseTransactions.mockResolvedValueOnce(rows as any);

    await controller.get_expense_Transactions(req, res);

    expect(getExpenseTransactions).toHaveBeenCalledWith(req.params.user_id);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Expense transactions retrieved successfully',
      data: rows,
    });
  });

  it('delete_transaction returns 200 with updated row', async () => {
    const controller = new TransactionController();
    const req = { params: { transaction_id: '64b8f8e5c0f1d2e3a4b5c6d7' } } as unknown as Request;
    const res = makeRes();

    const updated = { id: req.params.transaction_id, is_deleted: true } as any;
    deleteTransaction.mockResolvedValueOnce(updated);

    await controller.delete_transaction(req, res);

    expect(deleteTransaction).toHaveBeenCalledWith(req.params.transaction_id);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Transaction deleted successfully',
      data: updated,
    });
  });

  it('edit_transaction returns 200 with updated row', async () => {
    const controller = new TransactionController();
    const req = { params: { transaction_id: '64b8f8e5c0f1d2e3a4b5c6d8' }, body: { title: 'New', amount: 5, type: 'Expense' } } as unknown as Request;
    const res = makeRes();

    const updated = { id: req.params.transaction_id, ...req.body } as any;
    editTransaction.mockResolvedValueOnce(updated);

    await controller.edit_transaction(req, res);

    expect(editTransaction).toHaveBeenCalledWith(req.params.transaction_id, req.body);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Transaction edited successfully',
      data: updated,
    });
  });

  it('recover_transaction returns 200 with recovered row', async () => {
    const controller = new TransactionController();
    const req = { params: { transaction_id: '64b8f8e5c0f1d2e3a4b5c6d9' } } as unknown as Request;
    const res = makeRes();

    const recovered = { id: req.params.transaction_id, is_deleted: false } as any;
    recoverTransaction.mockResolvedValueOnce(recovered);

    await controller.recover_transaction(req, res);

    expect(recoverTransaction).toHaveBeenCalledWith(req.params.transaction_id);
    expect((res.status as any)).toHaveBeenCalledWith(200);
    expect((res.json as any)).toHaveBeenCalledWith({
      message: 'Transaction recovered successfully',
      data: recovered,
    });
  });

  it('addTransaction handles service error with 500', async () => {
    const controller = new TransactionController();
    const req = { params: { user_id: '507f1f77bcf86cd799439011' }, body: { title: 'Err', amount: 1, type: 'Income' } } as unknown as Request;
    const res = makeRes();

    addTransaction.mockRejectedValueOnce(new Error('boom'));

    await controller.addTransaction(req, res);

    expect((res.status as any)).toHaveBeenCalledWith(500);
    expect((res.json as any)).toHaveBeenCalledWith({ error: 'Failed to add transaction' });
  });
});
