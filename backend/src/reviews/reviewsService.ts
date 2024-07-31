import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { reviews, TIReviews, TSReviews } from "../drizzle/schema";

export const getAllReviewsService = async (): Promise<TSReviews[] | null> => {
  const reviewItems = await db.query.reviews.findMany();
  return reviewItems;
};

export const getReviewByIdService = async (id: number) => {
  const reviewItem = await db.query.reviews.findFirst({
    where: eq(reviews.id, id),
  });
  return reviewItem;
};

export const createReviewService = async (reviewItem: TIReviews) => {
  const newReview = await db.insert(reviews).values(reviewItem);
  return newReview;
};

export const updateReviewService = async (id: number, reviewItem: TIReviews) => {
  const updatedReview = await db
    .update(reviews)
    .set(reviewItem)
    .where(eq(reviews.id, id));
  return updatedReview;
};

export const deleteReviewService = async (id: number) => {
  await db.delete(reviews).where(eq(reviews.id, id));
  return "Review successfully deleted";
};