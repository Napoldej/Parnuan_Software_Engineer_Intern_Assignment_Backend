import type { PrismaClient } from "@prisma/client";
import PrismaSingleTon from "../helper/prismaSingleTon.js";
import type { createUserType } from "../types/usertype.js";

class UserRepository{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = PrismaSingleTon.getInstance();
    }

    async createUser(input: createUserType){
        try{
            const user = await this.prisma.user.create({
                data:{
                    email: input.email,
                    name: input.name
                }
            })
            return user
        }catch(error){
            console.log("Error creating user:", error);
            throw error;
        }
    }

}

export default UserRepository