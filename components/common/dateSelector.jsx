import React, { useEffect, useState } from "react";

const DateSelector = ({
  idPrefix,
  dataSeter,
  data,
  fromCreate,
  isPursuingChecked,
  isRow,
}) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  // const years = Array.from({ length: 11 }, (_, index) => 2020 + index);
  // const years = Array.from({ length: 40 }, (_, index) => 2020 + index);
  const [isChecked, setIsChecked] = useState(true);
  const [isError, setIsError] = useState("");
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(currentYear);
  // const handleSwitchChange = () => {
  //   setIsChecked(!isChecked);
  // };
  console.log(data);

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
    const value = e.target.value;
    if (value) {
      setStartYear(e.target.value);
      dataSeter({
        ...data,
        duration: {
          ...data.duration,
          start: { ...data.duration?.start, year: e.target.value },
        },
      });
    }
    setIsError("required!");
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
    const newYear = e.target.value === "" ? "Year" : e.target.value;

    dataSeter({
      ...data,
      duration: {
        ...data.duration,
        end: { ...data.duration?.end, year: newYear },
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

  const getEndYear = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  // useEffect(() => {
  //   if (fromCreate) {
  //     setIsChecked(false);
  //   }
  // }, [fromCreate]);

  return (
    <div className="flex gap-[14px] flex-wrap relative w-full ">
      <div className={`flex gap-[14px] ${isRow ? "flex-col scr700:flex-row" : "flex-col"} w-full `}>
        <div
          className="flex flex-col gap-2 scr700:w-[50%] w-full "
          style={{ opacity: isChecked ? 1 : 0.5 }}
        >
          <div>
            <label
              className="w-full flex gap-2 text-[14px] font-montserrat  font-medium text-[#333]"
              htmlFor={`${idPrefix}-startMonth`}
            >
              {(idPrefix === "addCourse" || idPrefix === "addAchievement") ? "Issued On" : "Start Date"}
            </label>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small  min-w-[110px] w-full overflow-hidden relative">
              <select
                // disabled={!isChecked}
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
                <option value="" className="px-4  text-[12px] py-2">
                  Month
                </option>

                {months.map((month) => (
                  <option
                    key={month}
                    value={month}
                    className="px-4 text-[12px] py-2"
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

            <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] w-full overflow-hidden">
              <select
                id={`${idPrefix}-startYear`}
                disabled={!isChecked}
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
                <option value="" className="px-4  text-[12px] py-2">
                  Year
                </option>
                {getYear().map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="mt-4 text-[12px] px-4 py-2"
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

        {!data?.currentlyWorking && (
          <div
            className="flex flex-col gap-2  scr700:w-[50%] w-full"
            style={{ opacity: isChecked ? 1 : 0.5 }}
          >
            <div>
              <label
                className="w-full flex gap-2 text-[14px] font-montserrat  font-medium text-[#333]"
                htmlFor={`${idPrefix}-endMonth`}
              >
                {idPrefix === "addCourse" ? "Expiry On" : "End Date"}
              </label>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small relative min-w-[110px] w-full overflow-hidden">
                <select
                  id={`${idPrefix}-endMonth`}
                  // disabled={!isChecked}
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
              <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] w-full overflow-hidden">
                <select
                  id={`${idPrefix}-endYear`}
                  // disabled={!isChecked}
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
                  {/**{getYear()
                    .filter((item) => item > startYear)
                    .map((year) => (
                      <option key={year} value={year} className="px-4 py-2">
                        {console.log(98989, year)}
                      </option>
                    ))}*/}

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
        )}
      </div>
      {fromCreate && (
        <div className="flex flex-col gap-2 absolute right-0 top-[-6px] ">
          <div>
            {/* <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
