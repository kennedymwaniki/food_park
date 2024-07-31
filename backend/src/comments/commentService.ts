import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { comments, TIComments, TSComments } from "../drizzle/schema";

export const getAllCommentsService = async (): Promise<TSComments[] | null> => {
  const commentItems = await db.query.comments.findMany();
  return commentItems;
};

export const getCommentByIdService = async (id: number) => {
  const comment = await db.query.comments.findFirst({
    where: eq(comments.id, id),
  });
  return comment;
};

export const createCommentService = async (comment: TIComments) => {
  const newComment = await db.insert(comments).values(comment);
  return newComment;
};

export const updateCommentService = async (id: number, comment: TIComments) => {
  const updatedComment = await db
    .update(comments)
    .set(comment)
    .where(eq(comments.id, id));
  return updatedComment;
};

export const deleteCommentService = async (id: number) => {
  await db.delete(comments).where(eq(comments.id, id));
  return "Comment successfully deleted";
};