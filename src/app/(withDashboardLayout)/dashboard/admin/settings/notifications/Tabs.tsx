"use client";
import { ChevronRight } from "lucide-react";

export type activeProp = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Tabs = ({ active, setActive }: activeProp) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div
        onClick={() => setActive("password")}
        className={`flex justify-between items-center my-4 font-semibold p-3 rounded-lg cursor-pointer ${
          active === "password" ? "bg-primary text-white px-6" : ""
        }`}
      >
        <h1>Change Password</h1>
        <ChevronRight />
      </div>
      <div
        onClick={() => setActive("notifications")}
        className={`flex justify-between items-center font-semibold p-3 rounded-lg cursor-pointer ${
          active === "notifications" ? "bg-primary text-white px-6" : ""
        }`}
      >
        <h1>Notifications</h1>
        <ChevronRight />
      </div>
    </div>
  );
};

export default Tabs;
