import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Tesseract from "tesseract.js";

import axios from "axios";

import { DocSVG, PDFSvg, PNGICON } from "../../../utils/svg";
import MiniLoader from "../../../components/common/mini-loader";
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
          console.log(err);
          return;
        }
      });
    };
    reader.readAsArrayBuffer(file);
  });
};
function JdExtraction() {
  const fileRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [uploadLimit, setUploadLimit] = useState(0);
  const [file, setfile] = useState();
  const [limitUsedModal, setLimitUsedModal] = useState(false);
  const [resumeErrorPopup, setResumeErrorPopup] = useState(false);
  const [count, setCount] = useState(0);
  const [docfileError, setDocFileError] = useState(false);
  const [planAvailable, setplanAvailable] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedFile = event.dataTransfer.files[0];
    handleFile(selectedFile);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // reads file as base64 string
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = async (selectedFile) => {
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        "application/msword" ||
        "application/docs"
      ) {
        const base64 = await fileToBase64(selectedFile);

        const fileData = {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size,
          lastModified: selectedFile.lastModified,
          content: base64,
        };

        // localStorage.setItem("uploadedResume", JSON.stringify(fileData));
        // Adjust file type checks as per your requirement
        sendFile(selectedFile);
      } else {
        setDocFileError(true);
      }
    }
  };

  const sendFile = (file) => {
    setfile(file);
  };

  const extracteText = async (file) => {
    return new Promise(async (resolve, reject) => {
      const textData = [];
      if (
        file?.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file?.type == "application/msword"
      ) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), {
              delimiters: {
                start: "12op1j2po1j2poj1po",
                end: "op21j4po21jp4oj1op24j",
              },
            });
            var text = doc.getFullText();

            textData.push({ text });
            resolve(textData);
          } catch (error) {
            if (
              error.message.includes("Can't find end of central directory") ||
              error?.properties?.error ===
                "The filetype for this file could not be identified, is this file corrupted" ||
              error?.message ===
                "The filetype for this file could not be identified, is this file corrupted ?"
            ) {
              setDocFileError(true);
            }
          }
        };
        reader.readAsBinaryString(file);
      } else if (file?.type == "image/png") {
        Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        })
          .then(({ data: { text } }) => {
            textData.push({ text });
            resolve(textData);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (file?.type == "application/pdf") {
        let fullText = "";
        const pdfTextPromises = [];
        const fileUrl = URL.createObjectURL(file);

        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          pdfTextPromises.push(fileToText(file, i));
        }
        Promise.all(pdfTextPromises)
          .then((texts) => {
            fullText = texts.join("");
            textData.push({ text: fullText });
            resolve(textData);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error("Unsupported file type.");
      }
    });
  };

  const navigate = () => {
    setLoading(true);
    extracteText(file).then((result) => {
      if (result[0]?.text?.length > 0) {
        axios
          .post("https://api.skilotech.com/api/jd/extraction", {
            jobDescription: result[0].text,
          })
          .then((res) => {
            if (res.data && Object.keys(res.data).length > 0) {
       
              localStorage.setItem("jdData", JSON.stringify(res.data));
              setLoading(false);
              router.push("/common/jobPosting/CreateNewJob");
            } else {
              setCount(count + 1);
            }
          })

          .catch((err) => {
            setLoading(false);
            console.log(err);
            extracteText();
          });
      } else {
        setResumeErrorPopup(true);

        // setLoading(false);
        // setfile();
        // setCount(count + 1);
      }
    });
  };

  //   const navigate = () => {
  //     setLoading(true);

  //     extracteText(file).then((result) => {
  //       if (result[0]?.text?.length > 0) {
  //         const extractedText = result[0].text;

  //         // 1. Send extracted text to the first API (extraction)
  //         axios
  //           .post("https://api.skilotech.com/api/resume/extraction", {
  //             data: result,
  //           })
  //           .then((res) => {
  //             if (Object.keys(res.data.data[0]).length > 0) {
  //               localStorage.setItem(
  //                 "parsedResume",
  //                 JSON.stringify(res.data.data[0])
  //               );

  //               // 2. Send extracted text to AI resume check API
  //               return axios.post("https://api.skilotech.com/api/resumeCheck", {
  //                 resumeText: extractedText,
  //               });
  //             } else {
  //               setCount(count + 1);
  //               throw new Error("Empty parsed resume");
  //             }
  //           })
  //           .then((aiRes) => {
  //             console.log("AI Feedback:", aiRes.data);
  //             setLoading(false);
  //             // router.push("/auth/Sign_up?role=user");
  //           })
  //           .catch((err) => {
  //             console.error("Error during resume processing:", err);
  //             setLoading(false);
  //           });
  //       } else {
  //         setResumeErrorPopup(true);
  //         setLoading(false);
  //       }
  //     });
  //   };

  useEffect(() => {
    if (count > 2) {
      setLoading(false);
      setfile();
      setResumeErrorPopup(true);
      setCount(0);
    } else if (count == 1 || count == 2) {
      navigate();
    }
  }, [count]);

  const fileIconSeter = (data) => {
    if (
      data.name.includes("docx") ||
      data.name.includes("doc") ||
      data.name.includes("DOC")
    ) {
      return <DocSVG />;
    } else if (data.name.includes("pdf") || data.name.includes("PDF")) {
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
    <div className="bg-[#FFFFFF] rounded-[16px] p-6 flex flex-col gap-4  overflow-hidden">
      <div className="flex flex-col gap-1">
        <p className="text-[18px] font-[600] leading-tight">
          Ai Powered Jd Extraction
        </p>
        <p className="text-[14px] font-[500] text-[#646464] leading-tight">
          Easy process to create Job
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] font-[500] text-[#646464] leading-tight">
          1. Upload your Jd.
        </p>
        <p className="text-[12px] font-[500] text-[#646464] leading-tight">
          2. Let system scan it and make your Job ready.
        </p>
      </div>
      {loading ? (
        <div className="border-dashed border-[3px] border-[#BCBCBC]  text-[14px] flex flex-col rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper h-[107px] sm:w-[360px]">
          <MiniLoader />
          <span>Analyzing Resume, Please Wait...</span>
        </div>
      ) : (
        <div
          ref={fileRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-dashed border-[3px] border-[#BCBCBC] flex flex-col sm:w-[360px] rounded-[12px] px-[8px] py-[16px] items-center justify-center gap-[8px] upload-btn-wrapper h-[107px]"
        >
          <input
            type="file"
            name="myfile"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,"
          />
          {file ? (
            <div className="w-full flex justify-center ">
              <div className="flex scr420:flex-row flex-col gap-[16px] items-center justify-between md:w-[95%] w-[95%]">
                <div className="flex flex-row gap-[16px] items-center scr420:w-[60%] w-full scr420:justify-start justify-center">
                  <div>{fileIconSeter(file)}</div>
                  <span className="text-[12px] w-[80%] break-all">
                    {file.name}
                  </span>
                </div>
                <button className="blue_border_Button sm:px-[8px] px-1 h-[38px] rounded-[30px] text-[12px] sm:text-[16px] sm:min-w-[105px] min-w-[90px] cursor-pointer">
                  Browse file
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <div className="flex flex-col gap-[4px] font-normal">
                <div className="flex text-center justify-center scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                  drag and drop or{" "}
                  <span onClick={handleButtonClick} className="text-[#06A9EF]">
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
      <div className="flex gap-6 justify-center">
        <button
          onClick={() => router.push("/common/jobPosting/CreateNewJob")}
          className=" text-[14px] px-6 font-[600] rounded-[30px] h-[38px]  blue_border_Button"
        >
          Enter Manually
        </button>

        <button
          disabled={file && !loading ? false : true}
          className={` px-6    text-[14px] font-[600] rounded-[30px] h-[38px]  leading-tight bg_Button ${
            file && !loading ? "opacity-100 bg_Button" : "opacity-50"
          } `}
          onClick={navigate}
        >
         Extract Jd
        </button>
      </div>
    </div>
  );
}

export default JdExtraction;
