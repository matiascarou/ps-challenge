import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const { PORT, JWT_SECRET, USERNAME, PASSWORD, CLIENT_URL, DEPLOYMENT_URL } =
  process.env;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET must be provided, was the .env file setup correctly?"
  );
}

export default {
  PORT,
  JWT_SECRET,
  USERNAME,
  PASSWORD,
  CLIENT_URL,
  DEPLOYMENT_URL,
};
