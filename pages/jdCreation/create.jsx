import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MiniLoader from "../../components/common/mini-loader";
import Select from "react-select";
import axios from "axios";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateAiHit } from "../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../Redux/slices/recallSlice";
import LimitUsedModal from "../../components/models/limitUsedModal";
import { TypeAnimation } from "react-type-animation";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Tesseract from "tesseract.js";
import { DocSVG, PDFSvg1, PNGICON } from "../../utils/svg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};
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
const formatJDText = (jdResult) => {
  if (!jdResult) return "";

  const sections = [
    jdResult.jobTitle && `Job Title: ${jdResult.jobTitle}`,
    jdResult.jobDescription && `Job Description:\n${jdResult.jobDescription}`,
    jdResult.responsibilities?.length &&
      `Responsibilities:\n- ${jdResult.responsibilities.join("\n- ")}`,
    jdResult.qualifications?.length &&
      `Qualifications:\n- ${jdResult.qualifications.join("\n- ")}`,
    jdResult.skills?.length && `Skills:\n- ${jdResult.skills.join("\n- ")}`,
    jdResult.benefits?.length &&
      `Benefits:\n- ${jdResult.benefits.join("\n- ")}`,
  ].filter(Boolean); // Removes undefined/false entries

  return sections.join("\n\n");
};

const convertPlainTextToHTML = (text) => {
  if (!text) return "";
  return text.replace(/\n/g, "<br/>");
};
function CreateJd() {
  const router = useRouter();
  const [toggle, setToggle] = useState(0);
  const { id } = router.query;
  const [limitPopup, setLimitPopup] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [editableText, setEditableText] = useState(null);
  const fileInputRef = useRef(null);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const containerRef = useRef(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputLine, setInputLine] = useState("");
  const [jdResult, setJdResult] = useState(null);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [fileText, setFileText] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [btnLoading, setBtnLoading] = useState({ type: 1, loading: false });
  const handleNavigate = (navigate, id) => {
    router.push(
      navigate ? "/common/jobPosting/CreateNewJob?jd=" + id : "/jdCreation"
    );
  };
  const textareaRef = useRef(null);
  const handleInputChange = (e) => {
    setInputLine(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      const lineHeight = 24;
      const maxHeight = lineHeight * 4;

      textarea.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  };
  const [previousPrompts, setPreviousPrompts] = useState([]);
  useEffect(() => {
    if (id) {
      setToggle(1);
      getJobDescriptions();
    }
  }, [id]);
  const getJobDescriptions = async () => {
    try {
      const response = await axios.get(
        `https://api.skilotech.com/api/jd/getById/${id}`
      );
      setJobTitle(response.data.data.jobTitle);
      setEditableText(response.data.data.jd);
      setJobDescription(response.data.data.jd);
    } catch (error) {
      console.error(
        "Error fetching job descriptions:",
        error.response?.data || error.message
      );
    }
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
  const addJobDescription = async (navigate) => {
    try {
      setLoading(true);
      setBtnLoading({ type: navigate ? 2 : 1, loading: true });
      const url = id
        ? `https://api.skilotech.com/api/jd/update/${id}`
        : "https://api.skilotech.com/api/jd/add";

      const method = id ? "put" : "post";

      const { data } = await axios[method](url, {
        userId: userDataGlobal?._id,
        jd: editableText,
        jobTitle: jdResult.jobTitle,
      });

      console.log(data);

      toast.success(
        `Job Description ${id ? "updated" : "added"}  successfully`
      );
      setBtnLoading({ type: 1, loading: false });

      setTimeout(() => {
        let idToSend = id ? id : data.data._id;
        handleNavigate(navigate, idToSend);
      }, 2000);

      // return response.data;
    } catch (error) {
      setBtnLoading({ type: 1, loading: false });
      console.error("Error:", error.response?.data || error.message);
      return null;
    }
  };

  const fullJDText = useMemo(() => formatJDText(jdResult), [jdResult]);
  useEffect(() => {
    if (!fullJDText) return;
    const htmlFormattedText = convertPlainTextToHTML(fullJDText);
    setEditableText(htmlFormattedText);
  }, [fullJDText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isTypingDone) {
      const interval = setInterval(() => {
        container.scrollTop = container.scrollHeight;
      }, 1000);

      return () => clearInterval(interval);
    } else {
      container.scrollTop = 0;
    }
  }, [isTypingDone]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    extracteText(selectedFile).then((result) => {
      setFileText(result[0].text);
    });
  };
  const handleGenerate = async () => {
    if (!inputLine.trim()) return;
    setAiLoading(true);
    setIsTypingDone(false);

    try {
      const response = await axios.post(
        "https://api.skilotech.com/api/generate/jobDescription",
        {
          promptLine: inputLine,
          previousPrompts:
            fileText?.length > 0
              ? [
                  {
                    prompt: "this is jd to analyze and generate",
                    JD: fileText,
                  },
                  ...previousPrompts,
                ]
              : previousPrompts,
        }
      );
      setJobTitle(response.data.jobTitle);
      setJdResult(response.data);
      setSelectedFile(null);
      setPreviousPrompts([
        ...previousPrompts,
        { prompt: inputLine, JD: response.data },
      ]);
      setInputLine("");
    } catch (error) {
      alert("Failed to generate JD");
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return (
          <svg
            width="34"
            height="34"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.2069 0L42.6425 9.96849V47.8763H7.39453V48H42.763V10.094L33.2069 0Z"
              fill="#909090"
            />
            <path
              d="M32.6577 0H7.39453V48H42.763V10.094L32.6577 0Z"
              fill="#F4F4F4"
            />
            <path
              d="M32.0263 39.4745H5.5V28.4219H32.0263V39.4745Z"
              fill="#DD2025"
            />
            <path d="M32.6582 0V10.1053H42.7635L32.6582 0Z" fill="#AEAEAE" />
            <path
              d="M12.0101 30.6527H9.92188V37.2565H11.5707V35.0305L11.935 35.0484C12.2874 35.0431 12.6365 34.9888 12.9687 34.8874C13.2599 34.8011 13.5279 34.6649 13.7563 34.487C13.9871 34.3171 14.1687 34.1033 14.2868 33.8624C14.447 33.4614 14.5043 33.0351 14.4545 32.6132C14.4446 32.3118 14.3832 32.0132 14.2724 31.7272C14.1715 31.5207 14.0219 31.3345 13.8329 31.1806C13.6439 31.0266 13.4198 30.9082 13.1748 30.8329C12.962 30.7662 12.742 30.7178 12.5181 30.6884C12.3495 30.666 12.1807 30.6541 12.0101 30.6527ZM11.7065 33.8088H11.5643V31.7726H11.8743C12.0104 31.7641 12.1469 31.7821 12.2738 31.8252C12.4008 31.8683 12.5148 31.9354 12.6076 32.0216C12.7998 32.2431 12.9025 32.5128 12.9 32.7893C12.9 33.1277 12.9 33.4345 12.5453 33.6505C12.2898 33.7716 11.9973 33.8274 11.7065 33.8088ZM17.5716 30.6348C17.3943 30.6348 17.2217 30.6458 17.1003 30.6499L16.7249 30.6582H15.4787V37.262H16.9453C17.5059 37.2753 18.0639 37.1935 18.5878 37.0213C19.0094 36.8773 19.3828 36.6451 19.6742 36.3457C19.9576 36.0437 20.161 35.692 20.2702 35.3153C20.3957 34.8886 20.4569 34.4498 20.4523 34.0096C20.4833 33.4898 20.4366 32.9687 20.3133 32.4591C20.1963 32.084 19.9772 31.7383 19.6742 31.4506C19.4365 31.2183 19.1454 31.031 18.8194 30.9003C18.5395 30.7888 18.245 30.7065 17.9423 30.6554C17.8219 30.6383 17.7 30.6305 17.578 30.632M17.2873 36.0486H17.1275V31.8331H17.1483C17.4776 31.8005 17.8109 31.8517 18.1069 31.9803C18.3236 32.1294 18.5002 32.3171 18.6245 32.5306C18.7587 32.7554 18.836 33.002 18.8514 33.2543C18.8658 33.557 18.8514 33.8046 18.8514 34.0096C18.8579 34.2458 18.8403 34.4819 18.7987 34.7154C18.7494 34.9551 18.6584 35.187 18.5287 35.4033C18.3818 35.6044 18.1834 35.7738 17.9487 35.8986C17.7516 36.0084 17.5182 36.0596 17.2841 36.0444M25.3956 30.6582H21.5132V37.262H23.1556V34.6425H25.2326V33.4153H23.1556V31.8854H25.3924V30.6582"
              fill="white"
            />
          </svg>
        );
      case "png":
      case "jpg":
      case "jpeg":
        return (
          <img
            src="/images/Document.png"
            className="h-[34px] w-[34px] object-contain"
          />
        );
      case "doc":
      case "docx":
        return <img src="/images/docIcon.png" className="h-[34px] w-[34px]" />;
      default:
        return null; // Or return a generic file icon if you have one
    }
  };
  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif", "bmp", "webp"].includes(extension)) {
      return "image";
    }

    if (["pdf", "doc", "docx"].includes(extension)) {
      return "document";
    }

    return "unknown"; // Optional fallback
  };

  return (
    <>
      <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
      <div className="flex flex-col gap-[14px]">
        <div className="flex gap-2 text-[17px] font-[500] ">
          <svg
            onClick={() => router.back()}
            className=" cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g mask="url(#mask0_9417_111600)">
              <path
                d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z"
                fill="#1C1B1F"
              />
            </g>
          </svg>
          JD Builder
        </div>

        <div className="w-full h-[calc(100vh-220px)] rounded-[32px] bg-[url('/images/ChatBotBG.png')] bg-cover bg-center grid grid-cols-[1fr_2fr] gap-9 p-6">
          <div className={` w-full h-full flex flex-col  justify-between`}>
            {(!jdResult || !jdResult?.suggestions?.length > 0) && (
              <div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col justify-center gap-[48px] mt-[0px]"
              >
                <div className="flex items-center justify-center">
                  <svg
                    width="36"
                    height="38"
                    viewBox="0 0 36 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 16.8281C10.5 16.8281 11.0793 22.2356 13.336 24.4922C15.5926 26.7488 21 27.3281 21 27.3281C21 27.3281 15.5926 27.9075 13.336 30.1641C11.0793 32.4207 10.5 37.8281 10.5 37.8281C10.5 37.8281 9.92066 32.4207 7.66405 30.1641C5.40743 27.9075 0 27.3281 0 27.3281C0 27.3281 5.40743 26.7488 7.66405 24.4922C9.92066 22.2356 10.5 16.8281 10.5 16.8281Z"
                      fill="#160211"
                    />
                    <path
                      d="M25.5 7.91406C25.5 7.91406 26.0793 13.3215 28.336 15.5781C30.5926 17.8347 36 18.4141 36 18.4141C36 18.4141 30.5926 18.9934 28.336 21.25C26.0793 23.5066 25.5 28.9141 25.5 28.9141C25.5 28.9141 24.9207 23.5066 22.664 21.25C20.4074 18.9934 15 18.4141 15 18.4141C15 18.4141 20.4074 17.8347 22.664 15.5781C24.9207 13.3215 25.5 7.91406 25.5 7.91406Z"
                      fill="#160211"
                    />
                    <path
                      d="M10.5 0C10.5 0 11.0793 5.40743 13.336 7.66405C15.5926 9.92066 21 10.5 21 10.5C21 10.5 15.5926 11.0793 13.336 13.336C11.0793 15.5926 10.5 21 10.5 21C10.5 21 9.92066 15.5926 7.66405 13.336C5.40743 11.0793 0 10.5 0 10.5C0 10.5 5.40743 9.92066 7.66405 7.66405C9.92066 5.40743 10.5 0 10.5 0Z"
                      fill="#160211"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-[400] text-center">
                  Let our Gen AI craft the perfect <br /> Job Description for
                  you.
                </div>
              </div>
            )}
            {jdResult?.suggestions?.length > 0 && (
              <div className="w-full ">
                <div className="flex flex-row gap-2 items-center mb-4">
                  <svg
                    width="26"
                    height="28"
                    viewBox="0 0 36 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 16.8281C10.5 16.8281 11.0793 22.2356 13.336 24.4922C15.5926 26.7488 21 27.3281 21 27.3281C21 27.3281 15.5926 27.9075 13.336 30.1641C11.0793 32.4207 10.5 37.8281 10.5 37.8281C10.5 37.8281 9.92066 32.4207 7.66405 30.1641C5.40743 27.9075 0 27.3281 0 27.3281C0 27.3281 5.40743 26.7488 7.66405 24.4922C9.92066 22.2356 10.5 16.8281 10.5 16.8281Z"
                      fill="#160211"
                    />
                    <path
                      d="M25.5 7.91406C25.5 7.91406 26.0793 13.3215 28.336 15.5781C30.5926 17.8347 36 18.4141 36 18.4141C36 18.4141 30.5926 18.9934 28.336 21.25C26.0793 23.5066 25.5 28.9141 25.5 28.9141C25.5 28.9141 24.9207 23.5066 22.664 21.25C20.4074 18.9934 15 18.4141 15 18.4141C15 18.4141 20.4074 17.8347 22.664 15.5781C24.9207 13.3215 25.5 7.91406 25.5 7.91406Z"
                      fill="#160211"
                    />
                    <path
                      d="M10.5 0C10.5 0 11.0793 5.40743 13.336 7.66405C15.5926 9.92066 21 10.5 21 10.5C21 10.5 15.5926 11.0793 13.336 13.336C11.0793 15.5926 10.5 21 10.5 21C10.5 21 9.92066 15.5926 7.66405 13.336C5.40743 11.0793 0 10.5 0 10.5C0 10.5 5.40743 9.92066 7.66405 7.66405C9.92066 5.40743 10.5 0 10.5 0Z"
                      fill="#160211"
                    />
                  </svg>
                  <h3 className="text-center font-semibold text-[#2B2B2B] ">
                    Suggestions for Enhancements
                  </h3>
                </div>

                <div className="flex gap-3 flex-col overflow-x-auto whitespace-nowrap px-4 py-2 no-scrollbar">
                  {jdResult.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setInputLine((prev) =>
                          prev
                            ? prev.endsWith(", ")
                              ? prev + suggestion
                              : prev + ", " + suggestion
                            : suggestion
                        );
                      }}
                      className="bg-[#F1F9FF] text-[#1A1A1A] text-[12px] rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start flex-row gap-2"
                    >
                      <img
                        src="/images/bulb.png"
                        className="h-[34px] w-[34px] object-contain"
                        alt=""
                      />{" "}
                      <div className="w-full mt-2 text-wrap">{suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 border-[1px] border-[#DEDEDE]   px-[16px] py-2 justify-between  rounded-[8px] w-full">
              {selectedFile && (
                <div className="p-2 border border-[#dedede] w-[60%] flex gap-2 rounded-[8px] relative ">
                  <button
                    className=" absolute top-1 right-1 bg-white p-[2px] rounded-full border-[0.5px] border-[#bebebe63]"
                    onClick={() => setSelectedFile(null)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label=""
                      class="icon-sm"
                    >
                      <path d="M11.1152 3.91503C11.3868 3.73594 11.756 3.7658 11.9951 4.00488C12.2341 4.24395 12.264 4.61309 12.0849 4.88476L11.9951 4.99511L8.99018 7.99999L11.9951 11.0049L12.0849 11.1152C12.264 11.3869 12.2341 11.756 11.9951 11.9951C11.756 12.2342 11.3868 12.2641 11.1152 12.085L11.0048 11.9951L7.99995 8.99023L4.99506 11.9951C4.7217 12.2685 4.2782 12.2685 4.00483 11.9951C3.73146 11.7217 3.73146 11.2782 4.00483 11.0049L7.00971 7.99999L4.00483 4.99511L3.91499 4.88476C3.73589 4.61309 3.76575 4.24395 4.00483 4.00488C4.24391 3.7658 4.61305 3.73594 4.88471 3.91503L4.99506 4.00488L7.99995 7.00976L11.0048 4.00488L11.1152 3.91503Z"></path>
                    </svg>
                  </button>
                  {getFileIcon(selectedFile.name)}
                  <div className="flex flex-col gap-1 h-full">
                    <span className="text-[12px] font-[500]">
                      {selectedFile.name.length > 30
                        ? selectedFile.name.slice(0, 30) + "..."
                        : selectedFile.name}
                    </span>
                    <span className="text-[10px]">
                      {getFileType(selectedFile.name)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-row justify-between items-end w-full">
                <textarea
                  ref={textareaRef}
                  className="w-full text-[14px] outline-none resize-none"
                  style={{
                    background: "transparent",
                    minHeight: "24px",
                    maxHeight: "120px",
                  }}
                  value={inputLine}
                  onChange={handleInputChange}
                  placeholder="Ask me your requirement"
                />
                <div className="flex flex-row gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <button
                    disabled={aiLoading}
                    style={{
                      opacity: aiLoading ? 0.5 : 1,
                    }}
                    onClick={handleButtonClick}
                  >
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_11157_130634)">
                        <path
                          d="M6.86788 26.9626C6.02363 25.8859 5.34038 24.7157 4.81813 23.4523C4.29613 22.1888 3.9505 20.8724 3.78125 19.5031H6.07738C6.22738 20.5781 6.50238 21.6094 6.90238 22.5969C7.30238 23.5844 7.82738 24.5031 8.47738 25.3531L6.86788 26.9626ZM3.78125 16.5031C3.962 15.1339 4.31063 13.8175 4.82713 12.554C5.34338 11.2905 6.03325 10.13 6.89675 9.0725L8.47738 10.6531C7.82738 11.5031 7.30238 12.4219 6.90238 13.4094C6.50238 14.3969 6.22738 15.4281 6.07738 16.5031H3.78125ZM16.4274 32.1781C15.0581 32.0184 13.748 31.6765 12.497 31.1525C11.246 30.6285 10.0793 29.9473 8.99675 29.1087L10.5774 27.4531C11.4524 28.1031 12.3774 28.6406 13.3524 29.0656C14.3274 29.4906 15.3524 29.7781 16.4274 29.9281V32.1781ZM10.6524 8.52425L8.99675 6.8975C10.1043 6.04925 11.2898 5.368 12.5533 4.85375C13.8168 4.33925 15.1331 3.99738 16.5024 3.82812V6.07812C15.4274 6.22813 14.3961 6.50837 13.4086 6.91887C12.4211 7.32962 11.5024 7.86475 10.6524 8.52425ZM19.4274 32.1781V29.9281C20.5179 29.7781 21.5616 29.5016 22.5586 29.0986C23.5556 28.6959 24.4869 28.157 25.3524 27.482L27.008 29.1087C25.9005 29.9722 24.7088 30.6574 23.4328 31.1641C22.1568 31.6709 20.8216 32.0089 19.4274 32.1781ZM25.4274 8.55313C24.5524 7.90313 23.6149 7.36563 22.6149 6.94063C21.6149 6.51562 20.5774 6.22813 19.5024 6.07812V3.82812C20.8716 3.98788 22.1917 4.32737 23.4627 4.84662C24.734 5.36562 25.9158 6.04925 27.008 6.8975L25.4274 8.55313ZM29.108 26.9338L27.5274 25.3531C28.1774 24.5031 28.7024 23.5844 29.1024 22.5969C29.5024 21.6094 29.7774 20.5781 29.9274 19.5031H32.2235C32.0427 20.8724 31.6941 22.1888 31.1776 23.4523C30.6614 24.7157 29.9715 25.8763 29.108 26.9338ZM29.9274 16.5031C29.7774 15.4281 29.5024 14.3969 29.1024 13.4094C28.7024 12.4219 28.1774 11.5031 27.5274 10.6531L29.1369 9.04363C29.9811 10.1204 30.6644 11.2905 31.1866 12.554C31.7086 13.8175 32.0543 15.1339 32.2235 16.5031H29.9274ZM16.9006 24.9838V15.332L12.6256 19.607L11.0446 18.0031L18.0256 11.0225L25.0063 18.0031L23.4024 19.5837L19.1503 15.332V24.9838H16.9006Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  </button>

                  <button
                    disabled={aiLoading}
                    style={{
                      opacity: aiLoading ? 0.5 : 1,
                    }}
                    className="flex h-[36px] w-[36px] bg-[#06A9EF] items-center justify-center  rounded-full "
                    onClick={handleGenerate}
                  >
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.34152 14.321C1.02163 14.4488 0.718071 14.4216 0.430843 14.2394C0.143614 14.0572 0 13.7919 0 13.4434V8.9721L7.33307 7.2L0 5.42791V0.95662C0 0.608132 0.143614 0.342795 0.430843 0.160607C0.718071 -0.0215811 1.02163 -0.0487669 1.34152 0.0790472L16.1247 6.31183C16.5185 6.4882 16.7155 6.78487 16.7155 7.20185C16.7155 7.61884 16.5185 7.91428 16.1247 8.08817L1.34152 14.321Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={containerRef}
            className="w-full h-[100%] bg-white border border-[#DEDEDE] rounded-[8px] relative overflow-y-scroll no-scrollbar p-6 pt-0"
          >
            {aiLoading && <LoadingComponet />}
            {jdResult ? (
              <div className=" rounded-xl w-full  text-left ">
                {jobTitle && (
                  <h2 className="text-[22px] font-semibold text-[#2B2B2B] mb-3 sticky top-0 w-full z-[1] bg-white pt-4 pb-2">
                    {jobTitle}
                  </h2>
                )}

                <div className="text-[14px] text-[#444] leading-6 whitespace-pre-wrap mt-4">
                  {!isTypingDone ? (
                    <TypeAnimation
                      sequence={[
                        fullJDText,
                        () => {
                          setIsTypingDone(true);
                        },
                      ]}
                      speed={90}
                      wrapper="span"
                      cursor={false}
                      repeat={0}
                      className="block"
                    />
                  ) : (
                    <Editor
                      value={editableText}
                      onTextChange={(e) => setEditableText(e.htmlValue)}
                      style={{ height: "360px", width: "100%" }}
                      className=" rounded-md"
                    />
                  )}
                </div>
              </div>
            ) : (
              <>
                {jobTitle && (
                  <h2 className="text-[22px] font-semibold text-[#2B2B2B] mb-3 sticky top-0 w-full z-[1] bg-white pt-4 pb-2">
                    {jobTitle}
                  </h2>
                )}
                <Editor
                  value={editableText}
                  onTextChange={(e) => setEditableText(e.htmlValue)}
                  className="mt-4 rounded-md w-full h-[90%]"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex gap-[14px] justify-end">
          <button
            disabled={aiLoading || btnLoading.loading}
            style={{
              opacity: aiLoading ? 0.5 : 1,
            }}
            className="red_border_Button px-[36px] h-[42px] rounded-[30px]"
          >
            Cancel
          </button>
          <button
            disabled={aiLoading || btnLoading.loading}
            style={{
              opacity: aiLoading ? 0.5 : 1,
            }}
            className="blue_border_Button  px-[36px] h-[42px] rounded-[30px]"
            onClick={() => addJobDescription(false)}
          >
            {btnLoading.type == 1 && btnLoading.loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#444444"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
          <button
            disabled={aiLoading || btnLoading.loading}
            style={{
              opacity: aiLoading ? 0.5 : 1,
            }}
            className="  bg_Button h-[40px] px-[36px] py-[12px] rounded-[30px]"
            onClick={() => addJobDescription(true)}
          >
            {btnLoading.type == 2 && btnLoading.loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#444444"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Save & Post"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateJd;

const LoadingComponet = () => {
  return (
    <div className="backdrop-blur-[3px] bg-white absolute w-full  z-10 h-[100%] flex  justify-center items-center">
      <div className="relative w-[130px] h-[130px] flex items-center justify-center">
        <div
          className="absolute w-full h-full rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, #FFDA1D 0deg, rgba(255, 218, 29, 0) 300deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), black 0)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 7px), black 0)",
          }}
        ></div>

        <svg
          className={`transition-all duration-700 ease-in-out animate-pulse scale-90" `}
          width="51"
          height="47"
          viewBox="0 0 51 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z"
            fill="#4C43CD"
          />
          <path
            d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z"
            fill="url(#paint0_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M24.9373 10.9533C26.6005 18.0314 30.9267 22.298 38.0051 23.9908C38.0942 24.0106 38.1437 24.0997 38.1239 24.1789C38.114 24.2383 38.0645 24.2878 38.0051 24.2977C30.8673 25.9311 26.6104 30.2967 24.9274 37.3847C24.9076 37.4738 24.8185 37.5233 24.7294 37.5035C24.67 37.4936 24.6205 37.4441 24.6106 37.3847C22.9772 30.2472 18.651 25.9806 11.5528 24.2779C11.4637 24.2581 11.4142 24.169 11.434 24.0799C11.4439 24.0205 11.4934 23.971 11.5528 23.9611C18.651 22.3277 22.9376 18.0215 24.6304 10.9434C24.6502 10.8543 24.7393 10.8048 24.8284 10.8246C24.8779 10.8642 24.9274 10.9038 24.9373 10.9533Z"
            fill="url(#paint1_radial_10719_124239)"
          />
          <path
            d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z"
            fill="#4C43CD"
          />
          <path
            d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z"
            fill="url(#paint2_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M41.6319 0.377967C42.513 4.10014 44.78 6.3473 48.5023 7.23824C48.5518 7.24814 48.5716 7.29764 48.5617 7.33724C48.5518 7.36693 48.532 7.39663 48.5023 7.39663C44.7503 8.25788 42.5031 10.5545 41.622 14.2767C41.6121 14.3262 41.5626 14.346 41.523 14.3361C41.4933 14.3262 41.4636 14.3064 41.4636 14.2767C40.6023 10.5248 38.3253 8.27768 34.5931 7.37683C34.5436 7.36693 34.5238 7.31744 34.5337 7.27784C34.5436 7.24814 34.5634 7.21844 34.5931 7.21844C38.3253 6.3572 40.5825 4.10014 41.4735 0.368068C41.4834 0.318571 41.523 0.288872 41.5725 0.298772C41.6022 0.308671 41.622 0.338369 41.6319 0.377967Z"
            fill="url(#paint3_radial_10719_124239)"
          />
          <path
            d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z"
            fill="#4C43CD"
          />
          <path
            d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z"
            fill="url(#paint4_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M7.10063 6.64208C7.97181 10.3643 10.2488 12.6114 13.9711 13.5024C14.0206 13.5123 14.0404 13.5618 14.0305 13.6014C14.0206 13.6311 14.0008 13.6607 13.9711 13.6607C10.2191 14.522 7.97181 16.8187 7.09073 20.5408C7.08083 20.5903 7.03133 20.6101 6.99173 20.6002C6.96203 20.5903 6.93233 20.5705 6.93233 20.5408C6.07105 16.789 3.7941 14.5418 0.0618737 13.641C0.0123747 13.6311 -0.00742484 13.5816 0.00247495 13.542C0.0123747 13.5123 0.0321743 13.4826 0.0618737 13.4826C3.7941 12.6213 6.05125 10.3643 6.94223 6.63218C6.95213 6.58269 7.00163 6.56289 7.04123 6.57279C7.07093 6.59259 7.10063 6.61238 7.10063 6.64208Z"
            fill="url(#paint5_radial_10719_124239)"
          />
          <path
            d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z"
            fill="#4C43CD"
          />
          <path
            d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z"
            fill="url(#paint6_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M43.1944 33.0342C44.0755 36.7564 46.3425 39.0035 50.0648 39.8945C50.1143 39.9044 50.1341 39.9539 50.1242 39.9935C50.1143 40.0232 50.0945 40.0529 50.0648 40.0529C46.3128 40.9141 44.0656 43.2108 43.1845 46.933C43.1746 46.9825 43.1251 47.0023 43.0855 46.9924C43.0558 46.9825 43.0261 46.9627 43.0261 46.933C42.1648 43.1811 39.8878 40.9339 36.1556 40.0331C36.1061 40.0232 36.0863 39.9737 36.0962 39.9341C36.1061 39.9044 36.1259 39.8747 36.1556 39.8747C39.8878 39.0134 42.145 36.7564 43.036 33.0243C43.0459 32.9748 43.0954 32.9451 43.135 32.955C43.1647 32.9847 43.1944 33.0045 43.1944 33.0342Z"
            fill="url(#paint7_radial_10719_124239)"
          />
          <path
            d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z"
            fill="#4C43CD"
          />
          <path
            d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z"
            fill="url(#paint8_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M46.3018 21.5521C46.8562 23.8982 48.2916 25.3237 50.6379 25.888C50.6676 25.8979 50.6775 25.9276 50.6676 25.9573C50.6577 25.9672 50.6478 25.9771 50.6379 25.987C48.2619 26.5315 46.8463 27.9768 46.2919 30.3328C46.282 30.3625 46.2523 30.3823 46.2226 30.3724C46.2028 30.3724 46.183 30.3526 46.183 30.3328C45.6385 27.957 44.203 26.5414 41.8469 25.9771C41.8172 25.9672 41.7974 25.9375 41.8073 25.9078C41.8073 25.888 41.8271 25.8682 41.8469 25.8682C44.203 25.3237 45.6286 23.8982 46.1929 21.5422C46.2028 21.5125 46.2325 21.4927 46.2622 21.5026C46.282 21.5125 46.3018 21.5323 46.3018 21.5521Z"
            fill="url(#paint9_radial_10719_124239)"
          />
          <path
            d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z"
            fill="#4C43CD"
          />
          <path
            d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z"
            fill="url(#paint10_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M12.2002 36.089C12.7546 38.4352 14.1901 39.8607 16.5363 40.425C16.566 40.4349 16.5858 40.4646 16.5759 40.4943C16.5759 40.5141 16.5561 40.5339 16.5363 40.5339C14.1703 41.0783 12.7546 42.5336 12.1903 44.8797C12.1804 44.9094 12.1507 44.9292 12.121 44.9193C12.1012 44.9094 12.0913 44.8995 12.0814 44.8797C11.5369 42.5039 10.1015 41.0882 7.7453 40.524C7.7156 40.5141 7.6958 40.4844 7.7057 40.4547C7.7057 40.4349 7.7255 40.4151 7.7453 40.4151C10.1015 39.8706 11.527 38.4451 12.0913 36.089C12.1012 36.0593 12.1309 36.0396 12.1606 36.0495C12.1903 36.0593 12.2002 36.0692 12.2002 36.089Z"
            fill="url(#paint11_radial_10719_124239)"
          />
          <path
            d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z"
            fill="#4C43CD"
          />
          <path
            d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z"
            fill="url(#paint12_radial_10719_124239)"
            fill-opacity="0.7"
          />
          <path
            d="M18.1468 0.245356C18.6022 2.18564 19.7902 3.36366 21.7405 3.82893C21.7603 3.83883 21.7801 3.85863 21.7702 3.87843C21.7702 3.89823 21.7504 3.90813 21.7405 3.90813C19.7803 4.3536 18.6022 5.56133 18.1369 7.51151C18.127 7.53131 18.1072 7.5511 18.0775 7.5412C18.0577 7.5412 18.0478 7.52141 18.0478 7.51151C17.6023 5.55143 16.4045 4.3734 14.4542 3.90813C14.4344 3.89823 14.4146 3.87843 14.4245 3.84873C14.4245 3.82893 14.4443 3.81903 14.4542 3.81903C16.4045 3.37356 17.5825 2.18564 18.0577 0.235456C18.0676 0.215657 18.0874 0.195859 18.1171 0.205758C18.127 0.215657 18.1468 0.225557 18.1468 0.245356Z"
            fill="url(#paint13_radial_10719_124239)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(18.4751 16.3802) rotate(51.0326) scale(22.4064 22.4083)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint1_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(34.4709 34.1719) rotate(-93.672) scale(22.8425 25.4693)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(38.2344 3.22223) rotate(51.0615) scale(11.7843 11.7828)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint3_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(46.6419 12.5834) rotate(-93.6682) scale(12.0186 13.3869)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint4_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(3.70314 9.49373) rotate(51.0429) scale(11.7796 11.7797)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint5_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(12.1106 18.8486) rotate(-93.6706) scale(12.0106 13.3869)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint6_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(39.7969 35.8785) rotate(51.0616) scale(11.7843 11.7828)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint7_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(48.2044 45.2396) rotate(-93.6682) scale(12.0186 13.3869)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint8_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(44.1445 23.349) rotate(51.0706) scale(7.44729 7.44581)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint9_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(49.4567 29.2656) rotate(-93.667) scale(7.59628 8.45843)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint10_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(10.0452 37.8958) rotate(51.0429) scale(7.4502 7.45026)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint11_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(15.3627 43.8125) rotate(-93.6706) scale(7.59631 8.46675)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint12_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(16.3617 1.73244) rotate(51.0052) scale(6.16551 6.1673)"
            >
              <stop stop-color="white" stop-opacity="0.59" />
              <stop offset="0.697917" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
            <radialGradient
              id="paint13_radial_10719_124239"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(20.7658 6.62625) rotate(-93.6756) scale(6.28312 7.01245)"
            >
              <stop stop-opacity="0.23" />
              <stop offset="0.861815" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
