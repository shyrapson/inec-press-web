import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const downloadApp = () => {
    let apkUrl = "/inec-press.apk";
    return (window.location.href = apkUrl);
  };
  return (
    <header className="bg-white py-4 mx-2 md:mx-0 px-2 md:px-6 flex justify-between items-center my-2  shadow-xl rounded-xl">
      <div className="flex items-center gap-1">
        {/* <Image  alt="Logo" className="h-8 mr-2" /> */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          //   className="h-8 mr-2"
          width={52}
          height={52}
        />
        <div className="flex flex-col">
          <span className="text-black md:text-xl font-bold ">INEC PRESS</span>
          <span className="text-[8px] md:text-xs">
            Portal for the engagement of election staff
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={downloadApp}
          className="bg-green-600 hover:bg-green-500 text-white md:py-3 py-2 md:px-6 px-2 rounded"
        >
          Download App
        </button>
      </div>
    </header>
  );
};

export default Header;
