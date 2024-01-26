import path from "./path";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFillHouseGearFill } from "react-icons/bs";
export const navigations = [
  {
    id: 1,
    path: `/`,
    text: "HOME",
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: "ABOUT US",
  },
  {
    id: 2,
    path: `/${path.OUR_AGENTS}`,
    text: "OUR AGENTS",
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: "PROPERTIES",
  },
  {
    id: 5,
    path: `/${path.SEARCH}`,
    text: "SEARCH",
  },
];

export const adminSidebar = [
  {
    id: 12,
    name: "Dashboard",
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <LuLayoutDashboard/>,
    type: "SINGLE", // danh mục không sổ xuống
  },
  {
    id: 13,
    name: "Property Types",
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <BsFillHouseGearFill/>,
    type: "PARENT", // danh mục sổ xuống có những danh mục con
    subs: [
      {
        id: 34,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        name: "Create new",
      },
      {
        id: 35,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        name: "Manage",
      },
    ],
  },
];
