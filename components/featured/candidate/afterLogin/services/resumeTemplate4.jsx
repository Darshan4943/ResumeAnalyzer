import React from 'react'

function ResumeTemplate4() {
    return (
        <>
            <div className="  break-all w-[595px] flex  gap-3 border border-[#06A9EF] rounded-[9px]">

                <div className=" w-[188px] ">
                    <div className="flex flex-col h-full bg-[#282829] w-[100%] gap-[18px]  rounded-tl-[9px]  rounded-bl-[9px]">
                        <div className="flex items-center mt-[35px] flex-col w-[100%]">
                            <img className="w-[102px] mb-[16px] h-[102px] rounded-3xl" src="./images/services/Ellipse_24.png" alt="" />
                            <p className="text-[#fff] font-[400] font-montserrat text-[24px] leading-normal">John</p>
                            <p className="text-[#fff] font-[400] font-montserrat text-[24px] leading-normal">Doe</p>
                            <p className="mt-[5px] text-[8px] font-montserrat font-[500] text-[#00AEEF]">Web Design & Developer</p>
                        </div>
                        <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[178px] mr-[-11px] h-[41px]" src="./images/services/contact.png" alt="" />
                        </div>
                        <div className="flex gap-2 items-center  ml-[40px] ">
                            <img className="w-[16px] h-[16px]" src="./images/services/telephone_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">+2 434-232-534234</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px]">
                            <img className="w-[16px]  h-[16px]" src="./images/services/message_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">henerysilly@domain.com</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px] ">
                            <img className="w-[16px] h-[16px]" src="./images/services/website_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">www.yoursite.com</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px]">
                            <img className="w-[16px] h-[16px]" src="./images/services/location_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">12th Avenue Street</p>
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal"> Australia 40000</p>

                        </div>

                        <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[178px] mr-[-11px] h-[41px]" src="./images/services/follow_me.png" alt="" />
                        </div>
                        <div className="flex gap-2 items-center  ml-[40px] ">
                            <img className="w-[16px] h-[16px]" src="./images/services/facebook_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">facebook/username</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px]">
                            <img className="w-[16px]  h-[16px]" src="./images/services/twitter_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">twitter/username</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px] ">
                            <img className="w-[16px] h-[16px]" src="./images/services/insta_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">behance/username</p>
                        </div>

                        <div className="flex gap-2 items-center  ml-[40px]">
                            <img className="w-[16px] h-[16px]" src="./images/services/youtube_blue.png" alt="" />
                            <p className="font-inter text-[9px] font-[400] text-[#fff] leading-normal">youtube/username</p>
                        </div>

                        <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[178px] mr-[-11px] h-[41px]" src="./images/services/language.png" alt="" />
                        </div>
                        {

                            [1, 2, 3, 4].map(() => (
                                <div className="flex  items-center gap-[5px]  ml-[40px]">
                                    <p className="font-inter pr-[33px] text-[10px] font-[400] text-[#fff] gap-2 leading-normal">ARABIC </p>
                                    {
                                        [1, 2, 3, 4, 5].map(() => (
                                            <div className="flex ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.23097 0.605957C1.44197 0.605957 -0.0090332 2.05695 -0.0090332 3.84595C-0.0090332 5.63495 1.44197 7.08594 3.23097 7.08594C5.01997 7.08594 6.47097 5.63495 6.47097 3.84595C6.47097 2.05695 5.02097 0.605957 3.23097 0.605957Z" fill="#00AEEF" />
                                                </svg>
                                            </div>
                                        ))}
                                </div>
                            ))}

                        <div className="flex items-center justify-end mt-[12px] w-[100%]">
                            <img className="w-[178px] mr-[-11px] h-[41px]" src="./images/services/hobbies.png" alt="" />
                        </div>

                        <div className="flex pb-[40px] items-center gap-[10px]  ml-[42px]">
                            <div className="flex flex-col items-start gap-2">
                                <p className="font-inter  text-[10px] font-[400] text-[#fff] gap-8 leading-normal">Photography </p>
                                <p className="font-inter  text-[10px] font-[400] text-[#fff] gap-8 leading-normal">Bowling pins </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 ">
                                <p className="font-inter pr-[33px] text-[10px] font-[400] text-[#fff] gap-8 leading-normal">Swimming </p>
                                <p className="font-inter pr-[33px] text-[10px] font-[400] text-[#fff] gap-8 leading-normal">Music </p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className=" w-[407px]">
                    <div className="flex flex-col  gap-8 items-start mt-[26px] ">
                        <div className="flex gap-2 w-[100%]">
                            <img className="w-[25px] h-[25px]" src="./images/services/profile_img.png" alt="" />
                            <div className="flex flex-col w-[90%]">
                                <p className="text-[#282829] font-inter leading-normal text-[16px] font-[400]">About me</p>
                                <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>
                            </div>
                        </div>
                        <div className=" mb-[40px] ">
                            <p className="font-inter text-[#787879] leading-normal text-[16px]  font-[400]">
                         Hen rySillyLoremIpsumissimplydummytexvvvissimplNameIsHen rySillyLoremIpsumissimplydummytextoftheprinting  andtypesetti ds
                               
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-[100%]">
                        <img className="w-[25px] h-[25px]" src="./images/services/education.png" alt="" />
                        <div className="flex flex-col w-[90%]">
                            <p className="text-[#282829] font-inter leading-normal text-[16px] font-[400]">EDUCATION</p>
                            <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center gap-2 mt-[24px]">
                                    <img className="h-[16px] w-[5px]" src="./images/services/_.png" alt="" />
                                    <p className="text-[#414042] text-[11px] font-[400] leading-normal">SCHOOL NAME 1</p>
                                </div>
                                <p className="text-[#414042] text-[9px] font-[400] leading-normal"> JUNE 2008 - DEC 2014</p>
                            </div>
                            <p className="text-[#787879] text-[9px] font-inter mt-[5px] font-[400]">Loremipsumdolor:sitametconsectetgelit.itellentesqueeleifeornareipsunenunc </p>
                            <p className="text-[#787879] text-[9px] font-inter  font-[400]">pulvinati ncidunt. quis pul vinar mellu  </p>

                            <div className="flex justify-between items-center ">
                                <div className="flex items-center gap-2 mt-[24px]">
                                    <img className="h-[16px] w-[5px]" src="./images/services/_.png" alt="" />
                                    <p className="text-[#414042] text-[11px] font-[400] leading-normal">COLLAGE NAME 1</p>
                                </div>
                                <p className="text-[#414042] text-[9px] font-[400] leading-normal"> JUNE 2008 - DEC 2014</p>
                            </div>
                            <p className="text-[#787879] text-[9px] font-inter mt-[5px] font-[400]">Loremipsumdolor:sitametconsectetgelit.itellentesqueeleifeornareipsunenunc </p>
                            <p className="text-[#787879] text-[9px] font-inter  font-[400]">pulvinati ncidunt. quis pul vinar mellu  </p>

                            <div className="flex justify-between items-center ">
                                <div className="flex items-center gap-2 mt-[24px]">
                                    <img className="h-[16px] w-[5px]" src="./images/services/_.png" alt="" />
                                    <p className="text-[#414042] text-[11px] font-[400] leading-normal">COLLAGE NAME 1</p>
                                </div>
                                <p className="text-[#414042] text-[9px] font-[400] leading-normal"> JUNE 2008 - DEC 2014</p>
                            </div>
                            <p className="text-[#787879] text-[9px] font-inter mt-[5px] font-[400]">Loremipsumdolor:sitametconsectetgelit.itellentesqueeleifeornareipsunenunc </p>
                            <p className="text-[#787879] text-[9px] font-inter  font-[400]">pulvinati ncidunt. quis pul vinar mellu  </p>

                        </div>
                    </div>

                    <div className="flex gap-2 mt-[35px] w-[100%]">
                        <img className="w-[25px] h-[25px]" src="./images/services/experience.png" alt="" />
                        <div className="flex flex-col w-[90%]">
                            <p className="text-[#282829] font-inter leading-normal text-[16px] font-[400]">EXPERIENCE</p>
                            <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>

                            {
                                [1, 2].map(() => (
                                    <>
                                        <div className="flex justify-between items-center ">
                                            <div className="flex items-center gap-2 mt-[24px]">
                                                <img className="h-[16px] w-[5px]" src="./images/services/_.png" alt="" />
                                                <p className="text-[#414042] text-[11px] font-[400] leading-normal">WORK NAME 1</p>
                                            </div>
                                            <p className="text-[#414042] text-[9px] font-[400] leading-normal"> JUNE 2008 - DEC 2014</p>
                                        </div>
                                        <p className="text-[#787879] text-[9px] font-inter mt-[5px] font-[400]">Loremipsumdolor:sitametconsectetgelit.itellentesqueeleifeornareipsunenunc </p>
                                        <p className="text-[#787879] text-[9px] font-inter  font-[400]">pulvinati ncidunt. quis pul vinar mellu  </p>
                                    </>
                                ))}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-[35px] w-[100%]">
                        <img className="w-[25px] h-[25px]" src="./images/services/experience.png" alt="" />
                        <div className="flex flex-col w-[100%]">
                            <p className="text-[#282829] font-inter leading-normal text-[16px] font-[400]">Skills</p>
                            <div className="h-[1px] mt-[4px] w-[95%] bg-[#282829] "></div>


                            <div className="flex justify-between w-[95%] mt-8">
                                <div className="flex items-start  gap-3">
                                    <div className="flex  flex-col ">
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">PHOTOSHOP</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">HTML</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">CSS</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">JAVASCRIPT</p>
                                    </div>
                                    <div className='flex items-start  gap-2'>
                                    { 
                                        [1, 2, 3, 4, 5].map(() => (
                                            <div className="flex flex-col gap-1">
                                                {
                                                    [1, 2, 3, 4].map(() => (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.83377 0.886719C2.04477 0.886719 0.59375 2.33771 0.59375 4.12671C0.59375 5.91571 2.04477 7.36676 3.83377 7.36676C5.62277 7.36676 7.07376 5.91571 7.07376 4.12671C7.07376 2.33771 5.62377 0.886719 3.83377 0.886719Z" fill="#00AEEF" />
                                                        </svg>
                                                    ))}

                                            </div>))
                                           
                                    }
                                    </div>

                                </div>

                                <div className="flex justify-between items-center gap-2">
                                    <div className="flex  flex-col ">
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">PHOTOSHOP</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">HTML</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">CSS</p>
                                        <p className="text-[#282829] font-[400] font-inter text-[9px] leading-normal">JAVASCRIPT</p>
                                    </div>

                                    {
                                        [1, 2, 3, 4, 5].map(() => (
                                            <div className="flex flex-col items-center  gap-1">
                                                {
                                                    [1, 2, 3, 4].map(() => (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.83377 0.886719C2.04477 0.886719 0.59375 2.33771 0.59375 4.12671C0.59375 5.91571 2.04477 7.36676 3.83377 7.36676C5.62277 7.36676 7.07376 5.91571 7.07376 4.12671C7.07376 2.33771 5.62377 0.886719 3.83377 0.886719Z" fill="#00AEEF" />
                                                        </svg>
                                                    ))}

                                            </div>))}


                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}

export default ResumeTemplate4
