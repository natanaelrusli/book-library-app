import { InferModel } from "drizzle-orm";
import { borrowHistory, StatusEnum } from "./db/schema";

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE";

type Book = {
  id: string | number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  color: string;
  cover: string;
  video: string | null;
  summary: string;
  isLoanedBook: boolean;
  createdAt: Date | null;
};

type User = {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: StatusEnum | null;
  booksBorrowed: number;
  role: "USER" | "ADMIN";
  lastActivityDate: string;
  createdAt: Date;
};

type BorrowHistory = {
  id: string;
  borrowStatus: BorrowStatus;
  borrowDate: Date;
  returnDate: string | null;
  dueDate: string | null;
  receipt: string;
  createdAt: string;
  updatedAt: string;
  bookId: string;
  userId: string;
  book: Book;
  user: User;
};

type BorrowHistory = InferModel<typeof borrowHistory>;
