import React, { useEffect, useRef, useState } from "react";
import ExpandSection from "./ExpandSection";
import LastSection from "./LastSection";
import RecruiterAnimation from "./RecruiterAnimation";
import RecruiterHero from "./RecruiterHero";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
import PrecisionMatching from "./PrecisionMatching";
import TransformResume from "./TransformResume";
import ClientSection from "./ClientSection";

function Recruiter_page() {
  const [showAnimationn, setShowAnimation] = useState(true);
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowAnimation(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const lenisRef = useRef();

  return (
    <>
      <div className="unblockRecruiter">
       
        <div className=" overflow-hidden "> <RecruiterHero /></div>
        <PrecisionMatching/>
        <TransformResume />
        <ClientSection />
      </div>

      <div className="heroBlock">
        {" "}
        <ReactLenis root>
          <Parallax
            strength={300}
            className=" h-[100vh] pt-[36px] "
          >
            <Background className="custom-bg  ">
              <RecruiterHero />
            </Background>
          </Parallax>
          <div className="h-[32rem] ml:h-[47vw] pt-[3rem]">
            {/* <RecruiterAnimation showAnimationn={!showAnimationn} /> */}
            <PrecisionMatching/>
          </div>
          <Parallax strength={400} className="h-[32rem] ml:h-[50vw] pt-[36px] flex items-center ">
            <Background className="custom-bg  ">
            <TransformResume />
            </Background>
          </Parallax>
          <ClientSection />
        </ReactLenis>
      </div>
      <SubscriptionPlan fromMain={true} />
    </>
  );
}

export default Recruiter_page;
