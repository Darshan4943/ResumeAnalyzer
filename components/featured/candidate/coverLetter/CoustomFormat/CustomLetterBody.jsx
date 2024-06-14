import React, { useState, useEffect } from "react";
// import RichTextEditor from "react-rte";
import Tiptap from "../../../../editor/Tiptap";
import CustomTextEditor from "./CustomTextEditor";

const CustomLetterBody = ({ data, setData }) => {
  const [text, setText] = useState("");
  const [paragraph, setParagraph] = useState(`
 Dear [Hiring Manager’s Name],

      I am writing to express my interest in the Product Designer (UI/UX) position at [Company Name], as advertised on [where you found the job posting]. With a strong background in UI/UX design and a passion for creating user-centric products, I am excited about the opportunity to contribute to your innovative team.

      With over [number] years of experience in product design, I have honed my skills in user research, wireframing, prototyping, and visual design. My proficiency in tools such as Sketch, Figma, Adobe XD, and InVision, combined with my ability to collaborate effectively with cross-functional teams, has allowed me to successfully deliver intuitive and engaging user experiences.

      In my previous role at [Your Previous Company], I led the redesign of the company’s flagship product, resulting in a 20% increase in user engagement and a 15% improvement in customer satisfaction. I achieved this by conducting comprehensive user research, developing user personas, and iterating on designs based on user feedback and usability testing. My approach ensures that design solutions are not only visually appealing but also address real user needs.

      What excites me most about [Company Name] is your commitment to innovation and user-centered design. I am particularly impressed with [specific project or product of the company], and I am eager to bring my expertise to your team to help drive similar successes. I am confident that my background in creating compelling user experiences aligns with the goals of your design team.

      I am also adept at maintaining a balance between user needs and business objectives, ensuring that the final product not only delights users but also supports the company’s strategic goals. My excellent communication skills and collaborative approach have consistently been assets in my professional journey, enabling me to work seamlessly with developers, product managers, and stakeholders.

      I am thrilled about the possibility of contributing to [Company Name] and am eager to bring my creative problem-solving skills and design expertise to your team. Thank you for considering my application.

      I look forward to the opportunity to discuss how my background, skills, and passions align with the needs of your team.

    `);

  useEffect(() => {
    if (data && data.description.length > 0) {
      const {
        letterDate,
        firstName,
        lastName,
        employerOrganizationName,
        employerAddress,
        employerCityState,
        employerCountry,
        passages,
        dial_code,
        mobileNumber,
        email,
        address,
        employerName,
      } = data;

      const textEditorData = `
      ${letterDate || ""}
      ${firstName || ""} ${lastName || ""}
      ${employerOrganizationName || ""}
      ${employerAddress || ""},
      ${employerCityState || ""}, ${employerCountry || ""}
      


      ${description || ""}


      
      ${firstName || ""} ${lastName || ""}
      ${dial_code || ""} ${mobileNumber || ""}
      ${email || ""}
      ${address || ""}
          `;

      if (textEditorData) {
        setText(textEditorData);
      }
      setData({ ...data, passages: text });
    }
  }, []);

  return (
    <div className="flex flex-col gap-[16px] w-full bg-white py-4">
      <div>
        <span className="font-montserrat text-[18px] font-[600] leading-[21.94px] text-left text-[#333333]">
          Letter Body
        </span>
      </div>

      <CustomTextEditor
        data={data}
        value={"Para"}
        setData={setData}
        placeholder={
          "Explain why you are the ideal candidate for a particular job"
        }
        text={text}
        setText={setText}
      />
    </div>
  );
};

export default CustomLetterBody;
