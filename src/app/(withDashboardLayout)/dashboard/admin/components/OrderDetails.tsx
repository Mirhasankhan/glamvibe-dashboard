"use client";
import { BadgeDollarSign, Ellipsis, Truck } from "lucide-react";
import bookingLogo from "../../../../../assets/status-up.png";
import frame from "../../../../../assets/Frame.png";
import Image from "next/image";
import { useAdminBookingsQuery } from "@/redux/features/booking/booking.api";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";

const OrderDetails = () => {
  const { data: allbookings, isLoading } = useAdminBookingsQuery("");
  const { data: users, isLoading: isUserLoading } = useAllUsersQuery("");

  const activeOrders = allbookings?.result?.bookings?.filter(
    (booking: { status: string }) => booking.status == "ACTIVE"
  );
  const completedOrders = allbookings?.result?.bookings?.filter(
    (booking: { status: string }) => booking.status == "COMPLETED"
  );
  const allUsers = users?.result?.filter(
    (user: { role: string }) => user.role !== "ADMIN"
  );
  const totalRevenue =
    completedOrders?.reduce(
      (acc: number, curr: { totalCost: number }) => acc + curr.totalCost,
      0
    ) ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total Active Order</h3>
          {isLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">{activeOrders?.length}</p>
          )}
        </div>
        <div className="bg-orange-100 rounded-md p-3">
          <Truck className="text-orange-300" />
        </div>
      </div>
      <div className="flex justify-between items-center bg-white p-8 rounded-md">
        <div>
          <h3 className="text-[#817F9B]">Total User</h3>
          {isUserLoading ? (
            <Ellipsis className="animate-ping" />
          ) : (
            <p className="text-2xl font-semibold">{allUsers?.length}</p>
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
              {allbookings?.result?.bookings?.length}
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
            <p className="text-2xl font-semibold">${totalRevenue}</p>
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
