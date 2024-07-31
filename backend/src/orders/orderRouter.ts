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
orderRouter.get("/order/:id", getOrder);
orderRouter.post("/order", createOrder);
orderRouter.delete("/order/:id", createOrder);
