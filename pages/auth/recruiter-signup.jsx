import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reCallUserData } from "../../Redux/actions/user";
import { telCode } from "../../utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import ReactSelect from "react-select";

function Recruiter_signup({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(telCode[telCode.length - 2]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    currentLocation: "",
    dial_code: "+260",
  });
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
        if (!value.trim() || value.trim().length < 6) {
          errors.password = "Password must be at least 6 characters long";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (!value.trim() || value.trim() != data.password) {
          errors.confirmPassword = "Password do not match";
        } else {
          delete errors.confirmPassword;
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
    } else {
      setLoading(true);
      axios
        .post("http://localhost:2000/api/skiloteckuser/recruiter", data)
        .then((res) => {
          const response = res.data;
          console.log(response);

          try {
            if (response?.success) {
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

            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }
  };
  return (
    <div className=" relative !important">
      <div className="register_head sticky ml:top-[90px] top-[3.5rem] w-[100%] z-50 pb-4 bg-white">
        <div className="register_cadidate py-3 px-2 overflow-hidden">
          <div className="register_text_parent">
            <div className="register_heding text-center">
              <p className="ml:text-[30px] text-[24px] font-semibold text-white">
                Register as Recruiter
              </p>
              <p className="register_heding_desc">
                Fill up these details to start using the services from Skilotech
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={" pb-8  "}>
        <div className="flex flex-col gap-4">
          <motion.div className=" flex justify-center pt-4  pb-2">
            <form className="personal_details_form scr1250:w-[60%] sm:w-[80%] w-[95%] education_page ">
              <>
                <div className="flex gap-6 w-[100%] ml:flex-row flex-col ">
                  <div className="personal_name_parent flex ml:flex-row flex-col ml:w-[50%] w-[100%]">
                    <div className="personal_name ml:w-[48%] w-[100%]">
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

                    <div className="personal_name ml:w-[48%] w-[100%]">
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
                                placeholder="Search"
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
                <div className="flex gap-6 ml:flex-row flex-col  w-[100%]  ">
                  <div className="personal_single_input">
                    <p className="form_text_heading">
                      Email <span className="star">*</span>
                    </p>
                    <input
                      type="email"
                      name=""
                      id="single_input"
                      placeholder="Enter Email"
                      value={data.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.email}
                      </p>
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
                      <svg
                        className="absolute right-[12px] top-[36px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={handleTogglePassword}
                        style={{ cursor: "pointer" }}
                      >
                        <path
                          d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                          fill="#9D9D9D"
                        />
                      </svg>
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
                          handleInputChange("confirmPassword", e.target.value)
                        }
                      />
                      <svg
                        className="absolute right-[12px] top-[36px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={handleToggleConfirmPassword}
                        style={{ cursor: "pointer" }}
                      >
                        <path
                          d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z"
                          fill="#9D9D9D"
                        />
                      </svg>
                      {formError && (
                        <p className="text-[12px] text-[red] font-[500]">
                          {formError?.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bottom_buttons font-[500]">
                  <button
                    className="buttons"
                    id="border_button"
                    onClick={(e) => {
                      e.preventDefault();
                     router.push("/auth?signup=true");
                    }}
                  >
                    Cancle
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
                        class="inline w-4 h-4  text-white animate-spin"
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
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Recruiter_signup;
