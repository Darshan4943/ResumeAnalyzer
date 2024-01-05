import React, { useState } from "react";
import AddCertificate from "./modals/AddCertificate";
import { Delete_icon } from "../../../../utils/svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../../common/deleteModal";
import { reCallUserData } from "../../../../Redux/actions/user";
import { toast } from "react-toastify";

const Courses = ({ userData }) => {
  const [addCerticate, setAddCertificate] = useState(false);
  const [deleteData, setDeleteData] = useState({ view: false, id: "" });
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const deleteHandler = () => {
    axios
      .delete(
        `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/deleteCourse/${deleteData.id}`
      )
      .then((res) => {
        dispatch(reCallUserData());
        setDeleteData({ view: false, id: "" });
        toast.success("Course deleted successfully");
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
          <p className="page_headings">Certifications</p>
          <div className="add_delete">
            <img
              style={{ width: "24px" }}
              src="./images/profile/add.png"
              alt=""
              onClick={() => setAddCertificate(true)}
            />
            {/* <img
              style={{ width: "24px" }}
              src="./images/profile/edit.png"
              alt=""
            /> */}
          </div>
        </div>
        {userData?.courses?.length > 0 && (
          <>
            {userData?.courses?.map((item) => (
              <div className="work_logo ">
                <div className="logo_disc">
                  <p className="heading_first flex gap-2 items-center">
                    {item.name}{" "}
                    <div
                      onClick={() =>
                        setDeleteData({ view: true, id: item._id })
                      }
                    >
                      <Delete_icon width={16} height={16} />
                    </div>
                  </p>
                  <p className="heading_sec">{item.organization}</p>
                  <div className="full_time">
                    <p className="sec_head flex gap-[8px]">
                      <div className="flex gap-[4px]">
                      <div>{month[item.issuedDate?.month - 1]}</div>
                        <div>{item.issuedDate?.year}</div>
                      </div>
                      to
                      <div className="flex gap-[4px]">
                      <div>{month[item.expiryDate?.month - 1]}</div>
                        <div>{item.expiryDate?.year}</div>
                      </div>
                    </p>
                    <div className="vertical_line"></div>
                    <a
                      href={item.certificateURL?.url}
                      target="_blank"
                      className="sec_head"
                    >
                      {item.certificateURL?.url}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {addCerticate && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <AddCertificate setAddCertificate={setAddCertificate} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
