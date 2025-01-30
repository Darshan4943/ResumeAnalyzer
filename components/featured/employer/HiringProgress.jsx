
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import LevelUpdate from '../../models/levelUpdate';

function HiringProgress() {

    const [openTaskModel, setOpenTaskModel] = useState(false)
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
    const [successfull, setSuccessfull] = useState(false)
    const [taskSuccessfull, setTaskSuccessfull] = useState(false)
    return (
        <>
            <div className='flex gap-4 overflow-y-auto scr1024:px-6 px-2 '>
                <div className='w-[24px]'>
                    
                     </div>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex gap-4 justify-between items-center  '>
                        <p className='min-w-[60px]'>Level 1</p>
                        <div className='h-[1px] w-[90%] bg-[#D6DDEB]'></div>
                    </div>
                    <p className='text-[18px] font-semibold'>Application Profile</p>
                    <div className='flex scr1150:flex-row flex-col justify-between gap-4 w-[80%]'>
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
                            <p className='text-[#0C8A0A] text-[14px] font-medium'>Verified</p>
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
                            <p className='text-[#0C8A0A] text-[14px] font-medium'>Verified</p>
                        </div>
                    </div>
                    <button onClick={() => setOpenTaskModel(true)} className='px-9 py-3 bg-[#06A9EF] rounded-[30px] min-w-[240px] w-[30%] text-[16px] font-semibold text-white'>Move to Next Stage</button>

                </div>
            </div>

            <AnimatePresence>
                {openTaskModel && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        ref={taskRef}
                        className='absolute z-10 right-[-1.5%] scr1200:max-w-[60%] scr1200:w-[60%] ml:w-[80%] w-[100%]  ml:top-[-2%] ml:bottom-[0%] '
                    >
                        <LevelUpdate closeTaskPopup={closeTaskPopup} setSuccessfull={setSuccessfull} setTaskSuccessfull={setTaskSuccessfull} />
                    </motion.div>
                )} 
            </AnimatePresence>

            {(successfull || taskSuccessfull) && (
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                        <div
                            className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
                            style={{
                                boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <svg
                                className="absolute top-[-30px]  left-[38%] right-[62%] flex"
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
                                    {successfull ? " Interview" : "Task"} {" "}Scheduled Successfully
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => { setSuccessfull(false); setTaskSuccessfull(false) }}
                                    className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HiringProgress