import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookings: builder.query({
      query: ({ page }) => ({
        url: `/booking?page=${page}}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    adminBookings: builder.query({
      query: (page) => ({
        url: `/booking/admin-bookings?page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),    
    overview: builder.query({
      query: () => ({
        url: `/review/overview`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),    
    monthlyEarning: builder.query({
      query: () => ({
        url: `/booking/earning/monthly`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),    
    serviceBookings: builder.query({
      query: () => ({
        url: `/booking/service/count`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),    
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `booking/cancel/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),
    confirmBooking: builder.mutation({
      query: (bookingId) => ({
        url: `booking/confirm/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const { useBookingsQuery,useServiceBookingsQuery, useMonthlyEarningQuery, useOverviewQuery, useCancelBookingMutation, useAdminBookingsQuery,useConfirmBookingMutation} =
  bookingApi;
