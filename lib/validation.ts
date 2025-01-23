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
  title: z.string().min(3),
  genre: z.string().min(3),
  author: z.string().min(3),
  numOfBooks: z.number().min(1),
  bookImage: z.string().min(1, "Book image is required"),
  bookColor: z.string().min(1, "Book color is required"),
  bookVideo: z.string().optional(),
  bookSummary: z.string().optional(),
});
