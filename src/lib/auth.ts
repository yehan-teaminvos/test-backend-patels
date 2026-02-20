// ═══════════════════════════════════════════════════════════
// AUTH HELPERS — Login tokens & cookies
// ═══════════════════════════════════════════════════════════
//
// This file handles 3 things:
//   1. JWT TOKENS — creating and verifying login tokens
//   2. COOKIES — storing the token in the user's browser
//   3. SESSION — reading the current logged-in user
//
// ─────────────────────────────────────────
// WHAT IS A JWT TOKEN?
// ─────────────────────────────────────────
// JWT = JSON Web Token
// It's like a signed ID card. It contains:
//   { userId: 5, email: "yehan@test.com", exp: 1708300800 }
//
// It's "signed" with your JWT_SECRET so nobody can fake it.
// If someone changes the data, the signature breaks → token rejected.
//
// ─────────────────────────────────────────
// WHAT IS A COOKIE?
// ─────────────────────────────────────────
// A cookie is a small piece of data the browser stores.
// When you set a cookie, the browser sends it with EVERY request.
// So after login, every request automatically includes the token.
//
// We use "httpOnly" cookies — this means JavaScript in the browser
// CANNOT read the cookie. Only the server can. This prevents hackers
// from stealing tokens with XSS attacks.

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getEnv } from "./env";

// The name of our cookie in the browser
const COOKIE_NAME = "petals-session";

// How long a login session lasts (7 days in seconds)
const SESSION_DURATION = 7 * 24 * 60 * 60; // 604800 seconds

// ─────────────────────────────────────────
// 1. CREATE A JWT TOKEN
// ─────────────────────────────────────────
// Called when a user successfully logs in.
// Takes their userId and creates a signed token.
//
// Example:
//   const token = await signToken({ userId: 5 });
//   // token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQ..."
//
export async function signToken(payload: { userId: number }): Promise<string> {
  const env = await getEnv();

  // Convert the secret string to bytes (jose requires this format)
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  // Create and sign the token
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Algorithm: HMAC SHA-256
    .setIssuedAt()                         // When the token was created
    .setExpirationTime(`${SESSION_DURATION}s`) // When it expires
    .sign(secret);                         // Sign it with our secret

  return token;
}

// ─────────────────────────────────────────
// 2. VERIFY A JWT TOKEN
// ─────────────────────────────────────────
// Called on every request to check if the token is valid.
// If someone tampered with it, this will fail.
//
// Example:
//   const data = await verifyToken("eyJhbGci...");
//   // data = { userId: 5 } (or null if invalid/expired)
//
export async function verifyToken(
  token: string
): Promise<{ userId: number } | null> {
  try {
    const env = await getEnv();
    const secret = new TextEncoder().encode(env.JWT_SECRET);

    // jwtVerify checks:
    // 1. Is the signature valid? (not tampered)
    // 2. Is it expired?
    // If either fails → throws error → we return null
    const { payload } = await jwtVerify(token, secret);

    return { userId: payload.userId as number };
  } catch {
    // Token is invalid or expired
    return null;
  }
}

// ─────────────────────────────────────────
// 3. SET THE SESSION COOKIE
// ─────────────────────────────────────────
// After login, we store the token in a cookie.
// The browser will then send this cookie with every future request.
//
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,   // JavaScript in the browser CANNOT read this cookie
    secure: true,     // Only sent over HTTPS (not plain HTTP)
    sameSite: "lax",  // Protects against CSRF attacks
    maxAge: SESSION_DURATION, // Cookie expires after 7 days
    path: "/",        // Cookie is sent on ALL pages
  });
}

// ─────────────────────────────────────────
// 4. GET THE CURRENT SESSION FROM COOKIE
// ─────────────────────────────────────────
// Called on protected pages/routes to check if user is logged in.
// Reads the cookie → verifies the token → returns userId.
//
// Example:
//   const session = await getSession();
//   if (!session) return Response.json({ error: "Not logged in" }, { status: 401 });
//   // session.userId = 5
//
export async function getSession(): Promise<{ userId: number } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // No cookie = not logged in
  if (!token) return null;

  // Verify the token (check signature + expiration)
  return verifyToken(token);
}

// ─────────────────────────────────────────
// 5. CLEAR THE SESSION COOKIE (LOGOUT)
// ─────────────────────────────────────────
// Deletes the cookie from the browser → user is logged out.
//
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
