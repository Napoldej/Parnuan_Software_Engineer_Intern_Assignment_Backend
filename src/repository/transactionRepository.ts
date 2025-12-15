import type { PrismaClient, TransactionType } from "@prisma/client";
import PrismaSingleTon from "../helper/prismaSingleTon.js";
import type { createTransactionType, editTransactionType } from "../types/transactionType.js";

class TransactionRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = PrismaSingleTon.getInstance();
    }

    /**
     * Add a transaction for a user
     * @param {string} user_id - User ObjectId
     * @param {createTransactionType} input - Transaction data
     * @returns {Promise<Transaction>} - Newly created transaction
     */
    async add_transaction(user_id: string, input: createTransactionType){
        try{
            // Create a new transaction
            const transaction = await this.prisma.transaction.create({
                data:{
                    title: input.title,
                    user_id: user_id,
                    amount: input.amount,
                    type: input.type as TransactionType,
                    created_at: new Date()
                }
            })
            return transaction
        }catch(error){
            console.log("Error adding income transaction:", error);
            throw error;
        }
    }
    /**
     * Get all transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of transactions
     */
    async read_transactions(user_id: string){
        try{
            // Get all transactions for a user (excluding deleted transactions)
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    // Filter by user ID
                    user_id,
                    // Exclude deleted transactions
                    is_deleted: false
                }
            })
            return transactions
        }catch(error){
            console.log("Error reading transactions:", error);
            throw error;
        }
    }
    
    /**
     * Get all income transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of income transactions
     */
    async read_income_transactions(user_id: string){
        try{
            // Get all income transactions for a user (excluding deleted transactions)
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    // Filter by user ID
                    user_id,
                    // Filter by type (Income)
                    type: "Income",
                    // Exclude deleted transactions
                    is_deleted: false
                }
            })
            return transactions
        }catch(error){
            console.log("Error reading income transactions:", error);
            throw error;
        }
    }

    /**
     * Get all expense transactions for a user
     * @param {string} user_id - User ObjectId
     * @returns {Promise<Transaction[]>} - List of expense transactions
     */
    async read_expense_transactions(user_id: string){
        try{
            // Get all expense transactions for a user (excluding deleted transactions)
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    // Filter by user ID
                    user_id,
                    // Filter by type (Expense)
                    type: "Expense",
                    // Exclude deleted transactions
                    is_deleted: false
                }
            })
            return transactions
        }catch(error){
            console.log("Error reading expense transactions:", error);
            throw error;
        }
    }
    
        /**
         * Soft delete a transaction by setting the is_deleted flag to true
         * @param {string} transaction_id - Transaction ObjectId
         * @returns {Promise<Transaction>} - Updated transaction with is_deleted flag set to true
         */
        async delete_transaction(transaction_id: string){
            try{
                // Soft delete a transaction by setting the is_deleted flag to true
                const deleted_transaction = await this.prisma.transaction.update({
                    where: {
                        // Filter by transaction ID
                        id: transaction_id,
                        // Exclude deleted transactions
                        is_deleted: false
                    },
                    data: {
                        // Set is_deleted flag to true
                        is_deleted: true,
                        // Set deleted_at timestamp to current date and time
                        deleted_at: new Date()
                    }
                })
                // Return the updated transaction
                return deleted_transaction
            } catch(error){
                console.log("Error deleting transaction:", error);
                throw error;
            }
        }
        
        /**
         * Edit a transaction
         * @param {string} transaction_id - Transaction ObjectId
         * @param {editTransactionType} input - Transaction data
         * @returns {Promise<Transaction>} - Updated transaction
         */
        async edit_transaction(transaction_id: string, input: editTransactionType){
            try{
                // Update a transaction
                const updated_transaction = await this.prisma.transaction.update({
                    where: {
                        // Filter by transaction ID
                        id: transaction_id,
                        // Exclude deleted transactions
                        is_deleted: false
                    },
                    data: {
                        // Update fields with new data
                        ...input,
                        // Update type
                        type: input.type as TransactionType,
                        // Set updated_at timestamp to current date and time
                        updated_at: new Date()
                    }
                })
                // Return the updated transaction
                return updated_transaction
            } catch(error){
                console.log("Error editing transaction:", error);
                throw error;
            }
        }

        /**
         * Recover a soft-deleted transaction
         * @param {string} transaction_id - Transaction ObjectId
         * @returns {Promise<Transaction>} - Recovered transaction
         */
        async recoverable_transaction(transaction_id: string){
            try{
                // Clear the soft-delete flag of a transaction
                const recovered_transaction = await this.prisma.transaction.update({
                    where:{
                        id: transaction_id,
                        is_deleted: true
                    },
                    data:{
                        is_deleted: false
                    }
                })
                // Return the recovered transaction
                return recovered_transaction
            } catch(error){
                console.log("Error recovering transaction:", error);
                throw error
            }
    }
}

export default TransactionRepository