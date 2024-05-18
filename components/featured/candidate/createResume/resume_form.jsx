import React, { useEffect, useState } from "react";
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

const ResumeForm = ({
  setData,
  data,
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
}) => {
  const [formField, setFormField] = useState([]);
  const [view, setView] = useState(false)
  useEffect(() => {
    setFormField(
      templates.find((item) => item.index == selectedResumeIndex)?.formFields
    );
  }, [selectedResumeIndex]);

  const [course, setCourse] = useState(false)
  const [languages, setLanguages] = useState(false)
  const [hobbies, setHobbies] = useState(false)
  const [achievement, setAchievement] = useState(false)
  const [intern, setIntern] = useState(false)
  const [showReference, setShowReference] = useState(false)

  return (
    <>
      <div className="flex flex-col pr-[10px] ml:w-[100%] w-[100%]  pb-4 gap-4 rounded-lg ">
        <ResumeList setData={setData} data={data} />
        <ThemeForm
          selectedResumeIndex={selectedResumeIndex}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
        />
        <PersonalDetails setData={setData} data={data} />
        <AboutMe setData={setData} data={data} />
        <Education setData={setData} data={data} />
        <Experience setData={setData} data={data} />


        <Course setData={setData} data={data} />

        <Skills setData={setData} data={data} />

        {/* <Achievement setData={setData} data={data} /> */}

        {/* {formField?.includes("socialLinks") && (
          <SocialLink setData={setData} data={data} />
        )} */}
        {formField?.includes("hobbies") && (
          <Hobbie setData={setData} data={data} />
        )}
        {formField?.includes("language") && (
          <Languages setData={setData} data={data} />
        )}
        {data?.section?.length > 0 && (
          <>
            {data?.section?.map((item, index) => (
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
            ))}
          </>
        )}
        <div className="flex items-center gap-2 justify-end">
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
            className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2">+</span> Add Section


          </div>

          {/* <div onClick={() => setCourse(!course)} className=" font-montserrat text-white font-medium text-[14px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] flex items-center cursor-pointer "
          >
            <span className="text-[22px] mr-2" >+</span> course

          </div> */}

        </div>

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
