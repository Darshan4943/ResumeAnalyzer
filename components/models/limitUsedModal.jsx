import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LimitUsedModal = ({ setVisible, visible }) => {
  const router = useRouter();
  return (
    visible && (
      <div className="expiryModel">
        <div className="modal">
          <div className="container">
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[12px]">
                <img
                  src="/images/LimitError.png"
                  alt=""
                  className="h-[168px] object-contain"
                />
                <span className="text-[30px] text-[#C00000] font-semibold text-center">
                  Limits Exceeded!
                </span>
              </div>
              <span className="text-[16px] text-[#333333] font-medium text-center">
                Please Upgrade your Subscription Plan and continue using our
                best Ai powered services.
              </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-[16px] ">
              <button
                className="border-[#C00000] py-[12px] px-[24px] border text-[#C00000] text-[16px] font-semibold rounded-[12px] "
                onClick={() => {
                  setVisible(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/purchase/plans")}
                className="border-[#06A9EF] py-[12px] px-[24px] border text-[#fff] bg-[#06A9EF] text-[16px] font-semibold rounded-[12px] "
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
