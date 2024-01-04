import React, { useState } from "react";
import { SkillList } from "@/utils/data";
import ReactSelect from "react-select";
import { camelCase } from "../../../../../utils/middleware";
import { ClosedIcon } from "../../../../../utils/svg";
import { City } from "../../../../../utils/data";
const JobPrefrenceModal = () => {
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
  return (
    <>
      <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px] modal_container"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="modal_title">Edit Job Preferences</div>
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
      </div>
    </>
  );
};

export default JobPrefrenceModal;
