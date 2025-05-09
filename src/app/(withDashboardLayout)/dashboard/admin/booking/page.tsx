"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FcCancel } from "react-icons/fc";
import {
  useBookingsQuery,
  useCancelBookingMutation,
  useConfirmBookingMutation,
} from "@/redux/features/booking/booking.api";
import { THotel } from "@/types/common";
import Image from "next/image";
import BookingOverview from "./components/BookingOverview";
import Pagination from "@/components/dashboard/pagination";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GiConfirmed } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

const AllBookings = () => {
  const [page, setPage] = useState(1);
  const { data: allBookings, isLoading } = useBookingsQuery({
    page: page,
  });
  const [cancelBooking] = useCancelBookingMutation();
  const [confrimBooking] = useConfirmBookingMutation();

  const bookings = allBookings?.result?.bookings;
  const totalPage = allBookings?.result?.totalPages;
  console.log(allBookings);

  const handleCancelBooking = async (id: string) => {
    const response = await cancelBooking(id);
    console.log(response);
  };
  const handleConfirmBooking = async (id: string) => {
    const response = await confrimBooking(id);
    console.log(response);
  };

  // if (isLoading) {
  //   return (
  //     <Loader2
  //       className="mx-auto text-primary mt-12 animate-spin"
  //       size={100}
  //     />
  //   );
  // }
  return (
    <div>
      <BookingOverview></BookingOverview>
      <div className="p-5 mt-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4">Total Bookings</h1>
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">Hotel Details</TableHead>
              <TableHead>User Info</TableHead>
              {/* <TableHead>Room</TableHead> */}
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>Adults</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                <Loader2
                  size={80}
                  className="animate-spin mx-auto  text-primary"
                />
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {bookings?.map((sales: THotel) => (
                <TableRow key={sales.id}>
                  <TableCell  className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Image
                        className="rounded-lg w-[40px] h-[40px] object-cover"
                        alt=""
                        src={sales.hotel.mediaUrls[0]}
                        width={150}
                        height={150}
                      />
                      <h1>{sales.hotel.hotelName}</h1>
                    </div>
                  </TableCell>
                  <TableCell>
                    <h1 className="font-medium">{sales.user.fullName}</h1>
                    <p>{sales.phone}</p>
                  </TableCell>
                  {/* <TableCell>{sales.room.roomName}</TableCell> */}
                  <TableCell>
                    {new Date(sales.startDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {new Date(sales.endDate).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{sales.rooms}</TableCell>
                  <TableCell>{sales.adults}</TableCell>
                  <TableCell>${sales.totalCost}</TableCell>
                  <TableCell>{sales.status}</TableCell>
                  <TableCell>
                    <div>
                      {sales.status == "ACTIVE" ? (
                        <>
                          <div className="flex items-center gap-2">
                            <ImCancelCircle
                              onClick={() => handleCancelBooking(sales.id)}
                              size={20}
                              className="text-red-600 cursor-pointer"
                            />
                            <IoMdCheckmark
                              onClick={() => handleConfirmBooking(sales.id)}
                              className="text-green-700 cursor-pointer"
                              size={20}
                            />
                          </div>
                        </>
                      ) : sales.status == "CANCELLED" ? (
                        <FcCancel size={20} />
                      ) : (
                        <GiConfirmed className="text-green-700" size={20} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
      <Pagination
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      ></Pagination>
    </div>
  );
};

export default AllBookings;
