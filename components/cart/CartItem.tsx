"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Minus, Plus, TrashIcon } from "lucide-react";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import { Cart } from "@/types";
import { toast } from "@/hooks/use-toast";
import Spinner from "@/components/ui/spinner";

type CartItemProps = {
  count?: number;
  onRemove?: (cartId: string) => Promise<void>;
  cart: Cart;
};

const CartItem = ({
  count = 1,
  onRemove = async () => {},
  cart,
}: CartItemProps) => {
  const [itemCount, setItemCount] = useState<number>(count);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const { book } = cart;

  const removeCartItem = async ({ cartId }: { cartId: string }) => {
    try {
      setIsRemoving(true);
      await onRemove(cartId);
      toast({
        title: "Success removing from cart",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Failed to remove cart item",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const updateCartItem = async (cartId: string, quantity: number) => {
    try {
      setIsUpdating(true);
      const response = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update cart");
      }

      return data;
    } catch (e) {
      toast({
        title: "Error updating cart",
      });
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleItemIncrease = async () => {
    setItemCount(itemCount + 1);
    await updateCartItem(cart.id, itemCount + 1);
  };

  const handleItemDecrease = async () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      await updateCartItem(cart.id, itemCount - 1);
    }
  };

  return (
    <div className="flex justify-between gap-2 border-b py-3">
      <div className="flex items-center gap-4">
        <BookCover
          coverColor={book.color}
          coverImage={book.cover}
          className="h-[90px] w-[60px]"
        />
        <Label className="text-base font-bold">{book.title}</Label>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleItemDecrease}
              disabled={itemCount === 1 || isUpdating}
            >
              <Minus />
            </Button>
            <Label>{itemCount}</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleItemIncrease}
              disabled={isUpdating}
            >
              <Plus />
            </Button>
          </div>
        </div>

        <Button
          size="sm"
          className="rounded-lg bg-white p-2 transition-all hover:bg-red hover:text-white"
          onClick={() =>
            removeCartItem({
              cartId: cart.id,
            })
          }
          disabled={isUpdating || isRemoving}
        >
          {isRemoving ? <Spinner /> : <TrashIcon className="size-4" />}
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
