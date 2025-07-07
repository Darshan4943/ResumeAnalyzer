import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Resume1 from "../../components/featured/resumeTemplates/Resume1";
// import { CheckCircle, Loader2 } from "lucide-react";
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
import Template48 from "../../components/featured/resumeTemplates/Template48";
import Template47 from "../../components/featured/resumeTemplates/Template47";
import Template1 from "../../components/featured/resumeTemplates/Template1";
import { useDispatch, useSelector } from "react-redux";
import { setPageOpened } from "../../Redux/slices/websiteSlice";
import { fetchUserData } from "../../Redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

function ResumePage() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [improvedResume, setImprovedResume] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { id, application, skilotechCollection, myCollection } = router.query;
  const [isPayment, setIsPayment] = useState(false);
  console.log(isPayment);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (isLogin && userDataGlobal?.role !== "user") {
  //     dispatch(setPageOpened());
  //   }
  // }, [userDataGlobal]);

  useEffect(() => {
    const enhanceData = localStorage.getItem("enhancedVersion");
    const evaluation = localStorage.getItem("evaluation");

    if (evaluation) {
      setResumeData(evaluation);
    }
    if (enhanceData) {
      setData(enhanceData);
    }
  }, []);

  //   useEffect(() => {
  //     if (application) {

  //     }

  // }, []);

  const steps = [
    { label: "Parsing your resume", icon: <FileText className="w-5 h-5" /> },
    { label: "Analyzing your experience", icon: <Brain className="w-5 h-5" /> },
    {
      label: "Extracting your skills",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
    {
      label: "Generating recommendations",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      let url = "";
      const token = JSON.parse(localStorage.getItem("authToken"));
      if (skilotechCollection) {
        url = "https://api.skilotech.com/api/resumeEvaluation/" + id;
      } else if (myCollection) {
        url = "https://api.skilotech.com/api/folderEvaluation/" + id;
      } else if (application) {
        url = "https://api.skilotech.com/api/applicationEvaluation/" + id;
      }
      axios
        .get(url)
        .then((res) => {
          let existingUser;
          let newUser;
          if (token) {
            const decoded = jwtDecode(token.token);
            existingUser = decoded._id;
            const authToken = jwtDecode(res.data.token);
            newUser = authToken._id;
          }

          if (res?.data?.data?.paymentStatus) {
            setIsPayment(res?.data?.data?.paymentStatus);
          }
          if (!token || existingUser != newUser) {
            console.log("hii");
            setResumeData(res?.data?.data?.evaluation[0].feedback);
            setData(res?.data?.data?.enhancedVersion);
            localStorage.setItem("authToken", JSON.stringify(res?.data));
            dispatch(fetchUserData());

            localStorage.setItem(
              "enhancedVersion",
              JSON.stringify(res?.data?.data?.enhancedVersion)
            );
            localStorage.setItem(
              "evaluation",
              JSON.stringify(res?.data?.data?.evaluation[0].feedback)
            );
            localStorage.setItem(
              "improvedEvaluation",
              JSON.stringify(res?.data?.data?.improvedEvaluation[0].feedback)
            );
            const data = res?.data?.data?.enhancedVersion;

            if (data) {
              const userPaymentDetails = {
                firstName: data?.firstName,
                lastName: data?.lastName,
                dialCode: data?.dialCode,
                mobileNo: data?.mobileNumber,
                email: data?.email,
              };

              localStorage.setItem(
                "userPaymentDetails",
                JSON.stringify(userPaymentDetails)
              );
            }

            setTimeout(() => {
              setLoading(false);
            }, 1000);
          } else {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const evaluateResume = async () => {
    const parsedResume = localStorage.getItem("parsedResume");
    const resumeJson = JSON.parse(parsedResume);
    try {
      setLoading(true);

      const res = await axios.post("https://api.skilotech.com/api/resume-evaluate", {
        text: resumeJson,
      });

      setResumeData(res?.data?.data?.evaluation[0]);
      setData(res?.data?.data?.enhancedVersion);

      localStorage.setItem(
        "enhancedVersion",
        JSON.stringify(res?.data?.data?.enhancedVersion)
      );
      localStorage.setItem(
        "evaluation",
        JSON.stringify(res?.data?.data?.evaluation[0])
      );
      localStorage.setItem(
        "improvedEvaluation",
        JSON.stringify(res?.data?.data?.improvedEvaluation[0])
      );
      const data = res?.data?.data?.enhancedVersion;

      if (data) {
        const userPaymentDetails = {
          firstName: data?.firstName,
          lastName: data?.lastName,
          dialCode: data?.dialCode,
          mobileNo: data?.mobileNumber,
          email: data?.email,
        };

        localStorage.setItem(
          "userPaymentDetails",
          JSON.stringify(userPaymentDetails)
        );
      }
    } catch (err) {
      setError("Evaluation Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedEvaluation = localStorage.getItem("evaluation");
    const storedEnhancedVersion = localStorage.getItem("enhancedVersion");

    // Only evaluate resume if no data is stored already
    if (!id && (!storedEvaluation || !storedEnhancedVersion)) {
      evaluateResume();
    } else {
      // Optionally set state from localStorage to avoid blank state
      if (storedEvaluation) {
        setResumeData(JSON.parse(storedEvaluation));
      }
      if (storedEnhancedVersion) {
        const enhanced = JSON.parse(storedEnhancedVersion);
        setData(enhanced);

        const userPaymentDetails = {
          firstName: enhanced?.firstName,
          lastName: enhanced?.lastName,
          dialCode: enhanced?.dialCode,
          mobileNo: enhanced?.mobileNumber,
          email: enhanced?.email,
        };
        localStorage.setItem(
          "userPaymentDetails",
          JSON.stringify(userPaymentDetails)
        );
      }
    }
  }, []);

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

  const calculatedAtsScore = Math.round(
    (tailoringScore + contentScore + formatScore + sectionsScore + styleScore) /
      5
  );

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

  if (error) return <div className="text-red-600 text-center">{error}</div>;

  const handlePayment = () => {
    console.log("Payment initiated");
  };

  const MyComponent = ({ pageLayout }) => {
    return (
      <Document dpi={72}>
        <Template48
          data={data}
          selectedColor={"#F7941D"}
          selectedFont={"Lato"}
          pageLayout={pageLayout}
        />
      </Document>
    );
  };

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

  return (
    <>
      {isPayment && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-95"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
            <div
              style={{ boxShadow: "0px 0.5px 3px 0px #00000040" }}
              className="bg-white flex flex-col  gap-4 p-6 rounded-[10px] justify-center items-center w-[400px]"
            >
              <svg
                width="66"
                height="66"
                viewBox="0 0 66 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6706_89731)">
                  <rect width="66" height="66" rx="33" fill="#0C8A0A" />

                  <g mask="url(#mask0_6706_89731)">
                    <path
                      d="M26.7859 45.1778L15.6484 34.0403L18.7058 30.983L26.7859 39.0631L46.5131 19.3359L49.5705 22.3933L26.7859 45.1778Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6706_89731">
                    <rect width="66" height="66" rx="33" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="font-[600]">
                You have already Enhanced your Resume!
              </p>

              <button
                onClick={() => router.push("/")}
                className="h-[38px]  rounded-[30px] px-6 bg_Button text-[14px] font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
      {/* {isLogin && userDataGlobal?.role !== "user" && (
        <div
          className="bg-white z-[2000] fixed w-full top-0 ml-[-24px]"
          style={{ borderBottom: "1.5px solid #DEDEDE" }}
        >
          <div className="customMargins py-3 flex justify-between items-center">
            <img
              className="object-contain h-[40px]"
              src="/images/logo_skilotech.png"
              alt="Logo"
            />
          </div>
        </div>
      )} */}
      {loading ? (
        <div className="flex flex-col gap-4 customMargins py-6 justify-between">
          <div className="flex flex-wrap justify-evenly 420px:justify-between scr800:justify-start gap-[24px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[16px] p-[16px] h-[100px] w-[124px] scr570:w-[166px] flex flex-col gap-[12px] bg-white animate-pulse"
              >
                <div className="h-4 w-3/4 bg-gray rounded"></div>
                <div className="h-6 w-1/2 bg-gray rounded"></div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 w-full md:flex-row flex-col md:justify-start justify-center md:items-start items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-2 animate-pulse">
              <div className="w-full h-[600px] bg-white rounded">
                <div className="h-full w-full p-6 bg-gray rounded"></div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col h-full justify-center items-center">
              <div className="bg-[#dfe6f3] w-full max-w-xl px-8 py-10 rounded-2xl shadow-2xl space-y-6 h-full flex flex-col justify-center animate-pulse">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <div key={index} className="relative">
                      <div className="flex items-center space-x-4 text-lg z-10">
                        <div className="w-6 h-6 flex items-center justify-center">
                          {isCompleted ? (
                            <CheckCircle className="text-green w-6 h-6" />
                          ) : isActive ? (
                            <Loader2 className="animate-spin text-blue w-6 h-6" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <span
                          className={`transition-colors duration-300 ${
                            isCompleted
                              ? "text-green-600 font-medium"
                              : isActive
                              ? "text-blue-700 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>

                      {isCompleted && (
                        <div className="absolute left-3.5 top-7 h-0.5 w-[calc(100%-2rem)] bg-blue-500"></div>
                      )}
                    </div>
                  );
                })}
              </div>
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
                <div className={` ${!isPayment && "blur-sm"} sticky `}>
                  <div
                    className=" h-[776px] mt-1 w-[552px] rounded overflow-hidden  "
                    style={{ boxShadow: "0px 4px 10px 3px #00000040" }}
                  >
                    <PDFViewer width="575px" height="788px" showToolbar={false}>
                      <MyComponent pageLayout={true} />
                    </PDFViewer>
                  </div>
                  <div className="outline outline-[8px] ml-1 outline-[#fff] absolute h-[771px] mt-[7px] w-[548px] top-0 "></div>
                </div>
                {!isPayment && (
                  <div
                    onClick={() => {
                      const query = new URLSearchParams({ id });

                      if (skilotechCollection)
                        query.append(
                          "skilotechCollection",
                          skilotechCollection
                        );
                      if (application) query.append("application", application);
                      if (myCollection)
                        query.append("myCollection", myCollection);

                      router.push(`/payment?${query.toString()}`);
                    }}
                    className=" cursor-pointer absolute inset-0 flex flex-col gap-4 items-center justify-center h-[776px] mt-1 w-[552px]"
                  >
                    <svg
                      width="31"
                      height="40"
                      viewBox="0 0 31 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.65341 39.2358C3.62939 39.2358 2.75276 38.8712 2.02353 38.142C1.2943 37.4127 0.929688 36.5361 0.929688 35.5121V16.8935C0.929688 15.8695 1.2943 14.9928 2.02353 14.2636C2.75276 13.5344 3.62939 13.1698 4.65341 13.1698H6.51527V9.44603C6.51527 6.87045 7.42293 4.67501 9.23825 2.85969C11.0536 1.04438 13.249 0.136719 15.8246 0.136719C18.4002 0.136719 20.5956 1.04438 22.4109 2.85969C24.2262 4.67501 25.1339 6.87045 25.1339 9.44603V13.1698H26.9958C28.0198 13.1698 28.8964 13.5344 29.6256 14.2636C30.3549 14.9928 30.7195 15.8695 30.7195 16.8935V35.5121C30.7195 36.5361 30.3549 37.4127 29.6256 38.142C28.8964 38.8712 28.0198 39.2358 26.9958 39.2358H4.65341ZM15.8246 29.9265C16.8486 29.9265 17.7252 29.5619 18.4545 28.8327C19.1837 28.1034 19.5483 27.2268 19.5483 26.2028C19.5483 25.1788 19.1837 24.3021 18.4545 23.5729C17.7252 22.8437 16.8486 22.4791 15.8246 22.4791C14.8006 22.4791 13.9239 22.8437 13.1947 23.5729C12.4655 24.3021 12.1009 25.1788 12.1009 26.2028C12.1009 27.2268 12.4655 28.1034 13.1947 28.8327C13.9239 29.5619 14.8006 29.9265 15.8246 29.9265ZM10.239 13.1698H21.4102V9.44603C21.4102 7.89448 20.8671 6.57566 19.781 5.48957C18.695 4.40349 17.3761 3.86044 15.8246 3.86044C14.273 3.86044 12.9542 4.40349 11.8681 5.48957C10.782 6.57566 10.239 7.89448 10.239 9.44603V13.1698Z"
                        fill="#07709E"
                      />
                    </svg>
                    <p className="text-[14px] font-semibold">
                      Enhance CV with Skilotech
                    </p>
                    <button
                      onClick={() => {
                        const query = new URLSearchParams({ id });

                        if (skilotechCollection)
                          query.append(
                            "skilotechCollection",
                            skilotechCollection
                          );
                        if (application)
                          query.append("application", application);
                        if (myCollection)
                          query.append("myCollection", myCollection);

                        router.push(`/payment?${query.toString()}`);
                      }}
                      className="flex text-[16px] justify-center items-center bg-blue text-white font-[600] h-[40px] rounded-[30px] px-6"
                    >
                      Enhance
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  const query = new URLSearchParams({ id });

                  if (skilotechCollection)
                    query.append("skilotechCollection", skilotechCollection);
                  if (application) query.append("application", application);
                  if (myCollection) query.append("myCollection", myCollection);

                  router.push(`/payment?${query.toString()}`);
                }}
                className="flex  ms:hidden justify-center items-center bg_Button h-[40px] rounded-[30px] px-6"
              >
                Enhance CV with Skilotech
              </button>

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

                          {/* Issues */}
                          {sectionValue.issues?.length > 0 && (
                            <div className="mb-2 bg-[#E9F6FF] rounded-[6px] py-2 px-3">
                              <p className="text-[#1D2939] font-semibold text-[15px] mb-1">
                                Issues:
                              </p>
                              <ul className="list-disc list-inside text-sm text-[#475467] pl-4">
                                {sectionValue.issues.map((issue, index) => (
                                  <li key={index}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Suggestions */}
                          {sectionValue.suggestions?.length > 0 && (
                            <div className="bg-[#E9F6FF] py-2 px-3 rounded-[6px]">
                              <p className="text-[#1D2939] font-semibold text-[15px] mb-1">
                                Suggestions:
                              </p>
                              <ul className="list-disc list-inside text-sm text-[#475467] pl-4">
                                {sectionValue.suggestions.map(
                                  (suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
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

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold">{popupContent}</h2>
                <p className="mt-4">
                  Here you can add additional content related to premium
                  upgrade.
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-[#FF9500] text-white rounded-lg"
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                  <button
                    className="px-4 py-2 bg-gray text-white rounded-lg"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ResumePage;
