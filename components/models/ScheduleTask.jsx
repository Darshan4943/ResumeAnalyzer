import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";
import MiniLoader from "../common/mini-loader";

function ScheduleTask({
  setError,
  error,
  loading,
  setShowAssignTask,
  setTaskSuccessfull,
  setSelectedValues,
  selectedValues,
  submitDetails,
  mailDetails,
  setMailDetails,
}) {
  const [levels, setLevels] = useState([
    {
      id: 1,
      name: "Reviewer 1",
      taskReviewer: [{ name: "", role: "", email: "" }],
    },
  ]);
  const [formError, setFormError] = useState({});
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
      setError("")
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
      setError("")
      debounceUpdate1(value.slice(0, 200));
    } else {
      setMailDetails({
        ...mailDetails,
        interviewer: { ...mailDetails.interviewer, content: value },
      });
      debounceUpdate1(value);
    }
  };

  const addLevel = () => {
    const newLevel = {
      id: levels.length + 1,
      name: `Reviewer ${levels.length + 1}`,
      taskReviewer: [{ name: "", role: "", email: "" }],
    };
    setLevels([...levels, newLevel]);
  };

  const deleteLevel = (id) => {
    if (id === 1) return;

    const updatedLevels = levels?.filter((level) => level?.id !== id);
    setLevels(updatedLevels);

    const updatedAssignTo = selectedValues?.taskReviewer?.filter(
      (_, index) => index !== id - 1
    );
    setSelectedValues((prevState) => ({
      ...prevState,
      taskReviewer: updatedAssignTo,
    }));
  };

  const handleInputChange = (id, field, value) => {
    setError("");
    const updatedLevels = levels.map((level) => {
      if (level?.id === id) {
        level.taskReviewer[0][field] = value;
      }
      return level;
    });

    setLevels(updatedLevels);

    const updatedSelectedValues = levels.map((level) => ({
      name: level?.taskReviewer[0].name,
      role: level?.taskReviewer[0].role,
      email: level?.taskReviewer[0].email,
    }));

    setSelectedValues((prevState) => ({
      ...prevState,
      taskReviewer: updatedSelectedValues,
    }));
  };

  const [toggle, setToggle] = useState(0);
  const [activeOption, setActiveOption] = useState("Candidate");

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setToggle(option);
  };
  const handleSelectChange = (e) => {
    setToggle(parseInt(e.target.value, 10));
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
       <button
          className="ql-align"
        
          aria-label="Align Left"
        ></button>
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
      <div className="text-[18px] font-medium">Assign Task</div>

      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-medium">
          Reviewer Details <span className="text-red">*</span>
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
                  {level?.id !== 1 && (
                    <svg
                      className="delete-level"
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
                  value={level?.taskReviewer[0].name}
                  onChange={(e) =>
                    handleInputChange(level?.id, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Employee Role"
                  className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px] font-[400]"
                  value={level?.taskReviewer[0].role}
                  onChange={(e) =>
                    handleInputChange(level?.id, "role", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px] font-[400]"
                  value={level?.taskReviewer[0].email}
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
              + Add New Reviewer
            </p>
          </div>
        </div>

        <div className="flex flex-col  gap-4    py-[16px] ">
          <div>
          <div className="flex gap-12 sm:text-[16px] text-[12px] font-semibold px-4 overflow-x-auto md:overflow-x-visible">
          <div className="flex flex-col gap-2">
                <p
                  className={` cursor-pointer ${activeOption === "Candidate"
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
              <div className="flex flex-col gap-2 ">
                <p
                  className={` cursor-pointer ${activeOption === "Interviewer"
                      ? "text-[#333333]"
                      : "text-[#646464]"
                    } `}
                  onClick={() => handleOptionClick("Interviewer")}
                >
                  Email to Reviewer
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
                  placeholder="Skilotech-Online Task"
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
                      // paddingTop: "120px",

                      minHeight: "196px",

                    }}
                  />
                
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
                  onChange={(e) =>{
                    setMailDetails((prev) => ({
                      ...prev,
                      interviewer: {
                        ...prev.interviewer,
                        subject: e.target.value,
                      }
                    }));setError("")}
                  }
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div>
                  <p className="text-[16px] font-medium text-[#646464]">Body</p>
                </div>
                <Editor
                  value={mailDetails?.interviewer?.content}
                  onTextChange={(e) => handleChange2(e.htmlValue)}
                  headerTemplate={header}
                  style={{
                    border: formError.content
                      ? "2px solid red"
                      : "2px solid #dedede",
                    fontSize: "16px",
                    color: "#333",
                    padding: "10px",
                    minHeight: "196px",
                  }}
                />
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
          onClick={() => setShowAssignTask(false)}
          className="h-[38px] red_border_Button rounded-[30px] px-6"
          // id="button"
        >
          Cancel
        </button>
        {loading ? (
          <div className="ml:px-9 w-[230px] justify-center items-center flex px-2 py-2 bg-[#06A9EF] rounded-[30px] text-[16px] font-semibold text-white">
            <MiniLoader />
          </div>
        ) : (
          <button
            onClick={() => submitDetails()}
            className="h-[38px] bg_Button rounded-[30px] px-8"
          >
            Create Assignment
          </button>
        )}
      </div>
    </div>
  );
}

export default ScheduleTask;
