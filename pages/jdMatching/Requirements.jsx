import React, { useState, useEffect } from "react";
import { Close_svg } from "../../utils/svg";

const Requirements = ({ extratctedData, setExtractedData }) => {
  const [skills, setSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [niceToHaveSkills, setNiceToHaveSkills] = useState([]);
  const [expandReq, setExpandReq] = useState(false);
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [niceToHaveExperience, setNiceToHaveExperience] = useState("");

  useEffect(() => {
    if (extratctedData.requirements) {
      const { must_have, nice_to_have, description } =
        extratctedData.requirements;
      setSkills(must_have.skills || []);
      setSoftSkills(must_have.soft_skills || []);
      setQualification(must_have.qualification || "");
      setExperience(must_have.years_of_experience || "");
      setNiceToHaveSkills(nice_to_have.skills || []);
      setNiceToHaveExperience(nice_to_have.experience || "");
      setDescription(description || "");
    }
  }, [extratctedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractedData((prevData) => ({
      ...prevData,
      requirements: {
        ...prevData.requirements,
        must_have: {
          ...prevData.requirements.must_have,
          [name]: value,
        },
      },
    }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setExtractedData((prevData) => ({
      ...prevData,
      requirements: {
        ...prevData.requirements,
        description: value,
      },
    }));
  };

  const handleAddSkill = (type, skill) => {
    if (type === "must_have") {
      setSkills((prevSkills) => [...prevSkills, skill]);
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          must_have: {
            ...prevData.requirements.must_have,
            skills: [...prevData.requirements.must_have.skills, skill],
          },
        },
      }));
    } else if (type === "soft_skills") {
      setSoftSkills((prevSkills) => [...prevSkills, skill]);
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          must_have: {
            ...prevData.requirements.must_have,
            soft_skills: [
              ...prevData.requirements.must_have.soft_skills,
              skill,
            ],
          },
        },
      }));
    } else if (type === "nice_to_have") {
      setNiceToHaveSkills((prevSkills) => [...prevSkills, skill]);
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          nice_to_have: {
            ...prevData.requirements.nice_to_have,
            skills: [...prevData.requirements.nice_to_have.skills, skill],
          },
        },
      }));
    }
  };

  const removeSkill = (type, skill) => {
    if (type === "must_have") {
      setSkills((prevSkills) => prevSkills.filter((item) => item !== skill));
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          must_have: {
            ...prevData.requirements.must_have,
            skills: prevData.requirements.must_have.skills.filter(
              (item) => item !== skill
            ),
          },
        },
      }));
    } else if (type === "soft_skills") {
      setSoftSkills((prevSkills) =>
        prevSkills.filter((item) => item !== skill)
      );
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          must_have: {
            ...prevData.requirements.must_have,
            soft_skills: prevData.requirements.must_have.soft_skills.filter(
              (item) => item !== skill
            ),
          },
        },
      }));
    } else if (type === "nice_to_have") {
      setNiceToHaveSkills((prevSkills) =>
        prevSkills.filter((item) => item !== skill)
      );
      setExtractedData((prevData) => ({
        ...prevData,
        requirements: {
          ...prevData.requirements,
          nice_to_have: {
            ...prevData.requirements.nice_to_have,
            skills: prevData.requirements.nice_to_have.skills.filter(
              (item) => item !== skill
            ),
          },
        },
      }));
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-row justify-between w-[416px] gap-[8px] ">
          <h6 className="flex font-semibold text-[14px] text-left font-montserrat gap-2">
            Requirements<span className="text-[#C00000]">*</span>
          </h6>
          <div onClick={() => setExpandReq(!expandReq)}>
            {expandReq ? (
              <svg
                width="16"
                height="10"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0001 4.27784L2.94467 11.3333C2.67606 11.6019 2.35189 11.7314 1.97217 11.722C1.59272 11.7128 1.2687 11.5739 1.00008 11.3053C0.731473 11.037 0.597168 10.7084 0.597168 10.3195C0.597168 9.93062 0.731473 9.60187 1.00008 9.33325L9.028 1.30534C9.30578 1.02756 9.62981 0.888672 10.0001 0.888672C10.3704 0.888672 10.6944 1.02756 10.9722 1.30534L19.028 9.36117C19.2963 9.62951 19.4305 9.95353 19.4305 10.3333C19.4305 10.713 19.2963 11.037 19.028 11.3053C18.7594 11.5739 18.4306 11.7083 18.0418 11.7083C17.6529 11.7083 17.3241 11.5739 17.0555 11.3053L10.0001 4.27784Z"
                  fill="#333333"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="10"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99988 11.097C9.81461 11.097 9.64336 11.067 9.48614 11.007C9.32864 10.9467 9.17586 10.8426 9.0278 10.6945L0.971967 2.63867C0.703634 2.37034 0.574051 2.04173 0.583218 1.65284C0.592385 1.26395 0.731273 0.935199 0.999885 0.666588C1.2685 0.397977 1.59725 0.263672 1.98614 0.263672C2.37502 0.263672 2.70363 0.397977 2.97197 0.666588L9.99988 7.722L17.0553 0.666588C17.3239 0.397977 17.6481 0.268393 18.0278 0.277837C18.4072 0.287004 18.7313 0.425893 18.9999 0.694504C19.2685 0.962837 19.4028 1.29145 19.4028 1.68034C19.4028 2.06923 19.2685 2.39798 18.9999 2.66659L10.972 10.6945C10.8239 10.8426 10.6711 10.9467 10.5136 11.007C10.3564 11.067 10.1852 11.097 9.99988 11.097Z"
                  fill="#333333"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      {expandReq && (
        <>
          {/* Must Have */}
          <div className="flex flex-col w-full gap-[8px]">
            <h6 className="flex font-bold text-[14px] text-left font-montserrat gap-2">
              Must_Have<span className="text-[#C00000]">*</span>
            </h6>
            <div className="flex flex-col w-[416px] gap-[4px]">
              <label className="flex font-medium text-[12px] text-left font-montserrat gap-2">
                Qualification <span className="text-[#C00000]"> *</span>
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="Enter Required Qualification"
                value={qualification}
                onChange={(e) => {
                  setQualification(e.target.value);
                  handleInputChange(e);
                }}
                className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
              />
            </div>
            <div className="flex flex-col w-[416px] gap-[4px]">
              <label className="flex font-medium text-[12px] text-left font-montserrat gap-2">
                Year of Experience <span className="text-[#C00000]"> *</span>
              </label>
              <input
                type="text"
                name="years_of_experience"
                placeholder="Enter required year of experience"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                  handleInputChange(e);
                }}
                className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
              />
            </div>
            <div className="flex flex-col w-[416px] gap-[4px]">
              <div className="flex font-medium text-[12px] text-left font-montserrat gap-2">
                <span>
                  Skills <span className="text-[#C00000]">*</span>
                </span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-row gap-[4px] flex-wrap w-[416px]">
                  {skills &&
                    skills.map((item, index) => (
                      <div
                        className="flex gap-1 px-[8px] py-[6px] pl-[12px] rounded-[30px] justify-between items-center overflow-hidden shadow-md"
                        key={index}
                      >
                        <p className="flex-wrap break-all w-full font-medium text-[12px]">
                          {item}
                        </p>
                        <div onClick={() => removeSkill("must_have", item)}>
                          <Close_svg height={16} width={16} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-full flex items-center py-[8px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]">
                  <input
                    type="text"
                    placeholder="e.g. Javascript"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkill("must_have", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full text-[12px]"
                  />
                  <svg
                    onClick={(e) => {
                      const input = e.target
                        .closest("div")
                        .querySelector("input");
                      handleAddSkill("must_have", input.value);
                      input.value = "";
                    }}
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

            <div className="flex flex-col w-[416px] gap-[4px]">
              <div className="flex font-medium text-[12px] text-left font-montserrat gap-2">
                <span>
                  Soft Skills <span className="text-[#C00000]">*</span>
                </span>
              </div>
              <div className="flex flex-col gap-[8px] ">
                <div className="flex flex-row gap-[4px] flex-wrap w-[416px]">
                  {softSkills &&
                    softSkills.map((item, index) => (
                      <div
                        className="flex gap-1 px-[8px] py-[6px] pl-[12px] rounded-[30px] justify-between items-center overflow-hidden shadow-md text-[12px]"
                        key={index}
                      >
                        <p className="text-[12px] flex-wrap break-all w-full font-medium">
                          {item}
                        </p>
                        <div onClick={() => removeSkill("soft_skills", item)}>
                          {" "}
                          {/* Corrected type */}
                          <Close_svg height={16} width={16} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-full flex items-center py-[8px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]">
                  <input
                    type="text"
                    placeholder="e.g. Communication, Adaptability, etc."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkill("soft_skills", e.target.value);
                        {
                          /* Corrected type */
                        }
                        e.target.value = "";
                      }
                    }}
                    className="w-full text-[12px]"
                  />
                  <svg
                    onClick={(e) => {
                      const input = e.target
                        .closest("div")
                        .querySelector("input");
                      handleAddSkill("soft_skills", input.value);
                      {
                        /* Corrected type */
                      }
                      input.value = "";
                    }}
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
          </div>

          {/* Nice to Have */}
          <div className="flex flex-col w-full gap-[8px]">
            <h6 className="flex font-bold text-[14px] text-left font-montserrat gap-2">
              Nice to Have
            </h6>
            <div className="flex flex-col w-[416px] gap-[4px]">
              <div className="flex font-medium text-[1px] text-left font-montserrat gap-2">
                <span>Skills</span>
              </div>
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-row gap-[4px] flex-wrap w-[416px]">
                  {niceToHaveSkills &&
                    niceToHaveSkills.map((item, index) => (
                      <div
                        className="flex gap-1 px-[8px] py-[6px] pl-[12px] rounded-[30px] justify-between items-center overflow-hidden shadow-md"
                        key={index}
                      >
                        <p className="text-[12px] flex-wrap break-all w-full font-medium ">
                          {item}
                        </p>
                        <div onClick={() => removeSkill("nice_to_have", item)}>
                          <Close_svg height={16} width={16} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="w-full flex items-center py-[8px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]">
                  <input
                    type="text"
                    placeholder="e.g. Kubernetes"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkill("nice_to_have", e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="w-full text-[12px]"
                  />
                  <svg
                    onClick={(e) => {
                      const input = e.target
                        .closest("div")
                        .querySelector("input");
                      handleAddSkill("nice_to_have", input.value);
                      input.value = "";
                    }}
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

            <div className="flex flex-col w-[416px] gap-[4px]">
              <label className="flex font-medium text-[12px] text-left font-montserrat gap-2">
                Experience
              </label>
              <input
                type="text"
                name="nice_to_have_experience"
                placeholder="e.g. ML frameworks, Streaming architecture, etc."
                value={niceToHaveExperience}
                onChange={(e) => {
                  setNiceToHaveExperience(e.target.value);
                  setExtractedData((prevData) => ({
                    ...prevData,
                    requirements: {
                      ...prevData.requirements,
                      nice_to_have: {
                        ...prevData.requirements.nice_to_have,
                        experience: e.target.value,
                      },
                    },
                  }));
                }}
                className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col w-[416px] gap-[4px]">
            <label className="flex font-medium text-[12px] text-left font-montserrat gap-2">
              Description <span className="text-[#C00000]"> *</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                handleDescriptionChange(e);
              }}
              className="w-full h-[130px] py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Requirements;
