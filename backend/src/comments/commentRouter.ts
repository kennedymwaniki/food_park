import { Hono } from "hono";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from "./commentControler";

export const commentsRouter = new Hono();

commentsRouter.get("/comments", getComments);
commentsRouter.get("/comments/:id", getComment);
commentsRouter.post("/comments", createComment);
commentsRouter.put("/comments/:id", updateComment);
commentsRouter.delete("/comments/:id", deleteComment);