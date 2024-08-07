import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOrders } from "../types/types";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  tagTypes: ["getOrders"],
  endpoints: (builder) => ({
    getOrders: builder.query<TOrders[], void>({
      query: () => ({
        url: "orders",
        method: "GET",
        providesTags: ["getOrders"],
      }),
    }),
    getOrderById: builder.query<TOrders, void>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
        providesTags: ["getOrderById"],
      }),
    }),
    createOrder: builder.mutation<TOrders, void>({
      query: (order) => ({
        method: "POST",
        url: "orders",
        body: order,
        providesTags: ["createOrders"],
      }),
      invalidatesTags: ["getOrders"],
    }),
    deletOrder: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        method: "DELETE",
        url: `orders/${id}`,
        providesTags: ["deletOrder"],
      }),
      invalidatesTags: ["getOrders"],
    }),
    updateOrder: builder.mutation<TOrders, Partial<TOrders>>({
      query: ({ id, ...rest }) => ({
        method: "PUT",
        url: `order/${id}`,
        body: rest,
        providesTags: ["updateOrder"],
      }),
      invalidatesTags: ["getOrders"],
    }),
  }),
});
