import React, { useEffect, useState } from "react";

import CreatableSelect from 'react-select/creatable';
import { camelCase } from "../../../../../utils/middleware";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
// import { SkillList } from "../../../../../utils/data";
import { Close_svg } from "../../../../../utils/svg";
import axios from "axios";

const Skills = ({ data, setData }) => {
  const [skills, setSkills] = useState([]);
  console.log(14,skills)
  const [isClearable, setIsClearable] = useState({ value: "", label: "" });
  // console.log(isClearable)
  const userDataGlobal = useSelector((state) => state.userData);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const initialRatings = Array(5).fill(5);
  useEffect(() => {
    if(Array.isArray(data.skills)){
      setSkillList(data.skills);

    } 
  },[data]);


  const handleStarClick = (skillIndex, starIndex) => {
    const updatedSkills = skillList?.map((skill, index) => {
      if (index === skillIndex) {
        const updatedRatings = skill.rating.map((rating, i) =>
          i <= starIndex ? 1 : 0
        );
        return { ...skill, rating: updatedRatings };
      }
      return skill;
    });
    setSkillList(updatedSkills);
    setSaveDisabled(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/AllSkills")
      .then((res) => {
        console.log(res)
        const names = res.data.map(skill => skill.name);
       
        setSkills(names);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(skillList)

  const deleteSkill = (index) => {
    const updatedSkills = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkills);
    setSaveDisabled(false);
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

  const handleChange = async (value) => {
    const found = skillList?.find((item) => item.skill.name === value.label);
    if (!found) {
      try {
        const response = await fetch('http://localhost:2000/api/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: value.label }),
        });
  
        if (response.ok) {
          const newSkill = { skill: value.label, rating: initialRatings };
          setSkillList([...skillList, newSkill]);
          setSaveDisabled(false);
          setIsClearable(newSkill);
        } else {
          console.error('Failed to add skill:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding skill:', error.message);
      }
    }
  };
  
  const saveHandler = () => {
    setData({ ...data, skills: skillList });
    setSaveDisabled(true);
    setIsClearable({ value: "", label: "" });
  };

  return (
    <>
      <div
        onWheel={(e) => e.stopPropagation()}
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full text-[20px] font-montserrat  font-medium">
            Skills & Ratings
          </div>
          <div className="flex flex-col scr420:gap-4 gap-6">
            {skillList &&
              Array.isArray(skillList) &&
              skillList?.map((skill, index) => (
                <div
                  key={index}
                  className="flex w-full scr420:gap-4 gap-1 scr420:flex-row flex-col justify-between"
                >
                  <div className="flex w-[50%] gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center">
                    <p className="text-[14px] font-medium">{skill?.skill}</p>

                    <div className="" onClick={() => deleteSkill(index)}>
                      <Close_svg height={16} width={16} />
                    </div>
                  </div>
                  <div className="flex w-[50%">{renderStars(index, skill)}</div>
                </div>
              ))}
          </div>
          <div className="w-full text-[14px] font-montserrat  font-small">
            List your skills and strengths
          </div>

          <CreatableSelect
            options={skills.map((item) => ({
              value: item,
              label: item,
            }))}
            className="w-full"
            onChange={handleChange}
            value={isClearable}
            
          />
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                Update to Profile
              </button> */}
              <button
                style={{ opacity: saveDisabled ? 0.5 : 1 }}
                onClick={saveHandler}
                disabled={saveDisabled}
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
