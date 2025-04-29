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

function ResumePage() {
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
  const { id, isApplication, isResume } = router.query;

  console.log(22, resumeData);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/resumeEvaluation/" + id)
      .then((res) => {

        setResumeData(res?.data?.data?.evaluation[0].feedback);
        setData(res?.data?.data?.enhancedVersion)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

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





  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const evaluateResume = useCallback(async () => {
    const parsedResume = localStorage.getItem("parsedResume");

    if (!parsedResume || hasFetched.current) return;

    hasFetched.current = true;

    try {
      setLoading(true);
      const resumeJson = JSON.parse(parsedResume);

      const res = await axios.post("https://jamblix.com/api/resume-evaluate", {
        resumeText: resumeJson,
      });

      const { atsScore, feedback } = res.data;
      setResumeData(feedback);
      console.log(res.data)
    } catch (err) {
      setError("Evaluation Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    evaluateResume();
  }, [evaluateResume]);

  const sectionRefs = {
    tailoring: useRef(null),
    content: useRef(null),
    format: useRef(null),
    sections: useRef(null),
    style: useRef(null),
  };

  const handleScrollToSection = (sectionKey) => {
    const sectionRef = sectionRefs[sectionKey];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const improveResume = async () => {
    const parsedResume = localStorage.getItem("parsedResume");
    if (!parsedResume || !resumeData) return;

    try {
      setLoading(true);
      const resumeJson = JSON.parse(parsedResume);
      const res = await axios.post("https://jamblix.com/api/resume-improve", {
        resumeText: resumeJson,
        feedback: resumeData,
      });

      const improvedResume = res.data.improvedResume;

      setImprovedResume(improvedResume);
      setParsedData(improvedResume);
      setIsPremium(true);
      localStorage.setItem("parsedResume", JSON.stringify(improvedResume));

      const {
        first_name,
        last_name,
        email,
        mobileNo,
        designation,
        summary,
        address,
        skills,
        country,
        languages,
        hobbies,
        education,
        projects,
        internship,
        references,
        achievements,
        ["social links"]: socialLinks,
        ["extra-curricular activities"]: extraCaricularActivity,
        ["work experience"]: workExperience,
        work_experience,
        ["certification/courses"]: courses,
      } = improvedResume;

      const currentYear = new Date().getFullYear();
      const experience = workExperience || work_experience || [];

      setData({
        showSkills: true,
        showAchievements: true,
        showCourses: true,
        showExtraCariculam: true,
        showHobbies: true,
        showInternship: true,
        showLanguage: true,
        showLinks: true,
        showCustomSection: true,
        showProject: true,
        showReference: true,
        firstName: first_name,
        lastName: last_name,
        email: email,
        dial_code: null,
        mobileNumber: mobileNo,
        designation: designation,
        summery: summary,
        location: address,
        country: country,
        skills: skills?.map((item) => ({ skill: item, rating: [5, 5, 5, 5, 5] })) || [],
        hobbies: hobbies?.map((item) => ({ title: item })) || [],
        languages: languages?.map((item) => ({ languages: item, rating: [3, 3, 3] })) || [],
        education: education?.map((item) => ({
          qualification: item.courseName,
          specialization: item["Specialization/Board"],
          instituteName: item["University Name"],
          type: "full-time",
          location: "",
          duration: {
            start: { year: item["Passing Year"]?.startDate?.year || "Year", month: null },
            end: { year: item["Passing Year"]?.endDate?.year || "Year", month: null },
          },
        })) || [],
        experience: experience?.map((item) => ({
          designation: item.title,
          organization: item.company,
          description: item.description,
          currentlyWorking: false,
          location: item.location,
          duration: {
            start: { year: item.start_date?.year || "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year || "Year",
              month: null,
            },
          },
        })) || [],
        project: projects?.map((item) => ({
          title: item.title,
          organization: item.organization,
          description: item.description,
          currentlyWorking: false,
          duration: {
            start: { year: item.start_date?.year || "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year || "Year",
              month: null,
            },
          },
        })) || [],
        internship: internship?.map((item) => ({
          title: item.title,
          organization: item.organization,
          description: item.description,
          currentlyWorking: false,
          duration: {
            start: { year: item.start_date?.year || "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year || "Year",
              month: null,
            },
          },
        })) || [],
        extraCaricularData: extraCaricularActivity?.map((item) => ({
          title: item.title,
          organization: item.organization,
          description: item.description,
          currentlyWorking: false,
          duration: {
            start: { year: item.start_date?.year || "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year || "Year",
              month: null,
            },
          },
        })) || [],
        course: courses?.map((item) => ({
          title: item.title,
          organization: item.organization,
          description: item.description,
          currentlyWorking: true,
          duration: {
            start: { year: item.start_date?.year || "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year || "Year",
              month: null,
            },
          },
        })) || [],
        socialLinks: socialLinks?.map((item) => ({
          platform: item.platform,
          link: item.link,
        })) || [],
        reference: references?.map((item) => ({
          referantName: item.referantName,
          designation: item.designation,
          "Organization Name": item["Organization Name"],
          email: item.name,
        })) || [],
        achievements: achievements?.map((item) => ({ title: item.title })) || [],
      });

      setLoading(false);
    } catch (err) {
      setError("Improvement Error: " + err.message);
      setLoading(false);
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
      title: "ATS Score",
      value: `${calculatedAtsScore ?? 0} %`,
      bg: "linear-gradient(31.62deg, #06A9EF 14.94%, #A2E3FF 99.61%)",
      textColor: "#FFFFFF",
      custom: true,
    },
    {
      title: "Tailoring",
      value: `${resumeData?.tailoring?.score ?? 0}%`,
      color: "#34C759",
      sectionKey: "tailoring",
    },
    {
      title: "Content",
      value: `${resumeData?.content?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "content",
    },
    {
      title: "Format",
      value: `${resumeData?.format?.score ?? 0}%`,
      color: "#34C759",
      sectionKey: "format",
    },
    {
      title: "Sections",
      value: `${resumeData?.sections?.score ?? 0}%`,
      color: "#B3261E",
      sectionKey: "sections",
    },
    {
      title: "Style",
      value: `${resumeData?.style?.score ?? 0}%`,
      color: "#FF9500",
      sectionKey: "style",
    },
  ];


  if (error) return <div className="text-red-600 text-center">{error}</div>;

  const handlePayment = () => {
    console.log("Payment initiated");
  };

  const steps = [
    { label: "Parsing your resume", icon: <FileText className="w-5 h-5" /> },
    { label: "Analyzing your experience", icon: <Brain className="w-5 h-5" /> },
    { label: "Extracting your skills", icon: <BadgeCheck className="w-5 h-5" /> },
    { label: "Generating recommendations", icon: <Sparkles className="w-5 h-5" /> },
  ];
  const MyComponent = ({ pageLayout }) => {
    return (
      <Document dpi={72} >
        <Template1
          data={data}
          selectedColor={"#414042"}
          selectedFont={"Lato"}
          pageLayout={pageLayout}
        />
      </Document>
    );
  };


  return (
    <>
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
              <div className="h-6 w-1/2 bg-gray rounded"></div>
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
                            <CheckCircle className="text-green-500 w-6 h-6" />
                          ) : isActive ? (
                            <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <span
                          className={`transition-colors duration-300 ${isCompleted
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
        //   <div className="flex items-center justify-center min-h-screen bg-[#eef1f8]">
        //   <div className="bg-[#dfe6f3] px-8 py-10 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
        //     {steps.map((step, index) => {
        //       const isActive = index === activeStep;
        //       const isCompleted = index < activeStep;

        //       return (
        //         <div key={index} className="relative">
        //           <div className="flex items-center space-x-4 text-lg z-10">
        //             {/* Left-side dynamic SVG icons */}
        //             <div className="w-6 h-6">
        //               {isCompleted ? (
        //                 <CheckCircle className="text-green-500 w-6 h-6" />
        //               ) : isActive ? (
        //                 <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
        //               ) : (
        //                 step.icon
        //               )}
        //             </div>

        //             {/* Step Label */}
        //             <span
        //               className={`transition-colors duration-300 ${
        //                 isCompleted
        //                   ? "text-white"
        //                   : isActive
        //                   ? "text-blue-700 font-semibold"
        //                   : "text-gray-500"
        //               }`}
        //             >
        //               {step.label}
        //             </span>
        //           </div>

        //           {/* Animated underline */}
        //           {isCompleted && (
        //             <div className="absolute left-7 top-6 h-0.5 w-[calc(100%-2rem)] bg-blue-500 mt-2"></div>
        //           )}
        //         </div>
        //       );
        //     })}
        //   </div>
        // </div>
      ) : (
        <div>
          <div className="flex flex-col gap-8 customMargins py-6 justify-between">
            <div className="flex flex-wrap justify-evenly 420px:justify-between scr800:justify-start gap-[24px]">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (card.sectionKey) {
                      handleScrollToSection(card.sectionKey);
                      setSelectedSection(card.sectionKey);
                    }
                  }}

                  className={`rounded-[16px] p-[16px] h-[100px] w-[124px] scr570:w-[166px] flex flex-col cursor-pointer ${card.custom ? "items-center" : "gap-[12px]"}
                   ${selectedSection === card.sectionKey ? "ring-2 ring-[#06A9EF]" : ""}
        `}
                  style={{
                    background: card.custom ? card.bg : "#FFFFFF",
                  }}
                >
                  {card.custom ? (
                    <>
                      <div className="text-[#FFFFFF] text-[14px] scr570:text-[18px] font-[600]">
                        {card.title}
                      </div>
                      <div className="text-[#FFFFFF] text-[20px] scr570:text-[26px] font-[600]">
                        {card.value}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[#333333] text-[14px] font-[500] flex justify-between items-center w-full">
                        <div>{card.title}</div>
                      </div>
                      <div className="text-[20px] scr570:text-[26px] font-[600] items-start" style={{ color: card.color }}>
                        {card.value}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-6 w-full md:flex-row flex-col md:justify-start justify-center md:items-start items-center relative">
              <div className="w-full md:w-1/2 flex flex-col gap-1.5 sticky top-[84px] ">
                <div className=" blur-sm sticky ">

                  <div className="w-[100%]  rounded overflow-hidden  " style={{ boxShadow: "0px 4px 10px 3px #00000040", }}>
                    <PDFViewer
                      width="575px"
                      height="788px"
                      showToolbar={false}

                    >
                      <MyComponent pageLayout={true} />
                    </PDFViewer>
                  </div>
                  <div className="outline outline-[8px] ml-1 outline-[#fff] absolute h-[776px] mt-1 w-[552px] top-0"></div>
                </div>
                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
                  <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.65341 39.2358C3.62939 39.2358 2.75276 38.8712 2.02353 38.142C1.2943 37.4127 0.929688 36.5361 0.929688 35.5121V16.8935C0.929688 15.8695 1.2943 14.9928 2.02353 14.2636C2.75276 13.5344 3.62939 13.1698 4.65341 13.1698H6.51527V9.44603C6.51527 6.87045 7.42293 4.67501 9.23825 2.85969C11.0536 1.04438 13.249 0.136719 15.8246 0.136719C18.4002 0.136719 20.5956 1.04438 22.4109 2.85969C24.2262 4.67501 25.1339 6.87045 25.1339 9.44603V13.1698H26.9958C28.0198 13.1698 28.8964 13.5344 29.6256 14.2636C30.3549 14.9928 30.7195 15.8695 30.7195 16.8935V35.5121C30.7195 36.5361 30.3549 37.4127 29.6256 38.142C28.8964 38.8712 28.0198 39.2358 26.9958 39.2358H4.65341ZM15.8246 29.9265C16.8486 29.9265 17.7252 29.5619 18.4545 28.8327C19.1837 28.1034 19.5483 27.2268 19.5483 26.2028C19.5483 25.1788 19.1837 24.3021 18.4545 23.5729C17.7252 22.8437 16.8486 22.4791 15.8246 22.4791C14.8006 22.4791 13.9239 22.8437 13.1947 23.5729C12.4655 24.3021 12.1009 25.1788 12.1009 26.2028C12.1009 27.2268 12.4655 28.1034 13.1947 28.8327C13.9239 29.5619 14.8006 29.9265 15.8246 29.9265ZM10.239 13.1698H21.4102V9.44603C21.4102 7.89448 20.8671 6.57566 19.781 5.48957C18.695 4.40349 17.3761 3.86044 15.8246 3.86044C14.273 3.86044 12.9542 4.40349 11.8681 5.48957C10.782 6.57566 10.239 7.89448 10.239 9.44603V13.1698Z" fill="#07709E" />
                  </svg>
                  <p className="text-[14px] font-semibold">Enhance CV with Skilotech</p>
                </div>

              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {Object.entries(resumeData || {}).map(([sectionKey, sectionValue]) => {
                    const feedbackTypes = [
                      "strengths",
                      "areasOfConcern",
                      "improvementSuggestions",
                      "formattingRecommendations",
                      "grammarAndSpellingCorrections",
                      "idealRoleFit",
                      "missingOrWeakSections",
                      "recommendedKeywords",
                      "redundancyAndFillerContent",
                      "toneAndLanguageFeedback",
                    ];

                    return (
                      <React.Fragment key={sectionKey}>
                        <div
                          ref={sectionRefs[sectionKey]}
                          id={sectionKey}
                          className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-[#E9F6FF] border border-[#D4E3F3]"
                        >
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-[#06A9EF] text-sm font-medium">|</span>
                            <h2 className="text-[#1D2939] text-lg font-bold capitalize">
                              {sectionKey}
                            </h2>
                          </div>
                          {sectionValue.score && (
                            <p className="text-[#667085] text-sm">
                              <strong>Score:</strong> {sectionValue.score} %
                            </p>
                          )}
                          {sectionValue.scoreJustification && (
                            <p className="text-[#667085] text-sm mt-1">
                              <strong>Justification:</strong> {sectionValue.scoreJustification}
                            </p>
                          )}
                        </div>

                        {feedbackTypes.map((type) => {
                          const list = sectionValue[type];
                          if (!Array.isArray(list) || list.length === 0) return null;

                          return (
                            <div
                              key={`${sectionKey}-${type}`}
                              className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white border border-[#F2F4F7]"
                            >
                              <div className="flex items-center gap-1 mb-2">
                                <span className="text-[#06A9EF] text-sm font-medium">|</span>
                                <h2 className="text-[#1D2939] text-base font-semibold">
                                  {type.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())}
                                </h2>
                              </div>
                              <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md">
                                <ul className="text-[#667085] text-sm">
                                  {list.map((item, index) => (
                                    <li key={index}>
                                      <strong>{item.title ?? ""}</strong>{" "}
                                      {item.description ?? item.content}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
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
