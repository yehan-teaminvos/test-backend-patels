// ═══════════════════════════════════════════════════════════
// EVENT QUERIES — Functions to read events from the DB
// ═══════════════════════════════════════════════════════════

import { eq } from "drizzle-orm";
import {
  events,
  eventTypes,
  eventGallery,
  eventStoryImages,
  flowers,
  eventFlowers,
  eventInquiries,
} from "./event-schema";
import type { Database } from "./client";

// ─────────────────────────────────────────
// GET ALL EVENT TYPES
// ─────────────────────────────────────────
// Returns: ["Weddings", "Corporate Events", "Private Celebrations", "Workshops"]
//
export async function getEventTypes(db: Database) {
  return db.select().from(eventTypes).all();
}

// ─────────────────────────────────────────
// GET ALL EVENTS (optionally filtered by event type)
// ─────────────────────────────────────────
// Examples:
//   getEvents(db)                    → all events
//   getEvents(db, "weddings")        → only wedding events
//   getEvents(db, "corporate-events") → only corporate events
//
export async function getEvents(db: Database, typeSlug?: string) {
  if (typeSlug) {
    // First find the event type ID
    const eventType = await db
      .select()
      .from(eventTypes)
      .where(eq(eventTypes.slug, typeSlug))
      .get();

    if (!eventType) return { eventType: null, events: [] };

    // Then get all events of that type
    const typeEvents = await db
      .select()
      .from(events)
      .where(eq(events.eventTypeId, eventType.id))
      .all();

    return { eventType, events: typeEvents };
  }

  // No filter → return all events
  const allEvents = await db.select().from(events).all();
  return { eventType: null, events: allEvents };
}

// ─────────────────────────────────────────
// GET A SINGLE EVENT BY SLUG (full details)
// ─────────────────────────────────────────
// This returns EVERYTHING about an event:
//   - The event details
//   - All gallery images
//   - All flowers used
//   - Story images
//
// Used on the event detail page: /event/weddings/bridal-florals
//
export async function getEventBySlug(db: Database, slug: string) {
  // Get the event
  const event = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .get();

  if (!event) return null;

  // Get the event type (e.g. "Weddings")
  const eventType = await db
    .select()
    .from(eventTypes)
    .where(eq(eventTypes.id, event.eventTypeId))
    .get();

  // Get all gallery photos for this event
  const gallery = await db
    .select()
    .from(eventGallery)
    .where(eq(eventGallery.eventId, event.id))
    .all();

  // Get story section images
  const storyImages = await db
    .select()
    .from(eventStoryImages)
    .where(eq(eventStoryImages.eventId, event.id))
    .all();

  // Get all flowers used in this event
  // We need to JOIN event_flowers with flowers to get the flower details
  const flowersUsed = await db
    .select({
      id: flowers.id,
      name: flowers.name,
      image: flowers.image,
    })
    .from(eventFlowers)
    .innerJoin(flowers, eq(eventFlowers.flowerId, flowers.id))
    .where(eq(eventFlowers.eventId, event.id))
    .all();

  return {
    ...event,
    eventType,
    gallery,
    storyImages,
    flowersUsed,
  };
}

// ─────────────────────────────────────────
// CREATE AN EVENT INQUIRY
// ─────────────────────────────────────────
// When someone fills out the "Plan Your Event" contact form
//
export async function createEventInquiry(
  db: Database,
  data: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    eventDate?: string;
    eventTypeId?: number;
  }
) {
  const result = await db
    .insert(eventInquiries)
    .values(data)
    .returning();

  return result[0];
}
