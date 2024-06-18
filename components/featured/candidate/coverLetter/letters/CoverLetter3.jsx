import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";

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

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <div
          ref={page1Ref}
          className=" w-[595px] min-h-[700px] p-[46px] gap-[16px] flex flex-col bg-[#fff] "
        >
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%]">
              <span className=" text-[24px] font-[700] text-[#242424]">
                {data?.firstName} {data?.lastName}
              </span>
            </div>

            <div className="flex flex-col gap-[4px] items-end w-[30%]">
              <span className="text-[10px] font-[400] text-[#414042]">
                {data?.email}
              </span>

              <span className="text-[10px] font-[400] text-[#414042]">
                {data?.mobileNumber}
              </span>

              <span className="text-[10px] font-[400] text-[#414042]">
                {data?.address}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] border-[0.75px] border-[#DEDEDE]"></div>

          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%]">
              <span className=" text-[12px] font-[400] text-[#414042]">
                To,
              </span>

              <span className=" text-[12px] font-[600] text-[#414042]">
                {data?.employerName}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.designation}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.employerOrganizationName}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.employerAddress} {data?.employerCityState}{" "}
                {data?.employerCountry}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] border-[0.75px] border-[#DEDEDE]"></div>
          <div className="flex flex-col justify-start w-full gap-[8px]">
            <span className="flex flex-col justify-end items-end gap-[4px]">
              <p className="text-[12px] font-[600] text-[#242424]">Date :</p>
              <p className="text-[10px] font-[400] text-[#242424]">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </span>
            <span className="text-[12px] font-[400] text-[#6D6E71]">
              Dear {data?.employerName},
            </span>

            <div className="text-[12px] font-[400] text-[#6D6E71]  ">
              {splitContents.first.map((passage, index) => (
                <p key={index} style={{ margin: "16px 0" }}>
                  {passage}
                </p>
              ))}
            </div>
            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[10px] font-[400] text-[#6D6E71] ">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#6D6E71]  ">
                  {data?.firstName} {data?.lastName}
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
                <div className="text-[12px] font-[400] text-[#6D6E71] ">
                  {splitContents.second.map((passage, index) => (
                    <p key={index} style={{ margin: "16px 0" }}>
                      {passage}
                    </p>
                  ))}
                </div>
                {splitContents?.second?.length > 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="text-[12px] font-[400] text-[#6D6E71] ">
                      Warm regards,
                    </span>
                    <span className="text-[12px] font-[400] text-[#6D6E71] ">
                      {data?.firstName} {data?.lastName}
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
