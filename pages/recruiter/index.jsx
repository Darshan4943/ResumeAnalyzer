import React, { useEffect, useRef, useState } from "react";
import ExpandSection from "@/components/featured/recruiter/ExpandSection";
import LastSection from "@/components/featured/recruiter/LastSection";
import RecruiterAnimation from "@/components/featured/recruiter/RecruiterAnimation";
import RecruiterHero from "@/components/featured/recruiter/RecruiterHero";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";

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
  
        <div 
        className="unblockRecruiter">
        
          <RecruiterHero />
          <RecruiterAnimation />
          <ExpandSection />
          <LastSection />
        </div>
    
        <div
        className="heroBlock">
          {" "}
          <ReactLenis root>
            <Parallax
              strength={300}
              className="h-[31rem] ml:h-[45rem] pt-[36px] "
            >
              <Background className="custom-bg  ">
                <RecruiterHero />
              </Background>
            </Parallax>
            <div className="h-[32rem] ml:h-[80vh] pt-[3rem]">
              <RecruiterAnimation showAnimationn={!showAnimationn} />
            </div>
            <Parallax strength={400} className="h-[48rem] pt-[36px] ">
              <Background className="custom-bg  ">
                <ExpandSection />
              </Background>
            </Parallax>
            <LastSection />
          </ReactLenis>
        </div>
      
    </>
  );
}

export default Recruiter_page;
