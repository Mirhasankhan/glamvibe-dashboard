"use client";
import {
  useCitiesQuery,
  useCreateHotelMutation,
  useUploadMutation,
} from "@/redux/features/hotel/hotel.api";
import { IFormInput } from "@/types/common";
import { Loader2, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { activeProp } from "./AllHotels";
import Image from "next/image";

const AddHotel = ({ setActive }: activeProp) => {
  const [files, setFiles] = useState<File[]>([]);
  const { data: cities } = useCitiesQuery("");
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const [upload] = useUploadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };
  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (files.length === 0) {
      toast.error("An image is required!");
      return;
    }
    const formData = new FormData();

    files.forEach((file) => formData.append("fileUrl", file));
    const res = await upload(formData);
    const { latitude, longitude, hotelDescription, ...rest } = data;
    const hotelDetails = {
      ...rest,
      description: hotelDescription,
      locationData: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
      mediaUrls: res.data.result,
    };
    const response: any = await createHotel(hotelDetails);
    if (response.data) {
      toast.success(response.data.message);
    } else if (response.error) {
      toast.error(response?.error?.data?.message);
    }

    setFiles([]);
    reset();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold pb-6">Add Hotel</h1>
      <div className="bg-white rounded-md p-6 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-gray-50 border rounded-lg flex flex-col items-center justify-center py-8">
            <div
              onClick={handleDivClick}
              className="border-2 mb-2 p-1 cursor-pointer rounded-full border-primary"
            >
              <Upload size={20} className="text-primary " />
            </div>
            <h1 className="text-gray-500">Upload Image</h1>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 overflow-hidden rounded-md"
                >
                  <Image
                    className="rounded-lg h-20 w-20 object-cover"
                    alt=""
                    src={URL.createObjectURL(file)}
                    width={150}
                    height={150}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:flex space-y-3 md:space-y-0 gap-6 my-3">
            <div className="w-full">
              <input
                className="input-design"
                type="text"
                placeholder="Hotel Name"
                {...register("hotelName", {
                  required: "Hotel name is required",
                })}
              />
              {errors.hotelName && (
                <span className="text-red-400">{errors.hotelName.message}</span>
              )}
            </div>

            <div className="w-full">
              <select
                className="input-design"
                {...register("cityId", { required: "City is required" })}
              >
                <option value="">Select City</option>
                {cities?.result?.map(
                  (city: { id: string; cityName: string }) => (
                    <option key={city.id} value={city.id}>
                      {city.cityName}
                    </option>
                  )
                )}
              </select>
              {errors.cityId && (
                <span className="text-red-400">{errors.cityId.message}</span>
              )}
            </div>
          </div>
          <div className="md:flex space-y-3 md:space-y-0 gap-6">
            <div className="w-full">
              <input
                className="input-design"
                type="number"
                placeholder="Price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <span className="text-red-400">{errors.price.message}</span>
              )}
            </div>
            <div className="w-full">
              <input
                className="input-design"
                type="text"
                placeholder="Contact"
                {...register("contact", { required: "Contact is required" })}
              />
              {errors.contact && (
                <span className="text-red-400">{errors.contact.message}</span>
              )}
            </div>
          </div>
          <div className="md:flex space-y-3 md:space-y-0 my-3 gap-6">
            <div className="w-full">
              <input
                className="input-design"
                type="number"
                placeholder="Discount"
                {...register("discount", {
                  // required: "Discount is required",
                  valueAsNumber: true,
                })}
              />
              {errors.discount && (
                <span className="text-red-400">{errors.discount.message}</span>
              )}
            </div>
            <div className="w-full">
              <input
                className="input-design"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="md:flex space-y-3 md:space-y-0 gap-6">
            <div className="w-full">
              <input
                step={"any"}
                className="input-design"
                type="number"
                placeholder="Latitude"
                {...register("latitude", {
                  required: "Latitude is required",
                  valueAsNumber: true,
                  min: -180,
                  max: 180,
                })}
              />
              {errors.latitude && (
                <span className="text-red-400">{errors.latitude.message}</span>
              )}
            </div>
            <div className="w-full">
              <input
                step="any"
                className="input-design"
                type="number"
                placeholder="Longitude"
                {...register("longitude", {
                  required: "Longitude is required",
                  valueAsNumber: true,
                  min: -180,
                  max: 180,
                })}
              />
              {errors.longitude && (
                <span className="text-red-400">{errors.longitude.message}</span>
              )}
            </div>
          </div>
          <div className="w-full mt-3">
            <textarea
              className="input-design"
              placeholder="Hotel Description"
              {...register("hotelDescription", {
                required: "Description is required",
              })}
            />
            {errors.hotelDescription && (
              <span className="text-red-400">
                {errors.hotelDescription.message}
              </span>
            )}
          </div>
          <div className="flex gap-6 mt-4 items-center justify-end">
            <h1
              onClick={() => setActive("list")}
              className="bg-gray-100 cursor-pointer text-gray-600 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </h1>
            <button
              disabled={isLoading}
              type="submit"
              className="text-white bg-primary px-4 py-2 rounded-md font-medium"
            >
              {isLoading ? (
                <Loader2 className="animate-spin"></Loader2>
              ) : (
                " Add Hotel"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
