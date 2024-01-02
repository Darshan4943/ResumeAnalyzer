import React, { useEffect, useRef, useState } from "react";
import DateSelector from "@/components/common/dateSelector";
import Resume5 from "@/components/featured/resumeTemplates/resume5";
import ResumeList from "../../components/featured/candidate/createResume/components/my_resume";
import PersonalDetails from "../../components/featured/candidate/createResume/components/personal_details";
import AboutMe from "../../components/featured/candidate/createResume/components/about_me";
import Education from "../../components/featured/candidate/createResume/components/education";
import Experience from "../../components/featured/candidate/createResume/components/experience";
import Course from "../../components/featured/candidate/createResume/components/course";
import Skills from "../../components/featured/candidate/createResume/components/skills";
import Achievement from "../../components/featured/candidate/createResume/components/achivement";
import SocialLink from "../../components/featured/candidate/createResume/components/social_link";
import Hobbie from "../../components/featured/candidate/createResume/components/hobbie";
import Languages from "../../components/featured/candidate/createResume/components/languages";
import { LeftArow } from "../../utils/svg";

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
    achievement:[]
  });

  const [experienceStartMonth, setExperienceStartMonth] = useState("Month");
  const [experienceStartYear, setExperienceStartYear] = useState("Year");
  const [experienceEndMonth, setExperienceEndMonth] = useState("Month");
  const [experienceEndYear, setExperienceEndYear] = useState("Year");

  const [aboutData, setAboutData] = useState({
    aboutMe: "",
  });

  const handleAboutDataUpdate = (e) => {
    const { name, value } = e.target;
    setAboutData({
      ...aboutData,
      [name]: value,
    });
  };

  const fileRef = useRef(null);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  };
  const [selected, setSelected] = useState(false);

  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRadioChange = () => {
    setSelected(!selected);
  };

  const [isModified, setIsModified] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    location: "",
  });

  const handleInputChangeProfile = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsModified(false);
  };

  useEffect(() => {
    setIsModified(true);
  }, [formData]);

  const [isCheckedEducation, setIsCheckedEducation] = useState(true);

  const handleSwitchChangeEducation = () => {
    setIsCheckedEducation(!isCheckedEducation);
  };

  const [isModifiedEducation, setIsModifiedEducation] = useState(false);

  const [educationDetails, setEducationDetails] = useState([]);

  const [educationDateDetails, setEducationDateDetails] = useState({
    startMonth: "Month",
    startYear: "Year",
    endMonth: "Month",
    endYear: "Year",
  });

  const [showEducationData, setShowEducationData] = useState(true);
  const [addEducationData, setAddEducationData] = useState(false);
  const [educationData, setEducationData] = useState([]);

  const [currentEducation, setCurrentEducation] = useState({
    qualification: "",
    specialization: "",
    instituteName: "",
    type: "",
    location: "",
  });

  const handleInputChangeEducation = (e) => {
    const { name, value } = e.target;
    setCurrentEducation({
      ...currentEducation,
      [name]: value,
    });
  };

  const handleSaveEducation = () => {
    setEducationData([...educationData, currentEducation]);
    setCurrentEducation({
      qualification: "",
      specialization: "",
      instituteName: "",
      type: "",
      location: "",
    });
    setEducationDetails([...educationDetails, educationDateDetails]);

    setEducationDateDetails({
      startMonth: "Month",
      startYear: "Year",
      endMonth: "Month",
      endYear: "Year",
    });

    setAddEducationData(false);
  };

  useEffect(() => {
    setIsModifiedEducation(true);
  }, [educationData]);

  const handleEditEducation = (index) => {
    const educationToEdit = educationData[index];

    if (educationToEdit) {
      setAddEducationData(true);
      setCurrentEducation({ ...educationToEdit });

      const updatedEducationData = educationData.filter((_, i) => i !== index);
      setEducationData(updatedEducationData);
    }
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
  };

  const [isCheckedExperience, setIsCheckedExperience] = useState(true);
  const [isModifiedExperience, setIsModifiedExperience] = useState(false);
  const [showExperienceData, setShowExperienceData] = useState(true);
  const [addExperienceData, setAddExperienceData] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    designation: "",
    organization: "",
    description: " ",
  });

  const handleSwitchChangeExperience = () => {
    setIsCheckedExperience(!isCheckedExperience);
  };

  const handleInputChangeExperience = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: value,
    });
  };

  const handleSaveExperience = () => {
    setExperienceData([...experienceData, currentExperience]);
    setCurrentExperience({
      designation: "",
      organization: "",
      description: " ",
    });
    setAddExperienceData(false);
  };

  const handleEditExperience = (index) => {
    const experienceToEdit = experienceData[index];

    if (experienceToEdit) {
      setAddExperienceData(true);
      setCurrentExperience({ ...experienceToEdit });

      const updatedExperienceData = experienceData.filter(
        (_, i) => i !== index
      );
      setExperienceData(updatedExperienceData);
    }
  };

  const handleDeleteExperience = (index) => {
    const updatedExperienceData = [...experienceData];
    updatedExperienceData.splice(index, 1);
    setExperienceData(updatedExperienceData);
  };

  useEffect(() => {
    setIsModifiedExperience(true);
  }, [experienceData]);

  const [isCheckedCourse, setIsCheckedCourse] = useState(true);
  const [isModifiedCourse, setIsModifiedCourse] = useState(false);
  const [showCourseData, setShowCourseData] = useState(true);
  const [addCourseData, setAddCourseData] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({
    courseName: "",
    issuedBy: "",
  });

  const handleSwitchChangeCourse = () => {
    setIsCheckedCourse(!isCheckedCourse);
  };

  const handleInputChangeCourse = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      [name]: value,
    });
  };

  const handleSaveCourse = () => {
    setCourseData([...courseData, currentCourse]);
    setCurrentCourse({
      courseName: "",
      issuedBy: "",
    });
    setAddCourseData(false);
  };

  const handleEditCourse = (index) => {
    const courseToEdit = courseData[index];

    if (courseToEdit) {
      setAddCourseData(true);
      setCurrentCourse({ ...courseToEdit });

      const updatedCourseData = courseData.filter((_, i) => i !== index);
      setCourseData(updatedCourseData);
    }
  };

  const handleDeleteCourse = (index) => {
    const updatedCourseData = [...courseData];
    updatedCourseData.splice(index, 1);
    setCourseData(updatedCourseData);
  };

  useEffect(() => {
    setIsModifiedCourse(true);
  }, []);

  const [isCheckedAchievement, setIsCheckedAchievement] = useState(true);
  const [isModifiedAchievement, setIsModifiedAchievement] = useState(false);
  const [showAchievementData, setShowAchievementData] = useState(true);
  const [addAchievementData, setAddAchievementData] = useState(false);
  const [achievementData, setAchievementData] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState({
    achievementName: "",
    description: "",
  });

  const handleSwitchChangeAchievement = () => {
    setIsCheckedAchievement(!isCheckedAchievement);
  };

  const handleInputChangeAchievement = (e) => {
    const { name, value } = e.target;
    setCurrentAchievement({
      ...currentAchievement,
      [name]: value,
    });
  };

  const handleSaveAchievement = () => {
    setAchievementData([...achievementData, currentAchievement]);
    setCurrentAchievement({
      achievementName: "",
      description: "",
    });
    setAddAchievementData(false);
  };

  const handleEditAchievement = (index) => {
    const achievementToEdit = achievementData[index];

    if (achievementToEdit) {
      setAddAchievementData(true);
      setCurrentAchievement({ ...achievementToEdit });

      const updatedAchievementData = achievementData.filter(
        (_, i) => i !== index
      );
      setAchievementData(updatedAchievementData);
    }
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievementData = [...achievementData];
    updatedAchievementData.splice(index, 1);
    setAchievementData(updatedAchievementData);
  };

  useEffect(() => {
    setIsModifiedAchievement(true);
  }, []);

  const [isCheckedSocial, setIsCheckedSocial] = useState(true);
  const [isModifiedSocial, setIsModifiedSocial] = useState(false);
  const [showSocialData, setShowSocialData] = useState(true);
  const [addSocialData, setAddSocialData] = useState(false);
  const [socialData, setSocialData] = useState([]);
  const [currentSocial, setCurrentSocial] = useState({
    platform: "",
    link: "",
  });

  const handleSwitchChangeSocial = () => {
    setIsCheckedSocial(!isCheckedSocial);
  };

  const handleInputChangeSocial = (e) => {
    const { name, value } = e.target;
    setCurrentSocial({
      ...currentSocial,
      [name]: value,
    });
  };

  const handleSaveSocial = () => {
    setSocialData([...socialData, currentSocial]);
    setCurrentSocial({
      platform: "",
      link: "",
    });
    setAddSocialData(false);
  };

  const handleEditSocial = (index) => {
    const socialToEdit = socialData[index];

    if (socialToEdit) {
      setAddSocialData(true);
      setCurrentSocial({ ...socialToEdit });

      const updatedSocialData = socialData.filter((_, i) => i !== index);
      setSocialData(updatedSocialData);
    }
  };

  const handleDeleteSocial = (index) => {
    const updatedSocialData = [...socialData];
    updatedSocialData.splice(index, 1);
    setSocialData(updatedSocialData);
  };

  useEffect(() => {
    setIsModifiedSocial(true);
  }, []);

  const [skills, setSkills] = useState([]);

  const [currentSkill, setCurrentSkill] = useState("");
  const initialRatings = Array(5).fill(5);

  const [ratings, setRatings] = useState(initialRatings);

  const handleInputChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  const addSkill = () => {
    if (currentSkill.trim() !== "") {
      setSkills([...skills, { skill: currentSkill, rating: [...ratings] }]);
      setCurrentSkill("");
      setRatings(initialRatings);
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleStarClick = (skillIndex, starIndex) => {
    const updatedSkills = skills.map((skill, index) => {
      if (index === skillIndex) {
        const updatedRatings = skill.rating.map((rating, i) =>
          i <= starIndex ? 1 : 0
        );
        return { ...skill, rating: updatedRatings };
      }
      return skill;
    });
    setSkills(updatedSkills);
  };

  const renderStars = (skillIndex) => {
    const skill = skills[skillIndex];
    if (skill && skill.rating) {
      return skill.rating.map((rating, index) => (
        <img
          key={`star_${index}`}
          src={
            rating ? "/images/services/Star.png" : "/images/services/Star1.png"
          }
          alt=""
          className="h-[30px] w-[30px]"
          onClick={() => handleStarClick(skillIndex, index)}
        />
      ));
    } else {
      return null;
    }
  };

  const [languages, setLanguages] = useState([]);

  const [currentLanguages, setCurrentLanguages] = useState("");
  const initialRatingsLanguages = Array(3).fill(3);

  const [ratingsLanguages, setRatingsLanguages] = useState(
    initialRatingsLanguages
  );

  const handleInputChangeLanguages = (e) => {
    setCurrentLanguages(e.target.value);
  };

  const addLanguages = () => {
    if (currentLanguages.trim() !== "") {
      setLanguages([
        ...languages,
        { languages: currentLanguages, rating: [...ratingsLanguages] },
      ]);
      setCurrentLanguages("");
      setRatingsLanguages(initialRatingsLanguages);
    }
  };

  const deleteLanguages = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  const handleStarClickLanguages = (languagesIndex, starIndex) => {
    const updatedLanguages = languages.map((languages, index) => {
      if (index === languagesIndex) {
        const updatedRatings = languages.rating.map((rating, i) =>
          i <= starIndex ? 1 : 0
        );
        return { ...languages, rating: updatedRatings };
      }
      return languages;
    });
    setLanguages(updatedLanguages);
  };

  const renderStarsLanguages = (languagesIndex) => {
    const languageItem = languages[languagesIndex];
    if (languageItem && languageItem.rating) {
      return languageItem.rating.map((rating, index) => (
        <img
          key={`star_${index}`}
          src={
            rating ? "/images/services/Star.png" : "/images/services/Star1.png"
          }
          alt=""
          className="h-[30px] w-[30px]"
          onClick={() => handleStarClickLanguages(languagesIndex, index)}
        />
      ));
    } else {
      return null;
    }
  };

  const [Hobbies, setHobbies] = useState([]);
  const [currentHobbies, setCurrentHobbies] = useState("");

  const handleInputChangeHobbies = (e) => {
    setCurrentHobbies(e.target.value);
  };

  const addHobby = () => {
    if (currentHobbies.trim() !== "") {
      setHobbies([...Hobbies, { hobby: currentHobbies }]);
      setCurrentHobbies("");
    }
  };

  const deleteHobbies = (index) => {
    const updatedHobbies = Hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
  };

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
            <div className="flex flex-col w-[49%] px-2 pb-4 gap-4 rounded-lg overflow-y-auto ">
              <ResumeList setData={setData} data={data} />
              <PersonalDetails setData={setData} data={data} />
              <AboutMe setData={setData} data={data} />
              <Education setData={setData} data={data} />
              <Experience setData={setData} data={data} />
              <Course setData={setData} data={data} />
              <Skills setData={setData} data={data} />
              <Achievement
              setData={setData} data={data}
                isCheckedAchievement={isCheckedAchievement}
                handleSwitchChangeAchievement={handleSwitchChangeAchievement}
                achievementData={achievementData}
                handleEditAchievement={handleEditAchievement}
                handleDeleteAchievement={handleDeleteAchievement}
                handleInputChangeAchievement={handleInputChangeAchievement}
                addAchievementData={addAchievementData}
                handleSaveAchievement={handleSaveAchievement}
                isModifiedAchievement={isModifiedAchievement}
                currentAchievement={currentAchievement}
                setAddAchievementData={setAddAchievementData}
              />
              <SocialLink
                isCheckedSocial={isCheckedSocial}
                handleSwitchChangeSocial={handleSwitchChangeSocial}
                socialData={socialData}
                handleEditSocial={handleEditSocial}
                handleDeleteSocial={handleDeleteSocial}
                addSocialData={addSocialData}
                handleInputChangeSocial={handleInputChangeSocial}
                currentSocial={currentSocial}
                isModifiedSocial={isModifiedSocial}
                handleSaveSocial={handleSaveSocial}
                setAddSocialData={setAddSocialData}
              />

              <Hobbie
                Hobbies={Hobbies}
                deleteHobbies={deleteHobbies}
                currentHobbies={currentHobbies}
                handleInputChangeHobbies={handleInputChangeHobbies}
                addHobby={addHobby}
              />
              <Languages
                languages={languages}
                deleteLanguages={deleteLanguages}
                renderStarsLanguages={renderStarsLanguages}
                currentLanguages={currentLanguages}
                handleInputChangeLanguages={handleInputChangeLanguages}
                addLanguages={addLanguages}
              />
            </div>

            <div
              className="flex  h-fit flex-col w-[49%] p-4 gap-[14px] rounded-lg bg-white shadow-md"
              style={{
                boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
                <div
                  className=" flex gap-4 pb-[10px]"
                  style={{ overflowX: "auto" }}
                >
                  <img
                    src="/images/services/resume-template-1.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-2.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-1.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-2.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-1.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-2.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                  <img
                    src="/images/services/resume-template-1.png"
                    className="h-[200px] w-[140.91px] rounded-[6px]"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className=" text-[20px]  font-montserrat font-medium flex items-center">
                  Preview
                </div>

                <div className="flex gap-[16px]">
                  <button className="flex gap-1 text-[12px]  text-[#FFF] font-montserrat font-semibold px-3 py-[2px] rounded-[8px] items-center border border-[#06A9EF] bg-[#06A9EF]">
                    <img
                      src="/images/services/add_link.png"
                      className="h-[24px] w-[24px] rounded-[6px]"
                      alt=""
                    />
                    Attach
                  </button>

                  <button className=" text-[12px] text-[#333] font-montserrat font-semibold px-9 py-1 rounded-[8px] border border-[#06A9EF]">
                    Download Resume
                  </button>
                </div>
              </div>

              <div
                className=""
                style={{
                  transform: "scale(0.87)",
                  transformOrigin: "top left",
                }}
              >
                <Resume5
                  data={data}
                  formData={formData}
                  educationData={educationData}
                  aboutData={aboutData}
                  experienceData={experienceData}
                  skills={skills}
                  languages={languages}
                  socialData={socialData}
                />
                {/* <ResumeTemplate3 formData={formData} educationData={educationData} aboutData={aboutData} experienceData={experienceData} skills={skills} languages={languages} socialData={socialData}  /> */}
                {/* <ResumeTemplate2 formData={formData} educationData={educationData} aboutData={aboutData} experienceData={experienceData} skills={skills} languages={languages} socialData={socialData}  /> */}
                {/* <ResumeTemplate4 /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
