import React, { useEffect, useState } from "react";
import InternalJobMatching from "../../components/featured/jobMatching/internal";
import ExternalJobMatching from "../../components/featured/jobMatching/external";

const JobMatching = () => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <div className=" p-6 flex flex-col gap-6 min-h-[80vh] ">
      <div className=" font-semibold text-[24px]">Job Description Matching</div>

      <div className="relative">
        <div
          className="absolute top-[0px]"
          style={{
            width: "fit-content",
          }}
        >
          <button
            onClick={() => setTabIndex(1)}
            style={{
              borderRadius:
                tabIndex == 1 ? "12px 0px 0px 0px" : "12px 0px 0px 0px",
              boxShadow: "rgb(84 84 84 / 19%) -3px -2px 4px -1px",
              borderBottom: `1px solid ${
                tabIndex == 1 ? "#06A9EF" : "#c7c7c7"
              } `,
            }}
            className={`px-4 py-3 ${
              tabIndex == 1
                ? " bg-[#06A9EF] text-white"
                : " text-black bg-[#fff]"
            }  text-[16px]  font-semibold w-[166px]`}
          >
            Internal
          </button>
          <button
            onClick={() => setTabIndex(2)}
            style={{
              borderRadius:
                tabIndex == 2 ? "0px 12px 0px 0px" : "0px 12px 0px 0px",
              boxShadow: "rgb(84 84 84 / 19%) 2px -2px 4px -1px",
              borderBottom: `1px solid ${
                tabIndex == 2 ? "#06A9EF" : "#c7c7c7"
              } `,
            }}
            className={`px-4 py-3 ${
              tabIndex == 2
                ? " bg-[#06A9EF] text-white"
                : " text-black bg-[#fff]"
            } text-[16px] font-semibold  w-[166px]`}
          >
            External
          </button>
        </div>
        <div className="mt-[48px]">
          {tabIndex == 1 ? <InternalJobMatching /> : <ExternalJobMatching />}
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
