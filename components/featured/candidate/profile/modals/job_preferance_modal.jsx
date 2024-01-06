import React, { useState } from "react";
import { SkillList } from "@/utils/data";
import ReactSelect from "react-select";
import { camelCase } from "../../../../../utils/middleware";
import { ClosedIcon } from "../../../../../utils/svg";
import { City } from "../../../../../utils/data";
import axios from "axios";
import { toast } from "react-toastify";
import { reCallUserData } from "@/Redux/actions/user";
const JobPrefrenceModal = ({ setEditView }) => {
  const [skills, setSkills] = useState([...SkillList]);
  const [data, setData] = useState({
    industry: "",
    department: "",
    jobRole: "",
    jobType: "",
    jobMode: "",
    expectedSalary: "",
    location: "",
  });
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
    }
    console.log("Form submitted:", data, preferedLocation);
    axios
    .put(
      "http://localhost:2000/api/candidate/updateJobPreferance/" +
      userDataGlobal._id,
      obj
    )
    .then((res) => {
      console.log(68, data);
      if (res) {
        console.log(111, res);
        toast.success("Upgrade Job preferance successfully");
        dispatchEvent(reCallUserData());
        setEditView(false)
      }
    })
    .catch((err) => console.log(err));
    // You may want to reset the form or perform any other actions after submission
  };
  return (
    <>
      <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px] modal_container"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="modal_title flex justify-between gap-[16px] items-center">
          Edit Job Preferences{" "}
          <div className="h-[1px] w-full bg-[#DEDEDE] flex items-center w-[57.07%]"></div>
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
          Customize your job settings to match what you're looking for in a job.
        </p>
        <form action="">
          <div className="w-full form_container">
            {inputField.map((item) => (
              <div className="input-container w-[46%] ">
                <label className="label">{item.label}</label>
                <input
                  type="text"
                  className="w-full input"
                  placeholder={item.placeholder}
                  name={item.name}
                  value={data[item.name]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="input-container w-[46%] ">
              <label className="label">Preferred Job Type</label>
              <ReactSelect
                options={skills.map((item) => ({
                  value: item,
                  label: camelCase(item),
                }))}
                className="w-full  "
                //   onChange={handleChange}
              />
            </div>
            <div className="input-container w-[46%] ">
              <label className="label">Preferred Job Mode</label>
              <ReactSelect
                options={skills.map((item) => ({
                  value: item,
                  label: camelCase(item),
                }))}
                className="w-full  "
                //   onChange={handleChange}
              />
            </div>
            <div className="input-container w-[46%] ">
              <label className="label">Expected salary</label>
              <input
                type="text"
                className="w-full input"
                placeholder={"Enter here your preference"}
                name={"expectedSalary"}
                value={data.expectedSalary}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container w-[46%] ">
              <label className="label">Preferred work location</label>
              <ReactSelect
                options={City?.map((item) => ({
                  value: item,
                  label: camelCase(item),
                }))}
                className="w-full  "
                onChange={(data) => {
                  setPreferedLocation([
                    ...preferedLocation,
                    { location: data.value },
                  ]);
                }}
              />
            </div>
          </div>
          <div className="location-list">
            {preferedLocation.map((item) => (
              <div className="location_item">
                {item.location}
                <div onClick={(e) => removeCity(e, item)}>
                  <ClosedIcon className={"w-5 h-5 cursor-pointer"} />
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
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[16px] font-[500] hover:cursor-pointer"
              onClick={() => setEditView(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[16px] font-[500] bg-[#06A9EF] "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPrefrenceModal;
