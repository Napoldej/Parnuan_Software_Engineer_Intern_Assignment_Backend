import type { PrismaClient } from "@prisma/client";
import PrismaSingleTon from "../helper/prismaSingleTon.js";
import type { createUserType } from "../types/userType.js";
import type { User } from "@prisma/client";
class UserRepository{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = PrismaSingleTon.getInstance();
    }

    /**
     * Creates a new user with the given input
     * @param {createUserType} input - User data
     * @returns {Promise<User>} - Newly created user
     */
    async createUser(input: createUserType): Promise<User>{
        try{
            // Create a new user
            const user = await this.prisma.user.create({
                data:{
                    // Email address
                    email: input.email,
                    // Full name
                    name: input.name
                }
            })
            return user
        }catch(error){
            console.log("Error creating user:", error);
            throw error;
        }
    }
    
    async getUserByEmail(email: string){
        try{
            // Find a user by email
            const user = await this.prisma.user.findUnique({
                where:{
                    email: email
                }
            })
            return user
        }catch(error){
            console.log("Error getting user by email:", error);
            throw error;
        }
    }

}

export default UserRepository