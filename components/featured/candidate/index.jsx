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
      <div className="hidden lg:block w-full">
        <div className="flex flex-row gap-8 items-center  ">
          <div className=" flex flex-col gap-6 w-[50%] text-[#333333] pl-[24px] ">
            <div className="flex flex-col gap-[24px]">
              <div className="font-semibold text-[4.8vw] leading-tight ">
                The Best AI Resume Creator
              </div>
              <div className="font-medium text-[1.5vw] ">
                Craft compelling, recruiter-vetted resumes effortlessly with our
                cutting-edge resume builder powered by AI Generation. Tailor
                resumes for each role swiftly, leveraging a myriad of remarkable
                features. Enhance your prospects of securing an interview and
                distinguish yourself from competitors in just minutes.
              </div>
              <button
                onClick={clickHandler}
                className="px-9 py-4 bg-[#06A9EF] text-white rounded-[12px] text-[1.3vw] font-semibold"
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
        <div className="flex items-end justify-center overflow-hidden ">
          <GenerateAi />
        </div>

        <div className="flex flex-row gap-9 items-center  py-[142px] bg-carousel_bg bg-cover bg-no-repeat ">
          <div className="w-[62%]">
            <ImgCarousel />
          </div>

          <div className=" flex flex-col gap-6 w-[35%] text-[#333333]">
            <div className="font-semibold  text-[2.5vw] leading-tight ">
              Resume Templates for All Careers.
            </div>
            <div className="font-medium scr1200:text-[1.67vw] text-[20px] w-[95%] break-words ">
              Select one of our expertly designed resume templates, and you will
              be able to quickly and easily create a resume that fits your needs
              and style, even if you have never created one before using
              pre-approved sections that have been approved by recruiters
              worldwide.
            </div>
            <button
              onClick={clickHandler}
              className="px-9 py-4 bg-[#06A9EF] text-[1.3vw] text-white w-[17.7vw] font-semibold rounded-[12px]"
            >
              Get Started
            </button>
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
