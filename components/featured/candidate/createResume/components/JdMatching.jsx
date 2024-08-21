import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { DesignationSVG, DocSVG } from "../../../../../utils/svg";
import Progress_bar from "../../../jobMatching/ProgressBar";
import ResumePreview from "../../../../common/ResumePreview";
import Image from "next/image";
import MatchingDetails from "../../../jobMatching/matchingDetails";
import {
  convertBytes,
  fileIconSeter,
  getFileSize,
} from "../../../../../utils/middleware";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function FileSizeDisplay({ fileUrl }) {
  const [fileSize, setFileSize] = useState(null);

  useEffect(() => {
    const getFileSize = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const size = response.headers.get("content-length");
        setFileSize(parseInt(size, 10));
      } catch (error) {
        console.error("Error calculating file size:", error);
      }
    };

    getFileSize();
  }, [fileUrl]);

  return <span>{convertBytes(fileSize)}</span>;
}

const JdMatching = ({ details, resumeList, isAnimate, setShowsideBar }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  function getAllFiles(obj) {
    let files = [];

    function traverse(node) {
      if (node.type === "file") {
        files.push({
          ...node,
        });
      } else if (node.files && node.files.length > 0) {
        files.push({
          ...node,
        });
        node.files.forEach((child) => traverse(child));
      }
    }

    traverse(obj);
    return files;
  }
  const [preview, setPreview] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [borderline, setBorderLine] = useState(false);
  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setBorderLine(true);

      const timeout2 = setTimeout(() => {
        setBorderLine(false);
      }, 1500);

      return () => clearTimeout(timeout2);
    }, 2000);

    return () => clearTimeout(timeout1);
  }, []);

  const [moveLeft, setMoveLeft] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setOne(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    if (one) {
      const timer = setTimeout(() => {
        setTwo(true);

        setOne(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [one]);

  useEffect(() => {
    if (two) {
      const timer = setTimeout(() => {
        setThree(true);
        setTwo(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [two]);

  useEffect(() => {
    if (three) {
      const timer = setTimeout(() => {
        setMoveLeft(true);
      }, 3000);
      const timer1 = setTimeout(() => {
        setFour(true);

        setThree(false);
      }, 10000);

      const timer2 = setTimeout(() => {
        setMoveLeft(false);
        setFour(false);
      }, 15000);
      const timer3 = setTimeout(() => {
        setOne(true);
      }, 18000);
      return () => {
        clearTimeout(timer, timer1, timer2, timer3);
      };
    }
  }, [three]);

  return (
    <div className="flex flex-col gap-4  min-h-[100vh] ">
      {selectedFile && showDetails === true && (
        <MatchingDetails
          data={selectedFile}
          setSelectedFile={setSelectedFile}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      )}
      {preview && (
        <>
          <ResumePreview
            selectedResumeIndex={selected.resumeTemplateIndex}
            data={selected}
            selectedColor={selected.selectedColor}
            selectedFont={selected.selectedFont}
            setPreview={setPreview}
            preview={true}
          />
        </>
      )}
      <div className="flex ml:flex-row flex-col gap-12 w-[100%] bg-[#fff] md:max-h-[100vh]">
        {!isAnimate || resumeList.length != 0 ? (
          <div className="w-[100%] flex flex-col gap-[16px] ">
            <div class="font-montserrat text-base font-medium leading-[19.5px] text-left">
              Total Results ({resumeList?.length})
            </div>
            <div className="flex flex-row flex-wrap ml:justify-between justify-center gap-[18px] max-h-[95vh]  overflow-y-auto  pr-4 ">
              {resumeList?.length > 0 ? (
                <>
                  {resumeList
                    ?.sort(
                      (a, b) =>
                        parseInt(
                          isNaN(b.matching_percentage)
                            ? b.matching_percentage.slice(0, 2)
                            : b.matching_percentage
                        ) -
                        parseInt(
                          isNaN(a.matching_percentage)
                            ? a.matching_percentage.slice(0, 2)
                            : a.matching_percentage
                        )
                    )
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
                            {/** <div className="flex flex-row gap-[8px] w-full">
                              {fileIconSeter(data)}
                              <div className="flex flex-col justify-between break-all w-full ">
                                <span className="md:text-[14px] text-[14px] text-[#333333] font-medium">
                                  {data?.fileName?.length > 17
                                    ? `${data?.fileName.slice(0, 16)}...`
                                    : data?.fileName}
                                </span>
                                <div className="flex flex-row gap-[8px] justify-end items-center ">
                                  <svg
                                    onClick={() =>
                                      (window.location.href = data?.file)
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
                            </div>*/}
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
                                    (window.location.href = data?.file)
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
        ) : (
          <div className="ml:flex hidden flex-col gap-12 w-[100%] items-center justify-center ">
            <div className="w-[100%] flex justify-between gap-4 p-[22px] scr1150:p-[44px]">
              <div className="flex flex-col items-center gap-[24px] w-[50%]">
                <div className="flex flex-col gap-[24px]">
                  <div className="flex gap-[8px] items-center">
                    <div
                      style={{
                        background: "rgb(6,169,239)",
                        background:
                          "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)",
                      }}
                      className="  h-[29px] min-w-[29px] flex rounded-[50%]"
                    >
                      <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] ">
                        1
                      </div>
                    </div>
                    <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]">
                      Select Resume from Collection
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] justify-center flex-wrap flex overflow-hidden relative ">
                  {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <>
                      <div className="mx-[12px]  my-[8px]">
                        <div
                          className={`rounded-[4px] ${
                            index === 1 && borderline === true
                              ? "border border-[#06A9EF] p-[2px]"
                              : "border  border-[#fff] p-[2px]"
                          }`}
                        >
                          <img
                            src="/images/resumeBuilder/folder.png"
                            className="w-[24px] mx-[2px] my-[2px]  h-[18px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </>
                  ))}
                  <div
                    className={`absolute  top-[27px] right-[-15px] ${
                      one ? "job_matching_animation" : ""
                    } `}
                  >
                    <img
                      src="/images/resumeBuilder/arrow_selector_tool.png"
                      className="w-[13px] h-[18px] "
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-[24px] w-[50%]">
                <div className="flex flex-col gap-[24px]">
                  <div className="flex gap-[8px] items-center ">
                    <div
                      style={{
                        background: "rgb(6,169,239)",
                        background:
                          "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)",
                      }}
                      className="  h-[29px] min-w-[29px] flex rounded-[50%]"
                    >
                      <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] ">
                        2
                      </div>
                    </div>
                    <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]">
                      Enter job Description you want
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] relative justify-center flex-wrap flex ">
                  <img
                    className="w-[117px] h-[64px]"
                    src="/images/resumeBuilder/frame4.png"
                    alt=""
                  />
                  <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: two ? 1 : 0 }}
                    transition={{
                      duration: two ? 2.5 : "",
                      delay: two ? 1.8 : "",
                    }}
                    className="absolute  top-[13px]"
                    width="93"
                    height="40"
                    viewBox="0 0 93 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4H89"
                      stroke="#06A9EF"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 20H89"
                      stroke="#06A9EF"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 36H89"
                      stroke="#06A9EF"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </motion.svg>

                  <motion.div
                    className={` w-[20px] ${
                      two ? "job_matching_animation3" : ""
                    } top-[21px] opacity-0 right-[50px] absolute h-[20px]  `}
                  >
                    <img
                      src="/images/resumeBuilder/paste.png"
                      className=" object-contain"
                      alt=""
                    />
                  </motion.div>

                  <motion.div
                    className={` absolute ${
                      two ? "job_matching_animation4" : ""
                    } opacity-0 top-[22px] right-[58px] `}
                  >
                    <img
                      src="/images/resumeBuilder/arrow_selector_tool.png"
                      className="w-[10px] h-[15px] "
                      alt=""
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="w-[100%] flex justify-center items-center overflow-hidden gap-4 p-[22px] scr1150:p-[44px]">
              <div className="flex flex-col items-center overflow-hidden gap-[24px] w-[60%]">
                <div className="flex flex-col gap-[24px]">
                  <div className="flex gap-[8px] items-center">
                    <div
                      style={{
                        background: "rgb(6,169,239)",
                        background:
                          "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)",
                      }}
                      className="  h-[29px] min-w-[29px] flex rounded-[50%]"
                    >
                      <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] ">
                        3
                      </div>
                    </div>
                    <div className="font-[500] text-center text-[14px] text-[#333]">
                      Select the result limit you like & Hit ‘Find Matches’
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] h-[80px] justify-center relative items-end flex-wrap flex ">
                  <motion.button
                    initial={{
                      borderBottomColor: "#008DCA",
                      borderBottomWidth: "5px",
                      opacity: 1,
                    }}
                    animate={{
                      borderBottomWidth: three ? "0px" : "5px",
                      translateX: moveLeft ? "-300px" : "0px",
                    }}
                    transition={{
                      delay: moveLeft ? 0 : 1,
                      duration: moveLeft ? 0.5 : 0.01,
                    }}
                    className="font-[600]  mb-[10px] text-[10px] opacity-0 bg-[#06A9EF] rounded-[5px] text-[#fff] px-[5px] py-[8px]"
                  >
                    Find Matches
                  </motion.button>

                  <div
                    className={` absolute ${
                      three ? "button_arrow" : ""
                    } opacity-0 top-[10px] right-[-5px] `}
                  >
                    <img
                      src="/images/resumeBuilder/arrow_selector_tool.png"
                      className="w-[10px] h-[15px] "
                      alt=""
                    />
                  </div>

                  <motion.img
                    initial={{ top: "4px", right: "-200px" }}
                    animate={{
                      top: moveLeft ? "7px" : "4px",
                      right: moveLeft ? "0px" : "-350px",
                    }}
                    transition={{}}
                    src="/images/resumeBuilder/Frame12.png"
                    className="w-[85px] h-[95px] absolute "
                    alt=""
                  />

                  <img
                    src="/images/resumeBuilder/search.png"
                    className={` w-[25px] ${
                      moveLeft ? "search_animation" : ""
                    }  right-[-1px] top-[47px]  h-[25px] absolute `}
                    alt=""
                    style={{ opacity: moveLeft ? 1 : 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JdMatching;
