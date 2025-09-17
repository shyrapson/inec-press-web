"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DownloadPage = () => {
  const downloadAndroid = () => {
    const url =
      "https://inec-croms-bucket.nyc3.digitaloceanspaces.com/apk-file/INECPRES.apk";
    window.location.href = url;
  };

  const downloadIOS = () => {
    const url = "https://apps.apple.com/app/inec-pres/id6738576146";
    window.location.href = url;
  };

  const router = useRouter();

  return (
    <section className=" md:mx-[10%] ">
      <header
        style={{ boxShadow: "10px 4px 40px 10px #1B2D4A14" }}
        className="bg-white mt-5 py-2 mx-2 md:mx-10 px-2 md:px-6 flex justify-between items-center my-2 rounded-xl w-11/12 md:w-full"
      >
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/images/logo.png" alt="Logo" width={52} height={52} />
          <div className="flex flex-col">
            <span className="text-black md:text-xl font-bold">INECPRES</span>
            <span className="text-[8px] md:text-xs">
              PORTAL FOR THE ENGAGEMENT OF ELECTORAL STAFF
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={downloadAndroid}>
            <Image
              src="/images/play-store.png"
              alt="Google Play"
              width={120}
              height={40}
            />
          </button>
          <button onClick={downloadIOS}>
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={120}
              height={40}
            />
          </button>
        </div>
      </header>

      <section className=" md:mx-[10%] ">
        <div className="flex items-center justify-center flex-col w-full px-3 md:pb-20">
          <div className="text-center my-8 flex items-center justify-center flex-col w-full">
            <h1 className="font-bold text-[28px] md:text-[40px] md:w-[70%]">
              Centralized App For INEC Election Staff Engagement
            </h1>
            <p className="md:text-[18px] my-2 md:mx-[200px] md:w-[60%]">
              Download the mobile application for the Independent National
              Electoral Commission’s Portal for Engagement of Election Staff
              (INECPRES).
            </p>
            <div className="flex items-center justify-center gap-6 md:mb-10 mb-5 md:mt-4">
              <button onClick={downloadAndroid}>
                <Image
                  src="/images/play-store.png"
                  alt="Google Play"
                  width={140}
                  height={45}
                />
              </button>
              <button onClick={downloadIOS}>
                <Image
                  src="/images/app-store.png"
                  alt="App Store"
                  width={140}
                  height={45}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className=" w-full mt-20">
        <div className="backgroundImage bg-[#448220] flex items-end justify-center h-[80px] md:h-[110px] lg:h-[110px]">
          <div className="flex items-center justify-center h-[200px] md:h-[280px] lg:h-[320px] bg-contain bg-no-repeat bg-bottom bg-transparent w-full z-10 bg-[url('/images/mobile2.png')]"></div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;
