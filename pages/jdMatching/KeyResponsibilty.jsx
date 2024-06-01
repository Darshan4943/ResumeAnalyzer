import React, { useState, useEffect } from "react";

const KeyResponsibility = ({
  ShowForm,
  setShowForm,
  extratctedData,
  setExtractedData,
  setEditId,
  handleEdit,
  setIsEdit,
}) => {
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState({
    action: "",
    objective: "",
    frequency: "",
    collaboration: [],
    required_skill: [],
  });

  // Initialize the state with extratctedData.key_responsibilities
  useEffect(() => {
    if (extratctedData && extratctedData.key_responsibilities) {
      setKeyResponsibilities(extratctedData.key_responsibilities);
    }
  }, [extratctedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility({ ...newResponsibility, [name]: value });
  };

  const handleId = (index) => {
    setEditId(index);
    setIsEdit(true);
  };

  return (
    <div className="flex flex-col gap-[16px] w-[416px]">
      <div className="flex flex-row justify-between items-center  ">
        <div className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
          Key Responsibility <span className="text-[#e74c3c]">*</span>
        </div>
        <div>
          <div
            className="flex gap-1 bg-[#06A9EF] rounded-[24px] p-[4px] px-[12px] pl-[6px] cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
            <p className="text-[16px] font-semibold text-[#FFFFFF]">Add</p>
          </div>
        </div>
      </div>

      {keyResponsibilities.map((responsibility, index) => (
        <div
          key={index}
          className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="font-montserrat text-[12px] font-semibold leading-[14.63px] text-left">
              Entry {index + 1}
            </div>
            <div onClick={() => handleId(index)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <path
                  d="M12.05 20.9492H13.0064L20.0377 13.918L19.0814 12.9617L12.05 19.993V20.9492ZM10.7002 22.2992V19.4305L20.0377 10.093C20.1752 9.95547 20.3242 9.85547 20.4847 9.79297C20.6451 9.73047 20.8138 9.69922 20.9909 9.69922C21.1679 9.69922 21.3377 9.73047 21.5002 9.79297C21.6627 9.85547 21.8127 9.95547 21.9502 10.093L22.9064 11.0492C23.0439 11.1867 23.1439 11.3367 23.2064 11.4992C23.2689 11.6617 23.3002 11.8276 23.3002 11.9968C23.3002 12.1775 23.2688 12.3496 23.2061 12.5132C23.1433 12.6768 23.0434 12.8263 22.9064 12.9617L13.5689 22.2992H10.7002ZM19.5511 13.4483L19.0814 12.9617L20.0377 13.918L19.5511 13.4483Z"
                  fill="#808080"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col p-[12px] gap-[6px]">
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Action:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.action}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Objective:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.objective}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Collaboration:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.collaboration.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Required skills:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.required_skill.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Frequency:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.frequency}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyResponsibility;
