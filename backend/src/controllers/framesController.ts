import { Request, Response } from "express";
import { getRedisClient } from "../helpers/setupRedisClient.js";

export const getFrameById = async (req: Request, res: Response) => {
  try {
    const { project_name, frame_id } = req.params;

    const cursor = frame_id.toString().padStart(2, "0");

    const cacheKey = `${project_name}-frame-${cursor}`;

    const redisClient = getRedisClient();

    const cachedData = (await redisClient?.get(cacheKey)) ?? null;

    if (cachedData) {
      const data = JSON.parse(cachedData);
      res.status(200).json({ data });
      return;
    }

    const url = `https://static.scale.com/uploads/${project_name}/frame_${cursor}.json`;

    const response = await fetch(url, { method: "GET" });

    const { status } = response;

    if (!response.ok) {
      res.status(status).json({ message: "Failed to fetch frames" });
      return;
    }

    const data = await response.json();

    await redisClient?.set(cacheKey, JSON.stringify(data), { EX: 3600 });

    res.status(status).json({ data });
    return;
  } catch (e: any) {
    res
      .status(500)
      .json({ error: e.message ?? e.toString() ?? "Unknown error" });
    return;
  }
};

export const getFrames = async (req: Request, res: Response) => {
  const { project_name } = req.params;
  res.status(200).json({ projectName: project_name, amountOfFrames: 50 });
  return;
};
