import React, { useEffect, useRef, useState } from "react";
import AOS from 'aos';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
// import { Parallax } from 'react-parallax';
import HeroSection from "~/components/featured/home/HeroSection";
import ForCandidate from "~/components/featured/home/ForCandidate";
import Testimonial from "~/components/featured/home/Testimonial";
import Testimonial_2 from "~/components/featured/home/Testimonial_2";

import Profile_creation from "~/components/featured/home/ProfileCreation";
import TrustedBySection2 from "~/components/featured/home/TrustedSection2";
import TrustedBySection1 from "~/components/featured/home/TrustedSection1";
function HomePage() {

  const [iscandidate, setIsCandidate] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isProfileClosed, setIsProfileClosed] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

    const handleScroll = () => {
      if (window.scrollY >= 2400) {
        setIsProfileClosed(true);
        setIsProfile(false);
        setIsCandidate(false);
      } else if (window.scrollY >= 2000) {
        setIsProfile(true);
        setIsProfileClosed(false);
        setIsCandidate(false);
      } else if (window.scrollY >= 1300) {
        setIsCandidate(true);
        setIsProfile(false);
        setIsProfileClosed(false);
       
      } else {
        setIsCandidate(false);
        setIsProfile(false);
        if (window.scrollY < 3000) {
          setIsProfileClosed(false);
        }
      }
    };
 
  
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const containerStyle = {
    opacity: iscandidate ? 1 : 0,
    transition: 'opacity 5s ease',
  };

  const containerStyle1 = {
    opacity: isProfile ? 1 : 0,
    transition: 'opacity 8s ease',
  };
  const containerStyle2 = {
    opacity: isProfileClosed ? 1 : 0,
    transition: 'opacity 5s ease',
  };
  



  return (
    <div >
      <div  className="layer1">
      <HeroSection />
      </div>
      <div className="layer2">
      <TrustedBySection1 />
      </div>
      <div className="layer2">
      <TrustedBySection2 />
      </div>
      <div className="layer3">
      
      </div>
      <div style={containerStyle} className="layer4 ">
        <ForCandidate />
      </div>
      <div style={containerStyle1} className="layer5 ">
        <Profile_creation />
      </div>
      <div  style={containerStyle2} className="layer6 ">
      <Testimonial />
      </div>
      <div  style={containerStyle2}className="layer7 ">
      <Testimonial_2 />
      </div>



      {/* <Parallax pages={3} >
        <ParallaxLayer offset={0} speed={4} >
          <HeroSection />
        </ParallaxLayer>

        <ParallaxLayer offset={0.9} speed={3} >
          <TrustedBySection1 />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={4} >
          <TrustedBySection2 />
        </ParallaxLayer>

        <ParallaxLayer offset={1.8} speed={6}  >
          <ForCandidate />
        </ParallaxLayer>

        <ParallaxLayer offset={2.1} speed={3}  >
          <Profile_creation />
        </ParallaxLayer>

        <ParallaxLayer offset={2.7} speed={1.5} >
          <Testimonial />
          <Testimonial_2 />
        </ParallaxLayer>


      </Parallax> */}


      {/* <div>
      <div className="parallax-container">
        <Parallax strength={600} className="parallax">
          <div>
            <HeroSection />
          </div>
        </Parallax>
      </div>

      <div className="parallax-container">
        <Parallax strength={300} className="parallax">
          <div>
            <TrustedBySection />
          </div>
        </Parallax>
      </div>
    </div> */}

    </div>
  );
}

export default HomePage;
