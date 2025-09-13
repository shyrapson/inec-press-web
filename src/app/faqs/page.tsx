import FAQsPage from "@/components/organisms/faqs/main";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <FAQsPage />
      <Footer />
    </div>
  );
};

export default page;
