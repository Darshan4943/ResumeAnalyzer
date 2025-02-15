import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { plans } from "../../../../../utils/data";
import MiniLoader from "../../../../common/miniLoader";

function Summary({ limits, selectedPlan, isActive, loading, setLoading }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [daysRemaing, setDaysRemaing] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 70);
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 70);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [activePlanIndex, setActivePlanIndex] = useState();
  const [isFree, setIsFree] = useState();

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
        .get("https://dev.api.skilotech.com/api/subscription/" + userDataGlobal?._id)
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

  return (
    <>
      {!loading ? (
        <div className="bg-[#FFFFFF] rounded-[16px] p-[24px] flex flex-col gap-[16px] w-full">
          <p className="text-[18px] font-[600]"> Usage Summary</p>

          <div className="flex xxlg:flex-row flex-col xxlg:gap-4 gap-6 items-center">
            <div className="flex flex-col gap-3 xxlg:w-[50%] w-full">
              <div className="flex flex-col ">
                <div className="text-[14px] font-[500]">Credit balance</div>
                <div className="flex scr420:flex-row flex-col scr1400:gap-[80px]  gap-12 items-center  ">
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
                        Remaining
                        <div className="w-[16px] h-[16px] rounded-[2px] bg-blue"></div>
                      </div>
                      <div className="flex gap-2 items-center">
                        Used
                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DEDEDE]"></div>
                      </div>
                    </div>
                  </div>

                  <div className=" min-w-[1px] bg-[#DEDEDE] h-[192px]"></div>

                  <div className="flex flex-col gap-4">
                    {isActive ? (
                      <div className="">
                        {isFree ? (
                          <p className="ml:text-[2vw] font-[700] text-[24px] text-center">
                            {" "}
                            Free
                          </p>
                        ) : (
                          <div className="flex flex-row gap-2 w-full items-center justify-center">
                            <p className="ml:text-[2vw] font-[700] text-[24px]">
                              {icon}
                            </p>
                            <p className="ml:text-[2vw] font-[700] text-[24px]">
                              {Math.ceil(selectedPlan?.amount * exchangeRate)}
                            </p>
                          </div>
                        )}
                        <p className="text-[12px] font-medium">
                          Your Plan Validity is {selectedPlan?.days} Days
                        </p>
                        {userDataGlobal?.role === "user" && (
                          <>
                            {(limits.used.coverStored >=
                              limits.total.coverStoredLimit ||
                              limits.used.resumeStored >=
                                limits.total.resumeStoredLimit ||
                              limits.used.skillTest >=
                                limits.total.skillTestLimit ||
                              limits.used.skillCertified >=
                                limits.total.skillCertifiedLimit ||
                              limits.used.chatBot.monthly >=
                                limits.total.chatBotLimit.monthly) && (
                              <div
                                onClick={() => router.push("/purchase/plans")}
                                className=" mt-4 btn_hover_effect flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                              >
                                Upgrade Plan
                              </div>
                            )}
                          </>
                        )}
                        {userDataGlobal?.role === "recruiter" && (
                          <>
                            {(limits.used.coverStored >=
                              limits.total.coverStoredLimit ||
                              limits.used.resumeStored >=
                                limits.total.resumeStoredLimit ||
                              limits.used.chatBot.daily >=
                                limits.total.chatBotLimit.daily ||
                              limits.used.jdMatching.monthly >=
                                limits.total.jdMatchingLimit.monthly ||
                              limits.used.collectionStored.monthly >=
                                limits.total.collectionStoredLimit.monthly) && (
                              <div
                                onClick={() => router.push("/purchase/plans")}
                                className=" mt-4 btn_hover_effect flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                              >
                                Upgrade Plan
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => router.push("/purchase/plans")}
                        className="btn_hover_effect flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                      >
                        Purchase Plan
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            <div className="xxlg:hidden w-full h-[1px]  bg-[#DEDEDE]"></div>

            <div className="flex flex-col gap-5  xxlg:w-[50%] w-full">
              <p className="text-[16px] font-[500]">Available services</p>
              <div className="flex flex-col gap-5 scr420:text-[14px] text-[12px] font-medium  ">
                <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                  <p className=" scr420:min-w-[164px] min-w-[140px]">
                    {" "}
                    Cover Letter Creation
                  </p>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                      <div
                        style={{
                          width: `${
                            isActive
                              ? Math.round(
                                  (limits?.used?.coverStored * 100) /
                                    limits?.total?.coverStoredLimit
                                )
                              : 0
                          }%`,
                          maxWidth: `${Math.round(
                            (limits?.total?.coverStoredLimit * 100) /
                              limits?.total?.coverStoredLimit
                          )}%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                      {isActive ? (
                        <>
                          {limits.used.coverStored >
                          limits.total.coverStoredLimit
                            ? limits.total.coverStoredLimit
                            : limits.used.coverStored}
                          /{limits.total.coverStoredLimit}
                        </>
                      ) : (
                        "0/0"
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                  <p className=" scr420:min-w-[164px] min-w-[140px]">
                    {" "}
                    Resume Creation
                  </p>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                      <div
                        style={{
                          width: `${
                            isActive
                              ? Math.round(
                                  (limits?.used?.resumeStored * 100) /
                                    limits?.total?.resumeStoredLimit
                                )
                              : 0
                          }% `,
                          maxWidth: `${Math.round(
                            (limits?.total?.resumeStoredLimit * 100) /
                              limits?.total?.resumeStoredLimit
                          )}%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                      {isActive ? (
                        <>
                          {limits.used.resumeStored >
                          limits.total.resumeStoredLimit
                            ? limits.total.resumeStoredLimit
                            : limits.used.resumeStored}
                          /{limits.total.resumeStoredLimit}
                        </>
                      ) : (
                        "0/0"
                      )}
                    </div>
                  </div>
                </div>

                {userDataGlobal?.role === "user" && (
                  <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                    <p className=" scr420:min-w-[164px] min-w-[140px]">
                      {" "}
                      Skill Assessment
                    </p>
                    <div className="flex w-full items-center gap-4">
                      <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                        <div
                          style={{
                            width: `${
                              isActive
                                ? Math.round(
                                    (limits.used.skillTest * 100) /
                                      limits.total.skillTestLimit
                                  )
                                : 0
                            }% `,
                            maxWidth: `${Math.round(
                              (limits.total.skillTestLimit * 100) /
                                limits.total.skillTestLimit
                            )}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                        {isActive ? (
                          <>
                            {limits.used.skillTest > limits.total.skillTestLimit
                              ? limits.total.skillTestLimit
                              : limits.used.skillTest}
                            /{limits.total.skillTestLimit}
                          </>
                        ) : (
                          "0/0"
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {userDataGlobal?.role === "user" && (
                  <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                    <p className=" scr420:min-w-[164px] min-w-[140px]">
                      {" "}
                      Certification
                    </p>
                    <div className="flex w-full items-center gap-4">
                      <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                        <div
                          style={{
                            width: `${
                              isActive
                                ? Math.round(
                                    (limits.used.skillCertified * 100) /
                                      limits.total.skillCertifiedLimit
                                  )
                                : 0
                            }% `,
                            maxWidth: `${Math.round(
                              (limits.total.skillCertifiedLimit * 100) /
                                limits.total.skillCertifiedLimit
                            )}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                        {isActive ? (
                          <>
                            {limits.used.skillCertified >
                            limits.total.skillCertifiedLimit
                              ? limits.total.skillCertifiedLimit
                              : limits.used.skillCertified}
                            /{limits.total.skillCertifiedLimit}
                          </>
                        ) : (
                          "0/0"
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                  <p className=" scr420:min-w-[164px] min-w-[140px]">
                    {" "}
                    Chatbot
                  </p>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                      <div
                        style={{
                          width: `${
                            isActive
                              ? Math.round(
                                  (limits.used.chatBot.monthly * 100) /
                                    limits.total.chatBotLimit.monthly
                                )
                              : 0
                          }% `,
                          maxWidth: `${Math.round(
                            (limits?.total?.chatBotLimit?.monthly * 100) /
                              limits?.total?.chatBotLimit?.monthly
                          )}%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                      {isActive ? (
                        <>
                          {limits.used.chatBot.monthly >
                          limits.total.chatBotLimit.monthly
                            ? limits.total.chatBotLimit.monthly
                            : limits.used.chatBot.monthly}
                          /{limits.total.chatBotLimit.monthly}
                        </>
                      ) : (
                        "0/0"
                      )}
                    </div>
                  </div>
                </div>
                {userDataGlobal?.role === "recruiter" && (
                  <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                    <p className=" scr420:min-w-[164px] min-w-[140px]">
                      {" "}
                      Jd Matching
                    </p>
                    <div className="flex w-full items-center gap-4 ">
                      <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                        <div
                          style={{
                            width: `${
                              isActive
                                ? Math.round(
                                    (limits.used.jdMatching.monthly * 100) /
                                      limits.total.jdMatchingLimit.monthly
                                  )
                                : 0
                            }% `,
                            maxWidth: `${Math.round(
                              (limits.total.jdMatchingLimit.monthly * 100) /
                                limits.total.jdMatchingLimit.monthly
                            )}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                        {isActive ? (
                          <>
                            {limits.used.jdMatching.monthly >
                            limits.total.jdMatchingLimit.monthly
                              ? limits.total.jdMatchingLimit.monthly
                              : limits.used.jdMatching.monthly}
                            /{limits.total.jdMatchingLimit.monthly}
                          </>
                        ) : (
                          "0/0"
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {userDataGlobal?.role === "recruiter" && (
                  <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                    <p className=" scr420:min-w-[164px] min-w-[140px]">
                      {" "}
                      My Collection
                    </p>
                    <div className="flex w-full items-center gap-4">
                      <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px] overflow-hidden">
                        <div
                          style={{
                            width: `${
                              isActive
                                ? Math.round(
                                    (limits.used.collectionStored.monthly *
                                      100) /
                                      limits.total.collectionStoredLimit.monthly
                                  )
                                : 0
                            }% `,
                            maxWidth: `${Math.round(
                              (limits.total.collectionStoredLimit.monthly *
                                100) /
                                limits.total.collectionStoredLimit.monthly
                            )}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[85px] min-w-[70px] flex items-center">
                        {isActive ? (
                          <>
                            {limits.used.collectionStored.monthly >
                            limits.total.collectionStoredLimit.monthly
                              ? limits.total.collectionStoredLimit.monthly
                              : limits.used.collectionStored.monthly}
                            /{limits.total.collectionStoredLimit.monthly}
                          </>
                        ) : (
                          "0/0"
                        )}
                      </div>
                    </div>
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
