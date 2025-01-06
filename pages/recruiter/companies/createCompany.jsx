import React from 'react'

function CreateCompany() {
    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='flex gap-3 text-[18px] font-[500] text-[#333333] items-center'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g mask="url(#mask0_6706_100809)">
                        <path d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z" fill="#1C1B1F" />
                    </g>
                </svg>
                Add Company Profile
            </div>
            <div style={{ boxShadow: "0px 1px 2px 0px #00000040" }} className='rounded-[16px] w-full p-6 gap-[32px] bg-[#FFFFFF]'>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex gap-6 w-full justify-between'>
                        <div className='flex w-[48%] flex-col gap-2 text-[14px] font-[500] text-[#333333]'>
                            Company Name
                            <input type="text" name="" id="" className='border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2'/>
                        </div>
                        <div className='w-[48%]'></div>
                    </div>
                    <div className='flex gap-2'></div>
                </div>
                <div className=''></div>
            </div>
        </div >
    )
}

export default CreateCompany
