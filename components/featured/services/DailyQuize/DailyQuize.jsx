import React, { useState } from "react";
import AiResumePage from "../../../../pages/services/AiResumePage";
import { useRouter } from "next/router";

function DailyQuize() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/services/DailyQuize");
  };

  return (
    <>
      <div class=" bg-DailyQuize flex justify-center items-center bg-cover bg-no-repeat">
        <div className="flex rounded-[16px] relative w-[65%]">
          <div
            className="mt-[40px] mb-[150px] px-[24px] py-[62px]  w-full "
            style={{
              borderRadius: "16px",
              background: "rgba(6, 169, 239, 0.37)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <div className="flex flex-col gap-[30px] w-full justify-center text-center">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="text-[38px] font-[600] w-full text-[#fff] ">
                  Test your Knowledge Daily
                </div>
                <div className="text-[20px] font-[500] w-full text-[#fff]">
                  Boost your knowledge every day with our fun and informative
                  Daily Quiz – a quick way to test, learn, and grow smarter.
                </div>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="py-[12px] px-[30px] text-[16px] font-[500] text-[#333] bg-[#fff] rounded-[12px] border-[1px] border-solid border-[#06A9EF] transition-all transition-[0.2s]"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute w-[372px]  p-[24px] rounded-[16px] flex flex-row gap-[8px] justify-between items-center left-[-9.30%]  bottom-[50px]"
            style={{
              background: "rgba(255, 255, 255, 0.60)",
              backdropFilter: " blur(9px)",
            }}
          >
            {" "}
            <div className="flex justify-center items-center w-[100px]">
              <img
                src="./images/services/Gain_Valuable_Insights.png"
                alt=""
                className="w-[100px] h-[100px] "
              />
            </div>
            {/* scr1100:text-[24px] scr1024:text-[22px] */}
            {/* scr1100:text-[18px] scr1024:text-[14px] */}
            <div className="flex flex-col w-[66.22%]  text-[#333]">
              <div className="text-[18px] font-[600] ">
                Gain Valuable Insights
              </div>
              <div className="text-[14px] font-[400] ">
                get Insights with Personalized assessments designed to highlight
                your strengths.{" "}
              </div>
            </div>
          </div>
          {/* scr1024:right-[2.46%] scr1100:right-[1%] */}
          <div
            className="absolute w-[400px]  p-[24px] rounded-[16px] flex flex-row gap-[8px]  justify-end items-center right-[-12.30%] bottom-[50px]"
            style={{
              background: "rgba(255, 255, 255, 0.60)",
              backdropFilter: " blur(9px)",
            }}
          >
            <div className="flex justify-center items-center ">
              <img
                src="./images/services/Limit_Pushing_Challenges.png"
                alt=""
                className="w-[100px] h-[100px]"
              />
            </div>
            {/* scr1100:text-[24px] scr1024:text-[22px] */}
            {/* scr1100:text-[18px] scr1024:text-[14px] */}
            <div className="flex flex-col w-[240px] gap-[8px] text-[#333]">
              <div className="text-[18px] font-[600] ">
                Limit-Pushing Challenges
              </div>
              <div className="text-[14px] font-[400]  ">
                Test your abilities with skill assessments that encourage you to
                reach new heights.{" "}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default DailyQuize;