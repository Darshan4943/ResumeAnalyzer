import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import axios from "axios";
import { Close_svg } from "../../../../../utils/svg";

const Skills = ({ data, setData }) => {
  // State variables
  const [skills, setSkills] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [skillerror, setSkillError] = useState("");
  const [isClearable, setIsClearable] = useState({ value: "", label: "Select Skill" });
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [skillList, setSkillList] = useState([]);
  const initialRatings = Array(5).fill(5);

  useEffect(() => {
    if (Array.isArray(data.skills)) {
      setSkillList(data.skills);
    }
  }, [data]);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showSkills: !isChecked });
  };

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
    setSaveDisabled(false);
  };

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

  useEffect(() => {
    axios
      .get("http://192.168.1.208:2000/api/allskills")
      .then((res) => {
        const names = res.data.map((skill) => skill.name);
        const uniqueNames = Array.from(new Set(names));
        setSkills(uniqueNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = async (value) => {
    const newSkill = { skill: value.label, rating: initialRatings };
    setSkillList((prevSkillList) => {
      const isSkillAlreadyAdded = prevSkillList.some(
        (item) => item.skill === value.label
      );

      if (!isSkillAlreadyAdded) {
        return [...prevSkillList, newSkill];
      }
      return prevSkillList;
    });

    const found = skills.includes(value.label);
    if (!found) {
      try {
        const response = await fetch("http://192.168.1.208:2000/api/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: value.label }),
        });

        if (response.ok) {
          setSaveDisabled(false);
          setSkills([...skills, value.label]);

          setIsClearable(newSkill);
        } else {
          console.error("Failed to add skill:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding skill:", error.message);
      }
    } else {
      setSkillError("Already Listed!");
      setTimeout(() => {
        setSkillError("");
      }, 2000);
    }
    setSaveDisabled(false);
  };

  const saveHandler = () => {
    setData({ ...data, skills: skillList });
    setSaveDisabled(true);
    setIsClearable({ value: "", label: "" });
  };

  useEffect(() => {
    if (data) {
      if (data?.showSkills === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-2xl bg-white"
      style={{
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
      // style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Skills & Ratings</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex flex-col scr420:gap-4 gap-6">
          {skillList &&
            Array.isArray(skillList) &&
            skillList.map((skill, index) => (
              <div
                key={index}
                className="flex w-full scr420:gap-4 gap-1 scr420:flex-row flex-col justify-between"
              >
                <div className="flex w-fit gap-1 px-3 py-2 border border-[#06A9EF] overflow-hidden rounded-[24px] justify-between items-center">
                  <p className="text-[14px] flex-wrap  brack-all w-fit font-medium">
                    {skill?.skill}
                  </p>
                  <div className="" onClick={() => deleteSkill(index)}>
                    <Close_svg height={16} width={16} />
                  </div>
                </div>
                {/* <div className="flex w-50%">{renderStars(index)}</div> */}
              </div>
            ))}
        </div>
        <div className="w-full text-[14px] font-montserrat font-small">
          List your skills and strengths
        </div>
        <CreatableSelect
          options={skills.map((item) => ({ value: item, label: item }))}
          className="w-full"
          placeholder="Select Skills"
          classNames="text-black"
          onChange={handleChange}
          value={isClearable}
        />
        {/* {skillerror && <span className="text-[red] text-[12px]">{skillerror}</span>} */}

        <div className="flex justify-end">
          <div className="flex justify-between py-2 gap-2">
            <button
              style={{ opacity: saveDisabled ? 0.5 : 1 }}
              onClick={saveHandler}
              disabled={saveDisabled}
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px] bg-[#06A9EF] w-[60px] h-[32px] ${
                !saveDisabled ? "bg_Button" : ""
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
