import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function Social_Links({ setaddWebsites, setEditSocial, Social, editSocial }) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    profile: "",
    url: "",
    discription: "",

    ...(editSocial && {
      profile: Social.profile,
      url: Social.url,
      discription: Social.discription,
    }),
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "discription") {
      if (value.length <= 400) {
        setData({
          ...data,
          [name]: value,
        });
      }
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }

    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!data.profile || data.profile === "select") {
      validationErrors.profile = "Please select a valid social profile.";
    }

    if (!data.url.trim()) {
      validationErrors.url = "url entity is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const isEditing = !!editSocial;
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (isEditing) {
      axios
        .put(
          `https://jamblix.com/api/candidate/${userDataGlobal?._id}/updateSocialLinks/${Social._id}`,
          data
        )
        .then((res) => {
          console.log(444, res.data);
          dispatch(fetchUserData());
          setaddWebsites(false);
          toast.success("Awards updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          "https://jamblix.com/api/candidate/addSocialLinks/" +
            userDataGlobal?._id,
          data
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("Social Links added successfully");
            dispatch(fetchUserData());
            setaddWebsites(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-[4px] w-full">
          <div className="flex gap-[16px] items-center">
            <div className="text-[18px] font-[600] text-[#25324B] min-w-[180px]">
              {isEditing ? " Edit" : "Add"} Online Profile
            </div>
            <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-full"></div>
            <svg
              className="hover:cursor-pointer min-w-[40px]"
              onClick={() => setaddWebsites(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
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
          <div className="text-[12px] font-[400] text-[#646464] w-full">
            Add links to your social profiles (e.g., Linkedin, Facebook, etc.).
          </div>
        </div>
        <div className=" sm:w-[50%] flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">
            Social Profile <span className="text-[#C00000]">*</span>
          </div>
          <select
            name="SocialProfile"
            value={data.profile}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setData({ ...data, profile: selectedValue });
              if (selectedValue !== "select") {
                setErrors({ ...errors, profile: "" });
              }
            }}
            className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid w-full flex items-center justify-between py-[8px] px-[16px] ${
              errors.profile ? "border-red" : "border-[#DEDEDE]"
            }`}
          >
            Select social profile{" "}
            <svg
              className="hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g mask="url(#mask0_5716_141063)">
                <path
                  d="M10 12.8337L5 7.83366L6.16667 6.66699L10 10.5003L13.8333 6.66699L15 7.83366L10 12.8337Z"
                  fill="#646464"
                />
              </g>
            </svg>
            <option disabled value="select">
              Select
            </option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
              <option value="Reddit">Reddit</option>
            <option value="Pinterest">Pinterest</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="GitHub">GitHub</option>
            <option value="GitLab">GitLab</option>
            <option value="Figma">Figma</option>
            <option value="Dribbble">Dribbble</option>
            <option value="Behance">Behance</option>
            <option value="Discord">Discord</option>
            <option value="Slack">Slack</option>
            <option value="Twitch">Twitch</option>
            <option value="Medium">Medium</option>
            <option value="Quora">Quora</option>
            <option value="Stack Overflow">Stack Overflow</option>
          </select>
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">
            URL <span className="text-[#C00000]">*</span>
          </div>
          <input
            className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid w-full flex items-center justify-between py-[8px] px-[16px] ${
              errors.url ? "border-red" : "border-[#DEDEDE]"
            } `}
            placeholder="Enter your social Profile URL"
            type="text"
            value={data.url}
            name="url"
            onChange={handleInputChange}
            id=""
          />
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">Description</div>
          <textarea
            className="border border-[#DEDEDE] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="discription"
            value={data.discription}
            onChange={handleInputChange}
          ></textarea>
          <div className="text-[12px] font-[400] text-[#646464] flex justify-end">
            {Math.max(0, 400 - data.discription.length)} characters left
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="px-[26px] red_border_Button h-[38px] rounded-[30px]"
              onClick={() => {
                setData({
                  profile: "",
                  url: "",
                  discription: "",
                });
                setaddWebsites(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-[32px] bg_Button h-[38px] rounded-[30px]"
              onClick={handleSubmit}
            >
              {isEditing ? " Save Changes" : "Add Social Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social_Links;
