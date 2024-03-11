import React, { useState } from "react";

const DateSelector = ({ idPrefix, dataSeter, data }) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  // const years = Array.from({ length: 11 }, (_, index) => 2020 + index);
  // const years = Array.from({ length: 40 }, (_, index) => 2020 + index);

  const handleStartMonthChange = (e) => {
    dataSeter({
      ...data,
      duration: {
        ...data.duration,
        start: { ...data.duration?.start, month: e.target.value },
      },
    });
  };

  const handleStartYearChange = (e) => {
    dataSeter({
      ...data,
      duration: {
        ...data.duration,
        start: { ...data.duration?.start, year: e.target.value },
      },
    });
  };

  const handleEndMonthChange = (e) => {
    dataSeter({
      ...data,
      duration: {
        ...data.duration,
        end: { ...data.duration?.end, month: e.target.value },
      },
    });
  };

  const handleEndYearChange = (e) => {
    console.log(e.target.value);
    dataSeter({
      ...data,
      duration: {
        ...data.duration,
        end: { ...data.duration?.end, year: e.target.value },
      },
    });
  };
  function getYear() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;

    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  }

  return (
    <div className="flex gap-[14px] flex_column">
      <div className="flex flex-col gap-2">
        <div>
          <label
            className="w-full flex gap-2 text-[12px] font-montserrat  font-medium"
            htmlFor={`${idPrefix}-startMonth`}
          >
            Start Date
          </label>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small relative min-w-[130px] w-full overflow-hidden relative">
            <select
              id={`${idPrefix}-startMonth`}
              value={data?.duration?.start?.month}
              onChange={handleStartMonthChange}
              className="w-outline-none focus-visible:outline-none  p-2 w-full "
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                position: "relative",
                zIndex: 1,
                background: " transparent",
              }}
            >
              <option value="" className="px-4  text-[14px] py-2">
                Month
              </option>

              {months.map((month) => (
                <option
                  key={month}
                  value={month}
                  className="px-4 text-[14px] py-2"
                >
                  {new Date(0, month - 1).toLocaleString("en", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>

            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px] absolute right-[4px]"
              alt=""
            />
          </div>

          <div className="flex items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] w-full overflow-hidden">
            <select
              id={`${idPrefix}-startYear`}
              value={data?.duration?.start?.year}
              onChange={handleStartYearChange}
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                position: "relative",
                zIndex: 1,
                background: " transparent",
              }}
              className="w-outline-none focus-visible:outline-none  p-2 w-full"
            >
              <option value="" className="px-4  text-[14px] py-2">
                Year
              </option>
              {getYear().map((year) => (
                <option
                  key={year}
                  value={year}
                  className="mt-4 text-[14px] px-4 py-2"
                >
                  {year}
                </option>
              ))}
            </select>

            <img
              src="/images/down_arrow.png"
              className="h-[20px] w-[20px] absolute right-[4px]"
              alt=""
            />
          </div>
        </div>
      </div>
      {!data.currentlyWorking && (
        <div className="flex flex-col gap-2">
          <div>
            <label
              className="w-full flex gap-2 text-[12px] font-montserrat  font-medium"
              htmlFor={`${idPrefix}-endMonth`}
            >
              End Date
            </label>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] w-full overflow-hidden">
              <select
                id={`${idPrefix}-endMonth`}
                value={data?.duration?.end?.month}
                onChange={handleEndMonthChange}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  position: "relative",
                  zIndex: 1,
                  background: " transparent",
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full"
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month} className="px-4 py-2">
                    {new Date(0, month - 1).toLocaleString("en", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px] absolute right-[4px]"
                alt=""
              />
            </div>
            <div className="flex items-center rounded-lg border border-[#646464] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] w-full overflow-hidden">
              <select
                id={`${idPrefix}-endYear`}
                value={data?.duration?.end?.year}
                onChange={handleEndYearChange}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  position: "relative",
                  zIndex: 1,
                  background: " transparent",
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full"
              >
                <option value="">Year</option>
                {getYear().map((year) => (
                  <option key={year} value={year} className="px-4 py-2">
                    {year}
                  </option>
                ))}
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px] absolute right-[4px]"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
