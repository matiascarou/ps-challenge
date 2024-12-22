import express from "express";
import { initRedis } from "../helpers/setupRedisClient.js";
import authRoutes from "../routes/authRoutes.js";
import framesRoutes from "../routes/framesRoutes.js";
import rateLimit from "express-rate-limit";
import { setupCors } from "../helpers/setupCors.js";

const app = express();

(async () => await initRedis())();

app.set("trust proxy", 1);

setupCors(app);

app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too Many Requests From This IP, Please Try Again Later.",
});

app.use(globalLimiter);

app.use("/", authRoutes);
app.use("/", framesRoutes);

export default app;
