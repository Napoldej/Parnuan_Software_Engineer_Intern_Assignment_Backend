import UserService from "../service/userService.js";
import type { Request, Response } from "express";

class UserController {
    private userService: UserService

    constructor(){
        this.userService = new UserService();
    }

    /**
     * Handles the POST /create-user endpoint
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    async createUser(req: Request, res: Response) {
        try {
            // Create a new user with the given input
            const result = await this.userService.createUser(req.body);
            // Return a 201 status with the newly created user
            res.status(201).json(
                {
                    message: "User created successfully",
                    data: result
                }
            );
        } catch (error: any) {
            // Return a 500 status with an error message
            res.status(400).json({ error: error.message});
        }
    }

}
export default UserController;