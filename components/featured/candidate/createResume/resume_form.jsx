import React from "react";
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

const ResumeForm = ({ setData, data,selectedResumeIndex ,setSelectedResumeIndex,selectedColor,setSelectedColor,setSelectedFont,selectedFont}) => {
  console.log(5,selectedColor)
  return (
    <>
      <div className="flex flex-col ml:w-[49%] w-[100%] px-2 pb-4 gap-4 rounded-lg overflow-y-auto ">
        <ResumeList setData={setData} data={data}  />
        <ThemeForm selectedResumeIndex={selectedResumeIndex} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setSelectedFont={setSelectedFont}  selectedFont={selectedFont}/>
        <PersonalDetails setData={setData} data={data} />
        <AboutMe setData={setData} data={data} />
        <Education setData={setData} data={data} />
        <Experience setData={setData} data={data} />
        <Course setData={setData} data={data} />
        <Skills setData={setData} data={data} />
        {/* <Achievement setData={setData} data={data} /> */}
        {/* <SocialLink setData={setData} data={data} /> */}
        <Hobbie setData={setData} data={data} />
        <Languages setData={setData} data={data} />
        
      </div>
      
    </>
  );
};

export default ResumeForm;
