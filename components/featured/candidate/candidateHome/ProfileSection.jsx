import React, { useState } from 'react'

function ProfileSection() {

    const [circumference, setCircumference] = useState(2 * Math.PI * 52);
    const [dashOffset, setDashOffset] = useState(2 * Math.PI * 52);
    return (
        <div className='min-w-[262px] bg-[#FFFFFF] rounded-[16px] px-4 py-7 flex flex-col gap-4 '>
            <div className="flex flex-col gap-4 ">
                <div className='flex  flex-col gap-[6px] items-center'>
                    <div className="flex items-center justify-center">
                        <svg className="transform rotate-270 w-[116px] h-[116px]">
                            <circle
                                cx="58"
                                cy="58"
                                r="52"
                                stroke="#DEDEDE"
                                strokeWidth="4"
                                fill="transparent"
                            />
                            <circle
                                cx="58"
                                cy="58"
                                r="52"
                                stroke="#06A9EF"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 52}
                                strokeDashoffset={dashOffset}
                            />
                        </svg>


                        <img
                            src="/images/profile/john_doe.png"
                            alt=""
                            className="w-[92px] h-[92px] object-cover absolute rounded-full"
                        />

                    </div>
                    <div className='bg-[#D4F2FF] px-1 py-[2px] rounded-[4px]  h-[19px] flex items-center justify-center text-center  w-[40px] text-[12px] text-[#06A9EF] font-medium leading-tight' >
                        100%

                    </div>
                </div>


            </div>
            <div>
                
            </div>

        </div>
    )
}

export default ProfileSection
