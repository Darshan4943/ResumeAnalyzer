import React, { useState } from "react";
import { SkillList } from "@/utils/data";
import ReactSelect from "react-select";
import { camelCase } from "../../../../../utils/middleware";
import { toast } from "react-toastify";

const Skills = ({  data, setData }) => {
  const [skills, setSkills] = useState([...SkillList]);
  
  const [skillList, setSkillList] = useState([]);
  const initialRatings = Array(5).fill(5);
  const handleStarClick = (skillIndex, starIndex) => {
    const updatedSkills = skillList.map((skill, index) => {
      if (index === skillIndex) {
        const updatedRatings = skill.rating.map((rating, i) =>
          i <= starIndex ? 1 : 0
        );
        return { ...skill, rating: updatedRatings };
      }
      return skill;
    });
    setSkillList(updatedSkills);
  };
  const deleteSkill = (index) => {
    const updatedSkills = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkills);
  };

  const renderStars = (skillIndex) => {
    const skill = skillList[skillIndex];
    if (skill && skill.rating) {
      return skill.rating.map((rating, index) => (
        <img
          key={`star_${index}`}
          src={
            rating ? "/images/services/Star.png" : "/images/services/Star1.png"
          }
          alt=""
          className="h-[30px] w-[30px]"
          onClick={() => handleStarClick(skillIndex, index)}
        />
      ));
    } else {
      return null;
    }
  };
  const handleChange = (value) => {
    setSkillList([
      ...skillList,
      { skill: value.label, rating: initialRatings },
    ]);
  };
  const saveHandler = () => {
    setData({ ...data, skills: skillList });
  };
  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full text-[20px] font-montserrat  font-medium">
            Skills & Ratings
          </div>
          <div className="flex flex-col gap-4">
            {skillList.map((skill, index) => (
              <div key={index} className="flex gap-4 justify-between">
                <div className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center">
                  <p className="text-[14px] font-medium">{skill.skill}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    onClick={() => deleteSkill(index)}
                  >
                    <g mask="url(#mask0_5716_136486)">
                      <path
                        d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex">{renderStars(index, skill)}</div>
              </div>
            ))}
          </div>
          <div className="w-full text-[14px] font-montserrat  font-small">
            List your skills and strengths
          </div>

          <ReactSelect
            options={skills.map((item) => ({
              value: item,
              label: camelCase(item),
            }))}
            className="w-full"
            onChange={handleChange}
          />
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                Update to Profile
              </button>
              <button
                onClick={saveHandler}
                className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
