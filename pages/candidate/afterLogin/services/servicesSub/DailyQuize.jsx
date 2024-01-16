import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Profile2 from "@/components/featured/candidate/afterLogin/services/Profile2";
import { useMediaQuery } from "@react-hook/media-query";
import ProfileHeader from "@/components/featured/candidate/profile/profile_header";
import { useSelector } from "react-redux";
const DailyQuize = () => {
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const query = router.query;
  const userDataGlobal = useSelector((state) => state.userData);
  const [toggle, setToggle] = useState(0);
  const [QuizModel, setQuizModel] = useState(false);
  const starColor = ["#FFDA1D", "#FFDA1D", "#FFDA1D", "#FFDA1D", "#FFF4BB"];
  useEffect(() => {
    if (query.content === "QuizeQue") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const handleSubmit = () => {
    console.log("click");
    setQuizModel(true);
  };

  const handleProfileNav = () => {
    router.push("/profile");
  };

  const toggleContent = () => {
    const QuizeQue = toggle ? "" : "QuizeQue";
    router.push(`DailyQuize/?content=${QuizeQue}`);
    setToggle((prevToggle) => !prevToggle);
  };

  const arr = [
    {
      img: '/images/services/mcq1.png',
      title: "5 MCQs",
      content: "4 Options each",
    },
    {
      img: '/images/services/mcq2.png',
      title: "5 Points",
      content: "for each right answer",
    },
    {
      img: '/images/services/mcq3.png',
      title: "Quick Result",
      content: "Check your score after the Quiz",
    },
    {
      img: '/images/services/mcq4.png',
      title: "Brainstorming",
      content: "Fun way to learn and earn Knowledge",
    },
  ];

  const questions = [
    {
      ans1: "A) Application Programming Interface",
      ans2: "C) Automated Processing Interface",
      ans3: "D) Application Process Integration",
      ans4: "B) Advanced Programming Integration",
    },
  ];

  return (
    <div className="bg-[#F9F9F9] w-full ">
       {userDataGlobal && <ProfileHeader userData={userDataGlobal} />}

      <div
        class={` flex items-center justify-center py-9 gap-[30px] flex-col ${
          !isViewportBelow600 && "customMargins"
        } `}
      >
        <div className="flex flex-row items-center justify-center gap-[6px] md:gap-[24px]  text-center w-full">
          <div className="bg-[#06A9EF] md:w-[264px] xxlg:w-[25.53%] lg:w-[20%] sm:w-[10%] w-[5%] h-[3px]"></div>
          <div className="bg-[#06A9EF] rounded-[8px] md:rounded-[16px] md:py-[12px] gap-1  py-2 px-1 xxlg:w-[48.93%] lg:w-[60%] sm:w-[80%] w-[90%] flex flex-col md:gap-[12px]">
            <p className="md:text-[24px] text-[14px] font-[600] text-[#fff]    ">
              Welcome to the Daily Quiz Challenge!
            </p>
            <p className="md:text-[18px]  text-[10px] flex justify-center items-center text-[#fff] font-[500] md:px-[60px]  ">
              Test your Knowledge Daily{" "}
            </p>
          </div>
          <div className="bg-[#06A9EF] md:w-[264px] xxlg:w-[25.53%] lg:w-[20%] sm:w-[10%] w-[5%] h-[3px]"></div>
        </div>

        {toggle === 0 && (
          <>
            <div className="flex md:w-full w-[95%]   flex-col justify-center md:gap-9 items-center  xxsm:flex-wrap">
              <div className="customMargins w-[95%] ms:w-[100%]  md:h-[174px] md:flex xxsm:justify-center  bg-[#005A81] rounded-[12px]	flex flex-row justify-between md:py-[24px] md:px-[60px] items-center text-center xxsm:flex-wrap px-[8px] py-[18px] gap-1">
                <div className="grid xxsm:grid-cols-2 md:grid-cols-4 justify-center items-center">
                  {arr.map((item, index) => (
                    <div class="flex xxsm:flex-col items-center xxsm:justify-center gap-[8px]  xxsm:text-center ">
                      <img
                        src={item.img}
                        alt=""
                        className="h-[40px] w-[40px]"
                      />
                      <p class="font-[600] text-[18px] text-white">
                        {item.title}
                      </p>
                      <p class="text-[13px] text-[#fff] font-[500]">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="md:w-[744px] w-[95%]   bg-[#fff]  rounded-[12px] md:rounded-[16px] pt-[24px] flex flex-col justify-center items-center overflow-hidden gap-[24px] ">
              <div className="flex flex-col md:gap-[16px] gap-2 md:px-[60px] px-[24px] items-center justify-center">
                <p className="md:text-[20px] text-[16px] font-[600]">
                  DevInsights - Unleashing Developer Knowledge
                </p>
                <p className="md:text-[14px] text-[12px] leading-5 font-[500] text-start md:leading-[30px]">
                  In the ever-evolving landscape of software development,
                  proficiency in version control systems has become an
                  indispensable skill for developers. Version control systems,
                  such as Git, enable developers to track changes in their
                  codebase, collaborate seamlessly with team members, and
                  maintain a well-organized and documented development history.
                  A skilled developer proficient in version control not only
                  ensures the integrity of the codebase but also facilitates
                  efficient collaboration in both small and large-scale
                  projects. This skill not only streamlines the development
                  process but also enhances the overall software quality and
                  project management. <br />
                  In the ever-evolving landscape of software development,
                  proficiency in version control systems has become an
                  indispensable skill for developers. Version control systems,
                  such as Git, enable developers to track changes in their
                  codebase, collaborate seamlessly with team members, and
                  maintain a well-organized and documented development history.
                  A skilled developer proficient in version control not only
                  ensures the integrity of the codebase but also facilitates
                  efficient collaboration in both small and large-scale
                  projects. This skill not only streamlines the development
                  process but also enhances the overall software quality and
                  project management.
                </p>
              </div>
              <div className="bg-[#005A80]  p-[16px] text-[#fff] text-center flex flex-col gap-[12px] w-full">
                <div className="text-[16px] text-[#fff] font-[600]">
                  Get ready to test your knowledge!
                </div>
                <div className="text-[12px] text-[#fff] font-[500]">
                  The quiz begins as soon as you click Start{" "}
                  <span className="text-[12px] text-[#fff] font-[700]">
                    Start.
                  </span>{" "}
                  Make sure you have a stable internet connection.
                </div>
                <div onClick={toggleContent}>
                  <button className="py-[12px] px-[36px] border-solid border-[1px] border-[#06A9EF] bg-[#fff] text-[#333] text-[14px] font-[500] rounded-[8px]">
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {toggle === 1 && (
          <div className="inline-flex flex-col items-center gap-4 m-2 md:w-[100%] w-[100%]">
            <div
              class={` flex p-4 flex-col justify-center xxsm:items-center gap-1 rounded-lg w-[95%] scr1024:w-[80%]   bg-white 
              ${!isViewportBelow600 && "customMargins"} 
              `}
              style={{
                borderRadius: "6px",
                border: "0.75px solid var(--primary, #06A9EF)",
                borderRadius: "16px",
                backdropFilter: "blur(7.5px)",
              }}
            >
              <div className="flex flex-col justify-center items-center gap-2 self-stretch lg:px-[50px] lg:py-[36px]">
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <div className="flex flex-col justify-center items-start gap-4 self-stretch px-[14px] py-3 rounded-md bg-[#E0F6FF] shadow-md">
                    <p className="text-[#06A9EF] font-montserrat text-base font-semibold md:text-[20px]">
                      Question 1
                    </p>
                    <p className="text-[#333] font-montserrat text-[12px] md:text-[16px] font-semibold">
                      What does the acronym "API" stand for?
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 md:justify-center items-center w-[100%] md:gap-4 grid-rows-2 gap-[10px] ">
                    {questions.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="flex items-start justify-start self-stretch px-4 py-3  rounded-md bg-white shadow-md"
                          style={{
                            borderRadius: "6px",
                            boxShadow: " 0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                          }}
                        >
                          <p className="text-[#333] font-montserrat text-[12px] md:text-[16px] font-semibold">
                            {item.ans1}
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex items-start justify-start self-stretch px-4 py-3  rounded-md bg-white shadow-md"
                          style={{
                            borderRadius: "6px",
                            boxShadow: " 0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                          }}
                        >
                          <p className="text-[#333] font-montserrat text-[12px] font-semibold md:text-[16px]">
                            {item.ans2}
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex items-start justify-start self-stretch px-4 py-3  rounded-md bg-white shadow-md"
                          style={{
                            borderRadius: "6px",
                            boxShadow: " 0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                          }}
                        >
                          <p className="text-[#333] font-montserrat text-[12px] font-semibold md:text-[16px]">
                            {item.ans3}
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex items-start justify-start self-stretch px-4 py-3 rounded-md bg-white shadow-md"
                          style={{
                            borderRadius: "6px",
                            boxShadow: " 0px 0px 2px 0px rgba(0, 0, 0, 0.50)",
                          }}
                        >
                          <p className="text-[#333] font-montserrat text-[12px] font-semibold md:text-[16px]">
                            {item.ans4}
                          </p>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-[80%]">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g mask="url(#mask0_7403_116700)">
                    <path
                      d="M17.9406 19.9998L23.2066 25.2658L21.7484 26.7658L14.9824 19.9998L21.7484 13.2338L23.2066 14.7338L17.9406 19.9998ZM19.9999 35.8331C22.1897 35.8331 24.2481 35.4175 26.175 34.5864C28.1019 33.7553 29.7781 32.6228 31.2034 31.1888C32.6288 29.7548 33.7573 28.0765 34.5887 26.154C35.4202 24.2315 35.8359 22.1811 35.8359 20.0026C35.8359 17.8127 35.4204 15.7543 34.5893 13.8274C33.7582 11.9005 32.6302 10.2244 31.2055 8.79901C29.7808 7.37362 28.1054 6.24519 26.1793 5.41371C24.2533 4.58224 22.1953 4.1665 20.0054 4.1665C17.8155 4.1665 15.7618 4.58206 13.8441 5.41317C11.9265 6.24428 10.2504 7.3722 8.81573 8.79692C7.38109 10.2217 6.24803 11.8971 5.41656 13.8231C4.58509 15.7492 4.16935 17.8071 4.16935 19.997C4.16935 22.1755 4.58491 24.2264 5.41602 26.1498C6.24713 28.0731 7.37969 29.7521 8.81369 31.1867C10.2477 32.6214 11.9231 33.7544 13.8399 34.5859C15.7566 35.4174 17.81 35.8331 19.9999 35.8331Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>
                <p className="text-[#333] text-[18px] font-semibold font-Montserrat">
                  Previous
                </p>
              </div>
              <div onClick={() => handleSubmit()} className="flex items-center gap-1">
                <p
                  
                  className="text-[#333] text-[18px] font-semibold font-Montserrat"
                >
                  Next
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g mask="url(#mask0_7403_116706)">
                    <path
                      d="M22.0594 19.9998L16.7934 25.2658L18.2516 26.7658L25.0176 19.9998L18.2516 13.2338L16.7934 14.7338L22.0594 19.9998ZM20.0001 35.8331C17.8103 35.8331 15.7519 35.4175 13.825 34.5864C11.8981 33.7553 10.2219 32.6228 8.79656 31.1888C7.37117 29.7548 6.24274 28.0765 5.41127 26.154C4.5798 24.2315 4.16406 22.1811 4.16406 20.0026C4.16406 17.8127 4.57962 15.7543 5.41073 13.8274C6.24184 11.9005 7.36976 10.2244 8.79448 8.79901C10.2192 7.37362 11.8946 6.24519 13.8207 5.41371C15.7467 4.58224 17.8047 4.1665 19.9946 4.1665C22.1845 4.1665 24.2382 4.58206 26.1559 5.41317C28.0735 6.24428 29.7496 7.3722 31.1843 8.79692C32.6189 10.2217 33.752 11.8971 34.5834 13.8231C35.4149 15.7492 35.8306 17.8071 35.8306 19.997C35.8306 22.1755 35.4151 24.2264 34.584 26.1498C33.7529 28.0731 32.6203 29.7521 31.1863 31.1867C29.7523 32.6214 28.0769 33.7544 26.1601 34.5859C24.2434 35.4174 22.19 35.8331 20.0001 35.8331Z"
                      fill="#06A9EF"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}

        {QuizModel && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
              <div className="absolute w-[95%]  scr540:w-[60%] ">
                <div
                  className="flex py-4 flex-col items-center gap-2 bg-[#fff]"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex items-start justify-start w-full px-3">
                    <p className="text-[20px] font-Montserrat font-semibold text-[#333]">
                      Scoreboard
                    </p>
                  </div>
                  <div className="w-[100%]">
                    <div className="flex justify-center items-center px-[30px] py-[12px] bg-[#06A9EF]  xxsm:px-0">
                      <p className="text-[#fff] text-[18px] font-semibold font-Montserrat ">
                        Daily Quiz Completed!
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex flex-col p-4 w-[90%] justify-center items-center gap-[11px] bg-[#fff]"
                    style={{
                      borderRadius: "8px",
                      boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <p className="text-[#333] text-[18px] font-semibold font-Montserrat">
                      Your Score
                    </p>
                    <p className="text-[#263751] text-[50px] font-semibold font-Montserrat">
                      20
                    </p>
                    <div className="flex ">
                      {starColor.map((color) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="30"
                          viewBox="0 0 31 30"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.2073 22.5001L10.0344 25.1842C9.41525 25.5054 8.64947 25.2705 8.32398 24.6594C8.19436 24.4161 8.14964 24.1374 8.19672 23.8664L9.18467 18.1814L4.99966 14.1553C4.49877 13.6734 4.48853 12.882 4.97677 12.3876C5.17119 12.1908 5.42594 12.0627 5.70159 12.0231L11.4851 11.1937L14.0716 6.02129C14.3812 5.40222 15.1406 5.14805 15.7678 5.45358C16.0176 5.57524 16.2198 5.77477 16.3431 6.02129L18.9295 11.1937L24.7131 12.0231C25.4053 12.1224 25.8849 12.7567 25.7843 13.4399C25.7443 13.7119 25.6145 13.9634 25.415 14.1553L21.23 18.1814L22.2179 23.8664C22.3362 24.5469 21.8732 25.1931 21.1837 25.3098C20.9092 25.3562 20.6268 25.3121 20.3803 25.1842L15.2073 22.5001Z"
                            fill={color}
                          />
                        </svg>
                      ))}
                    </div>

                    <p className="text-[#5B5B5B] text-[18px] font-semibold font-Montserrat">
                      You got 4 Answers right
                    </p>
                  </div>
                  <p className="text-center font-montserrat text-base font-medium leading-[28px]">
                    Great! Hungry for Knowledge?  Visit
                    back tomorrow for more.
                  </p>
                  <button
                    className="flex py-[12px] px-[36px] justify-center items-center rounded-[12px] border border-[#06A9EF] bg-[#fff] text-[#333] text-[16px] font-[500] "
                    onClick={handleProfileNav}
                  >
                    Go to Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyQuize;
