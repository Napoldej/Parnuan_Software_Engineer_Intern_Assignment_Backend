import type { createUserType } from "../types/userType.js";
import  UserRepository  from "../repository/userRepository.js";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(input: createUserType) {
        try {
            const user = await this.userRepository.createUser(input);
            return user;
        } catch (error) {
            console.log("Error in UserService createUser:", error);
            throw error;
        }
    }
}

export default UserService;