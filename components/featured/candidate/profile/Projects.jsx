import { AddIcon, Delete_icon, Edit_icon } from "@/utils/svg";
import React, { useState } from "react";
import SampleWork from "./modals/SampleWork";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from "@/Redux/actions/user";
import DeleteModal from "@/components/common/deleteModal";
import { toast } from "react-toastify";
import axios from "axios";
function Projects({ userData }) {
  const dispatch = useDispatch();
  const [addSampleWork, setaddSampleWork] = useState(false);
  const userDataGlobal = useSelector((state) => state.userData);
console.log(7,userDataGlobal.projects)
const [deleteData, setDeleteData] = useState({ view: false, id: "" });


const deleteHandler = () => {
  axios
    .delete(
      `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/deleteProject/${deleteData.id}`
    )
    .then((res) => {
      dispatch(reCallUserData());
      setDeleteData({ view: false, id: "" });
      toast.success("Project deleted successfully");
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
      <div
       
        className="bg-[#fff] rounded-[16px] p-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="page_headings flex justify-between w-full">
          Projects{" "}
          <div  onClick={() => setaddSampleWork(true)}>
            <AddIcon />
          </div>
        </div>
        {userData?.projects?.map((SampleWark) => (
          <div className="essential_gap">
            <div className=" flex gap-4">
              <p className="heading_first">{SampleWark.title}</p>
              
              <div onClick={() => setDeleteData({ view: true, id: SampleWark._id })}>
                <Delete_icon/>
              </div>
            </div>
            <p className="sec_head">{SampleWark.url}</p>
          </div>
        ))}
      </div>
      {addSampleWork && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <SampleWork setaddSampleWork={setaddSampleWork} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Projects;
