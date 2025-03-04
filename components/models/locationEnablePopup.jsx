import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LocationEnablePopup = ({ setEnablePopup, enablePopup, getLocation }) => {
  const router = useRouter();

  return (
    enablePopup && (
      <div className="expiryModel ">
        <div className="modal">
          <div className="container sm:w-[432px] w-[100vw] scr420:p-4 p-8">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col justify-center items-center gap-[12px] text-xl font-semibold">
                Permission Required
              </div>
             

              <span className="ml:text-[16px] text-[14px] text-[#333333] font-medium flex flex-col items-start px-4">
                You have denied permission to access your location. To use this website, please enable location.
                </span>
               
                <span className="ml:text-[16px] text-[14px] text-[#333333] font-medium flex flex-col items-start px-4">
              Please follow these steps:
                <ol className="py-4 flex flex-col gap-[9px]">
                  <li>Click on the lock icon near the URL bar.</li>
                  <li>Find the {`"Location"`} setting.</li>
                  <li>Change the setting to {`"Allow"`}.</li>
                </ol>
              </span>
            </div>
            {/* <div className="flex flex-row justify-between items-center gap-[16px] w-[90%] ">
              <button
                className="border-[#C00000] py-[12px] scr420:px-[24px] px-3 border text-[#C00000] text-[12px] ml:text-[16px] font-semibold rounded-[12px] "
                // onClick={() => {
                //   setVisible(false);
                // }}
              >
                Cancel
              </button>
              <button
                onClick={() => getLocation()}
                className="border-[#06A9EF] py-[12px] scr420:px-[24px] px-3 border text-[#fff] bg-[#06A9EF] text-[12px] ml:text-[16px] font-semibold rounded-[12px] "
              >
                Allow
              </button>
            </div> */}
          </div>
        </div>
      </div>
    )
  );
};

export default LocationEnablePopup;
