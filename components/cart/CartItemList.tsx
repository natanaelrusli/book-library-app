import React from "react";
import CartItem from "./CartItem";
import { Cart } from "@/types";

type CartItemListProps = {
  cartItems: Cart[];
};

const CartItemList = ({ cartItems }: CartItemListProps) => {
  return (
    <div>
      {cartItems.map((cart: Cart) => (
        <CartItem cart={cart} key={cart.id} count={cart.quantity} />
      ))}
    </div>
  );
};

export default CartItemList;
