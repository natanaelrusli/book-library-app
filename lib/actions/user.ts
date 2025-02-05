import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { User } from "@/types";
import { count, eq } from "drizzle-orm";

type GetUsersParams = {
  limit: number;
  page: number;
};

export const getAllActivatedUsers = async ({ limit, page }: GetUsersParams) => {
  // Fetch the total count of books
  const totalUserCount = await db.select({ count: count() }).from(users);

  // Calculate the total number of pages
  const totalRecords = totalUserCount[0]?.count || 0; // Ensure it falls back to 0 if no records
  const totalPages = Math.ceil(totalRecords / limit);

  // Fetch the current page of books
  const allUsers = await db
    .select()
    .from(users)
    .where(eq(users.status, "APPROVED"))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    users: allUsers as User[],
    totalPages, // Add the total pages count to the result
    currentPage: page,
  };
};

export const getAllUsers = async ({ limit, page }: GetUsersParams) => {
  // Fetch the total count of books
  const totalUserCount = await db.select({ count: count() }).from(users);

  // Calculate the total number of pages
  const totalRecords = totalUserCount[0]?.count || 0; // Ensure it falls back to 0 if no records
  const totalPages = Math.ceil(totalRecords / limit);

  // Fetch the current page of books
  const allUsers = await db
    .select()
    .from(users)
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    users: allUsers as User[],
    totalPages, // Add the total pages count to the result
    currentPage: page,
  };
};

export const deleteUserById = async (userId: string) => {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false };
  }
};
