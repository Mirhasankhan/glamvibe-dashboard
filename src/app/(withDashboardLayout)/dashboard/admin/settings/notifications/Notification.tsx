import { Switch } from "@/components/ui/switch";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const Notification = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <div className="flex items-center gap-2 border-b pb-4">
        <h1 className="font-semibold text-xl">Notification</h1>
        <HiOutlineExclamationCircle size={30} className="text-gray-400" />
      </div>
      <div className="flex items-center pt-6 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold">Hotel Booking</h1>
          <HiOutlineExclamationCircle size={25} className="text-gray-400" />
        </div>
        <Switch id="airplane-mode" />
      </div>
      <div className="flex items-center pt-6 justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold">Booking Cancellation</h1>
          <HiOutlineExclamationCircle size={25} className="text-gray-400" />
        </div>
        <Switch id="airplane-mode" />
      </div>
      <div className="flex gap-6 mt-6 items-center justify-start">
        <button
          type="submit"
          className="text-white bg-primary px-12 py-3 rounded-md font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Notification;
