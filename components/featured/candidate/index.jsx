import React, { useEffect, useRef, useState } from "react";
import GenerateAi from "../home/GenerateAi";
import { useRouter } from "next/router";
import ImgCarousel from "../home/ImgCarousel";
import SkillAssessment from "../home/SkillAssessment";
import JdResume from "../home/JdResume";
import ResumeInventory from "../home/ResumeInventory";
import SubscriptionPlan from "../home/SubscriptionHome";
import { popupVisible, reCallUserData } from "../../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import MobileView from "../home/mobileView";
import ImageSlider from "../home/ImgCarousel";
import Home from "../home/images";

function CandidateHome() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const popupState = useSelector((state) => state.popupState);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);
  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      router.push("/home/BuildResume");
    } else {
      router.push("/auth?signin=true");
    }
  };
  return (
    <div className="">
      <div className="hidden ml:block w-full">
        <div className="flex flex-row gap-8 items-center  ">
          <div className=" flex flex-col gap-6 w-[50%] text-[#333333] ">
            <div className="flex flex-col gap-[24px] pl-[112px]">
              <div className="font-semibold text-[4vw] leading-tight ">
                The Ultimate AI Resume Builder
              </div>
              <div className="font-medium text-[1.2vw] ">
                Craft compelling, recruiter-vetted resumes effortlessly with our
                cutting-edge resume builder powered by Generative AI. Tailor
                resumes for each role swiftly, leveraging a myriad of remarkable
                features. Enhance your prospects of securing an interview and
                distinguish yourself from competitors in just few minutes.
              </div>
              <button
                onClick={clickHandler}
                className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.2vw] font-semibold"
                style={{ width: "fit-content" }}
              >
                Build My Resume
              </button>
            </div>
          </div>
          <div className="w-[50%]">
            <Home />
          </div>
        </div>
        <div className="flex items-end justify-center  ">
          <GenerateAi />
        </div>

        <div  
        className=" bg-resume_bg bg-cover bg-no-repeat  py-[80px]  ">
        
          <div className=" flex flex-row gap-9 items-center customMargins">
            <div className="w-[65%] bg-gradient bg-contain bg-no-repeat   ">
              <ImgCarousel />
            </div>

            <div className=" flex flex-col gap-6 w-[35%] text-[#333333]">
              <div className="font-semibold  text-[2.5vw] leading-tight ">
                Resume Templates for All{" "}
                <span className="text-[#06A9EF]">Careers and Levels.</span>
              </div>
              <div className="font-medium scr1200:text-[1.2vw] text-[20px] w-[95%] break-words ">
                <p>
                  {" "}
                  Select one of our{" "}
                  <span className="text-[#06A9EF]">
                    expert-designed resume templates{" "}
                  </span>
                  and create a resume that fits your needs and style.No
                  Experienced needed!
                </p>
                <p>
                  <span className="text-[#06A9EF]">Stand out from the crowd</span>{" "}
                  with a resume built on one of the best recruiter approved
                  templates.
                </p>
              </div>
              <button
                onClick={clickHandler}
                className="px-6 py-3 bg-[#06A9EF] text-[1.2vw] text-white w-[13vw] font-semibold rounded-[12px]"
              >
                Get Started
              </button>
            </div>
          </div>
  
        </div>

        <SkillAssessment isLogin={isLogin} />
        <JdResume isLogin={isLogin} />
        <ResumeInventory isLogin={isLogin} />
        <SubscriptionPlan isLogin={isLogin} />
      </div>

      <MobileView clickHandler={clickHandler} isLogin={isLogin} />
      
    </div>
  );
}

export default CandidateHome;
