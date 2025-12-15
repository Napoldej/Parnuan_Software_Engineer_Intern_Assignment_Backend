import { Router } from "express";
import UserController from "../controller/userController.js";


const router = Router();
const userController = new UserController();


router.post("/create-user", (req, res) => userController.createUser(req, res))

export default router;