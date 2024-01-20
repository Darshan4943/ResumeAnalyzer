import React, { useState } from 'react'
import TextEditor from '../common/textEditor'
import ScheduleInterview from './ScheduleInterview';
import { motion, AnimatePresence } from 'framer-motion';

function LevelUpdate({ closeTaskPopup }) {
    const [isNextLevel, setIsNextLevel] = useState("nextLevel")
    const [showScheduleInterview, setShowScheduleInterview] = useState(false);

    const handleRadioChange = (value) => {
        if (value === 'scheduleInterview') {
            setShowScheduleInterview(true);
        } else {
            setShowScheduleInterview(false);
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

    return (
        <div className='p-6 rounded-tl-[16px] h-[87vh] bg-white flex flex-col gap-4 overflow-y-auto' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className='flex gap-4 justify-between items-center  '>
                <p className='text-[24px] font-medium'>Level 1</p>
                <div className='h-[1px] w-[81%] bg-[#D6DDEB]'></div>
            </div>
            <p className='text-[24px] font-medium'>Technical Round-II</p>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p className='text-[20px] font-medium'>Interview Status</p>
                        <p className='text-[12px] font-normal'>Change Interview Status of the Candidate</p>
                    </div>
                    <select
                        className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
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
                        class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px] font-[400]"
                    />

                </div>

            </div>
            <div className='flex justify-between'>
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
            <div className='flex flex-col gap-2'>
                <p className='text-[20px] font-medium'>Add Comment</p>
                <div>
                    {/* <TextEditor /> */}
                </div>
            </div>
            <div className='h-[1px] bg-[#D6DDEB]'></div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between text-[18px] font-semibold'>
                    <div className="flex gap-[8px] items-center  ">
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="nextLevel"
                            className="h-[20px] w-[20px] custom-radio"
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
                            className="h-[20px] w-[20px] custom-radio"
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
                            className="h-[20px] w-[20px] custom-radio"
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
                                className="px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                            />

                        </div>


                        <div className='flex justify-between text-[16px] w-[55%] font-medium'>
                            <div className="flex gap-[8px] items-center  ">
                                <input
                                    type="radio"
                                    name="AssigneTask"
                                    value='scheduleInterview'
                                    className="h-[20px] w-[20px] custom-radio"
                                    onChange={(e) => handleRadioChange(e.target.value)}
                                />

                                <label className=" ">Schedule Interview</label>
                            </div>
                            <div className="flex gap-[8px] items-center  ">
                                <input
                                    type="radio"
                                    name="AssigneTask"

                                    className="h-[20px] w-[20px] custom-radio"

                                />
                                <label className=" ">Assign Task</label>
                            </div>


                        </div>
                        <div className='h-[1px] bg-[#D6DDEB]'></div>
                    </>
                }

                <div className='flex gap-4 justify-end pb-[1rem]'>
                    <button onClick={closeTaskPopup} className='px-9 py-3 border border-[#06A9EF] rounded-[12px]  text-[16px] font-semibold' id='button'>Cancel</button>
                    <button className='px-9 py-3 bg-[#06A9EF] rounded-[12px] text-[16px] font-semibold text-white'>Save</button>
                </div>

            </div>

            <AnimatePresence>
                {showScheduleInterview && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        // ref={taskRef}
                        className='absolute z-20 right-0 w-[100%] top-[0]'
                    >
                        <ScheduleInterview closeTaskPopup={closeTaskPopup} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default LevelUpdate
