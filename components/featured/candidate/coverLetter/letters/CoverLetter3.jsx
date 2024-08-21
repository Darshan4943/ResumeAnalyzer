import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";
import CustomParastyle from "./CustomParastyle";

function CoverLetter3({ page2Ref, page1Ref, data }) {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 350; // Set the fixed height you want for the paragraph div

    // Create a temporary element to measure content height
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.width = firstPage?.clientWidth + "px";
    document.body.appendChild(tempDiv);

    let firstHalf = [];
    let secondHalf = [...data.passages];
    let tempContent = "";

    for (let i = 0; i < data.passages.length; i++) {
      const passage = data.passages[i];
      tempContent += `<p style="margin: 16px 0; text-indent: 1em;">${passage}</p>`;
      tempDiv.innerHTML = tempContent;

      if (tempDiv.clientHeight <= firstPageHeight) {
        firstHalf.push(passage);
        secondHalf.shift();
      } else {
        break;
      }
    }

    document.body.removeChild(tempDiv);
    setSplitContent({ first: firstHalf, second: secondHalf });
  }, [data?.passages]);

  useEffect(() => {
    if (data?.passages) {
      splitContent();
    }
  }, [data?.passages, splitContent]);

  const formatContent = (link) => {
    if (link?.length > 32) {
      return link?.match(/.{1,32}/g).join("\n");
    }
    return link;
  };

  const formatName = (link) => {
    if (link?.length > 14) {
      return link?.match(/.{1,14}/g).join("\n");
    }
    return link;
  };

  const formatEmail = (link) => {
    if (link?.length > 34) {
      return link?.match(/.{1,34}/g).join("\n");
    }
    return link;
  };

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <div
          ref={page1Ref}
          className=" w-[595px] min-h-[700px] p-[46px] gap-[12px] flex flex-col bg-[#fff] "
        >
          <div className="flex flex-row justify-between w-full gap-[8px]">
            <div className="flex flex-col w-[324px]">
              <span className=" text-[24px] font-[700] text-[#242424] break-word">
                {formatName(camelCase(data?.firstName))}{" "}
                {formatName(camelCase(data?.lastName))}
              </span>
            </div>

            <div className="flex flex-col gap-[4px] items-end w-[216px]">
              <span className="text-[10px] font-[400] text-[#414042] break-all">
                {data?.email}
              </span>

              <span className="text-[10px] font-[400] text-[#414042] break-all flex-wrap">
                {data?.dial_code} {data?.mobileNumber}
              </span>

              <span className="text-[10px] font-[400] text-[#414042] break-word">
                {formatContent(camelCase(data?.address))}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] border-[0.75px] border-[#DEDEDE]"></div>

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%] gap-[6px]">
              <span className=" text-[10px] font-[400] text-[#414042] font-Inter">
                To,
              </span>

              <div className="flex flex-col">
                <span className=" text-[12px] font-[600] text-[#242424] font-Inter">
                  {data?.employerName}
                </span>

                <span className=" text-[10px] font-[400] text-[#414042] font-Inter break-word">
                  {data?.designation}
                </span>

                <span className=" text-[10px] font-[400] text-[#414042] font-Inter break-word">
                  {data?.employerAddress} {data?.employerCityState}{" "}
                  {data?.employerCountry}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] border-[0.75px] border-[#DEDEDE]"></div>
          <div className="flex flex-col justify-start w-full gap-[8px]">
            <span className="flex flex-col justify-end items-end gap-[4px]">
              <p className="text-[10px] font-[600] text-[#242424] font-Inter">
                Date
              </p>
              <p className="text-[10px] font-[400] text-[#242424] font-Inter">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </span>
            <span className="text-[10px] font-[400] text-[#6D6E71] font-Inter">
              Dear {data?.employerName},
            </span>

            <div>
              {splitContents.first.map((passage, index) => (
                <>
                  <CustomParastyle
                    style={{
                      margin: "16px 0",
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#6D6E71",
                      textAlign: "justify",
                      fontFamily: "Inter",
                    }}
                    key={index}
                    passage={passage}
                  />
                </>

                // <p
                //   key={index}
                //   style={{ margin: "16px 0" }}
                //   className="text-[10px] font-[400] text-[#6D6E71] font-Inter text-justify"
                // >
                //   {passage}
                // </p>
              ))}
            </div>
            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[4px]">
                <span className="text-[10px] font-[400] text-[#6D6E71] ">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#6D6E71]  ">
                  {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                </span>
              </div>
            )}
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            ref={page2Ref}
            className=" w-[595px] min-h-[700px] p-[46px] flex  flex-col bg-[#fff] "
          >
            <div className="flex h-full">
              <div className="flex flex-col justify-start w-full gap-[8px]">
                <div>
                  {splitContents.second.map((passage, index) => (
                    <>
                      <CustomParastyle
                        style={{
                          margin: "16px 0",
                          fontSize: "10px",
                          fontWeight: "400",
                          color: "#6D6E71",
                          textAlign: "justify",
                          fontFamily: "Inter",
                        }}
                        key={index}
                        passage={passage}
                      />
                    </>
                  ))}
                </div>
                {splitContents?.second?.length > 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="text-[10px] font-[400] text-[#6D6E71] font-Inter text-justify">
                      Warm regards,
                    </span>
                    <span className="text-[10px] font-[400] text-[#6D6E71] font-Inter text-justify">
                      {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CoverLetter3;
