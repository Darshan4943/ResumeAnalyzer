import React, { useEffect, useRef, useState } from "react";
import Progress_bar from "./ProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import ResumePreview from "../../common/ResumePreview";
import { DesignationSVG } from "../../../utils/svg";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import Tesseract from "tesseract.js";
import PdfViewer from "./PdfViewer";
import { convertBytes } from "../../../utils/middleware";
import EarthLoader from "../../common/EarthLoader";
import ImageContainer from "../../common/image";
import { toast } from "react-toastify";
import MatchingDetails from "./matchingDetails";

const ExternalJobMatching = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [resumeCount, setResumeCount] = useState(5);
  const userDataGlobal = useSelector((state) => state.userData);
  const [details, setDetails] = useState();
  const [resuneList, setResuneList] = useState([]);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  const [textDataFinal, setTextData] = useState([]);

  const [extractedData, setExtractedData] = useState([]);
  const fileRef = useRef(null);
  useEffect(() => {
    axios
      .get(
        `https://jamblix.com/api/client/getByRecruiter/${userDataGlobal._id}`
      )
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const jobMatching = () => {
    setLoading(true);
    axios
      .post("https://jamblix.com/api/external/jobMatching", {
        jd: text,
        resumeCount,
        resumeData: extractedData,
      })
      .then((res) => {
        setResuneList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const extractData = async () => {
    setLoading(true);
    axios
      .post("https://jamblix.com/api/resume/extraction", {
        data: textDataFinal,
      })
      .then((res) => {
        setExtractedData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  const handleFileChange = async (e) => {
    // setResuneList(0);
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
          Tesseract.recognize(
            file,
            "eng", // Language code (English in this case)
            { logger: (m) => console.log(m) } // Optional logger callback
          ).then(async ({ data: { text } }) => {
            textData.push({ index, text });
            // textData.push({ index, text });
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
    setTextData(textData);
    setFiles(selectedFiles);
  };
  const imageSeter = (data) => {
    const file = Object.values(files)?.find((item, i) => data.index == i);
    if (
      file?.type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "/images/docIcon.png";
    } else {
      return "/images/pdfIcon.png";
    }
  };
  return (
    <div className="flex flex-col gap-4 min-h-[70vh] ">
      {loading && <EarthLoader />}
      {selectedFile && (
        <MatchingDetails
          data={selectedFile}
          setSelectedFile={setSelectedFile}
          files={files}
          extractedData={extractedData}
        />
      )}

      <div
        className="flex ml:flex-row flex-col gap-12 w-[100%] p-4 "
        style={{
          boxShadow: "0px 1px 6px 0px rgb(84 84 84 / 25%)",
          borderRadius: "0px 12px 12px 12px",
        }}
      >
        <div className="flex flex-col gap-6 ml:w-[30%] w-[30%]">
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
          <div className="flex flex-col gap-4 ">
            <div className="text-[18px] font-medium">Job Description</div>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (e.target.value.length < 100) {
                  setError("Minimum 100 characters required.");
                } else {
                  setError("");
                }
              }}
              rows={6}
              cols={50}
              placeholder="Enter your text here..."
              className=" border border-[#06A9EF] rounded-[8px] outline-none h-auto p-2"
            />
            {error && <div className="text-red">{error}</div>}
          </div>
          <div className="flex flex-row gap-4 items-center">
            <span className="text-[20px] font-500">
              Select search Results Limit{" "}
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
              className="h-[44px] w-[80px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] "
            />
          </div>
          <button
            className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] w-[166px]"
            disabled={text.length == 0 || extractedData?.length == 0}
            onClick={() => {
              jobMatching();
            }}
            style={{
              opacity: text.length == 0 || extractedData?.length == 0 ? 0.6 : 1,
            }}
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4  text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <div className="flex gap-[8px] w-full justify-between">
                Find Match{" "}
                <img
                  src="/images/icons/person_search.png"
                  className="h-[24px] w-[24px]"
                  alt=""
                />{" "}
              </div>
            )}
          </button>
        </div>
        <div className="ml:w-[70%] w-[70%] bg-[#F9F9F9] rounded-[16px] border border-[#DEDEDE] py-[16px] px-[24px] flex flex-col gap-[16px] ">
          <div>Total Results ({resuneList?.length})</div>
          <div className=" flex flex-row flex-wrap justify-between  gap-[24px] ">
            {resuneList?.length > 0 ? (
              <>
                {resuneList
                  .sort((a, b) => b.percentage - a.percentage)
                  ?.map((data, index) => (
                    <div
                      className="flex flex-col gap-[8px] w-[48%] rounded-[16px] bg-white shadow-lg py-[16px] px-[24px]"
                      key={index}
                    >
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex gap-[4px]">
                          <span className=" text-[16px] font-500">
                            {data?.first_name}
                          </span>{" "}
                          <span className=" text-[16px] font-500">
                            {data?.last_name}
                          </span>
                        </div>
                        <div className="flex gap-[4px] items-center ">
                          <DesignationSVG />
                          <span className="text-[14px] font-500">
                            {
                              extractedData.find(
                                (item, i) => item.index == data.index
                              )?.designation
                            }
                          </span>{" "}
                        </div>
                      </div>
                      <div className="border border-[#DEDEDE] w-full rounded-[8px] p-[16px] flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-[8px]">
                          {files && (
                            <>
                              <img
                                src={imageSeter(data)}
                                className="w-[48px] h-[48px] "
                                alt=""
                              />
                              <div className="flex flex-col justify-between ">
                                <span className="text-[14px] text-[#333333]">
                                  {
                                    Object.values(files).find(
                                      (item, i) => data.index == i
                                    )?.name
                                  }
                                </span>
                                <span className="text-[14px] text-[#808080]">
                                  {convertBytes(
                                    Object.values(files).find(
                                      (item, i) => data.index == i
                                    )?.size
                                  )}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex flex-row gap-[8px] items-center">
                          <span className="text-[14px] text-[#06A9EF] font-500 cursor-pointer">
                            Preview
                          </span>

                          <svg
                            onClick={() =>
                              handleDownload(
                                Object.values(files).find(
                                  (item, i) => data.index == i
                                )
                              )
                            }
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                          >
                            <path
                              d="M6.99967 10.333L2.83301 6.16634L3.99967 4.95801L6.16634 7.12467V0.333008H7.83301V7.12467L9.99967 4.95801L11.1663 6.16634L6.99967 10.333ZM1.99967 13.6663C1.54134 13.6663 1.14898 13.5031 0.822591 13.1768C0.496202 12.8504 0.333008 12.458 0.333008 11.9997V9.49967H1.99967V11.9997H11.9997V9.49967H13.6663V11.9997C13.6663 12.458 13.5031 12.8504 13.1768 13.1768C12.8504 13.5031 12.458 13.6663 11.9997 13.6663H1.99967Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px] min-h-[157px] justify-start relative ">
                        <span className="text-[#333333] text-[16px] font-500">
                          Matching Parameters
                        </span>
                        <ul className="flex flex-col gap-[4px]">
                          {data?.matching_parameters?.map((item, i) => (
                            <li
                              key={i}
                              className="text-[#333333] text-[14px] font-500 flex flex-row items-center gap-[8px]"
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                              </svg>

                              {item}
                            </li>
                          ))}
                        </ul>
                        <span
                          onClick={() => setSelectedFile(data)}
                          className="text-[#06A9EF] text-[14px]  underline decoration-solid  text-end absolute bottom-[0px] right-0 cursor-pointer"
                        >
                          See More
                        </span>
                      </div>
                      <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
                      {data?.percentage > 0 ? (
                        <Progress_bar progress={data.percentage} />
                      ) : (
                        <div
                          className="flex flex-row gap-2 items-center justify-between "
                          style={{ width: "100%" }}
                        >
                          <div
                            style={{
                              width: "80%",
                              background: "#8080804d",
                              borderRadius: 12,
                              fontSize: "8px",
                              height: "10px",
                            }}
                          ></div>
                          <span className="text-[14px] font-semibold">0%</span>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-full">
                <img src="/images/NoMatch.png" alt="" className="w-[40%] " />
                <span className="text-[#808080]">No Match Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalJobMatching;
