import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LimitUsedModal = ({ setVisible, visible }) => {
  const router = useRouter();
  const [planAvailable, setplanAvailable] = useState(false);
  const [jdCountMonthly, setJdCountMonthly] = useState(0);

  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  useEffect(() => {
    const planavailable =
      localStorage.getItem("planAvailable") == "true" ? true : false;
    if (planavailable) {
      setplanAvailable(planavailable);
    }
  }, []);
  const getLimits = () => {
    const jdCountMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setJdCountMonthly(jdCountMonthly);

    const jdCountMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setJdCountMonthlyLimit(jdCountMonthlyLimit);

  };
  useEffect(() => {
    getLimits();
  }, []);

  return (
    visible && (
      <div className="expiryModel">
        <div className="modal">
          <div className="container sm:w-[432px] w-[90vw] scr420:p-4 p-2">
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col ">
                <img
                  src={
                    planAvailable
                      ? "/images/resumeBuilder/exceed.png"
                      : "/images/resumeBuilder/required.png"
                  }
                  alt=""
                  className="h-[166px] object-contain"
                />
                {(!planAvailable && (jdCountMonthly <= 0)) && (
                  <span className="text-[20px] ml:text-[24px] text-[#C00000] font-semibold text-center">
                    Subscription Required
                  </span>
                )}
                {(!planAvailable && (jdCountMonthly > 0)) && (
                  <span className="text-[20px] ml:text-[24px] text-[#C00000] font-semibold text-center">
                    Subscription Expired
                  </span>
                )}
              </div>
              <span className="ml:text-[14px] text-[14px] text-[#333333] font-medium text-center">
                Please Upgrade your Subscription Plan and continue using our
                best Ai powered services.
              </span>
            </div>
            <div className="flex flex-row justify-between items-center gap-[16px] w-[90%] ">
              <button
                className="red_border_Button h-[38px] scr420:px-[24px] px-3 text-[12px] ml:text-[16px] font-semibold rounded-[30px] "
                onClick={() => {
                  setVisible(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/purchase/plans")}
                className=" scr420:px-[24px] px-3 bg_Button h-[38px]  text-[12px] ml:text-[16px] font-semibold rounded-[30px] "
              >
                {!planAvailable ?
                  " Purchase Plan"
                  :
                  " Upgrade Plan"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LimitUsedModal;
