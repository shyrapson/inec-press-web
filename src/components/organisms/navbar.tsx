"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FC } from "react";
import { useRouter } from "next/navigation";
{
  /* <div className="mx-auto px-4 sm:px-6 lg:px-20 bg-transparent "> */
}

const Navbar: FC = () => {
  const router = useRouter();
  return (
    // <nav className=" w-full    top-0 z-50">
    // <div className="mx-auto sticky px-4 shadow-md sm:px-6 lg:px-20 pt-8 bg-red-500">
    <div className="flex sticky shadow-md  top-10 mx-auto  items-center justify-between py-6 px-2 sm:px-2 lg:px-4 rounded-2xl  bg-white w-10/12 max-w-[1200px]">
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
        <Link href="/" className="text-[#607087] hover:text-green-600 font-medium">
          Home
        </Link>
        <Link href="/how-to-apply" className="text-[#607087] hover:text-green-600 font-medium">
          How to apply
        </Link>
        <Link href="/eligibility" className="text-[#607087] hover:text-green-600 font-medium">
          Eligibility
        </Link>
        <Link href="/faqs" className="text-[#607087] hover:text-green-600 font-medium">
          FAQs
        </Link>
        <Link href="/contact" className="text-[#607087] hover:text-green-600 font-medium">
          Contact Us
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          className="border-green-600 text-[#448220] hover:bg-green-50 bg-transparent"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          className="bg-[#448220] hover:bg-[#448220] text-white"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </div>
    // </div>
    // </nav>
  );
};

export default Navbar;
