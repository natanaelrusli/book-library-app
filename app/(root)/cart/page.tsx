import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CartItemList from "@/components/cart/CartItemList";
import { getCartByUserId } from "@/lib/actions/cart";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();

  const data = await getCartByUserId({
    userId: session?.user?.id as string,
  });

  return (
    <div className="w-full flex-1">
      <Card className="border-none bg-light-400 p-5 text-dark-100">
        <div className="mb-3">
          <Label className="font-ibm-plex-sans text-2xl font-bold">Cart</Label>
        </div>
        <hr />
        <div className="mt-3">
          <CartItemList cartItems={data?.cartItems || []} />
        </div>
      </Card>
    </div>
  );
};

export default Page;
