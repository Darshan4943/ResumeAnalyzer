import React, { useEffect, useRef, useState, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";

function CoverLetter7({ page2Ref, page1Ref, data }) {
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
        className="w-[595px] min-h-[700px] flex flex-col gap-[32px] p-[34px] border-2"
      >
        <div className="w-full flex flex-row justify-between bg-[#F1F2F2] py-[28px] px-[42px] rounded-[80px]">
          <div className="flex flex-col gap-[2px] justify-start items-start">
            <span className="text-[#414042] text-[20px] font-[700] leading-[30px] ">
              {data?.firstName} {data?.lastName}
            </span>

            <span className="text-[#414042] text-[12px] font-[500] leading-[18px] ">
              {data?.designation}
            </span>
          </div>
          <div className="flex flex-col gap-[8px] w-[30%]">
            <div className="gap-[8px] flex flex-row w-full ">
              <svg
                className="min-h-[15px] min-w-[15px]"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3292 10.8743C13.3535 11.0637 13.2964 11.2289 13.1557 11.3686L11.5124 12.9997C11.4384 13.0823 11.3413 13.1527 11.2224 13.2098C11.1035 13.2669 10.9857 13.3045 10.8704 13.3215C10.8619 13.3215 10.8377 13.324 10.7964 13.3276C10.7551 13.3313 10.7018 13.3337 10.6362 13.3337C10.4797 13.3337 10.226 13.307 9.8765 13.2535C9.52577 13.2001 9.09858 13.0689 8.5925 12.8576C8.08643 12.6475 7.5124 12.3329 6.86918 11.9127C6.22719 11.4925 5.54393 10.9155 4.81941 10.182C4.24294 9.61358 3.76599 9.06948 3.38614 8.54967C3.00749 8.03107 2.70288 7.55012 2.47229 7.11047C2.24171 6.66959 2.06816 6.27002 1.95408 5.91173C1.83879 5.55345 1.76112 5.24496 1.71986 4.98505C1.67859 4.72515 1.6616 4.52111 1.6701 4.37294C1.67859 4.22477 1.68223 4.14218 1.68223 4.12639C1.69922 4.01101 1.73563 3.89319 1.79389 3.77417C1.85214 3.65514 1.92131 3.558 2.00384 3.48392L3.64706 1.83945C3.76235 1.72407 3.89342 1.66699 4.0427 1.66699C4.14949 1.66699 4.24416 1.69734 4.32668 1.75928C4.40921 1.82122 4.47959 1.89773 4.53663 1.98882L5.85825 4.49803C5.93228 4.6292 5.95291 4.77375 5.92015 4.93042C5.88738 5.0871 5.81699 5.21825 5.71019 5.32634L5.1046 5.93238C5.08761 5.94938 5.07305 5.97611 5.06091 6.01255C5.04878 6.0502 5.04271 6.08056 5.04271 6.10606C5.07548 6.27852 5.1495 6.4765 5.2648 6.69876C5.36431 6.89672 5.51601 7.13721 5.72233 7.42262C5.92864 7.70682 6.21991 8.03473 6.59855 8.40516C6.9687 8.78409 7.2988 9.07921 7.58642 9.28932C7.87405 9.49943 8.11556 9.65367 8.30852 9.75326C8.5027 9.85163 8.65076 9.91236 8.7527 9.93179L8.90683 9.96337C8.92382 9.96337 8.94931 9.95732 8.98693 9.94517C9.02455 9.93303 9.05003 9.91845 9.06703 9.90266L9.77091 9.1861C9.91897 9.05372 10.0925 8.9881 10.2891 8.9881C10.4287 8.9881 10.5403 9.0124 10.6229 9.06219H10.635L13.0185 10.471C13.1933 10.5731 13.2952 10.7091 13.3292 10.8743Z"
                  fill="#0054A6"
                />
              </svg>

              <span className="text-[10px] font-[400] text-[#414042]">
                {data?.mobileNumber}
              </span>
            </div>
            <div>
              <div className="gap-[8px] flex flex-row ">
                <svg
                  className="min-h-[15px] min-w-[15px]"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3346 10.1256C13.3346 10.3818 13.263 10.6186 13.1474 10.827L9.46349 6.70493L13.1079 3.51652C13.2493 3.74145 13.3346 4.00584 13.3346 4.29136V10.1256ZM7.50176 7.45315L12.5718 3.01709C12.3643 2.90325 12.1293 2.8335 11.8769 2.8335H3.12665C2.87328 2.8335 2.6392 2.90325 2.43173 3.01709L7.50176 7.45315ZM8.91454 7.18509L7.74135 8.21238C7.67251 8.27206 7.58713 8.30238 7.50084 8.30238C7.41547 8.30238 7.3301 8.27206 7.26125 8.21238L6.08715 7.18509L2.35646 11.3595C2.58045 11.5 2.84207 11.5835 3.12573 11.5835H11.876C12.1596 11.5835 12.4212 11.499 12.6452 11.3595L8.91454 7.18509ZM1.89471 3.51652C1.75334 3.74145 1.66797 4.00584 1.66797 4.29136V10.1247C1.66797 10.3808 1.73957 10.6177 1.85524 10.8261L5.53819 6.70311L1.89471 3.51652Z"
                    fill="#0054A6"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042]">
                  {data?.email}
                </span>
              </div>
            </div>
            <div>
              <div className="gap-[8px] flex flex-row ">
                <svg
                  className="min-h-[15px] min-w-[15px]"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49908 1.16699C5.40791 1.16699 3.70703 2.89824 3.70703 5.02599C3.70703 5.88312 4.24463 7.2805 5.35096 9.29773C6.13306 10.7245 6.90301 11.9147 6.9349 11.9642L7.49908 12.8337L8.06249 11.9642C8.09514 11.9147 8.86433 10.7245 9.64643 9.29773C10.7528 7.2805 11.2904 5.88312 11.2904 5.02599C11.2904 2.89824 9.58949 1.16699 7.49908 1.16699ZM7.49908 7.00148C6.41325 7.00148 5.53396 6.10572 5.53396 5.00049C5.53396 3.89527 6.41401 2.99948 7.49908 2.99948C8.58415 2.99948 9.4642 3.89527 9.4642 5.00049C9.4642 6.10572 8.58415 7.00148 7.49908 7.00148Z"
                    fill="#0054A6"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042]">
                  {data?.address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-[24px]">
          <div className=" flex flex-col gap-[16px] w-[30%]">
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] font-[600] text-[#0054A6]">
                Date :
              </span>
              <span className="text-[12px] font-[400] text-[#414042]">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className=" text-[12px] font-[600] text-[#0054A6] leading-[18px]">
                To,
              </span>

              <span className=" text-[12px] font-[600] text-[#0054A6] leading-[18px]">
                {data?.employerName}
              </span>
              <span className=" text-[12px] font-[600] text-[#333333] leading-[18px]">
                {data?.designation}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042] leading-[18px]">
                {data?.employerOrganizationName}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042] leading-[18px]">
                {data?.employerAddress} {data?.employerCityState}{" "}
                {data?.employerCountry}
              </span>
            </div>
          </div>
          <div className="flex flex-col w-[70%] gap-[4px]">
            <span className="text-[10px] font-[400] text-[#414042]">
              Dear {data?.employerName},
            </span>
            <div
              className="text-[10px] font-[400] text-[#414042] leading-[15px] "
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
                <span className="text-[10px] font-[400] text-[#414042]  ">
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
          className="  p-[24px]  w-[595px] min-h-[700px] border-2 flex flex-col bg-[#fff] overflow-hidden"
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
        </div>
      )}
    </div>
  );
}

export default CoverLetter7;
