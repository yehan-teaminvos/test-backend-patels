// ═══════════════════════════════════════════════════════════
// /api/wishlist
// ═══════════════════════════════════════════════════════════
// GET    /api/wishlist → get my saved items
// POST   /api/wishlist → save an item
// DELETE /api/wishlist → unsave an item

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getSession } from "@/lib/auth";
import { getWishlist, addToWishlist, removeFromWishlist, removeProductFromWishlist } from "@/db/order-queries";

// ─── GET: My wishlist ───
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const db = await getDb();
    const items = await getWishlist(db, session.userId);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json({ error: "Failed to get wishlist" }, { status: 500 });
  }
}

// ─── POST: Add to wishlist ───
// Body: { "productId": "FL-1" }
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { productId?: string };
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await addToWishlist(db, session.userId, productId);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

// ─── DELETE: Remove from wishlist ───
// Body: { "wishlistId": 5 } OR { "productId": "FL-1" }
export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please log in" }, { status: 401 });
    }

    const body = (await request.json()) as { wishlistId?: number; productId?: string };
    const { wishlistId, productId } = body;

    const db = await getDb();

    if (wishlistId) {
      const result = await removeFromWishlist(db, wishlistId);
      return NextResponse.json(result);
    } else if (productId) {
      const result = await removeProductFromWishlist(db, session.userId, productId);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: "Wishlist ID or Product ID is required" }, { status: 400 });
    }
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
