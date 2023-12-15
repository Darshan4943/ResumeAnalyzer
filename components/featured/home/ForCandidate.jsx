import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
function ForCandidate() {



  const [moveLeft, setmoveLeft] = useState(false);
  const [moveRight, setmoveRight] = useState(false);
  const [initial, setInitial] = useState(true);
  const [moveRightagain, setMoveRightAgain] = useState(false);
  const [recall, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);



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

  const [isBouncingUp, setIsBouncingUp] = React.useState(true);
  const [isBouncingDown, setIsBouncinDown] = React.useState(true);

  const springProps1 = useSpring({
    ...bounceUp,
    config: slowConfig,
    reverse: isBouncingUp,
    pauseTransition: isBouncingUp,
    onRest: () => {
      setTimeout(() => {
        setIsBouncingUp(!isBouncingUp);
        setToggle(!toggle)
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
        setToggle(!toggle)
      }, 5000);

    },
  });




  const data = [
    {
      img1: "./images/home/for_1.png",
      name1: 'Create Your Free Account',
      img2: "./images/home/candidate_1.png",
      name2: 'Register your organization',

    },
    {
      img1: "./images/home/for_2.png",
      name1: 'Built your Profile',
      img2: "./images/home/candidate_2.png",
      name2: 'Post the required Job Openings',

    },
    {
      img1: "./images/home/for_3.png",
      name1: 'Search & Apply your dream Job',
      img2: "./images/home/candidate_3.png",
      name2: 'Get desired talent shortlisted',

    },
    {
      img1: "./images/home/for_4.png",
      name1: 'Get Hired by a desired company',
      img2: "./images/home/candidate_4.png",
      name2: 'Schedule interview & Hire right talent',

    },

  ]


  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setmoveLeft(false);
      setmoveRight(false);
      setInitial(true);
      setMoveRightAgain(false);
    }, 12000); // Call the function every 1000ms (1 second)

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts or when the dependencies change
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
    <div className="forCandidate">
    <div className="line_animation">
      <div>
        <div className="yellow_line">
          <img src="./images/home/yellow_line.png" alt="" />
          <motion.div
            className="white_background"
            animate={{
              translateX: initial ? "100%" : moveLeft ? "-103%" : "103%",
            }}
            initial={{ opacity: moveLeft ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>

          <motion.div
            className="white_background"
            animate={{
              translateX: initial ? "-100%" : moveRight ? "0%" : "-103%",
            }}
            initial={{ opacity: moveRight ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          <motion.div
            className="white_background"
            animate={{ translateX: moveRightagain ? "0%" : "103%" }}
            initial={{ opacity: moveRightagain ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <div className="blue_line">
          <img src="./images/home/blue_line.png" alt="" />

          <motion.div
            className="white_background"
            animate={{
              translateX: initial ? "-103%" : moveLeft ? "103%" : "-103%",
            }}
            initial={{ opacity: moveLeft ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>

          <motion.div
            className="white_background"
            animate={{
              translateX: initial ? "100%" : moveRight ? "0%" : "103%",
            }}
            initial={{ opacity: moveRight ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          <motion.div
            className="white_background"
            animate={{ translateX: moveRightagain ? "0%" : "-103%" }}
            initial={{ opacity: moveRightagain ? 0 : 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>
      <div className="for_candidate">
        <div className="customMargins">
          <div className="candidate_text" >
            {toggle ? (
              <>
                <p id="for">For </p>
                <p
                  id="candidate">Candidate</p>
              </>
            ) : (
              <>
                <p id="for">For </p>
                <p
                  id="Employer">Employer</p>
              </>
            )}
          </div>
        </div>



        <div className="wrapper">
          {data.map((item, index) => (
            <animated.div className="create_account" key={index} style={index % 2 === 0 ? springProps1 : springProps2}>
              <div className="eclips">
                {toggle ? (
                  <div className="circle_background"></div>
                ): (
                  <div className="circle_background1"></div>
                  )}
               
                <div className="create_acc_inner">

                  <div className="create_img">
                    {toggle ? (
                      <>
                        <img src={item.img1} alt="" />
                        <p id="create_acc_text">{item.name1}</p>
                      </>
                    ) : (
                      <>
                        <img src={item.img2} alt="" />
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
  );
}

export default ForCandidate;