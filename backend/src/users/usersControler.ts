import { Context } from "hono";
import {
  createUserService,
  deletUserService,
  getAllUserRelationsService,
  getUserService,
  getUsersService,
} from "./usersService";

export const getUsers = async (c: Context) => {
  const users = await getUsersService();
  return c.json(users);
};

export const getUser = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  //get user
  const user = await getUserService(id);
  if (!user) return c.text("No such user exists", 404);
  return c.json(user, 201);
};

export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const createdUser = await createUserService(user);
    return c.json(createdUser, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();

    const userAvailable = await getUserService(id);
    if (!userAvailable) return c.text("No such user exists", 404);

    const updatedUser = await createUserService(user);
    return c.json(updatedUser, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deletUser = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserService(id);
    if (!user) return c.text("No such user exists", 404);

    const deleted = await deletUserService(id);
    if (!deleted) return c.text("Could not delete user");

    return c.json({ message: "User deleted" }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const getAllUserRelations = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const UserRelations = await getAllUserRelationsService(id);
    if (!UserRelations) {
      return c.json({
        error: "We could not find such a user or their relations",
      });
    }

    return c.json(UserRelations, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
