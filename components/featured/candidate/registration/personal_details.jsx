import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { toast } from "react-toastify";

import "react-phone-input-2/lib/bootstrap.css";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import { Visibility_off, Visibility_on } from "../../../../utils/svg";
import ImageContainer from "../../../common/image";
import { telCode } from "../../../../utils/data";

const PersonalDetails = ({
  data,
  setData,
  setTabIndex,
  tabindex,
  setfile,
  file,
  error,
  setError,
}) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formError, setFormError] = useState({});

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  // const [selectedItem, setSelectedItem] = useState();

  // const handleItemClick = (item) => {
  //   setSelectedItem(item);
  //   setDropdown(false);
  // };
  // console.log(51, selectedItem);

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

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };
  {
    console.log(124, formError);
  }
  const handleInputChange = (fieldName, value) => {
    console.log(value.replace(/\D/g, "").length <= 10);
    if (fieldName == "mobileNo") {
      if (value.replace(/\D/g, "").length <= 10) {
        setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
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
    ];
    const emptyFields = requiredFields.filter((field) => !data[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else {
      setTabIndex(3);
      window.scroll(0, 0);
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(telCode[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
    setSearchTerm("");
    setDropdown(false);
    setShowInput(false);
  };

  const handleInputClick = () => {
    setDropdown(true);
    setSearchTerm("");
    setShowInput(true);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };
  const [filteredTelCode, setFilteredTelCode] = useState([]);

  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);

    const filteredCodes = telCode.filter(filterLogic);
    setFilteredTelCode(filteredCodes);
  }, [telCode, searchTerm]);

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  return (
    <>
      {tabindex == 2 && (
        <div className={" pb-8  "}>
          <div className="flex flex-col gap-4">
            <motion.div className=" flex justify-center pt-4  pb-2">
              <form className="personal_details_form education_page ">
                <>
                  <div className="flex gap-6 w-[100%]">
                    <div className="personal_name_parent">
                      <div className="personal_name">
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

                      <div className="personal_name">
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
                  </div>
                  <div className="flex gap-6 w-[100%] ">
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
                          className={`relative ${
                            isViewportBelow850 ? "w-[65%] " : "w-[50%] "
                          } items-center`}
                        >
                          <div
                            className="  w-[100%] text-[14px] justify-center items-center  flex font-[500] text-[#646464]"
                            onClick={handleInputClick}
                          >
                            <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[140px] w-[100%]">
                              <div
                                className="flex items-center  gap-1 cursor-pointer  w-[100%] "
                                onClick={handleInputClick}
                              >
                                {showInput ? (
                                  <input
                                    className="w-[100%]  border flex justify-center items-center py-1 px-3 rounded-[8px] "
                                    type="text"
                                    name=""
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                  />
                                ) : (
                                  <>
                                    <img
                                      src={`https://hatscripts.github.io/circle-flags/flags/${selectedItem.code.toLowerCase()}.svg`}
                                      width="20px"
                                    />
                                    <div
                                      className={` ${
                                        isViewportBelow850
                                          ? "text-[12px]"
                                          : "text-[16px]"
                                      }`}
                                    >
                                      {selectedItem.code}{" "}
                                      {selectedItem.dial_code}
                                    </div>
                                    <img
                                      className="w-[20px] h-[20px]"
                                      src="/images/down_arrow.png"
                                      alt=""
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {dropdown && (
                            <div
                              ref={taskRef}
                              className="w-[113px] font-[500] top-12 -left-1  z-10 h-[40vh] overflow-y-scroll bg-[#fff] border-[1px] border-solid border-[#9D9D9D] absolute text-[14px] p-1 flex flex-col justify-between items-center"
                              name=""
                              id=""
                            >
                              {filteredTelCode.map((item, index) => (
                                <p
                                  className={`border-none cursor-pointer pl-[5px] flex my-2 gap-[5px] hover:bg-blue hover:text-[#fff] ${
                                    selectedItem === item ? "bg-gray-200" : ""
                                  }`}
                                  key={index}
                                  onClick={() => handleItemClick(item)}
                                >
                                  <img
                                    src={`https://hatscripts.github.io/circle-flags/flags/${item.code.toLowerCase()}.svg`}
                                    width="20px"
                                  />
                                  {item.code} {item.dial_code}
                                </p>
                              ))}
                            </div>
                          )}
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

                    <div className="personal_single_input">
                      <p className="form_text_heading">Date Of Birth</p>
                      <input
                        type="date"
                        name=""
                        id="single_input"
                        value={data.dob}
                        onChange={(e) =>
                          setData({ ...data, dob: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 w-[100%]">
                    <div className="personal_single_input">
                      <p className="form_text_heading">
                        Gender <span className="star">*</span>
                      </p>
                      <div className="gender_button">
                        <button
                          className={`gen_button ${
                            data.gender == "male" && "gen_button_active"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setData({ ...data, gender: "male" });
                          }}
                        >
                          Male
                        </button>
                        <button
                          className={`gen_button ${
                            data.gender == "female" && "gen_button_active"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setData({ ...data, gender: "female" });
                          }}
                        >
                          Female
                        </button>
                        <button
                          className={`gen_button ${
                            data.gender == "other" && "gen_button_active"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setData({ ...data, gender: "other" });
                          }}
                        >
                          Other
                        </button>
                      </div>
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

                  <div className="bottom_buttons">
                    <button
                      className="buttons"
                      id="border_button"
                      onClick={() => {
                        setTabIndex(1);
                        window.scroll(0, 0);
                      }}
                    >
                      Go Back
                    </button>
                    <button
                      className="buttons"
                      id="border_button"
                      onClick={submitHandler}
                    >
                      Continue
                    </button>
                  </div>
                </>
              </form>
            </motion.div>
            <p className="already_text">
              Already have an account?{" "}
              <span
                className="cursor-pointer"
                id="sign_in"
                onClick={() => router.push("/auth/Sign_in")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalDetails;
