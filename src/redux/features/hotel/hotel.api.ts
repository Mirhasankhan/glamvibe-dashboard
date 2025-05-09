import { baseApi } from "../../api/baseApi";

const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHotel: builder.mutation({
      query: (hotelInfo) => ({
        url: "/hotel/create",
        method: "POST",
        body: hotelInfo,
      }),
      invalidatesTags: ["hotel"],
    }),
    upload: builder.mutation({
      query: (images) => ({
        url: "/hotel/generate-url",
        method: "POST",
        body: images,
      }),
      invalidatesTags: ["hotel"],
    }),
    createCoupon: builder.mutation({
      query: (couponInfo) => ({
        url: "/coupon/create",
        method: "POST",
        body: couponInfo,
      }),
      invalidatesTags: ["hotel"],
    }),
    hotels: builder.query({
      query: (hotelId) => ({
        url: `/hotel/filtered?hotelId=${hotelId}`,
        method: "GET",
      }),
      providesTags: ["hotel"],
    }),
    cities: builder.query({
      query: () => ({
        url: `/city/cities`,
        method: "GET",
      }),
      providesTags: ["hotel"],
    }),
    topSelling: builder.query({
      query: () => ({
        url: `/hotel/top-revenue`,
        method: "GET",
      }),
      providesTags: ["hotel"],
    }),
  }),
});

export const {
  useUploadMutation,
  useCreateHotelMutation,
  useHotelsQuery,
  useCitiesQuery,
  useCreateCouponMutation,

  useTopSellingQuery,
} = hotelApi;
