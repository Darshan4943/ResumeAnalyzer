import React, { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  camelCase,
  formatInterviewDate,
} from "../../../../../utils/middleware";
import CustomPagination from "../../../../common/CustomPagination";
import { Document, Page, pdfjs } from "react-pdf";
import InlineSVG from "../../../../common/InlineSvg";
import DocumentModal from "../../../../common/DocumentModel";
import MiniLoader from "../../../../common/mini-loader";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Verification = ({ toggleContentt, setToggle }) => {
  const [documentation, setDocumentation] = useState(false);
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
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [VerifyApplicant, setVerifyApplicant] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false)
  const [loadingApplicantId, setLoadingApplicantId] = useState(null);
  const closeModal = () => setIsOpen(false);

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
            level: "verification",
          },
        }
      );

      setJobs(response.data.applications || []);
      setTotalCount(response.data.pagination?.totalApplications || 0);
      setTotalPages(response.data.pagination?.totalPages || 0);
      console.log(1221122, response.data);
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

  const moveToReleaseOffer = async (applicantId, jobId) => {
    setLoadingApplicantId(applicantId)
    try {
      const response = await axios.put(
        `http://localhost:2000/api/preboarding/moveToReleaseOffer/${applicantId}/${jobId}`
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


  const verifyDocuments = async (applicantId, jobId) => {
    setLoading(true)
    try {
      const response = await axios.put(
        `http://localhost:2000/api/preboarding/verifyDocuments/${applicantId}/${jobId}`
      );

      if (response.status === 200) {
        toast.success("Moved to Release Offer successfully");
        fetchJobs();
        setDocumentation(false)
        setLoading(false)
        return response.data;
      }
    } catch (error) {
      setLoading(false)
      toast.error("Error moving to Release Offer");
    }
  };



  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const verify = async (applicant) => {
    await setVerifyApplicant(applicant);
    setDocumentation(true);
  };

  const labels = [
    "Name of Candidate",
    "Job Role",
    "Due Date",
    "Doc Status",
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];
  const documentCategories = {
    "Personal ID Proof": ["photoId", "address"],
    "": ["payroll"],
    Degrees: ["academicCertification", "degreeCertification"],
    Certification: ["OtherCertifications"],
    "Previous Work Experience": ["experienceLetter"],
  };

  const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess(numPages) {
      setNumPages(numPages);
    }

    return (
      <div
        style={{
          width: "180px",
          height: "100px",
          boxShadow: " 0px 2px 10px 1px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          overflow: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
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
                      className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants?.preboardingDetails?.documentStatus ===
                        "Submitted"
                        ? "text-[#0C8A0A]"
                        : applicants?.preboardingDetails?.documentStatus ===
                          "Verified"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                        } `}
                    >
                      {applicants?.preboardingDetails?.documentStatus}
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5 text-[12px] font-[500]">
                      {applicants.role}
                    </div>
                    <div className="flex items-center justify-center col-span-1 ">
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
                                ?.preboardingStatus === "Approved" ||
                                applicants?.preboardingDetails
                                  ?.preboardingStatus === "Hired"
                                ? "bg-[#E8FFE8]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Rejected"
                                  ? "bg-[#FFE6E2]"
                                  : ""
                          } ${applicants?.preboardingDetails?.preboardingStatus ===
                            "Pending"
                            ? "text-[#FFB836]"
                            : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                            ? "text-[#06A9EF]"
                            : applicants?.preboardingDetails
                                ?.preboardingStatus === "Approved" ||
                              applicants?.preboardingDetails
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
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex   items-center w-full  justify-between">
                        {applicants?.preboardingDetails
                          ?.isMovedToReleaseOffer ? (
                          <div className="flex lg:py-[6px] lg:px-3 px-1 py-1 justify-center text-[#ABABAB] items-center bg-[#fff]  rounded-[30px]  lg:text-[12px] text-[10px]  font-[600] font-Montserrat border border-[#ABABAB]">
                            Moved forward
                          </div>
                        ) : (
                          <>
                            {applicants?.preboardingDetails?.documentStatus ==
                              "Submitted" ? (
                              <button
                                onClick={() => verify(applicants)}
                                className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border text-[#fff] bg-[#06A9EF]
                             
                              `}
                              >
                                View & Verify
                              </button>
                            ) : applicants?.preboardingDetails
                              ?.documentStatus == "Verified" ? (
                                <>

                                {loadingApplicantId === applicants.applicantId ? (
                                  <div  className={` w-[128.30px] flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-blue
                             
                                    `}>
                                    <MiniLoader />
                                  </div>
                                ) : (
                              <button
                                onClick={() =>
                                  moveToReleaseOffer(
                                    applicants?.applicantId,
                                    applicants?.jobId
                                  )
                                }
                                className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-blue
                             
                              `}
                              >
                                Move to Next
                              </button>
                                )}
                                </>
                            ) : (
                              ""
                            )}
                          </>
                        )}

                        <img
                          className="w-[24px]"
                          src="/images/employer/three-dot.png"
                          alt=""
                        />
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
                      <div className="flex justify-end items-center gap-4">
                        <svg
                          xlgns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_7540_117410)">
                            <path
                              d="M11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_7540_117410">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="matrix(0 1 -1 0 24 0)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
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
                        className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants?.preboardingDetails?.documentStatus ===
                          "Submitted"
                          ? "text-[#0C8A0A]"
                          : applicants?.preboardingDetails?.documentStatus ===
                            "Verified"
                            ? "text-[#0C8A0A]"
                            : "text-[#333]"
                          } `}
                      >
                        {applicants?.preboardingDetails?.documentStatus}
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
                        {applicants?.preboardingDetails?.preboardingStatus}
                      </p>
                      <div className="flex items-center justify-center col-span-1 ">
                        <div
                          className={`flex py-[10px] justify-center px-[14px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : applicants?.preboardingDetails
                              ?.preboardingStatus === "Pending"
                              ? "bg-[#FFF9ED]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "bg-[#E7F8FF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Approved" ||
                                  applicants?.preboardingDetails
                                    ?.preboardingStatus === "Hired"
                                  ? "bg-[#E8FFE8]"
                                  : applicants?.preboardingDetails
                                    ?.preboardingStatus === "Rejected"
                                    ? "bg-[#FFE6E2]"
                                    : ""
                            } ${applicants?.preboardingDetails?.preboardingStatus ===
                              "Pending"
                              ? "text-[#FFB836]"
                              : applicants?.preboardingDetails
                                ?.preboardingStatus === "Initiated"
                                ? "text-[#06A9EF]"
                                : applicants?.preboardingDetails
                                  ?.preboardingStatus === "Approved" ||
                                  applicants?.preboardingDetails
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
                    </div>
                    <div className="flex justify-center w-[100%]">
                      <div className="flex justify-center w-full">
                        {applicants?.preboardingDetails
                          ?.isMovedToReleaseOffer ? (
                          <div
                            onClick={toggleContentt}
                            className="flex w-[120px] h-[40px] justify-center items-center rounded-[30px] border border-[#DEDEDE] text-[#DEDEDE] font-semibold text-[14px]"
                          >
                            Moved forward
                          </div>
                        ) : (
                          <>
                            {applicants?.preboardingDetails?.documentStatus ==
                              "Submitted" ? (
                              <button
                                onClick={() => setDocumentation(true)}
                                className={`flex w-[140px] h-[40px] justify-center items-center gap-2 rounded-[30px] border border-[#06A9EF]  font-semibold text-[#fff] bg-[#06A9EF]
                             
                              `}
                              >
                                View & Verify
                              </button>
                            ) : applicants?.preboardingDetails
                              ?.documentStatus == "Verified" ? (
                              <>

                                {loadingApplicantId === applicants.applicantId ? (
                                  <div  className={` w-[128.30px] flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-blue
                             
                                    `}>
                                    <MiniLoader />
                                  </div>
                                ) : (
                                  <button
                                    onClick={() =>
                                      moveToReleaseOffer(
                                        applicants?.applicantId,
                                        applicants?.jobId
                                      )
                                    }
                                    className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-blue
                             
                              `}
                                  >
                                    Move to Next
                                  </button>
                                )}
                              </>
                            ) : (
                              ""
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


      {documentation && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[95%] ms:w-[90%] ">
              <div
                className="flex w-[100%] p-[10px] sm:p-[24px] flex-col items-start gap-[16px] rounded-[16px] h-[90vh] overflow-y-scroll  bg-[#fff] "
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex justify-between w-full">
                  <p className="scr420:text-[20px] text-[18px] px-[5%] scr420:px-[0%] text-[#333] font-[500] ">
                    View & Verify Documents
                  </p>
                  <svg
                    onClick={() => setDocumentation(false)}
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

                <div className="flex flex-col items-start gap-[16px]">
                  {Object.entries(documentCategories).map(
                    ([category, docKeys]) => {
                      const categoryDocs = Object.entries(
                        VerifyApplicant?.preboardingDetails
                          ?.uploadedDocuments || {}
                      ).filter(([key]) => docKeys.includes(key));

                      if (categoryDocs.length === 0) return null;

                      return (
                        <div
                          key={category}
                          className="w-full flex flex-col gap-2"
                        >
                          <p className="text-[16px] px-[5%] scr420:px-[0%] text-[#333] font-[600]">
                            {camelCase(category)}
                          </p>

                        <div className="flex flex-start flex-wrap gap-4 px-[5%] scr420:px-[0%]">
                          {categoryDocs.map(([key, value], index) => {

                            const fileExtension = value?.file?.split(".").pop().toLowerCase();
                            const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
                            const isPDF = fileExtension === "pdf";
                            const isDoc = ["doc", "docx"].includes(fileExtension);

                              return (
                                <div
                                  key={index}
                                  className="flex flex-col gap-2"
                                >
                                  {key === "OtherCertifications" ||
                                  key === "experienceLetter" ? (
                                    ""
                                  ) : (
                                    <p className="text-[14px] font-[500] text-[#333]">
                                      {camelCase(
                                        key.replace(/([A-Z])/g, " $1").trim()
                                      )}
                                    </p>
                                  )}
                                  <p className="text-[12px] font-[400] text-[#333]">
                                    {camelCase(value.fileName)}
                                  </p>

                                {isImage ? (
                                  <div className=" cursor-pointer"
                                    onClick={() => { setSelectedFile(value.file); setIsOpen(true) }}>
                                    <img

                                      src={value.file}
                                      alt="Uploaded Document"
                                      style={{
                                        height: "100px",
                                        width: "180px",
                                        objectFit: "contain",
                                        borderRadius: "8px",
                                        boxShadow: "0px 0px 4.9px 0px #00000040"


                                      }}
                                    />
                                  </div>
                                ) : isPDF ? (
                                  <div onClick={() => { setSelectedFile(value.file); setIsOpen(true) }} className="docs ">
                                    <PdfViewer pdfUrl={value?.file} />
                                  </div>

                                ) :
                                  isDoc ?

                                    <>
                                      <div
                                        onClick={() => { setSelectedFile(value.file); setIsOpen(true) }}
                                        style={{
                                          height: "100px",
                                          width: "180px",
                                          objectFit: "contain",
                                          borderRadius: "8px",
                                          boxShadow:
                                            "0px 0px 4.9px 0px #00000040",
                                          overflow: "hidden",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <iframe
                                          src={`https://docs.google.com/gview?url=${encodeURIComponent(
                                            value.file
                                          )}&embedded=true`}
                                        />
                                      </div>
                                    </>
                                    :
                                    <div onClick={() => { setSelectedFile(value.file); setIsOpen(true) }} style={{
                                      height: "100px",
                                      width: "180px",
                                      objectFit: "contain",
                                      borderRadius: "8px",
                                      boxShadow: "0px 0px 4.9px 0px #00000040",
                                      overflow: "hidden",


                                    }}>
                                      <InlineSVG imageUrl={value?.file} />
                                    </div>
                                }
                              </div>
                            );
                          })}

                        </div>
                        {isOpen && (
                          <>
                            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
                            <div onClick={() => setIsOpen(false)} className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                              <DocumentModal selectedFile={selectedFile} isOpen={isOpen} setIsOpen={setIsOpen} />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="w-full justify-end gap-4 flex ">
                  <button
                    onClick={() => setDocumentation(false)}
                    className="flex items-center justify-center text-[14px] scr420:text-[16px] py-[8px] scr420:px-[24px] px-[16px] rounded-[12px] font-[600] border-[1px] text-[#333] border-[#06A9EF] bg-[#fff]"
                  >
                    Cancel
                  </button>
                  {loading ?
                    <div className=" w-[197.7px] flex items-center justify-center text-[14px] scr420:text-[16px] py-[8px] scr420:px-[24px] px-[16px] rounded-[12px] font-[600] border-[1px]  border-[#06A9EF] bg-[#06A9EF]"
                    >
                      <MiniLoader />
                    </div>
                    :
                    <button
                      onClick={() =>

                        verifyDocuments(
                          VerifyApplicant?.applicantId,
                          VerifyApplicant?.jobId
                        )
                      }
                      className="flex items-center justify-center text-[14px] scr420:text-[16px] py-[8px] scr420:px-[24px] px-[16px] rounded-[12px] font-[600] border-[1px] text-[#fff] border-[#06A9EF] bg-[#06A9EF]"
                    >
                      Verify Documents
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Verification;
