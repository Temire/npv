import {
  DASHBOARD_URL,
  ROLE_MGMNT_URL,
  SETTINGS_URL,
  SUBSCRIPTIONS_URL,
  UPLOAD_MGMNT_URL,
  USER_MGMNT_URL
} from "./routes.url";
import { INavProps } from "../types";
import { FaFileInvoice } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCloudUpload } from "react-icons/sl";
import { BiLogOut } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";

export const navRoutes: INavProps[] = [
  {
    name: "Dashboard",
    path: DASHBOARD_URL,
    icon: LuLayoutDashboard
  },
  {
    name: "User Management",
    path: USER_MGMNT_URL,
    icon: HiUserGroup
  },
  {
    name: "Document Management",
    path: UPLOAD_MGMNT_URL,
    icon: SlCloudUpload
  },
  {
    name: "Subscriptions",
    path: SUBSCRIPTIONS_URL,
    icon: FaFileInvoice
  },
  {
    name: "Role Management",
    path: ROLE_MGMNT_URL,
    icon: FaUsersCog
  },
  {
    name: "Settings",
    path: SETTINGS_URL,
    icon: IoSettings
  },
  {
    name: "Logout",
    path: "#",
    icon: BiLogOut
  }
];
