import React from "react";

const CreateNewRequisition = () => {
    return (
        <div className="flex flex-row gap-[20px]">
            <div className=" w-[66.17%]  flex flex-col gap-4 p-4 rounded-[16px] bg-white" style={{boxShadow:"0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)"}}>
                <p className="h-[29px] w-[full] text-[24px] font-[500px] ">
                    Create New Requisition
                </p>

                <div className="flex flex-row gap-4  ">
                    <div className="flex flex-col gap-2  w-[49.01%]">
                        <p className="h-[17px] ">Job Title</p>
                        <input
                            type="text"
                            placeholder="Eg: Product Manager"
                            className="h-[38px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                    </div>
                    <div className="flex flex-col gap-[8px] w-[49.01%]">
                        <p className="h-[17px] flex flex-col gap-[8px]">
                            Number of Positions
                        </p>
                        <input
                            type="text"
                            placeholder="Enter Number"
                            className="h-[38px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                    </div>
                </div>

                <div className=" flex flex-row gap-2">
                    <input type="checkbox" className="border border-[#06A9EF]"/>
                    <p>Mark as priority</p>
                </div>

                <div className="flex flex-col gap-[8px] justify-between w-full">
                    <p>Budget</p>
                    <div className="flex flex-row gap-4 ">
                        <input
                            type="text"
                            placeholder="From (INR)"
                            className="h-[38px]  py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]  w-[49.01%]"
                        />
                        <input
                            type="text"
                            placeholder="To (INR)"
                            className="h-[38px]  py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]  w-[49.01%]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[8px] px-[16px]">
                    <p>Requisition Type</p>
                    <div className="flex flex-row gap-x-[16px] gap-[8px]">
                        <input
                            type="text"
                            placeholder="Eg: Product Manager"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                        <input
                            type="text"
                            placeholder="Ex: 2 Yrs"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[8px] px-[16px]">
                    <p>Location</p>
                    <div className="flex flex-row gap-x-[16px] gap-[8px]">
                        <input
                            type="text"
                            placeholder="Select"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                        <input
                            type="text"
                            placeholder="Select"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[8px] px-[16px]">
                    <p>Target Hiring Date</p>
                    <div className="flex flex-row gap-x-[16px] gap-[8px]">
                        <input
                            type="text"
                            placeholder="Select"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                        <input
                            type="text"
                            placeholder="Full Time"
                            className="h-[38px] w-[399px] py-[16px] px-[8px] border-[1px] border-solid border-[#646464] rounded-[6px]"
                        />
                    </div>
                </div>

                <div className="flex flex-col  gap-[8px] p-[16px] ">
                    <p>Additional Comments</p>
                    <textarea
                        className="h-[148px] border-[1px] border-solid border-[#646464] px-[8px] py-[16px] rounded-[6px]"
                        placeholder="Provide your comment"
                    ></textarea>
                </div>

                <div className="px-[16px]">
                    <p>Job Description</p>
                    <div className="h-[40px] bg-[#F2F4F7] rounded-lg flex flex-row px-[16px] py-[12px] gap-[8px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M4.5 3.16666H8.33333C9.71404 3.16666 10.8333 4.28594 10.8333 5.66666C10.8333 7.04737 9.71404 8.16666 8.33333 8.16666H4.5V3.16666Z"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M4.5 8.16666H9.16667C10.4553 8.16666 11.5 9.21133 11.5 10.5C11.5 11.7887 10.4553 12.8333 9.16667 12.8333H4.5V8.16666Z"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M9.33464 3.16666H7.83464M9.33464 3.16666H10.8346M9.33464 3.16666L6.66797 12.8333M6.66797 12.8333H5.16797M6.66797 12.8333H8.16797"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3.16797 12.8333H12.8346"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M10.8346 3.16666V7.33332C10.8346 8.89813 9.56611 10.1667 8.0013 10.1667C6.4365 10.1667 5.16797 8.89813 5.16797 7.33332V3.16666"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3.16797 8.16668H12.8346M12.168 5.50001V5.33334C12.168 4.22877 11.2725 3.33334 10.168 3.33334H5.83464C4.73007 3.33334 3.83464 4.22877 3.83464 5.33334V6.16668C3.83464 7.27125 4.73007 8.16668 5.83464 8.16668H10.0013M3.83464 10.5V10.8333C3.83464 11.9379 4.73007 12.8333 5.83464 12.8333H10.168C11.2725 12.8333 12.168 11.9379 12.168 10.8333V9.83334"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3.16797 3.83334H9.5013M3.16797 12.1667H9.5013M3.16797 8.00001H12.8346"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M5.16797 3.83334H10.8346M5.16797 12.1667H10.8346M3.16797 8.00001H12.8346"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6.5013 3.83334H12.8346M6.5013 12.1667H12.8346M3.16797 8.00001H12.8346"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3.16797 4.16666L4.16797 3.16666V6.83332M4.16797 6.83332H3.16797M4.16797 6.83332H4.83464M8.83463 9.49999H7.77213C7.28497 9.49999 7.01344 8.95724 7.27182 8.57157C7.30366 8.52405 7.34872 8.4874 7.39633 8.45572L8.59624 7.65729C8.64385 7.62561 8.68876 7.58881 8.72127 7.54175C9.01819 7.11188 8.71549 6.49999 8.16969 6.49999H7.16797M11.168 9.83332H12.1322C12.9552 9.83332 13.1012 11.0917 12.3414 11.3038C12.3046 11.314 12.266 11.3181 12.2278 11.3195L11.8346 11.3333L12.2278 11.3472C12.266 11.3485 12.3046 11.3526 12.3414 11.3629C13.1012 11.5749 12.9552 12.8333 12.1322 12.8333H11.168"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6.5013 3.99999H12.168M6.5013 7.99999H12.168M6.5013 12H12.168M4.33464 3.99999C4.33464 4.18408 4.1854 4.33332 4.0013 4.33332C3.81721 4.33332 3.66797 4.18408 3.66797 3.99999C3.66797 3.81589 3.81721 3.66666 4.0013 3.66666C4.1854 3.66666 4.33464 3.81589 4.33464 3.99999ZM4.33464 7.99999C4.33464 8.18408 4.1854 8.33332 4.0013 8.33332C3.81721 8.33332 3.66797 8.18408 3.66797 7.99999C3.66797 7.81589 3.81721 7.66666 4.0013 7.66666C4.1854 7.66666 4.33464 7.81589 4.33464 7.99999ZM4.33464 12C4.33464 12.1841 4.1854 12.3333 4.0013 12.3333C3.81721 12.3333 3.66797 12.1841 3.66797 12C3.66797 11.8159 3.81721 11.6667 4.0013 11.6667C4.1854 11.6667 4.33464 11.8159 4.33464 12Z"
                                stroke="#646464"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <textarea
                    className="h-[148px] border-[1px] border-solid border-[#646464] p-[18px] m-[18px] rounded-[6px]"
                    placeholder="Insert text here..."
                ></textarea>
            </div>

            <div className="h-[564px] w-[413px] border-[1px] p-[16px] flex flex-col gap-[16px] rounded-lg">
                <p className="text-[24px] h-[29px]">Requisition Approval Chain</p>
                <p className="text[14px] h-[34px]">
                    Do you want to enable approval Chain for Requisition?
                </p>
                <div className="flex gap-[8px] ">
                    <input type="radio" name="1" />
                    yes
                    <input type="radio" name="1" />
                    No
                </div>
                <div className="flex flex-col">
                    <p>Approval Chain</p>
                    <div className="flex flex-row gap-[16px] px-[16px]">
                        <svg className="my-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <circle cx="8" cy="8" r="8" fill="#CBEFFF" />
                            <circle cx="8" cy="8" r="4" fill="#06A9EF" />
                        </svg>
                        <p className="my-[12px]">Level 1</p>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <input type="text" placeholder="Role / Employee" className="h-[38px] border-[1px] mx-[32px] py-[16px] px-[8px]  w-[300px] border-solid border-[#646464] rounded-[6px]" />
                        <input type="text" placeholder="Enter Email" className="h-[38px] border-[1px]  mx-[32px] py-[16px] px-[8px] w-[300px] border-solid border-[#646464] rounded-[6px]" />
                    </div>

                    <div className="flex flex-row gap-[16px] px-[16px]">
                        <svg className="my-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <circle cx="8" cy="8" r="8" fill="#CBEFFF" />
                            <circle cx="8" cy="8" r="4" fill="#06A9EF" />
                        </svg>
                        <p className="my-[12px] gap-[8px] ">Level 2</p>
                    </div>
                    <div className="flex flex-col gap-[8px]  ">
                        <input type="text" placeholder="Role / Employee" className="h-[38px] py-[16px] px-[8px] border-[1px] mx-[32px]  w-[300px] border-solid border-[#646464] rounded-[6px]" />
                        <input type="text" placeholder="Enter Email" className="h-[38px] py-[16px] px-[8px] border-[1px] mx-[32px] w-[300px] border-solid border-[#646464] rounded-[6px]" />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-[#06A9EF] py-[16px] px-[45px]">+ Add New Level</p>
                        <div className="flex flex-row justify-between">
                            <button className="h-[44px] w-[128px] border-[1px] border-solid border-[#06A9EF] rounded-[8px]">Cancel</button>
                            <button className="h-[44px] w-[128px] border-[1px] text-[#fff] border-solid border-[#06A9EF] bg-[#06A9EF] rounded-[8px]">Create</button>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default CreateNewRequisition;
