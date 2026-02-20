// ═══════════════════════════════════════════════════════════
// AUTH QUERIES — Functions for user registration & login
// ═══════════════════════════════════════════════════════════

import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/lib/password";
import { nanoid } from "nanoid";
import { users, sessions } from "./auth-schema";
import type { Database } from "./client";

// ─────────────────────────────────────────
// CREATE A NEW USER (Registration)
// ─────────────────────────────────────────
// 1. Check if email already exists
// 2. Hash the password (never store plain text!)
// 3. Insert into the users table
//
// Example:
//   const user = await createUser(db, {
//     name: "Yehan",
//     email: "yehan@test.com",
//     password: "mypassword123"
//   });
//
export async function createUser(
  db: Database,
  data: { name: string; email: string; password: string; phone?: string }
) {
  // Check if a user with this email already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .get();

  if (existing) {
    return { error: "Email already registered" };
  }

  // Hash the password
  // bcryptjs.hash("mypassword123", 10) →
  //   "$2a$10$K7L1OJ45..." (scrambled, one-way, can't undo)
  //
  // The number 10 is the "salt rounds" — how many times to scramble.
  // Higher = more secure but slower. 10 is the standard.
  const hashedPassword = await hashPassword(data.password);

  // Insert the new user into the database
  const result = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: hashedPassword, // ← save the HASH, not the real password
      phone: data.phone,
    })
    .returning(); // .returning() gives us back the inserted row

  return { user: result[0] };
}

// ─────────────────────────────────────────
// GET A USER BY EMAIL
// ─────────────────────────────────────────
// Used during login to find the user.
//
export async function getUserByEmail(db: Database, email: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();
}

// ─────────────────────────────────────────
// GET A USER BY ID
// ─────────────────────────────────────────
// Used to get user profile info.
//
export async function getUserById(db: Database, id: number) {
  return db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      createdAt: users.createdAt,
      // NOTE: We do NOT select the password here!
      // Never send the password hash to the frontend.
    })
    .from(users)
    .where(eq(users.id, id))
    .get();
}

// ─────────────────────────────────────────
// VALIDATE PASSWORD
// ─────────────────────────────────────────
// Compares the plain password the user typed
// with the hashed password stored in the database.
//
// bcryptjs.compare("mypassword123", "$2a$10$K7L1OJ45...")
//   → true (they match!)
//
// It does NOT "decrypt" the hash. Instead, it hashes the input
// the same way and checks if the results match.
//
export async function validatePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return verifyPassword(plainPassword, hashedPassword);
}

// ─────────────────────────────────────────
// CREATE A SESSION
// ─────────────────────────────────────────
// After successful login, we create a session in the DB.
// A session = a record that says "user #5 is logged in with token xyz"
//
// We use nanoid() to generate a unique random token.
// This token is stored both in the DB and in the user's cookie.
//
export async function createSession(db: Database, userId: number) {
  // Generate a unique token (like: "V1StGXR8_Z5jdHi6B-myT")
  const token = nanoid(32);

  // Session expires in 7 days
  const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  return { token, expiresAt };
}

// ─────────────────────────────────────────
// GET SESSION BY TOKEN
// ─────────────────────────────────────────
// When a request comes in with a cookie, we look up the session
// to find which user it belongs to.
//
export async function getSessionByToken(db: Database, token: string) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, token))
    .get();

  if (!session) return null;

  // Check if session has expired
  const now = Math.floor(Date.now() / 1000);
  if (session.expiresAt < now) {
    // Session expired → delete it and return null
    await db.delete(sessions).where(eq(sessions.token, token));
    return null;
  }

  return session;
}

// ─────────────────────────────────────────
// DELETE SESSION (Logout)
// ─────────────────────────────────────────
// Removes the session from the DB so the token is no longer valid.
//
export async function deleteSession(db: Database, token: string) {
  await db.delete(sessions).where(eq(sessions.token, token));
}

// ─────────────────────────────────────────
// DELETE ALL SESSIONS FOR A USER
// ─────────────────────────────────────────
// Useful for "Log out from all devices"
//
export async function deleteAllUserSessions(db: Database, userId: number) {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
