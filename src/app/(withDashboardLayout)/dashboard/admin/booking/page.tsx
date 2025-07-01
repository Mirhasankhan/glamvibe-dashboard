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
import BookingOverview from "./components/BookingOverview";
import { Loader2 } from "lucide-react";
import { GiConfirmed } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

const AllBookings = () => {
  // const [page, setPage] = useState(1);
  const { data: allBookings, isLoading } = useAdminBookingsQuery("");
  console.log(allBookings);
  const [cancelBooking] = useCancelBookingMutation();
  const [confrimBooking] = useConfirmBookingMutation();

  const bookings = allBookings?.result?.bookings;
  // const totalPage = allBookings?.result?.totalPages;
  console.log(allBookings);

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
      <BookingOverview></BookingOverview>
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

                  <TableCell className="whitespace-nowrap">{booking?.service?.serviceName}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>
                    {new Date(booking.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{booking.startTime}</TableCell>
                  <TableCell
                    className={`${
                      booking.status == "ACTIVE" && "text-yellow-600"
                    } ${
                      booking.status == "COMPLETED" && "text-green-600"
                    } ${
                      booking.status == "CANCELLED" && "text-red-600"
                    } font-medium`}
                  >
                    {booking.status}
                  </TableCell>
                  <TableCell>
                    <div>
                      {booking.status == "ACTIVE" ? (
                        <>
                          <div className="flex items-center gap-2">
                            <ImCancelCircle
                              onClick={() => handleCancelBooking(booking.id)}
                              size={20}
                              className="text-red-600 cursor-pointer"
                            />
                            <IoMdCheckmark
                              onClick={() => handleConfirmBooking(booking.id)}
                              className="text-green-700 cursor-pointer"
                              size={20}
                            />
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
      {/* <Pagination
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      ></Pagination> */}
    </div>
  );
};

export default AllBookings;
