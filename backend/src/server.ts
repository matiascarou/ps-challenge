import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

// app.post("/auth", auth);
// app.use("/:project_name/frames", frames);

app.get("/", (req, res) => {
  res.status(200).json({ message: "test" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
