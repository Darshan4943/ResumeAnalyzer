import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Achievement = ({ data, setData }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [error, setError] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showExperience: !isChecked });
  };
  const [achivementData, setAchivementData] = useState({
    title: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({
    title: "",

    description: "",
  });
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setAchivementData({
    //   ...achivementData,
    //   [name]: value,
    // });

    const { name, value } = e.target;

    if (name === "description") {
      if (value?.length >= 1000 || achivementData?.description === 1000) {
        setError("Maximum 1000 characters allowed");
      } else {
        setError("");
      }
    }
    setAchivementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value?.trim() === ""
          ? `${name?.charAt(0)?.toUpperCase() + name?.slice(1)} is required`
          : "",
    }));
  };
  const handleSave = () => {
    if (validateForm()) {
      if (isModified?.status === true) {
        const dumyData = data?.achievement;
        const index = isModified?.index;
        dumyData?.splice(index, 1, achivementData);
        setData({ ...data, achievement: dumyData });
        setView(false);
      } else {
        setData({
          ...data,
          achievement: [achivementData, ...data?.achievement],
        });
        setView(false);
      }
      setAchivementData({
        title: "",
        description: "",
      });
    } else {
      setView(true);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!achivementData?.title?.trim()) {
      newErrors.title = "Title is required";
    }

    // if (!achivementData?.description?.trim()) {
    //   newErrors.description = "Organization is required";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors)?.length === 0;
  };

  const handleEditAchievement = (index) => {
    const dataToEdit = data?.achievement[index];

    if (dataToEdit) {
      setView(true);
      setAchivementData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteAchievement = (index) => {
    setData({
      ...data,
      achievement: data?.achievement?.filter((item, i) => i !== index),
    });
  };

  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-lg bg-white"
      style={{
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
        <p> Achievements & Awards</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitchChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {!view &&
        data?.achievement?.length > 0 &&
        data?.achievement?.map((ach, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 py-[12px] px-[16px] rounded-[6px]  border break-all ${
              editingIndex === index
                ? "border-[#06A9EF] border-[2px]"
                : "border-[#DEDEDE]"
            }`}
          >
            <div className="flex justify-between">
              <p className="text-[14px]">{ach?.title}</p>
              <div className="flex gap-2">
                <div onClick={() => handleEditAchievement(index)}>
                  <Edit_icon />
                </div>
                <div onClick={() => handleDeleteAchievement(index)}>
                  <Delete_icon />
                </div>
              </div>
            </div>
            <p className="text-[12px]">{ach?.description}</p>
          </div>
        ))}
      {/* {view && ( */}

      {view && (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  id=""
                  placeholder="Name of award/ achievement"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={achivementData?.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                />
              </div>
              {errors?.title && (
                <span className="text-[red] text-[12px]">{errors?.title}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Description
              </div>

              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] min-h-[140px]">
                <textArea
                  type="text"
                  name="description"
                  id=""
                  placeholder="Type here"
                  className="w-full text-[14px] font-montserrat font-small outline-none h-full "
                  onChange={handleInputChange}
                >
                  {achivementData?.description}
                </textArea>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  setAchivementData({
                    title: "",

                    description: "",
                  });
                  setView(false);
                }}
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
        </>
      )}

      {!view && (
        <div className="flex gap-1" onClick={() => isChecked && setView(true)}>
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
    </div>
  );
};

export default Achievement;
