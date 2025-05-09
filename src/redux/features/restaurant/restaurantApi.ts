import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (roomInfo) => ({
        url: "/room/create",
        method: "POST",
        body: roomInfo,
      }),
      invalidatesTags: ["hotel"],
    }),
    updateRoom: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/room/update/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["hotel"],
    }),
  }),
});

export const { useCreateRoomMutation, useUpdateRoomMutation } = roomApi;
