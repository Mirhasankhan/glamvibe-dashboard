"use client";

import { useState } from "react";
import { TRoles, SidbarItem } from "@/types/common";
import { sidebarItems } from "@/utils/generateSidebarItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JWTDecode } from "@/utils/jwt";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const pathName = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { decoded } = JWTDecode();
  const role = decoded?.role?.toLocaleLowerCase();

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {sidebarItems(role as TRoles).map((item, index) => (
        <div key={index}>
          {item.children && item.children.length > 0 ? (
            <div
              onClick={() => toggleMenu(item.path)}
              className={`cursor-pointer ${
                openMenus[item.path] ? "bg-primary text-white" : ""
              } hover:bg-primary font-medium hover:text-white my-4 ${
                !isOpen && "justify-center md:justify-start"
              } p-2 mx-3 rounded-md flex items-center`}
            >
              {item.icon && <p className="text-xl">{<item.icon />}</p>}

              <h1 className="pl-1">{item.title}</h1>
              <span className="ml-auto">
                {openMenus[item.path] ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </div>
          ) : (
            <Link href={`/dashboard${item.path}`} passHref>
              <div
                onClick={handleLinkClick}
                className={`cursor-pointer ${
                  pathName === `/dashboard${item.path}`
                    ? "bg-primary font-medium !text-white"
                    : ""
                } hover:bg-primary  font-medium hover:text-white my-4 ${
                  !isOpen && "justify-center md:justify-start"
                } p-2 py-3 mx-8 rounded-xl text-[#718096] flex items-center`}
              >
                {item.icon && <p className="text-xl">{<item.icon />}</p>}
                <h1 className="pl-2 md:hidden">{item.title}</h1>
                <h1 className="pl-2 hidden md:block">{item.title}</h1>
              </div>
            </Link>
          )}

          {item.children && openMenus[item.path] && (
            <div className="ml-6">
              {item.children.map((child: SidbarItem, idx: number) => (
                <Link key={idx} href={`/dashboard${child.path}`}>
                  <div
                    onClick={handleLinkClick} // Close sidebar when clicked
                    className={`p-2 mx-3 rounded-md flex items-center font-medium hover:text-[#FA7E34] ${
                      pathName === `/dashboard${child.path}`
                        ? " text-[#FA7E34]"
                        : ""
                    }`}
                  >
                    {isOpen && (
                      <span className="ml-2 md:hidden">{child.title}</span>
                    )}
                    {child.icon && <p className="text-xl">{<child.icon />}</p>}
                    <span className="ml-2 hidden md:block">{child.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
