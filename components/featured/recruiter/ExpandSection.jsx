import React from "react";
import { Parallax } from "react-scroll-parallax";

function ExpandSection() {
  return (
    <>
      <div className="customMargins w-screen">
        <div class="w-full flex mt-[49px] mb-[26px] gap-[43px]">
          <Parallax speed={-10}>
            <div class="flex justify-start w-[100%] h-[580px] ">
              <img
                class="w-full h-full"
                src="/images/recruiter/handshake_img.png"
                alt=""
              />
            </div>
          </Parallax>

          <div class="h-[580px] flex justify-center flex-col w-[50%]">
            <div class="flex flex-col gap-[16px]">
              <p class="w-[99%] text-light-black font-montserrat text-[52px] font-bold self-stretch leading-[63px]">
                Expand your search with us
              </p>
              <span class="text-[26px] leading-[32px]">
                Broader candidate pool and enhance diversity.
              </span>
            </div>
            <div class="mt-[24px] leading-[52px]">
              <p class="w-full text-light-black font-montserrat text-base font-[17px] leading-26 self-stretch">
                By incorporating advanced features like personalized job
                matching, diversity and inclusion tools, and real-time
                communication, you can enhance the candidate experience, promote
                inclusivity, and streamline the selection process.{" "}
              </p>
            </div>
            <div className="expand_button">
              <button class="border-none rounded-xl border border-shadow-color bg-yellow shadow-md flex items-center justify-center px-[48px] py-[18px] font-bold mt-[24px] text-[18px]">
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
