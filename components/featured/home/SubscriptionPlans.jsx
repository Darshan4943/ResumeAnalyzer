import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { currenciesWithIcons, currencyMap, plans, telCode } from "../../../utils/data";

import axios from "axios";
function SubscriptionPlans({ fromMain }) {
  const router = useRouter();
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  // const showPlan = useSelector((state) => state.showPlan.show);

  const [subPlans, setPlans] = useState([]);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isInInquiry, setIsInInquiry] = useState(false);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [showPlan, setShowPlans] = useState(false);
  const [allPlans, setAllPlans] = useState([])
  const [subscription, setSubscription] = useState(null);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const icon = localStorage.getItem("icon");

    setexchangeRate(exchangeRate);
    seticon(icon);
    // if (userDataGlobal.role == "recruiter" || fromMain) {
    //   setIsUser(false);
    //   setPlans(plans.slice(3));
    // } else {
    //   setIsUser(true);
    //   setPlans(plans.slice(0, 3));
    // }


    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, [userDataGlobal, showPlan]);


  useEffect(() => {
    axios
      .get("http://localhost:2000/api/checkForFreePlanByUserId/" + userDataGlobal?._id)
      .then((res) => {

        setIsFree(res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);


  useEffect(() => {
    axios
      .get("http://localhost:2000/api/subscription/" + userDataGlobal?._id)
      .then((res) => {
        setSubscription(res.data.findIsActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal, showPlan]);



  useEffect(() => {
    axios
      .get("http://localhost:2000/api/plans/getAllPlans")
      .then((res) => {

        const allPlan = res.data.data

        // if (userDataGlobal.role == "recruiter" || fromMain) {
        //   setIsUser(false);
        //   if (isFree) {
        //     setAllPlans([allPlan[4], allPlan[5]]);
        //   } else {
        //     setAllPlans([allPlan[3], allPlan[5]]);
        //   }

        // } else {
        //   setIsUser(true);
        //   if (isFree) {
        //     setAllPlans(allPlan.slice(1, 3));
        //   } else {
        //     setAllPlans([allPlan[0], allPlan[2]]);
        //   }

        // }
        if (userDataGlobal.role === "recruiter" || fromMain) {
          setIsUser(false);

          setAllPlans(
            allPlan
              .filter(plan => plan.type === "recruiter")
              .sort((a, b) => a.amount - b.amount)
          );
        } else {
          setIsUser(true);

          setAllPlans(
            allPlan
              .filter(plan => plan.type === "candidate")
              .sort((a, b) => a.amount - b.amount)
          );
        }


      })
      .catch((err) => {
        console.log(err);
      });


  }, [userDataGlobal, isFree]);

  const clickHandler = (index) => {
    if (isLogin) {
      if (
        subscription === null ||
        subscription == undefined ||
        !subscription.inReview
      ) {
        router.push(`/purchase/details?id=${index}`);
      } else {
        setIsInInquiry(true);
      }
    } else {
      localStorage.setItem("purchase", JSON.stringify({ status: true, index }));
      if (isUser) {
        router.push("/auth?signin=true&role=user");
      } else {
        router.push("/auth?signin=true&role=recruiter");
      }
    }
  };


  return (
    <>
      {isInInquiry && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-[40%] left-0 right-0  flex items-center justify-center  ">
            <div className=" absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-11 flex flex-col gap-6  m-w-[22%] ">
              <svg
                className="absolute top-[-40px]  left-[40%] right-[60%] flex"
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="72" height="72" rx="36" fill="#FFD500" />

                <g mask="url(#mask0_1061_16836)">
                  <path
                    d="M34.0127 41.9866V19.3457H37.9869V41.9866H34.0127ZM34.0127 52.654V48.6798H37.9869V52.654H34.0127Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>

              <div className="text-center">
                <div className="text-[24px] font-[500] text-[#333]">
                  Activation in progress
                </div>
                <div className="text-[16px] font-[500] text-[#333]">
                  <span className="text-[18px] font-[600] text-[#06A9EF]">
                    {subscription?.plan}
                  </span>{" "}
                  Is Already In Inquiry
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsInInquiry(false)}
                  className="py-[12px] px-[36px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="hidden lg:block w-full ">
        <div className="flex gap-6 justify-center">
          {allPlans.map((plan, index) => (
            <div
              key={index}
              className={`group relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px] purchase-plan-card ${isUser ? "max-w-[21vw]" : "max-w-[21vw] "
                } `}
              style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
              

            >
              {index === 1 && (
                <div className="absolute left-0 xxl:top-[-45px] xl:top-[-35px] scr1200:top-[-35px] top-[-28px] text-[1.3vw] font-semibold px-4 pt-[4px] pb-[50px] bg-[#06A9EF] text-white rounded-t-[16px]">
                  Recommended
                </div>
              )}

              <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center h-full justify-between">
                <div className="flex text-center flex-col gap-3 text-[#333333] ">
                  <p className="text-[1.4vw] font-[600] xl:text-[20px]">
                    {plan.type === "candidate" &&
                      <>
                        <span className="text-[#06A9EF]">{plan?.days} Days</span>{" "}
                      </>
                    }

                    <span className={`${plan.type === "recruiter" && "text-[#06A9EF]"}`}> {plan?.name}</span>

                    {plan.type === "recruiter" &&
                      <span > Plan</span>
                    }
                  </p>

                  <div className="flex flex-row gap-2 w-full items-end justify-center leading-tight ">
                    {/* <div className={`flex flex-row ${(plan.isFree) ? "gap-0 line-through" : "gap-2"}  `}>

                      <p className={` font-[700] ${(plan.isFree) ? "text-[#666666] text-[1.5vw] pb-1  " : "text-[2.5vw]"}`}>{icon}</p>
                      <p className={` font-[700] ${(plan.isFree) ? "text-[#666666] text-[1.5vw] pb-1" : "text-[2.5vw]"}`}>
                        {Math.ceil(plan?.amount * exchangeRate)}
                      </p>
                    </div> */}
                    {/* {(plan.isFree) &&
                      <p className="text-[2.5vw] font-[700]">
                        Free
                      </p>
                    } */}
                    {plan.isFree ?
                      <p className="text-[2.5vw] font-[700] xl:text-[36px]">
                        Free
                      </p>
                      :
                      <div className={`flex flex-row  gap-2  `}>

                        <p className={` font-[700] text-[2.5vw] xl:text-[36px]`}>{icon}</p>
                        <p className={` font-[700] text-[2.5vw] xl:text-[36px]`}>
                          {Math.ceil(plan?.amount * exchangeRate)}
                        </p>
                      </div>
                    }
                  </div>

                  {/* {plan.index === 1 &&
                    <div className="flex flex-row gap-2 w-full items-center justify-center">

                      <p className="text-[2.5vw] font-[700]">
                        Free
                      </p>
                    </div>
                  } */}

                  <p
                    className="text-[1vw] font-[500] xl:text-[14px]"
                    style={{ textTransform: "capitalize" }}
                  >
                    {plan?.description}
                  </p>
                  <div className="bg-[#DEDEDE] h-[2px]" />
                </div>
                <div className="flex gap-3 flex-col text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex gap-3 items-start ">
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
                          fill="#06A9EF"
                        />
                      </svg>
                      <p className="text-[0.8vw] font-[500] xl:text-[12px]">
                        {feature.includes('(') ? (
                          <>
                            {feature.split('(')[0]}
                            <br />
                            ({feature.split('(')[1]}
                          </>
                        ) : (
                          feature
                        )}
                      </p>

                    </div>
                  ))}
                </div>
                {(isFree && (plan.isFree)) ?
                  <button
                    disabled={true}
                    className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.2vw] font-semibold w-full  transition-all cursor-not-allowed opacity-50 xl:text-[18px]  "
                  >
                    Purchased
                  </button>
                  :
                  <button

                    onClick={() => clickHandler(plan.index)}
                    className="px-6 py-3 bg-[#06A9EF] xl:text-[18px] text-white rounded-[12px] text-[1.2vw] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
                  >
                    Purchase Plan
                  </button>

                }

              </div>

            </div>
          ))}

          <div

            className={`group relative mt-[40px] p-4 z-20 bg-white  flex flex-col gap-4 items-center justify-between rounded-[16px] purchase-plan-card ${isUser ? "max-w-[20vw]" : "max-w-[20vw] "
              } `}
              style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
          >
            <div className="flex text-center flex-col gap-9 text-[#333333] items-center  justify-between">
              <p className="text-[1.4vw] font-[600] xl:text-[20px]">
                <span className="text-[#06A9EF]">Enterprise </span>{" "}
                Plan
              </p>
              <p className="text-[1vw] font-[500]  px-2">Tailored Solutions for {isUser ? "Candidates" : "Organizations"}</p>
              <div className="bg-[#DEDEDE] h-[2px] w-[90%]" />
            </div>
            <div className="flex gap-3 flex-col text-center items-center w-[168px]">
              <img
                src="/images/support_agent.png"
                className="h-[80px] w-[80px]"
                alt=""
              />
              <span className="text-[16px] font-[500] text-center xl:text-[16px]">
                Contact Us for Custom Plan as per your needs
              </span>
            </div>
            <button
              // disabled={true}
              onClick={() => router.push('/purchase/enterprise')}
              className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] xl:text-[18px] text-[1.2vw] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
            // style={{ opacity: 0.6 }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className="block lg:hidden w-full ">
        <div className="block lg:hidden w-full">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper flex items-center justify-center"
            effect="fade"
          >
            {allPlans.map((plan, index) => (
              <SwiperSlide
                style={{ display: "flex" }}
                className="justify-center pt-6 gap-4 "
                key={index}
              >
                <div
                  className="w-[300px] h-[420px] relative bg-white flex flex-col gap-4 items-center rounded-[16px] mt-[8px] mb-4"
                  style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                >
                  {index === 1 && (
                    <div className="absolute left-0 top-[-24px] ml:text-[1.3vw] text-[14px] font-semibold px-4 pt-[4px] pb-[110px] bg-[#06A9EF] text-white rounded-t-[16px]">
                      Recommended
                    </div>
                  )}

                  <div className="p-2 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center w-[300px] h-[440px]">
                    <div className="flex text-center flex-col gap-2 text-[#333333] w-[80%]">
                      <p className="text-[18px] font-[600]">
                        {plan.type === "candidate" && (
                          <>
                            <span className="text-[#06A9EF]">{plan?.days} Days</span>{" "}
                          </>
                        )}
                        <span
                          className={`${plan.type === "recruiter" && "text-[#06A9EF]"
                            }`}
                        >
                          {plan?.name}
                        </span>
                        {plan.type === "recruiter" && <span> Plan</span>}
                      </p>

                      <div className="flex flex-row gap-2 w-full items-end justify-center leading-tight ">
                        {plan.isFree ? (
                          <p className="text-[28px] font-[700]">Free</p>
                        ) : (
                          <div className={`flex flex-row  gap-2  `}>
                            <p className={`font-[700] text-[28px]`}>{icon}</p>
                            <p className={`font-[700] text-[28px]`}>
                              {Math.ceil(plan?.amount * exchangeRate)}
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="text-[12px] font-[500]">{plan?.description}</p>
                      <div className="bg-[#DEDEDE] h-[2px]" />
                    </div>
                    <div className="flex gap-3 flex-col text-left">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex gap-3 items-start">
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
                              fill="#06A9EF"
                            />
                          </svg>
                          <p className="text-[10px] font-[500]">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {(isFree && (plan.isFree)) ?
                      <button
                        disabled={true}
                        className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold w-full opacity-50 "
                      >
                        Purchased
                      </button>
                      :
                      <button

                        onClick={() => clickHandler(plan.index)}
                        className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold w-full "
                      >
                        Purchase Plan
                      </button>

                    }
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Add the Enterprise Plan as a separate SwiperSlide */}
            <SwiperSlide style={{ display: "flex" }} className="justify-center pt-6 gap-4">
              <div
                style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                className="p-4 z-20 bg-white rounded-[16px] flex flex-col items-center justify-center pt-6 gap-4 max-w-[300px] h-[440px]"
              >
                <div className="flex text-center flex-col gap-10 text-[#333333] w-[80%] justify-between">
                  <p className="text-[18px] font-[600]">
                    <span className="text-[#06A9EF]">Enterprise</span> Plan
                  </p>
                  <p className="text-[12px] font-[500] px-2">
                    Tailored Solutions for {isUser ? "Candidates" : "Organizations"}
                  </p>
                  <div className="bg-[#DEDEDE] h-[2px]" />
                </div>
                <div className="flex gap-3 flex-col text-center items-center w-full">
                  <img
                    src="/images/support_agent.png"
                    className="h-[80px] max-w-[80px]"
                    alt=""
                  />
                  <span className="text-[16px] font-[500] text-center">
                    Contact Us for Custom Plan as per your needs
                  </span>
                </div>
                <button

                  onClick={() => router.push('/purchase/enterprise')}

                  className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold w-full"
                >
                  Contact Us
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>

    </>
  );
}

export default SubscriptionPlans;
