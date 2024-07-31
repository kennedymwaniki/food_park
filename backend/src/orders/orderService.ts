import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { orders, TIOrders, TSOrders } from "../drizzle/schema";
import { Context } from "hono";

export const getAllOrdersService = async (): Promise<TSOrders[] | null> => {
  const Orders = await db.query.orders.findMany();
  return Orders;
};

export const getOrderByIdServcice = async (id: number) => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
  });
  return order;
};

export const createOrderService = async (order: TIOrders) => {
  const Order = db.insert(orders).values(order);
  return Order;
};

export const updateOrderService = async (id: number, order: TIOrders) => {
  const updatedOrder = await db
    .update(orders)
    .set(order)
    .where(eq(orders.id, id));
  return updatedOrder;
};

export const deleteOrderService = async (id: number) => {
  await db.delete(orders).where(eq(orders.id, id));
  return "order Successfully deleted";
};
