"use client";

import { useState } from "react";
import { useCategoriesQuery } from "@/redux/features/reviews/reviewApi";
import Image from "next/image";
import { useExpertsQuery } from "@/redux/features/expert/expert.api";

const AllEmployees = () => {
  const [categoryId, setCategoryId] = useState("");
  const { data: categories } = useCategoriesQuery("");
  const { data: employees } = useExpertsQuery(categoryId);
  console.log(employees?.result);

  return (
    <div className="p-5 mt-6 bg-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold pb-4">Services</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {employees?.result?.map((employee: any) => (
              <div key={employee.id}>
                <Image
                  src={employee.imageUrl}
                  height={400}
                  width={400}
                  alt="profile"
                ></Image>
                <h1>{employee.name}</h1>
                <h1>{employee.category.categoryName}</h1>
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
