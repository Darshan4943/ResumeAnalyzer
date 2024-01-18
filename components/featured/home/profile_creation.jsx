import React, { useEffect, useRef, useState } from "react";

import { motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";


function Profile_creation() {
  const containerOneRef = useRef(null);
  const containerTwoRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const containerAnimation = useAnimation();

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");


  const handleScroll = () => {
    if (window.scrollY >= 3700 && !isAnimate) {
      setIsAnimate(true);
      setIsAnimation(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAnimate) {
      setIsVisible(true);
      containerAnimation.start({
        y: (window.scrollY - 3700) * 1,
        transition: { duration: 2.5 },
      });
    }
  }, [isAnimate, containerAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      if (value >= 4000) {
        if (containerOneRef.current && containerTwoRef.current) {
          containerOneRef.current.style.left = (value - 4000) * -1.6 + "px";
          containerTwoRef.current.style.left = (value - 4000) * 2.2 + "px";
        }
      } else {
        if (containerOneRef.current && containerTwoRef.current) {
          containerOneRef.current.style.left = "0px";
          containerTwoRef.current.style.left = "0px";
        }
      }
      if (value >= 5000) {
        if (containerOneRef.current && containerTwoRef.current) {
          containerOneRef.current.style.zIndex = 100;
          containerTwoRef.current.style.zIndex = 100;
          containerOneRef.current.style.background = "#fff";
          containerTwoRef.current.style.background = "#fff";
          // containerOneRef.current.style.height = "80vh";
          // containerTwoRef.current.style.height = "80vh";
          containerOneRef.current.style.transition = "all 0.1s";
          containerTwoRef.current.style.transition = "all 0.1s";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <>
      {/* {isViewportBelow850 ? */}
      <div className="mobile">
        <div className="flex flex-col gap-6 p-3 mt-12 justify-center items-center  ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-[36px] font-bold leading-tight">
                Ai Powered profile creation

              </div>
              <div className="text-[18px] font-medium">
                Easy process to create your profile

              </div>
            </div>
            <div className="text-[14px] font-medium text-[#646464]">
            It streamlines job searches, improves candidate-employer matches, and contributes to a more efficient and effective job-seeking process.

            </div>
            <div className="text-[14px] font-medium flex flex-col gap-2 ">

            <p>1. Upload your CV/Resume.</p>  
            <p>2. Let system scan it and make your profile almost ready..</p>  

            </div>

          </div>

          <div className=" p-3 min-h-[">
            <img
              className=""
              src="/images/home/lineAnimation.png"
              alt=""
            />
          </div>
        </div>
        </div>
        {/* : */}
       <div className="web">
        <div className="profile_creation_wrapper  container_temp ">
          <div className="profile_creation_container  ">
            <>
              <motion.div
                className="profile_creation_sub_container_one  "
                id="profile_creation_sub_container_one"
                ref={containerOneRef}
              >
                <p
                  className="profile_creation_head"
                  initial={{ y: "100vh" }}
                  animate={containerAnimation}
                >
                  Ai Powered profile creation
                </p>
                <p
                  className="profile_creation_head_one"
                  initial={{ y: "90vh" }}
                  animate={containerAnimation}
                >
                  Easy process to create your profile
                </p>
                <p
                  className="profile_creation_head_para"
                  initial={{ y: "80vh" }}
                  animate={containerAnimation}
                >
                  It streamlines job searches, improves candidate-employer matches,
                  and contributes to a more efficient and effective job-seeking
                  process.
                </p>
                <p
                  className="profile_creation_head_steps"
                  initial={{ y: "70vh" }}
                  animate={containerAnimation}
                >
                  1. Upload your CV/Resume.
                </p>
                <p
                  className="profile_creation_head_steps"
                  initial={{ y: "60vh" }}
                  animate={containerAnimation}
                >
                  2. Let system scan it and make your profile almost ready.
                </p>
              </motion.div>

              <div
                ref={containerTwoRef}
                className="h-[42.2rem]"
                style={{ position: "relative", paddingLeft: "54px" }}
              >
                <div
                  className="profile_creation_sub_container_two"
                  id="profile_creation_sub_container_two"
                >
                  <img
                    className="Line_man"
                    src="/images/home/Line_man.png"
                    alt=""
                  />
                  {isAnimation && (
                    <>
                      <div
                        className="animation_9"
                        onMouseEnter={() => setIsHovered9(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered9(false);
                          }, 1000);
                        }}
                        style={{ zIndex: isHovered9 ? 2 : 20 }}
                      >
                        <div className="animation_9_1">
                          <div className="animation_line9_img9">
                            <img
                              src="/images/home/animation_line9_img9.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>

                          <div className="animation_9_2">
                            <motion.div
                              className=""
                              initial={{ x: "100%" }}
                              animate={{
                                x: isHovered9 ? ["0%", "100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "168px",
                                height: "90px",
                                background: "white",
                                position: "absolute",
                                left: -168,
                                zIndex: 20,
                              }}
                            ></motion.div>

                            <div className="animation_line9">
                              <img src="/images/home/animation_line9.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="animation_10"
                        onMouseEnter={() => setIsHovered10(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered10(false);
                          }, 1000);
                        }}
                      >
                        <div className="animation_10_1">
                          <div className="animation_line10_img10">
                            <img
                              src="/images/home/animation_line10_img10.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>

                          <div className="animation_10_2">
                            <motion.div
                              className=""
                              initial={{ x: "100%" }}
                              animate={{
                                x: isHovered10 ? ["0%", "100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "152px",
                                height: "80px",
                                background: "white",
                                position: "absolute",
                                left: -152,
                                zIndex: 2,
                              }}
                            ></motion.div>
                            <div className="animation_line10">
                              <img src="/images/home/animation_line10.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="animation_8"
                        onMouseEnter={() => setIsHovered8(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered8(false);
                          }, 1000);
                        }}
                      >
                        <div className="animation_8_1">
                          <div className="animation_line8_img8">
                            <img
                              src="/images/home/animation_line8_img8.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>

                          <div className="animation_8_2">
                            <motion.div
                              className=""
                              initial={{ x: "100%" }}
                              animate={{
                                x: isHovered8 ? ["0%", "100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "131px",
                                height: "80px",
                                background: "white",
                                position: "absolute",
                                left: -131,
                                zIndex: 2,
                              }}
                            ></motion.div>
                            <div className="animation_line8">
                              <img src="/images/home/animation_line8.png" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="animation_7"
                        onMouseEnter={() => setIsHovered7(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered7(false);
                          }, 1000);
                        }}
                        style={{ zIndex: isHovered7 ? 1 : 15 }}
                      >
                        <div className="animation_7_1">
                          <div className="animation_7_2">
                            <motion.div
                              className=""
                              initial={{ y: "-100%" }}
                              animate={{
                                y: isHovered7 ? ["0%", "-100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "80px",
                                height: "130px",
                                background: "white",
                                position: "absolute",
                                top: 100,
                              }}
                            ></motion.div>

                            <div className="animation_line7">
                              <img src="/images/home/animation_line7.png" alt="" />
                            </div>
                          </div>

                          <div className="animation_line7_img7">
                            <img
                              src="/images/home/animation_line7_img7.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="animation_6"
                        onMouseEnter={() => setIsHovered6(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered6(false);
                          }, 1000);
                        }}
                      >
                        <div className="animation_6_1">
                          <div className="animation_6_2">
                            <motion.div
                              className=""
                              initial={{ x: "-100%" }}
                              animate={{
                                x: isHovered6 ? ["0%", "-100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "131px",
                                height: "50px",
                                background: "white",
                                position: "absolute",
                                left: 110,
                                zIndex: 2,
                              }}
                            ></motion.div>
                            <div className="animation_line6">
                              <img src="/images/home/animation_line6.png" alt="" />
                            </div>
                          </div>

                          <div className="animation_line6_img6">
                            <img
                              src="/images/home/animation_line6_img6.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="animation_5"
                        onMouseEnter={() => setIsHovered5(true)}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setIsHovered5(false);
                          }, 1000);
                        }}
                        style={{ zIndex: isHovered5 ? 2 : 20 }}
                      >
                        <div className="animation_5_1">
                          <div className="animation_5_2">
                            <motion.div
                              className=""
                              initial={{ x: "-100%" }}
                              animate={{
                                x: isHovered5 ? ["0%", "-100%", "0%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "110px",
                                height: "50px",
                                background: "white",
                                position: "absolute",
                                overflow: "hidden",
                                left: 111,
                              }}
                            ></motion.div>
                            <div className="animation_line5">
                              <img src="/images/home/animation_line5.png" alt="" />
                            </div>
                          </div>

                          <div className="animation_line5_img5">
                            <img
                              src="/images/home/animation_line5_img5.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="animation_4">
                        <div className="animation_4_1">
                          <div className="animation_4_2">
                            <motion.div
                              className=""
                              initial={{ y: "100%" }}
                              animate={{
                                y: isHovered4 ? ["-15%", "100%", "-15%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "54px",
                                height: "100%",
                                background: "white",
                                position: "absolute",
                                top: -207,
                                zIndex: 6,
                              }}
                            ></motion.div>

                            <div className="animation_line4">
                              <img src="/images/home/animation_line4.png" alt="" />
                            </div>
                          </div>

                          <div
                            className="animation_line4_img4"
                            onMouseEnter={() => setIsHovered4(true)}
                            onMouseLeave={() => {
                              setTimeout(() => {
                                setIsHovered4(false);
                              }, 1000);
                            }}
                          >
                            <img
                              src="/images/home/animation_line4_img4.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="animation_3">
                        <div className="animation_3_1">
                          <div className="animation_3_2">
                            <motion.div
                              className=""
                              initial={{ y: "100%" }}
                              animate={{
                                y: isHovered3 ? ["-16%", "100%", "-16%"] : 0,
                              }}
                              transition={{ duration: 2 }}
                              style={{
                                width: "100px",
                                height: "100%",
                                background: "white",
                                position: "absolute",
                                top: -230,
                                right: 0,
                                zIndex: 26,
                              }}
                            ></motion.div>

                            <div className="animation_line3">
                              <img
                                style={{ height: "210px", width: "69px" }}
                                src="/images/home/animation_line3.png"
                                alt=""
                              />
                            </div>
                          </div>

                          <div
                            className="animation_line3_img3"
                            onMouseEnter={() => setIsHovered3(true)}
                            onMouseLeave={() => {
                              setTimeout(() => {
                                setIsHovered3(false);
                              }, 1000);
                            }}
                          >
                            <img
                              src="/images/home/animation_line3_img3.png"
                              alt=""
                              style={{
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>


            </>
          </div>
        </div>
        </div>
      {/* } */}
    </>
  );
}

export default Profile_creation;
