import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import LoginPage from "@/components/organisms/login/main";
import React from "react";

const page = () => {
  return (
    <div>
      <LoginPage />
      <div className=" w-full absolute -bottom-4 flex  justify-between z-0">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default page;
