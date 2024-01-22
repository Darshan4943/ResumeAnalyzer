import React, { useState } from 'react'

function HiringPostJob({ setIsSetting,setIsCreate }) {

    return (
        // <div className=" flex flex-col gap-4 rounded-[16px] py-2 bg-white" style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
        //     <div className="overflow-y-auto px-4 py-2 flex flex-col gap-4 " >
        //         <div className='flex justify-between items-center '>
        //             <div className='flex gap-2 items-center'>
        //                 <img className="w-[28px] h-[28px] cursor-pointer" src="/images/employer/icon_left.png" alt="" />
        //                 <p className=" w-[full] text-[24px] font-[500] ">
        //                     Post a Job
        //                 </p>
        //             </div>
        //             <svg onClick={()=> setIsSetting(true)} className='mobile' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

        //                 <g mask="url(#mask0_7540_118715)">
        //                     <path d="M17.4 20.3996C16.392 20.3996 15.54 20.0516 14.844 19.3556C14.148 18.6596 13.8 17.8076 13.8 16.7996C13.8 15.7916 14.148 14.9396 14.844 14.2436C15.54 13.5476 16.392 13.1996 17.4 13.1996C18.408 13.1996 19.26 13.5476 19.956 14.2436C20.652 14.9396 21 15.7916 21 16.7996C21 17.8076 20.652 18.6596 19.956 19.3556C19.26 20.0516 18.408 20.3996 17.4 20.3996ZM17.403 18.5996C17.901 18.5996 18.325 18.4236 18.675 18.0716C19.025 17.7196 19.2 17.2946 19.2 16.7966C19.2 16.2986 19.024 15.8746 18.672 15.5246C18.32 15.1746 17.895 14.9996 17.397 14.9996C16.899 14.9996 16.475 15.1756 16.125 15.5276C15.775 15.8797 15.6 16.3047 15.6 16.8026C15.6 17.3006 15.776 17.7246 16.128 18.0746C16.48 18.4246 16.905 18.5996 17.403 18.5996ZM4.2 17.6996V15.8996H12V17.6996H4.2ZM6.6 10.7996C5.592 10.7996 4.74 10.4516 4.044 9.75561C3.348 9.05961 3 8.20761 3 7.19961C3 6.19161 3.348 5.33961 4.044 4.64361C4.74 3.94761 5.592 3.59961 6.6 3.59961C7.608 3.59961 8.46 3.94761 9.156 4.64361C9.852 5.33961 10.2 6.19161 10.2 7.19961C10.2 8.20761 9.852 9.05961 9.156 9.75561C8.46 10.4516 7.608 10.7996 6.6 10.7996ZM6.60303 8.99961C7.10101 8.99961 7.525 8.8236 7.875 8.47158C8.225 8.11957 8.4 7.69457 8.4 7.19659C8.4 6.6986 8.22399 6.27461 7.87198 5.92461C7.51996 5.57461 7.09496 5.39961 6.59698 5.39961C6.09899 5.39961 5.675 5.57562 5.325 5.92763C4.975 6.27965 4.8 6.70465 4.8 7.20263C4.8 7.70062 4.97601 8.12461 5.32803 8.47461C5.68004 8.82461 6.10504 8.99961 6.60303 8.99961ZM12 8.09961V6.29961H19.8V8.09961H12Z" fill="#1C1B1F" />
        //                 </g>
        //             </svg>
        //         </div>
        //         <div className='flex flex-col gap-2'>
        //             <p className=" w-[full] text-[14px] font-[500] ">
        //                 Job Title
        //             </p>
        //             <input
        //                 type="text"
        //                 placeholder="Add job title / role"
        //                 className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2'>
        //             <p className=" w-[full] text-[14px] font-[500] ">
        //                 Tags
        //             </p>
        //             <input
        //                 type="text"
        //                 placeholder="Job keyword, tags etc"
        //                 className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2'>
        //             <p className=" w-[full] text-[14px] font-[500] ">
        //                 Job Description
        //             </p>
        //             <input
        //                 type="text"
        //                 placeholder="Job keyword, tags etc"
        //                 className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //             />
        //         </div>
        //         <div className='flex flex-col gap-2'>
        //             <p className=" w-[full] text-[24px] font-[500] ">
        //                 Salary
        //             </p>
        //             <div className='flex lg:flex-row flex-col  w-full justify-between'>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full' >
        //                     <p className="  text-[14px] font-[500] ">
        //                         salary Type
        //                     </p>
        //                     <select
        //                         className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
        //                     >
        //                         <option value="" disabled selected className="">Select </option>
        //                         <option value="product_manager">Annually</option>
        //                         <option value="developer">Monthly</option>

        //                     </select>
        //                 </div>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full'>
        //                     <p className="  text-[14px] font-[500] ">
        //                         Min Salary
        //                     </p>
        //                     <input
        //                         type="text"
        //                         placeholder="Min Salary"
        //                         className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //                     />

        //                 </div>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full '>

        //                     <p className="  text-[14px] font-[500] ">
        //                         Max Salary
        //                     </p>
        //                     <input
        //                         type="text"
        //                         placeholder="Min Salary"
        //                         className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px] font-[400]"
        //                     />

        //                 </div>

        //             </div>
        //         </div>

        //         <div className='flex flex-col gap-2'>
        //             <p className=" w-[full] text-[24px] font-[500] ">
        //                 Job Information
        //             </p>
        //             <div className=' lg:flex-row flex-col flex gap-4 w-full justify-between'>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full ' >
        //                     <p className="  text-[14px] font-[500] ">
        //                         Job Sector
        //                     </p>
        //                     <select
        //                         className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
        //                     >
        //                         <option value="" disabled selected className="">Select </option>
        //                         <option value="product_manager">Accounting</option>
        //                         <option value="developer">Developer</option>

        //                     </select>
        //                 </div>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full'>
        //                     <p className="  text-[14px] font-[500] ">
        //                         Job Type
        //                     </p>
        //                     <select
        //                         className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
        //                     >
        //                         <option value="" disabled selected className="">Select </option>
        //                         <option value="product_manager">Full time</option>
        //                         <option value="developer">Part Time</option>

        //                     </select>
        //                 </div>
        //                 <div className='flex flex-col gap-2 lg:w-[31%] w-full '>
        //                     <div className='flex flex-col gap-2'>
        //                         <p className="  text-[14px] font-[500] ">
        //                             Work From
        //                         </p>
        //                         <select
        //                             className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]"
        //                         >
        //                             <option value="" disabled selected className="">Select </option>
        //                             <option value="product_manager">Home</option>
        //                             <option value="developer">Office</option>

        //                         </select>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>

        //         <div className='flex flex-col gap-2'>
        //             <p className="  text-[14px] font-[500] ">
        //                 Required Skills
        //             </p>
        //             <input
        //                 type="text"
        //                 placeholder="Add Skills"
        //                 className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //             />
        //         </div>
        //         <div className='flex gap-[20px] w-full'>
        //             <div className='flex flex-col gap-2 w-[49%]'>
        //                 <p className="  text-[14px] font-[500] ">
        //                     Application Deadline
        //                 </p>
        //                 <input
        //                     type="text"
        //                     placeholder="dd / mm / yyyy"
        //                     className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //                 />
        //             </div>
        //             <div className='flex flex-col gap-2 w-[49%]'>
        //                 <p className="  text-[14px] font-[500] ">
        //                     Job Sector
        //                 </p>
        //                 <select
        //                     className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px]   h-[41.33px]"
        //                 >
        //                     <option value="" disabled selected className="">Select </option>
        //                     <option value="product_manager">Accounting</option>
        //                     <option value="developer">Developer</option>

        //                 </select>
        //             </div>
        //         </div>
        //         <div className='flex flex-col gap-2'>
        //             <p className="  text-[14px] font-[500] ">
        //                 Key Skills
        //             </p>
        //             <input
        //                 type="text"
        //                 placeholder="Add Skills"
        //                 className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
        //             />
        //         </div>
        //     </div>
        // </div>

        <div
            className="  flex flex-col gap-4 rounded-[12px] ml:rounded-[16px] py-2 bg-white"
            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
        >
            <div className="overflow-y-auto px-4 py-2 flex flex-col gap-4 ">
                <div className='flex justify-between items-center '>
                    <div className='flex gap-2 items-center'>
                        <img className="w-[28px] h-[28px] cursor-pointer" src="/images/employer/icon_left.png" alt="" />
                        <p className=" w-[full] text-[24px] font-[500] ">
                            Post a Job
                        </p>
                    </div>
                    <svg onClick={() => setIsSetting(true)} className='mobile' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                        <g mask="url(#mask0_7540_118715)">
                            <path d="M17.4 20.3996C16.392 20.3996 15.54 20.0516 14.844 19.3556C14.148 18.6596 13.8 17.8076 13.8 16.7996C13.8 15.7916 14.148 14.9396 14.844 14.2436C15.54 13.5476 16.392 13.1996 17.4 13.1996C18.408 13.1996 19.26 13.5476 19.956 14.2436C20.652 14.9396 21 15.7916 21 16.7996C21 17.8076 20.652 18.6596 19.956 19.3556C19.26 20.0516 18.408 20.3996 17.4 20.3996ZM17.403 18.5996C17.901 18.5996 18.325 18.4236 18.675 18.0716C19.025 17.7196 19.2 17.2946 19.2 16.7966C19.2 16.2986 19.024 15.8746 18.672 15.5246C18.32 15.1746 17.895 14.9996 17.397 14.9996C16.899 14.9996 16.475 15.1756 16.125 15.5276C15.775 15.8797 15.6 16.3047 15.6 16.8026C15.6 17.3006 15.776 17.7246 16.128 18.0746C16.48 18.4246 16.905 18.5996 17.403 18.5996ZM4.2 17.6996V15.8996H12V17.6996H4.2ZM6.6 10.7996C5.592 10.7996 4.74 10.4516 4.044 9.75561C3.348 9.05961 3 8.20761 3 7.19961C3 6.19161 3.348 5.33961 4.044 4.64361C4.74 3.94761 5.592 3.59961 6.6 3.59961C7.608 3.59961 8.46 3.94761 9.156 4.64361C9.852 5.33961 10.2 6.19161 10.2 7.19961C10.2 8.20761 9.852 9.05961 9.156 9.75561C8.46 10.4516 7.608 10.7996 6.6 10.7996ZM6.60303 8.99961C7.10101 8.99961 7.525 8.8236 7.875 8.47158C8.225 8.11957 8.4 7.69457 8.4 7.19659C8.4 6.6986 8.22399 6.27461 7.87198 5.92461C7.51996 5.57461 7.09496 5.39961 6.59698 5.39961C6.09899 5.39961 5.675 5.57562 5.325 5.92763C4.975 6.27965 4.8 6.70465 4.8 7.20263C4.8 7.70062 4.97601 8.12461 5.32803 8.47461C5.68004 8.82461 6.10504 8.99961 6.60303 8.99961ZM12 8.09961V6.29961H19.8V8.09961H12Z" fill="#1C1B1F" />
                        </g>
                    </svg>
                </div>
                <div className="flex flex-col gap-2">
                    <p className=" w-[full] text-[14px] font-[500] ">Job Title</p>
                    <input
                        type="text"
                        placeholder="Add job title / role"
                        className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p className=" w-[full] text-[14px] font-[500] ">Tags</p>
                    <input
                        type="text"
                        placeholder="Job keyword, tags etc"
                        className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p className=" w-[full] text-[14px] font-[500] ">
                        Job Description
                    </p>
                    <input
                        type="text"
                        placeholder="Job keyword, tags etc"
                        className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p className=" w-[full] text-[18px] ml:text-[24px] font-[500] ">
                        Salary
                    </p>
                    <div className="flex lg:flex-row sm:flex-row ml:flex-col flex-col gap-[12px]  w-full justify-between">
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%] ">
                            <p className="  text-[14px] font-[500] ">salary Type</p>
                            <select className="w-full px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]">
                                <option value="" disabled selected className="">
                                    Select{" "}
                                </option>
                                <option value="product_manager">Annually</option>
                                <option value="developer">Monthly</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%] ">
                            <p className="  text-[14px] font-[500] ">Min Salary</p>
                            <input
                                type="text"
                                placeholder="Min Salary"
                                className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%]  ">
                            <p className="  text-[14px] font-[500] ">Max Salary</p>
                            <input
                                type="text"
                                placeholder="Min Salary"
                                className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px] font-[400]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className=" w-[full] text-[18px] ml:text-[24px] font-[500] ">
                        Job Information
                    </p>
                    <div className="flex lg:flex-row sm:flex-row ml:flex-col flex-col  gap-[20px] w-full justify-between">
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%]  ">
                            <p className="  text-[14px] font-[500] ">Job Sector</p>
                            <select className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]">
                                <option value="" disabled selected className="">
                                    Select{" "}
                                </option>
                                <option value="product_manager">Accounting</option>
                                <option value="developer">Developer</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%] ">
                            <p className="  text-[14px] font-[500] ">Job Type</p>
                            <select className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]">
                                <option value="" disabled selected className="">
                                    Select{" "}
                                </option>
                                <option value="product_manager">Full time</option>
                                <option value="developer">Part Time</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-[31%] ml:w-full lg:w-[31%]  ">
                            <div className="flex flex-col gap-2">
                                <p className="  text-[14px] font-[500] ">Work From</p>
                                <select className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]">
                                    <option value="" disabled selected className="">
                                        Select{" "}
                                    </option>
                                    <option value="product_manager">Home</option>
                                    <option value="developer">Office</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full  ">
                    <div className="flex flex-col gap-2">
                        <p className="  text-[14px] font-[500] ">
                            Required Qualification
                        </p>
                        <select className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px] h-[41.33px]">
                            <option value="" disabled selected className="">
                                Select{" "}
                            </option>
                            <option value="product_manager">one</option>
                            <option value="developer">two</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="  text-[14px] font-[500] ">Required Skills</p>
                    <input
                        type="text"
                        placeholder="Add Skills"
                        className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-[20px] w-full">
                    <div className="flex flex-col gap-2 f-full sm:w-[49%]">
                        <p className="  text-[14px] font-[500] ">
                            Application Deadline
                        </p>
                        <input
                            type="date"
                            placeholder="dd / mm / yyyy"
                            className=" px-[16px] py-[8px] border-[1px] border-solid border-[#646464] rounded-[6px] placeholder:text-[14px]  font-[400]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 f-full sm:w-[49%]">
                        <p className="  text-[14px] font-[500] ">Experience</p>
                        <select className=" px-[16px] py-[8px]  border-[1px] border-solid  border-[#646464] text-[14px] text-[#646464] font-[400] rounded-[6px]   h-[41.33px]">
                            <option value="" disabled selected className="">
                                Select{" "}
                            </option>
                            <option value="product_manager">one</option>
                            <option value="developer">two</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="py-[12px] px-[16px] sm:px-[36px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] text-[#333] text-[14px] font-[500]">
                        Cancel
                    </button>
                    <button
                        onClick={() => setIsCreate(true)}
                        className="py-[12px] px-[16px] sm:px-[36px] rounded-[12px] border-[1px] border-solid border-[#06A9EF] text-[#fff] text-[14px] font-[500] bg-[#06A9EF]"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HiringPostJob