import { useRouter } from "next/router";
import React from "react";

function ResumeComp() {
  const router = useRouter();
  return (
    <div className="customMargins">
      <div
        style={{
          background:
            "linear-gradient(177.77deg, #FFFFFF 30.14%, #FFDF9B 192.48%)",
        }}
        className="py-5 px-10  flex ms:flex-row flex-col-reverse ml:gap-12 gap-6 items-center scr1024:w-[930px] justify-between border border-[#D99403] rounded-[12px]"
      >
        <div className="flex flex-col gap-6 ms:items-start items-center">
          <p className="ml:text-[22px] text-[18px] font-[600] ms:text-start text-center">
            Create a Job-Winning Resume in Minutes
          </p>
          <p className="text-[14px] font-[500] ms:text-start text-center">
            Unlock your career potential with AI-powered skill assessment.
            <br className="ml:block hidden" />✅ Boost Your Abilities | ✅ Boost
            Your Abilities | ✅ Land Your Dream Job
          </p>
          <button
            onClick={() => router.push("/auth?signin=true")}
            className="leading-tight py-3 px-9 text-[#FFFFFF] bg-blue text-[14px] font-[600] rounded-[30px] h-[42px] w-[155px]"
          >
            Get Started
          </button>
        </div>
        <img
          src="/images/withoutLogin/resumeComp.png"
          alt=""
          className="h-[176px] w-[176px]  object-cover "
        />
      </div>
    </div>
  );
}

export default ResumeComp;
