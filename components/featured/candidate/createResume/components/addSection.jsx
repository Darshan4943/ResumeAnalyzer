import React, { useEffect, useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const AddSection = ({ data, setData, section, formData, index, item, setCustomSectionView, customSectionView, setCustomOptions }) => {

  const [isChecked, setIsChecked] = useState(true);

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
      setCustomSectionView(false);
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
    setCustomSectionView(true);
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
    setCustomSectionView(false);
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
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="w-full flex  gap-2 justify-between ">
        <p className="flex w-[90%] flex-row gap-2">
          <input
            type="text"
            placeholder="Enter Section Header"
            className={`${headerEditable ? " w-full" : "w-full"
              }  text-[20px]   font-[500]  ${headerEditable && "border border-[#bebebe] px-[8px]"
              } rounded-lg`}
            onChange={(e) => setHeader(e.target.value)}
            value={header}
            disabled={!headerEditable}
            onBlur={() => headerSeter()}
          />

        </p>
        <div className="flex gap-2 items-center">
          {!headerEditable && (
            <button onClick={() => setHeaderEditable(true)}>
              <Edit_icon />
            </button>
          )}
          <button onClick={deleteSection}
            className="w-[36px] h-[36px] rounded-[50%] border border-[#DEDEDE] bg-[#F7F7F7] flex justify-center items-center cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

              <g mask="url(#mask0_3986_38982)">
                <path d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.941 8.00022 9.76292 8.07206 9.61925 8.21572C9.47575 8.35956 9.404 8.53772 9.404 8.75022V16.2502C9.404 16.4627 9.47583 16.6409 9.6195 16.7847C9.76333 16.9284 9.94158 17.0002 10.1543 17.0002ZM13.8465 17.0002C14.059 17.0002 14.2371 16.9284 14.3807 16.7847C14.5242 16.6409 14.596 16.4627 14.596 16.2502V8.75022C14.596 8.53772 14.5242 8.35956 14.3805 8.21572C14.2367 8.07206 14.0584 8.00022 13.8458 8.00022C13.6333 8.00022 13.4552 8.07206 13.3115 8.21572C13.168 8.35956 13.0962 8.53772 13.0962 8.75022V16.2502C13.0962 16.4627 13.1682 16.6409 13.312 16.7847C13.4557 16.9284 13.6338 17.0002 13.8465 17.0002Z" fill="#C00000" />
              </g>
            </svg>


          </button>
        </div>

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
              {exp.title}  {exp?.duration?.start?.year != null &&
                ` ${"|"} ${exp?.duration?.start?.year} 
              ${exp?.duration?.start?.year && "-"}
              ${(exp?.duration?.end?.year === "" || exp?.duration?.end?.year === undefined)
                  ? "Present"
                  : exp.duration?.end?.year
                }`}
            </p>
            <div className="flex gap-2 cursor-pointer">
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

      {customSectionView && (
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
                  maxLength={100}
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
                onClick={() => setCustomSectionView(false)}
              // onClick={() => {
              //   setData({
              //     ...data,
              //     section: [
              //       ...data?.section.filter((item) => {
              //         item.header == "" || item.subSection == [];
              //       }),

              //     ],
              //   });

              //   setSectionData({
              //     title: "",
              //     duration: null,
              //     description: "",
              //   });
              //   setCustomSectionView(false);
              //   setIsModified({ status: false, index: 0 });
              // }}
              >
                Cancel
              </button>
              <button
                onClick={dataSeter}
                disabled={!isChecked}
                className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] h-[32px] btn_hover_effect"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}

      {!customSectionView && (
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
              onClick={() => setCustomSectionView(true)}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add {header}
            </p>
          </div>
          {!customSectionView && isEdited && (
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
