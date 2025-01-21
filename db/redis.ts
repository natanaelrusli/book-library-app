import { Redis } from "@upstash/redis";
import { AppConfig } from "@/lib/config";

const redis = new Redis({
  url: AppConfig.env.upstash.redisUrl!,
  token: AppConfig.env.upstash.redisToken!,
});

export default redis;
