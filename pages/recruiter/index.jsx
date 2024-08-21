// import React, { useEffect, useRef, useState } from "react";
// import ExpandSection from "./ExpandSection";
// import LastSection from "./LastSection";
// import RecruiterAnimation from "./RecruiterAnimation";
// import RecruiterHero from "./RecruiterHero";
// import { Background, Parallax } from "react-parallax";
// import { ReactLenis } from "@studio-freight/react-lenis";
// import { gsap } from "gsap";
// import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
// import PrecisionMatching from "./PrecisionMatching";
// import TransformResume from "./TransformResume";
// import ClientSection from "./ClientSection";
// import Footer from "../../components/partials/footer/footer";
// import { useSelector } from "react-redux";

// function Recruiter_page() {
//   const [isSubscribe, setIsSubcrib] = useState(false)
//   const [showAnimationn, setShowAnimation] = useState(true);
//   const enablePopup = useSelector((state) => state.popup.enablePopup);
//   const handleScroll = () => {
//     if (window.scrollY > 400) {
//       setShowAnimation(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//   const lenisRef = useRef();

//   return (
//     <>
//       <div className="unblockRecruiter">
//         <div className=" overflow-hidden ">
//           {" "}
//           <RecruiterHero />
//         </div>
//         <PrecisionMatching />
//         <TransformResume />
//         <ClientSection />
//       </div>

//       <div className="heroBlock">
//         <ReactLenis root>
//           <Parallax strength={300} className=" h-[100vh]  ">
//             <Background className="custom-bg  ">
//               <RecruiterHero />
//             </Background>
//           </Parallax>
//           <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
//             {/* <RecruiterAnimation showAnimationn={!showAnimationn} /> */}
//             <PrecisionMatching />
//           </div>
//           <Parallax
//             strength={400}
//             className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center "
//           >
//             <Background className="custom-bg  ">
//               <TransformResume />
//             </Background>
//           </Parallax>
//           <ClientSection />
//         </ReactLenis>
//       </div>
//       {!enablePopup &&
//         <SubscriptionPlan fromMain={true} />
//       }
//       <Footer isSubscribe={isSubscribe} setIsSubcrib={setIsSubcrib} />




//       {isSubscribe &&
//         <>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">

//             <div className=' absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%] '>
//               <svg
//                 className="absolute top-[-40px]  left-[38%] right-[62%] flex"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="85"
//                 height="85"
//                 viewBox="0 0 85 85"
//                 fill="none"
//               >
//                 <g clip-path="url(#clip0_6622_116765)">
//                   <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
//                   <g mask="url(#mask0_6622_116765)">
//                     <path
//                       d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
//                       fill="white"
//                     />
//                   </g>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_6622_116765">
//                     <rect width="85" height="85" rx="42.5" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>

//               <div className="text-center">
//                 <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
//                   Subscribed Successfully
//                 </div>
//                 {/* <div className="text-[16px] font-[500] text-[#333]">
//                 Check your email for confirmation
//             </div> */}
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setIsSubcrib(false)}
//                   className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       }

//     </>
//   );
// }

// export default Recruiter_page;

// import React, { useEffect, useRef, useState } from "react";
// import ExpandSection from "./ExpandSection";
// import LastSection from "./LastSection";
// import RecruiterAnimation from "./RecruiterAnimation";
// import RecruiterHero from "./RecruiterHero";
// import { Background, Parallax } from "react-parallax";
// import { ReactLenis } from "@studio-freight/react-lenis";
// import { gsap } from "gsap";
// import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
// import PrecisionMatching from "./PrecisionMatching";
// import TransformResume from "./TransformResume";
// import ClientSection from "./ClientSection";
// import Footer from "../../components/partials/footer/footer";
// import { useSelector } from "react-redux";

// function Recruiter_page() {
//   const [isSubscribe, setIsSubcrib] = useState(false)
//   const [showAnimationn, setShowAnimation] = useState(true);
//   const enablePopup = useSelector((state) => state.popup.enablePopup);
//   const handleScroll = () => {
//     if (window.scrollY > 400) {
//       setShowAnimation(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//   const lenisRef = useRef();

//   return (
//     <>
//       <div className="unblockRecruiter">
//         <div className=" overflow-hidden ">
//           {" "}
//           <RecruiterHero />
//         </div>
//         <PrecisionMatching />
//         <TransformResume />
//         <ClientSection />
//       </div>



//       <div className="heroBlock relative">
//       <img
//                 src="/images/ar.png"
//                 alt=""
//                 className="fixed top-[90vh] right-[2vw] z-[300000] h-[52px] w-[52px] cursor-pointer"
//                 // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               />
//         <ReactLenis root>
//           <Parallax strength={300} className=" h-[100vh]  ">
//             <Background className="custom-bg  ">
//               <RecruiterHero />
//             </Background>
//           </Parallax>
//           <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
//             {/* <RecruiterAnimation showAnimationn={!showAnimationn} /> */}
//             <PrecisionMatching />
//           </div>
//           <Parallax
//             strength={400}
//             className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center "
//           >
//             <Background className="custom-bg  ">
//               <TransformResume />
//             </Background>
//           </Parallax>
//           <ClientSection />
//         </ReactLenis>
//       </div>
//       {!enablePopup &&
//         <SubscriptionPlan fromMain={true} />
//       }
//       <Footer isSubscribe={isSubscribe} setIsSubcrib={setIsSubcrib} />




//       {isSubscribe &&
//         <>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">

//             <div className=' absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%] '>
//               <svg
//                 className="absolute top-[-40px]  left-[38%] right-[62%] flex"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="85"
//                 height="85"
//                 viewBox="0 0 85 85"
//                 fill="none"
//               >
//                 <g clip-path="url(#clip0_6622_116765)">
//                   <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
//                   <g mask="url(#mask0_6622_116765)">
//                     <path
//                       d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
//                       fill="white"
//                     />
//                   </g>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_6622_116765">
//                     <rect width="85" height="85" rx="42.5" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>

//               <div className="text-center">
//                 <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
//                   Subscribed Successfully
//                 </div>
//                 {/* <div className="text-[16px] font-[500] text-[#333]">
//                 Check your email for confirmation
//             </div> */}
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setIsSubcrib(false)}
//                   className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       }

//     </>
//   );
// }

// export default Recruiter_page;

// import React, { useEffect, useRef, useState } from "react";
// import ExpandSection from "./ExpandSection";
// import LastSection from "./LastSection";
// import RecruiterAnimation from "./RecruiterAnimation";
// import RecruiterHero from "./RecruiterHero";
// import { Background, Parallax } from "react-parallax";
// import { ReactLenis } from "@studio-freight/react-lenis";
// import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
// import PrecisionMatching from "./PrecisionMatching";
// import TransformResume from "./TransformResume";
// import ClientSection from "./ClientSection";
// import Footer from "../../components/partials/footer/footer";
// import { useSelector } from "react-redux";

// function Recruiter_page() {
//   const [isSubscribe, setIsSubscribe] = useState(false);
//   const [showAnimationn, setShowAnimation] = useState(true);
//   const enablePopup = useSelector((state) => state.popup.enablePopup);
//   const [showScrollImage, setShowScrollImage] = useState(false);

//   const handleScroll = () => {
//     const scrollY = window.scrollY || window.pageYOffset;
//     if (scrollY > 400) {
//       setShowAnimation(false);
//     }
//     if (scrollY > window.innerHeight) {
//       setShowScrollImage(true);
//     } else {
//       setShowScrollImage(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <div className="unblockRecruiter">
//         <div className="overflow-hidden">
//           <RecruiterHero />
//         </div>
//         <PrecisionMatching />
//         <TransformResume />
//         <ClientSection />
//       </div>

//       <div className="heroBlock relative">
//         {showScrollImage && (
//           <img
//             src="/images/ar.png"
//             alt=""
//             className="fixed top-[90vh] right-[2vw] z-[300000] h-[52px] w-[52px] cursor-pointer"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           />
//         )}
//         <ReactLenis root>
//           <Parallax strength={300} className="h-[100vh]">
//             <Background className="custom-bg">
//               <RecruiterHero />
//             </Background>
//           </Parallax>
//           <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
//             {/* <RecruiterAnimation showAnimationn={!showAnimationn} /> */}
//             <PrecisionMatching />
//           </div>
//           <Parallax
//             strength={400}
//             className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center"
//           >
//             <Background className="custom-bg">
//               <TransformResume />
//             </Background>
//           </Parallax>
//           <ClientSection />
//         </ReactLenis>
//       </div>
//       {!enablePopup && <SubscriptionPlan fromMain={true} />}
//       <Footer isSubscribe={isSubscribe} setIsSubscribe={setIsSubscribe} />

//       {isSubscribe && (
//         <>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
//             <div className="absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%]">
//               <svg
//                 className="absolute top-[-40px] left-[38%] right-[62%] flex"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="85"
//                 height="85"
//                 viewBox="0 0 85 85"
//                 fill="none"
//               >
//                 <g clipPath="url(#clip0_6622_116765)">
//                   <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
//                   <g mask="url(#mask0_6622_116765)">
//                     <path
//                       d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
//                       fill="white"
//                     />
//                   </g>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_6622_116765">
//                     <rect width="85" height="85" rx="42.5" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>

//               <div className="text-center">
//                 <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
//                   Subscribed Successfully
//                 </div>
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setIsSubscribe(false)}
//                   className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Recruiter_page;

// import React, { useEffect, useRef, useState } from "react";
// import ExpandSection from "./ExpandSection";
// import LastSection from "./LastSection";
// import RecruiterAnimation from "./RecruiterAnimation";
// import RecruiterHero from "./RecruiterHero";
// import { Background, Parallax } from "react-parallax";
// import { ReactLenis } from "@studio-freight/react-lenis";
// import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
// import PrecisionMatching from "./PrecisionMatching";
// import TransformResume from "./TransformResume";
// import ClientSection from "./ClientSection";
// import Footer from "../../components/partials/footer/footer";
// import { useSelector } from "react-redux";

// function Recruiter_page() {
//   const [isSubscribe, setIsSubscribe] = useState(false);
//   const [showAnimationn, setShowAnimation] = useState(true);
//   const enablePopup = useSelector((state) => state.popup.enablePopup);
//   const [showScrollImage, setShowScrollImage] = useState(false);

//   const handleScroll = () => {
//     const scrollY = window.scrollY || window.pageYOffset;
//     if (scrollY > 400) {
//       setShowAnimation(false);
//     }
//     if (scrollY > window.innerHeight) {
//       setShowScrollImage(true);
//     } else {
//       setShowScrollImage(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <div className="unblockRecruiter">
//         <div className="overflow-hidden">
//           <RecruiterHero />
//         </div>
//         <PrecisionMatching />
//         <TransformResume />
//         <ClientSection />
//       </div>

//       <div className="heroBlock relative">
//         {showScrollImage && (
//           <img
//             src="/images/ar.png"
//             alt=""
//             className="fixed top-[90vh] right-[2vw] z-[300000] h-[52px] w-[52px] cursor-pointer"
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           />
//         )}
//         <ReactLenis root>
//           <Parallax strength={300} className="h-[100vh]">
//             <Background className="custom-bg">
//               <RecruiterHero />
//             </Background>
//           </Parallax>
//           <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
//             <PrecisionMatching />
//           </div>
//           <Parallax
//             strength={400}
//             className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center"
//           >
//             <Background className="custom-bg">
//               <TransformResume />
//             </Background>
//           </Parallax>
//           <ClientSection />
//         </ReactLenis>
//       </div>
//       {!enablePopup && <SubscriptionPlan fromMain={true} />}
//       <Footer isSubscribe={isSubscribe} setIsSubscribe={setIsSubscribe} />

//       {isSubscribe && (
//         <>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
//           <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
//             <div className="absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%]">
//               <svg
//                 className="absolute top-[-40px] left-[38%] right-[62%] flex"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="85"
//                 height="85"
//                 viewBox="0 0 85 85"
//                 fill="none"
//               >
//                 <g clipPath="url(#clip0_6622_116765)">
//                   <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
//                   <g mask="url(#mask0_6622_116765)">
//                     <path
//                       d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
//                       fill="white"
//                     />
//                   </g>
//                 </g>
//                 <defs>
//                   <clipPath id="clip0_6622_116765">
//                     <rect width="85" height="85" rx="42.5" fill="white" />
//                   </clipPath>
//                 </defs>
//               </svg>

//               <div className="text-center">
//                 <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
//                   Subscribed Successfully
//                 </div>
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setIsSubscribe(false)}
//                   className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default Recruiter_page;

import React, { useEffect, useState } from "react";
import ExpandSection from "./ExpandSection";
import LastSection from "./LastSection";
import RecruiterAnimation from "./RecruiterAnimation";
import RecruiterHero from "./RecruiterHero";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
import PrecisionMatching from "./PrecisionMatching";
import TransformResume from "./TransformResume";
import ClientSection from "./ClientSection";
import Footer from "../../components/partials/footer/footer";
import { useSelector } from "react-redux";

function RecruiterPage() {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const enablePopup = useSelector((state) => state.popup.enablePopup);
  const [showScrollImage, setShowScrollImage] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    setShowScrollImage(scrollY > window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="unblockRecruiter">
        <div className="overflow-hidden">
          <RecruiterHero />
        </div>
        <PrecisionMatching />
        {/** <TransformResume />*/}
        <ClientSection />
      </div>

      <div className="heroBlock relative">
        {showScrollImage && (
          <img
            src="/images/ar.png"
            alt=""
            className="fixed top-[90vh] right-[2vw] z-[30000000000] h-[52px] w-[52px] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        )}
        <ReactLenis root>
          <Parallax strength={300} className="h-[100vh]">
            <Background className="custom-bg">
              <RecruiterHero />
            </Background>
          </Parallax>
          <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
            <PrecisionMatching />
          </div>
         {/** <Parallax
            strength={400}
            className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center"
          >
            <Background className="custom-bg">
              <TransformResume />
            </Background> 
          </Parallax>*/}
          <ClientSection />
        </ReactLenis>
      </div>
      {!enablePopup && <SubscriptionPlan fromMain={true} />}
      <Footer isSubscribe={isSubscribe} setIsSubscribe={setIsSubscribe} />

      {isSubscribe && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
            <div className="absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%]">
              <svg
                className="absolute top-[-40px] left-[38%] right-[62%] flex"
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
                fill="none"
              >
                <g clipPath="url(#clip0_6622_116765)">
                  <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                  <g mask="url(#mask0_6622_116765)">
                    <path
                      d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6622_116765">
                    <rect width="85" height="85" rx="42.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="text-center">
                <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
                  Subscribed Successfully
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsSubscribe(false)}
                  className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RecruiterPage;







