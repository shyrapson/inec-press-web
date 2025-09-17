"use client";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import HomePage from "./home/page";
import HeroSection from "@/components/organisms/home/hero-section";
import { useEffect } from "react";
import { trackPageView } from "@/lib/mixpanel";

export default function Home() {
  useEffect(() => {
    trackPageView("Homepage");
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between  w-full">
      <HomePage />
      <Footer />
    </div>
  );
}
