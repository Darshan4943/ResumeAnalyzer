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
  const userDataGlobal = useSelector((state) => state.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 70);
  // const circumference = 2 * Math.PI * 70;
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 70);

  // const dashOffset = circumference - (progress / 100) * circumference;

  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [activePlanIndex, setActivePlanIndex] = useState()
  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const activePlan = JSON.parse(localStorage.getItem("activePlan"));
    setActivePlanIndex(activePlan)
    const icon = localStorage.getItem("icon");
    setexchangeRate(exchangeRate);
    seticon(icon);
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
        .get("http://localhost:2000/api/subscription/" + userDataGlobal._id)
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
        <div className="bg-[#F9F9F9] rounded-[16px] p-4 flex flex-col gap-2 w-full">
          <p className="text-[18px] font-semibold "> Usage Summary</p>

          <div className="flex xxlg:flex-row flex-col xxlg:gap-4 gap-6">
            <div className="flex flex-col gap-3 xxlg:w-[50%] w-full">
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
                        strokeDasharray={
                          isActive ? circumference : 2 * Math.PI * 70
                        }
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
                <div className="flex flex-col gap-4">
                  {isActive ? (
                    <div className="">
                      {activePlanIndex === 1 ?
                        <p className="ml:text-[2vw] font-[700] text-[24px] text-center"> Free</p> 
                        :
                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                          <p className="ml:text-[2vw] font-[700] text-[24px]">
                            {icon}
                          </p>
                          <p className="ml:text-[2vw] font-[700] text-[24px]">
                            {Math.ceil(selectedPlan?.amount * exchangeRate)}
                          </p>
                        </div>
                      }
                      <p className="text-[12px] font-medium">
                        Your Plan Validity is {selectedPlan?.days} Days
                      </p>
                      {(limits.used.resumeUploded >= limits.total.resumeUplodedLimit ||
                        limits.used.resumeStored >= limits.total.resumeStoredLimit ) && (
                          <div
                            onClick={() => router.push("/purchase/plans")}
                            className=" mt-4 btn_hover_effect flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                          >
                            Upgrade Plan
                          </div>
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
            <div className="xxlg:hidden w-full h-[1px] bg-[#DEDEDE]"></div>
            <div className="flex flex-col gap-5  xxlg:w-[50%] w-full">
              <p className="font-medium">Available services</p>
              <div className="flex flex-col gap-8 scr420:text-[14px] text-[12px] font-medium ">
                <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                  <p className=" scr420:min-w-[164px] min-w-[140px]">
                    {" "}
                    Total Uploads
                  </p>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                      <div
                        style={{
                          width: `${ isActive ? Math.round(
                            ((limits.used.resumeUploded * 100) /
                              limits.total.resumeUplodedLimit)
                          ) :0 }%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    {/* <div className="scr420:min-w-[55px] min-w-[45px]">
                      {isActive
                        ? `${limits.total.uploads - uploadsRemaining}/${activePlanIndex === 1 ? "∞" : limits.total.uploads
                        }`
                        : "0/0"}
                    </div> */}

                    <div className="scr420:min-w-[55px] min-w-[45px] flex items-center">
                      {isActive ? (
                        <>
                          {limits.used.resumeUploded}/
                          {/* {activePlanIndex === 1 ? (
                            <svg width="19" height="16" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.81827 0.957386C3.07395 0.957386 3.30833 0.995265 3.5214 1.07102C3.73683 1.14441 3.93096 1.24148 4.10378 1.36222C4.27897 1.48059 4.43285 1.60606 4.56543 1.73864C4.65066 1.81676 4.72878 1.89725 4.7998 1.98011C4.87319 2.06297 4.94185 2.14347 5.00577 2.22159C5.06259 2.14347 5.12296 2.06652 5.18688 1.99077C5.2508 1.91501 5.33248 1.83097 5.43191 1.73864C5.63077 1.53977 5.8758 1.35985 6.16699 1.19886C6.46055 1.03788 6.80265 0.957386 7.19327 0.957386C7.55312 0.957386 7.87982 1.04498 8.17338 1.22017C8.46931 1.39299 8.70369 1.62737 8.87651 1.9233C9.0517 2.21686 9.13929 2.54356 9.13929 2.90341C9.13929 3.17566 9.08839 3.43134 8.98659 3.67045C8.88716 3.9072 8.74867 4.11553 8.57111 4.29545C8.39355 4.47301 8.18641 4.61269 7.94966 4.71449C7.71529 4.81392 7.46316 4.86364 7.19327 4.86364C6.93285 4.86364 6.69374 4.82694 6.47594 4.75355C6.26051 4.67779 6.06519 4.58191 5.89 4.46591C5.71718 4.34754 5.56448 4.22443 5.43191 4.09659C5.34668 4.01136 5.26855 3.92732 5.19753 3.84446C5.12651 3.75923 5.06259 3.67756 5.00577 3.59943C4.94185 3.67756 4.87319 3.75923 4.7998 3.84446C4.72878 3.92732 4.65066 4.01136 4.56543 4.09659C4.43285 4.22443 4.27897 4.34754 4.10378 4.46591C3.93096 4.58191 3.73683 4.67779 3.5214 4.75355C3.30833 4.82694 3.07395 4.86364 2.81827 4.86364C2.45369 4.86364 2.12343 4.77604 1.8275 4.60085C1.53158 4.42566 1.29602 4.1901 1.12083 3.89418C0.945638 3.59825 0.858043 3.26799 0.858043 2.90341C0.858043 2.63352 0.907759 2.38139 1.00719 2.14702C1.10899 1.91027 1.24867 1.70312 1.42623 1.52557C1.60615 1.34801 1.81448 1.20952 2.05123 1.11009C2.29034 1.00829 2.54602 0.957386 2.81827 0.957386ZM1.6677 2.90341C1.6677 3.11648 1.7186 3.31061 1.8204 3.4858C1.92457 3.65862 2.06306 3.79711 2.23588 3.90128C2.41107 4.00308 2.6052 4.05398 2.81827 4.05398C3.05265 4.05398 3.2669 4.00071 3.46103 3.89418C3.65516 3.78764 3.8339 3.65625 3.99725 3.5C4.10378 3.39347 4.1973 3.29048 4.27779 3.19105C4.35828 3.09162 4.43049 2.99574 4.49441 2.90341C4.43049 2.81818 4.35946 2.72704 4.28134 2.62997C4.20558 2.53054 4.11088 2.42756 3.99725 2.32102C3.841 2.16477 3.66344 2.03338 3.46458 1.92685C3.26808 1.82031 3.05265 1.76705 2.81827 1.76705C2.6052 1.76705 2.41107 1.81913 2.23588 1.9233C2.06306 2.02509 1.92457 2.16241 1.8204 2.33523C1.7186 2.50568 1.6677 2.69508 1.6677 2.90341ZM8.32963 2.90341C8.32963 2.69508 8.27755 2.50568 8.17338 2.33523C8.07159 2.16241 7.93427 2.02509 7.76145 1.9233C7.591 1.81913 7.4016 1.76705 7.19327 1.76705C7.03229 1.76705 6.88077 1.7919 6.73873 1.84162C6.59668 1.88897 6.4641 1.95526 6.341 2.04048C6.21789 2.12334 6.10426 2.21686 6.00009 2.32102C5.87225 2.44176 5.76571 2.55895 5.68049 2.67259C5.59763 2.78385 5.53844 2.8608 5.50293 2.90341C5.56685 2.99574 5.63906 3.09162 5.71955 3.19105C5.80004 3.29048 5.89355 3.39347 6.00009 3.5C6.16344 3.65625 6.34218 3.78764 6.53631 3.89418C6.73281 4.00071 6.95179 4.05398 7.19327 4.05398C7.4016 4.05398 7.591 4.00308 7.76145 3.90128C7.93427 3.79711 8.07159 3.65862 8.17338 3.4858C8.27755 3.31061 8.32963 3.11648 8.32963 2.90341Z" fill="#333333" />
                            </svg>


                          ) : ( */}
                          {  limits.total.resumeUplodedLimit}
                          {/* )} */}
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
                    Total Save/Downloads
                  </p>
                  <div className="flex w-full items-center gap-4">
                    <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                      <div
                        style={{
                          width: `${ isActive ? Math.round(
                            ((limits.used.resumeStored * 100) /
                              limits.total.resumeStoredLimit)
                           ) : 0}% `,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[55px] min-w-[45px] flex items-center">
                      {isActive ? (
                        <>
                          {limits.used.resumeStored}/
                          {/* {activePlanIndex === 1 ? (
                            <svg width="19" height="16" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.81827 0.957386C3.07395 0.957386 3.30833 0.995265 3.5214 1.07102C3.73683 1.14441 3.93096 1.24148 4.10378 1.36222C4.27897 1.48059 4.43285 1.60606 4.56543 1.73864C4.65066 1.81676 4.72878 1.89725 4.7998 1.98011C4.87319 2.06297 4.94185 2.14347 5.00577 2.22159C5.06259 2.14347 5.12296 2.06652 5.18688 1.99077C5.2508 1.91501 5.33248 1.83097 5.43191 1.73864C5.63077 1.53977 5.8758 1.35985 6.16699 1.19886C6.46055 1.03788 6.80265 0.957386 7.19327 0.957386C7.55312 0.957386 7.87982 1.04498 8.17338 1.22017C8.46931 1.39299 8.70369 1.62737 8.87651 1.9233C9.0517 2.21686 9.13929 2.54356 9.13929 2.90341C9.13929 3.17566 9.08839 3.43134 8.98659 3.67045C8.88716 3.9072 8.74867 4.11553 8.57111 4.29545C8.39355 4.47301 8.18641 4.61269 7.94966 4.71449C7.71529 4.81392 7.46316 4.86364 7.19327 4.86364C6.93285 4.86364 6.69374 4.82694 6.47594 4.75355C6.26051 4.67779 6.06519 4.58191 5.89 4.46591C5.71718 4.34754 5.56448 4.22443 5.43191 4.09659C5.34668 4.01136 5.26855 3.92732 5.19753 3.84446C5.12651 3.75923 5.06259 3.67756 5.00577 3.59943C4.94185 3.67756 4.87319 3.75923 4.7998 3.84446C4.72878 3.92732 4.65066 4.01136 4.56543 4.09659C4.43285 4.22443 4.27897 4.34754 4.10378 4.46591C3.93096 4.58191 3.73683 4.67779 3.5214 4.75355C3.30833 4.82694 3.07395 4.86364 2.81827 4.86364C2.45369 4.86364 2.12343 4.77604 1.8275 4.60085C1.53158 4.42566 1.29602 4.1901 1.12083 3.89418C0.945638 3.59825 0.858043 3.26799 0.858043 2.90341C0.858043 2.63352 0.907759 2.38139 1.00719 2.14702C1.10899 1.91027 1.24867 1.70312 1.42623 1.52557C1.60615 1.34801 1.81448 1.20952 2.05123 1.11009C2.29034 1.00829 2.54602 0.957386 2.81827 0.957386ZM1.6677 2.90341C1.6677 3.11648 1.7186 3.31061 1.8204 3.4858C1.92457 3.65862 2.06306 3.79711 2.23588 3.90128C2.41107 4.00308 2.6052 4.05398 2.81827 4.05398C3.05265 4.05398 3.2669 4.00071 3.46103 3.89418C3.65516 3.78764 3.8339 3.65625 3.99725 3.5C4.10378 3.39347 4.1973 3.29048 4.27779 3.19105C4.35828 3.09162 4.43049 2.99574 4.49441 2.90341C4.43049 2.81818 4.35946 2.72704 4.28134 2.62997C4.20558 2.53054 4.11088 2.42756 3.99725 2.32102C3.841 2.16477 3.66344 2.03338 3.46458 1.92685C3.26808 1.82031 3.05265 1.76705 2.81827 1.76705C2.6052 1.76705 2.41107 1.81913 2.23588 1.9233C2.06306 2.02509 1.92457 2.16241 1.8204 2.33523C1.7186 2.50568 1.6677 2.69508 1.6677 2.90341ZM8.32963 2.90341C8.32963 2.69508 8.27755 2.50568 8.17338 2.33523C8.07159 2.16241 7.93427 2.02509 7.76145 1.9233C7.591 1.81913 7.4016 1.76705 7.19327 1.76705C7.03229 1.76705 6.88077 1.7919 6.73873 1.84162C6.59668 1.88897 6.4641 1.95526 6.341 2.04048C6.21789 2.12334 6.10426 2.21686 6.00009 2.32102C5.87225 2.44176 5.76571 2.55895 5.68049 2.67259C5.59763 2.78385 5.53844 2.8608 5.50293 2.90341C5.56685 2.99574 5.63906 3.09162 5.71955 3.19105C5.80004 3.29048 5.89355 3.39347 6.00009 3.5C6.16344 3.65625 6.34218 3.78764 6.53631 3.89418C6.73281 4.00071 6.95179 4.05398 7.19327 4.05398C7.4016 4.05398 7.591 4.00308 7.76145 3.90128C7.93427 3.79711 8.07159 3.65862 8.17338 3.4858C8.27755 3.31061 8.32963 3.11648 8.32963 2.90341Z" fill="#333333" />
                            </svg>


                          ) : ( */}
                          {limits.total.resumeStoredLimit}
                          {/* )} */}
                        </>
                      ) : (
                        "0/0"
                      )}
                    </div>

                  </div>
                </div>

                {/* <div className="flex gap-4 items-center">
              <p className="scr420:min-w-[164px] min-w-[140px]">
                Total Save/Downloads
              </p>
              <div className="relative  w-[45%]  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                <div
                  className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                  style={{
                    width: `${Math.round(
                      ((limits.total.download - downloadsRemaining) /
                        limits.total.download) *
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="scr420:min-w-[55px] min-w-[45px]">
                {" "}
                {limits.total.download - downloadsRemaining}/
                {limits.total.download}
              </p>
            </div> */}

                {userDataGlobal?.role != "user" && (
                  <div className="flex flex-col scr460:flex-row gap-[4px] scr460:items-center">
                    <p className=" scr420:min-w-[164px] min-w-[140px]">
                      {" "}
                      Total Clients
                    </p>
                    <div className="flex w-full items-center gap-4">
                      <div className="relative  w-full  h-[10px] bg-[#DEDEDE] rounded-[6px]">
                        <div
                          style={{
                            width: `${ isActive ? Math.round(
                              ((limits.used.clientStoredLimit * 100) /
                              limits.total.clientStored)
                            ):0}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[55px] min-w-[45px]">
                        {isActive ? (
                          <>
                            {limits.used.clientStoredL}/
                            {limits.total.clientStoredimit}{" "}
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
