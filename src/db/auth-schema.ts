import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ─────────────────────────────────────────────
// USERS TABLE
// Stores customer accounts
// ─────────────────────────────────────────────
export const users = sqliteTable("users", {
  // Auto-incremented number ID (1, 2, 3...)
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Customer's full name
  name: text("name").notNull(),

  // Email address — must be unique (no two accounts with same email)
  email: text("email").notNull().unique(),

  // HASHED password (never store plain text!)
  // bcryptjs turns "mypassword" → "$2a$10$xyz..." (one-way scramble)
  password: text("password").notNull(),

  // Optional phone number
  phone: text("phone"),

  // When they registered
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});

// ─────────────────────────────────────────────
// SESSIONS TABLE
// When a user logs in, we create a "session" — like a login ticket
//
// HOW LOGIN WORKS:
// 1. User sends email + password
// 2. We check the password (using bcryptjs)
// 3. If correct, we create a session row here
// 4. We give the user a JWT token (via jose)
// 5. That token is stored in a cookie in their browser
// 6. Every request, we read the cookie → find the session → know who they are
// ─────────────────────────────────────────────
export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Which user is logged in?
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // The unique token stored in the browser cookie
  token: text("token").notNull().unique(),

  // When does this session expire? (Unix timestamp)
  // After this time, the user must log in again
  expiresAt: integer("expires_at").notNull(),

  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Math.floor(Date.now() / 1000)),
});
