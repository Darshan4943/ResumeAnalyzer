import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function Edit_personal_Dtls({ setaddWebsites }) {
  const { userDataGlobal, profileData } = useSelector(
    (state) => state.user.userData
  );
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    dob: "",
    gender: "male",
    currentLocation: "",
    maritalStatus: "unmarried",
    workStatus: "",
    workExperiance: { years: 0, months: 0 },
    address: "",
    isCareerBreak: false,
    isCareerBreakReason: "",
    haveWorkPermit: false,
    workPermitDescription: "",
    isSpecialyAbled: false,
    specialyAbledDescription: "",
  });

  useEffect(() => {
    if (profileData) {
      const {
        firstName = "",
        lastName = "",
        mobileNo = "",
        email = "",
        dob = "",
        gender = "male",
        currentLocation = "",
        maritalStatus = "unmarried",
        workStatus = "",
        workExperiance = { years: 0, months: 0 },
        address = "",
        isCareerBreak = false,
        isCareerBreakReason = "",
        workPermit: { haveWorkPermit = false, workPermitDescription = "" } = {},
        specialyAbled: {
          isSpecialyAbled = false,
          specialyAbledDescription = "",
        } = {},
      } = profileData.basics;

      setData({
        firstName,
        lastName,
        mobileNo,
        email,
        dob,
        gender,
        currentLocation,
        maritalStatus,
        workStatus,
        workExperiance,
        address,
        isCareerBreak,
        isCareerBreakReason,
        haveWorkPermit,
        workPermitDescription,
        isSpecialyAbled,
        specialyAbledDescription,
      });
    }
  }, [profileData]);

  const validateForm = () => {
    let validationErrors = {};

    if (!Data.dob) {
      validationErrors.dob = "Date of birth is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setData((prev) => ({
      ...prev,
      dob: value,
    }));
    if (value) {
      setErrors((prev) => ({
        ...prev,
        dob: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const obj = {
      ...Data,
    };

    axios
      .put(
        "http://192.168.1.161:2000/api/candidate/updateProfileDetails/" +
          userDataGlobal?._id,
        obj
      )
      .then((res) => {
        if (res) {
          toast.success("Personal details edit successfully");
          dispatch(fetchUserData());
          setaddWebsites(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-[4px] w-full">
          <div className="flex gap-[16px]  items-center">
            <div className=" text-[18px] font-[600] text-[#25324B] min-w-[200px] ">
              Edit Personal details{" "}
            </div>
            <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-full"></div>
            <svg
              onClick={() => setaddWebsites(false)}
              className="hover:cursor-pointer min-w-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_141042)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                  className="hover:cursor-pointer"
                />
              </g>
            </svg>
          </div>
          <div className=" text-[12px] font-[400] text-[#646464] w-full">
            Update your personal information like contact, address and more for
            accuracy and relevance.{" "}
          </div>
        </div>
        <div className="md:w-[50%] w-[85%] flex flex-col gap-[12px] text-[14px]  font-[500] ">
          Select your Gender
          <div className="flex justify-between items-center">
            <div className="flex gap-[8px]">
              <input
                onChange={(e) => setData({ ...Data, gender: "male" })}
                value={Data.gender}
                className="custom-radio"
                type="radio"
                name="gender"
                id=""
                checked={Data.gender == "male"}
              />
              <label htmlFor="" className="text-[12px] font-[500]">
                Male
              </label>
            </div>
            <div className="flex gap-[8px]">
              <input
                onChange={(e) => setData({ ...Data, gender: "female" })}
                value={Data.gender}
                className="custom-radio"
                type="radio"
                name="gender"
                id=""
                checked={Data.gender == "female"}
              />
              <label htmlFor="" className="text-[12px] font-[500]">
                Female
              </label>
            </div>
            <div className="flex gap-[8px]">
              <input
                onChange={(e) => setData({ ...Data, gender: "others" })}
                value={Data.gender}
                className="custom-radio"
                type="radio"
                name="gender"
                id=""
                checked={Data.gender == "others"}
              />
              <label htmlFor="" className="text-[12px] font-[500]">
                Others
              </label>
            </div>
          </div>
        </div>
        <div className="md:flex-row flex-col flex  gap-[16px] ">
          <div className="flex flex-col gap-[8px] w-[100%] md:w-[50%]">
            <div className="text-[14px] font-[500] flex items-center">
              Date of Birth <span className="text-[#C00000]">*</span>
            </div>
            <input
              onChange={handleDateChange}
              value={Data.dob}
              className={`px-[16px] py-[12px] rounded-[8px] border-[1px] border-[solid]  text-[12px] font-[400] text-[#646464] h-[44px] ${
                errors.dob ? "border-red" : "border-[#DEDEDE]"
              }`}
              type="date"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-[8px] w-[100%] md:w-[50%]">
            <div className="text-[14px]  font-[500] flex items-center">
              What is your Marital status?{" "}
            </div>
            <select
              onChange={(e) =>
                setData({ ...Data, maritalStatus: e.target.value })
              }
              value={Data.maritalStatus}
              className="px-[16px] py-[12px] rounded-[8px] border-[1px] border-[solid] border-[#DEDEDE] text-[12px] font-[400] outline-none text-[#646464] h-[44px]"
              type="date"
              name=""
              id=""
            >
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
          </div>{" "}
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] s font-[500]">Residential Address</div>
          <textarea
            value={Data.address}
            onChange={(e) => setData({ ...Data, address: e.target.value })}
            className="border border-[#DEDEDE] rounded-[8px] p-[12px] text-[12px] font-[400] text-[#646464] outline-none focus:ring-0"
            placeholder="Line 1"
            name="address"
          ></textarea>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[50%] flex flex-col gap-[12px] text-[14px]  font-[500] ">
            Have you taken a career break?
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, isCareerBreak: true })}
                  value={Data.isCareerBreak}
                  className="custom-radio"
                  type="radio"
                  name="isCareerBreak"
                  id=""
                  checked={Data.isCareerBreak ? true : false}

                  // checked={Data.isCareerBreak === false?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  yes
                </label>
              </div>
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, isCareerBreak: false })}
                  value={Data.isCareerBreak}
                  className="custom-radio"
                  type="radio"
                  name="isCareerBreak"
                  id=""
                  checked={Data.isCareerBreak ? false : true}

                  // checked={Data.isCareerBreak === true?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  no
                </label>
              </div>
            </div>
          </div>
          {Data.isCareerBreak === true && (
            <div className=" w-full flex flex-col gap-[8px]">
              <div className="text-[14px]  font-[500]">
                If Yes, Specify a reason
              </div>
              <input
                // onChange={(e) =>
                //   setData({ ...data, isCareerBreakReason: e.target.value })
                // }
                onChange={handleInputChange}
                value={Data.isCareerBreakReason}
                className=" text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
                placeholder="Type here"
                type="text"
                name="isCareerBreakReason"
                id=""
              />
            </div>
          )}
        </div>
        <div className=" flex flex-col gap-[16px]">
          <div className="w-[50%] flex flex-col gap-[12px] text-[14px] font-[500] ">
            Do you have a Work Permit?
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, haveWorkPermit: true })}
                  value={Data.haveWorkPermit}
                  className="custom-radio"
                  type="radio"
                  name="haveWorkPermit"
                  id=""
                  checked={Data.haveWorkPermit ? true : false}

                  // checked={Data.haveWorkPermit === true?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  yes
                </label>
              </div>
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, haveWorkPermit: false })}
                  value={Data.haveWorkPermit}
                  className="custom-radio"
                  type="radio"
                  name="haveWorkPermit"
                  id=""
                  checked={Data.haveWorkPermit ? false : true}

                  // checked={Data.haveWorkPermit === false?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  no
                </label>
              </div>
            </div>
          </div>
          {Data.haveWorkPermit && (
            <div className=" w-full flex flex-col gap-[8px]">
              <div className="text-[14px] font-[500]">If Yes, Select one</div>
              <div className="md:w-[50%] w-[100%]">
                <select
                  onChange={(e) =>
                    setData({ ...Data, workPermitDescription: e.target.value })
                  }
                  value={Data.workPermitDescription}
                  className=" text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
                  placeholder="Select your work permit"
                  type="text"
                  name="url"
                  id=""
                >
                  <option value="a">a</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[50%] flex flex-col gap-[12px] text-[14px]  font-[500] ">
            Are you specially abled?
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, isSpecialyAbled: true })}
                  value={Data.isSpecialyAbled}
                  className="custom-radio"
                  type="radio"
                  name="isSpecialyAbled"
                  id=""
                  checked={Data.isSpecialyAbled ? true : false}

                  // checked={Data.isSpecialyAbled === true?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  yes
                </label>
              </div>
              <div className="flex gap-[8px]">
                <input
                  onChange={(e) => setData({ ...Data, isSpecialyAbled: false })}
                  value={Data.isSpecialyAbled}
                  className="custom-radio"
                  type="radio"
                  name="isSpecialyAbled"
                  id=""
                  checked={Data.isSpecialyAbled ? false : true}

                  // checked={Data.isSpecialyAbled === false?"blue":"white"}
                />
                <label htmlFor="" className="text-[12px] font-[500]">
                  no
                </label>
              </div>
            </div>
          </div>

          {Data.isSpecialyAbled && (
            <div className=" w-full flex flex-col gap-[8px]">
              <div className="text-[14px]  font-[500]">If Yes, Specify</div>
              <input
                onChange={(e) =>
                  setData({ ...Data, specialyAbledDescription: e.target.value })
                }
                value={Data.specialyAbledDescription}
                className=" text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
                placeholder="Type here"
                type="text"
                name="discription"
                id=""
              />
              {/* {console.log(316,Data)} */}
            </div>
          )}
        </div>
        <div className="w-full flex justify-end">
          {/* <button className="rounded-[8px] py-[8px] px-[16px] border-[#C00000] border-solid border-[1px] text-[#C00000] text-[16px] font-[500] transition-all transition-0.1s hover:bg-[#C00000] hover:text-[#fff]">
          Delete
        </button> */}
          <div className="flex gap-[12px]">
            <button
              className="rounded-[30px] py-[10px] sm:px-9 px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[14px]  font-[500] hover:cursor-pointer"
              onClick={() => setaddWebsites(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-[30px] py-[10px] sm:px-9 px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[14px]  font-[500] bg-[#06A9EF] "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit_personal_Dtls;
