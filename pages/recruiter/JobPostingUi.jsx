import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function JobPostingUi() {
  const [isLogin, setIsLogin] = useState(false);

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
      router.push("/myClients");
    } else {
        router.push("/auth?signin=true&role=recruiter")
    }
  };

  return (
    <div className="flex ml:flex-row flex-col ml:gap-[40px] w-[100%] justify-center items-center  ml:pb-12 pb-12 ">
   
        <img
          className=" ml:h-[45vw] ml:w-[45vw] h-[75vw] w-[75vw]  object-contain  "
          src="/images/recruiter/JobPostingUi.png"
          alt=""
        />

      <div className="flex flex-col ml:gap-6 gap-4 ml:w-[40%] w-[95%] ml:items-start items-center">
        <div className="flex flex-col gap-2 ml:text-start text-center">
        <p className="font-semibold ml:text-[3.2vw] text-[28px] leading-tight">
          Reach Top Talent with Skilotech's <span className="text-[#06A9EF]">Job Posting</span>  Platform
          
          </p>
        </div>
        <div className="ml:text-[1.2vw] text-[14px] font-medium ml:text-start text-center ">
        Skilotech offers a <span className="text-[#06A9EF]">powerful job posting platform designed to help recruiters</span> find and hire the best talent. Our platform is easy to use and allows you to create and manage job postings, track applications, and communicate with candidates seamlessly.<span className="text-[#06A9EF]"> With Skilotech, you can reach a wide audience of qualified professionals</span> and streamline your hiring process.        </div>
        <button
          onClick={clickHandler}
          className="bg-[#06A9EF] btn_hover_effect text-white flex gap-2  px-6  ml:py-3 py-2 ml:w-[174px] ml:rounded-[12px] rounded-[8px] justify-center items-center"
        >
          <p className="ml:text-[16px] text-[14px] font-semibold">Get Started</p>
        </button>
      </div>
    </div>
  );
}

export default JobPostingUi;
