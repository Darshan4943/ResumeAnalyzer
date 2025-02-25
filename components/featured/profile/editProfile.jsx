import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import { telCode } from "../../../utils/data";

import ReactSelect from "react-select";
import MiniLoader from "../../common/mini-loader";
function EditProfile({ setEditProfile }) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [loadingg, setLoadingg] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);
  const [isSend, setIssend] = useState(false);
  const [verify, setVerify] = useState(false);
  const [isLogo, setIsLogo] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [verified, setVerified] = useState(true);
  const [formError, setFormError] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dial_code: "",
    mobileNo: "",
    email: "",
    currentLocation: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  function validatePassword(password) {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };
    console.log("fiel", fieldName);
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
      case "currentLocation":
        if (!value.trim()) {
          errors.currentLocation = "Location is required";
        } else if (!isNaN(value)) {
          errors.currentLocation = "Location cannot be a number";
        } else if (/\d/.test(value)) {
          errors.currentLocation = "Location cannot contain numbers";
        } else {
          delete errors.currentLocation;
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

      case "password":
        if (!value.trim() || value.trim().length < 6) {
          errors.password = "Password must be at least 6 characters long";
        } else {
          delete errors.password;
        }
        if (validatePassword(value)) {
        } else {
          errors.password =
            "Password should include one uppercase letter, lowercase letter, number, and special character.";
        }
        if (!value.trim() || value.trim() != data.confirmPassword) {
          errors.confirmPassword = "Password do not match";
        } else {
          delete errors.confirmPassword;
        }

        break;
      case "confirmPassword":
        if (!value.trim() || value.trim() != data.password) {
          errors.confirmPassword = "Password do not match";
        } else {
          delete errors.confirmPassword;
        }

        break;
      case "dial_code":
        if (!value.trim()) {
          errors.dial_code = "Country Code is required";
        } else {
          delete errors.dial_code;
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
        if (value.replace(/\D/g, "").length < 10) {
          setFormError((prevErrors) => ({
            ...prevErrors,
            mobileNo: "length must be 10",
          }));
        } else {
          setFormError((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.mobileNo;
            return updatedErrors;
          });
        }
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateInput();
    if (!data.dial_code) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        dial_code: "Please Select Country Code!",
      }));
      return;
    }
    if (!data.currentLocation) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        currentLocation: "Enter Current Location",
      }));
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else if (!verified) {
      //  setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
    } else {
      setLoading(true);
      const requestData = {
        ...data,
        EmailChanged: isLogo,
      };
      axios
        .put(
          "http://localhost:2000/api/candidate/updateProfile/" +
            userDataGlobal?._id,
          requestData
        )

        .then((res) => {
          toast.success("profile edit successfully");
          dispatch(fetchUserData());
          setEditProfile(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (profileData) {
      const {
        firstName,
        lastName,
        email,
        dial_code,
        currentLocation,
        mobileNo,
      } = profileData.basics;
      setData({
        ...data,
        firstName,
        lastName,
        email,
        dial_code,
        currentLocation,
        mobileNo,
      });
      const selectedItem = telCode.find(
        (item) => item.dial_code === profileData.basics?.dial_code
      );

      if (selectedItem) {
        setSelectedItem(selectedItem);
      }
    }
  }, [profileData]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code, country: item.name });
    setSearchTerm("");
    setFormError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors.dial_code;
      return updatedErrors;
    });
  };

  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);
    const filteredCodes = telCode.filter(filterLogic);
    const firstSixCodes = filteredCodes.slice(0, 6);
    const remainingCodes = filteredCodes.slice(6);
    const sortedRemainingCodes = remainingCodes.sort((a, b) => {
      const numA = parseInt(a.dial_code.replace("+", ""), 10);
      const numB = parseInt(b.dial_code.replace("+", ""), 10);
      return numA - numB;
    });
    const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
    setFilteredTelCode(combinedCodes);
  }, [telCode, searchTerm]);

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  const handleVerification = (e) => {
    setResend(false);
    setTimer(30);
    setLoadingg(true);
    e.preventDefault();

    axios
      .post("http://localhost:2000/api/otpMailProfile", {
        userId: userDataGlobal?._id,
        userEmail: data.email,
      })
      .then((res) => {
        setLoadingg(false);
        const result = res.data;
        if (result.success) {
          setVerify(true);
        } else if (result.message === "User already exists") {
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

  const verifyOtp = (e) => {
    e.preventDefault();
    const otpEntered = Number(otp.join(""));
    axios
      .post("http://localhost:2000/api/verifyOtpProfile", {
        userId: userDataGlobal?._id,
        otpEntered,
      })
      .then((res) => {
        const result = res.data;
        if (result.success) {
          setVerify(false);
          setVerified(true);
          setIsLogo(true);
        } else {
          toast.error("OTP does not match");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
      });
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").split("").slice(0, 4);
    if (pastedData.every((char) => !isNaN(char))) {
      setOtp(pastedData);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const isEdge = () => {
    return /Edg/.test(navigator.userAgent);
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[18px]  font-[600] leading-[160%] min-w-[180px]">
              Edit Profile Details
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-full"></div>
            <svg
              onClick={() => setEditProfile(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="min-w-[40px] cursor-pointer"
            >
              <g mask="url(#mask0_5716_140784)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>

          <div className="personal_name_parent w-full">
            <div className={`personal_name w-[50%]`}>
              <p className={`form_text_heading text-[14px]  font-[500] `}>
                First Name <span className="star">*</span>
              </p>
              <input
                type="text"
                value={data.firstName}
                name="firstName"
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                // onChange={(e) => setData({ ...data, profile: e.target.value })}
                placeholder="Enter First Name"
                className={`text-[12px] px-4 h-[44px] w-full font-[400] py-1 max-h-[44px]  border-[1px]   rounded-[8px] border-solid ${
                  formError.firstName ? "border-red" : "border-[#DEDEDE]"
                }`}
              />
            </div>
            <div className="personal_name w-[50%]">
              <p className="form_text_heading text-[14px]  font-[500]">
                Last Name <span className="star">*</span>
              </p>
              <input
                type="text"
                value={data.lastName}
                name="lastName"
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter Last Name"
                className={`text-[12px] px-4 h-[44px] w-full font-[400] py-1 max-h-[44px]  border-[1px]   rounded-[8px] border-solid ${
                  formError.lastName ? "border-red" : "border-[#DEDEDE]"
                }`}
              />
            </div>
          </div>

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Email <span className="star">*</span>
            </p>
            <div className="flex gap-4 justify-between items-center">
              <input
                type="email"
                value={data.email}
                name="email"
                onChange={(e) => {
                  handleInputChange("email", e.target.value);
                  setVerify(false);
                  setVerified(false);
                  setOtp(new Array(4).fill(""));
                }}
                placeholder="Enter Email"
                className={`text-[12px] px-4 h-[44px] w-full font-[400] py-1 max-h-[44px]  border-[1px]   rounded-[8px] border-solid ${
                  formError.email ? "border-red" : "border-[#DEDEDE]"
                }`}
              />
              {!verified && (
                <>
                  {!verify ? (
                    <button
                      disabled={loadingg}
                      onClick={handleVerification}
                      className="  text-[10px] min-w-[86px] font-semibold flex justify-center items-center  bg-blue text-white py-[10px] px-3 rounded-[30px] leading-tight h-[34px] btn_hover_effect"
                    >
                      {loadingg ? <MiniLoader /> : <>Verify Email</>}
                    </button>
                  ) : (
                    <button
                      disabled={!resend}
                      className=" min-w-[86px] text-[12px] font-[600] flex justify-center items-center  text-[#C00000]  py-3  leading-tight h-[34px] "
                    >
                      {loadingg ? (
                        <MiniLoader />
                      ) : (
                        <>
                          {!resend ? (
                            <p>{formatTime(timer)}</p>
                          ) : (
                            <p onClick={handleVerification}>Resend Code</p>
                          )}
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
              {verified && isLogo && (
                <div className="flex gap-2 text-[14px] font-medium items-center text-[#0C8A0A]">
                  <svg
                    className="zoom-rotate-animation"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="22"
                      height="22"
                      rx="11"
                      fill="#34A853"
                    />
                    <path
                      d="M10.2467 14.2906L16.3595 8.1877C16.4987 8.05215 16.6633 7.98438 16.8533 7.98438C17.0433 7.98438 17.206 8.05244 17.3414 8.18856C17.477 8.32469 17.5447 8.48768 17.5447 8.67755C17.5447 8.86753 17.477 9.03155 17.3414 9.16962L10.734 15.7674C10.5962 15.9028 10.4332 15.9705 10.245 15.9705C10.0569 15.9705 9.89504 15.9028 9.75948 15.7674L6.65078 12.6587C6.51534 12.5198 6.44883 12.3553 6.45123 12.1652C6.45376 11.975 6.52308 11.8122 6.6592 11.6768C6.79533 11.5412 6.95832 11.4734 7.14819 11.4734C7.33817 11.4734 7.50219 11.5412 7.64027 11.6768L10.2467 14.2906Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {verify && (
            <div className="flex flex-col gap-2 font-medium w-full ">
              <div className="flex gap-6 h-[28px]  items-center   ">
                <text className="text-[12px] font-[500] text-[#898989]">
                  Enter OTP sent to your Email
                </text>
                <div className="flex gap-1" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      id={`otp-input-${index}`}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="border border-[#DEDEDE] rounded-[8px] w-[32px] h-[32px] text-center text-lg"
                    />
                  ))}
                </div>
                {!verified && (
                  <button
                    onClick={verifyOtp}
                    className="flex justify-center  items-center  px-4 text-[12px] font-[600] border border-blue  rounded-[30px] leading-tight btn_hover_effect h-[36px]"
                  >
                    Verify
                  </button>
                )}
              </div>
              {/* {resend &&
                <p className="text-[12px]  text-red pl-1"> Didn&apos;t receive your OTP? Please check your spam or junk folder.</p>
              } */}
            </div>
          )}

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Contact Number <span className="star">*</span>
            </p>
            <div
              className={`flex gap-4 border border-[#DEDEDE] rounded-[8px] ${
                formError.mobileNo || formError.dial_code
                  ? "border-red"
                  : "border-[#DEDEDE]"
              }`}
            >
              <div className="flex items-center  gap-1 cursor-pointer  ">
                <ReactSelect
                  options={filteredTelCode}
                  className=" flex  items-center py-1 ml-[10px]  rounded-[8px]"
                  name=""
                  placeholder="Select"
                  value={selectedItem}
                  onChange={handleItemClick}
                  getOptionLabel={(option) => (
                    <div
                      className={`flex items-center ${
                        formError.dial_code ? "border-red" : "border-[#DEDEDE]"
                      }`}
                    >
                      <img
                        src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                        width="20px"
                      />
                      <span className="ml-2 text-[#333333] text-[12px] font-[400]">
                        {option.code} {option.dial_code}
                      </span>
                    </div>
                  )}
                  // getOptionValue={(option) => option.code}
                  filterOption={customFilterOption}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",

                      minWidth: "120px",
                      outline: "none",
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      // primary25: 'hotpink',
                      primary: "neutral0",
                    },
                  })}
                />
              </div>
              <input
                type="text"
                value={data.mobileNo}
                name="mobileNo"
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                placeholder="Enter Contact Number"
                className="text-[12px]  font-[400]"
              />
            </div>
          </div>

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Current Location <span className="star">*</span>
            </p>
            <input
              type="text"
              value={data.currentLocation}
              name="currentLocation"
              onChange={(e) =>
                handleInputChange("currentLocation", e.target.value)
              }
              placeholder="Enter Current location"
              className={`text-[12px] px-4 h-[44px] w-full font-[400] py-1 max-h-[44px]  border-[1px]   rounded-[8px] border-solid ${
                formError.currentLocation ? "border-red" : "border-[#DEDEDE]"
              }`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="form_text_heading text-[14px]  font-[500]">
              Change Password
            </p>

            <div className={`flex gap-2 w-[100%]  flex-col `}>
              <div className=" flex flex-row px-[16px] py-[10px] border-[1px] rounded-[8px] items-center border-solid border-[#DEDEDE] justify-between h-[40px]">
                <input
                  type={showPassword ? "Text" : "Password"}
                  className="text-[12px] font-normal"
                  placeholder="Create New Password"
                  value={data.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />

                {!isEdge() &&
                  (showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      onClick={handleTogglePassword}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={handleTogglePassword}
                      style={{ cursor: "pointer" }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_955_15194)">
                        <path
                          d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  ))}
              </div>
              {formError && (
                <p className="text-[10px] text-[red] font-[500]">
                  {formError?.password}
                </p>
              )}

              <div className=" flex flex-row px-[16px] w-full py-[10px] border-[1px] rounded-[8px] items-center border-solid border-[#DEDEDE] justify-between h-[40px]">
                <input
                  type={showConfirmPassword ? "Text" : "Password"}
                  name=""
                  className="text-[12px] font-normal"
                  placeholder="Confirm New Password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
                {!isEdge() &&
                  (showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      onClick={handleToggleConfirmPassword}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                        fill="#333333"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={handleToggleConfirmPassword}
                      style={{ cursor: "pointer" }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_955_15194)">
                        <path
                          d="M16.1 13.3L14.65 11.85C14.8 11.0667 14.575 10.3333 13.975 9.64999C13.375 8.96665 12.6 8.69999 11.65 8.84999L10.2 7.39999C10.4833 7.26665 10.7708 7.16665 11.0625 7.09999C11.3542 7.03332 11.6667 6.99999 12 6.99999C13.25 6.99999 14.3125 7.43749 15.1875 8.31249C16.0625 9.18749 16.5 10.25 16.5 11.5C16.5 11.8333 16.4667 12.1458 16.4 12.4375C16.3333 12.7292 16.2333 13.0167 16.1 13.3ZM19.3 16.45L17.85 15.05C18.4833 14.5667 19.0458 14.0375 19.5375 13.4625C20.0292 12.8875 20.45 12.2333 20.8 11.5C19.9667 9.81666 18.7708 8.47916 17.2125 7.48749C15.6542 6.49582 13.9167 5.99999 12 5.99999C11.5167 5.99999 11.0417 6.03332 10.575 6.09999C10.1083 6.16665 9.65 6.26665 9.2 6.39999L7.65 4.84999C8.33333 4.56665 9.03333 4.35415 9.75 4.21249C10.4667 4.07082 11.2167 3.99999 12 3.99999C14.5167 3.99999 16.7583 4.69582 18.725 6.08749C20.6917 7.47916 22.1167 9.28332 23 11.5C22.6167 12.4833 22.1125 13.3958 21.4875 14.2375C20.8625 15.0792 20.1333 15.8167 19.3 16.45ZM19.8 22.6L15.6 18.45C15.0167 18.6333 14.4292 18.7708 13.8375 18.8625C13.2458 18.9542 12.6333 19 12 19C9.48333 19 7.24167 18.3042 5.275 16.9125C3.30833 15.5208 1.88333 13.7167 1 11.5C1.35 10.6167 1.79167 9.79582 2.325 9.03749C2.85833 8.27915 3.46667 7.59999 4.15 6.99999L1.4 4.19999L2.8 2.79999L21.2 21.2L19.8 22.6ZM5.55 8.39999C5.06667 8.83332 4.625 9.30832 4.225 9.82499C3.825 10.3417 3.48333 10.9 3.2 11.5C4.03333 13.1833 5.22917 14.5208 6.7875 15.5125C8.34583 16.5042 10.0833 17 12 17C12.3333 17 12.6583 16.9792 12.975 16.9375C13.2917 16.8958 13.6167 16.85 13.95 16.8L13.05 15.85C12.8667 15.9 12.6917 15.9375 12.525 15.9625C12.3583 15.9875 12.1833 16 12 16C10.75 16 9.6875 15.5625 8.8125 14.6875C7.9375 13.8125 7.5 12.75 7.5 11.5C7.5 11.3167 7.5125 11.1417 7.5375 10.975C7.5625 10.8083 7.6 10.6333 7.65 10.45L5.55 8.39999Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  ))}
              </div>
              {formError && (
                <p className="text-[10px] text-[red] font-[500]">
                  {formError?.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end items-start self-stretch gap-[12px]">
            <button
              onClick={() => setEditProfile(false)}
              className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px]    text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF]"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className=" w-[148px] flex py-[8px] px-[16px] justify-center items-center rounded-[8px] text-[#fff] text-[16px] font-[500] border-[1px] border-solid bg-[#06A9EF]"
              onClick={handleSubmit}
            >
              {loading ? <MiniLoader /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
