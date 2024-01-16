import React, { useState } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { useRouter } from "next/router";

function InterviewQue() {
  const router = useRouter();

  const [aiResumePage, setAiResumePage] = useState(false);

  const handleClick = () => {
    router.push("/candidate/afterLogin/services/servicesSub/InterviewQue");
  };

  return (
    <>
      <div class=" bg-InterviewQue bg-cover bg-no-repeat min-h-[340px] scr360:min-h-[380px] scr420:min-h-[410px] sm:min-h-[430px] scr540:min-h-[480px] ms:min-h-[510px] scr700:min-h-[540px] md:min-h-[580px]  ml:min-h-[700px] scr1024:min-h-[550px] ">
        <div className="w-full   ">
          <MouseParallaxContainer
            globalFactorX={0.4}
            globalFactorY={0.4}
            resetOnLeave
            className="flex rounded-[16px] relative temp customMargins "
          >
            <MouseParallaxChild
              factorX={0.06}
              factorY={0.06}
              className="scr1024:my-[76px] ml:my-[60px] my-[30px]  scr1024:p-[24px] p-3 "
              style={{
                borderRadius: "12px",
                background: "rgba(6, 169, 239, 0.16)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="flex flex-col gap-[16px]  scr1024:w-[47%] w-full">
                <div className="flex flex-col scr1024:gap-[16px] gap-3">
                  <div className="scr1024:text-[38px] text-[5.4vw] font-[600] text-[#333] leading-tight ">
                    Commonly asked{" "}
                    <span className="text-[#06A9EF]">interview questions</span>
                  </div>
                  <div className="scr1024:text-[18px] text-[2.3vw] font-[500] text-[#333]">
                    These questions can serve as a starting point for your
                    interview preparation, be ready to showcase your
                    qualifications, and demonstrate your enthusiasm for the
                    role.{" "}
                  </div>
                </div>
                <div className=" flex scr1024:justify-start justify-end">
                  <button
                    onClick={handleClick}
                    className="scr1024:w-[40%] w-[20%] scr1024:py-[12px] py-2 scr1024:px-[30px] scr1024:max-w-[166px] max-w-[145x] scr1024:max-h-[61px] px-2 min-w-[85px]  scr1024:text-[16px] sm:text-[2.1vw] text-[11px] font-[500]  bg-[#fff] scr1024:rounded-[12px] rounded-[6px] border-[1px] border-solid border-[#06A9EF]  transition-[0.2s]"
                    >
                    Get Started
                  </button>
                </div>
              </div>
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.12}
              factorY={0.12}
            className="absolute scr1024:w-[479px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex flex-col-reverse scr1024:flex-row scr1024:gap-[16px] gap-1 items-center scr1024:right-[3%] scr1024:top-[33px] top-[67%] sm:right-[57%] right-[65%] "
              style={{
                background: "#06A9EF",
                backdropFilter: " blur(8px)",
              }}
            >
              <div className="flex flex-col  w-[100%] scr1024:w-[70%]  text-[#fff]">
                <div className="scr1024:text-[24px] text-[2.5vw] font-[600] text-center scr1024:text-start">Relevant Questions</div>
                <div className="scr1024:text-[16px] text-[2vw] font-[400] ">
                  Improve your resume with personalized tips suggestions from AI
                  , ensuring it stands out to potential employers
                </div>
              </div>
              <div className="flex justify-center items-center w-[33.78%]">
                <img
                  src="/images/services/Relevant_Questions_pic.png"
                  alt=""
                  className="scr1024:w-[111px] scr1024:h-[126px] w-[7vw] h-[9.5vw] "
                />
              </div>
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.15}
              factorY={0.15}
              className="absolute scr1024:w-[479px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex flex-col scr1024:flex-row scr1024:gap-[16px] gap-1 justify-between items-center scr1024:right-[9%] sm:right-[27%] right-[36%] scr1024:top-[320px] top-[74%]"
              style={{
                background: "#06A9EF",
                backdropFilter: " blur(8px)",
              }}
            >
              <div className="flex justify-center items-center ">
                <img
                  src="/images/services/Ai_Generated_Answers_pic.png"
                  alt=""
                  className="scr1024:w-[126px] scr1024:h-[126px] w-[9.5vw] h-[9.5vw]  object-contain"
                />
              </div>
              <div className="flex flex-col  text-[#fff]  w-[100%] scr1024:w-[70%]">
                <div className="scr1024:text-[24px] text-[2.5vw] font-[600] text-center scr1024:text-start">
                  Ai Generated Answers
                </div>
                <div className="scr1024:text-[16px] text-[2vw] font-[400]">
                  Improve your resume with personalized tips suggestions from AI
                  , ensuring it stands out to potential employers
                </div>
              </div>
            </MouseParallaxChild>
          </MouseParallaxContainer>
        </div>
      </div>
    </>
  );
}

export default InterviewQue;
