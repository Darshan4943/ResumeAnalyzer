import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";

function SavedJobs() {
  const numberOfDivs = 5;
  const [savedJobList, setSavedJobList] = useState([]);
  const jobData = useSelector((state) => state.getAllJobs.data);
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [savedJobListLocal, setSavedJobListLocal] = useState([]);
  const [selectedJob, setSelectedJob] = useState();
  useEffect(() => {
    const jobsFromLocal = JSON.parse(localStorage.getItem("savedJobs"));
    if (jobsFromLocal && jobsFromLocal.length > 0) {
      const data = jobsFromLocal.map((item) => {
        const findJob = jobData.find((data) => data._id == item);
        if (findJob) {
          return findJob;
        }
      });
      setSavedJobList(data);
      setSavedJobListLocal(jobsFromLocal);
    }
  }, [jobData, recall]);
  useEffect(() => {
    if (jobData.length > 0) {
      setSelectedJob(jobData[0]);
    }
  }, [jobData]);
  const removeJobToLocal = (e, id) => {
    e.stopPropagation();
    const filter = savedJobListLocal.filter((item) => item !== id);
    localStorage.setItem("savedJobs", JSON.stringify(filter));
    forceUpdate();
  };
  
  return (
    <div className="  bg-[#F9F9F9]  ">
      <div className="customMargins flex flex-row gap-[24px] py-[24px]  ">
        <div
          className="p-[8px]  rounded-[8px] w-[41.30%] bg-[#fff] leading-tight min-h-[70vh] "
          style={{
            boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {savedJobList?.map((item, index) => (
            <div
              onClick={() => {
                setSelectedJob(item);
                window.scroll(0, 0);
              }}
              className={`p-[16px] flex flex-col gap-[8px] relative z-0 ${
                selectedJob?._id == item._id && "selected_job_card"
              } `}
              style={{
                borderBottom:
                  selectedJob?._id == item._id ? "unset" : "1px solid #646464",
              }}
              key={index}
            >
              <div className=" flex flex-col gap-[16px]">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <div className="text-[20px] font-medium">{item.title}</div>
                    <div className="flex items-center justify-center gap-[4px]">
                      <div className="text-[12px] font-medium">
                        {item.company}
                      </div>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M5.73242 0.809018L6.84174 4.22315L6.89787 4.3959H7.07951H10.6693L7.7651 6.50595L7.61816 6.61271L7.67428 6.78546L8.7836 10.1996L5.87937 8.08954L5.73242 7.98278L5.58548 8.08954L2.68124 10.1996L3.79056 6.78546L3.84669 6.61271L3.69974 6.50595L0.795504 4.3959H4.38534H4.56697L4.6231 4.22315L5.73242 0.809018Z"
                          fill="#FFDA1D"
                          stroke="#FFCC7E"
                          stroke-width="0.5"
                        />
                      </svg>
                      <div className="text-[#262626] text-[10px] font-[400]">
                        3.7
                      </div> */}
                    </div>
                  </div>

                  {/* <img
                    className="w-[56px] h-[56px]"
                    src="/images/afterLoginHome/ux_black.png"
                    alt=""
                  /> */}
                </div>
                <div className="flex flex-row gap-[11px] items-center leading-tight ">
                  {item.experiance && (
                    <>
                      {" "}
                      <div className="flex flex-row gap-[4px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <g mask="url(#mask0_4135_57914)">
                            <path
                              d="M2.33073 12.7503C2.0099 12.7503 1.73524 12.6361 1.50677 12.4076C1.2783 12.1792 1.16406 11.9045 1.16406 11.5837V5.16701C1.16406 4.84617 1.2783 4.57152 1.50677 4.34305C1.73524 4.11458 2.0099 4.00034 2.33073 4.00034H4.66406V2.83367C4.66406 2.51284 4.7783 2.23819 5.00677 2.00972C5.23524 1.78124 5.5099 1.66701 5.83073 1.66701H8.16406C8.48489 1.66701 8.75955 1.78124 8.98802 2.00972C9.21649 2.23819 9.33073 2.51284 9.33073 2.83367V4.00034H11.6641C11.9849 4.00034 12.2595 4.11458 12.488 4.34305C12.7165 4.57152 12.8307 4.84617 12.8307 5.16701V11.5837C12.8307 11.9045 12.7165 12.1792 12.488 12.4076C12.2595 12.6361 11.9849 12.7503 11.6641 12.7503H2.33073ZM2.33073 11.5837H11.6641V5.16701H2.33073V11.5837ZM5.83073 4.00034H8.16406V2.83367H5.83073V4.00034Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <div className="text-[#262626] text-[12px] font-[400] ">
                          {item.experiance}
                        </div>
                      </div>
                      <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                    </>
                  )}
                  {item.jobType && (
                    <>
                      <div className="flex flex-row gap-[4px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <g mask="url(#mask0_4135_57920)">
                            <path
                              d="M4.66732 12.167H9.33398V10.417C9.33398 9.77534 9.10551 9.22604 8.64857 8.76909C8.19162 8.31215 7.64232 8.08367 7.00065 8.08367C6.35898 8.08367 5.80968 8.31215 5.35273 8.76909C4.89579 9.22604 4.66732 9.77534 4.66732 10.417V12.167ZM7.00065 6.91701C7.64232 6.91701 8.19162 6.68854 8.64857 6.23159C9.10551 5.77465 9.33398 5.22534 9.33398 4.58367V2.83367H4.66732V4.58367C4.66732 5.22534 4.89579 5.77465 5.35273 6.23159C5.80968 6.68854 6.35898 6.91701 7.00065 6.91701ZM2.33398 13.3337V12.167H3.50065V10.417C3.50065 9.82395 3.63919 9.26735 3.91628 8.74722C4.19336 8.22708 4.57982 7.81145 5.07565 7.50034C4.57982 7.18923 4.19336 6.77361 3.91628 6.25347C3.63919 5.73333 3.50065 5.17673 3.50065 4.58367V2.83367H2.33398V1.66701H11.6673V2.83367H10.5007V4.58367C10.5007 5.17673 10.3621 5.73333 10.085 6.25347C9.80794 6.77361 9.42148 7.18923 8.92565 7.50034C9.42148 7.81145 9.80794 8.22708 10.085 8.74722C10.3621 9.26735 10.5007 9.82395 10.5007 10.417V12.167H11.6673V13.3337H2.33398Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <div className="text-[#262626] text-[12px] font-[400]">
                          {item.jobType}
                        </div>
                      </div>
                      <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                    </>
                  )}

                  <div className="flex flex-row gap-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g mask="url(#mask0_4135_57926)">
                        <path
                          d="M7.00065 7.50034C7.32148 7.50034 7.59614 7.38611 7.82461 7.15763C8.05308 6.92916 8.16732 6.65451 8.16732 6.33367C8.16732 6.01284 8.05308 5.73819 7.82461 5.50972C7.59614 5.28124 7.32148 5.16701 7.00065 5.16701C6.67982 5.16701 6.40516 5.28124 6.17669 5.50972C5.94822 5.73819 5.83398 6.01284 5.83398 6.33367C5.83398 6.65451 5.94822 6.92916 6.17669 7.15763C6.40516 7.38611 6.67982 7.50034 7.00065 7.50034ZM7.00065 11.7878C8.18676 10.699 9.06662 9.70972 9.64023 8.82013C10.2138 7.93055 10.5007 7.14062 10.5007 6.45034C10.5007 5.39062 10.1628 4.52291 9.48711 3.84722C8.81141 3.17152 7.9826 2.83367 7.00065 2.83367C6.01871 2.83367 5.18989 3.17152 4.51419 3.84722C3.8385 4.52291 3.50065 5.39062 3.50065 6.45034C3.50065 7.14062 3.78746 7.93055 4.36107 8.82013C4.93468 9.70972 5.81454 10.699 7.00065 11.7878ZM7.00065 13.3337C5.43537 12.0017 4.26628 10.7646 3.49336 9.62222C2.72044 8.47986 2.33398 7.42256 2.33398 6.45034C2.33398 4.99201 2.80308 3.8302 3.74128 2.96492C4.67947 2.09965 5.76593 1.66701 7.00065 1.66701C8.23537 1.66701 9.32183 2.09965 10.26 2.96492C11.1982 3.8302 11.6673 4.99201 11.6673 6.45034C11.6673 7.42256 11.2809 8.47986 10.5079 9.62222C9.73503 10.7646 8.56593 12.0017 7.00065 13.3337Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>
                    <div className="text-[#262626] text-[12px] font-[400]">
                      {item.location.slice(0, 6)}...
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-[4px]">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g mask="url(#mask0_4135_57931)">
                        <path
                          d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="text-[#262626] font-[400] text-[12px]">
                    {item?.description?.slice(0, 90)}...
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center p-1 bg-[#E0F6FF]">
                <div className="flex gap-[8px]">
                  <img
                    className="w-[20px] h-[20px]"
                    src="/images/afterLoginHome/new_releases.png"
                    alt=""
                  />
                  {item.postedAt}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    onClick={(e) => removeJobToLocal(e, item._id)}
                  >
                    <g mask="url(#mask0_5716_133446)">
                      <path
                        d="M5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V21L12 18L5 21Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[58.70%] ">
          {selectedJob && (
            <div
              className="p-[16px]   border-[1px] border-[#06A9EF] bg-[#fff] rounded-[8px] flex flex-col gap-[16px]  "
              style={{
                boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid #646464",
                }}
              >
                <div className="flex flex-col gap-[4px]">
                  <div className="text-[#333] text-[20px] font-[500]">
                    {selectedJob.title}
                  </div>
                  <div className="text-[#333] text-[10px] font-[400]">
                    {selectedJob.company}
                  </div>
                  <div className="flex flex-row gap-[4px] text-[#333] text-[12px] font-[400]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g mask="url(#mask0_4475_58296)">
                        <path
                          d="M6.93699 7.50042C7.25707 7.50042 7.53108 7.38618 7.75902 7.15771C7.98695 6.92924 8.10092 6.65458 8.10092 6.33375C8.10092 6.01292 7.98695 5.73826 7.75902 5.50979C7.53108 5.28132 7.25707 5.16708 6.93699 5.16708C6.61691 5.16708 6.3429 5.28132 6.11496 5.50979C5.88702 5.73826 5.77305 6.01292 5.77305 6.33375C5.77305 6.65458 5.88702 6.92924 6.11496 7.15771C6.3429 7.38618 6.61691 7.50042 6.93699 7.50042ZM6.93699 11.7879C8.12032 10.699 8.99812 9.70979 9.57039 8.82021C10.1427 7.93063 10.4288 7.1407 10.4288 6.45042C10.4288 5.3907 10.0917 4.52299 9.41762 3.84729C8.74351 3.1716 7.91663 2.83375 6.93699 2.83375C5.95734 2.83375 5.13046 3.1716 4.45635 3.84729C3.78224 4.52299 3.44518 5.3907 3.44518 6.45042C3.44518 7.1407 3.73132 7.93063 4.30359 8.82021C4.87585 9.70979 5.75365 10.699 6.93699 11.7879ZM6.93699 13.3338C5.37538 12.0018 4.20902 10.7647 3.43791 9.62229C2.6668 8.47993 2.28125 7.42264 2.28125 6.45042C2.28125 4.99208 2.74925 3.83028 3.68525 2.965C4.62124 2.09972 5.70516 1.66708 6.93699 1.66708C8.16882 1.66708 9.25273 2.09972 10.1887 2.965C11.1247 3.83028 11.5927 4.99208 11.5927 6.45042C11.5927 7.42264 11.2072 8.47993 10.4361 9.62229C9.66496 10.7647 8.4986 12.0018 6.93699 13.3338Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                    {selectedJob.location}
                  </div>
                </div>
                <div className="py-[16px] flex gap-2 leading-tight">
                  <a
                    href={selectedJob?.applyUrl}
                    target="_blank"
                    className="text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px]"
                  >
                    Apply Now
                  </a>
                  {/* <button className="text-[14px] font-[600] flex items-center border border-[#06A9EF] py-[8px] px-[16px] rounded-[30px]">
                   Save
                 </button> */}
                </div>
              </div>
              <div
                className="pb-[12px]"
                style={{
                  borderBottom: "1px solid #646464",
                }}
              >
                <div className="text-[20px] text-[500] text-[#333]">
                  Job Details
                </div>
                <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                  >
                    <g mask="url(#mask0_4475_58307)">
                      <path
                        d="M2.45709 12.2504C2.11279 12.2504 1.81804 12.1362 1.57286 11.9077C1.32767 11.6792 1.20508 11.4046 1.20508 11.0837V4.66705C1.20508 4.34622 1.32767 4.07157 1.57286 3.84309C1.81804 3.61462 2.11279 3.50039 2.45709 3.50039H4.96113V2.33372C4.96113 2.01289 5.08372 1.73823 5.32891 1.50976C5.57409 1.28129 5.86884 1.16705 6.21314 1.16705H8.71717C9.06148 1.16705 9.35622 1.28129 9.60141 1.50976C9.8466 1.73823 9.96919 2.01289 9.96919 2.33372V3.50039H12.4732C12.8175 3.50039 13.1123 3.61462 13.3575 3.84309C13.6026 4.07157 13.7252 4.34622 13.7252 4.66705V11.0837C13.7252 11.4046 13.6026 11.6792 13.3575 11.9077C13.1123 12.1362 12.8175 12.2504 12.4732 12.2504H2.45709ZM2.45709 11.0837H12.4732V4.66705H2.45709V11.0837ZM6.21314 3.50039H8.71717V2.33372H6.21314V3.50039Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                  {selectedJob.jobType}
                </div>
                {/* <div className="flex flex-row gap-[5px] text-[12px] text-[#333] font-[500]">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="16"
                   height="14"
                   viewBox="0 0 16 14"
                   fill="none"
                 >
                   <g mask="url(#mask0_4475_58313)">
                     <path
                       d="M4.96106 11.6671H9.96913V9.91705C9.96913 9.27539 9.72394 8.72608 9.23357 8.26914C8.74319 7.81219 8.1537 7.58372 7.4651 7.58372C6.77649 7.58372 6.187 7.81219 5.69662 8.26914C5.20625 8.72608 4.96106 9.27539 4.96106 9.91705V11.6671ZM7.4651 6.41705C8.1537 6.41705 8.74319 6.18858 9.23357 5.73164C9.72394 5.27469 9.96913 4.72539 9.96913 4.08372V2.33372H4.96106V4.08372C4.96106 4.72539 5.20625 5.27469 5.69662 5.73164C6.187 6.18858 6.77649 6.41705 7.4651 6.41705ZM2.45703 12.8337V11.6671H3.70905V9.91705C3.70905 9.324 3.85772 8.7674 4.15508 8.24726C4.45243 7.72712 4.86716 7.3115 5.39927 7.00039C4.86716 6.68928 4.45243 6.27365 4.15508 5.75351C3.85772 5.23337 3.70905 4.67678 3.70905 4.08372V2.33372H2.45703V1.16705H12.4732V2.33372H11.2211V4.08372C11.2211 4.67678 11.0725 5.23337 10.7751 5.75351C10.4778 6.27365 10.063 6.68928 9.53092 7.00039C10.063 7.3115 10.4778 7.72712 10.7751 8.24726C11.0725 8.7674 11.2211 9.324 11.2211 9.91705V11.6671H12.4732V12.8337H2.45703Z"
                       fill="#333333"
                     />
                   </g>
                 </svg>
                 Permanent
               </div> */}
              </div>
              {/* <div
               className="flex flex-col gap-[10px] pb-[6px]"
               style={{
                 borderBottom: "1px solid #646464",
               }}
             >
               <div className="text-[20px] font-[500]">
                 Qualifications
               </div>
               <div className="text-[12px] font-[500]">
                 B.e (computer science) <br /> Total Work Experience 2
                 Years (Required)
               </div>
             </div> */}
              {selectedJob?.description?.length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <div className="text-[20px] font-[500]">
                    Full job Description
                  </div>
                  <div className="text-[12px] text-[400] gap-[8px] flex flex-col">
                    {selectedJob.description}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  className="text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[8px] px-[16px] rounded-[30px]"
                >
                  Apply Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;
