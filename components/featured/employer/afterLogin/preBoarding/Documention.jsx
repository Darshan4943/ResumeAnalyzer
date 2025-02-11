import React, { useCallback, useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants, applicantsMobile, headings } from "../../../../../utils/preboardArray";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { formatInterviewDate } from "../../../../../utils/middleware";
import MiniLoader from "../../../../common/mini-loader";
import CustomPagination from "../../../../common/CustomPagination";

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

  const [emailDetails, setEmailDetails] = useState()


  const reminder = async (applicants) => {
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
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(
    `Reminder for Document Submission `
  );






  const handleSend = async () => {

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:2000/api/preboarding/documentReminder",
        emailDetails
      );

      console.log("Email sent successfully:", response.data);
      setIsRemind(true)
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error sending document reminder email:", error.response?.data || error.message);
      throw error;
    }
  }




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
    }
  }, [userDataGlobal?._id, searchQuery, isUpdate,page,limit]);

 

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchJobs();

    }
  }, [fetchJobs]);

  const moveToVerification = async (applicantId, jobId) => {
    try {
      const response = await axios.put(`http://localhost:2000/api/preboarding/moveToVerification/${applicantId}/${jobId}`);

      if (response.status === 200) {
        toast.success("Moved to verification successfully");
        fetchJobs();
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
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];
  return (
    <>
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            {headings.map((items, index) => (
              <>
                <select
                  className=" w-[19.87%] bg-whites outline-none text-[#646464] text-[14px] font-[500]"
                  onChange={(e) => handleHeadingChange(e, items.heading)}
                >
                  <option value=""> {items.heading}</option>
                  {items.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
              </>
            ))}
            <button className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]">
              Search
            </button>
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
                <div
                  className="flex w-[100%] bg-[#FFFFFF]  border-b border-[#D4D4D480] py-[16px] justify-between items-center"
                >
                  <div className="grid grid-cols-7 w-full px-4 py-2">
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex justify-start text-[14px] font-[600] items-center  gap-1 scr1024:gap-[16px]">
                        <input className="w-[16px] h-[16px]" type="checkbox" />
                        <img
                          className="w-[40px] rounded-[50%]"
                          src="/images/employer/profile_icon.png"
                          alt=""
                        />
                        <p className="text-[14px] font-[600]">
                          {applicants.details?.personal?.firstName}  {applicants.details?.personal?.lastName}
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
                      className={` flex items-center text-[14px] font-[600] justify-start col-span-1 pl-5 text ${applicants?.preboardingDetails?.documentStatus === "Submitted" || applicants?.preboardingDetails?.documentStatus === "Verified"
                        ? "text-[#0C8A0A]"
                        : "text-[#333]"
                        } `}
                    >
                      {applicants?.preboardingDetails?.documentStatus}
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5 text-[12px] font-[500]">
                      {applicants?.role}
                    </div>
                    <div className="flex items-center justify-center col-span-1 ">
                      <div
                        className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedjob[index]
                          ? "bg-[#FFFFFF]"
                          : applicants?.preboardingDetails?.preboardingStatus === "Pending"
                            ? "bg-[#FFF9ED]"
                            : applicants?.preboardingDetails?.preboardingStatus === "Initiated"
                              ? "bg-[#E7F8FF]"
                              : applicants?.preboardingDetails?.preboardingStatus === "Shortlisted"
                                ? "bg-[#4640DE1A]"
                                : applicants?.preboardingDetails?.preboardingStatus === "Rejected"
                                  ? "bg-[#FFE6E2]"

                                  : ""
                          } ${applicants?.preboardingDetails?.preboardingStatus === "Pending"
                            ? "text-[#FFB836]"
                            : applicants?.preboardingDetails?.preboardingStatus === "Initiated"
                              ? "text-[#06A9EF]"
                              : applicants?.preboardingDetails?.preboardingStatus === "Shortlisted"
                                ? "text-[#4640DE]"
                                : applicants?.preboardingDetails?.preboardingStatus === "Rejected"
                                  ? "text-[#FF6550]"

                                  : "text-[#333333]"
                          }`}
                      >
                        {applicants?.preboardingDetails?.preboardingStatus}
                      </div>
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex   items-center w-full  justify-between">
                        {
                          applicants?.preboardingDetails?.documentStatus == "Submitted" || applicants?.preboardingDetails?.documentStatus == "Verified" ?
                            <button
                            disabled={applicants?.preboardingDetails?.isMovedToVerification}
                              onClick={() => moveToVerification(applicants.applicantId, applicants.jobId)}
                              className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border  ${!applicants?.preboardingDetails?.isMovedToVerification ? "text-[#fff] bg-[#06A9EF]" : "text-[#ABABAB] border-[#ABABAB]"}
                                }`}
                            >
                              {applicants?.preboardingDetails?.isMovedToVerification ? "Moved " : "Move to Next"}
                            </button>
                            :
                            <>
                              {loading ?

                                <div className=" w-[91px] flex lg:py-2 lg:px-4 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-[#06A9EF] "
                                >
                                  <MiniLoader />
                                </div>
                                :
                                <button
                                  onClick={() => reminder(applicants)}
                                  className="w-[91px] flex lg:py-2 lg:px-4 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border border-[#06A9EF] "
                                >
                                  Remind
                                </button>
                              }
                            </>
                        }

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

      </div>

      <div className="mobile relative overflow-y-scroll  w-full ">
        <div className="sticky top-0">
          <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
            <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                  stroke="#646464"
                  stroke-width="2.02783"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                className="w-[100%] text-[#646464]"
                type="text"
                placeholder="search"
              />
            </div>
            <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_7540_118191)">
                  <path
                    d="M3.33203 5H16.6654"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 10H15"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66797 15H13.3346"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7540_118191">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>Filter</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
            {applicantsMobile.map((applicantsMobile, index) => (
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
                            {applicantsMobile.name}
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
                          {applicantsMobile.role}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Due Date
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {applicantsMobile.dueDate}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Doc Status
                        </p>
                        <p className={`text-[14px]  font-[600] font-Montserrat ${applicantsMobile.docStatus === "Submitted"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                          }`}>
                          {applicantsMobile.docStatus}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Recruiter
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {applicantsMobile.Recruiting}

                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          {applicantsMobile.proboard}
                        </p>

                        <div
                          className={`flex py-[6px]  justify-center px-[10px]  text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${applicantsMobile.status === "Interview"
                            ? "text-[#26A4FF] border-[#26A4FF]"
                            : applicantsMobile.status === "Hired"
                              ? "text-[#56CDAD] border-[#56CDAD]"
                              : applicantsMobile.status === "Shortlisted"
                                ? "text-[#4640DE] border-[#4640DE]"
                                : applicantsMobile.status === "Rejected"
                                  ? "text-[#FF6550] border-[#FF6550]"
                                  : applicantsMobile.status === "In Review"
                                    ? "text-[#FFB836] border-[#FFB836]"
                                    : ""
                            }`}
                        >
                          {applicantsMobile.status}

                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">

                        {
                          applicantsMobile.docStatus == "Submitted" ?
                            <button
                              onClick={() => setToggle(2)}
                              className={`flex w-full px-6 py-3 justify-center items-center gap-[10px] font-semibold rounded-[8px] max-w-[250px] ${applicantsMobile.Next === "Move to Next" ? "text-[#fff] bg-[#06A9EF]" : "text-[#333] bg-[#fff]"
                                }`}
                            >
                              {applicantsMobile.Next}
                            </button>
                            :
                            <button
                              onClick={() => setIsRemind(true)}
                              className="flex w-full px-6 py-3 text-black justify-center items-center gap-[10px] font-semibold rounded-[8px] max-w-[250px] border border-[#06A9EF]  "


                            >
                              Remind
                            </button>
                        }

                      </div>
                    </div>
                  </div>

                </>
              ))}


          </div>
        </div>
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

    </>
  );
};

export default Documention;
