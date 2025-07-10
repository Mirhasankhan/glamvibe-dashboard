"use client";

import { useState } from "react";
import { useCategoriesQuery } from "@/redux/features/reviews/reviewApi";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { useExpertsQuery } from "@/redux/features/expert/expert.api";

const AllEmployees = () => {
  const [categoryId, setCategoryId] = useState("");
  const { data: categories } = useCategoriesQuery("");
  const { data: employees } = useExpertsQuery(categoryId);
  console.log(employees?.result);

  return (
    <div className="p-5 mt-6 bg-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold pb-4">Experts</h1>
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select a category</option>
          {categories?.result?.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div>
        {employees?.result?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {employees?.result?.map((expert: any) => (
              <div
            className="bg-white rounded-[4px] p-2 shadow-lg flex flex-col items-center"
            key={expert.id}
          >
            <Image
              alt="expert"
              className="object-cover rounded-[4px] h-[280px] w-full"
              height={300}
              width={500}
              src={expert.imageUrl}
            />

            <div className="bg-white text-center py-6">
              <h1 className="text-xl">{expert.name}</h1>
              <p className="pt-2">{expert.category.categoryName} Expert</p>
            </div>
            <div className="flex gap-4 text-xl">
              <div className="bg-white text-primary hover:bg-primary hover:text-white border border-primary p-1">
                <FaFacebookF size={13} />
              </div>
              <div className="bg-white text-primary hover:bg-primary hover:text-white border border-primary p-1">
                <FaInstagram size={13} />
              </div>
              <div className="bg-white text-primary hover:bg-primary hover:text-white border border-primary p-1">
                <FaTwitter size={13} />
              </div>
            </div>
          </div>
            ))}
          </div>
        ) : (
          "Not found"
        )}
      </div>
    </div>
  );
};

export default AllEmployees;
