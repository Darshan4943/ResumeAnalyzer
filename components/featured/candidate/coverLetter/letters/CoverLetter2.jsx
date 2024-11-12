import React, { useState, useEffect, useRef, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";
import CustomParastyle from "./CustomParastyle";
const CoverLetter2 = ({ page1Ref, page2Ref, data }) => {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });
  // const [firstPageHeight, setFirstPageHeight]=useState(400)

 
  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const screenHeight = window.innerHeight;
    const firstPageHeight = screenHeight >= 800 ? 815 : 400;
    // const firstPageHeight = 450;

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
      <div className="flex flex-col   w-[595px] gap-[24px]">
        <div
          // className="bg-[#FFFFFF] w-[595px] min-h-[700px]  gap-[16px] flex flex-col border-[#DEDEDE] "
          className="flex flex-col w-[595px] min-h-[700px]  gap-[24px]   bg-[#fff] "
          ref={page1Ref}
        >
          <div className="flex flex-col w-full pt-[26px] pr-[36px] pb-[14px] pl-[36px] bg-[#F9F9F9] gap-[24px] ">
            <div className="flex flex-row justify-between gap-[4px]">
              <div>
                <h1 className="text-[26px] text-[#333333] font-[700] font-poppins leading-[33.71px] break-word">
                  {formatName(camelCase(data?.firstName))}{" "}
                  {formatName(camelCase(data?.lastName))}
                </h1>
                <p className="text-[16px] text-[#0E6CC2] font-[500] leading-[16px] break-word">
                  {formatContent(camelCase(data?.designation))}
                </p>
              </div>

              <div className="flex flex-col gap-[8px] w-[324px]">
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-[500] leading-[13.48px] text-left ">
                    Email
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-[600] leading-[13.48px] text-left break-all">
                    {data.email}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-[500] leading-[13.48px] text-left">
                    Phone
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-[600] leading-[13.48px] text-left">
                    {data?.dial_code} {data?.mobileNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-[500] leading-[13.48px] text-left ">
                    Address
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-[600] leading-[13.48px] text-left break-word">
                    {formatContent(camelCase(data.address))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-[36px] gap-[16px]">
            <div className="flex flex-row justify-end items-start gap-[8.99px]">
              <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-[600] leading-[15px] text-left">
                Date :
              </h6>
              <p className="text-[10px] text-[#333333] font-poppins font-normal leading-[15px] text-left">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col w-[224px]">
                  <div className="flex flex-col">
                    <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-[600] leading-[15px] text-left">
                      To,
                    </h6>
                    <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-[600] leading-[15px] text-left">
                      {data?.employerName}
                    </h6>
                    <p className="text-[10px] text-[#797979] font-poppins font-[400] leading-[15px] text-left">
                      {data?.employerOrganizationName}
                      {","}
                      {data?.employerAddress}
                      {","} {data?.employerCityState}
                      {","}
                      {data?.employerCountry}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="flex  font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71] w-[500px] text-left ">
                    Dear {camelCase(data?.employerName)}
                  </span>
                  {splitContents?.first.map((passage, index) => (
                    <>
                      <CustomParastyle
                        style={{
                          margin: "16px 0",
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#6D6E71",
                          textAlign: "justify",
                          fontFamily: "Poppins",
                        }}
                        key={index}
                        passage={passage}
                      />
                    </>
                    // <p
                    //   key={index}
                    //   style={{ margin: "16px 0" }}
                    //   className="font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71] w-[500px] text-justify"
                    // >
                    //   {passage}
                    // </p>
                  ))}
                  {splitContents?.second?.length == 0 && (
                    <div className="flex flex-col w-full gap-[2px]">
                      <span className="font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71]">
                        Warm regards,
                      </span>

                      <span className="flex  font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71] w-[500px] text-justify">
                        {data?.firstName}
                        {","} {data?.lastName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            className="bg-[#fff] w-[595px] min-h-[700px] p-[24px] gap-[24px] flex flex-col px-[36px]"
            ref={page2Ref}
          >
            <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px]">
              <div className=" w-full">
                {splitContents.second.map((passage, index) => (
                  <>
                    <CustomParastyle
                      style={{
                        margin: "16px 0",
                        fontSize: "10px",
                        fontWeight: "500",
                        color: "#6D6E71",
                        textAlign: "justify",
                        fontFamily: "Poppins",
                      }}
                      key={index}
                      passage={passage}
                    />
                  </>
                ))}
                {splitContents?.second?.length > 0 && (
                  <div className="flex flex-col w-full gap-[4px]">
                    <span className="font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71] w-[500px] text-justify">
                      Warm regards,
                    </span>

                    <span className="font-Poppins text-[10px] font-[400] leading-[12px] text-[#6D6E71] w-[500px] text-justify break-word">
                      {camelCase(data?.firstName)}
                      {","} {camelCase(data?.lastName)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[30%]  pt-[26px] pr-[36px] pb-[14px] pl-[36px] gap-[24px] "></div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverLetter2;
