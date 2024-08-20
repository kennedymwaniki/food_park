import { TCode, TVouchers } from "./../types/types";
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
        // providesTags: ["createVoucher"],
      }),
      invalidatesTags: ["getVouchers"],
    }),
    updateVoucher: builder.mutation<TVouchers, Partial<TVouchers>>({
      query: ({ id, ...rest }) => ({
        url: `vouchers/${id}`,
        method: "PUT",
        body: rest,
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
    getVoucherByCode: builder.query<TVouchers, TCode>({
      query: (code) => ({
        method: "POST",
        url: "vouchers/voucher",
        body: code,
        providesTags: ["getVoucherByCode"],
      }),
    }),
  }),
});

export default vouchersAPI;
