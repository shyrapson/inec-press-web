"use client";
import Image from "next/image";
import axios from "axios";
import { downloadApp } from "./Download";
// import Link from "next/link";

const Header = () => {
  // const secretKey = "iueyewirghcbhbchjvcgcbchsysfueie"; // Should be exactly 32 characters

  // async function encryptData(data, secretKey) {
  //   const iv = crypto.getRandomValues(new Uint8Array(16)); // Generate a random IV
  //   const enc = new TextEncoder();
  //   const key = await crypto.subtle.importKey(
  //     "raw",
  //     enc.encode(secretKey),
  //     { name: "AES-CBC" },
  //     false,
  //     ["encrypt"]
  //   );
  //   const encrypted = await crypto.subtle.encrypt(
  //     { name: "AES-CBC", iv: iv },
  //     key,
  //     enc.encode(JSON.stringify(data))
  //   );
  //   return {
  //     iv: Array.from(iv),
  //     encryptedData: Array.from(new Uint8Array(encrypted)),
  //   };
  // }

  // const downloadApp = async () => {
  //   const apkUrl = "/INECPRES.apk";
  //   window.location.href = apkUrl;
  //   const data = { ENCRYPTION_KEY: "kshbjhdvghdvgvdgdvdhkjsdbjk" }; // Replace with actual data
  //   const encryptedData = await encryptData(data, secretKey);

  //   try {
  //     const url =
  //       "https://starfish-app-mzd48.ondigitalocean.app/api/v1/app/add-to-downloads";
  //     console.log("Request URL:", url);

  //     const response = await axios.post(
  //       url,
  //       {
  //         data: encryptedData,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("response", response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <header
      style={{ boxShadow: " 10px 4px 40px 10px #1B2D4A14" }}
      className="bg-white mt-5 py-2 mx-2 md:mx-10 px-2 md:px-6 flex justify-between items-center my-2  rounded-xl w-11/12 md:w-full"
    >
      <div className="flex items-center gap-1">
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
  );
};

export default Header;

// try {
//   const response = await axios.post(‘/v1/app/add-to-downloads’,
// )
//   console.log(response.data);
// } catch (error) {
//   console.error(‘Error sending download request:’, error);
// }
