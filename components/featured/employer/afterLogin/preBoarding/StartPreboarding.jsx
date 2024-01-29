import React from 'react'

function StartPreboarding({ setStartPreboarding }) {
    return (
        <div
            className="flex flex-col items-center gap-3 p-3 bg-white ml:w-[70%] w-full rounded-[16px] h-[80vh]   overflow-y-auto"
            style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
        >
            <div className="flex  justify-between items-start self-stretch gap-4">
                <p className="text-[18px] ml:text-[24px] font-Montserrat font-medium text-[#333]">
                    Start Preboarding Process for candidate 1
                </p>
                <svg
                    onClick={() => setStartPreboarding(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <g mask="url(#mask0_7804_54441)">
                        <path
                            d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                            fill="#333333"
                        />
                    </g>
                </svg>
            </div>
            <div className="flex flex-col gap-3 self-stretch items-start">
                <div className="flex flex-col items-start gap-3 self-stretch">
                    <p className="text-[16px] ml:text-[20px] font-Montserrat font-medium text-[#333]">
                        Start Documentation by
                    </p>
                    <div className="flex ml:flex-row flex-col items-start gap-2 self-stretch">
                        <div
                            className="flex p-3 gap-3 flex-col self-stretch bg-[#BCEBFF] rounded-xl"
                            style={{ border: "1px solid var(--primary, #06A9EF)" }}
                        >
                            <div className="flex items-start gap-1 self-stretch leading-[20px]">
                              
                                <input
                        type="radio"
                        name="approvalChoice"
                        value="yes"
                        className="h-[20px] w-[20px] custom-radio cursor-pointer"
                        // onChange={(e) => handleApprovalChoice(e.target.value)}
                        checked
                    />
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-medium text-[#333]">
                                        Start by collecting documents
                                    </p>
                                    <p className="text-[12px] font-Montserrat font-medium text-[#333]">
                                        Candidate can submit documents through candidate portal
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex p-3 gap-3 flex-col self-stretch bg-[fFF] rounded-xl"
                            style={{ border: "1px solid var(--primary, #06A9EF)" }}
                        >
                            <div className="flex items-start gap-1 self-stretch leading-[20px]">
                              
                                <input
                        type="radio"
                        name="approvalChoice"
                        value="no"
                        className="h-[20px] w-[20px] custom-radio cursor-pointer"
                    // onChange={(e) => handleApprovalChoice(e.target.value)}
                    />
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-medium text-[#333]">
                                    Start without collecting Documents
                                    </p>
                                    <p className="text-[12px] font-Montserrat font-medium text-[#333]">
                                    Start generating offer letter for the candidate directly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1 self-stretch ">
                    <p className="text-[16px] ml:text-[20px] font-Montserrat font-medium text-[#333]">
                        Documents
                    </p>
                    <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                        Select the documents you want to collect from the list below
                    </p>
                </div>
                <div className="flex flex-col gap-4 self-stretch items-start">
                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
                        Personal ID Proof
                    </p>
                    <div className="flex items-start gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                                Photo ID
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                            Aadhar card, Driving License, Pan Card, Passport, Voter ID Card
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                                
                            }}
                        />
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                            Address Proof
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                            Aadhar card, Driving License, Passport, Voter ID Card
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                            Payroll
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                            Pan Card, Bank statement
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
                        Degrees & Certificates
                    </p>
                    <div className="flex items-center gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <p className="text-[14px] font-Montserrat font-medium text-[#333]">Academic Certificate</p>

                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <p className="text-[14px] font-Montserrat font-medium text-[#333]">Degrees & Certificates</p>

                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <p className="text-[14px] font-Montserrat font-medium text-[#333]">Certifications</p>

                    </div>

                </div>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
                        Previous Work Experience
                    </p>
                    <div className="flex items-center gap-2 self-stretch">
                        <input
                            type="checkbox"
                            style={{
                                borderRadius: "5px",
                                border: "1px solid #06A9EF",
                                backgroundColor: "white",
                                height: "20px",
                                width: "20px",
                            }}
                        />
                        <p className="text-[14px] font-Montserrat font-medium text-[#333]">Experience & Appreciation Letters</p>

                    </div>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                        <g mask="url(#mask0_7804_65968)">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#06A9EF" />
                        </g>
                    </svg>
                    <p className="text-[12px] ml:text-[14px] font-Montserrat font-semibold text-[#06A9EF]">
                    Add Note for Candidate
                    </p>

                </div>
                <div className="flex justify-end gap-4 self-stretch items-start">
                    <button onClick={() => setStartPreboarding(false)} className="text-[16px] py-2 px-4 justify-center items-center rounded-xl bg-white font-Montserrat font-medium text-[#333]"
                        style={{ border: '1px solid var(--primary, #06A9EF)' }}
                    >Cancel</button>
                    <button onClick={() => setStartPreboarding(false)} className="text-[16px] py-2 px-4 justify-center items-center rounded-xl bg-[#06A9EF] font-Montserrat font-medium text-[#fff]"
                        style={{ border: '1px solid var(--primary, #06A9EF)' }}
                    >Send</button>


                </div>
            </div>
        </div>
    )
}

export default StartPreboarding