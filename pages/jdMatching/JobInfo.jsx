import React, { useState, useEffect } from "react";

const JobInfo = ({ setJdData, jdData, setExtractedData, extratctedData }) => {
  const [jobData, setJobData] = useState({
    job_title: "",
    location: "",
    job_type: "",
    work_type: "",
    company_name: "",
    joining_duration: "",
  });
  const inputFields = [
    {
      label: "Job Title",
      type: "text",
      name: "job_title",
      placeholder: "Enter job title",
    },
    {
      label: "Job Location",
      type: "text",
      name: "location",
      placeholder: "Enter Location",
    },
    {
      label: "Job Type",
      type: "text",
      name: "job_type",
      placeholder: "Enter Job Type",
    },
    {
      label: "Work Type",
      type: "text",
      name: "work_type",
      placeholder: "Enter Work Type",
    },
    {
      label: "Company Name",
      type: "text",
      name: "company_name",
      placeholder: "Enter Company Name",
    },
    {
      label: "Joining Duration",
      type: "text",
      name: "joining_duration",
      placeholder: "Enter Joining Duration",
    },
  ];

  useEffect(() => {
    if (extratctedData) {
      setJobData(extratctedData);
    }
  }, [extratctedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
    setExtractedData({ ...jobData, [name]: value });
  };

  return (
    <div className="flex flex-col w-full gap-[8px]">
      {inputFields.map((item, index) => (
        <div className="flex flex-col w-[416px] gap-[4px]" key={index}>
          <label className="flex font-medium text-[14px] text-left font-montserrat gap-2">
            {item.label} <span className="text-[#C00000]"> *</span>
          </label>
          <input
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            value={jobData[item.name] || ""}
            onChange={handleInputChange}
            className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]"
          />
        </div>
      ))}
    </div>
  );
};

export default JobInfo;
