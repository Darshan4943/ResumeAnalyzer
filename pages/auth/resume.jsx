import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniLoader from "../../components/common/miniLoader";

function ResumePage({ onClose }) {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("tailoring");
  const [isPremium, setIsPremium] = useState(false);
  const [uploadPdf, setUploadPdf] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const parsedResume = localStorage.getItem("parsedResume");
    const storedResume = localStorage.getItem("uploadedResume");
    if (storedResume) {
      const parsed = JSON.parse(storedResume);
      setUploadPdf(parsed);
    }

    if (parsedResume) {
      axios
        .post("https://jamblix.com/api/resumeCheck", {
          resumeText: parsedResume,
        })
        .then((response) => {
          setResumeData(response.data);
          setIsPremium(response.data.premium === true);
          setLoading(false);
        })

        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No resume data found in localStorage");
    }
  }, []);

  const cardData = [
    {
      title: "Total Score",
      value: `${resumeData?.atsScore ?? 0} / 100`,
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

  const section = selectedSection ? resumeData?.[selectedSection] : null;

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
                  onClick={() =>
                    card.sectionKey && setSelectedSection(card.sectionKey)
                  }
                  className={`rounded-[16px] p-[16px] h-[100px] w-[124px] scr570:w-[166px] flex flex-col cursor-pointer ${
                    card.custom ? "items-center" : "gap-[12px]"
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
                <div className="text-lg font-medium">
                 Your Resume
                </div>
                <div className="flex justify-end">
                  <button className="text-sm font-semibold px-6 bg_Button rounded-full h-[38px]">
                    Update Now
                  </button>
                </div>
                </div>
                <div className="w-full h-auto">
                  {uploadPdf && uploadPdf.type === "application/pdf" ? (
                    <iframe
                      src={`${uploadPdf.content}#toolbar=0&navpanes=0&scrollbar=1`}
                      title="Uploaded Resume"
                      className="w-full h-[600px] rounded"
                    />
                  ) : (
                    <img
                      src="/images/16.png"
                      alt="Generated Resume"
                      className="w-full object-contain blur-[2px]"
                    />
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                {section && (
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {Object.entries(section).map(([key, value]) => {
                      if (typeof value === "string" && value.trim() !== "") {
                        return (
                          <div
                            key={key}
                            className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white border border-[#F2F4F7]"
                          >
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-[#06A9EF] text-sm font-medium">
                                |
                              </span>
                              <h2 className="text-[#1D2939] text-base font-semibold">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </h2>
                            </div>
                            <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md">
                              <p className="text-[#667085] text-sm">{value}</p>
                            </div>
                          </div>
                        );
                      }

                      if (Array.isArray(value) && value.length > 0) {
                        return value.map((item, idx) => {
                          if (!item.title) return null;

                          return (
                            <div
                              key={`${key}-${idx}`}
                              className="rounded-xl w-full md:w-[548px] shadow-md p-4 bg-white border border-[#F2F4F7]"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-1">
                                  <span className="text-[#06A9EF] text-sm font-medium">
                                    |
                                  </span>
                                  <h2 className="text-[#1D2939] text-base font-semibold">
                                    {item.title}
                                  </h2>
                                </div>
                                <div className="flex items-center gap-3 text-[#F4A825] text-sm font-medium">
                                  <div className="flex gap-1 items-center">
                                    <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g mask="url(#mask0_10300_129472)">
                                        <path
                                          d="M4.5 15C4.2875 15 4.10938 14.9281 3.96563 14.7844C3.82188 14.6406 3.75 14.4625 3.75 14.25C3.75 14.0375 3.82188 13.8594 3.96563 13.7156C4.10938 13.5719 4.2875 13.5 4.5 13.5H13.5C13.7125 13.5 13.8906 13.5719 14.0344 13.7156C14.1781 13.8594 14.25 14.0375 14.25 14.25C14.25 14.4625 14.1781 14.6406 14.0344 14.7844C13.8906 14.9281 13.7125 15 13.5 15H4.5ZM5.025 12.375C4.6625 12.375 4.34063 12.2563 4.05938 12.0188C3.77813 11.7812 3.60625 11.4812 3.54375 11.1187L2.79375 6.35625C2.76875 6.35625 2.74063 6.35938 2.70938 6.36563C2.67813 6.37188 2.65 6.375 2.625 6.375C2.3125 6.375 2.04688 6.26562 1.82812 6.04688C1.60937 5.82812 1.5 5.5625 1.5 5.25C1.5 4.9375 1.60937 4.67188 1.82812 4.45312C2.04688 4.23438 2.3125 4.125 2.625 4.125C2.9375 4.125 3.20312 4.23438 3.42188 4.45312C3.64062 4.67188 3.75 4.9375 3.75 5.25C3.75 5.3375 3.74063 5.41875 3.72188 5.49375C3.70312 5.56875 3.68125 5.6375 3.65625 5.7L6 6.75L8.34375 3.54375C8.20625 3.44375 8.09375 3.3125 8.00625 3.15C7.91875 2.9875 7.875 2.8125 7.875 2.625C7.875 2.3125 7.98438 2.04688 8.20312 1.82812C8.42188 1.60937 8.6875 1.5 9 1.5C9.3125 1.5 9.57812 1.60937 9.79688 1.82812C10.0156 2.04688 10.125 2.3125 10.125 2.625C10.125 2.8125 10.0813 2.9875 9.99375 3.15C9.90625 3.3125 9.79375 3.44375 9.65625 3.54375L12 6.75L14.3438 5.7C14.3188 5.6375 14.2969 5.56875 14.2781 5.49375C14.2594 5.41875 14.25 5.3375 14.25 5.25C14.25 4.9375 14.3594 4.67188 14.5781 4.45312C14.7969 4.23438 15.0625 4.125 15.375 4.125C15.6875 4.125 15.9531 4.23438 16.1719 4.45312C16.3906 4.67188 16.5 4.9375 16.5 5.25C16.5 5.5625 16.3906 5.82812 16.1719 6.04688C15.9531 6.26562 15.6875 6.375 15.375 6.375C15.35 6.375 15.3219 6.37188 15.2906 6.36563C15.2594 6.35938 15.2312 6.35625 15.2062 6.35625L14.4562 11.1187C14.3937 11.4812 14.2219 11.7812 13.9406 12.0188C13.6594 12.2563 13.3375 12.375 12.975 12.375H5.025ZM5.025 10.875H12.975L13.4625 7.74375L12.6 8.11875C12.275 8.25625 11.9438 8.28125 11.6063 8.19375C11.2688 8.10625 10.9937 7.91875 10.7812 7.63125L9 5.175L7.21875 7.63125C7.00625 7.91875 6.73125 8.10625 6.39375 8.19375C6.05625 8.28125 5.725 8.25625 5.4 8.11875L4.5375 7.74375L5.025 10.875Z"
                                          fill="#FF9500"
                                        />
                                      </g>
                                    </svg>
                                    <button
                                      className="text-[#FF9500]"
                                      onClick={() =>
                                        openPopup("Upgrade to Premium")
                                      }
                                    >
                                      Premium
                                    </button>
                                  </div>

                                  <svg
                                    width="12"
                                    height="7"
                                    viewBox="0 0 12 7"
                                    fill="none"
                                  >
                                    <path d="..." fill="#646464" />
                                  </svg>
                                </div>
                              </div>

                              <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md relative">
                                {item.premium && (
                                  <div className="absolute inset-0 z-1000 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-md">
                                    <span className="text-[#FF9500] text-sm font-semibold">
                                      <button
                                        className="text-[#FF9500]"
                                        onClick={() =>
                                          openPopup("Upgrade to Premium")
                                        }
                                      >
                                        Upgrade to Premium
                                      </button>
                                    </span>
                                  </div>
                                )}

                                <div
                                  className={`${
                                    item.premium ? "" : "blur-[2px]"
                                  }`}
                                >
                                  <p className="text-[#101828] font-medium text-xs mb-1">
                                    {item.description}
                                  </p>
                                  <ul className="list-disc pl-5 text-[#667085] text-xs font-normal leading-relaxed">
                                    <li>{item.content}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      }

                      return null;
                    })}
                  </div>
                )}

            
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
