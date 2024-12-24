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
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const taskRef = useRef(null);
  const router = useRouter();
  const [editId, setEnditId] = useState();
  const userData = router.query;
  // const { clientId, continueEdit } = router.query;
  const { clientId, continueEdit } = router.query;
  const currentYear = new Date().getFullYear();
  const allData = JSON.parse(localStorage.getItem("userData"));
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
    showSkills: true,
    showAchievements: true,
    showProfile: true,
    showCourses: true,
    showExtraCariculam: true,
    showHobbies: true,
    showInternship: true,
    showLanguage: true,
    showLinks: true,
    showCustomSection: true,
    showProject: true,
    showReference: true,
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
    achievements: [],
    socialLinks: [],
    hobbies: [],
    languages: [],
    section: [],
    selectedResumeIndex: selectedResumeIndex ? selectedResumeIndex : 1,
    reference: [],
    project: [],
    internship: [],
    extraCaricularData: [],
    createdAt: "",
    customDataSection: [],
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

  const resumeData = {
    selectedColor: selectedColor,
    selectedFont: selectedFont,
    selectedResumeIndex: selectedResumeIndex,
  };

  useEffect(() => {
    if (isClient && clientId == "undefined") {
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    }
  }, [data, isClient, selectedColor, selectedFont, selectedResumeIndex]);

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
      const languages = parsedData?.languages;
      const hobbies = parsedData?.hobbies;

      const educations = parsedData.education;

      const experience = parsedData["work experience"]
        ? parsedData["work experience"]
        : parsedData.work_experience
          ? parsedData.work_experience
          : [];
      const project = parsedData.projects;
      const internship = parsedData.internship;
      const references = parsedData.references;
      const achievements = parsedData.achievements;

      const socialLinks = parsedData["social links"];
      const extraCaricularActivity = parsedData["extra-curricular activities"];

      const courses = parsedData["certification/courses"]
        ? parsedData?.issuing_organization
        : [];
      setData({
        ...data,
        showSkills: true,
        showAchievements: true,
        showCourses: true,
        showExtraCariculam: true,
        showHobbies: true,
        showInternship: true,
        showLanguage: true,
        showLinks: true,
        
        showCustomSection: true,
        showProject: true,
        showReference: true,
        clientId: clientId ? clientId : null,
        firstName: first_name,
        lastName: last_name,
        email: email,
        dial_code: null,
        mobileNumber: mobileNo,
        designation: designation,
        summery: summary,
        location: address,
        skills: skills?.length > 0 ? skills?.map((item) => ({
          skill: item,
          rating: [5, 5, 5, 5, 5],
        })) : [],
        hobbies: hobbies?.length > 0 ? hobbies?.map((item) => ({
          title: item,
        })) : [],
        languages:
          languages?.length > 0
            ? languages?.map((item) => ({
              languages: item,
              rating: [3, 3, 3],
            }))
            : [],
        education: educations?.map((item) => ({
          qualification: item.courseName,
          specialization: item["Specialization/Board"],
          instituteName: item["University Name"],
          type: "full-time",
          location: "",
          duration: {
            start: {
              year: item["Passing Year"].startDate?.year ? item["Passing Year"].startDate?.year : "Year",
              month: null,
            },
            end: {
              year: item["Passing Year"].endDate?.year ? item["Passing Year"].endDate?.year : "Year",
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
            start: { year: item.start_date?.year ? item.start_date?.year : "Year", month: null },
            end: {
              year: item.is_current ? currentYear : item.end_date?.year ? item.end_date?.year : "Year",
              month: null,
            },
          },
        })),
        project:
          project?.length > 0
            ? project?.map((item) => ({
              title: item.title,
              organization: item.organization,
              description: item.description,
              currentlyWorking: false,

              duration: {
                start: { year: item.start_date?.year ? item.start_date?.year : "Year", month: null },
                end: {
                  year: item.is_current ? currentYear : item.end_date?.year ? item.end_date?.year : "Year",
                  month: null,
                },
              },
            }))
            : [],
        internship:
          internship?.length > 0
            ? internship?.map((item) => ({
              title: item.title,
              organization: item.organization,
              description: item.description,
              currentlyWorking: false,

              duration: {
                start: { year: item.start_date?.year, month: null },
                end: {
                  year: item.is_current ? currentYear : item.end_date?.year,
                  month: null,
                },
              },
            }))
            : [],
        extraCaricularData:
          extraCaricularActivity?.length > 0
            ? extraCaricularActivity?.map((item) => ({
              title: item.title,
              organization: item.organization,
              description: item.description,
              currentlyWorking: false,
              duration: {
                start: { year: item.start_date?.year, month: null },
                end: {
                  year: item.is_current ? currentYear : item.end_date?.year,
                  month: null,
                },
              },
            }))
            : [],
        course:
          courses?.length > 0
            ? courses?.map((item) => ({
              title: item.title,
              organization: item.organization,
              description: item.description,
              currentlyWorking: true,

              duration: {
                start: { year: item.start_date?.year, month: null },
                end: {
                  year: item.is_current ? currentYear : item.end_date?.year,
                  month: null,
                },
              },
            }))
            : [],
        socialLinks:
          socialLinks?.length > 0
            ? socialLinks?.map((item) => ({
              platform: item.platform,
              link: item.link,
            }))
            : [],
        reference:
          references?.length > 0
            ? references?.map((item) => ({
              referantName: item.referantName,
              designation: item.designation,
              "Organization Name": item["Organization Name"],
              email: item.name,
            }))
            : [],
        achievements:
          achievements?.length > 0
            ? achievements?.map((item) => ({
              title: item.title,
            }))
            : [],
      });
    } else if (clientId) {
      axios
        .get(`http://localhost:2000/api/client/getByClientId/${clientId}`)
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


        const selectedTemplate = templates.find(template => template.index === allData?.selectedResumeIndex);

        if (selectedTemplate) {
          setSelectedColor(selectedTemplate.themeColor);
          setSelectedFont(selectedTemplate.fontFamily);
        } else {
          setSelectedColor("");
        }
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
    <div className="">
      <div className="  pt-2 customMargins ">
        <div className="flex flex-col gap-4 py-6 ">
          <div className="flex ml:hidden flex-row gap-4 ">
            <button
              onClick={() => router.push(`/home/BuildResume?clientId=${clientId}`)}
              className="p-[8px] border-[1px] bg-blue border-[#DEDEDE] rounded-[6px]  "
              style={{}}
            >
              <svg
                className=" cursor-pointer"

                width="24"
                height="24"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_629_16604)">
                  <path
                    d="M11.9583 21.3892L21.9584 31.3892L20 33.3337L6.66669 20.0003L20 6.66699L21.9584 8.61141L11.9583 18.6115H33.3334V21.3892H11.9583Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
            <div className="text-[18px] font-medium text-[#FFFFFF]  header1 w-[280px] flex justify-start px-4 py-[6px] ">
              Create Resume
            </div>
          </div>
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
                  clientId={clientId}
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
                  clientId={clientId}
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
                  clientId={clientId}
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

// import React, { useState, useEffect, useMemo } from "react";
// import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
// import debounce from "lodash.debounce";

// const MyPDFDocument = ({ data }) => (
//   <Document height="1124px" dpi={72}>
//     <Page size="A4" style={{ padding: 24,backgroundColor:'red' }} pageMode={"fullScreen"} wrap={true}>
// <Text>{data}</Text>
//     </Page>
//   </Document>
// );

// const MemoizedPDFDocument = React.memo(MyPDFDocument);

// const CreateResume = () => {
//   const [state1, setState1] = useState("");
//   const [state2, setState2] = useState("");
//   const [data, setData] = useState("");

//   const debouncedSetData = useMemo(
//     () => debounce(setData, 300),
//     []
//   );

//   useEffect(() => {
//     const combinedData = `${state1} ${state2}`;
//     debouncedSetData(combinedData);
//   }, [state1, state2, debouncedSetData]);

//   return (
//     <div>
//       <input
//         value={state1}
//         onChange={(e) => setState1(e.target.value)}
//         placeholder="State 1"
//       />
//       <input
//         value={state2}
//         onChange={(e) => setState2(e.target.value)}
//         placeholder="State 2"
//       />
//       <PDFDownloadLink
//         document={<MemoizedPDFDocument data={data} />}
//         fileName="my_document.pdf"
//       >
//         {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
//       </PDFDownloadLink>
//       <MemoizedPDFDocument data={data} />
//     </div>
//   );
// };

// export default CreateResume;
