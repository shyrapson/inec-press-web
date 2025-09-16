import ApplicationSections from "@/components/organisms/home/application-section";
import HeroSection from "@/components/organisms/home/hero-section";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <ApplicationSections />
    </div>
  );
};

export default HomePage;
