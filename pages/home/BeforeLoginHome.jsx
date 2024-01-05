import React, { useEffect, useRef } from "react";
const HeroSection = dynamic(
  () => import("@/components/featured/home/hero_section"),
  {
    ssr: false,
  }
);
import ForCandidate from "@/components/featured/home/for_candidate";
import Testimonial from "@/components/featured/home/testimonial";
import Profile_creation from "@/components/featured/home/profile_creation";
import TrustedBySection from "@/components/featured/home/trusted_section";
import { Background, Parallax } from "react-parallax";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import JobCategories from "@/components/featured/home/job_categories";
import dynamic from "next/dynamic";
function BeforeLoginHome() {
  const lenisRef = useRef();


  return (
    <div>
      <ReactLenis root ref={lenisRef} autoRaf={false}>
        <Parallax strength={400} className="h-[54.5rem] pt-[36px]">
          <Background className="custom-bg  ">
            <HeroSection />
          </Background>
        </Parallax>

        <Parallax strength={100} className="h-[14.125rem]   ">
          <Background className="custom-bg ">
            <TrustedBySection />
          </Background>
        </Parallax>
        <Parallax strength={100} className="h-[42rem] pt-[36px] ">
          <Background className="custom-bg ">
            <JobCategories />
          </Background>
        </Parallax>
        <Parallax strength={500} className="h-[62rem]  pt-[36px]">
          <Background className="custom-bg ">
            <ForCandidate />
          </Background>
        </Parallax>
        <Profile_creation />
        <Testimonial />
      </ReactLenis>
    </div>
  );
}

export default BeforeLoginHome;
