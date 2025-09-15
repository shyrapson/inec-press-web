"use client";
import React from "react";
// import Header from "../Header";
// import Image from "next/image";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { downloadApp } from "./download-service";

// import Footer from "../footer";

const DownloadPage = () => {
  // const downloadApp = () => {
  //   let apkUrl = "/INECPRES.apk";
  //   return (window.location.href = apkUrl);
  // };
  const router = useRouter();
  return (
    <section className=" md:mx-[10%] ">
      <header
        style={{ boxShadow: " 10px 4px 40px 10px #1B2D4A14" }}
        className="bg-white mt-5 py-2 mx-2 md:mx-10 px-2 md:px-6 flex justify-between items-center my-2  rounded-xl w-11/12 md:w-full"
      >
        <div
          className="flex items-center gap-1"
          onClick={() => router.push("/")}
        >
          {/* <Image  alt="Logo" className="h-8 mr-2" /> */}
          <Image
            src="/images/logo.png"
            alt="Logo"
            //   className="h-8 mr-2"
            width={52}
            height={52}
          />
          <div className="flex flex-col">
            <span className="text-black md:text-xl font-bold ">INEC PRESS</span>
            <span className="text-[8px] md:text-xs">
              Portal for the engagement of election staff
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={downloadApp}
            className="bg-green-600 hover:bg-green-500 text-white text-xs md:text-sm md:py-3 py-2 md:px-6 px-2 rounded"
          >
            Download App
          </button>
        </div>
      </header>
      <section className=" md:mx-[10%] ">
        <div className="flex items-center justify-center flex-col w-full px-3 md:pb-20">
          <div className="text-center my-8 flex items-center justify-center flex-col w-full">
            <h1 className="font-bold text-[28px] md:text-[40px] md:w-[70%]">
              Centralized App For INEC Election Staff Engagement{" "}
            </h1>
            <p className="md:text-[18px] my-2  md:mx-[200px] md:w-[60%]">
              Connect, coordinate and manage staff information and resources
              effortlessly from INEC unified press application.
            </p>
            <div className="flex items-center justify-center gap-10 md:mb-10 mb-5 md:mt-4">
              <button
                onClick={downloadApp}
                className="bg-green-600 hover:bg-green-500 text-white md:py-3 py-2 md:px-6 px-2 rounded"
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className=" w-full mt-20">
        <div className="backgroundImage bg-[#448220] flex items-end justify-center   h-[80px] md:h-[110px] lg:h-[110px]">
          <div className="flex items-center justify-center h-[200px] md:h-[280px] lg:h-[320px] bg-contain bg-no-repeat bg-bottom bg-transparent w-full z-10 bg-[url('/images/mobile2.png')]"></div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;
