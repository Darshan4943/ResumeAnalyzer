import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LimitUsedModal from "../../../models/limitUsedModal";
import MiniLoader from "../../../common/miniLoader";
import { currenciesWithIcons } from "../../../../utils/data";

function Description({ selectedJob, filter, setLimitPopup, openModel, data }) {
  const router = useRouter();
   const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [appliedJobs, setAppliedJobs] = useState();
  // const [limitPopup, setLimitPopup] = useState(false)
  const [isLogin, setIsLogin] = useState(false);

  const jobApplyCount = localStorage.getItem("jobsApplyLimit");
  const isPlanActive = JSON.parse(localStorage.getItem("planActive"));
  console.log(234, selectedJob)




  // const getData = () => {
  //   axios
  //     .get(
  //       `http://localhost:2000/api/job/getAllAppliedJobs/${userDataGlobal._id}`
  //     )
  //     .then((res) => {
  //       setAppliedJobs(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   if (userDataGlobal._id) {
  //     getData();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [userDataGlobal]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);


  return (
    <>
      {/* <>
        <div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            {selectedJob && (
              <div className="absolute bg-white px-4 py-2 rounded-lg shadow-lg flex flex-col gap-2 max-h-[500px] max-w-[600px] ml:h-[50vw] ml:w-[70vw] sm:h-[60vw] sm:w-[70vw] w-[80vw] h-[80vw]">
                <div
                  onWheel={(e) => e.stopPropagation()}
                  className="p-[16px]  bg-[#fff] rounded-[12px] flex flex-col gap-[16px]   overflow-y-scroll "
                >
                  {selectedJob?.description?.length > 0 && (
                    <div className="flex flex-col gap-[8px]">
                      <div className="text-[16px] font-[600]">
                        Full job Description
                      </div>
                      <div className="text-[14px] font-[400] gap-[8px] flex flex-col">
                        {selectedJob.description}
                      </div>
                    </div>
                  )}
                  {selectedJob.requiredQualification && (
                    <div className="flex flex-col gap-[10px] pb-[6px]">
                      <div className="text-[16px] font-[600]">
                        Qualifications :
                      </div>

                      <div className="text-[14px] font-[400]">
                        {selectedJob.requiredQualification} <br /> Total Work
                        Total Experience {selectedJob.experience} (Required){" "}
                        <br />
                        {selectedJob.mustSkills}
                      </div>
                    </div>
                  )}

                  <div className="pb-[12px]  flex flex-col gap-2">
                    <div className="flex flex-col gap-[16px] text-[12px] text-[#333] font-[500]">
                      <div className="text-[14px] font-[600] ">
                        Job Type :{" "}
                        <span className="text-[14px] font-[500]">
                          {" "}
                          {selectedJob.jobType}
                        </span>
                      </div>
                      {(selectedJob.minSalary > 0 ||
                        selectedJob.maxSalary > 0) && (
                          <div className="text-[14px] font-[600] flex">
                            Salary :
                            {(() => {
                              const icon = currenciesWithIcons?.find(
                                (item) =>
                                  item?.icon?.toLowerCase() ===
                                  selectedJob?.currency?.toLowerCase()
                              );

                              return (
                                <div className="text-[14px] font-[500]">
                                  {icon ? icon.symbol : selectedJob?.currency}{" "}
                                  {selectedJob.minSalary}{" "}
                                  {selectedJob.minSalary &&
                                    selectedJob.maxSalary &&
                                    "-"}{" "}
                                  {icon ? icon.symbol : selectedJob?.currency}{" "}
                                  {selectedJob.maxSalary}{" "}
                                  {selectedJob.salaryType === "Annual"
                                    ? "per annum"
                                    : "per month"}
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      {selectedJob.qualificationType && (
                        <div className="text-[14px] font-[600] ">
                          Education :{" "}
                          <span className="text-[14px] font-[500]">
                            {selectedJob.qualificationType} (Preferred)
                          </span>
                        </div>
                      )}
                      {selectedJob.experience && (
                        <div className="text-[14px] font-[600] ">
                          Experience :{" "}
                          <span className="text-[14px] font-[500]">
                            Total Work
                            {selectedJob.experience} (Required)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-[24px]">
                    <button
                      disabled={
                        (selectedJob?.matchedApplication?.applicantId === userDataGlobal._id) ||
                        selectedJob.status === "Hold"
                      }
                      onClick={() => {
                        if (isLogin) {
                          if (jobApplyCount > 0) {
                            if (
                              !selectedJob?.matchedApplication?.applicantId === userDataGlobal._id
                            ) {
                              router.push(
                                `/jobs/home/ApplyForm?id=${selectedJob._id}`
                              );
                            }
                          } else {
                            setLimitPopup(true);
                          }
                        } else {
                          router.push(`/auth?signin=true&role=user`);
                        }
                      }}
                      className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[12px] px-[36px] rounded-[30px] ${selectedJob?.matchedApplication?.applicantId === userDataGlobal._id ||
                        selectedJob.status === "Hold"
                        ? "cursor-not-allowed"
                        : " cursor-pointer"
                        }`}
                    >
                      {selectedJob?.matchedApplication?.applicantId === userDataGlobal._id
                        ? "Applied"
                        : "Apply"}
                    </button>
                    <button className="text-[14px] font-[600] border-[1px] border-[#06A9EF] text-[#333333] flex items-center gap-[2px] py-[12px] px-[36px] rounded-[30px]" onClick={() => {
                      openModel(false)
                    }}>Cancel</button>
                    <button className="text-[14px] font-[600] border-[1px] border-[#06A9EF] text-[#333333] flex items-center gap-[2px] py-[12px] px-[36px] rounded-[30px]">
                      Share
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1913 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4252 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1913 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0727 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0727 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1913 14.3774 16.7148 14.9012C17.2383 15.4252 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z"
                          fill="#1C1B1F"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </> */}
      <>

        <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
        <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          {selectedJob && (
            <div className="bg-[#FFFFFF] h-[90vh] w-[95%] ml:w-[42.50%] overflow-scroll rounded-[10px] px-2 ml:px-[20px] py-[10px] flex flex-col gap-3">
              <div className="w-full flex justify-end">
                <svg onClick={() => { 
                  openModel(false)
                }} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_6262_73092)">
                    <path d="M24.0003 26.1232L17.5078 32.6152C17.2181 32.9052 16.8669 33.0469 16.4543 33.0402C16.0413 33.0339 15.6899 32.8859 15.4003 32.5962C15.1106 32.3065 14.9658 31.952 14.9658 31.5327C14.9658 31.1134 15.1106 30.7589 15.4003 30.4692L21.8733 23.9962L15.3813 17.5537C15.0913 17.264 14.9496 16.9095 14.9563 16.4902C14.9626 16.0712 15.1106 15.7169 15.4003 15.4272C15.6899 15.1372 16.0444 14.9922 16.4638 14.9922C16.8831 14.9922 17.2376 15.1372 17.5273 15.4272L24.0003 21.9192L30.4428 15.4272C30.7324 15.1372 31.0836 14.9922 31.4963 14.9922C31.9093 14.9922 32.2606 15.1372 32.5503 15.4272C32.8606 15.7372 33.0158 16.0967 33.0158 16.5057C33.0158 16.9147 32.8606 17.264 32.5503 17.5537L26.0773 23.9962L32.5693 30.4887C32.8593 30.7784 33.0043 31.1295 33.0043 31.5422C33.0043 31.9552 32.8593 32.3065 32.5693 32.5962C32.2593 32.9065 31.8998 33.0617 31.4908 33.0617C31.0818 33.0617 30.7324 32.9065 30.4428 32.5962L24.0003 26.1232Z" fill="#333333" />
                  </g>
                </svg>
              </div>
              <div className="ml:p-4 relative w-full">
                <div className="pb-[12px] border-b-[1px] border-solid border-[#AFAFAF99] flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[4px]">
                    <div className="text-[16px] font-[600] text-[#333333]">UX Designer</div>
                    <div className="text-[12px] font-[400] text-[#333333] flex gap-1">
                      TechGenius Innovations
                      <div className="flex gap-[4px] text-[10px] font-[400] text-[#646464] items-center">
                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 0.761429L7.17454 4.14044L7.23166 4.30476L7.40559 4.30831L10.9822 4.38119L8.1315 6.54242L7.99287 6.64752L8.04325 6.81403L9.07915 10.2381L6.1428 8.19479L6 8.09543L5.8572 8.19479L2.92085 10.2381L3.95675 6.81403L4.00713 6.64752L3.8685 6.54242L1.01782 4.38119L4.59441 4.30831L4.76834 4.30476L4.82546 4.14044L6 0.761429Z" fill="#FFDA1D" stroke="#FFCC7E" stroke-width="0.5" />
                        </svg>
                        3.7
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[11px]">
                    <div className="flex gap-1 border-r-[1px] border-solid border-[#AFAFAF] pr-[11px] items-center">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_6262_73105)">
                          <path d="M2.33171 12.7474C2.01087 12.7474 1.73622 12.6332 1.50775 12.4047C1.27928 12.1762 1.16504 11.9016 1.16504 11.5807V5.16406C1.16504 4.84323 1.27928 4.56858 1.50775 4.3401C1.73622 4.11163 2.01087 3.9974 2.33171 3.9974H4.66504V2.83073C4.66504 2.5099 4.77927 2.23524 5.00775 2.00677C5.23622 1.7783 5.51087 1.66406 5.83171 1.66406H8.16504C8.48587 1.66406 8.76052 1.7783 8.989 2.00677C9.21747 2.23524 9.33171 2.5099 9.33171 2.83073V3.9974H11.665C11.9859 3.9974 12.2605 4.11163 12.489 4.3401C12.7175 4.56858 12.8317 4.84323 12.8317 5.16406V11.5807C12.8317 11.9016 12.7175 12.1762 12.489 12.4047C12.2605 12.6332 11.9859 12.7474 11.665 12.7474H2.33171ZM2.33171 11.5807H11.665V5.16406H2.33171V11.5807ZM5.83171 3.9974H8.16504V2.83073H5.83171V3.9974Z" fill="#646464" />
                        </g>
                      </svg>
                      <div className="text-[12px] font-[400] text-[#262626]">1-2 yrs</div>
                    </div>
                    <div className="flex gap-1 border-r-[1px] border-solid border-[#AFAFAF] pr-[11px] items-center">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_6262_73111)">
                          <path d="M4.66634 12.1641H9.33301V10.4141C9.33301 9.7724 9.10453 9.22309 8.64759 8.76615C8.19065 8.3092 7.64134 8.08073 6.99967 8.08073C6.35801 8.08073 5.8087 8.3092 5.35176 8.76615C4.89481 9.22309 4.66634 9.7724 4.66634 10.4141V12.1641ZM6.99967 6.91406C7.64134 6.91406 8.19065 6.68559 8.64759 6.22865C9.10453 5.7717 9.33301 5.2224 9.33301 4.58073V2.83073H4.66634V4.58073C4.66634 5.2224 4.89481 5.7717 5.35176 6.22865C5.8087 6.68559 6.35801 6.91406 6.99967 6.91406ZM2.33301 13.3307V12.1641H3.49967V10.4141C3.49967 9.82101 3.63822 9.26441 3.9153 8.74427C4.19238 8.22413 4.57884 7.80851 5.07467 7.4974C4.57884 7.18629 4.19238 6.77066 3.9153 6.25052C3.63822 5.73038 3.49967 5.17378 3.49967 4.58073V2.83073H2.33301V1.66406H11.6663V2.83073H10.4997V4.58073C10.4997 5.17378 10.3611 5.73038 10.084 6.25052C9.80697 6.77066 9.42051 7.18629 8.92467 7.4974C9.42051 7.80851 9.80697 8.22413 10.084 8.74427C10.3611 9.26441 10.4997 9.82101 10.4997 10.4141V12.1641H11.6663V13.3307H2.33301Z" fill="#646464" />
                        </g>
                      </svg>
                      <div className="text-[12px] font-[400] text-[#262626]">Part Time</div>
                    </div>
                    <div className="flex gap-1 border-r-[1px] border-solid border-[#AFAFAF] pr-[11px] items-center">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_6262_73117)">
                          <path d="M6.99967 7.4974C7.32051 7.4974 7.59516 7.38316 7.82363 7.15469C8.0521 6.92622 8.16634 6.65156 8.16634 6.33073C8.16634 6.0099 8.0521 5.73524 7.82363 5.50677C7.59516 5.2783 7.32051 5.16406 6.99967 5.16406C6.67884 5.16406 6.40419 5.2783 6.17572 5.50677C5.94724 5.73524 5.83301 6.0099 5.83301 6.33073C5.83301 6.65156 5.94724 6.92622 6.17572 7.15469C6.40419 7.38316 6.67884 7.4974 6.99967 7.4974ZM6.99967 11.7849C8.18579 10.696 9.06565 9.70677 9.63926 8.81719C10.2129 7.9276 10.4997 7.13767 10.4997 6.4474C10.4997 5.38767 10.1618 4.51997 9.48613 3.84427C8.81044 3.16858 7.98162 2.83073 6.99967 2.83073C6.01773 2.83073 5.18891 3.16858 4.51322 3.84427C3.83752 4.51997 3.49967 5.38767 3.49967 6.4474C3.49967 7.13767 3.78648 7.9276 4.36009 8.81719C4.9337 9.70677 5.81356 10.696 6.99967 11.7849ZM6.99967 13.3307C5.4344 11.9988 4.2653 10.7616 3.49238 9.61927C2.71947 8.47691 2.33301 7.41962 2.33301 6.4474C2.33301 4.98906 2.80211 3.82726 3.7403 2.96198C4.67849 2.0967 5.76495 1.66406 6.99967 1.66406C8.2344 1.66406 9.32086 2.0967 10.259 2.96198C11.1972 3.82726 11.6663 4.98906 11.6663 6.4474C11.6663 7.41962 11.2799 8.47691 10.507 9.61927C9.73405 10.7616 8.56495 11.9988 6.99967 13.3307Z" fill="#646464" />
                        </g>
                      </svg>
                      <div className="text-[12px] font-[400] text-[#262626]">Mumbai</div>
                    </div>
                  </div>
                  <div className="flex w-full gap-1 ">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g mask="url(#mask0_6262_73122)">
                        <path d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z" fill="#646464" />
                      </g>
                    </svg>
                    <div className="text-[12px] font-[400] text-[#262626]">
                      TechGenius Innovations is seeking a talented and experienced UX Designer to join our team. As a UX....
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <img src="" alt="company logo" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 ml:p-4 ">
                <div className="w-full text-[16px] font-[600] text-[#333333]">Full job Description</div>
                <div className="w-full text-[14px] font-[400] text-[#333333]">
                  The ideal person would have
                  Experience working on the user interface of websites
                  Know how to create mockups, understand feedback and present their work
                  Have experience building sitemaps, wireframes and prototypes as per the project brief
                  Have strong design and creative skills
                  In-depth experience using Adobe Illustrator, Figma
                </div>
                <div className="w-full text-[14px] font-[600] text-[#333333]">Responsibilities :</div>
                <div className="w-full text-[14px] font-[400] text-[#333333]">
                  Develop design solutions for various platforms
                  Establish consistent brand and creative designs
                  Communicate ideas with project managers using mock-ups and look books
                  Build sitemaps, wireframes and prototypes to outline the structure
                </div>
                <div className="w-full text-[14px] font-[600] text-[#333333]">Qualifications :</div>
                <div className="w-full text-[14px] font-[400] text-[#333333]">
                  Bachelor's degree in user experience, design or related field
                  2+ years of experience with UI design
                  Strong communication, design and creative thinking skills Experience with Adobe Pro, Illustrator and Photoshop, Figma, InVision.
                </div>
                <div className="flex gap-1 w-full text-[14px] font-[600] text-[#333333]">
                  Job Type:
                  <div className="w-full text-[14px] font-[500] text-[#333333]">Full Time</div>
                </div>
                <div className="flex gap-1 w-full text-[14px] font-[600] text-[#333333]">
                  Salary:
                  <div className="w-full text-[14px] font-[500] text-[#333333]">₹8,086.00 - ₹50,000.00 per month</div>
                </div>
                <div className="flex gap-1 w-full text-[14px] font-[600] text-[#333333]">
                  Schedule:
                  <div className="w-full text-[14px] font-[500] text-[#333333]">Day shift</div>
                </div>
                <div className="flex gap-1 w-full text-[14px] font-[600] text-[#333333]">
                  Education:
                  <div className="w-full text-[14px] font-[500] text-[#333333]"> Bachelor's (Preferred)</div>
                </div>
                <div className="flex gap-1 w-full text-[14px] font-[600] text-[#333333]">
                  Experience:
                  <div className="w-full text-[14px] font-[500] text-[#333333]">total work: 2 years (Required)</div>
                </div>
              </div>
              {/* <div
                onClick={() => {
                  openModel(false)
                }}
                className="w-full flex justify-end">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g mask="url(#mask0_6262_73092)">
                    <path d="M24.0003 26.1232L17.5078 32.6152C17.2181 32.9052 16.8669 33.0469 16.4543 33.0402C16.0413 33.0339 15.6899 32.8859 15.4003 32.5962C15.1106 32.3065 14.9658 31.952 14.9658 31.5327C14.9658 31.1134 15.1106 30.7589 15.4003 30.4692L21.8733 23.9962L15.3813 17.5537C15.0913 17.264 14.9496 16.9095 14.9563 16.4902C14.9626 16.0712 15.1106 15.7169 15.4003 15.4272C15.6899 15.1372 16.0444 14.9922 16.4638 14.9922C16.8831 14.9922 17.2376 15.1372 17.5273 15.4272L24.0003 21.9192L30.4428 15.4272C30.7324 15.1372 31.0836 14.9922 31.4963 14.9922C31.9093 14.9922 32.2606 15.1372 32.5503 15.4272C32.8606 15.7372 33.0158 16.0967 33.0158 16.5057C33.0158 16.9147 32.8606 17.264 32.5503 17.5537L26.0773 23.9962L32.5693 30.4887C32.8593 30.7784 33.0043 31.1295 33.0043 31.5422C33.0043 31.9552 32.8593 32.3065 32.5693 32.5962C32.2593 32.9065 31.8998 33.0617 31.4908 33.0617C31.0818 33.0617 30.7324 32.9065 30.4428 32.5962L24.0003 26.1232Z" fill="#333333" />
                  </g>
                </svg>
              </div>
              <div
                onWheel={(e) => e.stopPropagation()}
                className="p-[16px]  bg-[#fff] rounded-[12px] flex flex-col gap-[16px]   overflow-y-scroll "
              >
                {selectedJob?.description?.length > 0 && (
                  <div className="flex flex-col gap-[8px]">
                    <div className="text-[16px] font-[600]">
                      Full job Description
                    </div>
                    <div className="text-[14px] font-[400] gap-[8px] flex flex-col">
                      {selectedJob.description}
                    </div>
                  </div>
                )}
                {selectedJob.requiredQualification && (
                  <div className="flex flex-col gap-[10px] pb-[6px]">
                    <div className="text-[16px] font-[600]">
                      Qualifications :
                    </div>

                    <div className="text-[14px] font-[400]">
                      {selectedJob.requiredQualification} <br /> Total Work
                      Total Experience {selectedJob.experience} (Required){" "}
                      <br />
                      {selectedJob.mustSkills}
                    </div>
                  </div>
                )}

                <div className="pb-[12px]  flex flex-col gap-2">
                  <div className="flex flex-col gap-[16px] text-[12px] text-[#333] font-[500]">
                    <div className="text-[14px] font-[600] ">
                      Job Type :{" "}
                      <span className="text-[14px] font-[500]">
                        {" "}
                        {selectedJob.jobType}
                      </span>
                    </div>
                    {(selectedJob.minSalary > 0 ||
                      selectedJob.maxSalary > 0) && (
                        <div className="text-[14px] font-[600] flex">
                          Salary :
                          {(() => {
                            const icon = currenciesWithIcons?.find(
                              (item) =>
                                item?.icon?.toLowerCase() ===
                                selectedJob?.currency?.toLowerCase()
                            );

                            return (
                              <div className="text-[14px] font-[500]">
                                {icon ? icon.symbol : selectedJob?.currency}{" "}
                                {selectedJob.minSalary}{" "}
                                {selectedJob.minSalary &&
                                  selectedJob.maxSalary &&
                                  "-"}{" "}
                                {icon ? icon.symbol : selectedJob?.currency}{" "}
                                {selectedJob.maxSalary}{" "}
                                {selectedJob.salaryType === "Annual"
                                  ? "per annum"
                                  : "per month"}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    {selectedJob.qualificationType && (
                      <div className="text-[14px] font-[600] ">
                        Education :{" "}
                        <span className="text-[14px] font-[500]">
                          {selectedJob.qualificationType} (Preferred)
                        </span>
                      </div>
                    )}
                    {selectedJob.experience && (
                      <div className="text-[14px] font-[600] ">
                        Experience :{" "}
                        <span className="text-[14px] font-[500]">
                          Total Work
                          {selectedJob.experience} (Required)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-[24px]">
                  <button
                    disabled={
                      (selectedJob?.matchedApplication?.applicantId === userDataGlobal._id) ||
                      selectedJob.status === "Hold"
                    }
                    onClick={() => {
                      if (isLogin) {
                        if (jobApplyCount > 0) {
                          if (
                            !selectedJob?.matchedApplication?.applicantId === userDataGlobal._id
                          ) {
                            router.push(
                              `/jobs/home/ApplyForm?id=${selectedJob._id}`
                            );
                          }
                        } else {
                          setLimitPopup(true);
                        }
                      } else {
                        router.push(`/auth?signin=true&role=user`);
                      }
                    }}
                    className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[12px] px-[36px] rounded-[30px] ${selectedJob?.matchedApplication?.applicantId === userDataGlobal._id ||
                      selectedJob.status === "Hold"
                      ? "cursor-not-allowed"
                      : " cursor-pointer"
                      }`}
                  >
                    {selectedJob?.matchedApplication?.applicantId === userDataGlobal._id
                      ? "Applied"
                      : "Apply"}
                  </button>
                  <button className="text-[14px] font-[600] border-[1px] border-[#06A9EF] text-[#333333] flex items-center gap-[2px] py-[12px] px-[36px] rounded-[30px]">
                    Share
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1913 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4252 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1913 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0727 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0727 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1913 14.3774 16.7148 14.9012C17.2383 15.4252 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z"
                        fill="#1C1B1F"
                      />
                    </svg>
                  </button>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default Description;
