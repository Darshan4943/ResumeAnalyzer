import React, { useState } from "react";
import { motion } from "framer-motion";
import ALink from "@/components/alink";
import { toast } from "react-toastify";
import { Visibility_off, Visibility_on, visibility_off } from "@/utils/svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import ImageContainer from "@/components/common/image";
import { telCode } from "@/utils/data";
const AnimationDivs = () => (
  <>
    <img className="mail_img" src="/images/auth/candidate/Mail.png" alt="" />
    <img className="phone_img " src="/images/auth/candidate/Phone.png" alt="" />
    <img
      className="location_img"
      src="/images/auth/candidate/Location.png"
      alt=""
    />
    <img className="data_img" src="/images/auth/candidate/Data.png" alt="" />
    <img className="Group11" src="/images/auth/candidate/Group11.png" alt="" />
    <img className="Group12" src="/images/auth/candidate/Group12.png" alt="" />
    <img className="Group13" src="/images/auth/candidate/Group13.png" alt="" />
    <img className="Group14" src="/images/auth/candidate/Group14.png" alt="" />
    <img className="Group15" src="/images/auth/candidate/Group15.png" alt="" />
    <img className="Group16" src="/images/auth/candidate/Group16.png" alt="" />
  </>
);
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formError, setFormError] = useState({});

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  const [selectedItem, setSelectedItem] = useState();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdown(false);
  };
  console.log(51, selectedItem);

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
      case "password":
        if (!value.trim()) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password should be at least 6 characters";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (value !== data.password) {
          errors.confirmPassword = "Password did not match";
        } else {
          delete errors.confirmPassword;
        }
        break;
      case "mobileNo":
        if (value.length !== 10) {
          errors.mobileNo = "Mobile Number Should Be 10 Digits";
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
    setData({ ...data, [fieldName]: value });
    validateInput(fieldName, value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTelCode = telCode.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm)
  );

  return (
    <>
      {tabindex == 2 && (
        <div className={"show-content  pb-8 back_img"}>
          <div className="flex flex-col gap-4">
            <motion.div className="personal_details ">
              <form className="personal_details_form ">
                <AnimationDivs />

                <>
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

                  <div className="personal_single_input">
                    <div className="personal_name justify-center">
                      <p className="form_text_heading">
                        Password <span className="star">*</span>
                      </p>

                      <input
                        type="password"
                        name=""
                        id="single_input"
                        placeholder="Create new password"
                        value={data.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                      />
                      {formError && (
                        <p className="text-[12px] text-[red] font-[500]">
                          {formError?.password}
                        </p>
                      )}
                      {/* <button
                      className={"icon"}
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <Visibility_on />
                      ) : (
                        <Visibility_off />
                      )}
                    </button> */}
                    </div>
                  </div>

                  <div className="personal_single_input">
                    <div className="personal_name justify-center">
                      <p className="form_text_heading">
                        Confirm Password <span className="star">*</span>
                      </p>

                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name=""
                        id="single_input"
                        placeholder="Confirm Your password"
                        value={data.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                      />

                      {formError && (
                        <p className="text-[12px] text-[red] font-[500]">
                          {formError?.confirmPassword}
                        </p>
                      )}
                      <button
                        className={"icon"}
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <Visibility_on />
                        ) : (
                          <Visibility_off />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="personal_single_input">
                    <p className="form_text_heading">
                      Contact Number <span className="star">*</span>
                    </p>
                    <div
                      className="flex w-[100%]  items-start gap-[10px]"
                      id="single_input"
                    >
                      <div className="relative w-max items-center">
                        <div
                          className="text-[14px] justify-center items-center w-max flex font-[500] text-[#646464]"
                          onClick={() => setDropdown(true)}
                        >
                          {selectedItem ? (
                            <div className="flex items-center justify-center ">
                              {/* {selectedItem.flag} */}
                              <img
                                src={`https://flagsapi.com/${selectedItem.code}/flat/64.png`}
                                style={{ height: "20px", width: "20px" }}
                              />
                              <input
                                type="search"
                                className="w-[80px] rounded-[5px] sticky top-0 pl-[10px]  overflow-hidden"
                                placeholder="Search"
                                value={`${selectedItem.code} ${selectedItem.dial_code}`}
                                onChange={handleSearch}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              {" "}
                              {/* {telCode[0].flag}  */}
                              <img
                                src={`https://flagsapi.com/${telCode[0].code}/flat/64.png`}
                                style={{ height: "20px", width: "20px" }}
                              />
                              <input
                                type="search"
                                className="w-[80px]  rounded-[5px] sticky top-0 pl-[10px]  overflow-hidden"
                                placeholder="Search"
                                value={`${telCode[0].code} ${telCode[0].dial_code}`}
                                onChange={handleSearch}
                              />
                              
                            </div>
                          )}
                          <img
                            onClick={() => setDropdown(true)}
                            className="w-[20px] h-[20px]"
                            src="/images/down_arrow.png"
                            alt=""
                          />
                        </div>

                        {dropdown && (
                          <div
                            className="w-[113px] font-[500] top-[5.5vh] left-[-16px] z-10 h-[40vh] overflow-y-scroll bg-[#fff] border-[1px] border-solid border-[#9D9D9D] absolute text-[14px]"
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
                                ></img>
                                {/* <img src={`https://flagsapi.com/${item.code}/flat/64.png`} style={{height:"20px",width:"20px"}} alt={item.code} /> */}
                                {item.code} {item.dial_code}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <input
                        className="w-full "
                        type="number"
                        name=""
                        // id="single_input"
                        placeholder="Enter Contact Number"
                        value={data.mobileNo}
                        onChange={(e) =>
                          handleInputChange("mobileNo", e.target.value)
                        }
                      />
                    </div>

                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.mobileNo}
                      </p>
                    )}

                    {/* <PhoneInput
                    inputClass="single_input"
                    country={"in"}
                    enableSearch={true}
                    value={data.mobileNo}
                    onChange={(phone) => setData({ ...data, mobileNo: phone })}
                  /> */}
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
                    <div className="personal_name">
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

                  <div className="personal_single_input">
                    <p className="form_text_heading">
                      Work Status <span className="star">*</span>
                    </p>
                    <div className="gender_button">
                      <button
                        className={`gen_button ${
                          data.workStatus == "experianced" &&
                          "gen_button_active"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setData({ ...data, workStatus: "experianced" });
                        }}
                      >
                        Experienced
                      </button>
                      <button
                        className={`gen_button ${
                          data.workStatus == "fresher" && "gen_button_active"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setData({ ...data, workStatus: "fresher" });
                        }}
                      >
                        Fresher
                      </button>
                    </div>
                  </div>
                  <div className="personal_single_input">
                    <p className="form_text_heading">Upload Resume</p>
                    {file ? (
                      <div className="flex flex-row gap-[16px] items-center py-[16px] border border-[#bebebe] justify-center  rounded-[12px] upload-btn-wrapper w-[100%]">
                        <input
                          type="file"
                          name="myfile"
                          onChange={(e) => setfile(e.target.files[0])}
                        />
                        <ImageContainer
                          src={"/images/icons/pdf_icon.png"}
                          className={"h-[24px] w-[24px]"}
                        />

                        <span className="text-[14px] w-[56%]">{file.name}</span>
                        <button className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]">
                          Browse file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row gap-[16px] items-center py-[10px] px-[16px] border border-[#bebebe] justify-start  rounded-[12px] w-[100%]">
                        <input
                          type="file"
                          name="myfile"
                          onChange={(e) => setfile(e.target.files[0])}
                        />
                      </div>
                    )}
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
              Already have an account? <span id="sign_in">Sign In</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalDetails;
