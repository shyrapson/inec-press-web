import EligibilityPage from "@/components/organisms/eligibility/main";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <EligibilityPage />
      <Footer />
    </div>
  );
};

export default page;
