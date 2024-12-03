import React from 'react'

function HeroSection() {
    return (
        <div className='bg-[#EBF9FF] py-[30px] relative'>
            <div className='  flex gap-[33px] items-center customMargins'>

                <div className='flex flex-col gap-6  items-start'>
                    <div className="font-bold text-[2.5vw] xl:text-[36px] leading-tight ">
                        Empowering{" "}
                        <span className="text-[#06A9EF]"> Job Seekers,</span>
                        <p>
                            Connecting   <span className="text-[#FFDA1D]">Employers</span>
                        </p>

                    </div>
                    <text className='text-[1.1vw] xl:text-[16px] font-[400]'>
                        Empower yourself with countless opportunities. 
                        <p>
                        Search, apply, and land your dream job.
                        </p>
                    </text>

                </div>
                <div className='xl:h-[463px] xl:w-[541px] w-[37.5vw] h-[32.1vw] '>

                </div>
                <img
                    src="/images/withoutLogin/hero.png"
                    alt=""
                    className="xl:h-[463px] xl:w-[541px] w-[37.5vw] h-[32.1vw]  object-cover absolute scr1250:right-[72px] right-[24px] "

                />
            </div>
            
        </div>
    )
}

export default HeroSection
