import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Resume1 from "../../components/featured/resumeTemplates/Resume1";

function ResumePage() {
  const [selectedSection, setSelectedSection] = useState("tailoring");
  const [uploadPdf, setUploadPdf] = useState(null);
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

  const router = useRouter();

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

  const handleCardClick = (sectionKey) => {
    const element = document.getElementById(sectionKey);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const feedbackSections = ["tailoring", "content", "format", "sections", "style"];

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
      title: "Total Score",
      value: `${calculatedAtsScore ?? 0} / 100`,
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

            <div className="w-full md:w-1/2 flex flex-col gap-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white border border-[#F2F4F7]"
                >
                  <div className="flex items-center gap-1 bg-white mb-2">
                    <div className="h-4 w-4 bg-gray rounded-full"></div>
                    <div className="h-4 w-1/3 bg-gray rounded"></div>
                  </div>
                  <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md">
                    <div className="h-3 w-full bg-gray rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 customMargins py-6 justify-between">
            <div className="flex flex-wrap justify-evenly 420px:justify-between scr800:justify-start gap-[24px]">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  onClick={() => card.sectionKey && handleScrollToSection(card.sectionKey)}

                  className={`rounded-[16px] p-[16px] h-[100px] w-[124px] scr570:w-[166px] flex flex-col cursor-pointer ${card.custom ? "items-center" : "gap-[12px]"
                    }`}
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
                        {/* <div>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.60523 6.6775C5.48473 6.6775 5.37256 6.65825 5.26873 6.61975C5.16489 6.58125 5.06614 6.51525 4.97248 6.42175L0.478227 1.9275C0.339893 1.789 0.26906 1.61492 0.265727 1.40525C0.26256 1.19575 0.333393 1.0185 0.478227 0.8735C0.623227 0.728667 0.798893 0.65625 1.00523 0.65625C1.21156 0.65625 1.38723 0.728667 1.53223 0.8735L5.60523 4.94675L9.67823 0.8735C9.81673 0.735167 9.99081 0.664333 10.2005 0.661C10.41 0.657833 10.5872 0.728667 10.7322 0.8735C10.8771 1.0185 10.9495 1.19417 10.9495 1.4005C10.9495 1.60683 10.8771 1.7825 10.7322 1.9275L6.23798 6.42175C6.14431 6.51525 6.04556 6.58125 5.94173 6.61975C5.83789 6.65825 5.72573 6.6775 5.60523 6.6775Z"
                              fill="#646464"
                            />
                          </svg>
                        </div> */}
                      </div>
                      <div
                        className="text-[20px] scr570:text-[26px] font-[600] items-start"
                        style={{ color: card.color }}
                      >
                        {card.value}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-6 w-full md:flex-row flex-col md:justify-start justify-center md:items-start items-center">
              <div className="w-full md:w-1/2 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Your Resume</div>
                  <div className="flex justify-end">
                    <button
                      // onClick={async () => {
                      //   // await generatePerfectResume();
                      //   router.push("/createResume?clientId=undefined");
                      // }}
                      onClick={improveResume}
                      className="text-sm font-semibold px-6 bg_Button rounded-full h-[38px]"
                    >
                      Update Now
                    </button>
                  </div>
                </div>
                <div className="w-full h-auto">
                  <div className=" w-[100%] h-[480px] rounded overflow-hidden">
                    <Resume1
                      data={data}
                      isPremium={isPremium}
                      openPopup={openPopup}
                    />
                  </div>
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
                              <strong>Score:</strong> {sectionValue.score}
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
                          if (!list || list.length === 0) return null;

                          return (
                            <div
                              key={`${sectionKey}-${type}`}
                              className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white border border-[#F2F4F7]"
                            >
                              <div className="flex items-center gap-1 mb-2">
                                <span className="text-[#06A9EF] text-sm font-medium">|</span>
                                <h2 className="text-[#1D2939] text-base font-semibold">
                                  {type.replace(/([A-Z])/g, " $1")}
                                </h2>
                              </div>
                              <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md">
                                <ul className="text-[#667085] text-sm">{list.map((item, index) => (
                                  <li key={index}>
                                    <strong>{item.title ?? ""}</strong>{" "}
                                    {item.description ?? item.content}
                                  </li>
                                ))}</ul>
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
