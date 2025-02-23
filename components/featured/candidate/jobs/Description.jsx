import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LimitUsedModal from "../../../models/limitUsedModal";
import MiniLoader from "../../../common/miniLoader";
import { currenciesWithIcons } from "../../../../utils/data";

function Description({ selectedJob, filter, setLimitPopup }) {
  const router = useRouter();
  const { userDataGlobal, profileData } = useSelector(
    (state) => state.user.userData
  );
  const [appliedJobs, setAppliedJobs] = useState();
  // const [limitPopup, setLimitPopup] = useState(false)

  const isLogin = useSelector((state) => state.auth.isLogin);
  const jobApplyCount = localStorage.getItem("jobsApplyLimit");
  const isPlanActive = JSON.parse(localStorage.getItem("planActive"));

  const addJobView = async () => {
    try {
      const response = await axios.post(
        `https://dev.api.skilotech.com/api/jobs/views/${selectedJob?._id}`
      );
      localStorage.setItem("viewed", JSON.stringify(true));
      return response.data;
    } catch (error) {
      console.error(
        "Error adding view:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const isViewed = localStorage.getItem("viewed");
    console.log(isViewed);
    if (isViewed === "false") {
      addJobView();
    }
  }, []);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClick = (jobId) => {
    const link = `https://testing.d3pnzi93uiabob.amplifyapp.com/jobs/candidate/JobDetails?id=${jobId}&isShared=true`;
    setCopied(false);
    setGeneratedLink(link);
    setShowPopup(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  };
  return (
    <>
      <div>
        {selectedJob && (
          <>
            <div
              onWheel={(e) => e.stopPropagation()}
              className="p-2 scr700:p-[16px]  bg-[#fff] rounded-[12px] flex flex-col gap-[16px]   overflow-y-scroll "
            >
              {selectedJob?.description?.length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <div className="text-[16px] font-[600]">
                    Full job Description
                  </div>
                  <div className="text-[14px] font-[400] gap-[8px] flex flex-col">
                    <div
                      className="px-4"
                      dangerouslySetInnerHTML={{
                        __html: selectedJob.description,
                      }}
                    />
                  </div>
                </div>
              )}
              {selectedJob.requiredQualification && (
                <div className="flex flex-col gap-[10px] pb-[6px]">
                  <div className="text-[16px] font-[600]">Qualifications :</div>

                  <div className="text-[14px] font-[400]">
                    {selectedJob.requiredQualification} <br />
                    {selectedJob.experience && (
                      <>Total Experience {selectedJob.experience} (Required) </>
                    )}
                  </div>
                </div>
              )}
              {selectedJob.mustSkills && (
                <div className="flex flex-col gap-[10px] pb-[6px]">
                  <div className="text-[16px] font-[600]">Skills :</div>

                  <div className="text-[14px] font-[400]">
                    {selectedJob.mustSkills.join(", ")}
                  </div>
                </div>
              )}

              <div className="pb-[12px]  flex flex-col gap-2">
                <div className="flex flex-col gap-[16px] text-[12px] text-[#333] font-[500]">
                  <div className="text-[14px] font-[600] ">
                    Job Type :{" "}
                    <span className="text-[14px] font-[500]">
                      {" "}
                      {selectedJob.jobType}
                    </span>
                  </div>
                  {(selectedJob.minSalary > 0 || selectedJob.maxSalary > 0) && (
                    <div className="text-[14px] font-[600] flex">
                      Salary :
                      {(() => {
                        const icon = currenciesWithIcons?.find(
                          (item) =>
                            item?.icon?.toLowerCase() ===
                            selectedJob?.currency?.toLowerCase()
                        );

                        return (
                          <div className="text-[14px] font-[500]">
                            {icon ? icon.symbol : selectedJob?.currency}{" "}
                            {selectedJob.minSalary}{" "}
                            {selectedJob.minSalary &&
                              selectedJob.maxSalary &&
                              "-"}{" "}
                            {icon ? icon.symbol : selectedJob?.currency}{" "}
                            {selectedJob.maxSalary}{" "}
                            {selectedJob.salaryType === "Annual"
                              ? "per annum"
                              : "per month"}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  {selectedJob.qualificationType && (
                    <div className="text-[14px] font-[600] ">
                      Education :{" "}
                      <span className="text-[14px] font-[500]">
                        {selectedJob.requiredQualification} (Preferred)
                      </span>
                    </div>
                  )}
                  {selectedJob.experience && (
                    <div className="text-[14px] font-[600] ">
                      Experience :{" "}
                      <span className="text-[14px] font-[500]">
                        Total Work : {selectedJob.experience} (Required)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-[24px]">
                <button
                  disabled={
                    (selectedJob?.matchedApplication?.applicantId ===
                      userDataGlobal?._id &&
                      isLogin) ||
                    selectedJob.status === "Hold"
                  }
                  onClick={() => {
                    if (isLogin) {
                      if (jobApplyCount > 0) {
                        if (
                          selectedJob?.matchedApplication?.applicantId !==
                          userDataGlobal?._id
                        ) {
                          router.push(
                            `/jobs/candidate/ApplyForm?id=${selectedJob._id}`
                          );
                        }
                      } else {
                        router.push(
                          `/jobs/candidate/ApplyForm?id=${selectedJob._id}`
                        );
                      }
                    } else {
                      router.push(`/auth?signin=true&role=user`);
                    }
                  }}
                  className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[12px] px-[36px] rounded-[30px] ${
                    (selectedJob?.matchedApplication?.applicantId ===
                      userDataGlobal?._id &&
                      isLogin) ||
                    selectedJob.status === "Hold"
                      ? "cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                >
                  {selectedJob?.matchedApplication?.applicantId ===
                    userDataGlobal?._id && isLogin
                    ? "Applied"
                    : "Apply"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(selectedJob._id);
                  }}
                  className="text-[14px] font-[600] border-[1px] border-[#06A9EF] text-[#333333] flex items-center gap-[2px] py-[12px] px-[36px] rounded-[30px]"
                >
                  Share
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.8055 19.5C14.057 19.5 13.4215 19.2383 12.899 18.7148C12.3767 18.1913 12.1155 17.5556 12.1155 16.8078C12.1155 16.7078 12.1501 16.4648 12.2193 16.0788L5.10775 11.8923C4.86675 12.1423 4.58042 12.3381 4.24875 12.4798C3.91708 12.6214 3.56175 12.6923 3.18275 12.6923C2.43758 12.6923 1.80417 12.4294 1.2825 11.9038C0.760833 11.3781 0.5 10.7435 0.5 10C0.5 9.2565 0.760833 8.62192 1.2825 8.09625C1.80417 7.57058 2.43758 7.30775 3.18275 7.30775C3.56175 7.30775 3.91708 7.37858 4.24875 7.52025C4.58042 7.66192 4.86675 7.85775 5.10775 8.10775L12.2193 3.93075C12.1796 3.80775 12.1523 3.68725 12.1375 3.56925C12.1228 3.45125 12.1155 3.32558 12.1155 3.19225C12.1155 2.44442 12.3774 1.80875 12.9012 1.28525C13.4252 0.761749 14.0615 0.5 14.81 0.5C15.5585 0.5 16.1939 0.762 16.7163 1.286C17.2388 1.80983 17.5 2.446 17.5 3.1945C17.5 3.943 17.2383 4.5785 16.7148 5.101C16.1913 5.62333 15.5556 5.8845 14.8077 5.8845C14.4269 5.8845 14.0727 5.81208 13.7452 5.66725C13.4176 5.52242 13.1333 5.325 12.8923 5.075L5.78075 9.2615C5.82042 9.38467 5.84767 9.50517 5.8625 9.623C5.87717 9.741 5.8845 9.86667 5.8845 10C5.8845 10.1333 5.87717 10.259 5.8625 10.377C5.84767 10.4948 5.82042 10.6153 5.78075 10.7385L12.8923 14.925C13.1333 14.675 13.4176 14.4776 13.7452 14.3328C14.0727 14.1879 14.4269 14.1155 14.8077 14.1155C15.5556 14.1155 16.1913 14.3774 16.7148 14.9012C17.2383 15.4252 17.5 16.0615 17.5 16.81C17.5 17.5585 17.238 18.1939 16.714 18.7163C16.1902 19.2388 15.554 19.5 14.8055 19.5ZM14.8077 18C15.1456 18 15.4287 17.8857 15.6572 17.6572C15.8857 17.4287 16 17.1456 16 16.8078C16 16.4699 15.8857 16.1868 15.6572 15.9583C15.4287 15.7296 15.1456 15.6152 14.8077 15.6152C14.4699 15.6152 14.1868 15.7296 13.9583 15.9583C13.7296 16.1868 13.6152 16.4699 13.6152 16.8078C13.6152 17.1456 13.7296 17.4287 13.9583 17.6572C14.1868 17.8857 14.4699 18 14.8077 18ZM3.18275 11.1923C3.52325 11.1923 3.80867 11.078 4.039 10.8495C4.2695 10.621 4.38475 10.3378 4.38475 10C4.38475 9.66217 4.2695 9.379 4.039 9.1505C3.80867 8.922 3.52325 8.80775 3.18275 8.80775C2.84758 8.80775 2.56667 8.922 2.34 9.1505C2.11333 9.379 2 9.66217 2 10C2 10.3378 2.11333 10.621 2.34 10.8495C2.56667 11.078 2.84758 11.1923 3.18275 11.1923ZM14.8077 4.38475C15.1456 4.38475 15.4287 4.27042 15.6572 4.04175C15.8857 3.81325 16 3.53008 16 3.19225C16 2.85442 15.8857 2.57125 15.6572 2.34275C15.4287 2.11425 15.1456 2 14.8077 2C14.4699 2 14.1868 2.11425 13.9583 2.34275C13.7296 2.57125 13.6152 2.85442 13.6152 3.19225C13.6152 3.53008 13.7296 3.81325 13.9583 4.04175C14.1868 4.27042 14.4699 4.38475 14.8077 4.38475Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
        {showPopup && (
          <>
            <div
              onClick={() => setShowPopup(false)}
              className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"
            ></div>
            <div
              onClick={() => setShowPopup(false)}
              className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   "
            >
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  zIndex: 1000,

                  height: "140px",
                }}
                className="sm:w-[400px] w-[300px]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h3>Share Job Link</h3>
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy();
                        }}
                        className="text-blue"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {copied ? "Link Copied!" : "Copy Link"}
                      </button>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowPopup(false)}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.99735 11.1271L3.50485 17.6191C3.21518 17.9091 2.86402 18.0508 2.45135 18.0441C2.03835 18.0378 1.68702 17.8898 1.39735 17.6001C1.10768 17.3104 0.96285 16.9559 0.96285 16.5366C0.96285 16.1173 1.10768 15.7628 1.39735 15.4731L7.87035 9.0001L1.37835 2.5576C1.08835 2.26793 0.946683 1.91343 0.95335 1.4941C0.959683 1.0751 1.10768 0.720761 1.39735 0.431094C1.68702 0.141094 2.04152 -0.00390625 2.46085 -0.00390625C2.88018 -0.00390625 3.23468 0.141094 3.52435 0.431094L9.99735 6.9231L16.4398 0.431094C16.7295 0.141094 17.0807 -0.00390625 17.4933 -0.00390625C17.9063 -0.00390625 18.2577 0.141094 18.5473 0.431094C18.8577 0.741095 19.0128 1.10059 19.0128 1.5096C19.0128 1.9186 18.8577 2.26793 18.5473 2.5576L12.0743 9.0001L18.5663 15.4926C18.8563 15.7823 19.0013 16.1334 19.0013 16.5461C19.0013 16.9591 18.8563 17.3104 18.5663 17.6001C18.2563 17.9104 17.8968 18.0656 17.4878 18.0656C17.0788 18.0656 16.7295 17.9104 16.4398 17.6001L9.99735 11.1271Z"
                            fill="#333333"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Description;
