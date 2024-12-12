import React, { useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import ReactSelect from "react-select";

import { Close_svg } from "../../../../../utils/svg";
import { SkillList } from "../../../../../utils/data";
import { camelCase } from "../../../../../utils/middleware";

const SkillModel = ({ userData, handleImageClick, setIsComponentOpen }) => {
  const [skil, setSkil] = useState(userData?.skills);
  const [skills, setSkills] = useState([...SkillList]);
const {userDataGlobal,profileData} = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  // console.log(skil);

  const handleSubmit = () => {
    axios
      .put(
        "http://localhost:2000/api/candidate/updateSkills/" + userDataGlobal._id,

        { skills: skil }
      )

      .then((res) => {
        toast.success("Skill added successfully");
      
        handleImageClick(false);
        setSkil(inputValue);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = (value) => {
    setSkil(skil.filter((item) => item.value !== value));
  };

  return (
    <>
      <div id="demo-modal" className="modal ">
        <div className="modal__content ms:w-[56%] gap-4 flex flex-col p-6 rounded-xl max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="w-[14.78%] text-[#25324B] font-Montserrat font-medium text-[16px] md:text-base lg:text-xl leading-160">
              Edit Skill
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-[75.45%]"></div>
            <div onClick={() => handleImageClick(false)}>
              <Close_svg />
            </div>
          </div>
          <div className="text-[#646464] font-montserrat md:text-14 text-[12px] font-normal leading-20">
            <p>
              Communicate your expertise and reputation to recruiters, such as
              your knowledge of Java, Oracle, and direct marketing. Based on
              these abilities, we all provide you recommendations for jobs.{" "}
            </p>
          </div>
          <p className="text-[#333] font-montserrat text-[16px] md:text-[20px] font-medium">
            Skills
          </p>
          <div className="skill_buttons">
            {skil?.map((item, index) => (
              <div key={index} className="skill_button text-[#25324B] ">
                {item.label}
                <div onClick={() => deleteHandler(item.value)}>
                  <Close_svg className="" height={16} width={16} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-start  self-stretch">
            {/* <input
              type="text"
              placeholder="Type in your area of specialization or expertise."
              className="w-[86.42%] flex items-center px-4 py-2 rounded-md border border-text-secondary bg-white text-[#646464] font-montserrat text-[14px] font-normal leading-normal"
              // onChange={(e) => setSkil(e.target.value)}
              onChange={saveSkill}
              value={skil}
              
            /> */}
            {/* <ReactSelect
              options={skills.map((item) => ({
                value: item,
                label: camelCase(item),
              }))}
              className="w-[100%]"
              onChange={(data) => setSkil([...skil, data])}
            /> */}

            <ReactSelect
              options={skills.map((item) => ({
                value: item,
                label: camelCase(item),
              }))}
              onInputChange={(data) => {
                setSkills([data, ...skills]);
              }}
              className="w-[100%]"
              onChange={(data) => {
                const isAlreadySelected = skil.some(
                  (skill) => skill.value === data.value
                );

                if (!isAlreadySelected) {
                  setSkil([...skil, data]);
                }
              }}
            />
          </div>
          <p className="text-[#333] font-montserrat text-[14px] md:text-[16px] font-medium">
            Suggested skills
          </p>
          <div className="w-full flex items-end justify-end self-stretch">
            <button
              className="flex items-center justify-center font-Montserrat text-[14px] md:text-16 md:px-4 md:py-2 px-[8px] py-[5px] font-medium leading-normal rounded-md border-[#06A9EF]  bg-white "
              onClick={() => handleImageClick(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center md:px-4 md:py-2 px-[8px] py-[5px] font-Montserrat text-[14px] md:text-16 font-medium leading-normal text-[#fff]  border-[#06A9EF]  bg-[#06A9EF] rounded-md border border-border-color bg-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillModel;
