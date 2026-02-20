import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { users } from "./auth-schema";
import { products } from "./schema";

// ─────────────────────────────────────────────
// CART TABLE
// Each user has ONE cart (like a shopping trolley)
// ─────────────────────────────────────────────
export const cart = sqliteTable("cart", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Who owns this cart?
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// CART_ITEMS TABLE
// Each item added to the cart is one row here
//
// Example:
//   cart_id=5, product_id="FL-1", quantity=2, price=8750
//   cart_id=5, product_id="FL-3", quantity=1, price=5750
// ─────────────────────────────────────────────
export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Which cart does this item belong to?
  cartId: integer("cart_id")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),

  // Which product?
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  // How many of this product?
  quantity: integer("quantity").notNull().default(1),

  // Price at the time of adding (price can change later, we lock it in)
  price: integer("price").notNull(),
});

// ─────────────────────────────────────────────
// WISHLIST TABLE
// Products a user has "hearted" / saved for later
// ─────────────────────────────────────────────
export const wishlist = sqliteTable("wishlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  addedAt: integer("added_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// ORDERS TABLE
// When a user checks out, the cart becomes an ORDER
//
// Order statuses:
//   payment_status: "pending" | "paid" | "failed"
//   order_status: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled"
// ─────────────────────────────────────────────
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Which user placed this order?
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Human-readable order number shown to customers, e.g. "ORD-20250219-001"
  orderNumber: text("order_number").notNull().unique(),

  // Cost before delivery
  subtotal: integer("subtotal").notNull(),

  // Delivery charge
  shippingCost: integer("shipping_cost").notNull().default(0),

  // subtotal + shippingCost
  totalAmount: integer("total_amount").notNull(),

  // Has payment been received?
  paymentStatus: text("payment_status").notNull().default("pending"),

  // Where is the order in the fulfillment process?
  orderStatus: text("order_status").notNull().default("processing"),

  // "delivery" or "pickup"
  deliveryType: text("delivery_type").notNull().default("delivery"),

  // Delivery address (stored as JSON string)
  deliveryAddress: text("delivery_address"),

  // Payment gateway transaction ID (from payment provider)
  transactionId: text("transaction_id"),

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// ORDER_ITEMS TABLE
// The individual products inside an order
// (Same idea as cart_items, but for completed orders)
// ─────────────────────────────────────────────
export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  quantity: integer("quantity").notNull(),

  // Price locked in at time of purchase
  price: integer("price").notNull(),
});
