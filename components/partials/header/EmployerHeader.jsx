import { useRouter } from 'next/router';
import React from 'react'
import { Link } from 'react-scroll'

function EmployerHeader() {
    const router = useRouter();
    return (
        <div className=" flex ms:p-2 p-2 z-[1000] fixed top-0 w-[100%] bg-white gap-1 justify-between items-center h-[70px]" style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}>

            <div className=' flex ms:gap-6 gap-2 items-center ms:justify-start justify-between ms:w-[60%] w-[90%]'>
                <div className='flex gap-1 items-center'>
                    <div className='mobile600' onClick={() => setIsSidebar(true)}>
                        <img src="/images/home/menu.png" alt="" className="min-w-[30px] h-[30px] object-contain" />
                    </div>
                    <div className="flex  items-center  ">

                        <img className='min-w-[104px] h-[36.317px] object-contain' src="/images/logo_skilotech.png" alt="" />

                    </div>
                </div>
                <div className=' flex items-center border  justify-between w-[25%] ms:min-w-[200px] scr420:min-w-[140px] min-w-[120px] rounded-[8px] px-3 py-1'>
                    <input
                        type="text"
                        className="text-black font-small ms:text-[14px] text-[12px] w-[70%]"
                        placeholder="Search"
                        style={{ border: 'none' }}
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                        <g mask="url(#mask0_7896_55668)">
                            <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#06A9EF" />
                        </g>
                    </svg>
                </div>
            </div>
            <div className="flex ms:px-4  px-2 py-4 justify-end gap-4 ms:w-[40%] w-[10%] ">


                <div className='flex items-center gap-5'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="none">
                        <path d="M0 21.4569V19.0406H2.41625V10.5837C2.41625 8.9125 2.91964 7.42731 3.92641 6.12817C4.93318 4.82984 6.24198 3.97932 7.85281 3.57661V2.73092C7.85281 2.22753 8.0292 1.79986 8.38197 1.44789C8.73394 1.09512 9.16161 0.918732 9.665 0.918732C10.1684 0.918732 10.5961 1.09512 10.948 1.44789C11.3008 1.79986 11.4772 2.22753 11.4772 2.73092V3.57661C13.088 3.97932 14.3968 4.82984 15.4036 6.12817C16.4104 7.42731 16.9137 8.9125 16.9137 10.5837V19.0406H19.33V21.4569H0ZM9.665 25.0812C9.00053 25.0812 8.43191 24.8449 7.95913 24.3721C7.48554 23.8985 7.24875 23.3295 7.24875 22.665H12.0813C12.0813 23.3295 11.8449 23.8985 11.3721 24.3721C10.8985 24.8449 10.3295 25.0812 9.665 25.0812Z" fill="#333333" />
                    </svg>
                    <div className='web600'>
                        <div className="flex items-center gap-2">

                            <div className="">
                                <img src="/images/employer/profileNew.png" className="w-[40px] h-[40px]" alt="" />
                            </div>

                            <div className=" flex items-center ">

                                John Doe

                                <div className="user_name flex items-center relative">
                                    <div
                                        className="group"
                                        style={{
                                            height: "50px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            position: "relative",
                                        }}
                                    >
                                        <img
                                            src="/images/down_arrow.png"
                                            className="h-4 w-4 ml-1 cursor-pointer group-hover:opacity-100 group-hover:visible"
                                            alt=""
                                        />
                                        <div className="dropdown absolute top-[26px] mt-[1rem] right-0 z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                                            <Link href="/profile" className="block py-1">
                                                Profile
                                            </Link>
                                            <a onClick={() => router.push("/")} className="block py-1">
                                                LogOut
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployerHeader