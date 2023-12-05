import React, { useState } from "react";

const DateSelector = ({
  idPrefix,
  defaultStartMonth,
  defaultStartYear,
  defaultEndMonth,
  defaultEndYear,
}) => {
  const [startMonth, setStartMonth] = useState(defaultStartMonth || "Month");
  const [startYear, setStartYear] = useState(defaultStartYear || "Year");

  const [endMonth, setEndMonth] = useState(defaultEndMonth || "Month");
  const [endYear, setEndYear] = useState(defaultEndYear || "Year");

  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 11 }, (_, index) => 2020 + index);

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
  };

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };

  const handleEndMonthChange = (e) => {
    setEndMonth(e.target.value);
  };

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  };

  return (
    <div className="flex gap-[12px]">
      <div className="flex flex-col gap-2">
        <div>
          <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium" htmlFor={`${idPrefix}-startMonth`}>Start Date</label>
        </div>
        <div className="flex gap-4">
        <select
        id={`${idPrefix}-startMonth`}
        value={startMonth}
        onChange={handleStartMonthChange}
        className="flex p-4 items-center rounded-lg border border-[#646464] bg-white text-[14px] w-[100%] font-montserrat font-small"
        // style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
      >
        <option value="Month" disabled hidden className=" ">
          Month
          
        </option>
       
        {months.map((month) => (
          <option key={month} value={month}>
            {new Date(0, month - 1).toLocaleString("en", { month: "long" })}
          </option>
        ))}
        
        

      </select>
      

          <select
            id={`${idPrefix}-startYear`}
            value={startYear}
            onChange={handleStartYearChange}
            className="flex p-4  items-center rounded-lg border border-[#646464] bg-white text-[14px] w-[100%] font-montserrat font-small"
          >
            <option value="Year" disabled hidden>
              Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium" htmlFor={`${idPrefix}-endMonth`}>End Date</label>
        </div>
        <div className="flex gap-4">
          <select
            id={`${idPrefix}-endMonth`}
            value={endMonth}
            onChange={handleEndMonthChange}
            className="flex p-4  items-center rounded-lg border border-[#646464] bg-white text-[14px] w-[100%] font-montserrat font-small"
          >
            <option value="Month" disabled hidden>
              Month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            id={`${idPrefix}-endYear`}
            value={endYear}
            onChange={handleEndYearChange}
            className="flex p-4  items-center rounded-lg border border-[#646464] bg-white text-[14px] w-[100%] font-montserrat font-small"
          >
            <option value="Year" disabled hidden>
              Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
