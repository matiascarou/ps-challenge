import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const token = authHeader.replace(/^Bearer\s+/, "");

  if (!JWT_SECRET) {
    return res.status(404).json({ message: "Missing JWT Secret" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    (req as any).user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
