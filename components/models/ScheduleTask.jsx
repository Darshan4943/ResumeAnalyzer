import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Delete_icon, PlusAddLogo } from '../../utils/svg';

function ScheduleTask({ setShowAssignTask,setTaskSuccessfull }) {
    const [levels, setLevels] = useState([{ id: 1, name: 'Question 1' }]);


    const addLevel = () => {
        const newLevel = { id: levels.length + 1, name: `Question ${levels.length + 1}` };
        setLevels([...levels, newLevel]);
    };

    const deleteLevel = (id) => {
        if (id === 1) return;
        const updatedLevels = levels.filter((level) => level.id !== id);
        setLevels(updatedLevels);
    };
    const router = useRouter()

    const [toggle, setToggle] = useState(0)
    const [activeOption, setActiveOption] = useState('Candidate');

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setToggle(option)
    };
    const handleSelectChange = (e) => {
        setToggle(parseInt(e.target.value, 10));
    };
    return (
        <div className='sm:p-6 p-2 rounded-tl-[16px] h-[87vh] bg-white flex flex-col gap-4 overflow-y-auto' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className='text-[24px] font-medium'>Assign Task</div>

            <div className='flex flex-col gap-4'>
                <p className='text-[20px] font-medium'>Assigned to</p>
                <div className="flex gap-4  w-full">

                    <div className="w-[91.5%] flex flex-col gap-4">
                        <div className=" bg-[#fff] w-full ml:w-full  flex flex-col gap-[12px]">
                            {levels.map((level) => (
                                <div key={level.id} className='flex flex-col gap-4 rounded-[12px] border-solid border-[0.5px] p-[12px] border-[#06A9EF]'>
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

                                    <div className="flex flex-col ml:flex-row gap-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="py-[12px] px-[16px] rounded-[6px] border-[1px] border-solid border-[#646464] w-full"
                                        />
                                        <div className="w-[222px] py-[8px] px-[16px] flex justify-between gap-[8px] border-solid border-[1px] border-[#333] rounded-[6px]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_7931_58508)">
                                                    <path
                                                        d="M4.5 14.75V13.25H13.5V14.75H4.5ZM4.5 10.75V9.25H19.5V10.75H4.5Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>
                                            <select
                                                name=""
                                                id=""
                                                className="flex justify-between"
                                                onChange={handleSelectChange}
                                            >
                                                <option value="0">Short Answer</option>
                                                <option value="1">Long Answer</option>
                                                <option value="2">Multiple choice</option>
                                                <option value="3">Checkbox</option>
                                                <option value="4">Dropdowns</option>
                                                <option value="5">File Upload</option>
                                                <option value="6">Date</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[8px] w-full">
                                        <div className="flex flex-col gap-[8px] w-full">
                                            {toggle == 0 && (
                                                <div className="py-[12px] px-[16px] border-b  border-[#646464]">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        placeholder="Short answer text"
                                                    />
                                                </div>
                                            )}
                                            {toggle == 1 && (
                                                <div className="py-[12px] px-[16px] border-b  border-[#646464]">
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        placeholder="long answer text"
                                                    />
                                                </div>
                                            )}
                                            {toggle == 2 && (
                                                <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                                                    <div className="flex gap-[8px] items-center ">
                                                        <input
                                                            className="w-[24px] h-[24px]"
                                                            type="radio"
                                                            name=""
                                                            id=""
                                                            placeholder="Option 1"
                                                        />
                                                        <div className="border-b w-full border-[#646464]">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                placeholder="Option 1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <PlusAddLogo />
                                                </div>
                                            )}
                                            {toggle == 3 && (
                                                <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                                                    <div className="flex gap-[8px] items-center ">
                                                        <input
                                                            className="w-[24px] h-[24px]"
                                                            type="checkbox"
                                                            name=""
                                                            id=""
                                                            placeholder="Option 1"
                                                        />
                                                        <div className="border-b w-full border-[#646464]">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                placeholder="Option 1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <PlusAddLogo />
                                                </div>
                                            )}
                                            {toggle == 4 && (
                                                <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                                                    <div className="flex gap-[8px] items-center ">
                                                        1.
                                                        <div className="border-b w-full border-[#646464]">
                                                            <input
                                                                type="text"
                                                                name=""
                                                                id=""
                                                                placeholder="Option 1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <PlusAddLogo />
                                                </div>
                                            )}
                                            {toggle == 5 && (
                                                <div className="w-full flex flex-col justify-between ml:flex-row gap-[12px] ">
                                                    <div className="w-full ml:w-[40%] flex flex-col gap-[12px]">
                                                        <div className="text-[14px] font-[400] text-[#333] flex justify-between items-center">
                                                            Allow only specific file types{" "}
                                                            <label className="switch">
                                                                <input type="" checked="" onChange="" />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </div>
                                                        <form

                                                            className="flex flex-wrap justify-between gap-[8px]"
                                                        >
                                                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="document"
                                                                    value="document"

                                                                />
                                                                Document
                                                            </label>

                                                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="document"
                                                                    value="excel"

                                                                />
                                                                Excel File
                                                            </label>

                                                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="document"
                                                                    value="pdf"

                                                                />
                                                                PDF
                                                            </label>

                                                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="document"
                                                                    value="audio"

                                                                />
                                                                Audio
                                                            </label>

                                                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="document"
                                                                    value="jpg"

                                                                />
                                                                JPG
                                                            </label>
                                                        </form>
                                                    </div>
                                                    <div className="flex ml:w-[40%] w-full flex-col gap-[16px]">
                                                        <div className="flex justify-between text-[14px] font-[400] text-[#333]">
                                                            Maximum number of files{" "}
                                                            <select name="" id="">
                                                                <option value="1">1</option>
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex justify-between text-[14px] font-[400] text-[#333]">
                                                            Maximum file size{" "}
                                                            <select name="" id="">
                                                                <option value="1">1mb</option>
                                                                <option value="5">5mb</option>
                                                                <option value="10">10mb</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {toggle == 6 && (
                                                <div className="py-[8px] px-[16px] border-b w-[100%] ml:w-[60%] border-[#646464]">
                                                    <input
                                                        type="date"
                                                        name=""
                                                        id=""
                                                        className="flex justify-between"
                                                        placeholder="Short answer text"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex gap-[8px]  items-center">
                                                <div className="flex gap-[8px] text-[14px]">
                                                    Required{" "}
                                                </div>
                                                <label className="switch ">
                                                    <input type="" checked="" onChange="" />
                                                    <span className="slider round"></span>
                                                </label>
                                                <Delete_icon />
                                            </div>

                                            <div className="flex justify-end ml:items-end">
                                                <button

                                                    className="py-[8px] ml:py-[12px] px-[20px] ml:px-[24px] ml:px-[36px] rounded-[12px] border-solid border-[1px] border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[14px] ml:text-[16px] font-[600]"
                                                >
                                                    save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                       
                        <p className="add-level text-[#06A9EF] text-[14px] font-semibold cursor-pointer" onClick={addLevel}>
                            + Add Question
                        </p>
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
                <button onClick={() => setShowAssignTask(false)} className='ml:px-9 ml:py-3 px-2 py-2 border border-[#06A9EF] rounded-[12px]  text-[16px] font-semibold' id='button'>Cancel</button>
                <button  onClick={() => setTaskSuccessfull(true)} className='ml:px-9 ml:py-3 px-2 py-2 bg-[#06A9EF] rounded-[12px] text-[16px] font-semibold text-white'>Create Assignment</button>
            </div>
        </div>
    )
}

export default ScheduleTask
