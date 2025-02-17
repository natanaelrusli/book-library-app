import React from "react";
import CartItem from "./CartItem";
import { Cart } from "@/types";
import { removeCartItem } from "@/lib/actions/cart";
import { revalidatePath } from "next/cache";

type CartItemListProps = {
  cartItems: Cart[];
};

const CartItemList = async ({ cartItems }: CartItemListProps) => {
  const handleRemove = async (cartId: string) => {
    "use server";

    try {
      await removeCartItem({
        cartId,
      });
    } catch (e) {
      console.error(e);
      throw new Error("Could not remove cart item");
    }

    revalidatePath("/cart");
  };

  return (
    <>
      {cartItems.length > 0 &&
        cartItems.map((cart: Cart) => (
          <CartItem
            cart={cart}
            key={cart.id}
            count={cart.quantity}
            onRemove={handleRemove}
          />
        ))}
    </>
  );
};

export default CartItemList;
