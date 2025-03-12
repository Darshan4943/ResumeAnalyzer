import React, { use, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { toast } from "react-toastify";
import DeleteModal from "../../common/deleteModal";

import Social_Links from "./socialLinksModel";
import { AddIcon, Delete_icon, Edit_icon } from "../../../utils/svg";
import { fetchUserData } from "../../../Redux/slices/userSlice";
function Social_links_ndWebsites({ userData }) {
  const [addWebsites, setaddWebsites] = useState(false);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });
 const { userDataGlobal } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [linkData, setLinkData] = useState({
    profile: "PHD",
    url: "",
    discription: "",
  });
  // useEffect(() => {
  //   if(userDataGlobal){
  //     const { profile, url, discription } = userDataGlobal?.basics;
  //     setLinkData({
  //       ...linkData,
  //     });
  //   }
  
  // }, [userDataGlobal]);
  const deleteHandler = () => {
    axios
      .delete(
        `http://192.168.1.161:2000/api/candidate/${userDataGlobal?._id}/deleteSocialLink/${deleteData.id}`
      )
      .then((res) => {
        dispatch(fetchUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Social Link deleted successfully");
      })
      .catch((err) => console.log(err));
  };
  const closeDeleteModal = () => {
    setDeleteData({ view: false, id: "" });
  };

  const [Social, setSocial] = useState(null);
  const [editSocial, setEditSocial] = useState(false);

  const editHandler = (social) => {
    setSocial(social);
    setEditSocial(true)
    setaddWebsites(true);
  };


  return (
    <>
      {deleteData.view && (
        <DeleteModal
          deleteHandler={deleteHandler}
          closeDeleteModal={closeDeleteModal}
          type={"Social Links"}
        />
      )}
      <div
        className="bg-[#fff] rounded-[16px] p-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex gap-[16px] text-[16px] font-[600] text-[#333] items-center justify-between">
          Website & Social Links

          <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer" onClick={() => {setaddWebsites(true),setEditSocial(false)}}>
            <AddIcon />
          </div>
        </div>
        {userData?.socialLinks?.map((item ,index) => (
          <div key={index} className="flex flex-col gap-[4px] ">
            <div className="flex gap-[16px] items-center text-[14px] font-[600]">
              {item.profile}
              <div className="flex gap-[8px]">

              <div className="p-[2px] hover:border-blue border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer" onClick={() => editHandler(item)}>
                  <Edit_icon/>
                </div>
                <div
                className="p-[2px] hover:border-red border-solid border-[1px] rounded-[6px] border-white  transition-all duration-500 cursor-pointer"
                  onClick={() => setDeleteData({ view: true, id: item._id })}
                >
                  <Delete_icon />
                </div>
                {/* <div onClick={() => setaddWebsites(true)}>
                  <Edit_icon />
                </div> */}
              </div>
            </div>
            <a
              href={item.url}
              target="_blank"
              className="text-[12px] font-[400]"
            >
              {item.url}
            </a>
            {/* <div className="text-[12px] font-[400]">{item.discription}</div> */}
          </div>
        ))}
      </div>
      {addWebsites && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] ms:w-[75%] w-[90%] top-[100px]">
              <Social_Links setaddWebsites={setaddWebsites} Social={Social} setEditSocial={setEditSocial} editSocial={editSocial}/>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Social_links_ndWebsites;
