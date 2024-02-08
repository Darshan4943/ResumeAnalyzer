import React from "react";

function Resume6({ data }) {
  console.log(data)
  return (
    <>
      <div className="w-[800px] flex gap-10">
        <div>
          <div className=" w-[268px] flex ">
            <div className="bg-[#FFC20E] w-[46px]"></div>
            <div className="flex w-[268px] ml-[-3rem]  flex-col gap-16">
              <div className="w-[243px] flex flex-col  ">
                <div className="pt-[50px] pl-[70px]">
                  <div class="w-[154px] h-[154px]  flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden">
                    {data.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(data.profilePhoto)}
                        alt=""
                      />
                    ) : (
                      <img src="/images/services/profile.png" alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[268px] justify-start items-start gap-6 pl-5">
                <div className="flex flex-col w-[268px]  gap-3">
                  <div className="flex gap-6 w-full">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M20.0105 16.0772C20.0502 16.3817 19.9576 16.6449 19.7341 16.8685L17.1042 19.4809C16.9851 19.6133 16.8308 19.7251 16.6397 19.8178C16.4485 19.9104 16.2604 19.9693 16.0766 19.9958C16.0634 19.9958 16.0237 19.9987 15.9575 20.0061C15.8914 20.0134 15.8061 20.0163 15.7003 20.0163C15.4504 20.0163 15.0446 19.9737 14.4845 19.8869C13.923 19.8016 13.2379 19.5898 12.4279 19.2529C11.6179 18.9161 10.6977 18.4116 9.66862 17.7393C8.63958 17.0671 7.54585 16.1419 6.3845 14.9696C5.4613 14.059 4.69687 13.1882 4.08973 12.3572C3.48407 11.5261 2.99601 10.7583 2.62555 10.0522C2.25656 9.34616 1.98019 8.70631 1.79496 8.13265C1.61121 7.55898 1.48478 7.06474 1.41863 6.64847C1.35247 6.23219 1.32601 5.90711 1.33925 5.66882C1.35248 5.432 1.35836 5.29962 1.35836 5.27314C1.38482 5.08781 1.44362 4.90099 1.53623 4.7083C1.62885 4.51708 1.74057 4.36264 1.87288 4.24349L4.50282 1.6105C4.68658 1.42664 4.89827 1.33398 5.13642 1.33398C5.30842 1.33398 5.45983 1.38251 5.59067 1.48106C5.72297 1.57962 5.8347 1.70172 5.92731 1.84734L8.0442 5.86445C8.16328 6.07479 8.19562 6.30574 8.1427 6.55727C8.08977 6.80733 7.97805 7.01914 7.80605 7.18977L6.83728 8.15913C6.81082 8.18561 6.7873 8.22826 6.76819 8.28857C6.7476 8.34741 6.73879 8.39741 6.73879 8.43713C6.79171 8.71367 6.90931 9.02992 7.09454 9.38589C7.25331 9.70214 7.49734 10.089 7.82663 10.545C8.15593 10.9995 8.62488 11.5246 9.23054 12.1174C9.82298 12.7249 10.3522 13.1956 10.8123 13.5325C11.2739 13.8678 11.6591 14.1164 11.9693 14.2753C12.2795 14.4327 12.5161 14.5298 12.6808 14.5621L12.9277 14.6121C12.9542 14.6121 12.9968 14.6018 13.0571 14.5827C13.1159 14.5636 13.1586 14.54 13.1865 14.5136L14.314 13.3662C14.5522 13.1559 14.8285 13.05 15.1446 13.05C15.3681 13.05 15.5474 13.0897 15.6782 13.1691H15.6988L19.5166 15.4255C19.7929 15.5947 19.9576 15.8124 20.0105 16.0772Z"
                        fill="#282829"
                      />
                    </svg>

                    <div className="flex flex-col w-full">
                      <p className="font-[500] text-[14px]">Phone</p>
                      <p className="font-[400] text-[14px]">
                        {data.mobileNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M20.0495 14.9109C20.0495 15.3399 19.9345 15.7378 19.7501 16.0878L13.8514 9.17279L19.6858 3.82354C19.9122 4.20072 20.0495 4.64402 20.0495 5.1236V14.9109ZM10.7077 10.4288L18.826 2.98623C18.4932 2.7944 18.1171 2.67773 17.7125 2.67773H3.70171C3.29592 2.67773 2.92106 2.7944 2.5895 2.98623L10.7077 10.4288ZM12.9717 9.97899L11.0925 11.7029C10.9824 11.8027 10.8451 11.8532 10.7077 11.8532C10.5704 11.8532 10.4331 11.8027 10.323 11.7016L8.44374 9.9777L2.47073 16.9808C2.82827 17.2155 3.24891 17.3567 3.70295 17.3567H17.715C18.1691 17.3567 18.5885 17.2155 18.946 16.9808L12.9717 9.97899ZM1.73091 3.82483C1.50451 4.20201 1.36719 4.6453 1.36719 5.12488V14.9109C1.36719 15.3399 1.48101 15.7378 1.66658 16.0878L7.56412 9.17279L1.73091 3.82483Z"
                        fill="#282829"
                      />
                    </svg>

                    <div className="flex flex-col w-full">
                      <p className="font-[500] text-[14px]">Email</p>
                      <p className="font-[400] text-[14px]">{data.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M11.0032 0.0332031C4.95576 0.0332031 0.00390625 4.98654 0.00390625 11.0325C0.00390625 17.0799 4.95576 22.0332 11.0032 22.0332C17.0506 22.0332 22.0039 17.0799 22.0039 11.0325C22.0039 4.98654 17.0506 0.0332031 11.0032 0.0332031ZM18.5934 6.63569H15.4014C15.0736 5.20797 14.5215 3.99294 13.8601 2.6774C15.8429 3.44371 17.6057 4.76509 18.5934 6.63569ZM11.0032 2.23596C11.8846 3.5515 12.6523 4.98652 13.0938 6.63423H8.91404C9.35401 5.09433 10.1218 3.5515 11.0032 2.23596ZM2.53301 13.2367C2.31302 12.5753 2.20522 11.8031 2.20522 11.0339C2.20522 10.2662 2.31302 9.49257 2.53301 8.83116H6.27131C6.1635 9.60475 6.1635 10.2647 6.1635 11.0339C6.1635 11.8031 6.27131 12.4631 6.27131 13.2367H2.53301ZM3.41295 15.4322H6.60493C6.93126 16.8599 7.48487 18.0749 8.14628 19.3905C6.1635 18.6242 4.40216 17.3028 3.41295 15.4322ZM6.60493 6.63569H3.41295C4.51434 4.76509 6.1635 3.44371 8.14628 2.6774C7.48487 3.99294 6.93126 5.20652 6.60493 6.63569ZM11.0032 19.8319C10.1218 18.5149 9.35402 17.0814 8.91259 15.4336H13.0923C12.6523 16.9735 11.8846 18.5149 11.0032 19.8319ZM13.5337 13.2367H8.47407C8.36189 12.4631 8.25409 11.8031 8.25409 11.0339C8.25409 10.2662 8.36189 9.60475 8.47407 8.83116H13.6474C13.7552 9.60475 13.8615 10.2647 13.8615 11.0339C13.8601 11.8017 13.6459 12.4631 13.5337 13.2367ZM13.8601 19.3919C14.5215 18.1827 15.0736 16.8614 15.4014 15.4336H18.5934C17.6057 17.3028 15.8429 18.6241 13.8601 19.3919ZM15.8429 13.2367C15.955 12.4631 15.955 11.8031 15.955 11.0339C15.955 10.2662 15.8429 9.60475 15.8429 8.83116H19.5797C19.7997 9.49257 19.9119 10.2647 19.9119 11.0339C19.9119 11.8031 19.7997 12.5753 19.5797 13.2367H15.8429Z"
                        fill="#282829"
                      />
                    </svg>

                    <div className="flex flex-col w-full">
                      <p className="font-[500] text-[14px]">Website</p>
                      <p className="font-[400] text-[14px]">{data.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 w-full">
                    <svg
                      width="22"
                      height="23"
                      viewBox="0 0 22 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <g clip-path="url(#clip0_1657_45195)">
                        <path
                          d="M11.0053 0.0488281C7.21322 0.0488281 4.12891 3.31325 4.12891 7.32531C4.12891 8.9415 5.10377 11.5764 7.10995 15.3815C8.52819 18.0718 9.92439 20.316 9.98222 20.4093L11.0039 22.0488L12.0256 20.4093C12.0848 20.316 13.4796 18.0718 14.8979 15.3815C16.904 11.5779 17.8789 8.94297 17.8789 7.32678C17.8817 3.31326 14.7973 0.0488281 11.0053 0.0488281ZM11.0053 11.0503C9.03628 11.0503 7.44179 9.36123 7.44179 7.27723C7.44179 5.19323 9.03765 3.50419 11.0053 3.50419C12.9729 3.50419 14.5701 5.19323 14.5701 7.27723C14.5701 9.35977 12.9743 11.0503 11.0053 11.0503Z"
                          fill="#282829"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1657_45195">
                          <rect
                            width="22"
                            height="22"
                            fill="white"
                            transform="translate(0 0.046875)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="flex flex-col w-full">
                      <p className="font-[500] text-[14px]">Area</p>
                      <p className="font-[400] text-[14px]">{data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-6 py-4">
            <div className="flex  w-[268px] flex-col pb-6">
              <div className="flex items-start justify-start flex-col gap-3 ">
                <p className="text-[18px] font-[700]">SKILLS</p>
                <div className="gap-2 flex-col   flex w-[268px] ">
                  {data.skills?.map((detail, index) => {
                    const calculateWidthPercentage = (rating) => {
                      let ratingPercentage = 0;
                      if (rating && rating.length > 0) {
                        const zerosCount = rating.filter(
                          (val) => val === 0
                        ).length;

                        if (zerosCount === 0) ratingPercentage = 100;
                        else if (zerosCount === 1) ratingPercentage = 80;
                        else if (zerosCount === 2) ratingPercentage = 60;
                        else if (zerosCount === 3) ratingPercentage = 40;
                        else if (zerosCount === 4) ratingPercentage = 20;
                      }
                      return ratingPercentage;
                    };

                    const ratingPercentage = calculateWidthPercentage(
                      detail.rating
                    );

                    return (
                      <div className=" pr-4 flex flex-col" key={index}>
                        <div className=" flex items-center gap-2 ">
                          <p className="text-[#414142] font-kanit text-[11.136px] w-[80px] font-light">
                            {detail.skill}
                          </p>
                          <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#DCDDDE]  ">
                            <div
                              className="h-full bg-[#282829]"
                              style={{ width: `${ratingPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="h-[1px]  w-[240px] bg-[#282829]"></div>

            <div className="flex w-[268px] flex-col py-4 ">
              <div className="flex items-start justify-start flex-col gap-3 ">
                <p className="text-[18px] font-[700]">LANGAUGES</p>
                <div className="gap-2 flex flex-col w-[240px] ">
                  {data?.languages?.length > 0 && (
                    <>
                      {data.languages?.map((detail, index) => {
                        const calculateWidthPercentage = (rating) => {
                          let ratingPercentage = 0;
                          if (rating && rating.length > 0) {
                            const zerosCount = rating.filter(
                              (val) => val === 0
                            ).length;

                            if (zerosCount === 0) ratingPercentage = 100;
                            else if (zerosCount === 1) ratingPercentage = 66;
                            else if (zerosCount === 2) ratingPercentage = 33;
                          }
                          return ratingPercentage;
                        };
                        const ratingPercentage = calculateWidthPercentage(
                          detail.rating
                        );
                        return (
                          <div className="w-full  flex flex-col" key={index}>
                            <div className=" flex items-center ">
                              <p className="text-[#414142] font-kanit text-[11.136px] w-[80px] font-light">
                                {detail.languages}
                              </p>
                              <div className="w-[59.21%] h-[3.78px] flex self-end mb-[1px] bg-[#C1C1C1]">
                                <div
                                  className="h-full bg-[#282829]"
                                  style={{ width: `${ratingPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="h-[1px] w-[240px] bg-[#282829]"></div>
            <div className="flex flex-col py-4 gap-2  ">
              <p className="text-[16px] font-[700] text-[#282829]">HOBBIES</p>
            
              {
                data.hobbies?.map((detail,index) => (
                  <>
                  <div className="flex flex-col pl-[20px] gap-0">
                  <ul className="" >
                  <li style={{listStyleType:'disc'}} >{detail.title}</li>
                  
                </ul>
                </div>
                </>
                ))
              }

            </div>
          </div>
        </div>
        <div className="flex gap-14 flex-col w-[443px]">
          <div className="w-[406px] py-16 ">
            {/* <div className="  "> */}
            <p className="text-[28px] font-[900]">
              {data.firstName} {data.lastName}
            </p>
            <span className="font-[500] text-[16px]">{data.designation}</span>
            {/* </div> */}
            {/* <div className="border-2 border-solid border-black p-5 relative">
    <p className=" text-[28px] font-bold">
        {data.firstName} {data.lastName}
    </p>
    <div className="absolute  inset-x-1/2 bottom-[-10px] transform -translate-x-1/2 bg-white px-2 w-full">
    <span className="font-[500] text-[16px] ">
        {data.designation}
    </span>
    </div>
</div> */}
{/* <div className="border flex  border-solid border-black p-4 relative w-[100%]">
    <p className="text-4xl font-bold">
        {data.firstName} {data.lastName}
    </p>
    <div className="absolute inset-x-0 bottom-[-12px] left-[134px] whitespace-nowrap flex justify-center w-[42.82%]">
        <span className="font-[500] text-[16px] bg-white px-2">
            {data.designation}
        </span>
    </div>
</div> */}


          </div>
          <div className="w-[441px] flex flex-col gap-4">
            <div className="w-[441px] flex flex-col break-all gap-2 pt-4  ">
              <p className="text-[18px] font-[700]">ABOUT ME</p>
              <p className="text-[14px] font-normal break-all">
                {data.summery}
              </p>
            </div>
            <div className="h-[1px] w-[441px] bg-[#282829]"></div>
            <div className="gap-4 flex flex-col break-all">
              <p className="text-[18px] font-[700]">WORK EXPERIENCE</p>
              {data.experience?.map((detail, index) => (
                <>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-[16px] font-[700]">
                        {detail.designation}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-[14px] font-normal text-[#939598]">
                          {detail.organization}
                        </p>
                        <p className="text-[14px] font-normal">
                          {" "}
                          {detail.duration?.start?.year}-{" "}
                          {detail.currentlyWorking
                            ? "Present"
                            : detail.duration?.end?.year}
                        </p>
                      </div>
                      <p className="text-[14px] font-normal">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="h-[1px] w-[441px] bg-[#282829]"></div>
            <div className="gap-4 flex flex-col break-all">
              <p className="text-[18px] font-[700]"> EDUCATION</p>
              {data?.education?.map((detail, index) => (
                <>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-[6px]">
                      <p className="text-[16px] font-[700]">
                        {detail.qualification}
                        <p className="text-[14px] font-normal">
                          {detail.specialization}
                        </p>
                      </p>
                      <div className="flex justify-between">
                        <p className="text-[14px] font-normal text-[#939598]">
                          {detail.instituteName}
                        </p>
                        <p className="text-[14px] font-normal">
                          {detail.duration?.end?.year && (
                            <>
                              {detail.duration?.start?.year}-
                              {detail.duration?.end?.year}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume6;
