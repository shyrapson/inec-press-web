import ApplicationSections from "@/components/organisms/home/application-section";
import HeroSection from "@/components/organisms/home/hero-section";
import React from "react";
import DownloadPage from "../app/page";

const HomePage = () => {
  return (
    <div className="w-full">
      <DownloadPage />
      {/* <HeroSection />
      <ApplicationSections /> */}
    </div>
  );
};

export default HomePage;
