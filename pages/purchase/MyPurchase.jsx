import React, { useEffect, useState } from "react";
import { plans } from "../../utils/data";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../utils/middleware";
import SubscriptionPlans from "../../components/featured/home/SubscriptionPlans";
import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
import MiniLoader from "../../components/common/miniLoader";
import { format } from "date-fns";
import Summary from "../../components/featured/candidate/createResume/components/summery";

function MyPurchase() {
  const router = useRouter();
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  // console.log(2020, subscription);
  const [allPlans, setAllPlans] = useState([]);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [daysRemaing, setDaysRemaing] = useState(0);
  const [daysPercentage, setDaysPercentage] = useState(0);
  const [selectedPlansData, setSelectedPlansData] = useState();
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const formatDate = (dateString) => format(new Date(dateString), "dd-MM-yy");
  const [isActive, setIsActive] = useState(false);
  const [limits, setLimits] = useState({
    used: { uploads: 0, download: 0, save: 0, clients: 0 },
    total: { uploads: 0, download: 0, save: 0, clients: 0 },
  });
  // console.log(limits);
  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const icon = localStorage.getItem("icon");
    setexchangeRate(exchangeRate);
    seticon(icon);
  }, []);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const calculateDaysRemaining = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceMs = end - today;
    const totalTimeMs = end - start;

    const remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    const percentage = Math.max(
      0,
      Math.min(100, (differenceMs / totalTimeMs) * 100)
    );
    setDaysPercentage(Math.ceil(percentage));
    return remainingDays <= 0 ? 0 : remainingDays;
  };

  useEffect(() => {
    if (subscription?.startDate) {
      setDaysRemaing(
        calculateDaysRemaining(subscription?.startDate, subscription?.endDate)
      );
    }
  }, [subscription]);
  useEffect(() => {
    axios
      .get("https://dev.api.skilotech.com/api/plans/getAllPlans")
      .then((res) => {
        setAllPlans(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);
  if (userDataGlobal) {
    axios
      .get("https://dev.api.skilotech.com/api/subscription/" + userDataGlobal?._id)
      .then((res) => {
        const plan = allPlans.find(
          (item) => item.index == res.data.findIsActive?.index
        );
        const result = res.data.findIsActive;

        if (res.data.findIsActive.isActive === true) {
          setIsActive(true);
        }

        if (plan) {
          setSelectedPlan(plan);

          setLimits({
            used: result.used,
            total: result.limits,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (userDataGlobal) {
      setLoading(true);
      axios
        .get("https://dev.api.skilotech.com/api/subscription/" + userDataGlobal?._id)
        .then((res) => {
          const result = res.data.findIsActive;

          console.log(result);
          setSubscription(result);
          setPlan(allPlans.find((item) => item.index == result?.index));
          if (plan) {
            setLimits({
              used: result.used,
              total: result.limits,
            });
          }

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [userDataGlobal, allPlans]);

  useEffect(() => {
    if (userDataGlobal) {
      setLoading(true);
      axios
        .get("https://dev.api.skilotech.com/api/AllSubscription/" + userDataGlobal?._id)
        .then((res) => {
          setSubscriptionHistory(res.data.data.reverse());
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [userDataGlobal, allPlans, plan]);

  const showDetails = (details) => {
    setSelectedPlansData(details);
    setShowPlanDetails(true);
  };

  return (
    <div className="flex flex-col gap-8  min-h-[60vh] pb-12">
      {showPlanDetails && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className=" bg-white p-3 flex flex-col gap-3 w-[267px] rounded-[8px]">
              <div className="flex justify-between">
                <div className="flex gap-1 font-semibold text-[12px] items-center ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_5000_45330)">
                      <path
                        d="M9.99563 14C10.2069 14 10.3854 13.9281 10.5312 13.7844C10.6771 13.6406 10.75 13.4625 10.75 13.25V9.75C10.75 9.5375 10.6785 9.35938 10.5356 9.21562C10.3927 9.07187 10.2156 9 10.0044 9C9.79313 9 9.61458 9.07187 9.46875 9.21562C9.32292 9.35938 9.25 9.5375 9.25 9.75V13.25C9.25 13.4625 9.32146 13.6406 9.46438 13.7844C9.60729 13.9281 9.78438 14 9.99563 14ZM9.99563 7.5C10.2069 7.5 10.3854 7.42854 10.5312 7.28563C10.6771 7.14271 10.75 6.96563 10.75 6.75438C10.75 6.54313 10.6785 6.36458 10.5356 6.21875C10.3927 6.07292 10.2156 6 10.0044 6C9.79313 6 9.61458 6.07146 9.46875 6.21437C9.32292 6.35729 9.25 6.53437 9.25 6.74562C9.25 6.95687 9.32146 7.13542 9.46438 7.28125C9.60729 7.42708 9.78438 7.5 9.99563 7.5ZM10.0058 18C8.90472 18 7.86806 17.7917 6.89583 17.375C5.92361 16.9583 5.07292 16.3854 4.34375 15.6562C3.61458 14.9271 3.04167 14.0767 2.625 13.105C2.20833 12.1333 2 11.0951 2 9.99042C2 8.88569 2.20833 7.85069 2.625 6.88542C3.04167 5.92014 3.61458 5.07292 4.34375 4.34375C5.07292 3.61458 5.92333 3.04167 6.895 2.625C7.86667 2.20833 8.90486 2 10.0096 2C11.1143 2 12.1493 2.20833 13.1146 2.625C14.0799 3.04167 14.9271 3.61458 15.6562 4.34375C16.3854 5.07292 16.9583 5.92167 17.375 6.89C17.7917 7.85847 18 8.89319 18 9.99417C18 11.0953 17.7917 12.1319 17.375 13.1042C16.9583 14.0764 16.3854 14.9271 15.6562 15.6562C14.9271 16.3854 14.0783 16.9583 13.11 17.375C12.1415 17.7917 11.1068 18 10.0058 18ZM10 16.5C11.8056 16.5 13.3403 15.8681 14.6042 14.6042C15.8681 13.3403 16.5 11.8056 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C8.19444 3.5 6.65972 4.13194 5.39583 5.39583C4.13194 6.65972 3.5 8.19444 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5Z"
                        fill="#06A9EF"
                      />
                    </g>
                  </svg>
                  Plan Information
                </div>
                <svg
                  onClick={() => setShowPlanDetails(false)}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_5000_45352)">
                    <path
                      d="M10.0001 11.0623L6.58346 14.479C6.43068 14.6318 6.25707 14.7047 6.06263 14.6978C5.86818 14.6908 5.69457 14.6109 5.54179 14.4582C5.38902 14.3054 5.31263 14.1283 5.31263 13.9269C5.31263 13.7255 5.38902 13.5484 5.54179 13.3957L8.93763 9.99984L5.52096 6.58317C5.36818 6.43039 5.29527 6.25331 5.30221 6.05192C5.30916 5.85053 5.38902 5.67345 5.54179 5.52067C5.69457 5.36789 5.87166 5.2915 6.07304 5.2915C6.27443 5.2915 6.45152 5.36789 6.60429 5.52067L10.0001 8.93734L13.4168 5.52067C13.5696 5.36789 13.7467 5.2915 13.948 5.2915C14.1494 5.2915 14.3265 5.36789 14.4793 5.52067C14.6321 5.67345 14.7085 5.85053 14.7085 6.05192C14.7085 6.25331 14.6321 6.43039 14.4793 6.58317L11.0626 9.99984L14.4793 13.4165C14.6321 13.5693 14.7085 13.7429 14.7085 13.9373C14.7085 14.1318 14.6321 14.3054 14.4793 14.4582C14.3265 14.6109 14.1494 14.6873 13.948 14.6873C13.7467 14.6873 13.5696 14.6109 13.4168 14.4582L10.0001 11.0623Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
              <div className="bg-[#DEDEDE] w-full h-[1px]"> </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Purchased Plan <span>:</span>{" "}
                </p>{" "}
                <p className=" font-medium">{selectedPlansData?.plan}</p>
              </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Status<span>:</span>{" "}
                </p>{" "}
                <p
                  className={`font-bold ${
                    selectedPlansData?.isActive
                      ? "text-[#0C8A0A]"
                      : "text-[#C00000]"
                  }`}
                >
                  {selectedPlansData.isActive ? "Active" : "Expired"}
                </p>
              </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Purchase Date <span>:</span>{" "}
                </p>{" "}
                <p className=" font-medium">
                  {formatDate(selectedPlansData?.paidAt)}
                </p>
              </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Expiry Date <span>:</span>{" "}
                </p>{" "}
                <p className=" font-medium">
                  {formatDate(selectedPlansData?.endDate)}
                </p>
              </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Plan Validity <span>:</span>{" "}
                </p>{" "}
                <p className=" font-medium">{selectedPlansData?.days}</p>
              </div>
              <div className="text-[12px] flex gap-3">
                <p className="w-[114px] font-semibold  flex justify-between">
                  Price <span>:</span>{" "}
                </p>{" "}
                <p className=" font-medium">
                  {selectedPlansData?.icon} {selectedPlansData?.amount}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <MiniLoader />
        </div>
      ) : (
        <>
          {subscription ? (
            <>
              {userDataGlobal?.role === "user" && (
                <div className="flex flex-col justify-center items-center text-center bg-blue  py-3">
                  <div className=" font-semibold text-[30px] text-white leading-tight">
                    My Purchase
                  </div>
                  <div className=" font-medium text-[16px] text-white">
                    Manage your account and subscription
                  </div>
                </div>
              )}

              <div
                className={`pb-12 w-[100%] px-[12px] xsm:pb-[0px] ${
                   userDataGlobal?.role === 'user' ? 'customMargins' : ''
                }`}
              >
 
                <div className=" flex flex-col gap-10  rounded-[16px]">
                  <Summary
                    limits={limits}
                    selectedPlan={selectedPlan}
                    isActive={isActive}
                    loading={loading}
                    setLoading={setLoading}
                  />
                  <div
                    className={` flex gap-4  border  rounded-[16px] bg-[#FFFFFF] scr1200:p-6 p-3 ${
                      subscription?.isActive
                        ? "border-[#06A9EF]"
                        : "border-[#C00000]"
                    } `}
                  >
                    <div className="flex scr1100:flex-row flex-col scr1200:gap-6 gap-4 w-[100%] justify-center ">
                      <div className="flex md:flex-row flex-col gap-6  scr1100:w-[60%] w-[100%] items-center justify-between ">
                        <div className="flex flex-col gap-6  md:w-[40%] w-[100%] items-center justify-between">
                          <div className="flex text-center flex-col gap-3 text-[#333333] w-[100%] p-4">
                            <p className="text-[20px] font-[600]">
                              {plan?.type === "candidate" && (
                                <>
                                  <span className="text-[#06A9EF]">
                                    {plan?.days} Days
                                  </span>{" "}
                                </>
                              )}

                              <span
                                className={`${
                                  plan?.type === "recruiter" && "text-[#06A9EF]"
                                }`}
                              >
                                {" "}
                                {plan?.name}
                              </span>

                              {plan?.type === "recruiter" && <span> Plan</span>}
                            </p>
                            <div className="flex flex-row gap-2 w-full items-center justify-center">
                              <p className="text-[24px] scr1024:text-[2.5vw] font-[700]">
                                {icon}
                              </p>
                              <p className="text-[24px] scr1024:text-[2.5vw] font-[700]">
                                {Math.ceil(plan?.amount * exchangeRate)}
                              </p>
                            </div>

                            <p className="text-[14px] font-[500]">
                              Your Plan Validity is {plan?.days} days
                            </p>
                            <div className="bg-[#DEDEDE] h-[2px]" />
                            <p
                              className={`text-[14px] font-[500] ${
                                daysPercentage <= 20 && "text-[#C00000] "
                              }`}
                            >
                              {" "}
                              Remaining plan validity {daysRemaing} days
                            </p>
                          </div>
                          {subscription?.inReview ? (
                            <button className="px-9 py-3 bg-[#DEDEDE] rounded-[12px] text-[16px] font-[600] text-white w-[70%] min-w-[160px]">
                              In Review
                            </button>
                          ) : (
                            <>
                              {userDataGlobal?.role === "user" && (
                                <button
                                  onClick={() => router.push("/purchase/plans")}
                                  disabled={
                                    subscription?.isActive &&
                                    !(
                                      limits.used.coverStored >=
                                        limits.total.coverStoredLimit ||
                                      limits.used.resumeStored >=
                                        limits.total.resumeStoredLimit ||
                                      limits.used.skillTest >=
                                        limits.total.skillTestLimit ||
                                      limits.used.skillCertified >=
                                        limits.total.skillCertifiedLimit ||
                                      limits.used.chatBot.monthly >=
                                        limits.total.chatBotLimit.monthly
                                    )
                                  }
                                  className={`px-9 py-3  ${
                                    limits.used.coverStored >=
                                      limits.total.coverStoredLimit ||
                                    limits.used.resumeStored >=
                                      limits.total.resumeStoredLimit ||
                                    limits.used.skillTest >=
                                      limits.total.skillTestLimit ||
                                    limits.used.skillCertified >=
                                      limits.total.skillCertifiedLimit ||
                                    limits.used.chatBot.monthly >=
                                      limits.total.chatBotLimit.monthly
                                      ? "bg-[#06a9ef] btn_hover_effect"
                                      : subscription?.isActive
                                      ? "bg-[#DEDEDE] "
                                      : "bg-[#06a9ef] btn_hover_effect"
                                  } rounded-[12px] text-[16px] font-[600]  text-white w-[60%] min-w-[190px] max-w-[190px] `}
                                >
                                  {limits.used.coverStored >=
                                    limits.total.coverStoredLimit ||
                                  limits.used.resumeStored >=
                                    limits.total.resumeStoredLimit ||
                                  limits.used.skillTest >=
                                    limits.total.skillTestLimit ||
                                  limits.used.skillCertified >=
                                    limits.total.skillCertifiedLimit ||
                                  limits.used.chatBot.monthly >=
                                    limits.total.chatBotLimit.monthly
                                    ? "Upgrade Plan"
                                    : subscription?.isActive
                                    ? "Purchased"
                                    : "Purchase"}
                                </button>
                              )}
                              {userDataGlobal?.role === "recruiter" && (
                                <button
                                  onClick={() => router.push("/purchase/plans")}
                                  disabled={
                                    subscription?.isActive &&
                                    !(
                                      limits.used.coverStored >=
                                        limits.total.coverStoredLimit ||
                                      limits.used.resumeStored >=
                                        limits.total.resumeStoredLimit ||
                                      limits.used.skillTest >=
                                        limits.total.skillTestLimit ||
                                      limits.used.skillCertified >=
                                        limits.total.skillCertifiedLimit ||
                                      limits.used.chatBot.monthly >=
                                        limits.total.chatBotLimit.monthly
                                    )
                                  }
                                  className={`px-9 py-3  ${
                                    limits.used.coverStored >=
                                      limits.total.coverStoredLimit ||
                                    limits.used.resumeStored >=
                                      limits.total.resumeStoredLimit ||
                                    limits.used.chatBot.daily >=
                                      limits.total.chatBotLimit.daily ||
                                    limits.used.jdMatching.monthly >=
                                      limits.total.jdMatchingLimit.monthly ||
                                    limits.used.collectionStored.monthly >=
                                      limits.total.collectionStoredLimit.monthly
                                      ? "bg-[#06a9ef] btn_hover_effect"
                                      : subscription?.isActive
                                      ? "bg-[#DEDEDE] "
                                      : "bg-[#06a9ef] btn_hover_effect"
                                  } rounded-[12px] text-[16px] font-[600]  text-white w-[60%] min-w-[190px] max-w-[190px] `}
                                >
                                  {limits.used.coverStored >=
                                    limits.total.coverStoredLimit ||
                                  limits.used.resumeStored >=
                                    limits.total.resumeStoredLimit ||
                                  limits.used.chatBot.daily >=
                                    limits.total.chatBotLimit.daily ||
                                  limits.used.jdMatching.monthly >=
                                    limits.total.jdMatchingLimit.monthly ||
                                  limits.used.collectionStored.monthly >=
                                    limits.total.collectionStoredLimit.monthly
                                    ? "Upgrade Plan"
                                    : subscription?.isActive
                                    ? "Purchased"
                                    : "Purchase"}
                                </button>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex flex-col gap-6  md:w-[70%] w-[100%]  ml:pl-4">
                          <div className="text-[18px] font-[600]">
                            Plan summary
                          </div>
                          <div className="flex flex-col gap-9 w-[100%] ">
                            <div className="flex  gap-4">
                              <div className="flex text-[14px]  gap-4 font-[700] justify-between w-[40%]">
                                <p>Plan Name</p>
                                <div>:</div>
                              </div>
                              <div className="text-[14px] font-[500]">
                                {plan?.name}
                              </div>
                            </div>
                            <div className="flex  gap-4">
                              <div
                                className={`flex text-[14px]  gap-4 justify-between font-[700] w-[40%] ${
                                  subscription?.isActive
                                    ? "text-[#0C8A0A]"
                                    : subscription?.inReview
                                    ? "text-[#06a9ef]"
                                    : "text-[#C00000]"
                                }`}
                              >
                                <p className="">Status</p>
                                <div className="">:</div>
                              </div>
                              <div
                                className={`text-[14px] font-[500] ${
                                  subscription?.isActive
                                    ? "text-[#0C8A0A]"
                                    : subscription?.inReview
                                    ? "text-[#06a9ef]"
                                    : "text-[#C00000]"
                                }`}
                              >
                                {subscription?.isActive
                                  ? "Active"
                                  : subscription?.inReview
                                  ? "In Review"
                                  : "Expired"}
                              </div>
                            </div>
                            {/* {subscription?.isActive && ( */}
                            <>
                              <div className="flex gap-4">
                                <div className="flex  gap-4 justify-between font-[700] text-[14px] w-[40%]">
                                  <p>Date of Purchase</p>
                                  <div>:</div>
                                </div>
                                <div className="text-[14px] font-[500]">
                                  {dateFormatter(subscription?.startDate)}
                                </div>
                              </div>
                              <div className="flex  gap-4">
                                <div className="flex  gap-4 justify-between font-[700] text-[14px] w-[40%]">
                                  <p>Date of Renewal</p>
                                  <div>:</div>
                                </div>
                                <div className="text-[14px] font-[500]">
                                  {" "}
                                  {dateFormatter(subscription?.endDate)}
                                </div>
                              </div>
                            </>
                            {/* )} */}
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#DEDEDE] w-[1px] h-[100%]"></div>
                      <div className="flex gap-3 flex-col text-left w-[30%]">
                        <div className="text-[18px] font-[600]">
                          Available Services
                        </div>
                        {plan?.features?.map((feature, index) => (
                          <div key={index} className="flex gap-4 items-start ">
                            <svg
                              className="min-w-[20px]"
                              width="20"
                              height="18"
                              viewBox="0 0 20 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.16683 17.75L5.5835 15.0833L2.5835 14.4167L2.87516 11.3333L0.833496 9L2.87516 6.66667L2.5835 3.58333L5.5835 2.91667L7.16683 0.25L10.0002 1.45833L12.8335 0.25L14.4168 2.91667L17.4168 3.58333L17.1252 6.66667L19.1668 9L17.1252 11.3333L17.4168 14.4167L14.4168 15.0833L12.8335 17.75L10.0002 16.5417L7.16683 17.75ZM9.12516 11.9583L13.8335 7.25L12.6668 6.04167L9.12516 9.58333L7.3335 7.83333L6.16683 9L9.12516 11.9583Z"
                                fill={
                                  subscription?.isActive ? "#06A9EF" : "#C00000"
                                }
                              />
                            </svg>
                            <p className="text-[14px] font-[500]">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 px-[8px] w-[100%] ml:pl-6">
                    <div className="text-[18px] font-[600]">
                      Account Details
                    </div>
                    <div className="flex ml:flex-row flex-col gap-12 w-[100%] ">
                      <div className="flex flex-col gap-6 scr1200:min-w-[30%] min-w-[35%] ">
                        {subscription?.firstName && (
                          <div className="flex  gap-4">
                            <div className="flex  gap-4 font-[700] text-[14px] justify-between w-[40%]">
                              <p>User Name </p>
                              <div>:</div>
                            </div>
                            <div className="text-[14px] font-[500] capitalize break-all">
                              {subscription?.firstName} {subscription?.lastName}
                            </div>
                          </div>
                        )}
                        {subscription?.mobileNo && (
                          <div className="flex  gap-4">
                            <div className="flex  gap-4 font-[700] text-[14px] justify-between w-[40%]">
                              <p>Contact No </p>
                              <div>:</div>
                            </div>
                            <div className="text-[14px] font-[500] capitalize break-all">
                              {subscription?.mobileNo}
                            </div>
                          </div>
                        )}
                        {subscription?.isActive && (
                          <div className="flex gap-4">
                            <div className="flex  text-[14px] gap-4 justify-between font-[700] w-[40%]">
                              <p>Activated on </p>
                              <div>:</div>
                            </div>
                            <div className="text-[14px] font-[500] break-all">
                              {dateFormatter(subscription?.startDate)}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="bg-[#DEDEDE] min-w-[1px] ml:h-[120px] h-[1px]"></div>
                      <div className="flex flex-col gap-6 min-w-[55%] scr1200:min-w-[40%] ">
                        <div className="flex  gap-4">
                          <div className="flex  gap-4 font-[700] justify-between w-[30%]  text-[14px]">
                            <p>Email Id </p>
                            <div>:</div>
                          </div>
                          <div className=" flex font-[500] break-all text-[14px]">
                            {subscription?.email}
                          </div>
                        </div>

                        {subscription?.isActive && (
                          <div className="flex gap-4">
                            <div className="flex  gap-4 justify-between font-[700] w-[30%] text-[14px]">
                              <p>Date Of Renewal </p>
                              <div>:</div>
                            </div>
                            <div className=" font-[500] break-all text-[14px]">
                              {" "}
                              {dateFormatter(subscription?.endDate)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`pb-12 w-[100%] flex flex-col px-[12px] xsm:pb-[0px] ${
                  userDataGlobal?.role == "user" ? "customMargins" : ""
                }`}
              >
                {" "}
                <p className="font-500 text-[20px] py-[16px] leading-[24px] text-[#333]">
                  Purchase History
                </p>
                <div className="flex flex-row rounded-[10px] font-[600] ms:text-[14px] text-[12px] text-center justify-between bg-[#E9EEF6] w-[100%] ms:px-[44px] px-1 ml:gap-0 ms:gap-1">
                  <p className="py-[14px] ms:w-[20%] w-[40%]">Purchased Plan</p>
                  <p className="py-[14px] ms:w-[20%] w-[30%]">Status</p>
                  <p className="py-[14px] w-[30%] mobile600">More Info</p>
                  <p className="py-[14px] w-[20%] web600">Purchase Date</p>
                  <p className="py-[14px] w-[20%] web600">Expiry Date</p>
                  <p className="py-[14px] w-[20%] web600">Plan Validity</p>
                  <p className="py-[14px] w-[20%] web600">Price</p>
                </div>
                {subscriptionHistory?.map((details, index) => (
                  <div
                    key={index}
                    className="flex flex-row  font-[500] text-center ms:text-[14px] text-[12px] justify-between w-[100%] ms:px-[44px] px-1 ml:gap-0 gap-1"
                  >
                    <p className="py-[14px] ms:w-[20%] w-[40%]">
                      {details.plan}
                    </p>
                    <p
                      className={` py-[14px] ms:w-[20%] w-[30%] ${
                        details.isActive ? "text-[#0C8A0A]" : "text-[#C00000]"
                      }`}
                    >
                      {details.isActive ? "Active" : "Expired"}
                    </p>
                    <p
                      onClick={() => showDetails(details)}
                      className="py-[14px] w-[30%]  ms:hidden flex justify-center items-center"
                    >
                      {" "}
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.666 15C10.9493 15 11.1868 14.9042 11.3785 14.7125C11.5702 14.5208 11.666 14.2833 11.666 14V10C11.666 9.71667 11.5702 9.47917 11.3785 9.2875C11.1868 9.09583 10.9493 9 10.666 9C10.3827 9 10.1452 9.09583 9.95352 9.2875C9.76185 9.47917 9.66602 9.71667 9.66602 10V14C9.66602 14.2833 9.76185 14.5208 9.95352 14.7125C10.1452 14.9042 10.3827 15 10.666 15ZM10.666 7C10.9493 7 11.1868 6.90417 11.3785 6.7125C11.5702 6.52083 11.666 6.28333 11.666 6C11.666 5.71667 11.5702 5.47917 11.3785 5.2875C11.1868 5.09583 10.9493 5 10.666 5C10.3827 5 10.1452 5.09583 9.95352 5.2875C9.76185 5.47917 9.66602 5.71667 9.66602 6C9.66602 6.28333 9.76185 6.52083 9.95352 6.7125C10.1452 6.90417 10.3827 7 10.666 7ZM10.666 20C9.28268 20 7.98268 19.7375 6.76602 19.2125C5.54935 18.6875 4.49102 17.975 3.59102 17.075C2.69102 16.175 1.97852 15.1167 1.45352 13.9C0.928516 12.6833 0.666016 11.3833 0.666016 10C0.666016 8.61667 0.928516 7.31667 1.45352 6.1C1.97852 4.88333 2.69102 3.825 3.59102 2.925C4.49102 2.025 5.54935 1.3125 6.76602 0.7875C7.98268 0.2625 9.28268 0 10.666 0C12.0493 0 13.3493 0.2625 14.566 0.7875C15.7827 1.3125 16.841 2.025 17.741 2.925C18.641 3.825 19.3535 4.88333 19.8785 6.1C20.4035 7.31667 20.666 8.61667 20.666 10C20.666 11.3833 20.4035 12.6833 19.8785 13.9C19.3535 15.1167 18.641 16.175 17.741 17.075C16.841 17.975 15.7827 18.6875 14.566 19.2125C13.3493 19.7375 12.0493 20 10.666 20ZM10.666 18C12.8993 18 14.791 17.225 16.341 15.675C17.891 14.125 18.666 12.2333 18.666 10C18.666 7.76667 17.891 5.875 16.341 4.325C14.791 2.775 12.8993 2 10.666 2C8.43268 2 6.54102 2.775 4.99102 4.325C3.44102 5.875 2.66602 7.76667 2.66602 10C2.66602 12.2333 3.44102 14.125 4.99102 15.675C6.54102 17.225 8.43268 18 10.666 18Z"
                          fill="#999999"
                        />
                      </svg>
                    </p>
                    <p className="py-[14px] w-[20%] web600">
                      {formatDate(details.paidAt)}
                    </p>
                    <p className="py-[14px] w-[20%] web600">
                      {formatDate(details.endDate)}
                    </p>
                    <p className="py-[14px] w-[20%] web600">
                      {details.days} Days
                    </p>
                    <p className="py-[14px] w-[20%] web600">
                      {" "}
                      {details.icon} {details.amount}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full pt-3  ">
              <SubscriptionPlan subscription={subscription} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyPurchase;
