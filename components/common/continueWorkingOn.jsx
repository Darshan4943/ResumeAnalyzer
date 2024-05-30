import React, { useState } from "react";
import CustomDate from "./customDate";

function ContinueWorkingOn({
  idPrefix,
  dataSeter,
  data,
  fromCreate,
  isPursuingChecked,
  isRow,
}) {
  const [toggleOn, setToggleOn] = useState(true);
  return (
    <div
      className=" flex flex-col gap-[12px] p-[8px] rounded-[8px] bg-[#F9F9F9]"
      style={{ opacity: toggleOn ? 1 : 0.3 }}
    >
      <div className=" flex flex-row gap-[8px]">
        <div className=" flex flex-row w-[70%] justify-start items-start gap-[8px]">
          <div className="w-4 h-4 flex text-[14px] font-montserrat font-medium items-center">
            <input
              type="checkbox"
              className="w-full h-full appearance-none rounded-[5px] outline-none bg-white border-2 border-[#06A9EF]"
            />
          </div>
          <span className=" w-[90%]font-Montserrat text-[14px] font-[500] ">
            Currently working on
          </span>
        </div>
        <div className=" flex flex-row w-[30%] justify-end items-end float-end ">
          {toggleOn ? (
            <div
              onClick={() => {
                setToggleOn(false);
              }}
              className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#06A9EF] border-[1px] bg-[#06A9EF]"
            >
              <div className="w-[20px] h-[20px] flex flex-col justify-end items-end float-end">
                <img className="w-full h-full" src="/images/check_circle.png" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setToggleOn(true);
              }}
              className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#646464] border-[1px] bg-[#FFFFFF]"
            >
              <div className="w-[20px] h-[20px] flex flex-col justify-start items-start float-start">
                <img className="w-full h-full" src="/images/cancel.png" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-[12px]">
        <CustomDate
          idPrefix={idPrefix}
          data={data}
          dataSeter={dataSeter}
          fromCreate={fromCreate}
          isRow={true}
        />
      </div>
    </div>
  );
}

export default ContinueWorkingOn;
