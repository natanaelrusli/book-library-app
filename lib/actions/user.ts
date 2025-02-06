import { db } from "@/db/drizzle";
import { RoleEnum, StatusEnum, users } from "@/db/schema";
import { User } from "@/types";
import { count, eq } from "drizzle-orm";

type GetUsersParams = {
  limit: number;
  page: number;
};

type GetUserByStatusParams = GetUsersParams & {
  status: StatusEnum;
};

type DeleteUserParams = {
  userId: string;
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

export const getUserByStatus = async ({
  limit,
  page,
  status,
}: GetUserByStatusParams) => {
  const totalUserCount = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.status, status));

  const totalRecords = totalUserCount[0]?.count || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  const allUsers = await db
    .select()
    .from(users)
    .where(eq(users.status, status))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    users: allUsers as User[],
    totalPages,
    currentPage: page,
  };
};

export const deleteUserById = async ({ userId }: DeleteUserParams) => {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false };
  }
};

export const updateUserStatus = async ({
  userId,
  status,
}: {
  userId: string;
  status: StatusEnum;
}) => {
  try {
    await db.update(users).set({ status }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Failed to update user status:", error);
    return { success: false };
  }
};

export const updateUserRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: RoleEnum;
}) => {
  try {
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false };
  }
};
