import { InferModel } from "drizzle-orm";
import { users } from "./db/schema";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number | null;
  availableCopies: number | null;
  description: string;
  color: string;
  cover: string;
  video: string | null;
  summary: string;
  isLoanedBook?: boolean;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

type User = InferModel<typeof users>;
