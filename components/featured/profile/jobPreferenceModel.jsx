import React, { useEffect, useState } from "react";

import ReactSelect from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { camelCase } from "../../../utils/middleware";
import { ClosedIcon } from "../../../utils/svg";
import { City } from "../../../utils/data";
import { fetchUserData } from "../../../Redux/slices/userSlice";
const JobPrefrenceModal = ({ setEditView }) => {

  const dispatch = useDispatch();
 const { userDataGlobal } = useSelector((state) => state.user.userData);
  const jobMode = ["onSiteWork", "remoteWork", "hybridWork"]
  const jobType = ["fullTime",
    "partTime",
    "casual",
    "fixedTermContract",
    "apprenticeship",
    "traineeship",
    "internship",
    "permanent",]

  const shift = ["First Shift", "Second Shift", "Third Shift", "Fixed Shift"]
  const [data, setData] = useState({
    industry: userDataGlobal?.jobPrefrences?.industry || "",
    department: userDataGlobal?.jobPrefrences?.department || "",
    jobRole: userDataGlobal?.jobPrefrences?.jobRole || "",
    jobType: userDataGlobal?.jobPrefrences?.jobType || "",
    jobMode: userDataGlobal?.jobPrefrences?.jobMode || "",
    expectedSalary: userDataGlobal?.jobPrefrences?.expectedSalary || "",
    shift:userDataGlobal?.jobPrefrences?.shift || "",
  });

  useEffect(() => {
    if (
      userDataGlobal &&
      userDataGlobal.jobPrefrences &&
      userDataGlobal.jobPrefrences.preferedLocation
    ) {
      const locations = userDataGlobal?.jobPrefrences?.preferedLocation?.map((loc) => ({
        location: loc.location,
        label: loc.location,
      }));
      console.log(locations)
      setPreferedLocation(locations);
    }
  }, [userDataGlobal]);




  const [preferedLocation, setPreferedLocation] = useState([]);

  
  const inputField = [
    {
      label: "Preferred Industry",
      type: "text",
      name: "industry",
      placeholder: "Ex. Information technology",
    },
    {
      label: "Preferred Department",
      type: "text",
      name: "department",
      placeholder: "Ex. UX, Design & Architecture",
    },
    {
      label: "Preferred Job Role",
      type: "text",
      name: "jobRole",
      placeholder: "Ex. UI / UX Designer",
    },
  ];

  const handleJobTypeChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      jobType: value,
    }));
  };

  const handleJobModeChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      jobMode: value,
    }));
  }
  const handleShiftChange=(value) => {
    setData((prevData) => ({
      ...prevData,
      shift: value,
    }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const removeCity = (e, item) => {
    e.preventDefault();
    const filter = preferedLocation.filter(
      (data) => data.location !== item.location
    );
    setPreferedLocation(filter);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      ...data,
      industry: data.industry,
      department: data.department,
      jobRole: data.jobRole,
      jobType: data.jobType,
      jobMode: data.jobMode,
      expectedSalary: data.expectedSalary,
      shift:data.shift,
      preferedLocation: preferedLocation.map((item) => ({ location: item.location })),
    }

    axios
      .put(
        "http://localhost:2000/api/candidate/updateJobPreferance/" +
        userDataGlobal?._id,
        obj
      )
      .then((res) => {
        console.log(68, data);
        if (res) {
          toast.success("Updated Job preferances successfully");
          dispatch(fetchUserData());
          setEditView(false)
        }
      })
      .catch((err) => console.log(err));
    // You may want to reset the form or perform any other actions after submission
  };
  return (
    <div className="bg-white rounded-[16px] py-3 "
    style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
      <div
        className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] modal_container py-3 px-6 overflow-y-auto "
    
      >
        <div className="flex flex-col gap-1">
        <div className="modal_title flex justify-between gap-[16px]  items-center">
         <p className="text-[18px] font-[600] min-w-[200px]"> Edit Job Preferences{" "}</p>
          <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-full"></div>
          <svg
            className="hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            onClick={() => setEditView(false)}
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
        <p className="text-[12px]">
          Customize your job settings to match what youre looking for in a job.
        </p>
        </div>
        <form action="">
          <div className="w-full form_container_col form_container">
            {inputField.map((item,index) => (
              <div key={index} className="input-container w-[100%] md:w-[46%] ">
                <label className="text-[14px] font-medium">{item.label}</label>
                <input
                  type="text"
                  className="w-full input text-[12px] font-[400]"
                  placeholder={item.placeholder}
                  name={item.name}
                  value={data[item.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="input-container w-[100%] md:w-[46%]  ">
              <label className="text-[14px] font-medium">Preferred Job Type</label>
              <select
                className="w-full input text-[12px] font-[400]"
                value={data.jobType || ""}
                onChange={(e) => handleJobTypeChange(e.target.value)}
              >
                <option value="">Select Job Type</option>
                {jobType.map((type) => (
                  <option key={type} value={type}>
                    {camelCase(type)}
                  </option>
                ))}
              </select>

            </div>
            <div className="input-container w-[100%] md:w-[46%] ">
              <label className="text-[14px] font-medium">Preferred Job Mode</label>
              <select
                className="w-full input text-[12px] font-[400]"
                value={data.jobMode ||""}
                onChange={(e) => handleJobModeChange(e.target.value)}
              ><option value="">Select Job Mode</option>
                {jobMode.map((mode) => (
                  <option key={mode} value={mode}>
                    {camelCase(mode)}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-container w-[100%] md:w-[46%] ">
              <label className="text-[14px] font-medium">Preferred Shift</label>
              <select
                className="w-full input text-[12px] font-[400]"
                value={data.shift || ''}
                onChange={(e) => handleShiftChange(e.target.value)}
              >
                <option value="">Select Shift</option>
                {shift.map((shiftValue) => (
                  <option key={shiftValue} value={shiftValue}>
                    {camelCase(shiftValue)}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container w-[100%] md:w-[46%]">
              <label className="text-[14px] font-medium">Expected salary</label>
              <input
                type="text"
                className="w-full input text-[12px] font-[400]"
                placeholder={"Enter here your preference"}
                name={"expectedSalary"}
                value={data.expectedSalary}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container w-[100%] md:w-[46%] ">
              <label className="text-[14px] font-medium ">Preferred work location</label>
              <ReactSelect
                options={City?.map((item) => ({
                  value: item,
                  label: camelCase(item),
                }))}
                className="w-full text-[12px] font-[400]  "
                onChange={(data) => {
                  setPreferedLocation([
                    ...preferedLocation,
                    { location: data.value },
                  ]);
                }}
              />
            </div>
          </div>
          <div className="location-list ">
            {preferedLocation.map((item,index) => (
              <div key={index} className="location_item text-[12px] font-[400] h-[36px]">
                {item.location}
                <div onClick={(e) => removeCity(e, item)}>
                  <ClosedIcon className={"w-5 h-5 cursor-pointer "} />
                </div>
              </div>
            ))}
          </div>
        </form>
        <div className="w-full flex justify-end">
          {/* <button className="rounded-[8px] py-[8px] px-[16px] border-[#C00000] border-solid border-[1px] text-[#C00000] text-[16px] font-[500] transition-all transition-0.1s hover:bg-[#C00000] hover:text-[#fff]">
          Delete
        </button> */}
          <div className="flex gap-[12px]">
            <button
              className="rounded-[30px] py-[8px] sm:px-9 px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[12px] scr420:text-[14px] font-[600] hover:cursor-pointer"
              onClick={() => setEditView(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-[30px] py-[8px] sm:px-9 px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[12px] scr420:text-[14px] font-[600] bg-[#06A9EF] "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPrefrenceModal;
