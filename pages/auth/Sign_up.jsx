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

function Sign_up({ }) {
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

  const [formError, setFormError] = useState({});
  const { role } = useRouter().query;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    currentLocation: "",
    country: "",
    dial_code: "",
    img: null,
  });

  const [isProfileImageRemoved, setIsProfileImageRemoved] = useState(false);
  const [file, setFile] = useState(null);

  const fileRef = useRef(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    setIsProfileImageRemoved(false);

    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 3 * 1024 * 1024) {
      // 3 MB limit
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

  useEffect(() => {
    const {
      email,
      mobileNo,
      firstName,
      lastName,
      role,
      location,
      country,
      profilePicture,
      dial_code
    } = userDataGlobal;
    setData({
      ...data,
      email,
      mobileNo,
      firstName,
      lastName,
      role,
      currentLocation: location,
      country,
      dial_code
    });
    if (profilePicture) {
      setCroppedImage({ url: profilePicture });
    }
    const selectedItem = telCode.find((item) => item.dial_code === userDataGlobal?.dial_code);

    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  }, []);

  function validatePassword(password) {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
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

  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "currentLocation",
      "mobileNo",
      "dial_code",
    ];
    const emptyFields = requiredFields.filter((field) => !data[field]);
    console.log(emptyFields)
    if (!data.dial_code) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        dial_code: "Please select a country code",
      }));
      return;
    }
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;
    const sendToPurchase = JSON.parse(localStorage.getItem("purchase"));

    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    }
    else if (!verified && !isUpdate) {
      setOtpError("Email Verification Required");
      toast.error("Email Verification Required");
    }
    else {
      const url = isUpdate
        ? "http://localhost:2000/api/updateUser"
        : "http://localhost:2000/api/skiloteckuser/recruiter";
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
      formdata.append("isProfileImageRemoved", isProfileImageRemoved);
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
                    window.location.href = `/purchase/details?id=${sendToPurchase.index + 1
                      }`;
                    setLoading(false);
                  } else {
                    window.location.href = `/home?signIn=false`;
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
    let tempUser = "tempRecruiter"
    axios
      .post("http://localhost:2000/api/otpMailSignup", {
        userEmail: data.email,
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

  const verifyOtp = () => {

    axios
      .post("http://localhost:2000/api/verifyOtp", {
        userEmail: data.email,
        otpEntered
      })
      .then((res) => {

        const result = res.data;
        if (result.success) {


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

      <img
        src="/images/auth/signIn.png"
        alt=""
        className="h-[480px] w-[480px]  object-cover"

      />
      <form
        onSubmit={submitHandler}
        className="  bg-white flex w-[400px]  sm:p-[24px] p-3 gap-[16px] flex-col justify-center items-center rounded-[24px] "
        style={{
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="text-[30px] font-[600]"> {role === "user" ? "Candidate Sign In " : "Recruiter Sign In"}</div>
        <div className="flex flex-row gap-4">

          <div className="flex flex-col px-[16px] py-[10px] border-[1px] w-[50%]  rounded-[8px] border-solid border-[#DEDEDE]">
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
            {formError && (
              <p className="text-[12px] text-[red] font-[400]">
                {formError.firstName}
              </p>
            )}
          </div>
          <div className="flex flex-col px-[16px] py-[10px] border-[1px] w-[50%]  rounded-[8px] border-solid border-[#DEDEDE]">
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
            {formError && (
              <p className="text-[12px] text-[red] font-[400]">
                {formError.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full border-[1px] rounded-[8px] gap-4 border-solid border-[#DEDEDE] h-[40px]">

          <div
            onWheel={(e) => e.stopPropagation()}
            className="   text-[14px] justify-center items-center  flex font-[500] text-[#646464]"
          >
            <div className="flex items-center justify-center gap-2 cursor-pointer  ">
              <div className="flex items-center  gap-1 cursor-pointer  ">
                <ReactSelect
                  options={filteredTelCode}
                  className=" flex  items-center py-1 ml-[10px]  rounded-[8px]"
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
            className="w-full text-[12px] font-[400] "
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


          {/* Display error message if any */}
          {formError && (
            <>
              <p className="text-[12px] text-[red] font-[500]">
                {formError?.mobileNo}
              </p>
              <p className="text-[12px] text-[red] font-[500]">
                {formError?.dial_code}
              </p>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">


          <div className="flex gap-2  items-center justify-between w-full">
            <input
              className=" text-[12px] w-full font-[400] px-[16px] py-[10px] border-[1px]  rounded-[8px] border-solid border-[#DEDEDE] h-[40px]"


              type="email"
              name=""

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
                  <button className=" min-w-[86px] text-[12px] font-[600] flex justify-center items-center  text-[#C00000]  py-3  leading-tight h-[34px] ">
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
          </div>{formError && (
            <p className="text-[12px] text-start text-[red] font-[500] w-full">
              {formError?.email}
            </p>
          )}

        </div>
        <div className="w-full ">
          {verify && (
            <div className="flex flex-col gap-2 font-medium w-full">
            
              <div className="flex gap-4 h-[48px]  items-center  ">
                <text className="text-[10px] font-[500] text-[#898989]">
                Enter OTP sent to your Email
                </text>
                {/* <input
                  type="text"
                  name=""
                  id="single_input"
                  placeholder="Enter OTP"
                  className="border border-[#DEDEDE] rounded-[8px] px-4 py-3 w-[50%] leading-tight"
                  onChange={(e) =>
                    setOtpEntered(parseInt(e.target.value))
                  }
                /> */}
                {!verified && (
                  <button
                    onClick={verifyOtp}
                    className="flex justify-center  items-center  px-4 text-[10px] font-[600] border border-blue  rounded-[30px] leading-tight btn_hover_effect h-[26px]"
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
              {/* {resend &&
                <p className="text-[12px]  text-red pl-1"> Didn&apos;t receive your OTP? Please check your spam or junk folder.</p>
              } */}
            </div>
          )}
        </div>
      </form>

    </div>
  );
}

export default Sign_up;
