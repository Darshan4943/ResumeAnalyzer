import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const ArrowLeftWhite = () => (
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
        className={"svg_classs"}
      />
    </g>
  </svg>
);
const ArrowLeft = () => (
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
      />
    </g>
  </svg>
);

function RoleSelect({ signin, signup }) {
  const router = useRouter();

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="flex justify-center  items-center  my-[72px] flex-row lg:gap-[74px] gap-0 customMargins scr1168:w-[85%]  ">
        <div className="h-[316px] min-w-[474px] scr1024:block hidden">
          <img
            src={
              signin ? "/images/auth/singUp.png" : "/images/auth/selectrole.png"
            }
            alt=""
            className="h-[316px] w-[474px]  object-cover "
          />
        </div>
        <div className="flex flex-col sm:gap-[24px] gap-4  scr1024:p-6 p-3  rounded-[12px] max-w-[400px] scr1024:min-w-[400px]">
          <div className="text-[18px]  sm:text-[20px] font-semibold text-center">
            {signin ? "Sign In" : "Sign Up"}
          </div>
          <div className=" flex flex-col gap-2">
            <div className="text-[#333] text-center text-[16px]  sm:text-[18px]  font-[600]">
              Select a role to get started
            </div>
            <div className="text-[#646464] text-center text-[12px]  sm:text-[14px]  font-[500]">
              We need to know which role best matches you so that we can
              personalize your experience.
            </div>
          </div>
          <div className="flex justify-center item-center w-full">
            <div className="flex flex-col gap-[24px] px-0 sm:px-[8px] w-full">
              <div
                onClick={() => {
                  signin
                    ? router.push("/auth/Sign_in?role=user")
                    : router.push("/auth/AiProfileCreation");
                }}
                className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow cursor-pointer w-full"
              >
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className="flex items-center">
                    <div className=" border-[1px] border-[#333] rounded-[50%] flex justify-center items-center sign_iu_text_border sm:h-[40px] h-[32px] sm:w-[40px] w-[32px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="sm:h-[24px] h-[20px] sm:w-[24px] w-[20px]"
                      >
                        <g clipPath="url(#clip0_3813_27793)">
                          <path
                            d="M21.0358 12.812H19.1797C19.3689 13.33 19.4722 13.889 19.4722 14.4716V21.4864C19.4722 21.7293 19.43 21.9625 19.353 22.1793H22.4215C23.5678 22.1793 24.5002 21.2468 24.5002 20.1006V16.2765C24.5003 14.3662 22.9461 12.812 21.0358 12.812Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                          <path
                            d="M5.52806 14.4716C5.52806 13.8889 5.63142 13.33 5.8206 12.812H3.96454C2.05419 12.812 0.5 14.3662 0.5 16.2765V20.1007C0.5 21.2469 1.43249 22.1794 2.57872 22.1794H5.64726C5.57034 21.9625 5.52806 21.7293 5.52806 21.4864V14.4716Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                          <path
                            d="M14.6218 11.0071H10.3786C8.46825 11.0071 6.91406 12.5613 6.91406 14.4716V21.4865C6.91406 21.8691 7.22428 22.1794 7.60697 22.1794H17.3935C17.7761 22.1794 18.0864 21.8692 18.0864 21.4865V14.4716C18.0864 12.5613 16.5322 11.0071 14.6218 11.0071Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                          <path
                            d="M12.5005 1.82056C10.2031 1.82056 8.33398 3.68965 8.33398 5.98714C8.33398 7.5455 9.1941 8.90652 10.4643 9.62109C11.0668 9.95999 11.7614 10.1537 12.5005 10.1537C13.2397 10.1537 13.9342 9.95999 14.5367 9.62109C15.807 8.90652 16.6671 7.54546 16.6671 5.98714C16.6671 3.6897 14.798 1.82056 12.5005 1.82056Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                          <path
                            d="M5.18438 5.7041C3.46617 5.7041 2.06836 7.10192 2.06836 8.82012C2.06836 10.5383 3.46617 11.9361 5.18438 11.9361C5.62023 11.9361 6.03526 11.8459 6.41227 11.6836C7.06412 11.4029 7.60159 10.9062 7.93417 10.2839C8.16761 9.84716 8.3004 9.34892 8.3004 8.82012C8.3004 7.10196 6.90259 5.7041 5.18438 5.7041Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                          <path
                            d="M19.8172 5.7041C18.099 5.7041 16.7012 7.10192 16.7012 8.82012C16.7012 9.34897 16.834 9.8472 17.0674 10.2839C17.4 10.9062 17.9375 11.403 18.5893 11.6836C18.9663 11.8459 19.3813 11.9361 19.8172 11.9361C21.5354 11.9361 22.9332 10.5383 22.9332 8.82012C22.9332 7.10192 21.5354 5.7041 19.8172 5.7041Z"
                            fill="#333333"
                            className="svg_classs"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3813_27793">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] sign_ip_text">
                      Candidate
                    </div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] sign_ip_text">
                    Make your own resume
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeftWhite />
                </div>
                <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>

              <div
                onClick={() => {
                  signin
                    ? router.push("/auth/Sign_in?role=recruiter")
                    : router.push("/auth/SignUp?role=recruiter");
                }}
                className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow cursor-pointer"
              >
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className=" border-[1px] border-[#333] rounded-[50%] flex justify-center items-center  sm:h-[40px] h-[32px] sm:w-[40px] min-w-[32px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_7608_92288)">
                        <path
                          d="M24 11.2851H21.615C21.2645 6.53381 17.4665 2.73605 12.7149 2.38485V0H11.2851V2.38485C6.5337 2.73605 2.73536 6.5337 2.38485 11.2851H0V12.7149H2.38485C2.73536 17.4666 6.5337 21.264 11.2851 21.6151V24H12.7149V21.6151C17.4665 21.264 21.2645 17.4666 21.615 12.7149H24V11.2851ZM12.0001 20.2215C7.46689 20.2215 3.7785 16.5331 3.7785 11.9999C3.7785 7.46677 7.46689 3.77839 12.0001 3.77839C16.5332 3.77839 20.2216 7.46677 20.2216 11.9999C20.2216 16.5331 16.5332 20.2215 12.0001 20.2215Z"
                          fill="#333333"
                        />
                        <path
                          d="M13.4311 12.3467C14.481 11.6402 15.2043 10.2467 15.2043 8.9921C15.2043 7.22192 13.7688 5.78711 11.9984 5.78711C10.2289 5.78711 8.79423 7.22249 8.79423 8.9921C8.79423 10.2467 9.51611 11.6402 10.5672 12.3467C8.05481 12.9835 6.19531 15.1631 6.19531 16.7786C6.19531 18.6888 17.8029 18.6888 17.8029 16.7786C17.8029 15.1639 15.9416 12.9835 13.4311 12.3467ZM11.9984 18.2099L10.3734 16.5845L11.7418 13.2761H11.7275L11.1955 12.6666C11.4521 12.7588 11.7201 12.8146 11.9984 12.8146C12.2762 12.8146 12.5444 12.7588 12.8012 12.668L12.2692 13.2769H12.2567L13.6252 16.5855L11.9984 18.2099Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7608_92288">
                          <rect width="24" height="23.9999" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] ">
                      Recruiter
                    </div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] ">
                    Create resumes for clients
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeft />
                </div>
                <div className="h-[100%] w-[0%] bg-[#FFD500] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>

              <div
                onClick={() => {
                  signin
                    ? router.push("/auth/Sign_in?role=employer")
                    : router.push("/auth/SignUp?role=employer");
                }}
                className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow cursor-pointer"
              >
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className=" border-[1px] border-[#333] rounded-[50%] flex justify-center items-center sign_iu_text_border sm:h-[40px] h-[32px] sm:w-[40px] min-w-[32px]">
                    <svg
                      className="svg_classs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_7610_109046)">
                        <path
                          className="svg_classs"
                          d="M8.64811 0.375C10.8557 0.375 12.6465 2.16567 12.6465 4.37452C12.6465 6.71742 11.3748 9.68817 8.64811 9.68817C5.83645 9.68817 4.64836 6.58331 4.64836 4.37452C4.64836 2.16572 6.43917 0.375 8.64811 0.375ZM9.67017 10.8132H7.62478L8.13277 11.826H9.16228L9.67022 10.8132H9.67017ZM9.94369 20.4886L9.01214 12.951H8.28277L7.35117 20.4885L8.64802 22.0458L9.94364 20.4886H9.94369ZM6.33084 21.0212C6.23142 20.9018 6.18577 20.7465 6.20484 20.5922L7.20642 12.4885L6.36614 10.8132H5.38078C2.62725 10.8132 0.375 12.9048 0.375 15.4599V19.9892C0.375 21.1272 1.30355 22.0557 2.44153 22.0557H7.19222L6.33084 21.0212ZM10.5434 22.0556V21.5268L10.1034 22.0556H10.5434ZM10.0885 12.4884L10.2211 13.5614C10.4515 13.0351 10.9771 12.6664 11.5874 12.6664H13.7522V12.3091C13.7522 11.9248 13.8584 11.5649 14.0425 11.2568C13.3961 10.9726 12.6751 10.8132 11.9156 10.8132H10.9288L10.0885 12.4884ZM21.6477 19.3154V19.3441C21.6477 20.1438 20.9979 20.7944 20.1991 20.7944C19.4003 20.7944 18.7488 20.1438 18.7488 19.3441V19.3154H16.0978V19.339C16.0978 20.1386 15.4479 20.7892 14.6491 20.7892C13.8503 20.7892 13.1989 20.1387 13.1989 19.339V19.3154H12.6235C12.2857 19.3154 11.9633 19.2482 11.6685 19.1275V22.5486C11.6685 23.1405 12.153 23.625 12.745 23.625H22.1017C22.6937 23.625 23.1783 23.1405 23.1783 22.5486V19.1275C22.8834 19.2483 22.5611 19.3154 22.2232 19.3154H21.6479H21.6477ZM14.9728 19.339V17.8312H14.3238V19.339C14.3238 19.5183 14.4697 19.6642 14.649 19.6642C14.8284 19.6642 14.9727 19.5183 14.9727 19.339H14.9728ZM20.5227 19.3441V17.8363H19.8738V19.3441C19.8738 19.5234 20.0197 19.6693 20.199 19.6693C20.3775 19.6693 20.5227 19.5234 20.5227 19.3441H20.5227ZM23.625 14.1572V16.7899C23.625 17.5606 22.9939 18.1904 22.2231 18.1904L21.6478 18.1909V17.2739C21.6478 16.9633 21.3959 16.7114 21.0853 16.7114H19.3113C19.0007 16.7114 18.7488 16.9633 18.7488 17.2739V18.1934L16.0978 18.1957V17.2688C16.0978 16.9582 15.8459 16.7063 15.5353 16.7063H13.7613C13.4507 16.7063 13.1988 16.9582 13.1988 17.2688V18.1982L12.6234 18.1987C11.8527 18.1987 11.2215 17.569 11.2215 16.7983V14.1572C11.2215 13.9562 11.3863 13.7914 11.5874 13.7914H14.8772V12.3091C14.8772 11.7946 15.2958 11.3761 15.8102 11.3761H19.0363C19.5508 11.3761 19.9694 11.7946 19.9694 12.3091V13.7914H23.2591C23.4602 13.7914 23.625 13.9562 23.625 14.1572L23.625 14.1572ZM18.8444 12.501H16.0022V13.7914H18.8444V12.501Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7610_109046">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] sign_ip_text">
                      Employer
                    </div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] sign_ip_text ">
                    Build resumes to hire top talent
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeftWhite />
                </div>
                <div className="h-[100%] w-[0%] bg-blue absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>
            </div>
          </div>
          {signin ? (
            <div className="flex items-center justify-center text-[12px]  sm:text-[14px] font-[500] text-[#646464]">
              Do not have an account?{"  "}
              <span
                onClick={() => router.push("/auth?signup=true")}
                className="text-[#06A9EF] cursor-pointer ml-1"
              >
                Sign Up
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center text-[12px]  sm:text-[14px] font-[500] text-[#646464]">
              Already have an account?{"  "}
              <span
                onClick={() => router.push("/auth?signin=true")}
                className="text-[#06A9EF] cursor-pointer ml-1"
              >
                Sign In
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RoleSelect;
