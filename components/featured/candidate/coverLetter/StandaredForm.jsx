import React from "react";
import PersonalDetails from "./StandardFormat/PersonalDetails";
import EmployerDetails from "./StandardFormat/EmployerDetails";
import JobDetails from "./StandardFormat/JobDetails";
import ProjectInternship from "./StandardFormat/ProjectInternship";
import EducationDetails from "./StandardFormat/EducationDetails";

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
  setError,
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
            setError={setError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EmployerDetails
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <JobDetails
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <ProjectInternship
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
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
            errors={isError}
            setError={setError}
          />
          <div className="w-full h-[0px]  border-t  border-[#DEDEDE] "></div>
          <EmployerDetails
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <EducationDetails
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
          <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
          <ProjectInternship
            data={data}
            setData={setData}
            errors={isError}
            setError={setError}
          />
        </>
      )}
    </>
  );
};
