import { React, useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
function TrustedBySection() {
  const trustedRef = useRef();
  const cardRef = useRef();
  const { scrollY } = useScroll();
  const controls = useAnimation();
  //   const [ref, inView] = useInView({
  //     triggerOnce: false,
  //   });

  //   useEffect(() => {
  //     // if (inView) {
  //       controls.start({
  //         y: -50,
  //       });
  //     // }
  //   }, [controls, inView]);

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
  //   const scaleX = useSpring(scrollYProgress, {
  //     // initial: -200,
  //     // x: 0,
  //     // stiffness: 100,
  //     // damping: 30,
  //     // restDelta: 0.001,
  //     from: { x: -200 },
  //     to: { x: 0 },
  //     config: { stiffness: 100, damping: 30 },
  //   });
  //   const popular = useRef();
  //   const { scrollYProgress } = useScroll(
  //     {
  //       target: trustedRef,
  //       offset: ["start end", "end start"],
  //     },
  //     { target: popular, offset: ["start left", "end,center"] }
  //   );

  //   const { scrollYProgress } = useScroll({
  //     target: trustedRef,
  //     offset: ["start end", "end start"],
  //   });

  const y = useTransform(scrollYProgress, [0, 0.4, 1], [100, 0, -200]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [-900, 0, 0, 0, 400]
  );

  const translateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [900, 0, 0, 0, -600]
  );

  const initialY = -100; // Adjust this value based on your needs
  // const translateY = useTransform(
  //   scrollYProgress,
  //   [0, 0.7, 1],
  //   [1000, -500, -1000]
  // );
  // const translateY1 = useTransform(
  //   scrollYProgress,
  //   [0, 0.7, 1],
  //   [800, -500, -1000]
  // );
  // const translateY2 = useTransform(
  //   scrollYProgress,
  //   [0, 0.7, 1],
  //   [600, -500, -800]
  // );
  // const translateY3 = useTransform(
  //   scrollYProgress,
  //   [0, 0.7, 1],
  //   [400, -500, -700]
  // );
  // const translateY4 = useTransform(
  //   scrollYProgress,
  //   [0, 0.7, 1],
  //   [200, -500, -600]
  // );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 1],
    [2000, 0, 0, 0, -500, -1000]
  );

  const translateY1 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 1],
    [1000, 0, 0, 0, -700, -1000]
  );

  const translateY2 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 1],
    [800, 0, 0, 0, -400, -800]
  );

  const translateY3 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 1],
    [600, 0, 0, 0, -200, -700]
  );

  const translateY4 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 1],
    [400, 0, 0, 0, -500, -600]
  );

  const data = [
    {
      img: "./images/home/finance.png",
      name: "Finance",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Marketing.png",
      name: "Marketing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/hr.png",
      name: "Human Resources",
      job: "1598 jobs",
    },
    {
      img: "./images/home/industry.png",
      name: "Industry",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Design & cr.png",
      name: "Design & Creative",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Component 14.png",
      name: "Content Writing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Development.png",
      name: "Development & IT",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Video editing.png",
      name: "Video Editing",
      job: "1598 jobs",
    },
    {
      img: "./images/home/Project management.png",
      name: "Project Management",
      job: "1598 jobs",
    },
    {
      img: "./images/home/accounts.png",
      name: "Accounts",
      job: "1598 jobs",
    },
    {
      img: "./images/home/organization.png",
      name: "Organization",
      job: "1598 jobs",
    },
    {
      img: "./images/home/networking.png",
      name: "Networking",
      job: "1598 jobs",
    },
  ];
  return (
    <div className="trust_section_parent" ref={trustedRef}>
      <motion.div className="trust_section" style={{ y }}>
        <p id="trust">Trusted by...</p>
        <div className="trust_img">
          <img src="./images/home/scroller-img_1.png" alt="" />
          <img src="./images/home/scroller-img_2.png" alt="" />
          <img src="./images/home/scroller-img_3.png" alt="" />
          <img src="./images/home/scroller-img_4.png" alt="" />
          <img src="./images/home/scroller-img_5.png" alt="" />
        </div>
      </motion.div>
      <div className="customMargins">
        <motion.div className="popular_job">
          <motion.p
            id="popular_job"
            // ref={popular}
            // initial={{ x: -100 }}
            // animate={{ x: 400 }}
            // transition={{ duration: 4 }}
            // style={{ scaleX }}
            style={{ x }}
          >
            Popular Job Categories
          </motion.p>
          <motion.p id="popular_info" style={{ translateX }}>
            Discover exciting career opportunities in popular fields, from
            technology to healthcare, finance to marketing, and more.
          </motion.p>
        </motion.div>

        <div className="job_cat_card">
          {data.map((item, index) => (
            <motion.div
              ref={cardRef}
              className="card"
              key={index}
              //   style={{ translateY }}

              style={{
                y:
                  index === 0 || index === 2 || index === 4
                    ? translateY
                    : index === 1 || index === 3 || index === 5
                    ? translateY1
                    : index === 6 || index === 8 || index === 10
                    ? translateY2
                    : index === 7 || index === 9 || index === 11
                    ? translateY3
                    : translateY4,
              }} //   ref={ref}
              //   initial={{ y: 50 }}
              //   animate={controls}
              transition={{
                type: "spring",
                stiffness: 20,
                damping: 10,
                duration: 3,
                delay:
                  index === 0 || index === 2 || index === 4
                    ? 1
                    : index === 1 || index === 3 || index === 5
                    ? 2
                    : index === 6 || index === 8 || index === 10
                    ? 3
                    : index === 7 || index === 9 || index === 11
                    ? 4
                    : 0,
              }}
            >
              <motion.img
                className="card_img"
                src={item.img}
                alt=""
                whileHover={{ scale: 1.1, rotateY: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <div>
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

export default TrustedBySection;
