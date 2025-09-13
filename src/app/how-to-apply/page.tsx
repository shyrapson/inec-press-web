import Footer from "@/components/organisms/footer";
import HowToApply from "@/components/organisms/how-to-apply/main";
import Navbar from "@/components/organisms/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <HowToApply />
      <Footer />
    </div>
  );
};

export default page;
