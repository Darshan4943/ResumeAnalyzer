import React from 'react'

function Resume4({ data }) {
    console.log(4, data)
    return (
        <>
            <div className="  break-all w-[800px] flex gap-3 ">

                <div className=" w-[260.23px] ">
                    <div className="flex flex-col h-full min-h-[1131px] bg-[#282829] w-[100%] gap-[18px]   ">
                        <div className="flex items-center mt-[35px] flex-col w-[100%]">
                            <img className="w-[102px] mb-[16px] h-[102px] rounded-3xl" src="/images/services/Ellipse_24.png" alt="" />
                            <p className="text-[#fff] font-[400] font-montserrat text-[24px] leading-normal">{data.firstName}</p>
                            <p className="text-[#fff] font-[400] font-montserrat text-[24px] leading-normal">{data.lastName}</p>
                            <p className="mt-[5px] text-[8px] font-montserrat font-[500] text-[#00AEEF]">{data.designation}</p>
                        </div>
                        <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[250px] mr-[-15.3px] h-[50px]" src="/images/services/contact.png" alt="" />
                        </div>
                        <div className="flex gap-2 items-start ml-[40px] pr-4">
                            <div className="h-[24px] flex items-center">
                                <img className="w-[18px] h-[18px]" src="/images/services/telephone_blue.png" alt="" />
                            </div>
                            <p className=" text-[9px] pt-[2px] flex font-[400] text-[#fff] leading-normal ">{data.mobileNumber}</p>
                        </div>

                        <div className="flex gap-2 items-start ml-[40px] pr-4">
                            <div className="h-[24px] flex items-center">
                                <img className="w-[18px]  h-[18px]" src="/images/services/message_blue.png" alt="" />
                            </div>
                            <p className=" text-[9px] pt-[2px] flex font-[400] text-[#fff] leading-normal ">{data.email} </p>
                        </div>
                        {/* 
                        <div className="flex gap-2 items-start ml-[40px] pr-4">
                            <div className="h-[24px] flex items-center">
                            <img className="w-[18px] h-[18px]" src="/images/services/website_blue.png" alt="" />
                            </div>
                            <p className=" text-[9px] pt-[2px] flex font-[400] text-[#fff] leading-normal ">www.yoursite.com</p>
                        </div> */}


                        <div className="flex gap-2 items-start ml-[40px] pr-4">
                            <div className="h-[24px] flex items-center">
                                <img className="w-[18px] h-[18px]" src="/images/services/location_blue.png" alt="" />
                            </div>
                            <div className=" text-[9px] pt-[2px] flex font-[400] text-[#fff] leading-normal ">{data.location}</div>
                        </div>

                        {/* <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[250px] mr-[-15.3px] h-[50px]" src="/images/services/follow_me.png" alt="" />
                        </div>
                        <div className="flex gap-2 items-start ml-[40px] pr-4">
                            <div className="h-[24px] flex items-center">
                                <img className="w-[18px] h-[18px]" src="/images/services/facebook_blue.png" alt="" />
                            </div>
                            <div className=" text-[9px] pt-[2.5px] flex font-[400] text-[#fff] leading-normal ">facebook/username</div>
                        </div> */}


                        {data?.languages?.length > 0 && (
                            <>
                                <div className="flex items-center justify-end  w-[100%]">
                                    <img className="w-[250px] mr-[-15.3px] h-[50px]" src="/images/services/language.png" alt="" />
                                </div>

                                <div className="flex flex-col text-white pr-8 pb-8  gap-3  justify-between ml-[40px]">
                                {data?.languages?.map((detail, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        {detail.languages}
                                        <div className="flex gap-3 mt-4">
                                            {[...Array(3)].map((_, i) => (

                                                <div>
                                                    {
                                                        detail.rating[i] === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4"/>
                                                          </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF"/>
                                                          </svg>
                                                        )

                                                    }
                                                </div>
                                               
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            </>
                        )}

                        {data?.hobbies?.length > 0 && (
                            <div className='flex flex-col gap-4 pb-4 '>

                                <div className="flex items-center justify-end  w-[100%] ">
                                    <img className="w-[250px] mr-[-15.3px] h-[50px]" src="/images/services/hobbies.png" alt="" />
                                </div>
                                <div className="grid grid-cols-2 gap-5 ml-[40px] pr-4">
                                    {data?.hobbies?.map((item, index) => (
                                        <div key={index} className="text-white text-[9px]">
                                            {item?.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <div className=" w-[530px] p-4 flex flex-col gap-10">
                    <div className="flex flex-col  gap-4 items-start pt-[26px] ">
                        <div className="flex gap-2  items-end w-[100%]">
                            <img className="w-[27px] h-[27px] flex items-end" src="/images/services/profile_img.png" alt="" />
                            <div className="flex flex-col gap-2 w-[90%]">
                                <p className="text-[#282829] font-inter leading-normal mb-2px text-[16px] font-[500]">About me</p>
                                <div className="h-[1px] w-[95%] bg-[#282829] "></div>
                            </div>
                        </div>
                        <div className=" ">
                            <p className="font-inter text-[#787879] leading-normal text-[16px] pl-8 font-[400]">
                                {data.summery}

                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-[100%]">
                        <div className='pt-2'>
                            <img className="w-[27px] h-[27px] " src="/images/services/education.png" alt="" />
                        </div>

                        <div className="flex flex-col gap-4 w-[90%]">
                            <div className='flex flex-col gap-2'>
                                <p className="text-[#282829] font-inter leading-normal text-[16px] font-[500]">EDUCATION</p>
                                <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>
                            </div>
                            {data?.education?.map((detail, index) => (
                                <>
                                    <div className="flex justify-between items-start ">
                                        <div className="flex  gap-2 ">
                                            {/* <img className="h-[16px] w-[5px]" src="/images/services/_.png" alt="" /> */}
                                            <p className='-mt-1'>{">"}</p>
                                            <div className='flex flex-col gap-1'>
                                                <p className="text-[#414042] text-[11px] font-[400] leading-normal">{detail.instituteName}</p>
                                                <p className="text-[#787879] text-[9px] font-inter  font-[400]">{detail.qualification} - {detail.specialization} </p>
                                            </div>
                                        </div>
                                        <p className="text-[#414042] text-[9px] font-[400] leading-normal">  {" "}
                                            {detail.duration?.start?.year}-
                                            {detail.duration?.end?.year}
                                        </p>
                                    </div>



                                </>
                            ))}
                        </div>
                    </div>


                    <div className="flex gap-2 w-[100%]">
                        <div className='pt-2'>
                            <img className="w-[35px] h-[35px] " src="/images/services/experience.png" alt="" />
                        </div>

                        <div className="flex flex-col gap-4 w-[90%]">
                            <div className='flex flex-col gap-2'>
                                <p className="text-[#282829] font-inter leading-normal text-[16px] font-[500]">EXPERIENCE</p>
                                <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>
                            </div>

                            {data.experience?.map((detail, index) => (
                                <>
                                    <div className="flex justify-between items-start ">
                                        <div className="flex  gap-2 ">
                                            <p className='-mt-1'>{">"}</p>
                                            <div className='flex flex-col gap-1'>
                                                <p className="text-[#414042] text-[11px] font-[400] leading-normal">{detail.organization}</p>
                                                <p className="text-[#787879] text-[9px]  font-inter  font-[400]">{detail.description} </p>
                                            </div>
                                        </div>
                                        <div class="text-[9px]">
                                            {" "}
                                            {detail.duration?.start?.year}-{" "}
                                            {detail.currentlyWorking
                                                ? "Present"
                                                : detail.duration?.end?.year}
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 w-[100%]">
                        <div className='pt-2'>
                            <img className="w-[35px] h-[35px] " src="/images/services/skills.png" alt="" />
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className='flex flex-col gap-2'>
                                <p className="text-[#282829] font-inter leading-normal text-[16px] font-[500]">SKILLS</p>
                                <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>
                            </div>

                            <div className="grid grid-cols-2  gap-3 gap-x-12 justify-between w-full">
                                {data?.skills?.map((detail, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2">
                                        {detail.skill}
                                        <div className="flex gap-1 mt-4">
                                            {[...Array(5)].map((_, i) => (

                                                <div>
                                                    {
                                                        detail.rating[i] === 0 ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="7" viewBox="0 0 8 7" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02911 0.285156C2.23911 0.285156 0.789062 1.73615 0.789062 3.52515C0.789062 5.31415 2.24011 6.76514 4.02911 6.76514C5.81811 6.76514 7.2691 5.31415 7.2691 3.52515C7.2691 1.73615 5.81811 0.285156 4.02911 0.285156Z" fill="#D1D3D4"/>
                                                          </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02911 0.886719C2.23911 0.886719 0.789062 2.33771 0.789062 4.12671C0.789062 5.91571 2.24011 7.36676 4.02911 7.36676C5.81811 7.36676 7.2691 5.91571 7.2691 4.12671C7.2691 2.33771 5.81811 0.886719 4.02911 0.886719Z" fill="#00AEEF"/>
                                                          </svg>
                                                        )

                                                    }
                                                </div>
                                               
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}

export default Resume4