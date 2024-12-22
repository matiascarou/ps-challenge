import express from "express";
import dotenv from "dotenv";
import { initRedis } from "./helpers/setupRedisClient.js";
import authRoutes from "./routes/authRoutes.js";
import framesRoutes from "./routes/framesRoutes.js";
import rateLimit from "express-rate-limit";

dotenv.config();

(async () => {
  await initRedis();

  const app = express();
  const PORT = process.env.PORT ?? 3001;

  app.use(express.json());

  const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later.",
  });

  app.use(globalLimiter);

  app.use("/", authRoutes);
  app.use("/", framesRoutes);

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
})();
