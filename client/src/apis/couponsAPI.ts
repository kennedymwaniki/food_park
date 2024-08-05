import { TVouchers } from "./../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vouchersAPI = createApi({
  reducerPath: "voucherssAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["getVouchers"],

  endpoints: (builder) => ({
    getVouchers: builder.query<TVouchers, void>({
      query: () => ({
        method: "GET",
        url: "vouchers",
        providesTags: ["getVouchers"],
      }),
    }),
    createVouchers: builder.mutation<TVouchers, void>({
      query: (voucher) => ({
        method: "POST",
        url: "vouchers",
        body: voucher,
        providesTags: ["createVoucher"],
      }),
      invalidatesTags: ["getVouchers"],
    }),
    deleteVoucher: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        method: "DELETE",
        url: `vouchers/${id}`,
        providesTags: ["deletVoucher"],
      }),
      invalidatesTags: ["getVouchers"],
    }),
  }),
});

export default vouchersAPI;
