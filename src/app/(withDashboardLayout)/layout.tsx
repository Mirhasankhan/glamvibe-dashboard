"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Providers from "@/lib/providers/Providers";
import logo from "../../assets/logo.png";
import SignOut from "@/components/dashboard/SignOut";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Providers>
      <div className="grid grid-cols-5 h-screen  overflow-hidden">
        <div
          className={`${
            isOpen ? "col-span-5" : "hidden md:block"
          } md:col-span-1 h-full  border-r`}
        >
          <div className="flex justify-between items-center pt-4  mx-8">
            <Link href="/" className="flex   gap-1 items-center">
              <div>
                <Image alt="Logo" src={logo} height={50} width={50} />
              </div>
            </Link>
            <button className="md:hidden bg-black text-white p-2 rounded-md">
              <X onClick={() => setIsOpen(!isOpen)} />
            </button>
          </div>
          <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
          <div className="mx-8">
            <SignOut></SignOut>
          </div>
        </div>
        <div
          className={`${
            !isOpen ? "col-span-5" : "hidden md:block"
          } md:col-span-4 bg-white h-full flex overflow-auto flex-col`}
        >
          <div className="flex gap-3 py-2  bg-white  items-center px-3">
            <button className="md:hidden bg-black text-white p-2 rounded-md">
              <Menu  onClick={() => setIsOpen(!isOpen)} />
            </button>
            <DashboardHeader />
          </div>
          <div className="p-6 flex-1 bg-gray-50">{children}</div>
        </div>
      </div>
    </Providers>
  );
};

export default DashboardLayout;
