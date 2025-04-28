import { createClient } from "redis";
import { config } from "../../../config";

const redisUrl = config.REDIS_HOST;
const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect();

export const RedisAdapter = {
  async get<T = any>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? (JSON.parse(data) as T) : null;
  },
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await redisClient.set(key, data, { EX: ttlSeconds });
    } else {
      await redisClient.set(key, data);
    }
  },
  async del(key: string): Promise<void> {
    await redisClient.del(key);
  },
};
