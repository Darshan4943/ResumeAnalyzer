import React, { useEffect, useState } from "react";
import ExpandSection from "~/components/featured/recruiter/ExpandSection";
import LastSection from "~/components/featured/recruiter/LastSection";
import RecruiterAnimation from "~/components/featured/recruiter/RecruiterAnimation";
import RecruiterHero from "~/components/featured/recruiter/RecruiterHero";


function Recruiter_page() {
 
  const [scrollY, setScrollY] = useState(0);
  const [showAnimationn,setShowAnimation] = useState(true)
  const handleScroll = () => {
    setScrollY(window.scrollY);
    if(window.scrollY>400){
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
    <>
      <RecruiterHero/>

      <RecruiterAnimation showAnimationn={!showAnimationn}/>

      <ExpandSection/>
      <LastSection/>
    </>
  );
}

export default Recruiter_page;
