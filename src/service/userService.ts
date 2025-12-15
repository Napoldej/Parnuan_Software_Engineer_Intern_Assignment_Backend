import type { createUserType } from "../types/usertype.js";
import  UserRepository  from "../repository/userRepository.js";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(input: createUserType) {
        try {
            await this.userRepository.createUser(input);
        } catch (error) {
            console.log("Error in UserService createUser:", error);
            throw error;
        }
    }
}