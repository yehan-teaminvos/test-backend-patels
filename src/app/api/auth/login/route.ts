// ═══════════════════════════════════════════════════════════
// POST /api/auth/login
// ═══════════════════════════════════════════════════════════
// Logs in an existing user.
//
// REQUEST BODY:
//   { "email": "yehan@test.com", "password": "mypass123" }
//
// RESPONSE (success):
//   { "success": true, "user": { "id": 1, "name": "Yehan" } }
//   + sets a cookie in the browser
//
// RESPONSE (error):
//   { "error": "Invalid email or password" }

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getUserByEmail, validatePassword, createSession } from "@/db/auth-queries";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // ① Read the request body
    const body = (await request.json()) as { email?: string; password?: string };
    const { email, password } = body;

    // ② Validate
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ③ Find the user by email
    const db = await getDb();
    const user = await getUserByEmail(db, email);

    // We say "Invalid email or password" (not "User not found")
    // WHY? So attackers can't figure out which emails are registered
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 } // 401 = "Unauthorized"
      );
    }

    // ④ Compare the password
    // validatePassword("mypass123", "$2a$10$K7L1OJ45...")
    //   → hashes "mypass123" the same way → checks if they match
    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ⑤ Password is correct! Create a session + JWT token
    const session = await createSession(db, user.id);
    const token = await signToken({ userId: user.id });

    // ⑥ Set the cookie in the browser
    // After this, every future request will include this cookie
    await setSessionCookie(token);

    // ⑦ Return success
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Something went wrong", detail: message },
      { status: 500 }
    );
  }
}
