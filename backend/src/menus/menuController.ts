import { Context } from "hono";
import {
  getAllMenuItemsService,
  getMenuItemByIdService,
  createMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
} from "./menuService";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { menu } from "../drizzle/schema";

export const getMenuItems = async (c: Context) => {
  const menuItems = await getAllMenuItemsService();
  return c.json(menuItems);
};

export const getMenuItem = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const menuItem = await getMenuItemByIdService(id);
  if (!menuItem) {
    return c.json({ error: "No such menu item is available" }, 404);
  }

  return c.json(menuItem, 200);
};

export const createMenuItem = async (c: Context) => {
  try {
    const menuItem = await c.req.json();
    
    // Check if the menu item already exists
    const existingItem = await db.query.menu.findFirst({
      where: eq(menu.name, menuItem.name),
    });
    
    if (existingItem) {
      return c.json({ error: "Menu item already exists" }, 400);
    }
    
    const createdMenuItem = await createMenuItemService(menuItem);
    return c.json(createdMenuItem, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateMenuItem = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await c.req.json();
    const menuItemExists = await getMenuItemByIdService(id);
    if (!menuItemExists) return c.text("Sorry no such menu item exists", 404);

    const updatedMenuItem = await updateMenuItemService(id, menuItem);
    return c.json({ msg: updatedMenuItem });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteMenuItem = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItemExists = await getMenuItemByIdService(id);
    if (!menuItemExists) return c.text("Menu item could not be found");

    const res = await deleteMenuItemService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};