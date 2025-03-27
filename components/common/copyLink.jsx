import React, { useState } from 'react';

function CopyLink({ setShowPopup, generatedLink, popupRef }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
    };
    return (
        <>
            <div onClick={() => setShowPopup(false)} className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "16px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 1000,

                    }}
                    ref={popupRef}
                    className="ms:w-[600px] w-[300px]"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <p className='text-[14px] font-semibold'>Share Job Link</p>
                            <div className="flex gap-4 items-center">
                                {/* <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy();
                                    }}
                                    className="text-blue"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {copied ? "Link Copied!" : "Copy Link"}
                                </button> */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowPopup(false)}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 20 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.99735 11.1271L3.50485 17.6191C3.21518 17.9091 2.86402 18.0508 2.45135 18.0441C2.03835 18.0378 1.68702 17.8898 1.39735 17.6001C1.10768 17.3104 0.96285 16.9559 0.96285 16.5366C0.96285 16.1173 1.10768 15.7628 1.39735 15.4731L7.87035 9.0001L1.37835 2.5576C1.08835 2.26793 0.946683 1.91343 0.95335 1.4941C0.959683 1.0751 1.10768 0.720761 1.39735 0.431094C1.68702 0.141094 2.04152 -0.00390625 2.46085 -0.00390625C2.88018 -0.00390625 3.23468 0.141094 3.52435 0.431094L9.99735 6.9231L16.4398 0.431094C16.7295 0.141094 17.0807 -0.00390625 17.4933 -0.00390625C17.9063 -0.00390625 18.2577 0.141094 18.5473 0.431094C18.8577 0.741095 19.0128 1.10059 19.0128 1.5096C19.0128 1.9186 18.8577 2.26793 18.5473 2.5576L12.0743 9.0001L18.5663 15.4926C18.8563 15.7823 19.0013 16.1334 19.0013 16.5461C19.0013 16.9591 18.8563 17.3104 18.5663 17.6001C18.2563 17.9104 17.8968 18.0656 17.4878 18.0656C17.0788 18.0656 16.7295 17.9104 16.4398 17.6001L9.99735 11.1271Z"
                                            fill="#333333"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className='flex ms:flex-row flex-col items-end gap-2'>
                            <input
                                type="text"
                                value={generatedLink}
                                readOnly
                                className='rounded-[6px] border h-[38px] border-[#DEDEDE] placeholder:text-[12px] text-[12px] w-full px-2 font-normal placeholder:font-normal'
                            />
                            {!copied ?
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy();
                                }} className='min-w-[142px] max-w-[142px] items-center text-[12px] font-semibold flex gap-1 px-6 h-[38px] bg_Button rounded-[30px]'>

                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <g mask="url(#mask0_9327_110558)">
                                            <path d="M5.25 12.75C4.2125 12.75 3.32812 12.3844 2.59687 11.6531C1.86562 10.9219 1.5 10.0375 1.5 9C1.5 7.9625 1.86562 7.07812 2.59687 6.34687C3.32812 5.61562 4.2125 5.25 5.25 5.25H7.5C7.7125 5.25 7.89063 5.32187 8.03438 5.46562C8.17813 5.60938 8.25 5.7875 8.25 6C8.25 6.2125 8.17813 6.39062 8.03438 6.53437C7.89063 6.67813 7.7125 6.75 7.5 6.75H5.25C4.625 6.75 4.09375 6.96875 3.65625 7.40625C3.21875 7.84375 3 8.375 3 9C3 9.625 3.21875 10.1562 3.65625 10.5938C4.09375 11.0312 4.625 11.25 5.25 11.25H7.5C7.7125 11.25 7.89063 11.3219 8.03438 11.4656C8.17813 11.6094 8.25 11.7875 8.25 12C8.25 12.2125 8.17813 12.3906 8.03438 12.5344C7.89063 12.6781 7.7125 12.75 7.5 12.75H5.25ZM6.75 9.75C6.5375 9.75 6.35938 9.67812 6.21562 9.53438C6.07188 9.39062 6 9.2125 6 9C6 8.7875 6.07188 8.60938 6.21562 8.46562C6.35938 8.32187 6.5375 8.25 6.75 8.25H11.25C11.4625 8.25 11.6406 8.32187 11.7844 8.46562C11.9281 8.60938 12 8.7875 12 9C12 9.2125 11.9281 9.39062 11.7844 9.53438C11.6406 9.67812 11.4625 9.75 11.25 9.75H6.75ZM10.5 12.75C10.2875 12.75 10.1094 12.6781 9.96563 12.5344C9.82188 12.3906 9.75 12.2125 9.75 12C9.75 11.7875 9.82188 11.6094 9.96563 11.4656C10.1094 11.3219 10.2875 11.25 10.5 11.25H12.75C13.375 11.25 13.9062 11.0312 14.3438 10.5938C14.7812 10.1562 15 9.625 15 9C15 8.375 14.7812 7.84375 14.3438 7.40625C13.9062 6.96875 13.375 6.75 12.75 6.75H10.5C10.2875 6.75 10.1094 6.67813 9.96563 6.53437C9.82188 6.39062 9.75 6.2125 9.75 6C9.75 5.7875 9.82188 5.60938 9.96563 5.46562C10.1094 5.32187 10.2875 5.25 10.5 5.25H12.75C13.7875 5.25 14.6719 5.61562 15.4031 6.34687C16.1344 7.07812 16.5 7.9625 16.5 9C16.5 10.0375 16.1344 10.9219 15.4031 11.6531C14.6719 12.3844 13.7875 12.75 12.75 12.75H10.5Z" fill="white" />
                                        </g>
                                    </svg>
                                    Copy Link

                                </button>
                                :
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy();
                                }} className='min-w-[142px] max-w-[142px] items-center text-[12px] font-semibold flex gap-1 px-6 h-[38px] text-white bg-[#0275A7] rounded-[30px]'>

                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16913 7.3625L10.5254 1.00625C10.6754 0.85625 10.8504 0.78125 11.0504 0.78125C11.2504 0.78125 11.4254 0.85625 11.5754 1.00625C11.7254 1.15625 11.8004 1.33438 11.8004 1.54063C11.8004 1.74688 11.7254 1.925 11.5754 2.075L4.69413 8.975C4.54413 9.125 4.36913 9.2 4.16913 9.2C3.96913 9.2 3.79413 9.125 3.64413 8.975L0.419125 5.75C0.269125 5.6 0.19725 5.42188 0.2035 5.21563C0.20975 5.00938 0.287875 4.83125 0.437875 4.68125C0.587875 4.53125 0.766 4.45625 0.97225 4.45625C1.1785 4.45625 1.35662 4.53125 1.50662 4.68125L4.16913 7.3625Z" fill="white" />
                                    </svg>
                                    Link Copied

                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CopyLink;
