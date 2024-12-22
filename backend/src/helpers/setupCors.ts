import { Express } from "express";
import cors from "cors";
import config from "../config/config.js";

const { CLIENT_URL, DEPLOYMENT_URL } = config;

const allowedOrigins = [CLIENT_URL, DEPLOYMENT_URL];

export function setupCors(app: Express) {
  const corsOptions = {
    origin: (origin: string | undefined, callback: any) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
}
