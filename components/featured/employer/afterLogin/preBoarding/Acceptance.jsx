import React, { useCallback, useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  applicants,
  applicantsMobile,
  headings,
} from "../../../../../utils/preboardArray";
import CustomPagination from "../../../../common/CustomPagination";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { formatInterviewDate } from "../../../../../utils/middleware";
import { toast } from "react-toastify";
import MiniLoader from "../../../../common/mini-loader";
const Acceptance = ({ toggleContentt, setToggle }) => {
  const [hired, setHired] = useState(false);
  const [hiredStates, setHiredStates] = useState(
    Array(applicants.length).fill(false)
  );
  const [hiredIndex, setHiredIndex] = useState(null);
  const [option, setOption] = useState(0);
  const [isRemind, setIsRemind] = useState(false);
  const [page, setPage] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [checkedjob, setCheckedJob] = useState({});
  const [applicant, selectedApplicant] = useState();
  const [openThreeDots, setOpenThreeDts] = useState(false);
  const [limit, setLimit] = useState(10);
  const [miniLoading, setMiniloading] = useState(true);
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [loadingApplicantId, setLoadingApplicantId] = useState(null);

  const fetchJobs = useCallback(async () => {
    if (!userDataGlobal?._id) return;

    setMiniloading(true);
    try {
      const response = await axios.get(
        `http://localhost:2000/api/getInPreboadingCandidates/${userDataGlobal._id}`,
        {
          params: {
            page: page,
            limit: limit,
            search: searchQuery.trim(),
            level: "offerAcceptance",
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

  const hiredCandidate = async (applicantId, jobId) => {
    setLoadingApplicantId(applicantId);
    try {
      const response = await axios.put(
        `http://localhost:2000/api/preboarding/hiredCandidate/${applicantId}/${jobId}`
      );

      if (response.status === 200) {
        toast.success("Candidate Hired successfully");
        fetchJobs();
        setLoadingApplicantId(null);
        return response.data;
      }
    } catch (error) {
      setLoadingApplicantId(null);
      toast.error("Error while hiring candidate");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    "Recruiter",
    "Offer Acceptance",
    "Actions",
  ];
  return (
    <>
      <div className="web w-full">
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
        <div className="grid grid-rows-1 w-full ">
          <div className="grid grid-cols-7 w-full grid-flow-col">
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
          <div className="grid grid-cols-1 w-full">
            {jobs.map((applicants, index) => (
              <>
                <div className="flex w-[100%] bg-[#FFFFFF]  border-b border-[#D4D4D480] py-[16px] justify-between items-center">
                  <div className="grid grid-cols-7 w-full px-4 py-2">
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex justify-start text-[14px] font-[600] items-center  gap-1 scr1024:gap-[16px]">
                        {/* <input className="w-[16px] h-[16px]" type="checkbox" /> */}
                        <img
                          className="w-[40px] rounded-[50%]"
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
                      className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${
                        applicants.preboardingDetails?.documentStatus ===
                          "Verified" ||
                        applicants.preboardingDetails?.documentStatus ===
                          "Submitted"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                      } `}
                    >
                      {applicants?.preboardingDetails?.documentStatus ===
                      "notRequired"
                        ? "Not Required"
                        : applicants?.preboardingDetails?.documentStatus}
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5 text-[12px] font-[500]">
                      {applicants.role}
                    </div>
                    <div className="flex items-center justify-center col-span-1 ">
                      <div
                        className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${
                          checkedjob[index]
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
                        } ${
                          applicants?.preboardingDetails
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
                    <div className="flex items-center justify-between col-span-1">
                      <div className="flex items-center justify-between w-full col-span-1">
                        <div className="flex  items-center w-full  justify-between relative">
                          {applicants?.preboardingDetails?.preboardingStatus ===
                          "Hired" ? (
                            <div className="flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center text-[#ABABAB] border border-[#ABABAB] items-center   rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat  ">
                              Hired
                            </div>
                          ) : (
                            <>
                              {loadingApplicantId === applicants.applicantId ? (
                                <div
                                  className={` w-[137.25px] flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border text-[#fff] bg-[#06A9EF]`}
                                >
                                  <MiniLoader />
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    hiredCandidate(
                                      applicants.applicantId,
                                      applicants.jobId
                                    )
                                  }
                                  className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border text-[#fff] bg-[#06A9EF]`}
                                >
                                  Hire Applicant
                                </button>
                              )}
                            </>
                          )}

                          <img
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

                                <div>Revise Offer</div>
                                <div className="text-[#C00000]">
                                  Cancel Offer
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile relative overflow-y-scroll  w-full ">
        <div className="sticky top-0">
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
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
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
                      <div className="flex justify-end items-center gap-4 relative">
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
                              className="absolute flex flex-col text-[14px] rounded-[8px]  w-[150px] z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white"
                              style={{
                                boxShadow:
                                  "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div>View Offer</div>

                              <div>Revise Offer</div>
                              <div className="text-[#C00000]">Cancel Offer</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                        className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${
                          applicants.preboardingDetails?.documentStatus ===
                            "Verified" ||
                          applicants.preboardingDetails?.documentStatus ===
                            "Submitted"
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
                      <div className="flex items-center justify-center col-span-1 ">
                        <div
                          className={`flex justify-center items-center gap-[8px] rounded-[80px] border w-[120px] h-[32px] text-[14px] font-semibold ${
                            checkedjob[index]
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
                          } ${
                            applicants?.preboardingDetails
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
                          {
                            applicants?.preboardingDetails
                              ?.offerAcceptanceStatus
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-[100%]">
                      <div className="flex items-center w-full justify-center relative">
                        {applicants?.preboardingDetails?.preboardingStatus ===
                        "Hired" ? (
                          <div className="flex w-[140px] h-[40px] justify-center items-center rounded-[30px] border font-semibold text-[12px] border-[#ABABAB] text-[#ABABAB]">
                            Hired
                          </div>
                        ) : (
                          <>
                            {loadingApplicantId === applicants.applicantId ? (
                              <div className="w-[140px] h-[40px] flex justify-center items-center rounded-[30px] border text-white bg-[#06A9EF] text-[12px] font-semibold">
                                <MiniLoader />
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  hiredCandidate(
                                    applicants.applicantId,
                                    applicants.jobId
                                  )
                                }
                                className="flex w-[140px] h-[40px] justify-center items-center gap-2 border rounded-[30px] text-white bg-[#06A9EF] text-[12px] font-semibold"
                              >
                                Hire Applicant
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {totalCount > 1 && (
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"preboarding"}
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

export default Acceptance;
