import { Express } from "express";
import cors from "cors";

// Also available in the env file
const allowedOrigins = [
  "http://localhost:5173",
  "https://matiascarou.github.io",
];

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
