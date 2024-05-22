import React, { useEffect, useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const AddSection = ({ data, setData, section, formData, index, item }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(true);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showExperience: !isChecked });
  };
  const [activeDate, setActiveDate] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [header, setHeader] = useState("");
  const [headerEditable, setHeaderEditable] = useState(false);
  const [listItems, setListItems] = useState(section);
  const [error, setError] = useState("");
  useEffect(() => {
    setListItems(section);
    if (section.length > 0) {
      setView(false);
    }

    if (item.header?.length > 0) {
      setHeader(item.header);
      setHeaderEditable(false);
    } else {
      setHeaderEditable(true);
    }
  }, [section]);
  const [sectionData, setSectionData] = useState({
    title: "",
    duration: null,
    description: "",
  });
  const deleteSection = () => {
    setData({ ...data, section: data.section.filter((item, i) => i != index) });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      if (value.length >= 1000 || sectionData.description === 1000) {
        setError("Maximum 1000 characters allowed");
      } else {
        setError("");
      }
    }

    setSectionData({
      ...sectionData,
      [name]: value,
    });
    setIsEdited(true);
  };

  const handleEditHandler = (index) => {
    setSectionData(listItems[index]);
    setIsModified({ status: true, index });
    setView(true);
    setIsEdited(true);
  };

  const deleteHandler = (index) => {
    setListItems(listItems.filter((item, i) => i !== index));
    setIsEdited(true);
  };
  const headerSeter = () => {
    setHeaderEditable(false);
    setIsEdited(true);
  };
  const dataSeter = () => {
    if (isModified.status) {
      const dumyData = [...listItems];
      const index = isModified.index;
      dumyData.splice(index, 1, {
        ...dumyData[isModified.index],
        ...sectionData,
      });
      console.log(dumyData);
      setListItems(dumyData);
      setIsModified({ status: false, index: 0 });
    } else {
      setListItems([...listItems, sectionData]);
      setIsModified({ status: false, index: 0 });
    }
    setView(false);
    setSectionData({
      title: "",
      duration: null,
      description: "",
    });
  };
  const saveHandler = () => {
    const dummyData = [...data.section];
    dummyData[index].subSection = [...listItems];
    dummyData[index].header = header;
    console.log(dummyData);
    setData({ ...data, section: dummyData });
    setIsModified({ status: false, index: 0 });
    setIsEdited(false);
  };
  // console.log(first)

  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-lg bg-white"
      style={{
        boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="w-full flex  gap-2 justify-between ">
        <p className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Enter Section Header"
            className={`${
              headerEditable ? "w-full" : "w-[120px]"
            }  text-[20px]   font-[500]  ${
              headerEditable && "border border-[#bebebe] px-[8px]"
            } rounded-lg`}
            onChange={(e) => setHeader(e.target.value)}
            value={header}
            disabled={!headerEditable}
            onBlur={() => headerSeter()}
          />
          {!headerEditable && (
            <button onClick={() => setHeaderEditable(true)}>
              <Edit_icon />
            </button>
          )}
        </p>
        {headerEditable ? null : (
          <button onClick={deleteSection} className="cursor-pointer">
            <Delete_icon />
          </button>
        )}

        {/* <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitchChange}
          />
          <span className="slider round"></span>
        </label> */}
      </div>

      {listItems?.map((exp, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE] break-all"
        >
          <div className="flex justify-between">
            <p className="text-[14px]">
              {exp.title} | {exp.duration?.start?.year}{" "}
              {exp.duration?.start?.year && "-"}
              {exp.duration?.end?.year}
            </p>
            <div className="flex gap-2">
              <div onClick={() => handleEditHandler(index)}>
                <Edit_icon />
              </div>
              <div onClick={() => deleteHandler(index)}>
                <Delete_icon />
              </div>
            </div>
          </div>
          <p className="text-[12px]">{exp.description}</p>
        </div>
      ))}

      {view && (
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Title
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={sectionData.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                />
              </div>
            </div>
            <div>
              <DateSelector
                idPrefix="education"
                data={sectionData}
                dataSeter={setSectionData}
                fromCreate={true}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Description
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                <textArea
                  type="text"
                  name="description"
                  id=""
                  className="w-full text-[14px] font-montserrat font-small h-full  outline-none  min-h-[140px] "
                  placeholder="Enter text"
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={1000}
                >
                  {sectionData.description}
                </textArea>
              </div>
              {error && <span className="text-[red] text-[12px]">{error}</span>}
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  setData({
                    ...data,
                    section: [
                      ...data?.section.filter((item) => {
                        item.header == "" || item.subSection == [];
                      }),
                      // {
                      //   header: "",
                      //   subSection: [],
                      // },
                    ],
                  });

                  setSectionData({
                    title: "",
                    duration: null,
                    description: "",
                  });
                  setView(false);
                  setIsModified({ status: false, index: 0 });
                }}
              >
                Cancel
              </button>
              <button
                onClick={dataSeter}
                disabled={!isChecked}
                className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF]  h-[32px]"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {!view && (
        <div className="flex flex-row w-full justify-between">
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
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add
            </p>
          </div>
          {!view && isEdited && (
            <button
              onClick={saveHandler}
              className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF]  h-[32px]"
            >
              Save Sections
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddSection;
