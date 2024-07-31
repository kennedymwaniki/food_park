import { Hono } from "hono";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./menuController";

export const menuRouter = new Hono();

menuRouter.get("/menu", getMenuItems);
menuRouter.get("/menu/:id", getMenuItem);
menuRouter.post("/menu", createMenuItem);
menuRouter.put("/menu/:id", updateMenuItem);
menuRouter.delete("/menu/:id", deleteMenuItem);