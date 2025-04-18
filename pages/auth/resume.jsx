import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniLoader from "../../components/common/miniLoader";

function ResumePage({ onClose }) {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const parsedResume = localStorage.getItem("parsedResume");

    if (parsedResume) {
      axios
        .post("http://localhost:2000/api/resumeCheck", {
          resumeText: parsedResume,
        })
        .then((response) => {
          setResumeData(response.data);
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

  if (loading) return <MiniLoader />;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="flex flex-col gap-4 customMargins py-6 justify-between">
      {/* {loading && <MiniLoader />} */}

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
                  <div>
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
                  </div>
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

      <div className="flex gap-[24px] w-full ml:flex-row flex-col ml:justify-start justify-center ml:items-start items-center">
        <div className="w-1/2 flex flex-col gap-[6px]">
          <div className="text-[18px] font-[500]">
            Skilotech Generated Resume
          </div>
          <div className="w-full h-auto">
            <img src="/images/16.png" alt="" />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-[16px]">
          {section && (
            <div className="flex flex-wrap gap-4">
              {Object.entries(section).map(([key, value], i) => {
                if (Array.isArray(value) && value.length > 0) {
                  return value.map((item, idx) => (
                    <div
                      key={`${key}-${idx}`}
                      className="rounded-xl w-[548px] h-fit shadow-md p-4 bg-white border border-[#F2F4F7]"
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
                        <div className="flex items-center gap-[12px] text-[#F4A825] text-sm font-medium">
                          {item.premium && (
                            <div className="flex gap-[4px] items-center">
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="..." 
                                  fill="#FF9500"
                                />
                              </svg>
                              Premium
                            </div>
                          )}
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="..."
                              fill="#646464"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-[#F5FAFF] rounded-md">
                        <p className="text-[#101828] font-[500] text-[12px] mb-1">
                          {item.description}
                        </p>
                        <ul className="list-disc pl-5 text-[#667085] text-[12px] font-[400] leading-relaxed">
                          <li>{item.content}</li>
                        </ul>
                      </div>
                    </div>
                  ));
                }
                return null;
              })}
            </div>
          )}

          <div className="flex justify-end">
            <button className="text-[14px] font-[600] px-6  bg_Button rounded-[30px] h-[38px] ">
              Create an Resume with Skilotech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;
