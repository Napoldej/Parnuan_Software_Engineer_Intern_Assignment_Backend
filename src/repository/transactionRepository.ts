import type { PrismaClient, TransactionType } from "@prisma/client";
import PrismaSingleTon from "../helper/prismaSingleTon.js";

class TransactionRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = PrismaSingleTon.getInstance();
    }

    async add_transaction(user_id: string, amount: number, title: string, type: string){
        try{
            const transaction = await this.prisma.transaction.create({
            data:{
                title: title,
                user_id: user_id,
                amount: amount,
                type: type as TransactionType
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

}