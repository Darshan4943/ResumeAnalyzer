import React, { useEffect, useRef, useState } from "react";
import DateSelector from "@/components/common/dateSelector";
import Resume5 from "@/components/featured/resumeTemplates/resume5";

function AiResumePage() {
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

  console.log(educationDetails);

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
    console.log(languageItem);
    if (languageItem && languageItem.rating) {
      return languageItem.rating.map((rating, index) => (
        <img
          key={`star_${index}`}
          src={
            rating ? "/images/employer/Star.png" : "/images/employer/Star1.png"
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
  console.log(Hobbies);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g clip-path="url(#clip0_5716_136244)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.66797 20.0002C6.66797 19.0797 7.41416 18.3335 8.33464 18.3335H31.668C32.5884 18.3335 33.3346 19.0797 33.3346 20.0002C33.3346 20.9206 32.5884 21.6668 31.668 21.6668H8.33464C7.41416 21.6668 6.66797 20.9206 6.66797 20.0002Z"
                  fill="#333333"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.15612 18.8217C7.807 18.1708 8.86227 18.1708 9.51315 18.8217L19.5131 28.8217C20.164 29.4725 20.164 30.5278 19.5131 31.1787C18.8623 31.8295 17.807 31.8295 17.1561 31.1787L7.15612 21.1787C6.50525 20.5278 6.50525 19.4725 7.15612 18.8217Z"
                  fill="#333333"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5131 8.82165C20.164 9.47253 20.164 10.5278 19.5131 11.1787L9.51315 21.1787C8.86227 21.8295 7.807 21.8295 7.15612 21.1787C6.50525 20.5278 6.50525 19.4725 7.15612 18.8217L17.1561 8.82165C17.807 8.17078 18.8623 8.17078 19.5131 8.82165Z"
                  fill="#333333"
                />
              </g>
              <defs>
                <clipPath id="clip0_5716_136244">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
              <div className="bg-[#06A9EF] p-4 rounded-[16px] flex justify-between text-white">
                <p className="text-[20px] font-medium">My Resume</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g mask="url(#mask0_5765_78572)">
                    <path
                      d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>

              <div
                className="flex flex-col gap-4 p-4 bg-white rounded-lg"
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <p className="text-[20px] font-medium">Upload Photo</p>
                <div className="flex gap-4 items-center">
                  <img
                    src="/images/services/profile.png"
                    alt=""
                    className="w-[112px] h-[112px]"
                  />
                  <div class="border-dashed border-[3px] border-[#06A9EF] flex flex-col w-full rounded-[12px] p-4 items-center ">
                    <div className="  flex  flex-col  items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        onClick={handleButtonClick}
                      >
                        <g clip-path="url(#clip0_4121_52475)">
                          <path
                            d="M25 13.3333H25.0167"
                            stroke="#06A9EF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                            stroke="#06A9EF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                            stroke="#06A9EF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                            stroke="#06A9EF"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4121_52475">
                            <rect width="40" height="40" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div class="flex flex-col gap-[4px]	font-normal	">
                      <div class="flex text-center justify-center  text-[14px] text-[#515B6F]">
                        <input
                          type="file"
                          ref={fileRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <p
                          onClick={handleButtonClick}
                          class="text-[#06A9EF] font-medium"
                        >
                          &nbsp;Browse file{" "}
                        </p>
                        &nbsp;or drag and drop
                      </div>
                      <p class="text-center text-[14px] font-normal text-[#333]">
                        {" "}
                        Allowed file formats: jpg, jpeg | up to 1.5 MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end ">
                  <div className="flex justify-between  py-2 gap-2">
                    <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[83px] h-[32px]">
                      Remove
                    </button>
                    <button className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  opacity: isChecked ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Personal Details</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleSwitchChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-2 w-[50%]">
                      <div className=" text-[14px] font-montserrat  font-medium">
                        First Name
                      </div>
                      <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Enter first name"
                          className="w-full text-[14px] font-montserrat font-small"
                          value={formData.firstName}
                          onChange={handleInputChangeProfile}
                          disabled={!isChecked}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-[50%]">
                      <div className="w-full text-[14px] font-montserrat  font-medium">
                        Last Name
                      </div>
                      <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Enter Last name"
                          className="w-full text-[14px] font-montserrat font-small"
                          value={formData.lastName}
                          onChange={handleInputChangeProfile}
                          disabled={!isChecked}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full text-[14px] font-montserrat  font-medium">
                      Mobile Number
                    </div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter Mobile Number"
                        className="w-full text-[14px] font-montserrat font-small"
                        value={formData.mobileNumber}
                        onChange={handleInputChangeProfile}
                        disabled={!isChecked}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full text-[14px] font-montserrat font-medium">
                      Email ID
                    </div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        className="w-full text-[14px] font-montserrat font-small"
                        value={formData.email}
                        onChange={handleInputChangeProfile}
                        disabled={!isChecked}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full text-[14px] font-montserrat  font-medium">
                      Current Location
                    </div>
                    <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        className="w-full text-[14px] font-montserrat font-small"
                        value={formData.location}
                        onChange={handleInputChangeProfile}
                        disabled={!isChecked}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end ">
                    <div className="flex justify-between  py-2 gap-2">
                      <button
                        className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]"
                        disabled={!isChecked}
                      >
                        Update to Profile
                      </button>
                      <button
                        className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        style={{ opacity: isModified ? 1 : 0.3 }}
                        onClick={handleSave}
                        disabled={!isModified || !isChecked}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white "
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="w-full text-[20px] flex justify-between font-montserrat font-medium">
                  <p> About Me</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                  <textArea
                    type="text"
                    name="aboutMe"
                    className="w-full text-[14px] font-montserrat font-small h-full outline-none"
                    placeholder="Enter text"
                    value={aboutData.aboutMe}
                    onChange={handleAboutDataUpdate}
                  />
                </div>

                <div className="flex justify-end items-center gap-3 ">
                  <div className="text-[10px] font-[400]">
                    Remaining Attempts - 3
                  </div>

                  <button className=" flex gap-1 items-center font-montserrat text-xs font-semibold px-[12px] h-[32px] rounded-[8px] border border-[#06A9EF] ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4914_60492)">
                        <path
                          d="M9.84155 5.00781C10.4978 7.80078 12.2048 9.48438 14.9978 10.1523C15.033 10.1602 15.0525 10.1953 15.0447 10.2266C15.0408 10.25 15.0212 10.2695 14.9978 10.2734C12.1814 10.918 10.5017 12.6406 9.83765 15.4375C9.82983 15.4727 9.79468 15.4922 9.75952 15.4844C9.73608 15.4805 9.71655 15.4609 9.71265 15.4375C9.06812 12.6211 7.36108 10.9375 4.5603 10.2656C4.52515 10.2578 4.50562 10.2227 4.51343 10.1875C4.51733 10.1641 4.53687 10.1445 4.5603 10.1406C7.36108 9.49609 9.05249 7.79688 9.72046 5.00391C9.72827 4.96875 9.76343 4.94922 9.79858 4.95703C9.81812 4.97266 9.83765 4.98828 9.84155 5.00781Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M16.4307 0.831971C16.7783 2.30072 17.6729 3.18744 19.1416 3.539C19.1611 3.54291 19.1689 3.56244 19.165 3.57806C19.1611 3.58978 19.1533 3.6015 19.1416 3.6015C17.6611 3.94135 16.7744 4.8476 16.4268 6.31635C16.4229 6.33588 16.4033 6.34369 16.3877 6.33978C16.376 6.33588 16.3643 6.32806 16.3643 6.31635C16.0244 4.83588 15.126 3.94916 13.6533 3.59369C13.6338 3.58978 13.626 3.57025 13.6299 3.55463C13.6338 3.54291 13.6416 3.53119 13.6533 3.53119C15.126 3.19135 16.0166 2.30072 16.3682 0.828065C16.3721 0.808534 16.3877 0.796815 16.4072 0.800721C16.4189 0.804627 16.4268 0.816346 16.4307 0.831971Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M2.80566 3.30463C3.14941 4.77338 4.04785 5.66009 5.5166 6.01166C5.53613 6.01556 5.54395 6.03509 5.54004 6.05072C5.53613 6.06244 5.52832 6.07416 5.5166 6.07416C4.03613 6.414 3.14941 7.32025 2.80176 8.789C2.79785 8.80853 2.77832 8.81635 2.7627 8.81244C2.75098 8.80853 2.73926 8.80072 2.73926 8.789C2.39941 7.30853 1.50098 6.42181 0.0283203 6.06635C0.00878906 6.06244 0.000976562 6.04291 0.00488281 6.02728C0.00878906 6.01556 0.0166016 6.00385 0.0283203 6.00385C1.50098 5.664 2.3916 4.77338 2.74316 3.30072C2.74707 3.28119 2.7666 3.27338 2.78223 3.27728C2.79395 3.2851 2.80566 3.29291 2.80566 3.30463Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M17.0479 13.7187C17.3955 15.1874 18.29 16.0742 19.7588 16.4257C19.7783 16.4296 19.7861 16.4492 19.7822 16.4648C19.7783 16.4765 19.7705 16.4882 19.7588 16.4882C18.2783 16.8281 17.3916 17.7343 17.0439 19.2031C17.04 19.2226 17.0205 19.2304 17.0049 19.2265C16.9932 19.2226 16.9814 19.2148 16.9814 19.2031C16.6416 17.7226 15.7432 16.8359 14.2705 16.4804C14.251 16.4765 14.2432 16.457 14.2471 16.4413C14.251 16.4296 14.2588 16.4179 14.2705 16.4179C15.7432 16.0781 16.6338 15.1874 16.9854 13.7148C16.9893 13.6953 17.0088 13.6835 17.0244 13.6874C17.0361 13.6992 17.0479 13.707 17.0479 13.7187Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M18.2705 9.19135C18.4893 10.1171 19.0557 10.6796 19.9815 10.9023C19.9932 10.9062 19.9971 10.9179 19.9932 10.9296C19.9893 10.9335 19.9854 10.9374 19.9815 10.9414C19.044 11.1562 18.4854 11.7265 18.2666 12.6562C18.2627 12.6679 18.251 12.6757 18.2393 12.6718C18.2315 12.6718 18.2237 12.664 18.2237 12.6562C18.0088 11.7187 17.4424 11.1601 16.5127 10.9374C16.501 10.9335 16.4932 10.9218 16.4971 10.9101C16.4971 10.9023 16.5049 10.8945 16.5127 10.8945C17.4424 10.6796 18.0049 10.1171 18.2276 9.18745C18.2315 9.17573 18.2432 9.16792 18.2549 9.17182C18.2627 9.17573 18.2705 9.18354 18.2705 9.19135Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M4.82133 14.9179C5.04008 15.8437 5.60648 16.4062 6.53227 16.6289C6.54398 16.6328 6.5518 16.6445 6.54789 16.6562C6.54789 16.664 6.54008 16.6718 6.53227 16.6718C5.59867 16.8867 5.04008 17.4609 4.81742 18.3867C4.81352 18.3984 4.8018 18.4062 4.79008 18.4023C4.78227 18.3984 4.77836 18.3945 4.77445 18.3867C4.55961 17.4492 3.9932 16.8906 3.06352 16.6679C3.0518 16.664 3.04398 16.6523 3.04789 16.6406C3.04789 16.6328 3.0557 16.6249 3.06352 16.6249C3.9932 16.4101 4.5557 15.8476 4.77836 14.9179C4.78227 14.9062 4.79398 14.8984 4.8057 14.9023C4.81742 14.9062 4.82133 14.9101 4.82133 14.9179Z"
                          fill="#FFDA1D"
                        />
                        <path
                          d="M7.1651 0.78119C7.34479 1.54682 7.81354 2.01166 8.58307 2.19525C8.59088 2.19916 8.5987 2.20697 8.59479 2.21478C8.59479 2.2226 8.58698 2.2265 8.58307 2.2265C7.80963 2.40228 7.34479 2.87885 7.1612 3.64838C7.15729 3.65619 7.14948 3.664 7.13776 3.6601C7.12995 3.6601 7.12604 3.65228 7.12604 3.64838C6.95026 2.87494 6.4776 2.4101 5.70807 2.2265C5.70026 2.2226 5.69245 2.21478 5.69635 2.20307C5.69635 2.19525 5.70416 2.19135 5.70807 2.19135C6.4776 2.01557 6.94245 1.54682 7.12995 0.777284C7.13385 0.769472 7.14166 0.761659 7.15338 0.765565C7.15729 0.769472 7.1651 0.773378 7.1651 0.78119Z"
                          fill="#FFDA1D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4914_60492">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Generate with AI
                  </button>
                  <button className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]">
                    Save
                  </button>
                </div>
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25) ",
                  opacity: isCheckedEducation ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Education</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isCheckedEducation}
                      onChange={handleSwitchChangeEducation}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                {educationData.map((edu, index) => (
                  <div className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE] break-all">
                    <div className="flex justify-between">
                      <p>{edu.qualification}</p>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleEditEducation(index)}
                        >
                          <g mask="url(#mask0_5808_93842)">
                            <path
                              d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleDeleteEducation(index)}
                        >
                          <g mask="url(#mask0_5808_93845)">
                            <path
                              d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <p>{edu.specialization}</p>
                  </div>
                ))}

                {addEducationData && (
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 w-full">
                        <div className=" text-[14px] font-montserrat  font-medium">
                          Highest Qualification
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="qualification"
                            placeholder="Enter Highest Qualification"
                            className="w-full text-[14px] font-montserrat font-small"
                            value={currentEducation.qualification}
                            onChange={handleInputChangeEducation}
                            disabled={!isCheckedEducation}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Specialization
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                          <input
                            type="text"
                            name="specialization"
                            placeholder="Enter your specialization"
                            className="w-full text-[14px] font-montserrat font-small "
                            value={currentEducation.specialization}
                            onChange={handleInputChangeEducation}
                            disabled={!isCheckedEducation}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className=" text-[14px] font-montserrat  font-medium">
                          Institute Name
                        </div>
                        <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                          <input
                            type="text"
                            name="instituteName"
                            placeholder="Search for Institute"
                            className="w-full text-[14px] font-montserrat font-small "
                            value={currentEducation.instituteName}
                            onChange={handleInputChangeEducation}
                            disabled={!isCheckedEducation}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Passing Year
                        </div>
                        <div>
                          <DateSelector
                            idPrefix="education"
                            educationDetails={educationDetails}
                            setEducationDetails={setEducationDetails}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Education Type
                        </div>
                        <div className="w-full flex gap-2 text-[14px] font-montserrat items-center font-medium">
                          <input
                            type="radio"
                            className="h-4 w-4 custom-radio"
                          />
                          <label>Full-Time</label>

                          <input
                            value={currentEducation.type}
                            onChange={handleInputChangeEducation}
                            disabled={!isCheckedEducation}
                            type="radio"
                            className="h-4 w-4 custom-radio"
                          />
                          <label>Part-Time</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end ">
                      <div className="flex justify-between  py-2 gap-2">
                        <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                          Update to Profile
                        </button>
                        <button
                          style={{ opacity: isModifiedEducation ? 1 : 0.3 }}
                          onClick={handleSaveEducation}
                          disabled={!isModifiedEducation || !isCheckedEducation}
                          className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addEducationData && (
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5716_136351)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    <p
                      onClick={() => setAddEducationData(true)}
                      className="text-[16px] font-semibold text-[#06A9EF]"
                      disabled={!isCheckedEducation}
                    >
                      Add Education
                    </p>
                  </div>
                )}
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  opacity: isCheckedExperience ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Experience</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isCheckedExperience}
                      onChange={handleSwitchChangeExperience}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                {experienceData.map((exp, index) => (
                  <div className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE] break-all">
                    <div className="flex justify-between">
                      <p>{exp.organization}</p>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleEditExperience(index)}
                        >
                          <g mask="url(#mask0_5808_93842)">
                            <path
                              d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleDeleteExperience(index)}
                        >
                          <g mask="url(#mask0_5808_93845)">
                            <path
                              d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <p>{exp.designation}</p>
                  </div>
                ))}

                {addExperienceData && (
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Designation
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="designation"
                            placeholder="Enter your Designation"
                            className="w-full text-[14px] font-montserrat font-small "
                            value={currentExperience.designation}
                            onChange={handleInputChangeExperience}
                            disabled={!isCheckedExperience}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Organisation
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="organization"
                            placeholder="Enter company name"
                            className="w-full text-[14px] font-montserrat font-small "
                            value={currentExperience.organization}
                            onChange={handleInputChangeExperience}
                            disabled={!isCheckedExperience}
                          />
                        </div>
                      </div>

                      <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-2 border-[#06A9EF] bg-white"
                        />
                        <label>Currently working here</label>
                      </div>

                      <div>
                        {/* <DateSelector idPrefix="experience" 
                                                   
                                                   /> */}
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Work Description
                        </div>
                        <div className="w-full text-[14px] font-montserrat  font-small">
                          Describe about your work
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                          <textArea
                            type="text"
                            name="description"
                            id=""
                            className="w-full text-[14px] font-montserrat font-small h-full  outline-none"
                            placeholder="Enter text"
                            value={currentExperience.description}
                            onChange={handleInputChangeExperience}
                            disabled={!isCheckedExperience}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end ">
                      <div className="flex justify-between  py-2 gap-2">
                        <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                          Update to Profile
                        </button>
                        <button
                          style={{ opacity: isModifiedExperience ? 1 : 0.3 }}
                          onClick={handleSaveExperience}
                          disabled={
                            !isModifiedExperience || !isCheckedExperience
                          }
                          className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!addExperienceData && (
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5716_136351)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    <p
                      onClick={() => setAddExperienceData(true)}
                      className="text-[16px] font-semibold text-[#06A9EF]"
                      disabled={!isCheckedExperience}
                    >
                      Add Experience
                    </p>
                  </div>
                )}
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  opacity: isCheckedCourse ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Course and Certification</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isCheckedCourse}
                      onChange={handleSwitchChangeCourse}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                {courseData.map((course, index) => (
                  <div className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]">
                    <div className="flex justify-between">
                      <p>{course.courseName}</p>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleEditCourse(index)}
                        >
                          <g mask="url(#mask0_5808_93842)">
                            <path
                              d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleDeleteCourse(index)}
                        >
                          <g mask="url(#mask0_5808_93845)">
                            <path
                              d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                {addCourseData && (
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[50%]">
                          <div className=" text-[14px] font-montserrat  font-medium">
                            Certificate Name
                          </div>
                          <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                            <input
                              type="text"
                              name="courseName"
                              placeholder="Enter Certificate Name"
                              className="w-full text-[14px] font-montserrat font-small "
                              value={currentCourse.courseName}
                              onChange={handleInputChangeCourse}
                              disabled={!isCheckedCourse}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[50%]">
                          <div className="w-full text-[14px] font-montserrat  font-medium">
                            Issued by
                          </div>
                          <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                            <input
                              type="text"
                              name="issuedBy"
                              id=""
                              placeholder="EIssued by"
                              className="w-full text-[14px] font-montserrat font-small "
                              value={currentExperience.issuedBy}
                              onChange={handleInputChangeCourse}
                              disabled={!isCheckedCourse}
                            />
                          </div>
                        </div>
                      </div>

                      <div>{/* <DateSelector idPrefix="experience" /> */}</div>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Description
                        </div>

                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px]  min-h-[140px]">
                          <textArea
                            type="text"
                            name=""
                            id=""
                            className="w-full h-full text-[14px] font-montserrat font-small outline-none "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end ">
                      <div className="flex justify-between  py-2 gap-2">
                        <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                          Update to Profile
                        </button>
                        <button
                          style={{ opacity: isModifiedCourse ? 1 : 0.3 }}
                          onClick={handleSaveCourse}
                          disabled={!isModifiedCourse || !isCheckedCourse}
                          className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addCourseData && (
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5716_136351)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    <text
                      onClick={() => setAddCourseData(true)}
                      className="text-[16px] font-semibold text-[#06A9EF]"
                      disabled={!isCheckedCourse}
                    >
                      Add Course & Certification
                    </text>
                  </div>
                )}
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full text-[20px] font-montserrat  font-medium">
                    Skills & Ratings
                  </div>
                  <div className="flex flex-col gap-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex gap-4 justify-between">
                        <div className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center">
                          <p className="text-[14px] font-medium">
                            {skill.skill}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            onClick={() => deleteSkill(index)}
                          >
                            <g mask="url(#mask0_5716_136486)">
                              <path
                                d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="flex">{renderStars(index, skill)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full text-[14px] font-montserrat  font-small">
                    List your skills and strengths
                  </div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter your skills"
                      className="w-full text-[14px] font-montserrat font-small"
                      value={currentSkill}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-end ">
                    <div className="flex justify-between  py-2 gap-2">
                      <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                        Update to Profile
                      </button>
                      <button
                        onClick={addSkill}
                        className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  opacity: isCheckedAchievement ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Achievements</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isCheckedAchievement}
                      onChange={handleSwitchChangeAchievement}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                {achievementData.map((ach, index) => (
                  <div className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]">
                    <div className="flex justify-between">
                      <p>{ach.achievementName}</p>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleEditAchievement(index)}
                        >
                          <g mask="url(#mask0_5808_93842)">
                            <path
                              d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleDeleteAchievement(index)}
                        >
                          <g mask="url(#mask0_5808_93845)">
                            <path
                              d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                {addAchievementData && (
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="achievementName"
                            id=""
                            placeholder="Enter your Achievement"
                            className="w-full text-[14px] font-montserrat font-small "
                            value={currentAchievement.achievementName}
                            onChange={handleInputChangeAchievement}
                            disabled={!isCheckedAchievement}
                          />
                        </div>
                      </div>

                      <div>{/* <DateSelector idPrefix="experience" /> */}</div>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Description
                        </div>
                        <div className="w-full text-[14px] font-montserrat  font-small">
                          Write about your Achievement
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                          <textArea
                            type="text"
                            name=""
                            id=""
                            className="w-full text-[14px] font-montserrat font-small outline-none h-full "
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end ">
                      <div className="flex justify-between  py-2 gap-2">
                        <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                          Update to Profile
                        </button>
                        <button
                          style={{ opacity: isModifiedAchievement ? 1 : 0.3 }}
                          onClick={handleSaveAchievement}
                          disabled={
                            !isModifiedAchievement || !isCheckedAchievement
                          }
                          className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addAchievementData && (
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5716_136351)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    <p
                      onClick={() => setAddAchievementData(true)}
                      className="text-[16px] font-semibold text-[#06A9EF]"
                      disabled={!isCheckedAchievement}
                    >
                      Add Achievements
                    </p>
                  </div>
                )}
              </div>
              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                  opacity: isCheckedSocial ? 1 : 0.5,
                }}
              >
                <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
                  <p> Website & Social link</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isCheckedSocial}
                      onChange={handleSwitchChangeSocial}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                {socialData.map((social, index) => (
                  <div className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]">
                    <div className="flex justify-between">
                      <p>{social.platform}</p>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleEditSocial(index)}
                        >
                          <g mask="url(#mask0_5808_93842)">
                            <path
                              d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => handleDeleteSocial(index)}
                        >
                          <g mask="url(#mask0_5808_93845)">
                            <path
                              d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
                {addSocialData && (
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="platform"
                            id=""
                            placeholder=" Your Social Name eg. Linkedin, Behance"
                            className="w-full text-[14px] font-montserrat font-small"
                            value={currentSocial.platform}
                            onChange={handleInputChangeSocial}
                            disabled={!isCheckedSocial}
                          />
                        </div>
                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                          <input
                            type="text"
                            name="link"
                            id=""
                            placeholder="Enter your social Profile URL"
                            className="w-full text-[14px] font-montserrat font-small"
                            value={currentSocial.link}
                            onChange={handleInputChangeSocial}
                            disabled={!isCheckedSocial}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <div className="w-full text-[14px] font-montserrat  font-medium">
                          Description
                        </div>

                        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                          <textArea
                            type="text"
                            name=""
                            id=""
                            placeholder="Describe about your Profile"
                            className="w-full text-[14px] font-montserrat font-small outline-none h-full "
                          />
                        </div>
                        <p className="flex justify-end text-[14px] font-normal text-[#646464]">
                          250 characters left
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end ">
                      <div className="flex justify-between  py-2 gap-2">
                        <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                          Update to Profile
                        </button>
                        <button
                          style={{ opacity: isModifiedSocial ? 1 : 0.3 }}
                          onClick={handleSaveSocial}
                          disabled={!isModifiedSocial || !isCheckedSocial}
                          className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {!addSocialData && (
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5716_136351)">
                        <path
                          d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>
                    <p
                      onClick={() => setAddSocialData(true)}
                      className="text-[16px] font-semibold text-[#06A9EF]"
                      disabled={!isCheckedSocial}
                    >
                      Add More
                    </p>
                  </div>
                )}
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full text-[20px] font-montserrat  font-medium">
                    Hobbies
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {Hobbies.map((hobby, index) => (
                      <div
                        key={index}
                        className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center"
                      >
                        <p className="text-[14px] font-medium">{hobby.hobby}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          onClick={() => deleteHobbies(index)}
                        >
                          <g mask="url(#mask0_5716_136486)">
                            <path
                              d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                      </div>
                    ))}
                  </div>

                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter your hobbies"
                      className="w-full text-[14px] font-montserrat font-small"
                      value={currentHobbies}
                      onChange={handleInputChangeHobbies}
                    />
                  </div>
                  <div className="flex justify-end ">
                    <div className="flex justify-between  py-2 gap-2">
                      <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                        Update to Profile
                      </button>
                      <button
                        onClick={addHobby}
                        className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col p-4 gap-2 rounded-lg bg-white"
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full text-[20px] font-montserrat  font-medium">
                    Languages
                  </div>
                  <div className="flex flex-col gap-4">
                    {languages.map((languages, index) => (
                      <div key={index} className="flex gap-4 justify-between">
                        <div className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center">
                          <p className="text-[14px] font-medium">
                            {languages.languages}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            onClick={() => deleteLanguages(index)}
                          >
                            <g mask="url(#mask0_5716_136486)">
                              <path
                                d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className="flex border w-[50%] border-[#DEDEDE] px-4 py-2 rounded-[8px] gap-4">
                          {renderStarsLanguages(index)}
                          <p>
                            {languages.rating[2] !== 0
                              ? "Expert"
                              : languages.rating[1] !== 0
                              ? "Proficient"
                              : "Beginner"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter your skills"
                      className="w-full text-[14px] font-montserrat font-small"
                      value={currentLanguages}
                      onChange={handleInputChangeLanguages}
                    />
                  </div>
                  <div className="flex justify-end ">
                    <div className="flex justify-between  py-2 gap-2">
                      <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                        Update to Profile
                      </button>
                      <button
                        onClick={addLanguages}
                        className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

export default AiResumePage;
