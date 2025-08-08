import { useRouter } from 'next/router'
import React, { useState } from 'react'

function SuccessPopUp({ text, isButton }) {
    const [button, setButton] = useState(!isButton ? isButton : true)
    const router = useRouter()
    return (
        <div style={{ boxShadow: "0px 0.5px 3px 0px #00000040" }} className='bg-white flex flex-col  gap-4 p-6 rounded-[10px] justify-center items-center w-[400px]'>
            <svg
               
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 85 85"
                fill="none"
              >
                <g clip-path="url(#clip0_6622_116765)">
                  <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                  <g mask="url(#mask0_6622_116765)">
                    <path
                      d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6622_116765">
                    <rect width="85" height="85" rx="42.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            <p className='font-[600]'>
                {text}
            </p>
            {button &&
                <button onClick={()=>router.back()} className='h-[38px]  rounded-[30px] px-6 bg_Button text-[14px] font-semibold'>
                    Done
                </button>
            }



        </div>
    )
}

export default SuccessPopUp