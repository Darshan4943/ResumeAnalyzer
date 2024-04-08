import React, { useState } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../../Redux/actions/user";

function SkillAssessment({ isLogin }) {
  const router = useRouter();
  const dispatch = useDispatch()

  const handleClick = () => {
    if (isLogin) {
      router.push("/home/SkillAssessment");
    } else {

      router.push("/auth?signin=true");
    }
  };

  return (
    <div
    //  className=" bg-SkillAssessment bg-cover bg-no-repeat"
     >
      <div className=" customMargins scr1024:py-[120px]  pt-6 pb-12  min-h-[30vw]  ">
        <MouseParallaxContainer
          globalFactorX={0.4}
          globalFactorY={0.4}
          resetOnLeave
          className="flex rounded-[16px] relative  temp"
        >
          <MouseParallaxChild
            factorX={0.06}
            factorY={0.06}
            className="  sm:px-6 px-3 ml:py-10 scr700:py-6 py-4 w-[90%]  h-[18vw] ml:min-h-[180px] scr700:min-h-[170px] sm:min-h-[145px] scr420:min-h-[150px] xsm:min-h-[140px] min-h-[130px]"
            style={{
              borderRadius: "16px",
              background: "rgba(6, 169, 239, 0.15)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <div className="flex flex-col scr1024:gap-[30px] gap-4 w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="ml:text-[2.6vw] sm:text-[3.5vw] text-[5vw] font-[600] w-full text-[#333]  ">
                  Skill Assessment
                </div>
                <div className="ml:text-[1.2vw] sm:text-[1.5vw] text-[2.5vw] font-[500] w-full text-[#333]">
                  Explore your Growth through Skill Assessment and test your
                  limits
                </div>
              </div>
              <div className="flex justify-start">
                <button
                  onClick={handleClick}
                  className=" scr1024:w-[11vw] scr1024:h-[3.5vw]   scr1024:px-[12px]  sm:px-4 sm:py-2  px-2 py-1   scr1024:text-[1.11111vw] sm:text-[12px] text-[10px] font-[500]  bg-[#fff] scr1024:rounded-[12px] rounded-[6px] border-[1px] border-solid border-[#06A9EF]  transition-[0.2s]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </MouseParallaxChild>
          <MouseParallaxChild
            factorX={0.12}
            factorY={0.12}
            className="absolute sm:w-[34vw] w-[45vw] max-w-[600px] max-h-[180px]  sm:h-[10vw] h-[15vw] p-[16px] scr1024:rounded-[16px] rounded-[8px] flex   scr1024:gap-[16px] gap-1 justify-between items-center scr700:left-[25%] sm:left-[30%] scr420:left-[30%] left-[35%] scr700:top-[70%] top-[80%] "
            style={{
              background: "rgba(6, 169, 239, 0.40)",
              backdropFilter: " blur(8px)",
            }}
          >
            {" "}
            <div className="flex justify-center items-center ">
              <img
                src="/images/services/Gain_Valuable_Insights.png"
                alt=""
                className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw] "
              />
            </div>
            <div className="flex flex-col sm:gap-[8px] gap-1 w-[80%] text-[#333] leading-tight p-1">
              <div className="sm:text-[1.4vw] text-[2vw]  font-[600] text-start">
                Gain Valuable Insights
              </div>
              <div className="sm:text-[1.2vw] text-[1.5vw]  font-[400] ">
                Discover Strengths. Personalized Insights
              </div>
            </div>
          </MouseParallaxChild>
          {/* scr1024:right-[2.46%] scr1100:right-[1%] */}
          <MouseParallaxChild
            factorX={0.15}
            factorY={0.15}
            className="absolute sm:w-[34vw] w-[45vw] sm:h-[10vw] h-[15vw] max-w-[600px] max-h-[180px] scr1024:p-[16px] p-1 scr1024:rounded-[16px] rounded-[8px] flex   scr1024:gap-[16px] gap-1  items-center justify-between right-[0%] top-[-25%]   "
            style={{
              background: "rgba(6, 169, 239, 0.40)",
              backdropFilter: " blur(8px)",
            }}
          >
            <div className="flex flex-col w-[80%]  sm:gap-[8px] gap-1 text-[#333] leading-tight p-1">
              <div className="sm:text-[1.4vw] text-[2vw] font-[600] text-start">
                Challenges your limits
              </div>
              <div className="sm:text-[1.2vw] text-[1.5vw] font-[400]  ">
                Sharpen your skills, gain confidence, reach new heights
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <img
                src="/images/services/Limit_Pushing_Challenges.png"
                alt=""
                className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw]"
              />
            </div>
          </MouseParallaxChild>
        </MouseParallaxContainer>
      </div>
    </div>
  );
}

export default SkillAssessment;
