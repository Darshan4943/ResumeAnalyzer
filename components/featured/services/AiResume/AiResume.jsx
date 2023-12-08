import React, { useState } from "react";
import AiResumePage from "../../../../pages/services/AiResumePage";
import { useRouter } from "next/router";

function AiResume() {
  const router = useRouter();

  const [aiResumePage, setAiResumePage] = useState(false);

  const handleClick = () => {
    router.push("/services/AiResumePage");
  };

  return (
    <>
      <div class=" bg-Ai_resume  bg-cover bg-no-repeat">
        <div className="flex rounded-[12px] relative customMargins">
          <div
            className="my-[124px] py-[46px] px-[24px]"
            style={{
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.16)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-[24px] w-[49%]">
              <div className="flex flex-col gap-[24px]">
                <div className="text-[38px] font-[600] text-[#fff] ">
                  Build <span className="text-[#FFDA1D]">AI Powered</span>{" "}
                  Resume
                </div>
                <div className="text-[20px] font-[400] text-[#fff]">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </div>
              </div>
              <div>
                <button onClick={handleClick} className="py-[12px] px-[30px] text-[16px] font-[500] text-[#06A9EF] bg-[#fff] rounded-[12px] border-[1px] border-solid border-[#06A9EF] transition-all transition-[0.2s]">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute w-[381px] p-[16px] rounded-[16px] flex flex-row gap-[16px] items-center right-[14.65%] top-[33px]"
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <img
              src="./images/services/AI_suggestion_pic.png"
              alt=""
              className="w-[96px] h-[96px]"
            />
            <div className="flex flex-col w-[66.22%]  text-[#fff]">
              <div className="text-[24px] font-[600]">AI suggestion</div>
              <div className="text-[16px] font-[400]">
                Improve your resume with personalized tips from AI , ensuring it
                stands out.
              </div>
            </div>
          </div>

          <div
            className="absolute w-[433px] p-[16px] rounded-[16px] flex flex-row gap-[16px] items-center justify-between right-[2.65%] top-[206px]"
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <div className="flex flex-col  text-[#fff]">
              <div className="text-[24px] font-[600]">
                Professional Templates
              </div>
              <div className="text-[16px] font-[400]">
                Choose Professional Templates that look great and are designed
                to fit your job field.
              </div>
            </div>
            <img
              src="./images/services/Professional_Templates_pic.png"
              alt=""
              className="w-[96px] h-[96px]"
            />
          </div>
          <div
            className="absolute w-[347px] p-[16px] rounded-[16px] flex flex-row gap-[16px] items-center right-[29.65%] top-[390px]"
            style={{
              background: "rgba(255, 255, 255, 0.26)",
              backdropFilter: " blur(13px)",
            }}
          >
            <img
              src="./images/services/Preview_pic.png"
              alt=""
              className="w-[96px] h-[96px]"
            />
            <div className="flex flex-col w-[66.22%]  text-[#fff]">
              <div className="text-[24px] font-[600]">Preview</div>
              <div className="text-[16px] font-[400]">
                See how your resume will look before you finish to make sure
                it's perfect.
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default AiResume;