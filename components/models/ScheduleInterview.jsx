import { useRouter } from 'next/router';
import React, { useState } from 'react'

function ScheduleInterview({ setShowScheduleInterview,setSuccessfull }) {
    const [levels, setLevels] = useState([{ id: 1, name: 'Interviewer 1' }]);
    const [showApprovalChain, setShowApprovalChain] = useState(false);
    const [approvalChoice, setApprovalChoice] = useState(null);

    const addLevel = () => {
        const newLevel = { id: levels.length + 1, name: `Interviewer ${levels.length + 1}` };
        setLevels([...levels, newLevel]);
    };

    const deleteLevel = (id) => {
        if (id === 1) return;
        const updatedLevels = levels.filter((level) => level.id !== id);
        setLevels(updatedLevels);
    };
    const router = useRouter()

    const [toggle, setToggle] = useState("ApplicantProfile")
    const [activeOption, setActiveOption] = useState('Candidate');

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setToggle(option)
    };
   
    return (
        <div className='sm:p-6 p-2 rounded-tl-[16px] h-[87vh] bg-white flex flex-col gap-4 overflow-y-auto' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className='text-[24px] font-medium'>Schedule Interview</div>
            <div className='flex flex-col gap-2 text-[14px] font-medium '>
                <p>What will be the mode of Interview?</p>
                <div className="flex gap-[8px] items-center">
                    <input
                        type="radio"
                        name="approvalChoice"
                        value="yes"
                        className="h-[20px] w-[20px] custom-radio cursor-pointer"
                        // onChange={(e) => handleApprovalChoice(e.target.value)}
                        checked
                    />
                    <label className="text-[14px] font-medium">Online</label>
                    <input
                        type="radio"
                        name="approvalChoice"
                        value="no"
                        className="h-[20px] w-[20px] custom-radio cursor-pointer"
                    // onChange={(e) => handleApprovalChoice(e.target.value)}
                    />
                    <label className="text-[14px] font-medium">Offline</label>
                </div>

            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-[20px] font-medium'>Assigned to</p>
                <div className="flex gap-4  w-full">
                    <div className=" mt-1">
                        {levels.map((level, index) => (
                            <div key={level.id}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" style={{ animationDelay: '1s' }} className="level">
                                    <circle cx="8" cy="8.5" r="8" fill="#CBEFFF" />
                                    <circle cx="8" cy="8.5" r="4" fill="#06A9EF" />
                                </svg>
                                {index !== levels.length - 1 && (
                                    <div className="connector-line mt-[-2px] mb-[-3px]">

                                        <img
                                            className="moving-line1"
                                            style={{
                                                height: "0px",
                                                width: "3px",
                                                marginLeft: "0.44rem",

                                            }}
                                            src="/images/employer/tracker_line.png"
                                            alt="Line 1"
                                        />

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-[91.5%] flex flex-col gap-4">
                        {levels.map((level) => (
                            <div className="flex flex-col gap-[8px] sm:w-[75%] w-[95%] level" key={level.id}>
                                <div className="flex gap-2 justify-between">
                                    <p>{level.name}</p>
                                    {level.id !== 1 && (
                                        <svg
                                            className="delete-level"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            onClick={() => deleteLevel(level.id)}
                                        >
                                            <g mask="url(#mask0_4754_63716)">
                                                <path d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z" fill="#333333" />
                                            </g>
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Role / Employee"
                                    className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                                />
                            </div>
                        ))}
                        <p className="add-level text-[#06A9EF] text-[14px] font-semibold cursor-pointer" onClick={addLevel}>
                            + Add New Interviewer
                        </p>
                    </div>


                </div>
                <div className='flex xl:flex-row flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-4 xl:w-[33%] w-[60%] min-w-[250px]'>
                        <div>
                            <p className='text-[20px] font-medium'>Interview Date</p>

                        </div>
                        <input
                            type="date"
                            placeholder='Select Date'
                            class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px] font-[400]"
                            value=""

                        />

                    </div>
                    <div className='flex flex-col gap-4  xl:w-[33%] w-[60%] min-w-[250px]'>

                        <p className='text-[20px] font-medium'>Start Time</p>

                        <div className='flex  gap-4'>
                            <select
                                className="h-[38px] w-full px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                                value=""

                            >
                                <option value="" disabled selected>Select </option>
                                <option value="product_manager">In Progress</option>
                                <option value="developer">Conducted</option>

                            </select>
                            <div className=" flex gap-2 h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]">
                                <p className='text-[14px] font-medium'>AM</p>
                                <p className='text-[14px] font-medium'>PM</p>
                            </div>

                        </div>

                    </div>
                    <div className='flex flex-col gap-4  xl:w-[33%] w-[60%] min-w-[250px]'>

                        <p className='text-[20px] font-medium'>Duration</p>


                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                            value=""

                        >
                            <option value="" disabled selected>Select </option>
                            <option value="product_manager">In Progress</option>
                            <option value="developer">Conducted</option>

                        </select>




                    </div>

                </div>

                <div className='flex flex-col gap-4  w-[45%]'>

                    <p className='text-[20px] font-medium'>Select platform</p>


                    <div
                        className="  min-w-[300px] flex gap-2 justify-between px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                        value="">

                        <div className=' text-white bg-[#06A9EF] rounded-[8px] border border-[#06A9EF] min-w-[127px] p-2'>
                            Teams Meeting
                        </div>
                        <div className='  p-2 rounded-[8px]  border border-[#06A9EF]   min-w-[127px] '>
                            Teams Meeting
                        </div>

                    </div>




                </div>
                <div className='flex flex-col  gap-4  sm:px-[16px] px-2 py-[16px] border-[1px] border-solid border-[#646464] rounded-[6px] '>
                    <div>
                        <div className='flex justify-between sm:text-[16px] text-[12px] font-semibold'>
                            <div className='flex flex-col gap-2'>
                                <p
                                    className=" cursor-pointer"
                                    onClick={() => handleOptionClick('Candidate')}
                                >
                                    Email to Candidate
                                </p>
                                <svg className='sm:w-[150px] w-[125px]' xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 150 4" fill="none">
                                    <path d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z" fill={activeOption === 'Candidate' ? '#06A9EF' : 'white'} />
                                </svg>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p
                                    className="cursor-pointer"
                                    onClick={() => handleOptionClick('Interviewer')}
                                >
                                    Email to Interviewer
                                </p>
                                <svg className='sm:w-[150px] w-[125px]' xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 150 4" fill="none">
                                    <path d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z" fill={activeOption === 'Interviewer' ? '#06A9EF' : 'white'} />
                                </svg>
                            </div>

                        </div>
                        <div className='h-[1px] bg-[#D6DDEB]'></div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div>
                            <p className='text-[20px] font-medium'>Subject</p>

                        </div>
                        <input
                            type="input"
                            placeholder='Skilotech-Online Interview-Interviewer 1'
                            class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px] font-[400]"
                            value=""

                        />

                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div>
                            <p className='text-[20px] font-medium'>Body</p>

                        </div>
                        <textarea
                            type="input"
                            placeholder='Insert Text here...'
                            class="min-h-[100px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px] font-[400]"
                            value=""

                        />

                    </div>
                </div>
            </div>
            <div className='flex gap-4 sm:justify-end  justify-center pb-[1rem]'>
                <button onClick={() => setShowScheduleInterview(false)} className='ml:px-9 ml:py-3 px-2 py-2 border border-[#06A9EF] rounded-[12px]  text-[16px] font-semibold' id='button'>Cancel</button>
                <button onClick={() => setSuccessfull(true)} className='ml:px-9 ml:py-3 px-2 py-2 bg-[#06A9EF] rounded-[12px] text-[16px] font-semibold text-white'>Schedule Interview</button>
            </div>

           
        </div>
    )
}

export default ScheduleInterview
