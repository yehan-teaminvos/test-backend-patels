// This file provides a simple function to get the database client
// from anywhere in your Next.js app (API routes, server components, etc.)
//
// HOW IT WORKS:
// 1. Your app runs on Cloudflare Workers
// 2. Cloudflare gives you an "environment" (env) with your bindings
// 3. One of those bindings is "DB" — your D1 database
// 4. We grab env.DB and wrap it with Drizzle
//
// USAGE (in any API route or server component):
//   import { getDb } from "@/lib/get-db";
//   const db = await getDb();
//   const allProducts = await db.select().from(products);

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createDb } from "@/db/client";

export async function getDb() {
  // getCloudflareContext() gives us access to Cloudflare's environment
  // This includes all the bindings we defined in wrangler.jsonc:
  //   env.JWT_SECRET → our secret key for tokens
  const { env } = await getCloudflareContext({ async: true });

  // env.DB is the raw D1 database
  // createDb() wraps it with Drizzle and returns a nice client
  return createDb(env.DB as D1Database);
}
