import express from "express";
import dotenv from "dotenv";
import { initRedis } from "./helpers/setupRedisClient.js";
import authRoutes from "./routes/authRoutes.js";
import framesRoutes from "./routes/framesRoutes.js";
import rateLimit from "express-rate-limit";
import cors from "cors";

dotenv.config();

const { CLIENT_URL = "http://localhost:5173" } = process.env;

(async () => {
  await initRedis();

  const app = express();
  const PORT = process.env.PORT ?? 3001;

  app.use(cors({ origin: CLIENT_URL, credentials: true }));

  app.use(express.json());

  const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too Many Requests From This IP, Please Try Again Later.",
  });

  app.use(globalLimiter);

  app.use("/", authRoutes);
  app.use("/", framesRoutes);

  const URL = "http://localhost:" + PORT;

  app.listen(PORT, () => {
    console.log(`Backend running on ${URL}`);
  });
})();
