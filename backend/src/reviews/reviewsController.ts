import { Context } from "hono";
import {
  getAllReviewsService,
  getReviewByIdService,
  createReviewService,
  updateReviewService,
  deleteReviewService,
} from "./reviewsService";
import { eq, and } from "drizzle-orm";
import { db } from "../drizzle/db";
import { reviews } from "../drizzle/schema";

export const getReviews = async (c: Context) => {
  const reviewItems = await getAllReviewsService();
  return c.json(reviewItems);
};

export const getReview = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const reviewItem = await getReviewByIdService(id);
  if (!reviewItem) {
    return c.json({ error: "No such review is available" }, 404);
  }

  return c.json(reviewItem, 200);
};

export const createReview = async (c: Context) => {
  try {
    const reviewItem = await c.req.json();
    
    // Check if the review already exists (based on user_id and created_at)
    const existingReview = await db.query.reviews.findFirst({
      where: and(
        eq(reviews.user_id, reviewItem.user_id),
        eq(reviews.created_at, reviewItem.created_at)
      ),
    });
    
    if (existingReview) {
      return c.json({ error: "Review already exists for this user at this time" }, 400);
    }
    
    const createdReview = await createReviewService(reviewItem);
    return c.json(createdReview, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateReview = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reviewItem = await c.req.json();
    const reviewExists = await getReviewByIdService(id);
    if (!reviewExists) return c.text("Sorry no such review exists", 404);

    const updatedReview = await updateReviewService(id, reviewItem);
    return c.json({ msg: updatedReview });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteReview = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reviewExists = await getReviewByIdService(id);
    if (!reviewExists) return c.text("Review could not be found");

    const res = await deleteReviewService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};