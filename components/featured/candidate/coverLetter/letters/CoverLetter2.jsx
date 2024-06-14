import React, { useState, useEffect, useRef, useCallback } from "react";

const CoverLetter2 = ({ page1Ref, page2Ref, data }) => {
  console.log(88811, data);

  const firstPageRef = useRef(null);

  // const HeaderPageRef = useRef(null);

  // const firstContainer = useRef(null);
  // const secondContainer = useRef(null);

  // const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 504;
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

  console.log(777, splitContents);
  useEffect(() => {
    if (data?.passages) {
      splitContent();
    }
  }, [data?.passages, splitContent]);

  return (
    <>
      <div className="flex flex-col border-2 border-[#DEDEDE] ">
        <div className="bg-[#FFFFFF] w-[595px] min-h-[700px] p-[24px] gap-[16px] flex flex-col ">
          <div
            className="flex flex-col w-full h-[153px] pt-[26px] pr-[36px] pb-[14px] pl-[36px] bg-[#F9F9F9] gap-[24px] "
            ref={page1Ref}
          >
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-[26px] text-[#333333]">
                  {data?.firstName} {data?.lastName}
                </h1>
                <p className="text-[16px] text-[#0E6CC2]">
                  {data?.designation}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col">
                  <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left">
                    Email
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left">
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
                  <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left">
                    Address
                  </h6>
                  <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-[36px]">
            <div className="flex flex-row justify-end items-start gap-[8.99px]">
              <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-bold leading-[15px] text-left">
                Date :
              </h6>
              <p className="text-[10px] text-[#333333] font-poppins font-normal leading-[15px] text-left">
                {data?.letterDate || "16 Oct 1936"}
              </p>
            </div>
            <div className="flex flex-row gap-[24px]">
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px] text-left ">
                <span className="flex pb-[16px]">
                  Dear {data?.employerName}
                </span>
                {splitContents?.first.map((passage, index) => (
                  <p key={index} style={{ margin: "16px 0" }}>
                    {passage}
                  </p>
                ))}
                {splitContents?.second?.length <= 0 && (
                  <>
                    <span className="pt-[8px]">Warm Regards</span>
                    <p>
                      {data?.firstName}
                      {","} {data?.lastName}
                    </p>
                  </>
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
          <div className="bg-[#FFFFFF] w-[595px] min-h-[700px] p-[24px] gap-[16px] flex flex-col">
            <div className="flex flex-row gap-[24px]" ref={page2Ref}>
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-full text-left">
                {splitContents.second.map((passage, index) => (
                  <p key={index} style={{ margin: "16px 0" }}>
                    {passage}
                  </p>
                ))}
                <span className="flex pt-[16px]">Warm Regards</span>
                <p>
                  {data?.firstName}
                  {","} {data?.lastName}
                </p>
              </div>
              <div className="flex flex-col w-[224px]">
                <div className="flex flex-col">
                  <h6>{data.content}</h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverLetter2;
