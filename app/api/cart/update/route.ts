import { NextRequest, NextResponse } from "next/server";
import { updateCartItemQuantity } from "@/lib/actions/cart";
import { z } from "zod";
import { auth } from "@/auth";

export async function getAuthToken() {
  const session = await auth();
  return session?.user ? session.user.id : null;
}

const UpdateCartItemQuantitySchema = z.object({
  cartId: z.string(),
  quantity: z.number().min(1),
});

export async function PATCH(req: NextRequest) {
  try {
    // Extract and validate token
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await req.json();
    const parsed = UpdateCartItemQuantitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    await updateCartItemQuantity(parsed.data);

    return NextResponse.json({
      message: "Cart item updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
