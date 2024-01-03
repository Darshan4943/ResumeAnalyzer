import AddEducation from "@/components/models/addEducation";
import { AddIcon, Delete_icon, Edit_icon } from "@/utils/svg";
import axios from "axios";
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
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
    gradingSystem: '',
    score: '',
  });



  const handleEditEducation = (id) => {
    const educationToEdit = education[id];

    if (educationToEdit) {
      setOpenAddEducation(true);
      setEducationData({ ...educationToEdit });

      const updatedEducationData = education.filter((_, i) => i !== id);
      setEducation(updatedEducationData);
    }
  };

  const handleDeleteEducation = (id) => {

    if (userData) {
      axios

        .delete(`http://localhost:2000/api/candidate/${userData._id}/deleteEducation/${id}`)
        .then((res) => {
          console.log("deleted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            <div className="flex gap-4">
              <p className="heading_first">{elem.stream}</p>
              <div className="flex gap-2">

                <div onClick={() => handleEditEducation(elem._id)}>
                  <Edit_icon />

                </div>
                <div onClick={() => handleDeleteEducation(elem._id)} >
                  <Delete_icon />

                </div>
              </div>
            </div>
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



      {openAddEducation && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[75.08%] ">
              <AddEducation
                setOpenAddEducation={setOpenAddEducation} education={education} setEducation={setEducation} educationData={educationData} setEducationData={setEducationData} userData={userData}
              />
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default Education;
