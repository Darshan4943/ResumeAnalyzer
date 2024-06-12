import React, { useState } from "react";
import CoverForm from "../../components/featured/candidate/coverLetter/coverForm";

function Index() {
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedResumeIndex, setSelectedResumeIndex] = useState();

  const defaultState = {
    showSkills: true,
    showAchievements: true,
    showCourses: true,
    showExtraCariculam: true,
    showHobbies: true,
    showInternship: true,
    showLanguage: true,
    showLinks: true,
    showCustomSection: true,
    showProject: true,
    showReference: true,
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
    achievements: [],
    socialLinks: [],
    hobbies: [],
    languages: [],
    section: [],
    selectedResumeIndex: selectedResumeIndex ? selectedResumeIndex : 1,
    reference: [],
    project: [],
    internship: [],
    extraCaricularData: [],
    createdAt: "",
    customDataSection: [],
    // clientId: clientId,
  };

  const [data, setData] = useState(defaultState);

  return (
    <div className="flex gap-4 py-6 customMargins">
      <div className="w-[41%] min-w-[508px]">
        <CoverForm
          selectedResumeIndex={selectedResumeIndex}
          setSelectedResumeIndex={setSelectedResumeIndex}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
}

export default Index;
