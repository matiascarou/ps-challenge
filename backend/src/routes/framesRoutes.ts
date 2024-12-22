import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getFrameById, getFrames } from "../controllers/framesController.js";

const framesRouter = Router();

framesRouter.get("/:project_name/frames", authMiddleware, getFrames);

framesRouter.get("/:project_name/frames/:frame_id", authMiddleware, getFrameById);

export default framesRouter;
