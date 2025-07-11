"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useAllServicesQuery } from "@/redux/features/service/service.api";
import { useState } from "react";
import { useCategoriesQuery } from "@/redux/features/reviews/reviewApi";

const AllServices = () => {
  const { data: categories } = useCategoriesQuery("");

  const [categoryId, setCategoryId] = useState("");
  const { data: services, isLoading } = useAllServicesQuery(categoryId);
  console.log(services?.result);

  return (
    <div>
      <div className="p-5 my-6 bg-white">
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
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                Service Details
              </TableHead>
              <TableHead>Category</TableHead>        
              <TableHead>Price</TableHead>
              <TableHead>Overview</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500"
                >
                  <Loader2
                    size={50}
                    className="animate-spin mx-auto  text-primary"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {services?.result?.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {service?.serviceName}
                    </div>
                  </TableCell>
                  <TableCell>{service?.category?.categoryName}</TableCell>
                  <TableCell>{service?.price}</TableCell>
                  <TableCell>{service?.description}</TableCell>
                  <TableCell>{service?.avgRating || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="bg-green-200 text-green-800 rounded-lg py-1 px-3 font-semibold">
                        Edit
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default AllServices;
