import TransactionService from "../service/transactionService.js";
import type { Request, Response } from "express";


class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    async addTransaction(req: Request, res: Response){
        try {
            if(req.params.user_id){
            const user_id = req.params.user_id;
            const result = await this.transactionService.addTransaction(user_id, req.body);
            res.status(201).json(
                {
                    message: "Transaction added successfully",
                    data: result
                }
            );
            return result
        }
        console.log("User ID not provided in request parameters");
        } catch (error) {
            res.status(500).json({ error: "Failed to add transaction" });
        }
    }

    async get_all_Transactions(req: Request, res: Response){
        try {
            if(req.params.user_id){
                const user_id = req.params.user_id;
                const result = await this.transactionService.getTransactions(user_id!);
                res.status(200).json(
                    {
                        message: "Transactions retrieved successfully",
                        data: result
                    }
                );
                return result
            }
            console.log("User ID not provided in request parameters");
        }catch(error){
            console.log("Error in TransactionController get_all_Transactions:", error);
            res.status(500).json({ error: "Failed to retrieve transactions" });
        }
    }

    async get_income_Transactions(req: Request, res: Response){
        try {
            if(req.params.user_id){
                const user_id = req.params.user_id;
                const result = await this.transactionService.getIncomeTransactions(user_id!);
                res.status(200).json(
                    {
                        message: "Income transactions retrieved successfully",
                        data: result
                    }
                );
                return result
            }
            console.log("User ID not provided in request parameters");
        }catch(error){
            console.log("Error in TransactionController get_income_Transactions:", error);
            res.status(500).json({ error: "Failed to retrieve income transactions" });
        }
    }

    async get_expense_Transactions(req: Request, res: Response){
        try {
            if(req.params.user_id){
                const user_id = req.params.user_id;
                const result = await this.transactionService.getExpenseTransactions(user_id!);
                res.status(200).json(
                    {
                        message: "Expense transactions retrieved successfully",
                        data: result
                    }
                );
                return result
            }
            console.log("User ID not provided in request parameters");
        }catch(error){
            console.log("Error in TransactionController get_expense_Transactions:", error);
            res.status(500).json({ error: "Failed to retrieve expense transactions" });
        }
    }
    async delete_transaction(req: Request, res: Response){
        try {
            if(req.params.transaction_id){
            const transaction_id = req.params.transaction_id;
            const result = await this.transactionService.deleteTransaction(transaction_id);
            res.status(200).json(
                {
                    message: "Transaction deleted successfully",
                    data: result
                }
            );
            return result
        }
        }catch(error){
            console.log("Error in TransactionController delete_transaction:", error);
            res.status(500).json({ error: "Failed to delete transaction" });
        }
        }

    async edit_transaction(req: Request, res: Response){
        try {
            if(req.params.transaction_id){
            const transaction_id = req.params.transaction_id;
            const result = await this.transactionService.editTransaction(transaction_id, req.body);
            res.status(200).json(
                {
                    message: "Transaction edited successfully",
                    data: result
                }
            );
            return result
        }
        }catch(error){
            console.log("Error in TransactionController edit_transaction:", error);
            res.status(500).json({ error: "Failed to edit transaction" });
        }
    }
    
    async recover_transaction(req: Request, res: Response){
        try {
            if(req.params.transaction_id){
            const transaction_id = req.params.transaction_id;
            const result = await this.transactionService.recoverTransaction(transaction_id);
            res.status(200).json(
                {
                    message: "Transaction recovered successfully",
                    data: result
                }
            );
            return result
        }
        console.log("Transaction ID not provided in request parameters");
        }catch(error){
            console.log("Error in TransactionController recover_transaction:", error);
            res.status(500).json({ error: "Failed to recover transaction" });
        }
    }

}

export default TransactionController;