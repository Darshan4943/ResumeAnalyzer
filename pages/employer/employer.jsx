import React, { useEffect, useState } from "react";
import Employer_hire_candidates from "~/components/featured/employer/Employer_hire_candidates";
import Employer_main from "~/components/featured/employer/Employer_main";
import Employer_sorting from "~/components/featured/employer/Employer_sorting";
import Employer_why_skilotech from "~/components/featured/employer/Employer_why_skilotech";
import Employer_why_skilotech_sec2 from "~/components/featured/employer/Employer_why_skilotech_sec2";
function Employer() {
  const [scrollY, setScrollY] = useState(0);
  const [showAnimation,setShowAnimation] = useState(true)
  const handleScroll = () => {
    // setScrollY(window.scrollY);
    if(window.scrollY>375){
      setShowAnimation(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div>
      
      {/* <Employer_main />
      <Employer_sorting showAnimation={showAnimation} />
      
      <Employer_hire_candidates />
      <Employer_why_skilotech />
      <Employer_why_skilotech_sec2 /> */}
    </div>
  );
}

export default Employer;