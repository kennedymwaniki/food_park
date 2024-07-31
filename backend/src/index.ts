import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { orderRouter } from "./orders/orderRouter";
import { userRouter } from "./users/usersRouter";
import { reviewsRouter } from "./reviews/reviewsRouter";
import { reservationsRouter } from "./reservations/reservationRouter";
import { menuRouter } from "./menus/menuRouter";
import { vouchersRouter } from "./vouchers/voucherRouter";
import { addressRouter } from "./address/addressRouter";
import { commentsRouter } from "./comments/commentRouter";

//! remember
//TODO : CHECK THE EXISTENCE OF AN ITEM BEFORE YOU CREATE IT
//! remember

const app = new Hono();
app.use(cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", orderRouter);
app.route("/api", userRouter);
app.route("/api", reviewsRouter);
app.route("/api", reservationsRouter);
app.route("/api", menuRouter);
app.route("/api", vouchersRouter);
app.route("/api", addressRouter);
app.route("/api", commentsRouter);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
