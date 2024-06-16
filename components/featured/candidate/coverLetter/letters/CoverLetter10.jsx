import React, { useEffect, useRef, useState, useCallback } from "react";

function CoverLetter10({ page2Ref, page1Ref, data }) {
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
    <div className="flex flex-col gap-[24px]">
      <div
        ref={page1Ref}
        className=" w-[595px] min-h-[700px] flex flex-row  "
      >
        <div className="w-[30%] flex flex-col px-[42px] pt-[162px] justify-between pb-[42px] bg-[#C7EAFB]">
          <div className="flex flex-col gap-[8px]">
            <span className=" text-[14px] font-[400] text-[#2D3033] leading-[16.94px]">
              To,
            </span>
            <div className="flex flex-col gap-[6px]">
              <div className="flex flex-col gap-[2px]">
                <span className=" text-[12px] font-[600] text-[#2D3033] leading-[12.1px]">
                  {data?.employerName}
                </span>
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.designation}
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.employerOrganizationName}
                </span>
                <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.employerAddress} {data?.employerCityState}{" "}
                  {data?.employerCountry}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <span className=" text-[14px] font-[400] text-[#2D3033] leading-[12.1px]">
              Contact me
            </span>
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <div className="flex flex-col justify-center gap-[2px] items-center">
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  Address
                </span>
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.address}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center gap-[2px]">
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  Mobile
                </span>
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.mobileNumber}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center gap-[2px]">
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  Email
                </span>
                <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                  {data?.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-[42px] pt-[42px] pb-[92px] gap-[38px]">
          <div className="gap-[6px] flex flex-col ">
            <div className="gap-[2px] flex flex-col">
              <span className="text-[40px] font-[400] leading-[48.41px] text-[#0D0D0D]">
                {data?.firstName} {data?.lastName}
              </span>
              <span className="text-[20px] font-[400] leading-[24.41px] text-[#0D0D0D]">
                {data?.designation}
              </span>
            </div>

            <div className="h-[2px] w-[36px] bg-[#BCBEC0]"></div>
          </div>
          <div className="flex flex-col w-full gap-[4px]">
            <span className="text-[10px] font-[400] text-[#2D3033] leading-[14.52px] ">
              Dear {data?.employerName},
            </span>
            <div className="text-[10px] font-[400] text-[#2D3033] leading-[14.52px] ">
              {splitContents.first.map((passage, index) => (
                <p key={index} style={{ margin: "16px 0" }}>
                  {passage}
                </p>
              ))}
            </div>

            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[10px] font-[400] text-[#2D3033] ">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#2D3033]  ">
                  {data?.firstName} {data?.lastName}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {splitContents?.second?.length > 0 && (
        <div
          ref={page2Ref}
          className=" w-[595px] min-h-[700px] p-[24px]   flex flex-col bg-[#fff] overflow-hidden"
        >
          <div className="flex h-full">
            <div className="flex flex-col justify-start w-full gap-[8px]">
              <div className="text-[10px] font-[400]  text-[#414042] leading-[14px] font-[Inter]">
                {splitContents.second.map((passage, index) => (
                  <p key={index} style={{ margin: "16px 0" }}>
                    {passage}
                  </p>
                ))}
              </div>
              {splitContents?.second?.length > 0 && (
                <div className="flex flex-col w-full gap-[2px]">
                  <span className="text-[10px] font-[400] text-[#2D3033] ">
                    Warm regards,
                  </span>
                  <span className="text-[10px] font-[400] text-[#2D3033]  ">
                    {data?.firstName} {data?.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetter10;
