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
import { motion } from "framer-motion";

const JobMatching = () => {
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState([]);
  console.log(resumeList);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const [files, setFiles] = useState([]);
  const { clientId, parentId } = router.query;

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesFileTypes, setSelectedIndexesFilesType] = useState([]);

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
      .get(`https://jamblix.com/api/folder/getByParentId/${parentId}`)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const getClientData = (clientId) => {
  //   axios
  //     .get("https://jamblix.com/api/resume/" + clientId)
  //     .then((res) => {
  //       setDetails(res.data.data);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const getFolderData = () => {
    setLoading(true);
    axios
      .get(`https://jamblix.com/api/folder/get/${userDataGlobal._id}`)
      .then((res) => {
        setDetails(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  // const getClients = () => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://jamblix.com/api/client/getByRecruiter/${userDataGlobal._id}`
  //     )
  //     .then((res) => {
  //       setDetails(res.data.data);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const processChunk = async (chunk, jd, outputData) => {
    const promises = chunk.map(async (item) => {
      const { data } = await axios.post(
        "http://localhost:2000/api/external/jobMatching/",
        {
          jd: jd,
          id: item,
        }
      );
      outputData.push(data);
    });
    await Promise.all(promises);
  };

  const jobMatching = async () => {
    setLoadingg(true);
    setIsAnimate(false);
    try {
      const res = await axios.post("http://localhost:2000/api/jd/extraction", {
        text,
      });
      const jd = res.data.jsonData[0];
      const chunks = chunkArray(selectedIndexesFileTypes.slice(10), 5);
      const outputData = [];
      for (let i = 0; i < chunks.length; i++) {
        await processChunk(chunks[i], jd, outputData);
        if (i < chunks.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 1 minute before processing the next chunk
        }
      }
      const dataArray = outputData
        .filter((item) => item.matching_percentage)
        ?.sort(
          (a, b) =>
            parseInt(b.matching_percentage.slice(0, 2)) -
            parseInt(a.matching_percentage.slice(0, 2))
        )
        .slice(0, resumeCount);
      setResumeList(dataArray);
      setLoadingg(false);
    } catch (e) {
      console.log("error", e);
      setLoadingg(false);
      toast.error("Something went wrong, please try again");
    }
  };

  // const jobMatching = () => {
  //   setLoadingg(true);
  //   setIsAnimate(false);
  //   axios
  //     .post("http://localhost:2000/api/jd/extraction", {
  //       text,
  //     })
  //     .then(async (res) => {
  //       const jd = res.data.jsonData[0];
  //       try {
  //         const outputData = [];
  //         const promise = selectedIndexesFileTypes
  //           .slice(0, 5)
  //           .map(async (item, index) => {
  //             const { data } = await axios.post(
  //               "http://localhost:2000/api/external/jobMatching/",
  //               {
  //                 jd: jd,
  //                 id: item,
  //               }
  //             );

  //             outputData.push(data);
  //           });
  //         const resolvedData = await Promise.all(promise);
  //         setResumeList(outputData);
  //         setTimeout(() => {
  //           setLoadingg(false);
  //         }, 5000);
  //       } catch (e) {
  //         console.log("error", e);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoadingg(false);
  //       toast.error("Something went wrong, please try again");
  //     });
  // };

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
      "https://jamblix.com/api/resume/extraction",
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

  return (
    <div className=" md:py-6 py-3 flex flex-col gap-4 min-h-[80vh] customMargins ">
      {loadingg && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
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
                  Analyzing Data , It Will Take Some Time
                </span>
                <span className="text-left text-[#fff] text-[16px] loading_dots">
                  Please wait{" "}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      <div className=" font-semibold  text-[20px]">
        Job Description Matching
      </div>
      <div className="bg-[#DEDEDE] w-full h-[1px]"></div>

      <div className="flex ml:flex-row flex-col gap-4 h-full">
        <div className="ml:w-[40%] w-full flex  flex-col gap-6">
          {/* <ReactSelect
            options={options?.map((item, index) => ({
              value: item,
              label: item,
            }))}
            className="my-4 outline outline-offset-1 outline-blue rounded-[8px]"
            name=""
            placeholder="Select"
            value={selectedOptions}
            onChange={(selectedOption) => selectOptions(selectedOption)}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                minWidth: "130px",
              }),
            }}
          /> */}
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
          />
        </div>
        <div className="bg-[#DEDEDE] ml:h-screen h-[1px] ml:w-[1px] w-full"></div>
        <div className="ml:w-[60%] w-full">
          <JdMatching
            details={details}
            resumeList={resumeList}
            isAnimate={isAnimate}
          />
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
