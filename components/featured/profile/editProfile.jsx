import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";


function EditProfile({ setEditProfile }) {
  const { userDataGlobal, profileData } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    currentLocation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .put(
        "http://localhost:2000/api/candidate/updateProfile/" +
        userDataGlobal._id,
        data
      )

      .then((res) => {
        toast.success("profile edit successfully");
        dispatch(fetchUserData());
        setEditProfile(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (profileData) {
      const {
        firstName,
        lastName,
        email,
        currentLocation,
        mobileNo,
      } = profileData.basics;
      setData({
        ...data,
        firstName,
        lastName,
        email,
        currentLocation,
        mobileNo,
      });
    }
  }, [profileData]);

  return (
    <div className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
      <div
        className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto "

      >
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
              className="min-w-[40px]"
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
            <div className="personal_name w-[50%]">
              <p className="form_text_heading text-[14px]  font-[500]">
                First name <span className="star">*</span>
              </p>
              <input
                type="text"
                id="first_name"
                value={data.firstName}
                name="firstName"
                onChange={handleInputChange}
                // onChange={(e) => setData({ ...data, profile: e.target.value })}
                placeholder="Enter first name"
                className="text-[12px]  font-[400] py-1 max-h-[44px]"
              />
            </div>
            <div className="personal_name w-[50%]">
              <p className="form_text_heading text-[14px]  font-[500]">
                Last name <span className="star">*</span>
              </p>
              <input
                type="text"
                value={data.lastName}
                name="lastName"
                onChange={handleInputChange}
                id="first_name"
                placeholder="Enter Last name"
                className="text-[12px]  font-[400] py-1 max-h-[44px]"
              />
            </div>
          </div>

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Email <span className="star">*</span>
            </p>
            <input
              type="email"
              value={data.email}
              name="email"
              onChange={handleInputChange}
              id="single_input"
              placeholder="Enter Email"
              className="text-[12px]  font-[400]"
            />
          </div>

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Contact number <span className="star">*</span>
            </p>
            <input
              type="number"
              value={data.mobileNo}
              name="mobileNo"
              onChange={handleInputChange}
              id="single_input"
              placeholder="Enter Contact number"
              className="text-[12px]  font-[400]"
            />
          </div>

          <div className="personal_single_input w-full">
            <p className="form_text_heading text-[14px]  font-[500]">
              Current Location <span className="star">*</span>
            </p>
            <input
              type="text"
              value={data.currentLocation}
              name="currentLocation"
              onChange={handleInputChange}
              id="single_input"
              placeholder="Enter Current location"
              className="text-[12px]  font-[400]"
            />
          </div>

          <div className=" w-full">
            <div className="personal_name w-full">
              <p className="form_text_heading text-[14px]  font-[500]">
                Change Password <span className="star">*</span>
              </p>

              <input
                type="password"
                name=""
                id="single_input"
                placeholder="Create new password"
                className="text-[12px]  font-[400] w-full"
              />
            </div>
          </div>

          <input
            type="password"
            name=""
            id="single_input"
            placeholder="Confirm new password"
            className="text-[12px]  font-[400] w-full"
          />

          <p className="text-[#06A9EF] text-[14px] font-[600] leading-[16px]">
            Send Verification Code
          </p>

          <div className="flex justify-end items-start self-stretch gap-[12px]">
            <button
              onClick={() => setEditProfile(false)}
              className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px]    text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF]"
            >
              Cancel
            </button>
            <button
              className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px] text-[#fff] text-[16px] font-[500] border-[1px] border-solid bg-[#06A9EF]"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
