import React, { useState } from "react";
import CustomDate from "./customDate";
import DateSelector from "./dateSelector";

function ContinueWorkingOn({
  idPrefix,
  dataSeter,
  data,
  fromCreate,
  isPursuingChecked,
  isRow,
}) {
  const [isChecked, setIsChecked] = useState(true);
  const [toggleOn, setToggleOn] = useState(true);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    dataSeter({ ...data, showExperience: !isChecked });
  };
  return (
    <div
      className=" flex flex-col gap-[12px] p-[8px] rounded-[8px] bg-[#F9F9F9]"
      style={{ opacity: isChecked ? 1 : 0.5 }}
    >
      <div className=" flex flex-row gap-[8px]">
        {/* <div className=" flex flex-row w-[70%] justify-start items-start gap-[8px]">
          <div className="w-4 h-4 flex text-[14px] font-montserrat font-medium items-center">
            <input
              type="checkbox"
              className="w-full h-full appearance-none rounded-[5px] outline-none bg-white border-2 border-[#06A9EF]"
            />
          </div>
          <span className=" w-[90%]font-Montserrat text-[14px] font-[500] ">
            Currently working on
          </span>
        </div> */}

        <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium items-center">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-md border-2 border-[#06A9EF] bg-white"
            checked={data.currentlyWorking}
            onChange={() =>
              dataSeter({
                ...data,
                currentlyWorking: !data.currentlyWorking,
                end: {
                  ...data.duration?.end,
                  year: "Present",
                  month: "Present",
                },
              })
            }
          />
          <label>Currently working here</label>
        </div>
        <div className=" flex flex-row w-[30%] justify-end items-end float-end ">
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="flex flex-row gap-[12px]">
        <DateSelector
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
