"use server";

import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { z } from "zod";
import { createBookSchema } from "@/lib/validation";
import { count, InferModel } from "drizzle-orm";

type BookInsert = InferModel<typeof books, "insert">;

export const createBook = async (values: z.infer<typeof createBookSchema>) => {
  const newBook: BookInsert = {
    title: values.title,
    author: values.author,
    description: values.description,
    genre: values.genre,
    rating: values.rating,
    totalCopies: values.numOfBooks,
    availableCopies: values.numOfBooks,
    color: values.bookColor,
    video: values.bookVideo,
    cover: values.bookImage,
    summary: values.bookSummary,
  };

  try {
    await db.insert(books).values({
      ...newBook,
    });

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
    };
  }
};

interface GetBooksParams {
  limit: number;
  page: number;
}

export const getAllBooks = async ({ limit, page }: GetBooksParams) => {
  // Fetch the total count of books
  const totalBooks = await db.select({ count: count() }).from(books);

  // Calculate the total number of pages
  const totalRecords = totalBooks[0]?.count || 0; // Ensure it falls back to 0 if no records
  const totalPages = Math.ceil(totalRecords / limit);

  // Fetch the current page of books
  const allBooks = await db
    .select()
    .from(books)
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    books: allBooks as Book[],
    totalPages, // Add the total pages count to the result
    currentPage: page,
  };
};
