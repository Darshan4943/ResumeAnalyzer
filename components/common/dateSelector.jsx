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
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small">

            <select
              id={`${idPrefix}-startMonth`}
              value={startMonth}
              onChange={handleStartMonthChange}
              className="w-[79px] outline-none"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
            >
              <option value="Month" disabled hidden className="px-4 py-2">
                Month
              </option>

              {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
                  {new Date(0, month - 1).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>

            <img src="/images/down_arrow.png" className="h-[20px] w-[20px]" alt="" />
          </div>

          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small">

            <select
              id={`${idPrefix}-startYear`}
              value={startYear}
              onChange={handleStartYearChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
              className="w-[79px] outline-none"
            >
              <option value="Year" disabled hidden>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year} className="mt-4 px-4 py-2">
                  {year}
                </option>
              ))}

            </select>
            <img src="/images/down_arrow.png" className="h-[20px] w-[20px]" alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <label className="w-full flex gap-2 text-[14px] font-montserrat  font-medium" htmlFor={`${idPrefix}-endMonth`}>End Date</label>
        </div>
        <div className="flex gap-4">
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small">
            <select
              id={`${idPrefix}-endMonth`}
              value={endMonth}
              onChange={handleEndMonthChange}
              className="w-[79px] outline-none"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}

            >
              <option value="Month" disabled hidden>
                Month
              </option>
              {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
                  {new Date(0, month - 1).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>
            <img src="/images/down_arrow.png" className="h-[20px] w-[20px]" alt="" />
          </div>
          <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small">
            <select
              id={`${idPrefix}-endYear`}
              value={endYear}
              onChange={handleEndYearChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
              className="w-[79px] outline-none"
            >
              <option value="Year" disabled hidden>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year} className="px-4 py-2">
                  {year}
                </option>
              ))}
            </select>
            <img src="/images/down_arrow.png" className="h-[20px] w-[20px]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
