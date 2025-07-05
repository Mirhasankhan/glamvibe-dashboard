import { baseApi } from "../../api/baseApi";

const expertApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    experts: builder.query({
      query: (id) => ({
        url: `/expert/all?categoryId=${id}`,
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
  }),
});

export const { useExpertsQuery, useCancelBookingMutation } = expertApi;
