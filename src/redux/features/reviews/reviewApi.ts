import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allReviews: builder.query({
      query: (restaurantId) => ({
        url: `/review?id=${restaurantId}`,
        method: "GET",
      }),
    }),
    categories: builder.query({
      query: () => ({
        url: `/category/all`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAllReviewsQuery, useCategoriesQuery , useCreateCategoryMutation} = reviewApi;
