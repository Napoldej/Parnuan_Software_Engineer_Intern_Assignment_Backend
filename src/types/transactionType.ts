import type { TransactionType } from "@prisma/client";

export interface editTransactionType{
    amount?: number;
    title?: string;
    type?: string;
}

export interface createTransactionType{
    amount: number;
    title: string;
    type: TransactionType
}