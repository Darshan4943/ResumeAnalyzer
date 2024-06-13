import React, { useState, useEffect, useRef } from "react";

const CoverLetter2 = () => {
  const firstPageRef = useRef(null);
  const pageRef = useRef(null);
  const HeaderPageRef = useRef(null);

  const firstContainer = useRef(null);
  const secondContainer = useRef(null);

  const [splitContents, setSplitContent] = useState({ first: "", second: "" });

  const data = {
    name: "Alison Danes",
    title: "User Experience Designer",
    email: "alisondanes111@gmail.com",
    phone: "+27 8800088889",
    address: "Pune, Maharashtra, India",
    date: "03-06-2024",
    to: {
      name: "Travis Walkman",
      designation: "Human Resources Manager",
      company: "Skilotech HRMS Pvt. Ltd.",
      address: "321 Employment Avenue, Harare, Zimbabwe, SA.",
    },
    paragraph: `
      Dear [Hiring Manager’s Name],

 gn
     about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.


      Warm regards,
      [Your Name]
    `,
  };

  useEffect(() => {
    const splitContent = () => {
      const firstPage = firstPageRef.current;
      const firstPageHeight = 504;
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = firstPage?.clientWidth + "px";
      console.log(555, firstPage?.clientWidth + "px");
      tempDiv.innerHTML = data.paragraph;
      document.body.appendChild(tempDiv);

      let splitIndex = data.paragraph.length;
      let firstHalf = "";
      let secondHalf = data.paragraph;

      while (splitIndex > 0) {
        firstHalf = data.paragraph.substring(0, splitIndex);
        secondHalf = data.paragraph.substring(splitIndex);

        tempDiv.innerHTML = firstHalf;

        if (tempDiv.clientHeight <= firstPageHeight) {
          break;
        }

        splitIndex--;
      }

      document.body.removeChild(tempDiv);
      setSplitContent({ first: firstHalf, second: secondHalf });
    };
    splitContent();
  }, [data]);

  return (
    <>
      <div className="w-[800px] h-[842px] p-[32px] gap-[16px] flex flex-col absolute left-[4000px]">
        <div
          className="flex flex-col w-full h-[153px] pt-[26px] pr-[36px] pb-[14px] pl-[36px] bg-[#F9F9F9] gap-[24px]"
          ref={firstContainer}
        >
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="flex flex-col gap-[8px]"></div>
          </div>
        </div>
        <div className="flex flex-col px-[36px]">
          <div></div>
        </div>
      </div>

      <div className="flex flex-col w-[800px] gap-6">
        <div className="flex flex-col w-full h-[153px] pt-[26px] pr-[36px] pb-[14px] pl-[36px] bg-[#F9F9F9] gap-[24px]">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-[26px] text-[#333333]">{data.name}</h1>
              <p className="text-[16px] text-[#0E6CC2]">{data.title}</p>
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
                  {data.phone}
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
              {data.date}
            </p>
          </div>
          <div className="flex flex-row gap-[24px]">
            <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px] text-left">
              <p>{splitContents.first}</p>
            </div>
            <div className="flex flex-col w-[224px]">
              <div className="flex flex-col">
                <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-semibold leading-[15px] text-left">
                  To,
                </h6>
                <h6 className="text-[10px] text-[#0E6CC2] font-poppins font-semibold leading-[15px] text-left">
                  {data.to.name}
                </h6>
                <p className="text-[10px] text-[#797979] font-poppins font-normal leading-[15px] text-left">
                  {data.to.designation} {data.to.company} {data.to.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {splitContents.second && (
          <div className="flex flex-col px-[36px] mt-6">
            <div className="flex flex-row gap-[24px]">
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[500px] text-left">
                <p>{splitContents.second}</p>
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
