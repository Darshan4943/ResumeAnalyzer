import React from "react";

function HonorsAwards({ setAddAchivements }) {
  return (
    <>
      <div
        className=" p-[24px] bg-[#fff] rounded-[16px] flex flex-col gap-[16px]"
        style={{
          boxShadow: " 0px 1px 6px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex flex-col gap-[4px] w-full">
          <div className="flex gap-[16px] items-center">
            <div className="text-[24px] font-[500] text-[#25324B] w-[69.90%]">
              Add Honors & Awards
            </div>
            <div className="h-[1px]  bg-[#DEDEDE] flex items-center w-[63.07%]"></div>
            <svg
              className="hover:cursor-pointer"
              onClick={() => setAddAchivements(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_141042)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                  className="hover:cursor-pointer"
                />
              </g>
            </svg>
          </div>
          <div className="text-[14px] font-[400] text-[#646464] w-full">
            Add links to your Honors and Awards given for your work{" "}
          </div>
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Award title <span className="text-[#C00000]">*</span>
          </div>
          <input
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter award title"
            type="text"
            // value={data.url}
            name="  "
            // onChange={handleInputChange}
            id=""
          />
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">
            Awarded by <span className="text-[#C00000]">*</span>
          </div>
          <input
            className=" text-[14px] font-[400] text-[#646464] rounded-[8px] border-[1px] border-solid border-[#DEDEDE] w-full flex items-center justify-between py-[8px] px-[16px]"
            placeholder="Enter name of awarding entity"
            type="text"
            // value={data.url}
            name="url"
            // onChange={handleInputChange}
            id=""
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%]">
          <div className="text-[16px] font-[500]">
            Awarded by <span className="text-[#C00000]">*</span>
          </div>
          <div className="flex gap-[8px]">
            <div className="flex p-2 items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small w-[50%]">
              <select
                // value={cerficateData.issuedOn.month}
                // onChange={(e) =>
                //   setcertificateData({
                //     ...cerficateData,
                //     issuedOn: {
                //       ...cerficateData.issuedOn,
                //       month: e.target.value,
                //     },
                //   })
                // }
                className="w-full outline-none"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option value="Month" disabled hidden className="px-4 py-2">
                  Month
                </option>

                {/* {months.map((month) => (
                <option key={month} value={month} className="px-4 py-2">
                  {new Date(0, month - 1).toLocaleString("en", {
                    month: "long",
                  })}
                </option>
              ))} */}
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px]"
                alt=""
              />
            </div>
            <div className="flex p-2 items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small  w-[50%]">
              <select
                // value={cerficateData.issuedOn.year}
                // onChange={(e) =>
                //   setcertificateData({
                //     ...cerficateData,
                //     issuedOn: {
                //       ...cerficateData.issuedOn,
                //       year: e.target.value,
                //     },
                //   })
                // }
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
                className="w-full outline-none"
              >
                <option value="Year" disabled hidden>
                  Year
                </option>
                {/* {getYear().map((year) => (
                <option key={year} value={year} className="mt-4 px-4 py-2">
                  {year}
                </option>
              ))} */}
              </select>
              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px]"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col gap-[8px]">
          <div className="text-[16px] font-[500]">Description</div>
          <textarea
            className="border-solid border-#DEDEDE border-[1px] rounded-[8px] p-[12px] text-[14px] font-[400] text-[#646464]"
            placeholder="Describe about your Profile"
            name="discription"
            // value={data.discription}
            // onChange={handleInputChange}
          >
            {/* {data.discription} */}
          </textarea>
          <div className="text-[14px] font-[400] text-[#646464] flex justify-end">
            {/* {400 - data.discription.length} characters left */}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-[12px]">
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#333] text-[16px] font-[500] hover:cursor-pointer"
              onClick={() => setAddAchivements(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-[8px] py-[8px] px-[16px] border-[#06A9EF] border-solid border-[1px] text-[#fff] text-[16px] font-[500] bg-[#06A9EF] "
              // onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HonorsAwards;
