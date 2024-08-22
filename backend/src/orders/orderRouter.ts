import { Hono } from "hono";
import {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder,
} from "./orderController";

export const orderRouter = new Hono();

orderRouter.get("/orders", getOrders);
orderRouter.get("/orders/:id", getOrder);
orderRouter.post("/orders", createOrder);
orderRouter.delete("/orders/:id", createOrder);
