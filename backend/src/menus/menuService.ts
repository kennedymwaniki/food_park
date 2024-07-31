import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { menu, TIMenu, TSMenu } from "../drizzle/schema";

export const getAllMenuItemsService = async (): Promise<TSMenu[] | null> => {
  const menuItems = await db.query.menu.findMany();
  return menuItems;
};

export const getMenuItemByIdService = async (id: number) => {
  const menuItem = await db.query.menu.findFirst({
    where: eq(menu.id, id),
  });
  return menuItem;
};

export const createMenuItemService = async (menuItem: TIMenu) => {
  const newMenuItem = await db.insert(menu).values(menuItem);
  return newMenuItem;
};

export const updateMenuItemService = async (id: number, menuItem: TIMenu) => {
  const updatedMenuItem = await db
    .update(menu)
    .set(menuItem)
    .where(eq(menu.id, id));
  return updatedMenuItem;
};

export const deleteMenuItemService = async (id: number) => {
  await db.delete(menu).where(eq(menu.id, id));
  return "Menu item successfully deleted";
};