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
            src="/images/auth/selectrole.png"
            alt=""
            className="h-[316px] w-[474px]  object-cover "

          />
        </div>
        <div className="flex flex-col sm:gap-[24px] gap-4  scr1024:p-6 p-3 border border-[#DEDEDE] rounded-[12px] max-w-[400px] scr1024:min-w-[400px]">
          <div className="text-[18px]  sm:text-[20px] font-semibold text-center">
            {signin ? "Sign In" : "Sign Up"}

          </div>
          <div className=" flex flex-col gap-2">
            <div className="text-[#333] text-center text-[16px]  sm:text-[18px]  font-[600]">
              Select a role to get started
            </div>
            <div className="text-[#646464] text-center text-[12px]  sm:text-[14px]  font-[500]">
              We need to know which role best matches you so that we can personalize your experience.
            </div>
          </div>
          <div className="flex justify-center item-center">
            <div className="flex flex-col gap-[24px] px-[8px]">

              <div onClick={() => { signin ? router.push("/auth/Sign_in?role=user") : router.push("/auth/AiProfileCreation") }} className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow">
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className="flex items-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#646464" />
                      <g clip-path="url(#clip0_7596_92341)">
                        <path d="M28.5358 20.8125H26.6797C26.8689 21.3305 26.9722 21.8895 26.9722 22.4721V29.4869C26.9722 29.7298 26.93 29.963 26.853 30.1798H29.9215C31.0678 30.1798 32.0002 29.2473 32.0002 28.1011V24.277C32.0003 22.3667 30.4461 20.8125 28.5358 20.8125Z" fill="#646464" />
                        <path d="M13.0281 22.4721C13.0281 21.8894 13.1314 21.3305 13.3206 20.8125H11.4645C9.55419 20.8125 8 22.3667 8 24.277V28.1012C8 29.2473 8.93249 30.1799 10.0787 30.1799H13.1473C13.0703 29.9629 13.0281 29.7298 13.0281 29.4869V22.4721Z" fill="#646464" />
                        <path d="M22.1218 19.0078H17.8786C15.9683 19.0078 14.4141 20.562 14.4141 22.4724V29.4872C14.4141 29.8698 14.7243 30.1801 15.107 30.1801H24.8935C25.2761 30.1801 25.5864 29.8699 25.5864 29.4872V22.4724C25.5864 20.562 24.0322 19.0078 22.1218 19.0078Z" fill="#646464" />
                        <path d="M20.0025 9.82031C17.705 9.82031 15.8359 11.6894 15.8359 13.9869C15.8359 15.5453 16.696 16.9063 17.9663 17.6208C18.5688 17.9598 19.2634 18.1534 20.0025 18.1534C20.7416 18.1534 21.4362 17.9598 22.0387 17.6208C23.309 16.9063 24.169 15.5452 24.169 13.9869C24.169 11.6895 22.2999 9.82031 20.0025 9.82031Z" fill="#646464" />
                        <path d="M12.6863 13.7051C10.9681 13.7051 9.57031 15.1029 9.57031 16.8211C9.57031 18.5393 10.9681 19.9371 12.6863 19.9371C13.1222 19.9371 13.5372 19.8468 13.9142 19.6846C14.5661 19.4039 15.1035 18.9071 15.4361 18.2849C15.6696 17.8481 15.8024 17.3499 15.8024 16.8211C15.8024 15.1029 14.4045 13.7051 12.6863 13.7051Z" fill="#646464" />
                        <path d="M27.3191 13.7051C25.6009 13.7051 24.2031 15.1029 24.2031 16.8211C24.2031 17.3499 24.3359 17.8482 24.5694 18.2849C24.9019 18.9072 25.4394 19.404 26.0913 19.6846C26.4683 19.8468 26.8833 19.9371 27.3191 19.9371C29.0374 19.9371 30.4352 18.5393 30.4352 16.8211C30.4352 15.1029 29.0374 13.7051 27.3191 13.7051Z" fill="#646464" />
                      </g>
                      <defs>
                        <clipPath id="clip0_7596_92341">
                          <rect width="24" height="24" fill="white" transform="translate(8 8)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] sign_ip_text">
                      Candidate
                    </div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] sign_ip_text">
                      Create your own resume
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeftWhite />
                </div>
                <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>

              <div onClick={() => { signin ? router.push("/auth/Sign_in?role=recruiter") : router.push("/auth/Sign_up?role=recruiter") }} className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow">
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className="flex items-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"

                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="38.9999"
                        rx="19.4999"
                        stroke="#333333"
                      />
                      <g clip-path="url(#clip0_2267_28073)">
                        <path
                          d="M32 19.2851H29.615C29.2645 14.5338 25.4665 10.736 20.7149 10.3849V8H19.2851V10.3849C14.5337 10.736 10.7354 14.5337 10.3849 19.2851H8V20.7149H10.3849C10.7354 25.4666 14.5337 29.264 19.2851 29.6151V32H20.7149V29.6151C25.4665 29.264 29.2645 25.4666 29.615 20.7149H32V19.2851ZM20.0001 28.2215C15.4669 28.2215 11.7785 24.5331 11.7785 19.9999C11.7785 15.4668 15.4669 11.7784 20.0001 11.7784C24.5332 11.7784 28.2216 15.4668 28.2216 19.9999C28.2216 24.5331 24.5332 28.2215 20.0001 28.2215Z"
                          fill="#333333"
                        />
                        <path
                          d="M21.4325 20.3477C22.4824 19.6412 23.2058 18.2476 23.2058 16.9931C23.2058 15.2229 21.7703 13.7881 19.9999 13.7881C18.2304 13.7881 16.7957 15.2235 16.7957 16.9931C16.7957 18.2476 17.5176 19.6412 18.5686 20.3477C16.0563 20.9845 14.1968 23.1641 14.1968 24.7796C14.1968 26.6898 25.8044 26.6898 25.8044 24.7796C25.8044 23.1649 23.943 20.9845 21.4325 20.3477ZM19.9999 26.2109L18.3749 24.5855L19.7433 21.2771H19.729L19.1969 20.6676C19.4535 20.7598 19.7216 20.8156 19.9999 20.8156C20.2777 20.8156 20.5459 20.7598 20.8027 20.669L20.2707 21.2779H20.2582L21.6266 24.5864L19.9999 26.2109Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2267_28073">
                          <rect
                            width="24"
                            height="23.9999"
                            fill="white"
                            transform="translate(8 8)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] ">Recruiter</div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] ">
                      Create resumes for various clients
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeft />
                </div>
                <div className="h-[100%] w-[0%] bg-[#FFD500] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>

              <div onClick={() => { signin ? router.push("/auth/Sign_in?role=employer") : router.push("/auth/Sign_up?role=employer") }} className="p-[16px] z-0 flex flex-row justify-between rounded-[16px] gap-4 relative sign_up_shadow">
                <div className="flex flex-row justify-center item-center gap-[12px] ">
                  <div className="flex items-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"

                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="38.9999"
                        rx="19.4999"
                        stroke="#333333"
                      />
                      <g clip-path="url(#clip0_2267_28073)">
                        <path
                          d="M32 19.2851H29.615C29.2645 14.5338 25.4665 10.736 20.7149 10.3849V8H19.2851V10.3849C14.5337 10.736 10.7354 14.5337 10.3849 19.2851H8V20.7149H10.3849C10.7354 25.4666 14.5337 29.264 19.2851 29.6151V32H20.7149V29.6151C25.4665 29.264 29.2645 25.4666 29.615 20.7149H32V19.2851ZM20.0001 28.2215C15.4669 28.2215 11.7785 24.5331 11.7785 19.9999C11.7785 15.4668 15.4669 11.7784 20.0001 11.7784C24.5332 11.7784 28.2216 15.4668 28.2216 19.9999C28.2216 24.5331 24.5332 28.2215 20.0001 28.2215Z"
                          fill="#333333"
                        />
                        <path
                          d="M21.4325 20.3477C22.4824 19.6412 23.2058 18.2476 23.2058 16.9931C23.2058 15.2229 21.7703 13.7881 19.9999 13.7881C18.2304 13.7881 16.7957 15.2235 16.7957 16.9931C16.7957 18.2476 17.5176 19.6412 18.5686 20.3477C16.0563 20.9845 14.1968 23.1641 14.1968 24.7796C14.1968 26.6898 25.8044 26.6898 25.8044 24.7796C25.8044 23.1649 23.943 20.9845 21.4325 20.3477ZM19.9999 26.2109L18.3749 24.5855L19.7433 21.2771H19.729L19.1969 20.6676C19.4535 20.7598 19.7216 20.8156 19.9999 20.8156C20.2777 20.8156 20.5459 20.7598 20.8027 20.669L20.2707 21.2779H20.2582L21.6266 24.5864L19.9999 26.2109Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2267_28073">
                          <rect
                            width="24"
                            height="23.9999"
                            fill="white"
                            transform="translate(8 8)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px]  sm:text-[16px] font-[500] ">Employer</div>
                    <div className="text-[10px]  sm:text-[12px] font-[500] text-[#646464] ">
                      Create resumes for various clients
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <ArrowLeft />
                </div>
                <div className="h-[100%] w-[0%] bg-[#FFD500] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
              </div>

            </div>
          </div>
          {signin ?
            <div className="flex items-center justify-center text-[12px]  sm:text-[14px] font-[500] text-[#646464]">
              Do not have an account?{"  "}
              <span
                onClick={() =>
                  router.push(
                    "/auth?signup=true"
                  )
                }
                className="text-[#06A9EF] cursor-pointer ml-1"
              >
                Sign Up
              </span>
            </div>
            :
            <div className="flex items-center justify-center text-[14px] font-[500] text-[#646464]">
              Already have an account?{"  "}
              <span
                onClick={() =>
                  router.push(
                    "/auth?signin=true"
                  )
                }
                className="text-[#06A9EF] cursor-pointer ml-1"
              >
                Sign In
              </span>
            </div>}
        </div>
      </div>
    </>
  );
}

export default RoleSelect;
