import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";

function CoverLetter5({ page2Ref, page1Ref, data }) {
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
  return (
    <>
      <div className="flex flex-col gap-[24px] ">
        <div
          ref={page1Ref}
          className=" w-[595px] min-h-[700px] gap-[16px] flex flex-col  bg-[#fff] relative "
        >
          <img
            className="min-w-[590px] min-h-[178px]"
            src="/images/template5.png"
          />

          <div className="absolute top-[26px] left-[20px] w-[92%] flex flex-row justify-between items-center gap-[4px]">
            <div className="flex flex-col w-[76%] justify-start items-start">
              <span className="text-[28px] font-[600] leading-[36px] text-[#F7941D] break-word">
                {data.firstName}
              </span>
              <span className="text-[28px] font-[400] leading-[36px] text-[#414042] break-word">
                {data.lastName}
              </span>
              <span className="text-[14px] font-[400] leading-[36px] text-[#58595B] break-word">
                {data.designation}
              </span>
            </div>
            <div className="flex flex-col gap-[8px] justify-start items-start pr-[2px] ">
              <div className="gap-[8px] flex flex-row w-full items-center">
                <svg
                  className="min-h-[14px] min-w-[14px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.0008 1C4.79451 1 3 2.78059 3 4.96899C3 5.85055 3.56719 7.28776 4.73443 9.36328C5.55958 10.8307 6.37192 12.0548 6.40557 12.1057L7 13L7.59443 12.1057C7.62888 12.0548 8.44042 10.8307 9.26557 9.36328C10.4328 7.28856 11 5.85135 11 4.96979C11.0016 2.7806 9.20709 1 7.0008 1ZM7.0008 7.00079C5.8552 7.00079 4.9275 6.07949 4.9275 4.94277C4.9275 3.80604 5.856 2.88474 7.0008 2.88474C8.1456 2.88474 9.0749 3.80604 9.0749 4.94277C9.0749 6.0787 8.1464 7.00079 7.0008 7.00079Z"
                    fill="#58595B"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#58595B] break-word">
                  {data?.address}
                </span>
              </div>

              <div className="gap-[8px] flex flex-row w-full items-center">
                <svg
                  className="min-h-[14px] min-w-[14px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2456 10.0361C12.2679 10.2072 12.2159 10.3552 12.0903 10.4808L10.6122 11.9491C10.5453 12.0235 10.4585 12.0863 10.3511 12.1384C10.2437 12.1905 10.138 12.2236 10.0347 12.2384C10.0272 12.2384 10.0049 12.2401 9.96775 12.2442C9.93057 12.2484 9.88265 12.25 9.82316 12.25C9.68271 12.25 9.45467 12.226 9.13988 12.1773C8.82427 12.1293 8.43925 12.0103 7.98401 11.8209C7.52876 11.6316 7.01155 11.3481 6.4332 10.9703C5.85485 10.5925 5.24014 10.0725 4.58743 9.41357C4.06857 8.90184 3.63894 8.41242 3.29771 7.94533C2.95731 7.47824 2.683 7.0467 2.4748 6.64988C2.26742 6.25306 2.11209 5.89345 2.00799 5.57104C1.90471 5.24862 1.83365 4.97084 1.79647 4.73689C1.75929 4.50293 1.74442 4.32023 1.75186 4.1863C1.75929 4.0532 1.7626 3.9788 1.7626 3.96392C1.77747 3.85975 1.81052 3.75476 1.86257 3.64646C1.91462 3.53899 1.97742 3.45219 2.05177 3.38522L3.52988 1.90541C3.63315 1.80207 3.75213 1.75 3.88598 1.75C3.98264 1.75 4.06774 1.77727 4.14128 1.83266C4.21564 1.88805 4.27843 1.95668 4.33048 2.03852L5.52023 4.29625C5.58715 4.41447 5.60533 4.54427 5.57559 4.68563C5.54584 4.82617 5.48305 4.94521 5.38638 5.04111L4.84191 5.58592C4.82703 5.6008 4.81381 5.62477 4.80307 5.65867C4.79151 5.69174 4.78655 5.71984 4.78655 5.74217C4.81629 5.89759 4.88239 6.07533 4.98649 6.27539C5.07573 6.45314 5.21288 6.67056 5.39795 6.92684C5.58302 7.18229 5.84659 7.47742 6.18699 7.81059C6.51995 8.15202 6.81739 8.41657 7.076 8.60588C7.33543 8.79437 7.5519 8.93408 7.72623 9.02336C7.90056 9.11182 8.03358 9.16639 8.12612 9.18458L8.26492 9.21268C8.27979 9.21268 8.30375 9.20689 8.33763 9.19614C8.37067 9.1854 8.39464 9.17217 8.41033 9.15729L9.04404 8.51246C9.17789 8.39424 9.33322 8.33472 9.51085 8.33472C9.63644 8.33472 9.73724 8.35704 9.81077 8.40168H9.82234L11.968 9.66984C12.1233 9.76492 12.2159 9.88728 12.2456 10.0361Z"
                    fill="#58595B"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#58595B]">
                  {data?.dial_code} {data?.mobileNumber}
                </span>
              </div>

              <div className="gap-[8px] flex flex-row w-full items-center ">
                <svg
                  className="min-h-[14px] min-w-[14px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.25 9.62535C12.25 9.85552 12.1853 10.069 12.0817 10.2567L8.76646 6.54697L12.0456 3.6772C12.1728 3.87956 12.25 4.11737 12.25 4.37466V9.62535ZM6.99965 7.22078L11.5623 3.228C11.3753 3.12509 11.1639 3.0625 10.9365 3.0625H3.06206C2.834 3.0625 2.62332 3.12509 2.43697 3.228L6.99965 7.22078ZM8.27208 6.97949L7.2159 7.90432C7.15401 7.95786 7.07683 7.98498 6.99965 7.98498C6.92247 7.98498 6.84529 7.95787 6.78341 7.90363L5.72722 6.9788L2.37022 10.7358C2.57117 10.8617 2.80758 10.9375 3.06276 10.9375H10.9379C11.1931 10.9375 11.4288 10.8617 11.6298 10.7358L8.27208 6.97949ZM1.95442 3.67789C1.82718 3.88024 1.75 4.11806 1.75 4.37535V9.62535C1.75 9.85552 1.81397 10.069 1.91827 10.2567L5.23285 6.54697L1.95442 3.67789Z"
                    fill="#58595B"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#58595B] break-all">
                  {data?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-[28px] w-full h-[663px] gap-[16px]">
            <div className="flex flex-row gap-[4px] justify-end items-end">
              <p className="text-[10px] font-[600] text-[#F7941D]">Date :</p>
              <p className="text-[10px] font-[400] text-[#414042]">
                {" "}
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </div>
            <div className="flex flex-row gap-[24px]">
              <div className="flex flex-col w-[30%]">
                <span className=" text-[10px] font-[600] text-[#F7941D]">
                  To,
                </span>

                <span className=" text-[10px] font-[600] text-[#F7941D] break-word">
                  {data?.employerName}
                </span>
                <span className=" text-[10px] font-[600] text-[#333333] break-word">
                  {data?.designation}
                </span>
                <span className=" text-[10px] font-[400] text-[#414042] break-word">
                  {data?.employerOrganizationName}
                </span>
                <span className=" text-[10px] font-[400] text-[#414042] break-word">
                  {data?.employerAddress} {data?.employerCityState}{" "}
                  {data?.employerCountry}
                </span>
              </div>
              <div className="flex flex-col w-[70%] gap-[4px]">
                <span className="text-[10px] font-[400] text-[#414042]">
                  Dear {data?.employerName},
                </span>
                <div
                  className="text-[10px] font-[400] text-[#414042] leading-[14px] font-[Inter]"
                  // ref={fifthContainer}
                >
                  {splitContents.first.map((passage, index) => (
                    <p key={index} style={{ margin: "16px 0" }}>
                      {passage}
                    </p>
                  ))}
                </div>
                {splitContents?.second?.length == 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="text-[10px] font-[400] text-[#414042] leading-[14px] font-[Inter]">
                      Warm regards,
                    </span>
                    <span className="text-[10px] font-[400] text-[#414042] leading-[14px] font-[Inter]">
                      {data?.firstName} {data?.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            ref={page2Ref}
            className="  w-[595px] min-h-[700px] p-[24px]   flex flex-col bg-[#fff] overflow-hidden"
          >
            <div className="flex h-full gap-[24px]">
              <div className="flex flex-col w-[30%]"></div>
              <div className="flex flex-col justify-start w-[70%] gap-[8px]">
                <div className="text-[10px] font-[400]  text-[#414042] leading-[14px] font-[Inter]">
                  {splitContents.second.map((passage, index) => (
                    <p key={index} style={{ margin: "16px 0" }}>
                      {passage}
                    </p>
                  ))}
                </div>
                {splitContents?.second?.length > 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="text-[10px] font-[400]  text-[#414042] leading-[14px] font-[Inter]">
                      Warm regards,
                    </span>
                    <span className="text-[10px] font-[400]  text-[#414042] leading-[14px] font-[Inter]">
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

export default CoverLetter5;
