import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";


import { useSelector } from "react-redux";

import MiniLoader from "../../components/common/miniLoader";
import ApplicantDetailsLeftCard from "../common/hiring/ApplicantDetailsLeftCard";
import ApplicantProfile from "../common/hiring/ApplicantProfile";
import InlineSVG from "../../components/common/InlineSvg";
import CandidateDetails from "./profileView";

function ApplicantDetails({ id, setExpandedUser }) {
    const [toggle, setToggle] = useState("Resume");
    const [activeOption, setActiveOption] = useState("Resume");
    const [jobDetails, setJobDetails] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [loadingg, setLoadingg] = useState(true);
    // const { id, applicantId } = router.query;
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [statusChange, setStatusChange] = useState(false);
    const [successfull, setSuccessfull] = useState();
    const [taskSuccessfull, setTaskSuccessfull] = useState(false);
    const fileExtension = jobDetails?.resumeUrl?.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";
    const isDoc = ["doc", "docx"].includes(fileExtension)

    console.log(jobDetails);
    const getCandidateByUserId = async () => {
        try {
            const response = await axios.get(`https://api.skilotech.com/api/candidate/profile/${id}`);
            setJobDetails(response.data.user);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response) {
                console.error(`Error ${error.response.status}:`, error.response.data?.message || error.message);
            } else if (error.request) {
                console.error("No response received from server:", error.request);
            } else {
                console.error("Error:", error.message);
            }
        }
    };
    const updateViewCount = async () => {
        try {
            const response = await axios.put(`https://api.skilotech.com/api/candidates/${id}/updateViewCount`);
            console.log('Updated view count successfully:', response.data.candidate);
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };

    useEffect(() => {
        if (id) {
            updateViewCount();


        }
    }, []);
    useEffect(() => {
        if (id) {
            getCandidateByUserId();


        }
    }, [statusChange]);


    const handleOptionClick = (option) => {
        setActiveOption(option);
        setToggle(option);
    };

    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
        const [numPages, setNumPages] = useState(null);
        const onDocumentLoadSuccess = ({ numPages }) => {
            setNumPages(numPages);
            setTimeout(() => {
                setLoadingg(false);
            }, 1000);
        };

        return (
            <div
                style={{
                    // width: "168px",
                    // height: "192px",
                    border: "1px solid #06A9EF",
                    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    // overflow: "hidden",
                    width: "600px",
                    height: "772px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                }}
            >
                {loadingg && (
                    <div className="skeleton-loader1  ">
                        <div className="skeleton-image1"></div>
                        <div className="skeleton-text1">
                            <div className="skeleton-title1"></div>
                            <div className="skeleton-subtitle1"></div>
                            <div className="skeleton-line1"></div>
                            <div className="skeleton-line1 short"></div>
                            <div className="skeleton-line1 shorter"></div>
                        </div>
                    </div>
                )}

                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {!loadingg &&
                        Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                </Document>
            </div>
        );
    };
    const DocumentViewer = ({ fileUrl }) => {
        const [loading, setLoading] = useState(true);


        return (
            <div className="relative w-full flex flex-col items-center">
                {loading && (
                    <div className=" inset-0 flex items-center w-full justify-center bg-gray-100 h-[600px]">
                        <MiniLoader />
                    </div>
                )}
                <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                    className="w-[80%] h-[700px]"
                    onLoad={() => setLoading(false)}
                />
            </div>
        );
    };
    const downloadResume = (url) => {
        return () => {
            if (!url) return alert("Resume URL not found!");

            const link = document.createElement("a");
            link.href = url;
            link.download = "";
            // link.target = "_blank"; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    const getTotalExperience = (candidate) => {
        const jobs = candidate?.workExperiance || [];

        let totalMonths = 0;

        jobs.forEach(job => {
            const start = job?.jobDuration?.startDate;
            const end = job?.jobDuration?.endDate;
            const isCurrent = job?.isCurrent;

            if (!start?.year || !start?.month) return;

            const startDate = new Date(start.year, start.month - 1);
            const endDate = isCurrent
                ? new Date()
                : end?.year && end?.month
                    ? new Date(end.year, end.month - 1)
                    : new Date();

            const months =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());

            totalMonths += Math.max(0, months);
        });

        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        return totalMonths > 0 ? `${years}y ${months}m` : "Fresher";
    };

    const currentJob = jobDetails?.workExperiance?.find((exp) => exp.isCurrent);

    return (
        <div>
            {loading ? (
                <MiniLoader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="flex flex-col gap-[8px] relative ">
                    <div className=" flex w-full gap-2 justify-between rounded-[16px] items-center">
                        <img
                            onClick={() => setExpandedUser()}
                            className="w-[24px] cursor-pointer"
                            src="/images/employer/Icon_left.png"
                            alt=""
                        />
                        <p className="text-[16px]  w-[100%] text-start flex justify-start  font-semibold  ">
                            Applicant Details
                        </p>
                    </div>
                    <div className="flex ml:flex-row flex-col gap-5   mb-4 ">
                        <div className=" rounded-[16px] py-2 flex flex-col  scr1024:w-[40%] ml:w-[40%] w-[100%] bg-white ">
                            {jobDetails && (
                                <div className="flex flex-col overflow-y-auto gap-6 px-2 scr500:px-6 py-2 scr500:py-4">
                                    <div className=" flex gap-2 scr500:gap-6">
                                        <img
                                            src="/images/employer/profileNew.png"
                                            alt=""
                                            className="h-[96px] w-[96px]"
                                        />
                                        <div className="w-[65%] flex flex-col gap-1">
                                            <p className="text-[20px] scr500:text-[24px]   text-start   font font-medium  ">
                                                {jobDetails?.basics?.firstName}{" "}
                                                {jobDetails?.basics?.lastName}
                                            </p>

                                            <p className="text-[16px]   text-start text-[#646464]   font-normal  ">
                                                {currentJob?.jobTitle} at {currentJob?.companyName}
                                            </p>

                                        </div>
                                    </div>




                                    <div className="min-h-[1px] bg-[#D6DDEB]"></div>
                                    <div className="flex flex-col gap-4 text-[14px] font-normal">
                                        <p className="font-[600] text-[16px] text-[#333333]">Contact</p>
                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4754_62190)">
                                                    <path
                                                        d="M4.3077 19.5C3.80257 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.3077C2.5 5.80257 2.675 5.375 3.025 5.025C3.375 4.675 3.80257 4.5 4.3077 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80257 21.5 6.3077V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.3077ZM12 12.5576L3.99998 7.44225V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H19.6923C19.782 18 19.8557 17.9711 19.9134 17.9134C19.9711 17.8557 20 17.782 20 17.6923V7.44225L12 12.5576ZM12 11L19.8461 5.99998H4.15383L12 11ZM3.99998 7.44225V5.99998V17.6923C3.99998 17.782 4.02883 17.8557 4.08653 17.9134C4.14423 17.9711 4.21795 18 4.3077 18H3.99998V7.44225Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>
                                            <p>{jobDetails?.basics?.email}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4754_62195)">
                                                    <path
                                                        d="M19.4403 20.5C17.5557 20.5 15.6625 20.0618 13.7606 19.1855C11.8586 18.3092 10.1112 17.073 8.51828 15.4769C6.92533 13.8807 5.69071 12.1333 4.81442 10.2346C3.93814 8.33588 3.5 6.44423 3.5 4.55963C3.5 4.25688 3.6 4.00458 3.8 3.80275C4 3.60092 4.25 3.5 4.55 3.5H7.8115C8.06407 3.5 8.28683 3.58238 8.47977 3.74713C8.67272 3.91188 8.79548 4.1154 8.84803 4.3577L9.4211 7.29998C9.46085 7.57306 9.45252 7.80768 9.3961 8.00383C9.3397 8.19998 9.23842 8.36472 9.09225 8.49805L6.78265 10.7461C7.15445 11.4269 7.57913 12.0708 8.0567 12.6779C8.53427 13.2849 9.05125 13.8647 9.60765 14.4173C10.1564 14.966 10.7397 15.4756 11.3577 15.9462C11.9756 16.4167 12.6429 16.8545 13.3596 17.2596L15.6038 14.9962C15.7602 14.8333 15.9497 14.7192 16.1721 14.6539C16.3945 14.5885 16.6256 14.5724 16.8654 14.6058L19.6423 15.1712C19.8948 15.2378 20.1009 15.3667 20.2605 15.5577C20.4201 15.7487 20.5 15.9654 20.5 16.2077V19.45C20.5 19.75 20.399 20 20.1972 20.2C19.9954 20.4 19.7431 20.5 19.4403 20.5ZM6.07305 9.32693L7.85768 7.61923C7.88973 7.59358 7.91056 7.55832 7.92018 7.51345C7.92979 7.46857 7.92819 7.4269 7.91538 7.38845L7.48075 5.15383C7.46793 5.10254 7.4455 5.06408 7.41345 5.03845C7.3814 5.0128 7.33973 4.99998 7.28845 4.99998H5.14997C5.11152 4.99998 5.07948 5.0128 5.05383 5.03845C5.02818 5.06408 5.01535 5.09613 5.01535 5.1346C5.06663 5.81793 5.17849 6.51217 5.35092 7.2173C5.52337 7.92243 5.76408 8.62564 6.07305 9.32693ZM14.773 17.9692C15.4359 18.2782 16.1272 18.5144 16.8471 18.6779C17.567 18.8413 18.2397 18.9384 18.8654 18.9692C18.9038 18.9692 18.9359 18.9564 18.9615 18.9308C18.9872 18.9051 19 18.873 19 18.8346V16.7308C19 16.6795 18.9872 16.6378 18.9615 16.6057C18.9359 16.5737 18.8974 16.5512 18.8461 16.5384L16.7461 16.1115C16.7077 16.0987 16.674 16.0971 16.6452 16.1067C16.6163 16.1163 16.5859 16.1372 16.5538 16.1692L14.773 17.9692Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>
                                            <p>{jobDetails?.basics?.mobileNo}</p>
                                        </div>
                                        {jobDetails?.basics?.currentLocation && (
                                            <div className="flex gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <g mask="url(#mask0_4754_62200)">
                                                        <path
                                                            d="M12.0029 11.8654C12.5005 11.8654 12.9258 11.6882 13.279 11.3339C13.6322 10.9795 13.8089 10.5536 13.8089 10.056C13.8089 9.55839 13.6317 9.133 13.2774 8.7798C12.923 8.4266 12.4971 8.25 11.9995 8.25C11.5019 8.25 11.0765 8.42717 10.7233 8.7815C10.3701 9.13583 10.1935 9.56179 10.1935 10.0594C10.1935 10.557 10.3707 10.9824 10.725 11.3356C11.0793 11.6888 11.5053 11.8654 12.0029 11.8654ZM12.0012 19.5135C13.9576 17.7622 15.4547 16.0824 16.4925 14.474C17.5303 12.8657 18.0492 11.457 18.0492 10.2481C18.0492 8.42498 17.4701 6.92627 16.3117 5.7519C15.1534 4.57753 13.7166 3.99035 12.0012 3.99035C10.2858 3.99035 8.84893 4.57753 7.6906 5.7519C6.53227 6.92627 5.9531 8.42498 5.9531 10.2481C5.9531 11.457 6.47201 12.8657 7.50983 14.474C8.54766 16.0824 10.0448 17.7622 12.0012 19.5135ZM12.0012 21.5096C9.48452 19.3288 7.59735 17.2993 6.33965 15.4211C5.08197 13.5429 4.45312 11.8186 4.45312 10.2481C4.45312 7.94038 5.1996 6.07213 6.69255 4.64328C8.18548 3.21443 9.95502 2.5 12.0012 2.5C14.0473 2.5 15.8169 3.21443 17.3098 4.64328C18.8027 6.07213 19.5492 7.94038 19.5492 10.2481C19.5492 11.8186 18.9204 13.5429 17.6627 15.4211C16.405 17.2993 14.5178 19.3288 12.0012 21.5096Z"
                                                            fill="#333333"
                                                        />
                                                    </g>
                                                </svg>
                                                <p>{jobDetails?.basics?.currentLocation}</p>
                                            </div>
                                        )}


                                        <div className="flex gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <g mask="url(#mask0_4754_62210)">
                                                    <path
                                                        d="M4.3077 20.5C3.80257 20.5 3.375 20.325 3.025 19.975C2.675 19.625 2.5 19.1975 2.5 18.6923V8.30777C2.5 7.80264 2.675 7.37507 3.025 7.02507C3.375 6.67507 3.80257 6.50007 4.3077 6.50007H8.5V4.8078C8.5 4.30268 8.675 3.87512 9.025 3.52512C9.375 3.17512 9.80257 3.00012 10.3077 3.00012H13.6923C14.1974 3.00012 14.625 3.17512 14.975 3.52512C15.325 3.87512 15.5 4.30268 15.5 4.8078V6.50007H19.6923C20.1974 6.50007 20.625 6.67507 20.975 7.02507C21.325 7.37507 21.5 7.80264 21.5 8.30777V18.6923C21.5 19.1975 21.325 19.625 20.975 19.975C20.625 20.325 20.1974 20.5 19.6923 20.5H4.3077ZM9.99998 6.50007H14V4.8078C14 4.73086 13.9679 4.66035 13.9038 4.59625C13.8397 4.53213 13.7692 4.50007 13.6923 4.50007H10.3077C10.2308 4.50007 10.1602 4.53213 10.0961 4.59625C10.032 4.66035 9.99998 4.73086 9.99998 4.8078V6.50007ZM20 14.75H14.5V16.5H9.5V14.75H3.99998V18.6923C3.99998 18.7693 4.03202 18.8398 4.09613 18.9039C4.16024 18.968 4.23077 19 4.3077 19H19.6923C19.7692 19 19.8397 18.968 19.9038 18.9039C19.9679 18.8398 20 18.7693 20 18.6923V14.75ZM11 15H13V13H11V15ZM3.99998 13.2501H9.5V11.5001H14.5V13.2501H20V8.30777C20 8.23084 19.9679 8.16031 19.9038 8.0962C19.8397 8.0321 19.7692 8.00005 19.6923 8.00005H4.3077C4.23077 8.00005 4.16024 8.0321 4.09613 8.0962C4.03202 8.16031 3.99998 8.23084 3.99998 8.30777V13.2501Z"
                                                        fill="#333333"
                                                    />
                                                </g>
                                            </svg>

                                            <p>
                                                {getTotalExperience(jobDetails)}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-4 text-[16px] font-normal  overflow-y-auto">

                                            <div className="flex flex-col gap-4">

                                                {jobDetails?.summary && (
                                                    <div className="flex flex-col gap-2  w-[100%]">
                                                        <p className=" font-medium text-[14px] ">Work summary </p>
                                                        <div className="flex flex-col gap-4 text-[12px] font-normal">
                                                            <p>{jobDetails?.summary}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex  gap-4 flex-col justify-between">
                                                    {jobDetails?.workExperiance?.company ? (
                                                        <div className="flex flex-col gap-4 w-[100%]">
                                                            {jobDetails?.workExperiance?.currentJob && (
                                                                <div>
                                                                    <p className="text-[14px] font-medium">Current Job</p>
                                                                    <p className="text-[12px] font-normal">
                                                                        {jobDetails?.details?.professional?.currentJob?.company}
                                                                    </p>
                                                                    <p className="text-[12px] font-normal">
                                                                        {jobDetails?.details?.professional?.currentJob?.title}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {jobDetails?.details?.professional?.hightestQul && (
                                                                <div>
                                                                    <p className="text-[14px] font-medium">
                                                                        Highest Qualification
                                                                    </p>
                                                                    <p className="text-[12px] font-normal">
                                                                        {jobDetails?.details?.professional?.hightestQul}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : null}

                                                    <div className="flex flex-col gap-4  w-[100%]">
                                                        {jobDetails?.details?.professional?.totalExperience && (
                                                            <div>
                                                                <p className="text-[14px]  font-medium">Experience in Years</p>
                                                                <p className="text-[12px] font-normal">
                                                                    {jobDetails?.details?.professional?.totalExperience}
                                                                </p>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CandidateDetails jobDetails={jobDetails} />
                                </div>
                            )}
                        </div>
                        {jobDetails && (
                            <div className=" rounded-[16px] py-2 flex flex-col  scr1024:w-[60%] ml:w-[60%] w-[100%] bg-white ">
                                <div className="flex flex-col  gap-4 scr1024:px-6 px-2 py-4">
                                    <div className="flex flex-col ">
                                        <div
                                            className={`flex justify-between sm:justify-start   gap-12  ml:text-[16px] sm:text-[14px] text-[12px]   font-semibold overflow-x-auto`}
                                        >
                                            {/* <div>
                                                <p
                                                    className={` min-w-[121px] ${activeOption === "ApplicantProfile"
                                                            ? "text-[#333]"
                                                            : "text-[#646464]"
                                                        } cursor-pointer `}
                                                    onClick={() => handleOptionClick("ApplicantProfile")}
                                                >
                                                    Applicant Profile
                                                </p>
                                                <svg
                                                    className=" ml:w-[138px] sm:w-[120px] w-[100px]"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="4"
                                                    viewBox="0 0 138 4"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                                                        fill={
                                                            activeOption === "ApplicantProfile"
                                                                ? "#06A9EF"
                                                                : "white"
                                                        }
                                                    />
                                                </svg>
                                            </div>
 */}

                                            <div>
                                                <p
                                                    className={` min-w-[60px] ${activeOption === "Resume"
                                                        ? "text-[#333]"
                                                        : "text-[#646464]"
                                                        } cursor-pointer`}
                                                    onClick={() => handleOptionClick("Resume")}
                                                >
                                                    Resume
                                                </p>
                                                <svg
                                                    className=" ml:w-[69px] sm:w-[60px] w-[50px]"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="4"
                                                    viewBox="0 0 69 4"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H64.5C66.7091 0 68.5 1.79086 68.5 4H0.5Z"
                                                        fill={
                                                            activeOption === "Resume" ? "#06A9EF" : "white"
                                                        }
                                                    />
                                                </svg>
                                            </div>

                                        </div>
                                        <div className="h-[1px] bg-[#D6DDEB]"></div>
                                    </div>
                                </div>
                                {/* {toggle === "ApplicantProfile" && (
                                    <>

<CandidateDetails jobDetails={jobDetails} />
                                    </>
                                )} */}
                                {toggle === "Resume" && (
                                    <div onClick={downloadResume(jobDetails?.resumeUrl)} className=" flex items-center justify-center py-[16px] resumes2 cursor-pointer ">

                                        {isImage ? (
                                            <img
                                                src={userDetails?.file}
                                                alt="Uploaded Document"
                                                className="max-w-full max-h-full object-contain rounded-lg"
                                            />
                                        ) : isPDF ? (

                                            <PdfViewer
                                                pdfUrl={jobDetails?.resumeUrl}
                                                loadingg={loadingg}
                                                setLoadingg={setLoadingg}
                                            />

                                        ) : isDoc ? (
                                            <DocumentViewer fileUrl={jobDetails?.resumeUrl} />


                                        ) : (
                                            <InlineSVG imageUrl={jobDetails?.resumeUrl} />
                                        )}
                                    </div>
                                )}


                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplicantDetails;
