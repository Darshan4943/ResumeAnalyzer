import { useRouter } from "next/router";
import React from "react";

function ResumeComp() {
  const router = useRouter();
  return (
    <div className="customMargins flex justify-center h-fit w-full ">
      <div
        // style={{
        //   background:
        //     "linear-gradient(55.25deg, #000066 34.84%, #13C9F2 66.97%, #66FFCC 86.69%) ",
        // }}
        className="max-w-[930px] relative overflow-hidden w-full h-full rounded-[12px] bg-homeResume bg-cover bg-no-repeat"
      >

        <div className=" w-full h-full top-0 flex flex-col gap-4 ms:flex-row py-4 scr930:py-5 px-4 scr930:px-5 items-center justify-between">
          <div className="w-full ms:w-[66.34%] ms:items-start  items-center flex flex-col gap-[12px] scr930:gap-[26px] ">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] ms:text-start text-center scr800:text-[20px] font-[600] text-[#FFFFFF]">
              Craft Your Perfect Resume in Minutes
              </p>
              <p className="text-[12px] scr800:text-[16px] scr900:text-[14px] ms:text-start text-center font-[500] text-[#FFFFFF]">
                Tired of spending hours on your resume? Our AI-powered tool creates professional resumes tailored to your experience and industry. Simply input your information, and let our AI do the rest.
              </p>
            </div>
            <button
              onClick={() => router.push("/auth?signin=true")}
              className="h-[38px] w-[135px] rounded-[30px] bg_Button text-[#FFFFFF]"
            >
              Get Started
            </button>
          </div>
          <img
            src="/images/withoutLogin/resumeComp.png"
            alt=""
            className="w-[200px] ms:w-[18.92%]"
          />
        </div>
      </div>
    </div>
  );
}

export default ResumeComp;
