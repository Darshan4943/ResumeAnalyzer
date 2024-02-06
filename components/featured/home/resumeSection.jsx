import { useRouter } from 'next/router';
import React from 'react'

function ResumeSection() {
    const router = useRouter();
    return (
        <div className='flex sm:flex-row flex-col gap-4 w-[100%] sm:max-h-[465px] justify-between  mt-9 '>
            <div className='sm:w-[35%] w-[85%] bg-cover bg-no-repeat bg_resumeBlue  '>

                <div className="w-[110%] pt-4  -ml-2 " >
                    <img src="/images/resumeBlue2.png " alt="" className='max-h-[440px] w-[110%]' />
                </div>
            </div>
            <div className='sm:w-[25%] w-[100%] lg:ml-12  ms:px-6 sm:px-2 px-[20vw] flex flex-col gap-4 justify-center items-center'>
                <div className='flex flex-wrap text-center items-center justify-center sm:text-[2.2vw] text-[5vw] font-bold'>
                <span className='text-center lg:px-11 scr700:px-[50px] px-[55px]'>   Transform Your Resume from </span> &nbsp; <span className='px-[70px] text-[#FFDA1D]'>  Ordinary </span> &nbsp; <span>to</span>  &nbsp; <span className='px-[70px] text-[#06A9EF]'>Awesome!</span>
                </div>
                <button
                    onClick={() => {
                        router.push("/auth/Sign_up/");
                    }}
                    className=" ml:text-[16px] scr700:text-[14px] sm:text-[12px] text-[4vw] font-bold lg:px-9 scr700:px-4 px-2 lg:py-3 py-2 bg-[#06A9EF] rounded-[12px] text-white scr1250:w-[60%] sm:w-[80%] w-[60%]"
                >
                    Join Now
                </button>

            </div>
            <div className='sm:w-[40%] w-[100%] bg-cover bg-no-repeat bg_resumeYellow sm:overflow-visible'>

                <div className="w-[100%] p-4  -ml-2" >
                    <img src="/images/resumeYellow1.png " alt="" className='max-h-[433px]' />
                </div>
            </div>

        </div>
    )
}

export default ResumeSection
