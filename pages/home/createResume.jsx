import React, { useEffect, useRef, useState } from "react";
import { ClosedIcon, ClosedIcon1, LeftArow } from "../../utils/svg";
import ResumeForm from "../../components/featured/candidate/createResume/resume_form";
import ResumePreview from "../../components/featured/candidate/createResume/resume_preview";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { camelCase } from "../../utils/middleware";

function CreateResume() {
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedColor, setSelectedColor] = useState();
  const [selectedResumeIndex, setSelectedResumeIndex] = useState();
  const userDataGlobal = useSelector((state) => state.userData);
  const taskRef = useRef(null);
  const router = useRouter();
  const [editId, setEnditId] = useState();
  const userData = router.query;

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
  const [data, setData] = useState(
    {
      "profilePhoto": {},
      "designation": "Pune",
      "firstName": "Prathmesh",
      "lastName": "Jadhav",
      "mobileNumber": "9325795236",
      "email": "prathmeshjadhav1014@gmail.com",
      "location": "Pune",
      "summary": "",
      "showSummary": true,
      "education": [
          {
              "duration": {
                  "start": {
                      "month": "4",
                      "year": "2020"
                  },
                  "end": {
                      "month": "1",
                      "year": "2023"
                  }
              },
              "qualification": "CS",
              "instituteName": "Pune",
              "specialization": "CS"
          }
      ],
      "showEducation": true,
      "experience": [
          {
              "designation": "UI/UX designer",
              "organization": "Freedygo",
              "description": " m Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange",
              "currentlyWorking": false,
              "location": "Pune",
              "duration": {
                  "start": {
                      "year": "2017",
                      "month": "1"
                  },
                  "end": {
                      "year": "2022",
                      "month": "2"
                  }
              },
              "end": {
                  "year": "Present",
                  "month": "Present"
              }
          },
          {
              "duration": {
                  "start": {
                      "month": "4",
                      "year": "2020"
                  },
                  "end": {
                      "month": "3",
                      "year": "2023"
                  }
              },
              "organization": "Pune",
              "location": "Pune",
              "designation": "Pune"
          }
      ],
      "showExperience": true,
      "course": [],
      "showCourse": true,
      "skills": [
          {
              "skill": "JavaScript",
              "rating": [
                  5,
                  5,
                  5,
                  5,
                  5
              ]
          },
          {
              "skill": "Java",
              "rating": [
                  5,
                  5,
                  5,
                  5,
                  5
              ]
          },
          {
              "skill": "C++",
              "rating": [
                  5,
                  5,
                  5,
                  5,
                  5
              ]
          },
          {
              "skill": "Swift",
              "rating": [
                  5,
                  5,
                  5,
                  5,
                  5
              ]
          }
      ],
      "achievement": [],
      "sociaLinks": [],
      "hobbies": [
          {
              "title": "Cooking"
          },
          {
              "title": "coding"
          }
      ],
      "languages": [],
      "section": [
          {
              "header": "Projects",
              "subSection": [
                  {
                      "title": "project 1",
                      "duration": {
                          "start": {
                              "month": "3",
                              "year": "2022"
                          },
                          "end": {
                              "month": "5",
                              "year": "2023"
                          }
                      },
                      "description": "m Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange"
                  },
                  {
                      "title": "project 2",
                      "duration": null,
                      "description": "m Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange"
                  }
              ]
          }
      ],
      "currentCTC": "",
      "dateOfComplition": "",
      "dob": "",
      "employmentStatus": "employed",
      "clientId": "65ef17b76f81614547f6e657",
      "summery": "m Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange"
  }
  );
  // const [data, setData] = useState({
  //   profilePhoto: null,
  //   designation: "UI/UX designer",
  //   firstName: "John",
  //   lastName: "Doe",
  //   mobileNumber: 9325795236,
  //   email: "demo@gmail.com",
  //   location: "Demo",
  //   summary: "",
  //   showSummary: true,
  //   education: [
  //     {
  //       qualification: "12th",
  //       specialization: "cs",
  //       instituteName: "pune",
  //       type: "full-time",
  //       location: "",
  //       duration: {
  //         start: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //         end: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //       },
  //     },
  //     {
  //       qualification: "12th",
  //       specialization: "cs",
  //       instituteName: "pune",
  //       type: "full-time",
  //       location: "",
  //       duration: {
  //         start: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //         end: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //       },
  //     },
  //   ],
  //   showEducation: true,
  //   experience: [
  //     {
  //       designation: "UI/UX designer",
  //       organization: "Freedygo",
  //       description:
  //         " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
  //       currentlyWorking: true,
  //       location: "Pune,Maharashtra",
  //       duration: {
  //         start: {
  //           year: "2010",
  //           month: "10",
  //         },
  //         end: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //       },
  //     },
  //   ],
  //   showExperience: true,
  //   course: [
  //     {
  //       courseName: "Demo Course",
  //       issuedBy: "Demo Institute",
  //       discription: "",
  //       duration: {
  //         start: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //         end: {
  //           year: "Year",
  //           month: "Month",
  //         },
  //       },
  //     },
  //   ],
  //   showCourse: true,
  //   skills: [
  //     {
  //       skill: "C#",
  //       rating: [5, 5, 5, 5, 5],
  //     },
  //     {
  //       skill: "Python",
  //       rating: [5, 5, 5, 5, 5],
  //     },
  //     {
  //       skill: "Ruby",
  //       rating: [5, 5, 5, 5, 5],
  //     },
  //     {
  //       skill: "Php",
  //       rating: [5, 5, 5, 5, 5],
  //     },
  //     {
  //       skill: "Angular",
  //       rating: [5, 5, 5, 5, 5],
  //     },
  //   ],
  //   achievement: [],
  //   sociaLinks: [],
  //   hobbies: [
  //     {
  //       title: "Dancing",
  //     },
  //     {
  //       title: "Writting",
  //     },
  //   ],
  //   languages: [
  //     {
  //       languages: "English",
  //       rating: [3, 3, 3],
  //     },
  //   ],
  //   summery:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
  // });
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
        const {
          firstName,
          lastName,
          mobileNo,
          email,
          keySkills,
          currentCTC,
          currentLocation,
          dateOfComplition,
          dateOfJoining,
          dob,
          employmentStatus,
          companyName,
          jobLocation,
          jobTitle,
          dial_code,
          stream,
          university,
          specialization,
          clientId,
          jobDuration,
          educationDuration,
        } = userData;
        const yearOfCompletion = new Date(dateOfComplition).getFullYear();
        const yearOfJoining = new Date(dateOfJoining).getFullYear();
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        const currentYear = currentDate.getFullYear();
        setData((prevData) => ({
          ...prevData,
          firstName: firstName ? camelCase(firstName) : "JOHN",
          lastName: lastName ? camelCase(lastName) : "DOE",
          mobileNumber: mobileNo,
          email,
          designation: jobTitle,
          currentCTC,
          location: currentLocation,
          dateOfComplition,
          dob,
          employmentStatus,
          dial_code,
          clientId,
          education: [
            {
              duration: educationDuration && JSON.parse(educationDuration),
              qualification: stream,
              instituteName: university,
              specialization,
            },
          ],
          experience: [
            {
              duration: jobDuration && JSON.parse(jobDuration),
              organization: companyName,
              location: jobLocation,
              designation: jobTitle,
            },
          ],

          skills:
            keySkills?.length > 0 &&
            JSON.parse(keySkills)?.length > 0 &&
            Array.isArray(JSON.parse(keySkills)) &&
            JSON.parse(keySkills)?.map((item) => ({
              skill: item.value,
              rating: [5, 5, 5, 5, 5],
            })),
          // section: [
          //   {
          //     header: "Projects",
          //     subSection: [
          //       {
          //         title: "demo",
          //         duration: {
          //           start: {
          //             month: "3",
          //             year: "2021",
          //           },
          //           end: {
          //             month: "1",
          //             year: "2024",
          //           },
          //         },
          //         description:
          //           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the releaseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release",
          //       },
          //       {
          //         title: "demo",
          //         duration: {
          //           start: {
          //             month: "3",
          //             year: "2021",
          //           },
          //           end: {
          //             month: "1",
          //             year: "2024",
          //           },
          //         },
          //         description:
          //           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the releaseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release",
          //       },
          //     ],
          //   },
          //   {
          //     header: "Projects",
          //     subSection: [
          //       {
          //         title: "demo",
          //         duration: {
          //           start: {
          //             month: "3",
          //             year: "2021",
          //           },
          //           end: {
          //             month: "1",
          //             year: "2024",
          //           },
          //         },
          //         description:
          //           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release",
          //       },
          //     ],
          //   },
          // ],
        }));
      }
    } else {
    }
  }, [userData]);
  return (
    <div>
      <div className=" bg-[#F9F9F9] pt-2 ml:px-6 ">
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
                isEdit={userData.isEdit}
                id={editId}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateResume;
