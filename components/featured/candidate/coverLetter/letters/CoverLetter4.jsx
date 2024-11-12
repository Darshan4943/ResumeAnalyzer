import React, { useState, useEffect, useRef, useCallback } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";
import CustomParastyle from "./CustomParastyle";
const CoverLetter4 = ({ page1Ref, page2Ref, data }) => {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const screenHeight = window.innerHeight;
    const firstPageHeight = screenHeight >= 800 ? 915 : 450;
    // const firstPageHeight = 400; // Set the fixed height you want for the paragraph div

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
    if (link?.length > 32) {
      return link?.match(/.{1,32}/g).join("\n");
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
      <div className="flex flex-col w-[595px] gap-[24px]">
        <div
          className="flex flex-col w-[595px] min-h-[700px]  gap-[24px] px-[42px] pt-[42px] justify-between bg-[#fff] "
          ref={page1Ref}
        >
          <div className="flex flex-row gap-[24px] ">
            <div>
              <h5 className="font-montserrat text-[24px] font-[400] leading-48.76 text-[#344A50] text-left break-word">
                {formatName(camelCase(data.firstName))}{" "}
                {formatName(camelCase(data.lastName))}
              </h5>
              <h6 className="font-montserrat text-[14px] font-[500] leading-[17.07px] text-[#AC5428] text-left break-word">
                {camelCase(data.designation)}
              </h6>
            </div>
            <div className="flex flex-col gap-[8px] w-[413px]">
              <div className="flex flex-row gap-[12px]  items-center">
                <svg
                  className="min-w-[20px] min-h-[20px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="10" fill="#344A50" />
                  <path
                    d="M9.79117 3.17627C7.39998 3.17627 5.45508 5.23474 5.45508 7.76466C5.45508 8.7838 6.06981 10.4453 7.33486 12.8447C8.22917 14.5411 9.10959 15.9563 9.14605 16.0152L9.7903 17.049L10.4346 16.0152C10.4719 15.9563 11.3514 14.5411 12.2457 12.8447C13.5108 10.4462 14.1255 8.78472 14.1255 7.76559C14.1273 5.23475 12.1824 3.17627 9.79117 3.17627ZM9.79117 10.1135C8.54956 10.1135 7.54411 9.04847 7.54411 7.73435C7.54411 6.42022 8.55043 5.35515 9.79117 5.35515C11.0319 5.35515 12.0391 6.42022 12.0391 7.73435C12.0391 9.04755 11.0328 10.1135 9.79117 10.1135Z"
                    fill="white"
                  />
                </svg>
                <div className="font-montserrat text-[10px] font-medium leading-[12.19px] text-[#344A50] text-left break-word">
                  {formatContent(camelCase(data?.address))}
                </div>
              </div>
              <div className="flex flex-row gap-[12px] items-center">
                <svg
                  className="min-w-[20px] min-h-[20px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="10" fill="#344A50" />
                  <path
                    d="M15.7846 12.8912C15.7846 13.1447 15.7135 13.3799 15.5986 13.5869L11.946 9.50023L15.5585 6.33909C15.6989 6.56248 15.7837 6.82414 15.7837 7.10679L15.7846 12.8912ZM10.0002 10.2424L15.0269 5.84399C14.8209 5.73093 14.5884 5.66162 14.3376 5.66162H5.66197C5.41123 5.66162 5.17873 5.73093 4.97358 5.84399L10.0002 10.2424ZM11.4017 9.97618L10.2382 10.9956C10.1698 11.0548 10.085 11.084 10.0002 11.084C9.91545 11.084 9.83066 11.0539 9.76227 10.9946L8.59883 9.97618L4.90064 14.1148C5.1222 14.2543 5.38206 14.3373 5.66289 14.3373H14.3385C14.6194 14.3373 14.8792 14.2543 15.1008 14.1148L11.4017 9.97618ZM4.44201 6.34001C4.30159 6.56339 4.2168 6.82506 4.2168 7.10771V12.8912C4.2168 13.1447 4.28792 13.3799 4.4028 13.5869L8.0545 9.49934L4.44201 6.34001Z"
                    fill="white"
                  />
                </svg>
                <div className="font-montserrat text-[10px] font-medium leading-[12.19px] text-[#344A50] text-left break-all">
                  {data?.email}
                </div>
              </div>
              <div className="flex flex-row gap-[12px]  items-center">
                <svg
                  className="min-w-[20px] min-h-[20px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="10" fill="#344A50" />
                  <path
                    d="M15.4746 13.2315C15.4974 13.412 15.4436 13.5707 15.3114 13.7047L13.7677 15.2675C13.6975 15.345 13.6073 15.4134 13.496 15.469C13.383 15.5237 13.2726 15.5602 13.1632 15.5766C13.155 15.5766 13.1322 15.5784 13.093 15.5821C13.0547 15.5857 13.0037 15.5885 12.9426 15.5885C12.7958 15.5885 12.5587 15.5629 12.2305 15.5119C11.9013 15.4608 11.4983 15.3341 11.0224 15.1326C10.5473 14.9311 10.0075 14.6293 9.40394 14.2272C8.80034 13.8251 8.15753 13.2725 7.47734 12.5705C6.93665 12.027 6.48623 11.5064 6.13063 11.0086C5.77595 10.5117 5.48873 10.0512 5.27264 9.62906C5.05655 9.20781 4.89334 8.82394 4.78484 8.48202C4.67633 8.13828 4.6043 7.84287 4.5651 7.59304C4.52589 7.34503 4.50948 7.149 4.51769 7.00676C4.52589 6.86543 4.52863 6.78611 4.52863 6.7697C4.54504 6.65937 4.57969 6.54722 4.63348 6.43325C4.68819 6.31927 4.75384 6.22626 4.83134 6.15515L6.37408 4.58141C6.48258 4.47108 6.60658 4.41455 6.747 4.41455C6.84729 4.41455 6.93574 4.44373 7.01324 4.50299C7.08983 4.56135 7.15548 4.6352 7.21018 4.72273L8.45203 7.12529C8.52042 7.25203 8.53957 7.3888 8.50948 7.54016C8.47848 7.68969 8.41283 7.81642 8.31162 7.91762L7.74449 8.49752C7.72808 8.51393 7.71531 8.53855 7.70437 8.57411C7.69252 8.60967 7.68614 8.63977 7.68614 8.66347C7.71714 8.82942 7.78735 9.01816 7.89585 9.23151C7.98794 9.42025 8.13109 9.65094 8.32439 9.92356C8.5186 10.1962 8.79304 10.5098 9.14864 10.8645C9.49694 11.2274 9.80695 11.5092 10.0777 11.7116C10.3485 11.9131 10.5747 12.0608 10.757 12.1547C10.9376 12.2495 11.0771 12.3061 11.1737 12.3261L11.3196 12.3553C11.3351 12.3553 11.3606 12.3498 11.3953 12.338C11.4299 12.3261 11.4545 12.3124 11.47 12.2951L12.1311 11.6095C12.2715 11.4818 12.4329 11.4198 12.6207 11.4198C12.7511 11.4198 12.856 11.4444 12.9335 11.4918H12.9444L15.1856 12.8413C15.347 12.9434 15.4427 13.0738 15.4746 13.2315Z"
                    fill="white"
                  />
                </svg>
                <div className="font-montserrat text-[10px] font-medium leading-[12.19px] text-[#344A50] text-left break-word">
                  {data?.dial_code} {data?.mobileNumber}
                </div>
              </div>
            </div>
          </div>
          <div class="border-[0.75px] border-custom-color border-[#344A50] w-[511px]"></div>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-row justify-end items-start gap-[8.99px]">
              <h6 className="text-[12px] text-[#AC5428] font-poppins font-[600] leading-[15px] text-left">
                Date :
              </h6>
              <p className="text-[12px] text-[#333333] font-Montserrat font-[400] leading-[14.63px] text-left">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col w-[180px]">
                <div className="flex flex-col ">
                  <h6 className="text-[12px] text-[#AC5428] font-Montserrat font-[600] leading-[16px] text-left">
                    To,
                  </h6>
                  <h6 className="text-[12px] text-[#AC5428] font-Montserrat font-[600] leading-[16px] text-left">
                    {data?.employerName}
                  </h6>

                  <p className="text-[12px] text-[#797979] font-Montserrat font-[600] leading-[16px] text-left">
                    {data?.employerOrganizationName}
                  </p>
                  <p className="text-[12px] text-[#797979] font-Montserrat font-[400] leading-[16px] text-left">
                    {data?.employerAddress} {data?.employerCityState}{" "}
                    {data?.employerCountry}
                  </p>
                </div>
              </div>
              <div className="font-Montserrat text-[12px] font-normal leading-[12px] text-[#161616] w-full text-left h-[585px]">
                <div>
                  <span className="font-Montserrat text-[12px] font-[400] leading-[14.63px] text-[#161616] w-[307px] text-justify">
                    {" "}
                    Dear {camelCase(data?.employerName)},
                  </span>
                </div>
                {splitContents.first.map((passage, index) => (
                  <>
                    <CustomParastyle
                      style={{
                        margin: "16px 0",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#161616",
                        textAlign: "justify",
                        fontFamily: "Montserrat",
                      }}
                      key={index}
                      passage={passage}
                    />
                  </>
                  // <p
                  //   key={index}
                  //   style={{ margin: "16px 0" }}
                  //   className="font-Montserrat text-[12px] font-[400] leading-[14.63px] text-[#161616]  text-justify"
                  // >
                  //   {passage}
                  // </p>
                ))}
                {splitContents?.second?.length == 0 && (
                  <div className="flex flex-col w-full gap-[2px]">
                    <span className="font-Montserrat text-[12px] font-normal leading-[14.63px] text-[#161616] w-[307px] text-left">
                      Warm regards,
                    </span>
                    <span className="font-Montserrat text-[12px] font-normal leading-[14.63px] text-[#161616] w-[307px] text-left pt-[8px]">
                      {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {splitContents?.second?.length > 0 && (
          <div
            className="flex flex-col gap-[24px] px-[42px] pt-[42px] justify-between w-[595px] min-h-[700px] bg-[#fff] "
            ref={page2Ref}
          >
            <div className="font-Montserrat text-[12px] font-normal leading-[14.63px] text-[#161616] w-full text-left h-[585px]">
              {splitContents.second.map((passage, index) => (
                <>
                  <CustomParastyle
                    style={{
                      margin: "16px 0",
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#161616",
                      textAlign: "justify",
                      fontFamily: "Montserrat",
                    }}
                    key={index}
                    passage={passage}
                  />
                </>
              ))}
              {splitContents?.second?.length > 0 && (
                <div className="flex flex-col w-full gap-[2px]">
                  <span className="font-Montserrat text-[12px] font-[400] leading-[14.63px] text-[#161616]  text-left">
                    Warm regards,
                  </span>
                  <span className="font-Montserrat text-[12px] font-normal leading-[14.63px] text-[#161616] w-[307px] text-left pt-[8px]">
                    {camelCase(data?.firstName)} {camelCase(data?.lastName)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoverLetter4;
