import React from 'react'





function ClientSection() {


    return (
        <div className='flex ml:flex-row flex-col gap-12 w-[100%] items-center justify-between  ml:py-12 py-6 '>
            <div className=' ml:w-[45%] w-[100%]'>
                <img className='min-w-[40%] h-[39%] ' src="/images/recruiter/ResumeSection.png" alt="" />

            </div>
            <div className='flex flex-col ml:gap-6 gap-4 ml:w-[50%] w-[95%] ml:items-start items-center'>
                <div className='flex flex-col gap-2 ml:text-start text-center'>
                    <p className='ml:text-[3.3vw] text-[8vw] font-bold leading-tight'>With <span className='text-[#06A9EF]'>My Clients</span> Resume Management Made easy</p>

                </div>
                <div className='ml:text-[1.45vw] text-[4vw] font-medium ml:text-start text-center'>
                    We make it simple to keep track of your client’s details and their resumes all in one place. Easily organize and access client data, ensuring efficiency and convenience for recruiters managing profiles and resumes.                </div>
                <button className='bg-[#06A9EF] text-white flex gap-2  px-6  ml:py-3 py-2 ml:w-[174px] ml:rounded-[12px] rounded-[8px] justify-center items-center' >
                    <p className='ml:text-[16px] text-[4vw] font-semibold'>Get Started</p>


                </button>

            </div>

        </div>
    )
}

export default ClientSection
