// ═══════════════════════════════════════════════════════════
// GET /api/products/[id]
// ═══════════════════════════════════════════════════════════
// Returns a single product by its ID.
//
// URL: /api/products/FL-1
// [id] = "FL-1" (Next.js captures this from the URL)
//
// RESPONSE:
//   { "id": "FL-1", "name": "Blush Harmony", "price": 8750,
//     "occasions": [{ "name": "Weddings" }, ...],
//     "colors": [{ "name": "Mixed", "hexCode": "#..." }] }

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getProductById } from "@/db/product-queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    const product = await getProductById(db, id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 } // 404 = "Not Found"
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
