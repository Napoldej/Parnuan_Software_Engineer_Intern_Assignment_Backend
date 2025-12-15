import UserService from "../service/userService.js";
import type { Request, Response } from "express";

class UserController {
    private userService: UserService

    constructor(){
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const result = await this.userService.createUser(req.body);
            res.status(201).json(
                {
                    message: "User created successfully",
                    data: result
                }
            );
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
        }
    }

}
export default UserController;