import Navbar from "../navbar";

const HeroSection = () => {
  return (
    <section className="min-h-screen ">
      <div className=" bg-[url('/svgs/election-day.svg')]  bg-cover bg-no-repeat">
        <Navbar />
        <div className="relative z-10 flex items-center justify-center min-h-[100vh] px-4">
          <div className="text-center text-white max-w-5xl mx-auto">
            <div className="text-4xl md:text-6xl mb-6 font-bold text-balance">
              <h1 className="mb-2">INEC PORTAL FOR THE ENGAGEMENT OF</h1>
              <h1 className="">ELECTION STAFF</h1>
            </div>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              This is the registration portal for the 2024 Edo and Ondo State
              Governorship Election
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
