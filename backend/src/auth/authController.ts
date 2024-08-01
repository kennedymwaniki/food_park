import { loginAuthService, registerAuthService } from "./authService";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { Context } from "hono";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    console.log("Authcontroller register user is:", user);

    // // Get and hash the user password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(
      "this is the hashed users password in register controller",
      user.password
    );

    const createdUser = await registerAuthService(user);
    console.log(`the created user in the AuthController is:`, user);
    if (!createdUser) return c.text("User not created", 404);

    return c.json({ msg: "User created successfully" }, 201);
  } catch (error: any) {
    if (error.message === "A User with this email already exists") {
      return c.json({ error: "User with this email already exists" }, 400);
    }
    return c.json({ error: error?.message }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    console.log("Authcontroller login user is:", user);

    // check for email and password
    if (!user.email || !user.password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // check if user exists
    const existsUser = await loginAuthService(user);
    if (!existsUser) return c.json({ error: "User not found" }, 404);

    // compare the password provided by the user with the hashed password in the database
    const validPassword = await bcrypt.compare(
      user.password,
      existsUser?.password
    );

    console.log(
      "this is the password of the existing user",
      existsUser.password,
      "and the password of the incoming user is",
      user.password
    );

    console.log(
      "This is the valid Password in the login controller code",
      validPassword
    );

    if (!validPassword) {
      return c.json({ error: "Incorrect password" }, 401);
    } else {
      // create payload
      let payload = {
        email: existsUser.email,
        role: existsUser.role,
        fullname: existsUser.fullname,
        id: existsUser.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 180,
      };
      let secret = process.env.JWT_SECRET as string;
      const token = await sign(payload, secret); // Create a JWT token

      return c.json({
        token,
        user: {
          id: existsUser.id,
          email: existsUser.email,
          fullname: existsUser.email,
          role: existsUser.role,
        },
      });
    }
  } catch (error: any) {
    console.error("Error logging in:", error);
    return c.json({ error: error?.message }, 400);
  }
};
