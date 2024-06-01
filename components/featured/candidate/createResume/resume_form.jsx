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
  useEffect(() => {
    setFormField(
      templates.find((item) => item.index == selectedResumeIndex)?.formFields
    );
  }, [selectedResumeIndex]);

  const [course, setCourse] = useState(false);
  const [languages, setLanguages] = useState(false);
  const [hobbies, setHobbies] = useState(false);
  const [achievement, setAchievement] = useState(false);
  const [intern, setIntern] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const [customOptions, setCustomOptions] = useState({
    "Custom Section": false,
    "Extra-Curriculum Activities": false,
    "Courses & Certifications": false,
    "Internships & Projects": false,
    Hobbies: false,
    Languages: false,
    "Achievements & Awards": false,
    References: false,
    "Social Links": false,
  });

  const handleImageClick = (template) => {
    togglePreview(true, template.index);
    setSelectedColor(template.themeColor);
    setSelectedFont(template.fontFamily);
  };

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
                className=" absolute top-[72px] flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center ml:w-[65%] w-[90%] h-[90vh] overflow-y-auto "
              >
                {renderAllTemplates()}
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
{/* 
        {(data?.customDataSection?.length > 0 ||
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
        )}

        {(data?.ExtraCaricularActivity?.length > 0 ||
          customOptions["Extra-Curriculum Activities"]) && (
          <>
            <ExtraCaricularActivity
              setData={setData}
              data={data}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
            />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}
        {(data?.course?.length > 0 ||
          customOptions["Courses & Certifications"]) && (
          <>
            <CouersesAndCertification setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}
        {(data?.project?.length > 0 ||
          customOptions["Internships & Projects"]) && (
          <>
            <ProjectSection setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}
        {(data?.hobbies?.length > 0 || customOptions.Hobbies) && (
          <>
            <Hobbie setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        {(data?.languages?.length > 0 || customOptions.Languages) && (
          <>
            <Languages setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        {(data?.achievement?.length > 0 ||
          customOptions["Achievements & Awards"]) && (
          <>
            <Achievement setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        {(data?.reference?.length > 0 || customOptions.References) && (
          <>
            <Reference setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        {(data?.sociaLinks?.length > 0 || customOptions["Social Links"]) && (
          <>
            <SocialLink setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        <AddNewSectionContainer
          setData={setData}
          data={data}
          customOptions={customOptions}
          setCustomOptions={setCustomOptions}
        /> */}

        {/* <Achievement setData={setData} data={data} /> */}

        {/* {formField?.includes("socialLinks") && (
          <SocialLink setData={setData} data={data} />
        )} */}
        {formField?.includes("hobbies") && (
          <>
            <Hobbie setData={setData} data={data} />
            <div className="border-b border-r border-l border-[#DEDEDE]"></div>
          </>
        )}

        {formField?.includes("language") && (
          <Languages setData={setData} data={data} />
        )}
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
