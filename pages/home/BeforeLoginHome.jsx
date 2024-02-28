import React, { useEffect, useRef } from "react";
import Images from "../../components/featured/home/images";
import GenerateAi from "../../components/featured/home/generateAi";
import { useRouter } from 'next/router';
import ImgCarousel from "../../components/featured/home/ImgCarousel";


function BeforeLoginHome() {
  const router = useRouter();
  return (
    <div className="">
      <div className="flex flex-row gap-8 items-center customMargins">
        <div className=" flex flex-col gap-6 w-[50%] text-[#333333]">
          <div className="font-semibold scr1200:text-[72px] text-[52px] leading-none ">
            The Best AI Resume Creator
          </div>
          <div className="font-medium scr1200:text-[24px] text-[20] ">
            Craft compelling, recruiter-vetted resumes effortlessly with our cutting-edge resume builder powered by AI Generation. Tailor resumes for each role swiftly, leveraging a myriad of remarkable features. Enhance your prospects of securing an interview and distinguish yourself from competitors in just minutes.
          </div>
          <button onClick={() => router.push("/home/BuildResume")} className="px-9 py-4 bg-[#06A9EF] text-white w-[253px] rounded-[12px] text-[20px] font-semibold">
            Build My Resume
          </button>

        </div>
        <div className="w-[50%]">
          <Images />
        </div>


      </div>
      <div className="flex items-end justify-center ">
        <GenerateAi />
      </div>

      <div className="flex flex-row gap-9 items-center customMargins py-[142px] bg-carousel_bg bg-cover bg-no-repeat ">
        <div className="w-[62%]">
          <ImgCarousel />
        </div>

        <div className=" flex flex-col gap-6 w-[35%] text-[#333333]">
          <div className="font-semibold scr1200:text-[36px] text-[30px] leading-none ">
            Resume Templates for All Careers.
          </div>
          <div className="font-medium scr1200:text-[24px] text-[20px] w-[95%] break-words ">
            Select one of our expertly designed resume templates, and you will be able to quickly and easily create a resume that fits your needs and style, even if you have never created one before using pre-approved sections that have been approved by recruiters worldwide.
          </div>
          <button className="px-9 py-4 bg-[#06A9EF] text-[20px] text-white w-[253px] font-semibold rounded-[12px]">
            Get Started
          </button>

        </div>

      </div>
    </div>
  );
}

export default BeforeLoginHome;
