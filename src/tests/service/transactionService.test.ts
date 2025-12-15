import { describe, it, expect, vi, beforeEach } from 'vitest';

const addTransaction = vi.fn();
const readTransactions = vi.fn();
const readIncome = vi.fn();
const readExpense = vi.fn();
const deleteTxn = vi.fn();
const editTxn = vi.fn();
const recoverTxn = vi.fn();

vi.mock('../../repository/transactionRepository.js', () => {
  class MockTransactionRepository {
    add_transaction = addTransaction;
    read_transactions = readTransactions;
    read_income_transactions = readIncome;
    read_expense_transactions = readExpense;
    delete_transaction = deleteTxn;
    edit_transaction = editTxn;
    recoverable_transaction = recoverTxn;
  }
  return { default: MockTransactionRepository };
});

import TransactionService from '../../service/transactionService.js';

describe('TransactionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    addTransaction.mockReset();
    readTransactions.mockReset();
    readIncome.mockReset();
    readExpense.mockReset();
    deleteTxn.mockReset();
    editTxn.mockReset();
    recoverTxn.mockReset();
  });

  it('addTransaction delegates and returns result', async () => {
    const service = new TransactionService();
    const uid = '507f1f77bcf86cd799439011';
    const input = { title: 'Salary', amount: 100, type: 'Income' as any };
    const fake = { id: 't1', ...input, user_id: uid } as any;
    addTransaction.mockResolvedValueOnce(fake);

    const out = await service.addTransaction(uid, input as any);

    expect(addTransaction).toHaveBeenCalledWith(uid, input);
    expect(out).toBe(fake);
  });

  it('getTransactions delegates and returns list', async () => {
    const service = new TransactionService();
    const uid = '507f1f77bcf86cd799439012';
    const rows = [{ id: 't1' }, { id: 't2' }];
    readTransactions.mockResolvedValueOnce(rows as any);

    const out = await service.getTransactions(uid);

    expect(readTransactions).toHaveBeenCalledWith(uid);
    expect(out).toBe(rows);
  });

  it('getIncomeTransactions delegates and returns list', async () => {
    const service = new TransactionService();
    const uid = '507f1f77bcf86cd799439013';
    const rows = [{ id: 't3' }];
    readIncome.mockResolvedValueOnce(rows as any);

    const out = await service.getIncomeTransactions(uid);

    expect(readIncome).toHaveBeenCalledWith(uid);
    expect(out).toBe(rows);
  });

  it('getExpenseTransactions delegates and returns list', async () => {
    const service = new TransactionService();
    const uid = '507f1f77bcf86cd799439014';
    const rows = [{ id: 't4' }];
    readExpense.mockResolvedValueOnce(rows as any);

    const out = await service.getExpenseTransactions(uid);

    expect(readExpense).toHaveBeenCalledWith(uid);
    expect(out).toBe(rows);
  });

  it('deleteTransaction delegates and returns updated row', async () => {
    const service = new TransactionService();
    const tid = '64b8f8e5c0f1d2e3a4b5c6d7';
    const updated = { id: tid, is_deleted: true } as any;
    deleteTxn.mockResolvedValueOnce(updated);

    const out = await service.deleteTransaction(tid);

    expect(deleteTxn).toHaveBeenCalledWith(tid);
    expect(out).toBe(updated);
  });

  it('editTransaction delegates and returns updated row', async () => {
    const service = new TransactionService();
    const tid = '64b8f8e5c0f1d2e3a4b5c6d8';
    const input = { title: 'New Title', amount: 10, type: 'Expense' as any };
    const updated = { id: tid, ...input } as any;
    editTxn.mockResolvedValueOnce(updated);

    const out = await service.editTransaction(tid, input as any);

    expect(editTxn).toHaveBeenCalledWith(tid, input);
    expect(out).toBe(updated);
  });

  it('recoverTransaction delegates and returns recovered row', async () => {
    const service = new TransactionService();
    const tid = '64b8f8e5c0f1d2e3a4b5c6d9';
    const recovered = { id: tid, is_deleted: false } as any;
    recoverTxn.mockResolvedValueOnce(recovered);

    const out = await service.recoverTransaction(tid);

    expect(recoverTxn).toHaveBeenCalledWith(tid);
    expect(out).toBe(recovered);
  });
});
