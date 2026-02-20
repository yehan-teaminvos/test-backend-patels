import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─────────────────────────────────────────────
// EVENT_TYPES TABLE
// The top-level categories of events
// e.g. "Weddings", "Corporate Events", "Private Celebrations", "Workshops"
// ─────────────────────────────────────────────
export const eventTypes = sqliteTable("event_types", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),           // "Weddings"
  slug: text("slug").notNull().unique(),  // "weddings"
  description: text("description"),
  // Cover image for this event type (shown on the events page)
  image: text("image"),
});

// ─────────────────────────────────────────────
// EVENTS TABLE
// Each individual event/portfolio entry
// e.g. "Bridal Florals", "Ceremony Design", "Conference Florals"
// ─────────────────────────────────────────────
export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // The event card title
  title: text("title").notNull(),       // "Bridal Florals"

  // URL-friendly version used in routes like /event/weddings/bridal-florals
  slug: text("slug").notNull().unique(), // "bridal-florals"

  // Short description shown on the card
  shortDescription: text("short_description"),

  // Full story shown on the event detail page
  fullDescription: text("full_description"),

  // Story section title (e.g. "Ethereal Garden Romance")
  storyTitle: text("story_title"),

  // Story section paragraph 1
  storyParagraph1: text("story_paragraph_1"),

  // Story section paragraph 2
  storyParagraph2: text("story_paragraph_2"),

  // Which event type does this belong to?
  eventTypeId: integer("event_type_id")
    .notNull()
    .references(() => eventTypes.id, { onDelete: "cascade" }),

  // Where the event took place
  location: text("location"),

  // When the event happened
  eventDate: text("event_date"),

  // The main card thumbnail image
  coverImage: text("cover_image").notNull(),

  // Section title shown on card (e.g. "Wedding Celebration")
  sectionTitle: text("section_title"),

  // Should this appear on the homepage featured section?
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),

  // Is this event visible on the website?
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// EVENT_GALLERY TABLE
// The gallery images for each event
// Each row = one photo in the event's photo gallery
// ─────────────────────────────────────────────
export const eventGallery = sqliteTable("event_gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Which event does this photo belong to?
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),

  src: text("src").notNull(),         // "/event/gallery/wedding1.avif"
  alt: text("alt"),                   // "Bridal Florals Gallery Image 1"
  width: integer("width"),            // 427
  height: integer("height"),          // 270
  // CSS class for grid layout ("w-full h-[270px] object-cover")
  className: text("class_name"),
  // Grid span ("row-2", "col-2-row-2", etc.)
  span: text("span"),
  // Order in which to display photos
  sortOrder: integer("sort_order").default(0),
});

// ─────────────────────────────────────────────
// EVENT_STORY_IMAGES TABLE
// The 2 side-by-side images in the story section
// ─────────────────────────────────────────────
export const eventStoryImages = sqliteTable("event_story_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  src: text("src").notNull(),
  sortOrder: integer("sort_order").default(0),
});

// ─────────────────────────────────────────────
// FLOWERS TABLE
// The types of flowers used in events
// e.g. "Temple Flowers", "Garden Roses", "Orchids"
// ─────────────────────────────────────────────
export const flowers = sqliteTable("flowers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),       // "Garden Roses"
  image: text("image"),               // "/event/.../flower2.avif"
});

// ─────────────────────────────────────────────
// PIVOT TABLE: event_flowers
// Links events to the flowers used in them (many-to-many)
//
// One event can use multiple flowers:
//   "Bridal Florals" → Temple Flowers, Garden Roses, Orchids
// ─────────────────────────────────────────────
export const eventFlowers = sqliteTable("event_flowers", {
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  flowerId: integer("flower_id")
    .notNull()
    .references(() => flowers.id, { onDelete: "cascade" }),
});

// ─────────────────────────────────────────────
// EVENT_INQUIRIES TABLE
// When someone fills out the "Plan Your Event" form
// ─────────────────────────────────────────────
export const eventInquiries = sqliteTable("event_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  eventDate: text("event_date"),
  // Which event type are they interested in?
  eventTypeId: integer("event_type_id").references(() => eventTypes.id),
  // "new" | "read" | "replied"
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});
