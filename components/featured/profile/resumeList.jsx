
import React, { useEffect, useState } from "react";
import { timeAgo } from "../../../utils/middleware";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import DeleteModal from "../../common/deleteModal";

const ResumeList = ({ setResumeCount }) => {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({ view: false, ids: [] });
  const [resumeList, setResumeList] = useState([]);

  const [isChecked, setIsChecked] = useState();
  const [isResumes, setIsResumes] = useState("resumes");
  const dispatch = useDispatch();



  const getData = () => {
    setLoading(true);

    axios
      .get("http://localhost:2000/api/resume/" + userDataGlobal?._id)
      .then((res) => {
        const resumes = res.data.data;

        // resumes.sort((a, b) => (b.isDefault === true) - (a.isDefault === true));
        setResumeList(resumes);

        setResumeCount(resumes.length)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    getData()
  }, []);

  const deleteHandler = () => {


    axios
      .delete("http://localhost:2000/api/resume/deleteResume", {
        data: { ids: deleteData.ids },
      })
      .then((response) => {
        toast.success("Resume Deleted successfully");
        setDeleteData({ view: false, ids: "" });
        getData()
        // dispatch(fetchUserData());

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckboxChange = (resumeId) => {
    setIsResumes(resumeId)
    axios
      .put("http://localhost:2000/api/resume/updateIsDefaultResume/" + resumeId)
      .then((res) => {
        getData()
        // toast.success("Resume Deleted successfully");
        // dispatch(fetchUserData());

      })
      .catch((err) => {
        console.log(err);

      });
  };

  const closeDeleteModal = () => {
    setDeleteData({ view: false, ids: "" });
  };

  return (
    <>
      {deleteData.view && (
        <DeleteModal
          deleteHandler={deleteHandler}
          closeDeleteModal={closeDeleteModal}
          type={"Resume"}
        />
      )}
      {resumeList?.length > 0 &&
        <div style={{
          boxShadow: "0px 0px 14px 0px #00000005"
        }} className="flex flex-col gap-[18px] rounded-[16px] bg-[#FFFFFF] p-4">
          <p className="text-[16px] font-[600]">My Resume</p>
          <div className="flex flex-col gap-4  ">
            {resumeList?.map((resume) => (
              <div className={`border border-[#DEDEDE] p-3 rounded-[12px] flex justify-between items-center ${resume?.isDefault && "bg-[#E0F6FF]"}`} key={resume._id}>
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-[500]">{resume?.fileName}</p>
                  <p className="resume_text_small">
                    Last updated {timeAgo(new Date(resume?.createdAt))}
                  </p>
                  {!resume?.isDefault &&
                    <div className="flex gap-2 text-[12px] font-[500]">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(resume._id)}
                        className="custom-checkbox h-[16px] w-[16px]"
                      />
                      Set as Default
                    </div>
                  }
                </div>

                <div className=" flex gap-3">
                  <a
                    className="resume_button"
                    href={resume.resumeUrl}
                  // target="_blank"
                  >
                    <img src="./images/profile/download.png" alt="" />
                  </a>
                  <div
                    onClick={() => setDeleteData({ view: true, ids: [resume._id] })}
                    className="resume_button cursor-pointer">
                    <img src="./images/profile/delete.png" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="up_button">
        <button className="build_ai_button">Upload Resume</button>
      </div> */}
        </div>
      }
    </>
  );
};

export default ResumeList;
