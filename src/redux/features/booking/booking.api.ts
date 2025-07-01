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
      query: () => ({
        url: `/booking/admin-bookings`,
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

export const { useBookingsQuery, useCancelBookingMutation, useAdminBookingsQuery,useConfirmBookingMutation} =
  bookingApi;
