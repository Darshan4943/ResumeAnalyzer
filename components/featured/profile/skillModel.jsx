import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactSelect from "react-select";
import { Close_svg } from "../../../utils/svg";
import { camelCase } from "../../../utils/middleware";
import { SkillList } from "../../../utils/data";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";

const SkillModel = ({ userData, handleImageClick, setIsComponentOpen }) => {
  const [skil, setSkil] = useState(userData?.skills || []);
  const [skills, setSkills] = useState([...SkillList]);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const validateForm = () => {
    if (skil.length === 0) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    axios
      .put(
        "http://192.168.1.161:2000/api/candidate/updateSkills/" +
          userDataGlobal?._id,

        { skills: skil }
      )

      .then((res) => {
        dispatch(fetchUserData());
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
      <div id="demo-modal" class="modal ">
        <div class="bg-white ms:w-[56%] gap-4 flex flex-col p-6 overflow-x-auto rounded-xl min-h-[60vh] max-h-24">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4 self-stretch w-full">
              <div className=" text-[#25324B] font-Montserrat  text-[16px] font-[600] leading-160 min-w-[80px]">
                Edit Skill
              </div>
              <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
              <div onClick={() => handleImageClick(false)}>
                <Close_svg />
              </div>
            </div>
            <div className="text-[#646464] font-montserrat text-[12px] font-normal leading-20">
              <p>
                Communicate your expertise and reputation to recruiters, such as
                your knowledge of Java, Oracle, and direct marketing. Based on
                these abilities, well provide you recommendations for jobs.{" "}
              </p>
            </div>
          </div>

          <p className="text-[#333] font-montserrat text-[16px] font-medium">
            Skills
          </p>
          <div className="skill_buttons">
            {skil?.map((item, index) => (
              <div
                key={index}
                s
                className="skill_button text-[14px] font-[500] gap-1 "
              >
                {item.label}
                <div onClick={() => deleteHandler(item.value)}>
                  <Close_svg className="" height={20} width={20} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-start flex-col ">
            <ReactSelect
              options={skills.map((item) => ({
                value: item,
                label: camelCase(item),
              }))}
              className="w-[100%] "
              onChange={(data) => {
                const isAlreadySelected = skil.some(
                  (skill) => skill.value === data.value
                );

                if (!isAlreadySelected) {
                  setSkil([...skil, data]);
                  setError(false);
                }
              }}
            />
            {error && (
              <div className="text-red text-sm mt-2">
                Please select at least one skill.
              </div>
            )}
          </div>

          <div className="w-full flex items-end gap-3 justify-end self-stretch">
            <button
              className="flex items-center justify-center px-4 py-2 font-Montserrat text-[14px] md:text-16 md:px-9 md:py-2  font-medium leading-normal rounded-[30px] border border-[#06A9EF]  bg-white "
              onClick={() => handleImageClick(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center md:px-9 md:py-2 px-[8px] py-[5px] font-Montserrat text-[14px] md:text-16 font-medium leading-normal text-[#fff]  border-[#06A9EF]  bg-[#06A9EF] rounded-[30px] border border-border-color bg-primary"
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
