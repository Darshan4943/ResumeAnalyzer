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
            src="/images/withoutLogin/dreamJob.png"
            alt=""
            className={`ml:w-[40vw] xl:w-[370.24px] ml:h-[45vw] scr460:h-[300px] scr460:w-[290px] h-[240px] w-[230px] xl:h-[385.35px] object-contain`}
          />
        </div>
        <div className=" flex flex-col gap-6 ml:w-[60%] xl:w-[50%] w-full text-[#000000] ml:text-start text-center  ">
          <div className="flex flex-col gap-[24px] ml:items-start items-center">
            <div className="font-semibold scr460:text-[24px] text-[18px] leading-tight ">
               Find Your <span className="text-[#06A9EF]">Dream Job</span>
           
            {" "}
              With <span className="text-[#06A9EF]">Skilotech</span>
             
            </div>
            <div className="font-medium scr460:text-[14px] text-[12px] text-[#333333] ">
            Skilotech is committed to helping you achieve your career goals. Our job section is designed to connect you with employers who are looking for talented individuals like you. Whether you&apos;re a recent graduate, an experienced professional, or looking for a career change, Skilotech has the resources to help you find your dream job.

            </div>
            <button onClick={() =>
                    router.push("/auth?signin=true")
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
