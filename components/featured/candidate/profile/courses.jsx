import React, { useState } from "react";
import AddCertificate from "./modals/AddCertificate";
import { Delete_icon, Edit_icon } from "../../../../utils/svg";
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
  const [editCourseData, setEditCourseData] = useState(false);
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

  const[Course,setCourse]=useState(null)
  const handleEditCourse = (item) => {
    setCourse(item)

    setEditCourseData(true); 
    setAddCertificate(true); 
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
          <p className="page_headings">Trainings</p>
          <div className="add_delete">
            <img
              style={{ width: "24px" }}
              src="./images/profile/add.png"
              alt=""
              onClick={() => {setAddCertificate(true),setEditCourseData(false)}}
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

                    <div onClick={() => handleEditCourse(item)}>
                      <Edit_icon/>
                    </div>
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
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
              <div className="absolute ms:w-[75.08%] w-[90%] h-[80vh] overflow-y-auto ">
              <AddCertificate setAddCertificate={setAddCertificate}  editCourseData={editCourseData} Course={Course} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Courses;
