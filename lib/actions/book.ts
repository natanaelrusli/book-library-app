import { db } from "@/db/drizzle";
import { books } from "@/db/schema";

export const createBook = async (book: Book) => {
  await db.insert(books).values(book);
};
