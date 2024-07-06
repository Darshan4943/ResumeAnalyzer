import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatDateInNumber } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";

function CoverLetter11({ page1Ref, page2Ref, data }) {
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: [], second: [] });

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 350;
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
    <div className="flex flex-col gap-[24px] border-[#DEDEDE] ">
      <div
        ref={page1Ref}
        className="bg-[#FFFFFF] w-[595px] min-h-[700px]  gap-[16px] flex flex-col "
      >
        <div className="flex flex-row justify-between w-full bg-[#F1F2F2]">
          <div className="flex flex-col w-[352px] py-[20px] pl-[36px]">
            <span className="text-[32px] font-Poppins font-[600] text-[#27AAE1] leading-[36px] break-all">
              {formatName(camelCase(data?.firstName))}
            </span>
            <span className="text-[32px] font-Poppins font-[600] text-[#414042] leading-[36px] break-all">
              {" "}
              {formatName(camelCase(data?.lastName))}
            </span>
            <span className="text-[14px] font-[400] text-[#414042] leading-[21px] break-all">
              {data?.designation}
            </span>
          </div>

          <div className="flex flex-col w-[250px] py-[21px] pl-[12px] pr-[36px]">
            <div className="gap-[8px] flex flex-row justify-between items-center w-full py-[4px] px-[8px] border-b-[0.5px] border-dotted border-[#808285]">
              <span className="text-[10px] font-[400] text-[#414042] font-Poppins break-word flex-wrap items-center">
                {formatContent(data?.address)}
              </span>
              <svg
                className="min-w-[14px] min-h-[14px]"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.0008 1.5C4.79451 1.5 3 3.28059 3 5.46899C3 6.35055 3.56719 7.78776 4.73443 9.86328C5.55958 11.3307 6.37192 12.5548 6.40557 12.6057L7 13.5L7.59443 12.6057C7.62888 12.5548 8.44042 11.3307 9.26557 9.86328C10.4328 7.78856 11 6.35135 11 5.46979C11.0016 3.2806 9.20709 1.5 7.0008 1.5ZM7.0008 7.50079C5.8552 7.50079 4.9275 6.57949 4.9275 5.44277C4.9275 4.30604 5.856 3.38474 7.0008 3.38474C8.1456 3.38474 9.0749 4.30604 9.0749 5.44277C9.0749 6.5787 8.1464 7.50079 7.0008 7.50079Z"
                  fill="#808285"
                />
              </svg>
            </div>

            <div className="gap-[8px] flex flex-row w-full justify-between items-center  py-[4px] px-[8px] border-b-[0.5px] border-dotted border-[#808285]">
              <span className="text-[10px] font-[400] text-[#414042] font-Poppins break-all flex-wrap items-center">
                {data?.dial_code} {data?.mobileNumber}
              </span>
              <svg
                className="min-w-[14px] min-h-[14px]"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2456 10.5361C12.2679 10.7072 12.2159 10.8552 12.0903 10.9808L10.6122 12.4491C10.5453 12.5235 10.4585 12.5863 10.3511 12.6384C10.2437 12.6905 10.138 12.7236 10.0347 12.7384C10.0272 12.7384 10.0049 12.7401 9.96775 12.7442C9.93057 12.7484 9.88265 12.75 9.82316 12.75C9.68271 12.75 9.45467 12.726 9.13988 12.6773C8.82427 12.6293 8.43925 12.5103 7.98401 12.3209C7.52876 12.1316 7.01155 11.8481 6.4332 11.4703C5.85485 11.0925 5.24014 10.5725 4.58743 9.91357C4.06857 9.40184 3.63894 8.91242 3.29771 8.44533C2.95731 7.97824 2.683 7.5467 2.4748 7.14988C2.26742 6.75306 2.11209 6.39345 2.00799 6.07104C1.90471 5.74862 1.83365 5.47084 1.79647 5.23689C1.75929 5.00293 1.74442 4.82023 1.75186 4.6863C1.75929 4.5532 1.7626 4.4788 1.7626 4.46392C1.77747 4.35975 1.81052 4.25476 1.86257 4.14646C1.91462 4.03899 1.97742 3.95219 2.05177 3.88522L3.52988 2.40541C3.63315 2.30207 3.75213 2.25 3.88598 2.25C3.98264 2.25 4.06774 2.27727 4.14128 2.33266C4.21564 2.38805 4.27843 2.45668 4.33048 2.53852L5.52023 4.79625C5.58715 4.91447 5.60533 5.04427 5.57559 5.18563C5.54584 5.32617 5.48305 5.44521 5.38638 5.54111L4.84191 6.08592C4.82703 6.1008 4.81381 6.12477 4.80307 6.15867C4.79151 6.19174 4.78655 6.21984 4.78655 6.24217C4.81629 6.39759 4.88239 6.57533 4.98649 6.77539C5.07573 6.95314 5.21288 7.17056 5.39795 7.42684C5.58302 7.68229 5.84659 7.97742 6.18699 8.31059C6.51995 8.65202 6.81739 8.91657 7.076 9.10588C7.33543 9.29437 7.5519 9.43408 7.72623 9.52336C7.90056 9.61182 8.03358 9.66639 8.12612 9.68458L8.26492 9.71268C8.27979 9.71268 8.30375 9.70689 8.33763 9.69614C8.37067 9.6854 8.39464 9.67217 8.41033 9.65729L9.04404 9.01246C9.17789 8.89424 9.33322 8.83472 9.51085 8.83472C9.63644 8.83472 9.73724 8.85704 9.81077 8.90168H9.82234L11.968 10.1698C12.1233 10.2649 12.2159 10.3873 12.2456 10.5361Z"
                  fill="#808285"
                />
              </svg>
            </div>

            <div className="gap-[8px] flex flex-row w-full justify-between items-center  py-[4px] px-[8px] border-b-[0.5px] border-dotted border-[#808285]">
              <span className="text-[10px] font-[400] text-[#414042] font-Poppins break-all flex-wrap items-center">
                {data?.email}
              </span>
              <svg
                className="min-w-[14px] min-h-[14px]"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.25 10.1254C12.25 10.3555 12.1853 10.569 12.0817 10.7567L8.76646 7.04697L12.0456 4.1772C12.1728 4.37956 12.25 4.61737 12.25 4.87466V10.1254ZM6.99965 7.72078L11.5623 3.728C11.3753 3.62509 11.1639 3.5625 10.9365 3.5625H3.06206C2.834 3.5625 2.62332 3.62509 2.43697 3.728L6.99965 7.72078ZM8.27208 7.47949L7.2159 8.40432C7.15401 8.45786 7.07683 8.48498 6.99965 8.48498C6.92247 8.48498 6.84529 8.45787 6.78341 8.40363L5.72722 7.4788L2.37022 11.2358C2.57117 11.3617 2.80758 11.4375 3.06276 11.4375H10.9379C11.1931 11.4375 11.4288 11.3617 11.6298 11.2358L8.27208 7.47949ZM1.95442 4.17789C1.82718 4.38024 1.75 4.61806 1.75 4.87535V10.1254C1.75 10.3555 1.81397 10.569 1.91827 10.7567L5.23285 7.04697L1.95442 4.17789Z"
                  fill="#808285"
                />
              </svg>
            </div>

            <div className="gap-[8px] flex flex-row w-full justify-between items-center  py-[4px] px-[8px] border-b-[0.5px] border-dotted border-[#808285]">
              <span className="text-[10px] font-[400] text-[#414042] font-Poppins break-all flex-wrap items-center">
                {data?.letterDate != {} && formatDateInNumber(data?.letterDate)}
              </span>
              <svg
                className="min-w-[14px] min-h-[14px]"
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.14961 12.0999C0.860859 12.0999 0.613672 11.9954 0.408047 11.7864C0.202422 11.5773 0.0996094 11.3318 0.0996094 11.0499V3.3499C0.0996094 3.06796 0.202422 2.82247 0.408047 2.61344C0.613672 2.40442 0.860859 2.2999 1.14961 2.2999H2.19961V1.4249C2.19961 1.27615 2.24963 1.15146 2.34967 1.05084C2.44971 0.950214 2.57367 0.899902 2.72155 0.899902C2.86942 0.899902 2.9944 0.950214 3.09648 1.05084C3.19857 1.15146 3.24961 1.27615 3.24961 1.4249V2.2999H6.74961V1.4249C6.74961 1.27615 6.79963 1.15146 6.89967 1.05084C6.99971 0.950214 7.12367 0.899902 7.27155 0.899902C7.41942 0.899902 7.5444 0.950214 7.64648 1.05084C7.74857 1.15146 7.79961 1.27615 7.79961 1.4249V2.2999H8.84961C9.13836 2.2999 9.38555 2.40442 9.59117 2.61344C9.7968 2.82247 9.89961 3.06796 9.89961 3.3499V11.0499C9.89961 11.3318 9.7968 11.5773 9.59117 11.7864C9.38555 11.9954 9.13836 12.0999 8.84961 12.0999H1.14961ZM1.14961 11.0499H8.84961V5.7999H1.14961V11.0499ZM2.72461 7.8999C2.57586 7.8999 2.45117 7.84988 2.35055 7.74984C2.24992 7.6498 2.19961 7.52584 2.19961 7.37796C2.19961 7.23009 2.24992 7.10511 2.35055 7.00303C2.45117 6.90094 2.57586 6.8499 2.72461 6.8499H7.27461C7.42336 6.8499 7.54805 6.89992 7.64867 6.99997C7.7493 7.10001 7.79961 7.22397 7.79961 7.37184C7.79961 7.51972 7.7493 7.64469 7.64867 7.74678C7.54805 7.84886 7.42336 7.8999 7.27461 7.8999H2.72461ZM2.72461 9.9999C2.57586 9.9999 2.45117 9.94988 2.35055 9.84984C2.24992 9.7498 2.19961 9.62584 2.19961 9.47796C2.19961 9.33009 2.24992 9.20511 2.35055 9.10303C2.45117 9.00094 2.57586 8.9499 2.72461 8.9499H5.87461C6.02336 8.9499 6.14805 8.99992 6.24867 9.09997C6.3493 9.20001 6.39961 9.32397 6.39961 9.47184C6.39961 9.61972 6.3493 9.74469 6.24867 9.84678C6.14805 9.94886 6.02336 9.9999 5.87461 9.9999H2.72461Z"
                  fill="#808285"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[36px] pt-[20px] pb w-full h-[576px]">
          <div className="flex flex-col w-full ga-[4px] pb-[20px]">
            <span className="text-[14px] font-[600] text-[#27AAE1] leading-[21px]">
              To,
            </span>
            <div className="flex flex-col w-[224px]">
              <span className="text-[12px] font-[500] text-[#383839] leading-[18px] break-all">
                {data?.employerName}
              </span>

              <span className="text-[10px] font-[400] text-[#939598] font-Poppins break-all">
                {data?.employerOrganizationName}
              </span>
              <span className="text-[10px] font-[400] text-[#939598] font-Poppins break-all">
                {data?.employerAddress} {data?.employerCityState}{" "}
                {data?.employerCountry}
              </span>
            </div>
          </div>
          <div className="flex border h-[1px] border-[#6D6E71]"></div>

          <div className="flex flex-col justify-start w-full gap-[24px] pt-[20px] ">
            <div className="text-[10px] font-[400] text-[#383839] ">
              <span className="text-[10px] font-[400] text-[#383839]  pb-[4px]">
                Dear {data?.employerName},
              </span>
              {splitContents.first.map((passage, index) => (
                <p
                  key={index}
                  style={{ margin: "16px 0" }}
                  className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify"
                >
                  {passage}
                </p>
              ))}
            </div>
            {splitContents?.second?.length == 0 && (
              <div className="flex flex-col w-full gap-[2px]">
                <span className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify">
                  Warm regards,
                </span>
                <span className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify">
                  {data?.firstName} {data?.lastName}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row w-full min-h-[16]">
          <svg
            width="800"
            height="16"
            viewBox="0 0 800 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M799.5 0H0.5V16H799.5V0Z" fill="#5BC7ED" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M799.501 0V16H532.441L524.215 0H799.501Z"
              fill="#383839"
            />
          </svg>
        </div>
      </div>

      {splitContents?.second?.length > 0 && (
        <>
          <div
            ref={page2Ref}
            className="h-[700px]  w-[595px] flex flex-col bg-[#fff]  "
          >
            <div className="flex flex-col px-[36px] pt-[20px] w-full h-[684px]">
              <div>
                {splitContents.second.map((passage, index) => (
                  <p
                    key={index}
                    style={{ margin: "16px 0" }}
                    className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify"
                  >
                    {passage}
                  </p>
                ))}
              </div>
              {splitContents?.second?.length > 0 && (
                <div className="flex flex-col w-full gap-[2px] ">
                  <span className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify">
                    Warm regards,
                  </span>
                  <span className="text-[10px] font-[400] text-[#383839] font-Poppins text-justify">
                    {data?.firstName} {data?.lastName}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-row  min-h-[16] w-full">
              <svg
                width="800"
                height="16"
                viewBox="0 0 800 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M799.5 0H0.5V16H799.5V0Z" fill="#5BC7ED" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M799.501 0V16H532.441L524.215 0H799.501Z"
                  fill="#383839"
                />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoverLetter11;
