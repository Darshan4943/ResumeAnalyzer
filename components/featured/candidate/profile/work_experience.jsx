import React, { useEffect, useRef, useState } from "react";
import { AddIcon, Delete_icon, Edit_icon, Visibility_on } from "@/utils/svg";
import AddWorkExperience from "@/components/models/addWorkExperience";
import axios from "axios";
const WorkExperiance = ({ userData }) => {

  const [experiences, setExperiences] = useState([]);

  const [experienceData, setExperienceData] = useState({
    isCurrentJob: '',
    jobType: '',
    jobMode: '',
    designation: '',
    organisation: '',
    location: '',
    noticePeriod: '',
    skillsLearned: '',
    workDescription: '',
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });


  const handleEditExperience = (id) => {

    const experienceToEdit = id;

    if (experienceToEdit) {
      setOpenAddExperience(true);
      setExperienceData({ ...experienceToEdit });

      const updatedExperienceData = experiences.filter((_, i) => i !== id);
      setExperiences(updatedExperienceData);
    }
  };



  const handleDeleteExperience = (id) => {

    if (userData) {
      axios

        .delete(`http://localhost:2000/api/candidate/${userData._id}/deleteWorkExperience/${id}`)
        .then((res) => {
          console.log("deleted successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const taskRef = useRef(null);
  const [openAddExperience, setOpenAddExperience] = useState(false)

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setOpenAddExperience(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  console.log(66, userData)
  return (
    <>
      {userData.workExperiance?.length >= 0 && (
        <div className="build_ai ai2">
          <div className=" gap">
            <p className="page_headings">Work Experience</p>

            <div onClick={() => setOpenAddExperience(true)}>  <AddIcon /></div>
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
          {userData?.workExperiance?.map((job) => (
            <div className="work_logo">
              {/* <div className="logo_img">
   <img src="./images/profile/logo_1.png" alt="" />
 </div> */}

              <div className="logo_disc">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <p className="heading_first ">{job?.companyName}</p>
                    <div className="flex gap-2">


                      <div onClick={() => handleEditExperience(job._id)}>
                        <Edit_icon />

                      </div>
                      <div onClick={() => handleDeleteExperience(job._id)} >
                        <Delete_icon />

                      </div>
                    </div>
                  </div>
                  <p className="heading_sec">{job?.jobTitle}</p>
                </div>
                <div className="full_time">
                  {job?.jobType && (
                    <>
                      <p className="sec_head">{job?.jobType}</p>
                      <div className="vertical_line"></div>
                    </>
                  )}
                  {job?.jobDuration?.length > 0 ? (
                    <p className="sec_head">Sept 2019 to 2022</p>
                  ) : (
                    <p className="sec_head">{job.dateOfJoining}</p>
                  )}
                </div>
                <div className="full_time">
                  <p className="sec_head">{job?.jobLocation}</p>
                  {job?.jobMode && (
                    <>
                      <div className="vertical_line"></div>
                      <p className="sec_head">{job?.jobMode}</p>
                    </>
                  )}
                </div>

                <p className="sec_head">{job?.workDescription}</p>
              </div>
            </div>
          ))}


        </div>
      )}

      {openAddExperience && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
            <div className="absolute w-[75.08%]">
              <AddWorkExperience setOpenAddExperience={setOpenAddExperience} experiences={experiences} setExperiences={setExperiences} experienceData={experienceData} setExperienceData={setExperienceData} userData={userData} />
            </div>
          </div>
        </>

      )}
    </>
  );
};

export default WorkExperiance;
