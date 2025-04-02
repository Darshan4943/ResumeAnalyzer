import React, { useEffect, useReducer, useRef, useState } from "react";
import InternalJobMatching from "../../components/featured/jobMatching/internal";
import ExternalJobMatching from "../../components/featured/jobMatching/external";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DocSVG, PDFSvg, SearchIcon } from "../../utils/svg";
import { useRouter } from "next/router";
import JdFiles from "../../components/featured/candidate/createResume/components/JdFiles";
import JdMatching from "../../components/featured/candidate/createResume/components/JdMatching";
import JdDescription from "../../components/featured/candidate/createResume/components/JdDescription";
import EarthLoader from "../../components/common/EarthLoader";
import Tesseract from "tesseract.js";
import { pdfjs } from "react-pdf";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { toast } from "react-toastify";
import ExtraSectionForm from "../recruiter/jdMatching/ExtraSectionForm";
import JdMatchingsideBar from "../recruiter/jdMatching/JdMatchingsideBar";
import { AnimatePresence, motion } from "framer-motion";
import LimitUsedModal from "../../components/models/limitUsedModal";
import SelectPost from "./selectPost";
import JdMatchCard from "./JdMatchCard";
import ApplicantDetails from "./ApplicantDetails";
import { setRecallData } from "../../Redux/slices/recallSlice";
import JdParameters from "../../components/common/jdParameters";

const MatchJob = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { recallData } = useSelector((state) => state.recall);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const [files, setFiles] = useState([]);
  const { clientId, selectedJob, data } = router.query;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesFileTypes, setSelectedIndexesFilesType] = useState([]);
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState();
  const [isCollection, setIsCollection] = useState();
  const [isSkilotechCollection, setIsSkilotechCollection] = useState();
  const [showMatchingSidebar, setShowsideBar] = useState(false);
  const [extratctedData, setExtractedData] = useState(null);
  const [btnToggle, setButtonToggle] = useState(false);
  const sidebarRef = useRef(null);
  const [isEdit, setIsEdit] = useState();
  const [editId, setEditId] = useState(null);
  const [ShowForm, setShowForm] = useState(false);
  // const [message, setMessage] = useState("Analyzing Data, Please wait");
  const [mainMessage, setMainMessage] = useState("Analyzing Data");
  const [findMatchLoader, setMatchLoader] = useState(false);
  const taskRef = useRef(null);
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [openParameters, setOpenParamenters] = useState(false);
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [limitPopup, setLimitPopup] = useState(false);
  const [tab, setTab] = useState(0);
  const [update, setUpdate] = useState();
  const [isMatched, setIsMatched] = useState(false);
  const [parentId, setParentId] = useState();
  const [fileName, setFileName] = useState();
  const [userDetails, setUserDetails] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [hiringLoading, setHiringLoading] = useState("");
  const [jdApplicantFileNames, setJdApplicantFilename] = useState([]);
  const [jobData, setJobData] = useState();
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [fromSkilotechCollection, setFromSkilotechCollection] = useState(false);
  const [byMyCollection, setMatchByCOllection] = useState(false);
  const [select, setSelect] = useState(false);
  localStorage.setItem("selectedIndexes", "");
  localStorage.setItem("selectedIndexesFileType", "");

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

  // useEffect(() => {
  //   if (data) {
  //     const dataa = JSON.parse(decodeURIComponent(data));
  //     setExtractedData(dataa);
  //   }
  // }, [data]);
  useEffect(() => {
    if (data) {
      try {
        const decodedData = typeof data === "string" ? data : JSON.stringify(data);
        console.log(222, decodedData);
        const parsedData = JSON.parse(decodedData);
        setExtractedData(parsedData);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [data]);
  
  

  useEffect(() => {
    const fetchJDParameters = async () => {
      try {
        const data = await axios.get(
          `http://localhost:2000/api/jdParameters/get/${userDataGlobal?._id}`
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

  useEffect(() => {
    const parentid = localStorage.getItem("parentId");
    const filename = localStorage.getItem("fileName");
    setParentId(parentid);
    setFileName(filename);
  }, [isOpen]);

  useEffect(() => {
    const existingFilenames =
      JSON.parse(localStorage.getItem("jdApplicantFilenames")) || [];
    setJdApplicantFilename(existingFilenames);
  }, [update]);

  const getLimits = () => {
    const jdCountMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setJdCountMonthly(jdCountMonthly);

    const jdCountMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setJdCountMonthlyLimit(jdCountMonthlyLimit);
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));

    setActivePlan(activePlan);
  };
  useEffect(() => {
    getLimits();
  }, []);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsCollection(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [taskRef]);

  useEffect(() => {
    if (parentId) {
      localStorage.setItem("parentId", parentId);
      getParentData(parentId);
    } else {
      getFolderData();
    }
    const storedIndexes = localStorage.getItem("selectedIndexes");
    const storedIndexesFileType = localStorage.getItem(
      "selectedIndexesFileType"
    );

    if (storedIndexesFileType) {
      setSelectedIndexesFilesType(JSON.parse(storedIndexesFileType));
    }

    if (storedIndexes) {
      setSelectedIndexes(JSON.parse(storedIndexes));
    }
  }, [clientId, parentId, userDataGlobal]);

  const getParentData = (parentId) => {
    axios
      .get(`http://localhost:2000/api/folder/getByParentId/${parentId}`)
      .then((res) => {
        const filteredData = res.data.data.filter((item) => {
          if (item.type == "file"
            //  && item.isSync === true
            ) {
            return true;
          } else if (item.type == "folder") {
            return true;
          }
        });
        setDetails(filteredData);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getFolderData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:2000/api/folder/get/${userDataGlobal?._id}`)
      .then((res) => {
        const filteredData = res.data.data.filter((item) => {
          if (item.type == "file"
            //  && item.isSync === true
            ) {
            return true;
          } else if (item.type == "folder") {
            return true;
          }
        });
        setDetails(filteredData);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const getData = async () => {
    setLoading(true);

    await axios
      .get("http://localhost:2000/api/job/getById/" + selectedJob)
      .then((res) => {
        setLoading(false);
        const { applications, ...restData } = res.data;

        setExtractedData(restData);
        setJobData(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };
  useEffect(() => {
    if (selectedJob) {
      getData();
    }
  }, [tab]);

  const JobMatchforSkilotechCollection = async () => {
    setSelectedResumes([]);
    setSelect(false);
    try {
      if (jdCountMonthly >= jdCountMonthlyLimit) {
        setLimitPopup(true);
        return;
      }
      const outputData = [];
      setMatchLoader(true);
      const response = await axios.post(
        "http://localhost:2000/api/skiloCollection/jobMatching",

        {
          jd: extratctedData,
          resumeCount,
          parameters,
          weightage,
          priority,
        }
      );
      setFromSkilotechCollection(true);
      if (Array.isArray(response.data)) {
        outputData.push(...response.data);
      } else {
        outputData.push(response.data);
        // outputData.push([response.data]);
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
      setIsMatched(true);
      updateJobMatchLimit();
      setTimeout(() => {
        getLimits();
      }, 5000);
      // setCollection("");
      setMatchByCOllection(false);
      setButtonToggle(false);

      setMatchLoader(false);
    } catch (error) {
      console.error("Error in JobMatchforSkilotechCollection:", error);
      toast.error("Something went wrong, try again");
    } finally {
      setMatchLoader(false);
    }
  };

  // useEffect(() => {
  //   if (count > 3) {
  //     setLoading(false);
  //     toast.error("Something went wrong, please try again");
  //     setCount(0);
  //   } else if (count == 1 || count == 2 || count == 3) {
  //     jobMatching();
  //   }
  // }, [count]);

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

  //new logic
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const processChunk = async (chunk, jd, outputData, counter) => {
    const ids = chunk.map((item) => item);
    const response = await axios.post(
      "http://localhost:2000/api/external/jobMatching",

      {
        jd,
        ids,
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
      // outputData.push([response.data]);
    }

    counter.count++;
  };

  const MatchJob = async () => {
    setSelectedResumes([]);
    setSelect(false);
    setFromSkilotechCollection(false);
    if (jdCountMonthly >= jdCountMonthlyLimit) {
      setLimitPopup(true);
      return;
    }
    setMatchLoader(true);
    setIsAnimate(false);
    setShowsideBar(false);
    if (Object?.keys(extratctedData).length > 1) {
      const chunks = chunkArray(selectedIndexesFileTypes, 14);
      const outputData = [];
      const counter = { count: 0 };

      if (selectedIndexesFileTypes.length > 50) {
        for (const [index, chunk] of chunks.entries()) {
          processChunk(chunk, extratctedData, outputData, counter);
          if (index < chunks.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
          }
        }
      } else {
        for (const [index, chunk] of chunks.entries()) {
          await processChunk(chunk, extratctedData, outputData, counter);
          if (index < chunks.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
          }
        }
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
      setIsMatched(true);
      // setSelectedIndexes([]);
      // setCollection("");
      setMatchByCOllection(true);
      updateJobMatchLimit();
      setTimeout(() => {
        getLimits();
      }, 5000);
      // setSelectedIndexesFilesType([]);
      setButtonToggle(false);
      // setLoadingg(false);
      setMatchLoader(false);
    } else {
      toast.error("Something went wrong, please try again");
    }
  };

  const addApplicant = async (applicantData) => {
    setHiringLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:2000/api/job/moveToHiring/${selectedJob}`,
        applicantData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Move to Hiring Successfully");

      const existingFilenames =
        JSON.parse(localStorage.getItem("jdApplicantFilenames")) || [];

      const updatedFilenames = [...existingFilenames, applicantData?.fileName];
      localStorage.setItem(
        "jdApplicantFilenames",
        JSON.stringify(updatedFilenames)
      );
      setUpdate(!update);
      setHiringLoading(false);
      return response.data;
    } catch (error) {
      setHiringLoading(false);
      console.log(error);
      toast.error(` ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    const intervals = [
      { text: "Analyzing Data", duration: 10000 },
      { text: "Finding Results", duration: 20000 },
      { text: "Almost There", duration: 2 },
    ];

    let currentInterval = 0;

    const updateMessage = () => {
      setMainMessage(intervals[currentInterval].text);

      if (currentInterval < intervals.length - 1) {
        currentInterval++;
        setTimeout(updateMessage, intervals[currentInterval].duration);
      }
    };

    setTimeout(updateMessage, intervals[currentInterval].duration);

    return () => {
      clearTimeout(updateMessage);
    };
  }, []);

  const updateJobMatchLimit = async () => {
    let resumeCount = selectedIndexesFileTypes.length;

    try {
      const updateJobMatchApiUrl = `http://localhost:2000/api/apiLogs/updateJobMatchCount/${userDataGlobal?._id}`;
      const updateJobMatchResponse = await axios.put(updateJobMatchApiUrl, {
        resumeCount,
      });

      if (!updateJobMatchResponse.data.success) {
        console.error(
          "Error in updateJobMatchCount:",
          updateJobMatchResponse.data.message
        );
      }

      const jdSubscriptionLimitUrl = `http://localhost:2000/api/subscription/updateAiHits/${userDataGlobal?._id}`;
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
    <>
      {tab === 0 && (
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

          <div className=" flex flex-col gap-4   ">
            {loadingg && (
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
                      <span className="text-center text-[#fff] text-[14px]">
                        Analyzing Data,
                      </span>
                      <span className="text-left text-[#fff] text-[14px] loading_dots">
                        Please wait
                      </span>
                    </div>
                  </div>
                </div>
              </>
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
            <div ref={taskRef}>
              {isCollection && (
                <JdFiles
                  details={details}
                  fileName={fileName}
                  setSelectedIndexes={setSelectedIndexes}
                  selectedIndexes={selectedIndexes}
                  loading={loading}
                  selectedIndexesFileTypes={selectedIndexesFileTypes}
                  setSelectedIndexesFilesType={setSelectedIndexesFilesType}
                  setIsCollection={setIsCollection}
                  setCollection={setCollection}
                  setTab={setTab}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                />
              )}
            </div>

            <div className="flex flex-col gap-4 p-4 bg-white rounded-[16px]">
              <div className=" flex flex-col gap-1">
                <p className="text-[18px] font-medium">
                  JD Matching for {extratctedData?.jobTitle}
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full flex scr420:flex-row flex-col gap-4 text-[14px] font-montserrat scr420:items-center items-start font-medium">
                  <div className="flex gap-2 items-center font-semibold text-[14px] text-[#646464]">
                    <input
                      type="radio"
                      className="h-4 w-4 custom-radio"
                      value={collection}
                      checked={collection == "MyCollection"}
                      onChange={() => {
                        setCollection("MyCollection");
                        setIsCollection(true);
                      }}
                    />
                    <label>My Collection</label>
                  </div>
                  <div className="flex gap-2 items-center font-semibold text-[14px] text-[#646464]">
                    <input
                      // disabled={!isChecked}
                      type="radio"
                      className="h-4 w-4 custom-radio"
                      value={collection}
                      checked={collection == "SkilotechCollection"}
                      onChange={() => {
                        setCollection("SkilotechCollection");
                      }}
                    />
                    <label>Request CVs From Skilotech</label>
                  </div>
                </div>
              </div>
              {selectedIndexes.length > 0 && collection === "MyCollection" && (
                <div className="font-medium text-[16px] ">
                  Resumes Selected :{" "}
                  <span className="text-[16px] font-semibold">
                    {" "}
                    {selectedIndexesFileTypes?.length}
                  </span>
                </div>
              )}
              <div className="flex scr420:flex-row flex-col gap-4 scr420:items-center items-start">
                <button
                  onClick={() => setOpenParamenters(true)}
                  className=" rounded-[30px] text-[14px] font-semibold blue_border_Button flex justify-center items-center h-[38px] px-6"
                >
                  Set Matching Parameters
                </button>
                <div className="flex flex-row  gap-4 items-center">
                  <span className=" text-[14px] font-[500] text-[#333333]">
                    Set Filter Limit{" "}
                  </span>
                  <input
                    type="text"
                    value={resumeCount}
                    onChange={(e) => {
                      setResumeCount(e.target.value);
                    }}
                    name=""
                    id=""
                    placeholder="Ex. 5"
                    className=" h-[38px]  w-[60px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] leading-[12px]"
                  />
                </div>
                {collection === "SkilotechCollection" ? (
                  <button
                    onClick={() => JobMatchforSkilotechCollection()}
                    className="bg_Button px-4 rounded-[30px] font-medium w-[130px] h-[38px]"
                  >
                    Find Match
                  </button>
                ) : (
                  <button
                    disabled={!selectedIndexes.length > 0}
                    onClick={() => MatchJob()}
                    style={{ opacity: selectedIndexes.length > 0 ? 1 : 0.5 }}
                    className="bg_Button px-4 rounded-[30px] font-medium w-[130px] h-[38px]"
                  >
                    Find Match
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 h-full items-center  ">
              {isMatched ? (
                <div className="w-full">
                  <JdMatchCard
                    resumeList={resumeList}
                    extratctedData={extratctedData}
                    setTab={setTab}
                    setUserDetails={setUserDetails}
                    addApplicant={addApplicant}
                    hiringLoading={hiringLoading}
                    jobData={jobData}
                    jdApplicantFileNames={jdApplicantFileNames}
                    fromSkilotechCollection={fromSkilotechCollection}
                    collection={collection}
                    data={data}
                    byMyCollection={byMyCollection}
                    setUpdate={setUpdate}
                    selectedJob={selectedJob}
                    setSelectedResumes={setSelectedResumes}
                    selectedResumes={selectedResumes}
                    select={select}
                    setSelect={setSelect}
                  />
                </div>
              ) : (
                <div className="bg-[#FFFFFF] p-[24px] w-full max-w-[1140px] flex flex-col items-center rounded-[12px] mt-10">
                  <div className="text-[18px] font-[500] text-center mb-6">
                    JD Matching Steps
                  </div>

                  <div className="flex flex-col items-center gap-12 w-full">
                    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8">
                      <div className="flex flex-col items-center gap-4 w-64 text-center">
                        <img
                          className="w-28 h-28 md:w-32 md:h-32"
                          src="/images/recruiter/jdstep1.png"
                          alt="Step 1"
                        />
                        <p className="text-base md:text-lg font-bold">
                          Step 1: Choose Your JD Source
                        </p>
                        <p className="text-sm text-gray-600">
                          Begin by selecting where you&apos;d like to find the
                          Job Description you want to use for matching.
                        </p>
                      </div>

                      <div className="hidden md:block w-32 h-0 relative">
                        <svg
                          className="absolute left-0 top-1/2 -translate-y-1/2"
                          width="100"
                          height="20"
                          viewBox="0 0 100 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10 L90 10 M90 10 L85 5 M90 10 L85 15"
                            stroke="#000"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            fill="none"
                          />
                        </svg>
                      </div>

                      <div className="flex flex-col items-center gap-4 w-64 text-center">
                        <img
                          className="w-28 h-28 md:w-32 md:h-32"
                          src="/images/recruiter/jdstep2.png"
                          alt="Step 2"
                        />
                        <p className="text-base md:text-lg font-bold">
                          Step 2: Set Matching Parameter
                        </p>
                        <p className="text-sm text-gray-600">
                          Define a specific order of importance for different
                          aspects of the Job Description.
                        </p>
                      </div>
                    </div>

                    <div className="relative h-16 scr1024:block hidden">
                      <svg
                        className="absolute left-[230px] -translate-x-1/2"
                        width="20"
                        height="80"
                        viewBox="0 0 20 80"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 0 V70 M10 70 L5 65 M10 70 L15 65"
                          stroke="#000"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse justify-center items-center w-full gap-8">
                      <div className="flex flex-col items-center gap-4 w-64 text-center">
                        <img
                          className="w-28 h-28 md:w-32 md:h-32"
                          src="/images/recruiter/jdstep3.png"
                          alt="Step 3"
                        />
                        <p className="text-base md:text-lg font-bold">
                          Step 3: Set Filter Limit
                        </p>
                        <p className="text-sm text-gray-600">
                          Specify the maximum number of candidate profiles you
                          want to retrieve.
                        </p>
                      </div>

                      <div className="hidden md:block w-32 h-0 relative">
                        <svg
                          className="absolute left-0 top-1/2 -translate-y-1/2"
                          width="100"
                          height="20"
                          viewBox="0 0 100 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M90 10 L0 10 M0 10 L5 5 M0 10 L5 15"
                            stroke="#000"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            fill="none"
                          />
                        </svg>
                      </div>

                      <div className="flex flex-col items-center gap-4 w-64 text-center">
                        <img
                          className="w-28 h-28 md:w-32 md:h-32"
                          src="/images/recruiter/jdstep4.png"
                          alt="Step 4"
                        />
                        <p className="text-base md:text-lg font-bold">
                          Step 4: Click the &quot;Find Match&quot; button
                        </p>
                        <p className="text-sm text-gray-600">
                          Specify the maximum number of candidate profiles you
                          want to retrieve for matching.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {tab === 1 && (
        <ApplicantDetails
          userDetails={userDetails}
          setTab={setTab}
          jobData={jobData}
          addApplicant={addApplicant}
          hiringLoading={hiringLoading}
          jdApplicantFileNames={jdApplicantFileNames}
          collection={collection}
          data={data}
          byMyCollection={byMyCollection}
        />
      )}
    </>
  );
};

export default MatchJob;
