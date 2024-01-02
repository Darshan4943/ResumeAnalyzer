import AddEducation from "@/components/models/addEducation";
import { AddIcon } from "@/utils/svg";
import React, { useState } from "react";

const Education = ({ userData }) => {

  const [education, setEducation] = useState([]);
  const [openAddEducation, setOpenAddEducation] = useState(false)
  const [educationData, setEducationData] = useState({
    isCurrentJob: '',
    education: '',
    university: '',
    institute: '',
    course: '',
    specialization: '',
    location: '',
    isCurrentlyPursuing: '',
    startDate: { month: '', year: '' },
    endDate: { month: '', year: '' },
    gradingSystem: '',
    score: '',
});

  console.log('education:', education);

  const handleEditEducation = (index) => {
    const educationToEdit = education[index];

    if (educationToEdit) {
      setOpenAddEducation(true);
        setEducationData({ ...educationToEdit });

      const updatedEducationData = education.filter((_, i) => i !== index);
      setEducation(updatedEducationData);
    }
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationData = [...education];
    updatedEducationData.splice(index, 1);
    setEducation(updatedEducationData);
  };

  
  return (
    <div className="build_ai ai2">
      <div className="gap">
        <p className="page_headings">Education</p>

        <div onClick={() => setOpenAddEducation(true)}>  <AddIcon /></div>
        {/* <div className="add_delete">
          <img
            style={{ width: "24px" }}
            src="./images/profile/add.png"
            alt=""
          />
          <img
            style={{ width: "24px" }}
            src="./images/profile/edit.png"
            alt=""
          />
        </div> */}
      </div>
      {userData?.education?.map((elem) => (
        <div className="work_logo" key={elem._id}>
          {/* <div className="logo_img">
            <img src="./images/profile/logo_1.png" alt="" />
          </div> */}

          <div className="logo_disc">
            <p className="heading_first">{elem.stream}</p>
            <p className="heading_sec">{elem.institute}</p>
            <div className="full_time">
              {elem?.type && (
                <>
                  <p className="sec_head">{elem?.type}</p>
                  <div className="vertical_line"></div>
                </>
              )}

              <p className="sec_head">
                {elem.dateOfComplition}
              </p>
            </div>
            {/* <div className="full_time">
              <p className="sec_head">Pune, Maharashtra, India</p>
              <div className="vertical_line"></div>
              <p className="sec_head">On-site</p>
            </div> */}
          </div>
        </div>
      ))}

{education.length > 0 && (
            <div>
             
              <ul>
                {education.map((exp, index) => (
                  <div className="flex gap-4 justify-between">
                     <li key={index}>{exp.education}</li>
                  <li key={index}>{exp.institute}</li>
               

                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    onClick={() => handleEditEducation(index)}
                  >
                    <g mask="url(#mask0_5808_93842)">
                      <path
                        d="M4.16404 15.8317H5.21531L13.7458 7.30121L12.6945 6.24994L4.16404 14.7804V15.8317ZM2.91406 17.0817V14.2612L13.9061 3.27402C14.0321 3.15956 14.1712 3.07112 14.3235 3.00868C14.4757 2.94625 14.6354 2.91504 14.8025 2.91504C14.9696 2.91504 15.1314 2.94469 15.2881 3.004C15.4447 3.06329 15.5834 3.15757 15.7041 3.28683L16.7217 4.31727C16.851 4.43799 16.9431 4.57691 16.9981 4.73402C17.0532 4.89112 17.0807 5.04821 17.0807 5.20531C17.0807 5.37288 17.0521 5.5328 16.9948 5.68506C16.9376 5.83734 16.8466 5.97648 16.7217 6.1025L5.73454 17.0817H2.91406ZM13.2109 6.78479L12.6945 6.24994L13.7458 7.30121L13.2109 6.78479Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    onClick={() => handleDeleteEducation(index)}
                  >
                    <g mask="url(#mask0_5808_93845)">
                      <path
                        d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                </div>
                </div>
                 ))}
              </ul>
            </div>
          )}

{openAddEducation && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[75.08%] ">
              <AddEducation
               setOpenAddEducation={setOpenAddEducation} education={education} setEducation={setEducation} educationData={educationData} setEducationData={setEducationData} 
                />
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default Education;
