"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useStore from "@/hooks/useStore";

const NavbarRoutes = () => {
  const [greeting, setGreeting] = useState<string>("");
  const pathName = usePathname();
  const router = useRouter();
  const { store } = useStore();
  const user = store?.auth?.currentUser;
  const profile = user?.profile;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const name = pathName.split("/")[1];
  const pageTitle = name === "states" ? "states-36" : name;

  return (
    <header className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-2xl font-bold">
          {pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).toLowerCase()}
        </h1>
        <p className="text-gray-600">
          {greeting} - {formattedDate}
        </p>
      </div>
      <div
        onClick={() => router.push("/profile")}
        className="flex items-center gap-2  cursor-pointer "
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full ml-4">
          <User className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="mr-2">
            {profile?.firstName} {profile?.surname}
          </span>
          <span className="text-sm text-gray-500">{user?.email || ""}</span>
        </div>
      </div>
    </header>
  );
};

export default NavbarRoutes;
