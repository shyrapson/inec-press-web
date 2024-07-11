import LandingPage from "./components/screens/landing-page";
import Footer from "./components/footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-dvh">
      <div className="md:mx-[10%] w-full container flex items-center justify-center">
        <Header />
      </div>
      <LandingPage />
      <Footer />
    </div>
  );
}
