import React, { useState } from 'react'
import TextEditor from './textEditor'


function services() {

    const [selected, setSelected] = useState(false);

    const handleRadioChange = () => {
        setSelected(!selected); 
    };
    return (
        <div className=' bg-[#F9F9F9]'>
            <div className=' flex customMargins pt-[24px]'>
                <div className='flex flex-col w-[49%] p-2 gap-4 rounded-lg bg-white shadow-md' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }} >
                    <div className='flex flex-col p-4 gap-2 rounded-lg bg-white' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                        <div className='w-full text-[20px] font-montserrat font-medium'>
                            Personal Details
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className=' text-[14px] font-montserrat  font-medium'>First Name</div>
                                <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter first name"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className='w-full text-[14px] font-montserrat  font-medium'>Last Name</div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter last name"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className='w-full text-[14px] font-montserrat font-medium'>Email ID</div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your Email ID"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className='w-full text-[14px] font-montserrat  font-medium'>Mobile Number</div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your mobile number"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-col gap-2 w-full'>
                            <div className='w-full text-[14px] font-montserrat  font-medium'>Current Designation</div>
                            <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Enter your designation"
                                    className='w-full text-[14px] font-montserrat font-small '
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='w-full text-[14px] font-montserrat  font-medium'>Current Location</div>
                            <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Select your location"
                                    className='w-full text-[14px] font-montserrat font-small '
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='w-full text-[14px] font-montserrat  font-medium'>Add Social Link</div>
                            <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder=" Your Social link eg. Linkedin, Behance"
                                    className='w-full text-[14px] font-montserrat font-small '
                                />
                            </div>
                        </div>
                        <div className='flex justify-end '>
                            <button className=' font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]'>
                                Save
                            </button>
                        </div>



                    </div>


                    <div className='flex flex-col p-4 gap-2 rounded-lg bg-white' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                        <div className='w-full text-[20px] font-montserrat font-medium'>
                            Summary
                        </div>

                        <div className='w-full   rounded-[10px]'>
                            {/* <TextEditor/> */}
                        </div>
                    </div>

                    <div className='flex flex-col p-4 gap-2 rounded-lg bg-white' style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
                        <div className='w-full text-[20px] font-montserrat font-medium'>
                            Education
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className=' text-[14px] font-montserrat  font-medium'>Highest Qualification</div>
                                <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter Highest Qualification"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className='w-full text-[14px] font-montserrat  font-medium'>Specialization</div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your specialization"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className=' text-[14px] font-montserrat  font-medium'>Institute Name</div>
                                <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Search for Institute"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-[50%]'>
                                <div className='w-full text-[14px] font-montserrat  font-medium'>Passing Year</div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your designation"
                                        className='w-full text-[14px] font-montserrat font-small '
                                    />
                                </div>
                            </div>


                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='w-full text-[14px] font-montserrat  font-medium'>Education Type</div>
                            <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">

                                <input
                                    type="radio"
                                   
                                />
                                <label >Full-Time</label>

                                <input
                                    type="radio"
                                   
                                />
                                <label >Full-Time</label>



                            </div>
                        </div>

                    </div>



                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default services