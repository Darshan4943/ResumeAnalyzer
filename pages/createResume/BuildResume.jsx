import React, { useState } from "react";

import { useRouter } from "next/router";

const ArrowLeft = ({ index }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <g mask="url(#mask0_3991_32467)">
      <path
        d="M8.525 22L6.75 20.225L14.975 12L6.75 3.775L8.525 2L18.525 12L8.525 22Z"
        fill="#333333"
        className={index != 1 && "svg_classs"}
      />
    </g>
  </svg>
);

function BuildResume() {
  const router = useRouter();
  const clientId = router.query.clientId;

  return (
    <div className="flex gap-12 customMargins py-12">
      <img
        src="/images/withoutLogin/resumeCreateOption.png"
        alt=""
        className="h-[330px] w-[320px]  object-cover "

      />
      <div className="flex justify-center  w-full  ">
        <div className="w-full flex flex-col gap-[36px] pb-[10px]  items-center">
          <div className="ml:w-[66%] sm:w-[80%] w-[95%] flex flex-col gap-3 ">
            <div className="text-[#333] text-center  text-[18px]  font-[600] leading-tight">
              How would you like to create your resume?
            </div>
            <div className="text-[#646464] text-center text-[12px] scr540:text-[14px] font-[500]">
            Craft resume manually or upload for easy restructuring. Choose what works for client.
            </div>
          </div>
          <div className="flex justify-center item-center w-full">
            <div className="flex flex-col gap-[24px]  w-[66%]">
              <div
                // localStorage.removeItem("parsedResume");
                onClick={() => router.push(`/createResume/CandidateResumeDetails?clientId=${clientId}`)}
              >
                <div className="scr540:px-[16px] px-2  py-4 z-0 flex flex-row justify-between rounded-[16px] scr540:gap-10 gap-2 relative sign_up_shadow">
                  <div className="flex flex-row justify-center item-center gap-[8px] ">
                    <div className="flex items-center gap-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_181_4664)">
                          <path
                            className="svg_classs"
                            d="M19 29H21V21H29V19H21V11H19V19H11V21H19V29ZM20.0067 38C17.5176 38 15.1774 37.5277 12.9862 36.583C10.795 35.6384 8.88888 34.3564 7.26795 32.737C5.64705 31.1176 4.36383 29.2133 3.4183 27.0241C2.47277 24.8349 2 22.4958 2 20.0067C2 17.5176 2.47232 15.1774 3.41695 12.9862C4.36162 10.795 5.64365 8.88888 7.26305 7.26795C8.88245 5.64705 10.7867 4.36383 12.9759 3.4183C15.1651 2.47277 17.5042 2 19.9933 2C22.4824 2 24.8226 2.47232 27.0138 3.41695C29.205 4.36162 31.1111 5.64365 32.732 7.26305C34.3529 8.88245 35.6362 10.7867 36.5817 12.9759C37.5272 15.1651 38 17.5042 38 19.9933C38 22.4824 37.5277 24.8226 36.583 27.0138C35.6384 29.205 34.3564 31.1111 32.737 32.732C31.1176 34.3529 29.2133 35.6362 27.0241 36.5817C24.8349 37.5272 22.4958 38 20.0067 38ZM20 36C24.4667 36 28.25 34.45 31.35 31.35C34.45 28.25 36 24.4667 36 20C36 15.5333 34.45 11.75 31.35 8.65C28.25 5.55 24.4667 4 20 4C15.5333 4 11.75 5.55 8.65 8.65C5.55 11.75 4 15.5333 4 20C4 24.4667 5.55 28.25 8.65 31.35C11.75 34.45 15.5333 36 20 36Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>

                      <div>
                        <div className=" text-[16px] font-[500] sign_ip_text leading-tight">
                          Create New Resume
                        </div>
                        <div className=" text-[12px] font-[500] text-[#646464] sign_ip_text leading-tight">
                          Enter your details manually
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <ArrowLeft />
                  </div>
                  <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                </div>
              </div>
              <div
                onClick={() => router.push(`/createResume/CandidateResumeDetails?isResume=true&clientId=${clientId}`)}
              >
                <div className="scr540:px-[16px] px-2 py-4 z-0 flex flex-row justify-between rounded-[16px] scr540:gap-10 gap-2  relative sign_up_shadow">
                  <div className="flex flex-row justify-center item-center gap-[8px] ">
                    <div className="flex items-center gap-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_181_4668)">
                          <path
                            d="M19.5556 30.2564H21.3333V21.9111L25.0667 25.6444L26.3248 24.3761L20.4444 18.4957L14.5641 24.3761L15.8325 25.6342L19.5556 21.9111V30.2564ZM10.8718 36C10.0536 36 9.37037 35.7259 8.82222 35.1778C8.27407 34.6296 8 33.9464 8 33.1282V6.87178C8 6.05356 8.27407 5.37037 8.82222 4.82222C9.37037 4.27407 10.0536 4 10.8718 4H24.8889L32.8889 12V33.1282C32.8889 33.9464 32.6148 34.6296 32.0667 35.1778C31.5185 35.7259 30.8353 36 30.0171 36H10.8718ZM24 12.8889V5.77778H10.8718C10.5983 5.77778 10.3476 5.89173 10.1196 6.11965C9.89173 6.34759 9.77778 6.5983 9.77778 6.87178V33.1282C9.77778 33.4017 9.89173 33.6524 10.1196 33.8804C10.3476 34.1083 10.5983 34.2222 10.8718 34.2222H30.0171C30.2906 34.2222 30.5413 34.1083 30.7692 33.8804C30.9972 33.6524 31.1111 33.4017 31.1111 33.1282V12.8889H24Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>

                      <div>
                        <div className=" text-[16px] font-[500] leading-tight ">
                          Already Have a Resume
                        </div>
                        <div className=" text-[12px] font-[500] text-[#646464] leading-tight ">
                          Upload your resume
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <ArrowLeft index={1} />
                  </div>
                  <div className="h-[100%] w-[0%] bg-[#FFD500] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildResume;
