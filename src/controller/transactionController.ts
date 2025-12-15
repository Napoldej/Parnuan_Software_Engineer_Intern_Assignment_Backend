import TransactionService from "../service/transactionService.js";
import type { Request, Response } from "express";


class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    /**
     * Add a transaction for a user
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async addTransaction(req: Request, res: Response){
        try {
            // Check if user ID is present in request parameters
            if(req.params.user_id){
                const user_id = req.params.user_id;
                // Add a transaction for a user
                const result = await this.transactionService.addTransaction(user_id, req.body);
                // Return a 201 response with the newly added transaction
                res.status(201).json(
                    {
                        message: "Transaction added successfully",
                        data: result
                    }
                );
            } else {
                console.log("User ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to add transaction" });
            }
        } catch (error) {
            // Log error if adding transaction fails
            console.log("Error in TransactionController addTransaction:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to add transaction" });
        }
    }

    /**
     * Get all transactions for a user
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async get_all_Transactions(req: Request, res: Response){
        try {
            // Check if user ID is present in request parameters
            if(req.params.user_id){
                const user_id = req.params.user_id;
                // Get all transactions for a user
                const result = await this.transactionService.getTransactions(user_id!);
                // Return a 200 response with all transactions
                res.status(200).json(
                    {
                        message: "Transactions retrieved successfully",
                        data: result
                    }
                );
            } else {
                console.log("User ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to retrieve transactions" });
            }
        } catch (error) {
            // Log error if retrieving transactions fails
            console.log("Error in TransactionController get_all_Transactions:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to retrieve transactions" });
        }
    }

    /**
     * Get all income transactions for a user
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async get_income_Transactions(req: Request, res: Response){
        try {
            // Check if user ID is present in request parameters
            if(req.params.user_id){
                const user_id = req.params.user_id;
                // Get all income transactions for a user
                const result = await this.transactionService.getIncomeTransactions(user_id!);
                // Return a 200 response with all income transactions
                res.status(200).json(
                    {
                        message: "Income transactions retrieved successfully",
                        data: result
                    }
                );
            } else {
                console.log("User ID not provided in request parameters");
            }
        } catch (error) {
            // Log error if retrieving income transactions fails
            console.log("Error in TransactionController get_income_Transactions:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to retrieve income transactions" });
        }
    }


    /**
     * Get all expense transactions for a user
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async get_expense_Transactions(req: Request, res: Response){
        try {
            // Check if user ID is present in request parameters
            if(req.params.user_id){
                const user_id = req.params.user_id;
                // Get all expense transactions for a user
                const result = await this.transactionService.getExpenseTransactions(user_id!);
                // Return a 200 response with all expense transactions
                res.status(200).json(
                    {
                        message: "Expense transactions retrieved successfully",
                        data: result
                    }
                );
            } else {
                console.log("User ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to retrieve expense transactions" });
            }
        } catch (error) {
            // Log error if retrieving expense transactions fails
            console.log("Error in TransactionController get_expense_Transactions:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to retrieve expense transactions" });
        }
    }
    /**
     * Soft delete a transaction by setting the is_deleted flag to true
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async delete_transaction(req: Request, res: Response){
        try {
            // Check if transaction ID is present in request parameters
            if(req.params.transaction_id){
                const transaction_id = req.params.transaction_id;
                // Soft delete a transaction
                const result = await this.transactionService.deleteTransaction(transaction_id);
                // Return a 200 response with the deleted transaction
                res.status(200).json(
                    {
                        message: "Transaction deleted successfully",
                        data: result
                    }
                );
            } else {
                console.log("Transaction ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to delete transaction" });
            }
        } catch (error) {
            // Log error if deleting transaction fails
            console.log("Error in TransactionController delete_transaction:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to delete transaction" });
        }
    }
    /**
     * Edit a transaction
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async edit_transaction(req: Request, res: Response){
        try {
            // Check if transaction ID is present in request parameters
            if(req.params.transaction_id){
                const transaction_id = req.params.transaction_id;
                // Edit a transaction
                const result = await this.transactionService.editTransaction(transaction_id, req.body);
                // Return a 200 response with the edited transaction
                res.status(200).json(
                    {
                        message: "Transaction edited successfully",
                        data: result
                    }
                );
            } else {
                console.log("Transaction ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to edit transaction" });
            }
        } catch (error) {
            // Log error if editing transaction fails
            console.log("Error in TransactionController edit_transaction:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to edit transaction" });
        }
    }    
    /**
     * Recover a soft-deleted transaction
     * @param {Request} req - Request object
     * @param {Response} res - Response object
     * @returns {Promise<void>} - Resolves with no value
     */
    async recover_transaction(req: Request, res: Response){
        try {
            // Check if transaction ID is present in request parameters
            if(req.params.transaction_id){
                const transaction_id = req.params.transaction_id;
                // Recover a soft-deleted transaction
                const result = await this.transactionService.recoverTransaction(transaction_id);
                // Return a 200 response with the recovered transaction
                res.status(200).json(
                    {
                        message: "Transaction recovered successfully",
                        data: result
                    }
                );
            } else {
                console.log("Transaction ID not provided in request parameters");
                // Return a 500 response with an error message
                res.status(500).json({ error: "Failed to recover transaction" });
            }
        } catch (error) {
            // Log error if recovering transaction fails
            console.log("Error in TransactionController recover_transaction:", error);
            // Return a 500 response with an error message
            res.status(500).json({ error: "Failed to recover transaction" });
        }
    }

}

export default TransactionController;