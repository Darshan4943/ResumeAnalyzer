import React, { useEffect, useRef, useState } from "react";
import { ClosedIcon, ClosedIcon1, LeftArow } from "../../utils/svg";
import ResumeForm from "../../components/featured/candidate/createResume/resume_form";
import ResumePreview from "../../components/featured/candidate/createResume/resume_preview";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function CreateResume() {
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedResumeIndex, setSelectedResumeIndex] = useState();
  const userDataGlobal = useSelector((state) => state.userData);
  const taskRef = useRef(null);
  const router = useRouter();

  const userData = router.query;
 console.log(19,userData)

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      isSetEdit(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSelectedResumeIndex(1);
    }, 1000);

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [isEdit, isSetEdit] = useState(false);

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
 

  useEffect(() => {
    if (userData?.resumeUrl) {
      const { education, workExperiance, courses } = userData;
      const EducationDataToSet = education.map((element) => {
        const { institute, duration, stream, specialization, type } = element;
        return {
          qualification: stream,
          specialization,
          instituteName: institute,
          type: type == "fullTime" ? "full-time" : "part-time",
          location: "",
          duration: {
            start: {
              year: duration?.startDate?.years,
              month: duration?.startDate?.months,
            },
            end: {
              year: duration?.endDate?.years,
              month: duration?.endDate?.months,
            },
          },
        };
      });

      const ExperianceDataToSet = workExperiance.map((element) => {
        const {
          isCurrent,
          companyName,
          jobLocation,
          workDescription,
          jobDuration,
          jobTitle,
        } = element;
        return {
          designation: jobTitle,
          organization: companyName,
          description: workDescription,
          currentlyWorking: isCurrent,
          location: jobLocation,
          duration: {
            start: jobDuration?.startDate,
            end: jobDuration?.endDate,
          },
        };
      });
      const CourseDataToSet = courses.map((element) => {
        const { name, organization, issuedDate, expiryDate } = element;
        return {
          courseName: name,
          issuedBy: organization,
          discription: "",
          duration: {
            start: issuedDate,
            end: expiryDate,
          },
        };
      });
      setData({
        ...data,
        education: EducationDataToSet,
        experience: ExperianceDataToSet,
        course: CourseDataToSet,
      });
    }
  }, [userData]);

  return (
    <div>
      <div className=" bg-[#F9F9F9] pt-2 px-6">
        <div className="flex flex-col gap-4 py-6 customMargins">
          <div className="web">
            <div className=" h-fit flex gap-6 ">
              <ResumeForm
                data={data}
                setData={setData}
                selectedResumeIndex={selectedResumeIndex}
                setSelectedResumeIndex={setSelectedResumeIndex}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
              />
              <ResumePreview
                data={data}
                selectedResumeIndex={selectedResumeIndex}
                setSelectedResumeIndex={setSelectedResumeIndex}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
                s
              />
            </div>
          </div>

          {isEdit && (
            <AnimatePresence>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-40"></div>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
                ref={taskRef}
                className={`mobile flex flex-col gap-4 z-[2000] mr-2 py-2 rounded-[8px] absolute max-h-[80vh] overflow-x-auto bg-white`}
              >
                <div className="flex justify-between px-4 text-[18px] font-semibold">
                  Edit
                  <div
                    className="h-[24px] w-[24px]"
                    onClick={() => isSetEdit(false)}
                  >
                    <ClosedIcon1 />
                  </div>
                </div>
                <ResumeForm
                  data={data}
                  setData={setData}
                  selectedResumeIndex={selectedResumeIndex}
                  setSelectedResumeIndex={setSelectedResumeIndex}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                  setSelectedFont={setSelectedFont}
                  selectedFont={selectedFont}
                />
              </motion.div>
            </AnimatePresence>
          )}
          <div className="mobile">
            <ResumePreview
              data={data}
              isSetEdit={isSetEdit}
              selectedResumeIndex={selectedResumeIndex}
              setSelectedResumeIndex={setSelectedResumeIndex}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
