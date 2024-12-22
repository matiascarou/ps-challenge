import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

export async function initRedis() {
  redisClient = createClient();

  redisClient.on("error", (err) => {
    console.error("Failed to Initialize Redis Client", err);
  });

  await redisClient.connect();
}

export function getRedisClient() {
  return redisClient;
}
