import React, { useEffect, useRef, useState } from "react";
import HiringProgress from "../../../components/featured/employer/HiringProgress";
import { useRouter } from "next/router";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import MiniLoader from "../../../components/common/miniLoader";
import ApplicantProfile from "./ApplicantProfile";
import ApplicantDetailsLeftCard from "./ApplicantDetailsLeftCard";
import { useSelector } from "react-redux";
import InlineSVG from "../../../components/common/InlineSvg";

function ApplicantDetails({ setTogglee }) {
  const [toggle, setToggle] = useState("matchingParameters");
  const [activeOption, setActiveOption] = useState("matchingParameters");
  const [jobDetails, setJobDetails] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loadingg, setLoadingg] = useState(true);
  const { id, applicantId,sortValue,currentPage } = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [statusChange, setStatusChange] = useState(false);
  const [successfull, setSuccessfull] = useState();
  const [taskSuccessfull, setTaskSuccessfull] = useState(false);
  const fileExtension = jobDetails?.resumeUrl?.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
  const isPDF = fileExtension === "pdf";
  const isDoc = ["doc", "docx"].includes(fileExtension)
  const getData = async () => {
    try {
      setLoading(true);
      console.log(
        "Requesting applicant details with id:",
        id,
        "applicantId:",
        applicantId
      );

      const response = await axios.get(
        "https://jamblix.com/api/applicantdetails",
        {
          params: { id, applicantId },
        }
      );

      if (response.data) {
        setJobDetails(response?.data?.data);
   
        if (!response.data?.data?.matchingPercentage) {
          setToggle("Resume")
          setActiveOption("Resume")
        }
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        setError("Applicant not found");
      }
    } catch (err) {
      console.log("Error occurred:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && applicantId) {
      getData();


    }
  }, [statusChange]);

  useEffect(() => {
    const fetchData = async () => {
      if (taskSuccessfull) {
        await getData();
        setToggle("HiringProgress");
      }
    };

    fetchData();
  }, [taskSuccessfull]);

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
              onClick={() => router.push(`/common/hiring/JobPost?id=${id}&currentPage=${currentPage}&sortValue=${sortValue}`)}
              className="w-[24px] cursor-pointer"
              src="/images/employer/Icon_left.png"
              alt=""
            />
            <p className="text-[16px]  w-[100%] text-start flex justify-start  font-semibold  ">
              Applicant Details
            </p>
          </div>
          <div className="flex ml:flex-row flex-col gap-5   mb-4 ">
            <ApplicantDetailsLeftCard
              setActiveOption={setActiveOption}
              setToggle={setToggle}
              jobDetails={jobDetails}
              id={id}
              statusChange={statusChange}
              setStatusChange={setStatusChange}
              applicantId={applicantId}
            />
            {jobDetails?.details && (
              <div className=" rounded-[16px] py-2 flex flex-col  scr1024:w-[66.17%] ml:w-[60%] w-[100%] bg-white ">
                <div className="flex flex-col  gap-4 scr1024:px-6 px-2 py-4">
                  <div className="flex flex-col ">
                    <div
                      className={`flex justify-between sm:justify-start   gap-12  ml:text-[16px] sm:text-[14px] text-[12px]   font-semibold overflow-x-auto`}
                    >
                      {/* <div>
                        <p
                          className={` min-w-[121px] ${
                            activeOption === "ApplicantProfile"
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
                      </div> */}
                      {jobDetails?.matchingParameters.length > 0 && (
                        <div>
                          <p
                            className={`min-w-[156px] ${activeOption === "matchingParameters"
                                ? "text-[#333]"
                                : "text-[#646464]"
                              } cursor-pointer `}
                            onClick={() =>
                              handleOptionClick("matchingParameters")
                            }
                          >
                            Matching Parameters
                          </p>
                          <svg
                            className=" ml:w-[175px] sm:w-[120px] w-[100px]"
                            xmlns="http://www.w3.org/2000/svg"
                            height="4"
                            viewBox="0 0 138 4"
                            fill="none"
                          >
                            <path
                              d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                              fill={
                                activeOption === "matchingParameters"
                                  ? "#06A9EF"
                                  : "white"
                              }
                            />
                          </svg>
                        </div>
                      )}
                      {userDataGlobal?.role === "employer" &&
                        jobDetails?.hiringStage !== "Pending" && jobDetails.hiringLevel.length > 0 && (
                          <div>
                            <p
                              className={`min-w-[115px] ${activeOption === "HiringProgress"
                                  ? "text-[#333]"
                                  : "text-[#646464]"
                                } cursor-pointer`}
                              onClick={() =>
                                handleOptionClick("HiringProgress")
                              }
                            >
                              Hiring Process
                            </p>
                            <svg
                              className=" ml:w-[128px] sm:w-[115px] w-[95px]"
                              xmlns="http://www.w3.org/2000/svg"
                              height="4"
                              viewBox="0 0 138 4"
                              fill="none"
                            >
                              <path
                                d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                                fill={
                                  activeOption === "HiringProgress"
                                    ? "#06A9EF"
                                    : "white"
                                }
                              />
                            </svg>
                          </div>
                        )}
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
                {toggle === "ApplicantProfile" && (
                  <ApplicantProfile jobDetails={jobDetails} />
                )}
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
                {toggle === "matchingParameters" && (
                  <div>
                    {jobDetails?.matchingParameters?.map((param, index) => (
                      <div key={index} className="px-6 py-2">
                        <h3 className="text-[16px] font-semibold">
                          {param.title}
                        </h3>
                        <p className="text-[14px] font-normal ">
                          Matching Points: {param.matching_points}
                        </p>
                        <p className="text-[14px] font-normal ">
                          {param.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {toggle === "HiringProgress" && (
                  <HiringProgress
                    hiringData={jobDetails?.hiringLevel}
                    jobDetails={jobDetails}
                    successfull={successfull}
                    setSuccessfull={setSuccessfull}
                    taskSuccessfull={taskSuccessfull}
                    setTaskSuccessfull={setTaskSuccessfull}
                  />
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
