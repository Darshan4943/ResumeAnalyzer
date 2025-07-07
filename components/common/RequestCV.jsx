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
  const router = useRouter()
  const [collection, setCollection] = useState(['MyCollection', 'SkilotechCollection']);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [resumeCount, setResumeCount] = useState(5);
  const [selectedJob, setSelectedJob] = useState();
  const [openParameters, setOpenParamenters] = useState(false);
  const [findMatchLoader, setMatchLoader] = useState(false);
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [limitPopup, setLimitPopup] = useState(false);
  const dispatch = useDispatch();
  const { preferences, jobId } = router.query;
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
  const [limit, setLimit] = useState(50)
  const [miniLoading, setMiniloading] = useState(true);
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);
  const [jobData, setJobData] = useState();
  const [data, setData] = useState({
    jobTitle: "",
    country: [],
    dial_code: [],
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


  useEffect(() => {
    if (preferences && jobId) {
      setIsResumes(true)
      getData()


    }
  }, [preferences, jobId]);

  const getData = async () => {

    setMatchLoader(true);
    await axios
      .get("https://api.skilotech.com/api/job/getById/" + jobId)
      .then((res) => {

        const { applications, ...restData } = res.data;

        setData((prev) => ({
          ...prev,
          dial_code: res.data.dial_code ? res.data.dial_code : [],
          mustSkills: res.data.mustSkills ? res.data.mustSkills : [],
          totalExpMin: !res.data.totalExpMin || res.data.totalExpMin === "null" || res.data.totalExpMin === "undefined" ? "" : res.data.totalExpMin,
          totalExpMax: !res.data.totalExpMax || res.data.totalExpMax === "null" || res.data.totalExpMax === "undefined" ? "" : res.data.totalExpMax,

        }));
        setJobData(res.data);
        setIsResumes(true)
        setReadyToFetch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (readyToFetch) {
      findCandidates(data);
      setReadyToFetch(false);
    }
  }, [readyToFetch]);

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
          `https://api.skilotech.com/api/jdParameters/get/${userDataGlobal?._id}`
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


  const findCandidates = async () => {


    const validationResult = validateFormData();
    if (validationResult !== true) {
      toast.error("All Fields are required");
      return;
    }

    try {
      // if (jdCountMonthly >= jdCountMonthlyLimit) {
      //   setLimitPopup(true);
      //   return;
      // }

      setMatchLoader(true);

      const response = await axios.post(
        "https://api.skilotech.com/api/findCandidates/manual",
        {
          data, filters, collection, userId: userDataGlobal?._id

        }, {
        params: { page, limit },
      }
      );
      setTotalCount(response.data.totalCount);
      setTotalpages(response.data.totalPages);
      setResumeList(response.data.candidates);
      setJobTypeData(response.data.filters);
      setShowResume(true);
      // updateJobMatchLimit();
      setCount(1)
      // setTimeout(() => {
      //   getLimits();
      // }, 5000);
    } catch (error) {
      console.error("Error in JobMatchforSkilotechCollection:", error);
    } finally {
      // setTimeout(() => {
      setMatchLoader(false);
      setMiniloading(false);
      // }, 200);

    }
  };

  useEffect(() => {
    if (isFilterUsed) {
      findCandidates()
    }

  }, [filters, collection]);

  useEffect(() => {
    if (count > 0) {


      findCandidates()
    }

  }, [page, limit]);
  const updateJobMatchLimit = async () => {
    try {
      const updateJobMatchApiUrl = `https://api.skilotech.com/api/apiLogs/updateJobMatchCount/${userDataGlobal?._id}`;
      const updateJobMatchResponse = await axios.put(updateJobMatchApiUrl, {
        resumeCount,
      });

      if (!updateJobMatchResponse.data.success) {
        console.error(
          "Error in updateJobMatchCount:",
          updateJobMatchResponse.data.message
        );
      }

      // const jdSubscriptionLimitUrl = `https://api.skilotech.com/api/subscription/updateAiHits/${userDataGlobal?._id}`;
      // const jdSubscriptionResponse = await axios.put(jdSubscriptionLimitUrl, {
      //   resumeCount,
      // });

      // if (!jdSubscriptionResponse.data.success) {
      //   console.error(
      //     "Error in updateJdSubscriptionLimit:",
      //     jdSubscriptionResponse.data.message
      //   );
      // }
      // dispatch(updateAiHit(userDataGlobal?._id));
      // setTimeout(() => {
      //   dispatch(setRecallData(!recallData));
      //   getLimits();
      // }, 1000);

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
  //                 "https://api.skilotech.com/api/folder/addFileToSkilotechCollection",
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
          "https://api.skilotech.com/api/folder/addFileToSkilotechCollection",
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
          "https://api.skilotech.com/api/folder/addFileToSkilotechCollection",
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
      const response = await axios.get(`https://api.skilotech.com/api/folder/getFolder/${userDataGlobal?._id}`);
      setFolders(response.data.data)
    } catch (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }
  };
  // useEffect(() => {
  //   axios
  //     .get("https://api.skilotech.com/api/candidates/getDistinctCandidateAttributes")
  //     .then((res) => {
  //       setJobTypeData(res.data);

  //     })
  //     .catch((err) => {
  //       console.error(err);

  //     });
  // }, []);

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
      {(showResume || preferences) ? (
        <>
          {expandedUser ?
            <>
              <ApplicantDetails id={expandedUser} setExpandedUser={setExpandedUser} />
            </>
            :



            <div className="relative flex flex-col gap-4">
              <div className="flex gap-4 items-center justify-between  ">
                <div className="flex gap-4 items-center  ">
                  <svg className=" cursor-pointer" onClick={() => router.push("/findCandidates")} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_6706_93858)">
                      <path d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z" fill="#1C1B1F" />
                    </g>
                  </svg>
                  {preferences ?
                    <div className="text-[16px] font-medium flex gap-2 items-center">
                       {totalCount} profiles for {jobData?.jobTitle}
                    </div>
                    :
                    <div className="text-[16px] font-medium flex gap-2 items-center">
                      <svg width="20" height="19" viewBox="0 0 51 47" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      > AI found </span> {totalCount} profiles for {data.mustSkills?.join(", ")}

                    </div>

                  }
                </div>
                {preferences &&
                  <button

                    style={{
                      backgroundColor: "#4C43CD",
                      backgroundImage: `
      radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)
    `,

                    }}
                    onClick={()=>router.push(`/JobMatching/matchJob?selectedJob=${jobId}`)}
                    className={`text-white rounded-[30px] justify-center px-6 flex gap-[10px] items-center text-[12px] font-semibold 
             min-w-[176.24px] h-[38px] transition-all duration-300 ease-in-out  `}
                  >
                    <svg
                      className={`min-w-[20px] transition-all duration-100 `}
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
                    Find with AI Matching
                  </button>
                }
              </div>
              <div className="flex gap-4  relative h-[calc(100vh-60px)] overflow-y-auto scrollbar-hide ">
                <div className="flex flex-col gap-2 sticky top-0 h-[calc(100vh-160px)] overflow-y-auto w-[300px]  min-w-[300px]">
                  {preferences &&
                    <div className="bg-white rounded-[8px] flex flex-col gap-2 p-2">


                      <div className="flex gap-2 items-center font-semibold text-[13px]">
                        <input
                          type="checkbox"
                          className="h-4 w-4 custom-checkbox"
                          checked={collection.includes("MyCollection")}
                          onChange={(e) => {
                            setIsFilterUsed(true)
                            if (e.target.checked) {
                              setCollection([...collection, "MyCollection"]);
                            } else {
                              setCollection(collection.filter((c) => c !== "MyCollection"));
                            }
                          }}
                        />
                        <label>My Collection</label>
                      </div>

                      <div className="flex gap-2 items-center font-semibold text-[13px]">
                        <input
                          type="checkbox"
                          className="h-4 w-4 custom-checkbox"
                          checked={collection.includes("SkilotechCollection")}
                          onChange={(e) => {
                            setIsFilterUsed(true)
                            if (e.target.checked) {
                              setCollection([...collection, "SkilotechCollection"]);
                            } else {
                              setCollection(collection.filter((c) => c !== "SkilotechCollection"));
                            }
                          }}
                        />
                        <label>Skilotech Collection</label>
                      </div>



                    </div>
                  }
                  <div
                    style={{ boxShadow: "0px 0px 14px 0px #00000005", scrollbarWidth: "none" }}
                    className="bg-white   px-4 py-2 rounded-[8px] scr700:flex hidden flex-col gap-4  min-w-[300px]   pb-6 "
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
                </div>
                <ShowCandidates candidates={resumeList} save={save} setLimit={setLimit}
                  jobId={jobId} preferences={preferences}
                  jobData={jobData}
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
            </div>

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
