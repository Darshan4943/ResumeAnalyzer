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
  // const { clientId, continueEdit } = router.query;
  const { clientId, continueEdit } = router.query;
  const currentYear = new Date().getFullYear();

  const templates = [
    {
      title: "Template1",
      imgUrl: "/images/templates/template1.png",
      index: 1,
      fontFamily: "Lato",
      themeColor: "#414042",
    },
    // {
    //   title: "Template2",
    //   imgUrl: "/images/templates/template2.png",
    //   index: 2,
    //   fontFamily: "Barlow",
    //   themeColor: "#F7902B",
    // },
    {
      title: "Template3",
      imgUrl: "/images/templates/template3.png",
      index: 3,
      fontFamily: "Inter",
      themeColor: "#414042",
    },
    {
      title: "Template4",
      imgUrl: "/images/templates/template4.png",
      index: 4,
      fontFamily: "Montserrat",
      themeColor: "#00AEEF",
    },
    // {
    //   title: "Template5",
    //   imgUrl: "/images/templates/template5.png",
    //   index: 5,
    //   fontFamily: "Kanit",
    //   themeColor: "#316059",
    // },
    // {
    //   title: "Template6",
    //   imgUrl: "/images/templates/template6.png",
    //   index: 6,
    //   fontFamily: "Lato",
    //   themeColor: "#FFC20E",
    // },
    // {
    //   title: "Template7",
    //   imgUrl: "/images/templates/template7.png",
    //   index: 7,
    //   fontFamily: "Montserrat",
    //   themeColor: "#0077F9",
    // },
    // {
    //   title: "Template8",
    //   imgUrl: "/images/templates/template8.png",
    //   index: 8,
    //   fontFamily: "Montserrat",
    //   themeColor: "#646464",
    // },
    // {
    //   title: "Template9",
    //   imgUrl: "/images/templates/template9.png",
    //   index: 9,
    //   fontFamily: "Montserrat",
    //   themeColor: "#FFD740",
    // },
    // {
    //   title: "Template10",
    //   imgUrl: "/images/templates/template10.png",
    //   index: 10,
    //   fontFamily: "Inter",
    //   themeColor: "#F2BE5C",
    // },
    {
      title: "Template11",
      imgUrl: "/images/templates/template11.png",
      index: 11,
      fontFamily: "Montserrat",
      themeColor: "#E6E7E8",
    },
    // {
    //   title: "Template12",
    //   imgUrl: "/images/templates/template12.png",
    //   index: 12,
    //   fontFamily: "Lato",
    //   themeColor: "#0C2438",
    // },
    {
      title: "Template13",
      imgUrl: "/images/templates/template13.png",
      index: 13,
      fontFamily: "Poppins",
      themeColor: "#0E6CC2",
    },
    {
      title: "Template14",
      imgUrl: "/images/templates/template14.png",
      index: 14,
      fontFamily: "Inter",
      themeColor: "#242424",
    },
    // {
    //   title: "Template15",
    //   imgUrl: "/images/templates/template15.png",
    //   index: 15,
    //   fontFamily: "Inter",
    //   themeColor: "#716D6D",
    // },
    {
      title: "Template53",
      imgUrl: "/images/templates/template53.png",
      index: 53,
      fontFamily: "Montserrat",
      themeColor: "#AC5428",
    },
    // {
    //   title: "Template17",
    //   imgUrl: "/images/templates/template17.png",
    //   index: 17,
    //   fontFamily: "Montserrat",
    //   themeColor: "#D1D2D3",
    // },
    {
      title: "Template18",
      imgUrl: "/images/templates/template54.png",
      index: 18,
      fontFamily: "Montserrat",
      themeColor: "#242424",
    },
    {
      title: "Template19",
      imgUrl: "/images/templates/template19.png",
      index: 19,
      fontFamily: "Inter",
      themeColor: "#000000",
    },
    // {
    //   title: "Template20",
    //   imgUrl: "/images/templates/template20.png",
    //   index: 20,
    //   fontFamily: "Montserrat",
    //   themeColor: "#303030",
    // },
    {
      title: "Template32",
      imgUrl: "/images/templates/template32.png",
      index: 32,
      fontFamily: "Montserrat",
      themeColor: "#0072BC",
    },
    {
      title: "Template39",
      imgUrl: "/images/templates/template39.png",
      index: 39,
      fontFamily: "Montserrat",
      themeColor: "#303030",
    },
    {
      title: "Template48",
      imgUrl: "/images/templates/template48.png",
      index: 48,
      fontFamily: "Montserrat",
      themeColor: "#F7941D",
    },
    {
      title: "Template44",
      imgUrl: "/images/templates/template44.png",
      index: 44,
      fontFamily: "Inter",
      themeColor: "#C7EAFB",
    },

    {
      title: "Template47",
      imgUrl: "/images/templates/template47.png",
      index: 47,
      fontFamily: "Poppins",
      themeColor: "#27AAE1",
    },
    {
      title: "Template30",
      imgUrl: "/images/templates/template30.png",
      index: 30,
      fontFamily: "Lato",
      themeColor: "#0054A6",
    },
  ];

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
  const [dataFromLocal, setDataFromLocal] = useState([]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("allData"));

    if (storedData) {
      setDataFromLocal(storedData);
    }
  }, []);
  // const [data, setData] = useState({
  //   profilePhoto: null,
  //   designation: dataFromLocal?.designation ? dataFromLocal?.designation : "",
  //   firstName: dataFromLocal?.firstName ? dataFromLocal?.firstName : "",
  //   lastName: dataFromLocal?.lastName ? dataFromLocal?.lastName : "",
  //   mobileNumber: dataFromLocal?.mobileNumber
  //     ? dataFromLocal?.mobileNumber
  //     : "",
  //   email: dataFromLocal?.email ? dataFromLocal?.email : "",
  //   location: dataFromLocal?.location ? dataFromLocal?.location : "",
  //   summary: dataFromLocal?.summary ? dataFromLocal?.summary : "",
  //   showSummary: true,
  //   education: dataFromLocal?.education ? dataFromLocal?.education : [],
  //   showEducation: true,
  //   experience: dataFromLocal?.experience ? dataFromLocal?.experience : [],
  //   showExperience: true,
  //   course: dataFromLocal?.course ? dataFromLocal?.course : [],
  //   showCourse: true,
  //   skills: dataFromLocal?.skills ? dataFromLocal?.skills : [],
  //   achievement: dataFromLocal?.achievement ? dataFromLocal?.achievement : [],
  //   sociaLinks: dataFromLocal?.sociaLinks ? dataFromLocal?.sociaLinks : [],
  //   hobbies: dataFromLocal?.hobbies ? dataFromLocal?.hobbies : [],
  //   languages: dataFromLocal?.languages ? dataFromLocal?.languages : [],
  //   // internship:[],
  //   // reference:[],
  //   section: dataFromLocal?.section ? dataFromLocal?.section : [],
  // });

  // const [data, setData] = useState(() => {
  //   // Check if data exists in localStorage, if not, initialize it with the default state
  //   // const storedData = localStorage.getItem("userData");
  //   // return storedData
  //   //   ? JSON.parse(storedData)
  //   //   : {
  //   //       profilePhoto: null,
  //   //       designation: "",
  //   //       firstName: "",
  //   //       lastName: "",
  //   //       mobileNumber: "",
  //   //       email: "",
  //   //       location: "",
  //   //       summary: "",
  //   //       showSummary: true,
  //   //       education: [],
  //   //       showEducation: true,
  //   //       experience: [],
  //   //       showExperience: true,
  //   //       course: [],
  //   //       showCourse: true,
  //   //       skills: [],
  //   //       achievement: [],
  //   //       sociaLinks: [],
  //   //       hobbies: [],
  //   //       languages: [],
  //   //       section: [],
  //   //     };

  //   if (typeof window !== "undefined") {
  //     // Check if data exists in localStorage, if not, initialize it with the default state
  //     // console.log(274, "i am in");
  //     const storedData = localStorage.getItem("userData");
  //     return storedData
  //       ? JSON.parse(storedData)
  //       : {
  //           profilePhoto: null,
  //           designation: "",
  //           firstName: "",
  //           lastName: "",
  //           mobileNumber: "",
  //           email: "",
  //           location: "",
  //           summary: "",
  //           showSummary: true,
  //           education: [],
  //           showEducation: true,
  //           experience: [],
  //           showExperience: true,
  //           course: [],
  //           showCourse: true,
  //           skills: [],
  //           achievement: [],
  //           sociaLinks: [],
  //           hobbies: [],
  //           languages: [],
  //           section: [],
  //         };
  //   } else {
  //     return {
  //       profilePhoto: null,
  //       designation: "",
  //       firstName: "",
  //       lastName: "",
  //       mobileNumber: "",
  //       email: "",
  //       location: "",
  //       summary: "",
  //       showSummary: true,
  //       education: [],
  //       showEducation: true,
  //       experience: [],
  //       showExperience: true,
  //       course: [],
  //       showCourse: true,
  //       skills: [],
  //       achievement: [],
  //       sociaLinks: [],
  //       hobbies: [],
  //       languages: [],
  //       section: [],
  //     };
  //   }
  // });

  const defaultState = {
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
    selectedResumeIndex: selectedResumeIndex ? selectedResumeIndex : 1,

    createdAt: "",
    clientId: clientId,
  };

  const [data, setData] = useState(defaultState);
  const [isClient, setIsClient] = useState(false);
  const [isDataInLocal, setIsDataInLocal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setIsDataInLocal(true);
        const parsedData = JSON.parse(storedData);

        setSelectedResumeIndex(parsedData.selectedResumeIndex);
        setData(JSON.parse(storedData));
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && clientId == "undefined") {
      setData({
        ...data,

        selectedResumeIndex: selectedResumeIndex,
      });
    }
  }, [selectedResumeIndex]);

  useEffect(() => {
    if (isClient && clientId == "undefined") {
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data, isClient]);

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
      const experience = parsedData["work experience"]
        ? parsedData["work experience"]
        : parsedData.work_experience
          ? parsedData.work_experience
          : [];
      const courses = parsedData.issuing_organization;
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
          languages: item,
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
      } else if (continueEdit) {
      } else {
        setTimeout(() => {
          setSelectedResumeIndex(1);
          setSelectedColor("#414042");
        }, 400);
        if (isDataInLocal === false) {
          parsedDataSeter();
        }
      }
    }
  }, [userData]);
  useEffect(() => {
    setRender(false);
    setTimeout(() => setRender(true), 400);
  }, [data]);


  

  return (
    <div className="bg-[#F9F9F9]">
      <div className="  pt-2 customMargins ">
        <div className="flex flex-col gap-4 py-6 ">
          <div className="web">
            <div className=" h-fit flex gap-6 relative ">
              <div
                className=" w-[40%]  "
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <ResumeForm
                  selectedFont={selectedFont}
                  data={data}
                  setData={setData}
                  selectedResumeIndex={selectedResumeIndex}
                  setSelectedResumeIndex={setSelectedResumeIndex}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                  setSelectedFont={setSelectedFont}
                  template={templates}
                />
              </div>
              <div className="sticky top-[88px]  h-[50rem] w-[60%] ">
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
                  clientId={clientId}
                />
              </div>
            </div>
          </div>

          {isEdit && (
            <AnimatePresence>
              <div className="fixed z-[2000] top-0 right-0 left-0  bottom-0 bg-black opacity-40 "></div>
              <motion.div
                onWheel={(e) => e.stopPropagation()}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5 }}
                ref={taskRef}
                className={`mobile flex flex-col gap-4 z-[2000]  sm:p-4 p-2 rounded-[8px] absolute max-h-[80vh] w-[95%] overflow-x-auto bg-white`}
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
                  template={templates}
                />
              </motion.div>
            </AnimatePresence>
          )}
          <div className="mobile ">
            <div className="flex flex-col gap-6">
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
              clientId={clientId}
            />
            <div className="mobile600">
            <ResumeForm
              data={data}
              setData={setData}
              selectedResumeIndex={selectedResumeIndex}
              setSelectedResumeIndex={setSelectedResumeIndex}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
              template={templates}
            />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
