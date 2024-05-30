import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Achievement = ({ data, setData }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });

  const [achivementData, setAchivementData] = useState({
    title: "",
    discription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAchivementData({
      ...achivementData,
      [name]: value,
    });
  };
  const handleSave = () => {
    if (isModified.status === true) {
      const dumyData = data.achievement;
      const index = isModified.index;
      dumyData.splice(index, 1, achivementData);
      setData({ ...data, achievement: dumyData });
      setView(false);
    } else {
      setData({
        ...data,
        achievement: [achivementData, ...data.achievement],
      });
      setView(false);
    }
    setAchivementData({
      title: "",
      discription: "",
    });
  };

  const handleEditAchievement = (index) => {
    const dataToEdit = data.achievement[index];

    if (dataToEdit) {
      setView(true);
      setAchivementData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteAchievement = (index) => {
    setData({
      ...data,
      achievement: data.achievement.filter((item, i) => i !== index),
    });
  };

  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Achievements & Awards</p>
          <div className=" flex flex-row w-[30%] justify-end items-end float-end ">
            {toggleOn ? (
              <div
                onClick={() => {
                  setToggleOn(false);
                }}
                className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#06A9EF] border-[1px] bg-[#06A9EF]"
              >
                <div className="w-[20px] h-[20px] flex flex-col justify-end items-end float-end">
                  <img
                    className="w-full h-full"
                    src="/images/check_circle.png"
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setToggleOn(true);
                }}
                className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#646464] border-[1px] bg-[#FFFFFF]"
              >
                <div className="w-[20px] h-[20px] flex flex-col justify-start items-start float-start">
                  <img className="w-full h-full" src="/images/cancel.png" />
                </div>
              </div>
            )}
          </div>
        </div>
        {!view &&
          data?.achievement?.length > 0 &&
          data?.achievement?.map((ach, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]"
            >
              <div className="flex justify-between">
                <p>{ach.title}</p>
                <div className="flex gap-2">
                  <div onClick={() => handleEditAchievement(index)}>
                    <Edit_icon />
                  </div>
                  <div onClick={() => handleDeleteAchievement(index)}>
                    <Delete_icon />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* {view && ( */}

        {view && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  id=""
                  placeholder="Name of award/ achievement"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={achivementData.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Description
              </div>

              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                <textArea
                  type="text"
                  name="discription"
                  id=""
                  placeholder="Type here"
                  className="w-full text-[14px] font-montserrat font-small outline-none h-full "
                  onChange={handleInputChange}
                >
                  {achivementData.discription}
                </textArea>
              </div>
            </div>
          </div>
        )}

        {!view && (
          <div
            className="flex gap-1"
            onClick={() => isChecked && setView(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p
              // onClick={() => setView(true)}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add Section
            </p>
          </div>
        )}

        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            <button
              className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
              onClick={() => {}}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleSave();
              }}
              disabled={!isChecked}
              className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievement;
