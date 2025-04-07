import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import ScheduleTask from "./ScheduleTask";
import ScheduleInterview from "./ScheduleInterview";
import { DummyProfileSvg } from "../../utils/svg";
import axios from "axios";
import { formatInterviewDate } from "../../utils/middleware";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ShortlistMail from "../../pages/common/hiring/ShortlistMail";
import MiniLoader from "../common/mini-loader";

function LevelUpdate({
  closeTaskPopup,
  setSuccessfull,
  setTaskSuccessfull,
  selectedLevel,
  setSelectedLevel,
  jobDetails,
}) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [isNextLevel, setIsNextLevel] = useState("");
  const [showScheduleInterview, setShowScheduleInterview] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [error, setError] = useState();
  const [currenStatus, setCurrenStatus] = useState();
  const [statusChange, setStatusChange] = useState(false);
  const handleStarClick = (starIndex) => {
    setSelectedLevel({ ...selectedLevel, score: starIndex + 1 });
  };
  const [loading, setLoading] = useState(false);
  const [shortlist, setShortlist] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [mailDetails, setMailDetails] = useState({
    candidate: { subject: "" },
    interviewer: { subject: "" },
  });
  useEffect(() => {
    setCurrenStatus(selectedLevel?.status);
  });

  const nextStage = () => {
    if (
      selectedLevel?.status === currenStatus &&
      selectedLevel?.level !== 1 &&
      selectedLevel.status === "Pending"
    ) {
      setError("Status Should Be Changed");
      return;
    }
    if (isNextLevel === "nextLevel") {
      if (!selectedValues?.title) {
        setError("Title is Required");
        return;
      }

      if (selectedValues?.isInterview && !showScheduleInterview) {
        setShowScheduleInterview(true);
        return;
      }

      if (selectedValues?.isTask && !showAssignTask) {
        setShowAssignTask(true);
        return;
      }
      if (!showScheduleInterview && !showAssignTask) {
        setError("Select Option");
        return;
      }
    } else {
      setShortlist(true);
    }
  };
  console.log(mailDetails)
  const submitDetails = async () => {
    if (
      selectedLevel?.status === currenStatus &&
      selectedLevel?.level !== 1 &&
      selectedLevel.status === "Pending"
    ) {
      setError("Status Should Be Changed");
      return;
    }

    if (isNextLevel === "nextLevel") {
      if (selectedValues.isInterview) {
        if (
          !selectedValues?.interviewer ||
          selectedValues.interviewer.length === 0
        ) {
          setError("Interviewer Details are Required");
          return;
        }

        if (!mailDetails?.candidate?.subject?.trim()) {
          setError("Subject is required.");
          return;
        }

        if (!mailDetails?.candidate?.content?.trim()) {
          setError("Email body is required.");
          return;
        }
        if (!mailDetails?.interviewer?.subject?.trim()) {
          setError("Subject is required of interviewer.");
          return;
        }

        if (!mailDetails?.interviewer?.content?.trim()) {
          setError("Email body is required of interviewer.");
          return;
        }

        const invalidInterviewers = selectedValues.interviewer.some(
          (interviewer) => !interviewer.email || interviewer.email.trim() === ""
        );

        if (invalidInterviewers) {
          setError("Email is required for every Interviewer");
          return;
        }

        if (selectedValues?.isOnline && !selectedValues.meetingLink) {
          setError("Meeting Link is Required");
          return;
        }

        if (!selectedValues?.isOnline && !selectedValues.interviewLocation) {
          setError("Location is Required");
          return;
        }
      }
      if (selectedValues.isTask) {
        if (
          !selectedValues?.taskReviewer ||
          selectedValues.taskReviewer.length === 0
        ) {
          setError("Reviewer Details are Required");
          return;
        }
        const invalidTaskReviewer = selectedValues.taskReviewer.some(
          (taskReviewer) =>
            !taskReviewer.email || taskReviewer.email.trim() === ""
        );

        if (invalidTaskReviewer) {
          setError("Email is required for every Reviewer");
          return;
        }
        if (!mailDetails?.candidate?.subject?.trim()) {
          setError("Candidate Subject is required.");
          return;
        }

        if (!mailDetails?.candidate?.content?.trim()) {
          setError("Candidate Email body is required.");
          return;
        }
        if (!mailDetails?.interviewer?.subject?.trim()) {
          setError("Subject is required for reviewer.");
          return;
        }

        if (!mailDetails?.interviewer?.content?.trim()) {
          setError("Email body is required for reviewer.");
          return;
        }
      }
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `https://jamblix.com/api/job/hiringLevelUpdate/${jobDetails?.applicantId}/${jobDetails?.jobId}`,
        {
          selectedValues: {
            level: selectedLevel?.level + 1,
            interviewer: selectedValues?.interviewer,
            taskReviewer: selectedValues?.taskReviewer,
            duration: selectedValues?.duration,
            interviewDate: selectedValues?.interviewDate,
            interviewLocation: selectedValues?.interviewLocation,
            isInterview: selectedValues?.isInterview,
            isTask: selectedValues?.isTask,
            isOnline: selectedValues?.isOnline,
            meetingLink: selectedValues?.meetingLink,
            startAmPm: selectedValues?.startAmPm,
            startTime: selectedValues?.startTime,
            status: selectedValues?.status,
            title: selectedValues?.title,
          },
          selectedLevel: {
            level: selectedLevel?.level,
            status: selectedLevel?.status,
            score: selectedLevel?.score,
            comment: selectedLevel?.comment,
          },
          isNextLevel,
          mailDetails,
          employer: userDataGlobal?.email,
        }
      );

      if (response.data.success) {
        console.log("Details updated successfully");
        if (selectedValues?.isTask) {

          setSuccessfull("Task")
          setTaskSuccessfull(true)

        }
        if (selectedValues?.isInterview) {
          setSuccessfull("Interview")
          setTaskSuccessfull(true)
        }
        if (isNextLevel === "Shortlisted") {
          setSuccessfull("Shortlisted")
          setTaskSuccessfull(true)
        }
        if (isNextLevel === "Rejected") {
          setSuccessfull("Rejected")
          setTaskSuccessfull(true)
        }

        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating application details:", error);
      setLoading(false);
    }
  };

  const handleRadioChange = (value) => {
    setError("");
    if (value === "scheduleInterview") {
      setSelectedValues({
        ...selectedValues,
        isInterview: true,
        isTask: false,
      });
    } else {
      setSelectedValues({
        ...selectedValues,
        isTask: true,
        isInterview: false,
      });
    }
  };
  const handleIsNextLevel = (value) => {
    setIsNextLevel(value);
  };

  const handleStatusChange = (value) => {
    setError("");

    setSelectedLevel((prevValues) => ({ ...prevValues, status: value }));
  };

  const handleDateChange = (e) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      date: e.target.value,
    }));
  };

  const handleLevelTitleChange = (e) => {
    setError("");
    setSelectedValues((prevValues) => ({
      ...prevValues,
      title: e.target.value,
    }));
  };

  return (
    <div
      className="scr1200:max-w-[60%] scr1200:w-[60%] ml:w-[80%] sm:p-6 p-3 rounded-tl-[16px] h-[100vh] bg-white flex flex-col gap-4 overflow-y-auto w-full "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {shortlist && (
        <>
          <div className="fixed z-[12000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[12000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
            <ShortlistMail
              shortlist={[jobDetails]}
              setPopupVisible={setShortlist}
              id={jobDetails?.jobId}
              isByEmployer={true}
              submitDetails={submitDetails}
              newHiringStage={isNextLevel}
              setStatusChange={setStatusChange}
              statusChange={statusChange}
            />
          </div>
        </>
      )}
      <div className="flex gap-4 justify-between items-center w-full  ">
        <p className="text-[20px] font-medium min-w-[110px]">
          Level {selectedLevel?.level}
        </p>
        <div className="h-[1px] w-full bg-[#D6DDEB]"></div>
      </div>
      <p className="text-[18px] scr420:text-[20px] font-medium">{selectedLevel?.title}</p>
      <div className="min-h-[1px] w-full bg-[#D6DDEB]"></div>
      {selectedLevel?.level !== 1 && (
        <div className="flex ms:flex-row flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4 w-[30%]">
            <div>
              <p className="text-[20px] font-medium">Interview Status</p>
              <p className="text-[12px] font-normal">
                Change Interview Status of the Candidate
              </p>
            </div>

            <select
              className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[14px] font-[400]"
              value={selectedLevel?.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Pending">In Progress</option>
              {selectedLevel?.isTask ? (
                <option value="Completed">Completed</option>
              ) : (
                <option value="Conducted">Conducted</option>
              )}
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-[30%]">
            <p className="text-[20px] font-medium">Interview Date</p>

            <div>{formatInterviewDate(selectedLevel?.interviewDate)}</div>
          </div>
        </div>
      )}
      {selectedLevel?.level !== 1 && (
        <div className="flex ms:flex-row flex-col gap-4 justify-between">
          {selectedLevel?.interviewer?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[20px] font-medium">Conducted By</p>
              <div className="flex  gap-2 flex-wrap">
                {selectedLevel?.interviewer?.map((person, index) => (
                  <div key={index} className="flex gap-2">
                    <DummyProfileSvg />
                    <div>
                      <p className="text-[14px] font-medium">{person.name}</p>
                      <p className="text-[12px] font-normal text-[#646464]">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 w-[30%]">
            <div>
              <p className="text-[20px] font-medium">Interview Score</p>
              <p className="text-[12px] font-normal">
                rate candidate from scale of 1 to 5
              </p>
            </div>
            <div style={{ display: "flex" }}>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < selectedLevel?.score
                      ? "/images/services/Star.png"
                      : "/images/services/Star1.png"
                  }
                  alt=""
                  className="h-[30px] w-[30px] cursor-pointer"
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full gap-2">
        <p className="text-[16px] scr420:text-[18px] font-medium">Add Comment</p>
        <div>
          <input
            type="text"
            placeholder="Add Comment"
            className="px-[16px] w-full py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] text-[12px] scr420:text-[14px] font-[400] placeholder:text-[12px]"
            value={selectedLevel?.comment || ""}
            onChange={(e) =>
              setSelectedLevel({ ...selectedLevel, comment: e.target.value })
            }
          />
        </div>
      </div>
      <div className="min-h-[1px] bg-[#D6DDEB]"></div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between ms:flex-row flex-col gap-4 text-[14px] font-semibold">
          <div className="flex gap-[8px] items-center  ">
            <input
              type="radio"
              name="approvalChoice"
              value="nextLevel"
              className="h-[20px] w-[20px] custom-radio cursor-pointer "
              onChange={(e) => handleIsNextLevel(e.target.value)}
              checked={isNextLevel === "nextLevel"}
            />

            <label>Move to next Level</label>
          </div>
          <div className="flex gap-[8px] items-center  ">
            <input
              type="radio"
              name="approvalChoice"
              value="Shortlisted"
              className="h-[20px] w-[20px] custom-radio cursor-pointer "
              onChange={(e) => handleIsNextLevel(e.target.value)}
              checked={isNextLevel === "Shortlisted"}
            />
            <label className="text-[#0C8A0A] ">Shortlist Candidate</label>
          </div>
          <div className="flex gap-[8px] items-center  ">
            <input
              type="radio"
              name="approvalChoice"
              value="Rejected"
              className="h-[20px] w-[20px] custom-radio cursor-pointer "
              onChange={(e) => handleIsNextLevel(e.target.value)}
              checked={isNextLevel === "Rejected"}
            />
            <label className="text-[#C00000]">Reject Candidate</label>
          </div>
        </div>
        {isNextLevel === "nextLevel" && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-[16px] font-medium">
                Level Title <span className="text-red">*</span>
              </p>
              <input
                type="text"
                placeholder="Eg: Technical Round-I"
                className="px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] outline-none rounded-[6px] placeholder:text-[14px]  font-[400]"
                value={selectedValues?.title}
                onChange={(e) => handleLevelTitleChange(e)}
              />
            </div>
            <div className="flex justify-between ms:flex-row flex-col gap-4 text-[16px] ms:w-[55%] font-medium">
              <div className="flex gap-[8px] items-center  ">
                <input
                  type="radio"
                  name="AssigneTask"
                  value="scheduleInterview"
                  className="h-[20px] w-[20px] custom-radio cursor-pointer"
                  onChange={(e) => handleRadioChange(e.target.value)}
                />
                <label>Schedule Interview</label>
              </div>
              <div className="flex gap-[8px] items-center ">
                <input
                  type="radio"
                  name="AssigneTask"
                  value="assignTask"
                  className="h-[20px] w-[20px] custom-radio cursor-pointer "
                  onChange={(e) => handleRadioChange(e.target.value)}
                />
                <label>Assign Task</label>
              </div>
            </div>
            <div className="h-[1px] bg-[#D6DDEB]"></div>
          </>
        )}
        <div className="w-full flex justify-end text-red text-[14px] font-medium">
          {error}
        </div>
        <div className="flex gap-4 justify-end py-[1rem]">
          <button
            onClick={closeTaskPopup}
            className=" h-[38px] red_border_Button rounded-[30px] px-6"
            // id="button"
          >
            Cancel
          </button>
          {loading ? (
            <div className="h-[42px] w-[106px] bg-[#06A9EF] rounded-[30px] flex justify-center items-center text-[16px] font-semibold text-white">
              <MiniLoader />
            </div>
          ) : (
            <button
              onClick={isNextLevel ? nextStage : submitDetails}
              className=" h-[38px] bg_Button rounded-[30px] px-8"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showScheduleInterview && (
          <div>
            <div className="fixed z-[2500] top-[-100] left-[-100] right-[-100] bottom-[-100] w-[200%] bg-black opacity-60"></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              // ref={taskRef}
              className="absolute z-[2500] right-0 w-[100%] top-[0] scr1200:max-w-[60%] scr1200:w-[60%] ml:w-[80%] "
            >
              <ScheduleInterview
                setError={setError}
                loading={loading}
                mailDetails={mailDetails}
                setMailDetails={setMailDetails}
                error={error}
                setShowScheduleInterview={setShowScheduleInterview}
                setSuccessfull={setSuccessfull}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                submitDetails={submitDetails}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAssignTask && (
          <div>
            <div className="fixed z-[2500] top-[-100] left-[-100] right-[-100] bottom-[-100] w-[200%] bg-black opacity-60"></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              // ref={taskRef}
              className="absolute z-[2500] right-0 w-[100%] top-[0] scr1200:max-w-[60%] scr1200:w-[60%] ml:w-[80%] "
            >
              <ScheduleTask
                setError={setError}
                loading={loading}
                mailDetails={mailDetails}
                setMailDetails={setMailDetails}
                error={error}
                setShowAssignTask={setShowAssignTask}
                setTaskSuccessfull={setTaskSuccessfull}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                submitDetails={submitDetails}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LevelUpdate;
