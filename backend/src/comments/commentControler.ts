import { Context } from "hono";
import {
  getAllCommentsService,
  getCommentByIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from "./commentService";
import { eq, and } from "drizzle-orm";
import { db } from "../drizzle/db";
import { comments } from "../drizzle/schema";

export const getComments = async (c: Context) => {
  const commentItems = await getAllCommentsService();
  return c.json(commentItems);
};

export const getComment = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const comment = await getCommentByIdService(id);
  if (!comment) {
    return c.json({ error: "No such comment is available" }, 404);
  }

  return c.json(comment, 200);
};

export const createComment = async (c: Context) => {
  try {
    const comment = await c.req.json();

    // Check if the comment already exists (based on user_id and title)
    const existingComment = await db.query.comments.findFirst({
      where: and(
        eq(comments.user_id, comment.user_id),
        eq(comments.title, comment.title)
      ),
    });

    if (existingComment) {
      return c.json(
        { error: "Comment with this title already exists for this user" },
        400
      );
    }

    const createdComment = await createCommentService(comment);
    return c.json(createdComment, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateComment = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await c.req.json();
    const commentExists = await getCommentByIdService(id);
    if (!commentExists) return c.text("Sorry no such comment exists", 404);

    const updatedComment = await updateCommentService(id, comment);
    return c.json({ msg: updatedComment });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteComment = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const commentExists = await getCommentByIdService(id);
    if (!commentExists) return c.text("Comment could not be found");

    const res = await deleteCommentService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};
