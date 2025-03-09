import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["belum_terverifikasi", "subagen", 'agen'])

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: roleEnum("role").notNull().default("belum_terverifikasi"),
  kode: integer("kode"),
  subagen: text('subagen'),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  order: integer("order").notNull(),
  terjual: integer("terjual").notNull(),
  sisa: integer("sisa").notNull(),
  stok: integer("stok").notNull(),
  catatan: text("catatan"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})