import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { orderRouter } from "./orders/orderRouter";
import { userRouter } from "./users/usersRouter";

const app = new Hono();
app.use(cors());
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", orderRouter);
app.route("/api", userRouter);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
