import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import DeleteModal from "../../common/deleteModal";
import { AddIcon, Delete_icon, Edit_icon } from "../../../utils/svg";
import AddWorkExperience from "./addWorkExperience";
import { fetchUserData } from "../../../Redux/slices/userSlice";
const WorkExperiance = ({ userData }) => {
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });

  const [Experience, setExperience] = useState(null);
  const [editExperience, setEditExperience] = useState(false);

  const editHandler = (job) => {
    setExperience(job);
    setOpenAddExperience(true);
    setEditExperience(true);
  };

  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:2000/api/candidate/${userDataGlobal?._id}/deleteWorkExperience/${deleteData.id}`
      )
      .then((res) => {
        dispatch(fetchUserData());
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
          type={"Work Experience"}
        />
      )}
      {userData?.workExperiance?.length >= 0 && (
        <div className="build_ai ai2 gap-4 ">
          <div className=" gap">
            <p className="page_headings text-[16px] font-[600]">
              Work Experience
            </p>

            <div
              onClick={() => {
                setOpenAddExperience(true), setEditExperience(false);
              }}
              className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer"
            >
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
          {userData?.workExperiance?.map((job, index) => (
            <div key={index} className="work_logo">
              {/* <div className="logo_img">
   <img src="./images/profile/logo_1.png" alt="" />
 </div> */}

              <div className="logo_disc gap-[6px]">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center">
                    <p className="heading_first leading-tight">
                      {job?.companyName}
                    </p>
                    <div className="flex gap-2">
                      <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer" onClick={() => editHandler(job)}>
                        <Edit_icon />
                      </div>
                      <div
                      className="p-[2px] hover:border-red border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer"
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
                      <p className="sec_head leading-tight">{job?.jobType}</p>
                      <div className="vertical_line"></div>
                    </>
                  )}
                  {job?.jobDuration?.length > 0 ? (
                    <p className="sec_head leading-tight">Sept 2019 to 2022</p>
                  ) : (
                    <p className="sec_head leading-tight">
                      {job?.jobDuration?.startDate?.year} to{" "}
                      {job?.isCurrent
                        ? "Present"
                        : job?.jobDuration?.endDate?.year}
                    </p>
                  )}
                </div>
                <div className="full_time">
                  <p className="sec_head leading-tight">{job?.jobLocation}</p>
                  {job?.jobMode && (
                    <>
                      <div className="vertical_line"></div>
                      <p className="sec_head leading-tight">{job?.jobMode}</p>
                    </>
                  )}
                </div>

                <p className="sec_head leading-tight">{job?.workDescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {openAddExperience && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
            <div className="absolute w-[95%] sm:w-[75.08%]  top-[100px]">
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
