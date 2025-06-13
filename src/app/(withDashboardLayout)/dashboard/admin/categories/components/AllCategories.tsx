"use client";
import { useCategoriesQuery } from "@/redux/features/reviews/reviewApi";
import { TCategory } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";

const AllCategories = () => {
  const { data: categories,isLoading } = useCategoriesQuery("");

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {categories?.result?.map((category:TCategory) => (
        <Link href="/dashboard/admin/services" className="relative rounded-xl border" key={category.id}>
          <Image className="rounded-t-xl h-60 w-full object-cover" height={300} width={400} src={category?.mediaUrls[1]} alt="categoryImage"></Image>
          <div className="p-6">
            <h1 className="text-xl font-medium">{category?.categoryName}</h1>
            <p>{category?.overview}</p>
          </div>
          <p className="absolute right-4 bottom-28 bg-primary text-white rounded-xl px-3 py-0.5 font-medium">{category?.service?.length} Services</p>
        </Link>
      ))}
    </div>
  );
};

export default AllCategories;
