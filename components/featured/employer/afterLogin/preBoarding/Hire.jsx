import React, { useCallback, useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import {
  applicants,
  applicantsMobile,
  headings,
} from "../../../../../utils/preboardArray";
import CustomPagination from "../../../../common/CustomPagination";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { formatInterviewDate } from "../../../../../utils/middleware";
import ApplicantPreview from "../../../../../pages/employer/ApplicantPreview";
const Hire = ({ }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [checkedjob, setCheckedJob] = useState({});
  const [applicant, selectedApplicant] = useState();
  const [openThreeDots, setOpenThreeDts] = useState(false);
  const [limit, setLimit] = useState(10);
  const [miniLoading, setMiniloading] = useState(true);
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [preview, setPreview] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [moreOption, setMoreOption] = useState(false);

  const fetchJobs = useCallback(async () => {
    if (!userDataGlobal?._id) return;

    setMiniloading(true);
    try {
      const response = await axios.get(
        `https://jamblix.com/api/getInPreboadingCandidates/${userDataGlobal?._id}`,
        {
          params: {
            page: page,
            limit: limit,
            search: searchQuery.trim(),
            level: "hired",
          },
        }
      );

      setJobs(response.data.applications || []);
      setTotalCount(response.data.pagination?.totalApplications || 0);
      setTotalPages(response.data.pagination?.totalPages || 0);

      toast.dismiss();
    } catch (err) {
      console.error("Error fetching job applications:", err);
      toast.error("Failed to fetch job applications. Please try again later.");
    } finally {
      setMiniloading(false);
    }
  }, [userDataGlobal?._id, searchQuery, isUpdate, page, limit]);

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchJobs();
    }
  }, [fetchJobs]);

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);

  const handleDotClick = (index) => {
    setMoreOption((prev) => !prev);
    setSelectedDotIndex(index);
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setMoreOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const labels = [
    "Name of Candidate",
    "Job Role",
    "Due Date",
    "Doc Status",

    "Offer Acceptance",
    "Actions",
  ];
  return (
    <>
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div
            className="flex py-2 px-3 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
            style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
          >
            <img
              src="/images/employer/icon_search.png"
              className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
              alt=""
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full"
            />
          </div>
        </div>
        <div className="grid grid-rows-1 w-full ">
          <div className="grid grid-cols-6 w-full grid-flow-col">
            {labels.map((req, index) => (
              <div
                key={index}
                className="flex px-4 text-[14px] font-[600] font-Montserrat text-[#333333] py-4 items-center bg-[#EFFAFF] justify-between w-full"
              >
                <p>{req}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-1 w-full">
          {!jobs?.length == 0 ? (
            <div className="grid grid-cols-1 w-full rounded-b-[6px] overflow-hidden">
              {jobs.map((applicants, index) => (
                <>
                  <div
                    className={`flex w-[100%] border-b border-[#D4D4D480] px-[16px] py-[10px] justify-between items-center ${checkedjob[index]
                      ? "bg-[#D3F1FF]"
                      : "bg-[#FFFFFF] hover:bg-[#D3F1FF]"
                      }`}
                  >
                    <div className="grid grid-cols-6 w-full ">
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex justify-start text-[14px] font-[600] items-center  gap-1 scr1024:gap-[16px]">
                          {/* <input className="w-[16px] h-[16px]" type="checkbox" /> */}
                          <img
                            className="w-[40px]  rounded-[50%]"
                            src="/images/employer/profile_icon.png"
                            alt=""
                          />
                          <p className="text-[14px] font-[600]">
                            {applicants.details?.personal?.firstName}{" "}
                            {applicants.details?.personal?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {applicants?.jobTitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {formatInterviewDate(applicants?.jobDeadLine)}
                        </p>
                      </div>
                      <div
                        className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants.preboardingDetails?.documentStatus ===
                          "Verified"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                          } `}
                      >
                        {applicants?.preboardingDetails?.documentStatus ===
                          "notRequired"
                          ? "Not Required"
                          : applicants?.preboardingDetails?.documentStatus}
                      </div>

                      <div className="flex items-center justify-start col-span-1 pl-6">
                        <div
                          className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : applicants?.preboardingDetails
                              ?.offerAcceptanceStatus === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicants?.preboardingDetails
                                ?.offerAcceptanceStatus === "Initiated"
                                ? "bg-[#E7F8FF]"
                                : applicants?.preboardingDetails
                                  ?.offerAcceptanceStatus === "Accepted"
                                  ? "bg-[#E8FFE8]"
                                  : applicants?.preboardingDetails
                                    ?.offerAcceptanceStatus === "Rejected"
                                    ? "bg-[#FFE6E2]"
                                    : ""
                            } ${applicants?.preboardingDetails
                              ?.offerAcceptanceStatus === "Pending"
                              ? "text-[#FFB836]"
                              : applicants?.preboardingDetails
                                ?.offerAcceptanceStatus === "Initiated"
                                ? "text-[#06A9EF]"
                                : applicants?.preboardingDetails
                                  ?.offerAcceptanceStatus === "Accepted"
                                  ? "text-[#0C8A0A]"
                                  : applicants?.preboardingDetails
                                    ?.offerAcceptanceStatus === "Rejected"
                                    ? "text-[#FF6550]"
                                    : "text-[#333333]"
                            }`}
                        >
                          {applicants?.preboardingDetails?.offerAcceptanceStatus}
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex justify-between  items-center w-full relative ">
                          <div className="flex lg:py-2 gap-1 lg:px-2 px-1 py-1 justify-center items-center rounded-[30px] border border-[#06A9EF] bg-[#06A9EF]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="12"
                              viewBox="0 0 18 12"
                              fill="none"
                            >
                              <path
                                d="M9 9.5C9.97222 9.5 10.7986 9.15972 11.4792 8.47917C12.1597 7.79861 12.5 6.97222 12.5 6C12.5 5.02778 12.1597 4.20139 11.4792 3.52083C10.7986 2.84028 9.97222 2.5 9 2.5C8.02778 2.5 7.20139 2.84028 6.52083 3.52083C5.84028 4.20139 5.5 5.02778 5.5 6C5.5 6.97222 5.84028 7.79861 6.52083 8.47917C7.20139 9.15972 8.02778 9.5 9 9.5ZM9 8C8.44444 8 7.97222 7.80556 7.58333 7.41667C7.19444 7.02778 7 6.55556 7 6C7 5.44444 7.19444 4.97222 7.58333 4.58333C7.97222 4.19444 8.44444 4 9 4C9.55556 4 10.0278 4.19444 10.4167 4.58333C10.8056 4.97222 11 5.44444 11 6C11 6.55556 10.8056 7.02778 10.4167 7.41667C10.0278 7.80556 9.55556 8 9 8ZM9 12C7.0195 12 5.21535 11.4549 3.58754 10.3646C1.95974 9.27431 0.763889 7.81944 0 6C0.763889 4.18056 1.95974 2.72569 3.58754 1.63542C5.21535 0.545139 7.0195 0 9 0C10.9805 0 12.7847 0.545139 14.4125 1.63542C16.0403 2.72569 17.2361 4.18056 18 6C17.2361 7.81944 16.0403 9.27431 14.4125 10.3646C12.7847 11.4549 10.9805 12 9 12ZM9 10.5C10.5556 10.5 11.9931 10.0972 13.3125 9.29167C14.6319 8.48611 15.6458 7.38889 16.3542 6C15.6458 4.61111 14.6319 3.51389 13.3125 2.70833C11.9931 1.90278 10.5556 1.5 9 1.5C7.44444 1.5 6.00694 1.90278 4.6875 2.70833C3.36806 3.51389 2.35417 4.61111 1.64583 6C2.35417 7.38889 3.36806 8.48611 4.6875 9.29167C6.00694 10.0972 7.44444 10.5 9 10.5Z"
                                fill="white"
                              />
                            </svg>
                            <button
                              onClick={() =>
                                router.push(
                                  `/employer/ApplicantPreview?id=${applicants?.jobId}&applicantId=${applicants?.applicantId}`
                                )
                              }
                              className=" text-white lg:text-[10px] text-[11px] font-[600]  font-Montserrat "
                            >
                              Preview Application
                            </button>
                          </div>

                          {/* <img
                          onClick={() => handleDotClick(index)}
                          className="w-[24px]"
                          src="/images/employer/three-dot.png"
                          alt=""
                        />
                        <AnimatePresence>
                          {moreOption && selectedDotIndex === index && (
                            <motion.div
                              initial={{ x: "100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                              ref={taskRef}
                              className="absolute flex flex-col text-[14px] rounded-[8px] left-0 right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white"
                              style={{
                                boxShadow:
                                  "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div>View Offer</div>
                              <div className="text-[#C00000]">Cancel Offer</div>
                            </motion.div>
                          )}
                        </AnimatePresence> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div className="p-10 w-full flex items-center justify-center">
              <img
                src="/images/employer/OBJECTS.png"
                alt="No data available"
                className="h-[114px] w-[200px]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mobile relative overflow-y-scroll  w-full ">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div
            className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
            style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
          >
            <img
              src="/images/employer/icon_search.png"
              className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
              alt=""
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          {!jobs?.length == 0 ? (
            <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
              {jobs.map((applicants, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#fff]"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[40px] h-[40px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicants.details?.personal?.firstName}{" "}
                            {applicants.details?.personal?.lastName}
                          </p>
                        </div>
                        {/* <div className="flex justify-end items-center gap-4 relative">
                        <img
                          onClick={() => handleDotClick(index)}
                          className="w-[24px]"
                          src="/images/employer/three-dot1.png"
                          alt=""
                        />
                        <AnimatePresence>
                          {moreOption && selectedDotIndex === index && (
                            <motion.div
                              initial={{ x: "100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                              ref={taskRef}
                              className="absolute flex flex-col text-[14px] rounded-[8px] w-[150px] z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white"
                              style={{
                                boxShadow:
                                  "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div>View Offer</div>
                              <div className="text-[#C00000]">Cancel Offer</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div> */}
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Job Role
                        </p>
                        <p className="text-[14px] text-[#333] font-Montserrat font-[600]">
                          {applicants?.jobTitle}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Due Date
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {formatInterviewDate(applicants?.jobDeadLine)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Doc Status
                        </p>
                        <div
                          className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants.preboardingDetails?.documentStatus ===
                            "Verified"
                            ? "text-[#0C8A0A]"
                            : "text-[#333]"
                            } `}
                        >
                          {applicants?.preboardingDetails?.documentStatus ===
                            "notRequired"
                            ? "Not Required"
                            : applicants?.preboardingDetails?.documentStatus}
                        </div>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Recruiter
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {applicants.role}
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Offer Acceptance
                        </p>
                        <div
                          className={`flex justify-center items-center gap-[8px] rounded-[80px] border w-[120px] h-[32px] text-[14px] font-semibold ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : applicants?.preboardingDetails
                              ?.offerAcceptanceStatus === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicants?.preboardingDetails
                                ?.offerAcceptanceStatus === "Initiated"
                                ? "bg-[#E7F8FF]"
                                : applicants?.preboardingDetails
                                  ?.offerAcceptanceStatus === "Accepted"
                                  ? "bg-[#E8FFE8]"
                                  : applicants?.preboardingDetails
                                    ?.offerAcceptanceStatus === "Rejected"
                                    ? "bg-[#FFE6E2]"
                                    : ""
                            } ${applicants?.preboardingDetails
                              ?.offerAcceptanceStatus === "Pending"
                              ? "text-[#FFB836]"
                              : applicants?.preboardingDetails
                                ?.offerAcceptanceStatus === "Initiated"
                                ? "text-[#06A9EF]"
                                : applicants?.preboardingDetails
                                  ?.offerAcceptanceStatus === "Accepted"
                                  ? "text-[#0C8A0A]"
                                  : applicants?.preboardingDetails
                                    ?.offerAcceptanceStatus === "Rejected"
                                    ? "text-[#FF6550]"
                                    : "text-[#333333]"
                            }`}
                        >
                          {applicants?.preboardingDetails?.offerAcceptanceStatus}
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <button
                          onClick={() =>
                            router.push(
                              `/employer/ApplicantPreview?id=${applicants?.jobId}&applicantId=${applicants?.applicantId}`
                            )
                          }
                          className="flex w-[260px] px-6 py-3 justify-center items-center gap-2 bg-[#06A9EF] text-white text-[12px] font-semibold font-Montserrat rounded-lg border border-[#06A9EF]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                          >
                            <path
                              d="M9 9.5C9.97222 9.5 10.7986 9.15972 11.4792 8.47917C12.1597 7.79861 12.5 6.97222 12.5 6C12.5 5.02778 12.1597 4.20139 11.4792 3.52083C10.7986 2.84028 9.97222 2.5 9 2.5C8.02778 2.5 7.20139 2.84028 6.52083 3.52083C5.84028 4.20139 5.5 5.02778 5.5 6C5.5 6.97222 5.84028 7.79861 6.52083 8.47917C7.20139 9.15972 8.02778 9.5 9 9.5ZM9 8C8.44444 8 7.97222 7.80556 7.58333 7.41667C7.19444 7.02778 7 6.55556 7 6C7 5.44444 7.19444 4.97222 7.58333 4.58333C7.97222 4.19444 8.44444 4 9 4C9.55556 4 10.0278 4.19444 10.4167 4.58333C10.8056 4.97222 11 5.44444 11 6C11 6.55556 10.8056 7.02778 10.4167 7.41667C10.0278 7.80556 9.55556 8 9 8ZM9 12C7.0195 12 5.21535 11.4549 3.58754 10.3646C1.95974 9.27431 0.763889 7.81944 0 6C0.763889 4.18056 1.95974 2.72569 3.58754 1.63542C5.21535 0.545139 7.0195 0 9 0C10.9805 0 12.7847 0.545139 14.4125 1.63542C16.0403 2.72569 17.2361 4.18056 18 6C17.2361 7.81944 16.0403 9.27431 14.4125 10.3646C12.7847 11.4549 10.9805 12 9 12ZM9 10.5C10.5556 10.5 11.9931 10.0972 13.3125 9.29167C14.6319 8.48611 15.6458 7.38889 16.3542 6C15.6458 4.61111 14.6319 3.51389 13.3125 2.70833C11.9931 1.90278 10.5556 1.5 9 1.5C7.44444 1.5 6.00694 1.90278 4.6875 2.70833C3.36806 3.51389 2.35417 4.61111 1.64583 6C2.35417 7.38889 3.36806 8.48611 4.6875 9.29167C6.00694 10.0972 7.44444 10.5 9 10.5Z"
                              fill="white"
                            />
                          </svg>
                          Preview Application
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div className="p-10 w-full flex items-center justify-center">
              <img
                src="/images/employer/OBJECTS.png"
                alt="No data available"
                className="h-[114px] w-[200px]"
              />
            </div>
          )}
        </div>
      </div>
      {totalCount > 10 && (
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"Applications"}
          setLimit={setLimit}
          defaultLimit={10}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      )}
    </>
  );
};

export default Hire;
