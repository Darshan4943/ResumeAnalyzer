import React, { useState, useEffect, useRef, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";

const CoverLetter2 = ({ page1Ref, page2Ref, data }) => {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 350;

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
  console.log("data", data.dial_code);
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
                <h1 className="text-[26px] text-[#333333] break-word">
                  {data?.firstName} {data?.lastName}
                </h1>
                <p className="text-[16px] text-[#0E6CC2] break-word">
                  {data?.designation}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left ">
                    Email
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left break-all">
                    {data.email}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left">
                    Phone
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left">
                    {data?.dial_code} {data?.mobileNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left ">
                    Address
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left break-word">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-[36px] gap-[16px]">
            <div className="flex flex-row justify-end items-start gap-[8.99px]">
              <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-bold leading-[15px] text-left">
                Date :
              </h6>
              <p className="text-[10px] text-[#333333] font-poppins font-normal leading-[15px] text-left">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </div>
            <div className="flex flex-row gap-[24px]">
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px] text-left ">
                <span className="flex pb-[8px]">Dear {data?.employerName}</span>
                {splitContents?.first.map((passage, index) => (
                  <p key={index} style={{ margin: "16px 0" }}>
                    {passage}
                  </p>
                ))}
                {splitContents?.second?.length == 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="text-[12px] font-[400] text-[#6D6E71]">
                      Warm regards,
                    </span>

                    <span className="flex pt-[16px] ">
                      {data?.firstName}
                      {","} {data?.lastName}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-[224px]">
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-semibold leading-[15px] text-left">
                    To,
                  </h6>
                  <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-semibold leading-[15px] text-left">
                    {data?.employerName}
                  </h6>
                  <p className="text-[10px] text-[#797979] font-poppins font-normal leading-[15px] text-left">
                    {data?.employerOrganizationName}
                    {","}
                    {data?.employerAddress}
                    {","} {data?.employerCityState}
                    {","}
                    {data?.employerCountry}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            className="bg-[#fff] w-[595px] min-h-[700px] p-[24px] gap-[24px] flex flex-row px-[36px]"
            ref={page2Ref}
          >
            <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px]">
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-full ">
                {splitContents.second.map((passage, index) => (
                  <p key={index} style={{ margin: "16px 0" }}>
                    {passage}
                  </p>
                ))}
                {splitContents?.second?.length > 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-full text-left">
                      Warm regards,
                    </span>

                    <span className="flex pt-[16px] break-word">
                      {data?.firstName}
                      {","} {data?.lastName}
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
