import React, { useState } from "react";
import Social_Links from "./modals/Social_Links";
import { Delete_icon } from "../../../../utils/svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DeleteModal from "../../../common/deleteModal";
import { reCallUserData } from "../../../../Redux/actions/user";
import { toast } from "react-toastify";
function Social_links_ndWebsites({ userData }) {
  const [addWebsites, setaddWebsites] = useState(false);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    axios
      .delete(
        `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/deleteSocialLink/${deleteData.id}`
      )
      .then((res) => {
        dispatch(reCallUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Social Link deleted successfully");
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
        <div className="flex gap-[16px] text-[20px] font-[500] text-[#333] items-center justify-between">
          Website & Social Links
          <svg
            className="hover:cursor-pointer"
            onClick={() => setaddWebsites(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g mask="url(#mask0_5789_21794)">
              <path
                d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                fill="#646464"
              />
            </g>
          </svg>
        </div>
        {userData.socialLinks?.map((item) => (
          <div className="flex flex-col gap-[4px] ">
            <div className="flex gap-[16px] items-center text-[16px] font-[500]">
              {item.profile}
              <div className="flex gap-[8px]">
                <div
                  onClick={() => setDeleteData({ view: true, id: item._id })}
                >
                  
                </div>
              </div>
            </div>
            <a
              href={item.url}
              target="_blank"
              className="text-[12px] font-[400]"
            >
              {item.url}
            </a>
            <div className="text-[12px] font-[400]">{item.discription}</div>
          </div>
        ))}
      </div>
      {addWebsites && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <Social_Links setaddWebsites={setaddWebsites} />
            </div>
          </div>
          
        </>
      )}
    </>
  );
}

export default Social_links_ndWebsites;
