import React from "react";
import PersonalDetails from "./StandardFormat/PersonalDetails";
import EmployerDetails from "./StandardFormat/EmployerDetails";
import JobDetails from "./StandardFormat/JobDetails";
import CustomLetterBody from "./CoustomFormat/CustomLetterBody";
import EducationDetails from "./StandardFormat/EducationDetails";
import ProjectInternship from "./StandardFormat/ProjectInternship";

const CoustomForm = ({
  contentSituation,
  data,
  setData,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
  isFormat,
}) => {
  return (
    <>
      {contentSituation === "Experienced" && (
        <>
          <PersonalDetails
            data={data}
            setData={setData}
            contentSituation={contentSituation}
            setSelectedFont={setSelectedFont}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedResumeIndex={selectedResumeIndex}
            setSelectedResumeIndex={setSelectedResumeIndex}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <JobDetails data={data} setData={setData} isFormat={isFormat} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EmployerDetails data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <CustomLetterBody data={data} setData={setData} />
        </>
      )}
      {contentSituation === "Fresher" && (
        <>
          <PersonalDetails
            data={data}
            setData={setData}
            contentSituation={contentSituation}
            setSelectedFont={setSelectedFont}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedResumeIndex={selectedResumeIndex}
            setSelectedResumeIndex={setSelectedResumeIndex}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EmployerDetails data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EducationDetails data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <ProjectInternship data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <CustomLetterBody data={data} setData={setData} />
        </>
      )}
    </>
  );
};

export default CoustomForm;
