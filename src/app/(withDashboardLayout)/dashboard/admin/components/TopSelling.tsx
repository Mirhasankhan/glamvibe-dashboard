"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTopSellingQuery } from "@/redux/features/hotel/hotel.api";
import { THotel } from "@/types/common";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const TopSelling = () => {
  const { data: salesDetail, isLoading } = useTopSellingQuery("");
  return (
    <div className="p-5 mt-6 bg-white">
      <h1 className="text-2xl font-semibold pb-4">Top Selling</h1>
      <Table className="rounded-lg">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="md:w-[300px]">Hotel Details</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Booking</TableHead>
            <TableHead className="text-center">Total Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                <Ellipsis
                  size={30}
                  className="animate-ping mx-auto"
                />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {salesDetail?.result?.map((sales: THotel) => (
                <TableRow key={sales.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      <Image
                        className="rounded-lg w-[40px] h-[40px] object-cover"
                        alt=""
                        src={sales.mediaUrl}
                        width={150}
                        height={150}
                      />
                      <h1>{sales.hotelName}</h1>
                    </div>
                  </TableCell>
                  <TableCell>{sales.contact}</TableCell>
                  <TableCell>{sales.bookingCount}</TableCell>
                  <TableCell className="text-center">{sales.revenue}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopSelling;
