import { Router } from "express";
import { authenticateUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/auth", authenticateUser);

export default authRouter;
