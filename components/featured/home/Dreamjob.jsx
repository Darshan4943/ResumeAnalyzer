import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { popupVisible } from "../../../Redux/actions/user";
import { useRouter } from "next/router";

function DreamJob({ isLogin }) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    // <div className=" bg-bg_inventory bg-cover bg-no-repeat ">
      <div className="customMargins flex ml:flex-row flex-col ml:gap-[2vw]  gap-12 items-center py-12">
        <div className="ml:w-[50%] w-full  flex justify-center  items-center ml:pr-12 ">
          <img
            src="/images/resumeBuilder/dreamJob.png"
            alt=""
            className={`ml:w-[40vw] w-[50vw] ml:h-[45vw] h-[55vw] object-contain ml:py-12`}
          />
        </div>
        <div className=" flex flex-col gap-6 ml:w-[47%] w-full text-[#000000] ml:text-start text-center  ">
          <div className="flex flex-col gap-[24px] ml:items-start items-center">
            <div className="font-semibold ml:text-[2.5vw] text-[30px] leading-tight">
               Find Your <span className="text-[#06A9EF]">Dream Job</span>
           
            <p className="font-semibold ml:text-[2.5vw] text-[30px] text-[#333333] ">
              With <span className="text-[#06A9EF]">Skilotech</span>
              </p>
            </div>
            <div className="font-medium ml:text-[1.2vw] text-[14px] text-[#333333] ">
            Skilotech is committed to helping you achieve your career goals. Our job section is designed to connect you with employers who are looking for talented individuals like you. Whether you&apos;re a recent graduate, an experienced professional, or looking for a career change, Skilotech has the resources to help you find your dream job.

            </div>
            <button onClick={() =>
                    router.push("/auth?signin=true&role=user")
                }
                    className="ml:px-10 px-6  py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold btn_hover_effect"
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
