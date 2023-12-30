import { React, useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";
import { jobCatData } from "@/utils/data";

function JobCategories() {
  const trustedRef = useRef();
  const cardRef = useRef();

  const yPathSeter = (index) => {
    return index === 0 || index === 3 || index === 6 || index === 9
      ? translateY
      : index === 1 || index === 4 || index === 7 || index === 10
      ? translateY1
      : index === 2 || index === 5 || index === 8 || index === 11
      ? translateY2
      : translateY2;
  };

  const { scrollYProgress } = useScroll(
    {
      target: trustedRef,
      offset: ["start end", "end start"],
    },
    {
      target: cardRef,
      offset: ["start end", "end center"],
    }
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.5, 0.75, 1],
    [-900, -700, 0, 0, 700, 900]
  );

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.5, 0.75, 1],
    [900, 700, 0, 0, -700, -900]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.5, 0.75, 1],
    [1600, 100, 0, 0, -150, -1600]
  );

  const translateY1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.5, 0.75, 1],
    [1400, 200, 0, 0, -200, -1400]
  );

  const translateY2 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.48, 0.5, 0.75, 1],
    [1200, 400, 0, 0, -400, -1200]
  );

  return (
    <div className="trust_section_parent  w-screen relative" ref={trustedRef}>
      <div className="popular_job">
        <motion.p id="popular_job" style={{ x }}>
          Popular Job Categories
        </motion.p>
        <motion.p id="popular_info" style={{ translateX }}>
          Discover exciting career opportunities in popular fields, from
          technology to healthcare, finance to marketing, and more.
        </motion.p>
      </div>
      <div className="customMargins ">
        <div className="job_cat_card pt-4 ">
          {jobCatData.map((item, index) => (
            <motion.div
              ref={cardRef}
              className="card z-50"
              key={index}
              style={{
                y: yPathSeter(index),
              }}
            >
              <motion.img
                className="card_img"
                src={item.img}
                alt=""
                whileHover={{ scale: 1.1, rotateY: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <div className="flex flex-col gap-1">
                <p id="card_budget">{item.name}</p>
                <p id="card_job">{item.job}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobCategories;
