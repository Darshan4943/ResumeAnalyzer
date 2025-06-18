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
import JdMatchCard from "../../pages/JobMatching/JdMatchCard";
import ShowCandidates from "../../pages/findCandidates/showCandidates";
import { Close_svg } from "../../utils/svg";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function RequestCV({ isCandidate, skilotechCollection }) {
  const [isResumes, setIsResumes] = useState("manual");
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
  const [selectedFolder, setSelectedFolder] = useState()
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [selectFolder, setSelectFolder] = useState(false)
  const [creating, setCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState([])
  const [data, setData] = useState({
    jobTitle: "",


    country: [],

    totalExpMax: "",
    totalExpMin: "",

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

  // const JobMatchforSkilotechCollection = async () => {
  //   if (isResumes !== "post") {
  //     const validationResult = validateFormData();

  //     if (validationResult !== true) {
  //       toast.error("All Fields are required");
  //       return;
  //     }
  //   }
  //   try {
  //     if (jdCountMonthly >= jdCountMonthlyLimit) {
  //       setLimitPopup(true);
  //       return;
  //     }

  //     setMatchLoader(true);

  //     const outputData = [];

  //     const response = await axios.post(
  //       "https://jamblix.com/api/skiloCollection/jobMatching",
  //       {
  //         jd: isResumes === "post" ? selectedJob : data,
  //         resumeCount,
  //         parameters,
  //         weightage,
  //         priority,
  //       }
  //     );

  //     if (Array.isArray(response.data)) {
  //       outputData.push(...response.data);
  //     } else {
  //       outputData.push(response.data);
  //     }

  //     const dataArray = outputData
  //       .filter((item) => item.matching_percentage)
  //       .sort((a, b) => {
  //         const parsePercentage = (percentage) => {
  //           return parseInt(
  //             isNaN(percentage) ? percentage.slice(0, 2) : percentage
  //           );
  //         };
  //         return (
  //           parsePercentage(b.matching_percentage) -
  //           parsePercentage(a.matching_percentage)
  //         );
  //       })
  //       .slice(0, resumeCount);

  //     setResumeList(dataArray);
  //     setShowResume(true);
  //     updateJobMatchLimit();

  //     setTimeout(() => {
  //       getLimits();
  //     }, 5000);
  //   } catch (error) {
  //     console.error("Error in JobMatchforSkilotechCollection:", error);
  //   } finally {
  //     setMatchLoader(false);
  //   }
  // };


  const findCandidates = async () => {
    const validationResult = validateFormData();
    if (validationResult !== true) {
      toast.error("All Fields are required");
      return;
    }

    try {
      if (jdCountMonthly >= jdCountMonthlyLimit) {
        setLimitPopup(true);
        return;
      }

      setMatchLoader(true);

      const response = await axios.post(
        "http://localhost:2000/api/findCandidates/manual",
        {
          data,

        }
      );

      setResumeList(response.data.candidates);
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
      console.log(files);
      if (files.length === 0) return;

      // Ensure folder is created before uploading files
      const firstFile = files[0];
      const extractedText = await parsePDFFileFromURL(firstFile.resumeUrl);
      if (!selectedFolder) {
        const payload = {
          fileName: firstFile?.fileName,
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: firstFile?.resumeUrl,
          job: selectedName,
          isResumes: "createResume",
        };

        var folderResponse = await axios.post(
          "http://localhost:2000/api/folder/addFileToSkilotechCollection",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (!folderResponse.data.file?.parentId) {
          throw new Error("Folder creation failed");
        }

      }


      const parentId = selectedFolder ? selectedFolder : folderResponse.data.file.parentId;

      const uploadPromises = files.slice(1).map(async (file) => {
        const extractedText = await parsePDFFileFromURL(file.resumeUrl);
        const payload = {
          fileName: file?.fileName,
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: file?.resumeUrl,
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
  const save = (candidate) => {
    if (!candidate?._id) return;

    setSelectFolder(true);
    setSelectedCandidates([candidate._id]);
  };


  return (
    <>
      {selectFolder &&

        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white w-[450px] flex flex-col p-6 rounded-[12px]">
              <div className="flex justify-between">
                <p className=" font-semibold">Save to My Collection</p>
                <Close_svg />

              </div>
              <div className="flex items-center gap-2 mt-2">
                {!creating ? (
                  <>
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">Select Existing Folder</label>
                      <select
                        value={selectedFolder}
                        onChange={(e) => setSelectedFolder(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="">-- Select Folder --</option>
                        {folders.map((folder) => (
                          <option key={folder} value={folder}>
                            {folder}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => setCreating(true)}
                      className="mt-6 text-sm font-medium   text-blue rounded min-w-[130px]"
                    >
                      Create Folder
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      <label className="block text-sm  font-medium mb-1">Enter New Folder Name</label>
                      <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="New folder name"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <button
                      onClick={() => setCreating(false)}
                      className="mt-6 text-sm text-blue rounded min-w-[160px]"
                    >
                      Select Existing Folder
                    </button>
                  </>
                )}
              </div>

            </div>


          </div>
        </>

      }
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
      {showResume ? (
        <>
          <ShowCandidates candidates={resumeList} save={save} />
        </>

        // <div className="w-full ml:pt-[52px]">
        //   <JdMatchCard
        //     resumeList={resumeList}
        //     extratctedData={data}
        //     // setTab={setTab}
        //     // setUserDetails={setUserDetails}
        //     // addApplicant={addApplicant}
        //     // hiringLoading={hiringLoading}
        //     // jobData={jobData}
        //     // jdApplicantFileNames={jdApplicantFileNames}
        //     fromSkilotechCollection={true}
        //     // collection={collection}
        //     data={data}
        //     // byMyCollection={byMyCollection}
        //     // setUpdate={setUpdate}
        //     selectedJob={selectedJob}
        //   setSelectedResumes={setSelectedResumes}
        //   selectedResumes={selectedResumes}
        //   select={select}
        //   setSelect={setSelect}
        //   findCandidates={true}
        //   skilotechCollection={skilotechCollection}
        //   />
        // </div>
      ) :

        <div className="p-4 bg-white rounded-[16px] flex flex-col gap-4 h-full ">

          <ManualForm
            data={data}
            setData={setData}
            JobMatchforSkilotechCollection={findCandidates}
            priority={priority}
            weightage={weightage}
            parameters={parameters}
            setResumeCount={setResumeCount}
            resumeCount={resumeCount}
          />

        </div>
      }
    </>
  );
}

export default RequestCV;
