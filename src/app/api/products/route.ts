// ═══════════════════════════════════════════════════════════
// GET /api/products
// ═══════════════════════════════════════════════════════════
// Returns a list of products with optional filters.
//
// URL EXAMPLES:
//   /api/products                         → all products
//   /api/products?flower=roses            → only roses
//   /api/products?occasion=weddings       → wedding flowers
//   /api/products?color=red&page=2        → red flowers, page 2
//   /api/products?sort=price-asc          → cheapest first
//   /api/products?search=blush            → search by name
//
// RESPONSE:
//   {
//     "products": [{ "id": "FL-1", "name": "Blush Harmony", ... }],
//     "total": 17,
//     "page": 1,
//     "totalPages": 2
//   }

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getProducts, getProductById } from "@/db/product-queries";

export async function GET(request: Request) {
  try {
    const db = await getDb();

    // Read the filters from the URL query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // If ID is provided, return single product
    if (id) {
      const product = await getProductById(db, id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    const filters = {
      flower: url.searchParams.get("flower") || undefined,
      occasion: url.searchParams.get("occasion") || undefined,
      color: url.searchParams.get("color") || undefined,
      inStock: url.searchParams.get("inStock") === "true" ? true : undefined,
      search: url.searchParams.get("search") || undefined,
      page: Number(url.searchParams.get("page")) || 1,
      limit: Number(url.searchParams.get("limit")) || 12,
      sort: (url.searchParams.get("sort") as "price-asc" | "price-desc" | "newest" | "rating") || "newest",
    };

    // Call the query helper (from Step 9!)
    const result = await getProducts(db, filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
