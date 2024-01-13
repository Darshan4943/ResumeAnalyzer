import React from "react";
import { Parallax } from "react-scroll-parallax";

function ExpandSection() {
  return (
    <>
      <div className="customMargins w-screen">
        <div class="flex_class w-full flex flex-col ml:flex ml:flex-row mt-[49px] mb-[26px] gap-[16px] ml:gap-[43px]">
          <Parallax className="web" speed={-10}>
            <div class="flex justify-center ml:justify-start w-[100%] h-[100%] ml:w-[80%] ml:h-[580px] ">
              <img
                class="ml:w-full ml:h-full sm:w-[26rem] sm:h-[19rem] w-[19rem] h-[19rem]"
                src="/images/recruiter/handshake_img.png"
                alt=""
              />
            </div>
          </Parallax>

          <div className="mobile">
            <div class="flex justify-center ml:justify-start w-[100%] h-[100%] ml:w-[80%] ml:h-[580px] ">
              <img
                class="ml:w-full ml:h-full sm:w-[26rem] sm:h-[19rem] w-[19rem] h-[19rem]"
                src="/images/recruiter/handshake_img.png"
                alt=""
              />
            </div>
          </div>

          <div class="ml:h-[580px] bg-[#fff] z-10 ml:flex flex justify-center flex-col w-[100%] ml:w-[50%]">
            <div class="flex flex-col ml:gap-[16px] gap-[8px]">
              <p class="w-[99%] text-light-black font-montserrat text-[30px] leading-normal ml:text-[52px] font-bold self-stretch ml:leading-[63px]">
                Expand your search with us
              </p>
              <span class="ml:text-[26px] ml:leading-[32px] text-[18px] leading-normal">
                Broader candidate pool and enhance diversity.
              </span>
            </div>
            <div class="ml:mt-[24px] mt-[8px] ml:leading-[52px]">
              <p class="w-full text-light-black font-montserrat ml:text-[17px] ml:leading-26 text-[14px] leading-[20px] self-stretch">
                By incorporating advanced features like personalized job
                matching, diversity and inclusion tools, and real-time
                communication, you can enhance the candidate experience, promote
                inclusivity, and streamline the selection process.{" "}
              </p>
            </div>
            <div className="expand_button">
              <button class="border-none rounded-xl border border-shadow-color bg-yellow shadow-ml flex items-center justify-center px-[16px] py-[8px] ml:px-[48px] ml:py-[18px] font-[600] ml:font-bold mt-[8px] ml:mt-[24px] text-[14px] ml:text-[18px]">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpandSection;
