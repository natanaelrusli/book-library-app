import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { books, cart, users } from "@/db/schema";
import { Cart } from "@/types";

export const getCartByUserId = async ({ userId }: { userId: string }) => {
  try {
    const cartItems = await db
      .select({
        id: cart.id,
        userId: cart.userId,
        quantity: cart.quantity,
        book: books,
        user: users,
        createdAt: cart.createdAt,
      })
      .from(cart)
      .leftJoin(users, eq(cart.userId, users.id))
      .leftJoin(books, eq(cart.bookId, books.id))
      .where(eq(cart.userId, userId));

    return {
      cartItems: cartItems as unknown as Cart[],
    };
  } catch (e) {
    console.error(e);
  }
};
