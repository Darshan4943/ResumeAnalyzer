import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { plans, telCode } from "../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import ReactSelect from "react-select";
import ImageContainer from "../../components/common/image";
import ImageCropper from "../../components/featured/candidate/createResume/components/imageCropper";
import MiniLoader from "../../components/common/mini-loader";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";

function Sign_up({ }) {
  const router = useRouter();
  const { byAdmin, isUpdate, role } = router.query;

  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

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
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpEntered, setOtpEntered] = useState(null);
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [parseData, setParseData] = useState()
  const [formError, setFormError] = useState({});


  useEffect(() => {
    const parsedResume = JSON.parse(localStorage.getItem("parsedResume"));
    setParseData(parsedResume)
  }, []);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",

    country: "",
    dial_code: "",
    img: null,
  });

  useEffect(() => {

    if (parseData) {

      setData({
        ...data,
        firstName: parseData?.first_name || "",
        lastName: parseData?.last_name || "",
        mobileNo: parseData?.mobileNo || "",
        email: parseData?.email || "",
        dial_code: parseData?.dial_code || "",
      });

      const selectedItem = telCode.find((item) => item.dial_code === parseData?.dial_code);

      if (selectedItem) {
        setSelectedItem(selectedItem);
      }
    }
  }, [parseData]);


  const [googleLoading, setGoogleLoading] = useState(false);
  const [isProfileImageRemoved, setIsProfileImageRemoved] = useState(false);
  const [file, setFile] = useState(null);
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        userRole: role
      };

      const sendToPurchase = localStorage.getItem("purchase");
      const sendToPurchaseResult = JSON.parse(sendToPurchase);
      let userRole = role
      axios
        .post(
          "http://localhost:2000/api/skiloteckuser/user/google/signup",
          { userData, parseData: JSON.stringify(parseData) }
        )
        .then((res) => {
          localStorage.setItem("authToken", JSON.stringify(res.data));
          if (sendToPurchaseResult?.status) {
            localStorage.removeItem("purchase");
            window.location.href = `/purchase/details?id=${sendToPurchaseResult.index + 1
              }`;
          } else {
            setGoogleLoading(false);
            window.location.href = "/home?signIn=false";
          }
        })
        .catch((err) => {
          setGoogleLoading(false);
          console.log(222, err);
          toast.error(err?.response?.data?.message);
        });
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Sign-in with Google popup was cancelled by the user.");
      } else {
        console.error("Error signing in with Google:", error.message);
      }
      setGoogleLoading(false);
    }
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
    if (pastedData.every(char => !isNaN(char))) {
      setOtp(pastedData);
    }
  };


  const fileRef = useRef(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    setIsProfileImageRemoved(false);

    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 3 * 1024 * 1024) {

      if (selectedFile.type.includes("image")) {
        setFile(selectedFile);
        setModelView(true);
        setError(false);
        event.target.value = "";
      } else {
        toast.error("Only Image files are allowed");
      }
    } else {
      toast.error("Please select a file that is  3 MB.");
    }
  };
  useEffect(() => {
    setData({ ...data, img: croppedImage?.blob });
  }, [croppedImage]);

  // useEffect(() => {
  //   const {
  //     email,
  //     mobileNo,
  //     firstName,
  //     lastName,
  //     role,

  //     country,
  //     profilePicture,
  //     dial_code
  //   } = userDataGlobal;
  //   setData({
  //     ...data,
  //     email,
  //     mobileNo,
  //     firstName,
  //     lastName,
  //     role,

  //     country,
  //     dial_code
  //   });
  //   if (profilePicture) {
  //     setCroppedImage({ url: profilePicture });
  //   }
  //   const selectedItem = telCode.find((item) => item.dial_code === userDataGlobal?.dial_code);

  //   if (selectedItem) {
  //     setSelectedItem(selectedItem);
  //   }
  // }, []);
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
        if (!isUpdate && (!value.trim() || value.trim().length < 6)) {
          errors.password = "Password must be at least 6 characters long";
        } else if (
          !validatePassword(value) &&
          !isUpdate
        ) {
          errors.password =
            "Password should include one uppercase letter, one lowercase letter, one number, and one special character.";
        } else {
          delete errors.password;
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
        }
        else {
          setFormError((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.mobileNo;
            return updatedErrors;
          });
        }
      }
    }
    else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
  }
  const validateFields = () => {
    const requiredFields = [
      { key: "firstName", error: "Enter First Name" },
      { key: "lastName", error: "Enter Last Name" },
      { key: "email", error: "Enter a valid Email" },
      { key: "dial_code", error: "Select a country code" },
      { key: "mobileNo", error: "Enter Contact Number" },
      { key: "password", error: "Enter Password" },
      { key: "confirmPassword", error: "Enter Confirm Password" },
    ];

    let errors = { ...formError };

    requiredFields.forEach((field) => {
      const value = data[field.key];
      if (!value || (typeof value === "string" && !value.trim())) {
        errors[field.key] = field.error;
      }
    });


    setFormError(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validateFields(); // Validate all fields
    if (!isValid) {
      // toast.error("Please fill in all required fields correctly.");
      return;
    }

    if (!verified) {
      setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
      return;
    }

    const url = "http://localhost:2000/api/skiloteckuser/signUp";
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "email") {
        formdata.append(key, data[key].toLowerCase());
      } else if (key === "currentLocation") {
        formdata.append("location", data[key]);
      } else {
        formdata.append(key, data[key]);
      }
    });
    formdata.append("userRole", role);
    formdata.append("parseData", JSON.stringify(parseData));

    axios
      .post(url, formdata)
      .then((res) => {
        const response = res.data;
        try {
          if (response?.success) {

            localStorage.setItem("authToken", JSON.stringify(response));

            toast.success("Sign up Successfully");
            // if (sendToPurchase && sendToPurchase?.status) {
            //   window.location.href = `/purchase/details?id=${sendToPurchase.index + 1
            //     }`;
            //   setLoading(false);
            // } else {
            window.location.href = `/home?signIn=false`;
            setLoading(false);
            // }

          } else {
            setLoading(false);
            if (response.message === "User already exists") {
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

  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
    let tempUser = role === "user" ? "tempUser" : "tempRecruiter"
    axios
      .post("http://localhost:2000/api/otpMailSignup", {
        userEmail: data.email.toLowerCase(),
        tempUser
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
    const otpEntered = Number(otp.join(''));
    axios
      .post("http://localhost:2000/api/verifyOtp", {
        userEmail: data.email,
        otpEntered
      })
      .then((res) => {

        const result = res.data;
        if (result.success) {

          setVerify(false)
          setVerified(true);
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

  const isEdge = () => {
    return /Edg/.test(navigator.userAgent);
  };

  return (
    <div className=" flex justify-center items-center py-[72px]  gap-[50px] customMargins">
      <div className="h-[480px] min-w-[480px] scr1024:block hidden">
        <img
          src="/images/auth/signIn.png"
          alt=""
          className="h-[480px] w-[480px]  object-cover "

        />
      </div>
      <form
        onSubmit={submitHandler}
        className="  bg-white flex w-[400px]  sm:p-[24px] p-3 gap-[16px] flex-col justify-center items-center rounded-[24px] "
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-[20px] font-[600]"> {role === "user" ? "Candidate Sign Up " : role === "recruiter" ? "Recruiter Sign Up" : "Employer Sign Up"}</div>
        <div className="flex scr390:flex-row flex-col gap-4 w-full ">
          <div className="scr390:w-[50%] w-full flex flex-col gap-1">
            <div className={`flex flex-col px-[16px] py-[10px] border-[1px]   rounded-[8px] border-solid ${formError.firstName ? "border-red" : "border-[#DEDEDE]"}`}>

              <input
                type="text"
                name=""
                className="font-[400] text-[12px] w-[80%]"
                placeholder="Enter First Name"
                value={data.firstName}
                onChange={(e) =>
                  handleInputChange("firstName", e.target.value)
                }
              />

            </div>

          </div>
          <div className="scr390:w-[50%] w-full flex flex-col gap-1">
            <div className={`flex flex-col px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid ${formError.lastName ? "border-red" : "border-[#DEDEDE]"}`}>
              <input
                type="text"
                name=""
                className="font-[400] text-[12px] w-[80%]"
                placeholder="Enter Last Name"
                value={data.lastName}
                onChange={(e) =>
                  handleInputChange("lastName", e.target.value)
                }
              />

            </div>

          </div>
        </div>
        <div className={`flex w-full  rounded-[8px] gap-4 border-[1px] border-solid  h-[40px]  ${(formError.mobileNo || formError.dial_code) ? "border-red" : "border-[#DEDEDE]"}`}>

          <div
            onWheel={(e) => e.stopPropagation()}
            className="   text-[14px] justify-center items-center  flex font-[500] text-[#646464]"
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer  ">
              <div className="flex items-center  gap-1 cursor-pointer  ">
                <ReactSelect
                  options={filteredTelCode}
                  className=" flex  items-center py-1 ml-[10px] text-[12px] font-normal  rounded-[8px]"
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
              </div>
            </div>
          </div>


          <input
            className="w-full text-[12px] font-[400] mr-2 "
            type="text"
            name=""
            // id="single_input"
            placeholder={`${isViewportBelow850
              ? "Enter Number "
              : "Enter Contact Number "
              }`}
            value={data.mobileNo}
            onChange={(e) =>
              handleInputChange("mobileNo", e.target.value)
            }
          />




        </div>

        <div className="w-full flex flex-col gap-2">


          <div className="flex gap-2  items-center justify-between w-full">
            <input
              className={`text-[12px] w-full font-[400] px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid  h-[40px] ${formError.email ? "border-red" : "border-[#DEDEDE]"}`}


              type="email"
              name=""

              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => {
                handleInputChange("email", e.target.value);
                setVerify(false);
                setVerified(false);
                setOtp(new Array(4).fill(""))
              }}
            />
            {!verified && (
              <>
                {!verify ? (
                  !isUpdate && (
                    <button
                      onClick={handleVerification}
                      className="  text-[10px] min-w-[86px] font-semibold flex justify-center items-center  bg-blue text-white py-[10px] px-3 rounded-[30px] leading-tight h-[34px] btn_hover_effect"
                    >
                      {loadingg ? (
                        <MiniLoader />
                      ) : (
                        <>Verify Email</>
                      )}
                    </button>
                  )
                ) : (
                  <div className=" min-w-[86px] text-[12px] font-[600] flex justify-center items-center  text-[#C00000]  py-3  leading-tight h-[34px] ">
                    {loadingg ? (
                      <MiniLoader />
                    ) : (
                      <>
                        {!resend ? (
                          <button disabled onClick={(e) => e.stopPropagation()}>{formatTime(timer)}</button>
                        ) : (
                          <p className=" cursor-pointer" onClick={handleVerification}>
                            Resend Code
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
            {verified && (
              <div className="flex gap-2 text-[14px] font-medium items-center text-[#0C8A0A]">

                <svg className="zoom-rotate-animation" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="22" height="22" rx="11" fill="#34A853" />
                  <path d="M10.2467 14.2906L16.3595 8.1877C16.4987 8.05215 16.6633 7.98438 16.8533 7.98438C17.0433 7.98438 17.206 8.05244 17.3414 8.18856C17.477 8.32469 17.5447 8.48768 17.5447 8.67755C17.5447 8.86753 17.477 9.03155 17.3414 9.16962L10.734 15.7674C10.5962 15.9028 10.4332 15.9705 10.245 15.9705C10.0569 15.9705 9.89504 15.9028 9.75948 15.7674L6.65078 12.6587C6.51534 12.5198 6.44883 12.3553 6.45123 12.1652C6.45376 11.975 6.52308 11.8122 6.6592 11.6768C6.79533 11.5412 6.95832 11.4734 7.14819 11.4734C7.33817 11.4734 7.50219 11.5412 7.64027 11.6768L10.2467 14.2906Z" fill="white" />
                </svg>

              </div>
            )}

          </div>
          {/* {formError && (
            <p className="text-[10px] text-start text-[red] font-[500] w-full">
              {formError?.email}
            </p>
          )} */}

        </div>

        {verify && (
          <div className="flex flex-col gap-2 font-medium w-full ">

            <div className="flex gap-2 h-[28px]  items-center  justify-between ">
              <text className="text-[10px] font-[500] text-[#898989]">
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
                    className="border border-[#DEDEDE] rounded-[8px] w-[31px] h-[28px] text-center text-lg"
                  />
                ))}
              </div>
              {!verified && (
                <button
                  onClick={verifyOtp}
                  className="flex justify-center  items-center  px-2 text-[10px] font-[600] border border-blue  rounded-[30px] leading-tight btn_hover_effect h-[26px]"
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

        <div className={`flex gap-2 w-[100%]  flex-col `}>

          <div className={`flex flex-row px-[16px] py-[10px] border-[1px] rounded-[8px] items-center border-solid  justify-between h-[40px] ${formError?.password ? "border-red" : "border-[#DEDEDE]"}`}>

            <input
              type={showPassword ? "Text" : "Password"}
              className="font-[400] text-[12px]"
              placeholder="Enter Password"
              value={data.password}
              onChange={(e) =>
                handleInputChange("password", e.target.value)
              }
            />

            {!isEdge() && (
              showPassword ? (
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
          {formError.password !== "Enter Password" && (
            <p className="text-[10px] text-[red] font-[500]">
              {formError?.password}
            </p>
          )}

          <div className={`flex flex-row px-[16px] w-full py-[10px] border-[1px] rounded-[8px] items-center border-solid  justify-between h-[40px] ${formError?.confirmPassword ? "border-red" : "border-[#DEDEDE]"}`}>

            <input
              type={showConfirmPassword ? "Text" : "Password"}
              name=""
              className="font-[400] text-[12px]"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                handleInputChange(
                  "confirmPassword",
                  e.target.value
                )
              }
            />
            {!isEdge() && (
              showConfirmPassword ? (
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
          {formError.confirmPassword !== "Enter Confirm Password" && (
            <p className="text-[10px] text-[red] font-[500]">
              {formError?.confirmPassword}
            </p>
          )}

        </div>
        <div className="w-full flex flex-col gap-[16px]">
          <button
            disabled={loading}
            style={{ borderColor: "#06a9ef" }}
            className={`w-full px-[36px] py-[10px] rounded-[30px] border-[1px] border-solid leading-[20.67px] border-[#06a9ef] text-[14px] font-[600] text-[#fff]  bg-[#06a9ef] ${loading && "bg-[#06a9ef]"
              } hover:text-[#333333] transition-all duration-200 hover:bg-[#fff]`}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#bebebe"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#fff"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {/* {role === "user" && ( */}
          <div className="flex flex-row items-center justify-center gap-[6px] text-[16px] font-medium">
            <div className="w-[50%] h-[1px] bg-[#DEDEDE]"></div>Or
            <div className="w-[50%] h-[1px] bg-[#DEDEDE]"></div>
          </div>
          {/* )} */}
          <div className="flex flex-col gap-[16px]">
            {/* {role === "user" && ( */}
            <div

              onClick={handleGoogle}
              disabled={googleLoading}
              className=" cursor-pointer w-full sm:px-[36px] px-4 py-[10px] rounded-[30px] border-[1px] leading-[20.67px]  border-[#06A9EF]   text-[16px] font-[600] text-[#333] flex items-center gap-2 justify-center "
            >
              {googleLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#bebebe"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#06a9ef"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_128_5190)">
                      <path
                        d="M24.4873 12.2245C24.4873 11.2413 24.4057 10.5237 24.229 9.77963H12.739V14.2176H19.4833C19.3474 15.3205 18.6132 16.9815 16.9814 18.0976L16.9585 18.2461L20.5915 20.9963L20.8431 21.0209C23.1547 18.9347 24.4873 15.8653 24.4873 12.2245Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.7391 23.9176C16.0433 23.9176 18.8171 22.8545 20.8432 21.0209L16.9815 18.0976C15.9481 18.8018 14.5611 19.2934 12.7391 19.2934C9.50291 19.2934 6.75622 17.2074 5.77711 14.324L5.63359 14.3359L1.85604 17.1927L1.80664 17.3269C3.81906 21.2334 7.95273 23.9176 12.7391 23.9176Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.77702 14.324C5.51867 13.5799 5.36916 12.7826 5.36916 11.9588C5.36916 11.1349 5.51867 10.3377 5.76343 9.5936L5.75658 9.43513L1.9317 6.53241L1.80655 6.59058C0.97714 8.21168 0.501221 10.0321 0.501221 11.9588C0.501221 13.8855 0.97714 15.7058 1.80655 17.3269L5.77702 14.324Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.7391 4.62403C15.0371 4.62403 16.5871 5.59402 17.471 6.40461L20.9248 3.10928C18.8036 1.1826 16.0433 0 12.7391 0C7.95273 0 3.81906 2.68406 1.80664 6.59056L5.76351 9.59359C6.75622 6.7102 9.50291 4.62403 12.7391 4.62403Z"
                        fill="#EB4335"
                      />
                    </g>
                  </svg>
                  Continue with Google
                </>
              )}
            </div>
            {/* )} */}
            <div
              onClick={() => {
                role === "user" ?
                  router.push("/auth/Sign_in?role=user") : router.push("/auth/Sign_in?role=recruiter");
              }}
              className="flex justify-center items-center text-[10px] font-[600] text-[#646464] cursor-pointer"
            >
              Already have an account ?
              <span
                style={{
                  fontSize: "10px",
                  color: "#06A9EF",
                }}
                className="pl-1"
              >

                Sign In
              </span>
            </div>
            <div className="text-[10px] text-center ">
              By signing in, you agree to our{" "}
              <span
                // onClick={() => router.push("/TermsAndConditions")}
                onClick={() => openInNewTab("/TermsAndConditions")}
                className="already_sign cursor-pointer"
                style={{
                  fontSize: "10px",
                  color: "#06A9EF",
                }}
              >
                <a>Terms & Conditions</a>
              </span>{" "}
              and{" "}
              <span
                // onClick={() => router.push("/PrivacyPolicy")}
                onClick={() => openInNewTab("/PrivacyPolicy")}
                className="already_sign cursor-pointer"
                style={{
                  fontSize: "10px",
                  color: "#06A9EF",
                }}
              >
                {" "}
                <a>Privacy Policy.</a>
              </span>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}

export default Sign_up;
