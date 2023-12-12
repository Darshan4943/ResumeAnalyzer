import React, { useState } from 'react'
import DateSelector from '~/components/common/dateSelector';
import TextEditor from '~/components/common/textEditor';

function AiResumePage() {
    const [selected, setSelected] = useState(false);

    const handleRadioChange = () => {
        setSelected(!selected);
    };
    return (
        <div>
            <div className=" bg-[#F9F9F9] pt-2">
                <div className=" flex customMargins py-6 h-[1087px] gap-6">
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
                            className="flex flex-col p-4 gap-2 rounded-lg bg-white min-h-[320px]"
                            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <div className="w-full text-[20px] font-montserrat font-medium">
                                Summary
                            </div>

                            <div className="w-full h-full rounded-[10px]">

                                <TextEditor />

                            </div>
                            <div className="flex justify-end items-center gap-3 ">
                                <div className='text-[10px] font-[400]'>
                                Remaining Attempts - 3
                                </div>

                                <button className=" flex gap-1 items-center font-montserrat text-xs font-semibold px-[12px] h-[32px] rounded-[8px] border border-[#06A9EF] ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <g clip-path="url(#clip0_4914_60492)">
                                            <path d="M9.84155 5.00781C10.4978 7.80078 12.2048 9.48438 14.9978 10.1523C15.033 10.1602 15.0525 10.1953 15.0447 10.2266C15.0408 10.25 15.0212 10.2695 14.9978 10.2734C12.1814 10.918 10.5017 12.6406 9.83765 15.4375C9.82983 15.4727 9.79468 15.4922 9.75952 15.4844C9.73608 15.4805 9.71655 15.4609 9.71265 15.4375C9.06812 12.6211 7.36108 10.9375 4.5603 10.2656C4.52515 10.2578 4.50562 10.2227 4.51343 10.1875C4.51733 10.1641 4.53687 10.1445 4.5603 10.1406C7.36108 9.49609 9.05249 7.79688 9.72046 5.00391C9.72827 4.96875 9.76343 4.94922 9.79858 4.95703C9.81812 4.97266 9.83765 4.98828 9.84155 5.00781Z" fill="#FFDA1D" />
                                            <path d="M16.4307 0.831971C16.7783 2.30072 17.6729 3.18744 19.1416 3.539C19.1611 3.54291 19.1689 3.56244 19.165 3.57806C19.1611 3.58978 19.1533 3.6015 19.1416 3.6015C17.6611 3.94135 16.7744 4.8476 16.4268 6.31635C16.4229 6.33588 16.4033 6.34369 16.3877 6.33978C16.376 6.33588 16.3643 6.32806 16.3643 6.31635C16.0244 4.83588 15.126 3.94916 13.6533 3.59369C13.6338 3.58978 13.626 3.57025 13.6299 3.55463C13.6338 3.54291 13.6416 3.53119 13.6533 3.53119C15.126 3.19135 16.0166 2.30072 16.3682 0.828065C16.3721 0.808534 16.3877 0.796815 16.4072 0.800721C16.4189 0.804627 16.4268 0.816346 16.4307 0.831971Z" fill="#FFDA1D" />
                                            <path d="M2.80566 3.30463C3.14941 4.77338 4.04785 5.66009 5.5166 6.01166C5.53613 6.01556 5.54395 6.03509 5.54004 6.05072C5.53613 6.06244 5.52832 6.07416 5.5166 6.07416C4.03613 6.414 3.14941 7.32025 2.80176 8.789C2.79785 8.80853 2.77832 8.81635 2.7627 8.81244C2.75098 8.80853 2.73926 8.80072 2.73926 8.789C2.39941 7.30853 1.50098 6.42181 0.0283203 6.06635C0.00878906 6.06244 0.000976562 6.04291 0.00488281 6.02728C0.00878906 6.01556 0.0166016 6.00385 0.0283203 6.00385C1.50098 5.664 2.3916 4.77338 2.74316 3.30072C2.74707 3.28119 2.7666 3.27338 2.78223 3.27728C2.79395 3.2851 2.80566 3.29291 2.80566 3.30463Z" fill="#FFDA1D" />
                                            <path d="M17.0479 13.7187C17.3955 15.1874 18.29 16.0742 19.7588 16.4257C19.7783 16.4296 19.7861 16.4492 19.7822 16.4648C19.7783 16.4765 19.7705 16.4882 19.7588 16.4882C18.2783 16.8281 17.3916 17.7343 17.0439 19.2031C17.04 19.2226 17.0205 19.2304 17.0049 19.2265C16.9932 19.2226 16.9814 19.2148 16.9814 19.2031C16.6416 17.7226 15.7432 16.8359 14.2705 16.4804C14.251 16.4765 14.2432 16.457 14.2471 16.4413C14.251 16.4296 14.2588 16.4179 14.2705 16.4179C15.7432 16.0781 16.6338 15.1874 16.9854 13.7148C16.9893 13.6953 17.0088 13.6835 17.0244 13.6874C17.0361 13.6992 17.0479 13.707 17.0479 13.7187Z" fill="#FFDA1D" />
                                            <path d="M18.2705 9.19135C18.4893 10.1171 19.0557 10.6796 19.9815 10.9023C19.9932 10.9062 19.9971 10.9179 19.9932 10.9296C19.9893 10.9335 19.9854 10.9374 19.9815 10.9414C19.044 11.1562 18.4854 11.7265 18.2666 12.6562C18.2627 12.6679 18.251 12.6757 18.2393 12.6718C18.2315 12.6718 18.2237 12.664 18.2237 12.6562C18.0088 11.7187 17.4424 11.1601 16.5127 10.9374C16.501 10.9335 16.4932 10.9218 16.4971 10.9101C16.4971 10.9023 16.5049 10.8945 16.5127 10.8945C17.4424 10.6796 18.0049 10.1171 18.2276 9.18745C18.2315 9.17573 18.2432 9.16792 18.2549 9.17182C18.2627 9.17573 18.2705 9.18354 18.2705 9.19135Z" fill="#FFDA1D" />
                                            <path d="M4.82133 14.9179C5.04008 15.8437 5.60648 16.4062 6.53227 16.6289C6.54398 16.6328 6.5518 16.6445 6.54789 16.6562C6.54789 16.664 6.54008 16.6718 6.53227 16.6718C5.59867 16.8867 5.04008 17.4609 4.81742 18.3867C4.81352 18.3984 4.8018 18.4062 4.79008 18.4023C4.78227 18.3984 4.77836 18.3945 4.77445 18.3867C4.55961 17.4492 3.9932 16.8906 3.06352 16.6679C3.0518 16.664 3.04398 16.6523 3.04789 16.6406C3.04789 16.6328 3.0557 16.6249 3.06352 16.6249C3.9932 16.4101 4.5557 15.8476 4.77836 14.9179C4.78227 14.9062 4.79398 14.8984 4.8057 14.9023C4.81742 14.9062 4.82133 14.9101 4.82133 14.9179Z" fill="#FFDA1D" />
                                            <path d="M7.1651 0.78119C7.34479 1.54682 7.81354 2.01166 8.58307 2.19525C8.59088 2.19916 8.5987 2.20697 8.59479 2.21478C8.59479 2.2226 8.58698 2.2265 8.58307 2.2265C7.80963 2.40228 7.34479 2.87885 7.1612 3.64838C7.15729 3.65619 7.14948 3.664 7.13776 3.6601C7.12995 3.6601 7.12604 3.65228 7.12604 3.64838C6.95026 2.87494 6.4776 2.4101 5.70807 2.2265C5.70026 2.2226 5.69245 2.21478 5.69635 2.20307C5.69635 2.19525 5.70416 2.19135 5.70807 2.19135C6.4776 2.01557 6.94245 1.54682 7.12995 0.777284C7.13385 0.769472 7.14166 0.761659 7.15338 0.765565C7.15729 0.769472 7.1651 0.773378 7.1651 0.78119Z" fill="#FFDA1D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_4914_60492">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Generate with AI
                                </button>
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
                                <div className="w-full flex gap-2 text-[14px] font-montserrat items-center font-medium">
                                    <input type="radio" className='h-4 w-4'/>
                                    <label>Full-Time</label>

                                    <input type="radio" className='h-4 w-4' />
                                    <label>Part-Time</label>
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
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                                    <textArea
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full text-[14px] font-montserrat font-small h-full  outline-none"
                                        placeholder="Enter text"

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

                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px]  min-h-[140px]">
                                    <textArea
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full h-full text-[14px] font-montserrat font-small outline-none "
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
                                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                                    <textArea
                                        type="text"
                                        name=""
                                        id=""
                                        className="w-full text-[14px] font-montserrat font-small outline-none h-full "
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
                                    src="./images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-1.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-2.png"
                                    className="h-[200px] w-[140.91px] rounded-[6px]"
                                    alt=""
                                />
                                <img
                                    src="./images/services/resume-template-1.png"
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
                                        src="./images/services/add_link.png"
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
                            src="./images/services/Resume-template-3.png"
                            className="h-[729px] w-[520px] rounded-[10px]"
                            alt=""
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiResumePage
