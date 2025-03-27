import axios from "axios";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DateSelector from "../../common/dateSelector";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function SampleWork({ setaddSampleWork, Project, editProject }) {
  const dispatch = useDispatch();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    url: "",
    currentlyWorking: false,
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
    description: "",

    ...(editProject && {
      title: Project?.title,
      url: Project?.url,
      currentlyWorking: Project?.isCurrentlyWorking || false,
      duration: {
        start: {
          year: Project?.duration?.startDate?.year || "Year",
          month: Project?.duration?.startDate?.month || "Month",
        },
        end: {
          year: Project?.duration?.endDate?.year || "Year",
          month: Project?.duration?.endDate?.month || "Month",
        },
      },
      description: Project?.description,
    }),
  });

  const validateForm = () => {
    let validationErrors = {};
    if (!data.title.trim()) {
      validationErrors.title = "Title is required.";
    }
    if (!data.url.trim()) {
      validationErrors.url = "URL is required.";
    } else if (!/^(https?:\/\/)?([\w.-]+)+[:\d]*([\/?#].*)?$/i.test(data.url)) {
      validationErrors.url = "Please enter a valid URL.";
    }
    // if (
    //   data.duration.start.year === "Year" ||
    //   data.duration.start.month === "Month"
    // ) {
    //   validationErrors.durationStart = "Please select a valid start date.";
    // }

    // if (!data.currentlyWorking) {
    //   if (
    //     data.duration.end.year === "Year" ||
    //     data.duration.end.month === "Month"
    //   ) {
    //     validationErrors.durationEnd = "Please select a valid end date.";
    //   }
    // }
    // if (!data.description.trim()) {
    //   validationErrors.description = "Description is required.";
    // }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const isEditing = !!editProject;

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const projectData = {
      title: data.title,
      url: data.url,
      isCurrentlyWorking: data.currentlyWorking,

      duration: {
        startDate: {
          year: data.duration?.start.year,
          month: data.duration?.start.month,
        },
        endDate: {
          year: data.duration?.end.year,
          month: data.duration?.end.month,
        },
      },
      description: data.description,
    };

    if (isEditing) {
      axios
        .put(
          `https://jamblix.com/api/candidate/${userDataGlobal?._id}/updateProject/${Project._id}`,
          projectData
        )
        .then((res) => {
          dispatch(fetchUserData());
          setaddSampleWork(false);
          toast.success("Project updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          `https://jamblix.com/api/candidate/addProject/${userDataGlobal?._id}`,
          projectData
        )
        .then((res) => {
          dispatch(fetchUserData());

          setaddSampleWork(false);
          toast.success("Projects Added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "currentlyWorking" ? value === "true" : value,
    }));
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1 text-[12px] font-normal">
          <div className="flex gap-[4px] w-full items-center">
            <div className="text-[18px] font-[600] text-[#25324B] min-w-[180px]">
              Add Sample Work
            </div>
            <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-full"></div>
            <div>
              <svg
                className="hover:cursor-pointer"
                onClick={() => setaddSampleWork(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
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
          </div>
          Add link to your projects (e.g. Github links etc.)
        </div>

        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">
            Work title <span className="text-[#C00000]">*</span>
          </div>
          <input
            className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid  w-full flex items-center justify-between py-[8px] px-[16px] ${
              errors.title ? "border-red" : "border-[#DEDEDE]"
            }`}
            placeholder="Enter work title"
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => {
              const { value } = e.target;
              setData((prev) => ({
                ...prev,
                title: value,
              }));
              if (value.trim() !== "") {
                setErrors((prev) => ({
                  ...prev,
                  title: "",
                }));
              }
            }}
          />
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">
            URL <span className="text-[#C00000]">*</span>
          </div>
          <input
            className={`text-[12px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid  w-full flex items-center justify-between py-[8px] px-[16px] ${
              errors.url ? "border-red" : "border-[#DEDEDE]"
            }`}
            placeholder="Enter your social Profile URL"
            type="text"
            name="url"
            value={data.url}
            onChange={(e) => {
              const { value } = e.target;
              setData((prev) => ({
                ...prev,
                url: value,
              }));
              if (value.trim() !== "") {
                setErrors((prev) => ({
                  ...prev,
                  url: "",
                }));
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="w-[50%] flex flex-col gap-[12px] text-[14px] font-[500] ">
            Are you currently working on this?{" "}
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="currentlyWorking"
                  value={true}
                  checked={data.currentlyWorking === true}
                  onChange={handleInputChange}
                />
                <label>Yes</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="currentlyWorking"
                  value={false}
                  checked={data.currentlyWorking === false}
                  onChange={handleInputChange}
                />
                <label>No</label>
              </div>
            </div>
          </div>
        </div>
        <DateSelector
          idPrefix="projects"
          data={data}
          dataSeter={setData}
          isRow={true}
        />
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[14px] font-[500]">Description</div>
          <textarea
            className="border-solid border-[#DEDEDE] border-[1px] rounded-[8px] p-[12px] text-[12px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="px-[26px] red_border_Button h-[38px] rounded-[30px]"
              onClick={() => setaddSampleWork(false)}
            >
              Cancel
            </button>
            <button
              className="px-[32px] bg_Button h-[38px] rounded-[30px]"
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

export default SampleWork;
