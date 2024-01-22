import React, { useEffect, useRef, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion';
import LevelUpdate from '@/components/models/levelUpdate';


function ApplicantDetails({setTogglee}) {




    const [openTaskModel, setOpenTaskModel] = useState(false)
    const [toggle, setToggle] = useState("ApplicantProfile")
    const [activeOption, setActiveOption] = useState('ApplicantProfile');


    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
            setOpenTaskModel(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const closeTaskPopup = () => {
        setOpenTaskModel(false);
    };




    const handleOptionClick = (option) => {
        setActiveOption(option);
        setToggle(option)
    };
    return (


        <div className='flex flex-col gap-6 relative '>
            <div className=' flex w-full gap-3 justify-between p-4  rounded-[16px] items-center bg-white' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <img onClick={()=>setTogglee(1)} className="w-[40px] cursor-pointer" src="/images/employer/icon_left.png" alt="" />
                <p className='text-[24px]  w-[100%] text-start flex justify-start font font-medium  '>Applicant Details</p>
            </div>

            <div className='flex gap-5 h-[68vh]  '>
                <div className=' rounded-[16px] py-2 flex flex-col  w-[32.26%] bg-white ' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                    <div className='flex flex-col overflow-y-auto gap-6 px-6 py-4' >
                        <div className=' flex  gap-6' >
                            <img src="/images/employer/profileNew.png" alt="" className="h-[96px] w-[96px]" />
                            <div className='w-[65%] flex flex-col gap-1'>
                                <p className='text-[24px]   text-start   font font-medium  '>John Doe</p>
                                <p className='text-[16px]   text-start text-[#646464]   font-normal  '>Product Designer</p>
                                <div className='flex gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M21.2831 8.27584L15.3323 7.411L12.6722 2.01803C12.5995 1.87037 12.48 1.75084 12.3323 1.67818C11.962 1.49537 11.512 1.64771 11.3268 2.01803L8.66668 7.411L2.7159 8.27584C2.55184 8.29928 2.40184 8.37662 2.28699 8.49381C2.14815 8.63651 2.07165 8.8285 2.07428 9.02758C2.07692 9.22666 2.15849 9.41655 2.30106 9.55553L6.60653 13.7532L5.58934 19.6805C5.56549 19.8184 5.58074 19.9602 5.63338 20.0899C5.68602 20.2195 5.77394 20.3318 5.88716 20.4141C6.00038 20.4963 6.13437 20.5452 6.27395 20.5551C6.41352 20.5651 6.5531 20.5357 6.67684 20.4704L11.9995 17.6719L17.3222 20.4704C17.4675 20.5477 17.6362 20.5735 17.7979 20.5454C18.2057 20.4751 18.48 20.0883 18.4097 19.6805L17.3925 13.7532L21.6979 9.55553C21.8151 9.44068 21.8925 9.29068 21.9159 9.12662C21.9792 8.71646 21.6932 8.33678 21.2831 8.27584Z" fill="#FFB836" />
                                    </svg>
                                    <p className='text-[16px]    font-normal '>4.0</p>
                                </div>
                            </div>

                        </div>

                        <div className='flex flex-col gap-2 rounded-[12px] p-4 bg-[#EFFAFF]' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                            <div className='flex justify-between'>
                                <p className='text-[16px] font-medium'>Applied Job</p>
                                <p className='text-[16px] font-normal text-[#646464]'>2 days ago</p>
                            </div>
                            <div className='h-[1px] bg-[#D6DDEB]'></div>
                            <div className='flex flex-col gap-1 text-[16px] font-normal'>
                                <p className=''>Product Development</p>
                                <div className='flex gap-2  items-center'>
                                    <p className=''>Marketing</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                        <circle cx="2" cy="2" r="2" fill="#333333" />
                                    </svg>
                                    <p className=''>Full-Time</p>

                                </div>
                            </div>

                        </div >
                        <div className='flex flex-col gap-2 rounded-[12px] p-4 bg-[#EFFAFF]' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                            <div className='flex justify-between'>
                                <p className=' text-[16px] font-normal'>Stage</p>
                                <div className='flex gap-2 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <circle cx="5" cy="5" r="5" fill="#26A4FF" />
                                    </svg>
                                    <p className=' text-[16px] font-medium text-[#26A4FF]'>In Review</p>
                                </div>
                            </div>
                            <div className='flex justify-between gap-[2px]'>
                                <div className='h-[11px] w-[25%] bg-[#26A4FF]'></div>
                                <div className='h-[11px] w-[25%] bg-[#D6DDEB]'></div>
                                <div className='h-[11px] w-[25%] bg-[#D6DDEB]'></div>
                                <div className='h-[11px] w-[25%] bg-[#D6DDEB]'></div>
                            </div>

                        </div >

                        <div className='flex gap-2'>
                            <div className='px-4 w-[84.65%] items-center flex justify-center py-3 text-[16px] font-medium text-[#06A9EF] rounded-[6px] border border-[#06A9EF]'>
                                Schedule Interview
                            </div>
                            <div className='p-3 w-[15.35%] items-center flex justify-center text-[16px] font-medium text-[#06A9EF] rounded-[6px] border border-[#06A9EF]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62183)">
                                        <path d="M6.25 13.75H13.75V12.25H6.25V13.75ZM6.25 10.75H17.75V9.25H6.25V10.75ZM6.25 7.74995H17.75V6.25H6.25V7.74995ZM2.5 21.0384V4.3077C2.5 3.80257 2.675 3.375 3.025 3.025C3.375 2.675 3.80257 2.5 4.3077 2.5H19.6923C20.1974 2.5 20.625 2.675 20.975 3.025C21.325 3.375 21.5 3.80257 21.5 4.3077V15.6923C21.5 16.1974 21.325 16.625 20.975 16.975C20.625 17.325 20.1974 17.5 19.6923 17.5H6.03845L2.5 21.0384ZM5.4 16H19.6923C19.7692 16 19.8397 15.9679 19.9038 15.9038C19.9679 15.8397 20 15.7692 20 15.6923V4.3077C20 4.23077 19.9679 4.16024 19.9038 4.09613C19.8397 4.03203 19.7692 3.99998 19.6923 3.99998H4.3077C4.23077 3.99998 4.16024 4.03203 4.09613 4.09613C4.03202 4.16024 3.99998 4.23077 3.99998 4.3077V17.3846L5.4 16Z" fill="#06A9EF" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className='h-[1px] bg-[#D6DDEB]'></div>
                        <div className='flex flex-col gap-4 text-[16px] font-normal'>
                            <p className='font-medium'>Contact</p>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62190)">
                                        <path d="M4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80257 21.5 6.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM12 12.5576L3.99998 7.44225V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V7.44225L12 12.5576ZM12 11L19.8461 5.99998H4.15383L12 11ZM3.99998 7.44225V5.99998V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H3.99998V7.44225Z" fill="#333333" />
                                    </g>
                                </svg>
                                <p>kshitijwaghmare111@gmail.com</p>
                            </div>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62195)">
                                        <path d="M19.4403 20.5C17.5557 20.5 15.6625 20.0618 13.7606 19.1855C11.8586 18.3092 10.1112 17.073 8.51828 15.4769C6.92533 13.8807 5.69071 12.1333 4.81442 10.2346C3.93814 8.33588 3.5 6.44423 3.5 4.55963C3.5 4.25688 3.6 4.00458 3.8 3.80275C4 3.60092 4.25 3.5 4.55 3.5H7.8115C8.06407 3.5 8.28683 3.58238 8.47977 3.74713C8.67272 3.91188 8.79548 4.1154 8.84803 4.3577L9.4211 7.29998C9.46085 7.57306 9.45252 7.80768 9.3961 8.00383C9.3397 8.19998 9.23842 8.36472 9.09225 8.49805L6.78265 10.7461C7.15445 11.4269 7.57913 12.0708 8.0567 12.6779C8.53427 13.2849 9.05125 13.8647 9.60765 14.4173C10.1564 14.966 10.7397 15.4756 11.3577 15.9462C11.9756 16.4167 12.6429 16.8545 13.3596 17.2596L15.6038 14.9962C15.7602 14.8333 15.9497 14.7192 16.1721 14.6539C16.3945 14.5885 16.6256 14.5724 16.8654 14.6058L19.6423 15.1712C19.8948 15.2378 20.1009 15.3667 20.2605 15.5577C20.4201 15.7487 20.5 15.9654 20.5 16.2077V19.45C20.5 19.75 20.399 20 20.1972 20.2C19.9954 20.4 19.7431 20.5 19.4403 20.5ZM6.07305 9.32693L7.85768 7.61923C7.88973 7.59358 7.91056 7.55832 7.92018 7.51345C7.92979 7.46857 7.92819 7.4269 7.91538 7.38845L7.48075 5.15383C7.46793 5.10254 7.4455 5.06408 7.41345 5.03845C7.3814 5.0128 7.33973 4.99998 7.28845 4.99998H5.14997C5.11152 4.99998 5.07948 5.0128 5.05383 5.03845C5.02818 5.06408 5.01535 5.09613 5.01535 5.1346C5.06663 5.81793 5.17849 6.51217 5.35092 7.2173C5.52337 7.92243 5.76408 8.62564 6.07305 9.32693ZM14.773 17.9692C15.4359 18.2782 16.1272 18.5144 16.8471 18.6779C17.567 18.8413 18.2397 18.9384 18.8654 18.9692C18.9038 18.9692 18.9359 18.9564 18.9615 18.9308C18.9872 18.9051 19 18.873 19 18.8346V16.7308C19 16.6795 18.9872 16.6378 18.9615 16.6057C18.9359 16.5737 18.8974 16.5512 18.8461 16.5384L16.7461 16.1115C16.7077 16.0987 16.674 16.0971 16.6452 16.1067C16.6163 16.1163 16.5859 16.1372 16.5538 16.1692L14.773 17.9692Z" fill="#333333" />
                                    </g>
                                </svg>
                                <p>87661234567</p>
                            </div>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62200)">
                                        <path d="M12.0029 11.8654C12.5005 11.8654 12.9258 11.6882 13.279 11.3339C13.6322 10.9795 13.8089 10.5536 13.8089 10.056C13.8089 9.55839 13.6317 9.133 13.2774 8.7798C12.923 8.4266 12.4971 8.25 11.9995 8.25C11.5019 8.25 11.0765 8.42717 10.7233 8.7815C10.3701 9.13583 10.1935 9.56179 10.1935 10.0594C10.1935 10.557 10.3707 10.9824 10.725 11.3356C11.0793 11.6888 11.5053 11.8654 12.0029 11.8654ZM12.0012 19.5135C13.9576 17.7622 15.4547 16.0824 16.4925 14.474C17.5303 12.8657 18.0492 11.457 18.0492 10.2481C18.0492 8.42498 17.4701 6.92627 16.3117 5.7519C15.1534 4.57753 13.7166 3.99035 12.0012 3.99035C10.2858 3.99035 8.84893 4.57753 7.6906 5.7519C6.53227 6.92627 5.9531 8.42498 5.9531 10.2481C5.9531 11.457 6.47201 12.8657 7.50983 14.474C8.54766 16.0824 10.0448 17.7622 12.0012 19.5135ZM12.0012 21.5096C9.48452 19.3288 7.59735 17.2993 6.33965 15.4211C5.08197 13.5429 4.45312 11.8186 4.45312 10.2481C4.45312 7.94038 5.1996 6.07213 6.69255 4.64328C8.18548 3.21443 9.95502 2.5 12.0012 2.5C14.0473 2.5 15.8169 3.21443 17.3098 4.64328C18.8027 6.07213 19.5492 7.94038 19.5492 10.2481C19.5492 11.8186 18.9204 13.5429 17.6627 15.4211C16.405 17.2993 14.5178 19.3288 12.0012 21.5096Z" fill="#333333" />
                                    </g>
                                </svg>
                                <p>Pune, Maharashtra, India</p>
                            </div>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62205)">
                                        <path d="M10.8077 16.5384H7.03845C5.78282 16.5384 4.7125 16.096 3.8275 15.2111C2.9425 14.3262 2.5 13.256 2.5 12.0005C2.5 10.745 2.9425 9.67467 3.8275 8.78942C4.7125 7.90417 5.78282 7.46155 7.03845 7.46155H10.8077V8.9615H7.03845C6.1987 8.9615 5.48235 9.25797 4.8894 9.85092C4.29645 10.4439 3.99998 11.1602 3.99998 12C3.99998 12.8397 4.29645 13.5561 4.8894 14.149C5.48235 14.742 6.1987 15.0384 7.03845 15.0384H10.8077V16.5384ZM8.25 12.7499V11.25H15.75V12.7499H8.25ZM13.1923 16.5384V15.0384H16.9615C17.8013 15.0384 18.5176 14.742 19.1106 14.149C19.7035 13.5561 20 12.8397 20 12C20 11.1602 19.7035 10.4439 19.1106 9.85092C18.5176 9.25797 17.8013 8.9615 16.9615 8.9615H13.1923V7.46155H16.9615C18.2171 7.46155 19.2875 7.90399 20.1725 8.78887C21.0575 9.67376 21.5 10.7439 21.5 11.9994C21.5 13.2549 21.0575 14.3253 20.1725 15.2105C19.2875 16.0958 18.2171 16.5384 16.9615 16.5384H13.1923Z" fill="#333333" />
                                    </g>
                                </svg>
                                <p>www.linkedin.com/in/kshitijw</p>
                            </div>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_4754_62210)">
                                        <path d="M4.3077 20.5C3.80257 20.5 3.375 20.325 3.025 19.975C2.675 19.625 2.5 19.1975 2.5 18.6923V8.30777C2.5 7.80264 2.675 7.37507 3.025 7.02507C3.375 6.67507 3.80257 6.50007 4.3077 6.50007H8.5V4.8078C8.5 4.30268 8.675 3.87512 9.025 3.52512C9.375 3.17512 9.80257 3.00012 10.3077 3.00012H13.6923C14.1974 3.00012 14.625 3.17512 14.975 3.52512C15.325 3.87512 15.5 4.30268 15.5 4.8078V6.50007H19.6923C20.1974 6.50007 20.625 6.67507 20.975 7.02507C21.325 7.37507 21.5 7.80264 21.5 8.30777V18.6923C21.5 19.1975 21.325 19.625 20.975 19.975C20.625 20.325 20.1974 20.5 19.6923 20.5H4.3077ZM9.99998 6.50007H14V4.8078C14 4.73086 13.9679 4.66035 13.9038 4.59625C13.8397 4.53213 13.7692 4.50007 13.6923 4.50007H10.3077C10.2308 4.50007 10.1602 4.53213 10.0961 4.59625C10.032 4.66035 9.99998 4.73086 9.99998 4.8078V6.50007ZM20 14.75H14.5V16.5H9.5V14.75H3.99998V18.6923C3.99998 18.7693 4.03202 18.8398 4.09613 18.9039C4.16024 18.968 4.23077 19 4.3077 19H19.6923C19.7692 19 19.8397 18.968 19.9038 18.9039C19.9679 18.8398 20 18.7693 20 18.6923V14.75ZM11 15H13V13H11V15ZM3.99998 13.2501H9.5V11.5001H14.5V13.2501H20V8.30777C20 8.23084 19.9679 8.16031 19.9038 8.0962C19.8397 8.0321 19.7692 8.00005 19.6923 8.00005H4.3077C4.23077 8.00005 4.16024 8.0321 4.09613 8.0962C4.03202 8.16031 3.99998 8.23084 3.99998 8.30777V13.2501Z" fill="#333333" />
                                    </g>
                                </svg>
                                <p>4 Years</p>
                            </div>

                        </div>

                    </div>
                </div>

                <div className=' rounded-[16px] py-2 flex flex-col  w-[66.17%] bg-white ' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                    <div className='flex flex-col  gap-4 px-6 py-4'>
                        <div className='flex flex-col '>
                            <div className='flex justify-between text-[16px] font-semibold'>
                                <div>
                                    <p
                                        className=" cursor-pointer"
                                        onClick={() => handleOptionClick('ApplicantProfile')}
                                    >
                                        Applicant Profile
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="138" height="4" viewBox="0 0 138 4" fill="none">
                                        <path d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z" fill={activeOption === 'ApplicantProfile' ? '#06A9EF' : 'white'} />
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        className="cursor-pointer"
                                        onClick={() => handleOptionClick('Resume')}
                                    >
                                        Resume
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="69" height="4" viewBox="0 0 69 4" fill="none">
                                        <path d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H64.5C66.7091 0 68.5 1.79086 68.5 4H0.5Z" fill={activeOption === 'Resume' ? '#06A9EF' : 'white'} />
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        className="cursor-pointer"
                                        onClick={() => handleOptionClick('HiringProgress')}
                                    >
                                        Hiring Progress
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="4" viewBox="0 0 138 4" fill="none">
                                        <path d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z" fill={activeOption === 'HiringProgress' ? '#06A9EF' : 'white'} />
                                    </svg>
                                </div>
                            </div>
                            <div className='h-[1px] bg-[#D6DDEB]'></div>
                        </div>
                    </div>
                    {toggle === "ApplicantProfile" &&
                        <div className='flex flex-col gap-4 text-[16px] font-normal px-6 overflow-y-auto'>
                            <p className='font-semibold'>Personal Info</p>
                            <div className='flex gap-6'>
                                <div className='flex flex-col gap-4 w-[50%]'>
                                    <div>
                                        <p className=' font-medium'>Full Name</p>
                                        <p>John Doe</p>
                                    </div>
                                    <div>
                                        <p className=' font-medium'>Address</p>
                                        <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-4 w-[50%]'>
                                    <div>
                                        <p className=' font-medium'>Gender</p>
                                        <p>Male</p>
                                    </div>
                                    <div>
                                        <p className=' font-medium'>Language</p>
                                        <p>English, French, Bahasa</p>
                                    </div>

                                </div>

                            </div>
                            <div className='h-[1px] bg-[#D6DDEB]'></div>

                            <div className='flex flex-col gap-4'>
                                <p className='font-semibold'>Professional Info</p>
                                <div className='flex flex-col gap-2 w-[80%]'>
                                    <p className=' font-medium'>About Me</p>
                                    <div className='flex flex-col gap-4'>
                                        <p>I’m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I’m passionate about designing digital products that have a positive impact on the world.</p>
                                        <p>For 10 years, I’ve specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.</p>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex flex-col gap-4 w-[30%] '>
                                        <div>
                                            <p className=' font-medium'>Current Job</p>
                                            <p>Product Designer</p>
                                        </div>
                                        <div>
                                            <p className=' font-medium'>Highest Qualification</p>
                                            <p>Bachelors in Engineering</p>
                                        </div>

                                    </div>
                                    <div className='flex flex-col gap-4 w-[70%]'>
                                        <div>
                                            <p className=' font-medium'>Experience in Years</p>
                                            <p>4 Years</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className=' font-medium'>Skills</p>
                                            <div className='flex gap-2 font-medium'>
                                                <p className='border border-[#06A9EF] rounded-[24px] px-4 py-3'>Product Design</p>
                                                <p className='border border-[#06A9EF] rounded-[24px] px-4 py-3'>User Research</p>
                                                <p className='border border-[#06A9EF] rounded-[24px] px-4 py-3'>Wireframing</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>
                    }
                    {toggle === "Resume" &&
                        <div className='flex justify-center overflow-y-auto  px-6'>
                            <img
                                src="/images/services/Resume-template-3.png"
                                className="h-[729px] w-[520px] rounded-[10px]"
                                alt=""
                            />
                        </div>
                    }
                    {toggle === "HiringProgress" &&
                        <div className='flex gap-4 overflow-y-auto  px-6'>
                            <div className='w-[24px]'> </div>
                            <div className='flex flex-col gap-4 w-full'>
                                <div className='flex gap-4 justify-between items-center  '>
                                    <p>Level 1</p>
                                    <div className='h-[1px] w-[92%] bg-[#D6DDEB]'></div>
                                </div>
                                <p className='text-[24px] font-medium'>Application Profile</p>
                                <div className='flex justify-between w-[80%]'>
                                    <div className='flex  flex-col gap-1'>
                                        <div className='flex gap-4 text-[16px] font-medium'>
                                            <p>Profile Score</p>
                                            <div className='flex gap-2 '>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21.2831 8.27584L15.3323 7.411L12.6722 2.01803C12.5995 1.87037 12.48 1.75084 12.3323 1.67818C11.962 1.49537 11.512 1.64771 11.3268 2.01803L8.66668 7.411L2.7159 8.27584C2.55184 8.29928 2.40184 8.37662 2.28699 8.49381C2.14815 8.63651 2.07165 8.8285 2.07428 9.02758C2.07692 9.22666 2.15849 9.41655 2.30106 9.55553L6.60653 13.7532L5.58934 19.6805C5.56549 19.8184 5.58074 19.9602 5.63338 20.0899C5.68602 20.2195 5.77394 20.3318 5.88716 20.4141C6.00038 20.4963 6.13437 20.5452 6.27395 20.5551C6.41352 20.5651 6.5531 20.5357 6.67684 20.4704L11.9995 17.6719L17.3222 20.4704C17.4675 20.5477 17.6362 20.5735 17.7979 20.5454C18.2057 20.4751 18.48 20.0883 18.4097 19.6805L17.3925 13.7532L21.6979 9.55553C21.8151 9.44068 21.8925 9.29068 21.9159 9.12662C21.9792 8.71646 21.6932 8.33678 21.2831 8.27584Z" fill="#FFB836" />
                                                </svg>
                                                <p className='font-normal'>4.0</p>
                                            </div>

                                        </div>
                                        <p className='text-[#0C8A0A] text-[16px] font-medium'>Verified</p>
                                    </div>
                                    <div className='flex  flex-col gap-1'>
                                        <div className='flex gap-4 text-[16px] font-medium'>
                                            <p>Assessment Score</p>
                                            <div className='flex gap-2 '>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21.2831 8.27584L15.3323 7.411L12.6722 2.01803C12.5995 1.87037 12.48 1.75084 12.3323 1.67818C11.962 1.49537 11.512 1.64771 11.3268 2.01803L8.66668 7.411L2.7159 8.27584C2.55184 8.29928 2.40184 8.37662 2.28699 8.49381C2.14815 8.63651 2.07165 8.8285 2.07428 9.02758C2.07692 9.22666 2.15849 9.41655 2.30106 9.55553L6.60653 13.7532L5.58934 19.6805C5.56549 19.8184 5.58074 19.9602 5.63338 20.0899C5.68602 20.2195 5.77394 20.3318 5.88716 20.4141C6.00038 20.4963 6.13437 20.5452 6.27395 20.5551C6.41352 20.5651 6.5531 20.5357 6.67684 20.4704L11.9995 17.6719L17.3222 20.4704C17.4675 20.5477 17.6362 20.5735 17.7979 20.5454C18.2057 20.4751 18.48 20.0883 18.4097 19.6805L17.3925 13.7532L21.6979 9.55553C21.8151 9.44068 21.8925 9.29068 21.9159 9.12662C21.9792 8.71646 21.6932 8.33678 21.2831 8.27584Z" fill="#FFB836" />
                                                </svg>
                                                <p className='font-normal'>4.0</p>
                                            </div>

                                        </div>
                                        <p className='text-[#0C8A0A] text-[16px] font-medium'>Verified</p>
                                    </div>
                                </div>
                                <button onClick={() => setOpenTaskModel(true)} className='px-9 py-3 bg-[#06A9EF] rounded-[12px] w-[233px] text-[16px] font-semibold text-white'>Move to Next Stage</button>

                            </div>
                        </div>
                    }

                    <AnimatePresence>
                        {openTaskModel && (
                            <>
                             <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{  duration: 0.5 }}
                                ref={taskRef}
                                className='absolute  z-[2000] right-[-1.2%] w-[60%] top-[-3%]'
                            >
                                <LevelUpdate closeTaskPopup={closeTaskPopup} />
                            </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>


        </div>
    )
}

export default ApplicantDetails
