// ═══════════════════════════════════════════════════════════
// /api/cart
// ═══════════════════════════════════════════════════════════
// GET    /api/cart → get my cart items
// POST   /api/cart → add item to cart
// DELETE /api/cart → remove item from cart
//
// ALL cart routes require login (you must have a session cookie)

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getSession } from "@/lib/auth";
import { getCartItems, addToCart, removeFromCart, updateCartQuantity } from "@/db/order-queries";

// ─── GET: Get my cart items ───
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const db = await getDb();
    const result = await getCartItems(db, session.userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// ─── POST: Add item to cart ───
// Body: { "productId": "FL-1", "quantity": 2 }
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { productId?: string; quantity?: number };
    const { productId, quantity } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await addToCart(db, session.userId, productId, quantity || 1);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// ─── DELETE: Remove item from cart ───
// Body: { "cartItemId": 5 }
export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { cartItemId?: number };
    const { cartItemId } = body;

    if (!cartItemId) {
      return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await removeFromCart(db, cartItemId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}

// ─── PUT: Update item quantity ───
// Body: { "cartItemId": 5, "quantity": 3 }
export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { cartItemId?: number; quantity?: number };
    const { cartItemId, quantity } = body;

    if (!cartItemId || quantity === undefined) {
      return NextResponse.json(
        { error: "Cart item ID and quantity are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await updateCartQuantity(db, cartItemId, quantity);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Cart PUT error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
