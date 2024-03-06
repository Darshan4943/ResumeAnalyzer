import React from "react";

function RecruiterHero() {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="ml:min-h-[560px] bg-no-repeat pt-[12px] ml:pt-[61px] overflow-hidden bg-cover bg-center bg-recruiter_back w-screen">
        <div className="customMargins">
          <div className="expand_text">
            <p class="text-white max-w-[250px] ml:max-w-[750px] font-montserrat ml:text-[86px] text-[28px] leading-normal ml:leading-[105px] font-bold">
              <span className="text-[#FFDA1D]">Expand</span> your <br />
              recruiting limits
            </p>
          </div>
          <div class="ml:mt-[24px] mt-[16px]">
            <p class="text-white max-w-[255px] ml:max-w-[60%] font-montserrat text-[20px] ml:text-[26px]  font-bold">
              Connect with a broad{" "}
              <span class="text-[#FFDA1D]">spectrum of Employers</span>
            </p>
          </div>
          <div class="ml:bg-white h-[1px] w-[55%] my-[12px]"></div>
          <div className="para heroBlock">
            <p class="max-w-[55%] text-white text-justify font-montserrat font-medium leading-[20px]">
              Your consulting firm can tap into a vast network of employers
              through our platform. We connect you with a diverse range of
              companies, offering an extensive talent pool and growth
              opportunities. Join us to expand your professional horizons and
              open doors to a multitude of career possibilities.
            </p>
          </div>
          <div className="get_started_button ml:pb-[30px] heroBlock">
            <button class="mt-[13px] border-none rounded-[8px] bg-[#ffda1d] flex items-center px-[48px] py-[18px] font-bold">
              Get started
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center unblockRecruiter">
        <div className="flex justify-center unblockRecruiter">
          <p class="max-w-[95%] unblockRecruiter text-[#333] text-justify font-montserrat text-[14px] font-medium leading-[20px]">
            Your consulting firm can tap into a vast network of employers
            through our platform. We connect you with a diverse range of
            companies, offering an extensive talent pool and growth
            opportunities. Join us to expand your professional horizons and open
            doors to a multitude of career possibilities.
          </p>
        </div>
        <div className="get_started_button unblockRecruiter mb-[20px]">
          <button class="mt-[13px] border-none rounded-[6px] bg-[#ffda1d] flex items-center px-[16px] py-[8px] text-[14px] font-bold">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecruiterHero;
