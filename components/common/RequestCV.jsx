import React, { useEffect, useState } from "react";

import SelectPostJd from "./SelectPostJd";
import ManualForm from "./ManualForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LimitUsedModal from "../models/limitUsedModal";
import { AnimatePresence, motion } from "framer-motion";
import { setRecallData } from "../../Redux/slices/recallSlice";
import { toast } from "react-toastify";
import MiniLoader1 from "../../components/common/mini-loader";
import { pdfjs } from "react-pdf";
import Docxtemplater from "docxtemplater";
import { updateAiHit } from "../../Redux/slices/aiHitsSlice";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function RequestCV({isCandidate}) {
  const [isResumes, setIsResumes] = useState("post");
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [resumeCount, setResumeCount] = useState(5);
  const [selectedJob, setSelectedJob] = useState();
  const [openParameters, setOpenParamenters] = useState(false);
  const [findMatchLoader, setMatchLoader] = useState(false);
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [limitPopup, setLimitPopup] = useState(false);
  const dispatch = useDispatch();
  const { recallData } = useSelector((state) => state.recall);
  const [loading1, setLoading1] = useState(false);
  const [mainMessage, setMainMessage] = useState("Analyzing Data");
  const [showResume, setShowResume] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [data, setData] = useState({
    jobTitle: "",

    location: [],
    country: [],

    totalExperience: null,

    mustSkills: [],
  });
  const validateFormData = () => {
    const errors = {};

    // if (!data.jobTitle.trim()) errors.jobTitle = "Job title is required";
    // // if (!Array.isArray(data.location) || data.location.length === 0)
    // //   errors.location = "Location is required";
    // if (!Array.isArray(data.country) || data.country.length === 0)
    //   errors.country = "Country is required";
    // // if (!data.totalExperience)
    // //   errors.totalExperience = "Total experience is required";
    if (!Array.isArray(data.mustSkills) || data.mustSkills.length === 0)
      errors.mustSkills = "Must skills are required";

    return Object.keys(errors).length === 0 ? true : errors;
  };

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
  const [parameters, setParameters] = useState([
    {
      label: "Skills and Competencies",
      description:
        "Identify and highlight any skills and competencies in the resume that match the required and preferred skills and competencies in the job description.",
      percentage: 15,
      enabled: true,
    },
    {
      label: "Relevant Experience in the Required Field",
      description:
        "Compare the candidate's experience in the relevant field with the job requirements, noting any areas where the candidate meets, exceeds, or falls short of the required experience.",
      percentage: 15,
      enabled: true,
    },
    {
      label: "Roles and Responsibilities",
      description:
        "Evaluate the roles and responsibilities listed in the candidate's work experience and compare them with those required by the job description.",
      percentage: 15,
      enabled: true,
    },
    {
      label: "Objective and Professional Summary from Resume",
      description:
        "Assess the candidate's objective and professional summary in the resume to determine alignment with the job role and company values.",
      percentage: 10,
      enabled: true,
    },
    {
      label: "Total Experience",
      description:
        "Summarize the candidate's total professional experience, including all relevant fields, and compare it with the job requirements.",
      percentage: 10,
      enabled: true,
    },
    {
      label: "Educational Qualification",
      description:
        "Compare the candidate's educational qualifications with the required and preferred educational background mentioned in the job description.",
      percentage: 10,
      enabled: true,
    },
    {
      label: "Keywords",
      description:
        "Identify any keywords from the job description that are present in the candidate's resume.",
      percentage: 10,
      enabled: true,
    },
    {
      label: "Achievements",
      description:
        "Review the candidate's achievements and assess their relevance and impact in relation to the job role.",
      percentage: 15,
      enabled: true,
    },
  ]);
  const [weightage, setWeightage] = useState(false);
  const [priority, setPriority] = useState(false);
  useEffect(() => {
    const fetchJDParameters = async () => {
      try {
        const data = await axios.get(
          `https://jamblix.com/api/jdParameters/get/${userDataGlobal?._id}`
        );

        if (data?.data?.data?.parameters) {
          const filteredParameters = data.data.data.parameters.filter(
            (param) => param.enabled === true
          );
          setParameters(filteredParameters);
        }
        setPriority(data?.data?.data?.priority);
        setWeightage(data?.data?.data?.weightage);
      } catch (error) {
        console.error("Error loading JD Parameters");
      }
    };
    fetchJDParameters();
  }, [userDataGlobal?._id, openParameters]);

  const JobMatchforSkilotechCollection = async () => {
    if (isResumes !== "post") {
      const validationResult = validateFormData();

      if (validationResult !== true) {
        toast.error("All Fields are required");
        return;
      }
    }
    try {
      if (jdCountMonthly >= jdCountMonthlyLimit) {
        setLimitPopup(true);
        return;
      }

      setMatchLoader(true);

      const outputData = [];

      const response = await axios.post(
        "https://jamblix.com/api/skiloCollection/jobMatching",
        {
          jd: isResumes === "post" ? selectedJob : data,
          resumeCount,
          parameters,
          weightage,
          priority,
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
      const updateJobMatchApiUrl = `https://jamblix.com/api/apiLogs/updateJobMatchCount/${userDataGlobal?._id}`;
      const updateJobMatchResponse = await axios.put(updateJobMatchApiUrl, {
        resumeCount,
      });

      if (!updateJobMatchResponse.data.success) {
        console.error(
          "Error in updateJobMatchCount:",
          updateJobMatchResponse.data.message
        );
      }

      // const jdSubscriptionLimitUrl = `https://jamblix.com/api/subscription/updateAiHits/${userDataGlobal?._id}`;
      // const jdSubscriptionResponse = await axios.put(jdSubscriptionLimitUrl, {
      //   resumeCount,
      // });

      // if (!jdSubscriptionResponse.data.success) {
      //   console.error(
      //     "Error in updateJdSubscriptionLimit:",
      //     jdSubscriptionResponse.data.message
      //   );
      // }
      dispatch(updateAiHit(userDataGlobal?._id));
      setTimeout(() => {
        dispatch(setRecallData(!recallData));
        getLimits();
      }, 1000);

      return {
        updateJobMatchResponse: updateJobMatchResponse.data,
        // jdSubscriptionResponse: jdSubscriptionResponse.data,
      };
    } catch (error) {
      console.error("Something went wrong:", error);
      return { success: false, message: "Something went wrong", error };
    }
  };

  const fetchPDFFromURL = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching file:", error);
      throw new Error("Failed to fetch the PDF file.");
    }
  };
  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const parseData = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type === "application/pdf") {
        const textDataPromises = [];
        const promise = fileToText(file, 1).then((text) => {
          return { text };
        });

        textDataPromises.push(promise);

        Promise.all(textDataPromises)
          .then((results) => {
            resolve(results.filter((result) => result.text.length > 0));
          })
          .catch(reject);
      } else {
        reject(new Error("The provided file is not a PDF."));
      }
    });
  };

  const parsePDFFileFromURL = async (url) => {
    try {
      const file = await fetchPDFFromURL(url);
      const fileObject = new Blob([file], { type: "application/pdf" });

      const data = await parseData(fileObject);
      console.log("Extracted Text:", data);

      return data[0].text;
    } catch (error) {
      console.error("Error processing the PDF:", error);
      return null;
    }
  };

  // const addData = async (files) => {
  //     try {
  //         const uploadPromises = files.map(async (file) => {
  //             const extractedText = await parsePDFFileFromURL(file.file);

  //             const payload = {
  //                 fileName: file?.fileName,
  //                 type: "file",
  //                 userId: userDataGlobal?._id,
  //                 text: extractedText,
  //                 file: file?.file,
  //                 job: isResumes === "post" ? selectedJob : data || "",
  //                 isResumes
  //             };

  //             const response = await axios.post(
  //                 "https://jamblix.com/api/folder/addFileToSkilotechCollection",
  //                 payload,
  //                 {
  //                     headers: {
  //                         "Content-Type": "application/json",
  //                     },
  //                 }
  //             );

  //             // if (response.data.message === "This file is already Saved") {
  //             //     toast.info(`"${file.fileName}" is already saved`);
  //             // } else {
  //             //     toast.success(`"${file.fileName}" successfully saved`);
  //             // }

  //             return response.data;
  //         });

  //         const results = await Promise.all(uploadPromises);
  //         setShowResume(false)
  //         return results;
  //     } catch (error) {
  //         console.error("Error adding files:", error);
  //         toast.error("Failed to save some files");
  //         setShowResume(false)
  //         throw error;
  //     }
  // };

  const addData = async (files) => {
    try {
      if (files.length === 0) return;

      // Ensure folder is created before uploading files
      const firstFile = files[0];
      const extractedText = await parsePDFFileFromURL(firstFile.file);

      const payload = {
        fileName: firstFile?.fileName,
        type: "file",
        userId: userDataGlobal?._id,
        text: extractedText,
        file: firstFile?.file,
        job: isResumes === "post" ? selectedJob : data || "",
        isResumes,
      };

      const folderResponse = await axios.post(
        "https://jamblix.com/api/folder/addFileToSkilotechCollection",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!folderResponse.data.file?.parentId) {
        throw new Error("Folder creation failed");
      }

      const parentId = folderResponse.data.file.parentId;

      const uploadPromises = files.slice(1).map(async (file) => {
        const extractedText = await parsePDFFileFromURL(file.file);
        const payload = {
          fileName: file?.fileName,
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: file?.file,
          job: isResumes === "post" ? selectedJob : data || "",
          isResumes,
          parentId,
        };

        return axios.post(
          "https://jamblix.com/api/folder/addFileToSkilotechCollection",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      });

      const results = await Promise.all(uploadPromises);
      setShowResume(false);
      return results;
    } catch (error) {
      console.error("Error adding files:", error);
      toast.error("Failed to save some files");
      setShowResume(false);
      throw error;
    }
  };

  const handleSaveAll = async () => {
    if (resumeList.length === 0) {
      toast.warn("No resumes to save");
      return;
    }

    try {
      setLoading1(true);
      await addData(resumeList);
      toast.success("All resumes processed successfully");
      setLoading1(false);
    } catch (error) {
      toast.error("Error saving resumes");
      setLoading1(false);
    }
  };

  return (
    <>
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
      {showResume && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white rounded-[12px] p-4 w-[700px] flex flex-col justify-between h-[400px] ">
              {resumeList?.length > 0 ? (
                <div>
                  <div className="text-[16px] font-medium">
                    Matched {resumeList.length} resumes
                  </div>
                  <div className="flex gap-6 flex-wrap">
                    {resumeList?.map((item, index) => (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="w-[88px] flex flex-col gap-[6px] relative group  items-center py-4 min-h-[80px] max-h-[100px] rounded-[8px] cursor-pointer ">
                          <svg
                            className="min-w-[48px] min-h-[48px]"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.2108 0L42.6465 9.96849V47.8763H7.39844V48H42.7669V10.094L33.2108 0Z"
                              fill="#909090"
                            />
                            <path
                              d="M32.6616 0H7.39844V48H42.7669V10.094L32.6616 0Z"
                              fill="#F4F4F4"
                            />
                            <path
                              d="M32.0263 39.4745H5.5V28.4219H32.0263V39.4745Z"
                              fill="#DD2025"
                            />
                            <path
                              d="M32.6562 0V10.1053H42.7615L32.6562 0Z"
                              fill="#AEAEAE"
                            />
                            <path
                              d="M12.0101 30.6536H9.92188V37.2575H11.5707V35.0315L11.935 35.0493C12.2874 35.0441 12.6365 34.9898 12.9687 34.8884C13.2599 34.8021 13.5279 34.6659 13.7563 34.488C13.9871 34.3181 14.1687 34.1042 14.2868 33.8634C14.447 33.4623 14.5043 33.0361 14.4545 32.6142C14.4446 32.3127 14.3832 32.0142 14.2724 31.7281C14.1715 31.5216 14.0219 31.3355 13.8329 31.1815C13.6439 31.0276 13.4198 30.9092 13.1748 30.8339C12.962 30.7672 12.742 30.7188 12.5181 30.6894C12.3495 30.667 12.1807 30.6551 12.0101 30.6536ZM11.7065 33.8097H11.5643V31.7735H11.8743C12.0104 31.7651 12.1469 31.7831 12.2738 31.8262C12.4008 31.8693 12.5148 31.9364 12.6076 32.0226C12.7998 32.2441 12.9025 32.5137 12.9 32.7903C12.9 33.1287 12.9 33.4355 12.5453 33.6515C12.2898 33.7725 11.9973 33.8284 11.7065 33.8097ZM17.5716 30.6358C17.3943 30.6358 17.2217 30.6468 17.1003 30.6509L16.7249 30.6591H15.4787V37.263H16.9453C17.5059 37.2762 18.0639 37.1944 18.5878 37.0222C19.0094 36.8782 19.3828 36.6461 19.6742 36.3467C19.9576 36.0447 20.161 35.693 20.2702 35.3162C20.3957 34.8896 20.4569 34.4507 20.4523 34.0106C20.4833 33.4908 20.4366 32.9697 20.3133 32.4601C20.1963 32.085 19.9772 31.7393 19.6742 31.4516C19.4365 31.2193 19.1454 31.0319 18.8194 30.9013C18.5395 30.7897 18.245 30.7075 17.9423 30.6564C17.8219 30.6393 17.7 30.6314 17.578 30.633M17.2873 36.0495H17.1275V31.8341H17.1483C17.4776 31.8015 17.8109 31.8526 18.1069 31.9813C18.3236 32.1303 18.5002 32.3181 18.6245 32.5316C18.7587 32.7563 18.836 33.003 18.8514 33.2553C18.8658 33.558 18.8514 33.8056 18.8514 34.0106C18.8579 34.2467 18.8403 34.4829 18.7987 34.7164C18.7494 34.9561 18.6584 35.188 18.5287 35.4043C18.3818 35.6054 18.1834 35.7748 17.9487 35.8996C17.7516 36.0094 17.5182 36.0606 17.2841 36.0454M25.3956 30.6591H21.5132V37.263H23.1556V34.6435H25.2326V33.4163H23.1556V31.8864H25.3924V30.6591"
                              fill="white"
                            />
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
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[20px] font-medium text-center w-full py-[24px]">
                  No Resume Match
                </div>
              )}

              <div className="flex justify-between ">
                <button
                  onClick={() => setShowResume(false)}
                  className="blue_border_Button px-6 h-[38px] rounded-[30px]"
                >
                  cancel
                </button>

                {loading1 ? (
                  <button className="blue_border_Button px-6 h-[38px] rounded-[30px] flex items-center justify-center w-[179.97px]">
                    <MiniLoader1 />
                  </button>
                ) : (
                  <button
                    onClick={handleSaveAll}
                    className="bg_Button px-6 h-[38px] rounded-[30px] "
                  >
                    Save to My Collection
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="w-full flex flex-col gap-4  min-h-[calc(95vh-104px)] ">
        <div className={`ml:h-[36px] h-0 ${isCandidate && "hidden"}`}></div>
        <div className="p-4 bg-white rounded-[16px] flex flex-col gap-4 h-full ">
          <div className="bg-[#F9F9F9] scr390:w-[348px] w-[284px] flex rounded-[30px] scr390:text-[14px] text-[10px] font-semibold justify-center">
            <button
              className={`${
                isResumes === "post"
                  ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                  : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%]"
              }`}
              onClick={() => setIsResumes("post")}
            >
              Select Job Post
            </button>
            <button
              className={`${
                isResumes === "manual"
                  ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                  : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%]"
              }`}
              onClick={() => setIsResumes("manual")}
            >
              Manual
            </button>
          </div>

          {isResumes === "post" ? (
            <div>
              <SelectPostJd
                JobMatchforSkilotechCollection={JobMatchforSkilotechCollection}
                setSelectedJob={setSelectedJob}
                selectedJob={selectedJob}
                setResumeCount={setResumeCount}
                resumeCount={resumeCount}
              />
            </div>
          ) : (
            <ManualForm
              data={data}
              setData={setData}
              JobMatchforSkilotechCollection={JobMatchforSkilotechCollection}
              priority={priority}
              weightage={weightage}
              parameters={parameters}
              setResumeCount={setResumeCount}
              resumeCount={resumeCount}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RequestCV;
