import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MiniLoader from "../../components/common/miniLoader";
import { dateSeter } from "../../utils/middleware";
import CustomPagination from "../../components/common/CustomPagination";
import { AnimatePresence, motion } from "framer-motion";
import { setRecallData } from "../../Redux/slices/recallSlice";
import LimitUsedModal from "../models/limitUsedModal";
const SelectPostJd = () => {
    const router = useRouter();
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [jobPost, setJobPost] = useState([]);
    const dispatch = useDispatch();
    const { recallData } = useSelector((state) => state.recall);
    const [resumeList, setResumeList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [miniloading, setMiniloading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [limitPopup, setLimitPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
    const [selectedJob, setSelectedJob] = useState();
    const [openLimit, setOpenLimit] = useState(false)
    const [resumeCount, setResumeCount] = useState(5);
    const [findMatchLoader, setMatchLoader] = useState(false);
    const [jdCountMonthly, setJdCountMonthly] = useState(0);
    const [openParameters, setOpenParamenters] = useState(false)
    const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
    const [parameters, setParameters] = useState([
        { label: "Skills and Competencies", description: "Identify and highlight any skills and competencies in the resume that match the required and preferred skills and competencies in the job description.", percentage: 15, enabled: true },
        { label: "Relevant Experience in the Required Field", description: "Compare the candidate's experience in the relevant field with the job requirements, noting any areas where the candidate meets, exceeds, or falls short of the required experience.", percentage: 15, enabled: true },
        { label: "Roles and Responsibilities", description: "Evaluate the roles and responsibilities listed in the candidate's work experience and compare them with those required by the job description.", percentage: 15, enabled: true },
        { label: "Objective and Professional Summary from Resume", description: "Assess the candidate's objective and professional summary in the resume to determine alignment with the job role and company values.", percentage: 10, enabled: true },
        { label: "Total Experience", description: "Summarize the candidate's total professional experience, including all relevant fields, and compare it with the job requirements.", percentage: 10, enabled: true },
        { label: "Educational Qualification", description: "Compare the candidate's educational qualifications with the required and preferred educational background mentioned in the job description.", percentage: 10, enabled: true },
        { label: "Keywords", description: "Identify any keywords from the job description that are present in the candidate's resume.", percentage: 10, enabled: true },
        { label: "Achievements", description: "Review the candidate's achievements and assess their relevance and impact in relation to the job role.", percentage: 15, enabled: true }
    ]);
    const [weightage, setWeightage] = useState(false)
    const [priority, setPriority] = useState(false)
    const [mainMessage, setMainMessage] = useState("Analyzing Data");
    const [showResume, setShowResume] = useState(false);
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
    localStorage.setItem("jdApplicantFilenames", JSON.stringify(""));

    const getData = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:2000/api/job/getByCreatedId/${userDataGlobal?._id}`,
                {
                    params: {
                        page,
                        limit,
                        search: delayedSearchTerm,
                        status: filterStatus !== "All" ? filterStatus : undefined,
                    },
                }
            );
            setJobPost(data);
            setTotalCount(data.totalCount);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching job posts:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedSearchTerm(searchTerm);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (userDataGlobal?._id) {
            setLoading(true);
            getData();
        }
    }, [userDataGlobal, page, limit, delayedSearchTerm, filterStatus]);

    const statusPriority = {
        Live: 1,
        Hold: 2,
        Closed: 3,
    };

    const sortedJobs = Array.isArray(jobPost?.jobs)
        ? jobPost.jobs
            .filter((job) =>
                filterStatus === "All" ? true : job.status === filterStatus
            )
            .sort((a, b) => {
                const statusComparison =
                    statusPriority[a.status] - statusPriority[b.status];

                if (statusComparison !== 0) {
                    return statusComparison;
                }

                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        : [];

    const isLive = (item) => {
        var date1 = new Date(item.deadLine);
        var date2 = new Date();

        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);

        if (date2 <= date1) {
            return true;
        } else {
            return false;
        }
    };
    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
            setOpenLimit(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
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


    const JobMatchforSkilotechCollection = async () => {
        try {
            if (jdCountMonthly >= jdCountMonthlyLimit) {
                setLimitPopup(true);
                return;
            }

            setOpenLimit(false);
            setMatchLoader(true);

            const outputData = [];

            const response = await axios.post(
                "http://localhost:2000/api/skiloCollection/jobMatching",
                {
                    jd: selectedJob,
                    resumeCount,
                    parameters,
                    weightage,
                    priority
                }
            );

            if (Array.isArray(response.data)) {
                outputData.push(...response.data);
            } else {
                outputData.push(response.data);
            }

            const dataArray = outputData
                .filter((item) => item.matching_percentage)
                .sort((a, b) => {
                    const parsePercentage = (percentage) => {
                        return parseInt(
                            isNaN(percentage) ? percentage.slice(0, 2) : percentage
                        );
                    };
                    return (
                        parsePercentage(b.matching_percentage) -
                        parsePercentage(a.matching_percentage)
                    );
                })
                .slice(0, resumeCount);

            setResumeList(dataArray);
            setShowResume(true);
            updateJobMatchLimit();

            setTimeout(() => {
                getLimits();
            }, 5000);
        } catch (error) {
            console.error("Error in JobMatchforSkilotechCollection:", error);
        } finally {
            setMatchLoader(false);
        }
    };


    const updateJobMatchLimit = async () => {


        try {
            const updateJobMatchApiUrl = `https://dev.api.skilotech.com/api/apiLogs/updateJobMatchCount/${userDataGlobal?._id}`;
            const updateJobMatchResponse = await axios.put(updateJobMatchApiUrl, {
                resumeCount,
            });

            if (!updateJobMatchResponse.data.success) {
                console.error(
                    "Error in updateJobMatchCount:",
                    updateJobMatchResponse.data.message
                );
            }

            const jdSubscriptionLimitUrl = `https://dev.api.skilotech.com/api/subscription/updateAiHits/${userDataGlobal?._id}`;
            const jdSubscriptionResponse = await axios.put(jdSubscriptionLimitUrl, {
                resumeCount,
            });

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


    return (
        <div className=" flex flex-col gap-[16px]  ">
            {limitPopup && (
                <div className="z-[200000]">
                    <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
                </div>
            )}
            {findMatchLoader && (
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="relative earth_loader flex flex-col items-center justify-center gap-[24px]">
                            <div className="w-[165px] h-[124px] flex items-center justify-center">
                                <motion.img
                                    src="/images/resumeBuilder/bot.png"
                                    alt=""
                                    className="h-[68px] w-[68px]"
                                    animate={{ y: [-30, 0, -30] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center relative z-100">
                                <span className="text-center text-[#fff] text-[16px]">
                                    {mainMessage},
                                </span>
                                <span className="text-left text-[#fff] text-[16px] loading_dots">
                                    Please wait
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {openLimit &&
                <div ref={taskRef}>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
                        <div className="w-[300px] rounded-[12px] bg-white p-4 flex flex-col gap-4">
                            <div className=" flex justify-between">
                                <p className="text-[14px] font-medium">Set Filter Limit</p>
                                <svg onClick={() => setOpenLimit(false)} className=" cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                    <g mask="url(#mask0_9648_113609)">
                                        <path d="M4.71874 14.1648L3.84375 13.2898L8.13126 9.00234L3.84375 4.71483L4.71874 3.83984L9.00624 8.12735L13.2938 3.83984L14.1687 4.71483L9.88123 9.00234L14.1687 13.2898L13.2938 14.1648L9.00624 9.87733L4.71874 14.1648Z" fill="#333333" />
                                    </g>
                                </svg>

                            </div>

                            <input
                                type="text"
                                value={resumeCount}
                                onChange={(e) => {
                                    setResumeCount(e.target.value);
                                }}
                                name=""
                                id=""
                                placeholder="Ex. 5"
                                className=" h-[38px]   p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] leading-[12px]"
                            />
                            <button onClick={() => JobMatchforSkilotechCollection()} className="px-6 h-[38px] bg_Button rounded-[30px]">
                                Request CV from Skilotech
                            </button>

                        </div>
                    </div>

                </div>

            }
            <div className="flex ml:flex-row flex-col gap-4 justify-between ml:items-center items-end w-full">
                <span className="text-[16px] font-semibold  py-[8px] px-[12px]  w-full ">
                    Select a Job for Request CV from Skilotech
                </span>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2  bg-[#ffffff]  border border-[#DEDEDE] rounded-[30px] py-[8px] px-[24px]  min-w-[190px]">
                        <input
                            type="text"
                            placeholder="Enter Job Title"
                            className="bg-transparent text-black placeholder-[200] outline-none w-full text-[12px] font-medium"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <img
                            src="/images/employer/icon_search.png"
                            className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                            alt=""
                        />
                    </div>

                    <div className="border border-[#DEDEDE] rounded-[30px] py-[8px] px-[16px] flex ms:flex-row flex-col-reverse gap-4  ms:items-center items-end justify-end relative h-[39.6px] outline-none">
                        <select
                            className="text-[14px] font-medium text-[#333333] bg-white   cursor-pointer h-[38px] outline-none"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <div className=" flex flex-row flex-wrap gap-x-[34px]  gap-y-[24px] ">
                    {loading ? (
                        <div className="w-full flex items-center justify-center h-[80vh]">
                            <MiniLoader />
                        </div>
                    ) : (
                        <>
                            {sortedJobs.length > 0 ? (
                                <>
                                    {sortedJobs.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelectedJob(item); setOpenLimit(true)
                                            }
                                            }
                                            className="flex w-full sm:w-[300px] cursor-pointer py-3 px-3  flex-col items-start gap-3 flex-shrink-0 rounded-[12px] bg-white border border-[#DEDEDE] col-span-4"
                                        >
                                            <div className="flex justify-between w-[100%]">
                                                <div className="flex justify-between gap-[10px] items-start">
                                                    <p className="text-[14px] font-[600]">
                                                        {item?.jobTitle}
                                                    </p>
                                                    <div className="flex gap-[3px] items-center">
                                                        {item.status === "Active" ? (
                                                            <>
                                                                <div className="w-[6px] h-[6px] bg-[#0C8A0A] rounded-full"></div>
                                                                <div className="text-[12px] font-[500] text-[#0C8A0A]">
                                                                    Active
                                                                </div>
                                                            </>
                                                        ) : item.status === "Inactive" ? (
                                                            <>
                                                                <div className="w-[6px] h-[6px] bg-[#FF7802] rounded-full"></div>
                                                                <div className="text-[12px] font-[500] text-[#FF7802]">
                                                                    Inactive
                                                                </div>
                                                            </>
                                                        ) : item.status === "Closed" ? (
                                                            <>
                                                                <div className="w-[6px] h-[6px] bg-[#B3261E] rounded-full"></div>
                                                                <div className="text-[12px] font-[500] text-[#B3261E]">
                                                                    Closed
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="flex w-[100%] justify-between items-center">
                                                <div className="flex flex-col items-start gap-[4px]">
                                                    <p className="text-[12px] font-[600] text-[#646464]">
                                                        Date Posted
                                                    </p>
                                                    <p className="text-[#333] font-[500] text-[12px]">
                                                        {new Date(item?.createdAt).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-[4px]">
                                                    <p className="text-[12px] font-[600] text-[#646464]">
                                                        Due Date
                                                    </p>
                                                    <p className="text-[#333] font-[500] text-[12px]">
                                                        {new Date(item?.deadLine).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-[10px] flex-wrap">
                                                {item?.revalentExp && (
                                                    <div className="flex gap-[4px] items-center">
                                                        <div>
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
                                                        </div>
                                                        <div className="text-[12px] font-[400]">
                                                            {item?.revalentExp}
                                                        </div>
                                                    </div>
                                                )}
                                                {item?.revalentExp && (
                                                    <div className="border-[1px] border-[#AFAFAF]"></div>
                                                )}
                                                <div className="flex gap-[4px] items-center">
                                                    <div>
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
                                                    </div>
                                                    <div className="text-[12px] font-[400]">
                                                        {item?.jobType}
                                                    </div>
                                                </div>
                                                <div className="border-[1px] border-[#AFAFAF]"></div>
                                                <div className="flex gap-[4px] items-center">
                                                    <div>
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
                                                    </div>
                                                    <div className="text-[12px] font-[400]">
                                                        {item?.location
                                                            ?.map(
                                                                (loc) =>
                                                                    loc.charAt(0).toUpperCase() +
                                                                    loc.slice(1).toLowerCase()
                                                            )
                                                            .join(", ")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="flex justify-center items-center text-xl pt-[100px]">
                                    <img
                                        className="w-[20%] min-w-[200px]"
                                        src="/images/employer/OBJECTS.png"
                                        alt="No data available"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {totalCount > 9 ? (
                    <>
                        <div>
                            <CustomPagination
                                setMiniloading={setMiniloading}
                                miniLoading={miniloading}
                                setPage={setPage}
                                title={"Jobs"}
                                setLimit={setLimit}
                                defaultLimit={9}
                                totalPages={totalPages}
                                limit={limit}
                                page={page}
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
            {showResume &&
                <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="bg-white rounded-[12px] p-4 w-[700px] flex flex-col justify-between h-[400px] ">
                            {resumeList?.length > 0 ? (
                                resumeList?.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-4">
                                        <div className="text-[16px] font-medium">
                                            Match {resumeList.length} resumes
                                        </div>
                                        <div
                                            key={index}

                                            className="w-[88px] flex flex-col gap-[6px] relative group  items-center py-4 min-h-[80px] max-h-[100px] rounded-[8px] cursor-pointer "
                                        >
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M33.2108 0L42.6465 9.96849V47.8763H7.39844V48H42.7669V10.094L33.2108 0Z" fill="#909090" />
                                                <path d="M32.6616 0H7.39844V48H42.7669V10.094L32.6616 0Z" fill="#F4F4F4" />
                                                <path d="M32.0263 39.4745H5.5V28.4219H32.0263V39.4745Z" fill="#DD2025" />
                                                <path d="M32.6562 0V10.1053H42.7615L32.6562 0Z" fill="#AEAEAE" />
                                                <path d="M12.0101 30.6536H9.92188V37.2575H11.5707V35.0315L11.935 35.0493C12.2874 35.0441 12.6365 34.9898 12.9687 34.8884C13.2599 34.8021 13.5279 34.6659 13.7563 34.488C13.9871 34.3181 14.1687 34.1042 14.2868 33.8634C14.447 33.4623 14.5043 33.0361 14.4545 32.6142C14.4446 32.3127 14.3832 32.0142 14.2724 31.7281C14.1715 31.5216 14.0219 31.3355 13.8329 31.1815C13.6439 31.0276 13.4198 30.9092 13.1748 30.8339C12.962 30.7672 12.742 30.7188 12.5181 30.6894C12.3495 30.667 12.1807 30.6551 12.0101 30.6536ZM11.7065 33.8097H11.5643V31.7735H11.8743C12.0104 31.7651 12.1469 31.7831 12.2738 31.8262C12.4008 31.8693 12.5148 31.9364 12.6076 32.0226C12.7998 32.2441 12.9025 32.5137 12.9 32.7903C12.9 33.1287 12.9 33.4355 12.5453 33.6515C12.2898 33.7725 11.9973 33.8284 11.7065 33.8097ZM17.5716 30.6358C17.3943 30.6358 17.2217 30.6468 17.1003 30.6509L16.7249 30.6591H15.4787V37.263H16.9453C17.5059 37.2762 18.0639 37.1944 18.5878 37.0222C19.0094 36.8782 19.3828 36.6461 19.6742 36.3467C19.9576 36.0447 20.161 35.693 20.2702 35.3162C20.3957 34.8896 20.4569 34.4507 20.4523 34.0106C20.4833 33.4908 20.4366 32.9697 20.3133 32.4601C20.1963 32.085 19.9772 31.7393 19.6742 31.4516C19.4365 31.2193 19.1454 31.0319 18.8194 30.9013C18.5395 30.7897 18.245 30.7075 17.9423 30.6564C17.8219 30.6393 17.7 30.6314 17.578 30.633M17.2873 36.0495H17.1275V31.8341H17.1483C17.4776 31.8015 17.8109 31.8526 18.1069 31.9813C18.3236 32.1303 18.5002 32.3181 18.6245 32.5316C18.7587 32.7563 18.836 33.003 18.8514 33.2553C18.8658 33.558 18.8514 33.8056 18.8514 34.0106C18.8579 34.2467 18.8403 34.4829 18.7987 34.7164C18.7494 34.9561 18.6584 35.188 18.5287 35.4043C18.3818 35.6054 18.1834 35.7748 17.9487 35.8996C17.7516 36.0094 17.5182 36.0606 17.2841 36.0454M25.3956 30.6591H21.5132V37.263H23.1556V34.6435H25.2326V33.4163H23.1556V31.8864H25.3924V30.6591" fill="white" />
                                            </svg>


                                            <span className=" text-[12px] text-[#333333] text-center break-all">
                                                {item.fileName.length > 17
                                                    ? `${item.fileName.slice(0, 17)}...`
                                                    : item.fileName}
                                            </span>
                                            <div className="absolute text-[10px] opacity-0 overflow-visible transition-opacity duration-500 group-hover:opacity-100  word-break bottom-[-5px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                                                {item.fileName}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[20px] font-medium text-center w-full py-[24px]">
                                    No Resume Match
                                </div>
                            )}
                            <div className="flex justify-between ">
                                <button className="blue_border_Button px-6 h-[38px] rounded-[30px]">
                                    cancel
                                </button>


                                <button className="bg_Button px-6 h-[38px] rounded-[30px]">
                                    Save
                                </button>

                            </div>

                        </div>
                    </div>
                </>

            }

        </div>
    );
};

export default SelectPostJd;
