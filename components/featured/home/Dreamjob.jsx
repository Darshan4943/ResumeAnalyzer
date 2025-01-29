import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

function DreamJob({ isLogin }) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    // <div className=" bg-bg_inventory bg-cover bg-no-repeat ">
      <div className="customMargins flex ml:flex-row flex-col ml:gap-[2vw]  gap-6 items-center ">
        <div className="ml:w-[40%] w-full  flex ml:justify-end  justify-center items-center ">
          <img
            src="/images/withoutLogin/JobPostingUi.png"
            alt=""
            className={`ml:w-[40vw] xl:w-[370.24px] ml:h-[45vw] scr460:h-[300px] scr460:w-[290px] h-[240px] w-[230px] xl:h-[385.35px] object-contain`}
          />
        </div>
        <div className=" flex flex-col gap-6 ml:w-[60%] xl:w-[50%] w-full text-[#000000] ml:text-start text-center  ">
          <div className="flex flex-col gap-[24px] ml:items-start items-center">
            <div className="font-semibold scr460:text-[24px] text-[18px] leading-tight ">
            Reach Top Talent with Skilotech&apos;s <span className="text-[#06A9EF]">Job Posting</span>
           
            {" "}
              <span className="text-[#06A9EF]">Platform</span>
             
            </div>
            <div className="font-medium scr460:text-[14px] text-[12px] text-[#333333] ">
            Skilotech offers a powerful job posting platform designed to help recruiters find and hire the best talent. Our platform is easy to use and allows you to create and manage job postings, track applications, and communicate with candidates seamlessly. With Skilotech, you can reach a wide audience of qualified professionals and streamline your hiring process.
            </div>
            <button onClick={() =>
                    router.push("/auth/Sign_in?role=recruiter")
                }
                   className="px-9   py-3 bg-[#06A9EF] text-white  rounded-[30px] text-[14px] font-semibold btn_hover_effect  max-w-[155px] h-[42px] leading-tight"
                >
                    Get Started
                </button>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default DreamJob;
