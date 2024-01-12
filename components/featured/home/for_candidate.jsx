import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import ImageContainer from "@/components/common/image";
import { useMediaQuery } from "@react-hook/media-query";

function ForCandidate() {
  const [moveLeft, setmoveLeft] = useState(false);
  const [moveRight, setmoveRight] = useState(false);
  const [initial, setInitial] = useState(true);
  const [moveRightagain, setMoveRightAgain] = useState(false);
  const [recall, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [isBouncingUp, setIsBouncingUp] = useState(true);
  const [isBouncingDown, setIsBouncinDown] = useState(true);
  
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const slowConfig = {
    duration: 1000,
  };

  const bounceUp = {
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(200px)" },
  };

  const bounceDown = {
    from: { transform: "translateY(200px)" },
    to: { transform: "translateY(0px)" },
  };

  const springProps1 = useSpring({
    ...bounceUp,
    config: slowConfig,
    reverse: isBouncingUp,
    pauseTransition: isBouncingUp,
    onRest: () => {
      setTimeout(() => {
        setIsBouncingUp(!isBouncingUp);
        setToggle(!toggle);
      }, 5000);
    },
  });

  const springProps2 = useSpring({
    ...bounceDown,
    config: slowConfig,
    reverse: isBouncingDown,
    pauseTransition: isBouncingDown,
    onRest: () => {
      setTimeout(() => {
        setIsBouncinDown(!isBouncingDown);
        setToggle(!toggle);
      }, 5000);
    },
  });

  const data = [
    {
      img1: "/images/home/for_1.png",
      name1: "Create Your Free Account",
      img2: "/images/home/candidate_1.png",
      name2: "Register your organization",
    },
    {
      img1: "/images/home/for_2.png",
      name1: "Built your Profile",
      img2: "/images/home/candidate_2.png",
      name2: "Post the required Job Openings",
    },
    {
      img1: "/images/home/for_3.png",
      name1: "Search & Apply your dream Job",
      img2: "/images/home/candidate_3.png",
      name2: "Get desired talent shortlisted",
    },
    {
      img1: "/images/home/for_4.png",
      name1: "Get Hired by a desired company",
      img2: "/images/home/candidate_4.png",
      name2: "Schedule interview & Hire right talent",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setmoveLeft(false);
      setmoveRight(false);
      setInitial(true);
      setMoveRightAgain(false);
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const imageleftTimer = setTimeout(() => {
      setInitial(false);
    }, 1000);

    return () => {
      clearTimeout(imageleftTimer);
    };
  }, [recall]);
  useEffect(() => {
    const imageleftTimer = setTimeout(() => {
      setMoveRightAgain(true);
    }, 9000);

    return () => {
      clearTimeout(imageleftTimer);
    };
  }, [recall]);
  useEffect(() => {
    const imageleftTimer = setTimeout(() => {
      setmoveRight(true);
    }, 2000);

    return () => {
      clearTimeout(imageleftTimer);
    };
  }, [recall]);
  useEffect(() => {
    const imageleftTimer = setTimeout(() => {
      setmoveRight(false);
    }, 6000);

    return () => {
      clearTimeout(imageleftTimer);
    };
  }, [recall]);
  useEffect(() => {
    const imageleftTimer = setTimeout(() => {
      setmoveLeft(false);
    }, 7000);

    return () => {
      clearTimeout(imageleftTimer);
    };
  }, [recall]);

  return (
    <>
      <div className="mobile">
        <div className="  mt-9 px-3 flex flex-col gap-8">
          <div className="flex flex-col gap-6 i">
            <div className="flex  flex-col     ">
              <div className={`flex gap-1 ${isViewportBelow600 ? 'text-[18px]' : 'text-[28px]'} font-bold`}>
                <p className="text-black">For </p>
                <p className="text-[#06A9EF]">Candidate</p>
              </div>
              <div className="flex  justify-center  "  >
                {data.map((item, index) => (
                  <>

                    <div
                      key={index}
                      style={{ marginTop: index % 2 === 0 ? '5%' : '20%', }}
                      className="w-[65px] h-[65px] scr360:w-[80px] scr360:h-[80px] scr420:w-[100px] scr420:h-[100px] sm:w-[120px] sm:h-[120px] scr540:w-[130px] scr540:h-[130px] ms:w-[140px] ms:h-[140px]  scr700:w-[150px] scr700:h-[150px] md:w-[160px] md:h-[160px] scr820:w-[170px] scr820:h-[170px] bg-[#ebeff089]  rounded-full items-center justify-center flex flex-col gap-1 text-center  "
                    >
                      <ImageContainer src={item.img1} alt="" className="w-[24px] h-[24px] scr360:w-[32px] scr360:h-[32px] scr420:w-[40px] scr420:h-[40px] sm:w-[48px] sm:h-[48px] scr540:w-[56px] scr540:h-[56px] ms:w-[64px] ms:h-[64px]  scr700:w-[72px] scr700:h-[72px] md:w-[80px] md:h-[80px] scr820:w-[88px] scr820:h-[88px]" />
                      <p className="text-[5.5px]   scr360:text-[7px]  scr420:text-[9px]   sm:text-[10px] scr540:text-[11px] ms:text-[12px] scr700:text-[13px]  scr820:text-[14px] md:text-[14px] font-medium ">{item.name1}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 i">
            <div className="flex  flex-col     ">
              <div className={`flex gap-1 ${isViewportBelow600 ? 'text-[18px]' : 'text-[28px]'} font-bold`}>
                <p className="text-black">For </p>
                <p className="text-[#FFDA1D]">Employer</p>
              </div>
              <div className="flex  justify-center    ">
                {data.map((item, index) => (
                  <>

                    <div
                      key={index}
                      style={{
                        marginTop: index % 2 === 0 ? '20%' : '5%',
                      }}

                      className="w-[65px] h-[65px] scr360:w-[80px] scr360:h-[80px] scr420:w-[100px] scr420:h-[100px] sm:w-[120px] sm:h-[120px] scr540:w-[130px] scr540:h-[130px] ms:w-[140px] ms:h-[140px]  scr700:w-[150px] scr700:h-[150px] md:w-[160px] md:h-[160px] scr820:w-[170px] scr820:h-[170px] bg-[#ebeff089] rounded-full  flex flex-col gap-1 text-center items-center justify-center  "
                    >

                      <ImageContainer src={item.img2} alt="" className="w-[24px] h-[24px] scr360:w-[32px] scr360:h-[32px] scr420:w-[40px] scr420:h-[40px] sm:w-[48px] sm:h-[48px] scr540:w-[56px] scr540:h-[56px] ms:w-[64px] ms:h-[64px]  scr700:w-[72px] scr700:h-[72px] md:w-[80px] md:h-[80px] scr820:w-[88px] scr820:h-[88px]" />
                      <p className="text-[5.5px]   scr360:text-[7px]  scr420:text-[9px]   sm:text-[10px] scr540:text-[11px] ms:text-[12px] scr700:text-[13px]  scr820:text-[14px] md:text-[14px] font-medium ">{item.name2}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
      <div className="web">
        <div className="forCandidate w-screen">
          <div className="line_animation">
            <div>
              <div className="yellow_line">
                <ImageContainer src="/images/home/yellow_line.png" alt="" />
                <motion.div
                  className="white_background"
                  animate={{
                    translateX: initial ? "100%" : moveLeft ? "-103%" : "103%",
                  }}
                  initial={{ opacity: moveLeft ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />

                <motion.div
                  className="white_background"
                  animate={{
                    translateX: initial ? "-100%" : moveRight ? "0%" : "-103%",
                  }}
                  initial={{ opacity: moveRight ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.div
                  className="white_background"
                  animate={{ translateX: moveRightagain ? "0%" : "103%" }}
                  initial={{ opacity: moveRightagain ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="blue_line">
                <ImageContainer src="/images/home/blue_line.png" alt="" />
                <motion.div
                  className="white_background"
                  animate={{
                    translateX: initial ? "-103%" : moveLeft ? "103%" : "-103%",
                  }}
                  initial={{ opacity: moveLeft ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />

                <motion.div
                  className="white_background"
                  animate={{
                    translateX: initial ? "100%" : moveRight ? "0%" : "103%",
                  }}
                  initial={{ opacity: moveRight ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.div
                  className="white_background"
                  animate={{ translateX: moveRightagain ? "0%" : "-103%" }}
                  initial={{ opacity: moveRightagain ? 0 : 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="for_candidate">
              <div className="customMargins">
                <div className="candidate_text">
                  <p id="for">For </p>
                  <p id="candidate">{toggle ? "Candidate" : "Employer"}</p>
                </div>
              </div>

              <div className="wrapper">
                {data.map((item, index) => (
                  <animated.div
                    className="create_account"
                    key={index}
                    style={index % 2 === 0 ? springProps1 : springProps2}
                  >
                    <div className="eclips">
                      <div
                        className={
                          toggle ? "circle_background" : "circle_background1"
                        }
                      />
                      <div className="create_acc_inner">
                        <div className="create_img">
                          {toggle ? (
                            <>
                              <ImageContainer src={item.img1} alt="" />
                              <p id="create_acc_text">{item.name1}</p>
                            </>
                          ) : (
                            <>
                              <ImageContainer src={item.img2} alt="" />
                              <p id="create_acc_text">{item.name2}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </animated.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForCandidate;
