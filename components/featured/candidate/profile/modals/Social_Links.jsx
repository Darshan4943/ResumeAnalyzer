import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reCallUserData } from "../../../../../Redux/actions/user";
function Social_Links({ setaddWebsites }) {
  const userDataGlobal = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    profile: "PHD",
    url: "",
    discription: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "discription") {
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
  };
  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:2000/api/candidate/addSocialLinks/" +
          userDataGlobal._id,
        data
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Social Links added successfully");
          dispatch(reCallUserData());
          setaddWebsites(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className=" p-[24px] bg-[#fff] rounded-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: " 0px 1px 6px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex flex-col gap-[4px] w-full">
          <div className="flex gap-[16px] items-center">
            <div className="text-[24px] font-[500] text-[#25324B] w-[69.90%]">
              Add Online Profile
            </div>
            <div className="h-[1px] w-full bg-[#DEDEDE] flex items-center w-[63.07%]"></div>
            <svg
              className="hover:cursor-pointer"
              onClick={() => setaddWebsites(false)}
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
          <div className="text-[14px] font-[400] text-[#646464] w-full">
            Add links to your social profiles (e.g., Linkedin, Facebook, etc.).
          </div>
        </div>
        <div className=" w-[50%] flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Social Profile <span className="text-[#C00000]">*</span>
          </div>
          <select
            name="SocialProfile"
            onChange={(e) => setData({ ...data, profile: e.target.value })}
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
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
            <option value="PHD">PHD</option>
            <option value="Masters">Masters</option>
            <option value="Bachelor">Bachelor's</option>
            <option value="12th">12th</option>
            <option value="10th">10th</option>
          </select>
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            URL <span className="text-[#C00000]">*</span>
          </div>
          <input
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter your social Profile URL"
            type="text"
            value={data.url}
            name="url"
            onChange={handleInputChange}
            id=""
          />
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">Description</div>
          <textarea
            className="border-solid border-#DEDEDE border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="discription"
            value={data.discription}
            onChange={handleInputChange}
          >
            {data.discription}
          </textarea>
          <div className="text-[14px] font-[400] text-[#646464] flex justify-end">
            {400 - data.discription.length} characters left
          </div>
        </div>
        <div className="w-full flex justify-between">
          <button className="rounded-[8px] py-[8px] px-[16px] border-[#C00000] border-solid border-[1px] text-[#C00000] text-[16px] font-[500] transition-all transition-0.1s hover:bg-[#C00000] hover:text-[#fff]">
            Delete
          </button>
          <div className="flex gap-[12px]">
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[16px] font-[500] hover:cursor-pointer"
              onClick={() => setaddWebsites(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[16px] font-[500] bg-[#06A9EF] "
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Social_Links;
