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

      I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.

      With over [number] years of experience in product design, I have honed my skills in user research, wireframing, prototyping, and visual design. My proficiency in tools such as Sketch, Figma, Adobe XD, and InVision, combined with my ability to collaborate effectively with cross-functional teams, has allowed me to successfully deliver intuitive and engaging user experiences.

      In my previous role at [Your Previous Company], I led the redesign of the company’s flagship product, resulting in a 20% increase in user engagement and a 15% improvement in customer satisfaction. I achieved this by conducting comprehensive user research, developing user personas, and iterating on designs based on user feedback and usability testing. My approach ensures that design solutions are not only visually appealing but also address real user needs.

      What excites me most about [Company Name] is your commitment to innovation and user-centered design. I am particularly impressed with [specific project or product of the company], and I am eager to bring my expertise to your team to help drive similar successes. I am confident that my background in creating compelling user experiences aligns with the goals of your design team.

      I am also adept at maintaining a balance between user needs and business objectives, ensuring that the final product not only delights users but also supports the company’s strategic goals. My excellent communication skills and collaborative approach have consistently been assets in my professional journey, enabling me to work seamlessly with developers, product managers, and stakeholders.

      I am thrilled about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.

      I look forward to the opportunity to discuss how my background, skills, and passions align with the needs of your team.


       I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.

      With over [number] years of experience in product design, I have honed my skills in user research, wireframing, prototyping, and visual design. My proficiency in tools such as Sketch, Figma, Adobe XD, and InVision, combined with my ability to collaborate effectively with cross-functional teams, has allowed me to successfully deliver intuitive and engaging user experiences.

      In my previous role at [Your Previous Company], I led the redesign of the company’s flagship product, resulting in a 20% increase in user engagement and a 15% improvement in customer satisfaction. I achieved this by conducting comprehensive user research, developing user personas, and iterating on designs based on user feedback and usability testing. My approach ensures that design solutions are not only visually appealing but also address real user needs.

      What excites me most about [Company Name] is your commitment to innovation and user-centered design. I am particularly impressed with [specific project or product of the company], and I am eager to bring my expertise to your team to help drive similar successes. I am confident that my background in creating compelling user experiences aligns with the goals of your design team.

      I am also adept at maintaining a balance between user needs and business objectives, ensuring that the final product not only delights users but also supports the company’s strategic goals. My excellent communication skills and collaborative approach have consistently been assets in my professional journey, enabling me to work seamlessly with developers, product managers, and stakeholders.

      I am thrilled about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.


       I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.

      With over [number] years of experience in product design, I have honed my skills in user research, wireframing, prototyping, and visual design. My proficiency in tools such as Sketch, Figma, Adobe XD, and InVision, combined with my ability to collaborate effectively with cross-functional teams, has allowed me to successfully deliver intuitive and engaging user experiences.

      In my previous role at [Your Previous Company], I led the redesign of the company’s flagship product, resulting in a 20% increase in user engagement and a 15% improvement in customer satisfaction. I achieved this by conducting comprehensive user research, developing user personas, and iterating on designs based on user feedback and usability testing. My approach ensures that design solutions are not only visually appealing but also address real user needs.

      What excites me most about [Company Name] is your commitment to innovation and user-centered design. I am particularly impressed with [specific project or product of the company], and I am eager to bring my expertise to your team to help drive similar successes. I am confident that my background in creating compelling user experiences aligns with the goals of your design team.

      I am also adept at maintaining a balance between user needs and business objectives, ensuring that the final product not only delights users but also supports the company’s strategic goals. My excellent communication skills and collaborative approach have consistently been assets in my professional journey, enabling me to work seamlessly with developers, product managers, and stakeholders.

      I am thrilled about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.

      
       I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.

      With over [number] years of experience in product design, I have honed my skills in user research, wireframing, prototyping, and visual design. My proficiency in tools such as Sketch, Figma, Adobe XD, and InVision, combined with my ability to collaborate effectively with cross-functional teams, has allowed me to successfully deliver intuitive and engaging user experiences.

      In my previous role at [Your Previous Company], I led the redesign of the company’s flagship product, resulting in a 20% increase in user engagement and a 15% improvement in customer satisfaction. I achieved this by conducting comprehensive user research, developing user personas, and iterating on designs based on user feedback and usability testing. My approach ensures that design solutions are not only visually appealing but also address real user needs.

      What excites me most about [Company Name] is your commitment to innovation and user-centered design. I am particularly impressed with [specific project or product of the company], and I am eager to bring my expertise to your team to help drive similar successes. I am confident that my background in creating compelling user experiences aligns with the goals of your design team.

      I am also adept at maintaining a balance between user needs and business objectives, ensuring that the final product not only delights users but also supports the company’s strategic goals. My excellent communication skills and collaborative approach have consistently been assets in my professional journey, enabling me to work seamlessly with developers, product managers, and stakeholders.

      I am thrilled about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.


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

      <div className="flex flex-col w-[595px] gap-6">
        <div className="flex flex-col w-full h-[153px] pt-[26px] pr-[36px] pb-[14px] pl-[36px] bg-[#F9F9F9] gap-[24px]">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-[26px] text-[#333333]">{data.name}</h1>
              <p className="text-[16px] text-[#0E6CC2]">{data.title}</p>
            </div>

            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-col ">
                <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left">
                  Email
                </h6>
                <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left">
                  {data.email}
                </p>
              </div>
              <div className="flex flex-col ">
                <h6 className="text-[10px] text-[#949494] font-poppins font-medium leading-[13.48px] text-left">
                  Phone
                </h6>
                <p className="text-[10px] text-[#333333] font-poppins font-medium leading-[13.48px] text-left">
                  {data.phone}
                </p>
              </div>
              <div className="flex flex-col ">
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
            <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[335px] text-left">
              <p>{splitContents.first}</p>
            </div>
            <div className="flex flex-col w-[164px]">
              <div className="flex flex-col ">
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
              <div className="font-lato text-[10px] font-normal leading-[12px] text-[#6D6E71] w-[335px] text-left">
                <p>{splitContents.second}</p>
              </div>
              <div className="flex flex-col w-[164px]">
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
