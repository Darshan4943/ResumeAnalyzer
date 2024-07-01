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

function MyPurchase() {
  const router = useRouter();
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [allPlans, setAllPlans] = useState([])
  const userDataGlobal = useSelector((state) => state.userData);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [progress, setProgress] = useState(0);
  const [daysRemaing, setDaysRemaing] = useState(0);
  const [daysPercentage, setDaysPercentage] = useState(0)
 
  const formatDate = (dateString) => format(new Date(dateString), 'dd-MM-yy');
  
  const [limits, setLimits] = useState({
    used: { uploads: 0, download: 0, save: 0, clients: 0 },
    total: { uploads: 0, download: 0, save: 0, clients: 0 },
  });

  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const icon = localStorage.getItem("icon");
    setexchangeRate(exchangeRate);
    seticon(icon);
  }, []);

  const selectedPlan = localStorage.getItem("activePlan");
  const uploadCount = localStorage.getItem("uploadCount");
  const downloadCount = localStorage.getItem("downloadCount");
  const saveCount = localStorage.getItem("saveCount");
  const clientCount = localStorage.getItem("clientCount");
  const planActive = localStorage.getItem("planActive");
  const calculateDaysRemaining = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceMs = end - today;
    const totalTimeMs = end - start;

    const remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    const percentage = Math.max(0, Math.min(100, (differenceMs / totalTimeMs) * 100));
    setDaysPercentage(Math.ceil(percentage))
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
      .get("https://jamblix.com/api/plans/getAllPlans")
      .then((res) => {

        setAllPlans(res.data.data)

      })
      .catch((err) => {
        console.log(err);
      });


  }, [userDataGlobal]);

  useEffect(() => {
    if (userDataGlobal) {
      setLoading(true);
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const result = res.data.findIsActive;
         
          setSubscription(result);
          setPlan(
            allPlans.find(
              (item) =>
                item.name == result?.plan
            )
          );

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
        .get("https://jamblix.com/api/AllSubscription/" + userDataGlobal._id)
        .then((res) => {

          setSubscriptionHistory(res.data.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

        setLimits({
          used: {
            uploads: plan?.limits?.uploads - parseInt(uploadCount),
            download: plan?.limits?.download - parseInt(saveCount),
            save: plan?.limits?.save - parseInt(saveCount),
            clients: plan?.limits?.clients - parseInt(clientCount),
          },
          total: plan?.limits,
        });
    }
  }, [userDataGlobal, allPlans,plan]);

console.log(11,limits)
  return (
    <div className="flex flex-col gap-8  min-h-[60vh]">
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <MiniLoader />
        </div>
      ) : (
        <>
          {subscription ? (
            <>
              <div className="flex flex-col justify-center items-center text-center bg-blue  py-3">
                <div className=" font-semibold text-[30px] text-white leading-tight">
                  My Purchase
                </div>
                <div className=" font-medium text-[16px] text-white">
                  Manage your account and subscription
                </div>
              </div>
              <div className=" pb-12 w-[100%] customMargins px-[12px]  xsm:pb-[0px]">
                <div
                  // style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
                  className=" flex flex-col gap-10  rounded-[16px]"
                >
                  {" "}
                  <div className={` flex gap-4  border  rounded-[16px] scr1200:p-6 p-3 ${subscription?.isActive ? "border-[#06A9EF]" : "border-[#C00000]"} `}>
                    <div className="flex scr1100:flex-row flex-col scr1200:gap-12 gap-4 w-[100%] justify-center ">
                      <div className="flex md:flex-row flex-col gap-6  scr1100:w-[60%] w-[100%] items-center justify-between ">
                        <div className="flex flex-col gap-6  md:w-[40%] w-[100%] items-center justify-between">
                          <div className="flex text-center flex-col gap-3 text-[#333333] w-[100%] p-4">
                            <p className="text-[20px] font-[600]">
                              {plan?.type === "candidate" &&
                                <>
                                  <span className="text-[#06A9EF]">{plan?.days} Days</span>{" "}
                                </>
                              }

                              <span className={`${plan?.type === "recruiter" && "text-[#06A9EF]"}`}> {plan?.name}</span>

                              {plan?.type === "recruiter" &&
                                <span > Plan</span>
                              }

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
                            <p className={`text-[14px] font-[500] ${daysPercentage <= 20 && "text-[#C00000] "}`}> Remaining plan validity {daysRemaing} days</p>
                          </div>
                          {subscription?.inReview ? (
                            <button className="px-9 py-3 bg-[#DEDEDE] rounded-[12px] text-[16px] font-[600] text-white w-[60%] min-w-[160px]">
                              In Review
                            </button>
                          ) : (
                            <button
                              onClick={() => router.push("/purchase/plans")}
                              disabled={subscription?.isActive && !(limits?.used?.uploads === limits?.total?.uploads || limits?.used?.save === limits?.total?.save || (limits?.used?.clients === limits?.total?.clients && limits?.total?.clients !== 0)) 
                              }
                              className={`px-9 py-3  ${subscription?.isActive && !(limits?.used?.uploads === limits?.total?.uploads || limits?.used?.save === limits?.total?.save || (limits?.used?.clients === limits?.total?.clients && limits?.total?.clients !== 0))
                                ? "bg-[#DEDEDE] "
                                : "bg-[#06a9ef] btn_hover_effect"
                                } rounded-[12px] text-[16px] font-[600]  text-white w-[60%] min-w-[160px] `}
                            >
                              {subscription?.isActive 
                                ? !(limits?.used?.uploads === limits?.total?.uploads || limits?.used?.save === limits?.total?.save || (limits?.used?.clients === limits?.total?.clients && limits?.total?.clients !== 0)) ? "Purchased" :"Upgrade Plan"
                                : "Purchase"}
                            </button>
                          )}
                        </div>
                        <div className="flex flex-col gap-6  md:w-[60%] w-[100%]  ml:pl-4">
                          <div className="text-[18px] font-[600]">
                            {" "}
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
                              <div className={`flex text-[14px]  gap-4 justify-between font-[700] w-[40%] ${subscription?.isActive
                                ? "text-[#0C8A0A]"
                                : subscription?.inReview
                                  ? "text-[#06a9ef]"
                                  : "text-[#C00000]"
                                }`}>
                                <p className="">Status</p>
                                <div className="">:</div>
                              </div>
                              <div
                                className={`text-[14px] font-[500] ${subscription?.isActive
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
                      <div className="flex gap-3 flex-col text-left">
                        <div className="text-[18px] font-[600]">
                          {" "}
                          Available Services
                        </div>
                        {plan?.features?.map((feature, index) => (
                          <div key={index} className="flex gap-4 items-center ">
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
                                fill={subscription?.isActive ? "#06A9EF" : "#C00000"}
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
                        <div className="flex  gap-4">
                          <div className="flex  gap-4 font-[700] text-[14px] justify-between w-[40%]">
                            <p>User Name </p>
                            <div>:</div>
                          </div>
                          <div className="text-[14px] font-[500] capitalize break-all">
                            {subscription?.firstName} {subscription?.lastName}
                          </div>
                        </div>
                        <div className="flex  gap-4">
                          <div className="flex  gap-4 font-[700] text-[14px] justify-between w-[40%]">
                            <p>Contact No </p>
                            <div>:</div>
                          </div>
                          <div className="text-[14px] font-[500] capitalize break-all">
                            {subscription?.mobileNo}
                          </div>
                        </div>

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

              <div className=" pb-12 w-[100%] customMargins flex flex-col px-[12px]  xsm:pb-[0px] ">
                <p className="font-500 text-[20px] py-[16px] leading-[24px] text-[#333]">
                  Purchase History
                </p>
                <div className="flex flex-row rounded-[10px] font-[600] text-[14px] text-center justify-between bg-[#E9EEF6] w-[100%] px-[44px]">
                  <p className="py-[14px] w-[20%]">Purchased Plan</p>
                  <p className="py-[14px] w-[20%]">Status</p>
                  <p className="py-[14px] w-[20%]">Purchase Date</p>
                  <p className="py-[14px] w-[20%]">Expiry Date</p>
                  <p className="py-[14px] w-[20%]">Plan Validity</p>
                  <p className="py-[14px] w-[20%]">Price</p>
                </div>

                {subscriptionHistory.reverse().map((details, index) => (
                  <div
                    key={index}
                    className="flex flex-row  font-[500] text-center text-[14px] justify-between w-[100%] px-[44px]">
                    <p className="py-[14px] w-[20%]">{details.plan}</p>
                    <p className={` py-[14px] w-[20%] ${details.isActive ? "text-[#0C8A0A]" : "text-[#C00000]"}`}>{details.isActive ? "Active" : "Expired"}</p>
                    <p className="py-[14px] w-[20%]">{formatDate(details.paidAt)}</p>
                    <p className="py-[14px] w-[20%]">{formatDate(details.endDate)}</p>
                    <p className="py-[14px] w-[20%]">{details.days} Days</p>
                    <p className="py-[14px] w-[20%]"> {details.icon} {details.amount}</p>
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
