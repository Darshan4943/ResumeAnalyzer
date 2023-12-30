import React, { useEffect, useState } from "react";
import Employer_hire_candidates from "@/components/featured/employer/Employer_hire_candidates";
import Employer_main from "@/components/featured/employer/Employer_main";
import Employer_sorting from "@/components/featured/employer/Employer_sorting";
import Employer_why_skilotech from "@/components/featured/employer/Employer_why_skilotech";
import Employer_why_skilotech_sec2 from "@/components/featured/employer/Employer_why_skilotech_sec2";
import { Background, Parallax } from "react-parallax";
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
      <Parallax strength={400} className="h-[36rem] pt-[56px] ">
        <Background className="custom-bg  ">
          <Employer_main />
        </Background>
      </Parallax>
      <Employer_sorting showAnimation={showAnimation} />
      <Parallax strength={400} className="h-[36rem] pt-[36px] ">
          <Background className="custom-bg  ">
          <Employer_hire_candidates />

          </Background>
        </Parallax>
      <Employer_why_skilotech />
      <Employer_why_skilotech_sec2 />
    </div>
  );
}

export default Employer;
