

import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { toast } from "react-toastify";
import AddEducation from "./addEducation";
import { AddIcon, Delete_icon, Edit_icon } from "../../../utils/svg";
import DeleteModal from "../../common/deleteModal";
import { fetchUserData } from "../../../Redux/slices/userSlice";

const Education = ({ userData }) => {
    const dispatch = useDispatch();

    const [openAddEducation, setOpenAddEducation] = useState(false);
    const { userDataGlobal, profileData } = useSelector(
        (state) => state.user.userData
    );
    const [deleteData, setDeleteData] = useState({ view: false, id: "" });


    const [education, setEducation] = useState([]);

    const [editEducation, setEditEducation] = useState(false);

    const editHandler = (elem) => {
        setEducation(elem);
        setOpenAddEducation(true)
        setEditEducation(true);
    };




    const deleteHandler = () => {
        axios
            .delete(
                `https://jamblix.com/api/candidate/${userDataGlobal?._id}/deleteEducation/${deleteData.id}`
            )
            .then((res) => {
                dispatch(fetchUserData());
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
                    type={"Education"}
                />
            )}
            <div className="build_ai ai2 gap-4">
                <div className="gap">
                    <p className="page_headings text-[16px] font-[600]">Education</p>

                    <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer" onClick={() => { setOpenAddEducation(true); setEditEducation(false) }}>
                        {" "}
                        <AddIcon />
                    </div>
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
                                <p className="heading_first leading-tight">{elem.education}</p>
                                <p className="heading_first leading-tight">{elem.stream}</p>
                                <div className="flex gap-2 ">
                                    {/* 
                  <div >
                    <Edit_icon />

                  </div> */}
                                    <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer" onClick={() => editHandler(elem)}>
                                        <Edit_icon />
                                    </div>
                                    <div
                                    className="p-[2px] hover:border-red border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer"
                                        onClick={() => setDeleteData({ view: true, id: elem._id })}
                                    >
                                        <Delete_icon />
                                    </div>

                                </div>
                            </div>
                            <p className="heading_sec">{elem.institute} ({elem.university})</p>
                            <div className="full_time">
                                {elem?.type && (
                                    <>
                                        <p className="sec_head leading-tight">{elem?.type}</p>
                                        <div className="vertical_line"></div>
                                    </>
                                )}

                                <p className="sec_head leading-tight">{elem?.duration?.startDate?.year} to {elem?.duration?.endDate?.year}</p>
                            </div>
                            <div className="full_time">
                                <p className="sec_head leading-tight">{elem.location}</p>
                                <div className="vertical_line leading-tight"></div>
                                <p className="sec_head leading-tight">On-site</p>
                            </div>
                        </div>
                    </div>
                ))}

                {openAddEducation && (
                    <>
                        <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                        <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                            <div className="absolute ms:w-[75.08%] w-[90%] top-[100px]  rounded-[16px] ">
                                <AddEducation
                                    setOpenAddEducation={setOpenAddEducation}
                                    Education={education}
                                    setEducation={setEducation}

                                    userData={userData}
                                    editEducation={editEducation}
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
