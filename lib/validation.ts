import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  author: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  rating: z.coerce.number().min(1).max(10),
  numOfBooks: z.coerce.number().min(1).lte(1000),
  bookImage: z.string().min(1, "Book image is required"),
  bookColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i)
    .min(1, "Book color is required"),
  bookVideo: z.string(),
  bookSummary: z.string().trim().min(10),
});
