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

      dispatch(popupVisible())
    }
  };

  return (
    <>
      <div class=" py-[120px]  px-[80px]  bg-SkillAssessment bg-cover bg-no-repeat min-h-[350px] scr360:min-h-[380px] sm:min-h-[430px] scr540:min-h-[450px] ms:min-h-[470px] scr700:min-h-[500px] ml:min-h-[570px] scr1024:min-h-[30vw]  ">
        <MouseParallaxContainer
          globalFactorX={0.4}
          globalFactorY={0.4}
          resetOnLeave
          className="flex rounded-[16px] relative  temp"
        >
          <MouseParallaxChild
            factorX={0.06}
            factorY={0.06}
            className=" scr1024:mt-[51px] my-[30px] scr1024:mb-[148px] px-[24px] pb-[70px] pt-[24px] w-full h-[20vw] "
            style={{
              borderRadius: "16px",
              background: "rgba(6, 169, 239, 0.15)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <div className="flex flex-col scr1024:gap-[30px] gap-4 w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="scr1024:text-[2.6vw] text-[5.4vw] font-[600] w-full text-[#333]  ">
                  Skill Assessment
                </div>
                <div className="scr1024:text-[1.5vw] text-[2.3vw]  font-[500] w-full text-[#333]">
                  Explore your Growth through Skill Assessment and test your
                  limits
                </div>
              </div>
              <div className="flex scr1024:justify-start justify-end">
                <button
                  onClick={handleClick}
                  className="w-[12vw] h-[4vw]   scr1024:px-[12px]  px-3    text-[1.3] font-[500]  bg-[#fff] scr1024:rounded-[12px] rounded-[6px] border-[1px] border-solid border-[#06A9EF]  transition-[0.2s]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </MouseParallaxChild>
          <MouseParallaxChild
            factorX={0.12}
            factorY={0.12}
            className="absolute scr1024:w-[34vw] w-[30%] scr1024:h-[10vw] scr1024:p-[16px] p-1 scr1024:rounded-[16px] rounded-[8px] flex  flex-col  scr1024:flex-row scr1024:gap-[16px] gap-1 justify-between items-center scr1024:left-[3%] left-[10%] scr1024:top-[60%] top-[55%] "
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
            <div className="flex flex-col gap-[8px] scr1024:w-[80%] w-[100%]  text-[#333] leading-tight p-1">
              <div className="scr1024:text-[1.7vw] text-[2.5vw] font-[600]  text-center scr1024:text-start">
                Gain Valuable Insights
              </div>
              <div className="scr1024:text-[1.2vw] text-[2vw] font-[400] ">
                get Insights with Personalized assessments designed to highlight
                your strengths.{" "}
              </div>
            </div>
          </MouseParallaxChild>
          {/* scr1024:right-[2.46%] scr1100:right-[1%] */}
          <MouseParallaxChild
            factorX={0.15}
            factorY={0.15}
            className="absolute scr1024:w-[34vw] scr1024:h-[10vw] w-[30%] scr1024:p-[16px] p-1 scr1024:rounded-[16px] rounded-[8px] flex  flex-col-reverse  scr1024:flex-row scr1024:gap-[16px] gap-1  items-center justify-between scr1024:right-[3%] right-[25%] scr1024:top-[50%] top-[73%]"
            style={{
              background: "rgba(6, 169, 239, 0.40)",
              backdropFilter: " blur(8px)",
            }}
          >
            <div className="flex flex-col scr1024:w-[80%] w-[100%] gap-[8px] text-[#333] leading-tight p-1">
              <div className="scr1024:text-[1.7vw] text-[2.5vw] font-[600] text-center scr1024:text-start">
                Limit-Pushing Challenges
              </div>
              <div className="scr1024:text-[1.2vw] text-[2vw] font-[400]  ">
                Test your abilities with skill assessments that encourage you to
                reach new heights.{" "}
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
    </>
  );
}

export default SkillAssessment;
