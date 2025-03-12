import { InferSelectModel } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["subagen", 'agen'])
export const verifyEnum = pgEnum("verify", ["pending", "verified", "unverified"])

export const subagens = pgTable("subagens", {
  id: uuid("id").primaryKey().defaultRandom(),
  kode: integer("kode").unique(),
  wilayah: text("wilayah").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
})
export const subagensRelations = relations(subagens, ({ many }) => ({
  users: many(users),
  orders: many(orders)
}))

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").unique(),
  role: roleEnum("role").notNull().default("subagen"),
  isVerified: verifyEnum("is_verified").notNull().default("pending"),
  subagenId: uuid('subagen_id').references(() => subagens.id, {onDelete: 'cascade'}),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

export const usersRelations = relations(users, ({ one, many }) => ({
  subagen: one(subagens, {
    fields: [users.subagenId],
    references: [subagens.id]
  }),
  orders: many(orders)
}));

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
  subagenId: uuid("subagen_id").notNull().references(() => subagens.id, {onDelete: "cascade"}),
  stok: integer("stok").notNull(),
  sisa: integer("sisa").notNull(),
  order: integer("order").notNull(),
  terjual: integer("terjual").notNull(),
  catatan: text("catatan"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  }),
  subagen: one(subagens, {
    fields: [orders.subagenId],
    references: [subagens.id]
  })
}))

export type SubagenType = InferSelectModel<typeof subagens>
export type UserType = InferSelectModel<typeof users>
export type OrderType = InferSelectModel<typeof orders>