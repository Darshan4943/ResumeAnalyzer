import React, { useEffect, useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LineChartt from "../../common/LineChart";
import CountUp from "react-countup";


function Analytics({ jobDetails }) {
  console.log(122, jobDetails)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last 7 Days");
  const [view, setView] = useState(jobDetails?.data.summary.views);


  const summaryData = [
    { label: "Pending", value: jobDetails.data.summary?.totalPending || 0, color: "#FFB836" },
    { label: "Shortlisted", value: jobDetails.data.summary?.totalShortlisted || 0, color: "#7B61FF" },
    { label: "Rejected", value: jobDetails.data.summary?.totalRejected || 0, color: "#FF6550" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex w-full md:w-[66.03%] flex-col gap-3 md:gap-[24px] mt-3 md:mt-4">
        <div className="flex w-full gap-3 md:gap-[24px]">
          <div
            className="flex rounded-[12px] md:rounded-[16px] ml:p-4 p-2 flex-col items-start gap-4 bg-[#fff] self-stretch w-full h-fit"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <p className="text-[#333] font-Montserrat text-[14px] ml:text-[20px] font-medium">
                Total Views
              </p>
              <div className="flex p-[6px] rounded-[32px] bg-[#26A4FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g mask="url(#mask0_6622_122128)">
                    <path
                      d="M10 13.5C10.9722 13.5 11.7986 13.1597 12.4792 12.4792C13.1597 11.7986 13.5 10.9722 13.5 10C13.5 9.02778 13.1597 8.20139 12.4792 7.52083C11.7986 6.84028 10.9722 6.5 10 6.5C9.02778 6.5 8.20139 6.84028 7.52083 7.52083C6.84028 8.20139 6.5 9.02778 6.5 10C6.5 10.9722 6.84028 11.7986 7.52083 12.4792C8.20139 13.1597 9.02778 13.5 10 13.5ZM10 12C9.44444 12 8.97222 11.8056 8.58333 11.4167C8.19444 11.0278 8 10.5556 8 10C8 9.44444 8.19444 8.97222 8.58333 8.58333C8.97222 8.19444 9.44444 8 10 8C10.5556 8 11.0278 8.19444 11.4167 8.58333C11.8056 8.97222 12 9.44444 12 10C12 10.5556 11.8056 11.0278 11.4167 11.4167C11.0278 11.8056 10.5556 12 10 12ZM10 16C8.0195 16 6.21535 15.4549 4.58754 14.3646C2.95974 13.2743 1.76389 11.8194 1 10C1.76389 8.18056 2.95974 6.72569 4.58754 5.63542C6.21535 4.54514 8.0195 4 10 4C11.9805 4 13.7847 4.54514 15.4125 5.63542C17.0403 6.72569 18.2361 8.18056 19 10C18.2361 11.8194 17.0403 13.2743 15.4125 14.3646C13.7847 15.4549 11.9805 16 10 16ZM10 14.5C11.5556 14.5 12.9931 14.0972 14.3125 13.2917C15.6319 12.4861 16.6458 11.3889 17.3542 10C16.6458 8.61111 15.6319 7.51389 14.3125 6.70833C12.9931 5.90278 11.5556 5.5 10 5.5C8.44444 5.5 7.00694 5.90278 5.6875 6.70833C4.36806 7.51389 3.35417 8.61111 2.64583 10C3.35417 11.3889 4.36806 12.4861 5.6875 13.2917C7.00694 14.0972 8.44444 14.5 10 14.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex gap-2 items-center">
                <p className="  text-[#333] flex items font-Montserrat font-semibold sm:text-[26px] text-[18px] ml:text-[36px]">
                  <CountUp end={jobDetails.data.summary.views?.length} />
                </p>
                <div className="flex text-center items-center">
                  <p className="text-[#56CDAD] items-center text-[18px] font-medium">
                    0.4%
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_6622_122136)">
                      <path
                        d="M15 13L10 8L5 13H15Z"
                        fill="#56CDAD"
                        stroke="#56CDAD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="text-[#646464] font-Montserrat font-Medium ">
                From last day
              </p>
            </div>
          </div>
          <div
            className="flex rounded-[12px] md:rounded-[16px] ml:p-4 p-2 flex-col items-start gap-4 bg-[#fff] self-stretch w-full h-fit"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <p className="text-[#333] font-Montserrat text-[14px] ml:text-[20px] font-medium">
                Total Applied
              </p>
              <div className="flex p-[6px] rounded-[32px] bg-[#26A4FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g mask="url(#mask0_6622_122128)">
                    <path
                      d="M10 13.5C10.9722 13.5 11.7986 13.1597 12.4792 12.4792C13.1597 11.7986 13.5 10.9722 13.5 10C13.5 9.02778 13.1597 8.20139 12.4792 7.52083C11.7986 6.84028 10.9722 6.5 10 6.5C9.02778 6.5 8.20139 6.84028 7.52083 7.52083C6.84028 8.20139 6.5 9.02778 6.5 10C6.5 10.9722 6.84028 11.7986 7.52083 12.4792C8.20139 13.1597 9.02778 13.5 10 13.5ZM10 12C9.44444 12 8.97222 11.8056 8.58333 11.4167C8.19444 11.0278 8 10.5556 8 10C8 9.44444 8.19444 8.97222 8.58333 8.58333C8.97222 8.19444 9.44444 8 10 8C10.5556 8 11.0278 8.19444 11.4167 8.58333C11.8056 8.97222 12 9.44444 12 10C12 10.5556 11.8056 11.0278 11.4167 11.4167C11.0278 11.8056 10.5556 12 10 12ZM10 16C8.0195 16 6.21535 15.4549 4.58754 14.3646C2.95974 13.2743 1.76389 11.8194 1 10C1.76389 8.18056 2.95974 6.72569 4.58754 5.63542C6.21535 4.54514 8.0195 4 10 4C11.9805 4 13.7847 4.54514 15.4125 5.63542C17.0403 6.72569 18.2361 8.18056 19 10C18.2361 11.8194 17.0403 13.2743 15.4125 14.3646C13.7847 15.4549 11.9805 16 10 16ZM10 14.5C11.5556 14.5 12.9931 14.0972 14.3125 13.2917C15.6319 12.4861 16.6458 11.3889 17.3542 10C16.6458 8.61111 15.6319 7.51389 14.3125 6.70833C12.9931 5.90278 11.5556 5.5 10 5.5C8.44444 5.5 7.00694 5.90278 5.6875 6.70833C4.36806 7.51389 3.35417 8.61111 2.64583 10C3.35417 11.3889 4.36806 12.4861 5.6875 13.2917C7.00694 14.0972 8.44444 14.5 10 14.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex gap-2 items-center">
                <p className="  text-[#333] flex items font-Montserrat font-semibold sm:text-[26px] text-[18px] ml:text-[36px]">
                  <CountUp end={jobDetails.data.applications?.length} />
                </p>
                <div className="flex text-center ">
                  <p className="text-[#FF6550] items-center text-[18px] font-medium">
                    0.4%
                  </p>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6706_102360)">
                      <path d="M5 8L10 13L15 8L5 8Z" fill="#FF6550" stroke="#FF6550" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="text-[#646464] font-Montserrat font-Medium ">
                From last day
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between md:justify-start md:gap-[24px]">
          {summaryData.map((item, index) => (
            <div key={index} className="w-[32%] md:w-[22.85%] bg-[#FFFFFF] rounded-[12px] md:rounded-[16px] py-[16px] md:py-[24px] px-[10px] md:px-[16px] flex flex-col items-center gap-[8px] md:gap-[12px]">
              <div className="flex gap-[6px] items-center">
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5.5" cy="5" r="5" fill={item.color} />
                </svg>
                <span className="text-[12px] md:text-[20px] text-[#333333] font-[600]">{item.label}</span>
              </div>
              <span className="text-[12px] md:text-[20px] text-[#333333] font-[600]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-[#FFFFFF] rounded-[12px] md:rounded-[16px]">
          <div className="w-full h-128">
            <div className="w-full flex justify-between px-6 pt-4">
              <span className="text-[10px] md:text-[18px] text-[#333333] font-[600]">Job Listing View stats</span>
              <div className="rounded-[30px] flex justify-between gap-2 py-3 px-4 border-[1px] border-solid border-[#D6DDEB]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 8.5L12 15.5L5 8.5" stroke="#646464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div onClick={toggleDropdown} className="text-[14px] cursor-pointer text-end font-[500] text-[#646464] relative w-[142px]">
                  <span className="">{selectedOption}</span>
                  {isOpen && (
                    <div className="absolute w-full flex flex-col bg-white"
                      style={{
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {["Last 7 Days", "This Month", "This Year"].map((option, index) => (
                        <span
                          key={index}
                          className="hover:bg-[#DFF4FD] hover:text-[#06A9EF] text-[14px] font-[500] text-[#646464] px-2 py-1 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleOptionSelect(option)

                          }
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* <select name="" id="" className="outline-none">
                  <option value="">Last 7 Days</option>
                  <option value="">This Month</option>
                  <option value="">LastYear</option>
                </select> */}
              </div>
            </div>
            <LineChartt />
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
