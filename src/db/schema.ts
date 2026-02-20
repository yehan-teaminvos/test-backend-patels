// drizzle-orm/sqlite-core gives us the tools to define SQLite tables in TypeScript
import {
  sqliteTable, // creates a table
  text,        // a text/string column
  integer,     // a number column
  real,        // a decimal number column (for ratings like 4.5)
} from "drizzle-orm/sqlite-core";

// ─────────────────────────────────────────────
// PRODUCTS TABLE
// Each row = one flower bouquet in the shop
// ─────────────────────────────────────────────
export const products = sqliteTable("products", {
  // Primary key — every product gets a unique ID like "FL-1"
  id: text("id").primaryKey(),

  // The product name shown to users
  name: text("name").notNull(),

  // URL-friendly name, e.g. "blush-harmony" (used in page URLs)
  slug: text("slug").notNull().unique(),

  // Full description of the bouquet
  description: text("description").notNull(),

  // Price in LKR (Sri Lankan Rupees), stored as integer (e.g. 8750)
  price: integer("price").notNull(),

  // Original price before discount (optional — null if no discount)
  oldPrice: integer("old_price"),

  // How many are in stock
  stockQuantity: integer("stock_quantity").notNull().default(0),

  // true = available, false = sold out
  inStock: integer("in_stock", { mode: "boolean" }).notNull().default(true),

  // Type of flower: roses, tulips, lilies, daisies, sunflowers
  flowerType: text("flower_type").notNull(),

  // The main product image URL (stored in /public or R2)
  productImage: text("product_image").notNull(),

  // Average rating (e.g. 4.5) — updated when reviews come in
  averageRating: real("average_rating").default(0),

  // Total number of reviews
  totalReviews: integer("total_reviews").default(0),

  // Should this appear in the "Featured" section on homepage?
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),

  // Is this product visible in the shop? (admins can hide products)
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  // When this product was added (Unix timestamp)
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// OCCASIONS TABLE
// e.g. "Weddings", "Birthday", "Anniversary"
// ─────────────────────────────────────────────
export const occasions = sqliteTable("occasions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),       // "Weddings"
  slug: text("slug").notNull().unique(), // "weddings"
});

// ─────────────────────────────────────────────
// COLORS TABLE
// e.g. "Red", "Pink", "White"
// ─────────────────────────────────────────────
export const colors = sqliteTable("colors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),       // "Red"
  slug: text("slug").notNull().unique(), // "red"
  hexCode: text("hex_code"),          // "#FF0000" (optional, for color swatches)
});

// ─────────────────────────────────────────────
// PIVOT TABLE: product_occasions
// Links products to their occasions (many-to-many)
//
// WHY? One product can be for multiple occasions:
//   "Blush Harmony" → weddings, graduation, anniversary
//
// We can't put multiple occasions in one column,
// so we use a separate "link" table.
// ─────────────────────────────────────────────
export const productOccasions = sqliteTable("product_occasions", {
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  occasionId: integer("occasion_id")
    .notNull()
    .references(() => occasions.id, { onDelete: "cascade" }),
});

// ─────────────────────────────────────────────
// PIVOT TABLE: product_colors
// Links products to their colors (many-to-many)
// Same idea as product_occasions above
// ─────────────────────────────────────────────
export const productColors = sqliteTable("product_colors", {
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  colorId: integer("color_id")
    .notNull()
    .references(() => colors.id, { onDelete: "cascade" }),
});

// ─────────────────────────────────────────────
// REVIEWS TABLE
// Customer reviews for products
// ─────────────────────────────────────────────
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Which product is this review for?
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  // Which user wrote this? (references users table in auth-schema.ts)
  userId: integer("user_id").notNull(),

  // Rating from 1 to 5
  rating: integer("rating").notNull(),

  // The review text
  comment: text("comment"),

  // "pending" | "approved" | "rejected"
  status: text("status").notNull().default("pending"),

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});
