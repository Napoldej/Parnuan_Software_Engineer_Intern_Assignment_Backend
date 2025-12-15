import type { PrismaClient, TransactionType } from "@prisma/client";
import PrismaSingleTon from "../helper/prismaSingleTon.js";
import type { createTransactionType, editTransactionType } from "../types/transactionType.js";

class TransactionRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = PrismaSingleTon.getInstance();
    }

    async add_transaction(user_id: string, input: createTransactionType){
        try{
            const transaction = await this.prisma.transaction.create({
            data:{
                title: input.title,
                user_id: user_id,
                amount: input.amount,
                type: input.type as TransactionType
                }
            })
            return transaction
        }catch(error){
            console.log("Error adding income transaction:", error);
            throw error;
        }
    }
    async read_transactions(user_id: string){
        try{
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    user_id: user_id,
                    is_deleted: false
                }
            })
            return transactions
        }catch(error){
            console.log("Error reading transactions:", error);
            throw error;
        }
    }
    
    async read_income_transactions(user_id: string){
        try{
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    user_id: user_id,
                    type: "Income",
                    is_deleted: false
                    }
                })
                return transactions
            }catch(error){
                console.log("Error reading income transactions:", error);
                throw error;
            }
        }

    async read_expense_transactions(user_id: string){
        try{
            const transactions = await this.prisma.transaction.findMany({
                where: {
                    user_id: user_id,
                    type: "Expense",
                    is_deleted: false
                    }
                })
                return transactions
            }catch(error){
                console.log("Error reading expense transactions:", error);
                throw error;
            }
        }
    
        async delete_transaction(transaction_id: string){
            try{
                const deleted_transaction = await this.prisma.transaction.update({
                    where: {
                        id: transaction_id,
                        is_deleted: false
                    },
                    data: {
                        is_deleted: true,
                        deleted_at: new Date()
                    }
                    })
                    return deleted_transaction
                } catch(error){
                    console.log("Error deleting transaction:", error);
                    throw error;
                    }
                }
        
        async edit_transaction(transaction_id: string, input: editTransactionType){
            try{
                const updated_transaction = await this.prisma.transaction.update({
                    where: {
                        id: transaction_id,
                        is_deleted: false
                    },
                    data: {
                        ...input,
                        type: input.type as TransactionType,
                        updated_at: new Date()
                    }
                })
                return updated_transaction
            }catch(error){
                console.log("Error editing transaction:", error);
                throw error;
            }
        }

        async recoverable_transaction(transaction_id: string){
            try{
                const recovered_transaction = await this.prisma.transaction.update({
                    where:{
                        id: transaction_id,
                        is_deleted: true
                    },
                    data:{
                        is_deleted: false
                    }
                })
                return recovered_transaction
            } catch(error){
                console.log("Error recovering transaction:", error);
                throw error
            }
        }
    }

export default TransactionRepository