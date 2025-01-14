import React, { useState } from 'react'


import { motion, AnimatePresence } from 'framer-motion';
import ScheduleTask from './ScheduleTask';
import ScheduleInterview from './ScheduleInterview';


function LevelUpdate({ closeTaskPopup, setSuccessfull, setTaskSuccessfull }) {
    const [isNextLevel, setIsNextLevel] = useState("nextLevel")
    const [showScheduleInterview, setShowScheduleInterview] = useState(false);
    const [showAssignTask, setShowAssignTask] = useState(false);


    const handleRadioChange = (value) => {
        if (value === 'scheduleInterview') {
            setShowScheduleInterview(true);
        } else {
            setShowAssignTask(true);
        }
    };
    const handleIsNextLevel = (value) => {
        setIsNextLevel(value)
    };

    const renderStars = () => {
        const rating = 4
        const fullStarsCount = Math.floor(rating);
        const remainingStars = 5 - fullStarsCount;


        const starImages = [];


        for (let i = 0; i < fullStarsCount; i++) {
            starImages.push(
                <img
                    key={`star_${i}`}
                    src="/images/employer/Star.png"
                    alt=""
                    className="h-[30px] w-[30px]"
                />
            );
        }

        for (let j = 0; j < remainingStars; j++) {
            starImages.push(
                <img
                    key={`empty_star_${j}`}
                    src="/images/employer/Star1.png"
                    alt=""
                    className="h-[30px] w-[30px]"
                />
            );
        }

        return starImages;
    };
    const [levelData, setLevelData] = useState([]);



    const handleSave = () => {

        const newLevelData = [...levelData, { ...selectedValues, isNextLevel }];


        setLevelData(newLevelData);


        setSelectedValues({
            status: "",
            date: "",
            levelTitle: "",




        });


        console.log('Level Data:', newLevelData);
        closeTaskPopup()
    };

    const [selectedValues, setSelectedValues] = useState({
        status: "",
        date: "",
        levelTitle: "",
    });


    const handleStatusChange = (value) => {
        setSelectedValues((prevValues) => ({ ...prevValues, status: value }));
    };

    const handleDateChange = (e) => {
        setSelectedValues((prevValues) => ({ ...prevValues, date: e.target.value }));
    };

    const handleLevelTitleChange = (e) => {
        setSelectedValues((prevValues) => ({ ...prevValues, levelTitle: e.target.value }));
    };



    return (
        <div className='sm:p-6 p-2 rounded-tl-[16px] h-[85vh] bg-white flex flex-col gap-4 overflow-y-auto ' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className='flex gap-4 justify-between items-center  '>
                <p className='text-[24px] font-medium min-w-[80px]'>Level 1</p>
                <div className='h-[1px] w-[81%] bg-[#D6DDEB]'></div>
            </div>
            <p className='text-[24px] font-medium'>Technical Round-II</p>
            <div className='flex ms:flex-row flex-col gap-4 justify-between'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p className='text-[20px] font-medium'>Interview Status</p>
                        <p className='text-[12px] font-normal'>Change Interview Status of the Candidate</p>
                    </div>

                    <select
                        className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px]  font-[400]"
                        value={selectedValues.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                    >
                        <option value="" disabled selected>Select </option>
                        <option value="product_manager">In Progress</option>
                        <option value="developer">Conducted</option>

                    </select>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p className='text-[20px] font-medium'>Interview Date</p>
                        <p className='text-[12px] font-normal'>Select date of Interview conducted</p>
                    </div>
                    <input
                        type="date"
                        placeholder='Select Date'
                        class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                        value={selectedValues.date}
                        onChange={(e) => handleDateChange(e)}
                    />

                </div>

            </div>
            <div className='flex ms:flex-row flex-col gap-4 justify-between'>
                <div className='flex flex-col gap-2'>

                    <p className='text-[20px] font-medium'>Conducted By</p>
                    <div className='flex gap-2'>
                        <img src="/images/employer/profileNew.png" alt="" className="h-[40px] w-[40px]" />
                        <div>
                            <p className='text-[14px] font-medium'>Kathryn Murphy</p>
                            <p className='text-[12px] font-normal text-[#646464]'>Manager</p>
                        </div>

                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <p className='text-[20px] font-medium'>Interview Score</p>
                        <p className='text-[12px] font-normal'>rate candidate from scale of 1 to 5</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {renderStars().map((star, index) => (
                            <React.Fragment key={index}>{star}</React.Fragment>
                        ))}
                    </div>

                </div>

            </div>
            <div className='flex flex-col w-full gap-2'>
                <p className='text-[20px] font-medium'>Add Comment</p>
                <div>
                    {/* <TextEditor /> */}
                    <input
                        type="input"
                        placeholder='Add Comment'
                        class=" px-[16px] w-full py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                        value=""

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
                                value={selectedValues.levelTitle}
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

                <div className='flex gap-4 justify-end pb-[1rem]'>
                    <button onClick={closeTaskPopup} className='px-9 py-3 border border-[#06A9EF] rounded-[12px]  text-[16px] font-semibold' id='button'>Cancel</button>
                    <button onClick={handleSave} className='px-9 py-3 bg-[#06A9EF] rounded-[12px] text-[16px] font-semibold text-white'>Save</button>
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
                            <ScheduleInterview setShowScheduleInterview={setShowScheduleInterview} setSuccessfull={setSuccessfull} />
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


        </div>
    )
}

export default LevelUpdate
