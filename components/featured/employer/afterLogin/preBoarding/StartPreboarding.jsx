import React from 'react'

function StartPreboarding({ setStartPreboarding }) {
    return (
        <div
            className="flex flex-col items-center gap-3 p-3 bg-white w-[70%] rounded-[16px]"
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
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <div
                            className="flex p-3 gap-3 flex-col self-stretch bg-[#BCEBFF] rounded-xl"
                            style={{ border: "1px solid var(--primary, #06A9EF)" }}
                        >
                            <div className="flex items-start gap-1 self-stretch">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_7804_54450)">
                                        <path
                                            d="M9.9974 14.166C11.1502 14.166 12.1328 13.7598 12.9453 12.9473C13.7578 12.1348 14.1641 11.1521 14.1641 9.99935C14.1641 8.84657 13.7578 7.86393 12.9453 7.05143C12.1328 6.23893 11.1502 5.83268 9.9974 5.83268C8.84462 5.83268 7.86198 6.23893 7.04948 7.05143C6.23698 7.86393 5.83073 8.84657 5.83073 9.99935C5.83073 11.1521 6.23698 12.1348 7.04948 12.9473C7.86198 13.7598 8.84462 14.166 9.9974 14.166ZM9.9974 18.3327C8.84462 18.3327 7.76128 18.1139 6.7474 17.6764C5.73351 17.2389 4.85156 16.6452 4.10156 15.8952C3.35156 15.1452 2.75781 14.2632 2.32031 13.2493C1.88281 12.2355 1.66406 11.1521 1.66406 9.99935C1.66406 8.84657 1.88281 7.76324 2.32031 6.74935C2.75781 5.73546 3.35156 4.85352 4.10156 4.10352C4.85156 3.35352 5.73351 2.75977 6.7474 2.32227C7.76128 1.88477 8.84462 1.66602 9.9974 1.66602C11.1502 1.66602 12.2335 1.88477 13.2474 2.32227C14.2613 2.75977 15.1432 3.35352 15.8932 4.10352C16.6432 4.85352 17.237 5.73546 17.6745 6.74935C18.112 7.76324 18.3307 8.84657 18.3307 9.99935C18.3307 11.1521 18.112 12.2355 17.6745 13.2493C17.237 14.2632 16.6432 15.1452 15.8932 15.8952C15.1432 16.6452 14.2613 17.2389 13.2474 17.6764C12.2335 18.1139 11.1502 18.3327 9.9974 18.3327ZM9.9974 16.666C11.8585 16.666 13.4349 16.0202 14.7266 14.7285C16.0182 13.4368 16.6641 11.8605 16.6641 9.99935C16.6641 8.13824 16.0182 6.56185 14.7266 5.27018C13.4349 3.97852 11.8585 3.33268 9.9974 3.33268C8.13628 3.33268 6.5599 3.97852 5.26823 5.27018C3.97656 6.56185 3.33073 8.13824 3.33073 9.99935C3.33073 11.8605 3.97656 13.4368 5.26823 14.7285C6.5599 16.0202 8.13628 16.666 9.9974 16.666Z"
                                            fill="#06A9EF"
                                        />
                                    </g>
                                </svg>
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
                            <div className="flex items-start gap-1 self-stretch">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <g mask="url(#mask0_7804_54450)">
                                        <path
                                            d="M9.9974 14.166C11.1502 14.166 12.1328 13.7598 12.9453 12.9473C13.7578 12.1348 14.1641 11.1521 14.1641 9.99935C14.1641 8.84657 13.7578 7.86393 12.9453 7.05143C12.1328 6.23893 11.1502 5.83268 9.9974 5.83268C8.84462 5.83268 7.86198 6.23893 7.04948 7.05143C6.23698 7.86393 5.83073 8.84657 5.83073 9.99935C5.83073 11.1521 6.23698 12.1348 7.04948 12.9473C7.86198 13.7598 8.84462 14.166 9.9974 14.166ZM9.9974 18.3327C8.84462 18.3327 7.76128 18.1139 6.7474 17.6764C5.73351 17.2389 4.85156 16.6452 4.10156 15.8952C3.35156 15.1452 2.75781 14.2632 2.32031 13.2493C1.88281 12.2355 1.66406 11.1521 1.66406 9.99935C1.66406 8.84657 1.88281 7.76324 2.32031 6.74935C2.75781 5.73546 3.35156 4.85352 4.10156 4.10352C4.85156 3.35352 5.73351 2.75977 6.7474 2.32227C7.76128 1.88477 8.84462 1.66602 9.9974 1.66602C11.1502 1.66602 12.2335 1.88477 13.2474 2.32227C14.2613 2.75977 15.1432 3.35352 15.8932 4.10352C16.6432 4.85352 17.237 5.73546 17.6745 6.74935C18.112 7.76324 18.3307 8.84657 18.3307 9.99935C18.3307 11.1521 18.112 12.2355 17.6745 13.2493C17.237 14.2632 16.6432 15.1452 15.8932 15.8952C15.1432 16.6452 14.2613 17.2389 13.2474 17.6764C12.2335 18.1139 11.1502 18.3327 9.9974 18.3327ZM9.9974 16.666C11.8585 16.666 13.4349 16.0202 14.7266 14.7285C16.0182 13.4368 16.6641 11.8605 16.6641 9.99935C16.6641 8.13824 16.0182 6.56185 14.7266 5.27018C13.4349 3.97852 11.8585 3.33268 9.9974 3.33268C8.13628 3.33268 6.5599 3.97852 5.26823 5.27018C3.97656 6.56185 3.33073 8.13824 3.33073 9.99935C3.33073 11.8605 3.97656 13.4368 5.26823 14.7285C6.5599 16.0202 8.13628 16.666 9.9974 16.666Z"
                                            fill="#06A9EF"
                                        />
                                    </g>
                                </svg>
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
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1 self-stretch">
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
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                                Photo ID
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                                Start Preboarding Process for candidate 1
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
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                                Photo ID
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                                Start Preboarding Process for candidate 1
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
                        <div className="flex flex-col items-start gap-1 self-stretch justify-center">
                            <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                                Photo ID
                            </p>
                            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                                Start Preboarding Process for candidate 1
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
                        <p className="text-[14px] font-Montserrat font-medium text-[#333]">Academic Certificate</p>

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
                        Previous Work Experience
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