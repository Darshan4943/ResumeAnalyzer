import React, { useState } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { useRouter } from "next/router";

function AiResume() {
  const router = useRouter();

  const [aiResumePage, setAiResumePage] = useState(false);

  const handleClick = () => {
    router.push("/candidate/create_resume");
  };

  return (
    <>
      {/* customMargins */}
      <div class=" bg-Ai_resume  bg-cover bg-no-repeat min-h-[280px] scr360:min-h-[300px] scr420:min-h-[325px] sm:min-h-[350px] scr540:min-h-[380px] ms:min-h-[420px] scr700:min-h-[480px] ml:min-h-[580px]">
        <MouseParallaxContainer
          globalFactorX={0.4}
          globalFactorY={0.4}
          resetOnLeave
          className="flex rounded-[12px] relative customMargins justify-center iems-center temp"
        >
          <MouseParallaxChild
            className="scr1024:my-[124px] ml:my-[60px] my-[30px]   pt-[12px] ms:pb-[46px] pb-[24px] px-[24px]"
            factorX={0.06}
            factorY={0.06}
            style={{
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.16)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col scr1024:gap-[24px] gap-[4px] scr1024:w-[49%] w-full ">
             
                <div className="scr1024:text-[38px] text-[5.4vw] font-[600] text-[#fff] ">
                  Build <span className="text-[#FFDA1D]">AI Powered</span>{" "}
                  Resume
                </div>
             
              <div className="flex scr1024:flex-col  scr1024:gap-[24px] gap-3 scr1024:w-[90%] w-[100%] justify-between">
                <div className="scr1024:text-[20px] text-[2.3vw] font-[400] text-[#fff]">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </div>


                <button
                  onClick={handleClick}
                  className=" w-[40%] scr1024:py-[12px] py-1 scr1024:px-[30px] max-w-[166px]   scr1024:max-h-[47px] ms:max-h-[40px] max-h-[31px]  px-3 min-w-[102px]  scr1024:text-[16px] sm:text-[2.1vw] text-[12px] font-[500]  bg-[#fff] scr1024:rounded-[12px] rounded-[6px] border-[1px] border-solid border-[#06A9EF]  transition-[0.2s]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </MouseParallaxChild>

          <MouseParallaxChild
            factorX={0.12}
            factorY={0.12}
            className="absolute scr1024:w-[381px] w-[25%] scr1024:p-[16px] p-1 scr1024:rounded-[16px] rounded-[8px] flex flex-col scr1024:flex-row scr1024:gap-[16px] gap-1 items-center scr1024:right-[12.65%] scr1024:top-[33px] top-[75%] right-[8%] "
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <img
              src="/images/services/AI_suggestion_pic.png"
              alt=""
              className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw]"
            />
            <div className="flex flex-col scr1024:items-start items-center text-[#fff]">
              <div className="scr1024:text-[24px] text-[2.5vw] font-[600]">AI suggestion</div>
              <div className="scr1024:text-[16px] text-[2vw] font-[400]">
                Improve your resume with personalized tips from AI , ensuring it
                stands out.
              </div>
            </div>
          </MouseParallaxChild>

          <MouseParallaxChild
            factorX={0.15}
            factorY={0.15}
            className="absolute scr1024:w-[433px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex  flex-col-reverse  scr1024:flex-row scr1024:gap-[16px] gap-1 items-center justify-between scr1024:right-[2.20%] scr1024:top-[206px] top-[70%] right-[37.5%]"
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <div className="flex flex-col scr1024:items-start items-center  text-[#fff]">
              <div className="scr1024:text-[24px] text-[2.5vw] font-[600] text-center scr1024:text-start">
                Professional Templates
              </div>
              <div className="scr1024:text-[16px] text-[2vw] font-[400] ">
                Choose Professional Templates that look great and are designed
                to fit your job field.
              </div>
            </div>
            <img
              src="/images/services/Professional_Templates_pic.png"
              alt=""
              className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw]"
            />
          </MouseParallaxChild>

          <MouseParallaxChild
            factorX={0.2}
            factorY={0.2}
            className="absolute scr1024:w-[347px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex flex-col scr1024:flex-row  scr1024:gap-[16px] gap-1 items-center scr1024:right-[35.65%]  scr1024:top-[390px] top-[75%] right-[67%]"
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <img
              src="/images/services/Preview_pic.png"
              alt=""
              className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw]"
            />
            <div className="flex flex-col  scr1024:items-start items-center text-[#fff]">
              <div className="scr1024:text-[24px] text-[2.5vw] font-[600]">Preview</div>
              <div className="scr1024:text-[16px] text-[2vw] font-[400]">
                See how your resume will look before you finish to make sure
                it's perfect.
              </div>
            </div>
          </MouseParallaxChild>
        </MouseParallaxContainer>
      </div>
    </>
  );
}

export default AiResume;
