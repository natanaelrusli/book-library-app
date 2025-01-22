import { config } from "dotenv";

config({ path: ".env.local" });

export const AppConfig = {
  env: {
    appEndpoint: process.env.NEXT_PUBLIC_ENDPOINT,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.UPSTASH_QSTASH_URL!,
      qstashToken: process.env.UPSTASH_QSTASH_TOKEN!,
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY!,
    },
  },
};
