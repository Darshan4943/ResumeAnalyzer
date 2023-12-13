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
      <div class=" bg-InterviewQue bg-cover bg-no-repeat ">
        <div className="w-full h-full  ">
          <MouseParallaxContainer
            globalFactorX={0.4}
            globalFactorY={0.4}
            resetOnLeave
            className="flex rounded-[16px] relative temp px-[156px] "
          >
            <MouseParallaxChild
              factorX={0.06}
              factorY={0.06}
              className="my-[76px] p-[24px] "
              style={{
                borderRadius: "12px",
                background: "rgba(6, 169, 239, 0.16)",
                backdropFilter: "blur(5px)",
              }}
            >
              <div className="flex flex-col gap-[16px] w-[47%]">
                <div className="flex flex-col gap-[16px]">
                  <div className="text-[38px] font-[600] text-[#333] ">
                    Commonly asked{" "}
                    <span className="text-[#06A9EF]">interview questions</span>
                  </div>
                  <div className="text-[18px] font-[500] text-[#333]">
                    These questions can serve as a starting point for your
                    interview preparation, be ready to showcase your
                    qualifications, and demonstrate your enthusiasm for the
                    role.{" "}
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
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.12}
              factorY={0.12}
              className="absolute w-[479px] p-[16px] rounded-[16px] flex flex-row gap-[16px] justify-between items-center right-[12%] top-[24px]"
              style={{
                background: "#06A9EF",
                backdropFilter: " blur(8px)",
              }}
            >
              <div className="flex flex-col w-[66.22%]  text-[#fff]">
                <div className="text-[24px] font-[600]">Relevant Questions</div>
                <div className="text-[18px] font-[400]">
                  Improve your resume with personalized tips suggestions from AI
                  , ensuring it stands out to potential employers
                </div>
              </div>
              <div className="flex justify-center items-center w-[33.78%]">
                <img
                  src="./images/services/Relevant_Questions_pic.png"
                  alt=""
                  className="w-[111px] h-[126px] "
                />
              </div>
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.15}
              factorY={0.15}
              className="absolute w-[480px] p-[16px] rounded-[16px] flex flex-row gap-[10px] justify-between items-center right-[19%] bottom-[24px]"
              style={{
                background: "#06A9EF",
                backdropFilter: " blur(8px)",
              }}
            >
              <div className="flex justify-center items-center ">
                <img
                  src="./images/services/Ai_Generated_Answers_pic.png"
                  alt=""
                  className="w-[126px] h-[126px]"
                />
              </div>
              <div className="flex flex-col w-[312px]  text-[#fff]">
                <div className="text-[24px] font-[600]">
                  Ai Generated Answers
                </div>
                <div className="text-[18px] font-[400]">
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
