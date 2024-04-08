import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Summary({ limits, selectedPlan }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [daysRemaing,setDaysRemaing] = useState(0);
  const userDataGlobal = useSelector((state) => state.userData);
  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (progress / 100) * circumference;
  const calculateOverallPercentage = (used, total) => {
    let totalUsed = 0;
    let totalLimit = 0;

    // Sum up used and total limits for each category
    for (const category in used) {
      totalUsed += used[category];
      totalLimit += total[category];
    }
    const percentage = (totalUsed / totalLimit) * 100;
    return percentage.toFixed(2);
  };

  useEffect(() => {
    const overallPercentage = calculateOverallPercentage(
      limits.used,
      limits.total
    );

    if (overallPercentage != "NaN") {
      setProgress(overallPercentage);
    }
  }, []);
  const calculateDaysRemaining = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceMs = end - start;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return differenceDays;
  };
  useEffect(() => {
    if (userDataGlobal) {
      axios
        .get(
          "https://freedygoservices.in/api/subscription/" + userDataGlobal._id
        )
        .then((res) => {
          const result = res.data.data;
          if (result.startDate) {
            console.log((calculateDaysRemaining(result.startDate, result.endDate) /
            selectedPlan.days) *
            100)
            setProgress(
              (calculateDaysRemaining(result.startDate, result.endDate) /
                selectedPlan.days) *
                100
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, selectedPlan]);
  return (
    <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col gap-2 w-full">
      <p className="text-[18px] font-semibold "> Usage Summary</p>

      <div className="flex xxlg:flex-row flex-col xxlg:gap-4 gap-6">
        <div className="flex flex-col gap-3 xxlg:w-[50%] w-full">
          <p className="font-medium">Credit balance</p>
          <div className="flex scr420:flex-row flex-col scr1400:gap-12 xxlg:gap-4 gap-12 items-center justify-center ">
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center justify-center">
                <svg className="transform rotate-270 w-[160px] h-[160px]">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#DEDEDE"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#06A9EF"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                  />
                </svg>

                <div
                  className="absolute flex flex-col  items-center justify-center text-[18px] font-semibold bg-white w-[110px] h-[110px] rounded-full"
                  style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
                >
                  {100 - progress} %
                  <p className="text-[12px] font-medium">Remaining</p>
                </div>
              </div>
              <div className="flex gap-4 items-center text-[12px] font-medium">
                <div className="flex gap-2 items-center">
                  Remaining
                  <div className="w-[16px] h-[16px] rounded-[2px] bg-blue"></div>
                </div>
                <div className="flex gap-2 items-center">
                  Used
                  <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DEDEDE]"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {selectedPlan ? (
                <div className="">
                  {" "}
                  <p className="text-[20px] font-medium">
                    $ {selectedPlan?.amount}
                  </p>{" "}
                  <p className="text-[12px] font-medium">
                    Your Plan Validity is 25 Days
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => router.push("/purchase/plans")}
                  className="flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                >
                  Purchase Plan
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="xxlg:hidden w-full h-[1px] bg-[#DEDEDE]"></div>
        <div className="flex flex-col gap-5  xxlg:w-[50%] w-full">
          <p className="font-medium">Available services</p>
          <div className="flex flex-col gap-8 scr420:text-[14px] text-[12px] font-medium ">
            <div className="flex gap-4 items-center">
              <p className=" min-w-[164px]"> Total Uploads</p>

              <div className="relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                <div
                  className={`absolute w-[${
                    (limits.used.uploads / limits.total.uploads) * 100
                  }%] h-[10px] bg-[#06A9EF] rounded-[6px]`}
                ></div>
              </div>
              <p className="min-w-[55px]">
                {limits.used.uploads}/{limits.total.uploads}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p className=" min-w-[164px]">Total Save/Downloads</p>

              <div className="relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                <div
                  className={`absolute w-[${Math.round(
                    (limits.used.download / limits.total.download) * 100
                  )}%] h-[10px] bg-[#06A9EF] rounded-[6px]`}
                ></div>
              </div>
              <p className="min-w-[55px]">
                {" "}
                {limits.used.download}/{limits.total.download}
              </p>
            </div>
            {userDataGlobal?.role != "user" && (
              <div className="flex gap-4 items-center">
                <p className=" min-w-[164px]">Total Clients</p>

                <div className="relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                  <div
                    className={`absolute w-[${
                      (limits.used.clients / limits.total.clients) * 100
                    }%] h-[10px] bg-[#06A9EF] rounded-[6px]`}
                  ></div>
                </div>
                <p className="min-w-[55px]">
                  {" "}
                  {limits.used.clients}/{limits.total.clients}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
