// This file provides a helper to get environment variables
// from Cloudflare's runtime.
//
// WHAT ARE ENVIRONMENT VARIABLES?
// They are secret values stored OUTSIDE your code, like:
//   - JWT_SECRET (for signing login tokens)
//   - Database passwords
//   - API keys
//
// WHY NOT JUST HARDCODE THEM?
// Because you don't want secrets in your code (which is on GitHub).
// Instead, they live in wrangler.jsonc (locally) and
// Cloudflare dashboard (in production).
//
// USAGE:
//   const env = await getEnv();
//   console.log(env.JWT_SECRET); // → "petals-super-secret-..."

import { getCloudflareContext } from "@opennextjs/cloudflare";

// Define the shape of our environment variables
// This tells TypeScript what variables exist and their types
export interface Env {
  DB: D1Database;      // Our D1 database
  JWT_SECRET: string;  // Secret key for signing JWT tokens
}

// Get the environment variables from Cloudflare
export async function getEnv(): Promise<Env> {
  const { env } = await getCloudflareContext({ async: true });
  const typedEnv = env as unknown as Env;

  if (!typedEnv.JWT_SECRET) {
    console.error("❌ CRITICAL ERROR: JWT_SECRET is not set in the environment.");
    throw new Error(
      "MISSING JWT_SECRET: Please set this as a secret in Cloudflare. " +
      "Run: npx wrangler secret put JWT_SECRET"
    );
  }

  return typedEnv;
}
