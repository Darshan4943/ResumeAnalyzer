import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { Close_svg } from "../../../utils/svg";
import MiniLoader from "../../common/mini-loader";
import { fetchUserData } from "../../../Redux/slices/userSlice";
import { updateAiHit } from "../../../Redux/slices/aiHitsSlice";
import { setRecallData } from "../../../Redux/slices/recallSlice";
import LimitUsedModal from "../../models/limitUsedModal";

const AboutModal = ({ handleImageClick, userData, setIsComponentOpen }) => {
  const [text, setText] = useState(userData?.summary);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { recallData } = useSelector((state) => state.recall);

  const [activePlan, setActivePlan] = useState();
  const [limitPopup, setLimitPopup] = useState(false);
  const [aiHitMonthly, setAiHitMonthly] = useState(0);
  const [aiHitMonthlyLimit, setAiHitMonthlyLimit] = useState(0);

  const getLimits = () => {
    const aiHitMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setAiHitMonthly(aiHitMonthly);

    const aiHitMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setAiHitMonthlyLimit(aiHitMonthlyLimit);
    const activePlan = JSON.parse(localStorage.getItem("planActive"));

    setActivePlan(activePlan);
  };
  useEffect(() => {
    getLimits();
  }, []);
  const generateText = () => {
    if (aiHitMonthly >= aiHitMonthlyLimit || !activePlan) {
      setLimitPopup(true);
      return;
    }
    const prompt = `Original Paragraph:\n${text}\n\nNew Paragraph:\n`;
    if (text?.length > 100) {
      setLoading(true);
      axios
        .post("https://api.skilotech.com/api/text/regenrate", { prompt })
        .then((res) => {
          setLoading(false);
          setText(res.data.data.choices[0].message.content);
          dispatch(updateAiHit(userDataGlobal?._id));
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
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 400) {
      setText(inputValue);
    }
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://api.skilotech.com/api/candidate/updateSummery/" +
          userDataGlobal?._id,

        { summery: text }
      )

      .then((res) => {
        if (res.data.success) {
          toast.success("Summary added successfully");
          dispatch(fetchUserData());
          handleImageClick(handleImageClick);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (userData) {
      setText(userData?.summary);
    }
  }, [userData]);

  return (
    <>
      <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
      <div id="demo-modal" class="modal ">
        <div class="modal__content md:w-[56%] gap-4 flex flex-col p-6 rounded-xl">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="min-w-[140px] text-[#25324B]  text-[18px] font-[600] leading-160">
              Edit About me
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
            <div className=" cursor-pointer">
              <Close_svg handleImageClick={handleImageClick} />
            </div>
          </div>
          <div className="flex w-full  px-4 py-3 rounded-md border border-gray-300 bg-white">
            <textarea
              className="text-[#333] font-Montserrat text-[14px]  font-normal leading-170 w-full focus:outline-none"
              name="summary"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              value={text}
            ></textarea>
          </div>
          <div className="w-full flex scr460:flex-row flex-col justify-between  items-center ">
            <div
              className=" flex px-4 py-3 justify-center items-center gap-2 rounded-[8px] border border-blue bg-white  cursor-pointer"
              onClick={generateText}
            >
              {loading ? (
                <MiniLoader />
              ) : (
                <>
                  {" "}
                  <img
                    src="/images/jobs/strs.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <p className=" text-[14px] text-[#333333] font-Montserrat   font-semibold leading-normal">
                    Generate with AI
                  </p>
                </>
              )}
            </div>
            <p className="text-Text-Secondary text-right font-Montserrat text-[12px] md:text-14 font-normal leading-170]">
              {Math.max(0, 400 - (text?.length ?? 0))} characters left
            </p>
          </div>
          <div className="w-full flex items-center justify-end gap-3 xxsm:items-center">
            <button
              className="px-[26px] red_border_Button h-[38px] rounded-[30px]"
              onClick={() => handleImageClick(false)}
            >
              Cancel
            </button>

            <button
              className="px-[26px] bg_Button h-[38px] rounded-[30px]"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutModal;
