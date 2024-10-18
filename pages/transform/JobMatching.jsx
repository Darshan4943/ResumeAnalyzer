import React, { useEffect, useReducer, useRef, useState } from "react";
import InternalJobMatching from "../../components/featured/jobMatching/internal";
import ExternalJobMatching from "../../components/featured/jobMatching/external";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
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
import ExtraSectionForm from "../jdMatching/ExtraSectionForm";
import JdMatchingsideBar from "../jdMatching/JdMatchingsideBar";
import { AnimatePresence, motion } from "framer-motion";
import LimitUsedModal from "../../components/models/limitUsedModal";
import { reCallUserData } from "../../Redux/actions/user";

const JobMatching = () => {
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const userDataGlobal = useSelector((state) => state.userData);
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

  const [jdCount, setJdCount] = useState(0)
  const [activePlan, setActivePlan] = useState(0)
  const [limitPopup, setLimitPopup] = useState(false);

  useEffect(() => {
    const jdCount = Number(localStorage.getItem("jdCount"));
    console.log(jdCount)
    const activePlan = Number(localStorage.getItem("activePlan"));
    setJdCount(jdCount)
    setActivePlan(activePlan)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowsideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      .get(`https://api.shindedarshan.com/api/folder/getByParentId/${parentId}`)
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
      .get(`https://api.shindedarshan.com/api/folder/get/${userDataGlobal._id}`)
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


  const jobMatching = async () => {

    if (jdCount >= 10 && activePlan === 4 ) {
      setLimitPopup(true);
      return;
    }

    setLoadingg(true);
    setIsAnimate(false);
    try {
      const res = await axios.post("https://api.shindedarshan.com/api/jd/extraction", {
        text,
      });
      const jd = res.data.jsonData[0];
      updateJobMatchLimit()
      localStorage.removeItem("JdDescription");
      if (Object.keys(jd).length > 5) {
        setExtractedData(jd);
        setLoadingg(false);
        setShowsideBar(true);
      } else {
        setCount(count + 1);
      }
    } catch (e) {
      // console.log("error", e);
      setCount(count + 1);
      // setLoadingg(false);
      // toast.error("Something went wrong, please try again");
    }
  };


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
  const textExtractor = async (textData) => {
    const { data } = await axios.post(
      "https://api.shindedarshan.com/api/resume/extraction",
      {
        data: textData,
      }
    );
    return data.data;
  };
  const parseData = () => {
    return new Promise((resolve, reject) => {
      const textData = [];
      Object.values(files).forEach(async (file, index) => {
        if (
          file.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), {
              delimiters: {
                start: "12op1j2po1j2poj1po",
                end: "op21j4po21jp4oj1op24j",
              },
            });
            var text = doc.getFullText();
            textData.push({ text, index });
          };
          reader.readAsBinaryString(file);
        } else if (file.type == "image/png") {
          Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
          }).then(async ({ data: { text } }) => {
            textData.push({ text, index });
          });
        } else if (file.type == "application/pdf") {
          let fullText = "";
          const pdfTextPromises = [];
          for (let i = 1; i <= 1; i++) {
            pdfTextPromises.push(fileToText(file, i));
          }
          Promise.all(pdfTextPromises).then(async (texts) => {
            fullText = texts.join("");
            textData.push({ text: fullText, index });
          });
        }
        return;
      });
      setTimeout(() => {
        resolve(textData);
      }, 1000);
    });
  };

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const textData = [];
    if (Object.values(selectedFiles).length) {
      const promise = Object.values(selectedFiles).map((file, index) => {
        if (
          file.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), {
              delimiters: {
                start: "12op1j2po1j2poj1po",
                end: "op21j4po21jp4oj1op24j",
              },
            });
            var text = doc.getFullText();

            textData.push({ index, text });
          };
          reader.readAsBinaryString(file);
        } else if (file.type == "image/png") {
          Tesseract.recognize(file, "eng", {
            logger: (m) => console.log(m),
          }).then(async ({ data: { text } }) => {
            textData.push({ index, text });
          });
        } else if (file.type == "application/pdf") {
          let fullText = "";
          const pdfTextPromises = [];

          for (let i = 1; i <= 1; i++) {
            pdfTextPromises.push(fileToText(file, i));
          }

          Promise.all(pdfTextPromises).then(async (texts) => {
            fullText = texts.join("");
            textData.push({ index, text: fullText });
          });
        }
      });
      await Promise.all(promise);
    }
    // setTextData(textData);
    setFiles(selectedFiles);
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
      "https://api.shindedarshan.com/api/external/jobMatching/",

      {
        jd: jd,
        ids: ids,
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
    if (Object.keys(extratctedData).length > 5) {
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
      { text: "Almost There", duration: 2 }, // This duration will be ignored
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
    let resumeCount = selectedIndexesFileTypes.length

    try {

      const apiUrl = `https://api.shindedarshan.com/api/apiLogs/updateJobMatchCount/${userDataGlobal._id}`;
      const response = await axios.put(apiUrl, { resumeCount });

      if (response.data.success) {

        
        dispatch(reCallUserData())
        return response.data;
      } else {
        console.error('Error:', response.data.message);
        
        return response.data;

      }
    } catch (error) {
      console.error('Something went wrong:', error);
     
      return { success: false, message: 'Something went wrong', error };

    }
  };

  return (
    <>
      {limitPopup && (
        <div className="z-[200000]">
          <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
        </div>
      )}

      <div className="md:py-6 py-3 flex flex-col gap-4 min-h-[80vh] customMargins ">
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

        <div className="font-semibold text-[20px]">Job Description Matching</div>
        <div className="bg-[#DEDEDE] w-full h-[1px]"></div>
        <div className="flex flex-col gap-6 h-full relative overflow-hidden">
          <div className="flex md:flex-row flex-col ml:gap-6 md:gap-2 h-full">
            <div className="relative md:w-[60%] ml:w-[45%] xxl:w-[60%] w-full flex flex-col gap-6 ">
              <div className="text-[18px] text-[#333333] font-medium">
                Select From Collection
              </div>
              <JdFiles
                details={details}
                query={router.query}
                setSelectedIndexes={setSelectedIndexes}
                selectedIndexes={selectedIndexes}
                loading={loading}
                selectedIndexesFileTypes={selectedIndexesFileTypes}
                setSelectedIndexesFilesType={setSelectedIndexesFilesType}
              />

              <JdDescription
                text={text}
                error={error}
                resumeCount={resumeCount}
                loadingg={loadingg}
                setText={setText}
                setError={setError}
                setResumeCount={setResumeCount}
                jobMatching={jobMatching}
                setShowsideBar={setShowsideBar}
                showMatchingSidebar={showMatchingSidebar}
                MatchJob={MatchJob}
                btnToggle={btnToggle}
                setButtonToggle={setButtonToggle}
              />
            </div>

            <div className="bg-[#DEDEDE] ml:h-[91vh] h-[1px] ml:w-[1px] w-full ml:m-0 my-4"></div>
            <div className="ml:w-[56%] w-full">
              <JdMatching
                details={details}
                resumeList={resumeList}
                isAnimate={isAnimate}
                setShowsideBar={setShowsideBar}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMatchingSidebar && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed z-[5] top-0 left-0 right-0 bottom-0 bg-[#000000] bg-opacity-15"
                style={
                  {
                    // background: "rgba(255, 255, 255, 0.5)",
                    // backdropFilter: "blur(10px)",
                  }
                }
              ></motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed z-[6] top-0 left-0 bottom-0 h-full overflow-y-auto"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  ...(navigator.userAgent.includes("Safari") &&
                    !navigator.userAgent.includes("Chrome") && {
                    WebkitBackdropFilter: "blur(5px)",
                  }),
                  willChange: "transform",
                }}
              >
                <JdMatchingsideBar
                  extratctedData={extratctedData}
                  setExtractedData={setExtractedData}
                  text={text}
                  setText={setText}
                  MatchJob={MatchJob}
                  setShowsideBar={setShowsideBar}
                  setIsEdit={setIsEdit}
                  setShowForm={setShowForm}
                  setEditId={setEditId}
                />

                {(ShowForm || isEdit) && (
                  <div className="block ml:hidden">
                    <ExtraSectionForm
                      extratctedData={extratctedData}
                      setExtractedData={setExtractedData}
                      isEdit={isEdit}
                      setShowForm={setShowForm}
                      editId={editId}
                      setIsEdit={setIsEdit}
                      setEditId={setEditId}
                      ShowForm={ShowForm}
                    />
                  </div>
                )}
              </motion.div>

              {/* ExtraSectionForm for larger screens */}
              {(ShowForm || isEdit) && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="hidden md:flex fixed z-[7] top-0 left-[434px] bottom-0 h-full overflow-y-auto"
                  style={{
                    backdropFilter: "blur(10px)",
                    ...(navigator.userAgent.includes("Safari") &&
                      !navigator.userAgent.includes("Chrome") && {
                      WebkitBackdropFilter: "blur(10px)",
                    }),
                    willChange: "transform",
                  }}
                >
                  <ExtraSectionForm
                    extratctedData={extratctedData}
                    setExtractedData={setExtractedData}
                    isEdit={isEdit}
                    setShowForm={setShowForm}
                    editId={editId}
                    setIsEdit={setIsEdit}
                    setEditId={setEditId}
                    ShowForm={ShowForm}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default JobMatching;
