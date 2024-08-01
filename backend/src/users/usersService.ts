import {  eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TIUser, TSUser, users } from "../drizzle/schema";

export const getUsersService = async (): Promise<TSUser[] | null> => {
  const users = await db.query.users.findMany();
  return users;
};

export const getUserService = async (id: number): Promise<TSUser | void> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return user;
};

export const createUserService = async (user: TIUser) => {
  const newUser = db.insert(users).values(user);
  return newUser;
};

export const deletUserService = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  return "User Successfully deleted";
};

export const getAllUserRelationsService = async (id: number) => {
  const userRelations = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      contactPhone: true,
      email: true,
      image: true,
      fullname: true,
    },
    with: {
      comments: {
        columns: {
          id: true,
          title: true,
          content: true,
        },
      },
      reviews: {
        columns: {
          content: true,
          rating: true,
          id: true,
        },
      },
      address: {
        columns: {
          street: true,
          city: true,
          addresstype: true,
          house: true,
        },
      },
      reservations: {
        columns: {
          id: true,
          date: true,
          drinks: true,
          guests: true,
          special: true,
        },
      },
    },
  });

  return userRelations;
};
