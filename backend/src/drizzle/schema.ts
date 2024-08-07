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
  fullname: varchar("fullname"),
  image: varchar("image", { length: 256 }),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  contactPhone: integer("phone").notNull(),
  role: roleEnum("role").default("user").notNull(),
});

export const addressEnum = pgEnum("addressType", ["home", "office"]);
export const address = pgTable("address", {
  id: serial("addressId").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
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
  discount: integer("discount"),
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
  order_number: varchar("order_number"),
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
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  created_at: date("created_at", { mode: "string" }).defaultNow(),
  rating: integer("rating").notNull(),
});

export const drinks = pgEnum("drinktype", ["hard drinks", "soft drinks"]);
export const reservations = pgTable("reservations", {
  id: serial("reservationId").primaryKey(),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  date: date("reservationdate", { mode: "string" }).notNull(),
  guests: integer("guests").notNull(),
  drinks: drinks("drinks").default("soft drinks").notNull(),
  special: boolean("special_ocassion").notNull(),
});

//! types for all tables tables
export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;

export type TIMenu = typeof menu.$inferInsert;
export type TSMenu = typeof menu.$inferSelect;

export type TSReviews = typeof reviews.$inferSelect;
export type TIReviews = typeof reviews.$inferInsert;

export type TIReservations = typeof reservations.$inferInsert;
export type TSReservations = typeof reservations.$inferSelect;

export type TSComments = typeof comments.$inferSelect;
export type TIComments = typeof comments.$inferInsert;

export type TSOrders = typeof orders.$inferSelect;
export type TIOrders = typeof orders.$inferInsert;

export type TSVoucher = typeof vouchers.$inferSelect;
export type TIVouchers = typeof vouchers.$inferInsert;

export type TSAddress = typeof address.$inferSelect;
export type TIAddress = typeof address.$inferInsert;

//! end of types

export const UserRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  orders: many(orders),
  reviews: many(reviews),
  comments: many(comments),
  address: many(address),
}));

// Define the relationships for the reservations table
export const ReservationRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.user_id],
    references: [users.id],
  }),
}));

// Define the relationships for the orders table
export const OrderRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
}));

// Define the relationships for the reviews table
export const ReviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.user_id],
    references: [users.id],
  }),
}));

// Define the relationships for the comments table
export const CommentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.user_id],
    references: [users.id],
  }),
}));

// Define the relationships for the address table
export const AddressRelations = relations(address, ({ one }) => ({
  user: one(users, {
    fields: [address.user_id],
    references: [users.id],
  }),
}));
