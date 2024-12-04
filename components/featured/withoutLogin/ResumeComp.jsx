import React from 'react'

function ResumeComp() {
    return (
        <div className='customMargins'>
            <div style={{
                background: "linear-gradient(177.77deg, #FFFFFF 30.14%, #FFDF9B 192.48%)"
            }}
                className='py-5 px-10  flex gap-12 items-center scr1024:w-[930px] justify-between border border-[#D99403] rounded-[12px]' >
                <div className='flex flex-col gap-6'>
                    <p className='text-[22px] font-[600]'>
                        Craft Your Perfect Resume in Minutes
                    </p>
                    <p className='text-[14px] font-[500]'>Uncover Your Potential with Effortless Skill Assessment.<br /> Elevate Your Abilities, Elevate Your Success!</p>
                    <button className='py-3 px-9 text-[#FFFFFF] bg-blue text-[14px] font-[600] rounded-[30px] h-[42px] w-[155px]'>
                        Get Started
                    </button>
                </div>
                <img
                    src="/images/withoutLogin/resumeComp.png"
                    alt=""
                    className="h-[176px] w-[176px]  object-cover "

                />
            </div>
        </div>
    )
}

export default ResumeComp
