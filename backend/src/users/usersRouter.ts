import { Hono } from "hono";
import {
  getUsers,
  createUser,
  deletUser,
  getAllUserRelations,
  updateUser,
  getUser,
} from "./usersControler";

export const userRouter = new Hono();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUser);
userRouter.put("/user/:id", updateUser);
userRouter.get("/userRelations/:id", getAllUserRelations);
userRouter.post("/users", createUser);
userRouter.delete("/user/:id", getUser);
