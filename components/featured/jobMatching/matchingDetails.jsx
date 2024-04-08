import React, { useEffect, useState } from "react";
import Progress_bar from "./ProgressBar";
import CloseIcon, {
  DesignationSVG,
  DocSVG,
  PDFSvg,
  PNGICON,
} from "../../../utils/svg";
import { convertBytes, fileIconSeter } from "../../../utils/middleware";
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
const MatchingDetails = ({ data, setSelectedFile, files, extractedData }) => {
  const imageSeter = (data) => {
    const file = Object.values(files)?.find((item, i) => data.index == i);
    if (
      file?.type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return "/images/docIcon.png";
    } else {
      return "/images/pdfIcon.png";
    }
  };

  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center    px-4 py-4 ">
        <div className=" absolute bg-white rounded-lg    px-4 py-4   shadow-lg min-h-[500px] max-h-[600px] overflow-x-auto  items-end ml:w-[40vw] sm:w-[70%] w-[90%] flex flex-col gap-[8px]">
          <div className="flex flex-col gap-[4px]  w-full relative">
            <img
              src="/images/jobs/close.png"
              className="sm:h-[34px] sm:w-[34px] w-[28px] h-[28px]  absolute right-0 cursor-pointer top-[-4px]"
              alt=""
              onClick={() => setSelectedFile(null)}
            />
            <div className="flex gap-[4px] w-full">
              <span className=" text-[16px] font-semibold ">
                {data?.first_name}
              </span>
              <span className=" text-[16px] font-semibold">
                {data?.last_name}
              </span>
            </div>
            <div className="flex gap-[4px] items-center ">
              <DesignationSVG />
              <span className="text-[14px] font-semibold">
                {data?.designation}
              </span>{" "}
            </div>
          </div>
          <div className="border border-[#DEDEDE] w-full rounded-[8px] p-[16px] flex flex-row justify-between items-center">
            <div className="flex flex-row gap-[8px] w-full">
              {fileIconSeter(data)}
              <div className="flex flex-col justify-between w-full ">
                <span className="text-[14px] text-[#333333]">
                  {data.fileName}
                </span>
                <div className="flex justify-between">
                <span className="text-[14px] text-[#808080]">
                  <FileSizeDisplay fileUrl={data?.resumeUrl} />
                </span>
                <div className="flex flex-row gap-[8px] items-center">

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
          <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
          {data?.percentage ? (
            <Progress_bar progress={data.percentage} />
          ) : null}
          <div className="flex flex-col gap-4 w-full mt-6">
            {data?.matching_parameters?.length > 0 && (
              <div className="flex flex-col gap-[8px] min-h-[157px] justify-top relative w-full ">
                <span className="text-[#333333] text-[16px] font-semibold ">
                  Matching Parameters
                </span>
                <ul className="flex flex-col gap-[4px]">
                  {data?.matching_parameters.map((item, i) => (
                    <li
                      key={i}
                      className="text-[#333333] text-[14px] font-500 flex flex-row items-center gap-[8px]"
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
              </div>
            )}
            {data?.justification?.length > 0 && (
              <div className="flex flex-col gap-[8px]  justify-between relative  w-full ">
                <span className="text-[#333333] text-[16px] font-semibold">
                  Justification
                </span>
                <span className="text-[12px] text-[#333333] ">
                  {data.justification}
                </span>
              </div>
            )}

            {data?.percentage > 0 &&
              data?.matching_parameters_in_detail &&
              Object.keys(data.matching_parameters_in_detail).length > 0 && (
                <div className="flex flex-col gap-[8px]  justify-between relative  w-full ">
                  <span className="text-[#333333] text-[16px] font-semibold">
                    Details
                  </span>

                  {data?.matching_parameters_in_detail["required"] &&
                    Object.keys(data.matching_parameters_in_detail["required"])
                      .length > 0 && (
                      <ul className="flex flex-col gap-[4px]">
                        <span className="text-[#333333] text-[12px] font-semibold">
                          Required
                        </span>
                        {console.log(
                          data.matching_parameters_in_detail["required"]
                        )}
                        {Object.keys(
                          data.matching_parameters_in_detail["required"]
                        ).map(
                          (item, index) =>
                            data.matching_parameters_in_detail["required"][
                            item
                            ] && (
                              <li
                                key={index}
                                className="text-[#333333] text-[12px] font-500 flex flex-row items-top gap-[8px]"
                              >
                                <div className="w-[10px] mt-[5px]">
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
                                <span style={{ textTransform: "capitalize" }}>
                                  {item}{" "}
                                  {Array.isArray(
                                    data.matching_parameters_in_detail[
                                    "required"
                                    ][item]
                                  ) && ":"}
                                  {data.matching_parameters_in_detail[
                                    "required"
                                  ][item] &&
                                    data.matching_parameters_in_detail[
                                      "required"
                                    ][item].length > 0 &&
                                    Array.isArray(
                                      data.matching_parameters_in_detail[
                                      "required"
                                      ][item]
                                    ) &&
                                    data.matching_parameters_in_detail[
                                      "required"
                                    ][item]?.join(", ")}
                                </span>
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  {data?.matching_parameters_in_detail["provided"] &&
                    Object.keys(data.matching_parameters_in_detail["provided"])
                      .length > 0 && (
                      <ul className="flex flex-col gap-[4px]">
                        <span className="text-[#333333] text-[12px] font-semibold">
                          Provided
                        </span>

                        {Object.keys(
                          data.matching_parameters_in_detail["provided"]
                        ).map(
                          (item, index) =>
                            data.matching_parameters_in_detail["provided"][
                            item
                            ] && (
                              <li
                                key={index}
                                className="text-[#333333] text-[12px] font-500 flex flex-row items-top gap-[8px]"
                              >
                                <div className="w-[10px] mt-[5px]">
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
                                <span style={{ textTransform: "capitalize" }}>
                                  {item}{" "}
                                  {Array.isArray(
                                    data.matching_parameters_in_detail[
                                    "provided"
                                    ][item]
                                  ) && ":"}
                                  {data.matching_parameters_in_detail[
                                    "provided"
                                  ][item] &&
                                    data.matching_parameters_in_detail[
                                      "provided"
                                    ][item].length > 0 &&
                                    Array.isArray(
                                      data.matching_parameters_in_detail[
                                      "provided"
                                      ][item]
                                    ) &&
                                    data.matching_parameters_in_detail[
                                      "provided"
                                    ][item]?.join(", ")}
                                </span>
                              </li>
                            )
                        )}
                      </ul>
                    )}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchingDetails;
