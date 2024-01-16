import React, { useState } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { useRouter } from "next/router";
import { useMediaQuery } from "@react-hook/media-query";

function DailyQuize() {
  const router = useRouter();
  const isViewportBelow1024 = useMediaQuery("(max-width:1024px)");

  const handleClick = () => {
    router.push("/candidate/afterLogin/services/servicesSub/DailyQuize");
  };

  return (
    <>
      <div class=" bg-DailyQuize bg-cover bg-no-repeat min-h-[230px] scr360:min-h-[300px] sm:min-h-[400px] scr540:min-h-[430px] ms:min-h-[450px] scr700:min-h-[500px] ml:min-h-[540px] scr1024:min-h-[300px] ">
        <MouseParallaxContainer
          globalFactorX={0.4}
          globalFactorY={0.4}
          resetOnLeave
          className={`flex rounded-[16px] relative customMargins temp items-center justify-center`}
        >
          <MouseParallaxChild
            factorX={0.06}
            factorY={0.06}
            className={`mt-[40px] mb-[150px] relative  scr1024:w-[82%] w-[100%] }`} 
            style={{
              borderRadius: "16px",
              background: "rgba(6, 169, 239, 0.37)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <div className="flex flex-col gap-[30px] w-full justify-center scr1024:text-center text-start scr1024:px-[60px] scr1024:py-[62px] py-6 px-4 ">
              <div className="flex flex-col gap-[8px] w-full ">
                <div className="scr1024:text-[38px] text-[5.4vw] font-[600] w-full text-[#fff] ">
                  Test your Knowledge Daily
                </div>
                <div className="scr1024:text-[20px] text-[2.3vw] font-[500] w-full text-[#fff]">
                  Boost your knowledge every day with our fun and informative
                  Daily Quiz - a quick way to test, learn, and grow smarter.
                </div>
              </div>
              <div className=" flex scr1024:justify-center justify-start">
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
            className="absolute scr1024:w-[372px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex  flex-col  scr1024:flex-row scr1024:gap-[16px] gap-1 justify-between  items-center scr1024:left-[5%]  scr1024:top-[60%] top-[48%] right-[36%] scr1300:left-[-4%]"
            style={{
              background: "rgba(255, 255, 255, 0.60)",
              backdropFilter: " blur(9px)",
            }}
          >
            {" "}
            <div className="flex justify-center items-center w-[100px]">
              <img
                src="/images/services/Gain_Valuable_Insights.png"
                alt=""
                className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw] "
              />
            </div>
            {/* scr1100:text-[24px] scr1024:text-[22px] */}
            {/* scr1100:text-[18px] scr1024:text-[14px] */}
            <div className="flex flex-col scr1024:w-[80%] w-[100%]  text-[#333]">
              <div className="scr1024:text-[18px] text-[2.2vw] font-[600] text-center scr1024:text-start ">
                Gain Valuable Insights
              </div>
              <div className="scr1024:text-[14px] text-[1.8vw] font-[400] ">
                get Insights with Personalized assessments designed to highlight
                your strengths.{" "}
              </div>
            </div>
          </MouseParallaxChild>
          {/* scr1024:right-[2.46%] scr1100:right-[1%] */}
          <MouseParallaxChild
            factorX={0.15}
            factorY={0.15}
            className="absolute scr1024:w-[400px] w-[25%] scr1024:p-[16px] p-2 scr1024:rounded-[16px] rounded-[8px] flex  flex-col  scr1024:flex-row scr1024:gap-[16px] gap-1 justify-end items-center scr1024:right-[5%] scr1024:top-[60%] right-[8%] top-[40%] scr1300:right-[-5%]"
          
            style={{
              background: "rgba(255, 255, 255, 0.60)",
              backdropFilter: " blur(9px)",
            }}
          >
            <div className="flex justify-center items-center ">
              <img
                src="/images/services/Limit_Pushing_Challenges.png"
                alt=""
                className="scr1024:w-[96px] scr1024:h-[96px] w-[10vw] h-[10vw]"
              />
            </div>
            {/* scr1100:text-[24px] scr1024:text-[22px] */}
            {/* scr1100:text-[18px] scr1024:text-[14px] */}
            <div className="flex flex-col  scr1024:w-[80%] w-[100%] gap-[8px] text-[#333]">
              <div className="scr1024:text-[18px] text-[2.2vw] font-[600] text-center scr1024:text-start ">
                Limit-Pushing Challenges
              </div>
              <div className="scr1024:text-[14px] text-[1.8vw] font-[400]  ">
                Test your abilities with skill assessments that encourage you to
                reach new heights.{" "}
              </div>
            </div>
          </MouseParallaxChild>
        </MouseParallaxContainer>
      </div>
    </>
  );
}

export default DailyQuize;
