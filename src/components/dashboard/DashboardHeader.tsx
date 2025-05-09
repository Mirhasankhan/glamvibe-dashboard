
import UserDetails from "./UserDetails";
import { useState } from "react";
import { JWTDecode } from "@/utils/jwt";
import Image from "next/image";
import profile from '../../assets/pro.png'

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { decoded } = JWTDecode();

  return (
    <div className="flex justify-between w-full md:px-8 px-4 h-12 items-center">
      <div>
        <h1 className="font-semibold text-xl">Overview</h1>
        <p className="font-medium">{decoded?.userName}</p>
      </div>
      <div className="flex items-center gap-2">
        {/* <div className="cursor-pointer">
          <Bell onClick={() => setNotificationsOpen(!notificationsOpen)} />
        </div> */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex relative items-center   rounded-md cursor-pointer"
        >
          <Image alt="" height={40} width={40} src={profile} />          
         
        </div>
      </div>
      <div className="absolute top-16 right-8">
        <UserDetails isOpen={isOpen}></UserDetails>
      </div>

      {/* <div className="absolute top-20 right-8">
        {!isOpen && (
          <DashboardNotifications notificationsOpen={notificationsOpen} />
        )}
      </div> */}
    </div>
  );
};

export default DashboardHeader;
