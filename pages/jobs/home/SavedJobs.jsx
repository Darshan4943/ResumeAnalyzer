import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import Description from "./Description";

function SavedJobs() {
  const numberOfDivs = 5;
  const [savedJobList, setSavedJobList] = useState([]);
  const jobData = useSelector((state) => state.getAllJobs.data);
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [savedJobListLocal, setSavedJobListLocal] = useState([]);
  const [selectedJob, setSelectedJob] = useState();

  const isViewportBelow1024 = useMediaQuery("(max-width:1024px)");
  const [isDescription, setIsDescription] = useState(false);
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
    <>
      {savedJobList.length > 0 ?
        <div className="  bg-[#F9F9F9]  ">
          <div className=" grid grid-cols-12 gap-[24px] py-[16px]  ">

            <div className={`${isDescription ? " web1024" : ""} ${isViewportBelow1024 ? "col-span-12" : "col-span-5"}  p-[8px] rounded-[8px]   bg-[#fff] leading-tight min-h-[70vh]  `}>
              <div
                className={``}
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
                      setIsDescription(true);
                      window.scroll(0, 0);
                    }}
                    className={`p-[16px] flex flex-col gap-[8px] relative z-0 ${selectedJob?._id == item._id && "selected_job_card"
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
            </div>


            <div className={`web1024 col-span-7`}>

              <Description selectedJob={selectedJob} />

            </div>


            {isDescription &&
              <div className={`mobile1024 col-span-12`}>
                <div onClick={() => setIsDescription(false)} className="flex gap-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                    <g mask="url(#mask0_5925_96419)">
                      <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#333333" />
                    </g>
                  </svg>
                  Back
                </div >

                <Description selectedJob={selectedJob} />
              </div>

            }

          </div>
        </div>
        :
        <div className=" object-contain justify-center items-center p-12 w-[100%] flex h-full">
        <img
          className="ms:w-[360px] w-[260px] ms:h-[277px] h-[210px]"
          src="/images/jobs/noSaved.png"
          alt=""
        />
        </div>
      }


    </>
  );
}

export default SavedJobs;
