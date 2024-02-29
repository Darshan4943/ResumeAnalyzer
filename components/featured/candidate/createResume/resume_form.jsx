import React, { useEffect, useState } from "react";
import ResumeList from "./components/my_resume";
import PersonalDetails from "./components/personal_details";
import AboutMe from "./components/about_me";
import Education from "./components/education";
import Experience from "./components/experience";
import Course from "./components/course";
import Skills from "./components/skills";
import Achievement from "./components/achivement";
import SocialLink from "./components/social_link";
import Hobbie from "./components/hobbie";
import Languages from "./components/languages";
import ThemeForm from "./components/themeForm";
import { templates } from "../../../../utils/data";

const ResumeForm = ({
  setData,
  data,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
}) => {
  const [formField, setFormField] = useState([]);

  useEffect(() => {
    setFormField(
      templates.find((item) => item.index == selectedResumeIndex)?.formFields
    );
  }, [selectedResumeIndex]);

  return (
    <>
      <div className="flex flex-col ml:w-[40%] w-[100%]  pb-4 gap-4 rounded-lg overflow-y-auto ">
        <ResumeList setData={setData} data={data} />
        <ThemeForm
          selectedResumeIndex={selectedResumeIndex}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
        />
        <PersonalDetails setData={setData} data={data} />
        <AboutMe setData={setData} data={data} />
        <Education setData={setData} data={data} />
        <Experience setData={setData} data={data} />
        
        {formField?.includes("course") && (
              <Course setData={setData} data={data} />
        )}
        <Skills setData={setData} data={data} />
        {/* <Achievement setData={setData} data={data} /> */}
    
        {formField?.includes("socialLinks") && (
              <SocialLink setData={setData} data={data} />
        )}
        {formField?.includes("hobbies") && (
          <Hobbie setData={setData} data={data} />
        )}
        {formField?.includes("language") && (
          <Languages setData={setData} data={data} />
        )}
      </div>
    </>
  );
};

export default ResumeForm;
