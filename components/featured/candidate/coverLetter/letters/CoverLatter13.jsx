import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";

function CoverLetter13({ page1Ref, page2Ref, data }) {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 450; // Set the fixed height you want for the paragraph div

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
  }, [data]);

  useEffect(() => {
    if (data?.passages) {
      splitContent();
    }
  }, [data?.passages, splitContent]);
  ``;

  const formatContent = (link) => {
    if (link?.length > 28) {
      return link?.match(/.{1,28}/g).join("\n");
    }
    return link;
  };

  const formatName = (link) => {
    if (link?.length > 18) {
      return link?.match(/.{1,18}/g).join("\n");
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
    <div className="flex flex-col  border-[#DEDEDE] gap-[24px]">
      <div
        ref={page1Ref}
        className="bg-[#FFFFFF] w-[595px] min-h-[700px] p-[24px] gap-[16px] flex flex-col "
      >
        <div className="flex flex-col gap-5">
          <div className="">
            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              Date :-{" "}
              {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {camelCase(data?.firstName)} {camelCase(data?.lastName)}
            </span>

            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {formatContent(data?.address)}
            </span>
            {/* <span className="text-[12px] font-[400] text-[#333] font-Arial">
                            {data?.employerCityState} {" ,"} {data?.employerCountry}
                        </span> */}
            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {data?.dial_code} {data?.mobileNumber}
            </span>
            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {formatEmail(data?.email)}
            </span>
          </div>

          <div className="flex flex-col w-full">
            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {data?.employerName}
            </span>

            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {data?.employerOrganizationName}
            </span>

            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {data?.employerAddress}
            </span>

            <span className="text-[12px] font-[400] text-[#333] font-Arial">
              {data?.employerCityState} {" ,"} {data?.employerCountry}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-[8px]">
          <span className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
            Dear {data?.employerName},
          </span>
          <div>
            {splitContents.first.map((passage, index) => (
              <p
                key={index}
                style={{ margin: "16px 0" }}
                className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px] text-justify"
              >
                {passage}
              </p>
            ))}
            {splitContents?.second?.length === 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
                  Sincerely,
                </span>

                <span className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
                  {camelCase(data?.firstName)}
                  {","} {camelCase(data?.lastName)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {splitContents?.second?.length > 0 && (
        <>
          <div
            ref={page2Ref}
            className="h-[842px] p-[24px] w-[595px] flex flex-col bg-[#fff]"
          >
            <div className="flex h-full">
              <div className="flex flex-col justify-start w-full gap-[8px]">
                <div className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
                  {splitContents.second.map((passage, index) => (
                    <p
                      key={index}
                      style={{ margin: "16px 0" }}
                      className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px] text-justify"
                    >
                      {passage}
                    </p>
                  ))}
                  {splitContents?.second?.length > 0 && (
                    <div className="flex flex-col w-full gap-[2px]">
                      <span className="text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
                        Sincerely,
                      </span>

                      <span className="flex pt-[8px] text-[12px] font-[400] text-[#333] font-Arial leading-[13.8px]">
                        {camelCase(data?.firstName)}
                        {","} {camelCase(data?.lastName)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoverLetter13;
