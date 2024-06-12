import React, { useState, useEffect, useRef } from "react";

const CoverLetter8 = () => {
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
                    experiences aligns with the goals of your design team. I am also
                    adept at maintaining a balance between user needs and business
                    objectives, ensuring that the final product not only delights
                    users but also supports the company’s strategic goals. My
                    excellent communication skills and collaborative approach have
                    consistently been assets in my professional journey, enabling me
                    to work seamlessly with developers, product managers, and
                    stakeholders. I am thrilled about the possibility of
                    contributing to [Company Name] and am eager to bring my creative
                    problem-solving skills and design expertise to your team. Thank
                    you for considering my application. I look forward to the
                    opportunity to discuss how my background, skills, and passions
                    align with the needs of your team. Warm regards, [Your Name]With over [number] years of experience in product design, I have
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
                    experiences aligns with the goals of your design team. I am also
                    adept at maintaining a balance between user needs and business
                    objectives, ensuring that the final product not only delights
                    users but also supports the company’s strategic goals. My
                    excellent communication skills and collaborative approach have
                    consistently been assets in my professional journey, enabling me
                    to work seamlessly with developers, product managers, and
                    stakeholders. I am thrilled about the possibility of
                    contributing to [Company Name] and am eager to bring my creative
                    problem-solving skills and design expertise to your team. Thank
                    you for considering my application. I look forward to the
                    opportunity to discuss how my background, skills, and passions
                    align with the needs of your team. Warm regards, [Your Name]With over [number] years of experience in product design, I have
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
                    experiences aligns with the goals of your design team. I am also
                    adept at maintaining a balance between user needs and business
                    objectives, ensuring that the final product not only delights
                    users but also supports the company’s strategic goals. My
                    excellent communication skills and collaborative approach have
                    consistently been assets in my professional journey, enabling me
                    to work seamlessly with developers, product managers, and
                    stakeholders. I am thrilled about the possibility of
                    contributing to [Company Name] and am eager to bring my creative
                    problem-solving skills and design expertise to your team. Thank
                    you for considering my application. I look forward to the
                    opportunity to discuss how my background, skills, and passions
                    align with the needs of your team. Warm regards, [Your Name] but also address real user needs. What excites me most about
                    [Company Name] is your commitment to innovation and
                    user-centered design. I am particularly impressed with [specific
                    project or product of the company], and I am eager to bring my
                    expertise to your team to help drive similar successes. I am
                    confident that my background in creating compelling user
                    experiences aligns with the goals of your design team. I am also
                    adept at maintaining a balance between user needs and business
                    objectives, ensuring that the final product not only delights
                    users but also supports the company’s strategic goals. My
                    excellent communication skills and collaborative approach have
                    consistently been assets in my professional journey, enabling me
                    to work seamlessly with developers, product managers, and
                    stakeholders. I am thrilled about the possibility of
                    contributing to [Company Name] and am eager to bring my creative
                    problem-solving skills and design expertise to your team. Thank
                    you for considering my application. I look forward to the
                    opportunity to discuss how my background, skills, and passions
                    align with the needs of your team. Warm regards, [Your Name] but also address real user needs. What excites me most about
                    [Company Name] is your commitment to innovation and
                    user-centered design. I am particularly impressed with [specific
                    project or product of the company], and I am eager to bring my
                    expertise to your team to help drive similar successes. I am
                    confident that my background in creating compelling user
                    experiences aligns with the goals of your design team. I am also
                    adept at maintaining a balance between user needs and business
                    objectives, ensuring that the final product not only delights
                    users but also supports the company’s strategic goals. My
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

      document.body.removeChild(tempDiv);
      setSplitContent({ first: firstHalf, second: secondHalf });
    };

    splitContent();
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-[24px] ">
        <div className=" h-[24px] w-[595px] bg-[#2A2E31]"></div>
        <div className="w-[595px] h-[818px] px-[42px] pb-[65px] gap-[16px] flex flex-col ">
          <div className="flex flex-row justify-between gap-[21px] w-[511px]">
            <div className="flex flex-col gap-[6px] ">
              <div>
                <span className="font-Lato text-[14px] text-[#030203] font-[400] leading-[16.8px]">
                  CONTACT
                </span>
              </div>
              <div className="flex flex-col gap-[6px] w-[30%]">
                <div className="gap-[8px] flex flex-row w-full items-center">
                  <svg
                    className="min-w-[16px] min-h-[16px]"
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

                  <span className="font-Lato text-[10px] text-[#58595B] font-[400] leading-[12px]">
                    {data?.mobileNo}
                  </span>
                </div>
                <div>
                  <div className="gap-[8px] flex flex-row items-center">
                    <svg
                      className="min-w-[16px] min-h-[16px]"
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

                    <span className="font-Lato text-[10px] text-[#58595B] font-[400] leading-[12px]">
                      {data?.email}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="gap-[8px] flex flex-row ">
                    <svg
                      className="min-w-[16px] min-h-[16px]"
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

                    <span className="font-Lato text-[10px] text-[#58595B] font-[400] leading-[12px]">
                      {data?.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">hdfjhfdb</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverLetter8;
