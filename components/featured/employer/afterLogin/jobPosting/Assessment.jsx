import { Delete_icon, Edit_icon } from '@/utils/svg'
import React from 'react'

function Assessment({setSuccessfull}) {
    return (
        <>
            <div className="flex flex-col gap-[8px] px-4 ">
                <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px]">
                    Question 1 *
                    <div
                        className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter first name"
                            className="w-[75%]"
                        />
                        <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                            <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                                Required
                                <label
                                    className="flex items-center"
                                    style={{ display: "inline-block", padding: "5px" }}
                                >
                                    <input
                                        className="flex items-center"
                                        type="checkbox"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            border: "1px solid #06A9EF",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "3px",
                                            margin: "0",
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            </div>
                            <div className=" flex items-center gap-[12px]">
                                <div className="w-[20px] ml:w-[24px]">
                                    <Edit_icon />
                                </div>
                                <div className="w-[20px] ml:w-[24px]">
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px]">
                    Question 2 *
                    <div
                        className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter first name"
                            className="w-[75%]"
                        />
                        <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                            <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                                Required
                                <label
                                    className="flex items-center"
                                    style={{ display: "inline-block", padding: "5px" }}
                                >
                                    <input
                                        className="flex items-center"
                                        type="checkbox"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            border: "1px solid #06A9EF",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "3px",
                                            margin: "0",
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            </div>
                            <div className=" flex items-center gap-[12px]">
                                <div className="w-[20px] ml:w-[24px]">
                                    <Edit_icon />
                                </div>
                                <div className="w-[20px] ml:w-[24px]">
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px]">
                    Question 3 *
                    <div
                        className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter first name"
                            className="w-[75%]"
                        />
                        <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                            <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                                Required
                                <label
                                    className="flex items-center"
                                    style={{ display: "inline-block", padding: "5px" }}
                                >
                                    <input
                                        className="flex items-center"
                                        type="checkbox"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            border: "1px solid #06A9EF",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "3px",
                                            margin: "0",
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            </div>
                            <div className=" flex items-center gap-[12px]">
                                <div className="w-[20px] ml:w-[24px]">
                                    <Edit_icon />
                                </div>
                                <div className="w-[20px] ml:w-[24px]">
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px]">
                    Question 4 *
                    <div
                        className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter first name"
                            className="w-[75%]"
                        />
                        <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                            <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                                Required
                                <label
                                    className="flex items-center"
                                    style={{ display: "inline-block", padding: "5px" }}
                                >
                                    <input
                                        className="flex items-center"
                                        type="checkbox"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            border: "1px solid #06A9EF",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "3px",
                                            margin: "0",
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            </div>
                            <div className=" flex items-center gap-[12px]">
                                <div className="w-[20px] ml:w-[24px]">
                                    <Edit_icon />
                                </div>
                                <div className="w-[20px] ml:w-[24px]">
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px]">
                    Question 5
                    <div
                        className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                        style={{
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter first name"
                            className="w-[75%]"
                        />
                        <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                            <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                                Required
                                <label
                                    className="flex items-center"
                                    style={{ display: "inline-block", padding: "5px" }}
                                >
                                    <input
                                        className="flex items-center"
                                        type="checkbox"
                                        style={{
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                            border: "1px solid #06A9EF",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "3px",
                                            margin: "0",
                                            cursor: "pointer",
                                        }}
                                    />
                                </label>
                            </div>
                            <div className=" flex items-center gap-[12px]">
                                <div className="w-[20px] ml:w-[24px]">
                                    <Edit_icon />
                                </div>
                                <div className="w-[20px] ml:w-[24px]">
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end text-[#333] text-[14px] font-[600] p-4 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <g mask="url(#mask0_6622_123567)">
                        <path
                            d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
                            fill="#333333"
                        />
                    </g>
                </svg>
                Add Section
            </div>

            <div className="flex flex-row bg-white p-4  gap-[4px] justify-between ">
                <button className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-3 rounded-[12px] max-scr1100:px-6 ">
                    Cancel
                </button>
                <button onClick={() => setSuccessfull(true)} className="  text-[#fff] text-[16px] font-semibold px-9 py-3 max-scr1100:px-6  bg-[#06A9EF] rounded-[12px]">
                Create Job Post
                </button>
            </div>
        </>
    )
}

export default Assessment