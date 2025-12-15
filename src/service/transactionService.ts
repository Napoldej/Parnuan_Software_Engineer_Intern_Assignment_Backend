import TransactionRepository from "../repository/transactionRepository.js";
import type { createTransactionType, editTransactionType } from "../types/transactionType.js";

class TransactionService {
    private transactionRepository: TransactionRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    async addTransaction(user_id: string, input: createTransactionType) {
        try {
            const transaction = await this.transactionRepository.add_transaction(user_id, input);
            return transaction;
        } catch (error) {
            console.log("Error in TransactionService addTransaction:", error);
            throw error;
        }
    }

    async getTransactions(user_id: string) {
        try {
            const transactions = await this.transactionRepository.read_transactions(user_id);
            return transactions;
        } catch (error) {
            console.log("Error in TransactionService getTransactions:", error);
            throw error;
        }
    }
    async getIncomeTransactions(user_id: string) {
        try {
            const transactions = await this.transactionRepository.read_income_transactions(user_id);
            return transactions;
        } catch (error) {
            console.log("Error in TransactionService getIncomeTransactions:", error);
            throw error;
        }
    }
    async getExpenseTransactions(user_id: string) {
        try {
            const transactions = await this.transactionRepository.read_expense_transactions(user_id);
            return transactions;
        } catch (error) {
            console.log("Error in TransactionService getExpenseTransactions:", error);
            throw error;
        }
    }
    async deleteTransaction(transaction_id: string) {
        try {
            const deleted_transaction = await this.transactionRepository.delete_transaction(transaction_id);
            return deleted_transaction;
        } catch (error) {
            console.log("Error in TransactionService deleteTransaction:", error);
            throw error;
        }
    }
    async editTransaction(transaction_id: string, input: editTransactionType) {
        try {
            const updated_transaction = await this.transactionRepository.edit_transaction(transaction_id, input);
            return updated_transaction;
        } catch (error) {
            console.log("Error in TransactionService editTransaction:", error);
            throw error;
        }
    }
    async recoverTransaction(transaction_id: string) {
        try {
            const recovered_transaction = await this.transactionRepository.recoverable_transaction(transaction_id);
            return recovered_transaction;
        } catch (error) {
            console.log("Error in TransactionService recoverTransaction:", error);
            throw error;
        }
    }

}

export default TransactionService