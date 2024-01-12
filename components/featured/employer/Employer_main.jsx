import React from "react";
function Employer_main() {
  return (
    <div className="main_container  w-screen">
      <div className="h-full w-full bg-no-repeat bg-cover flex flex-col justify-center Employer_main_container">
        <div className="flex flex-col  w-[95%] emp_3rd_container customMargins">
          <div>
            <div className="Employer_head text-white font-Montserrat  font-bold   ">
              <span className=" Employer_head_span text-[#ffda1d]">Find</span>{" "}
              relevant <br />
              candidates fast
            </div>
          </div>
          <div className="Employer_head_2nd text-white font-montserrat font-bold">
            Find the
            <span className="Employer_head_2nd text-[#ffda1d]"> perfect match</span>
          </div>
          <div className="employer_head_para text-white text-justify font-montserrat   font-medium">
            Your job listings must be found by millions of qualified candidates
            if you want to hire <br /> the best applicant. Skilotech is your
            indispensable hiring partner, you can find, get in <br />
            touch with, and hire the ideal candidates who meet your
            requirements.
          </div>
          <div>
            <button className="employer_button bg-[#ffda1d] font-bold   border-none justify-center items-center rounded-[12px] transition-all duration-200 employer_btn_class">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employer_main;
