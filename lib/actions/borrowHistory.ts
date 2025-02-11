import { db } from "@/db/drizzle";
import { books, borrowHistory, users } from "@/db/schema";
import { BorrowHistory, BorrowStatus } from "@/types";
import { count, eq, InferModel } from "drizzle-orm";

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

export const updateBorrowStatus = async ({
  borrowStatus,
  borrowDataId,
}: {
  borrowStatus: BorrowStatus;
  borrowDataId: string;
}) => {
  try {
    switch (borrowStatus) {
      case "RETURNED":
        await db
          .update(borrowHistory)
          .set({
            borrowStatus,
            returnDate: new Date(),
          })
          .where(eq(borrowHistory.id, borrowDataId))
          .returning();
      default:
        await db
          .update(borrowHistory)
          .set({
            borrowStatus,
          })
          .where(eq(borrowHistory.id, borrowDataId))
          .returning();
    }
  } catch (error) {
    console.error("Failed to update borrow status:", error);
    throw new Error("Failed to update borrow status.");
  }
};

type CreateBorrowRequestPayload = {
  bookId: string;
  userId: string;
  borrowDate: Date;
  dueDate: Date;
};

export type BorrowRequestInsert = InferModel<typeof borrowHistory, "insert">;

export const createNewBorrowRequest = async ({
  bookId,
  userId,
  borrowDate,
  dueDate,
}: CreateBorrowRequestPayload) => {
  // Check availableCopies
  // Decrease availableCopies when borrowed
  // Increase back when the book returned
  try {
    const newRequest: BorrowRequestInsert = {
      bookId,
      userId,
      borrowDate,
      dueDate,
      borrowStatus: "BORROWED",
    };

    const res = await db.insert(borrowHistory).values({ ...newRequest });

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
