import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { dateFormatter } from "../../../utils/middleware";
import axios from "axios";
import { toast } from "react-toastify";
import MiniLoader from "../../../components/common/miniLoader";

const Profile = () => {
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const data = userDataGlobal;
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

  const [companyData, setCompanyData] = useState({
    name: "",
    companyLogo: "",
    about: "",
  });
  const [initialCompanyData, setInitialCompanyData] = useState({});

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPEG, and JPG formats are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be 1MB or less.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyData((prev) => ({ ...prev, companyLogo: reader.result }));
    };

    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!userDataGlobal?._id) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.skilotech.com/api/getEmployerCompanieBy/${userDataGlobal?._id}`
        );

        if (response.data && Object.keys(response.data).length > 0) {
          setCompanyData(response.data);
          setInitialCompanyData(response.data);
        } else {
          setCompanyData(null);
        }
      } catch (error) {
        setError(error.response?.data || "Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [userDataGlobal, refreshTrigger]);

  const handleUpdateCompany = async () => {
    if (!companyData._id) {
      console.error("Company ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("name", companyData.name);
    formData.append("about", companyData.about);
    if (selectedFile) {
      formData.append("img", selectedFile);
    }

    try {
      const response = await axios.post(
        `https://api.skilotech.com/api/updateCompany/${companyData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Company details updated successfully!");
      setShowEditForm(false);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error(
        "Error updating company:",
        error.response?.data || error.message
      );
      toast.error("Failed to update company details.");
    }
  };

  return (
    <div className=" p-2 6 w-[100%] flex flex-col gap-4 ">
      <div className="w-[100%] gap-4 flex flex-col">
        <div className="text-[24px] font-Montserrat font-semibold text-[#333]">
          My Profile
        </div>
        <div className="w-[100%] ml:flex ml:flex-row  flex scr500:flex-col gap-4 flex-col-reverse  ">
          <div
            className="flex ml:flex-row flex-col items-center justify-start w-[100%] ml:w-[100%] p-6 gap-[34px] rounded-2xl bg-[#fff] "
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {
              <img
                src={
                  data?.profilePicture
                    ? data?.profilePicture
                    : "/images/profile/john_doe.png"
                }
                alt=""
                className="object-cover h-[180px] w-[180px] flex justify-center rounded-full overflow-hidden "
              />
            }

            <div className="flex flex-col w-[100%] lg:w-[80%] gap-4">
              <div className="flex flex-col w-[100%]">
                <div className="w-[100%] flex gap-[6px]">
                  {data?.role === "recruiter" ? (
                    <>
                      <img
                        src="/images/profile/check.png"
                        className="w-[20px] h-[20px] object-contain"
                        alt=""
                      />
                      <div className="text-[14px] font-Montserrat font-medium">
                        Verified Recruiter
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="text-[18px] font-Montserrat font-semibold text-[#333]">
                  Account Details
                </div>
                <div className="flex scr1024:flex-row flex-col scr1024:gap-[30px] gap-[20px]">
                  <div className=" scr1024:w-[40%] w-[100%] gap-6 flex flex-col ">
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="scr1024:w-[50%] min-w-[140px] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        User Name <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        <div className="break-all sm:text-[14px] text-[12px]   font-Montserrat font-medium text-[#333]">
                          {data?.firstName && data?.lastName
                            ? `${data?.firstName} ${data?.lastName}`
                            : null}
                        </div>
                      </div>
                    </div>

                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="scr1024:w-[50%] min-w-[140px] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Activated on <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {dateFormatter(data?.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] scr1024:w-[1px] w-[100%]  scr1024:h-[102px]  bg-[#DEDEDE]">
                    {" "}
                  </div>
                  <div className=" scr1024:w-[60%] w-[100%] gap-6 flex flex-col ">
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="scr1024:w-[50%] min-w-[140px]  text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Email ID <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] break-all sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {data?.email}
                      </div>
                    </div>
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="scr1024:w-[50%] min-w-[140px] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Contact Number <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {data?.mobileNo ? data?.mobileNo : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" bg-[#fff] ml:W-[5%] w-[48px] h-[5%] p-3 rounded-xl cursor-pointer"
            onClick={() => router.push(`/auth/Form?isUpdate=true`)}
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img
              src="/images/profile/edit.png"
              className="w-[24px] h-[24px] object-contain"
              alt=""
            />
          </div>
        </div>
      </div>

      {(userDataGlobal?.role === "employer" ||
        userDataGlobal?.role === "recruiter") &&
        (loading ? (
          <div className="loader-container">
            <MiniLoader />
          </div>
        ) : (
          companyData.name && (
            <div className="w-[100%] gap-4 flex flex-col">
              {showEditForm ? (
                <div
                  className="flex ml:flex-row flex-col items-center justify-start w-[100%] ml:w-[100%]  gap-[34px] rounded-2xl bg-[#FFFFFF] p-[24px] "
                  style={{
                    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="w-full">
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
                      <div className="flex flex-col gap-2 w-full ">
                        <label className="text-[14px] font-medium">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={companyData.name}
                          onChange={handleChange}
                          className="border border-[#DEDEDE] px-4 py-2 rounded-lg placeholder:text-gray text-[14px] focus:outline-none "
                          placeholder="Enter Company name"
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row gap-4 w-full">
                        <div className="flex flex-col gap-[8px] w-full lg:w-[40%]">
                          <label className="text-[14px] font-medium">
                            Company Logo
                          </label>
                          <p className="text-[12px] text-gray-500">
                            This image will be shown publicly as company logo.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-[60%]">
                          <div className="h-[60px] w-[140px] flex items-center justify-center rounded-md">
                            {companyData.companyLogo && (
                              <div className="flex rounded-[6px] w-[48px] h-[48px] sm:w-[76px] sm:h-[56px]">
                                <img
                                  src={companyData.companyLogo}
                                  alt="Company Logo"
                                  className="w-full h-full object-contain rounded-[6px]"
                                />
                              </div>
                            )}
                          </div>

                          <label
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="border border-[#06A9EF] border-dashed rounded-lg h-[84px] w-full sm:w-[284px] bg-[#EFFAFF] flex flex-col justify-center items-center px-4 py-4 cursor-pointer"
                          >
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <svg
                              width="33"
                              height="32"
                              viewBox="0 0 33 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_9969_105416)">
                                <path
                                  d="M20.1719 10.6641H20.1852"
                                  stroke="#06A9EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M22.8411 5.33594H9.50781C7.29867 5.33594 5.50781 7.1268 5.50781 9.33594V22.6693C5.50781 24.8784 7.29867 26.6693 9.50781 26.6693H22.8411C25.0503 26.6693 26.8411 24.8784 26.8411 22.6693V9.33594C26.8411 7.1268 25.0503 5.33594 22.8411 5.33594Z"
                                  stroke="#06A9EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5.50781 19.9999L10.8411 14.6666C11.4492 14.0815 12.139 13.7734 12.8411 13.7734C13.5433 13.7734 14.2331 14.0815 14.8411 14.6666L21.5078 21.3333"
                                  stroke="#06A9EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M18.8359 18.664L20.1693 17.3307C20.7773 16.7455 21.4671 16.4375 22.1693 16.4375C22.8714 16.4375 23.5612 16.7455 24.1693 17.3307L26.8359 19.9973"
                                  stroke="#06A9EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_9969_105416">
                                  <rect
                                    width="32"
                                    height="32"
                                    fill="white"
                                    transform="translate(0.171875)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <div className="text-center">
                              <div className="text-[12px] font-[400]">
                                <span className="text-[#06A9EF]">
                                  Click to replace
                                </span>{" "}
                                or drag and drop
                              </div>
                              <div className="text-[10px] font-[400]">
                                SVG, PNG, JPG or GIF (max. 400 x 400px)
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col  gap-[8px]">
                      <label className="text-[14px] font-medium">
                        About Company
                      </label>
                      <textarea
                        name="about"
                        value={companyData.about}
                        onChange={handleChange}
                        rows="4"
                        className="border border-[#DEDEDE] px-4 py-2 rounded-lg w-full text-[14px] placeholder:text-gray outline-none "
                        placeholder="Enter details about the company..."
                      ></textarea>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setShowEditForm(false)}
                        className="px-[26px] red_border_Button h-[38px] rounded-[30px]"
                      >
                        Cancel
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCompanyData(initialCompanyData)}
                          className="text-[12px] md:text-[14px] font-semibold  px-6  blue_border_Button rounded-[30px] h-[38px]"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handleUpdateCompany}
                          className="text-[12px] md:text-[14px] font-semibold  px-6  bg_Button rounded-[30px] h-[38px]"
                        >
                          Save Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[100%] ml:flex ml:flex-row  flex scr500:flex-col gap-4 flex-col-reverse  ">
                  <div
                    className="flex ml:flex-row flex-col items-center justify-start w-[100%] ml:w-[100%]  gap-[34px] rounded-2xl bg-[#FFFFFF] p-[24px] "
                    style={{
                      boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="flex flex-col p-4 sm:p-6 md:p-8 gap-4 sm:gap-6">
                      <div className="flex gap-3 sm:gap-4 items-center">
                        {companyData.companyLogo && (
                          <div className="flex rounded-[6px] w-[48px] h-[48px] sm:w-[56px] sm:h-[56px]">
                            <img
                              src={companyData.companyLogo}
                              alt="Company Logo"
                              className="w-full h-full object-contain rounded-[6px]"
                            />
                          </div>
                        )}

                        <div className="text-[14px] sm:text-[16px] font-semibold">
                          {companyData.name || "Company Name"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="text-[14px] sm:text-[16px] font-semibold">
                          About Company
                        </div>
                        <div
                          className="text-[12px] sm:text-[14px] font-normal overflow-hidden text-ellipsis"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {companyData?.about || "No description available."}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className=" bg-[#fff] ml:W-[5%] w-[48px] h-[5%] p-3 rounded-xl cursor-pointer"
                    onClick={() => setShowEditForm(true)}
                    style={{
                      boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img
                      src="/images/profile/edit.png"
                      className="w-[24px] h-[24px] object-contain"
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
          )
        ))}
    </div>
  );
};

export default Profile;
