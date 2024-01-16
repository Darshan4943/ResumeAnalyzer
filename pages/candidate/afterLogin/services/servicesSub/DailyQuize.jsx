import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Profile2 from "@/components/featured/candidate/afterLogin/services/Profile2";
import { useMediaQuery } from "@react-hook/media-query";
const DailyQuize = () => {
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const query = router.query;

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
    router.push("/profile/profile");
  };

  const toggleContent = () => {
    const QuizeQue = toggle ? "" : "QuizeQue";
    router.push(`DailyQuize/?content=${QuizeQue}`);
    setToggle((prevToggle) => !prevToggle);
  };

  const arr = [
    {
      img: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
     
      <g mask="url(#mask0_5925_115006)">
        <path d="M26.6836 35.279C25.7211 35.279 24.8995 34.9392 24.2187 34.2597C23.5379 33.5803 23.1975 32.7602 23.1975 31.7995V25.1461C23.1975 24.1896 23.5379 23.3706 24.2187 22.689C24.8995 22.0074 25.7211 21.6666 26.6836 21.6666H33.3304C34.2929 21.6666 35.1145 22.0074 35.7953 22.689C36.4761 23.3706 36.8165 24.1896 36.8165 25.1461V31.7995C36.8165 32.7602 36.4761 33.5803 35.7953 34.2597C35.1145 34.9392 34.2929 35.279 33.3304 35.279H26.6836ZM26.3605 32.1226H33.6534V24.823H26.3605V32.1226ZM3.05469 30.0543V26.8913H18.1842V30.0543H3.05469ZM26.6836 18.3333C25.7211 18.3333 24.8995 17.9929 24.2187 17.3121C23.5379 16.6313 23.1975 15.8097 23.1975 14.8472V8.20048C23.1975 7.23795 23.5379 6.4163 24.2187 5.73552C24.8995 5.05474 25.7211 4.71436 26.6836 4.71436H33.3304C34.2929 4.71436 35.1145 5.05474 35.7953 5.73552C36.4761 6.4163 36.8165 7.23795 36.8165 8.20048V14.8472C36.8165 15.8097 36.4761 16.6313 35.7953 17.3121C35.1145 17.9929 34.2929 18.3333 33.3304 18.3333H26.6836ZM26.3605 15.1703H33.6534V7.8774H26.3605V15.1703ZM3.05469 13.102V9.94565H18.1842V13.102H3.05469Z" fill="white"/>
      </g>
    </svg>`,
      title: "5 MCQs",
      content: "4 Options each",
    },
    {
      img: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
   
     <g mask="url(#mask0_5925_115012)">
       <path d="M19.9971 27.0854L25.9522 30.6941L24.3604 23.9389L29.6025 19.3852L22.6985 18.7801L19.9971 12.4006V27.0854ZM9.29362 37.2412L12.1149 25.0579L2.65625 16.8607L15.1411 15.7859L19.9971 4.29248L24.8531 15.7859L37.338 16.8607L27.8794 25.0579L30.7073 37.2412L19.9971 30.7704L9.29362 37.2412Z" fill="white"/>
     </g>
   </svg>`,
      title: "5 Points",
      content: "for each right answer",
    },
    {
      img: `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
 
   <g mask="url(#mask0_5925_115019)">
     <path d="M16.4248 9.36819H19.2557V6.54395H16.4248V9.36819ZM22.08 9.36819V6.54395H24.9108V9.36819H22.08ZM16.4248 20.6785V17.8542H19.2557V20.6785H16.4248ZM27.7351 15.0234V12.1991H30.566V15.0234H27.7351ZM27.7351 20.6785V17.8542H30.566V20.6785H27.7351ZM22.08 20.6785V17.8542H24.9108V20.6785H22.08ZM27.7351 9.36819V6.54395H30.566V9.36819H27.7351ZM19.2557 12.1991V9.36819H22.08V12.1991H19.2557ZM10.4375 33.5892V6.54395H13.6005V9.36819H16.4248V12.1969H13.6005V15.0256H16.4248V17.8542H13.6005V33.5892H10.4375ZM24.9108 17.8542V15.0234H27.7351V17.8542H24.9108ZM19.2557 17.8542V15.0234H22.08V17.8542H19.2557ZM16.4248 15.0234V12.1991H19.2557V15.0234H16.4248ZM22.08 15.0234V12.1991H24.9108V15.0234H22.08ZM24.9108 12.1991V9.36819H27.7351V12.1991H24.9108Z" fill="white"/>
   </g>
 </svg>`,
      title: "Quick Result",
      content: "Check your score after the Quiz",
    },
    {
      img: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  
   <g mask="url(#mask0_5925_115025)">
     <path d="M9.75781 36.9126V29.6097C8.1767 28.1431 6.94809 26.4335 6.07198 24.4808C5.19587 22.5281 4.75781 20.479 4.75781 18.3335C4.75781 14.0967 6.23965 10.4954 9.20331 7.52968C12.167 4.56393 15.7657 3.08105 19.9994 3.08105C23.5276 3.08105 26.6541 4.12126 29.3789 6.20168C32.1038 8.28209 33.8789 10.9878 34.7044 14.3187L36.9677 23.2912C37.1035 23.7906 37.0142 24.2412 36.6996 24.6431C36.385 25.045 35.9655 25.2459 35.4411 25.2459H31.9227V30.4228C31.9227 31.2977 31.6147 32.0425 30.9986 32.6572C30.3826 33.2719 29.6363 33.5793 28.7596 33.5793H25.256V36.9126H22.093V30.4228H28.7596V22.0895H33.3931L31.6585 15.1028C31.0011 12.5016 29.5862 10.3748 27.4139 8.72251C25.2416 7.07023 22.7725 6.2441 20.0066 6.2441C16.6536 6.2441 13.7999 7.40786 11.4456 9.73539C9.09137 12.0629 7.91423 14.8974 7.91423 18.2388C7.91423 19.9636 8.26752 21.6074 8.9741 23.1702C9.68069 24.7331 10.6834 26.1154 11.9821 27.3172L12.9142 28.1928V36.9126H9.75781ZM18.5869 24.6112H21.3647L21.5314 22.6946C21.8277 22.6298 22.1031 22.519 22.3577 22.3623C22.6122 22.2056 22.8368 22.0293 23.0313 21.8335L24.8236 22.5001L26.1703 20.2223L24.7814 19.139C24.8925 18.8057 24.9481 18.4631 24.9481 18.1113C24.9481 17.7594 24.8925 17.4168 24.7814 17.0835L26.1703 16.0001L24.8236 13.7223L23.0321 14.389C22.8326 14.2003 22.6022 14.0304 22.341 13.8794C22.0798 13.7284 21.8101 13.6113 21.5319 13.5279L21.3647 11.6113H18.5869L18.4203 13.5279C18.1425 13.6113 17.8732 13.7284 17.6124 13.8794C17.3516 14.0304 17.1215 14.2003 16.9222 14.389L15.1346 13.7223L13.7814 16.0001L15.1703 17.0835C15.0592 17.4168 15.0036 17.7594 15.0036 18.1113C15.0036 18.4631 15.0592 18.8057 15.1703 19.139L13.7814 20.2223L15.1346 22.5001L16.9222 21.8335C17.1164 22.0293 17.3405 22.2056 17.5946 22.3623C17.8488 22.519 18.124 22.6298 18.4203 22.6946L18.5869 24.6112ZM19.9791 20.889C19.2084 20.889 18.5522 20.6193 18.0106 20.0798C17.4689 19.5403 17.198 18.8852 17.198 18.1145C17.198 17.3438 17.4678 16.6876 18.0073 16.146C18.5468 15.6043 19.2019 15.3335 19.9726 15.3335C20.7433 15.3335 21.3994 15.6032 21.9411 16.1427C22.4828 16.6822 22.7536 17.3373 22.7536 18.108C22.7536 18.8787 22.4839 19.5348 21.9444 20.0765C21.4049 20.6182 20.7498 20.889 19.9791 20.889Z" fill="white"/>
   </g>
 </svg>`,
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
    <div className="bg-[#F9F9F9] pt-8 w-full ">
      <div>{/* <Profile2 /> */}</div>

      <div
        class={` flex items-center justify-center gap-[30px] flex-col ${
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
         
        
          <div
           className="inline-flex flex-col items-center gap-4 m-2 md:w-[100%] w-[100%]">
              <div
              class={` flex p-4 flex-col justify-center xxsm:items-center gap-1 rounded-lg w-[95%] scr1024:w-[80%]   bg-white 
              ${
                !isViewportBelow600 && "customMargins"
              } 
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
                 <div className="flex items-center gap-1">
                 <p className="text-[#333] text-[18px] font-semibold font-Montserrat">
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
          <div class="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="flex w-[65.95%] p-[24px] flex-col overflow-hidden items-center gap-[24px] rounded-lg bg-[#fff] shadow-md justify-center">
              <p className="items-stretch text-[#333] font-montserrat text-[24px] font-[600]">
                Scoreboard
              </p>
              <div className="flex w-[110%] overflow-hidden py-[12px] px-[60px] flex-col justify-center items-center gap-[12px] bg-[#06A9EF] backdrop-blur">
                <p className="items-stretch text-[#fff] font-montserrat text-[24px] font-[600]">
                  Daily Quiz Completed!
                </p>
              </div>

              <div className="flex w-[44%] p-[16px] flex-col justify-center items-center gap-[11px] rounded-md bg-[#fff] shadow-md">
                <p className=" text-secondary text-[#333] font-montserrat text-[18px] font-[600]">
                  Your Score
                </p>
                <p className=" text-secondary text-[#333] font-montserrat text-[50px] font-[600] leading-tight">
                  20
                </p>
                <div className="flex flex-row">
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
                <p className=" text-secondary text-[#333] font-montserrat text-[18px] font-[600]">
                  You got 4 Answers right
                </p>
              </div>

              <p className="align-stretch text-[#333] text-center font-montserrat text-[20px] font-[500] leading-[36px] ">
                Great! Hungry for Knowledge? <br />
                Visit back tomorrow for more.
              </p>

              <button
                className="flex py-[12px] px-[36px] justify-center items-center rounded-[12px] border border-[#06A9EF] bg-[#fff] text-[#333] text-[16px] font-[500] "
                onClick={handleProfileNav}
              >
                Go to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyQuize;
