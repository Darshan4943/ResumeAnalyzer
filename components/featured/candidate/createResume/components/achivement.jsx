import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Achievement = ({ data, setData ,achievement, setAchievement}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 11 }, (_, index) => 2020 + index);
  const [achivementData, setAchivementData] = useState({
    title: "",
    discription: "",
    dateOfCompletion: {
      start: { year: "Year", month: "Month" },
    },
  });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showCourse: !isChecked });
  };
  const handleStartMonthChange = (e) => {
    setAchivementData({
      ...achivementData,
      dateOfCompletion: {
        ...achivementData.dateOfCompletion,
        start: {
          ...achivementData.dateOfCompletion.start,
          month: e.target.value,
        },
      },
    });
  };

  const handleStartYearChange = (e) => {
    setAchivementData({
      ...achivementData,
      dateOfCompletion: {
        ...achivementData.dateOfCompletion,
        start: {
          ...achivementData.dateOfCompletion.start,
          year: e.target.value,
        },
      },
    });
  };
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
      dateOfCompletion: {
        start: { year: "Year", month: "Month" },
      },
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
          <p> Achievements</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {data?.achievement?.map((ach, index) => (
          <div key={index} className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]">
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
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="title"
                    id=""
                    placeholder="Enter your Achievement"
                    className="w-full text-[14px] font-montserrat font-small "
                    value={achivementData.title}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium">
                      Date Of Completion
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small">
                      <select
                        value={achivementData.dateOfCompletion.start.month}
                        onChange={handleStartMonthChange}
                        className="w-[79px] outline-none"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                      >
                        <option
                          value="Month"
                          disabled
                          hidden
                          className="px-4 py-2"
                        >
                          Month
                        </option>

                        {months.map((month) => (
                          <option
                            key={month}
                            value={month}
                            className="px-4 py-2"
                          >
                            {new Date(0, month - 1).toLocaleString("en", {
                              month: "long",
                            })}
                          </option>
                        ))}
                      </select>

                      <img
                        src="/images/down_arrow.png"
                        className="h-[20px] w-[20px]"
                        alt=""
                      />
                    </div>

                    <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small">
                      <select
                        value={achivementData.dateOfCompletion.start.year}
                        onChange={handleStartYearChange}
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                        }}
                        className="w-[79px] outline-none"
                      >
                        <option value="Year" disabled hidden>
                          Year
                        </option>
                        {years.map((year) => (
                          <option
                            key={year}
                            value={year}
                            className="mt-4 px-4 py-2"
                          >
                            {year}
                          </option>
                        ))}
                      </select>
                      <img
                        src="/images/down_arrow.png"
                        className="h-[20px] w-[20px]"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Description
                </div>
                <div className="w-full text-[14px] font-montserrat  font-small">
                  Write about your Achievement
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                  <textArea
                    type="text"
                    name="discription"
                    id=""
                    className="w-full text-[14px] font-montserrat font-small outline-none h-full "
                    onChange={handleInputChange}
                  >
                    {achivementData.discription}
                  </textArea>
                </div>
              </div>
            </div>

            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => {
                    setAchievement(false);
                  }}
                >
                  Cancel
                </button>
                {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                  Update to Profile
                </button> */}
                <button
                  onClick={() =>{setAchievement(false);handleSave}}
                  disabled={!isChecked}
                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        {/* )} */}
        {/* {!view && (
          <div className="flex gap-1">
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
              onClick={() => setView(true)}
              className="text-[16px] font-semibold text-[#06A9EF]"
              disabled={!isChecked}
            >
              Add Achievements
            </p>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Achievement;
