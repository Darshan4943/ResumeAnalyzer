import React from "react";
import { Parallax } from "react-scroll-parallax";

function ExpandSection() {
  return (
    <>
      <div className="customMargins w-screen">
        <div className="flex_class w-full flex flex-col ml:flex ml:flex-row mt-[49px] mb-[26px] gap-[16px] ml:gap-[43px]">
          <div className="hidden lg:block w-[50%]">
            <div className="flex justify-center ml:justify-start w-[100%] h-[100%] ml:w-[100%] ml:h-[580px]  ">
              <img
                className="ml:w-full ml:h-full sm:w-[26rem] sm:h-[19rem] w-[19rem] h-[19rem] object-contain "
                src="/images/recruiter/handshake_img.png"
                alt=""
              />
            </div>
          </div>

          <div className="mobile">
            <div className="flex justify-center ml:justify-start w-[100%] h-[100%] ml:w-[80%] ml:h-[580px] ">
              <img
                className="ml:w-full ml:h-full sm:w-[26rem] sm:h-[19rem] w-[19rem] h-[19rem] object-contain"
                src="/images/recruiter/handshake_img.png"
                alt=""
              />
            </div>
          </div>

          <div className="ml:h-[580px] bg-[#fff] z-10 ml:flex flex justify-center flex-col w-[100%] ml:w-[50%]">
            <div className="flex flex-col ml:gap-[16px] gap-[8px]">
              <p className="w-[99%] text-light-black font-montserrat text-[30px] leading-normal ml:text-[52px] font-bold self-stretch ml:leading-[63px]">
                Expand your search with us
              </p>
              <span className="ml:text-[26px] ml:leading-[32px] text-[18px] leading-normal">
                Broader candidate pool and enhance diversity.
              </span>
            </div>
            <div className="ml:mt-[24px] mt-[8px] ml:leading-[52px]">
              <p className="w-full text-light-black font-montserrat ml:text-[17px] ml:leading-26 text-[14px] leading-[20px] self-stretch">
                By incorporating advanced features like personalized job
                matching, diversity and inclusion tools, and real-time
                communication, you can enhance the candidate experience, promote
                inclusivity, and streamline the selection process.{" "}
              </p>
            </div>
            <div className="expand_button">
              <button className="border-none rounded-[8px] border border-shadow-color bg-yellow shadow-ml flex items-center justify-center px-[16px] py-[8px] ml:px-[48px] ml:py-[18px] font-[600] ml:font-bold mt-[8px] ml:mt-[24px] text-[14px] ml:text-[18px]">
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
