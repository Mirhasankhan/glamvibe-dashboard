import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allReviews: builder.query({
      query: (restaurantId) => ({
        url: `/review?id=${restaurantId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllReviewsQuery } = reviewApi;
