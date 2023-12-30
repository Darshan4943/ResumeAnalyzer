import React from "react";

const DateSelector = ({
  idPrefix,
  educationDetails,
  setEducationDetails,
}) => {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 11 }, (_, index) => 2020 + index);

  const handleStartMonthChange = (e, index) => {
    setEducationDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        startMonth: e.target.value,
      };
      return updatedDetails;
    });
  };

  const handleStartYearChange = (e, index) => {
    setEducationDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        startYear: e.target.value,
      };
      return updatedDetails;
    });
  };

  const handleEndMonthChange = (e, index) => {
    setEducationDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        endMonth: e.target.value,
      };
      return updatedDetails;
    });
  };

  const handleEndYearChange = (e, index) => {
    setEducationDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        endYear: e.target.value,
      };
      return updatedDetails;
    });
  };

  return (
    <div>
      {educationDetails.map((detail, index) => (
        <div key={index} className="flex gap-[12px]">
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor={`${idPrefix}-startMonth-${index}`}>
                Start Date
              </label>
            </div>
            <div className="flex gap-4">
              <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small">
                <select
                  id={`${idPrefix}-startMonth-${index}`}
                  value={detail.startMonth}
                  onChange={(e) => handleStartMonthChange(e, index)}
                  className="w-[79px] outline-none"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                >
                  <option value="Month" disabled hidden>
                    Month
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month} className="px-4 py-2">
                      {new Date(0, month - 1).toLocaleString("en", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <img
                  src="./images/services/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>

              <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small">
                <select
                  id={`${idPrefix}-startYear-${index}`}
                  value={detail.startYear}
                  onChange={(e) => handleStartYearChange(e, index)}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
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
                <img
                  src="./images/services/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor={`${idPrefix}-endMonth-${index}`}>End Date</label>
            </div>
            <div className="flex gap-4">
              <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small">
                <select
                  id={`${idPrefix}-endMonth-${index}`}
                  value={detail.endMonth}
                  onChange={(e) => handleEndMonthChange(e, index)}
                  className="w-[79px] outline-none"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
                >
                  <option value="Month" disabled hidden>
                    Month
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month} className="px-4 py-2">
                      {new Date(0, month - 1).toLocaleString("en", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <img
                  src="./images/services/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>
              <div className="flex p-2 items-center rounded-lg border border-[#646464] bg-white text-[14px] font-montserrat font-small">
                <select
                  id={`${idPrefix}-endYear-${index}`}
                  value={detail.endYear}
                  onChange={(e) => handleEndYearChange(e, index)}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                  }}
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
                <img
                  src="./images/services/down_arrow.png"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
