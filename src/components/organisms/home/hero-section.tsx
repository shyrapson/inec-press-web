import Navbar from "../navbar";

const HeroSection = () => {
  return (
    <section className="min-h-screen">
      <div className="bg-[url('/svgs/election-day.svg')] bg-center bg-cover bg-no-repeat min-h-screen">
        <Navbar />
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
          <div className="text-center text-white md:max-w-5xl mx-auto">
            <div className="text-2xl sm:text-3xl md:text-[46px] mb-6 md:mb-8 font-bold text-balance leading-tight">
              <h1 className="mb-3">INEC PORTAL FOR THE RECRUITMENT OF</h1>
              <h1 className="">ELECTION STAFF</h1>
            </div>
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              2025 Anambra State Governorship Election
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
