import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const { JWT_SECRET, USERNAME, PASSWORD } = config;

export const authenticateUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!JWT_SECRET) {
    res.status(404).json({ message: "JWT not found" });
    return;
  }

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token });
    return;
  }

  res.status(401).json({ message: "Invalid Username or Password" });
  return;
};
