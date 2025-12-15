import TransactionRepository from "../repository/transactionRepository.js";
import type { createTransactionType, editTransactionType } from "../types/transactionType.js";
import type { Transaction } from "@prisma/client";
class TransactionService {
    private transactionRepository: TransactionRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    /**
     * Add a transaction for a user
     * @param {string} user_id - User ObjectId
     * @param {createTransactionType} input - Transaction data
     * @returns {Promise<Transaction>} - Newly created transaction
     */
    async addTransaction(user_id: string, input: createTransactionType) {
        try {
            // Add a transaction for a user
            const transaction = await this.transactionRepository.add_transaction(user_id, input);
            // Return the newly created transaction
            return transaction;
        } catch (error) {
            // Log error if adding transaction fails
            console.log("Error in TransactionService addTransaction:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }

    /**
     * Get all transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of transactions
     */
    async getTransactions(user_id: string) {
        try {
            // Get all transactions for a user
            const transactions = await this.transactionRepository.read_transactions(user_id);
            // Return the list of transactions
            return transactions;
        } catch (error) {
            // Log error if getting transactions fails
            console.log("Error in TransactionService getTransactions:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
    /**
     * Get all income transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of income transactions
     */
    async getIncomeTransactions(user_id: string) {
        try {
            // Get all income transactions for a user
            const transactions = await this.transactionRepository.read_income_transactions(user_id);
            // Return the list of income transactions
            return transactions;
        } catch (error) {
            // Log error if getting income transactions fails
            console.log("Error in TransactionService getIncomeTransactions:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
    /**
     * Get all expense transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of expense transactions
     */
    async getExpenseTransactions(user_id: string) {
        try {
            // Get all expense transactions for a user
            const transactions = await this.transactionRepository.read_expense_transactions(user_id);
            // Return the list of expense transactions
            return transactions;
        } catch (error) {
            // Log error if getting expense transactions fails
            console.log("Error in TransactionService getExpenseTransactions:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
    /**
     * Soft delete a transaction
     * @param {string} transaction_id - Transaction ObjectId
     * @returns {Promise<Transaction>} - Updated transaction with is_deleted flag set to true
     */
    async deleteTransaction(transaction_id: string) {
        try {
            // Soft delete a transaction
            const deleted_transaction = await this.transactionRepository.delete_transaction(transaction_id);
            // Return the updated transaction
            return deleted_transaction;
        } catch (error) {
            // Log error if deleting transaction fails
            console.log("Error in TransactionService deleteTransaction:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
    /**
     * Edit a transaction
     * @param {string} transaction_id - Transaction ObjectId
     * @param {editTransactionType} input - Transaction data
     * @returns {Promise<Transaction>} - Updated transaction
     */
    async editTransaction(transaction_id: string, input: editTransactionType): Promise<Transaction> {
        try {
            // Edit a transaction
            const updated_transaction = await this.transactionRepository.edit_transaction(transaction_id, input);
            // Return the updated transaction
            return updated_transaction;
        } catch (error) {
            // Log error if editing transaction fails
            console.log("Error in TransactionService editTransaction:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
    /**
     * Recover a soft-deleted transaction
     * @param {string} transaction_id - Transaction ObjectId
     * @returns {Promise<Transaction>} - Recovered transaction
     */
    async recoverTransaction(transaction_id: string): Promise<Transaction> {
        try {
            // Recover a soft-deleted transaction
            const recovered_transaction = await this.transactionRepository.recoverable_transaction(transaction_id);
            // Return the recovered transaction
            return recovered_transaction;
        } catch (error) {
            // Log error if recovering transaction fails
            console.log("Error in TransactionService recoverTransaction:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }

}

export default TransactionService