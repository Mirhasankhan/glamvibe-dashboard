"use client";
import { IFormInput } from "@/types/common";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateCategoryMutation } from "@/redux/features/reviews/reviewApi";
import { toast } from "sonner";

const AddCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();

    const bodyData = {
      categoryName: data.categoryName,
      overview: data.overview,
      description: data.description,
    };
    formData.append("bodyData", JSON.stringify(bodyData));

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    await createCategory(formData);
    toast.success("Category Created Successfully");
    reset();
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="my-8 flex gap-3 font-medium items-center bg-primary text-white px-6 py-2 rounded-xl"
      >
        <Plus className="font-medium" size={20}></Plus> Add New Category
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="overflow-hidden border-2 border-dashed border-gray-500 rounded-lg p-6"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-8">
                <div className="w-full">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Category Name
                  </label>
                  <input
                    className="input-design"
                    type="text"
                    placeholder="Enter category name"
                    {...register("categoryName", {
                      required: "Category name is required",
                    })}
                  />
                  {errors.categoryName && (
                    <span className="text-red-400">
                      {errors.categoryName.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Upload Media
                  </label>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedFiles(Array.from(e.target.files)); // Store files in state
                      }
                    }}
                    className="input-design"
                    type="file"
                    multiple
                  />
                </div>
              </div>

              <div>
                <div className="w-full mt-2">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Overview
                  </label>
                  <input
                    className="input-design"
                    type="text"
                    placeholder="write short overview"
                    {...register("overview", {
                      required: "Overview is required",
                    })}
                  />
                  {errors.overview && (
                    <span className="text-red-400">
                      {errors.overview.message}
                    </span>
                  )}
                </div>
                <div className="w-full mt-2">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Description
                  </label>
                  <textarea
                    className="input-design"
                    placeholder="write description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <span className="text-red-400">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-6">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="text-white text-center mt-6 bg-primary px-4 py-2 rounded-md font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="mx-auto animate-spin"></Loader2>
                  ) : (
                    "Add Category"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border text-center mt-6 bg-white px-4 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCategory;
