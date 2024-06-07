import React, { useEffect, useRef, useState } from "react";
import ResumeList from "./components/my_resume";
import PersonalDetails from "./components/personal_details";
import AboutMe from "./components/about_me";
import Education from "./components/education";
import Experience from "./components/experience";
import Course from "./components/course";
import Skills from "./components/skills";
import Achievement from "./components/achivement";
import SocialLink from "./components/social_link";
import Hobbie from "./components/hobbie";
import Languages from "./components/languages";
import ThemeForm from "./components/themeForm";
import { templates } from "../../../../utils/data";
import AddSection from "./components/addSection";
import Internships from "./components/internShips";
import Reference from "./components/reference";
import AddNewSectionContainer from "./components/addNewSectionContainer";
import CustomSection from "./components/customSection";
import ExtraCaricularActivity from "./components/extraCaricularActivity";
import CouersesAndCertification from "./components/couersesAndCertification";
import ProjectSection from "./components/projectSection";
import Project from "./components/projects";

const ResumeForm = ({
  setData,
  data,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
  template,
}) => {
  const [formField, setFormField] = useState([]);
  const [view, setView] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, customSection: !isChecked });
  };
  useEffect(() => {
    setFormField(
      templates.find((item) => item.index == selectedResumeIndex)?.formFields
    );
  }, [selectedResumeIndex]);

  const hobbiesRef = useRef(null);
  const languagesRef = useRef(null);
  const achievementsRef = useRef(null);
  const socialLinksRef = useRef(null);
  const referenceRef = useRef(null);
  const projectRef = useRef(null);
  const internshipRef = useRef(null);
  const extraCurricularRef = useRef(null);
  const coursesRef = useRef(null);
  const customRef = useRef(null);

  // const scrollToSection = (ref) => {
  //   if (ref.current) {
  //     console.log("current", ref.current);
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };


  const [achievementView, setAchievementView] = useState(false);
  const [referenceView, setReferenceView] = useState(false);
  const [linkView, setLinkView] = useState(false);
  const [projectView, setProjectView] = useState(false);
  const [internshipsView, setInternshipsView] = useState(false);
  const [extraCurricularView, setExtraCurricularView] = useState(false);
  const [coursesView, setCoursesView] = useState(false);
  const [customSectionView, setCustomSectionView] = useState(false);

  const [course, setCourse] = useState(false);
  const [languages, setLanguages] = useState(false);
  const [hobbies, setHobbies] = useState(false);
  const [achievement, setAchievement] = useState(false);
  const [intern, setIntern] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const [showingSection, setShowingSection] = useState([]);

  const [customOptions, setCustomOptions] = useState({
    Hobbies: false,
    Languages: false,
    "Achievements & Awards": false,
    References: false,
    Links: false,

    "Extra Activities": false,
    "Courses & Certifications": false,
    Internships: false,
    Project: false,
    "Custom Section": false,
  });

  const [viewAllSection, setViewAllSection] = useState({
    Hobbies: false,
    Languages: false,
    "Achievements & Awards": false,
    References: false,
    Links: false,

    "Extra Activities": false,
    "Courses & Certifications": false,
    Internships: false,
    Project: false,
    "Custom Section": false,
  });

  const handleImageClick = (template) => {
    togglePreview(true, template.index);
    setSelectedColor(template.themeColor);
    setSelectedFont(template.fontFamily);
  };

  const [scrollTarget, setScrollTarget] = useState(null);

  const scrollToSection = (ref) => {
    setScrollTarget(ref);
  };

  useEffect(() => {
    if (scrollTarget && scrollTarget.current) {
      scrollTarget.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setScrollTarget(null); // Reset the target after scrolling
    }
  }, [scrollTarget]);

  const togglePreview = (isVisible, index) => {
    setSelectedResumeIndex(index);
  };

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsAll(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const renderTemplates = () => {
    const selectedStyle = {
      border: " 4px solid #06A9EF",

      height: " 210px",
      width: "auto",
    };
    return template.map((template, index) => (
      <img
        style={selectedResumeIndex == template.index ? selectedStyle : {}}
        key={index}
        src={template.imgUrl}
        className="h-[200px] w-[140.91px] rounded-[6px]"
        alt=""
        onClick={() => handleImageClick(template)}
      />
    ));
  };

  const renderAllTemplates = () => {
    return template.map((template, index) => (
      <img
        key={index}
        src={template.imgUrl}
        className="h-[330px] w-[234px] rounded-[6px] transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }}
        alt=""
        onClick={() => {
          handleImageClick(template);
          setIsAll(false);
        }}
      />
    ));
  };

  console.log(126, customOptions);

  return (
    <>
      <div className="flex flex-col pr-[10px] ml:w-[100%] w-[100%]  pb-4 gap-4 rounded-lg ">
        <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
          <div
            className="flex gap-4 pb-[10px]  items-center"
            style={{ overflowX: "auto" }}
          >
            {renderTemplates()}
          </div>
        </div>

        <div
          onClick={() => setIsAll(true)}
          className="flex justify-end text-[16px] font-[500] text-[#06A9EF] cursor-pointer"
        >
          See All Templates
        </div>
        {isAll && (
          <div>

            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
              <div
                ref={taskRef}
                onWheel={(e) => e.stopPropagation()}
                className=" absolute top-[42px] flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center ml:w-[65%] w-[90%] h-[90vh] overflow-y-auto "
              >
                {renderAllTemplates()}
                <div className="absolute top-[12px] right-[10px]  cursor-pointer  web "
                  onClick={() => setIsAll(false)}
                >

                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <g mask="url(#mask0_3995_39638)">
                      <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#333333" />
                    </g>
                  </svg>
                </div>

              </div>
              <div className="absolute bottom-[35px] mobile cursor-pointer  "
                onClick={() => setIsAll(false)}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_3995_39637)">
                    <rect x="4" y="3" width="40" height="40" rx="20" fill="white" />

                    <g mask="url(#mask0_3995_39637)">
                      <path d="M18.4 30L17 28.6L22.6 23L17 17.4L18.4 16L24 21.6L29.6 16L31 17.4L25.4 23L31 28.6L29.6 30L24 24.4L18.4 30Z" fill="#333333" />
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_3995_39637" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3995_39637" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3995_39637" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        )}

        <ThemeForm
          selectedResumeIndex={selectedResumeIndex}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
        />
        <div className="border-b border-r border-l border-[#DEDEDE] shadow-custom"></div>

        <ResumeList setData={setData} data={data} />
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>

        <PersonalDetails
          setData={setData}
          data={data}
          selectedResumeIndex={selectedResumeIndex}
          selectedColor={selectedColor}
          selectedFont={selectedFont}
        />
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>

        <AboutMe setData={setData} data={data} />
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>
        <Education setData={setData} data={data} />
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>
        <Experience setData={setData} data={data} />

        {/* <Course setData={setData} data={data} /> */}
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>

        <Skills setData={setData} data={data} />
        <div className="border-b border-r border-l border-[#DEDEDE]"></div>

        {/* {(data?.customDataSection?.length > 0 ||
          customOptions["Custom Section"]) && (
          <>
            <CustomSection
              setData={setData}
              data={data}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
            />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )} */}

        {(data?.achievements?.length > 0 ||
          customOptions["Achievements & Awards"]) && (
            <div ref={achievementsRef}>

              <>
                <Achievement
                  setData={setData}
                  data={data}
                  achievementView={achievementView}
                  setAchievementView={setAchievementView}
                  setCustomOptions={setCustomOptions}
                />
                <div className="border-b border-r border-l border-[#DEDEDE]"></div>
              </>

            </div>
          )}
        {(data?.socialLinks?.length > 0 || customOptions?.Links) && (
          <div ref={socialLinksRef}>

            <>
              <SocialLink setData={setData} data={data} linkView={linkView} setLinkView={setLinkView} setCustomOptions={setCustomOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}


        {(data?.languages?.length > 0 || customOptions?.Languages) && (
          <div ref={languagesRef}>

            <>
              <Languages setData={setData} data={data} setCustomOptions={setCustomOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}
        {(data?.hobbies?.length > 0 || customOptions?.Hobbies) && (
          <div ref={hobbiesRef}>

            <>
              <Hobbie setData={setData} data={data} setCustomOptions={setCustomOptions} customOptions={customOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}
        {(data?.reference?.length > 0 || customOptions?.References) && (
          <div ref={referenceRef}>

            <>
              <Reference setData={setData} data={data} referenceView={referenceView} setReferenceView={setReferenceView} setCustomOptions={setCustomOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}
        {(data?.project?.length > 0 || customOptions?.Project) && (
          <div ref={projectRef}>

            <>
              <Project setData={setData} data={data} projectView={projectView} setProjectView={setProjectView} setCustomOptions={setCustomOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}
        {(data?.internship?.length > 0 || customOptions["Internships"]) && (
          <div ref={internshipRef}>

            <>
              <ProjectSection setData={setData} data={data} internshipsView={internshipsView} setInternshipsView={setInternshipsView} setCustomOptions={setCustomOptions} />
              <div className="border-b border-r border-l border-[#DEDEDE]"></div>
            </>

          </div>
        )}
        {(data?.ExtraCaricularActivity?.length > 0 ||
          customOptions["Extra Activities"]) && (
            <div ref={extraCurricularRef}>

              <>
                <ExtraCaricularActivity
                  setData={setData}
                  data={data}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  extraCurricularView={extraCurricularView}
                  setExtraCurricularView={setExtraCurricularView}

                />
                <div className="border-b border-r border-l border-[#DEDEDE]"></div>
              </>

            </div>
          )}
        {(data?.course?.length > 0 ||
          customOptions["Courses & Certifications"]) && (
            <div ref={coursesRef}>

              <>
                <CouersesAndCertification setData={setData} data={data} coursesView={coursesView} setCoursesView={setCoursesView} setCustomOptions={setCustomOptions} />
                <div className="border-b border-r border-l border-[#DEDEDE]"></div>
              </>

            </div>
          )}
        {/* {customOptions["Custom Section"] && ( */}
        {data?.section.length > 0 &&
          <div ref={customRef}>
            <div className="text-[20px] flex justify-between font-medium pt-4">
              Custom Sections
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleSwitchChange}
                />
                <span className="slider round"></span>
              </label>

            </div>
            {data?.section?.map((item, index) => (
              <div key={index}>
                <AddSection
                  section={item.subSection}
                  formData={item.subSection[0]}
                  data={data}
                  setData={setData}
                  index={index}
                  item={item}
                  customSectionView={customSectionView}
                  setCustomSectionView={setCustomSectionView}
                  setCustomOptions={setCustomOptions}
                />

                <div className="border-b border-r border-l border-[#DEDEDE]"></div>
              </div>
            ))}
          </div>
        }
        {/* )} */}

        <AddNewSectionContainer
          setData={setData}
          data={data}
          customOptions={customOptions}
          setCustomOptions={setCustomOptions}
          setShowingSection={setShowingSection}
          showingSection={showingSection}
          hobbiesRef={hobbiesRef}
          languagesRef={languagesRef}
          achievementsRef={achievementsRef}
          socialLinksRef={socialLinksRef}
          referenceRef={referenceRef}
          projectRef={projectRef}
          internshipRef={internshipRef}
          extraCurricularRef={extraCurricularRef}
          coursesRef={coursesRef}
          customRef={customRef}
          scrollToSection={scrollToSection}
          achievementView={achievementView}
          setAchievementView={setAchievementView}
          setLinkView={setLinkView}
          setCustomSectionView={setCustomSectionView}
          setCoursesView={setCoursesView}
          setExtraCurricularView={setExtraCurricularView}
          setInternshipsView={setInternshipsView}
          setProjectView={setProjectView}
          setReferenceView={setReferenceView}
          customSectionView={customSectionView}
        />

        {/* <Achievement setData={setData} data={data} /> */}

        {/* {formField?.includes("socialLinks") && (
          <SocialLink setData={setData} data={data} />
        )} */}
        {/* {formField?.includes("hobbies") && (
          <>
            <Hobbie setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )} */}

        {/* {formField?.includes("language") && (
          <Languages setData={setData} data={data} />
        )} */}
        {/* {data?.section?.length > 0 && (
          <>
            {data?.section?.map((item, index) => (
              <>
                <div key={index}>
                  <AddSection
                    section={item.subSection}
                    formData={item.subSection[0]}
                    data={data}
                    setData={setData}
                    index={index}
                    item={item}
                  />
                </div>
                <div className="border-b border-r border-l border-[#DEDEDE]"></div>
              </>
            ))}
          </>
        )} */}

        {/* <div className="flex items-center gap-2 justify-end">
          <div
            onClick={() => {
              setData({
                ...data,
                section: [
                  ...data?.section,
                  {
                    header: "",
                    subSection: [],
                  },
                ],
              });
            }}
            className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer btn_hover_effect "
          >
            <span className="text-[22px] mr-2">+</span> Add Section
          </div> */}

        {/* <div onClick={() => setCourse(!course)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> course

          </div> */}
        {/* </div> */}

        {/* <Course setData={setData} data={data} view={view} course={course} setCourse={setCourse} />


        <div className="flex items-center gap-2 justify-end">
          <div onClick={() => setLanguages(!languages)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> Languages


          </div>

        </div>
        {
          languages && <Languages setData={setData} data={data} view={view} languages={languages} setLanguages={setLanguages} />
        }

        <div className="flex items-center gap-2 justify-end">
          <div onClick={() => setHobbies(!hobbies)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> Hobbies


          </div>

        </div>
        {
          hobbies && <Hobbie setData={setData} data={data} view={view} hobbies={hobbies} setHobbies={setHobbies} />
        }

        <div className="flex items-center gap-2 justify-end">
          <div onClick={() => setAchievement(!achievement)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> Achievements


          </div>

        </div>
        {
          achievement && <Achievement setData={setData} data={data} view={view} achievement={achievement} setAchievement={setAchievement} />
        }

        <div className="flex items-center gap-2 justify-end">
          <div onClick={() => setIntern(!intern)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> Internships


          </div>

        </div>
        {
          intern && <Internships setData={setData} data={data} view={view} intern={intern} setIntern={setIntern} />
        }


        <div className="flex items-center gap-2 justify-end">
          <div onClick={() => setShowReference(!showReference)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> Reference

          </div>

        </div>
        {
          showReference && <Reference setData={setData} data={data} view={view} showReference={showReference} setShowReference={setShowReference} />
        } */}
      </div>
    </>
  );
};

export default ResumeForm;
