import { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["subagen", 'agen'])
export const verifyEnum = pgEnum("verify", ["pending", "verified", "unverified"])

export const subagens = pgTable("subagens", {
  id: uuid("id").primaryKey().defaultRandom(),
  kode: integer("kode").unique(),
  wilayah: text("wilayah").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp"),
  role: roleEnum("role").notNull().default("subagen"),
  isVerified: verifyEnum("is_verified").notNull().default("pending"),
  subagenId: uuid('subagen_id').references(() => subagens.id),
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

export type SubagenType = InferSelectModel<typeof subagens>
export type UserType = InferSelectModel<typeof users>
export type OrderType = InferSelectModel<typeof orders>