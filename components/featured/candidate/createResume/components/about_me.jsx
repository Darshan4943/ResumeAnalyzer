import React, { useEffect, useState } from "react";
import { SparklingStarts } from "../../../../../utils/svg";
import axios from "axios";
import MiniLoader from "../../../../common/mini-loader";
import { useDispatch, useSelector } from "react-redux";
import { textFieldClasses } from "@mui/material";
import { updateAiHit } from "../../../../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../../../../Redux/slices/recallSlice";
import LimitUsedModal from "../../../../models/limitUsedModal";

const AboutMe = ({ data, setData,isEnhanced }) => {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [text, setText] = useState("");
  const [attempt, setAttempt] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isPlanActive, setIsPlanActive] = useState(false);

  const dispatch = useDispatch();
  const { recallData } = useSelector((state) => state.recall);
  const [limitUsedModal, setLimitUsedModal] = useState(false);
  const [aiHitsMonthly, setAiHitsMonthly] = useState(0);
  const [activePlan, setActivePlan] = useState();
  const [aiHitsMonthlyLimit, setAiHitsMonthlyLimit] = useState(0);
  const getLimits = () => {
    const aiHitsMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setAiHitsMonthly(aiHitsMonthly);

    const aiHitsMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setAiHitsMonthlyLimit(aiHitsMonthlyLimit);
    const activePlan = JSON.parse(localStorage.getItem("planActive"));

    setActivePlan(activePlan);
  };
  useEffect(() => {
    getLimits();
  }, []);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showSummary: !isChecked });
  };

  useEffect(() => {
    if (data) {
      if (data?.showSummary === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  const generateText = () => {
    if ((aiHitsMonthly >= aiHitsMonthlyLimit) || !activePlan) {
      setLimitUsedModal(true);
      return;
    }
    const prompt = `Original Paragraph:\n${text}\n\nNew Paragraph:\n`;
    if (text.length > 100) {
      setLoading(true);
      axios
        .post("https://api.skilotech.com/api/text/regenrate", { prompt })
        .then((res) => {
          setLoading(false);
          setError("");
          setText(res.data.data.choices[0].message.content);
          if (!isPlanActive) {
            localStorage.setItem("attempts", attempt - 1);
            getAttempts();
          }
          dispatch(updateAiHit(userDataGlobal?._id))
          setTimeout(() => {
            dispatch(setRecallData(!recallData));
            getLimits();
          }, 1000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setError("Minimum 100 characters required");
    }
  };

  const getAttempts = () => {
    const localData = localStorage.getItem("attempts");
    if (localData) {
      setAttempt(parseInt(localData));
    }
  };

  useEffect(() => {
    const planActive = JSON.parse(localStorage.getItem("planActive"));
    if (planActive) {
      setIsPlanActive(planActive);
    }
    getAttempts();
    if (userDataGlobal?.resumeUrl) {
      const Summery = userDataGlobal?.summary;
      setText(Summery);
    }
  }, [userDataGlobal]);

  useEffect(() => {
    setText(data.summery ? data.summery : "");
  }, [data]);

  const handleTextChange = (e) => {
    e.preventDefault();
    const newText = e.target.value;
    if (newText.length >= 400 || text.length > 400) {
      setText(newText.slice(0, 400));
      setError("Maximum 400 characters allowed");
    } else {
      setError("");
      setText(newText);
    }
  };

  return (
    <>
         <LimitUsedModal visible={limitUsedModal} setVisible={setLimitUsedModal} />
      <div
        className="flex flex-col p-4 gap-2 rounded-2xl bg-white "
        style={{
          // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full text-[20px] flex justify-between font-montserrat font-medium">
          <p> About Me</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px] flex items-center justify-center">
          {loading ? (
            <MiniLoader />
          ) : (
            <textarea
              type="text"
              name="aboutMe"
              className="w-full text-[14px] font-montserrat font-small min-h-[170px] outline-none"
              placeholder="Enter text"
              maxLength={400} // Set maximum length
              onChange={handleTextChange}
              value={text}
              disabled={!isChecked}
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-3 w-[100%]  ">
          <div className="error_text_form ">{error}</div>
          {/** <div className="text-[12px] ">
            {" "}
            {400 - text?.length} characters left
            
          </div> */}
        </div>

        <div className="flex justify-end items-center gap-3 ">
          {isPlanActive ? null : (
            <div className="text-[10px] font-[400]">
              Remaining Attempts - {attempt}
            </div>
          )}

          <button
            className="flex gap-1 items-center font-montserrat text-xs font-semibold btn_outline"
            onClick={generateText}
            style={{
              opacity:
                text.length > 0 ||
                attempt <= 0 ||
                (isPlanActive === true && text.length > 0)
                  ? 1
                  : 0.5,
            }}
            // disabled={
            //   text.length > 0 ||
            //   attempt <= 0 ||
            //   (isPlanActive === true && text.length > 0)
            // }
            disabled={
              text.length <= 0 ||
              attempt <= 0 ||
              (isPlanActive !== true && text.length < 0)
            }
          >
            <SparklingStarts />
            Generate with AI
          </button>
          <button
            className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] ${
              text?.length !== 0 ? "bg_Button" : ""
            }`}
            onClick={() => setData({ ...data, summery: text })}
            // style={{ opacity: text === data?.summery ? 0.5 : 1 }}
            style={{
              opacity: text === data?.summery || text?.length == 0 ? 0.5 : 1,
            }}
            disabled={
              text === data?.summery || !isChecked || text?.length === 0
            }
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
