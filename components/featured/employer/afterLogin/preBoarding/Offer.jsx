import React, { useCallback, useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import GenerateOffer from "./GenerateOffer";
import EditOfferTemplate from "./EditOfferTemplate";
import {
  applicants,
  applicantsMobile,
  headings,
} from "../../../../../utils/preboardArray";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatInterviewDate } from "../../../../../utils/middleware";
import CustomPagination from "../../../../common/CustomPagination";
import MiniLoader from "../../../../common/mini-loader";

const Offer = ({ toggleContentt, setToggle, setEditTemplate }) => {
  const [generateOffer, setGenerateOffer] = useState(false);

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
  const [loadingApplicantId, setLoadingApplicantId] = useState(null);
  const [offerData, setOfferData] = useState({
    applicantId: null,
    jobId: null,
    jobTitle: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  console.log(loadingApplicantId)

  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const [popup, setPopup] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
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
            level: "offerRelease",
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

  const releaseOffer = async (applicantId, jobId) => {
    setLoadingApplicantId(applicantId)
    try {
      const response = await axios.put(
        `http://localhost:2000/api/preboarding/releaseOffer/${applicantId}/${jobId}`
      );

      if (response.status === 200) {
        toast.success("Moved to Release Offer successfully");
        fetchJobs();
        setLoadingApplicantId(null)
        return response.data;
      }
    } catch (error) {
      setLoadingApplicantId(null)
      toast.error("Error moving to Release Offer");
    }
  };

  const labels = [
    "Name of Candidate",
    "Job Role",
    "Due Date",
    "Doc Status",
    "Recruiter",
    "Offer Acceptance",
    "Actions",
  ];

  const handleGenerateOffer = async (applicants) => {
    await setOfferData({
      applicantId: applicants.applicantId,
      jobId: applicants.jobId,
      jobTitle: applicants.jobTitle,
      firstName: applicants?.details?.personal?.firstName,
      lastName: applicants?.details?.personal?.lastName,
      email: applicants?.details?.personal?.email,
    });
    setGenerateOffer(true);
  };

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
            {jobs?.map((applicants, index) => (
              <>
                <div className="flex w-[100%] py-[16px]  border-b border-[#D4D4D480] bg-[#FFFFFF] justify-between items-center">
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
                    <div className="flex items-center justify-start col-span-1 pl-5 text-[12px] font-[500]">
                      {applicants.role}
                    </div>
                    <div className="flex items-center justify-center col-span-1 ">
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
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex   items-center w-full  justify-between relative">
                          {applicants?.preboardingDetails?.isOfferRelease ? (
                            <div
                              className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border border-[#ABABAB]  text-[#ABABAB]`}
                            >
                              Offer Released
                            </div>
                          ) : (
                            <>
                              {applicants?.preboardingDetails
                                ?.isOfferGenerated ? (
                                <>
                                  {loadingApplicantId === applicants.applicantId ? (
                                    <div  className={` w-[116.24px] flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border border-blue `}>
                                      <MiniLoader />
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => releaseOffer(applicants.applicantId, applicants.jobId)}
                                      className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border border-blue `}
                                    >
                                      Release Offer
                                    </button>
                                  )}
                                </>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleGenerateOffer(applicants)
                                  }
                                  className="flex lg:py-[6px] lg:px-3 px-1 py-1 justify-center items-center text-[#fff] bg-[#06A9EF] rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border "
                                >
                                  Generate Offer
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
                                <div>Edit Offer</div>
                                <div>Release Offer</div>
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
            {jobs?.map((applicants, index) => (
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
                              <div>Edit Offer</div>
                              <div>Release Offer</div>
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
                      >{applicants?.preboardingDetails?.offerAcceptanceStatus}</div>
                    </div>
                    <div className="flex justify-center w-[100%]">
                      <div className="flex w-full justify-center relative">
                        {applicants?.preboardingDetails?.isOfferRelease ? (
                          <div
                            className={`flex w-[120px] h-[40px] justify-center items-center rounded-[30px] border font-semibold text-[14px] border-[#ABABAB]  text-[#ABABAB]`}
                          >
                            Offer Released
                          </div>
                        ) : (
                          <>
                            {applicants?.preboardingDetails
                              ?.isOfferGenerated ? (
                                <>
                                {loadingApplicantId === applicants.applicantId ? (
                                  <div  className={` w-[120px] flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border border-blue `}>
                                    <MiniLoader />
                                  </div>
                                ) : (
                              <button
                                className="border-[#06A9EF] bg-white text-black  rounded-[30px] w-[120px] h-[40px]   border"
                              >
                                Release Offer
                              </button>
                                )}
                              </>
                            ) : (
                              <button
                                onClick={() => handleGenerateOffer(applicants)}
                                className="flex w-[140px] h-[40px] justify-center items-center gap-2 border rounded-[30px]  border-[#06A9EF] font-semibold text-[14px] text-[#fff] bg-[#06A9EF]  lg:text-[12px] font-Montserrat"
                              >
                                Generate Offer
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

      {totalCount > 9 && (
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
      {generateOffer && (
        <GenerateOffer
          setGenerateOffer={setGenerateOffer}
          setPopup={setPopup}
          setSuccessfull={setSuccessfull}
          setEditTemplate={setEditTemplate}
          offerData={offerData}
          fetchJobs={fetchJobs}
        />
      )}

      {popup && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[95%] ms:w-[70%] ">
              <div
                className="flex w-[100%] p-[10px] sm:p-[24px] flex-col items-start gap-[16px] rounded-[16px]  bg-[#fff] "
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex justify-between w-full">
                  <p className="text-[24px] text-[#333] font-[500] ">
                    Generate Offer
                  </p>
                  <svg
                    onClick={() => setPopup(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_67168)">
                      <path
                        d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="text-[20px] text-[#333] font-[500] ">
                    Job title
                  </p>
                  <input
                    type="text"
                    className="w-full flex py-[8px] px-[16px] items-center gap-[8px] rounded-[6px] border-[1px] border-[#646464] text-[14px] text-[#646464] font-[600] leading-[16px]"
                    placeholder="it will be Prefilled"
                  />
                </div>

                <div className="ms:flex ms:flex-row flex flex-col gap-[24px] w-full  items-start">
                  <div className="flex flex-col gap-[8px] w-full ms:w-[300px] ">
                    <p className="text-[20px] text-[#333] font-[500] ">
                      Date of Joining
                    </p>
                    <input
                      type="date"
                      placeholder="Select Date"
                      className="border-[1px] border-[#646464] rounded-[6px] py-[8px] px-[16px]"
                      id=""
                    />
                  </div>
                  <div className="flex flex-col gap-[8px] w-full ms:w-[300px] ">
                    <p className="text-[20px] text-[#333] font-[500] ">
                      Offer end Date
                    </p>
                    <input
                      type="date"
                      placeholder="Select Date"
                      className="border-[1px] border-[#646464] rounded-[6px] py-[8px] px-[16px]"
                      id=""
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] items-start  w-full ms:w-[300px]">
                  <p className="text-[20px] text-[#333] font-[500] ">
                    Annual Salary
                  </p>
                  <input
                    type="text"
                    className="w-full flex py-[8px] px-[16px] items-center gap-[8px] rounded-[6px] border-[1px] border-[#646464] text-[14px] text-[#646464] font-[600] leading-[16px]"
                    placeholder="it will be Prefilled"
                  />
                </div>

                <div className="w-full justify-end gap-4 flex ">
                  <button
                    onClick={() => setPopup(false)}
                    className="flex items-center justify-center py-[8px] px-[24px] rounded-[12px] font-[600] border-[1px] text-[#333] border-[#06A9EF] bg-[#fff]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setSuccessfull(true)}
                    className="flex items-center justify-center py-[8px] px-[24px] rounded-[12px] font-[600] border-[1px] text-[#fff] border-[#06A9EF] bg-[#06A9EF]"
                  >
                    Generate Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {successfull && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div
              className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
              style={{
                boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <svg
                className="absolute top-[-30px]  left-[38%] right-[62%] flex"
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
                fill="none"
              >
                <g clip-path="url(#clip0_6622_116765)">
                  <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                  <g mask="url(#mask0_6622_116765)">
                    <path
                      d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6622_116765">
                    <rect width="85" height="85" rx="42.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="text-center">
                <div className="text-[24px] font-[500] text-[#333]">
                  Offer Generated Successfully
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setPopup(false), setSuccessfull(false);
                  }}
                  className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Offer;
