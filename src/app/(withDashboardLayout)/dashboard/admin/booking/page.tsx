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
  useAdminBookingsQuery,
  useCancelBookingMutation,
  useConfirmBookingMutation,
} from "@/redux/features/booking/booking.api";
import { Loader2 } from "lucide-react";
import { GiConfirmed } from "react-icons/gi";
import { useState } from "react";
import Pagination from "@/components/dashboard/pagination";

const AllBookings = () => {
  const [page, setPage] = useState(1);
  const { data: allBookings, isLoading } = useAdminBookingsQuery(page);

  const [cancelBooking] = useCancelBookingMutation();
  const [confrimBooking] = useConfirmBookingMutation();

  const bookings = allBookings?.result?.bookings;
  const totalPage = allBookings?.result?.totalPages || 1;

  const handleCancelBooking = async (id: string) => {
    const response = await cancelBooking(id);
    console.log(response);
  };
  const handleConfirmBooking = async (id: string) => {
    const response = await confrimBooking(id);
    console.log(response);
  };

  return (
    <div>
      <div className="p-5 mt-6 bg-white">
        <h1 className="text-2xl font-semibold pb-4">Manage Bookings</h1>
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                User Details
              </TableHead>
              <TableHead className="w-[250px] whitespace-nowrap">
                Contact
              </TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
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
              {bookings?.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <h1>{booking?.user?.username}</h1>
                    </div>
                  </TableCell>
                  <TableCell>
                    <h1 className="font-medium">{booking.phone}</h1>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {booking?.service?.serviceName}
                  </TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>
                    {new Date(booking.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {booking.startTime}
                  </TableCell>
                  <TableCell
                    className={`${
                      booking.status == "ACTIVE" && "text-yellow-600"
                    } ${booking.status == "COMPLETED" && "text-green-600"} ${
                      booking.status == "CANCELLED" && "text-red-600"
                    } font-medium`}
                  >
                    {booking.status}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div>
                      {booking.status == "ACTIVE" ? (
                        <>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 bg-red-50 border-red-600 border px-4 py-1 rounded-[4px] cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleConfirmBooking(booking.id)}
                              className="text-green-600 bg-green-50 border-green-600 border px-4 py-1 rounded-[4px] cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          </div>
                        </>
                      ) : booking.status == "CANCELLED" ? (
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
