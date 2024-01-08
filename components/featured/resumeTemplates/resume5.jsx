import React from "react";

function Resume5({ data, skills }) {




  return (
    <div className="flex   break-all w-[800px]  ">
      <div className="flex flex-row  ">
        <div className=" h-full w-[317px] pb-4 ">
          <div className="pt-[33.72px] pl-[27.74px] pr-[21.15px]">
            <div className="w=[244px] ">
              {data.profilePhoto ? (
                <img src={URL.createObjectURL(data.profilePhoto)} alt="" className=" h-[306px] object-contain w-[244px]" />
              ) : (
                <img src="/images/services/black.png" alt="" className=" h-[306px] w-[244px] " />
              )}

            </div>

          </div>
          <div className="pt-[39.93px] object-contain">


            <svg xmlns="http://www.w3.org/2000/svg" width="318" viewBox="0 0 225 31" fill="none"  >
              <path d="M235.577 0.896973H0V30.093H235.577V0.896973Z" fill="#316059" />
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" f fontWeight={600}>CONTACT </text>
            </svg>

          </div>
          {data.mobileNumber &&
            <div className="pt-[25.45px] pl-[28.13px] flex flex-col gap-2">
              <div className="flex gap-2 items-start  pr-4">
                <div className="h-[24px] flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M12.8611 10.0189L10.8555 8.01326C10.6415 7.79924 10.3663 7.68831 10.0806 7.70229C9.79237 7.71627 9.50934 7.85429 9.26212 8.1015C8.52048 8.84314 8.02431 9.21438 7.60501 9.34192C7.19532 9.46684 6.82319 9.36901 6.32003 9.00386C6.19424 8.91214 6.01865 8.94011 5.92693 9.0659C5.83521 9.19169 5.86404 9.36726 5.98983 9.45898C6.63625 9.92807 7.18483 10.0582 7.76924 9.88002C8.10555 9.77782 8.45409 9.5743 8.88038 9.22052L11.5753 11.9154C9.96707 12.8885 6.86075 13.8634 3.29057 10.3089C-0.264752 6.73788 0.70925 3.63157 1.68325 2.02337L4.37814 4.71825C4.02523 5.14454 3.82169 5.49221 3.71861 5.8294C3.54041 6.4138 3.67057 6.9624 4.13966 7.60883C4.23138 7.73462 4.40696 7.76256 4.53275 7.67083C4.65854 7.57911 4.6865 7.40355 4.59478 7.27776C4.22964 6.77459 4.1318 6.40246 4.25671 5.99276C4.38425 5.57346 4.75551 5.07816 5.49802 4.33565C6.00118 3.83249 6.037 3.19217 5.58712 2.7423L3.58146 0.73665C3.5308 0.684237 3.22593 0.392464 2.73675 0.437888C2.23271 0.48506 1.74527 0.873785 1.28754 1.59359C0.769525 2.4086 0.164159 3.72067 0.222687 5.34459C0.289076 7.18952 1.18708 8.99339 2.89311 10.7073C4.60613 12.4124 6.41 13.3104 8.25493 13.3768C8.3283 13.3795 8.39994 13.3812 8.47244 13.3812C9.9959 13.3812 11.2276 12.8064 12.0059 12.312C12.7266 11.8543 13.1153 11.3668 13.1616 10.8628C13.2053 10.3753 12.9135 10.0696 12.8611 10.0189ZM2.77868 1.00131C3.00754 0.975982 3.15605 1.1114 3.17439 1.12888C3.17701 1.1315 3.17614 1.13061 3.17963 1.1341L5.18791 3.14239C5.41329 3.36776 5.38097 3.65777 5.09881 3.93993C4.97302 4.06572 4.85771 4.18453 4.75114 4.29809L2.00559 1.55253C2.33579 1.13935 2.60135 1.02053 2.77868 1.00131ZM12.5991 10.8121C12.5825 10.9912 12.4663 11.2602 12.047 11.5939L9.30143 8.84836C9.41499 8.74179 9.53467 8.62563 9.65959 8.50071C9.80634 8.35396 9.96183 8.2727 10.1077 8.26484C10.2667 8.25698 10.3855 8.33996 10.4563 8.41159L12.4645 10.4199C12.4672 10.4225 12.4689 10.4242 12.4715 10.4269C12.4733 10.4277 12.6209 10.5771 12.5991 10.8121Z"
                      fill="#316059"
                    />
                    <path
                      d="M5.20706 8.11182C5.05157 8.11182 4.92578 8.2376 4.92578 8.39309C4.92578 8.54858 5.05157 8.67439 5.20706 8.67439C5.36256 8.67439 5.48834 8.54858 5.48834 8.39309C5.48834 8.2376 5.36256 8.11182 5.20706 8.11182Z"
                      fill="#316059"
                    />
                  </svg>
                </div>
                <p className=" text-[9px] pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                  {data.mobileNumber}
                </p>
              </div>
              <div className="flex gap-2 items-start  pr-4">
                <div className="h-[24px] flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    viewBox="0 0 15 10"
                    fill="none"
                  >
                    <path
                      d="M14.0457 0.732755H1.27976C1.17318 0.713537 1.06224 0.753722 0.99498 0.838456C0.939947 0.907466 0.918109 0.99832 0.93558 1.08393V9.32056C0.93558 9.48479 1.06923 9.61757 1.23258 9.61757H7.30022C7.46445 9.61757 7.59723 9.48392 7.59723 9.32056C7.59723 9.15634 7.46358 9.02356 7.30022 9.02356H2.01965L5.96283 5.55908C6.44852 5.90763 7.03903 6.09806 7.63566 6.09806C7.63916 6.09806 7.64265 6.09806 7.64615 6.09806C8.2419 6.09806 8.83155 5.90764 9.31724 5.56084L13.2595 9.02356H10.0895C9.92523 9.02356 9.79245 9.15721 9.79245 9.32056C9.79245 9.48479 9.9261 9.61757 10.0895 9.61757H14.0475C14.1951 9.61669 14.3209 9.50577 14.341 9.36077L14.3419 9.35463C14.3427 9.34765 14.3427 9.34155 14.3436 9.33456C14.3436 9.33194 14.3436 9.32932 14.3436 9.3267V9.32232V1.02888C14.3436 0.865525 14.21 0.732755 14.0457 0.732755ZM5.49985 5.17387L1.52959 8.66279V1.68753L5.49985 5.17387ZM13.2569 1.32676L9.14515 4.93887C8.73633 5.29615 8.21133 5.49707 7.66886 5.50318C7.66013 5.50318 7.65139 5.50318 7.64178 5.50318C7.11328 5.50318 6.59964 5.31974 6.1917 4.9843C6.18471 4.97556 6.17859 4.9677 6.17161 4.96071C6.15064 4.93887 6.12618 4.92053 6.09997 4.90568L2.0214 1.32591L13.2569 1.32676ZM13.7487 1.68667V8.66279L9.77759 5.1756L13.7487 1.68667Z"
                      fill="#316059"
                    />
                    <path
                      d="M8.7671 9.02393H8.20716C8.04294 9.02393 7.91016 9.15757 7.91016 9.32093C7.91016 9.48515 8.04381 9.61793 8.20716 9.61793H8.7671C8.93133 9.61793 9.06411 9.48428 9.06411 9.32093C9.06498 9.15757 8.93133 9.02393 8.7671 9.02393Z"
                      fill="#316059"
                    />
                  </svg>
                </div>
                <p className=" text-[9px] pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                  {data.email}
                </p>
              </div>
              <div className="flex gap-2 items-start  pr-4">
                <div className="h-[24px] flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                  >
                    <path
                      d="M7.63676 0.520508C3.93817 0.520508 0.929688 3.52898 0.929688 7.22756C0.929688 8.765 1.46168 10.264 2.42869 11.4547C2.43568 11.466 2.44354 11.4765 2.45228 11.487L7.27773 17.669C7.36421 17.78 7.49699 17.8446 7.63764 17.8446C7.77828 17.8446 7.91105 17.78 7.99666 17.669L12.8448 11.4547C12.8466 11.452 12.8483 11.4503 12.8501 11.4485C13.8136 10.2596 14.3447 8.76151 14.3447 7.22844C14.3438 3.52898 11.3345 0.520508 7.63676 0.520508ZM12.1311 10.886C12.125 10.893 12.1198 10.9 12.1146 10.9078L7.63676 16.6479L3.20352 10.969C3.19217 10.9506 3.17994 10.934 3.16683 10.9166C2.31251 9.88228 1.84167 8.57195 1.84167 7.22844C1.84167 4.03302 4.44133 1.43335 7.63676 1.43335C10.8322 1.43335 13.4319 4.03302 13.4319 7.22844C13.4319 8.5571 12.9697 9.85695 12.1311 10.886Z"
                      fill="#316059"
                    />
                    <path
                      d="M11.0066 5.85415C10.7655 5.92578 10.6275 6.17909 10.6982 6.42106C11.0293 7.54444 10.7218 8.75692 9.89368 9.58417C9.29094 10.1869 8.4899 10.5189 7.63732 10.5189C6.78474 10.5189 5.9837 10.1869 5.38095 9.58417C4.77821 8.98142 4.44626 8.17953 4.44626 7.32782C4.44626 6.47525 4.77821 5.6742 5.38095 5.07145C6.20907 4.24333 7.42243 3.93497 8.54668 4.26866C8.78865 4.34029 9.04198 4.20228 9.11361 3.96118C9.18524 3.72008 9.04722 3.46587 8.80612 3.39424C7.36128 2.9662 5.802 3.36192 4.73715 4.42677C3.96232 5.20161 3.53516 6.2324 3.53516 7.32782C3.53516 8.42412 3.96232 9.45402 4.73715 10.2289C5.51199 11.0037 6.54277 11.4309 7.63819 11.4309C8.73449 11.4309 9.7644 11.0037 10.5392 10.2289C11.6032 9.16487 11.9989 7.60735 11.5726 6.16338C11.5019 5.92141 11.2477 5.78339 11.0066 5.85415Z"
                      fill="#316059"
                    />
                    <path
                      d="M9.90324 5.07868C9.99234 5.16778 10.1094 5.21234 10.2256 5.21234C10.3426 5.21234 10.4588 5.16778 10.5479 5.07868C10.7261 4.90048 10.7261 4.6122 10.5479 4.434L10.54 4.42613C10.3618 4.24793 10.0736 4.24793 9.89537 4.42613C9.71717 4.60434 9.71717 4.89261 9.89537 5.07081L9.90324 5.07868Z"
                      fill="#316059"
                    />
                  </svg>
                </div>
                <p className=" text-[9px] pt-[2px] flex font-[400] text-[#110707] leading-normal ">
                  {data.location}
                </p>
              </div>

              {/* <div className="flex justify-start items-center gap-[8.46px]">
            <div className="w-[14.8px] h-[14.8px]">
              <img src="/images/services/mg.png" alt="" />
            </div>
            <p className="text-[#414142] font-kanit text-[11.136px] font-light leading-normal">
              {data.email}
            </p>
          </div> */}
              {/* {data?.map((detail, index) => (
                            <div className="flex justify-start items-center gap-[8.46px]">
                                <div className="w-[14.8px] h-[14.8px]">
                                    <img src="./images/services/wg.png" alt="" />
                                </div>
                                <p className="text-[#414142] font-kanit text-[11.136px] font-light">
                                    {detail.link}
                                </p>
                            </div>
                        ))} */}
              {/* <div className="flex justify-start items-center gap-[8.46px]">
            <div className="w-[14.8px] h-[14.8px]">
              <img src="./images/services/lg.png" alt="" />
            </div>
            <p className="text-[#414142] font-kanit text-[11.136px] font-light">
              {data.location}
            </p>
          </div> */}
            </div>
          }
          {data?.skills?.length > 0 && (
            <>
              <div className="pt-[39.93px] object-contain">

                <svg xmlns="http://www.w3.org/2000/svg" width="318" viewBox="0 0 225 31" fill="none"  >
                  <path d="M235.577 0.896973H0V30.093H235.577V0.896973Z" fill="#316059" />
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" f fontWeight={600}>SKILLS </text>
                </svg>

              </div>
              <div className="flex flex-col gap-3 pt-6">
                {data.skills?.map((detail, index) => {
                  const calculateWidthPercentage = (rating) => {
                    let ratingPercentage = 0;
                    if (rating && rating.length > 0) {
                      const zerosCount = rating.filter(val => val === 0).length;

                      if (zerosCount === 0) ratingPercentage = 100;
                      else if (zerosCount === 1) ratingPercentage = 80;
                      else if (zerosCount === 2) ratingPercentage = 60;
                      else if (zerosCount === 3) ratingPercentage = 40;
                      else if (zerosCount === 4) ratingPercentage = 20;
                    }
                    return ratingPercentage;
                  };

                  const ratingPercentage = calculateWidthPercentage(detail.rating);

                  return (
                    <div className="pl-[28.13px] pr-3 flex flex-col" key={index}>
                      <div className="justify-between flex items-center gap-4">
                        <p className="text-[#414142] font-kanit text-[11.136px] w-[80px] font-light">
                          {detail.skill}
                        </p>
                        <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                          <div
                            className="h-full bg-[#316059]"
                            style={{ width: `${ratingPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}




              </div>
            </>
          )}
         {data?.languages?.length > 0 && (
          <>
          <div className="pt-[39.93px] object-contain">

            <svg xmlns="http://www.w3.org/2000/svg" width="318" viewBox="0 0 225 31" fill="none"  >
              <path d="M235.577 0.896973H0V30.093H235.577V0.896973Z" fill="#316059" />
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" f fontWeight={600}>LANGUAGES </text>
            </svg>

          </div>
          <div className="flex flex-col gap-1 pt-6">

            {data.languages?.map((detail, index) => {
              const calculateWidthPercentage = (rating) => {
                let ratingPercentage = 0;
                if (rating && rating.length > 0) {
                  const zerosCount = rating.filter(val => val === 0).length;

                  if (zerosCount === 0) ratingPercentage = 100;
                  else if (zerosCount === 1) ratingPercentage = 66;
                  else if (zerosCount === 2) ratingPercentage = 33;

                }
                return ratingPercentage;
              };

              const ratingPercentage = calculateWidthPercentage(detail.rating);

              return (
                <div className="pl-[28.13px] pr-3 flex flex-col" key={index}>
                  <div className="justify-between flex items-center gap-4">
                    <p className="text-[#414142] font-kanit text-[11.136px] w-[80px] font-light">
                      {detail.languages}
                    </p>
                    <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                      <div
                        className="h-full bg-[#316059]"
                        style={{ width: `${ratingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
          </>
          )}
        </div>
        <div className="flex flex-col w-[483px]  ">
          <div className="flex justify-end items-center">
            <div className="w-[27.74px] h-[27.74px] bg-[#316059] "></div>
          </div>
          <div className="flex flex-col gap-6 h-full min-h-[1103px]">
            <div className="flex flex-col items-start pt-[25px] ml-[100px] ">
              <p className="text-[#2B2A2A] font-kanit text-[26.333px] font-semibold leading-normal">
                {data.firstName} {data.lastName}
              </p>
              <p className="font-kanit text-[18.96px] text-[#316059] text-lg font-normal">
                {data.designation}
              </p>
            </div>
            <div className="rounded-tl-[40px] px-[39.15px] bg-[#316059] h-full ">
              <div className="pt-[27.5px] w-[283px] ">
                <p className="text-[rgb(249,249,249)] font-Kanit text-base font-medium">
                  About Me
                </p>
              </div>
              <div className=" pt-[18px] ">
                <div className="flex gap-2">
                  <div className="w-[4.4px] h-[4.4px] flex items-center justify-center pt-[8px]">
                    <img src="./images/services/rect.png" alt="" />
                  </div>
                  <p className="text-[#F9F9F9] font-Kanit text-[11px] font-[300px] ">
                    {data.summery}
                  </p>
                </div>
              </div>

              <div className="pt-[23px] pl-[50px]">
                <div className="w-[150px] h-[0.465px] bg-[#F9F9F9]"></div>
              </div>
              <div className=" pt-[20.65px] ">
                <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                  EDUCATION
                </p>
              </div>
              <div className=" pt-[16px]">
                <div class="flex gap-2 flex-col items-start">
                  {data?.education?.map((detail, index) => (
                    <div class="section__list-item flex flex-col">
                      <div class="left">
                        <div className="text-[#F9F9F9] text-[9.9px]">
                          <p className="text-[#F9F9F9] font-Kanit text-[11px] font-normal">
                            {detail.qualification}
                          </p>
                        </div>
                        <div class="name text-[#F9F9F9]">
                          <p className="text-[#F9F9F9] font-Kanit text-[7.8px] font-normal">
                            {detail.instituteName}
                          </p>
                        </div>
                        <div class="duration text-[#F9F9F9] font-Kanit text-[6.11px] font-light">
                        {detail.duration?.end?.year &&
                        <>
                          {detail.duration?.start?.year}-
                          {detail.duration?.end?.year}
                        </>
                      }
                        </div>
                        <div className="text-[#F9F9F9]">
                          <p className=" font-Kanit text-[7.8px] font-normal">
                            {detail.specialization}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-[23px] pl-[50px]">
                <div className="w-[150px] h-[0.465px] bg-[#F9F9F9]"></div>
              </div>
              <div className="pt-[20.65px]">
                <p className="text-[rgb(249,249,249)] font-Kanit text-base font-normal">
                  EXPERIENCE
                </p>
              </div>

              <div className=" pt-[16px]">
                <div class="flex gap-2 flex-col items-start">
                  {data?.experience?.map((detail, index) => (
                    <div class="section__list-item flex flex-col">

                      <div class="left">
                        <div className="text-[#F9F9F9] text-[9.9px]">
                          <p className="text-[#F9F9F9] font-Kanit  font-normal">
                            {detail.organization}
                          </p>
                        </div>
                        <div class="duration text-[#F9F9F9] font-Kanit text-[6.11px] font-light">
                        {detail.duration?.start?.year}-{" "}
                                            {detail.currentlyWorking
                                                ? "Present"
                                                : detail.duration?.end?.year}
                        </div>
                        <div className="text-[#F9F9F9]">
                          <p className=" font-Kanit text-[9.8px] font-normal">
                            {detail.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume5;