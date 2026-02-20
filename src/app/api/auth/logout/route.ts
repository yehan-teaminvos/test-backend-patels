// ═══════════════════════════════════════════════════════════
// POST /api/auth/logout
// ═══════════════════════════════════════════════════════════
// Logs out the current user by clearing their cookie.
//
// No request body needed — we read the cookie to know who to log out.
//
// RESPONSE: { "success": true }

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    // Simply delete the cookie from the browser
    // Without the cookie, the user is no longer "logged in"
    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
