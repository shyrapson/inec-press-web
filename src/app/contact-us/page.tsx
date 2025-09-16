import ContactPage from "@/components/organisms/contact-us/main";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <ContactPage />
      <Footer />
    </div>
  );
};

export default page;
