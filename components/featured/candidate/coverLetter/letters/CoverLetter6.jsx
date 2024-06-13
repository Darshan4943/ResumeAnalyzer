import React, { useEffect, useState, useRef } from "react";

function CoverLetter6() {
  const data = {
    name: "Oliver Robinson",
    designation: "Web Developer",
    mobileNo: "(310) 555 - 9572",
    email: "hello@feliciawilson.com",
    address: "San Francisco, CA",
    toAddress: {
      name: "Travis walkman",
      designation: "Human Resources Manager",
      company: "Skilotech HRMS Pvt. Ltd",
      address: "321 Employment Avenue, Harare, Zimbambve, SA.",
      date: "03-06-2024",
    },
    recieverName: "Neha",
    paragraph: [
      {
        description: `I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.
                With over [number] years of experience in product design, I have
                honed my skills in user research, wireframing, prototyping, and
                visual design. My proficiency in tools such as Sketch, Figma,
                Adobe XD, and InVision, combined with my ability to collaborate
                effectively with cross-functional teams, has allowed me to
                successfully deliver intuitive and engaging user experiences. In
                my previous role at [Your Previous Company], I led the redesign
                of the company’s flagship product, resulting in a 20% increase
                in user engagement and a 15% improvement in customer

                adept at maintaining a balance between user needs and business
                objectives, ensuring that the final product not only delights

                excellent communication skills and collaborative approach have
                consistently been assets in my professional journey, enabling me
                to work seamlessly with developers, product managers, and
                stakeholders. I am thrilled about the possibility of
                contributing to [Company Name] and am eager to bring my creative
                problem-solving skills and design expertise to your team. Thank
                you for considering my application. I look forward to the
                opportunity to discuss how my background, skills, and passions
                align with the needs of your team. Warm regards, [Your Name]`,
      },
    ],
  };
  const firstContainer = useRef(null);
  const secondContainer = useRef(null);
  const thirdContainer = useRef(null);
  const fourthContainer = useRef(null);
  const fifthContainer = useRef(null);
  const sixthContainer = useRef(null);
  const [firstPageData, setFirstPageData] = useState([]);
  const [secondPageData, setSecondPageData] = useState([]);
  const firstPageRef = useRef(null);
  const [splitContents, setSplitContent] = useState({ first: "", second: "" });

  useEffect(() => {
    const splitContent = () => {
      const firstPage = firstPageRef.current;
      const firstPageHeight = 432;

      // Create a temporary element to measure content height
      const tempDiv = document.createElement("div");
      // tempDiv.style.position = "absolute";
      // tempDiv.style.visibility = "hidden";
      tempDiv.style.width = firstPage?.clientWidth + "px";
      tempDiv.innerHTML = data.paragraph[0].description;
      document.body.appendChild(tempDiv);

      let splitIndex = data.paragraph[0].description.length;
      let firstHalf = "";
      let secondHalf = data.paragraph[0].description;

      while (splitIndex > 0) {
        firstHalf = data.paragraph[0].description.substring(0, splitIndex);
        secondHalf = data.paragraph[0].description.substring(splitIndex);

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
  }, []);
  return (
    <>
      <div className="flex flex-col gap-[24px] w-[700px]">
        <div className="w-[595px] h-[800px] p-[32px] gap-[16px] flex flex-col border-[0.5px] ">
          <div className="flex flex-row justify-between w-full gap-[20px]">
            <div className="flex flex-col gap-[12px] w-[30%]">
              <div className="gap-[8px] flex flex-row w-full ">
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

                <span className="text-[10px] font-[400] text-[#414042]">
                  {data?.mobileNo}
                </span>
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

                  <span className="text-[10px] font-[400] text-[#414042] ">
                    {data?.email}
                  </span>
                </div>
              </div>
              <div>
                <div className="gap-[8px] flex flex-row ">
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

                  <span className="text-[10px] font-[400] text-[#414042]">
                    {data?.address}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[70%]">
              <span className=" text-[38px] font-[400] text-[#000000] font-Inter">
                {data?.name}
              </span>
              <span className=" text-[16px] font-[400] text-[#000000] font-Inter">
                {data?.designation}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#000000]"></div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%]">
              <span className=" text-[12px] font-[400] text-[#000000] font-Inter ">
                To,
              </span>
              <span className=" text-[12px] font-[400] text-[#000000] font-Inter ">
                {data?.toAddress?.name}
              </span>
              <span className="  text-[12px] font-[400] text-[#000000] font-Inter ">
                {data?.toAddress?.designation}
              </span>
              <span className=" text-[12px] font-[400] text-[#000000] font-Inter ">
                {data?.toAddress?.company}
              </span>
              <span className=" text-[12px] font-[400] text-[#000000] font-Inter ">
                {data?.toAddress?.address}
              </span>
            </div>
            <div className="flex flex-col gap-[16px] w-[30%]">
              <span className="text-[12px] font-[500] text-[#414042] ">
                Date :
                <span className="text-[#333333]"> {data?.toAddress?.date}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between gap-[8px] items">
            <span className=" text-[10px] font-[400] text-[#333333] font-Inter ">
              Dear {data?.recieverName},
            </span>
          </div>

          <div className="flex flex-col justify-start w-full gap-[8px]">
            <div className="text-[10px] font-[400] text-[#333333] font-Inter">
              {splitContents?.first}
            </div>
          </div>
        </div>
        <div className=" h-[842px] p-[24px] w-[595px] flex flex-col bg-[#fff] overflow-hidden border-[0.5px]">
          <div className="flex h-full">
            {splitContents && (
              <div className="flex flex-col justify-start w-full gap-[8px]">
                <div className="text-[10px] font-[400] text-[#333333] font-Inter">
                  {splitContents?.second}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CoverLetter6;
