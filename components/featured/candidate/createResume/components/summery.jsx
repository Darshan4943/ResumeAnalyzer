import React, { useEffect, useState } from 'react';

function Summary() {
    const [progress, setProgress] = useState(76);
    const circumference = 2 * Math.PI * 70;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <div className='bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col gap-2 w-full'>
            <p className='text-[18px] font-semibold '> Usage Summary</p>

            <div className='flex xxlg:flex-row flex-col xxlg:gap-4 gap-6'>
                <div className='flex flex-col gap-3 xxlg:w-[50%] w-full'>
                    <p className='font-medium'>Credit balance</p>
                    <div className='flex scr420:flex-row flex-col scr1400:gap-12 xxlg:gap-4 gap-12 items-center justify-center '>
                        <div className='flex flex-col gap-4 '>
                            <div className="flex items-center justify-center">
                                <svg className="transform rotate-270 w-[160px] h-[160px]">
                                    <circle cx="80" cy="80" r="70" stroke="#DEDEDE" strokeWidth="8" fill="transparent" />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#06A9EF"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}

                                    />
                                </svg>

                                <div className="absolute flex flex-col  items-center justify-center text-[18px] font-semibold bg-white w-[110px] h-[110px] rounded-full" style={{ boxShadow: "0px 0px 2px 0px #00000040" }}>
                                    {progress} %
                                    <p className='text-[12px] font-medium'>Remaining</p>
                                </div>

                            </div>
                            <div className='flex gap-4 items-center text-[12px] font-medium'>
                                <div className='flex gap-2 items-center'>
                                    Remaining
                                    <div className='w-[16px] h-[16px] rounded-[2px] bg-blue'></div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    Used
                                    <div className='w-[16px] h-[16px] rounded-[2px] bg-[#DEDEDE]'></div>
                                </div>


                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>

                            <div className=''>
                                <p className='text-[20px] font-medium'>$ 0.30 / $ 10</p>
                                <p className='text-[12px] font-medium'>Your Plan Validity is 25 Days</p>
                            </div>
                            <div className='flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px]'>
                                Purchase Plan

                            </div>

                        </div>
                    </div>
                </div>
                <div className='xxlg:hidden w-full h-[1px] bg-[#DEDEDE]'></div>
                <div className='flex flex-col gap-5  xxlg:w-[50%] w-full'>
                    <p className='font-medium'>Available services</p>
                    <div className='flex flex-col gap-8 scr420:text-[14px] text-[12px] font-medium '>
                        <div className='flex gap-4 items-center'>
                            <p className='scr420:min-w-[124px] min-w-[104px]'> Total Uploads</p>

                            <div className='relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]'>
                                <div className=' absolute w-[40%] h-[10px] bg-[#06A9EF] rounded-[6px]'></div>
                            </div>
                            <p className='min-w-[55px]'> 08 / 10</p>


                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='scr420:min-w-[124px] min-w-[104px]'>Total Downloads</p>

                            <div className='relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]'>
                                <div className=' absolute w-[30%] h-[10px] bg-[#06A9EF] rounded-[6px]'></div>
                            </div>

                            <p className='min-w-[55px]'> 08 / 10</p>

                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='scr420:min-w-[124px] min-w-[104px]'>Cloud Storage</p>

                            <div className='relative w-[45%] h-[10px] bg-[#DEDEDE] rounded-[6px]'>
                                <div className=' absolute w-[35%] h-[10px] bg-[#06A9EF] rounded-[6px]'></div>
                            </div>
                            <p className='min-w-[55px]'> 1.23 mb <br />
                                / 2 GB</p>


                        </div>


                    </div>


                </div>

            </div>
        </div>
    );
}

export default Summary;
