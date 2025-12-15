import { PrismaClient } from "@prisma/client";
import Prisma = require("@prisma/client");

class PrismaSingleTon{
    private static instance: PrismaClient;

    private construtor(){

    }

    public static getInstance(): PrismaClient{
        if(!PrismaSingleTon.instance){
            PrismaSingleTon.instance = new PrismaClient();
        }
        return PrismaSingleTon.instance

    }

}

export default PrismaSingleTon;