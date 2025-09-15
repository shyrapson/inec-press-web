import NavbarRoutes from "@/components/organisms/dashboard/navbar-routes";
import { SideBar } from "@/components/organisms/dashboard/sidebar";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="h-full ">
        {/* <div className="bg-white h-[80px] md:pl-56 fixed inset-y-0 w-full z-[1000]"> */}
        <div className="bg-white h-[80px] fixed inset-y-0 w-full z-[1000]">
          <NavbarRoutes />
        </div>
        {/* <div className="hidden md:flex h-full bg-yellow-300 w-56 flex-col fixed inset-y-0 z-[1000]">
          <SideBar />
        </div> */}
        {/* <main className="md:pl-56 pt-[89px] h-full ">{children}</main> */}
        <main className="pt-[89px] h-full ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
