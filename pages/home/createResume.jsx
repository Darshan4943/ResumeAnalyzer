import React, { useEffect, useRef, useState } from "react";
import { ClosedIcon, ClosedIcon1, LeftArow } from "../../utils/svg";
import ResumeForm from "../../components/featured/candidate/createResume/resume_form";
import ResumePreview from "../../components/featured/candidate/createResume/resume_preview";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { camelCase } from "../../utils/middleware";
import axios from "axios";

function CreateResume() {
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedResumeIndex, setSelectedResumeIndex] = useState();
  const [render, setRender] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const taskRef = useRef(null);
  const router = useRouter();
  const [editId, setEnditId] = useState();
  const userData = router.query;
  const { clientId } = router.query;
  const currentYear = new Date().getFullYear();
  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      isSetEdit(false);
    }
  };
  useEffect(() => {
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
    section: [],
  });
  function extractMobileNumber(inputString) {
    var regex = /[0-9]{10}/g;

    var matches = inputString.slice(3, 14).match(regex);
    return matches ? matches[0] : null;
  }
  const parsedDataSeter = () => {
    const parsedData = JSON.parse(localStorage.getItem("parsedResume"));
    if (parsedData) {
      const {
        first_name,
        last_name,
        email,
        mobileNo,
        designation,
        summary,
        address,
        skills,
      } = parsedData;
      const languages = parsedData.languages;
      const educations = parsedData.education;
      const experience = parsedData["work experience"];
      const courses = parsedData.issuing_organization;
      console.log(experience);
      setData({
        ...data,
        clientId: clientId ? clientId : null,
        firstName: first_name,
        lastName: last_name,
        email: email,
        dial_code: null,
        mobileNumber: mobileNo,
        designation: designation,
        summery: summary,
        location: address,
        skills: skills?.map((item) => ({
          skill: item,
          rating: [5, 5, 5, 5, 5],
        })),
        languages: languages?.map((item) => ({
          languages: item.name,
          rating: [3, 3, 3],
        })),
        education: educations?.map((item) => ({
          qualification: item.courseName,
          specialization: item["Specialization/Board"],
          instituteName: item["University Name"],
          type: "full-time",
          location: "",
          duration: {
            start: {
              year: item.start_year ? item.start_year : currentYear,
              month: null,
            },
            end: {
              year: item.end_year ? item.end_year : currentYear,
              month: null,
            },
          },
        })),
        experience: experience?.map((item) => ({
          designation: item.title,
          organization: item.company,
          description: item.description,
          currentlyWorking: false,
          location: item.location,
          duration: {
            start: { year: item.start_date?.year, month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year,
              month: null,
            },
          },
        })),
        course: courses?.map((item) => ({
          courseName: "",
          issuedBy: item.issuing_organization,
          discription: item.description,
        })),
      });
    } else if (clientId) {
      axios
        .get(`https://freedygoservices.in/api/client/getByClientId/${clientId}`)
        .then((res) => {
          const result = res.data.data;
          setData({
            ...data,
            clientId,
            designation: result.designation,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            location: result.location,
            mobileNumber: result.mobileNo,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData.isEdit) {
        const parsedData = JSON.parse(userData.data);
        setData({ ...data, ...parsedData });
        setSelectedResumeIndex(parsedData.resumeTemplateIndex);
        setSelectedColor(parsedData.selectedColor);
        setSelectedFont(parsedData.selectedFont);
        setEnditId(parsedData._id);
      } else {
        setTimeout(() => {
          setSelectedResumeIndex(1);
          setSelectedColor("#414042");
        }, 400);
        parsedDataSeter();
      }
    }
  }, [userData]);
  useEffect(() => {
    setRender(false);
    setTimeout(() => setRender(true), 400);
  }, [data]);
  return (
    <div>
      <div className=" bg-[#F9F9F9] pt-2 customMargins ">
        <div className="flex flex-col gap-4 py-6 ">
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
                isEdit={userData.isEdit}
                id={editId}
                render={render}
              />
            </div>
          </div>

          {isEdit && (
            <AnimatePresence>
              <div className="fixed z-[2000] top-0 right-0 left-0  bottom-0 bg-black opacity-40 "></div>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
                ref={taskRef}
                className={`mobile flex flex-col gap-4 z-[2000]  p-4 rounded-[8px] absolute max-h-[80vh] w-[95%] overflow-x-auto bg-white`}
              >
                <div className="flex justify-between  text-[18px] font-semibold">
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
              isEdit={userData.isEdit}
              id={editId}
              render={render}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
