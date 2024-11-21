import { useRouter } from 'next/router';
import React from 'react'

function NewSkillAssessment() {

    const router = useRouter();
    const clickHandler = () => {

        router.push("/auth?signin=true&role=user")

    };
    return (
        <div className='bg-[#DAF2FD99] py-6 flex flex-col gap-9 items-center '>
            <div className='flex flex-col gap-2 ml:px-6 px-2'>
                <p className='font-semibold ml:text-[3.2vw] text-center text-[28px] xl:text-[42px]'> Skill Assessment</p>
                <p className='ml:text-[20px] font-medium text-center text-[16px] xl:text-[20px]'> Explore your Growth through Skill Assessment and test your limits</p>
            </div>
            <div className='flex scr700:flex-row flex-col ml:items-stretch items-center  justify-between customMargins w-full ml:gap-6 gap-3 max-w-[1256px]'>
                <div className='flex flex-col ml:gap-9 gap-4 justify-between items-center text-center bg-[#FFFFFF]  border-[0.5px] border-blue rounded-[16px] ml:p-4 p-2 ml:w-[324px] sm:w-[280px] w-[250px]'>
                    <img
                        className=" ml:h-[182px] ml:w-[182px]  w-[120px] h-[120px]  object-contain  "
                        src="/images/candidate/skill1.png"
                        alt=""
                    />
                    <div className='flex flex-col ml:gap-4 gap-2 text-center items-center' >
                        <p className='ml:text-[20px] text-[16px]  font-semibold'>
                            Limit-Pushing Challenges
                        </p>
                        <p className='ml:text-[16px]  text-[13px]   font-normal'>
                            Test your abilities with skill assessments that encourage you to reach new heights.
                        </p>

                    </div>

                </div>
                <div className='flex flex-col ml:gap-9 gap-4 items-center  justify-between text-center bg-[#FFFFFF]  border-[0.5px] border-blue rounded-[16px] ml:p-4 p-2 ml:w-[324px] sm:w-[280px] w-[250px]'>
                    <img
                        className=" ml:h-[182px] ml:w-[182px]  w-[120px] h-[120px]  object-contain  "
                        src="/images/candidate/skill2.png"
                        alt=""
                    />
                    <div className='flex flex-col ml:gap-4 gap-2 text-center items-center' >
                        <p className='ml:text-[20px] text-[16px]  font-semibold'>
                            Gain Valuable Insights
                        </p>
                        <p className='ml:text-[16px]  text-[13px]   font-normal'>
                            Get Insights with Personalized assessments designed to highlight your strengths.
                        </p>

                    </div>

                </div>
                <div className='flex flex-col ml:gap-9 gap-4 items-center text-center  justify-between bg-[#FFFFFF]  border-[0.5px] border-blue rounded-[16px] ml:p-4 p-2 ml:w-[324px] sm:w-[280px] w-[250px]'>
                    <img
                        className=" ml:h-[182px] ml:w-[182px]  w-[120px] h-[120px]  object-contain  "
                        src="/images/candidate/skill3.png"
                        alt=""
                    />
                    <div className='flex flex-col ml:gap-4 gap-2 text-center items-center' >
                        <p className='ml:text-[20px] text-[16px]  font-semibold'>
                            Get Skill Certified
                        </p>
                        <p className='ml:text-[16px]  text-[13px]   font-normal'>
                            By earning Skilotech certifications, you&apos;ll validate your expertise and boost your career prospects.
                        </p>

                    </div>

                </div>


            </div>
            <button
                onClick={clickHandler}
                className="bg-[#06A9EF] btn_hover_effect text-white flex gap-2  px-6  ml:py-3 py-2 ml:w-[167px] ml:rounded-[12px] rounded-[8px] justify-center items-center"
            >
                <p className="ml:text-[16px] text-[14px] font-semibold">Get Started</p>
            </button>
        </div>
    )
}

export default NewSkillAssessment
