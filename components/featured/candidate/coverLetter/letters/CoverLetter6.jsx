import React, { useEffect, useState, useRef, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";

function CoverLetter6({ page2Ref, page1Ref, data }) {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 400; // Set the fixed height you want for the paragraph div

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
    <>
      <div className="flex flex-col gap-[24px] w-[700px]">
        <div
          ref={page1Ref}
          className="w-[595px] h-[800px] p-[32px] gap-[24px] flex flex-col bg-[#fff] "
        >
          <div className="flex flex-row justify-between w-full gap-[20px] ">
            <div className="flex flex-col gap-[12px] w-[70%]">
              <div className="gap-[8px] flex flex-row w-full items-center  ">
                <svg
                  className="min-h-[22px] min-w-[22px]"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0C4.92482 0 0 4.92482 0 11C0 17.0752 4.92482 22 11 22C17.0752 22 22 17.0752 22 11C22 4.92482 17.0752 0 11 0ZM16.7544 15.3315C16.4991 15.8067 16.1283 16.2232 15.6825 16.5353C15.2393 16.8458 14.7244 17.0519 14.1941 17.1295C14.0277 17.1537 13.8621 17.1666 13.6965 17.1666C13.299 17.1666 12.904 17.0959 12.5177 16.9562C10.8172 16.3387 9.2391 15.3324 7.95422 14.0475C6.66847 12.7618 5.66298 11.1837 5.04555 9.48401C4.84721 8.93815 4.78857 8.37332 4.87136 7.80762C4.94897 7.27728 5.1542 6.76246 5.46551 6.31921C5.77767 5.87338 6.19332 5.50344 6.66933 5.24733C7.17639 4.97483 7.72915 4.83686 8.31295 4.83686C8.4949 4.83686 8.65185 4.96362 8.68979 5.14126L9.29429 7.96371C9.32189 8.09133 9.28222 8.22412 9.18995 8.31726L8.15687 9.34861C9.13131 11.2872 10.7137 12.8687 12.6514 13.844L13.6845 12.8109C13.7767 12.7186 13.9095 12.679 14.038 12.7066L16.8605 13.3111C17.0381 13.349 17.1649 13.506 17.1649 13.6879C17.1649 14.2717 17.0269 14.8245 16.7544 15.3315Z"
                    fill="black"
                  />
                </svg>

                <span className="flex flex-wrap text-[10px] font-[400] text-[#414042] leading-[12.1px] break-word">
                {data?.dial_code} {data?.mobileNumber}
                </span>
              </div>
              <div>
                <div className="gap-[8px] flex flex-row  w-full items-center">
                  <svg
                    className="min-h-[22px] min-w-[22px]"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.61523 8.06592V13.3503L9.13915 11.0031L5.61523 8.06592Z"
                      fill="black"
                    />
                    <path
                      d="M11.8904 11.8226C11.6341 12.036 11.3199 12.1431 11.0067 12.1431C10.6925 12.1431 10.3792 12.036 10.1229 11.8226L9.71205 11.4805L5.62109 14.2052C5.65389 14.3684 5.79889 14.492 5.9715 14.492H16.0409C16.2136 14.492 16.3585 14.3684 16.3913 14.2052L12.3013 11.4805L11.8904 11.8226Z"
                      fill="black"
                    />
                    <path
                      d="M16.4009 13.3503V8.06592L12.877 11.0031L16.4009 13.3503Z"
                      fill="black"
                    />
                    <path
                      d="M11 0C4.92482 0 0 4.92483 0 11C0 17.0752 4.92482 22 11 22C17.0752 22 22 17.0752 22 11C22 4.92483 17.0752 0 11 0ZM17.1028 14.1087C17.1028 14.7003 16.6216 15.1815 16.03 15.1815H5.96997C5.37841 15.1815 4.89723 14.7003 4.89723 14.1087V7.89213C4.89723 7.30057 5.37841 6.81938 5.96997 6.81938H16.03C16.6216 6.81938 17.1028 7.30057 17.1028 7.89213V14.1087Z"
                      fill="black"
                    />
                    <path
                      d="M10.5833 11.2716C10.8302 11.4772 11.1884 11.4772 11.4352 11.2716L15.76 7.66658L15.9033 7.54736H6.11523L6.2585 7.66658L10.5833 11.2716Z"
                      fill="black"
                    />
                  </svg>

                  <span className=" flex flex-wrap leading-[12.1px] text-[10px] font-[400] text-[#414042] break-all">
                    {data?.email}
                  </span>
                </div>
              </div>
              <div>
                <div className="gap-[8px] flex flex-row items-center">
                  <svg
                    className="min-h-[22px] min-w-[22px]"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0077 6.93066C9.88142 6.93066 8.96484 7.84811 8.96484 8.97548C8.96484 10.1028 9.88142 11.0203 11.0077 11.0203C12.134 11.0203 13.0506 10.1028 13.0506 8.97548C13.0506 7.84725 12.134 6.93066 11.0077 6.93066Z"
                      fill="black"
                    />
                    <path
                      d="M11 0C4.92482 0 0 4.92483 0 11C0 17.0752 4.92482 22 11 22C17.0752 22 22 17.0752 22 11C22 4.92483 17.0752 0 11 0ZM14.5934 10.8974L11.2233 16.9924C11.1785 17.0735 11.0931 17.1243 11 17.1243C10.9069 17.1243 10.8215 17.0743 10.7767 16.9924L7.40749 10.9C7.0867 10.3058 6.91769 9.63579 6.91769 8.95972C6.91769 6.70901 8.74929 4.8774 11 4.8774C13.2507 4.8774 15.0823 6.70901 15.0823 8.95972C15.0823 9.63493 14.9133 10.305 14.5934 10.8974Z"
                      fill="black"
                    />
                  </svg>

                  <span className="flex flex-wrap leading-[12.1px] text-[10px] font-[400] text-[#414042] break-word">
                    {formatContent(data?.address)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap">
                <span className="flex flex-wrap text-[28px] leading-[33.89px] font-[400] text-[#000000] font-Inter break-word">
                  {formatName(camelCase(data.firstName))} {formatName(camelCase(data.lastName))}
                </span>
              </div>
              <div className="flex flex-wrap ">
                <span className=" text-[16px] font-[400] text-[#000000] font-Inter leading-[19.36px] break-word">
                  {data?.designation}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#000000]"></div>
          <div className="flex flex-col w-full gap-[24px]">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col w-[76%]">
                <span className="flex flex-wrap text-[12px] font-[500] text-[#000000] font-Inter leading-[16px] break-word">
                  To,
                </span>
                <span className="flex flex-wrap text-[12px] font-[500] text-[#000000] font-Inter leading-[16px] break-word">
                  {data?.employerName}
                </span>

                <span className="flex flex-wrap text-[10px] font-[400] text-[#000000] font-Inter leading-[16px] break-word">
                  {data?.employerOrganizationName}
                </span>
                <span className="flex flex-wrap text-[10px] font-[400] text-[#000000] font-Inter leading-[16px] break-word">
                  {data?.employerAddress} {data?.employerCityState}{" "}
                  {data?.employerCountry}
                </span>
              </div>
              <div className="flex flex-col items-end justify-start gap-[16px] w-[30%] flex-wrap">
                <span className="text-[12px] font-[500] text-[#414042] leading-[14.52px]  font-Inter ">
                  Date :
                  <span className="text-[#333333]">
                    {" "}
                    {data?.letterDate != {} &&
                      formatDateInNumber(data?.letterDate)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start w-full gap-[8px]">
            <div className="text-[10px] font-[400] text-[#333333] font-Inter">
              <div className="flex flex-row justify-between items">
                <span className=" text-[10px] font-[400] text-[#333333] font-Inter ">
                  Dear {data?.employerName},
                </span>
              </div>
              {splitContents.first.map((passage, index) => (
                <p
                  key={index}
                  style={{ margin: "16px 0" }}
                  className=" text-[10px] font-[400] text-[#333333] font-Inter  text-justify"
                >
                  {passage}
                </p>
              ))}
            </div>
            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className=" text-[10px] font-[400] text-[#333333] font-Inter">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#414042] break-word font-Inter">
                  {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                </span>
              </div>
            )}
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            ref={page2Ref}
            className=" h-[842px] p-[24px] w-[595px] flex flex-col bg-[#fff] overflow-hidden "
          >
            <div className="flex h-full">
              {splitContents && (
                <div className="flex flex-col justify-start w-full gap-[8px]">
                  <div className="text-[10px] font-[400] text-[#333333] font-Inter">
                    {splitContents.second.map((passage, index) => (
                      <p
                        key={index}
                        style={{ margin: "16px 0" }}
                        className=" text-[10px] font-[400] text-[#333333] font-Inter  text-justify"
                      >
                        {passage}
                      </p>
                    ))}
                  </div>
                  {splitContents?.second?.length > 0 && (
                    <div className="flex flex-col w-full gap-[2px]">
                      <span className=" text-[10px] font-[400] text-[#333333] font-Inter">
                        Warm regards,
                      </span>
                      <span className=" text-[10px] font-[400] text-[#333333] font-Inter">
                        {data?.firstName} {data?.lastName}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CoverLetter6;
