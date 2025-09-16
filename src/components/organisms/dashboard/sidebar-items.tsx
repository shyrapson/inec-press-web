"use client";

import Icon from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface ISidebarItems {
  icon: string;
  label: string;
  href: string;
}
export const SidebarItems = ({ icon: icon, label, href }: ISidebarItems) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <div
        className={cn(
          "absolute left-0 top-0 w-1 h-12 rounded-r-lg transition-all",
          isActive ? "opacity-100 bg-[#448220]" : "opacity-0"
        )}
      />

      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex items-center w-4/5 px-3 h-12 gap-x-2 text-[14px] font-[500] transition-all rounded-lg",

          !isActive &&
            "text-[#448220] hover:text-slate-600 hover:bg-slate-300/20",

          isActive &&
            "text-[#448220] bg-[#DFF0D8] hover:bg-[#DFF0D7] hover:text-[#448220]"
        )}
      >
        <div className="flex items-center w-full py-0">
          <Icon
            icon={icon}
            className="w-5 h-5"
            // gradient={isActive && theme === "dark"}
          />
          <span className="ml-4">{label}</span>
        </div>
      </button>
    </div>
  );
};
