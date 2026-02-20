// This file creates a Drizzle client from a D1 database instance
//
// WHAT IS A "CLIENT"?
// Think of it like a TV remote control.
// The database (D1) is the TV.
// The client (Drizzle) is the remote — it lets you control the TV easily.
//
// Without Drizzle, you'd have to write raw SQL:
//   db.exec("SELECT * FROM products WHERE price < 5000")
//
// With Drizzle, you write TypeScript:
//   db.select().from(products).where(lt(products.price, 5000))
//
// Both do the same thing. Drizzle just makes it type-safe and easier.

import { drizzle } from "drizzle-orm/d1";

// Import all our schema tables so Drizzle knows about them
import * as productSchema from "./schema";
import * as authSchema from "./auth-schema";
import * as orderSchema from "./order-schema";
import * as eventSchema from "./event-schema";

// Combine all schemas into one object
const schema = {
  ...productSchema,
  ...authSchema,
  ...orderSchema,
  ...eventSchema,
};

// This function takes a raw D1 database and returns a Drizzle-powered client
// You pass in the D1 database (which comes from Cloudflare's environment)
// and get back a nice TypeScript-friendly database client
export function createDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

// Export the type so other files know what type the DB client is
export type Database = ReturnType<typeof createDb>;
