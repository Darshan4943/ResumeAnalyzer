import React, { useEffect, useState } from 'react'


import { motion, AnimatePresence } from 'framer-motion';
import ScheduleTask from './ScheduleTask';
import ScheduleInterview from './ScheduleInterview';
import { DummyProfileSvg } from '../../utils/svg';
import axios from 'axios';
import { formatInterviewDate } from '../../utils/middleware';
import { toast } from 'react-toastify';


function LevelUpdate({ closeTaskPopup, setSuccessfull, setTaskSuccessfull, selectedLevel, setSelectedLevel, jobDetails }) {

    const [isNextLevel, setIsNextLevel] = useState("")
    const [showScheduleInterview, setShowScheduleInterview] = useState(false);
    const [showAssignTask, setShowAssignTask] = useState(false);
    const [error, setError] = useState();
    const [currenStatus, setCurrenStatus] = useState()
    const handleStarClick = (starIndex) => {
        setSelectedLevel({ ...selectedLevel, score: starIndex + 1 });
    };
    const [selectedValues, setSelectedValues] = useState({});
    useEffect(() => {
        setCurrenStatus(selectedLevel.status)
    }, [])
    
    const submitDetails = async () => {
        if (selectedLevel.status === currenStatus) {
            setError("Status Should Be Changed")
            return;
        }

        if (isNextLevel === "nextLevel") {
            if (!selectedValues.title) {
                setError("Title is Reuired")
                return;
            }
            if (selectedValues.isInterview && !showScheduleInterview) {
                setShowScheduleInterview(true);
                return;
            }

            if (selectedValues.isTask && !showAssignTask) {
                setShowAssignTask(true);
                return;
            }
            if (!showScheduleInterview && !showAssignTask) {
                setError("Select Option")
                return;
            }
        }





        try {
            const response = await axios.put(
                `http://localhost:2000/api/job/hiringLevelUpdate/${jobDetails?.applicantId}/${jobDetails?.jobId}`,
                {
                    selectedValues: {
                        level: selectedLevel.level + 1,
                        assignTo: selectedValues.assignTo,
                        duration: selectedValues.duration,
                        interviewDate: selectedValues.interviewDate,
                        interviewLocation: selectedValues.interviewLocation,
                        isInterview: selectedValues.isInterview,
                        isOnline: selectedValues.isOnline,
                        meetingLink: selectedValues.meetingLink,
                        startAmPm: selectedValues.startAmPm,
                        startTime: selectedValues.startTime,
                        status: selectedValues.status,
                        title: selectedValues.title,
                    },
                    selectedLevel: {
                        level: selectedLevel.level,
                        status: selectedLevel.status,
                        score: selectedLevel.score,
                        comment: selectedLevel.comment,
                    },
                    isNextLevel,
                }
            );

            if (response.data.success) {
                console.log("Details updated successfully");
                setTaskSuccessfull(true);
            }
        } catch (error) {
            console.error("Error updating application details:", error);
        }
    };


    const handleRadioChange = (value) => {
        setError("")
        if (value === 'scheduleInterview') {

            setSelectedValues({ ...selectedValues, isInterview: true, isTask: false })
        } else {
            setSelectedValues({ ...selectedValues, isTask: true, isInterview: false })

        }
    };
    const handleIsNextLevel = (value) => {
        setIsNextLevel(value)

    };


    const handleStatusChange = (value) => {
        setError("")
       
        setSelectedLevel((prevValues) => ({ ...prevValues, status: value }));
    };

    const handleDateChange = (e) => {
        setSelectedValues((prevValues) => ({ ...prevValues, date: e.target.value }));
    };

    const handleLevelTitleChange = (e) => {
        setError("")
        setSelectedValues((prevValues) => ({ ...prevValues, title: e.target.value }));
    };



    return (
        <div className='sm:p-6 p-2 rounded-tl-[16px] h-[100vh] bg-white flex flex-col gap-4 overflow-y-auto w-full ' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className='flex gap-4 justify-between items-center w-full  '>
                <p className='text-[24px] font-medium min-w-[100px]'>Level {selectedLevel?.level}</p>
                <div className='h-[1px] w-full bg-[#D6DDEB]'></div>
            </div>
            <p className='text-[24px] font-medium'>{selectedLevel?.title}</p>
            <div className='min-h-[1px] w-full bg-[#D6DDEB]'></div>
            {selectedLevel?.level !== 1 &&
                <div className='flex ms:flex-row flex-col gap-4 justify-between'>
                    <div className='flex flex-col gap-4 w-[30%]'>
                        <div>
                            <p className='text-[20px] font-medium'>Interview Status</p>
                            <p className='text-[12px] font-normal'>Change Interview Status of the Candidate</p>
                        </div>

                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px]  font-[400]"
                            value={selectedLevel?.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            <option value="" disabled selected>Select </option>
                            <option value="Pending">In Progress</option>
                            <option value="Conducted">Conducted</option>
                            <option value="Cancelled">Cancelled</option>

                        </select>
                    </div>
                    <div className='flex flex-col gap-2 w-[30%]'>

                        <p className='text-[20px] font-medium'>Interview Date</p>


                        <div>{formatInterviewDate(selectedLevel?.interviewDate)}</div>

                    </div>

                </div>
            }
            {selectedLevel?.level !== 1 &&
                <div className='flex ms:flex-row flex-col gap-4 justify-between'>
                    {selectedLevel?.assignTo?.length > 0 &&
                        < div className='flex flex-col gap-2'>

                            <p className='text-[20px] font-medium'>Conducted By</p>
                            <div className='flex  gap-2 flex-wrap'>
                                {selectedLevel?.assignTo?.map((person, index) => (
                                    <div key={index} className='flex gap-2'>
                                        <DummyProfileSvg />
                                        <div>
                                            <p className='text-[14px] font-medium'>{person.name}</p>
                                            <p className='text-[12px] font-normal text-[#646464]'>{person.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div className='flex flex-col gap-2 w-[30%]'>
                        <div>
                            <p className='text-[20px] font-medium'>Interview Score</p>
                            <p className='text-[12px] font-normal'>rate candidate from scale of 1 to 5</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={
                                        index < selectedLevel?.score
                                            ? "/images/services/Star.png"
                                            : "/images/services/Star1.png"
                                    }
                                    alt=""
                                    className="h-[30px] w-[30px] cursor-pointer"
                                    onClick={() => handleStarClick(index)}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            }
            <div className='flex flex-col w-full gap-2'>
                <p className='text-[20px] font-medium'>Add Comment</p>
                <div>
                    {/* <TextEditor /> */}
                    <input
                        type="text"
                        placeholder="Add Comment"
                        className="px-[16px] w-full py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                        value={selectedLevel?.comment || ""}
                        onChange={(e) => setSelectedLevel({ ...selectedLevel, comment: e.target.value })}
                    />

                </div>
            </div>
            <div className='h-[1px] bg-[#D6DDEB]'></div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between ms:flex-row flex-col gap-4 text-[14px] font-semibold'>
                    <div className="flex gap-[8px] items-center  ">
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="nextLevel"
                            className="h-[20px] w-[20px] custom-radio cursor-pointer "
                            onChange={(e) => handleIsNextLevel(e.target.value)}
                            checked={isNextLevel === "nextLevel"}
                        />

                        <label className=" ">Move to next Level</label>
                    </div>
                    <div className="flex gap-[8px] items-center  ">
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="shotListed"
                            className="h-[20px] w-[20px] custom-radio cursor-pointer "
                            onChange={(e) => handleIsNextLevel(e.target.value)}
                            checked={isNextLevel === "shotListed"}
                        />
                        <label className="text-[#0C8A0A] ">Shortlist Candidate</label>
                    </div>
                    <div className="flex gap-[8px] items-center  ">
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="rejected"
                            className="h-[20px] w-[20px] custom-radio cursor-pointer "
                            onChange={(e) => handleIsNextLevel(e.target.value)}
                            checked={isNextLevel === "rejected"}
                        />
                        <label className="text-[#C00000]">Reject Candidate</label>
                    </div>

                </div>
                {isNextLevel === "nextLevel" &&
                    <>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[16px] font-medium'  >Level Title</p>
                            <input
                                type="text"
                                placeholder="Eg: Technical Round-I"
                                className="px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px]  font-[400]"
                                value={selectedValues.title}
                                onChange={(e) => handleLevelTitleChange(e)}
                            />

                        </div>


                        <div className='flex justify-between ms:flex-row flex-col gap-4 text-[16px] ms:w-[55%] font-medium'>
                            <div className="flex gap-[8px] items-center  ">
                                <input
                                    type="radio"
                                    name="AssigneTask"
                                    value='scheduleInterview'
                                    className="h-[20px] w-[20px] custom-radio cursor-pointer"
                                    onChange={(e) => handleRadioChange(e.target.value)}
                                />

                                <label className=" ">Schedule Interview</label>
                            </div>
                            <div className="flex gap-[8px] items-center ">
                                <input
                                    type="radio"
                                    name="AssigneTask"
                                    value='assignTask'
                                    className="h-[20px] w-[20px] custom-radio cursor-pointer "
                                    onChange={(e) => handleRadioChange(e.target.value)}
                                />
                                <label className=" ">Assign Task</label>
                            </div>


                        </div>
                        <div className='h-[1px] bg-[#D6DDEB]'></div>
                    </>
                }
                <div className='w-full flex justify-end text-red text-[14px] font-medium'>{error}</div>
                <div className='flex gap-4 justify-end py-[1rem]'>
                    <button onClick={closeTaskPopup} className='w-[106px] h-[42px] border border-[#06A9EF] rounded-[30px] flex justify-center items-center  text-[16px] font-semibold' id='button'>Cancel</button>
                    <button onClick={submitDetails} className='h-[42px] w-[106px] bg-[#06A9EF] rounded-[30px] flex justify-center items-center text-[16px] font-semibold text-white'>Save</button>
                </div>



            </div>

            <AnimatePresence>
                {showScheduleInterview && (
                    <div>

                        <div className="fixed z-[2500] top-[-100] left-[-100] right-[-100] bottom-[-100] w-[200%] bg-black opacity-60"></div>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                            // ref={taskRef}
                            className='absolute z-[2500] right-0 w-[100%] top-[0]'
                        >
                            <ScheduleInterview setShowScheduleInterview={setShowScheduleInterview} setSuccessfull={setSuccessfull} selectedValues={selectedValues} setSelectedValues={setSelectedValues} submitDetails={submitDetails} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showAssignTask && (
                    <div>

                        <div className="fixed z-[2500] top-[-100] left-[-100] right-[-100] bottom-[-100] w-[200%] bg-black opacity-60"></div>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                            // ref={taskRef}
                            className='absolute z-[2500] right-0 w-[100%] top-[0]'
                        >
                            <ScheduleTask setShowAssignTask={setShowAssignTask} setTaskSuccessfull={setTaskSuccessfull} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


        </div >
    )
}

export default LevelUpdate
