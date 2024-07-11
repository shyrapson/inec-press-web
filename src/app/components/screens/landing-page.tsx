"use client";
import React from "react";
// import Header from "../Header";
// import Image from "next/image";
import { useRouter } from "next/navigation";
// import Footer from "../footer";

const LandingPage = () => {
  const downloadApp = () => {
    let apkUrl = "/inec-press.apk";
    return (window.location.href = apkUrl);
  };

  const router = useRouter();
  return (
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
            {/* <button onClick={() => router.push("#")}>
              <Image
                src="/images/app-store.png"
                width={164}
                height={38}
                alt="app store logo"
                className="h-[48px]"
              />
            </button> */}

            {/* <button className="  " onClick={downloadApp}>
              <Image
                src="/images/play-store.png"
                width={164}
                height={0}
                alt="play store logo"
                className="h-[48px]"
              />
            </button> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default LandingPage;
