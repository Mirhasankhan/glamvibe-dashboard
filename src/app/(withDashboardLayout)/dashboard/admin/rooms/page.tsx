"use client";
import { useHotelsQuery } from "@/redux/features/hotel/hotel.api";
import { THotel } from "@/types/common";
import { BedDouble, Loader2, Users } from "lucide-react";
import { SlSizeFullscreen } from "react-icons/sl";
import AddRoom from "./components/AddRoomModal";
import UpdateRoomModal from "./components/UpdateRoomModal";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const Rooms = () => {
  const [selectedHotel, setSelectedHotel] = useState("");
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const { data: hotels, isLoading } = useHotelsQuery(selectedHotel ? selectedHotel : hotelId ? hotelId : "");
  const { data: allHotels } = useHotelsQuery("");
 


  const hotelOptions =
    allHotels?.result?.map((hotel: { id: string; hotelName: string }) => ({
      id: hotel.id,
      hotelName: hotel.hotelName,
    })) || [];
  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHotel(e.target.value);
  };

  if (isLoading) {
    return (
      <Loader2 className="mx-auto text-primary mt-12 animate-spin" size={100} />
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-semibold">Room List</h1>
        <div>
          <select
            value={selectedHotel}
            onChange={handleHotelChange}
            className="input-design"
          >
            <option value="">Select City</option>
            {hotelOptions?.map((hotel: { id: string; hotelName: string }) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {hotels?.result?.map((hotel: THotel) => (
        <div className="border mb-6 rounded-lg bg-white p-6" key={hotel.id}>
          <div className="md:flex pb-6 justify-between items-center">
            <p></p>
            <div>
              <h1 className="text-center text-xl md:text-2xl font-semibold">
                {hotel.hotelName}
              </h1>
              <h1 className="text-center  font-medium">{hotel.cityName}</h1>
            </div>
            <AddRoom hotel={hotel}></AddRoom>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotel.room.map((r) => (
              <div
                className="shadow-[0px_4px_15px_rgba(255,69,58,0.15)] rounded-md p-5"
                key={r.id}
              >
                <h1 className="font-semibold text-xl pb-2 text-primary">
                  {r.roomName}
                </h1>
                <div className="flex items-center gap-1">
                  <Users className="text-gray-500" size={15} />
                  <h1>
                    <span className="font-medium">Number of people:</span> Up to{" "}
                    {r.adults} adults
                  </h1>
                </div>

                <div className="flex items-center gap-1 py-1">
                  <BedDouble className="text-gray-500" size={15} />
                  <h1>
                    <span className="font-medium">Number of beds:</span>{" "}
                    {r.bedDetail}
                  </h1>
                </div>
                <div className="flex items-center gap-1">
                  <SlSizeFullscreen className="text-gray-500" size={15} />
                  <h1>
                    <span className="font-medium">Room Size:</span> {r.roomSize}
                  </h1>
                </div>

                <div className="flex w-full p-2 items-center rounded-lg mt-2 gap-2">
                  <h1 className={`${r.discount && "line-through"}`}>
                    ${r.price}
                  </h1>
                  {r.discount && (
                    <h1 className="font-semibold text-primary">
                      ${r.salePrice}
                    </h1>
                  )}
                  {r.discount && (
                    <h1 className="bg-orange-300 text-white p-0.5 rounded-md">
                      -{r.discount}%
                    </h1>
                  )}
                </div>
                <UpdateRoomModal room={r}></UpdateRoomModal>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
