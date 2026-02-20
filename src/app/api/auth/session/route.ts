// ═══════════════════════════════════════════════════════════
// GET /api/auth/session
// ═══════════════════════════════════════════════════════════
// Returns the currently logged-in user's info.
// Used by the frontend to check "is the user logged in?"
//
// If logged in:   { "user": { "id": 1, "name": "Yehan", "email": "yehan@test.com" } }
// If not logged in: { "user": null }

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/get-db";
import { getUserById } from "@/db/auth-queries";

export async function GET() {
  try {
    // ① Read the cookie and verify the JWT token
    const session = await getSession();

    // No valid session = not logged in
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // ② Get the user's info from the database
    const db = await getDb();
    const user = await getUserById(db, session.userId);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    // ③ Return user info (no password!)
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ user: null });
  }
}
