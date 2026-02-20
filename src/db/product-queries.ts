// ═══════════════════════════════════════════════════════════
// PRODUCT QUERIES — Functions to read products from the DB
// ═══════════════════════════════════════════════════════════
//
// These functions are the "recipes" for getting product data.
// Your API routes will call these instead of writing DB queries directly.

import { eq, and, like, inArray, sql, desc, asc } from "drizzle-orm";
import { products, occasions, colors, productOccasions, productColors } from "./schema";
import type { Database } from "./client";

// ─────────────────────────────────────────
// TYPE: What filters can you pass when getting products?
// ─────────────────────────────────────────
// These match the filter dropdowns on your /products page
export interface ProductFilters {
  flower?: string;     // "roses" | "tulips" | "lilies" | etc.
  occasion?: string;   // "weddings" | "birthday" | "anniversary" | etc.
  color?: string;      // "red" | "pink" | "white" | etc.
  inStock?: boolean;   // true = only show available products
  search?: string;     // search by product name
  page?: number;       // page number for pagination (1, 2, 3...)
  limit?: number;      // how many products per page (default 12)
  sort?: "price-asc" | "price-desc" | "newest" | "rating"; // sort order
}

// ─────────────────────────────────────────
// GET ALL PRODUCTS (with optional filters)
// ─────────────────────────────────────────
// Examples:
//   getProducts(db)                              → all products
//   getProducts(db, { flower: "roses" })          → only roses
//   getProducts(db, { occasion: "weddings" })     → only wedding flowers
//   getProducts(db, { color: "red", page: 2 })    → red flowers, page 2
//
export async function getProducts(db: Database, filters: ProductFilters = {}) {
  const {
    flower,
    occasion,
    color,
    inStock,
    search,
    page = 1,
    limit = 12,
    sort = "newest",
  } = filters;

  // Start building the WHERE conditions
  // We collect all conditions in an array, then combine them with AND
  const conditions = [];

  // Only show active (visible) products
  conditions.push(eq(products.isActive, true));

  // Filter by flower type
  if (flower) {
    conditions.push(eq(products.flowerType, flower));
  }

  // Filter by stock availability
  if (inStock !== undefined) {
    conditions.push(eq(products.inStock, inStock));
  }

  // Search by name (partial match)
  if (search) {
    conditions.push(like(products.name, `%${search}%`));
    // like() with % means "contains" — so searching "rose" matches "RedRose Bliss"
  }

  // ─── Handle occasion filter ───
  // This is more complex because occasions are in a separate table (many-to-many)
  // We need to: find occasion ID → find product IDs linked to that occasion → filter
  let productIdsForOccasion: string[] | null = null;
  if (occasion) {
    // Step 1: Find the occasion by slug
    const occasionRow = await db
      .select({ id: occasions.id })
      .from(occasions)
      .where(eq(occasions.slug, occasion))
      .get(); // .get() returns ONE row (or undefined)

    if (occasionRow) {
      // Step 2: Find all product IDs linked to this occasion
      const links = await db
        .select({ productId: productOccasions.productId })
        .from(productOccasions)
        .where(eq(productOccasions.occasionId, occasionRow.id))
        .all(); // .all() returns ALL matching rows

      productIdsForOccasion = links.map((l) => l.productId);
    } else {
      productIdsForOccasion = []; // occasion not found → no products match
    }
  }

  // ─── Handle color filter (same idea as occasions) ───
  let productIdsForColor: string[] | null = null;
  if (color) {
    const colorRow = await db
      .select({ id: colors.id })
      .from(colors)
      .where(eq(colors.slug, color))
      .get();

    if (colorRow) {
      const links = await db
        .select({ productId: productColors.productId })
        .from(productColors)
        .where(eq(productColors.colorId, colorRow.id))
        .all();

      productIdsForColor = links.map((l) => l.productId);
    } else {
      productIdsForColor = [];
    }
  }

  // Combine occasion + color product IDs
  // If both filters are set, we need products that match BOTH
  if (productIdsForOccasion !== null && productIdsForColor !== null) {
    // Find products that appear in BOTH lists (intersection)
    const intersection = productIdsForOccasion.filter((id) =>
      productIdsForColor!.includes(id)
    );
    if (intersection.length === 0) return { products: [], total: 0 };
    conditions.push(inArray(products.id, intersection));
  } else if (productIdsForOccasion !== null) {
    if (productIdsForOccasion.length === 0) return { products: [], total: 0 };
    conditions.push(inArray(products.id, productIdsForOccasion));
  } else if (productIdsForColor !== null) {
    if (productIdsForColor.length === 0) return { products: [], total: 0 };
    conditions.push(inArray(products.id, productIdsForColor));
  }

  // ─── Determine sort order ───
  let orderBy;
  switch (sort) {
    case "price-asc":
      orderBy = asc(products.price);
      break;
    case "price-desc":
      orderBy = desc(products.price);
      break;
    case "rating":
      orderBy = desc(products.averageRating);
      break;
    case "newest":
    default:
      orderBy = desc(products.createdAt);
      break;
  }

  // ─── Build the final WHERE clause ───
  // and() combines multiple conditions: WHERE active=true AND flowerType='roses' AND...
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // ─── Calculate offset for pagination ───
  // Page 1 → offset 0 (skip nothing)
  // Page 2 → offset 12 (skip first 12)
  // Page 3 → offset 24 (skip first 24)
  const offset = (page - 1) * limit;

  // ─── Get total count (for "Showing 1-12 of 48 products") ───
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(whereClause)
    .get();

  const total = countResult?.count ?? 0;

  // ─── Get the actual products ───
  const result = await db
    .select()
    .from(products)
    .where(whereClause)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)
    .all();

  return {
    products: result,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

// ─────────────────────────────────────────
// GET A SINGLE PRODUCT BY ID
// ─────────────────────────────────────────
// Example:
//   getProductById(db, "FL-1")
//   → { id: "FL-1", name: "Blush Harmony", price: 8750, ... }
//
export async function getProductById(db: Database, id: string) {
  // Get the product
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();

  if (!product) return null;

  // Get the product's occasions
  const productOccasionLinks = await db
    .select({ name: occasions.name, slug: occasions.slug })
    .from(productOccasions)
    .innerJoin(occasions, eq(productOccasions.occasionId, occasions.id))
    .where(eq(productOccasions.productId, id))
    .all();

  // Get the product's colors
  const productColorLinks = await db
    .select({ name: colors.name, slug: colors.slug, hexCode: colors.hexCode })
    .from(productColors)
    .innerJoin(colors, eq(productColors.colorId, colors.id))
    .where(eq(productColors.productId, id))
    .all();

  return {
    ...product,
    occasions: productOccasionLinks,
    colors: productColorLinks,
  };
}
