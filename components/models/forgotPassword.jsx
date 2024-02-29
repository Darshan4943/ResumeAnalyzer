import React, { useState } from 'react'

function ForgotPassword({ setIsForgot }) {
    const [tabIndex, setTabIndex] = useState(1)
    const [verify, setVerify] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   

    return (
        <>
            {tabIndex === 1 &&

                <div className=' absolute rounded-[16px] bg-white shadow-lg p-6 flex flex-col gap-6 w-[33%]'>
                    <div className='flex justify-center text-[30px] font-[600] '>
                        Forgot Password

                    </div>


                    <div className=" flex flex-col gap-2">
                        <p className=" text-[14px] font-[500]">
                            Username
                        </p>
                        <input
                            type="text"
                            name=""
                            id="email"
                            placeholder="Enter Email"
                            className='border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[100%]'

                        />

                    </div>
                    {verify &&
                        <div className=" flex flex-col gap-2">
                            <p className=" text-[14px] font-[500]">
                                Verification Code
                            </p>
                            <input
                                type="text"
                                name=""
                                id="email"
                                placeholder="Enter Otp"
                                className='border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[100%]'

                            />


                            <div className='text-[12px] font-[600] text-[#C00000]'>
                                Please enter the Verification code sent to your email.
                            </div>
                            <div className='text-[12px] flex gap-2 font-[600] '>
                                <p className='text-[#404040]'>Didn’t you receive any code?</p>
                                <p className='text-[#BEBEBE]'>Re-send Code</p>
                                <p className='text-[#C00000]'>00:38</p>

                            </div>

                        </div>
                    }

                    {verify ?
                        <button onClick={() => setTabIndex(2)} className='border border-[#06A9EF] text-white text-[20px] font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]'>
                            Verify & Proceed
                        </button>
                        :
                        <button onClick={() => setVerify(true)} className='border border-[#06A9EF] text-white text-[20px] font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]'>
                            Verify Email
                        </button>
                    }


                </div>

            }
            {tabIndex === 2 &&
                <div className=' absolute rounded-[16px] bg-white shadow-lg p-6 flex flex-col gap-6 w-[33%]'>
                    <div className='flex justify-center text-[30px] font-[600] '>
                        Reset Password

                    </div>


                    <div className=" flex flex-col gap-2">
                        <p className=" text-[14px] font-[500]">
                            Create New Password
                        </p>
                        <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D] justify-between">
                            <input
                                 type={showPassword ? "text" : "password"}
                                name=""
                                id="email"
                                placeholder="Enter Password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                onClick={()=>setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                <path
                                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                                    fill="#9D9D9D"
                                />
                            </svg>
                        </div>

                    </div>
                    <div className=" flex flex-col gap-2">
                        <p className=" text-[14px] font-[500]">
                            Confirm Password
                        </p>
                        <div className="flex flex-row px-[16px] py-[12px] border-[1px] rounded-[8px] border-solid border-[#9D9D9D] justify-between">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name=""
                                id="email"
                                placeholder="Enter Password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                <path
                                    d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                                    fill="#9D9D9D"
                                />
                            </svg>
                        </div>
                    </div>
                    <button onClick={() => setTabIndex(3)} className='border border-[#06A9EF] text-white text-[20px] font-[500] bg-[#06A9EF] rounded-[12px] px-4 py-3 w-[100%]'>
                        Submit
                    </button>

                </div>
            }

            {tabIndex === 3 &&

                <>

                    <div className=' absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6 w-[25%] '>
                        <svg
                            className="absolute top-[-40px]  left-[38%] right-[62%] flex"
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="85"
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

                        <div className="text-center">
                            <div className="text-[24px] font-[500] text-[#333]">
                                Password Changed Successfully
                            </div>
                            <div className="text-[16px] font-[500] text-[#333]">
                                Check your email for confirmation
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsForgot(false)}
                                className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                            >
                                Done
                            </button>
                        </div>
                    </div>

                </>


            }
        </>
    )
}

export default ForgotPassword