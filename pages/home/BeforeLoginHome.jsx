import React, { useEffect, useRef } from "react";
const HeroSection = dynamic(
  () => import("@/components/featured/home/hero_section"),
  {
    ssr: false,
  }
);
import ForCandidate from "@/components/featured/home/for_candidate";

import Profile_creation from "@/components/featured/home/profile_creation";
import TrustedBySection from "@/components/featured/home/trusted_section";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import JobCategories from "@/components/featured/home/job_categories";
import dynamic from "next/dynamic";
import Testimonial from "@/components/featured/home/Testimonial";
import { useMediaQuery } from "@react-hook/media-query";
import ResumeSection from "@/components/featured/home/resumeSection";
import GenerateAi from "@/components/featured/home/GenerateAi";




function BeforeLoginHome() {
  const lenisRef = useRef();
  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  return (
   <div>
      {/* {isViewportBelow850 ? ( */}
        <div className="mobile">
    
        <HeroSection />
        <ResumeSection/>
        <TrustedBySection />
        <JobCategories />
        <GenerateAi />
        <ForCandidate />
        <Profile_creation />
        
        <Testimonial />
      </div>
      {/* ) : ( */}
        <div className="web">
        <ReactLenis root>
          <Parallax strength={300} className="h-[200vh]  pt-[36px]">
            <Background className="custom-bg">
              <HeroSection />
              <ResumeSection/>
              <TrustedBySection />
            </Background>
          </Parallax>
          {/* Add other Parallax components as needed */}
          <Parallax strength={100} className="h-[45rem] pt-[36px] ">
            <Background className="custom-bg ">
              <JobCategories />
            </Background>
          </Parallax>
          <Parallax strength={100} className="h-[45rem]  pt-[36px] ">
            <Background className="custom-bg  ">
              <GenerateAi />
            </Background>
          </Parallax>
          <Parallax strength={300} className="h-[62rem]  pt-[36px]">
            <Background className="custom-bg ">
              <ForCandidate />
            </Background>
          </Parallax>
          <Profile_creation />
          <Testimonial />
        </ReactLenis>
        </div>
      {/* )} */}
    </div>
  );
}

export default BeforeLoginHome;
