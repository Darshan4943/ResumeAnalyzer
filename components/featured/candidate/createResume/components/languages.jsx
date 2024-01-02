import React from "react";

const Languages = ({
  languages,
  deleteLanguages,
  renderStarsLanguages,
  currentLanguages,
  handleInputChangeLanguages,
  addLanguages,
}) => {
  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-lg bg-white"
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full text-[20px] font-montserrat  font-medium">
          Languages
        </div>
        <div className="flex flex-col gap-4">
          {languages.map((languages, index) => (
            <div key={index} className="flex gap-4 justify-between">
              <div className="flex gap-1 px-3 py-2 border border-[#06A9EF] rounded-[24px] justify-between items-center">
                <p className="text-[14px] font-medium">{languages.languages}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => deleteLanguages(index)}
                >
                  <g mask="url(#mask0_5716_136486)">
                    <path
                      d="M6.0625 15L5 13.9375L8.9375 10L5 6.0625L6.0625 5L10 8.9375L13.9375 5L15 6.0625L11.0625 10L15 13.9375L13.9375 15L10 11.0625L6.0625 15Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex border w-[50%] border-[#DEDEDE] px-4 py-2 rounded-[8px] gap-4">
                {renderStarsLanguages(index)}
                <p>
                  {languages.rating[2] !== 0
                    ? "Expert"
                    : languages.rating[1] !== 0
                    ? "Proficient"
                    : "Beginner"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px]  p-[12px] ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your skills"
            className="w-full text-[14px] font-montserrat font-small"
            value={currentLanguages}
            onChange={handleInputChangeLanguages}
          />
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
              Update to Profile
            </button>
            <button
              onClick={addLanguages}
              className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
