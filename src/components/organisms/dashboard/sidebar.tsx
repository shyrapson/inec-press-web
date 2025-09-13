import Image from "next/image";
import SideBarRoutes from "./sidebar-routes";

export const SideBar = () => {
  return (
    <div className="h-full  border-r flex flex-col overflow-y-auto bg-white shadow-sm gap-2">
      <div className="flex items-center gap-1 p-6">
        <div className=" ">
          <Image
            src="/images/logo.png"
            alt="Logo"
            quality={100}
            height={40}
            width={40}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-black md:text-base font-bold ">INEC PRESS</span>
          <span className="text-[4px] md:text-[6px]">
            Portal for the engagement of election staff
          </span>
        </div>
      </div>
      <div className="">
        <SideBarRoutes />
      </div>
    </div>
  );
};
