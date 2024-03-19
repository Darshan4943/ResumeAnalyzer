import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
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
        className={index != 2 && "svg_classs"}
      />
    </g>
  </svg>
);

function Sign_up() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center  items-center h-[500px] w-full earth_container my-[3rem] ">
        <div className="w-full flex flex-col gap-[36px] pb-[10px]">
          <div>
            <div className="text-[#333] text-center text-[30px] ms:text-[40px] font-[600]">
              Select a role to get started
            </div>
            <div className="text-[#646464] text-center text-[14px] ms:text-[16px] font-[500]">
             In the process we will help you personalize your experience.
            </div>
          </div>
          <div className="flex justify-center item-center">
            <div className="flex flex-col gap-[24px] px-[8px]">
              <Link href="/auth/user-signup">
                <div className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] relative sign_up_shadow">
                  <div className="flex flex-row justify-center item-center gap-[8px] ">
                    <div className="flex items-center">
                      <div className="p-[8px] border-[1px] border-[#333] rounded-[50%] sign_iu_text_border">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
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
                      <div className="text-[20px] font-[500] sign_ip_text">
                        Candidate
                      </div>
                      <div className="text-[14px] font-[500] text-[#646464] sign_ip_text">
                        Create your own resume
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <ArrowLeft />
                  </div>
                  <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                </div>
              </Link>
              <Link href="/auth/recruiter-signup">
                <div className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] relative sign_up_shadow">
                  <div className="flex flex-row justify-center item-center gap-[8px] ">
                    <div className="flex items-center">
                      <div className="p-[8px]  rounded-[50%] sign_iu_text_border ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_3813_27618)">
                            <path
                              d="M24.5 11.2851H22.115C21.7645 6.53381 17.9665 2.73605 13.2149 2.38485V0H11.7851V2.38485C7.0337 2.73605 3.23536 6.5337 2.88485 11.2851H0.5V12.7149H2.88485C3.23536 17.4666 7.0337 21.264 11.7851 21.6151V24H13.2149V21.6151C17.9665 21.264 21.7645 17.4666 22.115 12.7149H24.5V11.2851ZM12.5001 20.2215C7.96689 20.2215 4.2785 16.5331 4.2785 11.9999C4.2785 7.46677 7.96689 3.77839 12.5001 3.77839C17.0332 3.77839 20.7216 7.46677 20.7216 11.9999C20.7216 16.5331 17.0332 20.2215 12.5001 20.2215Z"
                              fill="#333333"
                              className="svg_classs"
                            />
                            <path
                              d="M13.933 12.3476C14.9829 11.6411 15.7063 10.2475 15.7063 8.99295C15.7063 7.22277 14.2708 5.78796 12.5004 5.78796C10.7309 5.78796 9.29618 7.22335 9.29618 8.99295C9.29618 10.2475 10.0181 11.6411 11.0691 12.3476C8.55676 12.9844 6.69727 15.164 6.69727 16.7795C6.69727 18.6897 18.3049 18.6897 18.3049 16.7795C18.3049 15.1648 16.4435 12.9844 13.933 12.3476ZM12.5004 18.2108L10.8753 16.5854L12.2438 13.277H12.2294L11.6974 12.6675C11.954 12.7596 12.2221 12.8155 12.5004 12.8155C12.7782 12.8155 13.0464 12.7596 13.3032 12.6688L12.7712 13.2778H12.7587L14.1271 16.5863L12.5004 18.2108Z"
                              fill="#333333"
                              className="svg_classs"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3813_27618">
                              <rect
                                width="24"
                                height="23.9999"
                                fill="white"
                                transform="translate(0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>{" "}
                      </div>
                    </div>
                    <div>
                      <div className="text-[20px] font-[500] sign_ip_text">
                        Recruiter
                      </div>
                      <div className="text-[14px] font-[500] text-[#646464] sign_ip_text">
                        Create resumes for various clients
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <ArrowLeft />
                  </div>
                  <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center text-[14px] font-[500] text-[#646464]">
            Already have an account?{"  "}
            <span
              onClick={() =>
                router.push({
                  pathname: "/auth",
                  query: { signin: true },
                })
              }
              className="text-[#06A9EF] cursor-pointer ml-1"
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign_up;
