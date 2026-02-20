// ═══════════════════════════════════════════════════════════
// GET /api/events
// ═══════════════════════════════════════════════════════════
// URL EXAMPLES:
//   /api/events                → all events
//   /api/events?type=weddings  → only wedding events

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getEvents, getEventTypes } from "@/db/event-queries";

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || undefined;

    // Get the events
    const result = await getEvents(db, type);

    // Also return the list of event types (for filter dropdown)
    const types = await getEventTypes(db);

    return NextResponse.json({ ...result, eventTypes: types });
  } catch (error) {
    console.error("Events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
