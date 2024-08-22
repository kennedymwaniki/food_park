import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/types";

export interface logInUser {
  email: string;
  password: string;
}

export interface registerUser {
  fullName: string;
  password?: string;
  email: string;
  contactPhone: string;
  address: string;
}
export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vehicle-rental-backend-eg4t.onrender.com/api/auth/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, logInUser>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),

    // *! create a createuser endpoint which is a post request
    registerUser: builder.mutation<User, registerUser>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),

    logout: builder.mutation<null, void>({
      // Todo : use this on the profile dropdown menu and call this function the dispatch clear credentials and clear local storage
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export default loginAPI;
