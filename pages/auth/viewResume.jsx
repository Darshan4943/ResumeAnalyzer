import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  Brain,
  BadgeCheck,
  Sparkles,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  BlobProvider,
  pdf,
} from "@react-pdf/renderer";

import { useRouter } from "next/router";
import Template48 from "../../components/featured/resumeTemplates/Template48";
import Fonts from "../../public/fonts/fonts";
import DeleteModal from "../../components/common/deleteModal";
import ResumePreview from "../../components/common/ResumePreview";
import { ClosedIcon } from "../../utils/svg";
import { useSelector } from "react-redux";
<Fonts />;
function ViewResume() {
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [data, setData] = useState({});
  const [view, setView] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const hasFetched = useRef(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { id, application, skilotechCollection, myCollection } = router.query;
  const [isPayment, setIsPayment] = useState(false);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const enhanceData = JSON.parse(localStorage.getItem("enhancedVersion"));
    const improvedEvaluation = JSON.parse(
      localStorage.getItem("improvedEvaluation")
    );

    if (improvedEvaluation) {
      setResumeData(improvedEvaluation);
    }
    if (enhanceData) {
      setData(enhanceData);
    }
  }, []);
  const MyComponent = () => {
    return (
      <Document height="1124px" dpi={72}>
        <Template48
          data={data}
          selectedColor={"#F7941D"}
          selectedFont={"Lato"}
        />
      </Document>
    );
  };
  const sectionRefs = {
    tailoring: useRef(null),
    design: useRef(null),
    formatting: useRef(null),
    style: useRef(null),
    grammar: useRef(null),
    recommendedKeywords: useRef(null),
    missingOrWeakSections: useRef(null),
    toneAndLanguageFeedback: useRef(null),
  };
  const handleScrollToSection = (sectionKey) => {
    const sectionRef = sectionRefs[sectionKey];
    if (sectionRef && sectionRef.current) {
      const offset = 74;
      const elementTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = elementTop - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  };

  const tailoringScore = resumeData?.tailoring?.score ?? 0;
  const contentScore = resumeData?.content?.score ?? 0;
  const formatScore = resumeData?.format?.score ?? 0;
  const sectionsScore = resumeData?.sections?.score ?? 0;
  const styleScore = resumeData?.style?.score ?? 0;

  function formatSectionName(camelCase) {
    return camelCase
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
  const feedbackTypes = [
    "tailoring",
    "design",
    "formatting",
    "style",
    "grammar",
    "recommendedKeywords",
    "missingOrWeakSections",
    "toneAndLanguageFeedback",
  ];
  const cardData = [
    {
      title: "Tailoring",
      value: `${resumeData?.sections?.tailoring?.score ?? 0}%`,
      color: "#34C759",
      sectionKey: "tailoring",
    },
    {
      title: "Design",
      value: `${resumeData?.sections?.design?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "design",
    },
    {
      title: "Format",
      value: `${resumeData?.sections?.formatting?.score ?? 0}%`,
      color: "#34C759",
      sectionKey: "formatting",
    },
    {
      title: "Style",
      value: `${resumeData?.sections?.style?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "style",
    },
    {
      title: "Grammar",
      value: `${resumeData?.sections?.grammar?.score ?? 0}%`,
      color: "#B3261E",
      sectionKey: "grammar",
    },
    {
      title: "Recommended Keywords",
      value: `${resumeData?.sections?.recommendedKeywords?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "recommendedKeywords",
    },
    {
      title: "Missing Or Weak Sections",
      value: `${resumeData?.sections?.missingOrWeakSections?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "missingOrWeakSections",
    },
    {
      title: "Tone And Language Feedback",
      value: `${resumeData?.sections?.toneAndLanguageFeedback?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "toneAndLanguageFeedback",
    },
  ];

  const DownloadButton1 = () => (
    <BlobProvider
      document={<MyComponent />}
      fileName={`${userDataGlobal?.firstName}.pdf`}
    >
      {({ blob, url, loading, error }) => (
        <button
          onClick={() => {
            if (blob) {
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = `${userDataGlobal?.firstName}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          disabled={loading}
          style={{ opacity: loading ? "0.5" : 1 }}
          className="  flex gap-1 text-[14px] w-fit  justify-center  font-montserrat font-semibold px-3 py-2 rounded-[8px] items-center  "
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3  animate-spin "
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
            <div className="flex items-center flex-col cursor-pointer">
              <img
                src="/images/icons/download.png"
                className="h-[24px] w-[24px]"
                alt=""
              />
              <span className="text-[12px] font-semibold text-white ">
                Download
              </span>
            </div>
          )}
        </button>
      )}
    </BlobProvider>
  );

  return (
    <div>
      {loading ? (
        <div className="skeleton-loader1 customMargins flex flex-col gap-6">
          <div className="flex lg:flex-row flex-col justify-between  gap-[24px]">
            <div className="skeleton-image1 h-[182px] w-[262px] min-w-[262px]"></div>
            <div className="flex gap-x-6 gap-y-[10px] justify-between flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div
                  key={index}
                  className="skeleton-image1 h-[86px] sm:w-[190px] w-[45%] "
                ></div>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="skeleton-image1 h-[782px] w-[575px]"></div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div
                  key={index}
                  className="skeleton-image1 h-[170px] w-[536px]"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-8 customMargins py-6 justify-between">
            <div className="flex lg:flex-row flex-col justify-evenly 420px:justify-between scr800:justify-start gap-[24px]">
              <div
                className={`rounded-[16px] p-[28px] h-[182px] min-w-[262px]  w-fit cursor-pointer  flex flex-col gap-3 items-center
                    `}
                style={{
                  backgroundImage:
                    "linear-gradient(31.62deg, #06A9EF 14.94%, #A2E3FF 99.61%)",
                }}
              >
                <div className="text-[#FFFFFF] text-[30px] font-[500] flex justify-between items-center ">
                  ATS Score
                </div>
                <div className="text-[#FFFFFF] text-[36px] font-[600] ">
                  {resumeData?.atsScore} %
                </div>
              </div>
              <div className="flex gap-x-6 gap-y-[10px] flex-wrap">
                {cardData.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (card.sectionKey) {
                        handleScrollToSection(card.sectionKey);
                        setSelectedSection(card.sectionKey);
                      }
                    }}
                    className={`rounded-[16px] p-[10px] h-[86px] sm:w-[190px] w-[45%] flex flex-col bg-white cursor-pointer justify-between
                   ${
                     selectedSection === card.sectionKey
                       ? "ring-2 ring-[#06A9EF]"
                       : ""
                   }
        `}
                  >
                    <div className="text-[#333333] sm:text-[14px] text-[12px] font-[500] flex justify-between items-center w-full leading-tight">
                      <div>{card.title}</div>
                    </div>
                    <div
                      className="text-[20px]  font-[600] items-start"
                      style={{
                        color:
                          card.value > "75"
                            ? "#34C759"
                            : card.value > "50"
                            ? "#FF9500"
                            : "#B3261E",
                      }}
                    >
                      {card.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6 w-full scr1168:flex-row flex-col scr1168:justify-start justify-start scr1168:items-start items-start  relative ">
              <div className="w-full scr1168:w-1/2 ms:flex hidden flex-col gap-4 scr1168:sticky top-[84px]   ">
                <div className={`  sticky  group  `}>
                  <div
                    className="  mt-1 w-[552px] rounded overflow-hidden "
                    style={{ boxShadow: "0px 4px 10px 3px #00000040" }}
                  >
                    <PDFViewer width="575px" height="782px" showToolbar={false}>
                      <MyComponent />
                    </PDFViewer>
                  </div>
                  <div className="bg-[#00000099] rounded-[8px] overflow-hidden absolute top-[0px] left-[0px] h-[782px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center z-[200]">
                    <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]   border border-gray-200 gap-[12px] bg-[#333333CC]">
                      <div
                        className="items-center flex-col cursor-pointer hidden md:flex"
                        style={{
                          borderBottom: "1px solid #646464",
                          paddingBottom: "12px",
                        }}
                        onClick={() => {
                          setPreview(true);
                        }}
                      >
                        <img
                          src="/images/icons/visibility.png"
                          className="h-[24px] w-[24px]"
                          alt=""
                        />
                        <span className="text-[12px] font-semibold text-white ">
                          Preview
                        </span>
                      </div>
                      <div
                        onClick={() => {
                          router.push(`/createResume?isEnhanced=${true}`);
                        }}
                        className="flex items-center flex-col cursor-pointer"
                        style={{
                          borderBottom: "1px solid #646464",
                          paddingBottom: "12px",
                        }}
                      >
                        <img
                          src="/images/icons/edit.png"
                          className="h-[24px] w-[24px]"
                          alt=""
                        />
                        <span className="text-[12px] font-semibold text-white ">
                          Edit
                        </span>
                      </div>

                      <DownloadButton1 />
                    </div>
                  </div>
                  <div className="outline outline-[8px] ml-1 outline-[#fff] absolute h-[776px] mt-[7px] w-[548px] top-0 "></div>
                </div>
              </div>
              {preview && (
                <>
                  <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                  <div className="fixed z-[2000] left-0 right-0 bottom-0 flex items-center justify-center top-12">
                    <div className="bg-white flex flex-col gap-4 px-4 py-3 items-end h-[80vh]">
                      <div
                        className=" cursor-pointer"
                        onClick={() => setPreview(false)}
                      >
                        <ClosedIcon />
                      </div>

                      <PDFViewer
                        width="575px"
                        height="740px"
                        showToolbar={false}
                      >
                        <MyComponent />
                      </PDFViewer>
                    </div>
                  </div>
                </>
              )}

              <div className="w-full md:w-1/2 flex flex-col gap-4 ">
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {feedbackTypes.map((feedbackKey) => {
                    const sectionValue = resumeData?.sections?.[feedbackKey];
                    if (!sectionValue) return null;

                    return (
                      <React.Fragment key={feedbackKey}>
                        <div
                          ref={sectionRefs[feedbackKey]}
                          id={feedbackKey}
                          className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1">
                              <span className="text-[#06A9EF] text-sm font-medium">
                                |
                              </span>
                              <h2 className="text-[#1D2939] text-lg font-bold capitalize">
                                {formatSectionName(feedbackKey)}
                              </h2>
                            </div>
                            <div className="flex items-center gap-1">
                              {sectionValue.score && (
                                <p className="text-[#667085] text-sm">
                                  <strong>Score:</strong> {sectionValue.score} %
                                </p>
                              )}
                            </div>
                          </div>

                          {sectionValue.improvementsDone?.length > 0 && (
                            <div className="bg-[#ECFDF3] py-2 px-3 rounded-[6px]">
                              <p className="text-[#1D2939] font-semibold text-[15px] mb-1">
                                Improvements Made:
                              </p>
                              <ul className="list-disc list-inside text-sm text-[#475467] pl-4">
                                {sectionValue.improvementsDone.map(
                                  (improvement, index) => (
                                    <li key={index}>{improvement}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewResume;
