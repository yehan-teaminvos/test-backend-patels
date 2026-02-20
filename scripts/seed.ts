// ═══════════════════════════════════════════════════════════
// SEED SCRIPT — Fill the database with real data
// ═══════════════════════════════════════════════════════════
//
// WHAT IS SEEDING?
// Your database tables are empty right now. This script fills them
// with real data from your existing static files (products.ts, events).
//
// HOW IT WORKS:
// 1. This script generates a .sql file with INSERT statements
// 2. We run that .sql file against the local D1 database using Wrangler
//
// USAGE:
//   npx tsx scripts/seed.ts        → generates seed.sql
//   Then apply with wrangler

import * as fs from "fs";
import * as path from "path";
import { hash } from "bcryptjs";

// ─── Our static data (typed manually to avoid import issues) ───

const products = [
  { id: "FL-1", name: "Blush Harmony", slug: "blush-harmony", productImage: "/home/flower1.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 8750, flowerType: "tulips", color: "mixed", occasions: ["graduation", "weddings", "anniversary"], availability: "in-stock", rating: 2, reviews: 10 },
  { id: "FL-2", name: "Sunshine Radiance", slug: "sunshine-radiance", productImage: "/home/flower2.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "sunflowers", color: "red", occasions: ["graduation", "weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-3", name: "RedRose Bliss", slug: "redrose-bliss-3", productImage: "/home/flower3.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-4", name: "RedRose Bliss", slug: "redrose-bliss-4", productImage: "/home/flower4.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-5", name: "RedRose Bliss", slug: "redrose-bliss-5", productImage: "/home/flower3.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-6", name: "RedRose Bliss", slug: "redrose-bliss-6", productImage: "/home/flower2.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-7", name: "RedRose Bliss", slug: "redrose-bliss-7", productImage: "/home/flower4.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-8", name: "RedRose Bliss", slug: "redrose-bliss-8", productImage: "/home/flower1.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "out-of-stock", rating: 4, reviews: 10 },
  { id: "FL-9", name: "RedRose Bliss", slug: "redrose-bliss-9", productImage: "/home/flower1.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-10", name: "Sunshine Radiance", slug: "sunshine-radiance-10", productImage: "/home/flower2.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "sunflowers", color: "red", occasions: ["graduation", "weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-11", name: "RedRose Bliss", slug: "redrose-bliss-11", productImage: "/home/flower3.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-12", name: "RedRose Bliss", slug: "redrose-bliss-12", productImage: "/home/flower4.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-13", name: "RedRose Bliss", slug: "redrose-bliss-13", productImage: "/home/flower3.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-14", name: "RedRose Bliss", slug: "redrose-bliss-14", productImage: "/home/flower2.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-15", name: "RedRose Bliss", slug: "redrose-bliss-15", productImage: "/home/flower4.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
  { id: "FL-16", name: "RedRose Bliss", slug: "redrose-bliss-16", productImage: "/home/flower1.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "out-of-stock", rating: 4, reviews: 10 },
  { id: "FL-17", name: "RedRose Bliss", slug: "redrose-bliss-17", productImage: "/home/flower1.avif", description: "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.", price: 5750, flowerType: "roses", color: "white", occasions: ["weddings", "anniversary"], availability: "in-stock", rating: 4, reviews: 10 },
];

// ─── Helper: escape single quotes for SQL ───
function esc(str: string): string {
  return str.replace(/'/g, "''");
}

const now = Math.floor(Date.now() / 1000);

async function main() {
  const lines: string[] = [];

  lines.push("-- ═══════════════════════════════════════════════");
  lines.push("-- SEED DATA for Petals Florist Database");
  lines.push(`-- Generated at: ${new Date().toISOString()}`);
  lines.push("-- ═══════════════════════════════════════════════");
  lines.push("");

  // ─────────────────────────────────────────
  // 0. USERS (Test Account)
  // ─────────────────────────────────────────
  lines.push("-- Test User");
  const testPassword = await hash("password123", 10);
  lines.push(`INSERT OR IGNORE INTO users (name, email, password, phone, created_at) VALUES ('Test User', 'test@example.com', '${testPassword}', '0771234567', ${now});`);
  lines.push("");

  // ─────────────────────────────────────────
  // 1. OCCASIONS
  // ─────────────────────────────────────────
  const occasionsList = [
    { name: "Weddings", slug: "weddings" },
    { name: "Anniversary", slug: "anniversary" },
    { name: "Graduation", slug: "graduation" },
    { name: "Birthday", slug: "birthday" },
    { name: "Sympathy", slug: "sympathy" },
    { name: "Get Well", slug: "get-well" },
    { name: "Thank You", slug: "thank-you" },
    { name: "Just Because", slug: "just-because" },
  ];

  lines.push("-- Occasions");
  for (const occ of occasionsList) {
    lines.push(`INSERT OR IGNORE INTO occasions (name, slug) VALUES ('${esc(occ.name)}', '${esc(occ.slug)}');`);
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 2. COLORS
  // ─────────────────────────────────────────
  const colorsList = [
    { name: "Red", slug: "red", hexCode: "#DC2626" },
    { name: "Pink", slug: "pink", hexCode: "#EC4899" },
    { name: "White", slug: "white", hexCode: "#FFFFFF" },
    { name: "Yellow", slug: "yellow", hexCode: "#EAB308" },
    { name: "Purple", slug: "purple", hexCode: "#9333EA" },
    { name: "Orange", slug: "orange", hexCode: "#EA580C" },
    { name: "Mixed", slug: "mixed", hexCode: "#8B5CF6" },
  ];

  lines.push("-- Colors");
  for (const color of colorsList) {
    lines.push(`INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('${esc(color.name)}', '${esc(color.slug)}', '${color.hexCode}');`);
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 3. PRODUCTS
  // ─────────────────────────────────────────
  lines.push("-- Products");
  for (const p of products) {
    const inStock = p.availability === "in-stock" ? 1 : 0;
    lines.push(
      `INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('${esc(p.id)}', '${esc(p.name)}', '${esc(p.slug)}', '${esc(p.description)}', ${p.price}, '${esc(p.flowerType)}', '${esc(p.productImage)}', ${inStock}, ${p.rating}, ${p.reviews}, 1, ${now});`
    );
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 4. PRODUCT ↔ OCCASION LINKS
  // ─────────────────────────────────────────
  lines.push("-- Product-Occasion links");
  for (const p of products) {
    for (const occ of p.occasions) {
      // Find the occasion index (1-based for SQLite auto-increment)
      const occIndex = occasionsList.findIndex((o) => o.slug === occ) + 1;
      if (occIndex > 0) {
        lines.push(
          `INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('${esc(p.id)}', ${occIndex});`
        );
      }
    }
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 5. PRODUCT ↔ COLOR LINKS
  // ─────────────────────────────────────────
  lines.push("-- Product-Color links");
  for (const p of products) {
    const colorIndex = colorsList.findIndex((c) => c.slug === p.color) + 1;
    if (colorIndex > 0) {
      lines.push(
        `INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('${esc(p.id)}', ${colorIndex});`
      );
    }
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 6. EVENT TYPES
  // ─────────────────────────────────────────
  const eventTypesList = [
    { name: "Weddings", slug: "weddings", description: "Beautiful wedding floral arrangements", image: "/event/service1.png" },
    { name: "Corporate Events", slug: "corporate-events", description: "Professional floral designs for corporate events", image: "/event/service2.png" },
    { name: "Private Celebrations", slug: "private-celebrations", description: "Custom floral arrangements for private celebrations", image: "/event/service3.png" },
    { name: "Workshops", slug: "workshops", description: "Floral design workshops and classes", image: "/event/service4.png" },
  ];

  lines.push("-- Event Types");
  for (const et of eventTypesList) {
    lines.push(
      `INSERT OR IGNORE INTO event_types (name, slug, description, image) VALUES ('${esc(et.name)}', '${esc(et.slug)}', '${esc(et.description)}', '${esc(et.image)}');`
    );
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 7. EVENTS + GALLERIES + FLOWERS
  // ─────────────────────────────────────────

  interface EventCard {
    slug: string;
    cardTitle: string;
    cardsectitle?: string;
    cardImage: string;
    cardDescription: string;
    gallery: { src: string; alt: string; width: number; height: number; className: string; span?: string }[];
    storySection?: { title: string; paragraphs: string[]; images: string[] };
    flowersUsed?: { name: string; image: string }[];
  }

  interface EventCategory {
    title: string;
    cardsectitle?: string;
    featuresCards: EventCard[];
  }

  const eventsData: Record<string, EventCategory> = {
    "weddings": {
      title: "Weddings",
      featuresCards: [
        { slug: "bridal-florals", cardTitle: "Bridal Florals", cardImage: "/event/event-services/wedding/w1.avif", cardDescription: "Cinnamon Gardens, Colombo | August 18, 2025", storySection: { title: "Ethereal Garden Romance", paragraphs: ["This garden wedding in the heart of Colombo was designed to reflect elegance, intimacy, and natural beauty.", "The floral concept focused on creating a serene, romantic atmosphere."], images: ["/event/event-services/wedding/image1.png", "/event/event-services/wedding/image1.png"] }, flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Garden Roses", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Orchids", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "ceremony-design", cardTitle: "Ceremony Design", cardImage: "/event/event-services/wedding/w2.avif", cardDescription: "Grand ceremony arches and aisle arrangements.", storySection: { title: "Ethereal Garden Romance", paragraphs: ["This garden wedding was designed to reflect elegance.", "The floral concept focused on romance."], images: ["/event/event-services/wedding/image1.png"] }, flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Peonies", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Hydrangeas", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "reception-decor", cardTitle: "Reception Decor", cardImage: "/event/event-services/wedding/w3.avif", cardDescription: "Elegant centerpieces and floral installations.", flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Roses", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Lilies", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "special-touches", cardTitle: "Special Touches", cardImage: "/event/event-services/wedding/w4.avif", cardDescription: "Boutonnières, corsages, and cake flowers.", flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Baby's Breath", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Carnations", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "bridal-party-florals", cardTitle: "Bridal Party Florals", cardImage: "/event/event-services/wedding/w5.avif", cardDescription: "Stunning bridal bouquets and bridesmaid arrangements.", flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Garden Roses", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Ranunculus", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "ceremony-arrangements", cardTitle: "Ceremony Arrangements", cardImage: "/event/event-services/wedding/w6.avif", cardDescription: "Grand ceremony arches and aisle arrangements.", flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Eucalyptus", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Dahlias", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "reception-centerpieces", cardTitle: "Reception Centerpieces", cardImage: "/event/event-services/wedding/w7.avif", cardDescription: "Elegant centerpieces and floral installations.", flowersUsed: [{ name: "Temple Flowers", image: "/event/event-services/wedding/flowers/flower1.avif" }, { name: "Chrysanthemums", image: "/event/event-services/wedding/flowers/flower2.avif" }, { name: "Tulips", image: "/event/event-services/wedding/flowers/flower3.avif" }], gallery: [] },
        { slug: "finishing-touches", cardTitle: "Finishing Touches", cardImage: "/event/event-services/wedding/w3.avif", cardDescription: "Boutonnières, corsages, and cake flowers.", gallery: [] },
      ],
    },
    "corporate-events": {
      title: "Corporate Event Florals",
      featuresCards: [
        { slug: "conference-florals", cardTitle: "Conference Florals", cardImage: "/event/service2.png", cardDescription: "Professional floral arrangements for conferences and seminars.", gallery: [] },
        { slug: "product-launches", cardTitle: "Product Launches", cardImage: "/event/service2.png", cardDescription: "Eye-catching installations for product launch events.", gallery: [] },
        { slug: "gala-dinners", cardTitle: "Gala Dinners", cardImage: "/event/service2.png", cardDescription: "Sophisticated centerpieces for corporate gala dinners.", gallery: [] },
        { slug: "office-events", cardTitle: "Office Events", cardImage: "/event/service2.png", cardDescription: "Elegant arrangements for office celebrations.", gallery: [] },
      ],
    },
    "private-celebrations": {
      title: "Private Celebration Florals",
      featuresCards: [
        { slug: "birthday-parties", cardTitle: "Birthday Parties", cardImage: "/event/service3.png", cardDescription: "Vibrant floral designs for memorable birthday celebrations.", gallery: [] },
        { slug: "anniversaries", cardTitle: "Anniversaries", cardImage: "/event/service3.png", cardDescription: "Romantic arrangements for anniversary milestones.", gallery: [] },
        { slug: "baby-showers", cardTitle: "Baby Showers", cardImage: "/event/service3.png", cardDescription: "Delicate florals for baby showers and gender reveals.", gallery: [] },
        { slug: "special-occasions", cardTitle: "Special Occasions", cardImage: "/event/service3.png", cardDescription: "Custom designs for graduations, retirements, and holidays.", gallery: [] },
      ],
    },
    "workshops": {
      title: "Floral Design Workshops",
      featuresCards: [
        { slug: "beginner-classes", cardTitle: "Beginner Classes", cardImage: "/event/service4.png", cardDescription: "Learn the fundamentals of floral design.", gallery: [] },
        { slug: "seasonal-workshops", cardTitle: "Seasonal Workshops", cardImage: "/event/service4.png", cardDescription: "Create beautiful seasonal arrangements with expert guidance.", gallery: [] },
        { slug: "bridal-masterclass", cardTitle: "Bridal Masterclass", cardImage: "/event/service4.png", cardDescription: "Master the art of creating stunning bridal bouquets.", gallery: [] },
        { slug: "team-building", cardTitle: "Team Building", cardImage: "/event/service4.png", cardDescription: "Corporate team building through creative floral design.", gallery: [] },
      ],
    },
  };

  // Collect all unique flowers
  const allFlowers = new Map<string, string>(); // name → image
  let eventId = 0;

  lines.push("-- Events");
  const eventTypeKeys = ["weddings", "corporate-events", "private-celebrations", "workshops"];

  for (let typeIdx = 0; typeIdx < eventTypeKeys.length; typeIdx++) {
    const typeKey = eventTypeKeys[typeIdx];
    const typeData = eventsData[typeKey];
    const eventTypeId = typeIdx + 1; // matches auto-increment IDs

    for (const card of typeData.featuresCards) {
      eventId++;
      const storyTitle = card.storySection?.title || null;
      const storyP1 = card.storySection?.paragraphs[0] || null;
      const storyP2 = card.storySection?.paragraphs[1] || null;

      lines.push(
        `INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (${eventId}, '${esc(card.cardTitle)}', '${esc(card.slug)}', '${esc(card.cardDescription)}', '${esc(card.cardImage)}', ${eventTypeId}, ${storyTitle ? `'${esc(storyTitle)}'` : "NULL"}, ${storyP1 ? `'${esc(storyP1)}'` : "NULL"}, ${storyP2 ? `'${esc(storyP2)}'` : "NULL"}, ${eventId <= 3 ? 1 : 0}, 1, ${now});`
      );

      // Story images
      if (card.storySection?.images) {
        for (let i = 0; i < card.storySection.images.length; i++) {
          lines.push(
            `INSERT OR IGNORE INTO event_story_images (event_id, src, sort_order) VALUES (${eventId}, '${esc(card.storySection.images[i])}', ${i});`
          );
        }
      }

      // Collect flowers
      if (card.flowersUsed) {
        for (const flower of card.flowersUsed) {
          allFlowers.set(flower.name, flower.image);
        }
      }
    }
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 8. FLOWERS
  // ─────────────────────────────────────────
  lines.push("-- Flowers");
  const flowerEntries = Array.from(allFlowers.entries());
  for (let i = 0; i < flowerEntries.length; i++) {
    const [name, image] = flowerEntries[i];
    lines.push(
      `INSERT OR IGNORE INTO flowers (id, name, image) VALUES (${i + 1}, '${esc(name)}', '${esc(image)}');`
    );
  }
  lines.push("");

  // ─────────────────────────────────────────
  // 9. EVENT ↔ FLOWER LINKS
  // ─────────────────────────────────────────
  lines.push("-- Event-Flower links");
  eventId = 0;
  for (const typeKey of eventTypeKeys) {
    const typeData = eventsData[typeKey];
    for (const card of typeData.featuresCards) {
      eventId++;
      if (card.flowersUsed) {
        for (const flower of card.flowersUsed) {
          const flowerIdx = flowerEntries.findIndex(([n]) => n === flower.name) + 1;
          if (flowerIdx > 0) {
            lines.push(
              `INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (${eventId}, ${flowerIdx});`
            );
          }
        }
      }
    }
  }
  lines.push("");

  // ─── Write to file ───
  const outputPath = path.join(process.cwd(), "src", "db", "seed.sql");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
  console.log(`✅ Seed SQL written to: ${outputPath}`);
  console.log(`   ${lines.filter((l) => l.startsWith("INSERT")).length} INSERT statements`);
  console.log("");
  console.log("Next, run:");
  console.log("  npx wrangler d1 execute petals-db --local --file=src/db/seed.sql");
}

main().catch(console.error);
