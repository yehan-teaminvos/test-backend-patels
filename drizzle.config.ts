import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // What type of database? D1 uses SQLite under the hood
  dialect: "sqlite",

  // Where are your schema files? (we'll create these next)
  schema: [
    "./src/db/schema.ts",       // products, categories, occasions, colors, reviews
    "./src/db/auth-schema.ts",  // users, sessions
    "./src/db/order-schema.ts", // cart, orders, wishlist
    "./src/db/event-schema.ts", // events, galleries, flowers
  ],

  // Where should drizzle-kit put the generated SQL files?
  out: "./src/db/migrations",
});
