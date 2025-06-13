import { SidbarItem, TRoles } from "@/types/common";
import { userRoles } from "./roles";
import {
  Bell,  
  Settings,
  LayoutDashboard,
  BadgeDollarSign,  
} from "lucide-react";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { RiGitPullRequestFill } from "react-icons/ri";

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
        title: "Manage Categories",
        path: `/${role}/categories`,
        icon: TbCategory2,
      });
      roleMenus.push({
        title: "Manage Services",
        path: `/${role}/services`,
        icon: MdOutlineBedroomParent,
      });     
      roleMenus.push({
        title: "Earnings Overview",
        path: `/${role}/earnings`,
        icon: BadgeDollarSign,
      });     
      roleMenus.push({
        title: "Employees",
        path: `/${role}/employee`,
        icon: GrUserWorker,
      });     
      roleMenus.push({
        title: "Job Applications",
        path: `/${role}/applications`,
        icon: RiGitPullRequestFill,
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
