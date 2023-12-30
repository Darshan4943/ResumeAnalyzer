import React from "react";

const Skills = ({userData}) => {
  return (
    <div className="build_ai ai2">
      <div className="gap">
        <p className="page_headings">Skills</p>
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
