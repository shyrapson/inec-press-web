// import Image from "next/image";
// import mask from "../../../public/images/mask-group.png";
import "../globals.css";

// const Footer = () => {
//   return (
//     <div
//       className="backgroundImage bg-green-700  h-[130px] md:h-[230px] mt-[60px] md:mt-[250px]"
//       style={{
//         position: "relative",
//         width: "100%",
//       }}
//     >
//       <div
//         className="flex items-center justify-center absolute bottom-0 top-[15%] md:top-[-10%] z-10"
//         style={{
//           left: "50%",

//           transform: "translate(-50%, -50%)",
//         }}
//       >
//         <Image
//           src="/images/mobile.png"
//           width={500}
//           height={100}
//           alt=""
//           quality={100}
//           style={{ objectFit: "contain" }}
//           // className="h-[470px] md:h-[504px]"
//         />
//       </div>
//       <div
//         className="flex items-center justify-center flex-col z-20 absolute left-[50%] top-[0%] md:top-[-48%]  text-white md:p-4 p-2 rounded-lg w-[70%]  md:w-[651px]"
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.7)",

//           transform: "translate(-50%, -50%)",
//         }}
//       >
//         <Image src="/images/logo.png" alt="logo" width={60} height={60} />
//         <p className="font-bold md:text-[38px] text-center ">
//           INEC PORTAL FOR ENGAGEMENT OF ELECTION STAFF
//         </p>
//       </div>

//       {/* <div
//         style={{
//           position: "absolute",
//           zIndex: 0,
//           width: "100%",
//           height: "100%",
//           top: "95%",
//           backgroundColor: "green",
//         }}
//       >
//         <Image
//           src={mask}
//           alt="Background Mask"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//         />
//       </div> */}
//     </div>
//   );
// };

const Footer = () => {
  return (
    // <div className="absolute bottom-0 w-full mt-20">
    <footer className=" w-full mt-20">
      <div className="backgroundImage bg-green-700 flex items-end justify-center   h-[80px] md:h-[110px] lg:h-[110px]">
        <div className="flex items-center justify-center h-[200px] md:h-[280px] lg:h-[320px] bg-contain bg-no-repeat bg-bottom bg-transparent w-full z-10 bg-[url('/images/mobile2.png')]"></div>
      </div>
    </footer>
  );
};

export default Footer;
