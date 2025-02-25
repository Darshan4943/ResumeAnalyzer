import { useRouter } from 'next/router'
import React, { useState } from 'react'

function SuccessPopUp({ text, isButton }) {
    const [button, setButton] = useState(!isButton ? isButton : true)
    const router = useRouter()
    return (
        <div style={{ boxShadow: "0px 0.5px 3px 0px #00000040" }} className='bg-white flex flex-col  gap-4 p-6 rounded-[10px] justify-center items-center w-[400px]'>
            <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6706_89731)">
                    <rect width="66" height="66" rx="33" fill="#0C8A0A" />

                    <g mask="url(#mask0_6706_89731)">
                        <path d="M26.7859 45.1778L15.6484 34.0403L18.7058 30.983L26.7859 39.0631L46.5131 19.3359L49.5705 22.3933L26.7859 45.1778Z" fill="white" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_6706_89731">
                        <rect width="66" height="66" rx="33" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <p className='font-[600]'>
                {text}
            </p>
            {button &&
                <button onClick={()=>router.back()} className='h-[42px] bg-blue rounded-[30px] px-9 text-white text-[14px] font-semibold'>
                    Done
                </button>
            }



        </div>
    )
}

export default SuccessPopUp