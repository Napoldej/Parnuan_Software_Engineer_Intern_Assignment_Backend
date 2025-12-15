import type { createUserType } from "../types/userType.js";
import  UserRepository  from "../repository/userRepository.js";
import type { User } from "@prisma/client";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Create a new user
     * @param {createUserType} input - User data
     * @returns {Promise<User>} - Newly created user
     */
    async createUser(input: createUserType): Promise<User> {
        try {
            // Create a new user
            if(await this.userRepository.getUserByEmail(input.email)){
                throw new Error("Email already exists");
            }
            const user = await this.userRepository.createUser(input);
            // Return the newly created user
            return user;
        } catch (error) {
            // Log error if creating user fails
            console.log("Error in UserService createUser:", error);
            // Throw error to be caught by caller
            throw error;
        }
    }
}

export default UserService;