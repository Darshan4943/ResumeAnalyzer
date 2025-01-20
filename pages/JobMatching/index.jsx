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


const JobMatching = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const [files, setFiles] = useState([]);
  const { clientId, parentId } = router.query;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesFileTypes, setSelectedIndexesFilesType] = useState([]);
  const [count, setCount] = useState(0);
  const [collection, setCollection] = useState()
  const [isCollection, setIsCollection] = useState()
  //sideBar implimentation
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
  const [jdCountMonthly, setJdCountMonthly] = useState(0)
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0)
  const [activePlan, setActivePlan] = useState(0)
  const [limitPopup, setLimitPopup] = useState(false);
  const [tab, setTab] = useState(0)
  const [selectedJob, setSelectedJob] = useState()
  const [isMatched, setIsMatched] = useState(false)

  const [userDetails, setUserDetails] = useState()
  const getLimits = () => {
    const jdCountMonthly = JSON.parse(localStorage.getItem("jdCountMonthly"));
    setJdCountMonthly(jdCountMonthly)

    const jdCountMonthlyLimit = JSON.parse(localStorage.getItem("jdCountMonthlyLimit"));
    setJdCountMonthlyLimit(jdCountMonthlyLimit)
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));

    setActivePlan(activePlan)
  }
  useEffect(() => {
    getLimits()
  }, [])

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
          if (item.type == "file" && item.isSync === true) {
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

          if (item.type == "file" && item.isSync === true) {
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
    if (selectedJob) {
      await axios
        .get("http://localhost:2000/api/job/getById/" + selectedJob)
        .then((res) => {
          setLoading(false);
          setExtractedData(res.data);


        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData();

  }, [tab]);

  

  useEffect(() => {
    if (count > 3) {
      setLoading(false);
      toast.error("Something went wrong, please try again");
      setCount(0);
    } else if (count == 1 || count == 2 || count == 3) {
      jobMatching();
    }
  }, [count]);

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
      "http://localhost:2000/api/external/jobMatching/",

      {
        jd,
        ids,
        resumeCount
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
    // setLoadingg(true);
    setMatchLoader(true);
    setIsAnimate(false);
    setShowsideBar(false);
    if (Object?.keys(extratctedData).length > 5) {
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
      setIsMatched(true)
      setSelectedIndexes([])
      setSelectedIndexesFilesType([])
      setButtonToggle(false);
      // setLoadingg(false);
      setMatchLoader(false);
    } else {
      toast.error("Something went wrong, please try again");
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

  console.log(222,resumeList);



  const updateJobMatchLimit = async () => {
    let resumeCount = selectedIndexesFileTypes.length;

    try {
      const updateJobMatchApiUrl = `http://localhost:2000/api/apiLogs/updateJobMatchCount/${userDataGlobal?._id}`;
      const updateJobMatchResponse = await axios.put(updateJobMatchApiUrl, { resumeCount });

      if (!updateJobMatchResponse.data.success) {
        console.error('Error in updateJobMatchCount:', updateJobMatchResponse.data.message);
      }

      const jdSubscriptionLimitUrl = `http://localhost:2000/api/subscription/updateJdSubscriptionLimit/${userDataGlobal?._id}`;
      const jdSubscriptionResponse = await axios.put(jdSubscriptionLimitUrl, { resumeCount });

      if (!jdSubscriptionResponse.data.success) {
        console.error('Error in updateJdSubscriptionLimit:', jdSubscriptionResponse.data.message);
      }

      ;

      return {
        updateJobMatchResponse: updateJobMatchResponse.data,
        jdSubscriptionResponse: jdSubscriptionResponse.data,
      };
    } catch (error) {
      console.error('Something went wrong:', error);
      return { success: false, message: 'Something went wrong', error };
    }
  };

  return (
    <>
      {tab === 0 &&
        <div>
          <SelectPost setTab={setTab} setSelectedJob={setSelectedJob} />
        </div>
      }


      {tab === 1 &&
        <>
          {limitPopup && (
            <div className="z-[200000]">
              <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
            </div>
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
                      <span className="text-center text-[#fff] text-[16px]">
                        Analyzing Data,
                      </span>
                      <span className="text-left text-[#fff] text-[16px] loading_dots">
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
            <div ref={taskRef}   >
              {isCollection && (
              
                 
                    <JdFiles
                      details={details}
                      query={router.query}
                      setSelectedIndexes={setSelectedIndexes}
                      selectedIndexes={selectedIndexes}
                      loading={loading}
                      selectedIndexesFileTypes={selectedIndexesFileTypes}
                      setSelectedIndexesFilesType={setSelectedIndexesFilesType}
                      setIsCollection={setIsCollection}
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

                <div className="w-full flex gap-4 text-[14px] font-montserrat items-center font-medium">
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 custom-radio"
                      value={collection}
                      checked={collection == "MyCollection"}
                      onChange={() => {
                        setCollection("MyCollection");
                        setIsCollection(true)
                      }}
                    />
                    <label>My Collection</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      // disabled={!isChecked}
                      type="radio"
                      className="h-4 w-4 custom-radio"
                      value={collection}
                      checked={collection == "SkilotechCollection"}
                      onChange={() => {
                        setCollection("SkilotechCollection");
                        setIsCollection(true)
                      }}
                    />
                    <label>Skilotech Collection</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
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
                  className=" h-[40px]  w-[60px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] leading-[12px]"
                />
              </div>
              <div onClick={() => MatchJob()} className="bg-blue text-white px-4 py-2 rounded-[12px] font-medium w-[130px]">Find Match</div>

            </div>
            <div className="flex flex-col gap-6 h-full  ">






              {isMatched &&
                <div className="ml:w-[56%] w-full">
                  <JdMatchCard resumeList={resumeList} extratctedData={extratctedData} setTab={setTab} setUserDetails={setUserDetails}/>
                </div>
              }
            </div>



          </div>
        </>
      }
        {tab === 2 &&
        <ApplicantDetails userDetails={userDetails} setTab={setTab}  />

}
    </>
  );
};

export default JobMatching;
