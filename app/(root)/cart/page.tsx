import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CartItemList from "@/components/cart/CartItemList";
import { getCartByUserId } from "@/lib/actions/cart";
import { auth } from "@/auth";
import { Empty } from "antd";

const Page = async () => {
  const session = await auth();

  const data = await getCartByUserId({
    userId: session?.user?.id as string,
  });

  return (
    <div className="w-full flex-1">
      <Card className="h-[700px] border-none bg-light-400 p-5 text-dark-100">
        <div className="flex h-full items-center justify-center">
          {data?.cartItems && data?.cartItems?.length <= 0 ? (
            <Empty description="No cart items found." />
          ) : (
            <div className="size-full overflow-hidden">
              <div className="mb-3">
                <Label className="font-ibm-plex-sans text-2xl font-bold">
                  Cart
                </Label>
              </div>
              <div className="mt-3 h-full overflow-scroll pb-12">
                <CartItemList cartItems={data?.cartItems || []} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Page;
