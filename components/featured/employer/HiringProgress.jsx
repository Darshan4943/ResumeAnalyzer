import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import LevelUpdate from '../../models/levelUpdate';
import { DummyProfileSvg } from '../../../utils/svg';
import { formatInterviewDate } from '../../../utils/middleware';

function HiringProgress({ hiringData = [], jobDetails, successfull, setSuccessfull, taskSuccessfull, setTaskSuccessfull }) {
    console.log("Hiring Data:", jobDetails);

    const [openTaskModel, setOpenTaskModel] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);
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




    return (
        <div className='flex flex-col gap-6 overflow-y-auto scr1024:px-6 px-2 py-4'>
            {hiringData?.length > 0 ? (
                hiringData?.slice()?.reverse()?.map((level, index) => (

                    <React.Fragment key={level?._id}>
                        {level?.level === 1 ? (
                            // Design for Level 1
                            <div className='flex gap-4'>
                                <div className='w-[24px]'></div>
                                <div className='flex flex-col gap-4 w-full'>
                                    <div className='flex gap-4 justify-between items-center'>
                                        <p className='min-w-[70px] text-[16px] font-medium'>Level {level?.level}</p>
                                        <div className='h-[1px] w-[90%] bg-[#D6DDEB]'></div>
                                    </div>
                                    <p className='text-[18px] font-semibold'>{level?.title}</p>
                                    <div className='flex scr1150:flex-row flex-col justify-between gap-4 w-[80%]'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex gap-4 text-[16px] font-medium'>
                                                <p>Profile Score</p>
                                                <div className='flex gap-1 items-center'>
                                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.6887 5.52032L10.7215 4.94376L8.9481 1.34844C8.89966 1.25001 8.81998 1.17032 8.72154 1.12188C8.47466 1.00001 8.17466 1.10157 8.05123 1.34844L6.27779 4.94376L2.3106 5.52032C2.20123 5.53594 2.10123 5.58751 2.02466 5.66563C1.9321 5.76077 1.8811 5.88876 1.88286 6.02148C1.88461 6.1542 1.93899 6.28079 2.03404 6.37344L4.90435 9.17188L4.22623 13.1234C4.21032 13.2154 4.2205 13.3099 4.25559 13.3963C4.29068 13.4828 4.34929 13.5576 4.42477 13.6125C4.50025 13.6673 4.58958 13.6999 4.68263 13.7065C4.77568 13.7131 4.86873 13.6936 4.95123 13.65L8.49966 11.7844L12.0481 13.65C12.145 13.7016 12.2575 13.7188 12.3653 13.7C12.6372 13.6531 12.82 13.3953 12.7731 13.1234L12.095 9.17188L14.9653 6.37344C15.0434 6.29688 15.095 6.19688 15.1106 6.08751C15.1528 5.81407 14.9622 5.56094 14.6887 5.52032Z" fill="#FFB836" />
                                                    </svg>
                                                    <p className='font-normal'>{jobDetails?.matchingPercentage/20}</p>
                                                </div>

                                            </div>
                                            <p className={`text-[14px] font-medium text-[#0C8A0A]`}>Verified</p>
                                        </div>
                                    </div>
                                    {index === 0 &&
                                        <button
                                            onClick={() => {
                                                setSelectedLevel(level);
                                                setOpenTaskModel(true);
                                            }}
                                            className='px-9 py-3 bg-[#06A9EF] rounded-[30px] min-w-[209px] w-[210px] text-[14px] font-semibold text-white'
                                        >
                                            Move to Next Level
                                        </button>
                                    }
                                </div>
                            </div>
                        ) : (
                            // Design for other levels
                            <div className='flex gap-4'>
                                <div className='w-[24px]'></div>
                                <div className='flex flex-col gap-4 w-full'>
                                    <div className='flex gap-4 justify-between items-center'>
                                        <p className='min-w-[80px] text-[16px] font-medium'>Level {level?.level}</p>
                                        <div className='h-[1px] w-[90%] bg-[#D6DDEB]'></div>
                                    </div>
                                    <div className='flex gap-8 w-full'>
                                        <div className='flex gap-4 flex-col w-[40%]'>
                                            <p className='text-[18px] font-semibold'>{level?.title}</p>
                                            {level?.interviewDate &&
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[14px] font-normal'>Interview Date</p>
                                                    <div>{formatInterviewDate(level?.interviewDate)}</div>
                                                </div>
                                            }
                                            {(!level?.isOnline && level?.isInterview) && (
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[14px] font-normal'>Interview Location</p>
                                                    <div>{level?.interviewLocation}</div>
                                                </div>
                                            )}
                                             {level?.assignOn && level?.isTask &&
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[14px] font-normal'>Assign On</p>
                                                    <div>{formatInterviewDate(level?.assignOn)}</div>
                                                </div>
                                            }

                                            {(level?.status === "Conducted" || level?.status === "Completed") && (
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[16px] font-normal'>{level?.isTask ? "Reviewer" : "Conducted by"}</p>
                                                    <div className='flex gap-4 flex-wrap'>
                                                        {(level?.isTask ? level?.taskReviewer : level?.interviewer)?.map((assignee, i) => (
                                                            <div key={i} className='flex gap-2'>
                                                                <DummyProfileSvg />
                                                                <div className='flex flex-col'>
                                                                    <p className='text-[14px] font-medium'>{assignee.name}</p>
                                                                    <p className='text-[12px] font-normal text-[#646464]'>{assignee.role}</p>
                                                                    <p className='text-[12px] font-normal text-[#646464]'>{assignee.email}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                           

                                            {index === 0 &&
                                                <button
                                                    onClick={() => {
                                                        setSelectedLevel(level);
                                                        setOpenTaskModel(true);
                                                    }}
                                                    className='px-9 py-3 bg-[#06A9EF] rounded-[30px] min-w-[209px] w-[210px] text-[14px] font-semibold text-white'
                                                >
                                                    Move to Next Level
                                                </button>
                                            }
                                        </div>
                                        <div className='w-[60%] flex flex-col gap-4'>
                                            <div className='flex flex-col gap-2'>
                                                <p className='text-[#646464] text-[14px] font-normal'>{level?.isTask ? "Task" : "Interview"} Status</p>
                                                <div className={`px-[10px] py-[3px] rounded-[80px] w-fit ${level?.status === "Pending" ? "text-[#FFB836] bg-[#EB85331A]" : (level?.status === "Conducted" || level?.status === "Completed") ? "text-[#0C8A0A] bg-[#E2FFE1]" : "text-[#FF6550] bg-[#FF65501A]"}`}>
                                                    {level?.status === "Pending" ? "In Progress" : level?.status}
                                                </div>
                                            </div>

                                            {(level?.status !== "Conducted" && level?.status !== "Completed") && (
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[16px] font-normal'>{level?.isTask ? "Task Reviewer" : "Assign To"}</p>
                                                    <div className='flex gap-4 flex-wrap'>
                                                        {(level?.isTask ? level?.taskReviewer : level?.interviewer)?.map((assignee, i) => (
                                                            <div key={i} className='flex gap-2'>
                                                                <DummyProfileSvg />
                                                                <div className='flex flex-col'>
                                                                    <p className='text-[14px] font-medium'>{assignee.name}</p>
                                                                    <p className='text-[12px] font-normal text-[#646464]'>{assignee.role}</p>
                                                                    <p className='text-[12px] font-normal text-[#646464]'>{assignee.email}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {level?.score &&
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[#646464] text-[14px] font-normal'>{level?.isTask ? "Task" : "Interview"} Score</p>
                                                    <div className="flex gap-2 items-center">
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.6887 5.52032L10.7215 4.94376L8.9481 1.34844C8.89966 1.25001 8.81998 1.17032 8.72154 1.12188C8.47466 1.00001 8.17466 1.10157 8.05123 1.34844L6.27779 4.94376L2.3106 5.52032C2.20123 5.53594 2.10123 5.58751 2.02466 5.66563C1.9321 5.76077 1.8811 5.88876 1.88286 6.02148C1.88461 6.1542 1.93899 6.28079 2.03404 6.37344L4.90435 9.17188L4.22623 13.1234C4.21032 13.2154 4.2205 13.3099 4.25559 13.3963C4.29068 13.4828 4.34929 13.5576 4.42477 13.6125C4.50025 13.6673 4.58958 13.6999 4.68263 13.7065C4.77568 13.7131 4.86873 13.6936 4.95123 13.65L8.49966 11.7844L12.0481 13.65C12.145 13.7016 12.2575 13.7188 12.3653 13.7C12.6372 13.6531 12.82 13.3953 12.7731 13.1234L12.095 9.17188L14.9653 6.37344C15.0434 6.29688 15.095 6.19688 15.1106 6.08751C15.1528 5.81407 14.9622 5.56094 14.6887 5.52032Z" fill="#FFB836" />
                                                        </svg>
                                                        {level?.score}
                                                    </div>
                                                </div>
                                            }

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))
            ) : (
                <p>No hiring data available</p>
            )}

            <AnimatePresence>
                {openTaskModel && selectedLevel && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        ref={taskRef}
                        className='fixed z-[10100] right-0 scr1200:max-w-[60%] scr1200:w-[60%] ml:w-[80%] w-[100%]  ml:top-0 ml:bottom-[0%]'
                    >
                        <LevelUpdate closeTaskPopup={closeTaskPopup} setSuccessfull={setSuccessfull} setTaskSuccessfull={setTaskSuccessfull} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} jobDetails={jobDetails} />
                    </motion.div>
                )}
            </AnimatePresence>


            {(successfull || taskSuccessfull) && (
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
                        <div className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                            <div className="text-center">
                                <div className="text-[24px] font-[500] text-[#333]">
                                    {successfull ? "Interview" : "Task"} Scheduled Successfully
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => { setSuccessfull(false); setTaskSuccessfull(false); }}
                                    className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HiringProgress;
