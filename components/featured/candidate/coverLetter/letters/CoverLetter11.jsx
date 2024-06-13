import React, { useCallback, useEffect, useRef, useState } from "react";


function CoverLetter11({ page1Ref,page2Ref }) {
  const data = {
    name: "Felicia Wilson",
    designation: "Web Developer",
    mobileNo: "(310) 555 - 9572",
    email: "hello@feliciawilson.com",
    address: "Pune, Maharashtra,India Pune, Maharashtra, India",
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
                satisfaction. I achieved this by conducting comprehensive user
                research, developing user personas, and iterating on designs
                based on user feedback and usability testing. My approach
                ensures that design solutions are not only visually appealing
                but also address real user needs. What excites me most about
                [Company Name] is your commitment to innovation and
                user-centered design. I am particularly impressed with [specific
                project or product of the company], and I am eager to bring my
                expertise to your team to help drive similar successes. I am
                confident that my background in creating compelling user
                experiences aligns with the goals of your design team.
                 satisfaction. I achieved this by conducting comprehensive user
                research, developing user personas, and iterating on designs
                based on user feedback and usability testing. My approach
                ensures that design solutions are not only visually appealing
                but also address real user needs. What excites me most about
                [Company Name] is your commitment to innovation and
                user-centered design. I am particularly impressed with [specific
                project or product of the company], and I am eager to bring my
                expertise to your team to help drive similar successes. I am
                confident that my background in creating compelling user
                experiences aligns with the goals of your design team.
                 satisfaction. I achieved this by conducting comprehensive user
                research, developing user personas, and iterating on designs
                based on user feedback and usability testing. My approach
                ensures that design solutions are not only visually appealing
                but also address real user needs. What excites me most about
                [Company Name] is your commitment to innovation and
                user-centered design. I am particularly impressed with [specific
                project or product of the company], and I am eager to bring my
                expertise to your team to help drive similar successes. I am
                confident that my background in creating compelling user
                experiences aligns with the goals of your design team.
                 satisfaction. I achieved this by conducting comprehensive user
                research, developing user personas, and iterating on designs
                based on user feedback and usability testing. My approach
                ensures that design solutions are not only visually appealing
                but also address real user needs. What excites me most about
                [Company Name] is your commitment to innovation and
                user-centered design. I am particularly impressed with [specific
                project or product of the company], and I am eager to bring my
                expertise to your team to help drive similar successes. I am
                confident that my background in creating compelling user
                experiences aligns with the goals of your design team.
                 satisfaction. I achieved this by conducting comprehensive user
                research, developing user personas, and iterating on designs
                based on user feedback and usability testing. My approach
                ensures that design solutions are not only visually appealing
                but also address real user needs. What excites me most about
                [Company Name] is your commitment to innovation and
                user-centered design. I am particularly impressed with [specific
                project or product of the company], and I am eager to bring my
                expertise to your team to help drive similar successes. I am
                confident that my background in creating compelling user
                experiences aligns with the goals of your design team.
               
               
               
              `,
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


  // useEffect(() => {
  //   splitContent();
  // }, [data]);

  // const splitContent = () => {
  //   const firstPage = firstPageRef.current;
  //   const firstPageHeight = 350; // Set the fixed height you want for the paragraph div

  //   // Create a temporary element to measure content height
  //   const tempDiv = document.createElement("div");
  //   // tempDiv.style.position = "absolute";
  //   // tempDiv.style.visibility = "hidden";
  //   tempDiv.style.width = firstPage?.clientWidth + "px";
  //   tempDiv.style.fontSize = "12px";
  //   tempDiv.innerHTML = data.paragraph[0].description;
  //   document.body.appendChild(tempDiv);

  //   let splitIndex = data.paragraph[0].description.length;
  //   let firstHalf = "";
  //   let secondHalf = data.paragraph[0].description;

  //   while (splitIndex > 0) {
  //     firstHalf = data.paragraph[0].description.substring(0, splitIndex);
  //     secondHalf = data.paragraph[0].description.substring(splitIndex);

  //     tempDiv.innerHTML = firstHalf;

  //     if (tempDiv.clientHeight <= firstPageHeight) {
  //       break;
  //     }

  //     splitIndex--;
  //   }

  //   document.body.removeChild(tempDiv);
  //   setSplitContent({ first: firstHalf, second: secondHalf });
  // };

  const splitContent = useCallback(() => {
    const firstPage = firstPageRef.current;
    const firstPageHeight = 350; // Set the fixed height you want for the paragraph div

    // Create a temporary element to measure content height
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
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

    const lastFullStop = firstHalf.lastIndexOf(".");
    if (lastFullStop !== -1 && lastFullStop < firstHalf.length - 1) {
      splitIndex = lastFullStop + 1;
      firstHalf = data.paragraph[0].description.substring(0, splitIndex);
      secondHalf = data.paragraph[0].description.substring(splitIndex);
    }

    document.body.removeChild(tempDiv);
    setSplitContent({ first: firstHalf.trim(), second: secondHalf.trim() });
  }, []);

  useEffect(() => {
    splitContent();
  }, [data?.paragraph[0]?.description]);



  return (
    <>
      
      {/* <div className=" bg-[#FFFFFF] w-[800px] h-[842px] p-[32px] gap-[16px] flex flex-col absolute left-[4000px]">
        <div
          className="flex flex-row justify-between w-full"
          ref={firstContainer}
        >
          <div className="flex flex-col w-[70%]">
            <span className=" text-[42.51px] font-[400] text-[#414042]">
              {data?.name}
            </span>
            <span className=" text-[14px] font-[400] text-[#414042]">
              {data?.designation}
            </span>
          </div>

          <div className="flex flex-col gap-[16px] w-[30%]">
            <div className="gap-[8px] flex flex-row w-full ">
              <svg
                className="min-h-[22px] min-w-[22px]"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="22"
                  height="22"
                  transform="translate(0 0.263184)"
                  fill="#414042"
                />
                <path
                  d="M17.0236 14.8178C17.0487 15.0164 16.9895 15.1909 16.8441 15.3383L15.1461 17.0574C15.0689 17.1427 14.9696 17.2179 14.8472 17.2791C14.7228 17.3393 14.6015 17.3794 14.4811 17.3974C14.4721 17.3974 14.447 17.3994 14.4039 17.4034C14.3618 17.4074 14.3056 17.4105 14.2384 17.4105C14.0769 17.4105 13.8161 17.3824 13.4551 17.3262C13.093 17.27 12.6497 17.1306 12.1262 16.909C11.6036 16.6873 11.0099 16.3553 10.3459 15.913C9.68194 15.4707 8.97485 14.8629 8.22664 14.0907C7.63188 13.4929 7.13641 12.9202 6.74526 12.3726C6.35511 11.826 6.03917 11.3195 5.80147 10.8551C5.56377 10.3917 5.38424 9.96947 5.26488 9.59336C5.14553 9.21524 5.0663 8.89029 5.02317 8.61548C4.98004 8.34267 4.96199 8.12703 4.97102 7.97057C4.98004 7.81511 4.98305 7.72786 4.98305 7.7098C5.00111 7.58844 5.03922 7.46508 5.09839 7.33971C5.15857 7.21434 5.23079 7.11203 5.31604 7.03379L7.01305 5.30268C7.1324 5.18132 7.2688 5.11914 7.42326 5.11914C7.53359 5.11914 7.63087 5.15124 7.71613 5.21643C7.80037 5.28062 7.87259 5.36186 7.93277 5.45814L9.2988 8.10096C9.37402 8.24037 9.39509 8.39082 9.36199 8.55731C9.32789 8.72179 9.25567 8.86119 9.14435 8.97252L8.5205 9.61041C8.50245 9.62846 8.48841 9.65554 8.47637 9.69466C8.46333 9.73377 8.45631 9.76688 8.45631 9.79295C8.49041 9.97549 8.56764 10.1831 8.687 10.4178C8.7883 10.6254 8.94576 10.8792 9.15839 11.1791C9.37202 11.4789 9.67391 11.824 10.0651 12.2141C10.4482 12.6133 10.7892 12.9232 11.0871 13.1459C11.385 13.3675 11.6337 13.53 11.8343 13.6333C12.0329 13.7376 12.1863 13.7998 12.2926 13.8219L12.4531 13.8539C12.4702 13.8539 12.4983 13.8479 12.5364 13.8349C12.5745 13.8219 12.6016 13.8068 12.6186 13.7878L13.3458 13.0335C13.5002 12.8931 13.6777 12.8249 13.8844 12.8249C14.0278 12.8249 14.1431 12.852 14.2284 12.9042H14.2404L16.7057 14.3885C16.8832 14.5009 16.9885 14.6443 17.0236 14.8178Z"
                  fill="white"
                />
              </svg>

              <span className="text-[10px] font-[400] text-[#414042]">
                {data?.mobileNo}
              </span>
            </div>
            <div>
              <div className="gap-[8px] flex flex-row ">
                <svg
                  className="min-h-[22px] min-w-[22px]"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 0.263184H0V22.2632H22V0.263184Z"
                    fill="#414042"
                  />
                  <path
                    d="M17.3633 14.4432C17.3633 14.7221 17.285 14.9808 17.1587 15.2085L13.1408 10.7132L17.1145 7.23594C17.269 7.48166 17.3623 7.76949 17.3623 8.08041L17.3633 14.4432ZM11.0005 11.5296L16.5298 6.69133C16.3031 6.56696 16.0474 6.49072 15.7716 6.49072H6.22837C5.95255 6.49072 5.6968 6.56696 5.47113 6.69133L11.0005 11.5296ZM12.542 11.2367L11.2622 12.3581C11.187 12.4233 11.0937 12.4553 11.0005 12.4553C10.9072 12.4553 10.8139 12.4222 10.7387 12.3571L9.45891 11.2367L5.39089 15.7892C5.63461 15.9426 5.92046 16.0339 6.22937 16.0339H15.7726C16.0815 16.0339 16.3673 15.9426 16.611 15.7892L12.542 11.2367ZM4.8864 7.23695C4.73195 7.48267 4.63867 7.7705 4.63867 8.08142V14.4432C4.63867 14.7221 4.7169 14.9808 4.84328 15.2085L8.86014 10.7122L4.8864 7.23695Z"
                    fill="white"
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
                  className="min-h-[22px] min-w-[22px]"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="22"
                    height="22"
                    transform="translate(0 0.263184)"
                    fill="#414042"
                  />
                  <path
                    d="M10.7697 3.75684C8.13939 3.75684 6 6.02116 6 8.80407C6 9.92512 6.6762 11.7528 8.06776 14.3921C9.0515 16.2582 10.02 17.8149 10.0601 17.8796L10.7687 19.0168L11.4774 17.8796C11.5185 17.8149 12.486 16.2582 13.4697 14.3921C14.8613 11.7538 15.5375 9.92614 15.5375 8.80509C15.5394 6.02116 13.4 3.75684 10.7697 3.75684ZM10.7697 11.3878C9.40393 11.3878 8.29794 10.2163 8.29794 8.77072C8.29794 7.32518 9.40488 6.1536 10.7697 6.1536C12.1345 6.1536 13.2424 7.32518 13.2424 8.77072C13.2424 10.2152 12.1355 11.3878 10.7697 11.3878Z"
                    fill="white"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042]">
                  {data?.address}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full h-[1px] border-[1px] border-[#414042]"
          ref={secondContainer}
        ></div>
        <div
          className="flex flex-row justify-between w-full"
          ref={thirdContainer}
        >
          <div className="flex flex-col w-[70%]">
            <span className=" text-[12px] font-[400] text-[#414042]">To,</span>
            <br></br>

            <span className=" text-[12px] font-[400] text-[#414042]">
              {data?.toAddress?.name}
            </span>
            <span className=" text-[12px] font-[400] text-[#414042]">
              {data?.toAddress?.designation}
            </span>
            <span className=" text-[12px] font-[400] text-[#414042]">
              {data?.toAddress?.company}
            </span>
            <span className=" text-[12px] font-[400] text-[#414042]">
              {data?.toAddress?.address}
            </span>
          </div>

          <div className="flex flex-col gap-[16px] w-[30%]">
            <span className="text-[12px] font-[400] text-[#414042]">
              Date :- {data?.toAddress?.date}
            </span>
          </div>
        </div>
        <div
          className="w-full h-[1px] border-[1px] border-[#414042]"
          ref={fourthContainer}
        ></div>
        <div className="flex flex-col justify-start w-full gap-[8px]">
          <span className="text-[12px] font-[400] text-[#6D6E71]">
            Dear {data?.recieverName},
          </span>
          <div
            className="text-[12px] font-[400] text-[#6D6E71] "
            ref={fifthContainer}
          ></div>
        </div>
      </div> */}
      <div className="flex flex-col gap-[24px] border-2 ">
        <div
          ref={page1Ref}
          className=" bg-[#FFFFFF]  w-[800px] h-[842px] p-[32px] gap-[16px] flex flex-col   "
        >
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%]">
              <span className=" text-[42.51px] font-[400] text-[#414042]">
                {data?.name}
              </span>
              <span className=" text-[14px] font-[400] text-[#414042]">
                {data?.designation}
              </span>
            </div>

            <div className="flex flex-col gap-[16px] w-[30%]">
              <div className="gap-[8px] flex flex-row w-full ">
                <svg
                  className="min-h-[22px] min-w-[22px]"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="22"
                    height="22"
                    transform="translate(0 0.263184)"
                    fill="#414042"
                  />
                  <path
                    d="M17.0236 14.8178C17.0487 15.0164 16.9895 15.1909 16.8441 15.3383L15.1461 17.0574C15.0689 17.1427 14.9696 17.2179 14.8472 17.2791C14.7228 17.3393 14.6015 17.3794 14.4811 17.3974C14.4721 17.3974 14.447 17.3994 14.4039 17.4034C14.3618 17.4074 14.3056 17.4105 14.2384 17.4105C14.0769 17.4105 13.8161 17.3824 13.4551 17.3262C13.093 17.27 12.6497 17.1306 12.1262 16.909C11.6036 16.6873 11.0099 16.3553 10.3459 15.913C9.68194 15.4707 8.97485 14.8629 8.22664 14.0907C7.63188 13.4929 7.13641 12.9202 6.74526 12.3726C6.35511 11.826 6.03917 11.3195 5.80147 10.8551C5.56377 10.3917 5.38424 9.96947 5.26488 9.59336C5.14553 9.21524 5.0663 8.89029 5.02317 8.61548C4.98004 8.34267 4.96199 8.12703 4.97102 7.97057C4.98004 7.81511 4.98305 7.72786 4.98305 7.7098C5.00111 7.58844 5.03922 7.46508 5.09839 7.33971C5.15857 7.21434 5.23079 7.11203 5.31604 7.03379L7.01305 5.30268C7.1324 5.18132 7.2688 5.11914 7.42326 5.11914C7.53359 5.11914 7.63087 5.15124 7.71613 5.21643C7.80037 5.28062 7.87259 5.36186 7.93277 5.45814L9.2988 8.10096C9.37402 8.24037 9.39509 8.39082 9.36199 8.55731C9.32789 8.72179 9.25567 8.86119 9.14435 8.97252L8.5205 9.61041C8.50245 9.62846 8.48841 9.65554 8.47637 9.69466C8.46333 9.73377 8.45631 9.76688 8.45631 9.79295C8.49041 9.97549 8.56764 10.1831 8.687 10.4178C8.7883 10.6254 8.94576 10.8792 9.15839 11.1791C9.37202 11.4789 9.67391 11.824 10.0651 12.2141C10.4482 12.6133 10.7892 12.9232 11.0871 13.1459C11.385 13.3675 11.6337 13.53 11.8343 13.6333C12.0329 13.7376 12.1863 13.7998 12.2926 13.8219L12.4531 13.8539C12.4702 13.8539 12.4983 13.8479 12.5364 13.8349C12.5745 13.8219 12.6016 13.8068 12.6186 13.7878L13.3458 13.0335C13.5002 12.8931 13.6777 12.8249 13.8844 12.8249C14.0278 12.8249 14.1431 12.852 14.2284 12.9042H14.2404L16.7057 14.3885C16.8832 14.5009 16.9885 14.6443 17.0236 14.8178Z"
                    fill="white"
                  />
                </svg>

                <span className="text-[10px] font-[400] text-[#414042]">
                  {data?.mobileNo}
                </span>
              </div>
              <div>
                <div className="gap-[8px] flex flex-row ">
                  <svg
                    className="min-h-[22px] min-w-[22px]"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 0.263184H0V22.2632H22V0.263184Z"
                      fill="#414042"
                    />
                    <path
                      d="M17.3633 14.4432C17.3633 14.7221 17.285 14.9808 17.1587 15.2085L13.1408 10.7132L17.1145 7.23594C17.269 7.48166 17.3623 7.76949 17.3623 8.08041L17.3633 14.4432ZM11.0005 11.5296L16.5298 6.69133C16.3031 6.56696 16.0474 6.49072 15.7716 6.49072H6.22837C5.95255 6.49072 5.6968 6.56696 5.47113 6.69133L11.0005 11.5296ZM12.542 11.2367L11.2622 12.3581C11.187 12.4233 11.0937 12.4553 11.0005 12.4553C10.9072 12.4553 10.8139 12.4222 10.7387 12.3571L9.45891 11.2367L5.39089 15.7892C5.63461 15.9426 5.92046 16.0339 6.22937 16.0339H15.7726C16.0815 16.0339 16.3673 15.9426 16.611 15.7892L12.542 11.2367ZM4.8864 7.23695C4.73195 7.48267 4.63867 7.7705 4.63867 8.08142V14.4432C4.63867 14.7221 4.7169 14.9808 4.84328 15.2085L8.86014 10.7122L4.8864 7.23695Z"
                      fill="white"
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
                    className="min-h-[22px] min-w-[22px]"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="22"
                      height="22"
                      transform="translate(0 0.263184)"
                      fill="#414042"
                    />
                    <path
                      d="M10.7697 3.75684C8.13939 3.75684 6 6.02116 6 8.80407C6 9.92512 6.6762 11.7528 8.06776 14.3921C9.0515 16.2582 10.02 17.8149 10.0601 17.8796L10.7687 19.0168L11.4774 17.8796C11.5185 17.8149 12.486 16.2582 13.4697 14.3921C14.8613 11.7538 15.5375 9.92614 15.5375 8.80509C15.5394 6.02116 13.4 3.75684 10.7697 3.75684ZM10.7697 11.3878C9.40393 11.3878 8.29794 10.2163 8.29794 8.77072C8.29794 7.32518 9.40488 6.1536 10.7697 6.1536C12.1345 6.1536 13.2424 7.32518 13.2424 8.77072C13.2424 10.2152 12.1355 11.3878 10.7697 11.3878Z"
                      fill="white"
                    />
                  </svg>

                  <span className="text-[10px] font-[400] text-[#414042]">
                    {data?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] border-[1px] border-[#414042]"></div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-[70%]">
              <span className=" text-[12px] font-[400] text-[#414042]">
                To,
              </span>
              <br></br>

              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.toAddress?.name}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.toAddress?.designation}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.toAddress?.company}
              </span>
              <span className=" text-[12px] font-[400] text-[#414042]">
                {data?.toAddress?.address}
              </span>
            </div>

            <div className="flex flex-col gap-[16px] w-[30%]">
              <span className="text-[12px] font-[400] text-[#414042]">
                Date :- {data?.toAddress?.date}
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] border-[1px] border-[#414042]"></div>
          <div className="flex flex-col justify-start w-full gap-[8px]">
            <span className="text-[12px] font-[400] text-[#6D6E71]">
              Dear {data?.recieverName},
            </span>
            <div className="text-[12px] font-[400] text-[#6D6E71] ">
              {splitContents?.first}
            </div>
          </div>
        </div>
        {/* {Object.values(splitContents?.second).length > 0 && ( */}
        <div
          ref={page2Ref}
          className=" h-[842px] p-[24px] w-[800px] flex  flex-col bg-[#fff]  "
        >
          <div className="flex h-full">
            <div className="flex flex-col justify-start w-full gap-[8px]">
              <div className="text-[12px] font-[400] text-[#6D6E71] ">
                {splitContents?.second}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default CoverLetter11;