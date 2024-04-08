import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Course = ({ data, setData }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [courseData, setCourseData] = useState({
    courseName: "",
    issuedBy: "",
    discription: "",
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showCourse: !isChecked });
  };

  const handleSave = () => {
    if (isModified.status === true) {
      const dumyData = data.course;
      const index = isModified.index;
      dumyData.splice(index, 1, courseData);
      setData({ ...data, course: dumyData });
      setView(false);
    } else {
      setData({
        ...data,
        course: [courseData, ...data.course],
      });
      setView(false);
    }
    setIsModified({ status: false, index: 0 })
    setCourseData({
      courseName: "",
      issuedBy: "",
      discription: "",
      duration: {
        start: { year: "Year", month: "Month" },
        end: { year: "Year", month: "Month" },
      },
    });
    window.scrollTo(0,0)
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };
  const handleEditCourse = (index) => {
    const dataToEdit = data.course[index];

    if (dataToEdit) {
      setView(true);
      setCourseData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteCourse = (index) => {
    setData({
      ...data,
      course: data.course.filter((item, i) => i !== index),
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
          <p className="w-[80%]"> Course and Certification</p>

          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {data?.course?.map((course, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-2 rounded-[6px] border border-[#DEDEDE]"
          >
            <div className="flex justify-between">
              <p>{course.courseName}</p>
              <div className="flex gap-2">
                <div onClick={() => handleEditCourse(index)}>
                  <Edit_icon />
                </div>
                <div onClick={() => handleDeleteCourse(index)}>
                  <Delete_icon />
                </div>
              </div>
            </div>
          </div>
        ))}

        {view && (
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-[50%]">
                  <div className=" text-[14px] font-montserrat  font-medium">
                    Certificate Name
                  </div>
                  <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name="courseName"
                      placeholder="Enter Certificate Name"
                      className="w-full text-[14px] font-montserrat font-small "
                      value={courseData.courseName}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[50%]">
                  <div className="w-full text-[14px] font-montserrat  font-medium">
                    Issued by
                  </div>
                  <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                    <input
                      type="text"
                      name="issuedBy"
                      id=""
                      placeholder="Issued by"
                      className="w-full text-[14px] font-montserrat font-small "
                      value={courseData.issuedBy}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
              </div>

              <DateSelector
                idPrefix="education"
                data={courseData}
                dataSeter={setCourseData}
                fromCreate={true}

              />

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Description
                </div>

                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px]  min-h-[140px]">
                  <textArea
                    type="text"
                    name=""
                    id=""
                    className="w-full h-full text-[14px] font-montserrat font-small outline-none  min-h-[140px]"
                    onChange={(e) => {
                      setCourseData({
                        ...courseData,
                        discription: e.target.value,
                      });
                    }}
                  >
                    {courseData.discription}
                  </textArea>
                </div>
              </div>
            </div>

            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => setView(false)}
                >
                  Cancel
                </button>
                {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                  Update to Profile
                </button> */}
                <button
                  onClick={handleSave}
                  disabled={!isChecked}
                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!view && (
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
            <text
              onClick={() => setView(true)}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add Course & Certification
            </text>
          </div>
        )}
      </div>
    </>
  );
};

export default Course;
