import Courses from "@/components/featured/candidate/profile/courses";
import Education from "@/components/featured/candidate/profile/education";
import JobPrefrence from "@/components/featured/candidate/profile/job_preferance";
import PersonalDetails from "@/components/featured/candidate/profile/personal_details";
import ProfileHeader from "@/components/featured/candidate/profile/profile_header";
import ResumeList from "@/components/featured/candidate/profile/resume_list";
import Skills from "@/components/featured/candidate/profile/skills";
import WorkExperiance from "@/components/featured/candidate/profile/work_experience";
import AboutModal from "@/components/featured/candidate/profile/modals/about_modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link as ScrollLink,
  Element as ScrollElement,
  scroller,
} from "react-scroll";
import ALink from "../../components/alink";
import Social_links_ndWebsites from "@/components/featured/candidate/profile/Social_links_ndWebsites";
import Achievements from "@/components/featured/candidate/profile/Achievements";
import Projects from "@/components/featured/candidate/profile/Projects";

function Profile() {
  const userDataGlobal = useSelector((state) => state.userData);
  // console.log(userDataGlobal)
  const [userData, setUserData] = useState(false);
  const [selectedTab, setSelectedTab] = useState("My Resume");
  const arr = [
    "My Resume",
    "About me",
    "Work Experience",
    "Education",
    "Skills",
    "Trainings",
    "Websites & Social links",
    "Projects",
    "Achievements",
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
    setUserData(userDataGlobal);
  }, [userDataGlobal]);
  function mapPercentageToDegree(percentage) {
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    const degree = 90 + (clampedPercentage / 100) * 270;
    return degree;
  }
  const containerStyle = {
    backgroundImage: `linear-gradient(${mapPercentageToDegree(
      userData.profileScore?.toFixed(0)
    )}deg, transparent 50%, #f0f0f0 50%), linear-gradient(90deg, #f0f0f0 50%, transparent 50%)`,
  };

  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleImageClick = () => {
    setIsComponentOpen(!isComponentOpen);
  };

  return (
    <div className="bg-[#F9F9F9]">
      <div>{userData && <ProfileHeader userData={userData} />}</div>

      <div className="customMargins relative pb-6">
        <div className="flex mt-[24px] gap-[24px]">
          <div className="profile_left_section sticky top-[7rem]">
            <div className="score_all">
              <div className="profile_score">
                <div class="circle-border" style={containerStyle}>
                  <div class="circle">
                    <p className="profile_percent">
                      {userData.profileScore?.toFixed(0)} %
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

              <div className="profile_right_section ">
                <p className="profile_score_text">Profile Score</p>
                <p className="improve_text">
                  Improve your profile score, to get more recruiter attention.
                </p>
              </div>
            </div>

            <div className="profile_option">
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
                    className={`profile_option_menu  ${
                      selectedTab == item && "profile_option_menu-selected"
                    }`}
                  >
                    <p className="my_resume">{item}</p>
                  </div>
                </ScrollLink>
              ))}
            </div>
          </div>

          <div className="profile_right ">
            <div className="build_ai">
              <div className="build_ai_left">
                <img src="./images/profile/Wavy_Bus.png" alt="" />
              </div>

              <div className="build_ai_right">
                <p className="build_heading">Build AI Powered Resume</p>
                <div className="prof_template">
                  <p className="prof_template">Professional Templates</p>
                  <div className="verti_line"></div>
                  <p className="prof_template">AI suggestion</p>
                  <div className="verti_line"></div>
                  <p className="prof_template">Preview</p>
                </div>

                <p className="content_text">
                  Use our pre-designed resume template, customized to your
                  Skilotech profile, or quickly create your own CV.
                </p>

                <div className="build_ai_button_parent">
                  <ALink href={"/candidate/create_resume"}>
                    <button className="build_ai_button">
                      Create New Resume
                    </button>
                  </ALink>

                  {/* <button className="build_ai_button">Download Resume</button> */}
                </div>
              </div>
            </div>

            <ScrollElement name="My Resume" className="section">
              <ResumeList userData={userData} />
            </ScrollElement>

            <ScrollElement name="About me" className="section">
              <div className="build_ai ai2  ">
                <div className="gap">
                  <p className="page_headings">About me</p>
                  <img
                    style={{ width: "24px" }}
                    src="./images/profile/edit.png"
                    alt=""
                    onClick={handleImageClick}
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                  />
                </div>

                <p className="content_text break-all">{userData?.summary}</p>
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

            <ScrollElement name="Trainings" className="section">
              <Courses userData={userData} />
            </ScrollElement>

            <ScrollElement name="Websites & Social links" className="section">
              <Social_links_ndWebsites userData={userData} />
            </ScrollElement>

            <ScrollElement name="Project" className="section">
              <Projects userData={userData} />
            </ScrollElement>


            <ScrollElement name="Achievements" className="section ">
              <Achievements userData={userData} />
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
