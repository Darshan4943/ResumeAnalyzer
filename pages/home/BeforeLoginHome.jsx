import React, { useEffect, useState } from "react";
import HeroSection from "~/components/featured/home/HeroSection";
import ForCandidate from "~/components/featured/home/ForCandidate";
import Testimonial from "~/components/featured/home/Testimonial";
import Testimonial_2 from "~/components/featured/home/Testimonial_2";
import Profile_creation from "~/components/featured/home/ProfileCreation";
import { motion } from 'framer-motion';
import TrustedBySection from "~/components/featured/home/TrustedSection";

function BeforeLoginHome() {

  const [opacity3, setOpacity3] = useState(0);
  const [opacity1, setOpacity1] = useState(0);
  const [opacity2, setOpacity2] = useState(0);
  const [trustAnimation, setTrustAnimation] = useState(false);

  const handleScroll = () => {

    const scrollY = window.scrollY;

    if (scrollY >= 1200 && scrollY < 1900) {
      const mappedOpacity = (scrollY - 1200) / (1900 - 1200);
      setOpacity1(mappedOpacity);
    } else if (scrollY >= 2100 && scrollY < 2300) {
      const mappedOpacity = 1 - (scrollY - 1800) / (2300 - 1800);
      setOpacity1(mappedOpacity - 0.1);

      const mappedOpacity1 = (scrollY - 2100) / (2300 - 2100);
      setOpacity2(mappedOpacity1);
    } else if (scrollY >= 2500 && scrollY < 2800) {

      const mappedOpacity = 1 - (scrollY - 2500) / (2800 - 2500);
      setOpacity2(mappedOpacity - 0.1);
      const mappedOpacity1 = (scrollY - 2500) / (2800 - 2500);
      setOpacity3(mappedOpacity1);
      setTrustAnimation(true)
    } else if (scrollY < 1300) {
      setOpacity1(0);
      setOpacity2(0);
      setOpacity3(0);
    }
    else if (scrollY < 2100) {

      setOpacity2(0);

    }

  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerStyle = {
    opacity: opacity1,

  };

  const containerStyle1 = {
    opacity: opacity2,


  };
  const containerStyle2 = {
    opacity: opacity3,

  };


  return (
    <div >

      <div className="layer1">
        <HeroSection />
      </div>
      <div className="layer2">
        <TrustedBySection />
      </div>

      <div className="layer3">

      </div>

      <div style={containerStyle} className="layer4 ">
        <ForCandidate />
      </div>
      <div style={containerStyle1} className="layer5">
        <Profile_creation />
      </div>

      <motion.div

        initial={{ y: 300 }}
        animate={{ y: trustAnimation && 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}


        style={containerStyle2}
      >
        <div  >
          <Testimonial />
        </div>
        <div >
          <Testimonial_2 />
        </div>
      </motion.div>
    </div>
  );
}

export default BeforeLoginHome;

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


// import React from "react";
// import HeroSection from "~/components/featured/home/HeroSection";
// import ForCandidate from "~/components/featured/home/ForCandidate";
// import Testimonial from "~/components/featured/home/Testimonial";
// import Testimonial_2 from "~/components/featured/home/Testimonial_2";
// import TrustedBySection from "~/components/featured/home/TrustedSection";
// import Profile_creation from "~/components/featured/home/ProfileCreation";
// function HomePage() {
//   return (
//     <div>
//       <HeroSection />
//       <TrustedBySection />
//       <ForCandidate />
//       <Profile_creation />
//       <Testimonial />
//       <Testimonial_2 />
//     </div>
//   );
// }

// export default HomePage;