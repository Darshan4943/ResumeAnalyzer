import React, { useEffect, useState } from "react";
import Achievement from "../../createResume/components/achivement";

const ProjectInternship = ({ data, setData }) => {
  const [isShow, setIsShow] = useState(true);
  const [relevantSkills, setrelevantSkills] = useState([
    "javascript",
    "react js",
    "Css",
    "Html",
    "Node js",
    "React native",
    "c++",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [ProjectData, setProjectData] = useState({
    projectName: "",
    description: "",
    achievements: "",
    responsibilities: "",
  });
  const inputFields = [
    {
      label: "Name of Project/ Internship",
      type: "text",
      name: "projectName",
      placeholder: "Enter a Project/ Internship",
      value: ProjectData.projectName,
      className: " ",
    },
    {
      label: "Brief description",
      type: "text",
      name: "description",
      placeholder: "Brief description of Project/ Internship",
      value: ProjectData.description,
      className: " ",
    },
    {
      label: "Key Achievement",
      type: "text",
      name: "achievements",
      placeholder: "Mention a Key Achievement",
      value: ProjectData.achievements,
      className: " ",
    },

    {
      label: "Work Process/ Responsibility",
      type: "text",
      name: "responsibilities",
      placeholder: "Mention Outcome",
      value: ProjectData.responsibilities,
      className: " ",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...ProjectData, [name]: value });
    setData({ ...data, [name]: value });
  };

  const handleInputSkills = (e) => {
    setInputValue(e.target.value);
  };

  const addSkill = () => {
    if (relevantSkills && !relevantSkills.includes(inputValue)) {
      const updatedSkills = [...relevantSkills, inputValue];
      setrelevantSkills(updatedSkills);

      setData({ ...data, relevantSkills: updatedSkills });
      setInputValue("");
    }
  };

  useEffect(() => {
    setProjectData({
      projectName: data?.projectName,
      description: data?.description,
      achievements: data?.achievements,
      responsibilities: data?.responsibilities,
    });
  }, [data]);
  return (
    <div className="flex flex-col gap-[16px] w-full bg-white py-4">
      <div className="flex flex-row justify-between gap-[8px] items-center">
        <div>
          <span className="font-montserrat text-[18px] font-[600] leading-[21.94px] text-left text-[#333333]">
            Project/ Internship & Skills
          </span>
        </div>
        <div>
          {isShow ? (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00078 2.7999L2.10078 6.6749C1.91745 6.85824 1.68828 6.95407 1.41328 6.9624C1.13828 6.97074 0.900781 6.8749 0.700781 6.6749C0.517448 6.49157 0.425781 6.25824 0.425781 5.9749C0.425781 5.69157 0.517448 5.45824 0.700781 5.2749L5.30078 0.674902C5.40078 0.574902 5.50911 0.504069 5.62578 0.462402C5.74245 0.420736 5.86745 0.399902 6.00078 0.399902C6.13411 0.399902 6.25911 0.420736 6.37578 0.462402C6.49245 0.504069 6.60078 0.574902 6.70078 0.674902L11.3008 5.2749C11.4841 5.45824 11.5799 5.6874 11.5883 5.9624C11.5966 6.2374 11.5008 6.4749 11.3008 6.6749C11.1174 6.85824 10.8841 6.9499 10.6008 6.9499C10.3174 6.9499 10.0841 6.85824 9.90078 6.6749L6.00078 2.7999Z"
                  fill="#333333"
                />
              </svg>
            </div>
          ) : (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00011 6.95021C5.86678 6.95021 5.74178 6.92937 5.62511 6.88771C5.50844 6.84604 5.40011 6.77521 5.30011 6.67521L0.700109 2.07521C0.516776 1.89187 0.420943 1.66271 0.412609 1.38771C0.404276 1.11271 0.500109 0.875207 0.700109 0.675207C0.883443 0.491874 1.11678 0.400207 1.40011 0.400207C1.68344 0.400207 1.91678 0.491874 2.10011 0.675207L6.00011 4.55021L9.90011 0.675207C10.0834 0.491874 10.3126 0.39604 10.5876 0.387707C10.8626 0.379374 11.1001 0.475207 11.3001 0.675207C11.4834 0.85854 11.5751 1.09187 11.5751 1.37521C11.5751 1.65854 11.4834 1.89187 11.3001 2.07521L6.70011 6.67521C6.60011 6.77521 6.49178 6.84604 6.37511 6.88771C6.25844 6.92937 6.13344 6.95021 6.00011 6.95021Z"
                  fill="#333333"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isShow && (
        <>
          <div className="flex flex-col gap-[8px]">
            {inputFields.map((project, index) => (
              <div className="flex flex-col gap-[8px]" key={index}>
                <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
                  {project.label}
                </label>
                <input
                  type={project.type}
                  name={project.name}
                  placeholder={project.placeholder}
                  value={ProjectData[project.name]}
                  onChange={handleInputChange}
                  className="w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400] border-[#DEDEDE]"
                  // className={`w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400] ${
                  //   formErrors["jobTitle"]
                  //     ? "border-[#C00000]"
                  //     : "border-[#DEDEDE]"
                  // }`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
              Relevant Skills <span>*</span>
            </label>

            <div className=" flex flex-row justify-between w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid border-[#DEDEDE] rounded-[8px] ">
              <input
                type="text"
                placeholder="e.g. Javascript"
                value={inputValue}
                onChange={handleInputSkills}
                className=" text-[12px]  text-[#646464] font-[400]"
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

            <div className="flex flex-row gap-[8px] flex-wrap w-full">
              {relevantSkills?.map((item, index) => (
                <div
                  className="flex pt-[2px] pr-[8px] pb-[2px] pl-[12px] gap-1 rounded-[30px]  border-[0.5px] border-[#06A9EF] overflow-hidden items-center"
                  key={index}
                >
                  <p className="text-[12px] flex-wrap break-all w-full font-[500]">
                    {item}
                  </p>
                  <div onClick={() => removeSkill(item)}>
                    <svg
                      // className="min-w-[20px] min-h-[20px]"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.99935 5.0625L1.56372 7.47917C1.4097 7.63194 1.23546 7.70833 1.04102 7.70833C0.846571 7.70833 0.67296 7.63194 0.520182 7.47917C0.367405 7.32639 0.291016 7.15278 0.291016 6.95833C0.291016 6.76389 0.367405 6.58965 0.520182 6.43563L2.93685 4L0.520182 1.58521C0.367405 1.43118 0.291016 1.25694 0.291016 1.0625C0.291016 0.868056 0.367405 0.694444 0.520182 0.541667C0.67296 0.388889 0.846571 0.3125 1.04102 0.3125C1.23546 0.3125 1.4097 0.388889 1.56372 0.541667L3.99935 2.95833L6.41414 0.541667C6.56817 0.388889 6.7424 0.3125 6.93685 0.3125C7.13129 0.3125 7.3049 0.388889 7.45768 0.541667C7.61046 0.694444 7.68685 0.868056 7.68685 1.0625C7.68685 1.25694 7.61046 1.43118 7.45768 1.58521L5.04102 4L7.45768 6.43563C7.61046 6.58965 7.68685 6.76389 7.68685 6.95833C7.68685 7.15278 7.61046 7.32639 7.45768 7.47917C7.3049 7.63194 7.13129 7.70833 6.93685 7.70833C6.7424 7.70833 6.56817 7.63194 6.41414 7.47917L3.99935 5.0625Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectInternship;
