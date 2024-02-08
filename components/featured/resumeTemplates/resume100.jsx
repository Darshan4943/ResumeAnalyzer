import React from "react";

function Resume100({ data }) {
    return (
        <div className="flex  break-all  w-[794px] ">
            <div className="w-[298px] bg-[#E5F1FF]  min-h-[1122px]  ">
                <div className="pt-[21px] pr-[22px] pl-[28px]">

                    <div class="w-134 h-134 flex-shrink-0 bg-lightgray bg-center bg-cover rounded-full  border-[5px] border-[#05334B] overflow-hidden">
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
                            <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="#05334B" />
                            <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>CONTACT </text>
                        </svg>
                    </div>

                    <div className="flex pl-[15.92px]  pr-4 pt-[22.95px] ">
                        <div className="flex gap-[5.53px] flex-col    ">
                            {data.mobileNumber &&
                                <div className="gap-[7.83px] flex  ">

                                    <div className="w-[16.76px] mt-[1px] h-[16.75px] rounded-full flex items-center justify-center bg-white">
                                        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.0873 22.5556H4.00125C2.29795 22.5556 0.912109 21.1697 0.912109 19.4662V3.25285C0.912109 1.54794 2.29795 0.162109 4.00125 0.162109H13.0873C14.7906 0.162109 16.1751 1.54794 16.1751 3.25285V19.4662C16.1751 21.1697 14.7906 22.5556 13.0873 22.5556ZM4.00125 1.46514C3.01688 1.46514 2.21659 2.26755 2.21659 3.25285V19.4662C2.21659 20.4501 3.01822 21.2525 4.00125 21.2525H13.0873C14.0716 21.2525 14.8719 20.4501 14.8719 19.4662V3.25285C14.8719 2.26755 14.0716 1.46514 13.0873 1.46514H4.00125Z" fill="#05334B" />
                                        </svg>


                                    </div>
                                    <div className="text-[#05334B]  text-[8.5px]  ">
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
                                    <div className="text-[#05334B]  text-[8.5px]   ">
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

                                        <div className="text-[#05334B]   text-[8.5px]  ">
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
                                        <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="#05334B" />
                                        <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>SKILLS </text>
                                    </svg>
                                </div>
                                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                                    {data.skills.map((detail, index) => (
                                        <p className="text-[#05334B]   text-[8.96px] font-normal">
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
                                        <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="#05334B" />
                                        <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>LANGUAGES </text>
                                    </svg>
                                </div>
                                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                                    {data.languages.map((detail, index) => (
                                        <p className="text-[#05334B]   text-[8.96px] font-normal">
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
                                        <path d="M112.176 26.999H0.000488281V-0.000976562H112.176C119.258 -0.000976562 125 6.04269 125 13.499C125 20.9554 119.258 26.999 112.176 26.999Z" fill="#05334B" />
                                        <text x="10%" y="55%" dominant-baseline="middle" text-anchor="start" fill="white" font-size="15" f fontWeight={500}>HOBBIES </text>
                                    </svg>

                                </div>
                                <div className="flex flex-col px-[15.92px] pt-[20px] gap-[9.81px] ">
                                    {data.hobbies.map((detail, index) => (
                                        <p className="text-[#05334B]   text-[8.96px] font-normal">
                                            {detail.title}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[496px] pr-[20px] pb-[20px] pl-[40px] bg-[#05334B] ">
                <div className="  pt-[30px] gap-4 w-full h-auto flex flex-col  ">
                    <span className="text-white  text-[43.514px] font-normal  leading-[43px] ">
                        {data.firstName}
                        <br />
                        {data.lastName}
                    </span>

                    <p className="text-white  text-[14.015px] font-normal mb-0 ">
                        {data.designation}
                    </p>
                </div>
                <div className="pt-[40.78px]   flex flex-col gap-[5.64px] ">



                    <svg width="456" height="33" viewBox="0 0 456 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.5C0 7.3873 7.3873 0 16.5 0H456V33H16.5C7.38729 33 0 25.6127 0 16.5V16.5Z" fill="#E5F1FF" />



                        <text x="5%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#05334B" font-size="22" f fontWeight={700}>ABOUT ME </text>

                    </svg>

                    <p className="text-white  text-xs font-normal break-all">
                        {data.summery}
                    </p>
                </div>




                <div className=" flex flex-col  gap-8 pt-[24px]  ">




                    <svg width="456" height="33" viewBox="0 0 456 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.5C0 7.3873 7.3873 0 16.5 0H456V33H16.5C7.38729 33 0 25.6127 0 16.5V16.5Z" fill="#E5F1FF" />



                        <text x="5%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#05334B" font-size="22" f fontWeight={700}>EXPERINCE </text>

                    </svg>


                    {data.experience.map((detail, index) => (
                        <div className="flex  gap-[80px]">

                            <p className="text-white  pl-[18px]  text-[8.969px] font-normal">

                                {detail.duration?.start?.year} -
                                {detail.duration?.end?.year == undefined || "Year" ? "Present" : detail.duration?.end?.year}


                            </p>

                            <div className="flex flex-col ga-2">
                                <p className="text-white pl-[18px]  text-[11.989px] font-bold">
                                    {detail.organization}
                                </p>
                                <p className="text-white  pl-[18px]  text-[9.996px] font-semibold">
                                    {detail.designation}
                                </p>

                            </div>
                            <p className="text-white pl-[18px]  text-xs font-normal">
                                {detail.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-5 pt-[24px]  ">

                    <svg width="456" height="33" viewBox="0 0 456 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.5C0 7.3873 7.3873 0 16.5 0H456V33H16.5C7.38729 33 0 25.6127 0 16.5V16.5Z" fill="#E5F1FF" />



                        <text x="5%" y="55%" dominant-baseline="middle" text-anchor="start" fill="#05334B" font-size="22" f fontWeight={700}>EDUCATION </text>

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
            </div>
        </div>
    );
}

export default Resume100;
