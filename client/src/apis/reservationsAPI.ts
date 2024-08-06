import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { TReservations } from "../types/types";

export const reservationsAPI = createApi({
  reducerPath: "reservationsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["getReservations"],
  endpoints: (builder) => ({
    getReservations: builder.query<TReservations, void>({
      query: () => ({
        method: "GET",
        url: "reservations",
        providesTags: ["getReservations"],
      }),
    }),
    createReservation: builder.mutation<TReservations, void>({
      query: (reservation) => ({
        method: "POST",
        url: "reservations",
        body: reservation,
        providesTags: ["getReservations"],
      }),
      invalidatesTags: ["getReservations"],
    }),
    deleteReservation: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query: (id) => ({
        method: "DELETE",
        url: `reservaton/${id}`,
        providesTags: ["deleteReservations"],
      }),
      invalidatesTags: ["getReservations"],
    }),
  }),
});

export default reservationsAPI;
