import React from "react";
import HeroSection from "~/components/featured/home/HeroSection";
import ForCandidate from "~/components/featured/home/ForCandidate";
import Testimonial from "~/components/featured/home/Testimonial";
import Testimonial_2 from "~/components/featured/home/Testimonial_2";
import TrustedBySection from "~/components/featured/home/TrustedSection";
import Profile_creation from "~/components/featured/home/ProfileCreation";
function HomePage() {
  return (
    <div>
      {/* <HeroSection />
      <TrustedBySection />
      <ForCandidate /> */}
      <Profile_creation />
      {/* <Testimonial />
      <Testimonial_2 /> */}
    </div>
  );
}

export default HomePage;
