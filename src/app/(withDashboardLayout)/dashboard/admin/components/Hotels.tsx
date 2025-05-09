"use client";
import { useHotelsQuery } from "@/redux/features/hotel/hotel.api";
import { THotel } from "@/types/common";
import { Ellipsis, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";

const Hotels = () => {
  const { data: allHotels, isLoading } = useHotelsQuery("");

  return (
    <div className="bg-white min-h-[400px] p-5 rounded-md">
      <div className="flex justify-between items-center  pb-4">
        <h1 className="text-2xl font-semibold">Hotel List</h1>
        <Link
          href="/dashboard/admin/hotel-list"
          className="underline text-blue-700"
        >
          View All
        </Link>
      </div>
      {isLoading ? (
        <Ellipsis className="animate-ping mx-auto" />
      ) : (
        <>
          {allHotels?.result?.slice(0, 5).map((hotel: THotel) => (
            <div
              className="flex gap-4 mb-5 items-center  border-b pb-3"
              key={hotel.id}
            >
              <div>
                <Image
                  className="rounded-lg w-[80px] md:w-[60px] h-[80px] md:h-[60px] 2xl:w-[110px] 2xl:h-[110px] object-cover"
                  alt=""
                  src={hotel.mediaUrl}
                  width={130}
                  height={130}
                />
              </div>
              <div>
                <h1 className="font-semibold">{hotel.hotelName}</h1>
                <div className="flex items-center gap-1 py-1">
                  <MapPin size={15} className="text-orange-400" />
                  <h1 className="text-[#817F9B] font-semibold">
                    {hotel.cityName}
                  </h1>
                </div>
                <div className="flex md:text-xs 2xl:text-[16px] items-center">
                  <h1 className="text-primary font-medium pr-1">
                    ${hotel.salePrice} /
                  </h1>
                  <h1>
                    Night
                    <span className="text-[#FFC107] pl-1 font-medium">
                      {hotel.discount}% of
                    </span>
                  </h1>
                  <GoStarFill
                    className="text-[#FFC107] px-2"
                    size={30}
                  ></GoStarFill>
                  <h1 className="text-[#817F9B] font-medium">
                    {hotel.averageRating || 0}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Hotels;
