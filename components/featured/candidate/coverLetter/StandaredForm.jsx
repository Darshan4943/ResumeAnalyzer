import React from "react";
import PersonalDetails from "./StandardFormat/PersonalDetails";
import EmployerDetails from "./StandardFormat/EmployerDetails";
import JobDetails from "./StandardFormat/JobDetails";
import ProjectInternship from "./StandardFormat/ProjectInternship";
import EducationDetails from "./StandardFormat/EducationDetails";
import CustomLetterBody from "./CoustomFormat/customLetterBody";

export const StandaredForm = ({
  contentSituation,
  data,
  setData,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
  isError,
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
            errors={isError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EmployerDetails data={data} setData={setData}  errors={isError} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <JobDetails data={data} setData={setData} errors={isError} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <ProjectInternship data={data} setData={setData} errors={isError} />
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
          <div className="w-full h-[0px]  border-t  border-[#DEDEDE] "></div>
          <EmployerDetails data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EducationDetails data={data} setData={setData} />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <ProjectInternship data={data} setData={setData} />
        </>
      )}
    </>
  );
};
