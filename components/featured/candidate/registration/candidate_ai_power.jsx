import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import axios from "axios";

import { useRouter } from "next/router";
import MiniLoader from "../../../common/mini-loader";
import ImageContainer from "../../../common/image";
import { camelCase } from "../../../../utils/middleware";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Tesseract from "tesseract.js";
import { DocSVG, PDFSvg, PNGICON } from "../../../../utils/svg";
import { useSelector } from "react-redux";
import LimitUsedModal from "../../../models/limitUsedModal";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const fileToText = (file, pageNumber) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const typedarray = new Uint8Array(event.target.result);
      pdfjs.getDocument(typedarray).promise.then(function (pdf) {
        try {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        } catch (err) {
          reject(err);
          return;
        }
      });
    };
    reader.readAsArrayBuffer(file);
  });
};
const CandidateAiPower = ({
  setTabIndex,
  tabindex,
  setfile,
  file,
  setData,
  data,
}) => {
  const router = useRouter();
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };

  const { clientId } = router.query;
  const [fileData, setFileData] = useState(null);
  const [uploadLimit, setUploadLimit] = useState(0);
  const userDataGlobal = useSelector((state) => state.userData);
  const [limitUsedModal, setLimitUsedModal] = useState(false);

  useEffect(() => {
    const resumeUploadCount = localStorage.getItem("uploadCount");
    setUploadLimit(resumeUploadCount ? resumeUploadCount : 0);
  }, []);
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile?.type == "application/pdf" || "application/docs") {
        sendFile(selectedFile);
      } else {
        toast.error("Only PDF and DOC files are allowed");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sendFile = (file) => {
    setfile(file);
  };
  const extracteText = async (file) => {
    return new Promise(async (resolve, reject) => {
      const textData = [];
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
          textData.push({ text });
        };
        reader.readAsBinaryString(file);
      } else if (file.type == "image/png") {
        Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        }).then(async ({ data: { text } }) => {
          textData.push({ text });
        });
      } else if (file.type == "application/pdf") {
        let fullText = "";
        const pdfTextPromises = [];
        const fileUrl = URL.createObjectURL(file);

        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          pdfTextPromises.push(fileToText(file, i));
        }
        Promise.all(pdfTextPromises)
          .then(async (texts) => {
            fullText = texts.join("");
            textData.push({ text: fullText });
          })
          .catch((err) => {
            reject(err);
            return;
          });
      }
      setTimeout(() => {
        resolve(textData);
      }, 1000);
    });
  };
  const navigate = () => {
    if (uploadLimit <= 0) {
      setLimitUsedModal(true);
      return;
    }
    setLoading(true);
    extracteText(file).then((result) => {
      axios
        .post("https://freedygoservices.in/api/resume/extraction", {
          data: result,
        })
        .then((res) => {
          console.log(res.data.data);
          if (Object.keys(res.data.data[0]).length > 0) {
            localStorage.setItem(
              "parsedResume",
              JSON.stringify(res.data.data[0])
            );
            axios
              .put(
                "https://freedygoservices.in/api/subscription/updateUploadLimit/" +
                  userDataGlobal._id
              )
              .then((res) => {
                const result = res.data;
                if (result.success) {
                  localStorage.setItem(
                    "uploadCount",
                    result.data.resumeUpladed
                  );
                  setLoading(false);
                  setfile(file);

                  router.push(`/home/createResume?clientId=${clientId}`);
                } else {
                  localStorage.setItem("uploadCount", 0);
                  setLoading(false);
                  setfile(file);

                  router.push(`/home/createResume?clientId=${clientId}`);
                }
              })
              .catch((err) => {
                localStorage.setItem("uploadCount", 0);
                setLoading(false);
                setfile(file);

                router.push(`/home/createResume?clientId=${clientId}`);
              });
          } else {
            toast.error("Unable to parse resume, please try again later");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          extracteText();
        });
    });
  };

  const fileIconSeter = (data) => {
    if (data.name.includes("docx") || data.name.includes("doc")) {
      return <DocSVG />;
    } else if (data.name.includes("pdf")) {
      return <PDFSvg />;
    } else if (
      data.name?.includes("png") ||
      data.name?.includes("jpg") ||
      data.name?.includes("jpeg")
    ) {
      return <PNGICON />;
    } else {
      return (
        <svg
          width="57"
          height="48"
          viewBox="0 0 57 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg "
        >
          <path
            d="M50.4997 7.99998H29.7362L27.3944 3.31641C26.8987 2.31758 26.1333 1.47753 25.1847 0.891397C24.2361 0.305266 23.1423 -0.00351467 22.0273 3.01816e-05H6.49996C4.90921 0.00177713 3.38411 0.634475 2.25928 1.75931C1.13445 2.88414 0.501747 4.40924 0.5 5.99999V41.9998C0.501747 43.5905 1.13445 45.1156 2.25928 46.2405C3.38411 47.3653 4.90921 47.998 6.49996 47.9997H50.4997C52.0904 47.998 53.6155 47.3653 54.7404 46.2405C55.8652 45.1156 56.4979 43.5905 56.4996 41.9998V13.9999C56.4979 12.4092 55.8652 10.8841 54.7404 9.75926C53.6155 8.63443 52.0904 8.00173 50.4997 7.99998Z"
            fill="#4294FF"
          />
          <path
            d="M51.9597 47.7996C51.4854 47.9373 50.9935 48.0047 50.4997 47.9996H6.49996C4.9101 47.995 3.38668 47.3614 2.26248 46.2371C1.13827 45.1129 0.504644 43.5895 0.5 41.9997V5.99989C0.499548 4.7876 0.868792 3.60401 1.55846 2.60702C2.24814 1.61003 3.22544 0.847069 4.35998 0.419922C9.95994 16.1198 23.0599 40.0197 51.9597 47.7996Z"
            fill="#2965ED"
          />
        </svg>
      );
    }
  };
  return (
    <>
      <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />

      {tabindex == 1 && (
        <>
          <div className="flex justify-center items-center  relative pb-8 ">
            <div
              className="flex flex-col gap-[36px] p-[24px] justify-center items-center rounded-[12px] ml:w-[38.33%] w-[90%] shadow_of_box ml:min-w-[500px]  "
              style={{
                borderRadius: "12px",
                background: "#FFF",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex flex-col gap-4">
                <p className="text-center font-semibold text-black-600 text-3xl">
                  Ai Powered profile creation
                </p>
                <p className=" text-center font-medium text-lg not-italic	">
                  Easy process to create your profile
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-center font-medium text-sm	not-italic">
                    1.Upload your CV/Resume.
                  </p>
                  <p className="text-center font-medium	text-sm	not-italic	">
                    2.Let system scan it and make your profile almost ready.
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-[16px] ">
                {" "}
                {loading ? (
                  <div className="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]">
                    <MiniLoader />
                    <span>Analyzing Resume, Please Wait...</span>
                  </div>
                ) : (
                  <div
                    ref={fileRef}
                    onDragOver={handleDragOver}
                    onDrop={handleFileChange}
                    className="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]"
                  >
                    <input
                      type="file"
                      name="myfile"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,"
                    />
                    {file ? (
                      <div className="w-full flex justify-center">
                        <div className="flex scr420:flex-row flex-col gap-[16px] items-center justify-between md:w-[80%] w-[95%]">
                          <div className="flex flex-row gap-[16px] items-center scr420:w-[60%] w-full scr420:justify-start justify-center  ">
                            {" "}
                            <div className="">{fileIconSeter(file)}</div>
                            <span className="text-[12px] w-[80%]">
                              {file.name}
                            </span>
                          </div>

                          <button className="sm:px-[8px] px-1 py-[6px] border border-[#06A9EF]  rounded-[12px] text-[12px] sm:text-[16px] sm:min-w-[105px] min-w-[90px]  ">
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
                            drag and drop or{" "}
                            <span
                              onClick={handleButtonClick}
                              className="text-[#06A9EF]"
                            >
                              &nbsp;Browse file{" "}
                            </span>
                            &nbsp;to upload
                          </div>
                          <p className="text-center text-[12px] font-normal text-[#7C8493]">
                            PDF or DOCS
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <span className="text-[12px] scr360:text-[14px] text-right">
                  {uploadLimit} Remaining Attempts
                </span>
              </div>

              <div className="flex flex-row gap-[24px]">
                <button
                  className="sm:px-9 py-3 px-6 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]"
                  id="button"
                  onClick={() => {
                    router.push("/home/BuildResume");
                  }}
                >
                  Cancel
                </button>

                {/* <ALink href="/auth/candidate_register"> */}

                <button
                  disabled={file && !loading ? false : true}
                  className={`sm:px-9 px-6 py-3 bg-[#06A9EF] border rounded-[12px] font-semibold text-white ${
                    file && !loading ? "opacity-100" : "opacity-50"
                  } `}
                  onClick={navigate}
                >
                  Continue
                </button>
                {/* </ALink> */}
              </div>
            </div>
          </div>
          {/* <div className="already_text_parent">
            <p className="already_text">
              Already have an account?{" "}
              <span id="sign_in">
                <a href="">Sign In</a>
              </span>
            </p>
          </div> */}
        </>
      )}
    </>
  );
};

export default CandidateAiPower;
