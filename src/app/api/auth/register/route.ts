// ═══════════════════════════════════════════════════════════
// POST /api/auth/register
// ═══════════════════════════════════════════════════════════
// Creates a new user account.
//
// REQUEST BODY:
//   { "name": "Yehan", "email": "yehan@test.com", "password": "mypass123" }
//
// RESPONSE (success):
//   { "success": true, "user": { "id": 1, "name": "Yehan", "email": "yehan@test.com" } }
//
// RESPONSE (error):
//   { "error": "Email already registered" }

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { createUser, createSession } from "@/db/auth-queries";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // ① Read the request body (what the user sent)
    const body = (await request.json()) as {
      name?: string; email?: string; password?: string; phone?: string;
    };
    const { name, email, password, phone } = body;

    // ② Validate — make sure required fields are provided
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 } // 400 = "Bad Request" (you sent wrong data)
      );
    }

    // ③ Validate — password must be at least 6 characters
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ④ Get the database client
    const db = await getDb();

    // ⑤ Create the user (this hashes the password internally)
    const result = await createUser(db, { name, email, password, phone });

    // ⑥ Check if there was an error (like "email already exists")
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 409 });
      // 409 = "Conflict" (email already taken)
    }

    // ⑦ Auto-login: create a session + set cookie
    const session = await createSession(db, result.user.id);
    const token = await signToken({ userId: result.user.id });
    await setSessionCookie(token);

    // ⑧ Return success (don't send the password hash!)
    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Something went wrong", detail: message },
      { status: 500 }
    );
  }
}
