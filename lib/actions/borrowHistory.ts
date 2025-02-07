import { db } from "@/db/drizzle";
import { books, borrowHistory, users } from "@/db/schema";
import { BorrowHistory } from "@/types";
import { count, eq } from "drizzle-orm";

interface GetBorrowHistoryarams {
  limit: number;
  page: number;
}

type GetAllBorrowHistoryResponse = {
  borrowHistory: BorrowHistory[];
  totalPages: number;
  currentPage: number;
};

export const getAllBorrowRequest = async ({
  limit,
  page,
}: GetBorrowHistoryarams): Promise<GetAllBorrowHistoryResponse> => {
  const totalBorrow = await db
    .select({
      count: count(),
    })
    .from(borrowHistory);

  const totalRecords = totalBorrow[0]?.count || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  const allBorrowHistory = await db
    .select({
      id: borrowHistory.id,
      borrowStatus: borrowHistory.borrowStatus,
      borrowDate: borrowHistory.borrowDate,
      returnDate: borrowHistory.returnDate,
      dueDate: borrowHistory.dueDate,
      receipt: borrowHistory.receipt,
      createdAt: borrowHistory.createdAt,
      updatedAt: borrowHistory.updatedAt,
      bookId: borrowHistory.bookId,
      userId: borrowHistory.userId,
      book: books,
      user: users,
    })
    .from(borrowHistory)
    .leftJoin(users, eq(borrowHistory.userId, users.id))
    .leftJoin(books, eq(borrowHistory.bookId, books.id))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    borrowHistory: allBorrowHistory as unknown as BorrowHistory[],
    totalPages,
    currentPage: page,
  };
};
