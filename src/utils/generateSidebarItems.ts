import { SidbarItem, TRoles } from "@/types/common";
import { userRoles } from "./roles";
import {
  Bell,
  List,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { MdOutlineBedroomParent } from "react-icons/md";

export const sidebarItems = (role: TRoles): SidbarItem[] => {
  const roleMenus: SidbarItem[] = [];

  switch (role) {
    case userRoles.ADMIN:
      roleMenus.push({
        title: "Dashboard",
        path: `/${role}`,
        icon: LayoutDashboard,
      });
      roleMenus.push({
        title: "Booking",
        path: `/${role}/booking`,
        icon: Bell,
      });
      roleMenus.push({
        title: "Hotel List",
        path: `/${role}/hotel-list`,
        icon: List,
      });
      roleMenus.push({
        title: "Rooms",
        path: `/${role}/rooms`,
        icon: MdOutlineBedroomParent,
      });     

      roleMenus.push({
        title: "Settings",
        path: `/${role}/settings`,
        icon: Settings,
      });
      break;

    default:
      break;
  }
  return [...roleMenus];
};
