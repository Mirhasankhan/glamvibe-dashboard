"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { THotel } from "@/types/common";
import Image from "next/image";
import { useHotelsQuery } from "@/redux/features/hotel/hotel.api";
import { GoStarFill } from "react-icons/go";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export type activeProp = {
  setActive: React.Dispatch<React.SetStateAction<string>>;
};
const AllHotels = ({ setActive }: activeProp) => {
  const { data: hotels, isLoading } = useHotelsQuery("");

  if (isLoading) {
    return (
      <Loader2 className="mx-auto text-primary mt-12 animate-spin" size={100} />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-semibold">Hotel List</h1>
        <button
          onClick={() => setActive("add")}
          className="text-white font-semibold bg-primary py-2 px-6 rounded-full"
        >
          Add Hotel
        </button>
      </div>
      <div className="p-5 mt-6 bg-white">
        <Table className="rounded-lg min-w-[900px]">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px] whitespace-nowrap">
                Hotel Details
              </TableHead>
              <TableHead>City</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels?.result?.map((hotel: THotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Image
                      className="rounded-lg w-[40px] h-[40px] object-cover"
                      alt=""
                      src={hotel.mediaUrl}
                      width={150}
                      height={150}
                    />
                    <h1>{hotel.hotelName}</h1>
                  </div>
                </TableCell>

                <TableCell>
                  <h1 className="font-medium">{hotel.cityName}</h1>
                  <p>{hotel.phone}</p>
                </TableCell>
                <TableCell>{hotel.contact}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {hotel.averageRating && (
                      <GoStarFill className="text-orange-300"></GoStarFill>
                    )}
                    <h1 className="font-medium">{hotel.averageRating || "N/A"}</h1>
                  </div>
                </TableCell>
                <TableCell>{hotel.discount || 0}%</TableCell>
                <TableCell>
                  <span className="text-primary font-semibold">
                    ${hotel.salePrice}
                  </span>
                  / Night
                </TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: "/dashboard/admin/rooms",
                      query: { hotelId: hotel.id },
                    }}
                  >
                    <button className="bg-primary text-white px-4 rounded-md py-2 font-medium">
                      ({hotel.room.length}) View Rooms
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllHotels;
