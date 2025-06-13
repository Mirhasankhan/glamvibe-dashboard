import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allServices: builder.query({
      query: () => ({
        url: `/service/all`,
        method: "GET",
      }),
    }),
    editService: builder.mutation({
      query: () => ({
        url: `/category/all`,
        method: "PUT",
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

export const {
  useAllServicesQuery,
  useEditServiceMutation,
  useCreateCategoryMutation,
} = servicesApi;
