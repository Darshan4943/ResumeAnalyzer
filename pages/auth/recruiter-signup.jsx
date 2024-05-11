import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from "../../Redux/actions/user";
import { plans, telCode } from "../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import ReactSelect from "react-select";
import ImageContainer from "../../components/common/image";
import ImageCropper from "../../components/featured/candidate/createResume/components/imageCropper";
import MiniLoader from "../../components/common/mini-loader";

function Recruiter_signup({}) {
  const router = useRouter();
  const { byAdmin, isUpdate } = router.query;
  const userDataGlobal = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const [modelView, setModelView] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[3]);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [error, setError] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);
  const [isSend, setIssend] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState(null);
  const [otpEntered, setOtpEntered] = useState(null);
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    currentLocation: "",
    dial_code: "+260",
    img: null,
  });
  console.log(data);
  const [file, setFile] = useState(null);

  const fileRef = useRef(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      // 2 MB limit
      if (selectedFile.type.includes("image")) {
        setFile(selectedFile);
        setModelView(true);
        setError(false);
        event.target.value = "";
      } else {
        toast.error("Only Image files are allowed");
      }
    } else {
      toast.error("Please select a file that is  2 MB.");
    }
  };
  useEffect(() => {
    setData({ ...data, img: croppedImage?.blob });
  }, [croppedImage]);

  useEffect(() => {
    const {
      email,
      mobileNo,
      firstName,
      lastName,
      role,
      location,
      profilePicture,
    } = userDataGlobal;
    setData({
      ...data,
      email,
      mobileNo,
      firstName,
      lastName,
      role,
      currentLocation: location,
    });
    if (profilePicture) {
      setCroppedImage({ url: profilePicture });
    }
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const [formError, setFormError] = useState({});
  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "firstName":
        if (!value.trim()) {
          errors.firstName = "First Name is required";
        } else if (!isNaN(value)) {
          errors.firstName = "First Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.firstName = "First Name cannot contain numbers";
        } else {
          delete errors.firstName;
        }
        break;
      case "lastName":
        if (!value.trim()) {
          errors.lastName = "Last Name is required";
        } else if (!isNaN(value)) {
          errors.lastName = "Last Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.lastName = "Last Name cannot contain numbers";
        } else {
          delete errors.lastName;
        }
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Invalid email format";
        } else {
          delete errors.email;
        }
        break;

      case "mobileNo":
        if (!value.trim()) {
          errors.mobileNo = "Mobile Number is required";
        } else if (isNaN(value)) {
          errors.mobileNo = "Mobile Number cannot be text";
        } else {
          delete errors.mobileNo;
        }
        break;
      case "currentLocation":
        if (!value.trim()) {
          errors.currentLocation = "Current Location is required";
        } else {
          delete errors.currentLocation;
        }
        break;
      case "password":
        if (!isUpdate) {
          if (!value.trim() || value.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long";
          } else {
            delete errors.password;
          }
          if (!value.trim() || value.trim() != data.confirmPassword) {
            errors.confirmPassword = "Password do not match";
          } else {
            delete errors.confirmPassword;
          }
        }

        break;
      case "confirmPassword":
        if (!isUpdate) {
          if (!value.trim() || value.trim() != data.password) {
            errors.confirmPassword = "Password do not match";
          } else {
            delete errors.confirmPassword;
          }
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };
  const handleInputChange = (fieldName, value) => {
    if (fieldName == "mobileNo") {
      if (value.replace(/\D/g, "").length <= 10) {
        setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
    setSearchTerm("");
  };
  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);

    const filteredCodes = telCode.filter(filterLogic);
    setFilteredTelCode(filteredCodes);
  }, [telCode, searchTerm]);

  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "currentLocation",
      "mobileNo",
    ];
    const emptyFields = requiredFields.filter((field) => !data[field]);
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;
    const sendToPurchase = JSON.parse(localStorage.getItem("purchase"));

    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else if (!verified) {
      setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
    } else {
      const url = isUpdate
        ? "https://freedygoservices.in/api/updateUser"
        : "https://freedygoservices.in/api/skiloteckuser/recruiter";
      // setLoading(true);
      const formdata = new FormData();
      Object.keys(data).forEach((key) => {
        if (key == "email") {
          formdata.append(key, data[key].toLowerCase());
        } else if (key == "currentLocation") {
          formdata.append("location", data[key]);
        } else {
          formdata.append(key, data[key]);
        }
      });
      if (isUpdate) {
        formdata.append("role", userDataGlobal?.role);
      }
      formdata.append("byAdmin", byAdmin);
      axios
        .post(url, formdata)
        .then((res) => {
          const response = res.data;
          try {
            if (response?.success) {
              if (isUpdate) {
                dispatch(reCallUserData());
                toast.success("Updated Successfully");
                router.push("/profile");
              } else {
                if (byAdmin) {
                  router.push("/dashboard/Recruiters");
                } else {
                  localStorage.setItem("authToken", JSON.stringify(response));
                  dispatch(reCallUserData());
                  toast.success("Sign up Successfully");
                  if (sendToPurchase && sendToPurchase?.status) {
                    window.location.href = `/purchase/details?id=${
                      sendToPurchase.index + 1
                    }`;
                    setLoading(false);
                  } else {
                    window.location.href = `/home`;
                    setLoading(false);
                  }
                }
              }
            } else {
              setLoading(false);
              if (response.message === "user already exist") {
                toast.error("User already exists");
              } else {
                toast.error("Something went wrong");
              }
            }
          } catch (err) {
            setLoading(false);
            toast.error("Something went wrong");
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error("Something went wrong");
          setLoading(false);
        });
    }
  };

  const handleVerification = (e) => {
    setResend(false);
    setTimer(30);
    setLoadingg(true);
    e.preventDefault();
    let otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp);
    axios
      .post("https://freedygoservices.in/api/otpMailSignup", {
        userEmail: data.email,
        otp,
      })
      .then((res) => {
        setLoadingg(false);
        const result = res.data;
        if (result.success) {
          setVerify(true);
        } else if (result.message === "user already exist") {
          toast.error("User already exists");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
        setLoadingg(false);
      });
  };

  useEffect(() => {
    if (verify) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval);
            setResend(true);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [verify, resend]);

  useEffect(() => {
    if (!verify) {
      setTimer(30);
      setResend(false);
    }
  }, [verify]);

  const verifyOtp = () => {
    if (otp == otpEntered) {
      setVerified(true);
    } else {
      toast.error("OTP does not match");
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <>
      {modelView && (
        <ImageCropper
          setModelView={setModelView}
          file={file}
          setCroppedImage={setCroppedImage}
        />
      )}
      <div className=" relative !important">
        <div className="register_head sticky ml:top-[50px] top-[2rem] w-[100%] z-50 pb-4 ml:pt-10 pt-6 bg-white">
          <div className="register_cadidate py-3 px-2 overflow-hidden">
            <div className="register_text_parent">
              <div className="register_heding text-center">
                <p className="ml:text-[30px] text-[24px] font-semibold text-white">
                  Register as Recruiter
                </p>
                <p className="register_heding_desc">
                  Fill up these details to start using the services from
                  Skilotech
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={" pb-8  "}>
          <div className="flex flex-col gap-4">
            <motion.div className=" flex justify-center pt-4  pb-2">
              <div className="personal_details_form scr1250:w-[60%] sm:w-[80%] w-[95%] education_page  ">
                <>
                  {byAdmin ? null : (
                    <>
                      {" "}
                      <p className="text-[16px] font-medium">Profile Photo</p>
                      <div className="flex sm:gap-6 gap-3">
                        {croppedImage ? (
                          <ImageContainer
                            src={croppedImage.url}
                            alt="Selected File"
                            className="w-[112px] h-[112px] rounded-[50%] object-cover"
                          />
                        ) : (
                          <svg
                            width="112"
                            height="112"
                            viewBox="0 0 112 112"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112Z"
                              fill="#EFFAFF"
                            />
                            <path
                              d="M72.8477 57.6827C82.1815 49.1895 82.1815 35.4193 72.8477 26.9261C63.514 18.4329 48.381 18.4329 39.0472 26.9261C29.7135 35.4193 29.7135 49.1895 39.0472 57.6827C48.381 66.176 63.514 66.1759 72.8477 57.6827Z"
                              fill="#D4E5EF"
                            />
                            <path
                              d="M55.9999 112C73.0337 112 88.289 104.393 98.5599 92.3928C93.1095 75.6573 76.1192 66.7704 55.9999 66.7704C35.8806 66.7704 18.8903 75.6573 13.4399 92.3928C23.7108 104.393 38.9661 112 55.9999 112Z"
                              fill="#D4E5EF"
                            />
                          </svg>
                        )}

                        <div className="flex flex-col gap-3 w-[168px] text-center items-center ">
                          <p className="text-[12px] font-normal">
                            Allowed file formats: jpg, jpeg | up to 2 MB
                          </p>
                          <div className="text-[12px] font-semibold px-4 py-2 rounded-[8px] bg-[#06A9EF] text-white w-[135px] upload-btn-wrapper">
                            <input
                              type="file"
                              ref={fileRef}
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                            Upload Picture
                          </div>
                          <div
                            className="text-[12px] font-semibold px-4 py-2 rounded-[8px]  border border-[#06A9EF]  w-[135px] cursor-pointer"
                            onClick={() => {
                              setFile(null);
                              setCroppedImage(null);
                              setError(false);
                            }}
                          >
                            Remove Picture
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {error && <div className="text-[16px] text-red">{error}</div>}
                  <div className="flex gap-6 w-[100%] ml:flex-row flex-col ">
                    <div className="personal_name_parent flex ml:flex-row flex-col ml:w-[48%] w-[100%]">
                      <div className="personal_name ml:w-[47%] w-[100%]">
                        <p className="form_text_heading">
                          First name <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          id="first_name"
                          placeholder="Enter first name"
                          value={data.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError.firstName}
                          </p>
                        )}
                      </div>

                      <div className="personal_name ml:w-[47%] w-[100%]">
                        <p className="form_text_heading">
                          Last name <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          id="first_name"
                          placeholder="Enter Last name"
                          value={data.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError?.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="personal_single_input">
                      <p className="form_text_heading">
                        Contact Number <span className="star">*</span>
                      </p>
                      <div
                        className={`flex w-[100%] items-start ${
                          isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                        }`}
                        id="single_input"
                      >
                        <div
                          className={`relative min-w-[150px] ${
                            isViewportBelow850 ? "w-[65%] " : "w-[40%] "
                          } items-center`}
                        >
                          <div className="  w-[100%] text-[14px] justify-center items-center  flex font-[500] text-[#646464]">
                            <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[140px] w-[100%]">
                              <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                                <ReactSelect
                                  options={filteredTelCode}
                                  className="w-[100%] flex  items-center py-1  rounded-[8px]"
                                  name=""
                                  placeholder="Select"
                                  value={selectedItem}
                                  onChange={handleItemClick}
                                  getOptionLabel={(option) => (
                                    <div className="flex items-center  ">
                                      <img
                                        src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                        width="20px"
                                      />
                                      <span className="ml-2">
                                        {option.code} {option.dial_code}
                                      </span>
                                    </div>
                                  )}
                                  getOptionValue={(option) => option.code}
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      border: "none",

                                      minWidth: "130px",
                                    }),
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <input
                          className="w-full mobileNo "
                          type="text"
                          name=""
                          // id="single_input"
                          placeholder={`${
                            isViewportBelow850
                              ? "Enter Number "
                              : "Enter Contact Number "
                          }`}
                          value={data.mobileNo}
                          onChange={(e) =>
                            handleInputChange("mobileNo", e.target.value)
                          }
                        />
                      </div>

                      {/* Display error message if any */}
                      {formError && (
                        <p className="text-[12px] text-[red] font-[500]">
                          {formError?.mobileNo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 ml:flex-row flex-col  w-[100%]">
                    <div className="flex flex-col gap-4 ml:w-[50%] w-[100%]">
                      <div className="personal_single_input w-[100%]">
                        <p className="form_text_heading">
                          Email <span className="star">*</span>
                        </p>
                        <div className="flex gap-2 items-center justify-center">
                          <input
                            type="email"
                            name=""
                            id="single_input"
                            placeholder="Enter Email"
                            value={data.email}
                            onChange={(e) => {
                              handleInputChange("email", e.target.value);
                              setVerify(false);
                              setVerified(false);
                            }}
                          />
                          {!verified && (
                            <>
                              {!verify ? (
                                <button
                                  onClick={handleVerification}
                                  className=" ms:min-w-[150px] min-w-[95px] ms:text-[16px] text-[12px] font-medium flex justify-center items-center border border-blue bg-blue text-white  py-3 ms:px-4 px-2 rounded-[8px] leading-tight h-[48px] "
                                >
                                  {loadingg ? (
                                    <MiniLoader />
                                  ) : (
                                    <>Verify Email</>
                                  )}
                                </button>
                              ) : (
                                <button className=" min-w-[150px] text-[16px] font-medium flex justify-center items-center border border-blue text-[#C00000]  py-3 px-4 rounded-[8px] leading-tight h-[48px] ">
                                  {loadingg ? (
                                    <MiniLoader />
                                  ) : (
                                    <>
                                      {!resend ? (
                                        <p>{formatTime(timer)}</p>
                                      ) : (
                                        <p onClick={handleVerification}>
                                          Resend Code
                                        </p>
                                      )}
                                    </>
                                  )}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError?.email}
                          </p>
                        )}
                      </div>
                      {verify && (
                        <div className="flex flex-col gap-2 font-medium">
                          Enter Code
                          <div className="flex gap-4 h-[48px]  items-center ">
                            <input
                              type="text"
                              name=""
                              id="single_input"
                              placeholder="Enter Otp"
                              className="border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[50%] leading-tight"
                              onChange={(e) =>
                                setOtpEntered(parseInt(e.target.value))
                              }
                            />
                            {!verified && (
                              <button
                                onClick={verifyOtp}
                                className="flex justify-center  items-center py-3 px-4 bg-blue text-white rounded-[12px] leading-tight"
                              >
                                Verify
                              </button>
                            )}
                            {verified && (
                              <div className="flex gap-2 text-[14px] font-medium items-center text-[#0C8A0A]">
                                <svg
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g mask="url(#mask0_662_15219)">
                                    <path
                                      d="M10.6 17.1L17.65 10.05L16.25 8.65L10.6 14.3L7.75 11.45L6.35 12.85L10.6 17.1ZM12 22.5C10.6167 22.5 9.31667 22.2375 8.1 21.7125C6.88333 21.1875 5.825 20.475 4.925 19.575C4.025 18.675 3.3125 17.6167 2.7875 16.4C2.2625 15.1833 2 13.8833 2 12.5C2 11.1167 2.2625 9.81667 2.7875 8.6C3.3125 7.38333 4.025 6.325 4.925 5.425C5.825 4.525 6.88333 3.8125 8.1 3.2875C9.31667 2.7625 10.6167 2.5 12 2.5C13.3833 2.5 14.6833 2.7625 15.9 3.2875C17.1167 3.8125 18.175 4.525 19.075 5.425C19.975 6.325 20.6875 7.38333 21.2125 8.6C21.7375 9.81667 22 11.1167 22 12.5C22 13.8833 21.7375 15.1833 21.2125 16.4C20.6875 17.6167 19.975 18.675 19.075 19.575C18.175 20.475 17.1167 21.1875 15.9 21.7125C14.6833 22.2375 13.3833 22.5 12 22.5ZM12 20.5C14.2333 20.5 16.125 19.725 17.675 18.175C19.225 16.625 20 14.7333 20 12.5C20 10.2667 19.225 8.375 17.675 6.825C16.125 5.275 14.2333 4.5 12 4.5C9.76667 4.5 7.875 5.275 6.325 6.825C4.775 8.375 4 10.2667 4 12.5C4 14.7333 4.775 16.625 6.325 18.175C7.875 19.725 9.76667 20.5 12 20.5Z"
                                      fill="#0C8A0A"
                                    />
                                  </g>
                                </svg>
                                Verified
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="personal_single_input">
                      <div className="personal_name w-[100%]">
                        <p className="form_text_heading">
                          Current Location <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          id="single_input"
                          placeholder="Enter Your Location"
                          value={data.currentLocation}
                          onChange={(e) =>
                            handleInputChange("currentLocation", e.target.value)
                          }
                        />
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError?.currentLocation}
                          </p>
                        )}
                        <img
                          className="icon"
                          src="/images/auth/candidate/location_on.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {byAdmin || isUpdate ? null : (
                    <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                      <div className="personal_single_input">
                        <div className="personal_name w-[100%] relative">
                          <p className="form_text_heading">
                            Password <span className="star">*</span>
                          </p>
                          <input
                            type={showPassword ? "text" : "password"}
                            name=""
                            id="single_input"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={(e) =>
                              handleInputChange("password", e.target.value)
                            }
                          />

                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="absolute right-[12px] top-[36px]"
                              fill="none"
                              onClick={handleTogglePassword}
                              style={{ cursor: "pointer" }}
                            >
                              <path
                                d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                                fill="#9D9D9D"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={handleTogglePassword}
                              style={{ cursor: "pointer" }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="absolute right-[12px] top-[36px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g mask="url(#mask0_955_15194)">
                                <path
                                  d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                                  fill="#9D9D9D"
                                />
                              </g>
                            </svg>
                          )}
                          {formError && (
                            <p className="text-[12px] text-[red] font-[500]">
                              {formError?.password}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="personal_single_input">
                        <div className="personal_name w-[100%] relative">
                          <p className="form_text_heading">
                            Confirm Password <span className="star">*</span>
                          </p>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name=""
                            id="single_input"
                            placeholder="Confirm Password"
                            value={data.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                          />
                          {showConfirmPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="absolute right-[12px] top-[36px]"
                              fill="none"
                              onClick={handleToggleConfirmPassword}
                              style={{ cursor: "pointer" }}
                            >
                              <path
                                d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                                fill="#9D9D9D"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={handleToggleConfirmPassword}
                              style={{ cursor: "pointer" }}
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="absolute right-[12px] top-[36px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g mask="url(#mask0_955_15194)">
                                <path
                                  d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                                  fill="#9D9D9D"
                                />
                              </g>
                            </svg>
                          )}
                          {formError && (
                            <p className="text-[12px] text-[red] font-[500]">
                              {formError?.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className=" w-full font-[500] flex flex-row gap-[16px] justify-end ">
                    <button
                      className="buttons"
                      id="border_button"
                      onClick={(e) => {
                        e.preventDefault();
                        router.back();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="buttons font-[500] bg-[#06A9EF] text-white"
                      id="border_button"
                      onClick={submitHandler}
                    >
                      {loading ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4  text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>
                </>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recruiter_signup;
