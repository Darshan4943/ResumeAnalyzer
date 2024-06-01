import React, { useState, useEffect } from "react";
import { Close_svg } from "../../utils/svg";

const KeySkills = ({ extratctedData, setExtractedData }) => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Initialize the state with extratctedData.skills
  useEffect(() => {
    if (extratctedData && extratctedData.skills) {
      setSkills(extratctedData.skills);
    }
  }, [extratctedData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addSkill = () => {
    if (inputValue && !skills.includes(inputValue)) {
      const updatedSkills = [...skills, inputValue];
      setSkills(updatedSkills);
      setExtractedData({ ...extratctedData, skills: updatedSkills });
      setInputValue(""); // Clear the input field
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setExtractedData({ ...extratctedData, skills: updatedSkills });
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex font-medium text-[14px] text-left font-montserrat gap-2">
        <span>
          Key Skills <span className="text-[#C00000]">*</span>
        </span>
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-row gap-[8px] flex-wrap w-[416px]">
          {skills.map((item, index) => (
            <div
              className="flex gap-1 px-[8px] py-[6px] pl-[12px] rounded-[30px] justify-between items-center overflow-hidden shadow-md"
              key={index}
            >
              <p className="text-[14px] flex-wrap break-all w-full font-medium">
                {item}
              </p>
              <div onClick={() => removeSkill(item)}>
                <Close_svg height={16} width={16} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center py-[8px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]">
          <input
            type="text"
            placeholder="e.g. Javascript"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full text-[14px]"
          />
          <svg
            onClick={addSkill}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="min-w-[20] min-h-[20] cursor-pointer"
          >
            <g mask="url(#mask0_3486_37645)">
              <path
                d="M9.25 10.75H5.75C5.5375 10.75 5.35938 10.6785 5.21563 10.5356C5.07188 10.3927 5 10.2156 5 10.0044C5 9.79313 5.07188 9.61458 5.21563 9.46875C5.35938 9.32292 5.5375 9.25 5.75 9.25H9.25V5.75C9.25 5.5375 9.32146 5.35937 9.46438 5.21562C9.60729 5.07187 9.78438 5 9.99563 5C10.2069 5 10.3854 5.07187 10.5312 5.21562C10.6771 5.35937 10.75 5.5375 10.75 5.75V9.25H14.25C14.4625 9.25 14.6406 9.32146 14.7844 9.46438C14.9281 9.60729 15 9.78438 15 9.99563C15 10.2069 14.9281 10.3854 14.7844 10.5312C14.6406 10.6771 14.4625 10.75 14.25 10.75H10.75V14.25C10.75 14.4625 10.6785 14.6406 10.5356 14.7844C10.3927 14.9281 10.2156 15 10.0044 15C9.79313 15 9.61458 14.9281 9.46875 14.7844C9.32292 14.6406 9.25 14.4625 9.25 14.25V10.75Z"
                fill="#1C1B1F"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default KeySkills;
