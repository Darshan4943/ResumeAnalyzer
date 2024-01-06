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
      {" "}
      <ReactLenis root >
        <Parallax strength={300} className="h-[36rem] pt-[36px] ">
          <Background className="custom-bg  ">
            <RecruiterHero />
          </Background>
        </Parallax>
        <div className="h-[40rem]">
          <RecruiterAnimation showAnimationn={!showAnimationn} />
        </div>
        <Parallax strength={400} className="h-[48rem] pt-[36px] ">
          <Background className="custom-bg  ">
            <ExpandSection />
          </Background>
        </Parallax>
        <LastSection />
      </ReactLenis>
    </>
  );
}

export default Recruiter_page;
