import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  varchar,
  date,
  timestamp,
  pgEnum,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const menu = pgTable("menu", {
  id: serial("menuId").primaryKey(),
  image: varchar("image").notNull(),
  name: varchar("name").notNull(),
  price: integer("price").notNull(),
  description: varchar("description").notNull(),
});

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("user_id").primaryKey(),
  image: varchar("image"),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  contactPhone: integer("phone").notNull(),
  role: roleEnum("role").default("user").notNull(),
});

export const addressEnum = pgEnum("addressType", ["home", "office"]);
export const address = pgTable("address", {
  id: serial("addressId").primaryKey(),
  house: varchar("house").notNull(),
  street: varchar("street").notNull(),
  city: varchar("city").notNull(),
  addresstype: addressEnum("addresstype").default("home").notNull(),
});

export const validityEnum = pgEnum("valid", ["unused", "used"]);
export const vouchers = pgTable("vouchers", {
  id: serial("voucherId").primaryKey(),
  code: varchar("voucher_code").notNull(),
  validity: integer("valid_period").notNull(),
  status: validityEnum("status").default("unused"),
});

export const orderEnum = pgEnum("orderStatus", [
  "pending",
  "confirmed",
  "ready",
]);

export const orderSizeEnum = pgEnum("size", ["large", "small", "medium"]);
export const orders = pgTable("orders", {
  id: serial("orderId").primaryKey(),
  total_price: integer("total_price").notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  order_status: orderEnum("order_status").default("pending"),
  size: orderSizeEnum("size").default("small"),
  priority: boolean("priority"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("commentId").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("reviewId").primaryKey(),
  user_id: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: date("created_at", { mode: "string" }).defaultNow(),
  rating: integer("rating").notNull(),
});

//! types for all tables tables
export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;

export type TIMenu = typeof menu.$inferInsert;
export type TSMenu = typeof menu.$inferSelect;

export type TSReviews = typeof reviews.$inferSelect;
export type TIReviews = typeof reviews.$inferInsert;

export type TSComments = typeof comments.$inferSelect;
export type TIComments = typeof comments.$inferInsert;

export type TSOrders = typeof orders.$inferSelect;
export type TIOrders = typeof orders.$inferInsert;

export type TSVoucher = typeof vouchers.$inferSelect;
export type TIVouchers = typeof vouchers.$inferInsert;

export type TSAddress = typeof address.$inferSelect;
export type TIAddress = typeof address.$inferInsert;

//! end of types

export const UserCommentRelations = relations(users, ({ many }) => ({
  comments: many(comments),
}));
