import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser } from "../types/types";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["getUsers"],

  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => ({
        url: "users",
        method: "GET",
        providesTags: ["getUsers"],
      }),
    }),
    getUserById: builder.query<TUser, void>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
        providesTags: ["getUserById"],
      }),
    }),
    createUser: builder.mutation<TUser, void>({
      query: (user) => ({
        method: "POST",
        url: "users",
        body: user,
        providesTags: ["creatUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
        providesTags: ["deletUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
    updateUser: builder.mutation<TUser, Partial<TUser>>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
        providesTags: ["updateUser"],
      }),
      invalidatesTags: ["getUsers"],
    }),
  }),
});

// export const {useGetUsersQuery} = usersAPI;

export default usersAPI;
