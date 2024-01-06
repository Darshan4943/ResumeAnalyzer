import Challenge from "@/components/featured/candidate/beforeLogin/Challenge";
import Interview from "@/components/featured/candidate/beforeLogin/Interview";
import Candidate_animation from "@/components/featured/candidate/beforeLogin/animation";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { Background, Parallax } from "react-parallax";
const CandidateHero = dynamic(
  () => import("@/components/featured/candidate/beforeLogin/HeroSection"),
  {
    ssr: false,
  }
);
function Candidate() {
  const lenisRef = useRef();

  // useEffect(() => {
  //   function update(time) {
  //     lenisRef.current?.raf(time * 300);
  //   }
  //   gsap.ticker.add(update);
  //   return () => {
  //     gsap.ticker.remove(update);
  //   };
  // });
  return (
    <div>
      <ReactLenis root >
        <Parallax strength={300} className="h-[36rem] pt-[36px] ">
          <Background className="custom-bg  ">
            <CandidateHero />
          </Background>
        </Parallax>

        <Candidate_animation />
        <Parallax strength={300} className="h-[36rem] pt-[36px] ">
          <Background className="custom-bg  ">
            <Interview />
          </Background>
        </Parallax>

        <Challenge />
      </ReactLenis>
    </div> 
  );
}

export default Candidate;
