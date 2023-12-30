import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { Parallax } from "react-scroll-parallax";
function RecruiterAnimation({ showAnimationn }) {
  const [changeImage, setChangeImage] = useState(false);

  useEffect(() => {
    if (showAnimationn) {
      const imageChangeTimer = setTimeout(() => {
        setChangeImage(true);
      }, 4500);

      return () => {
        clearTimeout(imageChangeTimer);
      };
    }
  }, [showAnimationn]);

  const [slideImage, setslideImage] = useState(false);
  const [upImage, setsupImage] = useState(false);

  useEffect(() => {
    if (showAnimationn) {
      const imageslideTimer = setTimeout(() => {
        setslideImage(true);
        setChangeImage(false);
      }, 6000);

      return () => {
        clearTimeout(imageslideTimer);
      };
    }
  }, [showAnimationn]);
  useEffect(() => {
    if (showAnimationn) {
      const imageslideTimer = setTimeout(() => {
        setsupImage(true);
      }, 8000);

      return () => {
        clearTimeout(imageslideTimer);
      };
    }
  }, [showAnimationn]);

  const [downImage, setdownImage] = useState(false);

  useEffect(() => {
    if (showAnimationn) {
      const imagedownTimer = setTimeout(() => {
        setdownImage(true);
      }, 10000);

      return () => {
        clearTimeout(imagedownTimer);
      };
    }
  }, [showAnimationn]);
  const [leftImage, setleftImage] = useState(false);

  useEffect(() => {
    if (showAnimationn) {
      const imagedownTimer = setTimeout(() => {
        setleftImage(true);
      }, 16000);

      return () => {
        clearTimeout(imagedownTimer);
      };
    }
  }, [showAnimationn]);

  const [slideCollab, setslideCollab] = useState(false);

  useEffect(() => {
    if (showAnimationn) {
      const imagedownTimer = setTimeout(() => {
        setslideCollab(true);
      }, 14000);

      return () => {
        clearTimeout(imagedownTimer);
      };
    }
  }, [showAnimationn]);
  console.log(81, slideCollab);

  return (
    <div className="customMargins ">
      <div className="recruiter_animation">
        {showAnimationn ? (
          <>
            <motion.p
              className="recruiter_animation_p"
              animate={{
                x: upImage ? -1000 : slideImage ? -120 : 0,
                opacity: upImage ? 0 : 1,
              }}
            >
              Recruiter
            </motion.p>
            <motion.div
              animate={{ x: upImage ? -1000 : 0, opacity: upImage ? 0 : 1 }}
              className="vector"
              style={{
                justifyContent: slideImage ? "flex-start" : "center",
              }}
            >
              {slideImage ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="700"
                  height="40"
                  viewBox="0 0 1041 40"
                  fill="none"
                >
                  <path
                    d="M520.499 40.006C807.497 40.006 1040.15 31.0785 1040.15 20.0658C1040.15 9.05307 807.497 0.125488 520.499 0.125488C233.501 0.125488 0.84375 9.05307 0.84375 20.0658C0.84375 31.0785 233.501 40.006 520.499 40.006Z"
                    fill="#E4F4FF"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1041"
                  height="40"
                  viewBox="0 0 1041 40"
                  fill="none"
                >
                  <path
                    d="M520.499 40.006C807.497 40.006 1040.15 31.0785 1040.15 20.0658C1040.15 9.05307 807.497 0.125488 520.499 0.125488C233.501 0.125488 0.84375 9.05307 0.84375 20.0658C0.84375 31.0785 233.501 40.006 520.499 40.006Z"
                    fill="#E4F4FF"
                  />
                </svg>
              )}
            </motion.div>

            <motion.div
              className="group1"
              animate={{
                x: upImage ? -1000 : slideImage ? -400 : 0,
                opacity: upImage ? 0 : 1,
              }}
              initial={{ opacity: 1 }}
              transition={{
                duration: upImage ? 0.5 : 1,
                delay: slideImage ? 0 : 2,
                opacity: 1,
              }}
            >
              {changeImage ? (
                <img src="/images/recruiter/magnifying_man.png" alt="" />
              ) : (
                <img src="/images/recruiter/Group_man.png" alt="" />
              )}
            </motion.div>

            <motion.div
              className="group2"
              animate={{
                x: slideImage ? -900 : 0,
                opacity: slideImage ? 0 : 1,
              }}
              initial={{ opacity: 0, x: -900 }} // Initial opacity
              transition={{ duration: 1 }} // Animation duration
            >
              <img src="/images/recruiter/Group2.png" alt="" />
            </motion.div>

            <motion.div
              className="group3"
              animate={{
                x: leftImage
                  ? 450
                  : downImage
                  ? 230
                  : upImage
                  ? -150
                  : slideImage
                  ? -300
                  : 0,

                opacity: leftImage ? 0 : downImage ? 1 : upImage ? 0 : 1,
                y: downImage ? 10 : upImage ? -200 : 0,
                zIndex: downImage ? 1 : 0,
              }}
              initial={{ opacity: 0, x: -900 }} // Initial opacity
              transition={{
                duration: upImage ? 0.5 : 1,
                delay: slideImage ? 0 : 0.5,
              }} // Animation duration
            >
              <img src="/images/recruiter/Group3.png" alt="" />
            </motion.div>

            <motion.div
              className="group4"
              animate={{
                x: slideImage ? -900 : 0,
                opacity: slideImage ? 0 : 1,
              }}
              initial={{ opacity: 0, x: -900 }} // Initial opacity
              transition={{ duration: 1, delay: slideImage ? 0 : 1 }} // Animation duration
            >
              <img src="/images/recruiter/Group4.png" alt="" />
            </motion.div>

            <motion.div
              className="group5"
              animate={{
                x: slideImage ? -900 : 0,
                opacity: slideImage ? 0 : 1,
              }}
              initial={{ opacity: 0, x: -900 }} // Initial opacity
              transition={{ duration: 1, delay: slideImage ? 0 : 1.5 }} // Animation duration
            >
              <img src="/images/recruiter/Group5.png" alt="" />
            </motion.div>

            <motion.div
              className="group6"
              animate={{
                x: slideImage ? -900 : 0,
                opacity: slideImage ? 0 : 1,
              }}
              initial={{ opacity: 0, x: -900 }} // Initial opacity
              transition={{
                duration: 1,
                delay: slideImage ? 0 : 1.5,
                opacity: 0,
              }} // Animation duration
            >
              <img src="/images/recruiter/Group6.png" alt="" />
            </motion.div>

            <motion.div
              className="group7"
              animate={{
                x: slideImage ? -900 : 0,
                opacity: slideImage ? 0 : 1,
              }}
              initial={{ opacity: 0 }} // Initial opacity
              transition={{
                duration: slideImage ? 1 : 2,
                delay: slideImage ? 0 : 3,
                opacity: 0,
              }} // Animation duration
            >
              <img src="/images/recruiter/Group7.png" alt="" />
            </motion.div>

            <motion.div
              className="organisation_img"
              animate={{ opacity: upImage ? 1 : 0 }}
              initial={{ opacity: 0 }}
              transition={{ delay: upImage ? 1.5 : 0 }}
            >
              <img src="/images/recruiter/organisation_employer.png" alt="" />
              <motion.div
                className="white_back"
                animate={{ translateX: upImage ? "-100%" : "0%" }}
                initial={{ translateX: upImage ? "100%" : "0%" }}
                transition={{ duration: upImage ? 2 : 0, delay: 1 }}
              ></motion.div>
            </motion.div>

            <motion.div
              className="white_class"
              animate={{
                translateX: downImage ? "0%" : "0%",
                opacity: downImage ? 1 : 0,
              }}
              initial={{
                translateX: downImage ? "-100%" : "0%",
                opacity: downImage ? 1 : 0,
              }}
              transition={{
                duration: downImage ? 2 : 0,
                delay: downImage ? 3.5 : 0,
              }}
            ></motion.div>
            <motion.div
              className="collaborate_section"
              initial={{ opacity: slideCollab ? 1 : 0 }}
              animate={{ opacity: slideCollab ? 1 : 0 }}
              transition={{
                duration: slideCollab ? 1 : 0,
                delay: 2,
                zIndex: slideCollab ? 1 : 0,
              }}
            >
              <div className="collaborate_left">
                <p1>Collaborate with employers easily</p1>
                <p2>Increase the opportunities for your references</p2>
                <p3>
                  Connect your consulting firm with a diverse range of employers
                  through our platform. We offer a wide-reaching network to help
                  you expand your reach and grow your business. Partner with us
                  to access a broad spectrum of employment.
                </p3>
              </div>
              <motion.div
                className="collaborate_img"
                initial={{ opacity: slideCollab ? 1 : 0 }}
                animate={{ opacity: slideCollab ? 1 : 0 }}
                transition={{
                  duration: slideCollab ? 0.5 : 0,
                  delay: 2,
                  zIndex: slideCollab ? 1 : 0,
                }}
              >
                <img
                  src="/images/recruiter/collaborate_handshake.png"
                  alt="kk"
                />
              </motion.div>
            </motion.div>
          </>
        ) : (
          <div
            className="collaborate_sectionn"
            initial={{ opacity: slideCollab ? 1 : 0 }}
            animate={{ opacity: slideCollab ? 1 : 0 }}
            transition={{
              duration: slideCollab ? 0.5 : 0,
              delay: 1,
              zIndex: slideCollab ? 1 : 0,
            }}
          >
              <div className="collaborate_left">
                <p1>Collaborate with employers easily</p1>
                <p2>Increase the opportunities for your references</p2>
                <p3>
                  Connect your consulting firm with a diverse range of employers
                  through our platform. We offer a wide-reaching network to help
                  you expand your reach and grow your business. Partner with us
                  to access a broad spectrum of employment.
                </p3>
              </div>

            <div
              className="collaborate_img"
              initial={{ opacity: slideCollab ? 1 : 0 }}
              animate={{ opacity: slideCollab ? 1 : 0 }}
              transition={{
                duration: slideCollab ? 0.5 : 0,
                delay: 2,
                zIndex: slideCollab ? 1 : 0,
              }}
            >
              <img src="/images/recruiter/collaborate_handshake.png" alt="kk" />
            </div>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default RecruiterAnimation;
