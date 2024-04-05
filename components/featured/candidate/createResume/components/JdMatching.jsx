import React, { useEffect, useState } from "react";

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

const JdMatching = ({ details, resuneList }) => {
  const [selectedFile, setSelectedFile] = useState(null);

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

  return (
    <div className="flex flex-col gap-4 min-h-[70vh] ">
      {selectedFile && (
        <MatchingDetails
          data={selectedFile}
          setSelectedFile={setSelectedFile}
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
      <div className="flex ml:flex-row flex-col gap-12 w-[100%] ">
        <div className="ml:w-[100%] w-[100%]  flex flex-col gap-[16px] ">
          <div>Total Results ({resuneList?.length})</div>
          <div className=" flex flex-row flex-wrap ml:justify-between justify-center  gap-[24px] ">
            {resuneList?.length > 0 ? (
              <>
                {resuneList
                  .sort((a, b) => b.percentage - a.percentage)
                  ?.map((data, index) => (
                    <div
                      className="flex flex-col gap-[8px] md:w-[48%] w-[100%] max-w-[380px] rounded-[16px] border border-[#DEDEDE] bg-white shadow-lg py-[16px] ml:px-[24px] px-3 min-w-[300px]"
                      key={index}
                    >
                      <div className="flex flex-col gap-[4px]">
                        <div className="flex gap-[4px]">
                          <span className=" text-[16px] font-500">
                            {data?.first_name}
                          </span>{" "}
                          <span className=" text-[16px] font-500">
                            {data?.last_name}
                          </span>
                        </div>
                        <div className="flex gap-[4px] items-center ">
                          <DesignationSVG />
                          <span className="text-[14px] font-500">
                            {data?.designation}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="border border-[#DEDEDE] w-full rounded-[8px] p-[16px] gap-2 flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-[8px] w-full">
                          {fileIconSeter(data)}
                          <div className="flex flex-col justify-between break-all w-full ">
                            <span className="md:text-[14px] text-[14px] text-[#333333] font-medium">
                              {data.fileName.length > 17
                                ? `${data.fileName.slice(0, 16)}...`
                                : data.fileName}
                            </span>
                            <div className="flex gap-2 justify-between">
                              <span className="md:text-[14px] text-[14px] text-[#808080] font-medium">
                                {/* {getFileSize(data?.resumeUrl)} */}
                                <FileSizeDisplay fileUrl={data?.resumeUrl} />
                              </span>
                              <div className="flex flex-row gap-[8px] items-center">
                                <span className="md:text-[14px] text-[14px] text-[#06A9EF] font-[600] cursor-pointer">
                                  Preview
                                </span>

                                <svg
                                  onClick={() =>
                                    (window.location.href = data?.resumeUrl)
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
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px] min-h-[157px] justify-start relative ">
                        <span className="text-[#333333] text-[16px] font-[500]">
                          Matching Parameters
                        </span>
                        <ul className="flex flex-col gap-[4px]">
                          {data?.matching_parameters?.map((item, i) => (
                            <li
                              key={i}
                              className="text-[#333333] text-[14px] font-[500] flex flex-row items-center gap-[8px]"
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                              </svg>

                              {item}
                            </li>
                          ))}
                        </ul>
                        <span
                          onClick={() => setSelectedFile(data)}
                          className="text-[#06A9EF] text-[14px]  underline decoration-solid  text-end absolute bottom-[0px] right-0 cursor-pointer font-semibold"
                        >
                          See More
                        </span>
                      </div>
                      <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
                      {data?.percentage > 0 ? (
                        <Progress_bar progress={data.percentage} />
                      ) : (
                        <div
                          className="flex flex-row gap-2 items-center justify-between "
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
                          <span className="text-[14px] font-semibold">0%</span>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-full">
                <img src="/images/NoMatch.png" alt="" className="w-[40%] " />
                <span className="text-[#808080]">No Match Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JdMatching;
