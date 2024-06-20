import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";

function CoverLetter9({ page2Ref, page1Ref, data }) {
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
        className=" flex flex-row w-[595px] min-h-[700px]  bg-[#fff] overflow-hidden"
      >
        <div className="w-[30%] py-[34px] px-[26px] bg-[#F2F2F2] flex flex-col min-h-[700px] justify-between ">
          <div className="flex flex-col gap-[24px] ">
            <div className="w-full flex flex-col  justify-center items-center gap-[6px] px-[28px]">
              <span className="flex flex-row flex-wrap gap-[2px]">
                <p className="text-[26px] font-[400] leading-[31.47px] text-[#414042] break-all">
                  {data.firstName}
                </p>
                <p className="text-[26px] font-[400] leading-[31.47px] text-[#0072BC] break-all">
                  {data.lastName}
                </p>
              </span>
              <span className="text-[12px] font-[400] leading-[14.52px] text-[#414042] break-all">
                {data.designation}
              </span>
            </div>
            <div className="flex flex-col gap-[8px] px-[26px]">
              <span className=" text-[14px] font-[400] text-[#0072BC] leading-[16.94px]">
                To,
              </span>
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-col gap-[2px]">
                  <span className=" text-[10px] font-[600] text-[#414042] leading-[12.1px] break-all">
                    {data?.employerName}
                  </span>
                  <span className=" text-[10px] font-[400] text-[#414042] leading-[12.1px] break-all">
                    {data?.designation}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className=" text-[10px] font-[400] text-[#414042] leading-[12.1px] break-all">
                    {data?.employerOrganizationName}
                  </span>
                  <span className=" text-[10px] font-[400] text-[#414042] leading-[12.1px] break-all">
                    {data?.employerAddress} {data?.employerCityState}{" "}
                    {data?.employerCountry}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="gap-[8px] flex flex-row w-full ">
              <svg
                className="min-w-[18px] min-h-[18px]"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7043 13.4568C16.749 13.7241 16.6596 13.9316 16.4827 14.1176L14.3074 16.2825C14.2181 16.3855 14.0858 16.4884 13.9303 16.5499C13.7748 16.6329 13.6193 16.6743 13.4638 16.6943C13.4424 16.6943 13.4191 16.6943 13.353 16.7142H13.1528C12.9312 16.7142 12.5969 16.6727 12.1537 16.6113C11.6872 16.5498 11.1099 16.3638 10.4432 16.0949C9.77649 15.806 9.02223 15.3943 8.15715 14.8364C7.31352 14.2802 6.40376 13.5166 5.44752 12.547C4.69326 11.8049 4.04802 11.0827 3.56007 10.402C3.04889 9.7014 2.6503 9.06216 2.3393 8.4844C2.05154 7.90664 1.80668 7.3704 1.65118 6.89723C1.51712 6.42241 1.40631 6.03054 1.34018 5.68023C1.29549 5.32992 1.27404 5.06105 1.29549 4.87676V4.54632C1.31694 4.38196 1.36162 4.2375 1.45099 4.07148C1.51712 3.92704 1.62794 3.7826 1.71731 3.69959L3.89252 1.51314C4.04802 1.3687 4.22496 1.28564 4.42515 1.28564C4.5592 1.28564 4.69147 1.32717 4.80228 1.41018C4.9131 1.49319 5.00247 1.59608 5.0686 1.71894L6.82199 5.0394C6.91136 5.20377 6.95605 5.38975 6.91137 5.59562C6.86668 5.80148 6.77731 5.98743 6.6236 6.13187L5.82465 6.93543C5.8032 6.95536 5.77996 6.97696 5.77996 7.03839C5.75851 7.07989 5.73528 7.12132 5.73528 7.16282C5.77997 7.39028 5.89078 7.63773 6.04628 7.94653C6.18033 8.1939 6.37873 8.52426 6.64505 8.89449C6.91136 9.26638 7.31173 9.69808 7.79968 10.1945C8.28763 10.6892 8.73268 11.081 9.10981 11.3698C9.48694 11.6371 9.82118 11.8447 10.0643 11.9676C10.3306 12.112 10.5075 12.195 10.663 12.215L10.8632 12.2564C10.8847 12.2564 10.9079 12.2365 10.974 12.2365C11.0187 12.2166 11.0402 12.1951 11.0634 12.1751L11.9964 11.2271C12.1966 11.0411 12.4182 10.9599 12.6845 10.9599C12.8847 10.9599 13.017 11.0013 13.1278 11.0627H13.1492L16.3021 12.9189C16.5273 13.065 16.6614 13.2509 16.7043 13.4568Z"
                  fill="#0072BC"
                />
              </svg>

              <span className="text-[10px] font-[400] text-[#414042] leading-[15px] break-all">
                {data?.dial_code} {data?.mobileNumber}
              </span>
            </div>
            <div>
              <div className="gap-[8px] flex flex-row ">
                <svg
                  className="min-w-[18px] min-h-[18px]"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6945 8.48404C16.4471 4.62692 13.3744 1.55418 9.51731 1.3068V1.28564H8.48548V1.3068C4.6495 1.55418 1.55565 4.62692 1.30827 8.48404H1.28711V9.51582H1.30827C1.55565 13.3518 4.6495 16.4457 8.48548 16.6931V16.7142H9.51731V16.6931C13.3744 16.4457 16.4471 13.3518 16.6945 9.51582H16.7157V8.48404H16.6945ZM6.11423 2.95713C5.61948 3.61788 5.2061 4.44138 4.91804 5.3902H3.37192C4.05058 4.33885 4.99941 3.49257 6.11423 2.95713ZM2.83485 6.42198H4.6495C4.50465 7.08274 4.42328 7.76307 4.38096 8.48404H2.33847C2.40031 7.76307 2.56631 7.06158 2.83485 6.42198ZM2.33847 9.51582H4.38096C4.42165 10.2173 4.50465 10.9187 4.6495 11.5583H2.83485C2.56631 10.9187 2.40031 10.2368 2.33847 9.51582ZM3.3703 12.5885H4.9164C5.20447 13.5373 5.61785 14.3624 6.11261 15.0216C4.99941 14.4861 4.05059 13.6399 3.3703 12.5885ZM8.48548 15.6206C7.43413 15.3325 6.52599 14.1981 5.96939 12.5885H8.48548V15.6206ZM8.48548 11.5583H5.6797C5.53485 10.9187 5.45347 10.2384 5.41116 9.51582H8.48386L8.48548 11.5583ZM8.48548 8.48404H5.41279C5.45347 7.76144 5.53648 7.05995 5.68132 6.42198H8.48711L8.48548 8.48404ZM8.48548 5.3902H5.96939C6.52599 3.80178 7.43413 2.64621 8.48548 2.37931V5.3902ZM14.6325 5.3902H13.1059C12.7967 4.44138 12.3833 3.61626 11.8886 2.95713C13.0229 3.49257 13.9717 4.33885 14.6325 5.3902ZM9.51731 2.37931C10.5687 2.66737 11.498 3.80178 12.0334 5.3902H9.51731V2.37931ZM9.51731 6.42198H12.3231C12.4679 7.06158 12.5705 7.76307 12.5916 8.48404H9.51894V6.42198H9.51731ZM9.51731 9.51582H12.59C12.5688 10.2368 12.4663 10.9187 12.3215 11.5583H9.51568L9.51731 9.51582ZM9.51731 15.6206V12.5885H12.0334C11.4963 14.1981 10.5687 15.3325 9.51731 15.6206ZM11.8886 15.0233C12.3833 14.3625 12.7967 13.539 13.1059 12.5902H14.6325C13.9717 13.6399 13.0229 14.4862 11.8886 15.0233ZM15.1679 11.5583H13.3728C13.5177 10.9187 13.599 10.2173 13.6202 9.51582H15.6627C15.622 10.2368 15.4365 10.9187 15.1679 11.5583ZM13.6218 8.48404C13.6007 7.76144 13.5193 7.08111 13.3745 6.42198H15.1696C15.4381 7.06158 15.6236 7.76307 15.6643 8.48404H13.6218Z"
                    fill="#0072BC"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042] leading-[15px] break-all">
                  {data?.email}
                </span>
              </div>
            </div>
            <div>
              <div className="gap-[8px] flex flex-row ">
                <svg
                  className="min-w-[18px] min-h-[18px]"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00157 1.2002C6.03195 1.2002 3.60156 3.72611 3.60156 6.8559C3.60156 10.7164 8.4437 16.3933 8.6426 16.644C8.84151 16.8523 9.16007 16.8523 9.36053 16.644C9.55943 16.3933 14.4016 10.7164 14.4016 6.8559C14.4016 3.72449 11.9712 1.2002 9.00157 1.2002ZM9.00157 9.69438C7.50666 9.69438 6.29147 8.4216 6.29147 6.8559C6.29147 5.26903 7.50666 3.99626 9.00157 3.99626C10.4965 3.99626 11.7117 5.26903 11.7117 6.8559C11.7117 8.4216 10.4965 9.69438 9.00157 9.69438Z"
                    fill="#0072BC"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042] leading-[15px] break-all">
                  {data?.address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] py-[34px] px-[26px]  flex flex-col h-full gap-[24px] ">
          <div className="flex flex-row gap-[8px] justify-end items-center">
            <span className=" text-[12px] font-[700] text-[#0072BC] leading-[14.4px]">
              Date :{" "}
            </span>

            <span className=" text-[12px] font-[400] text-[#414042]">
              {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
            </span>
          </div>
          <div className="flex flex-col w-full gap-[4px]">
            <span className="text-[10px] font-[400] text-[#414042] leading-[14.52px] ">
              Dear {data?.employerName},
            </span>
            <div
              className="text-[10px] font-[400] text-[#414042] leading-[14.52px] "
              //   ref={fifthContainer}
            >
              {splitContents.first.map((passage, index) => (
                <p key={index} style={{ margin: "16px 0" }}>
                  {passage}
                </p>
              ))}
            </div>
            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[10px] font-[400] text-[#414042] ">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#414042] break-all">
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
          className="flex flex-row w-[595px] min-h-[700px] bg-[#fff] overflow-hidden"
        >
          <div className="w-[30%] py-[34px] px-[26px] bg-[#F2F2F2] flex flex-col min-h-[700px] justify-between "></div>

          <div className="w-[70%] py-[34px] px-[26px]  flex flex-col h-full gap-[24px] ">
            <div className="text-[10px] font-[400]  text-[#414042] leading-[14px] font-[Inter]">
              {splitContents.second.map((passage, index) => (
                <p key={index} style={{ margin: "16px 0" }}>
                  {passage}
                </p>
              ))}
            </div>
            {splitContents?.second?.length > 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[10px] font-[400] text-[#414042] ">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#414042]  ">
                  {data?.firstName} {data?.lastName}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetter9;
