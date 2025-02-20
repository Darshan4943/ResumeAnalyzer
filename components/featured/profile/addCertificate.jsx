import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import DateSelector from "../../common/dateSelector";

function AddCertificate({ setAddCertificate, editCourseData, Course }) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [cerficateData, setcertificateData] = useState({
    certificateName: "",
    certificateProvider: "",
    certificateId: "",
    certificateUrl: "",
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
    ...(editCourseData && {
      certificateName: Course?.name,
      certificateProvider: Course?.organization,
      certificateId: Course?.certificateId,
      certificateUrl: Course?.certificateURL?.url,
      duration: {
        start: {
          year: Course?.duration?.startDate?.year || "Year",
          month: Course?.duration?.startDate?.month || "Month",
        },
        end: {
          year: Course?.duration?.endDate?.year || "Year",
          month: Course?.duration?.endDate?.month || "Month",
        },
      },
    }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcertificateData({ ...cerficateData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!cerficateData.certificateName.trim()) {
      newErrors.certificateName = "Certificate name is required.";
    }
    if (!cerficateData.certificateProvider.trim()) {
      newErrors.certificateProvider = "Certificate provider is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function getYear() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  }

  const isEditing = !!editCourseData;

  const postData = () => {
    if (!validateFields()) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);

    const obj = {
      name: cerficateData.certificateName,
      organization: cerficateData.certificateProvider,
      certificateId: cerficateData.certificateId,
      duration: {
        startDate: {
          year: cerficateData.duration?.start.year,
          month: cerficateData.duration?.start.month,
        },
        endDate: {
          year: cerficateData.duration?.end.year,
          month: cerficateData.duration?.end.month,
        },
      },
      certificateurl: cerficateData.certificateUrl,
    };

    if (isEditing) {
      axios
        .put(
          `https://dev.api.skilotech.com/api/candidate/${userDataGlobal?._id}/updateCourse/${Course._id}`,
          obj
        )
        .then((res) => {
          console.log(444, res.data);
          dispatch(fetchUserData());
          setAddCertificate(false);
          toast.success("Course updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          "https://dev.api.skilotech.com/api/candidate/addCourse/" +
            userDataGlobal?._id,
          obj
        )
        .then((res) => {
          if (res.data.success) {
            setLoading(false);
            dispatch(fetchUserData());
            toast.success("Course Addedd Successfully");
            setAddCertificate(false);
          } else {
            setLoading(false);
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");

          setLoading(false);
        });
    }
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[18px]  font-[600] min-w-[160px] leading-[160%]">
              {isEditing ? "Edit Certification" : "Add Certification"}
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-full"></div>
            <svg
              onClick={() => setAddCertificate(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_140784)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>
          <p className="text-[#646464] text-[14px] font-[400]">
            Add details of Certifications you have completed
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[14px] font-[500] ">
            Certification Name<span className="text-[#C00000]">*</span>
          </p>
          <input
            type="text"
            value={cerficateData.certificateName}
            name={"certificateName"}
            onChange={handleInputChange}
            className={`flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid w-[100%] text-[12px] text-[#646464] ${
              errors.certificateName ? "border-red" : "border-[#DEDEDE]"
            } `}
            placeholder="Enter certification name here"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[14px] font-[500] ">
            Certification Provider<span className="text-[#C00000]">*</span>
          </p>
          <input
            type="text"
            value={cerficateData.certificateProvider}
            name={"certificateProvider"}
            onChange={handleInputChange}
            className={`flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%] text-[12px] text-[#646464]  ${
              errors.certificateProvider ? "border-red" : "border-[#DEDEDE]"
            } `}
            placeholder="Enter your certification provider"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[14px] font-[500] ">
            Certification ID
          </p>
          <input
            type="text"
            value={cerficateData.certificateId}
            name={"certificateId"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid w-[100%] text-[12px] text-[#646464] border-[#DEDEDE]  "
            placeholder="Enter your course completion ID"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[14px] font-[500] ">
            Certification URL
          </p>
          <input
            type="text"
            value={cerficateData.certificateUrl}
            name={"certificateUrl"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%] text-[12px] text-[#646464]"
            placeholder="Enter your certification URL"
          />
        </div>
        <div className="w-full">
          <DateSelector
            idPrefix="addCourse"
            data={cerficateData}
            dataSeter={setcertificateData}
            isRow={true}
          />
        </div>

        <div className="flex justify-end items-start self-stretch gap-[12px]">
          <button
            className="flex py-[8px] px-[16px] justify-center items-center rounded-[30px]    text-[14px] font-[500] border-[1px] border-solid border-[#06A9EF]"
            onClick={() => setAddCertificate(false)}
          >
            Cancel
          </button>
          <button
            className="flex py-[8px] px-[16px] justify-center items-center rounded-[30px] bg-[#06A9EF] text-[#fff]  text-[14px] font-[500] border-[1px] border-solid border-[#06A9EF] h-[42px] w-[166px]"
            onClick={postData}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-[#e0e0e0] animate-spin fill-[#06a9ef]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </>
            ) : (
              <>{isEditing ? "Save Changes" : "Add Certificate"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCertificate;
