// ═══════════════════════════════════════════════════════════
// GET /api/events/[slug]
// ═══════════════════════════════════════════════════════════
// Returns full details of a single event, including gallery and flowers.
//
// URL: /api/events/bridal-florals
// [slug] = "bridal-florals"

import { NextResponse } from "next/server";
import { getDb } from "@/lib/get-db";
import { getEventBySlug } from "@/db/event-queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = await getDb();
    const event = await getEventBySlug(db, slug);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
