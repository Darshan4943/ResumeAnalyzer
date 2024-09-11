import React from "react";
import MiniLoader from "../common/mini-loader";

const PurchasedFailed = ({
    setFreePlanFailed,alreadyUsedFree
}) => {
    return (
        <div className="expiryModel">
            <div className="modal">
                <div className="bg-white p-[16px] rounded-[18px] w-[300px] scr420:w-[400px] ml:w-[400px] min-h-[220px] flex flex-col gap-6 items-center justify-center">
                    <div className="flex flex-col gap-[16px]">
                        <div className={`flex flex-row ${alreadyUsedFree ? "items-start":"items-center"} gap-[12px]`}>
                            <svg
                               className="pt-2"
                                width="34"
                                height="34"
                                viewBox="0 0 34 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.9997 33.6663C14.6941 33.6663 12.5275 33.2288 10.4997 32.3538C8.4719 31.4788 6.70801 30.2913 5.20801 28.7913C3.70801 27.2913 2.52051 25.5275 1.64551 23.4997C0.770508 21.4719 0.333008 19.3052 0.333008 16.9997C0.333008 14.6941 0.770508 12.5275 1.64551 10.4997C2.52051 8.4719 3.70801 6.70801 5.20801 5.20801C6.70801 3.70801 8.4719 2.52051 10.4997 1.64551C12.5275 0.770508 14.6941 0.333008 16.9997 0.333008C19.3052 0.333008 21.4719 0.770508 23.4997 1.64551C25.5275 2.52051 27.2913 3.70801 28.7913 5.20801C30.2913 6.70801 31.4788 8.4719 32.3538 10.4997C33.2288 12.5275 33.6663 14.6941 33.6663 16.9997C33.6663 19.3052 33.2288 21.4719 32.3538 23.4997C31.4788 25.5275 30.2913 27.2913 28.7913 28.7913C27.2913 30.2913 25.5275 31.4788 23.4997 32.3538C21.4719 33.2288 19.3052 33.6663 16.9997 33.6663ZM16.9997 30.8884C18.6297 30.8884 20.1991 30.6176 21.708 30.0759C23.2172 29.5343 24.5829 28.7495 25.8051 27.7218L6.27759 8.19426C5.26815 9.43481 4.48801 10.8068 3.93717 12.3101C3.38634 13.8131 3.11092 15.3763 3.11092 16.9997C3.11092 20.8769 4.45634 24.1611 7.14717 26.8522C9.83829 29.543 13.1225 30.8884 16.9997 30.8884ZM27.6943 25.8051C28.6848 24.5829 29.4648 23.2172 30.0343 21.708C30.6037 20.1991 30.8884 18.6297 30.8884 16.9997C30.8884 13.1225 29.543 9.83829 26.8522 7.14717C24.1611 4.45634 20.8769 3.11092 16.9997 3.11092C15.3763 3.11092 13.8131 3.38634 12.3101 3.93717C10.8068 4.48801 9.43481 5.27731 8.19426 6.30509L27.6943 25.8051Z"
                                    fill="#C00000"
                                />
                            </svg>

                            <span className={`text-[20px] scr390:text-[24px] ${ alreadyUsedFree ? "ml:text-[28px]" : "ml:text-[26px]"} text-[#333333] font-semibold text-center`}>
                              {alreadyUsedFree ? "You have already used free plan" : "Purchased Cancelled !"}  
                            </span>
                        </div>
                        <span className="text-[12px] scr390:text-[14px] ml:text-[16px] text-[#333333] font-medium text-center">
                        {alreadyUsedFree ? "Please try another plan" : " Purchased Cancelled, please try again."}  
                        </span>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[16px] ">
                        <button
                            onClick={() => {
                                setFreePlanFailed(false);
                               
                                // setIsRetry(false);
                            }}
                            className="border-[#06A9EF] py-[12px] px-[24px] border text-[#fff] bg-[#06A9EF] text-[16px] font-semibold rounded-[12px] "
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasedFailed;
