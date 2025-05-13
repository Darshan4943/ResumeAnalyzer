import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { plans } from "../../../../../utils/data";
import MiniLoader from "../../../../common/miniLoader";

function Summary({ limits, selectedPlan, isActive, loading, setLoading }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [progress1, setProgress1] = useState(0);
  console.log(progress, progress1);
  const [daysRemaing, setDaysRemaing] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 70);
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 70);
  const [circumference1, setCircumference1] = useState(Math.PI * 90);
  const [dashOffset1, setDashOffset1] = useState(2 * Math.PI * 70);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [activePlanIndex, setActivePlanIndex] = useState();
  const [isFree, setIsFree] = useState();
  const [aiHitMonthly, setAiHitMonthly] = useState(0);
  const [aiHitMonthlyLimit, setAiHitMonthlyLimit] = useState(0);
  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));
    setActivePlanIndex(activePlan);
    const icon = localStorage.getItem("icon");
    setexchangeRate(exchangeRate);
    seticon(icon);
    const isFree = JSON.parse(localStorage.getItem("isFree"));
    setIsFree(isFree);
  }, []);
  const getLimits = () => {
    const aiHitMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
    setAiHitMonthly(aiHitMonthly);

    const aiHitMonthlyLimit = JSON.parse(
      localStorage.getItem("aiHitsMonthlyLimit")
    );
    setProgress1(100 - (aiHitMonthly * 100) / aiHitMonthlyLimit);
    setAiHitMonthlyLimit(aiHitMonthlyLimit);
    const activePlan = JSON.parse(localStorage.getItem("planActive"));
  };
  useEffect(() => {
    getLimits();
  }, []);

  const calculateOverallPercentage = (used, total) => {
    let totalUsed = 0;
    let totalLimit = 0;
    for (const category in used) {
      totalUsed += used[category];
      totalLimit += total[category];
    }
    const percentage = (totalUsed / totalLimit) * 100;

    return percentage.toFixed(2);
  };

  useEffect(() => {
    const dashOffset = circumference - (progress / 100) * circumference;

    if (dashOffset != "NaN") {
      setDashOffset(dashOffset);
    }
  }, [circumference, progress]);
  useEffect(() => {
    const dashOffset = circumference1 - (progress1 / 100) * circumference1;

    if (dashOffset != "NaN") {
      setDashOffset1(dashOffset);
    }
  }, [circumference1, progress1]);

  const calculateDaysRemaining = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceMs = end - today;
    const remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return remainingDays <= 0 ? 0 : remainingDays;
  };

  useEffect(() => {
    if (userDataGlobal) {
      axios
        .get(
          "http://192.168.1.208:2000/api/subscription/" +
          userDataGlobal?._id
        )
        .then((res) => {
          const result = res.data.findIsActive;

          if (result.startDate) {
            setDaysRemaing(
              calculateDaysRemaining(result.startDate, result.endDate)
            );
            setProgress(
              (calculateDaysRemaining(result.startDate, result.endDate) /
                selectedPlan?.days) *
              100
            );
          }
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, [userDataGlobal, selectedPlan]);

  const radius = 90;
  const centerX = 100;
  const centerY = 90;
  const startAngle = Math.PI;
  const endAngle = Math.PI + (progress1 / 100) * Math.PI;

  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY + radius * Math.sin(endAngle);
  return (
    <>
      {!loading ? (
        <div className="flex flex-col gap-1">
          <p className="text-[18px] font-[600] pb-2"> Usage Summary</p>

          <div className="bg-[#FFFFFF] rounded-[16px] p-3 scr540:p-[24px] flex flex-col gap-[16px] w-full">
            <div className="text-[14px] font-[500]">Credit balance</div>
            <div className="flex scr1024:flex-row flex-col gap-4 scr540:gap-5 w-full justify-between items-center ">
              <div className="flex flex-col gap-4 border-[1px] border-[#DEDEDE] rounded-[12px] p-[20px] w-full scr540:w-[300px] min-w-[275px] ">
                <div className="text-[16px] font-[500]">
                  Plan Validity Day’s Overview
                </div>
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
                      strokeDasharray={(isActive = 2 * Math.PI * 70)}
                      strokeDashoffset={
                        isActive ? dashOffset : 2 * Math.PI * 70
                      }
                    />
                  </svg>

                  <div
                    className="absolute flex flex-col  items-center justify-center text-[18px] font-semibold bg-white w-[110px] h-[110px] rounded-full"
                    style={{ boxShadow: "0px 0px 2px 0px #00000040" }}
                  >
                    {isActive ? daysRemaing : "0"} days
                    <p className="text-[12px] font-medium">Remaining</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center text-[12px] font-medium">
                  <div className="flex gap-2 items-center">
                    Remaining Day’s
                    <div className="w-[16px] h-[16px] rounded-[2px] bg-blue"></div>
                  </div>
                  <div className="flex gap-2 items-center">
                    Used Day’s
                    <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DEDEDE]"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 border-[1px] border-[#DEDEDE] rounded-[12px] p-[20px] justify-center relative w-full scr540:w-[390px]">
                <div className="text-[16px] font-[500]">AI Hits Overview</div>

                <svg className="w-[250px] scr420:w-[300px]" width="300" height="200" viewBox="0 0 200 100">
                  <path
                    d="M 10,90 A 90,90 0 0,1 190,90"
                    stroke="#D0CDFF"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <path
                    d="M 10,90 A 90,90 0 0,1 190,90"
                    stroke="#4C43CD"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference1}
                    strokeDashoffset={dashOffset1}
                  />
                  <defs>
                    <filter id="lighterShadow" x="-60%" y="-120%" width="400%" height="400%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
                      <feOffset dx="0" dy="4" result="offsetblur" />
                      <feFlood floodColor="#0D0A2C" floodOpacity="1" />
                      <feComposite in2="offsetblur" operator="in" />
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx={endX} cy={endY} r="8" fill="#4C43CD" stroke="white" strokeWidth="3"  />
                </svg>

                <div className="absolute bottom-[60px] flex flex-col gap-2 text-center text-[14px] font-normal">
                  <div className="text-black text-[24px] font-bold">
                    {progress1}%
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="bg-[#4C43CD] w-4 h-4 rounded-[2px]"></div>
                    Remaining AI Hits:{" "}
                    <span className="text-[13px] font-semibold">
                      {aiHitMonthlyLimit - aiHitMonthly}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <div className="bg-[#D0CDFF] w-4 h-4 rounded-[2px]"></div>
                    Total AI Hits:{" "}
                    <span className=" text-[13px] font-semibold">
                      {" "}
                      {aiHitMonthlyLimit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-[#F3F3F3] w-full scr540:w-[462px] h-[284px] justify-center rounded-[12px] gap-4">
                {isActive ? (
                  <div className="flex flex-col justify-center items-center gap-2 flex-wrap ">
                    {isFree ? (
                      <p className="ml:text-[2vw] font-[700] text-[24px] text-center">
                        {" "}
                        Free
                      </p>
                    ) : (
                      <div className="flex flex-row gap-2 w-full items-center justify-center">
                        <p className="ml:text-[2vw] font-[700] text-[24px] leading-tight">
                          {icon}
                        </p>
                        <p className="ml:text-[2vw] font-[700] text-[24px] leading-tight">
                          {Math.ceil(selectedPlan?.amount * exchangeRate)}
                        </p>
                      </div>
                    )}
                    <p className="text-[12px] font-medium text-wrap text-center">
                      Your Plan Validity is {selectedPlan?.days} Days
                    </p>

                    {aiHitMonthly >= aiHitMonthlyLimit && (
                      <button
                        onClick={() => router.push("/purchase/plans")}
                        className="px-6 h-[38px] bg_Button rounded-[30px] "
                      >
                        Upgrade Plan
                      </button>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => router.push("/purchase/plans")}
                    className="bg_Button flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                  >
                    Purchase Plan
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full bg-[#F9F9F9] rounded-[16px]">
          <MiniLoader />
        </div>
      )}
    </>
  );
}

export default Summary;
