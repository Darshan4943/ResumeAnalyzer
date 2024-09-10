import React, { useEffect, useRef, useState, useCallback } from "react";
import { camelCase } from "../../../../../utils/middleware";
import CustomParastyle from "./CustomParastyle";

function CoverLetter10({ page2Ref, page1Ref, data }) {
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
    if (link?.length > 24) {
      return link?.match(/.{1,24}/g).join("\n");
    }
    return link;
  };
  return (
    <>
      {/** 
     <div className="flex flex-col gap-[24px]">
        <div
          ref={page1Ref}
          className=" w-[595px] min-h-[700px] flex flex-row bg-[#fff] "
        >
          <div className="w-[207px] flex flex-col px-[42px] pt-[162px] justify-between pb-[42px] bg-[#C7EAFB]">
            <div className="flex flex-col gap-[8px]">
              <span className=" text-[14px] font-[400] text-[#2D3033] leading-[16.94px]">
                To,
              </span>
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[2px]">
                  <span className=" text-[12px] font-[600] text-[#2D3033] leading-[12.1px] break-word">
                    {data?.employerName}
                  </span>
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                    {data?.designation}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                    {data?.employerOrganizationName}
                  </span>
                  <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
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
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                    {data?.address}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-[2px]">
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                    Mobile
                  </span>
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px] break-all">
                    {data?.dial_code} {data?.mobileNumber}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-[2px]">
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px]">
                    Email
                  </span>
                  <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px] break-all">
                    {data?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col px-[42px] pt-[42px] pb-[92px] gap-[38px] w-[388px]">
            <div className="gap-[6px] flex flex-col ">
              <div className="gap-[2px] flex flex-col flex-wrap">
                <span className="text-[28px] font-[400] leading-[33.89px] text-[#0D0D0D] break-word">
                  {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                </span>
                <span className="text-[18px] font-[400] leading-[21.78px] text-[#0D0D0D] break-word">
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
            className="flex flex-row w-[595px] min-h-[700px] bg-[#fff]"
          >
            <div className="w-[207px] flex flex-col px-[42px] pt-[162px] justify-between pb-[42px] bg-[#C7EAFB]"></div>

            <div className="flex flex-col px-[42px] pt-[42px] pb-[92px] gap-[38px] w-[388px]">
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
        )}
      </div>*/}
      <div className="flex flex-col gap-[24px]">
        <div
          ref={page1Ref}
          className=" w-[595px] min-h-[700px] flex flex-col bg-[#fff] gap-[16px] py-[24px] px-[16px]"
        >
          <div className="flex flex-col flex-wrap gap-[6px]">
            <div className="flex flex-col">
              <span className="text-[28px] font-[400] leading-[33.89px] text-[#0D0D0D] break-word">
                {camelCase(data?.firstName)}
              </span>
              <span className="text-[28px] font-[400] leading-[33.89px] text-[#0D0D0D] break-word">
                {camelCase(data?.lastName)}
              </span>
            </div>
            <span className="text-[18px] font-[400] leading-[21.78px] text-[#0D0D0D] break-word">
              {camelCase(data?.designation)}
            </span>
          </div>
          <div className="w-full h-[1px] bg-[#000000]"></div>
          <div className="flex flex-row pt-[28px]">
            <div className="flex flex-col w-[30%] px-[16px] gap-[36px]  border-r-[1px] border-[#DEDEDE] ">
              <div className="flex flex-col gap-[8px]  w-full justify-start">
                <span className=" text-[14px] font-[400] text-[#2D3033] leading-[16.94px]">
                  To,
                </span>
                <div className="flex flex-col gap-[6px]">
                  <div className="flex flex-col gap-[2px]">
                    <span className=" text-[12px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                      {data?.employerName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                      {data?.employerOrganizationName}
                    </span>
                    <span className=" text-[10px] font-[400] text-[#2D3033] leading-[12.1px] break-word">
                      {data?.employerAddress} {data?.employerCityState}{" "}
                      {data?.employerCountry}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#000000] "></div>
              <div className="flex flex-col gap-[6px] flex-wrap">
                <div className="gap-[8px] flex flex-row w-full flex-wrap items-center">
                  <svg
                    className="min-h-[16px] min-w-[16px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7305 11.4931L11.8772 9.63512C11.5082 9.26663 10.8975 9.27796 10.5158 9.66062L9.58132 10.596C9.52194 10.5648 9.46115 10.5294 9.39754 10.494C8.80803 10.1666 8.0008 9.71874 7.15117 8.86555C6.30012 8.01094 5.85198 7.20025 5.524 6.60926C5.48866 6.5469 5.45615 6.48737 5.42363 6.42927L6.0499 5.80143L6.35808 5.49246C6.73978 5.1098 6.75251 4.49613 6.38212 4.12764L4.52876 2.26961C4.1612 1.90112 3.55048 1.91105 3.16595 2.29513L2.6443 2.82093L2.65843 2.8351C2.48313 3.05903 2.33752 3.31697 2.22867 3.59617C2.12829 3.86262 2.06468 4.11488 2.03782 4.36715C1.79325 6.40092 2.72064 8.26037 5.2342 10.7817C8.71189 14.2667 11.5153 14.0045 11.6354 13.9904C11.8984 13.9592 12.1514 13.8968 12.4073 13.7962C12.683 13.6885 12.9403 13.5425 13.1636 13.3668L13.1749 13.3781L13.7051 12.858C14.0882 12.4753 14.0995 11.863 13.7305 11.4931Z"
                      fill="#030203"
                    />
                  </svg>

                  <span className=" flex flex-wrap text-[10px] font-Lato font-[400] text-[#58595B] leading-[12px] break-word">
                    {data?.dial_code} {data?.mobileNumber}
                  </span>
                </div>

                <div className="gap-[8px] flex flex-row  items-center ">
                  <svg
                    className="min-h-[16px] min-w-[16px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00216 9.80322L6.51532 8.43582L2.27112 12.2536C2.42543 12.4085 2.63165 12.5 2.86095 12.5H13.1362C13.3655 12.5 13.5717 12.4071 13.726 12.2536L9.48179 8.43582L8.00216 9.80322ZM13.7274 3.74642C13.5775 3.59152 13.3669 3.5 13.1376 3.5H2.8624C2.63598 3.5 2.42543 3.59293 2.27257 3.74642L8.00361 8.90198L13.7274 3.74642ZM2 4.2914V11.7691L6.14325 8.07113L2 4.2914ZM9.85675 8.06971L14 11.7677V4.28577L9.85675 8.06971Z"
                      fill="#030203"
                    />
                  </svg>

                  <span className="flex flex-wrap leading-[12px] text-[10px] font-[400] text-[#58595B] font-Lato break-all">
                    {data?.email}
                  </span>
                </div>

                <div className="gap-[8px] flex flex-row items-center">
                  <svg
                    className="min-h-[16px] min-w-[16px]"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25055 2C5.90431 2 4 3.89132 4 6.2184C4 7.0097 4.22097 7.77202 4.63403 8.43849L8.0096 13.8349C8.14396 14.0567 8.48041 14.0567 8.61476 13.8249L11.9037 8.38054C12.2979 7.73412 12.5 6.98183 12.5 6.2184C12.5011 3.89132 10.5968 2 8.25055 2ZM8.25055 8.33149C7.058 8.33149 6.11529 7.37636 6.11529 6.21728C6.11529 5.05931 7.07688 4.10306 8.25055 4.10306C9.42423 4.10306 10.3758 5.05819 10.3758 6.21728C10.3758 7.36633 9.45199 8.33149 8.25055 8.33149Z"
                      fill="#030203"
                    />
                  </svg>

                  <span className="text-[10px] font-[400] text-[#58595B] font-Lato break-word">
                    {formatContent(camelCase(data?.address))}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[70%] gap-[4px] px-[16px]">
              <span className="text-[10px] font-[400] text-[#2D3033] leading-[14px] ">
                Dear {data?.employerName},
              </span>
              <div className="text-[10px] font-[400] text-[#2D3033] leading-[14.52px] ">
                {splitContents.first.map((passage, index) => (
                   <>
                  <CustomParastyle
                    style={{
                      margin: "16px 0",
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#2D3033",
                      textAlign: "justify",
                      fontFamily: "Inter",
                    }}
                    key={index}
                    passage={passage}
                  />
                </>
                  // <p
                  //   key={index}
                  //   style={{ margin: "16px 0" }}
                  //   className="text-[10px] font-[400] text-[#2D3033] leading-[14px] text-justify "
                  // >
                  //   {passage}
                  // </p>
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
            className=" w-[595px] min-h-[700px] flex flex-col bg-[#fff] gap-[16px] py-[24px] px-[16px]"
          >
            <div className="flex flex-row ">
              <div className="flex flex-col w-[30%] px-[16px] gap-[36px] min-h-[700px] border-r-[1px] border-[#DEDEDE]"></div>
              <div className="flex flex-col w-[70%] gap-[4px] px-[16px]">
                <div>
                  {splitContents?.second?.map((passage, index) => (
                     <>
                  <CustomParastyle
                    style={{
                      margin: "16px 0",
                      fontSize: "10px",
                      fontWeight: "400",
                      color: "#2D3033",
                      textAlign: "justify",
                      fontFamily: "Inter",
                    }}
                    key={index}
                    passage={passage}
                  />
                </>
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
    </>
  );
}

export default CoverLetter10;
