
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


function Profile() {
  const { userDataGlobal, profileData } = useSelector((state) => state.user.userData);
  const [resumeCount, setResumeCount] = useState(1)
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

    "Job Prefrence",
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
  function mapPercentageToDegree(percentage) {
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    const degree = 90 + (clampedPercentage / 100) * 270;
    return degree;
  }
  const containerStyle = {
    backgroundImage: `linear-gradient(${mapPercentageToDegree(
      userData?.profileScore?.toFixed(0)
    )}deg, transparent 50%, #f0f0f0 50%), linear-gradient(90deg, #f0f0f0 50%, transparent 50%)`,
  };

  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleImageClick = () => {
    setIsComponentOpen(!isComponentOpen);
  };

  

  return (
    <div className="">
      <div>{<ProfileHeader userData={userData} />}</div>

      <div className="customMargins relative pb-6">
        <div className="ml:flex ml:flex-row flex flex-col mt-[24px] gap-[24px]">
          <div className="profile_left_section ml:sticky ml:top-[84px] max-w-[262px]">
            <div className="score_all">
              <div className="profile_score">
                <div class="circle-border" style={containerStyle}>
                  <div class="circle">
                    <p className="profile_percent">
                      {userData?.profileScore?.toFixed(0)} %
                    </p>
                  </div>
                </div>
                {/* <img src="./images/profile/Ellipse_24.png" alt="" />
                <img
                  src="./images/profile/Ellipse_25.png"
                  className="eclips_25"
                  alt=""
                /> */}
                {/* <p className="profile_percent">
                  {userData.profileScore?.toFixed(0)} %
                </p> */}
              </div>

              <div className="profile_right_section profile_align">
                <p className="profile_score_text">Profile Score</p>
                <p className="improve_text">
                  Improve your profile score, to get more recruiter attention.
                </p>
              </div>
            </div>

            <div className="profile_option heroBlock">
              {arr.map((item) => (
                <ScrollLink
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
            <div className="build_ai w-[100%] flex_column">
              <div className="build_ai_left  w-fit">
                <div className="flex flex-row w-[100%] ">
                  <div className="w-[50%] md:w-fit">
                    <img className="w-[152px] h-[152px]" src="./images/profile/Wavy_Bus.png" alt="" />
                  </div>
                  <div className="flex flex-col gap-[10px] w-[50%] items-center justify-center build_ai_block">
                    <ALink href={"/candidate/create_resume"}>
                      <button className="build_ai_button p-[10px] text-[10px] ms:px-[23px] ms:py-[12px]">
                        Create New Resume
                      </button>
                    </ALink>
                    <button className="build_ai_button p-[10px] text-[10px] ms:px-[23px] ms:py-[12px]">
                      Download Resume
                    </button>
                  </div>
                </div>
              </div>

              <div className="build_ai_right">
                <p className=" text-[20px] font-[500]">Build AI Powered Resume</p>
                <div className=" flex gap-3 items-center w-full ">
                  <p className=" text-[12px] font-[500] ">Professional Templates</p>
                  <div className="h-[12px] min-w-[1px] w-[1px] bg-[#AFAFAF] "></div>
                  <p className=" text-center text-[12px] font-[500] ">AI suggestion</p>
                  <div className="h-[12px] min-w-[1px] w-[1px] bg-[#AFAFAF] "></div>
                  <p className="text-center text-[12px] font-[500]">Preview</p>
                </div>

                <p className="text-[12px] font-[400]">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </p>

                <div className="build_ai_button_parent build_ai_none">
                  <ALink href={"/candidate/create_resume"}>
                    <button className="bg-blue text-[#FFFFFF] border border-blue rounded-[8px]  px-3 py-2 text-[12px] font-semibold leading-tight">
                      Create New Resume
                    </button>
                  </ALink>

                  <button className=" border border-blue rounded-[8px]  px-3 py-2 text-[12px] font-medium leading-tight">Download Resume</button>
                </div>
              </div>
            </div>
            {resumeCount > 0 &&
              <ScrollElement name="My Resume" className="section">
                <ResumeList userData={userData} resumeCount={resumeCount} setResumeCount={setResumeCount} />
              </ScrollElement>
            }

            <ScrollElement name="About me" className="section">
              <div className="build_ai ai2  ">
                <div className="gap">
                  <p className="page_headings text-[18px] scr420:text-[20px]">About me</p>
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                    onClick={handleImageClick}
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                  />
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

            <ScrollElement name="Job Prefrence" className="section">
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
