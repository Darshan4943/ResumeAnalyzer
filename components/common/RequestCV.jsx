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
import FolderTreeDropdown from "./folderTree";
import Filter from "../featured/candidate/jobs/Filter";
import { useRouter } from "next/router";
import ApplicantDetails from "../../pages/findCandidates/showProfile";
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
  const [loading, setLoading] = useState(true);
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
  const [filters, setFilters] = useState({});
  const [jobtypeData, setJobTypeData] = useState([]);
  const [isFilterUsed, setIsFilterUsed] = useState(false);
  const [page, setPage] = useState(1);
  const [clear, setClear] = useState(false);
  const [hiddenFilters, setHiddenFilters] = useState({});
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [miniLoading, setMiniloading] = useState(true);
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter()
  const [expandedUser, setExpandedUser] = useState(null);
  const [data, setData] = useState({
    jobTitle: "",


    country: [],

    totalExpMax: "",
    totalExpMin: "",
    otherSkills: [],
    mustSkills: [],
  });

  const toggleFilterVisibility = (filterId) => {
    setHiddenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };
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
    getUserFolders()
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
        "https://jamblix.com/api/findCandidates/manual",
        {
          data, filters,

        }, {
        params: { page, limit },
      }
      );
      setTotalCount(response.data.totalCount);
      setTotalpages(response.data.totalPages);
      setResumeList(response.data.candidates);
      setShowResume(true);
      updateJobMatchLimit();
      setCount(1)
      setTimeout(() => {
        getLimits();
      }, 5000);
    } catch (error) {
      console.error("Error in JobMatchforSkilotechCollection:", error);
    } finally {
      setTimeout(() => {
        setMatchLoader(false);
        setMiniloading(false);
      }, 200);

    }
  };

  useEffect(() => {
    if (isFilterUsed) {
      findCandidates()
    }

  }, [filters]);

  useEffect(() => {
    if (count > 0) {


      findCandidates()
    }

  }, [page, limit]);
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
      console.log(2222, url);
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
    console.log(files);
    try {
      if (!files || files.length === 0) return;
      const firstFile = files[0];
      let parentId;

      let filesToUpload = [...files]; // Default to all files

      // If creating a new folder, first upload one file to create the folder
      if (creating) {

        const extractedText = await parsePDFFileFromURL(firstFile.resumeUrl);

        const payload = {
          fileName: firstFile?.basics.firstName + firstFile?.basics?.lastName + ".pdf",
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: firstFile?.resumeUrl,
          job: newFolderName,
          isResumes: "createResume",
        };

        const folderResponse = await axios.post(
          "https://jamblix.com/api/folder/addFileToSkilotechCollection",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        parentId = folderResponse?.data?.file?.parentId;

        if (!parentId) {
          throw new Error("Folder creation failed. No parentId returned.");
        }

        // Exclude first file from next uploads
        filesToUpload = files.slice(1);
      } else {
        parentId = selectedFolder?._id;
      }

      const uploadPromises = filesToUpload.map(async (file) => {
        const extractedText = await parsePDFFileFromURL(file.resumeUrl);

        const payload = {
          fileName: firstFile?.basics.firstName + firstFile?.basics?.lastName + ".pdf",
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: file?.resumeUrl,
          job: selectedFolder?.name || newFolderName,
          isResumes: "createResume",
          parentId,
        };

        return axios.post(
          "https://jamblix.com/api/folder/addFileToSkilotechCollection",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      });

      const results = await Promise.all(uploadPromises);

      setSelectFolder(false);
      toast.success("Saved to My Collection");

      return results;
    } catch (error) {
      console.error("❌ Error adding files:", error);
      toast.error("Failed to save some files");
      setSelectFolder(false);
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
    setSelectedCandidates([candidate]);
  };
  const allSave = () => {


    setSelectFolder(true);

  };
  const saveResume = async () => {
    await addData(selectedCandidates);
  };


  const getUserFolders = async () => {
    try {
      const response = await axios.get(`https://jamblix.com/api/folder/getFolder/${userDataGlobal?._id}`);
      setFolders(response.data.data)
    } catch (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }
  };
  useEffect(() => {
    axios
      .get("https://jamblix.com/api/candidates/getDistinctCandidateAttributes")
      .then((res) => {
        setJobTypeData(res.data);

      })
      .catch((err) => {
        console.error(err);

      });
  }, []);

  const handleDropdownClick = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  const handleCheckboxChange = (e, filterType, value) => {
    setIsFilterUsed(true);
    if (e === null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [],
      }));
      setClear(false);
    } else {
      const isChecked = e.target.checked;
      setFilters((prevFilters) => {
        const currentFilter = Array.isArray(prevFilters[filterType])
          ? prevFilters[filterType]
          : [];

        return {
          ...prevFilters,
          [filterType]: isChecked
            ? [...currentFilter, value]
            : currentFilter.filter((item) => item !== value),
        };
      });
    }
  };

  const inputData = [
    // {
    //   title: "Gender",
    //   img: "/images/filter/gender.png",
    //   child: ["Male", "Female"],
    // },
    // {
    //   title: "Marital Status",
    //   img: "/images/filter/married.png",
    //   child: ["Married", "Unmarried"],
    // },
    {
      title: "Current Location",
      img: "/images/filter/location.png",
      child: jobtypeData?.locations || [],
    },
    {
      title: "Experience (Years)",
      img: "/images/filter/experience.png",
      child: jobtypeData?.experienceYears
        ? jobtypeData.experienceYears.sort((a, b) => a - b)
        : [],
    },
    {
      title: "Education Level",
      img: "/images/filter/education.png",
      child: jobtypeData?.educationLevels || [],
    },
    // {
    //   title: "Education Stream",
    //   img: "/images/filter/stream.png",
    //   child: jobtypeData?.educationStreams || [],
    // },
    // {
    //   title: "Preferred Department",
    //   img: "/images/filter/department.png",
    //   child: jobtypeData?.preferredDepartments || [],
    // },
    {
      title: "Preferred Job Role",
      img: "/images/filter/jobrole.png",
      child: jobtypeData?.preferredJobRoles || [],
    },
    {
      title: "Preferred Location",
      img: "/images/filter/location.png",
      child: jobtypeData?.preferredLocations || [],
    },
  ];


  const sanitizedInputData = inputData.map((item) => ({
    ...item,
    child: Array.isArray(item.child)
      ? item.child.filter((c) => {
        if (c == null) return false; // no nulls
        if (typeof c === "string") return c.trim() !== "";
        if (typeof c === "object") return c.label && c.label.trim() !== "";
        return false;
      })
      : [],
  }));

  // ✅ Then do the existing filter
  const filteredInputData = sanitizedInputData.filter(
    (item) => item.child.length > 0
  );


  console.log(expandedUser);


  return (
    <div className="min-h-[100vh]">
      {selectFolder &&

        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white w-[450px] flex flex-col p-4  gap-2 rounded-[12px]">
              <div className="flex justify-between">
                <p className=" font-semibold">Save to My Collection</p>
                <div className=" cursor-pointer" onClick={() => setSelectFolder(false)}>
                  <Close_svg />
                </div>


              </div>
              <div className="flex items-center gap-4 mt-2">
                {!creating ? (
                  <>
                    <div className="w-full flex flex-col gap-2">
                      <label className="block text-sm font-medium mb-1">Select Existing Folder</label>
                      <FolderTreeDropdown
                        folders={folders}
                        selectedFolder={selectedFolder}
                        setSelectedFolder={setSelectedFolder}
                      />
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
                    <div className="w-full flex flex-col gap-2">
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
              <div className="flex  justify-end">
                <button disabled={(creating && !newFolderName) || (!creating && !selectedFolder)} onClick={() => saveResume()} className={`flex justify-center rounded-[30px] items-center h-[36px] px-6 bg_Button ${((creating && !newFolderName) || (!creating && !selectedFolder)) && "opacity-50"}`}>
                  Save
                </button>
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
            <div className="relative earth_loader flex flex-col items-center justify-center gap-[24px] ">
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
          {expandedUser ?
            <>
              <ApplicantDetails id={expandedUser} setExpandedUser={setExpandedUser} />
            </>
            :



            <>
              <div className="flex gap-4 items-center">
                <svg className=" cursor-pointer" onClick={() => router.push("/findCandidates")} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g mask="url(#mask0_6706_93858)">
                    <path d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z" fill="#1C1B1F" />
                  </g>
                </svg>
                <div className="text-[16px] font-medium flex gap-2 items-center"> <svg width="20" height="19" viewBox="0 0 51 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z" fill="#4C43CD" />
                  <path d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z" fill="url(#paint0_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z" fill="url(#paint1_radial_10719_124238)" />
                  <path d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z" fill="#4C43CD" />
                  <path d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z" fill="url(#paint2_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z" fill="url(#paint3_radial_10719_124238)" />
                  <path d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z" fill="#4C43CD" />
                  <path d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z" fill="url(#paint4_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z" fill="url(#paint5_radial_10719_124238)" />
                  <path d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z" fill="#4C43CD" />
                  <path d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z" fill="url(#paint6_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z" fill="url(#paint7_radial_10719_124238)" />
                  <path d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z" fill="#4C43CD" />
                  <path d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z" fill="url(#paint8_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z" fill="url(#paint9_radial_10719_124238)" />
                  <path d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z" fill="#4C43CD" />
                  <path d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z" fill="url(#paint10_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z" fill="url(#paint11_radial_10719_124238)" />
                  <path d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z" fill="#4C43CD" />
                  <path d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z" fill="url(#paint12_radial_10719_124238)" fill-opacity="0.7" />
                  <path d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z" fill="url(#paint13_radial_10719_124238)" />
                  <defs>
                    <radialGradient id="paint0_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.4751 16.3802) rotate(51.0326) scale(22.4064 22.4083)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint1_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(34.4709 34.1719) rotate(-93.672) scale(22.8425 25.4693)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint2_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.2344 3.22223) rotate(51.0615) scale(11.7843 11.7828)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint3_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46.6419 12.5834) rotate(-93.6682) scale(12.0186 13.3869)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint4_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.70314 9.49373) rotate(51.0429) scale(11.7796 11.7797)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint5_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.1106 18.8486) rotate(-93.6706) scale(12.0106 13.3869)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint6_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.7969 35.8785) rotate(51.0616) scale(11.7843 11.7828)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint7_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48.2044 45.2396) rotate(-93.6682) scale(12.0186 13.3869)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint8_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(44.1445 23.349) rotate(51.0706) scale(7.44729 7.44581)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint9_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49.4567 29.2656) rotate(-93.667) scale(7.59628 8.45843)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint10_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.0452 37.8958) rotate(51.0429) scale(7.4502 7.45026)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint11_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.3627 43.8125) rotate(-93.6706) scale(7.59631 8.46675)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint12_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.3617 1.73244) rotate(51.0052) scale(6.16551 6.1673)">
                      <stop stop-color="white" stop-opacity="0.59" />
                      <stop offset="0.697917" stop-color="white" stop-opacity="0" />
                      <stop offset="1" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                    <radialGradient id="paint13_radial_10719_124238" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.7658 6.62625) rotate(-93.6756) scale(6.28312 7.01245)">
                      <stop stop-opacity="0.23" />
                      <stop offset="0.861815" stop-opacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                  <span style={{
                    background: `linear-gradient(0deg, #4C43CD, #4C43CD),
                 radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
                 radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                  > AI found </span> {totalCount} profiles for {data.mustSkills?.join(", ")}</div>



              </div>
              <div className="flex gap-4 pt-4 relative h-[calc(100vh-60px)] overflow-y-auto scrollbar-hide">
                <div
                  style={{ boxShadow: "0px 0px 14px 0px #00000005", scrollbarWidth: "none" }}
                  className="bg-white w-[300px]  px-4 py-2 rounded-[8px] scr700:flex hidden flex-col gap-4  min-w-[300px] sticky top-0  h-[calc(100vh-60px)] overflow-y-auto  pb-6 "
                >
                  <div className="flex justify-between   items-center  py-2 border-b border-[#AFAFAF80] ">
                    <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                      All Filters
                    </p>

                    <button
                      onClick={() => {
                        setFilters({});
                        setClear(!clear);
                      }}
                      className="text-primary font-montserrat text-sm font-medium text-blue"
                    >
                      Reset all
                    </button>
                  </div>

                  {filteredInputData.map((item, index) => (
                    <Filter
                      key={index}
                      item={item}
                      filterType={item.title.replace(/ /g, "")}
                      setClear={setClear}
                      clear={clear}
                      onChange={handleCheckboxChange}

                      page={page}
                      filters={filters}
                      loading={loading}

                      setLoading={setLoading}
                      className="text-[14px] font-medium flex items-center w-auto bg-white "
                      isOpen={openDropdown === index}
                      onDropdownClick={handleDropdownClick}
                      id={index}
                      isHidden={hiddenFilters[index] || false}
                      toggleVisibility={toggleFilterVisibility}
                    />
                  ))}
                </div>
                <ShowCandidates candidates={resumeList} save={save} setLimit={setLimit}
                  limit={limit}
                  setTotalpages={setTotalpages}
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                  data={data}
                  setMiniloading={setMiniloading}
                  miniLoading={miniLoading}
                  setCurrentPage={setPage}
                  totalCount={totalCount}
                  setSelectedCandidates={setSelectedCandidates}
                  selectedCandidates={selectedCandidates}
                  allSave={allSave}
                  expandedUser={expandedUser}
                  setExpandedUser={setExpandedUser}
                />
              </div>
            </>

          }
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
    </div>
  );
}

export default RequestCV;
