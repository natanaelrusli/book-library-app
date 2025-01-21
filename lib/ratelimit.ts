import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/db/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "10s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
