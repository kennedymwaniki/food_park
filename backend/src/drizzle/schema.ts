import {
  pgTable,
  serial,
  integer,
  varchar,
  date,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const menu = pgTable("menu", {
  id: serial("menuId").primaryKey(),
  image: varchar("image").notNull(),
  name: varchar("name").notNull(),
  price: integer("price").notNull(),
});

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: serial("userId").primaryKey(),
  image: varchar("image"),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  role: roleEnum("role").default("user").notNull(),
});

export const addressEnum = pgEnum("addressType", ["home", "offiice"]);
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
  code: varchar("voucherCode").notNull(),
  validity: integer("validPeriod"),
  status: validityEnum("status").default("unused"),
});

export const orderEnum = pgEnum("orderStatus", [
  "pending",
  "confirmed",
  "ready",
]);

export const orders = pgTable("orders", {
  id: serial("orderId").primaryKey(),
  totalPrice: integer("totalPrice").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  orderStatus: orderEnum("orderStatus").default("pending"),
  priority: boolean("priority"),
  createdAt: timestamp("create_at", { mode: "string" }).defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("commentId").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(),
});
