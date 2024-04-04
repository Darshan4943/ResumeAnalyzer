import React, { useEffect, useState } from "react";
import CloseIcon, {
  DesignationSVG,
  DocSVG,
  PDFSvg,
  PNGICON,
} from "../../../utils/svg";
import { convertBytes, fileIconSeter } from "../../../utils/middleware";
import Progress_bar from "../../../components/featured/jobMatching/ProgressBar";

const Details = ({ data, setSelectedFile, files, extractedData }) => {
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center    px-4 py-4 ">
        <div className=" absolute bg-white rounded-lg    px-4 py-4   shadow-lg min-h-[500px] max-h-[600px] overflow-x-auto  items-end ml:w-[50vw] sm:w-[70%] w-[90%] flex flex-col gap-[8px]">
          <div className="flex flex-col gap-[4px]  w-full relative">
            <div className="flex gap-[4px] w-full">
              <span className=" text-[16px] font-semibold ">
                Title : {data?.jobTitle}
              </span>
            </div>
            <div className="flex gap-[12px] items-center ">
              <span className="text-[14px] font-500">{data?.companyName}</span>
              <span className="text-[14px] font-500">
                {data?.location.join(",")}
              </span>
            </div>
          </div>
          <div className="w-[100%]  px-[8px] pb-[16px] border-b-[1px] border-[#bebebe]"></div>
          {(
            data?.percentage > 0 &&
            data &&
            data["justification Of Matching"]?.length > 0 &&
            data["justification Of Matching"]
              ?.toLowerCase()
              .split(" ")
              .includes("no")
              ? false
              : true
          ) ? (
            <Progress_bar progress={90} />
          ) : null}
          <div className="w-full flex flex-row justify-between ">
            <div className="flex flex-col gap-4  mt-6 w-[48%]">
              {data && data["Matching parameters"]?.length > 0 && (
                <div className="flex flex-col gap-[8px] min-h-[157px] justify-top relative w-full ">
                  <span className="text-[#333333] text-[16px] font-semibold ">
                    Matching Parameters
                  </span>
                  <ul className="flex flex-col gap-[4px]">
                    {data["Matching parameters"].map((item, i) => (
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
              {data && data["justification Of Matching"]?.length > 0 && (
                <div className="flex flex-col gap-[8px]  justify-between relative  w-full ">
                  <span className="text-[#333333] text-[16px] font-semibold">
                    Justification
                  </span>
                  <span className="text-[12px] text-[#333333] ">
                    {data["justification Of Matching"]}
                  </span>
                </div>
              )}

              {/* {data?.percentage > 0 &&
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
              )} */}
            </div>
            <div className="w-[48%]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
