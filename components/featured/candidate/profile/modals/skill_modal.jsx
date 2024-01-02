import React, { useState } from "react";
import { Close_svg } from "@/utils/svg";

const SkillModel = ({ userData, handleImageClick }) => {
  return (
    <>
      <div id="demo-modal" class="modal ">
        <div class="modal__content w-[56%] gap-4 flex flex-col p-6 rounded-xl">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="w-[14.78%] text-[#25324B] font-Montserrat font-medium text-base lg:text-xl leading-160">
              Edit Skill
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-[75.45%]"></div>

            <Close_svg handleImageClick={handleImageClick} />
          </div>
          <div className="text-[#646464] font-montserrat text-14 font-normal leading-20">
            <p>
              Communicate your expertise and reputation to recruiters, such as
              your knowledge of Java, Oracle, and direct marketing. Based on
              these abilities, we'll provide you recommendations for jobs.{" "}
            </p>
          </div>
          <p className="text-[#333] font-montserrat text-[20px] font-medium">
            Skills
          </p>
          <div className="skill_buttons">
            {userData?.skills?.map((item) => (
              <div className="skill_button text-[#25324B] ">{item.label}</div>
            ))}
          </div>
          <div className="flex justify-between items-start  self-stretch">
            <input
              type="text"
              placeholder="Type in your area of specialization or expertise."
              className="w-[86.42%] flex items-center px-4 py-2 rounded-md border border-text-secondary bg-white text-[#646464] font-montserrat text-[14px] font-normal leading-normal"
            />
            <button className="flex items-center justify-center px-4 py-2 gap-1 rounded-md border border-[#06A9EF] bg-[#06A9EF] text-[#fff]">+ Add</button>
          </div>
          <p className="text-[#333] font-montserrat text-[16px] font-medium">
          Suggested skills
          </p>
          <div className="w-full flex items-end justify-end self-stretch">
            <button
              className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal rounded-md border-[#06A9EF]  bg-white "
              onClick={handleImageClick}
            >
              Cancel
            </button>
            <button className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal text-[#fff]  border-[#06A9EF]  bg-[#06A9EF] rounded-md border border-border-color bg-primary">
            Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillModel;
