import React, { useEffect, useState } from "react";
import Employer_hire_candidates from "@/components/featured/employer/Employer_hire_candidates";
import Employer_main from "@/components/featured/employer/Employer_main";
import Employer_sorting from "@/components/featured/employer/Employer_sorting";
import Employer_why_skilotech from "@/components/featured/employer/Employer_why_skilotech";
import Employer_why_skilotech_sec2 from "@/components/featured/employer/Employer_why_skilotech_sec2";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import Employer_main_phn from "@/components/featured/employer/Employer_main_phn";
function Employer() {
  const [showAnimation, setShowAnimation] = useState(true);
  const handleScroll = () => {
    if (window.scrollY > 375) {
      setShowAnimation(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ReactLenis root>
        <Parallax strength={400} className="Employer_main_paralx pt-[56px] ">
          <Background className="custom-bg  ">
            <Employer_main />
            <div className="Employer_main_phn">
              <Employer_main_phn />
            </div>
          </Background>
        </Parallax>
        <Employer_sorting showAnimation={showAnimation} />
        <Parallax strength={400} className="Employer_hire_candidates_paralx   ">
          <Background className="custom-bg  ">
            <Employer_hire_candidates />
          </Background>
        </Parallax>
        <Employer_why_skilotech />
        <Employer_why_skilotech_sec2 />
      </ReactLenis>
    </div>
  );
}

export default Employer;
