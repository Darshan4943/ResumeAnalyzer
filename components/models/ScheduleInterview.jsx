import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import MiniLoader from "../common/mini-loader";

function ScheduleInterview({
  setError,
  error,
  loading,
  setShowScheduleInterview,
  setSuccessfull,
  setSelectedValues,
  selectedValues,
  submitDetails,
  mailDetails,
  setMailDetails,
}) {
  const [levels, setLevels] = useState([
    {
      id: 1,
      name: "Interviewer 1",
      interviewer: [{ name: "", role: "", email: "" }],
    },
  ]);
  const [formError, setFormError] = useState({});
  useEffect(() => {
    setSelectedValues({
      ...selectedValues,
      isOnline: true,
      startAmPm: "PM",
      startTime: "1",
      duration: "30 min",
      interviewDate: new Date().toISOString().split("T")[0],
    });
  }, []);
  const debounceUpdate = useCallback(
    debounce((value) => {
      setMailDetails((prev) => ({
        ...prev,
        candidate: { ...prev.candidate, content: value },
      }));
    }, 500)
  );
  const debounceUpdate1 = useCallback(
    debounce((value) => {
      setMailDetails((prev) => ({
        ...prev,
        interviewer: { ...prev.interviewer, content: value },
      }));
    }, 500)
  );

  const handleChange1 = (value) => {
    if (value?.length < 200) {
      setMailDetails({
        ...mailDetails,
        candidate: { ...mailDetails.candidate, content: value.slice(0, 200) },
      });
      debounceUpdate(value.slice(0, 200));
    } else {
      setMailDetails({
        ...mailDetails,
        candidate: { ...mailDetails.candidate, content: value },
      });
      debounceUpdate(value);
    }
  };
  const handleChange2 = (value) => {
    if (value?.length < 200) {
      setMailDetails({
        ...mailDetails,
        interviewer: {
          ...mailDetails.interviewer,
          content: value.slice(0, 200),
        },
      });
      setError("");
      debounceUpdate1(value.slice(0, 200));
    } else {
      setMailDetails({
        ...mailDetails,
        interviewer: { ...mailDetails.interviewer, content: value },
      });
      debounceUpdate1(value);
    }
  };

  const handleInputChangee = (field, value) => {
    if (field === "meetingLink") {
      setError("");
      setSelectedValues({
        ...selectedValues,
        meetingLink: value,
        interviewLocation: "",
      });
    } else if (field === "interviewLocation") {
      setError("");
      setSelectedValues({
        ...selectedValues,
        interviewLocation: value,
        meetingLink: "",
      });
    }
  };
  const handleChange = (event) => {
    const value = event.target.value === "yes";

    setSelectedValues((prev) => ({ ...prev, isOnline: value }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;

    setSelectedValues((prevState) => ({
      ...prevState,
      interviewDate: value,
    }));
  };

  const handleStartTimeChange = (e) => {
    const { value } = e.target;

    setSelectedValues((prevState) => ({
      ...prevState,
      startTime: value,
    }));
  };

  const handleAmPmChange = (amPm) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      startAmPm: amPm,
    }));
  };

  const addLevel = () => {
    const newLevel = {
      id: levels.length + 1,
      name: `Interviewer ${levels.length + 1}`,
      interviewer: [{ name: "", role: "", email: "" }],
    };
    setLevels([...levels, newLevel]);
  };

  const deleteLevel = (id) => {
    if (id === 1) return;

    const updatedLevels = levels?.filter((level) => level?.id !== id);
    setLevels(updatedLevels);

    const updatedAssignTo = selectedValues?.interviewer?.filter(
      (_, index) => index !== id - 1
    );
    setSelectedValues((prevState) => ({
      ...prevState,
      interviewer: updatedAssignTo,
    }));
  };

  const handleInputChange = (id, field, value) => {
    setError("");
    const updatedLevels = levels.map((level) => {
      if (level?.id === id) {
        level.interviewer[0][field] = value;
      }
      return level;
    });

    setLevels(updatedLevels);

    const updatedSelectedValues = levels.map((level) => ({
      name: level?.interviewer[0].name,
      role: level?.interviewer[0].role,
      email: level?.interviewer[0].email,
    }));

    setSelectedValues((prevState) => ({
      ...prevState,
      interviewer: updatedSelectedValues,
    }));
  };

  const [toggle, setToggle] = useState("ApplicantProfile");
  const [activeOption, setActiveOption] = useState("Candidate");

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setToggle(option);
  };
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike"></button>
        <button
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          className="ql-list"
          value="bullet"
          aria-label="Unordered List"
        ></button>
        <button className="ql-align" aria-label="Align Left"></button>
        <button
          className="ql-align"
          value="center"
          aria-label="Align Center"
        ></button>
        <button
          className="ql-align"
          value="right"
          aria-label="Align Right"
        ></button>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <div
      className="sm:p-6 p-2 rounded-tl-[16px] h-[100vh] bg-white flex flex-col gap-4 overflow-y-auto"
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="text-[18px] font-medium">Schedule Interview</div>
      <div className="flex flex-col gap-2 text-[14px] font-medium ">
        <p className="text-[12px] font-medium">
          What will be the mode of Interview ?
        </p>
        <div className="flex gap-[8px] items-center">
          <input
            type="radio"
            name="isOnline"
            value="yes"
            className="h-[20px] w-[20px] custom-radio cursor-pointer "
            checked={selectedValues?.isOnline === true}
            onChange={handleChange}
          />
          <label className="text-[14px] font-medium">Online</label>

          <input
            type="radio"
            name="isOnline"
            value="no"
            className="h-[20px] w-[20px] custom-radio cursor-pointer"
            checked={selectedValues?.isOnline === false}
            onChange={handleChange}
          />
          <label className="text-[14px] font-medium">Offline</label>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-medium">
          Assigned to <span className="text-red">*</span>
        </p>
        <div className="flex gap-4  w-full">
          <div className=" mt-1">
            {levels.map((level, index) => (
              <div key={level?.id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  style={{ animationDelay: "1s" }}
                  className="level"
                >
                  <circle cx="8" cy="8.5" r="8" fill="#CBEFFF" />
                  <circle cx="8" cy="8.5" r="4" fill="#06A9EF" />
                </svg>
                {index !== levels.length - 1 && (
                  <div className="connector-line mt-[-2px] mb-[-3px]">
                    <img
                      className="moving-line1"
                      style={{
                        height: "0px",
                        width: "3px",
                        marginLeft: "0.44rem",
                      }}
                      src="/images/employer/tracker_line.png"
                      alt="Line 1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-[91.5%] flex flex-col gap-4">
            {levels.map((level) => (
              <div
                className="flex flex-col gap-[8px] sm:w-[75%] w-[95%] level"
                key={level?.id}
              >
                <div className="flex gap-2 justify-between">
                  <p>{level?.name}</p>
                  {level?.id === levels.length && level?.id !== 1 && (
                    <svg
                      className="delete-level cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      onClick={() => deleteLevel(level?.id)}
                    >
                      <g mask="url(#mask0_4754_63716)">
                        <path
                          d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Employee Name"
                  className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px] font-[400]"
                  value={level?.interviewer[0].name}
                  onChange={(e) =>
                    handleInputChange(level?.id, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Employee Role"
                  className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px] font-[400]"
                  value={level?.interviewer[0].role}
                  onChange={(e) =>
                    handleInputChange(level?.id, "role", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px] font-[400]"
                  value={level?.interviewer[0].email}
                  onChange={(e) =>
                    handleInputChange(level?.id, "email", e.target.value)
                  }
                />
              </div>
            ))}
            <p
              className="add-level text-[#06A9EF] text-[14px] font-semibold cursor-pointer"
              onClick={addLevel}
            >
              + Add New Interviewer
            </p>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 xl:w-[33%] w-[60%] min-w-[250px]">
            <div>
              <p className="text-[14px] font-medium">
                Interview Date <span className="text-red">*</span>
              </p>
            </div>
            <input
              type="date"
              placeholder="Select Date"
              className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
              value={selectedValues?.interviewDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="flex flex-col gap-4 xl:w-[33%] w-[60%] min-w-[250px]">
            <p className="text-[14px] font-medium">
              Start Time <span className="text-red">*</span>
            </p>
            <div className="flex gap-4">
              <select
                className="h-[38px] w-full px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                value={selectedValues.startTime}
                onChange={handleStartTimeChange}
              >
                <option disabled>Select</option>

                {Array.from({ length: 12 }, (_, i) => i + 1).flatMap((hour) => [
                  <option key={`${hour}:00`} value={`${hour}:00`}>
                    {String(hour).padStart(2, "0")}:00
                  </option>,
                  <option key={`${hour}:30`} value={`${hour}:30`}>
                    {String(hour).padStart(2, "0")}:30
                  </option>,
                ])}
              </select>

              <div className="flex gap-2   text-[14px] font-[400]">
                <button
                  className={`text-[14px] rounded-[6px] h-[38px] w-[40px]  ${
                    selectedValues.startAmPm === "AM"
                      ? " bg-blue text-white"
                      : ""
                  }`}
                  onClick={() => handleAmPmChange("AM")}
                >
                  AM
                </button>
                <button
                  className={`text-[14px] rounded-[6px] h-[38px] w-[40px] ${
                    selectedValues.startAmPm === "PM"
                      ? "text-white bg-blue"
                      : ""
                  }`}
                  onClick={() => handleAmPmChange("PM")}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 xl:w-[33%] w-[60%] min-w-[250px]">
            <p className="text-[14px] font-medium">
              Duration <span className="text-red">*</span>
            </p>
            <select
              className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400] max-h-[100px] overflow-y-scroll"
              value={selectedValues.duration} // Bind the selected value to state
              onChange={(e) =>
                setSelectedValues({
                  ...selectedValues,
                  duration: e.target.value,
                })
              } // Update the state when value changes
            >
              <option value="" disabled>
                Select
              </option>
              {/* Generate the options for durations */}
              {[
                "30 min",
                "45 min",
                "1 hr",
                "1 hr 30 min",
                "2 hr",
                "2 hr 30 min",
                "3 hr",
                "3 hr 30 min",
                "4 hr",
                "4 hr 30 min",
                "5 hr",
                "5 hr 30 min",
                "6 hr",
                "6 hr 30 min",
                "7 hr",
                "7 hr 30 min",
                "8 hr",
                "8 hr 30 min",
                "9 hr",
                "9 hr 30 min",
                "10 hr",
              ].map((duration, index) => (
                <option key={index} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedValues?.isOnline ? (
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium">
              Meeting Link <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Meeting Link"
              className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
              value={selectedValues?.meetingLink}
              onChange={(e) =>
                handleInputChangee("meetingLink", e.target.value)
              }
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium">
              Add Interview Location <span className="text-red">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Location"
              className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
              value={selectedValues?.interviewLocation}
              onChange={(e) =>
                handleInputChangee("interviewLocation", e.target.value)
              }
            />
          </div>
        )}

        <div className="flex flex-col  gap-4    py-[16px] ">
          <div>
            <div className="flex gap-12 sm:text-[16px] text-[12px] font-semibold px-4">
              <div className="flex flex-col gap-2">
                <p
                  className={` cursor-pointer ${
                    activeOption === "Candidate"
                      ? "text-[#333333]"
                      : "text-[#646464]"
                  } `}
                  onClick={() => handleOptionClick("Candidate")}
                >
                  Email to Candidate
                </p>
                <svg
                  className="sm:w-[170px] w-[125px]"
                  xmlns="http://www.w3.org/2000/svg"
                  height="4"
                  viewBox="0 0 150 4"
                  fill="none"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                    fill={activeOption === "Candidate" ? "#06A9EF" : "white"}
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p
                  className={` cursor-pointer ${
                    activeOption === "Interviewer"
                      ? "text-[#333333]"
                      : "text-[#646464]"
                  } `}
                  onClick={() => handleOptionClick("Interviewer")}
                >
                  Email to Interviewer
                </p>
                <svg
                  className="sm:w-[170px] w-[125px]"
                  xmlns="http://www.w3.org/2000/svg"
                  height="4"
                  viewBox="0 0 150 4"
                  fill="none"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                    fill={activeOption === "Interviewer" ? "#06A9EF" : "white"}
                  />
                </svg>
              </div>
            </div>
            <div className="h-[1px] bg-[#D6DDEB]"></div>
          </div>
          {activeOption === "Candidate" && (
            <>
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <p className="text-[16px] font-medium text-[#646464]">
                    Subject
                  </p>
                </div>
                <input
                  type="input"
                  placeholder="Skilotech-Online Interview"
                  class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                  value={mailDetails?.candidate?.subject}
                  onChange={(e) =>
                    setMailDetails((prev) => ({
                      ...prev,
                      candidate: {
                        ...prev.candidate,
                        subject: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div>
                  <p className="text-[16px] font-medium text-[#646464]">Body</p>
                </div>
                <div className=" border border-[#DEDEDE] relative">
                  <Editor
                    value={mailDetails?.candidate?.content}
                    onTextChange={(e) => handleChange1(e.htmlValue)}
                    headerTemplate={header}
                    style={{
                      border: "none",
                      fontSize: "16px",
                      color: "#333",
                      paddingTop: "120px",

                      minHeight: "196px",
                    }}
                  />
                  <div className=" absolute top-[56px] pl-[16px]">
                    <p>
                      {" "}
                      <span className=" font-medium">
                        {" "}
                        Interview Date :
                      </span>{" "}
                      {selectedValues.interviewDate}{" "}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium"> Start Time : </span>
                      {selectedValues.startTime} {selectedValues.startAmPm}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium"> Duration :</span>{" "}
                      {selectedValues.duration}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium">
                        {" "}
                        {selectedValues?.isOnline
                          ? "Meeting Link"
                          : "Interview Location"}{" "}
                        :
                      </span>{" "}
                      {selectedValues?.isOnline
                        ? selectedValues.meetingLink
                        : selectedValues.interviewLocation}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeOption === "Interviewer" && (
            <>
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <p className="text-[16px] font-medium text-[#646464]">
                    Subject
                  </p>
                </div>
                <input
                  type="input"
                  placeholder="Skilotech-Online Interview"
                  class="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
                  value={mailDetails?.interviewer?.subject}
                  onChange={(e) =>
                    setMailDetails((prev) => ({
                      ...prev,
                      interviewer: {
                        ...prev.interviewer,
                        subject: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div>
                  <p className="text-[16px] font-medium text-[#646464]">Body</p>
                </div>
                {/* <Editor
                  value={mailDetails?.interviewer?.content}
                  onTextChange={(e) => handleChange2(e.htmlValue)}
                  style={{
                    border: formError.content
                      ? "2px solid red"
                      : "2px solid #dedede",
                    fontSize: "16px",
                    color: "#333",
                    padding: "10px",
                    minHeight: "196px",
                  }}a
                /> */}
                <div className=" border border-[#DEDEDE] relative">
                  <Editor
                    value={mailDetails?.interviewer?.content}
                    onTextChange={(e) => handleChange2(e.htmlValue)}
                    headerTemplate={header}
                    style={{
                      border: "none",
                      fontSize: "16px",
                      color: "#333",
                      paddingTop: "120px",

                      minHeight: "196px",
                    }}
                  />
                  <div className=" absolute top-[56px] pl-[16px]">
                    <p>
                      {" "}
                      <span className=" font-medium">
                        {" "}
                        Interview Date :
                      </span>{" "}
                      {selectedValues.interviewDate}{" "}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium"> Start Time : </span>
                      {selectedValues.startTime} {selectedValues.startAmPm}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium"> Duration :</span>{" "}
                      {selectedValues.duration}
                    </p>
                    <p>
                      {" "}
                      <span className=" font-medium">
                        {" "}
                        {selectedValues?.isOnline
                          ? "Meeting Link"
                          : "Interview Location"}{" "}
                        :
                      </span>{" "}
                      {selectedValues?.isOnline
                        ? selectedValues.meetingLink
                        : selectedValues.interviewLocation}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="text-[14px] font-medium text-red w-full flex justify-end">
        {error}
      </div>
      <div className="flex gap-4 sm:justify-end  justify-center pb-[1rem]">
        <button
          onClick={() => setShowScheduleInterview(false)}
          className="h-[38px] red_border_Button rounded-[30px] px-6"
          // id="button"
        >
          Cancel
        </button>
        {loading ? (
          <div className="ml:px-9 w-[230px] items-center justify-center flex px-2 py-2 bg-[#06A9EF] rounded-[30px] text-[16px] font-semibold text-white">
            <MiniLoader />
          </div>
        ) : (
          <button
            onClick={() => submitDetails()}
            className="h-[38px] bg_Button rounded-[30px] px-8"
          >
            Schedule Interview
          </button>
        )}
      </div>
    </div>
  );
}

export default ScheduleInterview;
