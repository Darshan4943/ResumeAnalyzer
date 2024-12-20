
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import { toast } from "react-toastify";
import axios from "axios";
import { AddIcon, Delete_icon, Edit_icon } from "../../../utils/svg";
import HonorsAwards from "./honorsAwards";
import DeleteModal from "../../common/deleteModal";
import { fetchUserData } from "../../../Redux/slices/userSlice";

const Achievements = ({userData}) => {
    const [addAchivements, setAddAchivements] = useState(false);
   const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [deleteData, setDeleteData] = useState({ view: false, id: "" });
    const dispatch = useDispatch();


    const deleteHandler = () => {
        axios
            .delete(
                `http://localhost:2000/api/candidate/${userDataGlobal._id}/deleteAchivement/${deleteData.id}`
            )
            .then((res) => {
                dispatch(fetchUserData());
                setDeleteData({ view: false, id: "" });
                toast.success("Award deleted successfully");
            })
            .catch((err) => console.log(err));
    };
    const closeDeleteModal = () => {
        setDeleteData({ view: false, id: "" });
    };
    const [Achievement, setAchievement] = useState(null);
    const [editAchievement, setEditfalseAchievement] = useState(false);

    const editHandler = (achievement) => {
        setAchievement(achievement);
        setEditfalseAchievement(true)
        setAddAchivements(true);
    };


    return (
        <>

            {deleteData.view && (
                <DeleteModal
                    deleteHandler={deleteHandler}
                    closeDeleteModal={closeDeleteModal}
                />
            )}
            <div className="build_ai ai2" style={{ gap: "16px" }}>
                <div className="page_headings flex justify-between w-full text-[16px] font-semibold">
                    Achievements{" "}
                    <div onClick={() => { setAddAchivements(true), setEditfalseAchievement(false) }}>
                        <AddIcon />
                    </div>
                </div>
                {userData?.awards?.map((achive) => (
                    <div className="essential_gap">
                        <div className="flex gap-5">
                            <p className="heading_first  text-[14px] font-[600]">{achive.title}</p>
                            
                            <div className="flex gap-3">
                                <div onClick={() => editHandler(achive)}>
                                    <Edit_icon />
                                </div>

                                <div onClick={() => setDeleteData({ view: true, id: achive._id })}>
                                    <Delete_icon />
                                </div>
                            </div>
                        </div>
                       
                        <p className="sec_head">{achive.issuedBy}</p>
                    </div>
                ))}
            </div>
            {addAchivements && (
                <>
                    <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
                        <div className="absolute max-w-[800px] ms:w-[75%] w-[90%] top-[100px]">

                            <HonorsAwards
                                setAddAchivements={setAddAchivements}
                                Achievement={Achievement}
                                editAchievement={editAchievement}
                            />

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Achievements;
