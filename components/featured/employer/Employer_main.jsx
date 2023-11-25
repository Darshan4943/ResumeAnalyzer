import React from "react";
function Employer_main() {
  return (
    <div className="h-[560px]">
      <div className="h-full w-full bg-no-repeat bg-cover flex flex-col justify-center Employer_main_container">
        <div className="flex flex-col gap-[24px] w-[95%] customMargins">
          <div>
            <div className="text-white font-Montserrat text-[86px] font-bold leading-[105px] ">
              <span className="text-[#ffda1d]">Find</span> relevant <br />
              candidates fast
            </div>
          </div>
          <div className="text-white font-montserrat text-2xl font-bold">
            Find the
            <span className="text-[#ffda1d]"> perfect match</span>
          </div>
          <div className="text-white text-justify font-montserrat text-base font-medium">
            Your job listings must be found by millions of qualified candidates
            if you want to hire <br /> the best applicant. Skilotech is your
            indispensable hiring partner, you can find, get in <br />
            touch with, and hire the ideal candidates who meet your
            requirements.
          </div>
          <div>
            <button className="bg-yellow font-bold inline-flex px-[48px] py-[18px] border-none justify-center items-center rounded-[12px] transition-all duration-200 employer_btn_class">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employer_main;
