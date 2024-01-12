import React, { useEffect, useRef, useState } from "react";
import { AddIcon, Delete_icon, Edit_icon, Visibility_on } from "@/utils/svg";
import AddWorkExperience from "@/components/models/addWorkExperience";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from "@/Redux/actions/user";
import DeleteModal from "@/components/common/deleteModal";
import { toast } from "react-toastify";
const WorkExperiance = ({ userData }) => {
  const dispatch = useDispatch();
 
  const userDataGlobal = useSelector((state) => state.userData);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });
 



  const [Experience, setExperience] = useState(null);
  const [editExperience, setEditExperience] = useState(false);

  const editHandler = (job) => {
    setExperience(job);
    setOpenAddExperience(true)
    setEditExperience(true);
  };


  
 
  
  const deleteHandler = () => {
    axios
      .delete(
        `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/deleteWorkExperience/${deleteData.id}`
      )
      .then((res) => {
        dispatch(reCallUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Experience deleted successfully");
      })
      .catch((err) => console.log(err));
  };
  const closeDeleteModal = () => {
    setDeleteData({ view: false, id: "" });
  };

  const taskRef = useRef(null);
  const [openAddExperience, setOpenAddExperience] = useState(false);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setOpenAddExperience(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {deleteData.view && (
        <DeleteModal
          deleteHandler={deleteHandler}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {userData.workExperiance?.length >= 0 && (
        <div className="build_ai ai2">
          <div className=" gap">
            <p className="page_headings">Work Experience</p>

            <div onClick={() => {setOpenAddExperience(true),setEditExperience(false)}}>
              {" "}
              <AddIcon />
            </div>
            {/* <div className="add_delete">
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
                      <div onClick={() => editHandler(job)}>
                        <Edit_icon />
                      </div>
                      <div
                        onClick={() =>
                          setDeleteData({ view: true, id: job._id })
                        }
                      >
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
                    <p className="sec_head">
                      {job?.jobDuration?.startDate?.year}
                    </p>
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
            <div className="absolute w-[75.08%] h-[80vh] overflow-y-auto">
              <AddWorkExperience
             
                setOpenAddExperience={setOpenAddExperience}
              
              
                
                editExperience={editExperience}
                Experience={Experience}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WorkExperiance;
