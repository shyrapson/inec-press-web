"use client";

import {
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  LogOutIcon,
  MapPin,
  Settings,
  SquareUser,
  User,
  User2,
  Vote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarItems } from "./sidebar-items";

const Routes = [
  { icon: "fluent:folder-28-regular", label: "Dashboard", href: "/dashboard" },
  // {
  //   icon: "fluent:folder-28-regular",
  //   label: "How to Apply",
  //   href: "/",
  // },
  // {
  //   icon: "fluent:document-text-32-regular",
  //   label: "Eligibility",
  //   href: "/",
  // },
  // {
  //   icon: "fluent:chat-bubbles-question-28-regular",
  //   label: "FAQs",
  //   href: "/",
  // },
  // {
  //   icon: "hugeicons:customer-service-02",
  //   label: "Contact us",
  //   href: "/",
  // },
];

const SideBarRoutes = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between min-h-[35rem]">
      <div className="w-full flex items-center flex-col">
        {Routes?.map(({ icon, label, href }, index) => (
          <SidebarItems key={index} icon={icon} label={label} href={href} />
        ))}
      </div>
      <div className=" w-4/5 mx-auto">
        <div className=" flex items-center gap-2 px-2 text-red-500 cursor-pointer">
          <LogOutIcon size={24} className="" />
          Log out
        </div>
      </div>
    </div>
  );
};

export default SideBarRoutes;
