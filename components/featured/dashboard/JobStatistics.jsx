import React, { useEffect, useState } from "react";
import StackedBarChart from "../../common/StackedBarChart";
import CountUp from "react-countup";

function JobStatistics({ setSelected, selected, data }) {
  const calculatePercentageChange = (analytics) => {
    if (analytics?.length >= 2) {
      const lastValue = analytics[analytics.length - 1];
      const secondLastValue = analytics[analytics.length - 2];

      const percentageChange =
        secondLastValue !== 0
          ? ((lastValue - secondLastValue) / secondLastValue) * 100
          : lastValue !== 0
          ? 100
          : 0;

      return percentageChange.toFixed(2);
    }
    return null;
  };

  const applicantChange = calculatePercentageChange(data?.applicantAnalytics);
  const viewsChange = calculatePercentageChange(data?.viewsAnalytics);

  return (
    <div
      className="scr1300:w-[66.17%] w-[100%] bg-[#fff] flex flex-col items-center gap-4 sm:px-4 px-2 py-3"
      style={{
        borderRadius: "16px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        className="flex pb-2 flex-col gap-4 self-stretch"
        style={{
          borderBottom: " 1px solid var(--Text-Secondary, #646464)",
        }}
      >
        <div className="flex justify-between items-center self-stretch">
          <div className="flex flex-col items-start lg:gap-1 gap-[2px]">
            <p className="text-[#333333] font-Montserrat text-[12px] lg:text-[24px] font-medium leading-[20px]">
              {" "}
              Job statistics
            </p>
            <p className="text-[#646464] lg:text-[12px] text-[10px] font-medium">
              Showing Job statistics{" "}
              {selected === "Monthly"
                ? `Start: ${new Date(data?.dateRange?.start).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                    }
                  )}, End: ${new Date(data?.dateRange?.end).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                    }
                  )}`
                : `Start: ${new Date(data?.dateRange?.start).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}, End: ${new Date(data?.dateRange?.end).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}`}
            </p>
          </div>
          <div className="flex items-end lg:gap-[6px] gap-1">
            <button
              onClick={() => setSelected("Daily")}
              className={`px-2 p-1 border-[0.5px] border-solid ${
                selected === "Daily"
                  ? "border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF]"
                  : "border-[#DEDEDE] text-[#333333]"
              } rounded-[6px] text-[12px] font-[500]`}
            >
              Daily
            </button>
            <button
              onClick={() => setSelected("Weekly")}
              className={`px-2 p-1 border-[0.5px] border-solid ${
                selected === "Weekly"
                  ? "border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF]"
                  : "border-[#DEDEDE] text-[#333333]"
              } rounded-[6px] text-[12px] font-[500]`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelected("Monthly")}
              className={`px-2 p-1 border-[0.5px] border-solid ${
                selected === "Monthly"
                  ? "border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF]"
                  : "border-[#DEDEDE] text-[#333333]"
              } rounded-[6px] text-[12px] font-[500]`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      <div className="lg:flex w-full ml:flex-row-reverse flex-col flex gap-2 justify-between">
        <div className="flex ml:flex-col flex-row items-start gap-2 ml:gap-4 lg:w-[32.23%] w-[100%]">
          <div
            className="flex ml:p-4 p-2 flex-col items-start ml:gap-2 gap-1 bg-[#fff] self-stretch w-full"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <p className="text-[#333] font-Montserrat text-[12px] ml:text-[16px] font-semibold">
                {" "}
                Job Views
              </p>
              <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#FFDA1D]">
                <svg
                  xlgns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M18.266 9.66634C16.5827 5.75801 13.416 3.33301 9.99932 3.33301C6.58266 3.33301 3.41599 5.75801 1.73266 9.66634C1.68677 9.77148 1.66309 9.88496 1.66309 9.99967C1.66309 10.1144 1.68677 10.2279 1.73266 10.333C3.41599 14.2413 6.58266 16.6663 9.99932 16.6663C13.416 16.6663 16.5827 14.2413 18.266 10.333C18.3119 10.2279 18.3356 10.1144 18.3356 9.99967C18.3356 9.88496 18.3119 9.77148 18.266 9.66634ZM9.99932 14.9997C7.34932 14.9997 4.85766 13.0913 3.41599 9.99967C4.85766 6.90801 7.34932 4.99967 9.99932 4.99967C12.6493 4.99967 15.141 6.90801 16.5827 9.99967C15.141 13.0913 12.6493 14.9997 9.99932 14.9997ZM9.99932 6.66634C9.34005 6.66634 8.69559 6.86184 8.14742 7.22811C7.59926 7.59438 7.17202 8.11498 6.91972 8.72406C6.66743 9.33315 6.60142 10.0034 6.73004 10.65C6.85866 11.2966 7.17613 11.8905 7.6423 12.3567C8.10848 12.8229 8.70242 13.1403 9.34902 13.269C9.99563 13.3976 10.6658 13.3316 11.2749 13.0793C11.884 12.827 12.4046 12.3997 12.7709 11.8516C13.1372 11.3034 13.3327 10.6589 13.3327 9.99967C13.3327 9.11562 12.9815 8.26777 12.3563 7.64265C11.7312 7.01753 10.8834 6.66634 9.99932 6.66634ZM9.99932 11.6663C9.66969 11.6663 9.34745 11.5686 9.07337 11.3855C8.79929 11.2023 8.58567 10.942 8.45952 10.6375C8.33338 10.3329 8.30037 9.99783 8.36468 9.67452C8.42899 9.35122 8.58772 9.05425 8.82081 8.82116C9.0539 8.58808 9.35087 8.42934 9.67417 8.36503C9.99747 8.30072 10.3326 8.33373 10.6371 8.45988C10.9417 8.58602 11.202 8.79964 11.3851 9.07372C11.5682 9.34781 11.666 9.67004 11.666 9.99967C11.666 10.4417 11.4904 10.8656 11.1778 11.1782C10.8653 11.4907 10.4414 11.6663 9.99932 11.6663Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[30px]">
                <CountUp end={data.totalViews} />
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[#646464] text-[12px] ml:text-[14px] font-Montserrat font-Medium">
                  {selected === "Daily"
                    ? "This Week"
                    : selected === "Weekly"
                    ? "This Month"
                    : "This Year"}
                </p>
                <div className="flex items-center">
                  <p className="text-[#06A9EF] items-center ml:text-[14px]  text-[10px] font-medium">
                    {viewsChange && (
                      <p
                        className={`${
                          viewsChange > 0
                            ? "text-[#06A9EF]"
                            : viewsChange == 0
                            ? "text-[#333333]"
                            : "text-[#C00000]"
                        } items-center ml:text-[16px] text-[10px] font-medium leading-5`}
                      >
                        {Math.abs(viewsChange)}%
                      </p>
                    )}
                  </p>
                  {viewsChange < 0 && (
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_117282)">
                        <path
                          d="M5.73438 8L10.7344 13L15.7344 8L5.73438 8Z"
                          fill="#C00000"
                          stroke="#C00000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_117282">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="matrix(-1 0 0 -1 20.7344 20.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  {viewsChange > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_117270)">
                        <path
                          d="M15.7344 13L10.7344 8L5.73438 13H15.7344Z"
                          fill="#06A9EF"
                          stroke="#06A9EF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_117270">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.734375 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex ml:p-4 p-2 flex-col items-start ml:gap-4 gap-1 bg-[#fff] self-stretch w-full"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <p className="text-[#333] font-Montserrat text-[12px] ml:text-[16px] font-semibold">
                {" "}
                Job Applied
              </p>
              <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#3E6B7E]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <g mask="url(#mask0_7540_117295)">
                    <path
                      d="M2.15385 10.2499C1.90128 10.2499 1.6875 10.1624 1.5125 9.98745C1.3375 9.81245 1.25 9.59867 1.25 9.3461V4.15383C1.25 3.90126 1.3375 3.68747 1.5125 3.51247C1.6875 3.33747 1.90128 3.24997 2.15385 3.24997H4.25V2.40384C4.25 2.15128 4.3375 1.9375 4.5125 1.7625C4.6875 1.5875 4.90128 1.5 5.15385 1.5H6.84613C7.09869 1.5 7.31248 1.5875 7.48748 1.7625C7.66248 1.9375 7.74998 2.15128 7.74998 2.40384V3.24997H9.84613C10.0987 3.24997 10.3125 3.33747 10.4875 3.51247C10.6625 3.68747 10.75 3.90126 10.75 4.15383V9.3461C10.75 9.59867 10.6625 9.81245 10.4875 9.98745C10.3125 10.1624 10.0987 10.2499 9.84613 10.2499H2.15385ZM2.15385 9.49996H9.84613C9.88459 9.49996 9.91986 9.48394 9.95191 9.45189C9.98396 9.41983 9.99999 9.38457 9.99999 9.3461V4.15383C9.99999 4.11536 9.98396 4.0801 9.95191 4.04804C9.91986 4.01599 9.88459 3.99996 9.84613 3.99996H2.15385C2.11538 3.99996 2.08012 4.01599 2.04806 4.04804C2.01601 4.0801 1.99999 4.11536 1.99999 4.15383V9.3461C1.99999 9.38457 2.01601 9.41983 2.04806 9.45189C2.08012 9.48394 2.11538 9.49996 2.15385 9.49996ZM4.99999 3.24997H6.99999V2.40384C6.99999 2.36537 6.98396 2.33011 6.95191 2.29806C6.91985 2.266 6.88459 2.24997 6.84613 2.24997H5.15385C5.11538 2.24997 5.08012 2.266 5.04806 2.29806C5.01601 2.33011 4.99999 2.36537 4.99999 2.40384V3.24997Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[36px]">
                <CountUp end={data.totalApplicants} />
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[#646464] text-[12px] ml:text-[14px] font-Montserrat font-Medium">
                  {selected === "Daily"
                    ? "This Week"
                    : selected === "Weekly"
                    ? "This Month"
                    : "This Year"}
                </p>
                <div className="flex text-center">
                  <p
                    className={`${
                      applicantChange > 0
                        ? "text-[#06A9EF]"
                        : applicantChange == 0
                        ? "text-[#333333]"
                        : "text-[#C00000]"
                    } items-center ml:text-[16px] text-[10px] font-medium leading-5`}
                  >
                    {Math.abs(applicantChange)}%
                  </p>
                  {applicantChange < 0 && (
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_117282)">
                        <path
                          d="M5.73438 8L10.7344 13L15.7344 8L5.73438 8Z"
                          fill="#C00000"
                          stroke="#C00000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_117282">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="matrix(-1 0 0 -1 20.7344 20.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  {applicantChange > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_117270)">
                        <path
                          d="M15.7344 13L10.7344 8L5.73438 13H15.7344Z"
                          fill="#06A9EF"
                          stroke="#06A9EF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_117270">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.734375 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex  ">
          <StackedBarChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default JobStatistics;

// import React from "react";
// import StackedBarChart from "../../common/StackedBarChart";

// function JobStatistics({ setSelected, selected, data }) {
//   console.log(data);

//   const calculatePercentageChange = (analytics) => {
//     if (analytics?.length >= 2) {
//       const lastValue = analytics[analytics.length - 1];
//       const secondLastValue = analytics[analytics.length - 2];

//       const percentageChange =
//         secondLastValue !== 0
//           ? ((lastValue - secondLastValue) / secondLastValue) * 100
//           : lastValue !== 0
//           ? 100
//           : 0;

//       return percentageChange.toFixed(2);
//     }
//     return null;
//   };

//   const applicantChange = calculatePercentageChange(data?.applicantAnalytics);
//   const viewsChange = calculatePercentageChange(data?.viewsAnalytics);

//   return (
//     <div
//       className="lg:w-[66.17%] w-[100%] bg-[#fff] flex flex-col items-center gap-4 sm:p-4 p-2"
//       style={{
//         borderRadius: "16px",
//         boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
//       }}
//     >
//       <div
//         className="flex pb-4 flex-col gap-4 self-stretch"
//         style={{
//           borderBottom: "1px solid var(--Text-Secondary, #646464)",
//         }}
//       >
//         <div className="flex justify-between items-center self-stretch">
//           <div className="flex flex-col items-start lg:gap-1 gap-[2px]">
//             <p className="text-[#333333] font-Montserrat text-[12px] lg:text-[28px] font-medium">
//               Job Statistics
//             </p>
//             <p className="text-[#646464] lg:text-[12px] text-[10px] font-medium">
//               Showing Job statistics Nov 19-25
//             </p>
//           </div>
//           <div className="flex items-end lg:gap-[6px] gap-1">
//             {["Daily", "Weekly", "Monthly"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setSelected(type)}
//                 className={`px-2 p-1 border-[0.5px] border-solid ${
//                   selected === type
//                     ? "border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF]"
//                     : "border-[#DEDEDE] text-[#333333]"
//                 } rounded-[6px] text-[12px] font-[500]`}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="lg:flex w-full flex-row-reverse flex-col flex gap-2 justify-between">
//         <div className="flex flex-col items-start gap-2 w-full lg:w-[32.23%]">
//           <div
//             className="flex p-4 flex-col items-start gap-4 bg-[#fff] w-full"
//             style={{
//               boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
//               borderRadius: "16px",
//             }}
//           >
//             <div className="flex justify-between items-center w-full">
//               <p className="text-[#333] font-Montserrat text-[18px] font-semibold">
//                 Job Views
//               </p>
//               <div className="p-2 rounded-full bg-[#FFDA1D]">👁️</div>
//             </div>
//             <div className="flex flex-col items-start gap-1">
//               <p className="text-[#333] font-Montserrat font-semibold text-[36px]">
//                 {data.totalViews}
//               </p>
//               {viewsChange && (
//                 <p className="text-[#06A9EF] text-[14px]">
//                   {viewsChange}% change from last week
//                 </p>
//               )}
//             </div>
//           </div>
//           <div
//             className="flex p-4 flex-col items-start gap-4 bg-[#fff] w-full"
//             style={{
//               boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
//               borderRadius: "16px",
//             }}
//           >
//             <div className="flex justify-between items-center w-full">
//               <p className="text-[#333] font-Montserrat text-[18px] font-semibold">
//                 Applicants
//               </p>
//               <div className="p-2 rounded-full bg-[#FFDA1D]">👤</div>
//             </div>
//             <div className="flex flex-col items-start gap-1">
//               <p className="text-[#333] font-Montserrat font-semibold text-[36px]">
//                 {data.totalApplicants}
//               </p>
//               {applicantChange && (
//                 <p className="text-[#06A9EF] text-[14px]">
//                   {applicantChange}% change from last week
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="flex-grow">
//         <StackedBarChart data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobStatistics;
