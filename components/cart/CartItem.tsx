"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Minus, Plus, TrashIcon } from "lucide-react";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import { Cart } from "@/types";

type CartItemProps = {
  count?: number;
  onRemove?: () => void;
  cart: Cart;
};

const CartItem = ({ count = 1, onRemove = () => {}, cart }: CartItemProps) => {
  const [itemCount, setItemCount] = useState<number>(count);
  const { book } = cart;

  const handleItemIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleItemDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
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
              disabled={itemCount === 1}
            >
              <Minus />
            </Button>
            <Label>{itemCount}</Label>
            <Button variant="outline" size="sm" onClick={handleItemIncrease}>
              <Plus />
            </Button>
          </div>
        </div>

        <button
          className="rounded-lg bg-white p-2 transition-all hover:bg-red hover:text-white"
          onClick={onRemove}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
