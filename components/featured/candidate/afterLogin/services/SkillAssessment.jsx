import React, { useState } from "react";

import { useRouter } from "next/router";

function SkillAssessment() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/candidate/afterLogin/services/servicesSub/SkillAssessment");
  };

  return (
    <>
      <div class=" bg-SkillAssessment bg-cover bg-no-repeat  ">
        <div className="flex rounded-[16px] relative customMargins">
          <div
            className="mt-[51px] mb-[148px] px-[24px] pb-[70px] pt-[24px] w-full "
            style={{
              borderRadius: "16px",
              background: "rgba(6, 169, 239, 0.15)",
              backdropFilter: "blur(7.5px)",
            }}
          >
            <div className="flex flex-col gap-[30px] w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="text-[38px] font-[600] w-full text-[#333] ">
                  Skill Assessment
                </div>
                <div className="text-[20px] font-[500] w-full text-[#333]">
                  Explore your Growth through Skill Assessment and test your
                  limits
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
            className="absolute w-[478px]  p-[20px] rounded-[16px] flex flex-row gap-2 justify-between items-center left-[3%] top-[274px] scr1200:left-[9.30%]"
            style={{
              background: "rgba(6, 169, 239, 0.40)",
              backdropFilter: " blur(8px)",
            }}
          >
            {" "}
            <div className="flex justify-center items-center ">
              <img
                src="./images/services/Gain_Valuable_Insights.png"
                alt=""
                className="w-[100px] h-[100px] "
              />
            </div>
            <div className="flex flex-col w-[330px] gap-[8px] text-[#333] leading-tight">
              <div className="text-[24px] font-[600] ">
                Gain Valuable Insights
              </div>
              <div className="text-[18px] font-[400] ">
                get Insights with Personalized assessments designed to highlight
                your strengths.{" "}
              </div>
            </div>
          </div>
          {/* scr1024:right-[2.46%] scr1100:right-[1%] */}
          <div
            className="absolute w-[478px]   p-[20px] rounded-[16px] flex flex-row  gap-[8px] justify-end items-center right-[3%] bottom-[74px]"
            style={{
              background: "rgba(6, 169, 239, 0.40)",
              backdropFilter: " blur(8px)",
            }}
          >
            <div className="flex flex-col w-[360px] gap-[8px] text-[#333] leading-tight">
              <div className="text-[24px] font-[600]">
                Limit-Pushing Challenges
              </div>
              <div className="text-[18px] font-[400]  ">
                Test your abilities with skill assessments that encourage you to
                reach new heights.{" "}
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <img
                src="./images/services/Limit_Pushing_Challenges.png"
                alt=""
                className="w-[100px] h-[100px]"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default SkillAssessment;