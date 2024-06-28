import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { plans } from "../../../../../utils/data";
import MiniLoader from "../../../../common/miniLoader";

function Summary({ limits, selectedPlan, isActive }) {

  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [daysRemaing, setDaysRemaing] = useState(0);
  const userDataGlobal = useSelector((state) => state.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 70);
  // const circumference = 2 * Math.PI * 70;
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 70);

  // const dashOffset = circumference - (progress / 100) * circumference;
  const [subscription, setSubscription] = useState(null);
  const [uploadsRemaining, setUploadsRemaining] = useState(0);
  const [downloadsRemaining, setDownloadsRemaining] = useState(0);
  const [clientsRemaining, setClientsRemaining] = useState(0);
  const [plan, setPlan] = useState({});
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
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
        .get("https://jamblix.com/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const result = res.data.findIsActive;
          setUploadsRemaining(result.resumeUpladed);
          setDownloadsRemaining(parseInt(result.resumeSaves.num));
          setClientsRemaining(result.clientStored);

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
          }, 5000);
        });
    }
  }, [userDataGlobal, selectedPlan]);
  return (
    <>
      {!loading ?
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
                        strokeDashoffset={isActive ? dashOffset : 2 * Math.PI * 70}
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


                      <div className="flex flex-row gap-2 w-full items-center justify-center">
                        <p className="ml:text-[2vw] font-[700] text-[24px]">
                          {icon}
                        </p>
                        <p className="ml:text-[2vw] font-[700] text-[24px]">
                          {Math.ceil(selectedPlan?.amount * exchangeRate)}
                        </p>
                      </div>
                      <p className="text-[12px] font-medium">
                        Your Plan Validity is {selectedPlan?.days} Days
                      </p>
                      {(limits.used.uploads === limits.total.uploads) || (limits.used.save === limits.total.save) || (limits.used.clients === limits.total.clients && limits.total.clients !==0) &&
                        
                      <div
                        onClick={() => router.push("/purchase/plans")}
                        className=" mt-4 btn_hover_effect flex px-6 py-2 text-white font-medium justify-center items-center rounded-[6px] bg-[#06A9EF] min-w-[168.8px] cursor-pointer"
                      >
                        Upgrade Plan
                      </div>
}
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
                          width: `${Math.round(
                            ((limits.total.uploads - uploadsRemaining) /
                              limits.total.uploads) *
                            100
                          )}%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[55px] min-w-[45px]">
                      {isActive
                        ? `${limits.total.uploads - uploadsRemaining}/${limits.total.uploads
                        }`
                        : "0/0"}
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
                          width: `${Math.round(
                            ((limits.total.download - downloadsRemaining) /
                              limits.total.download) *
                            100
                          )}%`,
                        }}
                        className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                      ></div>
                    </div>
                    <div className="scr420:min-w-[55px] min-w-[45px]">
                      {isActive
                        ? `${limits.total.download - downloadsRemaining}/${limits.total.download
                        }`
                        : "0/0"}
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
                            width: `${Math.round(
                              ((limits.total.clients - clientsRemaining) /
                                limits.total.clients) *
                              100
                            )}%`,
                          }}
                          className={`absolute  h-[10px] bg-[#06A9EF] rounded-[6px]`}
                        ></div>
                      </div>
                      <div className="scr420:min-w-[55px] min-w-[45px]">
                        {limits.total.clients - clientsRemaining}/
                        {limits.total.clients}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        :
        <div className="flex justify-center items-center w-full bg-[#F9F9F9] rounded-[16px]">
          <MiniLoader />
        </div>
      }
    </>
  );
}

export default Summary;
