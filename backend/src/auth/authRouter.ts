import { Hono } from "hono";
import { loginUser, registerUser } from "./authController";

export const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
