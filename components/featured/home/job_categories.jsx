import { React, useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";
import { jobCatData } from "@/utils/data";
import { useMediaQuery } from "@react-hook/media-query";


function JobCategories() {

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const trustedRef = useRef();
  const cardRef = useRef();

  const yPathSeter = (index) => {
    return index === 0 || index === 2 || index === 4 || index === 7 || index === 9  || index === 11 
      ? translateY
      : translateY1
     
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
    [0, 0.2, 0.41, 0.5, 0.75, 1],
    [-900, -700, 0, 0, 700, 900]
  );

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.41, 0.5, 0.75, 1],
    [900, 700, 0, 0, -900, -900]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.41, 0.5, 0.75, 1],
    [600, 200, 0, 0, -200, -600]
  );

  const translateY1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.41, 0.5, 0.75, 1],
    [800, 300, 0, 0, -300, -400]
  );

  const translateY2 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.41, 0.5, 0.75, 1],
    [1200, 400, 0, 0, -400, -1200]
  );

  return (
    <>
      <div className="mobile">
        <div className="flex flex-col gap-10  px-2">
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <p className="text-[20px] font-bold" >
              Popular Job Categories
            </p >
            <p className="text-[14px] font-normal text-[#705E5E] " >
              Discover exciting career opportunities in popular fields, from technology to healthcare, finance to marketing, and more.

            </p>
          </div >

          <div className=" flex flex-wrap items-center justify-center gap-4 "  >
            {jobCatData.map((item, index) => (
              <div
                style={{ boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.25)" }}
                className="w-[108px] h-[128px] flex flex-col gap-3 z-50 items-center justify-center rounded-[8px] bg-[#FFF] py-2 px-1"


              >
                <img
                  className="h-[46px] w-[46px]"
                  src={item.img}
                  alt=""

                />
                <div className="flex flex-col gap-1 text-center text-[12px] font-medium">
                  <p>{item.name}</p>
                  <p className="text-[#646464]">{item.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="web">
        <div className="trust_section_parent  w-screen relative" ref={trustedRef}>
          <div className="popular_job">
            <motion.p id="popular_job" style={{ x }
            }>
              Popular Job Categories
            </motion.p >
            <motion.p id="popular_info" style={{ translateX }}>
              Discover exciting career opportunities in popular fields, from
              technology to healthcare, finance to marketing, and more.
            </motion.p>
          </div >
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
        </div >
      </div>

    </>
  );
}

export default JobCategories;
