
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import { toast } from "react-toastify";
import axios from "axios";
import DeleteModal from "../../common/deleteModal";
import { AddIcon, Delete_icon, Edit_icon } from "../../../utils/svg";
import SampleWork from "./sampleWork";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function Projects({ userData }) {
  const dispatch = useDispatch();
  const [addSampleWork, setaddSampleWork] = useState(false);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
 
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });


  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:2000/api/candidate/${userDataGlobal._id}/deleteProject/${deleteData.id}`
      )
      .then((res) => {
        dispatch(fetchUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Project deleted successfully");
      })
      .catch((err) => console.log(err));
  };
  const closeDeleteModal = () => {
    setDeleteData({ view: false, id: "" });
  };

  const [Project, setProject] = useState(null);
  const [editProject, setEditProject] = useState(false);

  const editHandler = (SampleWark) => {
    setProject(SampleWark);
    setEditProject(true)
    setaddSampleWork(true);
  };



  return (
    <>

      {deleteData.view && (
        <DeleteModal
          deleteHandler={deleteHandler}
          closeDeleteModal={closeDeleteModal}
          type={"Projects"}
        />
      )}
      <div

        className="bg-[#fff] rounded-[16px] p-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >

        <div className="page_headings flex justify-between w-full text-[18px] font-[600]">
          Projects{" "}
          <div onClick={() => { setaddSampleWork(true), setEditProject(false) }}>
            <AddIcon />
          </div>
        </div>
        {userData?.projects?.map((SampleWark,index) => (
          <div key={index} className="essential_gap">
            <div className=" flex gap-4">
              <p className="heading_first">{SampleWark.title}</p>

              <div onClick={() => editHandler(SampleWark)}>
                <Edit_icon />
              </div>
              <div onClick={() => setDeleteData({ view: true, id: SampleWark._id })}>
                <Delete_icon />
              </div>
            </div>
            <p className="sec_head">{SampleWark.url}</p>
          </div>
        ))}
      </div>

      {addSampleWork && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute ms:w-[75.08%] w-[90%] top-[100px] ">
              <SampleWork setaddSampleWork={setaddSampleWork}
                Project={Project} editProject={editProject}
              />
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default Projects;
