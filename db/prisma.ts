// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

dotenv.config({ path: ".env.local" });

export const prisma =
  globalForPrisma.prisma || new PrismaClient(
    {
      datasources: {
        db: {
            url: process.env.PRISMA_DATABASE_URL
        }
      }
    }
  );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;