import { db } from "../drizzle/db";
import { TSUser, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { sql } from "drizzle-orm";

interface TUser {
  id: number;
  fullname: string;
  role: string;
  password: string;
  email: string;
  phone: number;
  image: string;
}

export const registerAuthService = async (user: any): Promise<TSUser> => {
  try {
    //check user from controller exists
    const userExists = await db.query.users.findFirst({
      where: sql`${users.email} = ${user.email}`,
      //   where: eq(users.email, user.email),
    });
    if (userExists) {
      throw new Error("A User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const createdUser = await db
      .insert(users)
      .values({
        fullname: user.fullname,
        image: user.image,
        email: user.email,
        contactPhone: user.phone,
        password: user.password,
        role: user.role || "user",
      })
      .returning();
    console.log(
      "This is the registered user in Authsrevice register:",
      createdUser
    );

    return createdUser[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};

export const loginAuthService = async (user: TSUser) => {
  try {
    //check if an email exists
    console.log("The user we get in the AuthService is:", user);
    const { email } = user;
    const authUser = await db.query.users.findFirst({
      columns: {
        id: true,
        contactPhone: true,
        email: true,
        fullname: true,
        role: true,
        password: true,
      },
      where: sql`${users.email} = ${email}`,
    });

    return authUser;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};
