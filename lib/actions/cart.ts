import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { books, cart, users } from "@/db/schema";
import { Cart } from "@/types";

// TODO
// add function to remove cart item

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

export const updateCartItemQuantity = async ({
  cartId,
  quantity,
}: {
  cartId: string;
  quantity: number;
}) => {
  try {
    const updatedCartItem = await db
      .update(cart)
      .set({
        quantity,
      })
      .where(eq(cart.id, cartId))
      .returning();

    return {
      cartItem: updatedCartItem as unknown as Cart,
    };
  } catch (e) {
    console.error(e);
  }
};

export const removeCartItem = async ({ cartId }: { cartId: string }) => {
  try {
    await db.delete(cart).where(eq(cart.id, cartId)).returning();
  } catch (e) {
    console.error(e);
  }
};
