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
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formError, setFormError] = useState({});

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }
  const validateForm = () => {
    const errors = {};
    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!isNaN(data.firstName)) {
      errors.firstName = "First Name cannot be a number";
    }
    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (!isNaN(data.lastName)) {
      errors.lastName = "Last Name cannot be a number";
    }
    if (!data.mobileNo || data.mobileNo.toString().length !== 10) {
      errors.mobileNo = "Mobile Number should be 10 digits";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
    if (!data.currentLocation.trim()) {
      errors.currentLocation = "Current Location is required";
    }
    // console.log(65,errors)
    setFormError(errors);
    return errors;
  };
  console.log(70, formError);
  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validateForm();

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      setTabIndex(3);
      window.scroll(0, 0);
    } else {
      console.log(Object.keys(errors));
      toast.error("Please enter all required fields");
    }
  };
  return (
    <>
      {tabindex == 2 && (
        <div className={"show-content  pb-8 back_img"}>
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
                        setData({ ...data, firstName: e.target.value })
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.firstName}
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
                        setData({ ...data, lastName: e.target.value })
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
                      setData({ ...data, email: e.target.value })
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
                      type={isPasswordVisible ? "text" : "password"}
                      name=""
                      id="single_input"
                      placeholder="Create new password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.password}
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
                    className="flex w-[100%] items-start gap-2"
                    id="single_input"
                  >
                    <select
                      className="w-fit font-[500]  border-none text-[14px]"
                      name=""
                      id=""
                    >
                      {telCode.map((item) => (
                        <option className="border-none">
                          {item.code} {item.dial_code}
                        </option>
                      ))}
                    </select>
                    <input
                      className="w-full "
                      type="number"
                      name=""
                      // id="single_input"
                      placeholder="Enter Contact Number"
                      value={data.mobileNo}
                      onChange={(e) => {
                        setData({ ...data, mobileNo: e.target.value });
                      }}
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
                    onChange={(e) => setData({ ...data, dob: e.target.value })}
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
                        setData({ ...data, currentLocation: e.target.value })
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
                        data.workStatus == "experianced" && "gen_button_active"
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
        </div>
      )}
    </>
  );
};

export default PersonalDetails;
