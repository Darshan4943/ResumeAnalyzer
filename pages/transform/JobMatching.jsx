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

const JobMatching = () => {
  const [loading, setLoading] = useState(true);
  const [isAnimate, setIsAnimate] = useState(true);
  const router = useRouter();
  const fileRef = useRef(null);
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resumeList, setResumeList] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tab, setTab] = useState(null);
  const [ParentId, setParentId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    value: "My Collection",
    label: "My Collection",
  });

  const { clients, folders, clientId, parentId, trash } = router.query;
  const [isBack, setIsBack] = useState(false);
  const [recall, setRecall] = useReducer((x) => x + 1, 0);

  const [options, setOptions] = useState(["My Collection"]);

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const [files, setFiles] = useState([]);

  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesFileTypes, setSelectedIndexesFilesType] = useState([]);
  const [resuneList, setResuneList] = useState([]);
  const selectOptions = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };
  const handleButtonClick = () => {
    fileRef.current.click();
  };


  
  useEffect(() => {
    if (selectedOptions.value === "My Collection") {
      setTab(1);

      if (parentId) {
        setParentId(parentId);
        getParentData(parentId);
      } else {
        getFolderData();
      }
    } else if (selectedOptions.value === "My Clients") {
      setTab(0);

      if (clientId) {
        getClientData(clientId);
      } else {
        getClients();
      }
    }
    const storedIndexes = localStorage.getItem("selectedIndexes");
    const storedIndexesFileType = localStorage.getItem("selectedIndexesFileType");
    
    if (storedIndexesFileType) {
      setSelectedIndexesFilesType(JSON.parse(storedIndexesFileType));
    }

    if (storedIndexes) {
      setSelectedIndexes(JSON.parse(storedIndexes));
    }
  }, [selectedOptions, clientId, parentId, userDataGlobal, recall]);

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
  const getClientData = (clientId) => {
    axios
      .get("https://jamblix.com/api/resume/" + clientId)
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
  const getClients = () => {
    setLoading(true);
    axios
      .get(
        `https://jamblix.com/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        // console.log(res.data.data);
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

  const jobMatching = () => {
    setLoadingg(true);
    setIsAnimate(false);

    axios
      .post("https://jamblix.com/api/external/jobMatching/", {
        jd: text,
        resumeCount,
        ids: selectedIndexesFileTypes,
      })
      .then((res) => {
        setResuneList(res.data.data);
        setLoadingg(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const addFiles = async () => {
    setFileLoader(true);
    if (Object.keys(files).length == 0) {
      toast.error("No File Selected");
      setFileLoader(false);

      return;
    }

    const formData = new FormData();

    parseData().then(async (data) => {
      const extractedData = await textExtractor(data);
      formData.append("fileName", folderName);
      formData.append("type", "file");
      formData.append("userId", userDataGlobal._id);
      formData.append("extractedData", JSON.stringify(extractedData));
      Object.values(files).map(async (file, index) => {
        formData.append("files", file);
        return;
      });
      formData.append("parentId", ParentId ? ParentId : undefined);
      axios
        .post("https://jamblix.com/api/folder/addFiles", formData)
        .then((res) => {
          setFolderName("Untitled folder");
          toast.success("File Uploaded successfully");
          setTimeout(() => {
            setFileLoader(false);
            setIsCreateFolder(false);
            getData();
          }, 1000);
          setFiles([]);
        })
        .catch((err) => {
          setFileLoader(false);
          toast.error("Something went wrong");
        });
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
      {loadingg && <EarthLoader />}
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
          {selectedOptions.value == "Upload File" ? (
            <div className="flex flex-col gap-4 ">
              <div
                ref={fileRef}
                onDrop={handleFileChange}
                className="border-dashed border-[3px] border-[#333] flex flex-row w-full justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
              >
                <input
                  type="file"
                  name="myfile"
                  onChange={handleFileChange}
                  multiple
                />
                {Object.keys(files).length > 0 ? (
                  <div className="w-full flex justify-center items-center">
                    <div className="flex flex-row gap-[16px] items-center justify-between w-[80%]  ">
                      <div className="flex flex-row gap-[16px] items-center  ">
                        <span className="tex-[16px] font-[500]">
                          ({Object.values(files).length}) Files Selected
                        </span>
                      </div>
                      <button
                        className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]"
                        onClick={handleButtonClick}
                      >
                        Browse file
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="  flex  flex-col  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        onClick={handleButtonClick}
                      >
                        <g clipPath="url(#clip0_4121_52475)">
                          <path
                            d="M25 13.3333H25.0167"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                            stroke="#06A9EF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4121_52475">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[4px]	font-normal	">
                      <div className="flex text-center justify-center  scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                        <span
                          onClick={handleButtonClick}
                          className="text-[#06A9EF]"
                        >
                          &nbsp;Browse file{" "}
                        </span>
                        &nbsp;to upload PDF or DOCS
                      </div>
                      <p className="text-center text-[12px] font-normal text-[#7C8493]"></p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <button
                  className="sm:px-9 py-3 h-[48px] px-6 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]"
                  id="button"
                  onClick={() => {
                    setFiles([]);
                  }}
                  style={{ opacity: files.length == 0 ? 0.6 : 1 }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px] flex flex-row justify-between "
                  onClick={extractData}
                  disabled={files.length == 0}
                  style={{ opacity: files.length == 0 ? 0.6 : 1 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_925_19962)">
                      <path
                        d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  Upload Files
                </button>
              </div>
            </div>
          ) : (
            <JdFiles
              details={details}
              query={router.query}
              selectedOptions={selectedOptions.value}
              setSelectedIndexes={setSelectedIndexes}
              selectedIndexes={selectedIndexes}
              loading={loading}
              selectedIndexesFileTypes={selectedIndexesFileTypes}
              setSelectedIndexesFilesType={setSelectedIndexesFilesType}
            />
          )}

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
            resuneList={resuneList}
            isAnimate={isAnimate}
          />
        </div>
      </div>
    </div>
  );
};

export default JobMatching;

// import React, { useEffect, useState } from "react";
// import InternalJobMatching from "../../components/featured/jobMatching/internal";
// import ExternalJobMatching from "../../components/featured/jobMatching/external";

// const JobMatching = () => {
//   const [tabIndex, setTabIndex] = useState(1);
//   return (
//     <div className=" p-6 flex flex-col gap-6 min-h-[80vh] ">
//       <div className=" font-semibold text-[24px]">Job Description Matching</div>

//       <div className="relative">
//         <div
//           className="absolute top-[0px]"
//           style={{
//             width: "fit-content",
//           }}
//         >
//           <button
//             onClick={() => setTabIndex(1)}
//             style={{
//               borderRadius:
//                 tabIndex == 1 ? "12px 0px 0px 0px" : "12px 0px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) -3px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 1 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 1
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             }  text-[16px]  font-semibold w-[166px]`}
//           >
//             Internal
//           </button>
//           <button
//             onClick={() => setTabIndex(2)}
//             style={{
//               borderRadius:
//                 tabIndex == 2 ? "0px 12px 0px 0px" : "0px 12px 0px 0px",
//               boxShadow: "rgb(84 84 84 / 19%) 2px -2px 4px -1px",
//               borderBottom: `1px solid ${
//                 tabIndex == 2 ? "#06A9EF" : "#c7c7c7"
//               } `,
//             }}
//             className={`px-4 py-3 ${
//               tabIndex == 2
//                 ? " bg-[#06A9EF] text-white"
//                 : " text-black bg-[#fff]"
//             } text-[16px] font-semibold  w-[166px]`}
//           >
//             External
//           </button>
//         </div>
//         <div className="mt-[48px]">
//           {tabIndex == 1 ? <InternalJobMatching /> : <ExternalJobMatching />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobMatching;
