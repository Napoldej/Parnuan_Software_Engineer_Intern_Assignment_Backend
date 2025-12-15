import { Router } from "express";
import UserController from "../controller/userController.js";


const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /api/users/create-user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Failed to create user
 */
router.post("/create-user", (req, res) => userController.createUser(req, res))

export default router;