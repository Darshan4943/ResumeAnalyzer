import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LimitUsedModal = ({ setVisible, visible }) => {
  const router = useRouter();
  const [planAvailable, setplanAvailable] = useState(false);

  useEffect(() => {
    const planavailable =
      localStorage.getItem("planAvailable") == "true" ? true : false;
    if (planavailable) {
      setplanAvailable(planavailable);
    }
  }, []);
  return (
    visible && (
      <div className="expiryModel ">
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
                {!planAvailable && (
                  <span className="text-[22px] ml:text-[30px] text-[#C00000] font-semibold text-center">
                    Subscription Required
                  </span>
                )}
              </div>
              <span className="ml:text-[16px] text-[14px] text-[#333333] font-medium text-center">
                Please Upgrade your Subscription Plan and continue using our
                best Ai powered services.
              </span>
            </div>
            <div className="flex flex-row justify-between items-center gap-[16px] w-[90%] ">
              <button
                className="border-[#C00000] py-[12px] scr420:px-[24px] px-3 border text-[#C00000] text-[12px] ml:text-[16px] font-semibold rounded-[12px] "
                onClick={() => {
                  setVisible(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/purchase/plans")}
                className="border-[#06A9EF] py-[12px] scr420:px-[24px] px-3 border text-[#fff] bg-[#06A9EF] text-[12px] ml:text-[16px] font-semibold rounded-[12px] "
              >
                Purchase Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LimitUsedModal;
