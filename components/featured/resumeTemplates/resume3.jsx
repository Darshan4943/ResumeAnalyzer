import React from "react";

function Resume3({ data }) {
  return (
    <div className="flex  break-all  w-[800px] ">
      <div className="w-[247px] bg-[#414042]  min-h-[1131px]  ">
        <div className="pt-[21px] pr-[22px] pl-[28px]">

          <div class="w-134 h-134 flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full overflow-hidden">
            {data.profilePhoto ? (
              <img src={URL.createObjectURL(data.profilePhoto)} alt="" />
            ) : (
              <img src="/images/services/profile.png" alt="" />
            )}
          </div>
        </div>

        <div className=" pt-7 flex flex-col">
          <div className="flex ml-[-1px] h-[27px] items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width="175" viewBox="0 0 125 27" fill="none">
              <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="white" />
              <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#414042" font-size="15" f fontWeight={500}>CONTACT </text>
            </svg>
          </div>

          <div className="flex pl-[15.92px]  pr-4 pt-[22.95px] ">
            <div className="flex gap-[5.53px] flex-col    ">
              {data.mobileNumber &&
                <div className="gap-[7.83px] flex  ">

                  <div className="w-[16.76px] mt-[1px] h-[16.75px] rounded-full flex items-center justify-center bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M9.71377 7.93497C9.73277 8.08097 9.68877 8.20896 9.58277 8.31596L8.33777 9.57597C8.28177 9.63897 8.20777 9.69298 8.11877 9.73798C8.02777 9.78198 7.93877 9.81098 7.85077 9.82397C7.84377 9.82397 7.82577 9.82597 7.79477 9.82797C7.76377 9.83097 7.72277 9.83296 7.67377 9.83296C7.55577 9.83296 7.36377 9.81297 7.09877 9.77097C6.83277 9.72997 6.50877 9.62797 6.12477 9.46497C5.74177 9.30297 5.30677 9.05897 4.81977 8.73497C4.33277 8.41097 3.81477 7.96597 3.26677 7.39897C2.83077 6.96097 2.46777 6.54097 2.18077 6.13997C1.89477 5.73897 1.66277 5.36796 1.48877 5.02696C1.31477 4.68696 1.18277 4.37797 1.09477 4.10197C1.00777 3.82497 0.948773 3.58697 0.917773 3.38597C0.885773 3.18597 0.872773 3.02796 0.879773 2.91296C0.886773 2.79896 0.888773 2.73497 0.888773 2.72197C0.901773 2.63297 0.929774 2.54297 0.973774 2.45097C1.01777 2.35897 1.07077 2.28397 1.13377 2.22697L2.37777 0.957962C2.46477 0.868962 2.56577 0.823975 2.67877 0.823975C2.75977 0.823975 2.83077 0.847966 2.89277 0.895966C2.95477 0.942966 3.00777 1.00297 3.05177 1.07297L4.05377 3.00996C4.10877 3.11196 4.12477 3.22296 4.09977 3.34396C4.07477 3.46496 4.02177 3.56597 3.93977 3.64897L3.48277 4.11697C3.46977 4.12997 3.45877 4.14997 3.44977 4.17897C3.43977 4.20797 3.43477 4.23198 3.43477 4.25098C3.45977 4.38498 3.51677 4.53697 3.60377 4.70897C3.67777 4.86097 3.79377 5.04697 3.94977 5.26697C4.10677 5.48697 4.32777 5.73997 4.61377 6.02597C4.89477 6.31897 5.14477 6.54597 5.36277 6.70897C5.58077 6.87097 5.76377 6.98996 5.91077 7.06596C6.05677 7.14296 6.16877 7.18797 6.24677 7.20497L6.36377 7.22897C6.37577 7.22897 6.39677 7.22497 6.42477 7.21497C6.45277 7.20497 6.47277 7.19497 6.48477 7.18097L7.01777 6.62798C7.13077 6.52498 7.26177 6.47498 7.41177 6.47498C7.51677 6.47498 7.60177 6.49497 7.66377 6.53297H7.67277L9.47977 7.62097C9.61077 7.70297 9.68777 7.80797 9.71377 7.93497Z"
                        fill="#414042"
                      />
                    </svg>
                  </div>
                  <div className="text-white  text-[8.5px]  ">
                    <p className="object-contain pb-[12px]">{data.mobileNumber}</p>
                  </div>

                </div>
              }
              {data.email &&
                <div className="gap-[7.83px] flex  ">
                  <div className="w-[16.76px] mt-[1px] h-[16.75px] rounded-full flex items-center justify-center bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="10"
                      viewBox="0 0 9 7"
                      fill="none"
                    >
                      <path
                        d="M8.31786 5.62399C8.31786 5.79999 8.26785 5.96399 8.18885 6.10699L5.65085 3.267L8.16186 1.07001C8.25986 1.22501 8.31886 1.407 8.31886 1.604L8.31786 5.62399ZM4.29786 3.78299L7.79185 0.726013C7.64885 0.647013 7.48685 0.598999 7.31285 0.598999H1.28286C1.10886 0.598999 0.946856 0.647013 0.803856 0.726013L4.29786 3.78299ZM5.27185 3.59799L4.46285 4.306C4.41585 4.347 4.35686 4.36801 4.29786 4.36801C4.23886 4.36801 4.17985 4.347 4.13285 4.306L3.32385 3.59799L0.752855 6.474C0.906855 6.571 1.08786 6.629 1.28286 6.629H7.31285C7.50785 6.629 7.68886 6.571 7.84286 6.474L5.27185 3.59799ZM0.433855 1.07101C0.335855 1.22601 0.276855 1.40801 0.276855 1.60501V5.625C0.276855 5.801 0.325855 5.965 0.405855 6.108L2.94386 3.267L0.433855 1.07101Z"
                        fill="#414042"
                      />
                    </svg>
                  </div>
                  <div className="text-white  text-[8.5px]   ">
                    <p className="object-contain pb-[8px]">{data.email}</p>
                  </div>
                </div>
              }
              <div className="flex flex-col">
                {data.sociaLinks.map((detail, index) => (
                  <div className="gap-[7.83px] flex ">
                    <div className="w-[14.76px] h-[14.75px] rounded-full flex items-center justify-center bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M9.9918 4.56683C9.8388 2.21583 7.9608 0.337854 5.6098 0.181854V0.172852H4.9858V0.181854C2.6348 0.337854 0.756798 2.21583 0.600798 4.56683H0.591797V5.19086H0.599798C0.755798 7.54186 2.6338 9.41985 4.9848 9.57285V9.58585H5.6088V9.57285C7.9598 9.41985 9.8378 7.54186 9.9908 5.19086H10.0038V4.56683H9.9918ZM3.5388 1.19885C3.2348 1.59985 2.9808 2.10585 2.7998 2.68185H1.8588C2.2668 2.04485 2.8488 1.52685 3.5388 1.19885ZM1.5318 3.30984H2.6348C2.5488 3.70484 2.4978 4.12783 2.4788 4.56683H1.2318C1.2648 4.12183 1.3688 3.70184 1.5318 3.30984ZM1.2308 5.19086H2.4778C2.4968 5.62986 2.5488 6.05185 2.6338 6.44785H1.5308C1.3688 6.05585 1.2648 5.63586 1.2308 5.19086ZM1.8588 7.07584H2.7958C2.9798 7.65184 3.2308 8.15784 3.5378 8.55884C2.8488 8.23084 2.2668 7.71284 1.8588 7.07584ZM4.9858 8.91684C4.3388 8.74584 3.7838 8.05284 3.4478 7.07584H4.9858V8.91684ZM4.9858 6.44785H3.2698C3.1808 6.05585 3.1258 5.63586 3.1078 5.19086H4.9868L4.9858 6.44785ZM4.9858 4.56683H3.1068C3.1248 4.12183 3.1808 3.70184 3.2688 3.30984H4.9848L4.9858 4.56683ZM4.9858 2.68185H3.4478C3.7848 1.70485 4.3388 1.01185 4.9858 0.840851V2.68185ZM8.7358 2.68185H7.7988C7.6148 2.10585 7.3638 1.59985 7.0568 1.19885C7.7458 1.52685 8.3278 2.04485 8.7358 2.68185ZM5.6098 0.840851C6.2568 1.01185 6.8118 1.70485 7.1478 2.68185H5.6098V0.840851ZM5.6098 3.30984H7.3258C7.4148 3.70184 7.4668 4.12183 7.4878 4.56683H5.6098V3.30984ZM5.6098 5.19086H7.4888C7.4708 5.63586 7.4148 6.05585 7.3268 6.44785H5.6098V5.19086ZM5.6098 8.91684V7.07584H7.1478C6.8118 8.05384 6.2568 8.74584 5.6098 8.91684ZM7.0568 8.55884C7.3608 8.15484 7.6148 7.65184 7.7988 7.07584H8.7358C8.3278 7.71284 7.7458 8.23084 7.0568 8.55884ZM9.0638 6.44785H7.9608C8.0468 6.05285 8.0978 5.62986 8.1168 5.19086H9.3638C9.3308 5.63586 9.2258 6.05585 9.0638 6.44785ZM8.1168 4.56683C8.0978 4.12783 8.0458 3.70584 7.9608 3.30984H9.0638C9.2258 3.70184 9.3308 4.12183 9.3638 4.56683H8.1168Z"
                          fill="#414042"
                        />
                      </svg>
                    </div>

                    <div className="text-white  text-[8.5px]  ">
                      <p className="object-contain">{detail.link}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="">

          {data?.skills?.length > 0 && (
              <div className="pt-[30px]">
                <div className="flex ml-[-1px] h-[27px]  items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="175" viewBox="0 0 125 27" fill="none">
                    <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="white" />
                    <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#414042" font-size="15" f fontWeight={500}>SKILLS </text>
                  </svg>
                </div>
                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                  {data.skills.map((detail, index) => (
                    <p className="text-white  text-[8.96px] font-normal">
                      {detail.skill}
                    </p>
                  ))}
                </div>
              </div>
            )}

{data?.languages?.length > 0 && (
              <div className="pt-[30px]">
                <div className="flex ml-[-1px] h-[27px]  items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="175" viewBox="0 0 125 27" fill="none">
                    <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="white" />
                    <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#414042" font-size="15" f fontWeight={500}>LANGUAGES </text>
                  </svg>
                </div>
                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                  {data.languages.map((detail, index) => (
                    <p className="text-white  text-[8.96px] font-normal">
                      {detail.languages}
                    </p>
                  ))}
                </div>
              </div>
            )}
           {data?.hobbies?.length > 0 && (
              <div className="pt-[30px]">
                <div className="flex ml-[-1px] h-[27px]  items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="175" viewBox="0 0 125 27" fill="none">
                    <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="white" />
                    <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#414042" font-size="15" f fontWeight={500}>HOBBIES </text>
                  </svg>

                </div>
                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                  {data.hobbies.map((detail, index) => (
                    <p className="text-white  text-[8.96px] font-normal">
                      {detail.title}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[553px] pr-[20px] pb-[20px] ">
        <div className=" pl-[20px] pt-[30px] gap-4 w-full h-auto flex flex-col  ">
          <span className="text-[#414042]  text-[43.514px] font-normal  leading-[43px] ">
            {data.firstName}
            <br />
            {data.lastName}
          </span>

          <p className="text-[#414042]  text-[14.015px] font-normal mb-0 ">
            {data.designation}
          </p>
        </div>
        <div className="pl-[20px] pt-[40.78px]  h-auto flex flex-col gap-[5.64px] ">
          <p className="text-[#414042] text-base font-normal">About Me</p>

          <p className="text-[#646464] f text-xs font-normal break-all">
            {data.summery}
          </p>
        </div>

        <div className="flex flex-col gap-5 pt-[24px] -ml-1 ">

          <svg xmlns="http://www.w3.org/2000/svg" width="260" viewBox="0 0 160 27" fill="none" >
            <path d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z" fill="#414042" />
            <text x="6%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>EDUCATION </text>

          </svg>


          <div className="flex flex-col gap-5 pl-[20px]">
            {data.education.map((detail, index) => (
              <div className="flex flex-col gap-3">
                <div className="">
                  <p className="  text-[9.996px] font-bold  ">
                    {detail.qualification}
                  </p>
                  <p className=" text-[9.996px] font-medium  ">
                    {detail.instituteName}
                  </p>
                </div>
                <div className=" flex flex-col ">
                  <div className="w-[16px] h-[1px] bg-[#414042]"></div>


                  <p className="  text-[8.962px] font-normal">
                    {detail.duration?.end?.year &&
                      <>
                        {detail.duration?.start?.year}-
                        {detail.duration?.end?.year}
                      </>
                    }
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>

        <div className=" flex flex-col gap-8 pt-[24px] -ml-1 ">

          <svg xmlns="http://www.w3.org/2000/svg" width="260" viewBox="0 0 160 27" fill="none" >
            <path d="M146.641 27H0V0H146.641C154.018 0 160 6.04367 160 13.5C160 20.9564 154.018 27 146.641 27Z" fill="#414042" />
            <text x="6%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>EXPERIENCE </text>

          </svg>


          {data.experience.map((detail, index) => (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col ga-2">
                <p className="text-[#414142] pl-[18px]  text-[11.989px] font-bold">
                  {detail.organization}
                </p>
                <p className="text-[#414142]  pl-[18px]  text-[9.996px] font-semibold">
                  {detail.designation}
                </p>
                <p className="text-[#414142]  pl-[18px]  text-[8.969px] font-normal">
                 
                      {detail.duration?.start?.year} -
                      {detail.duration?.end?.year == undefined ? "Present" : detail.duration?.end?.year}
                  
                
                </p>
              </div>
              <p className="text-[#646464] pl-[18px]  text-xs font-normal">
                {detail.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resume3;
