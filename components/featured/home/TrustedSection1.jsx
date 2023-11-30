import { React, useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
function TrustedBySection1() {
  const root = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      //   gsap.to(".box2", { x: "400", autoAlpha: 1, duration: 1 });

      gsap.to(".trust_section", { y: "-200", duration: "3" });
      // gsap.to(".box2", { x: '-400', autoAlpha: 1, duration: 1 });
      // gsap.to(".box2", { x: "-200",duration:'3'  });
      //   gsap.to(".box3", { y: "0", autoAlpha: 1, duration: 1 });
      //   gsap.to(".box3", { y: "-400", duration: "3" });
      //   gsap.to(".box4", { y: "500", autoAlpha: 1, duration: 1 });
      //   gsap.to(".box4", {
      //     y: "-200",
      //     duration: "5",
      //     stagger: { from: "random", each: "0.2" },
      //   });
      // gsap.fromTo( ".box2",{ x: -400, fill: 'blue', }, { x: 400, fill: 'green' });
    }, root); // <- scopes all selector text to the root element

    return () => ctx.revert();
  });

  return (
    <div className="trust_section_parent" ref={root}>
      <div className="trust_section">
        <p id="trust">Trusted by...</p>
        <div className="trust_img">
          <img src="./images/home/scroller-img_1.png" alt="" />
          <img src="./images/home/scroller-img_2.png" alt="" />
          <img src="./images/home/scroller-img_3.png" alt="" />
          <img src="./images/home/scroller-img_4.png" alt="" />
          <img src="./images/home/scroller-img_5.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default TrustedBySection1;
