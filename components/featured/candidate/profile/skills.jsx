import React, { useState } from "react";
import SkillModel from "./modals/skill_modal";

const Skills = ({ userData }) => {
  const [isComponentOpen, setIsComponentOpen] = useState(false);

  const handleImageClick = () => {
    setIsComponentOpen(!isComponentOpen);
  };
  return (
    <div className="build_ai ai2">
      <div className="gap flex items-center justify-between">
        <p className="page_headings">Skills</p>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center p-3 gap-4">
            <p className="text-[#06A9EF] font-montserrat text-12 font-bold">
              Take a skill Test
            </p>
            <img
              src="/images/profile/edit.png"
              alt=""
              className="w-[24px] h-[24px]"
              onClick={handleImageClick}
            />
            {isComponentOpen && (
              <SkillModel
                handleImageClick={handleImageClick}
                userData={userData}
              />
            )}
          </div>
        </div>

        {/* <div className="add_delete">
          <button className="take_test">Take Skill Test</button>
          <img
            style={{ width: "24px" }}
            src="./images/profile/add.png"
            alt=""
          />
          <img
            style={{ width: "24px" }}
            src="./images/profile/edit.png"
            alt=""
          />
        </div> */}
      </div>

      <div className="skill_buttons">
        {userData?.skills?.map((item) => (
          <div className="skill_button">{item.label}</div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
