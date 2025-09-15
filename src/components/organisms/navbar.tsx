"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FC } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isSticky?: boolean;
}

const Navbar: FC<NavbarProps> = ({ isSticky = true }) => {
  const router = useRouter();
  return (
    <nav
      className={`flex ${
        isSticky ? "sticky top-10 my-0" : ""
      } shadow-md md:mx-auto mx-4 items-center opacity-85 relative top-6 z-10 justify-between py-5  px-3 sm:px-2 lg:px-6 rounded-3xl bg-white md:w-10/12 max-w-[1200px]`}
    >
      {" "}
      <div className="flex items-center">
        <Image
          src="/svgs/inec-logo.svg"
          alt="INEC Logo"
          width={40}
          height={40}
          className="text-white"
        />
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className="text-[#181817] hover:text-green-600 font-medium text-sm"
        >
          Home
        </Link>
        <Link
          href="/how-to-apply"
          className="text-[#181817] hover:text-green-600 font-medium text-sm"
        >
          How to apply
        </Link>
        <Link
          href="/eligibility"
          className="text-[#181817] hover:text-green-600 font-medium text-sm"
        >
          Eligibility
        </Link>
        <Link
          href="/faqs"
          className="text-[#181817] hover:text-green-600 font-medium text-sm"
        >
          FAQs
        </Link>
        <Link
          href="/contact"
          className="text-[#181817] hover:text-green-600 font-medium text-sm"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          className="border-green-600 text-[#448220] hover:bg-green-50 bg-transparent h-[41px]"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          className="bg-[#448220] hover:bg-[#448220] text-white h-[41px]"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
