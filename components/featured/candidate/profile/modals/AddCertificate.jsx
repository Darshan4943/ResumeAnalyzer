import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MiniLoader from "../../../../common/mini-loader";
import { reCallUserData } from "../../../../../Redux/actions/user";

function AddCertificate({ setAddCertificate ,editCourseData}) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cerficateData, setcertificateData] = useState({
    certificateName: "",
    certificateProvider: "",
    certificateId: "",
    certificateUrl: "",
    issuedOn: {
      month: "Month",
      year: "Year",
    },
    expiryOn: {
      month: "Month",
      year: "Year",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcertificateData({
      ...cerficateData,
      [name]: value,
    });
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
  
  const userDataGlobal = useSelector((state) => state.userData);

  useEffect(() => {
    if (editCourseData) {
      setcertificateData({
        certificateName: editCourseData.name || "",
        certificateProvider: editCourseData.organization || "",
        certificateId: editCourseData.certificateId || "",
        
        issuedOn: {
          month: editCourseData.issuedDate?.month || "Month",
          year: editCourseData.issuedDate?.year || "Year",
        },
        expiryOn: {
          month: editCourseData.expiryDate?.month || "Month",
          year: editCourseData.expiryDate?.year || "Year",
        },
        certificateUrl: editCourseData.certificateURL?.url || "",
      });
    }
  }, [editCourseData]);
  
  const postData = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", cerficateData.certificateName);
    formData.append("organization", cerficateData.certificateProvider);
    formData.append("certificateId", cerficateData.certificateId);
    formData.append("issuedDate", JSON.stringify(cerficateData.issuedOn));
    formData.append("expiryDate", JSON.stringify(cerficateData.expiryOn));
    formData.append("certificateurl", cerficateData.certificateUrl);
    axios
      .post(
        "https://freedygoservices.in/api/candidate/addCourse/" + userDataGlobal._id,
        formData
      )
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          dispatch(reCallUserData());
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
  };

  const DatePicker = () => (
    <div className="flex gap-[12px] w-full justify-between">
      <div className="flex flex-col gap-2 w-[50%]">
        <div>
          <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
            Issued On
          </label>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small w-[50%]">
            <select
              value={cerficateData.issuedOn.month}
              onChange={(e) =>
                setcertificateData({
                  ...cerficateData,
                  issuedOn: {
                    ...cerficateData.issuedOn,
                    month: e.target.value,
                  },
                })
              }
              className="w-full outline-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <option value="Month" disabled hidden className="px-4 py-2">
                Month
              </option>

              {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
                  {new Date(0, month - 1).toLocaleString("en", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>

            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px]"
              alt=""
            />
          </div>

          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small  w-[50%]">
            <select
              value={cerficateData.issuedOn.year}
              onChange={(e) =>
                setcertificateData({
                  ...cerficateData,
                  issuedOn: {
                    ...cerficateData.issuedOn,
                    year: e.target.value,
                  },
                })
              }
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              className="w-full outline-none"
            >
              <option value="Year" disabled hidden>
                Year
              </option>
              {getYear().map((year) => (
                <option key={year} value={year} className="mt-4 px-4 py-2">
                  {year}
                </option>
              ))}
            </select>
            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px]"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[50%]">
        <div>
          <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
            Expiry on
          </label>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small w-[50%]">
            <select
              value={cerficateData.expiryOn.month}
              onChange={(e) =>
                setcertificateData({
                  ...cerficateData,
                  expiryOn: {
                    ...cerficateData.expiryOn,
                    month: e.target.value,
                  },
                })
              }
              className="w-full outline-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <option value="Month" disabled hidden>
                Month
              </option>
              {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
                  {new Date(0, month - 1).toLocaleString("en", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px]"
              alt=""
            />
          </div>
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small w-[50%]">
            <select
              value={cerficateData.expiryOn.year}
              onChange={(e) =>
                setcertificateData({
                  ...cerficateData,
                  expiryOn: {
                    ...cerficateData.expiryOn,
                    year: e.target.value,
                  },
                })
              }
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
              className="w-full outline-none"
            >
              <option value="Year" disabled hidden>
                Year
              </option>
              {getYear().map((year) => (
                <option key={year} value={year} className="px-4 py-2">
                  {year}
                </option>
              ))}
            </select>
            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px]"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[24px] font-[500] leading-[160%]">
              Add Certification
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-[60%]"></div>
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
          <p className="text-[#333] text-[16px] font-[500] ">
            Certification Name<span className="text-[#C00000]">*</span>
          </p>
          <input
            type="text"
            value={cerficateData.certificateName}
            name={"certificateName"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
            placeholder="Enter certification name here"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[16px] font-[500] ">
            Certification Provider
          </p>
          <input
            type="text"
            value={cerficateData.certificateProvider}
            name={"certificateProvider"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
            placeholder="Enter your certification provider"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[16px] font-[500] ">
            Certification ID
          </p>
          <input
            type="text"
            value={cerficateData.certificateId}
            name={"certificateId"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
            placeholder="Enter your course completion ID"
          />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="text-[#333] text-[16px] font-[500] ">
            Certification URL
          </p>
          <input
            type="text"
            value={cerficateData.certificateUrl}
            name={"certificateUrl"}
            onChange={handleInputChange}
            className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
            placeholder="Enter your certification URL"
          />
        </div>
        <DatePicker />
        <div className="flex justify-end items-start self-stretch gap-[12px]">
          <button
            className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px]    text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF]"
            onClick={() => setAddCertificate(false)}
          >
            Cancel
          </button>
          <button
            className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px] bg-[#06A9EF] text-[#fff]  text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF] h-[42px] w-[166px]"
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
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCertificate;
