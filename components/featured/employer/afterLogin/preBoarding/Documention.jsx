import React, { useCallback, useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";
import {
  applicants,
  applicantsMobile,
  headings,
} from "../../../../../utils/preboardArray";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { formatInterviewDate } from "../../../../../utils/middleware";
import MiniLoader from "../../../../common/mini-loader";
import MiniLoaderr from "../../../../common/miniLoader";
import CustomPagination from "../../../../common/CustomPagination";
import ShortlistMail from "../../../../../pages/common/hiring/ShortlistMail";
import { AnimatePresence, motion } from "framer-motion";
import { setRecallData } from "../../../../../Redux/slices/recallSlice";
const Documention = ({ toggleContentt, setToggle }) => {
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
  const [jobData, setJobData] = useState({});
  const [emailDetails, setEmailDetails] = useState();
  const [loadingApplicantId, setLoadingApplicantId] = useState(null);
  const [reject, setReject] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const taskRef = useRef(null);
  const [moreOption, setMoreOption] = useState(false);
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  const {recallData } = useSelector((state) => state.recall);
  const dispatch = useDispatch();
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

  const handleDotClick = (index) => {
    setMoreOption((prev) => !prev);
    setSelectedDotIndex(index);
  };

  const reminder = async (applicants) => {
    setLoadingApplicantId(applicants.applicantId);
    await setJobData(applicants);

    let requiredDocs = [];
    if (applicants?.preboardingDetails?.documentList) {
      requiredDocs = Object.entries(applicants.preboardingDetails.documentList)
        .filter(([key, value]) => documentLabels[key] && value)
        .map(([key]) => `<li>${documentLabels[key]}</li>`);
    }

    await setEmailDetails((prev) => ({
      ...prev,
      to: applicants?.details?.personal?.email || "",
      cc: "",
      subject: subject,
      jobId: applicants.jobId,
      applicantId: applicants.applicantId,
      isPhotoId: applicants.preboardingDetails.documentList.isPhotoId,
      isAddress: applicants.preboardingDetails.documentList.isAddress,
      isPayroll: applicants.preboardingDetails.documentList.isPayroll,
      isAcademic: applicants.preboardingDetails.documentList.isAcademic,
      isDegrees: applicants.preboardingDetails.documentList.isDegrees,
      isCertifications:
        applicants.preboardingDetails.documentList.isCertifications,
      isExperience: applicants.preboardingDetails.documentList.isExperience,
      content: `<p>Dear Candidate,</p>\n
        <p>We are pleased to inform you that you have been selected for the next round of interviews at Skilotech.</p>\n
        ${requiredDocs.length > 0
          ? `<p>To proceed further, please submit the following documents for verification:</p>\n
            <ul>${requiredDocs.join("\n")}</ul>\n`
          : ""
        }
        ${applicants?.note
          ? `<p>Additional Note: ${applicants?.note}</p>\n`
          : ""
        }
        <p>Please upload these documents at your earliest convenience.</p>\n
        <p>Best regards,<br />The Skilotech Team</p>`,
    }));
  };

  useEffect(() => {
    if (emailDetails?.to) {
      handleSend();
    }
  }, [emailDetails]);

  const documentLabels = {
    isPhotoId: "Photo ID",
    isAddress: "Address Proof",
    isPayroll: "Payroll Documents",
    isAcademic: "Academic Records",
    isDegrees: "Degree Certificates",
    isCertifications: "Professional Certifications",
    isExperience: "Experience Letters",
  };

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(`Reminder for Document Submission `);

  const handleSend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/api/preboarding/documentReminder",
        emailDetails
      );

      setIsRemind(true);
      setLoadingApplicantId(null);
      return response.data;
    } catch (error) {
      setLoadingApplicantId(null);
      console.error(
        "Error sending document reminder email:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

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
            level: "documentation",
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
      setLoading(false)
    }
  }, [userDataGlobal?._id, searchQuery, isUpdate, page, limit]);

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchJobs();
    }
  }, [fetchJobs, statusChange]);

  const moveToVerification = async (applicantId, jobId) => {
    try {
      const response = await axios.put(
        `http://localhost:2000/api/preboarding/moveToVerification/${applicantId}/${jobId}`
      );

      if (response.status === 200) {
        toast.success("Moved to verification successfully");
        fetchJobs();
        dispatch(setRecallData(!recallData));
        return response.data;
      }
    } catch (error) {
      toast.error("Error moving to verification");
    }
  };

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const labels = [
    "Name of Candidate",
    "Job Role",
    "Due Date",
    "Doc Status",

    "Preboarding Status",
    "Actions",
  ];

  return (
    <>
       {loading ?
        <div className="flex justify-center items-center w-full">
          <MiniLoaderr />
        </div>
        :
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
            <div className="grid grid-cols-1 w-full rounded-b-[6px] ">
              {jobs?.map((applicants, index) => (
                <>
                  <div
                    className={`flex w-[100%] border-b border-[#D4D4D480] px-[16px] py-[10px] justify-between items-center ${checkedjob[index]
                      ? "bg-[#D3F1FF]"
                      : "bg-[#FFFFFF] hover:bg-[#D3F1FF]"
                      }`}
                  >
                    <div className="grid grid-cols-6 w-full ">
                      <div className="flex items-center justify-start col-span-1">
                        <div onClick={()=> router.push(`/common/hiring/ApplicantDetails?applicantId=${applicants?.applicantId}&id=${applicants?.jobId}`)}  className="flex justify-start text-[14px] font-[600] items-center cursor-pointer  gap-1 scr1024:gap-[16px]">
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
                      <div className="flex items-center justify-start col-span-1 pl-2">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {applicants?.jobTitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1 pl-3">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {formatInterviewDate(applicants?.jobDeadLine)}
                        </p>
                      </div>
                      <div
                        className={` flex items-center text-[14px] font-[600] justify-start col-span-1 pl-5 text ${applicants?.preboardingDetails?.documentStatus ===
                          "Submitted" ||
                          applicants?.preboardingDetails?.documentStatus ===
                          "Verified"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                          } `}
                      >
                        {applicants?.preboardingDetails?.documentStatus}
                      </div>

                      <div className="flex items-center justify-start col-span-1 pl-5">
                        <div
                          className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : applicants?.preboardingDetails
                              ?.preboardingStatus === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "bg-[#E7F8FF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Hired"
                                  ? "bg-[#E8FFE8]"
                                  : applicants?.preboardingDetails
                                    ?.preboardingStatus === "Rejected"
                                    ? "bg-[#FFE6E2]"
                                    : ""
                            } ${applicants?.preboardingDetails
                              ?.preboardingStatus === "Pending"
                              ? "text-[#FFB836]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "text-[#06A9EF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Hired"
                                  ? "text-[#0C8A0A]"
                                  : applicants?.preboardingDetails
                                    ?.preboardingStatus === "Rejected"
                                    ? "text-[#FF6550]"
                                    : "text-[#333333]"
                            }`}
                        >
                          {applicants?.preboardingDetails?.preboardingStatus}
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1 pl-5">
                        <div className="flex   items-center w-full  justify-between relative">
                          {applicants?.preboardingDetails?.documentStatus ==
                            "Submitted" ||
                            applicants?.preboardingDetails?.documentStatus ==
                            "Verified" ? (
                            <button
                              disabled={
                                applicants?.preboardingDetails
                                  ?.isMovedToVerification
                              }
                              onClick={() =>
                                moveToVerification(
                                  applicants.applicantId,
                                  applicants.jobId
                                )
                              }
                              className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border  ${!applicants?.preboardingDetails
                                ?.isMovedToVerification
                                ? "text-[#fff] bg-[#06A9EF]"
                                : "text-[#ABABAB] border-[#ABABAB]"
                                }
                                }`}
                            >
                              {applicants?.preboardingDetails
                                ?.isMovedToVerification
                                ? "Moved "
                                : "Move to Next"}
                            </button>
                          ) : (
                            <>
                              {loadingApplicantId === applicants.applicantId ? (
                                <div className=" w-[91px] flex lg:py-2 lg:px-4 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-[#06A9EF] ">
                                  <MiniLoader />
                                </div>
                              ) : (
                                <button
                                  onClick={() => reminder(applicants)}
                                  className="w-[91px] flex lg:py-2 lg:px-4 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-[#06A9EF] "
                                >
                                  Remind
                                </button>
                              )}
                            </>
                          )}

                          <button
                            disabled={
                              applicants?.preboardingDetails
                                ?.preboardingStatus === "Rejected"
                            }
                            style={{
                              opacity:
                                applicants?.preboardingDetails
                                  ?.preboardingStatus === "Rejected"
                                  ? 0.5
                                  : 1,
                            }}
                          >
                            <img
                              onClick={() => handleDotClick(index)}
                              className="min-w-[24px] max-w-[24px]"
                              src="/images/employer/three-dot.png"
                              alt=""
                            />
                          </button>
                          <AnimatePresence>
                            {moreOption && selectedDotIndex === index && (
                              <motion.div
                                onClick={() => {
                                  setReject(true);
                                  selectedApplicant(applicants);
                                }}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                                ref={taskRef}
                                className="absolute flex flex-col text-[14px] w-[100px] rounded-[8px]  right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white"
                                style={{
                                  boxShadow:
                                    "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                                }}
                              >
                                <div className="text-[#C00000] font-medium cursor-pointer">
                                  Reject
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
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
          {!jobs?.length == 0 ? (
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
                        <p
                          className={`text-[14px]  font-[600] font-Montserrat ${applicants?.preboardingDetails?.documentStatus ===
                            "Submitted" ||
                            applicants?.preboardingDetails?.documentStatus ===
                            "Verified"
                            ? "text-[#0C8A0A]"
                            : "text-[#333]"
                            } `}
                        >
                          {applicants?.preboardingDetails?.documentStatus}
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Preboarding Status
                        </p>

                        <div
                          className={`flex py-[6px]  justify-center px-[10px]  text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : applicants?.preboardingDetails
                              ?.preboardingStatus === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "bg-[#E7F8FF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Hired"
                                  ? "bg-[#E8FFE8]"
                                  : applicants?.preboardingDetails
                                    ?.preboardingStatus === "Rejected"
                                    ? "bg-[#FFE6E2]"
                                    : ""
                            } ${applicants?.preboardingDetails
                              ?.preboardingStatus === "Pending"
                              ? "text-[#FFB836]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "text-[#06A9EF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Hired"
                                  ? "text-[#0C8A0A]"
                                  : applicants?.preboardingDetails
                                    ?.preboardingStatus === "Rejected"
                                    ? "text-[#FF6550]"
                                    : "text-[#333333]"
                            }`}
                        >
                          {applicants?.preboardingDetails?.preboardingStatus}
                        </div>
                      </div>
                      <div className="flex justify-center w-full">
                        {applicants?.preboardingDetails?.documentStatus ==
                          "Submitted" ||
                          applicants?.preboardingDetails?.documentStatus ==
                          "Verified" ? (
                          <button
                            disabled={
                              applicants?.preboardingDetails
                                ?.isMovedToVerification
                            }
                            onClick={() =>
                              moveToVerification(
                                applicants.applicantId,
                                applicants.jobId
                              )
                            }
                            className={`flex w-[120px] h-[40px] justify-center items-center rounded-[30px]  font-semibold text-[14px]  ${!applicants?.preboardingDetails
                              ?.isMovedToVerification
                              ? "text-[#fff] bg-[#06A9EF]"
                              : "text-[#ABABAB] border-[#ABABAB] border"
                              }
                                }`}
                          >
                            {applicants?.preboardingDetails
                              ?.isMovedToVerification
                              ? "Moved "
                              : "Move to Next"}
                          </button>
                        ) : (
                          <div className="flex gap-4">
                            {loadingApplicantId === applicants.applicantId ? (
                              <div className=" w-[91px] flex lg:py-2 lg:px-4 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-[#06A9EF] ">
                                <MiniLoader />
                              </div>
                            ) : (
                              <button
                                onClick={() => reminder(applicants)}
                                className="flex w-[140px] h-[40px] justify-center items-center gap-2 rounded-[30px] border border-[#06A9EF] text-black font-semibold text-[14px] "
                              >
                                Remind
                              </button>
                            )}
                            {applicants?.preboardingDetails
                              ?.preboardingStatus !== "Rejected" && (
                                <button
                                  disabled={
                                    applicants?.preboardingDetails
                                      ?.preboardingStatus === "Rejected"
                                  }
                                  onClick={() => {
                                    setReject(true);
                                    selectedApplicant(applicants);
                                  }}
                                  style={{
                                    opacity:
                                      applicants?.preboardingDetails
                                        ?.preboardingStatus === "Rejected"
                                        ? 0.5
                                        : 1,
                                  }}
                                  className="flex  px-6 py-1 justify-center items-center gap-[10px] rounded-[30px]   bg-[#FFE6E2] text-[#FF6550]  text-[12px]  font-[600] font-Montserrat"
                                >
                                  Reject
                                </button>
                              )}
                          </div>
                        )}
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
      </div>

      {isRemind && (
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
                  Reminder sent Successfully
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsRemind(false)}
                  className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {reject && (
        <ShortlistMail
          shortlist={[applicant]}
          setPopupVisible={setReject}
          id={applicant?.jobId}
          newHiringStage={"Rejected"}
          setStatusChange={setStatusChange}
          statusChange={statusChange}
        />
      )}
   </>
      }
    </>
  );
};

export default Documention;
