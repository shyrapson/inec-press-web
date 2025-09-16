import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import HomePage from "./home/page";
import HeroSection from "@/components/organisms/home/hero-section";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between  w-full">
      {/* <Navbar /> */}
      <HomePage />
      <Footer />
    </div>
  );
}
