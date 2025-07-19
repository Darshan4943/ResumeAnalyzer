import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link as ScrollLink,
  Element as ScrollElement,
  scroller,
} from "react-scroll";
import ALink from "../../components/alink";
import ProfileHeader from "../../components/featured/profile/profileHeader";
import ResumeList from "../../components/featured/profile/resumeList";
import AboutModal from "../../components/featured/profile/aboutModel";
import WorkExperiance from "../../components/featured/profile/workExperience";
import Education from "../../components/featured/profile/education";
import Skills from "../../components/featured/profile/skills";
import Courses from "../../components/featured/profile/courses";
import Social_links_ndWebsites from "../../components/featured/profile/socialLinks";
import Projects from "../../components/featured/profile/projects";
import Achievements from "../../components/featured/profile/achievements";
import JobPrefrence from "../../components/featured/profile/jobPreferences";
import PersonalDetails from "../../components/featured/profile/personalDetails";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/mini-loader";
import LanguagesProfile from "../../components/featured/profile/LanguagesProfile";
import { calculateProfileCompletion } from "../../utils/data";

function Profile() {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeCount, setResumeCount] = useState(1);
  const [userData, setUserData] = useState(false);
  const [selectedTab, setSelectedTab] = useState("My Resume");

  const arr = [
    "My Resume",
    "About me",
    "Work Experience",
    "Education",
    "Skills",
    "Certifications",
    "Achievements",
    "Websites & Social links",
    "Projects",
    "Job Preferences",
    "Personal details",
  ];
  const scrollTo = (element) => {
    setSelectedTab(element);
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };

  useEffect(() => {
    setUserData(profileData);
  }, [profileData]);


  const percentage = calculateProfileCompletion(userData)?.toFixed(0);
  const getProgressColor = (percentage) => {
    if (percentage < 40) return "#C00000";
    if (percentage <= 75) return "#0275A7";
    return "#127C29";
  };

  const progressColor = getProgressColor(percentage);

  const containerStyle = {
    background: `conic-gradient(${progressColor} ${percentage * 3.6}deg, #f0f0f0 0deg)`,

  };

  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleImageClick = () => {
    setIsComponentOpen(!isComponentOpen);
  };

  const handleDownload = () => {
    setIsLoading(true);

    setTimeout(() => {
      const defaultResume = resumeList.find(
        (resume) => resume.isDefault === true
      );

      if (defaultResume && defaultResume.resumeUrl) {
        const link = document.createElement("a");
        link.href = defaultResume.resumeUrl;
        link.download = defaultResume.fileName || "resume.pdf";
        link.click();
      } else {
        toast.error("No default resume found");
      }
      setIsLoading(false);
    }, 2000);
  };



  return (
    <div className="customMargins">

      <div>{<ProfileHeader userData={userData} />}</div>


      <div className=" relative pb-6">
        <div className="ml:flex ml:flex-row flex flex-col mt-[24px] gap-[24px]">
          <div className="profile_left_section ml:sticky ml:top-[84px] max-w-[262px] hidden ml:inline-flex">
            {/* <div className="score_all">
              <div className="profile_score">
                <div class="circle-border" style={containerStyle}>
                  <div class="circle">
                    <p className="profile_percent">
                      {calculateProfileCompletion(userData)?.toFixed(0)} %
                    </p>
                  </div>
                </div>
                
                <img
                  src="./images/profile/Ellipse_25.png"
                  className="eclips_25"
                  alt=""
                />
                <p className="profile_percent">
                  {calculateProfileCompletion(userData)?.toFixed(0)} %
                </p>
              </div>

              <div className="profile_right_section profile_align">
                <p className="profile_score_text">Profile Score</p>
                <p className="improve_text">
                  Improve your profile score, to get more recruiter attention.
                </p>
              </div>
            </div> */}

            <div className="profile_option heroBlock min-w-[194px]">
              {arr.map((item, index) => (
                <ScrollLink
                  key={index}
                  to="home"
                  spy={true}
                  smooth={true}
                  duration={500}
                  onClick={() => scrollTo(item)}
                  className="w-[100%]"
                >
                  <div
                    className={`profile_option_menu  ${selectedTab == item && " profile_option_menu-selected"
                      }`}
                  >
                    <p className="my_resume cursor-pointer">{item}</p>
                  </div>
                </ScrollLink>
              ))}
            </div>
          </div>

          <div className="profile_right w-[100%] education_page">
            <div className="build_ai w-[100%] flex_column items-start">
              <div className="build_ai_left  w-fit">
                <div className="flex flex-row w-[100%] ">
                  <div className="w-[50%] md:w-fit">
                    <img
                      className="w-[152px] h-[152px]"
                      src="./images/profile/Wavy_Bus.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[10px] w-[50%] md:hidden ">
                    <ALink href="/createResume/BuildResume">
                      <button className="rounded-[8px] bg-blue text-[#FFFFFF] text-[10px] px-[16px] py-[12px]">
                        Create New Resume
                      </button>
                    </ALink>

                    <button
                      onClick={handleDownload}
                      className="rounded-[8px] border border-blue  text-[10px] px-[16px] py-[12px] w-[134.3px]"
                    >
                      {isLoading ? <MiniLoader /> : "Download Resume"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="build_ai_right">
                <p className=" text-[20px] font-[500]">
                  Build AI Powered Resume
                </p>
                <div className=" flex gap-3 items-center w-full ">
                  <p className=" text-[12px] font-[500] ">
                    Professional Templates
                  </p>
                  <div className="h-[12px] min-w-[1px] w-[1px] bg-[#AFAFAF] "></div>
                  <p className=" text-center text-[12px] font-[500] ">
                    AI suggestion
                  </p>
                  <div className="h-[12px] min-w-[1px] w-[1px] bg-[#AFAFAF] "></div>
                  <p className="text-center text-[12px] font-[500]">Preview</p>
                </div>

                <p className="text-[12px] font-[400]">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </p>

                <div className="build_ai_button_parent build_ai_none">
                  <ALink href={"/createResume/BuildResume"}>
                    <button className="bg-blue text-[#FFFFFF] border border-blue rounded-[8px]  px-3 py-2 text-[12px] font-semibold leading-tight">
                      Create New Resume
                    </button>
                  </ALink>

                  {resumeList.length > 0 && (
                    <button
                      onClick={handleDownload}
                      className="border border-blue rounded-[8px] px-3 py-2 text-[12px] font-medium leading-tight"
                    >
                      {isLoading ? (
                        <div className="justify-center items-center flex w-[110px] p-[0px] h-[15px]">
                          <MiniLoader />
                        </div>
                      ) : (
                        "Download Resume"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {resumeCount > 0 && (
              <ScrollElement name="My Resume" className="section">
                <ResumeList
                  userData={userData}
                  resumeCount={resumeCount}
                  setResumeCount={setResumeCount}
                  resumeList={resumeList}
                  setResumeList={setResumeList}
                />
              </ScrollElement>
            )}

            <ScrollElement name="About me" className="section">
              <div className="build_ai ai2  ">
                <div className="gap">
                  <p className="page_headings text-[16px] font-semibold">
                    About me
                  </p>
                  <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer">
                    <img
                      style={{ width: "24px" }}
                      src="./images/profile/edit.png"
                      alt=""
                      onClick={handleImageClick}
                      data-modal-target="default-modal"
                      data-modal-toggle="default-modal"
                    />
                  </div>
                </div>

                <p className="content_text break-words">{userData?.summary}</p>
                {isComponentOpen && (
                  <AboutModal
                    handleImageClick={handleImageClick}
                    userData={userData}
                  />
                )}
              </div>
            </ScrollElement>

            <ScrollElement name="Work Experience" className="section">
              <WorkExperiance userData={userData} />
            </ScrollElement>

            <ScrollElement name="Education" className="section">
              <Education userData={userData} />
            </ScrollElement>

            <ScrollElement name="Skills" className="section">
              <Skills
                userData={userData}
                setIsComponentOpen={setIsComponentOpen}
              />
            </ScrollElement>
            {/* <ScrollElement name="Languages" className="section">
              <LanguagesProfile
                userData={userData}
                setIsComponentOpen={setIsComponentOpen}
              />
            </ScrollElement> */}

            <ScrollElement name="Certifications" className="section">
              <Courses userData={userData} />
            </ScrollElement>

            <ScrollElement name="Achievements" className="section ">
              <Achievements userData={userData} />
            </ScrollElement>

            <ScrollElement name="Websites & Social links" className="section">
              <Social_links_ndWebsites userData={userData} />
            </ScrollElement>

            <ScrollElement name="Projects" className="section">
              <Projects userData={userData} />
            </ScrollElement>

            <ScrollElement name="Job Preferences" className="section">
              <JobPrefrence userData={userData} />
            </ScrollElement>

            <ScrollElement name="Personal details" className="section">
              <PersonalDetails userData={userData} />
            </ScrollElement>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
