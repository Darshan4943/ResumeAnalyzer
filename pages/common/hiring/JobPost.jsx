import React, { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import JobDetails from "./JobDetails";

import CustomPagination from "../../../components/common/CustomPagination";
import MiniLoader from "../../../components/common/miniLoader";
import MiniLoaderr from "../../../components/common/mini-loader";
import ShortlistMail from "./ShortlistMail";
import { toast } from "react-toastify";
import axios from "axios";
import { DownSvg, UpSvg } from "../../../utils/svg";
import { useDispatch, useSelector } from "react-redux";
import Analytics from "../../../components/featured/employer/Analytics";
import { fa } from "@faker-js/faker";
import CopyLink from "../../../components/common/copyLink";
import LimitUsedModal from "../../../components/models/limitUsedModal";
import { setRecallData } from "../../../Redux/slices/recallSlice";
import JdParameters from "../../../components/common/jdParameters";
function JobPost({ toggleContentt, setToggle, data, selectedJob }) {
  const [option, setOption] = useState(0);
  const randomPercentage = useMemo(
    () => Math.floor(Math.random() * (95 - 70 + 1)) + 70,
    []
  );
  const [moreOption, setMoreOption] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  const [activeOption, setActiveOption] = useState("applicant");
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [openParameters, setOpenParamenters] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const taskRef = useRef(null);
  const dispatch = useDispatch();
  const [checkedApplicants, setCheckedApplicants] = useState([]);
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [shortlist, setShortlist] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [miniloading, setMiniloading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalpages] = useState(0);
  const [page, setPage] = useState(0);
  const [filterType, setfilterType] = useState();
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [statusChange, setStatusChange] = useState(false);
  const [loadinggg, setLoadinggg] = useState(false);
  const [applicantIds, setApplicantIds] = useState();
  const [allShortlist, setAllShortlist] = useState(false);
  const [allReject, setAllReject] = useState(false);
  const [hiringStage, setHiringStage] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [limitPopup, setLimitPopup] = useState(false);
  const { recallData } = useSelector((state) => state.recall);




  const [parameters, setParameters] = useState([]);
  const [weightage, setWeightage] = useState(false)
  const [priority, setPriority] = useState(false)


  useEffect(() => {
    const fetchJDParameters = async () => {

      try {
        const data = await axios.get(`https://dev.api.skilotech.com/api/jdParameters/get/${userDataGlobal?._id}`);

        if (data?.data?.data?.parameters) {
          const filteredParameters = data.data.data.parameters.filter(param => param.enabled === true);
          setParameters(filteredParameters);

        }
        setPriority(data?.data?.data?.priority)
        setWeightage(data?.data?.data?.weightage)

      } catch (error) {
        console.error("Error loading JD Parameters");
      }

    };
    fetchJDParameters();
  }, [userDataGlobal?._id, openParameters]);

  const togglePopup = (applicant) => {
    setPopupVisible(!isPopupVisible);
    setShortlist([applicant]);
    setApplicantIds([applicant?.applicantId]);
  };
  const [loadingg, setLoadingg] = useState({
    isLoading: false,
    applicantId: null,
  });
  const [jobData, setJobData] = useState(null);
  const [loading1, setLoading1] = useState(false);

  const moveToHiringMultiple = async () => {
    const applicantIds = checkedApplicants.map(
      (applicantId) => applicantId.applicantId
    );

    setLoading1(true);
    try {
      const response = await axios.put(
        `https://dev.api.skilotech.com/api/hiring/moveToHiringMultiple/${id}`,
        { applicantIds }
      );
      setLoading1(false);
      setStatusChange(true);
      toast.success("Successfully moved to Hiring");
      setCheckedApplicants([]);
      return response.data;
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading1(false);
      throw error;
    }
  };

  const handleCheckboxChangeFilter = (e, filter, applicantHeadName) => {
    const updatedFilters = { ...selectedFilters };

    if (!updatedFilters[applicantHeadName]) {
      updatedFilters[applicantHeadName] = [];
    }

    if (e.target.checked) {
      updatedFilters[applicantHeadName] = [
        ...updatedFilters[applicantHeadName],
        filter,
      ];
    } else {
      updatedFilters[applicantHeadName] = updatedFilters[
        applicantHeadName
      ].filter((item) => item !== filter);
    }

    setSelectedFilters(updatedFilters);
  };

  const handleCheckboxChange = (applicant) => {
    if (applicant?.hiringStage !== "Pending") {
      return;
    }

    setCheckedApplicants((prev) => {
      const updated = prev.some((a) => a.id === applicant.id)
        ? prev.filter((a) => a.id !== applicant.id)
        : [...prev, applicant];

      setSelectAll(
        updated.length ===
        jobDetails?.data?.applications.filter(
          (app) => app.hiringStage === "Pending"
        ).length
      );

      return updated;
    });
  };
  const handleSelectAll = () => {
    const selectableApplicants = jobDetails?.data?.applications.filter(
      (app) => app.hiringStage !== "Rejected"
    );
    if (selectAll) {
      setCheckedApplicants([]);
    } else {
      setCheckedApplicants(selectableApplicants);
    }

    setSelectAll(!selectAll);
  };

  const handleReject = async () => {
    setAllReject(true);
  };

  useEffect(() => {
    if (allReject) {
      handleSend();
    }
  }, [allReject]);

  const handleSend = async (applicant) => {
    if (!allReject) {
      setLoadingg({ isLoading: true, applicantId: applicant?.applicantId });
    } else {
      setLoadinggg(true);
    }

    const emailDetails = {
      to: allReject
        ? checkedApplicants?.map((item) => item?.details?.personal?.email)
        : [applicant?.details?.personal?.email],
      cc: "",
      subject: "Unfortunately, Your Application has been Rejected",
      content:
        "<p>Dear Candidate,</p>\n<p>We are pleased to inform you that you have been Rejected .</p>\n<p>Please check your email for further details.</p>\n<p>Best regards,<br />The Skilotech Team</p>",
      applicantId: allReject
        ? checkedApplicants?.map((item) => item?.applicantId)
        : [applicant?.applicantId],
      jobId: id,
      newHiringStage: "Rejected",
    };

    try {
      const response = await axios.post(
        "https://dev.api.skilotech.com/api/hiring/shortlistCandidate",
        emailDetails
      );

      toast.success("Email sent successfully!");
      setStatusChange(!statusChange);
      setCheckedApplicants([]);
      setLoadingg({ isLoading: false, applicantId: null });
      setLoadinggg(false);
      setAllReject(false);
    } catch (error) {
      setLoadingg({ isLoading: false, applicantId: null });
      setAllReject(false);
      setLoadinggg(false);
      console.error(
        "Error sending email details:",
        error.response?.data || error.message
      );
      toast.error("Failed to send email details. Please try again.");
    }
  };

  const fetchJobDetailsHeder = async (id, setJobData) => {
    try {
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/job/getJobDetailsById/${id}`
      );
      setJobData(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchJobDetailsHeder(id, setJobData);
    }
  }, [id]);

  const fetchJobDetails = async () => {
    setError(null);
    try {
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/job/getByIdApplication/${id}`,
        {
          params: {
            page: page,
            limit: limit,
            selectedFilters: JSON.stringify(selectedFilters),
            search: searchQuery,
            isSelected:
              activeOption === "Selected Candidate for Hiring" ? true : false,
          },
        }
      );

      const data = await response.data;
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setJobDetails(data);

      setTotalCount(data.pagination.totalApplications);
      setTotalpages(data.pagination.totalPages);
      setfilterType(false);
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError(err.message);
      setfilterType(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setMiniloading(false);
      setLoading(false);
      setfilterType(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchJobDetails();
    }
  }, [id, statusChange, selectedFilters, activeOption]);


  // const aiMatch = async () => {
  //   if (jdCountMonthly >= jdCountMonthlyLimit) {
  //     setLimitPopup(true);
  //     return;
  //   }
  //   setAiLoading(true);
  //   try {
  //     const response = await axios.put(
  //       `https://dev.api.skilotech.com/api/job/aiMatch/${id}`
  //     );
  //     updateJobMatchLimit();
  //     setTimeout(() => {
  //       setAiLoading(false);
  //       fetchJobDetails();
  //     }, 4000);
  //   } catch (error) {
  //     setAiLoading(false);
  //   }
  // };

  const aiMatch = async () => {
    if (jdCountMonthly >= jdCountMonthlyLimit) {
      setLimitPopup(true);
      return;
    }
    setAiLoading(true);
    try {
      const response = await axios.post(
        "https://dev.api.skilotech.com/api/aiMatch/gist",

        {
          jobGist: jobData?.gist,
          ids: jobDetails?.data?.applications?.map(appId => appId?._id),
          parameters,
          weightage,
          priority
        }
      );
      updateJobMatchLimit();
      setTimeout(() => {
        setAiLoading(false);
        fetchJobDetails();
      }, 4000);
    } catch (error) {
      setAiLoading(false);
    }
  };



  const updateJobMatchLimit = async () => {
    try {
      const jdSubscriptionLimitUrl = `https://dev.api.skilotech.com/api/subscription/updateAiHits/${userDataGlobal?._id}`;
      const jdSubscriptionResponse = await axios.put(jdSubscriptionLimitUrl);

      if (!jdSubscriptionResponse.data.success) {
        console.error(
          "Error in updateJdSubscriptionLimit:",
          jdSubscriptionResponse.data.message
        );
      }
      dispatch(setRecallData(!recallData));

      return {
        updateJobMatchResponse: updateJobMatchResponse.data,
        jdSubscriptionResponse: jdSubscriptionResponse.data,
      };
    } catch (error) {
      console.error("Something went wrong:", error);
      return { success: false, message: "Something went wrong", error };
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [searchQuery]);

  useEffect(() => {
    if (id) {
      setMiniloading(true);
      fetchJobDetails();
    }
  }, [page, limit]);

  const handleDotClick = (index) => {
    setMoreOption((prev) => !prev);
    setSelectedDotIndex(index);
  };

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

  const getLimits = () => {
    const jdCountMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setJdCountMonthly(jdCountMonthly);

    const jdCountMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setJdCountMonthlyLimit(jdCountMonthlyLimit);
  };
  useEffect(() => {
    getLimits();
  }, []);

  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "Source",
      check: "",
      isFilter: true,
      filters: ["Jd Matching", "Applied"],
    },
    {
      name: "Profile Match",
      check: "",
      isFilter: true,
      filters: ["90", "75", "50"],
    },
    {
      name: "Hiring stage",
      check: "",
      isFilter: true,
      filters: ["Shortlisted", "Pending", "Rejected"],
    },
    {
      name: "Applied Date",
      check: "",
    },
    {
      name: "Action",
      check: "",
    },
  ];

  const widths = ["25%", "10%", "15%", "20%", "15%", "15%"];
  const texts = ["start", "start", "center", "center", "start", "center"];

  const [showPopup, setShowPopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const handleClick = (jobId) => {
    const link = `https://testing.d3pnzi93uiabob.amplifyapp.com/jobs/candidate/JobDetails?id=${jobId}&isShared=true`;

    setGeneratedLink(link);
    setShowPopup(true);
  };

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup]);

  const hiredCandidate = async (applicantId, jobId) => {
    try {
      const response = await axios.put(
        `https://dev.api.skilotech.com/api/hiring/hiredCandidate/${applicantId}/${jobId}`
      );

      if (response.status === 200) {
        setMoreOption(false);

        toast.success("Candidate Hired successfully");

        dispatch(setRecallData(!recallData));
        return response.data;
      }
    } catch (error) {
      setMoreOption(false);

      toast.error("Error while hiring candidate");
    }
  };

  return (
    <>
      {limitPopup && (
        <div className="z-[200000]">
          <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
        </div>
      )}
      {openParameters && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
            <JdParameters setOpenParamenters={setOpenParamenters} />
          </div>
        </>
      )}
      <div className=" mb-4 overflow-visible">
        <div className="w-[100%] flex flex-col relative ">
          {jobData && (
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col w-[100%] scr700:px-[32px] px-[16px] py-[24px] justify-between rounded-[12px] gap-[17px] bg-[#fff] ">
                <div className="flex justify-between w-[100%] items-center">
                  <div className="flex gap-[20px] justify-between md:justify-center items-start">
                    <div className=" flex flex-col ">
                      <p className="sm:text-[18px] text-[14px] text-[#333333] font-[600]">
                        {jobData?.jobTitle}
                      </p>
                      <p className="text-[14px] font-[500] text-[#333333] leading-tight">
                        {jobData?.jobSector && jobData?.jobSector}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-[4px] mt-1">
                      {jobData?.status === "Active" ? (
                        <>
                          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#0C8A0A] rounded-[90px]"></div>
                          <div className="text-[12px] font-[500] text-[#0C8A0A]">
                            Active
                          </div>
                        </>
                      ) : jobData?.status === "Inactive" ? (
                        <>
                          <div className="w-[6px] h-[6px] bg-[#FF7802] rounded-full"></div>
                          <div className="text-[12px] font-[500] text-[#FF7802]">
                            Inactive
                          </div>
                        </>
                      ) : jobData?.status === "Closed" ? (
                        <>
                          <div className="w-[6px] h-[6px] text=[#0C8A0A] bg-[#B3261E] rounded-[90px]"></div>
                          <div className="text-[12px] font-[500] text-[#B3261E]">
                            Closed
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className=" cursor-pointer">
                    <svg
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(jobData._id);
                      }}
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1912 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4253 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1912 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0728 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0728 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1912 14.3774 16.7148 14.9012C17.2383 15.4253 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z"
                        fill="#646464"
                      />
                    </svg>
                  </div>
                </div>

                {showPopup && (
                  <CopyLink
                    generatedLink={generatedLink}
                    setShowPopup={setShowPopup}
                    popupRef={popupRef}
                  />
                )}

                <div className="flex flex-col scr1024:flex-row justify-between">
                  <div className="flex gap-[10px]  justify-start items-center">
                    {jobData?.revalentExp && (
                      <div className="flex gap-[4px] items-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.33073 11.7474C1.0099 11.7474 0.735243 11.6332 0.506771 11.4047C0.278299 11.1762 0.164062 10.9016 0.164062 10.5807V4.16406C0.164062 3.84323 0.278299 3.56858 0.506771 3.3401C0.735243 3.11163 1.0099 2.9974 1.33073 2.9974H3.66406V1.83073C3.66406 1.5099 3.7783 1.23524 4.00677 1.00677C4.23524 0.778299 4.5099 0.664062 4.83073 0.664062H7.16406C7.48489 0.664062 7.75955 0.778299 7.98802 1.00677C8.21649 1.23524 8.33073 1.5099 8.33073 1.83073V2.9974H10.6641C10.9849 2.9974 11.2595 3.11163 11.488 3.3401C11.7165 3.56858 11.8307 3.84323 11.8307 4.16406V10.5807C11.8307 10.9016 11.7165 11.1762 11.488 11.4047C11.2595 11.6332 10.9849 11.7474 10.6641 11.7474H1.33073ZM1.33073 10.5807H10.6641V4.16406H1.33073V10.5807ZM4.83073 2.9974H7.16406V1.83073H4.83073V2.9974Z"
                            fill="#646464"
                          />
                        </svg>
                        <div className="text-[12px] text-[#262626] font-[500]">
                          {jobData?.revalentExp}
                        </div>
                      </div>
                    )}

                    {jobData?.revalentExp && (
                      <div className="border-[1px] border-[#AFAFAF] h-[20px]"></div>
                    )}
                    <div className="flex gap-[4px] items-center">
                      <svg
                        width="10"
                        height="13"
                        viewBox="0 0 10 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66927 11.1641H7.33594V9.41406C7.33594 8.7724 7.10746 8.22309 6.65052 7.76615C6.19358 7.3092 5.64427 7.08073 5.0026 7.08073C4.36094 7.08073 3.81163 7.3092 3.35469 7.76615C2.89774 8.22309 2.66927 8.7724 2.66927 9.41406V11.1641ZM5.0026 5.91406C5.64427 5.91406 6.19358 5.68559 6.65052 5.22865C7.10746 4.7717 7.33594 4.2224 7.33594 3.58073V1.83073H2.66927V3.58073C2.66927 4.2224 2.89774 4.7717 3.35469 5.22865C3.81163 5.68559 4.36094 5.91406 5.0026 5.91406ZM0.335938 12.3307V11.1641H1.5026V9.41406C1.5026 8.82101 1.64115 8.26441 1.91823 7.74427C2.19531 7.22413 2.58177 6.80851 3.0776 6.4974C2.58177 6.18629 2.19531 5.77066 1.91823 5.25052C1.64115 4.73038 1.5026 4.17378 1.5026 3.58073V1.83073H0.335938V0.664062H9.66927V1.83073H8.5026V3.58073C8.5026 4.17378 8.36406 4.73038 8.08698 5.25052C7.8099 5.77066 7.42344 6.18629 6.9276 6.4974C7.42344 6.80851 7.8099 7.22413 8.08698 7.74427C8.36406 8.26441 8.5026 8.82101 8.5026 9.41406V11.1641H9.66927V12.3307H0.335938Z"
                          fill="#646464"
                        />
                      </svg>
                      <div className="text-[12px] txet-[#262626] font-[500]">
                        {jobData?.jobType}
                      </div>
                    </div>
                    <div className="border-[1px] border-[#AFAFAF]  h-[20px]"></div>
                    <div className="flex gap-[4px] items-center">
                      <svg
                        width="10"
                        height="13"
                        viewBox="0 0 10 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.0026 6.4974C5.32344 6.4974 5.59809 6.38316 5.82656 6.15469C6.05503 5.92622 6.16927 5.65156 6.16927 5.33073C6.16927 5.0099 6.05503 4.73524 5.82656 4.50677C5.59809 4.2783 5.32344 4.16406 5.0026 4.16406C4.68177 4.16406 4.40712 4.2783 4.17865 4.50677C3.95017 4.73524 3.83594 5.0099 3.83594 5.33073C3.83594 5.65156 3.95017 5.92622 4.17865 6.15469C4.40712 6.38316 4.68177 6.4974 5.0026 6.4974ZM5.0026 10.7849C6.18871 9.69601 7.06858 8.70677 7.64219 7.81719C8.2158 6.9276 8.5026 6.13767 8.5026 5.4474C8.5026 4.38767 8.16476 3.51997 7.48906 2.84427C6.81337 2.16858 5.98455 1.83073 5.0026 1.83073C4.02066 1.83073 3.19184 2.16858 2.51615 2.84427C1.84045 3.51997 1.5026 4.38767 1.5026 5.4474C1.5026 6.13767 1.78941 6.9276 2.36302 7.81719C2.93663 8.70677 3.81649 9.69601 5.0026 10.7849ZM5.0026 12.3307C3.43733 10.9988 2.26823 9.76163 1.49531 8.61927C0.722396 7.47691 0.335938 6.41962 0.335938 5.4474C0.335938 3.98906 0.805035 2.82726 1.74323 1.96198C2.68142 1.0967 3.76788 0.664062 5.0026 0.664062C6.23733 0.664062 7.32378 1.0967 8.26198 1.96198C9.20017 2.82726 9.66927 3.98906 9.66927 5.4474C9.66927 6.41962 9.28281 7.47691 8.5099 8.61927C7.73698 9.76163 6.56788 10.9988 5.0026 12.3307Z"
                          fill="#646464"
                        />
                      </svg>
                      <div className="text-[12px] text-[#262626] font-[500]">
                        {jobData?.location?.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <div className="text-[14px] font-[600] text-[#646464]">
                      Total Applications
                    </div>
                    <div className="text-[24px] font-[600] text-[#333333]">
                      {jobData?.totalApplications}
                    </div>
                  </div>
                  <div className="flex gap-[10px] items-center"></div>
                  <div className="flex gap-[4px] items-center">
                    <div className="text-[14px] font-[600] text-[#646464]">
                      Date posted
                    </div>
                    <svg
                      width="4"
                      height="5"
                      viewBox="0 0 4 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2.5" r="2" fill="#333333" />
                    </svg>
                    <div className="text-[14px] font-[600] text-[#333333]">
                      {new Date(jobData?.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex px-[16px] ms:text-[16px] text-[14px] rounded-t-[16px]  overflow-auto items-start  ml:gap-[40px] gap-2 bg-[#fff]">
                  <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                    <p
                      onClick={() => {
                        setOption(0), setActiveOption("applicant");
                      }}
                      className={` ${activeOption === "applicant" ? "" : "text-[#646464]"
                        } cursor-pointer text-[16px] font-[600]`}
                    >
                      Applicant
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="89"
                      height="4"
                      viewBox="0 0 89 4"
                      fill="none"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                        fill={
                          activeOption === "applicant" ? "#06A9EF" : "white"
                        }
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                    <p
                      onClick={() => {
                        setOption(1), setActiveOption("JobDetails");
                      }}
                      className={` ${activeOption === "JobDetails" ? "" : "text-[#646464]"
                        } cursor-pointer font-[600]`}
                    >
                      Job Details
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="89"
                      height="4"
                      viewBox="0 0 89 4"
                      fill="none"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                        fill={
                          activeOption === "JobDetails" ? "#06A9EF" : "white"
                        }
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                    <p
                      onClick={() => {
                        setOption(2), setActiveOption("Analytics");
                      }}
                      className={` ${activeOption === "Analytics" ? "" : "text-[#646464]"
                        } cursor-pointer font-[600]`}
                    >
                      Analytics
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="89"
                      height="4"
                      viewBox="0 0 89 4"
                      fill="none"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z"
                        fill={
                          activeOption === "Analytics" ? "#06A9EF" : "white"
                        }
                      />
                    </svg>
                  </div>
                  {userDataGlobal?.role !== "recruiter" && (
                    <div className="flex flex-col mt-[18px] items-center gap-[7px] shadow-border">
                      <p
                        onClick={() => {
                          setOption(3),
                            setActiveOption("Selected Candidate for Hiring");
                        }}
                        className={` ${activeOption === "Selected Candidate for Hiring"
                          ? ""
                          : "text-[#646464]"
                          } cursor-pointer font-[600]`}
                      >
                        Selected Candidate for Hiring
                      </p>
                      <svg
                        width="214"
                        height="4"
                        viewBox="0 0 214 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 4C0 1.79086 1.79086 0 4 0H210C212.209 0 214 1.79086 214 4H0Z"
                          fill={
                            activeOption === "Selected Candidate for Hiring"
                              ? "#06A9EF"
                              : "white"
                          }
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="h-[1px] bg-[#D6DDEB] w-full"></div>
              </div>
            </div>
          )}

          {option === 0 && (
            <div>
              {loading ? (
                <MiniLoader />
              ) : data?.length === 0 ? (
                <div className="p-3  flex items-center justify-center">
                  <img
                    className="w-[30%] min-w-[200px]"
                    src="/images/employer/OBJECTS.png"
                    alt="No data available"
                  />
                </div>
              ) : (
                <>
                  <div className="flex scr700:flex-row flex-col justify-between p-[16px] scr700:items-center gap-4  bg-[#fff] overflow-visible">
                    <div className=" flex gap-3">
                      <button
                        disabled={aiLoading || !jobDetails?.data?.applications?.some(app => app.isScore === false)}

                        style={{
                          backgroundColor: "#4C43CD",
                          backgroundImage: `
      radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)
    `,
                          transform: aiLoading ? "scale(1.1)" : "scale(1)",
                          transition: "transform 0.5s ease-in-out",
                        }}
                        onClick={aiMatch}
                        className={`text-white rounded-[30px] justify-center px-6 flex gap-[10px] items-center text-[12px] font-semibold 
             min-w-[150px] h-[38px] transition-all duration-300 ease-in-out ${ !jobDetails?.data?.applications?.some(app => app.isScore === false) && "opacity-50" }`}
                      >
                        <svg
                          className={`min-w-[20px] transition-all duration-100 ${aiLoading ? "animate-pulse scale-110" : ""
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_9135_108708)">
                            <g clip-path="url(#clip0_9135_108708)">
                              <path
                                d="M9.83765 5.00562C10.4939 7.79858 12.2009 9.48218 14.9939 10.1501C15.0291 10.158 15.0486 10.1931 15.0408 10.2244C15.0369 10.2478 15.0173 10.2673 14.9939 10.2712C12.1775 10.9158 10.4978 12.6384 9.83374 15.4353C9.82593 15.4705 9.79077 15.49 9.75562 15.4822C9.73218 15.4783 9.71265 15.4587 9.70874 15.4353C9.06421 12.6189 7.35718 10.9353 4.5564 10.2634C4.52124 10.2556 4.50171 10.2205 4.50952 10.1853C4.51343 10.1619 4.53296 10.1423 4.5564 10.1384C7.35718 9.4939 9.04858 7.79468 9.71655 5.00171C9.72437 4.96655 9.75952 4.94702 9.79468 4.95483C9.81421 4.97046 9.83374 4.98608 9.83765 5.00562Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M16.4268 0.836686C16.7744 2.30544 17.6689 3.19215 19.1377 3.54372C19.1572 3.54762 19.165 3.56715 19.1611 3.58278C19.1572 3.5945 19.1494 3.60622 19.1377 3.60622C17.6572 3.94606 16.7705 4.85231 16.4229 6.32106C16.4189 6.34059 16.3994 6.3484 16.3838 6.3445C16.3721 6.34059 16.3604 6.33278 16.3604 6.32106C16.0205 4.84059 15.1221 3.95387 13.6494 3.5984C13.6299 3.5945 13.6221 3.57497 13.626 3.55934C13.6299 3.54762 13.6377 3.5359 13.6494 3.5359C15.1221 3.19606 16.0127 2.30544 16.3643 0.83278C16.3682 0.813248 16.3838 0.80153 16.4033 0.805436C16.415 0.809342 16.4229 0.821061 16.4268 0.836686Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M2.80176 3.30957C3.14551 4.77832 4.04395 5.66504 5.5127 6.0166C5.53223 6.02051 5.54004 6.04004 5.53613 6.05566C5.53223 6.06738 5.52441 6.0791 5.5127 6.0791C4.03223 6.41895 3.14551 7.3252 2.79785 8.79395C2.79395 8.81348 2.77441 8.82129 2.75879 8.81738C2.74707 8.81348 2.73535 8.80566 2.73535 8.79395C2.39551 7.31348 1.49707 6.42676 0.0244141 6.07129C0.00488281 6.06738 -0.00292969 6.04785 0.000976563 6.03223C0.00488281 6.02051 0.0126953 6.00879 0.0244141 6.00879C1.49707 5.66895 2.3877 4.77832 2.73926 3.30566C2.74316 3.28613 2.7627 3.27832 2.77832 3.28223C2.79004 3.29004 2.80176 3.29785 2.80176 3.30957Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M17.0439 13.7195C17.3916 15.1882 18.2861 16.075 19.7549 16.4265C19.7744 16.4304 19.7822 16.45 19.7783 16.4656C19.7744 16.4773 19.7666 16.489 19.7549 16.489C18.2744 16.8289 17.3877 17.7351 17.04 19.2039C17.0361 19.2234 17.0166 19.2312 17.001 19.2273C16.9893 19.2234 16.9775 19.2156 16.9775 19.2039C16.6377 17.7234 15.7393 16.8367 14.2666 16.4812C14.2471 16.4773 14.2393 16.4578 14.2432 16.4422C14.2471 16.4304 14.2549 16.4187 14.2666 16.4187C15.7393 16.0789 16.6299 15.1882 16.9814 13.7156C16.9854 13.6961 17.0049 13.6843 17.0205 13.6882C17.0322 13.7 17.0439 13.7078 17.0439 13.7195Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M18.2666 9.19242C18.4854 10.1182 19.0518 10.6807 19.9776 10.9034C19.9893 10.9073 19.9932 10.919 19.9893 10.9307C19.9854 10.9346 19.9815 10.9385 19.9776 10.9424C19.0401 11.1573 18.4815 11.7276 18.2627 12.6573C18.2588 12.669 18.2471 12.6768 18.2354 12.6729C18.2276 12.6729 18.2198 12.6651 18.2198 12.6573C18.0049 11.7198 17.4385 11.1612 16.5088 10.9385C16.4971 10.9346 16.4893 10.9229 16.4932 10.9112C16.4932 10.9034 16.501 10.8955 16.5088 10.8955C17.4385 10.6807 18.001 10.1182 18.2237 9.18852C18.2276 9.1768 18.2393 9.16898 18.251 9.17289C18.2588 9.1768 18.2666 9.18461 18.2666 9.19242Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M4.81352 14.9229C5.03227 15.8487 5.59867 16.4112 6.52445 16.6338C6.53617 16.6377 6.54399 16.6495 6.54008 16.6612C6.54008 16.669 6.53227 16.6768 6.52445 16.6768C5.59086 16.8916 5.03227 17.4659 4.80961 18.3916C4.8057 18.4034 4.79398 18.4112 4.78227 18.4073C4.77445 18.4034 4.77055 18.3995 4.76664 18.3916C4.5518 17.4541 3.98539 16.8955 3.0557 16.6729C3.04398 16.669 3.03617 16.6573 3.04008 16.6455C3.04008 16.6377 3.04789 16.6299 3.0557 16.6299C3.98539 16.4151 4.54789 15.8526 4.77055 14.9229C4.77445 14.9112 4.78617 14.9034 4.79789 14.9073C4.80961 14.9112 4.81352 14.9151 4.81352 14.9229Z"
                                fill="#FFDA1D"
                              />
                              <path
                                d="M7.15729 0.782289C7.33698 1.54791 7.80573 2.01276 8.57526 2.19635C8.58307 2.20026 8.59088 2.20807 8.58698 2.21588C8.58698 2.2237 8.57916 2.2276 8.57526 2.2276C7.80182 2.40338 7.33698 2.87995 7.15338 3.64948C7.14948 3.65729 7.14166 3.6651 7.12995 3.6612C7.12213 3.6612 7.11823 3.65338 7.11823 3.64948C6.94244 2.87604 6.46979 2.4112 5.70026 2.2276C5.69245 2.2237 5.68463 2.21588 5.68854 2.20416C5.68854 2.19635 5.69635 2.19245 5.70026 2.19245C6.46979 2.01666 6.93463 1.54791 7.12213 0.778383C7.12604 0.77057 7.13385 0.762758 7.14557 0.766664C7.14948 0.77057 7.15729 0.774476 7.15729 0.782289Z"
                                fill="#FFDA1D"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_9135_108708">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        AI Profile Match
                      </button>

                      <button
                        onClick={() => setOpenParamenters(true)}
                        className=" rounded-[30px] text-[14px] font-semibold  flex justify-center items-center h-[38px] bg_Button px-6"
                      >
                        Set Matching Parameters
                      </button>
                    </div>
                    <div className="flex items-start gap-[8px]">
                      <div className="ml:w-[314px] flex py-[8px] px-[10px] gap-[16px] rounded-[8px] border border-[#D6DDEB] bg-[#fff]">
                        <img
                          className="w-[24px] h-[24px]"
                          src="/images/employer/icon_search.png"
                          alt=""
                        />
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          type="text"
                          placeholder="Search"
                          className="sm:w-full w-[100px]"
                        />
                      </div>
                    </div>
                    {userDataGlobal?.role === "employer" && (
                      <button
                        disabled={!checkedApplicants.length > 0 || loading1}
                        style={{
                          opacity:
                            !checkedApplicants.length > 0 || loading1 ? 0.5 : 1,
                        }}
                        onClick={moveToHiringMultiple}
                        className=" rounded-[30px] text-[14px] font-semibold bg-blue text-white hidden ml:flex justify-center items-center h-[42px] px-4"
                      >
                        Move to Hiring Process
                      </button>
                    )}
                  </div>

                  {allShortlist && (
                    <ShortlistMail
                      shortlist={checkedApplicants}
                      jobData={jobData}
                      setPopupVisible={setAllShortlist}
                      id={id}
                      statusChange={statusChange}
                      setStatusChange={setStatusChange}
                      applicantIds={applicantIds}
                      newHiringStage={hiringStage}
                    />
                  )}

                  <div className="web">
                    <div className="flex p-[16px] items-center gap-[20px] bg-[#EFFAFF] border border-[#D6DDEB]">
                      {userDataGlobal?.role === "employer" && (
                        <input
                          className="w-[16px] h-[16px]"
                          type="checkbox"
                          checked={
                            checkedApplicants.length > 0 &&
                            checkedApplicants.length ===
                            jobDetails?.data?.applications.filter(
                              (app) => app.hiringStage === "Pending"
                            ).length
                          }
                          onChange={handleSelectAll}
                        />
                      )}
                      {applicant_head.map((applicant_head, index) => (
                        <div
                          key={index}
                          className="flex items-center w-full text-[#333333] gap-[8px] relative"
                          style={{ width: widths[index] }}
                        >
                          <p
                            style={{ textAlign: texts[index] }}
                            className={`text-[14px] w-full font-[600] ml-5`}
                          >
                            {applicant_head.name}
                          </p>

                          {applicant_head?.isFilter &&
                            (filterType === applicant_head.name ? (
                              <div
                                className=" cursor-pointer"
                                onClick={() => setfilterType("")}
                              >
                                <UpSvg />
                              </div>
                            ) : (
                              <div
                                className=" cursor-pointer"
                                onClick={() =>
                                  setfilterType(applicant_head.name)
                                }
                              >
                                <DownSvg />
                              </div>
                            ))}
                          {filterType === applicant_head.name && (
                            <div className="absolute h-fit w-[150px] bg-white rounded-[16px] top-8 left-12 shadow-md p-4 flex flex-col gap-2">
                              {applicant_head?.filters.map((filter, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-[14px] font-medium"
                                >
                                  <input
                                    type="checkbox"
                                    id={`filter-${index}`}
                                    value={filter}
                                    checked={selectedFilters[
                                      applicant_head.name
                                    ]?.includes(filter)}
                                    onChange={(e) =>
                                      handleCheckboxChangeFilter(
                                        e,
                                        filter,
                                        applicant_head.name
                                      )
                                    }
                                  />

                                  <label htmlFor={`filter-${index}`}>
                                    {filter}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-start bg-[#fff]   overflow-y-visible   ">
                      {!jobDetails?.data?.applications.length == 0 ? (
                        <>
                          {jobDetails?.data?.applications.map(
                            (applicant, index) => (
                              <>
                                <div
                                  className={`flex w-[100%] border-b border-[#D4D4D480]  p-[16px] justify-between items-center  ${checkedApplicants[index]
                                    ? "bg-[#D3F1FF]"
                                    : "bg-[#FFFFFF]"
                                    }`}
                                  key={applicant?._id}
                                >
                                  <div className="  gap-[20px]  w-full justify-between flex items-center">
                                    {userDataGlobal?.role === "employer" && (
                                      <input
                                        key={applicant.id}
                                        className="w-[16px] h-[16px]"
                                        type="checkbox"
                                        checked={checkedApplicants.some(
                                          (a) => a.id === applicant.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(applicant)
                                        }
                                        disabled={
                                          applicant.hiringStage !== "Pending"
                                        }
                                      />
                                    )}
                                    <div className="flex  w-[25%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                                      <img
                                        className="w-[40px]"
                                        src="/images/employer/profile_icon.png"
                                        alt=""
                                      />
                                      <p className="text-[14px] font-[600]">
                                        {
                                          applicant?.details?.personal
                                            ?.firstName
                                        }{" "}
                                        {applicant?.details?.personal?.lastName}
                                      </p>
                                    </div>
                                    <div className="flex w-[10%] items-center justify-start pl-6  gap-[8px]">
                                      <p className="text-[14px] font-[600]">
                                        {applicant?.source}
                                      </p>
                                    </div>

                                    <div className="flex w-[15%] items-center justify-center   gap-[8px]">
                                      {applicant.matchingPercentage ? (
                                        <p
                                          className={`text-[14px] font-[600]
                                             ${applicant.isScore
                                            ? "blur-[3px]"
                                            : ""
                                            }
                                            `}
                                        >
                                          {applicant.isScore
                                            ? `${randomPercentage} %`
                                            : `${applicant.matchingPercentage} %`}
                                        </p>
                                      ) : (
                                        <>-</>
                                      )}
                                    </div>
                                    <div className=" flex justify-center w-[20%]">
                                      <div
                                        className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${checkedApplicants[index]
                                          ? "bg-[#FFFFFF]"
                                          : applicant?.hiringStage ===
                                            "Interview"
                                            ? "bg-[#26A4FF1A]"
                                            : applicant?.hiringStage === "Task"
                                              ? "bg-[#EAF6FF]"
                                              : applicant?.hiringStage ===
                                                "Pending"
                                                ? "bg-[#FFF9ED]"
                                                : applicant?.hiringStage === "Hired"
                                                  ? "bg-[#4BD06F33]"
                                                  : applicant?.hiringStage ===
                                                    "Shortlisted"
                                                    ? "bg-[#4640DE1A]"
                                                    : applicant?.hiringStage ===
                                                      "Rejected"
                                                      ? "bg-[#FF65501A]"
                                                      : applicant?.hiringStage ===
                                                        "In Review"
                                                        ? "bg-[#EB85331A]"
                                                        : applicant?.hiringStage ===
                                                          "Selected"
                                                          ? "bg-[#56CDAD1A]"
                                                          : ""
                                          } ${applicant?.hiringStage === "Interview"
                                            ? "text-[#26A4FF]"
                                            : applicant?.hiringStage === "Task"
                                              ? "text-[#0B4A78]"
                                              : applicant?.hiringStage ===
                                                "Pending"
                                                ? "text-[#FFB836]"
                                                : applicant?.hiringStage === "Hired"
                                                  ? "text-[#1D9474]"
                                                  : applicant?.hiringStage ===
                                                    "Shortlisted"
                                                    ? "text-[#4640DE]"
                                                    : applicant?.hiringStage ===
                                                      "Rejected"
                                                      ? "text-[#FF6550]"
                                                      : applicant?.hiringStage ===
                                                        "In Review"
                                                        ? "text-[#FFB836]"
                                                        : applicant?.hiringStage ===
                                                          "Selected"
                                                          ? "text-[#56CDAD]"
                                                          : "text-[#333333]"
                                          }`}
                                      >
                                        {applicant?.hiringStage}
                                      </div>
                                    </div>
                                    <div className=" flex text-[14px] w-[15%] pl-6 font-[600]">
                                      <p>
                                        {new Date(applicant?.appliedOn)
                                          .toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                          .replace(",", "")}
                                      </p>
                                    </div>
                                    <div className="flex justify-center  w-[15%] items-center gap-[16px] relative overflow-visible">
                                      <>
                                        {isPopupVisible && (
                                          <ShortlistMail
                                            shortlist={shortlist}
                                            jobData={jobData}
                                            setPopupVisible={setPopupVisible}
                                            id={id}
                                            statusChange={statusChange}
                                            setStatusChange={setStatusChange}
                                            applicantIds={applicantIds}
                                            newHiringStage={hiringStage}
                                          />
                                        )}
                                      </>

                                      {moreOption &&
                                        selectedDotIndex === index && (
                                          <div
                                            ref={taskRef}
                                            style={{
                                              boxShadow:
                                                "0px 2px 2px 2px #00000020",
                                            }}
                                            className="absolute flex flex-col w-[180px] gap-0 bg-white rounded-[12px] z-[1000] top-[100%] "
                                          >
                                            {userDataGlobal?.role ===
                                              "recruiter" &&
                                              applicant?.hiringStage ===
                                              "Pending" && (
                                                <button
                                                  disabled={[
                                                    "Rejected",
                                                    "Shortlisted",
                                                    "Hired",
                                                  ].includes(
                                                    applicant?.hiringStage
                                                  )}
                                                  style={{
                                                    opacity: [
                                                      "Rejected",
                                                      "Shortlisted",
                                                      "Hired",
                                                    ].includes(
                                                      applicant?.hiringStage
                                                    )
                                                      ? 0.5
                                                      : 1,
                                                  }}
                                                  onClick={() => {
                                                    setHiringStage(
                                                      "Shortlisted"
                                                    );
                                                    togglePopup(applicant);
                                                  }}
                                                  className="text-[14px] font-medium flex justify-center items-center leading-tight rounded-[30px]"
                                                >
                                                  Shortlist
                                                </button>
                                              )}

                                            {applicant?.hiringStage ===
                                              "Pending" && (
                                                <button
                                                  disabled={
                                                    applicant?.hiringStage ===
                                                    "Rejected"
                                                  }
                                                  style={{
                                                    opacity:
                                                      applicant?.hiringStage ===
                                                        "Rejected"
                                                        ? 0.5
                                                        : 1,
                                                  }}
                                                  onClick={() => {
                                                    setHiringStage("Rejected");
                                                    togglePopup(applicant);
                                                  }}
                                                  className="text-[14px] font-[500] rounded-[30px] text-[#B3261E]"
                                                >
                                                  Reject
                                                </button>
                                              )}
                                          </div>
                                        )}

                                      <svg
                                        className=" cursor-pointer"
                                        onClick={() =>
                                          router.push(
                                            `/common/hiring/ApplicantDetails?applicantId=${applicant?.applicantId}&id=${id}`
                                          )
                                        }
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g clip-path="url(#clip0_6706_101356)">
                                          <path
                                            d="M13.0911 24H2.8901C2.13396 24 1.40878 23.6996 0.874111 23.165C0.339438 22.6303 0.0390625 21.9051 0.0390625 21.149L0.0390625 2.85103C0.0390625 2.09489 0.339438 1.36972 0.874111 0.835048C1.40878 0.300376 2.13396 0 2.8901 0L16.0904 0C16.8465 0 17.5717 0.300376 18.1064 0.835048C18.641 1.36972 18.9414 2.09489 18.9414 2.85103V11.2844C18.9498 11.3737 18.9395 11.4638 18.9111 11.5489C18.8827 11.634 18.8369 11.7123 18.7765 11.7786C18.7161 11.845 18.6425 11.898 18.5604 11.9343C18.4784 11.9705 18.3897 11.9893 18.2999 11.9893C18.2102 11.9893 18.1215 11.9705 18.0394 11.9343C17.9574 11.898 17.8838 11.845 17.8234 11.7786C17.763 11.7123 17.7171 11.634 17.6887 11.5489C17.6603 11.4638 17.65 11.3737 17.6584 11.2844V2.85103C17.6585 2.64763 17.6183 2.44622 17.5403 2.25837C17.4623 2.07052 17.3479 1.89991 17.2038 1.75635C17.0597 1.61278 16.8887 1.49908 16.7006 1.42176C16.5124 1.34444 16.3109 1.30502 16.1075 1.30577H2.8901C2.68573 1.30351 2.48295 1.34181 2.2935 1.41845C2.10404 1.4951 1.93166 1.60856 1.78636 1.75228C1.64105 1.89599 1.52569 2.06711 1.44697 2.25571C1.36825 2.44431 1.32772 2.64666 1.32773 2.85103V21.1661C1.32772 21.3704 1.36825 21.5728 1.44697 21.7614C1.52569 21.95 1.64105 22.1211 1.78636 22.2648C1.93166 22.4085 2.10404 22.522 2.2935 22.5987C2.48295 22.6753 2.68573 22.7136 2.8901 22.7113H13.0911C13.262 22.7113 13.4259 22.7792 13.5467 22.9001C13.6675 23.0209 13.7354 23.1848 13.7354 23.3557C13.7354 23.5266 13.6675 23.6904 13.5467 23.8113C13.4259 23.9321 13.262 24 13.0911 24Z"
                                            fill="#224D90"
                                          />
                                          <path
                                            d="M14.8904 6.88738H4.05644C3.96712 6.89581 3.87702 6.88549 3.79191 6.85709C3.70681 6.82869 3.62857 6.78282 3.56222 6.72243C3.49586 6.66205 3.44285 6.58847 3.40657 6.50641C3.3703 6.42435 3.35156 6.33562 3.35156 6.2459C3.35156 6.15618 3.3703 6.06744 3.40657 5.98538C3.44285 5.90332 3.49586 5.82974 3.56222 5.76936C3.62857 5.70897 3.70681 5.66311 3.79191 5.6347C3.87702 5.6063 3.96712 5.59598 4.05644 5.60441H14.8904C15.0501 5.61949 15.1984 5.69358 15.3064 5.81222C15.4143 5.93085 15.4742 6.08549 15.4742 6.2459C15.4742 6.4063 15.4143 6.56094 15.3064 6.67957C15.1984 6.79821 15.0501 6.87231 14.8904 6.88738Z"
                                            fill="#224D90"
                                          />
                                          <path
                                            d="M10.0327 11.8941H4.07402C3.90313 11.8941 3.73924 11.8263 3.61841 11.7054C3.49757 11.5846 3.42969 11.4207 3.42969 11.2498C3.42969 11.0789 3.49757 10.915 3.61841 10.7942C3.73924 10.6734 3.90313 10.6055 4.07402 10.6055H10.0327C10.2036 10.6055 10.3675 10.6734 10.4883 10.7942C10.6091 10.915 10.677 11.0789 10.677 11.2498C10.677 11.4207 10.6091 11.5846 10.4883 11.7054C10.3675 11.8263 10.2036 11.8941 10.0327 11.8941Z"
                                            fill="#224D90"
                                          />
                                          <path
                                            d="M18.02 22.0655C13.9887 22.0655 12.1925 18.2964 12.1184 18.1367C12.0809 18.0548 12.0649 17.9648 12.0719 17.875C12.0789 17.7852 12.1086 17.6987 12.1583 17.6236C12.2552 17.4753 14.5361 14.0312 18.02 14.0312C21.504 14.0312 23.7848 17.4525 23.8818 17.6178C23.9354 17.7033 23.9639 17.8021 23.9639 17.903C23.9639 18.0038 23.9354 18.1026 23.8818 18.1881C23.819 18.3306 21.7093 22.0655 18.02 22.0655ZM13.2303 17.96C13.6808 18.7526 15.2089 20.9992 18.02 20.9992C20.5518 20.9992 22.2624 18.7469 22.7927 17.9372C22.2225 17.1845 20.375 15.0861 18.02 15.0861C15.6651 15.0861 13.7891 17.2244 13.2303 17.96Z"
                                            fill="#224D90"
                                          />
                                          <path
                                            d="M18.1621 19.2071C18.7479 19.2071 19.2227 18.7323 19.2227 18.1465C19.2227 17.5608 18.7479 17.0859 18.1621 17.0859C17.5764 17.0859 17.1016 17.5608 17.1016 18.1465C17.1016 18.7323 17.5764 19.2071 18.1621 19.2071Z"
                                            fill="#224D90"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_6706_101356">
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>

                                      <img
                                        onClick={() => {
                                          if (
                                            applicant?.hiringStage !== "Hired"
                                          ) {
                                            handleDotClick(index);
                                          }
                                        }}
                                        className={`min-w-[24px] max-w-[24px] ${
                                          applicant?.hiringStage === "Hired"
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                        }`}
                                        src="/images/employer/three-dot.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                          )}
                        </>
                      ) : (
                        <div className="p-10 w-full flex items-center justify-center">
                          <img
                            src="/images/employer/OBJECTS.png"
                            alt="No data available"
                            className="h-[200px] w-[300px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mobile">
                    <div className="flex flex-col items-start gap-4 self-stretch w-full">
                      <div className="flex flex-col gap-[16px] items-start bg-[#fff] rounded-b-[16px] p-2 pb-3  overflow-y-auto w-[100%]">
                        {!jobDetails?.data?.applications?.length == 0 ? (
                          <>
                            {jobDetails?.data?.applications?.map(
                              (applicant, index) => (
                                <div
                                  onClick={() =>
                                    router.push(
                                      `/common/hiring/ApplicantDetails?applicantId=${applicant.applicantId}&id=${applicant.jobId}`
                                    )
                                  }
                                  key={index}
                                  className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#FFFFFF]"
                                  style={{
                                    border: "1px solid #DEDEDE",
                                  }}
                                >
                                  <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                                    <div className="flex justify-between items-center self-stretch">
                                      <div className="flex items-center gap-2">
                                        <img
                                          className="w-[30px] h-[30px]"
                                          src="/images/profile/john_doe.png"
                                          alt=""
                                        />
                                        <p className="text-[14px] text-[#333] font-[600]">
                                          {
                                            applicant.details?.personal
                                              ?.firstName
                                          }
                                        </p>
                                      </div>
                                      <p className="text-[14px] font-[600]">
                                        {applicant.matchingPercentage} %
                                      </p>
                                    </div>

                                    <div className="flex justify-between items-center self-stretch">
                                      <p className="text-[14px] text-[#333] font-[600]">
                                        <p>
                                          {new Date(applicant.appliedOn)
                                            .toLocaleDateString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })
                                            .replace(",", "")}
                                        </p>
                                      </p>
                                      <div
                                        className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${checkedApplicants[index]
                                          ? "bg-[#FFFFFF]"
                                          : applicant.hiringStage ===
                                            "Interview"
                                            ? "bg-[#26A4FF1A]"
                                            : applicant.hiringStage ===
                                              "Pending"
                                              ? "bg-[#FFF9ED]"
                                              : applicant.hiringStage === "Hired"
                                                ? "bg-[#56CDAD1A]"
                                                : applicant.hiringStage ===
                                                  "Shortlisted"
                                                  ? "bg-[#4640DE1A]"
                                                  : applicant.hiringStage ===
                                                    "Rejected"
                                                    ? "bg-[#FF65501A]"
                                                    : applicant.hiringStage ===
                                                      "In Review"
                                                      ? "bg-[#EB85331A]"
                                                      : ""
                                          } ${applicant.hiringStage === "Interview"
                                            ? "text-[#26A4FF]"
                                            : applicant.hiringStage ===
                                              "Pending"
                                              ? "text-[#FFB836]"
                                              : applicant.hiringStage === "Hired"
                                                ? "text-[#56CDAD]"
                                                : applicant.hiringStage ===
                                                  "Shortlisted"
                                                  ? "text-[#4640DE]"
                                                  : applicant.hiringStage ===
                                                    "Rejected"
                                                    ? "text-[#FF6550]"
                                                    : applicant.hiringStage ===
                                                      "In Review"
                                                      ? "text-[#FFB836]"
                                                      : "text-[#333333]"
                                          }`}
                                      >
                                        {applicant.hiringStage}
                                      </div>{" "}
                                    </div>
                                    <div className="flex justify-between items-center  w-[100%]">
                                      <p className="text-[14px] font-[600]">
                                        {applicant.source}
                                      </p>
                                      <div className="flex gap-[10px]">
                                        {userDataGlobal?.role ===
                                          "recruiter" && (
                                            <button
                                              disabled={
                                                applicant?.hiringStage ===
                                                "Rejected" ||
                                                applicant?.hiringStage ===
                                                "Shortlisted"
                                              }
                                              style={{
                                                opacity:
                                                  applicant?.hiringStage ===
                                                    "Rejected" ||
                                                    applicant?.hiringStage ===
                                                    "Shortlisted"
                                                    ? 0.5
                                                    : 1,
                                              }}
                                              onClick={() => {
                                                setHiringStage("Shortlisted");
                                                togglePopup(applicant);
                                              }}
                                              className="text-[10px] flex justify-center items-center leading-tight text-white font-[500] py-[8px] px-[10px] rounded-[30px] bg-[#06A9EF]"
                                            >
                                              Shortlist
                                            </button>
                                          )}
                                        <>
                                          {isPopupVisible && (
                                            <ShortlistMail
                                              jobData={jobData}
                                              shortlist={shortlist}
                                              setPopupVisible={setPopupVisible}
                                              id={applicant?.jobId}
                                              statusChange={statusChange}
                                              setStatusChange={setStatusChange}
                                              applicantIds={applicantIds}
                                              newHiringStage={hiringStage}
                                            />
                                          )}
                                        </>
                                        <button
                                          disabled={
                                            applicant?.hiringStage ===
                                            "Rejected"
                                          }
                                          style={{
                                            opacity:
                                              applicant?.hiringStage ===
                                                "Rejected"
                                                ? 0.5
                                                : 1,
                                          }}
                                          onClick={() => {
                                            setHiringStage("Rejected");
                                            togglePopup(applicant);
                                          }}
                                          className="text-[10px] font-[500] py-[8px] px-[10px] rounded-[30px] border-[1px] border-[#B3261E] text-[#B3261E]"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </>
                        ) : (
                          <div className="p-10 w-full flex items-center justify-center">
                            <img
                              src="/images/employer/OBJECTS.png"
                              alt="No data available"
                              className="h-[200px] w-[300px]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {totalCount > 10 && (
                      <CustomPagination
                        setMiniloading={setMiniloading}
                        miniLoading={miniloading}
                        setPage={setPage}
                        title={"Applicant"}
                        defaultLimit={10}
                        setLimit={setLimit}
                        totalPages={totalPages}
                        limit={limit}
                        page={page}
                        isBackground={true}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {option === 1 && (
            <div className="mb-6">
              <JobDetails jobDetails={jobData} totalCount={totalCount} />
            </div>
          )}
          {option === 2 && <Analytics jobDetails={jobDetails} />}

          {option === 3 && (
            <div className="mb-6">
              <div>
                {loading ? (
                  <MiniLoader />
                ) : data?.length === 0 ? (
                  <div className="p-3  flex items-center justify-center">
                    <img
                      className="w-[30%] min-w-[200px]"
                      src="/images/employer/OBJECTS.png"
                      alt="No data available"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex scr700:flex-row flex-col p-[16px] justify-end scr700:items-center gap-4  bg-[#fff]">
                      <div className="flex items-end gap-[8px]">
                        <div className="ml:w-[314px] flex py-[8px] px-[10px] gap-[16px] rounded-[6px] border border-[#D6DDEB] bg-[#fff]">
                          <img
                            className="w-[24px] h-[24px]"
                            src="/images/employer/icon_search.png"
                            alt=""
                          />
                          <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="sm:w-full w-[100px]"
                          />
                        </div>
                      </div>
                    </div>

                    {allShortlist && (
                      <ShortlistMail
                        shortlist={checkedApplicants}
                        jobData={jobData}
                        setPopupVisible={setAllShortlist}
                        id={id}
                        statusChange={statusChange}
                        setStatusChange={setStatusChange}
                        applicantIds={applicantIds}
                        newHiringStage={hiringStage}
                      />
                    )}

                    <div className="web">
                      <div className="flex p-[16px] items-center gap-[20px] bg-[#EFFAFF] border border-[#D6DDEB]">
                        {userDataGlobal?.role === "employer" && (
                          <input
                            className="w-[16px] h-[16px]"
                            type="checkbox"
                            checked={
                              checkedApplicants.length > 0 &&
                              checkedApplicants.length ===
                              jobDetails?.data?.applications.filter(
                                (app) => app.hiringStage === "Pending"
                              ).length
                            }
                            onChange={handleSelectAll}
                          />
                        )}
                        {applicant_head.map((applicant_head, index) => (
                          <div
                            key={index}
                            className="flex items-center w-full text-[#333333] gap-[8px] relative"
                            style={{ width: widths[index] }}
                          >
                            <p
                              style={{ textAlign: texts[index] }}
                              className={`text-[14px] w-full font-[600] ml-5`}
                            >
                              {applicant_head.name}
                            </p>

                            {applicant_head?.isFilter &&
                              (filterType === applicant_head.name ? (
                                <div
                                  className=" cursor-pointer"
                                  onClick={() => setfilterType("")}
                                >
                                  <UpSvg />
                                </div>
                              ) : (
                                <div
                                  className=" cursor-pointer"
                                  onClick={() =>
                                    setfilterType(applicant_head.name)
                                  }
                                >
                                  <DownSvg />
                                </div>
                              ))}
                            {filterType === applicant_head.name && (
                              <div className="absolute h-fit w-[150px] bg-white rounded-[16px] top-8 left-12 shadow-md p-4 flex flex-col gap-2">
                                {applicant_head?.filters.map(
                                  (filter, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 text-[14px] font-medium"
                                    >
                                      <input
                                        type="checkbox"
                                        id={`filter-${index}`}
                                        value={filter}
                                        checked={selectedFilters[
                                          applicant_head.name
                                        ]?.includes(filter)}
                                        onChange={(e) =>
                                          handleCheckboxChangeFilter(
                                            e,
                                            filter,
                                            applicant_head.name
                                          )
                                        }
                                      />

                                      <label htmlFor={`filter-${index}`}>
                                        {filter}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col items-start bg-[#fff]  overflow-y-auto">
                        {!jobDetails?.data?.applications.length == 0 ? (
                          <>
                            {jobDetails?.data?.applications.map(
                              (applicant, index) => (
                                <>
                                  <div
                                    className={`flex w-[100%] border-b border-[#D4D4D480]  p-[16px] justify-between items-center ${checkedApplicants[index]
                                      ? "bg-[#D3F1FF]"
                                      : "bg-[#FFFFFF]"
                                      }`}
                                    key={applicant?._id}
                                  >
                                    <div className="  gap-[20px]  w-full justify-between flex items-center">
                                      {userDataGlobal?.role === "employer" && (
                                        <input
                                          key={applicant.id}
                                          className="w-[16px] h-[16px]"
                                          type="checkbox"
                                          checked={checkedApplicants.some(
                                            (a) => a.id === applicant.id
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(applicant)
                                          }
                                          disabled={
                                            applicant.hiringStage !== "Pending"
                                          }
                                        />
                                      )}
                                      <div className="flex  w-[25%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                                        <img
                                          className="w-[40px]"
                                          src="/images/employer/profile_icon.png"
                                          alt=""
                                        />
                                        <p className="text-[14px] font-[600]">
                                          {
                                            applicant?.details?.personal
                                              ?.firstName
                                          }{" "}
                                          {
                                            applicant?.details?.personal
                                              ?.lastName
                                          }
                                        </p>
                                      </div>
                                      <div className="flex w-[10%] items-center justify-start pl-6  gap-[8px]">
                                        <p className="text-[14px] font-[600]">
                                          {applicant?.source}
                                        </p>
                                      </div>

                                      <div className="flex w-[15%] items-center justify-center   gap-[8px]">
                                        <p className="text-[14px] font-[600]">
                                          {applicant?.matchingPercentage} %
                                        </p>
                                      </div>
                                      <div className=" flex justify-center w-[20%]">
                                        <div
                                          className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${checkedApplicants[index]
                                            ? "bg-[#FFFFFF]"
                                            : applicant?.hiringStage ===
                                              "Interview"
                                              ? "bg-[#26A4FF1A]"
                                              : applicant?.hiringStage ===
                                                "Pending"
                                                ? "bg-[#FFF9ED]"
                                                : applicant?.hiringStage ===
                                                  "Hired"
                                                  ? "bg-[#56CDAD1A]"
                                                  : applicant?.hiringStage ===
                                                    "Shortlisted"
                                                    ? "bg-[#4640DE1A]"
                                                    : applicant?.hiringStage ===
                                                      "Rejected"
                                                      ? "bg-[#FF65501A]"
                                                      : applicant?.hiringStage ===
                                                        "In Review"
                                                        ? "bg-[#EB85331A]"
                                                        : applicant?.hiringStage ===
                                                          "Selected"
                                                          ? "bg-[#26A4FF1A]"
                                                          : ""
                                            } ${applicant?.hiringStage ===
                                              "Interview"
                                              ? "text-[#26A4FF]"
                                              : applicant?.hiringStage ===
                                                "Pending"
                                                ? "text-[#FFB836]"
                                                : applicant?.hiringStage ===
                                                  "Hired"
                                                  ? "text-[#56CDAD]"
                                                  : applicant?.hiringStage ===
                                                    "Shortlisted"
                                                    ? "text-[#4640DE]"
                                                    : applicant?.hiringStage ===
                                                      "Rejected"
                                                      ? "text-[#FF6550]"
                                                      : applicant?.hiringStage ===
                                                        "In Review"
                                                        ? "text-[#FFB836]"
                                                        : applicant?.hiringStage ===
                                                          "Selected"
                                                          ? "text-[#26A4FF]"
                                                          : "text-[#333333]"
                                            }`}
                                        >
                                          {applicant?.hiringStage}
                                        </div>
                                      </div>
                                      <div className=" flex text-[14px] w-[15%] pl-6 font-[600]">
                                        <p>
                                          {new Date(applicant?.appliedOn)
                                            .toLocaleDateString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })
                                            .replace(",", "")}
                                        </p>
                                      </div>
                                      <div className="flex justify-center  w-[15%] items-center gap-[16px] relative">
                                        <div
                                          className="cursor-pointer"
                                          onClick={() =>
                                            router.push(
                                              `/common/hiring/ApplicantDetails?applicantId=${applicant?.applicantId}&id=${id}`
                                            )
                                          }
                                        >
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M13.0911 24H2.8901C2.13396 24 1.40878 23.6996 0.874111 23.165C0.339438 22.6303 0.0390625 21.9051 0.0390625 21.149L0.0390625 2.85103C0.0390625 2.09489 0.339438 1.36972 0.874111 0.835048C1.40878 0.300376 2.13396 0 2.8901 0L16.0904 0C16.8465 0 17.5717 0.300376 18.1064 0.835048C18.641 1.36972 18.9414 2.09489 18.9414 2.85103V11.2844C18.9498 11.3737 18.9395 11.4638 18.9111 11.5489C18.8827 11.634 18.8369 11.7123 18.7765 11.7786C18.7161 11.845 18.6425 11.898 18.5604 11.9343C18.4784 11.9705 18.3897 11.9893 18.2999 11.9893C18.2102 11.9893 18.1215 11.9705 18.0394 11.9343C17.9574 11.898 17.8838 11.845 17.8234 11.7786C17.763 11.7123 17.7171 11.634 17.6887 11.5489C17.6603 11.4638 17.65 11.3737 17.6584 11.2844V2.85103C17.6585 2.64763 17.6183 2.44622 17.5403 2.25837C17.4623 2.07052 17.3479 1.89991 17.2038 1.75635C17.0597 1.61278 16.8887 1.49908 16.7006 1.42176C16.5124 1.34444 16.3109 1.30502 16.1075 1.30577H2.8901C2.68573 1.30351 2.48295 1.34181 2.2935 1.41845C2.10404 1.4951 1.93166 1.60856 1.78636 1.75228C1.64105 1.89599 1.52569 2.06711 1.44697 2.25571C1.36825 2.44431 1.32772 2.64666 1.32773 2.85103V21.1661C1.32772 21.3704 1.36825 21.5728 1.44697 21.7614C1.52569 21.95 1.64105 22.1211 1.78636 22.2648C1.93166 22.4085 2.10404 22.522 2.2935 22.5987C2.48295 22.6753 2.68573 22.7136 2.8901 22.7113H13.0911C13.262 22.7113 13.4259 22.7792 13.5467 22.9001C13.6675 23.0209 13.7354 23.1848 13.7354 23.3557C13.7354 23.5266 13.6675 23.6904 13.5467 23.8113C13.4259 23.9321 13.262 24 13.0911 24Z"
                                              fill="#224D90"
                                            />
                                            <path
                                              d="M14.8904 6.88738H4.05644C3.96712 6.89581 3.87702 6.88549 3.79191 6.85709C3.70681 6.82869 3.62857 6.78282 3.56222 6.72243C3.49586 6.66205 3.44285 6.58847 3.40657 6.50641C3.3703 6.42435 3.35156 6.33562 3.35156 6.2459C3.35156 6.15618 3.3703 6.06744 3.40657 5.98538C3.44285 5.90332 3.49586 5.82974 3.56222 5.76936C3.62857 5.70897 3.70681 5.66311 3.79191 5.6347C3.87702 5.6063 3.96712 5.59598 4.05644 5.60441H14.8904C15.0501 5.61949 15.1984 5.69358 15.3064 5.81222C15.4143 5.93085 15.4742 6.08549 15.4742 6.2459C15.4742 6.4063 15.4143 6.56094 15.3064 6.67957C15.1984 6.79821 15.0501 6.87231 14.8904 6.88738Z"
                                              fill="#224D90"
                                            />
                                            <path
                                              d="M10.0327 11.898H4.07402C3.90313 11.898 3.73924 11.8302 3.61841 11.7093C3.49757 11.5885 3.42969 11.4246 3.42969 11.2537C3.42969 11.0828 3.49757 10.9189 3.61841 10.7981C3.73924 10.6773 3.90313 10.6094 4.07402 10.6094H10.0327C10.2036 10.6094 10.3675 10.6773 10.4883 10.7981C10.6091 10.9189 10.677 11.0828 10.677 11.2537C10.677 11.4246 10.6091 11.5885 10.4883 11.7093C10.3675 11.8302 10.2036 11.898 10.0327 11.898Z"
                                              fill="#224D90"
                                            />
                                            <path
                                              d="M18.02 22.0655C13.9887 22.0655 12.1925 18.2964 12.1184 18.1367C12.0809 18.0548 12.0649 17.9648 12.0719 17.875C12.0789 17.7852 12.1086 17.6987 12.1583 17.6236C12.2552 17.4753 14.5361 14.0312 18.02 14.0312C21.504 14.0312 23.7848 17.4525 23.8818 17.6178C23.9354 17.7033 23.9639 17.8021 23.9639 17.903C23.9639 18.0038 23.9354 18.1026 23.8818 18.1881C23.819 18.3306 21.7093 22.0655 18.02 22.0655ZM13.2303 17.96C13.6808 18.7526 15.2089 20.9992 18.02 20.9992C20.5518 20.9992 22.2624 18.7469 22.7927 17.9372C22.2225 17.1845 20.375 15.0861 18.02 15.0861C15.6651 15.0861 13.7891 17.2244 13.2303 17.96Z"
                                              fill="#224D90"
                                            />
                                            <path
                                              d="M18.1621 19.2071C18.7479 19.2071 19.2227 18.7323 19.2227 18.1465C19.2227 17.5608 18.7479 17.0859 18.1621 17.0859C17.5764 17.0859 17.1016 17.5608 17.1016 18.1465C17.1016 18.7323 17.5764 19.2071 18.1621 19.2071Z"
                                              fill="#224D90"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            )}
                          </>
                        ) : (
                          <div className="p-10 w-full flex items-center justify-center">
                            <img
                              src="/images/employer/OBJECTS.png"
                              alt="No data available"
                              className="h-[200px] w-[300px]"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mobile">
                      <div className="flex flex-col items-start gap-4 self-stretch w-full">
                        <div className="flex flex-col gap-[16px] items-start bg-[#fff] rounded-b-[16px] p-2 pb-3  overflow-y-auto w-[100%]">
                          {!jobDetails?.data?.applications?.length == 0 ? (
                            <>
                              {jobDetails?.data?.applications?.map(
                                (applicant, index) => (
                                  <div
                                    onClick={() =>
                                      router.push(
                                        `/common/hiring/ApplicantDetails?applicantId=${applicant.applicantId}&id=${applicant.jobId}`
                                      )
                                    }
                                    key={index}
                                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#FFFFFF]"
                                    style={{
                                      border: "1px solid #DEDEDE",
                                    }}
                                  >
                                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                                      <div className="flex justify-between items-center self-stretch">
                                        <div className="flex items-center gap-2">
                                          <img
                                            className="w-[30px] h-[30px]"
                                            src="/images/profile/john_doe.png"
                                            alt=""
                                          />
                                          <p className="text-[14px] text-[#333] font-[600]">
                                            {
                                              applicant.details?.personal
                                                ?.firstName
                                            }
                                          </p>
                                        </div>
                                        <p className="text-[14px] font-[600]">
                                          {applicant.matchingPercentage} %
                                        </p>
                                      </div>

                                      <div className="flex justify-between items-center self-stretch">
                                        <p className="text-[14px] text-[#333] font-[600]">
                                          <p>
                                            {new Date(applicant.appliedOn)
                                              .toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })
                                              .replace(",", "")}
                                          </p>
                                        </p>
                                        <div
                                          className={` flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] w-fit ${checkedApplicants[index]
                                            ? "bg-[#FFFFFF]"
                                            : applicant.hiringStage ===
                                              "Interview"
                                              ? "bg-[#26A4FF1A]"
                                              : applicant.hiringStage ===
                                                "Pending"
                                                ? "bg-[#FFF9ED]"
                                                : applicant.hiringStage ===
                                                  "Hired"
                                                  ? "bg-[#56CDAD1A]"
                                                  : applicant.hiringStage ===
                                                    "Shortlisted"
                                                    ? "bg-[#4640DE1A]"
                                                    : applicant.hiringStage ===
                                                      "Rejected"
                                                      ? "bg-[#FF65501A]"
                                                      : applicant.hiringStage ===
                                                        "In Review"
                                                        ? "bg-[#EB85331A]"
                                                        : ""
                                            } ${applicant.hiringStage ===
                                              "Interview"
                                              ? "text-[#26A4FF]"
                                              : applicant.hiringStage ===
                                                "Pending"
                                                ? "text-[#FFB836]"
                                                : applicant.hiringStage ===
                                                  "Hired"
                                                  ? "text-[#56CDAD]"
                                                  : applicant.hiringStage ===
                                                    "Shortlisted"
                                                    ? "text-[#4640DE]"
                                                    : applicant.hiringStage ===
                                                      "Rejected"
                                                      ? "text-[#FF6550]"
                                                      : applicant.hiringStage ===
                                                        "In Review"
                                                        ? "text-[#FFB836]"
                                                        : "text-[#333333]"
                                            }`}
                                        >
                                          {applicant.hiringStage}
                                        </div>{" "}
                                      </div>
                                      <div className="flex justify-between items-center  w-[100%]">
                                        <p className="text-[14px] font-[600]">
                                          {applicant.source}
                                        </p>
                                        <div className="flex gap-[10px]">
                                          <button
                                            disabled={
                                              applicant?.hiringStage ===
                                              "Rejected" ||
                                              applicant?.hiringStage ===
                                              "Shortlisted"
                                            }
                                            style={{
                                              opacity:
                                                applicant?.hiringStage ===
                                                  "Rejected" ||
                                                  applicant?.hiringStage ===
                                                  "Shortlisted"
                                                  ? 0.5
                                                  : 1,
                                            }}
                                            onClick={() => {
                                              setHiringStage("Shortlisted");
                                              togglePopup(applicant);
                                            }}
                                            className="text-[10px] flex justify-center items-center leading-tight text-white font-[500] py-[8px] px-[10px] rounded-[30px] bg-[#06A9EF]"
                                          >
                                            Shortlist
                                          </button>
                                          <>
                                            {isPopupVisible && (
                                              <ShortlistMail
                                                shortlist={shortlist}
                                                jobData={jobData}
                                                setPopupVisible={
                                                  setPopupVisible
                                                }
                                                id={applicant?.jobId}
                                                statusChange={statusChange}
                                                setStatusChange={
                                                  setStatusChange
                                                }
                                                applicantIds={applicantIds}
                                                newHiringStage={hiringStage}
                                              />
                                            )}
                                          </>
                                          <button
                                            disabled={
                                              applicant?.hiringStage ===
                                              "Rejected"
                                            }
                                            style={{
                                              opacity:
                                                applicant?.hiringStage ===
                                                  "Rejected"
                                                  ? 0.5
                                                  : 1,
                                            }}
                                            onClick={() => {
                                              setHiringStage("Rejected");
                                              togglePopup(applicant);
                                            }}
                                            className="text-[10px] font-[500] py-[8px] px-[10px] rounded-[30px] border-[1px] border-[#B3261E] text-[#B3261E]"
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div className="p-10 w-full flex items-center justify-center">
                              <img
                                src="/images/employer/OBJECTS.png"
                                alt="No data available"
                                className="h-[200px] w-[300px]"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      {totalCount > 10 && (
                        <CustomPagination
                          setMiniloading={setMiniloading}
                          miniLoading={miniloading}
                          setPage={setPage}
                          title={"Applicant"}
                          defaultLimit={10}
                          setLimit={setLimit}
                          totalPages={totalPages}
                          limit={limit}
                          page={page}
                          isBackground={true}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default JobPost;
