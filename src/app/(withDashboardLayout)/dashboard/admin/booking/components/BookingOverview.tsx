"use client";
import { BadgeDollarSign, Ellipsis, SquareX } from "lucide-react";
import bookingLogo from "../../../../../../assets/status-up.png";
import { useAdminBookingsQuery } from "@/redux/features/booking/booking.api";
import Image from "next/image";

const BookingOverview = () => {
  const { data: allbookings, isLoading } = useAdminBookingsQuery("");
  const cancelledOrders = allbookings?.result?.bookings?.filter(
    (booking: { status: string }) => booking.status == "CANCELLED"
  );
  const activeBookings = allbookings?.result?.bookings?.filter(
    (booking: { status: string }) => booking.status == "ACTIVE"
  );
  const completedOrders = allbookings?.result?.bookings?.filter(
    (booking: { status: string }) => booking.status == "COMPLETED"
  );

  const totalRevenue =
    completedOrders?.reduce(
      (acc: number, curr: { price: number }) => acc + curr.price,
      0
    ) ?? 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Bookings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">
              {allbookings?.result?.bookings?.length}
            </p>
          )}
        </div>
        <div className="bg-green-50 rounded-md p-3">
          <Image alt="" src={bookingLogo} height={20} width={20} />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Active Bookings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">
              {activeBookings?.length}
            </p>
          )}
        </div>
        <div className="bg-green-50 rounded-md p-3">
          <Image alt="" src={bookingLogo} height={20} width={20} />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Earnings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">${totalRevenue}</p>
          )}
        </div>
        <div className="bg-green-50 rounded-md p-3">
          <BadgeDollarSign className="text-green-300" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-red-600">Cancelled Bookings</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">${cancelledOrders?.length}</p>
          )}
        </div>
        <div className="bg-cyan-50 rounded-md p-3">
          <SquareX className="text-cyan-300" />
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
