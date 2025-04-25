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
import { useDispatch, useSelector } from "react-redux";
import LimitUsedModal from "../../../models/limitUsedModal";
import { updateAiHit } from "../../../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../../../Redux/slices/recallSlice";
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
  const dispatch = useDispatch()
  const { clientId } = router.query;
  const [fileData, setFileData] = useState(null);
  const [uploadLimit, setUploadLimit] = useState(0);

  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [limitUsedModal, setLimitUsedModal] = useState(false);
  const [resumeErrorPopup, setResumeErrorPopup] = useState(false);
  const [count, setCount] = useState(0);
  const [docfileError, setDocFileError] = useState(false);
  const [planAvailable, setplanAvailable] = useState(false);
  const [aiHitMonthly, setAiHitMonthly] = useState(0);
  const [aiHitMonthlyLimit, setAiHitMonthlyLimit] = useState(0);
  const [activePlan, setActivePlan] = useState();
  const { recallData } = useSelector((state) => state.recall);
  const getLimits = () => {
    const aiHitMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setAiHitMonthly(aiHitMonthly);

    const aiHitMonthlyLimit = JSON.parse(
      localStorage.getItem("a")
    );
    setAiHitMonthlyLimit(aiHitMonthlyLimit);
    const activePlan = JSON.parse(localStorage.getItem("planActive"));
    setUploadLimit(aiHitMonthly ? aiHitMonthlyLimit - aiHitMonthly : 0);
    setActivePlan(activePlan);
  };
  useEffect(() => {
    getLimits();
  }, []);

  useEffect(() => {
    const planavailable =
      localStorage.getItem("planAvailable") == "true" ? true : false;
    if (planavailable) {
      setplanAvailable(planavailable);
    }
  }, []);


  useEffect(() => {
    const resumeUploadCount = localStorage.getItem("uploadCount");
    const resumeUploadCountLimit = localStorage.getItem("uploadCountLimit");
    // setUploadLimit(resumeUploadCount ? resumeUploadCountLimit - resumeUploadCount : 0);
  }, []);
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

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setLoading(true);

      setTimeout(() => {
        if (
          selectedFile.type === "application/pdf" ||
          selectedFile.type === "application/msword" ||
          selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          sendFile(selectedFile);
        } else {
          setDocFileError(true);
          toast.error("Invalid file type! Please upload a PDF or DOC file.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
        setLoading(false);
      }, 2000);
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

            if (error.message.includes("Can't find end of central directory") ||
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

    if (!planAvailable && uploadLimit <= 0) {
      setLimitUsedModal(true);
      return;
    }

    setLoading(true);
    extracteText(file).then((result) => {

      if (result[0]?.text?.length > 0) {
        axios
          .post("https://jamblix.com/api/resume/extraction", {
            data: result,
          })
          .then((res) => {
            dispatch(updateAiHit(userDataGlobal?._id));
            setTimeout(() => {
              dispatch(setRecallData(!recallData));
              getLimits();
            }, 1000);
            setLoading(false)
            if (Object.keys(res.data.data[0]).length > 0) {
              localStorage.setItem(
                "parsedResume",
                JSON.stringify(res.data.data[0])
              );
              axios
                .put(
                  "https://jamblix.com/api/subscription/updateUploadLimit/" +
                  userDataGlobal?._id
                )
                .then((res) => {
                  const result = res.data;
                  if (result.success) {
                    localStorage.setItem(
                      "uploadCount",
                      result.data.used.resumeUploded
                    );
                    dispatch(updateAiHit(userDataGlobal?._id));
                    setTimeout(() => {
                      dispatch(setRecallData(!recallData));
                      getLimits();
                    }, 1000);
                    setLoading(false);
                    setfile(file);

                    router.push(`/createResume?clientId=${clientId}`);
                  } else {
                    // localStorage.setItem("uploadCount", 0);
                    setLoading(false);
                    setfile(file);

                    router.push(`/createResume?clientId=${clientId}`);
                  }
                })
                .catch((err) => {
                  // localStorage.setItem("uploadCount", 0);
                  setLoading(false);
                  setfile(file);

                  router.push(`/createResume?clientId=${clientId}`);
                });
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
    <>
      <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />

      {tabindex == 1 && (
        <>
          <div className="flex justify-center items-center relative pb-8 ">
            <div
              className="flex flex-col gap-[36px] p-[24px] justify-center items-center rounded-[12px] ml:w-[38.33%] w-[90%] shadow_of_box ml:min-w-[500px]  "
              style={{
                borderRadius: "12px",
                background: "#FFF",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex flex-col gap-4">
                <p className="text-center font-[600] text-[22px] text-[#333333]">
                  AI Powered profile creation
                </p>
                <p className=" text-center font-[500] text-[16px] text-[#333333] not-italic	">
                  Easy process to create your profile
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-center font-[500] text-[13px] text-[#333333]	not-italic">
                    1. Upload your CV/Resume.
                  </p>
                  <p className="text-center font-[500] text-[13px] text-[#333333]	not-italic	">
                    2. Let the system scan it and make your profile ready.
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-[16px] ">
                {" "}
                {loading ? (
                  <div className="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] text-[13px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]">
                    <MiniLoader />
                    <span>Analyzing Resume, Please Wait...</span>
                  </div>
                ) : (
                  <div
                    ref={fileRef}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
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
                          <div className="flex flex-row gap-[16px] items-center scr420:w-[60%] w-full scr420:justify-start justify-center">
                            <div>{fileIconSeter(file)}</div>
                            <span className="text-[12px] w-[80%] break-all">{file.name}</span>
                          </div>
                          <button className="bg_Button sm:px-[8px] px-1 py-[6px] border border-[#06A9EF] rounded-[12px] text-[12px] sm:text-[16px] sm:min-w-[105px] min-w-[90px] cursor-pointer">
                            Browse file
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col items-center">
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
                        <div className="flex flex-col gap-[4px] font-normal">
                          <div className="flex text-center justify-center scr420:text-[14px] scr360:text-[12px] text-[10px] text-[#515B6F]">
                            drag and drop or{" "}
                            <span onClick={handleButtonClick} className="text-[#06A9EF]">
                              &nbsp;Browse file{" "}
                            </span>
                            &nbsp;to upload
                          </div>
                          <p className="text-center text-[12px] font-normal text-[#7C8493]">PDF or DOCS</p>
                        </div>
                      </>
                    )}
                  </div>

                )}
                {/* <span className="text-[12px] scr360:text-[14px] text-right">
                  {uploadLimit} Remaining Attempts
                </span> */}
              </div>

              <div className="flex flex-row gap-[24px]">
                <button
                  className=" px-6  text-[14px] text-[#333333] blue_border_Button h-[38px] font-[600] rounded-[30px]"

                  onClick={() => {
                    router.push("/createResume/BuildResume");
                  }}
                >
                  Cancel
                </button>

                {/* <ALink href="/auth/candidate_register"> */}

                <button
                  disabled={file && !loading ? false : true}
                  className={` px-6  bg_Button rounded-[30px] h-[38px] text-[14px] text-[#FFFFFF] font-[600] ${file && !loading
                    ? "opacity-100 bg_Button"
                    : "opacity-50"
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
          {resumeErrorPopup && (
            <>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                <div className="absolute ms:w-[362px] w-[90%] ">
                  <div className="rounded-[16px] w-[280px] scr420:w-[362px] p-[16px] flex flex-col gap-[26px] bg-[#ffffff]">
                    <div className="flex gap-[8px] justify-center items-center">
                      <svg
                        width="28"
                        height="34"
                        viewBox="0 0 28 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6116 15.333H15.3891V6.99968H12.6116V15.333ZM14.0003 21.4443C14.38 21.4443 14.7064 21.3076 14.9795 21.0343C15.2525 20.7612 15.3891 20.4348 15.3891 20.0551C15.3891 19.6756 15.2525 19.3493 14.9795 19.0759C14.7064 18.8029 14.38 18.6663 14.0003 18.6663C13.6206 18.6663 13.2942 18.8029 13.0212 19.0759C12.7481 19.3493 12.6116 19.6756 12.6116 20.0551C12.6116 20.4348 12.7481 20.7612 13.0212 21.0343C13.2942 21.3076 13.6206 21.4443 14.0003 21.4443ZM14.0003 29.9997C17.5928 26.7219 20.2502 23.7473 21.9724 21.0759C23.6946 18.4048 24.5557 16.0461 24.5557 13.9997C24.5557 10.8052 23.5349 8.19176 21.4932 6.15926C19.4516 4.12704 16.9539 3.11092 14.0003 3.11092C11.0467 3.11092 8.54908 4.12704 6.50741 6.15926C4.46574 8.19176 3.44491 10.8052 3.44491 13.9997C3.44491 16.0461 4.31991 18.4048 6.06991 21.0759C7.81991 23.7473 10.4634 26.7219 14.0003 29.9997ZM14.0003 33.6663C9.5281 29.8608 6.18783 26.3261 3.97949 23.0622C1.77116 19.7983 0.666992 16.7775 0.666992 13.9997C0.666992 9.83301 2.00727 6.51356 4.68783 4.04134C7.36838 1.56912 10.4725 0.333008 14.0003 0.333008C17.5281 0.333008 20.6323 1.56912 23.3128 4.04134C25.9934 6.51356 27.3337 9.83301 27.3337 13.9997C27.3337 16.7775 26.2295 19.7983 24.0212 23.0622C21.8128 26.3261 18.4725 29.8608 14.0003 33.6663Z"
                          fill="#C00000"
                        />
                      </svg>
                      <div className="font-[500] text-[20px] text-[#C00000]">
                        Upload Failed
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap w-full text-center justify-center items-center text-[#333333] font-[500] text-[14px]">
                      This file contains error, Please check the file content
                      and try to upload again.
                    </div> */}
                    <div className="text-red flex flex-col gap-2">
                      <p className="font-medium">
                        Possible reasons of failure :
                      </p>
                      <ol className="flex flex-col gap-2 ml-2 text-[14px] text-black">
                        <li className="flex">
                          <p className="min-w-[10px]">1</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"The file size exceeds the 2MB limit"`}</p>
                        </li>
                        <li className="flex">
                          <p className="min-w-[10px]">2</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"Unsupported file type. Only the latest versions of PDF and DOC files are allowed."`}</p>
                        </li>
                        <li className="flex">
                          <p className="min-w-[10px]">3</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"The PDF file contains images, which are not allowed. Please upload a text-only PDF."`}</p>
                        </li>
                      </ol>
                    </div>
                    <div className="flex w-full justify-center items-center">
                      <button
                        onClick={() => { setResumeErrorPopup(false); setLoading(false); setfile() }}
                        className="rounded-[12px] pt-2 pr-6 pb-2 pl-6 bg-[#06A9EF] text-[#FFFFFF] font-[600] text-[16px]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {docfileError && (
            <>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                <div className="absolute ms:w-[362px] w-[90%] ">
                  <div className="rounded-[16px] w-[280px] scr420:w-[362px] p-[16px] flex flex-col gap-[26px] bg-[#ffffff]">
                    <div className="flex gap-[8px] justify-center items-center">
                      <svg
                        width="28"
                        height="34"
                        viewBox="0 0 28 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.6116 15.333H15.3891V6.99968H12.6116V15.333ZM14.0003 21.4443C14.38 21.4443 14.7064 21.3076 14.9795 21.0343C15.2525 20.7612 15.3891 20.4348 15.3891 20.0551C15.3891 19.6756 15.2525 19.3493 14.9795 19.0759C14.7064 18.8029 14.38 18.6663 14.0003 18.6663C13.6206 18.6663 13.2942 18.8029 13.0212 19.0759C12.7481 19.3493 12.6116 19.6756 12.6116 20.0551C12.6116 20.4348 12.7481 20.7612 13.0212 21.0343C13.2942 21.3076 13.6206 21.4443 14.0003 21.4443ZM14.0003 29.9997C17.5928 26.7219 20.2502 23.7473 21.9724 21.0759C23.6946 18.4048 24.5557 16.0461 24.5557 13.9997C24.5557 10.8052 23.5349 8.19176 21.4932 6.15926C19.4516 4.12704 16.9539 3.11092 14.0003 3.11092C11.0467 3.11092 8.54908 4.12704 6.50741 6.15926C4.46574 8.19176 3.44491 10.8052 3.44491 13.9997C3.44491 16.0461 4.31991 18.4048 6.06991 21.0759C7.81991 23.7473 10.4634 26.7219 14.0003 29.9997ZM14.0003 33.6663C9.5281 29.8608 6.18783 26.3261 3.97949 23.0622C1.77116 19.7983 0.666992 16.7775 0.666992 13.9997C0.666992 9.83301 2.00727 6.51356 4.68783 4.04134C7.36838 1.56912 10.4725 0.333008 14.0003 0.333008C17.5281 0.333008 20.6323 1.56912 23.3128 4.04134C25.9934 6.51356 27.3337 9.83301 27.3337 13.9997C27.3337 16.7775 26.2295 19.7983 24.0212 23.0622C21.8128 26.3261 18.4725 29.8608 14.0003 33.6663Z"
                          fill="#C00000"
                        />
                      </svg>
                      <div className="font-[500] text-[20px] text-[#C00000]">
                        Upload Failed
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap w-full text-center justify-center items-center text-[#333333] font-[500] text-[14px]">
                      Failed to process the .doc file. This file type might not
                      be supported or the file is corrupted.
                    </div> */}
                    <div className="text-red flex flex-col gap-2">
                      <p className="font-medium ">
                        Possible reasons of failure :
                      </p>
                      <ol className="flex flex-col gap-2 ml-2 text-[14px] text-black">
                        <li className="flex">
                          <p className="min-w-[10px]">1</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"The file size exceeds the 2MB limit"`}</p>
                        </li>
                        <li className="flex">
                          <p className="min-w-[10px]">2</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"Unsupported file type. Only the latest versions of PDF and DOC files are allowed."`}</p>
                        </li>
                        <li className="flex">
                          <p className="min-w-[10px]">3</p>
                          <p className="min-w-[10px]"> :</p>
                          <p>{`"The PDF file contains images, which are not allowed. Please upload a text-only PDF."`}</p>
                        </li>
                      </ol>
                    </div>

                    <div className="flex w-full justify-center items-center">
                      <button
                        onClick={() => { setDocFileError(false); setLoading(false); setfile() }}
                        className="rounded-[12px] pt-2 pr-6 pb-2 pl-6 bg-[#06A9EF] text-[#FFFFFF] font-[600] text-[16px]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CandidateAiPower;
