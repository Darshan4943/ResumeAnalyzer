import React, { useState } from "react";
import { LeftArow } from "../../utils/svg";
import ResumeForm from "../../components/featured/candidate/createResume/resume_form";
import ResumePreview from "../../components/featured/candidate/createResume/resume_preview";

function CreateResume() {
  const [data, setData] = useState({
    profilePhoto: null,
    designation: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    location: "",
    summary: "",
    showSummary: true,
    education: [],
    showEducation: true,
    experience: [],
    showExperience: true,
    course: [],
    showCourse: true,
    skills: [],
    achievement: [],
    sociaLinks: [],
    hobbies: [],
    languages: [],
  });

  return (
    <div>
      <div className=" bg-[#F9F9F9] pt-2">
        <div className="flex flex-col gap-4 py-6 customMargins">
          <div
            className="flex gap-6 bg-white p-4 rounded-lg items-center"
            style={{
              boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <LeftArow />
            <div className="flex flex-col gap-1">
              <p className="text-[24px] font-medium">Resume Builder</p>
              <p className="text-[14px] font-normal">
                Quickly create your own resume. Creating resume here won’t
                change your Skilotech profile.
              </p>
            </div>
          </div>
          <div className=" h-fit flex gap-6">
            <ResumeForm data={data} setData={setData} />
            <ResumePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
