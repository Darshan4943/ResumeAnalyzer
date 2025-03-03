import { useRouter } from 'next/router'
import React from 'react'

function SkillAssessment() {
    const router = useRouter()
    return (
        <div className='customMargins'>
            <div className='py-4 px-4 rounded-[12px] bg-Skill bg-cover bg-no-repeat flex scr540:flex-row flex-col-reverse scr460:gap-12 gap-6 items-center scr1024:w-[930px] justify-between ' >
                <div className='flex flex-col scr540:items-start items-center  gap-6'>
                    <p className='ml:text-[18px] scr460:text-[16px] text-[14px] font-[500] scr540:text-start text-center'>Uncover Your Potential with Effortless Skill Assessment.<br className='ml:block hidden'/> Elevate Your Abilities, Elevate Your Success!</p>
                    <button onClick={()=>router.push("/auth?signin=true")} className='px-3 ml:px-6  ml:text-[14px] text-[12px] font-[600] rounded-[30px] h-[38px] ml:w-[135px] w-[125px] leading-tight bg_Button'>
                        Get Started
                    </button>
                </div>
                <img
                    src="/images/withoutLogin/SkillImg.png"
                    alt=""
                    className="scr460:h-[150px] scr460:w-[161px] w-[120px] h-[110px] object-cover "

                />
            </div>
        </div>
       
    )
}

export default SkillAssessment
