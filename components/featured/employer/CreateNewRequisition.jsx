import React, { useState } from "react";

const CreateNewRequisition = () => {

    const [levels, setLevels] = useState([{ id: 1, name: 'Level 1' }]);
    const [showApprovalChain, setShowApprovalChain] = useState(false);
    const [approvalChoice, setApprovalChoice] = useState(null);

    const addLevel = () => {
        const newLevel = { id: levels.length + 1, name: `Level ${levels.length + 1}` };
        setLevels([...levels, newLevel]);
    };

    const deleteLevel = (id) => {
        if (id === 1) return;
        const updatedLevels = levels.filter((level) => level.id !== id);
        setLevels(updatedLevels);
    };

    const handleApprovalChoice = (value) => {
        setApprovalChoice(value);
        setShowApprovalChain(value === 'yes');
    };
    return (
        <div className="flex ml:flex-row flex-col gap-[20px] ml:max-h-[80vh] pb-[24px] ">
            <div className=" ml:w-[60%] w-[100%] flex flex-col gap-4 rounded-[16px] py-2 bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
            <div className="overflow-y-auto p-4 flex flex-col gap-4 " >
                <p className=" w-[full] text-[24px] font-[500px] ">
                    Create New Requisition
                </p>

                <div className="flex sm:flex-row flex-col gap-4  ">
                    <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
                        <p className="text-[14px]  font-medium">Job Title</p>
                        <input
                            type="text"
                            placeholder="Eg: Product Manager"
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                        />
                    </div>
                    <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
                        <p className="  text-[14px]  font-medium">
                            Number of Positions
                        </p>
                        <input
                            type="text"
                            placeholder="Enter Number"
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                        />
                    </div>
                </div>

                <div className=" flex flex-row gap-2">
                    <input type="checkbox" className="border border-[#06A9EF] text-[14px]  font-medium custom-checkbox" />
                    <p>Mark as priority</p>
                </div>

                <div className="flex flex-col gap-[8px] justify-between w-full">
                    <p className="text-[14px]  font-medium">Budget</p>
                    <div className="flex sm:flex-row flex-col gap-4 ">
                        <input
                            type="text"
                            placeholder="From (INR)"
                            className="h-[38px]  px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]  sm:w-[49.01%] w-[100%] placeholder:text-[14px]  font-[400]"
                        />
                        <input
                            type="text"
                            placeholder="To (INR)"
                            className="h-[38px]  px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]  sm:w-[49.01%] w-[100%] placeholder:text-[14px]  font-[400]"
                        />
                    </div>
                </div>



                <div className="flex sm:flex-row flex-col gap-4">
                    <div className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]">
                        <p className="text-[14px]  font-medium">Requisition Type</p>
                        <select
                            className="h-[38px] px-[16px] py-[8px]  border-[1px] border-solid border-[#646464] text-[14px]  font-[400] rounded-[6px]"
                        >
                            <option value="" disabled selected className="">Select </option>
                            <option value="product_manager">Product Manager</option>
                            <option value="developer">Developer</option>

                        </select>
                    </div>
                    <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
                        <p className=" text-[14px]  font-medium">
                            Experience
                        </p>
                        <input
                            type="text"
                            placeholder="Ex: 2 Yrs"
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                        />
                    </div>
                </div>



                <div className="flex sm:flex-row flex-col gap-4  ">
                    <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
                        <p className="text-[14px]  font-medium ">Location</p>
                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                        >
                            <option value="" disabled selected>Select </option>
                            <option value="product_manager">Pune</option>
                            <option value="developer">Mumbai</option>

                        </select>
                    </div>
                    <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
                        <p className=" text-[14px]  font-medium">
                            Department
                        </p>
                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                        >
                            <option value="" disabled selected>Select </option>
                            <option value="product_manager">Pune</option>
                            <option value="developer">Mumbai</option>

                        </select>
                    </div>
                </div>


                <div className="flex sm:flex-row flex-col gap-4  ">
                    <div className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]">
                        <p className=" text-[14px]  font-medium">Target Hiring Date</p>
                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                        >
                            <option value="" disabled selected>Select </option>
                            <option value="product_manager">Pune</option>
                            <option value="developer">Mumbai</option>

                        </select>
                    </div>
                    <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
                        <p className="text-[14px]  font-medium">
                            Job Type
                        </p>
                        <select
                            className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] text-[14px]  font-[400]"
                        >
                            <option value="" disabled selected>Select </option>
                            <option value="product_manager">Full Time </option>
                            <option value="developer">Part Time</option>

                        </select>
                    </div>
                </div>

                <div className="flex flex-col  gap-[8px] ">
                    <p className="text-[14px]  font-medium">Additional Comments</p>
                    <textarea
                        className="h-[148px] border-[1px] border-solid border-[#646464] px-[16px] py-[8px] rounded-[6px] placeholder:text-[14px]  font-[400]"
                        placeholder="Provide your comment"
                    ></textarea>
                </div>

                <div className="text-[14px]  font-medium">
                    <p>Job Description</p>

                </div>

            </div>
            </div>
            <div className=" ml:w-[40%]  w-[100%] h-[100%] max-h-[80vh]  flex flex-col gap-4 py-2 rounded-[16px]  bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                <div className="overflow-y-auto p-4 flex flex-col gap-4">
                    <p className="text-[24px] font-medium w-full">Requisition Approval Chain</p>
                    <p className="text[14px] w-full font-medium">
                        Do you want to enable approval Chain for Requisition?
                    </p>
                    <div className="flex gap-[8px] items-center">
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="yes"
                            className="h-[20px] w-[20px] custom-radio"
                            onChange={(e) => handleApprovalChoice(e.target.value)}
                        />
                        <label className="text-[14px] font-medium">Yes</label>
                        <input
                            type="radio"
                            name="approvalChoice"
                            value="no"
                            className="h-[20px] w-[20px] custom-radio"
                            onChange={(e) => handleApprovalChoice(e.target.value)}
                           
                        />
                        <label className="text-[14px] font-medium">No</label>
                    </div>



                    <div className="flex flex-col gap-4 " style={{ opacity: showApprovalChain ? 1 : 0.5, pointerEvents: showApprovalChain ? 'auto' : 'none' }}>
                        <p className="text-[14px] font-semibold">Approval Chain</p>
                        <div className="flex flex-col ">

                            <div className="flex gap-4 w-full">
                                <div className="order-tracker mt-1">
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
                                        <div className="flex flex-col gap-[8px] w-full level" key={level.id}>
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
                                        + Add New Level
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="flex flex-col">

                        <div className="flex flex-row justify-between">
                            <button className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-3 rounded-[12px] max-scr1100:px-6 ">Cancel</button>
                            <button className="  text-[#fff] text-[16px] font-semibold px-9 py-3 max-scr1100:px-6  bg-[#06A9EF] rounded-[12px]">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewRequisition;
