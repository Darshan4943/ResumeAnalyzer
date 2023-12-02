import React from "react";
import ALink from "~/components/alink";


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
  return (
    <div className="flex justify-center  item-center h-full w-full earth_container">
      <div className="w-[40%] flex flex-col gap-[36px] pt-[72px] pb-[145px]">
        <div>
          <div className="text-[#333] text-center text-[40px] font-[600]">
            Select a role to get started
          </div>
          <div className="text-[#646464] text-center text-[16px] font-[500]">
            We need to know which role best matches you so that we can
            personalize your experience.
          </div>
        </div>
        <div className="flex justify-center item-center">
          <div className="flex flex-col gap-[24px] px-[94.5px]">
          <ALink href="/Auth/Candidate_register">
            <div className="p-[16px] flex flex-row justify-between rounded-[16px] relative sign_up_shadow">
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
                      <g clip-path="url(#clip0_3813_27793)">
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
                    I’am searching for a job
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* <img
                  src="./images/sign_up/arrow_forward_btn.png"
                  alt=""
                  className="h-[30px] w-[30px] flex items-center temp"
                /> */}
                <ArrowLeft />
              </div>
              <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
            </div>
          </ALink>
          <ALink href="/Auth/Employer_register">
            <div className="p-[16px] flex flex-row justify-between rounded-[16px] relative sign_up_shadow">
              <div className="flex flex-row justify-center item-center gap-[8px] ">
                <div className="flex items-center">
                  {" "}
                  <div className="p-[8px] border-[1px] border-[#333] rounded-[50%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3813_33761)">
                        <path
                          d="M8.2274 10.1756C8.44604 11.5968 9.54424 13.4056 11.3481 14.0417C12.0885 14.3001 12.8985 14.3051 13.6389 14.0367C15.4129 13.3957 16.5459 11.5919 16.7695 10.1756C17.008 10.1558 17.3211 9.82283 17.659 8.62525C18.1211 6.99038 17.6291 6.74689 17.2117 6.78664C17.2912 6.56302 17.3509 6.33444 17.3906 6.11579C18.0963 1.87706 16.0092 1.73295 16.0092 1.73295C16.0092 1.73295 15.6613 1.06708 14.752 0.565186C14.1408 0.202433 13.291 -0.0758426 12.173 0.0185724C11.8102 0.03348 11.4673 0.108018 11.1443 0.212372C10.7319 0.35151 10.3542 0.555247 10.0113 0.793769C9.59393 1.05714 9.19639 1.38511 8.84855 1.7578C8.29697 2.32429 7.80501 3.05476 7.59134 3.96413C7.41245 4.64491 7.4522 5.35551 7.60128 6.12076C7.64103 6.34438 7.70066 6.56799 7.78017 6.79161C7.36275 6.75185 6.8708 6.99535 7.33294 8.63022C7.67581 9.82283 7.98888 10.1558 8.2274 10.1756Z"
                          fill="#333333"
                        />
                        <path
                          d="M20.6957 15.7362C18.1565 15.0902 16.0943 13.6392 16.0943 13.6392L14.4842 18.7326L14.1811 19.6917L14.1761 19.6768L13.9128 20.4917L13.063 18.0816C15.1501 15.1697 12.6407 15.1995 12.5015 15.2045C12.3624 15.1995 9.85293 15.1697 11.94 18.0816L11.0903 20.4917L10.8269 19.6768L10.8219 19.6917L10.5188 18.7326L8.90381 13.6392C8.90381 13.6392 6.84159 15.0902 4.30232 15.7362C2.40905 16.2182 2.3196 18.4046 2.39414 19.483C2.39414 19.483 2.50346 20.9489 2.61279 21.5949C2.61279 21.5949 6.30988 23.995 12.5015 24C18.6932 24 22.3902 21.5949 22.3902 21.5949C22.4996 20.9489 22.6089 19.483 22.6089 19.483C22.6785 18.4046 22.589 16.2182 20.6957 15.7362Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3813_33761">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                  </div>
                </div>
                <div>
                  <div className="text-[20px] font-[500] ">Employer</div>
                  <div className="text-[14px] font-[500] text-[#646464]">
                    I’am searching for skilled employees{" "}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <ArrowLeft index={2} />
              </div>
              <div className="h-[100%] w-[0%] bg-[#FFDA1D] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
            </div>
          </ALink>
          <ALink href="/Auth/Recruiter_register">
            <div className="p-[16px] flex flex-row justify-between rounded-[16px] relative sign_up_shadow">
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
                      <g clip-path="url(#clip0_3813_27618)">
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
                    I’am willing to collaborate with employers{" "}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <ArrowLeft />
              </div>
              <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
            </div>
          </ALink>
        </div>
      </div>
    </div>
    </div >
  );
}

export default Sign_up;
