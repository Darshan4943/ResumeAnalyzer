import React, { useState } from "react";
import TextEditor from "../../../../components/common/textEditor";
import DateSelector from "../../../../components/common/dateSelector";
import AiResume from "@/components/featured/candidate/afterLogin/services/AiResume";
import InterviewQue from "@/components/featured/candidate/afterLogin/services/InterviewQue";
import DailyQuize from "@/components/featured/candidate/afterLogin/services/DailyQuize";
import SkillAssessment from "@/components/featured/candidate/afterLogin/services/SkillAssessment";

function Services() {
  return (
    <div>
      <AiResume />
      <InterviewQue />
      <DailyQuize />
      <SkillAssessment />

      {/* <div className=" bg-[#F9F9F9]">
                <div className=" flex customMargins pt-[24px] h-[1063px] gap-6">
                    <div
                        className="flex flex-col w-[49%] p-2 gap-4 rounded-lg bg-white shadow-md"
                        style={{
                            boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                            overflowY: "auto",
                        }}
                    >
                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Personal Details
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className=" text-[14px] font-montserrat  font-medium">
                                        First Name
                                    </div>
                                    <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter first name"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat  font-medium">
                                        Last Name
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter last name"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat font-medium">
                                        Email ID
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your Email ID"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat  font-medium">
                                        Mobile Number
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your mobile number"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Current Designation
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your designation"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Current Location
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Select your location"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Add Social Link
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder=" Your Social link eg. Linkedin, Behance"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end ">
                                <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                    Save
                                </button>
                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Summary
                            </div>

                            <div className="w-full   rounded-[10px]">

                             




                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Education
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className=" text-[14px] font-montserrat  font-medium">
                                        Highest Qualification
                                    </div>
                                    <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter Highest Qualification"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat  font-medium">
                                        Specialization
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your specialization"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className=" text-[14px] font-montserrat  font-medium">
                                        Institute Name
                                    </div>
                                    <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Search for Institute"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat  font-medium">
                                        Passing Year
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your designation"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Education Type
                                </div>
                                <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
                                    <input type="radio" />
                                    <label>Full-Time</label>

                                    <input type="radio" />
                                    <label>Full-Time</label>
                                </div>
                            </div>
                            <div className="flex justify-end ">
                                <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                    Save
                                </button>
                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Experience
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Designation
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your Designation"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Organisation
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Select Company"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>

                            <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded-md border-2 border-[#06A9EF] bg-white"
                                />
                                <label>Currently working here</label>
                            </div>

                            <div>
                                <DateSelector idPrefix="experience" />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Work Description
                                </div>
                                <div className="w-full text-[14px] font-montserrat  font-small">
                                    Describe about your work
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] h-[140px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end ">
                                <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                    Save
                                </button>
                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Course and Certification
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className=" text-[14px] font-montserrat  font-medium">
                                        Certificate Name
                                    </div>
                                    <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter Certificate Name"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="w-full text-[14px] font-montserrat  font-medium">
                                        Issued by
                                    </div>
                                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="EIssued by"
                                            className="w-full text-[14px] font-montserrat font-small "
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <DateSelector idPrefix="experience" />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Description
                                </div>

                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] h-[140px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end ">
                                <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                    Save
                                </button>
                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[20px] font-montserrat  font-medium">
                                    Skills
                                </div>
                                <div className="w-full text-[14px] font-montserrat  font-small">
                                    List your skills and strengths
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your skills"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>

                                <div className="flex justify-end ">
                                    <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Achievements
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Enter your Achievement"
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>

                            <div>
                                <DateSelector idPrefix="experience" />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full text-[14px] font-montserrat  font-medium">
                                    Description
                                </div>
                                <div className="w-full text-[14px] font-montserrat  font-small">
                                    Write about your Achievement
                                </div>
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] h-[140px]">
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full text-[14px] font-montserrat font-small "
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end ">
                                <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[60px] h-[32px]">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex flex-col w-[49%] p-4 gap-[14px] rounded-lg bg-white shadow-md"
                        style={{
                            boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <div
                            className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] "

                        >
                            <div className=" flex gap-4 pb-[10px]" style={{ overflowX: "auto" }}>
                                <img
                                    src="/images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="/images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className=" text-[20px]  font-montserrat font-medium flex items-center">
                                Preview
                            </div>

                            <div className="flex gap-[16px]">
                                <button className="flex gap-1 text-[12px]  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
                                    <img
                                        src="/images/services/add_link.png"
                                        className="h-[24px] w-[24px] rounded-[6px]"
                                        alt=""
                                    />
                                    Attach
                                </button>

                                <button className=" text-[12px] text-[#333] font-montserrat font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]">
                                    Download Resume
                                </button>
                            </div>
                        </div>




                        <img
                            src="/images/services/Resume-template-3.png"
                            className="h-[729px] w-[520px] rounded-[10px]"
                            alt=""
                        />

                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default Services;
