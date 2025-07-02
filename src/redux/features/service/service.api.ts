import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (service) => ({
        url: `/service/create`,
        method: "POST",
        body: service,
      }),
    }),
    allServices: builder.query({
      query: (categoryId) => ({
        url: `/service/all?categoryId=${categoryId}`,
        method: "GET",
      }),
    }),
    allEmployee: builder.query({
      query: (categoryId) => ({
        url: `/expert/all?categoryId=${categoryId}`,
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
  useAddServiceMutation,
  useAllEmployeeQuery,
  useAllServicesQuery,
  useEditServiceMutation,
  useCreateCategoryMutation,
} = servicesApi;
