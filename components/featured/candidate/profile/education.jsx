import AddEducation from "@/components/models/addEducation";
import { AddIcon, Delete_icon, Edit_icon } from "@/utils/svg";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from '@/Redux/actions/user';
import DeleteModal from "@/components/common/deleteModal";
import { toast } from "react-toastify";

const Education = ({ userData }) => {
  const dispatch = useDispatch()
  const [education, setEducation] = useState([]);
  const [openAddEducation, setOpenAddEducation] = useState(false)
  const userDataGlobal = useSelector((state) => state.userData);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });

  const [educationData, setEducationData] = useState({
    type:"",
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





  // const handleDeleteEducation = (id) => {

  //   if (userData) {
  //     axios

  //       .delete(`http://localhost:2000/api/candidate/${userData._id}/deleteEducation/${id}`)
  //       .then((res) => {
  //         dispatch(reCallUserData());
  //         console.log("deleted successfully");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:2000/api/candidate/${userDataGlobal._id}/deleteEducation/${deleteData.id}`
      )
      .then((res) => {
        dispatch(reCallUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Education deleted successfully");
      })
      .catch((err) => console.log(err));
  };
  const closeDeleteModal = () => {
    setDeleteData({ view: false, id: "" });
  };


  return (
    <>
      {deleteData.view && (
        <DeleteModal
          deleteHandler={deleteHandler}
          closeDeleteModal={closeDeleteModal}
        />
      )}
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

                  <div >
                    <Edit_icon />

                  </div>
                  <div onClick={() => setDeleteData({ view: true, id: elem._id })} >
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
                  {elem?.duration?.endDate?.years}
                </p>
              </div>
              <div className="full_time">
              <p className="sec_head">{elem.location}</p>
              {/* <div className="vertical_line"></div>
              <p className="sec_head">On-site</p> */}
            </div>
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
    </>
  );

};

export default Education;
