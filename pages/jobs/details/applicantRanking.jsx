import React, { useEffect, useRef, useState } from "react";
// import Progress_bar from "./ProgressBar";
import Progress_bar from "../../../components/featured/jobMatching/ProgressBar";
import CloseIcon, {
  DesignationSVG,
  DocSVG,
  PDFSvg,
  PNGICON,
} from "../../../utils/svg";
import { convertBytes, fileIconSeter } from "../../../utils/middleware";
import axios from "axios";
import MatchingDetails from "../../../components/featured/jobMatching/matchingDetails";
import MiniLoader from "../../../components/common/miniLoader";

const ApplicantRanking = ({
  resumeList,
  jobPost,
  loadingg,
  setLoadingg,
  options,
  setOption,
  id,
  setResumeList,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = (resumeUrl, fileName) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = { fileName };
    link.click();
  };

  const getSyncnData = async () => {
    try {
      setLoading(true);
      const limit = options || 10;

      const response = await axios.get(
        `http://localhost:2000/api/job/appliedSyncJobs/${id}`,
        {
          params: {
            limit: limit,
          },
        }
      );

      if (response.data.success) {
        const getRankingResumes = response.data.applications.filter(
          (item) => item.isSync === true
        );

        setResumeList(
          getRankingResumes
            ?.map((item) => item?.parseData)
            ?.filter((parseData) => parseData)
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSyncnData();
  }, [options]);

  return (
    <>
      {selectedFile && showDetails === true && (
        <MatchingDetails
          data={selectedFile}
          setSelectedFile={setSelectedFile}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      )}
      {loadingg ? (
        <div className="flex items-center justify-center h-[70vh] ">
          <MiniLoader />
        </div>
      ) : (
        <>
          <div className="w-[100%] flex flex-col gap-[16px] px-4 py-4 ">
            <div class="font-montserrat text-base font-medium leading-[19.5px] text-left">
              Total Results ({resumeList?.length})
            </div>
            <div className="flex flex-row flex-wrap  gap-[18px] max-h-[95vh]  overflow-y-auto  px-4">
              {resumeList?.length > 0 ? (
                <>
                  {resumeList
                    ?.sort((a, b) => {
                      // Parse the matching_percentage of both 'a' and 'b'
                      const matchingA = isNaN(a.matching_percentage)
                        ? parseInt(a.matching_percentage.slice(0, 2))
                        : parseInt(a.matching_percentage);

                      const matchingB = isNaN(b.matching_percentage)
                        ? parseInt(b.matching_percentage.slice(0, 2))
                        : parseInt(b.matching_percentage);

                      return matchingB - matchingA;
                    })
                    ?.map((data, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-[8px]  scr1100:w-[48%] w-[100%] max-w-[300px] rounded-[16px] border border-[#DEDEDE] shadow-lg py-[16px] ml:px-[24px] px-3 min-w-[262px]"
                      >
                        <div className="flex flex-col gap-[8px]">
                          <div className="flex flex-col gap-[4px]">
                            <div className="flex gap-[4px]">
                              <span className=" text-[16px] font-500">
                                {data?.name}
                              </span>{" "}
                            </div>
                          </div>
                          <div className="border border-[#DEDEDE] w-full rounded-[8px] p-[16px] gap-2 flex flex-row justify-between items-center ">
                            <div className="flex flex-row gap-[8px] w-full justify-between items-center">
                              <div className="flex flex-row justify-start break-all w-full gap-[4px]">
                                {fileIconSeter(data)}
                                <span className="md:text-[14px] text-[14px] text-[#333333] font-medium text-center">
                                  {data?.fileName?.length > 17
                                    ? `${data?.fileName.slice(0, 14)}...`
                                    : data?.fileName}
                                </span>
                              </div>
                              <div className="flex flex-row gap-[8px] justify-end items-center ">
                                <svg
                                  onClick={() =>
                                    handleDownload(data?.url, data?.fileName)
                                  }
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="cursor-pointer"
                                >
                                  <path
                                    d="M6.99967 10.333L2.83301 6.16634L3.99967 4.95801L6.16634 7.12467V0.333008H7.83301V7.12467L9.99967 4.95801L11.1663 6.16634L6.99967 10.333ZM1.99967 13.6663C1.54134 13.6663 1.14898 13.5031 0.822591 13.1768C0.496202 12.8504 0.333008 12.458 0.333008 11.9997V9.49967H1.99967V11.9997H11.9997V9.49967H13.6663V11.9997C13.6663 12.458 13.5031 12.8504 13.1768 13.1768C12.8504 13.5031 12.458 13.6663 11.9997 13.6663H1.99967Z"
                                    fill="#333333"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-[12px] min-h-[158px] justify-start relative ">
                            <span className="text-[#333333] text-[16px] font-[500]">
                              Matching Parameters
                            </span>
                            <ul className="flex flex-col gap-[4px]">
                              {data?.matching_parameters
                                ?.slice(0, 3)
                                ?.filter((item) => {
                                  const pointsText =
                                    item?.matching_points?.toString();
                                  let points = 0;

                                  if (pointsText?.includes("out of")) {
                                    // Extract the numeric part before "out of"
                                    points = parseInt(
                                      pointsText.split(" out of")[0],
                                      10
                                    );
                                  } else {
                                    // Directly convert to number if it's just a number
                                    points = parseInt(pointsText, 10);
                                  }

                                  // Filter out items with 0 points
                                  return points !== 0;
                                })
                                ?.map((item, i) => (
                                  <React.Fragment key={i}>
                                    <li className="text-[#333333] text-[12px] font-[500] flex flex-row items-center gap-[8px]">
                                      <div>
                                        <svg
                                          width="10"
                                          height="10"
                                          viewBox="0 0 10 10"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <circle
                                            cx="5"
                                            cy="5"
                                            r="5"
                                            fill="#D9D9D9"
                                          />
                                        </svg>
                                      </div>
                                      {item?.title}/ {item?.matching_points}
                                    </li>
                                  </React.Fragment>
                                ))}
                            </ul>

                            <div className="flex flex-row justify-end items-center">
                              <span
                                onClick={() => {
                                  setSelectedFile(data), setShowDetails(true);
                                }}
                                className="text-[#06A9EF] text-[12px]  underline decoration-solid absolute text-end bottom-[-6px] right-0 cursor-pointer font-semibold "
                              >
                                See More
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
                        {parseInt(data?.matching_percentage?.slice(0, 2)) >
                        0 ? (
                          <Progress_bar
                            progress={parseInt(
                              data?.matching_percentage?.slice(0, 2)
                            )}
                          />
                        ) : (
                          <div
                            className="flex flex-row gap-2 items-center justify-between"
                            style={{ width: "100%" }}
                          >
                            <div
                              style={{
                                width: "80%",
                                background: "#8080804d",
                                borderRadius: 12,
                                fontSize: "8px",
                                height: "10px",
                              }}
                            ></div>
                            <span className="text-[14px] font-semibold">
                              0%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              ) : (
                <div className="w-full flex flex-col items-center justify-center h-full">
                  <img
                    src="/images/NoMatch.png"
                    alt=""
                    className="ml:w-[40%] md:w-[25%]"
                  />
                  <span className="text-[#808080]">No Match Found</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ApplicantRanking;
