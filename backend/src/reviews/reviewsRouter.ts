import { Hono } from "hono";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "./reviewsController";

export const reviewsRouter = new Hono();

reviewsRouter.get("/reviews", getReviews);
reviewsRouter.get("/reviews/:id", getReview);
reviewsRouter.post("/reviews", createReview);
reviewsRouter.put("/reviews/:id", updateReview);
reviewsRouter.delete("/reviews/:id", deleteReview);
