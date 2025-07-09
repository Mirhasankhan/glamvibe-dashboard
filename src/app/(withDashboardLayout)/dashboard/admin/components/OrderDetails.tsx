"use client";
import { BadgeDollarSign, Ellipsis, Truck } from "lucide-react";
import bookingLogo from "../../../../../assets/status-up.png";
import frame from "../../../../../assets/Frame.png";
import Image from "next/image";
import { useOverviewQuery } from "@/redux/features/booking/booking.api";

const OrderDetails = () => {
  const { data, isLoading } = useOverviewQuery("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Active Order</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">
              {data?.result?.activeOrderCount}
            </p>
          )}
        </div>
        <div className="bg-orange-100 rounded-md p-3">
          <Truck className="text-orange-300" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total User</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">
              {data?.result?.totalUserCount}
            </p>
          )}
        </div>
        <div className="bg-green-50 rounded-md p-3">
          <Image alt="" src={bookingLogo} height={20} width={20} />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Bookings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">
              {data?.result?.totalBookingsCount}
            </p>
          )}
        </div>
        <div className="bg-blue-50 rounded-md p-3">
          <Image alt="" src={frame} height={20} width={20} />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Earnings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">${data?.result?.earnings}</p>
          )}
        </div>
        <div className="bg-cyan-50 rounded-md p-3">
          <BadgeDollarSign className="text-cyan-300" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
