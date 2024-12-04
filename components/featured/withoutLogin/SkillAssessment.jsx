import React from 'react'

function SkillAssessment() {
    return (
        <div className='customMargins'>
            <div className='py-4 px-4 rounded-[12px] bg-Skill bg-cover bg-no-repeat  flex gap-12 items-center scr1024:w-[930px] justify-between ' >
                <div className='flex flex-col gap-6'>
                    <p className='text-[18px] font-[500]'>Uncover Your Potential with Effortless Skill Assessment.<br /> Elevate Your Abilities, Elevate Your Success!</p>
                    <button className='py-3 px-9 text-[#FFFFFF] bg-blue text-[14px] font-[600] rounded-[30px] h-[42px] w-[155px]'>
                        Get Started
                    </button>
                </div>
                <img
                    src="/images/withoutLogin/SkillImg.png"
                    alt=""
                    className="h-[150px] w-[161px]  object-cover "

                />
            </div>
        </div>
       
    )
}

export default SkillAssessment
