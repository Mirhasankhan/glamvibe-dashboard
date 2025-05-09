"use client";
import React, { useState } from "react";
import AllHotels from "./components/AllHotels";
import AddHotel from "./components/AddHotel";

const HotelList = () => {
  const [active, setActive] = useState("list");
  return (
    <div>
      
      {active == "list" && <AllHotels setActive={setActive}></AllHotels>}
      {active == "add" && <AddHotel setActive={setActive}></AddHotel>}
  
    </div>
  );
};

export default HotelList;
