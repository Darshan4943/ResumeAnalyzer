import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import ReactSelect from "react-select";
import ImageContainer from "../../components/common/image";
import ImageCropper from "../../components/featured/candidate/createResume/components/imageCropper";
import MiniLoader from "../../components/common/mini-loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { telCode, uploadFile } from "../../utils/data";
import { UploadSvg } from "../../utils/svg";

function AdminDetails({
  tog,
  updateTog,
  setIsCompleted,
  setProgress,
  setIsCompleted1,
  setProgress1,
  formData,
  setFormData,
  role,
  recOptions
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modelView, setModelView] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [error, setError] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);
  const [isSend, setIssend] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpEntered, setOtpEntered] = useState(null);
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [parseData, setParseData] = useState();
  const [formError, setFormError] = useState({});

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

  function validatePassword(password) {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;
    return strongPasswordRegex.test(password);
  }

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");


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
        } else if (value.length < 10) {
          errors.mobileNo = "Mobile Number must be 10 digits";
        } else {
          delete errors.mobileNo;
        }
        break;

      case "password":
        if (!value.trim() || value.trim().length < 6) {
          errors.password = "Password must be at least 6 characters long";
        } else if (!validatePassword(value)) {
          errors.password =
            "Password should include one uppercase letter, one lowercase letter, one number, and one special character.";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (!value.trim() || value.trim() != formData.password) {
          errors.confirmPassword = "Password do not match";
        } else {
          delete errors.confirmPassword;
        }

        break;
      case "idProof":
        if (!value.trim()) {
          errors.idProof = "Id Proof is required";
        } else {
          delete errors.idProof;
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
        setFormData({ ...formData, [fieldName]: value.replace(/\D/g, "") });
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
      setFormData({ ...formData, [fieldName]: value });
      validateInput(fieldName, value);
    }
  };
  const validateFields = () => {
    const requiredFields = [
      { key: "firstName", error: "Enter First Name" },
      { key: "lastName", error: "Enter Last Name" },
      { key: "email", error: "Enter a valid Email" },
      { key: "dial_code", error: "Select a country code" },
      { key: "mobileNo", error: "Enter Contact Number" },
      { key: "password", error: "Enter Password" },
      { key: "confirmPassword", error: "Enter Confirm Password" },
      { key: "idProof", error: "Enter Id Proof" },
    ];

    let errors = { ...formError };

    requiredFields.forEach((field) => {
      const value = formData[field.key];
      if (!value || (typeof value === "string" && !value.trim())) {
        errors[field.key] = field.error;
      }
    });

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validateFields(); // Validate all fields
    if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!verified) {
      setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
      return;
    }

    updateTog(3);
    setProgress1(100);
    setTimeout(() => {
      setIsCompleted1(true);
    }, 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setFormData({ ...formData, dial_code: item.dial_code, country: item.name });
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
    setLoadingg(true);
    e.preventDefault();
    let tempUser = role === "employer" ? "tempEmployer" : "tempRecruiter";
    axios
      .post("https://dev.api.skilotech.com/api/otpMailSignup", {
        userEmail: formData.email.toLowerCase(),
        tempUser,
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
        setResend(false);
        setTimer(30);
      })
      .catch((err) => {
        toast.error(err?.response?.formData?.message);
        setLoadingg(false);
      });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      if (file.size > 1048576) {
        // setFormError((prev) => ({
        //   ...prev,
        //   [name]: "File size must be less than 1MB",
        // }));
        toast.error("File size must be less than 1MB")
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
      delete formError.idProof;
      delete formError.idProofCertificate;
      setFormError((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
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
      .post("https://dev.api.skilotech.com/api/verifyOtp", {
        userEmail: formData.email.toLowerCase(),
        otpEntered,
      })
      .then((res) => {
        const result = res.data;
        if (result.success) {
          setVerify(false);
          setVerified(true);
        } else {
          toast.error("OTP does not match");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const isEdge = () => {
    return /Edg/.test(navigator.userAgent);
  };
  const handleBack = () => {
    setProgress(0);
    setIsCompleted(false);
    updateTog(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = async () => {


    const isValid = validateFields(); // Validate all fields
    if (!isValid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!verified) {
      setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
      return;
    }
    if (!formData.idProofCertificate) {
      setFormError({ ...formError, idProofCertificate: "I Proof Certificate is required" })
    }
    setLoading(true);
  
    const idProofCertificateUrl = await uploadFile(formData.idProofCertificate, "idProofCertificate");
    const certificateUrl = await uploadFile(formData.certificate, "certificate");
    const companyLogoUrl = await uploadFile(formData.companyLogo, "companyLogo");

  
    // if (!idProofCertificateUrl || !certificateUrl || !companyLogoUrl) {
    //   setLoading(false);
    //   toast.error("File upload failed. Please try again.");
    //   return;
    // }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value && !["idProofCertificate", "certificate", "companyLogo"].includes(key)) {
        formDataToSend.append(key, value);
      }
    });

  
    formDataToSend.append("idProofCertificate", idProofCertificateUrl);
    formDataToSend.append("certificate", certificateUrl);
    formDataToSend.append("companyLogo", companyLogoUrl);
    formDataToSend.append("role", role);
    formDataToSend.append("recOptions", recOptions);

   

    const url = "https://dev.api.skilotech.com/api/skiloteckuser/employerSignUp";

    axios
      .post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const response = res.data;
        try {
          if (response?.success) {

            localStorage.setItem("authToken", JSON.stringify(response));
            window.location.href = `/?signIn=false`;
            setLoading(false);
            toast.success("Sign up Successfully");

          } else {
            setLoading(false);
            if (response.message === "User already exists") {
              toast.error("User already exists");
            } else {
              toast.error("Something went wrong");
            }
          }
        } catch (err) {
          toast.error("Something went wrong");
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <>
      <div

        className={`flex  w-full  flex-col gap-3 md:gap-4 `}
      >
        <div className="w-full flex flex-col scr540:flex-row gap-3 scr540:gap-[20px]">
          <div className="flex w-full flex-col gap-1">
            <div className="text-[14px] font-[500] text-[#333333]">
              First Name<span className="text-red">*</span>
            </div>
            <div
              className={`w-full rounded-[8px] py-[8px] px-4 border  flex ${formError?.firstName ? "border-red" : "border-[#9D9D9D]"
                }`}
            >
              <input
                type="text"
                name=""
                id=""
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter First Name"
                className="w-full bg-[transparent] outline-none placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="text-[14px] font-[500] text-[#333333]">
              Last Name<span className="text-red">*</span>
            </div>
            <div
              className={`w-full rounded-[8px] py-[8px] px-4 border  flex ${formError?.lastName ? "border-red" : "border-[#9D9D9D]"
                }`}
            >
              <input
                type="text"
                name=""
                id=""
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter Last Name"
                className="w-full bg-[transparent] outline-none  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full text-[14px] font-[500] text-[#333333]">
            Contact Number<span className="text-red">*</span>
          </div>
          <div className="w-full flex flex-col scr540:flex-row gap-3 scr540:gap-[20px]">
            <div
              className={` rounded-[8px] w-full  pr-4 border ${formError?.dial_code ? "border-red" : "border-[#9D9D9D]"
                } flex`}
            >
              <ReactSelect
                options={filteredTelCode}
                className=" flex  items-center  ml-[10px]  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464] font-normal  rounded-[8px]"
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
              <input
                type="text"
                name=""
                id=""
                placeholder={`${isViewportBelow850 ? "Enter Number " : "Enter Contact Number "
                  }`}
                value={formData.mobileNo}
                onChange={(e) => {
                  handleInputChange("mobileNo", e.target.value);
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    handleChange({ target: { name: "contactNumber", value } });
                  }
                }}

                className="w-full bg-[transparent] pl-4 outline-none  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full text-[14px] font-[500] text-[#333333]">
            Email Address<span className="text-red">*</span>
          </div>
          <div className="w-full flex flex-col scr540:flex-row justify-between gap-3 scr540:gap-[20px]">
            <div
              className={`w-full rounded-[8px] py-[8px] px-4 border  flex ${formError?.email ? "border-red" : "border-[#9D9D9D]"
                }`}
            >
              <input
                type="email"
                name=""
                id=""
                value={formData.email}
                onChange={(e) => {
                  handleInputChange("email", e.target.value.toLowerCase());
                  setVerify(false);
                  setVerified(false);
                  setOtp(new Array(4).fill(""));
                }}
                placeholder="Enter Email Address"
                className="w-full bg-[transparent] outline-none  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
              />
              {verified && (
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
            {!verified && (
              <>
                {!verify ? (
                  <button
                    onClick={handleVerification}
                    className="w-full scr540:w-[220px] px-4 h-[38.6px] md:px-[30px]  flex items-center justify-center   rounded-[8px] scr540:rounded-[30px] md:rounded-[30px] text-[12px] md:text-[14px] font-[500] bg_Button"
                  >
                    {loadingg ? <MiniLoader /> : <>Verify Email</>}
                  </button>
                ) : (
                  <div className=" min-w-[100px] text-[14px] font-[600] scr540:flex hidden justify-end items-center  text-[#C00000]  py-3  leading-tight h-[34px] ">
                    {loadingg ? (
                      <MiniLoader />
                    ) : (
                      <>
                        {!resend ? (
                          <button disabled onClick={(e) => e.stopPropagation()}>
                            {formatTime(timer)}
                          </button>
                        ) : (
                          <p
                            className="text-end w-full cursor-pointer"
                            onClick={handleVerification}
                          >
                            Resend Code
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          {verify && (
            <div className="flex flex-col gap-2 font-medium w-full pt-2 ">
              <div className="flex flex-col scr540:flex-row w-full gap-2 scr540:gap-4 scr540:h-[28px] justify-start scr540:items-center ">
                <text className="text-[12px] font-[500] w-full  text-[#898989]">
                  Enter OTP sent to your Email
                </text>
                <div className="flex gap-1">
                  <div className="flex gap-2 w-full scr540:justify-end items-center">
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
                          className="border border-[#DEDEDE] rounded-[4px] scr390:rounded-[8px] scr390:w-[31px] scr390:h-[28px] h-[24px] w-[24px] text-center  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
                        />
                      ))}
                    </div>
                    {!verified && (
                      <button
                        onClick={verifyOtp}
                        className="flex justify-center  items-center  px-4 text-[12px] font-[600] bg-blue text-white  rounded-[30px] leading-tight bg_Button h-[30px]"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                  <div className=" min-w-[100px] text-[14px] font-[600] flex scr540:hidden justify-center items-center  text-[#C00000]  py-3  leading-tight h-[34px] ">
                    {loadingg ? (
                      <MiniLoader />
                    ) : (
                      <>
                        {!resend ? (
                          <button disabled onClick={(e) => e.stopPropagation()}>
                            {formatTime(timer)}
                          </button>
                        ) : (
                          <p
                            className="text-end w-full cursor-pointer"
                            onClick={handleVerification}
                          >
                            Resend Code
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full text-[14px] font-[500] text-[#333333]">
            Enter Password<span className="text-red">*</span>
          </div>
          <div className="w-full flex flex-col justify-between gap-2">
            <div className="w-full rounded-[8px] py-[8px] px-4 border border-[#9D9D9D] flex items-center">
              <input
                type={showPassword ? "Text" : "Password"}
                name=""
                id=""
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-[transparent] outline-none  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
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
            {formError?.password !== "Enter Password" && (
              <p className="text-[10px] text-[red] font-[500]">
                {formError?.password}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full text-[14px] font-[500] text-[#333333]">
            Comfirm Password<span className="text-red">*</span>
          </div>
          <div className="w-full flex flex-col  justify-between gap-2">
            <div className="w-full rounded-[8px] py-[8px] px-4 border border-[#9D9D9D] flex items-center">
              <input
                type={showConfirmPassword ? "Text" : "Password"}
                name=""
                id=""
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm Password"
                className="w-full bg-[transparent] outline-none  placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464]"
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
            {formError?.confirmPassword !== "Enter Confirm Password" && (
              <p className="text-[10px] text-[red] font-[500]">
                {formError?.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[20px]">
          <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6 items-start ">
            <p className="text-[14px] md:text-[16px] font-[500] text-[#333333]">Id Proof Number <span className="text-red">*</span></p>
            <input
              type="text"
              name="idProof"
              value={formData.idProof}
              onChange={(e) => handleInputChange("idProof", e.target.value)}
              placeholder="Enter Id Proof Number"
              className={` bg-[transparent] w-full outline-none placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] border h-[39px]  rounded-[8px] py-[12px] px-4 ${formError.idProof ? "border-red" : "border-[#9D9D9D]"
                } `}
            />
          </div>
          <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
            <label className="text-[14px] md:text-[16px] font-[500] text-[#333333]">
              Id Proof Certificate<span className="text-red">*</span>
            </label>
            <div className={`h-[39px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer ${formError?.idProofCertificate ? "border-red" : "border-[#9D9D9D]"} upload-btn-wrapper`}>
              <input
                type="file"
                id="certificateInput"
                name="idProofCertificate"
                onChange={handleFileChange}
                className="w-full cursor-pointer text-[14px] font-[400] text-[#646464]"
              />
              {formData.idProofCertificate ?
              
                <p>
              {formData?.idProofCertificate?.name?.length > 20
                ? formData.idProofCertificate.name.slice(0, 20) + "..."
                : formData?.idProofCertificate?.name}
            </p>

                :
                <p className="text-[14px] text-[#646464]">Upload Id Proof Certificate</p>
              }
              <UploadSvg />
            </div>
            {formError?.idProofCertificate && <span className="text-red text-sm">{formError?.idProofCertificate}</span>}

          </div>
        </div>
        <div className="w-full flex justify-between">

          <button
            onClick={() => (recOptions === "firm" || role==="employer") ? handleBack() : router.push("/auth?signup=true")}
            className=" px-4 md:px-6  rounded-[30px] text-[12px] md:text-[14px] font-[500] h-[38px] blue_border_Button"
          >
            Go Back
          </button>

          <div>
          </div>

          {loading ?
            <div

              className="w-[122.74px] py-2 md:py-[8px] px-4 md:px-[36px] border flex justify-center items-center border-[#06A9EF] rounded-[30px] bg-blue text-[12px] md:text-[16px] font-[500] text-[#FFFFFF]"
            >
              <MiniLoader />
            </div>
            :
            <button
              onClick={handleSubmit}
              className=" px-4 md:px-6 rounded-[30px] text-[12px] md:text-[16px] font-[500] bg_Button"
            >
              Continue
            </button>
          }
        </div>
      </div>
    </>
  );
}

export default AdminDetails;
