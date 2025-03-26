import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {
  currenciesWithIcons,
  currencyMap,
  plans,
  telCode,
} from "../../../utils/data";

import axios from "axios";
function SubscriptionPlans({ fromMain }) {
  const router = useRouter();
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  // const showPlan = useSelector((state) => state.showPlan.show);

  const [subPlans, setPlans] = useState([]);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isInInquiry, setIsInInquiry] = useState(false);
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [showPlan, setShowPlans] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const icon = localStorage.getItem("icon");

    setexchangeRate(exchangeRate);
    seticon(icon);
    // if (userDataGlobal?.role == "recruiter" || fromMain) {
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
      .get(
        "https://dev.api.skilotech.com/api/checkForFreePlanByUserId/" +
        userDataGlobal?._id
      )
      .then((res) => {
        setIsFree(res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);

  useEffect(() => {
    axios
      .get("https://dev.api.skilotech.com/api/subscription/" + userDataGlobal?._id)
      .then((res) => {
        setSubscription(res.data.findIsActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal, showPlan]);

  useEffect(() => {
    axios
      .get("https://dev.api.skilotech.com/api/plans/getAllPlans")
      .then((res) => {
        const allPlan = res.data.data;

        // if (userDataGlobal?.role == "recruiter" || fromMain) {
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
        if (userDataGlobal?.role === "recruiter" || userDataGlobal?.role === "employer" || fromMain) {
          setIsUser(false);

          setAllPlans(
            allPlan
              .filter((plan) => plan.type === "recruiter")
              .sort((a, b) => a.amount - b.amount)
          );
        } else {
          setIsUser(true);

          setAllPlans(
            allPlan
              .filter((plan) => plan.type === "candidate")
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
      <div className="hidden lg:hiddden w-full ">
        <div className="flex gap-6 justify-center">
          {allPlans.map((plan, index) => (
            <div
              key={index}
              className={`group relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px] purchase-plan-card ${isUser ? "max-w-[21vw]" : "max-w-[21vw] "
                } `}
              style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
            >
              {index === 1 && (
                <div
                  className="absolute left-0 top-[-28px] text-[12px] font-[600] px-4 pt-[4px] pb-[50px] 
bg-gradient-to-b from-[#06A9EF] to-[#55CCFF] text-white rounded-t-[16px]"
                >
                  Recommended
                </div>
              )}

              <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center h-full justify-between">
                <div className="flex text-center flex-col gap-[12px] text-[#333333] ">
                  <p className="text-[16px] font-[600] xl:text-[16px]">
                    {plan.type === "candidate" && (
                      <>
                        <span className="text-[#06A9EF]">
                          {plan?.days} Days
                        </span>{" "}
                      </>
                    )}

                    <span
                      className={`${plan.type === "recruiter" && "text-[#06A9EF]"
                        }`}
                    >
                      {" "}
                      {plan?.name}
                    </span>

                    {plan.type === "recruiter" && <span> Plan</span>}
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
                    {plan.isFree ? (
                      <p className="text-[26px] font-[700] ">Free</p>
                    ) : (
                      <div className={`flex flex-row  gap-2  `}>
                        <p className={` font-[700] text-[26px] `}>{icon}</p>
                        <p className={` font-[700] text-[26px]`}>
                          {Math.ceil(plan?.amount * exchangeRate)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* {plan.index === 1 &&
                    <div className="flex flex-row gap-2 w-full items-center justify-center">

                      <p className="text-[2.5vw] font-[700]">
                        Free
                      </p>
                    </div>
                  } */}

                  <p
                    className="text-[14px] font-[500] xl:text-[14px]"
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
                      <p className="text-[12px] font-[500] xl:text-[12px]">
                        {feature.includes("(") ? (
                          <>
                            {feature.split("(")[0]}
                            <br />({feature.split("(")[1]}
                          </>
                        ) : (
                          feature
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                {isFree && plan.isFree ? (
                  <button
                    disabled={true}
                    className="px-[36px] py-[12px] bg-[#06A9EF] text-white rounded-[12px] text-[16px] font-semibold w-full  transition-all cursor-not-allowed opacity-50 xl:text-[18px]  "
                  >
                    Purchased
                  </button>
                ) : (
                  <button
                    onClick={() => clickHandler(plan.index)}
                    className="px-6 py-3 bg-[#06A9EF] xl:text-[16px] text-white rounded-[12px] text-[16px] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
                  >
                    Purchase Plan
                  </button>
                )}
              </div>
            </div>
          ))}

          <div
            className={`group relative mt-[40px] p-4 z-20 bg-white  flex flex-col gap-4 items-center justify-between rounded-[16px] purchase-plan-card ${isUser ? "max-w-[20vw]" : "max-w-[20vw] "
              } `}
            style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
          >
            <div className="flex text-center flex-col gap-4 text-[#333333] items-center  justify-between">
              <p className="text-[1.4vw] font-[600] xl:text-[20px]">
                <span className="text-[#06A9EF]">Enterprise </span> Plan
              </p>
              <p className="text-[16px] font-[500]  px-2">
                Tailored Solutions for {isUser ? "Candidates" : "Organizations"}
              </p>
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
              onClick={() => router.push("/purchase/enterprise")}
              className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] xl:text-[16px] text-[1.2vw] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
            // style={{ opacity: 0.6 }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className="flex lg:flex w-full ">
        <div className="flex lg:flex w-full justify-center">
          <Swiper
            // slidesPerView={1}
            spaceBetween={30}
            // centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1140: { slidesPerView: 3 },
              1440: { slidesPerView: userDataGlobal?.role === "user" ? 3 : 4 },
            }}
            modules={[Pagination]}
            className=" swiperPagination flex items-center justify-center self-start h-full "
            effect="fade"
          >
            {allPlans.map((plan, index) => (
              <SwiperSlide
                style={{ display: "flex" }}
                className="justify-center pt-6 gap-4 pl-2"
                key={index}
              >
                <div
                  key={index}
                  onClick={() => clickHandler(plan.index)}
                  className={`group relative mt-[40px] bg-white cursor-pointer flex flex-col gap-4 items-center rounded-[16px] purchase-plan-card min-w-[280px] xsm:min-w-[310px] h-fit ${isUser ? "max-w-[21vw]" : "max-w-[21vw] "
                    } `}
                  style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
                >
                  {index === 1 && (
                    <div
                      className="absolute left-0 top-[-28px] text-[12px] font-[600] px-4 pt-[4px] pb-[50px] 
bg-gradient-to-b from-[#06A9EF] to-[#55CCFF] text-white rounded-t-[16px]"
                    >
                      Recommended
                    </div>
                  )}

                  <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center h-fit justify-between">
                    <div className="flex text-center flex-col gap-[12px] text-[#333333] justify-center items-center ">
                      <p className="text-[16px] font-[600] xl:text-[16px]">
                        {plan.type === "candidate" && (
                          <>
                            <span className="text-[#06A9EF]">
                              {plan?.days} Days
                            </span>{" "}
                          </>
                        )}

                        <span
                          className={`${plan.type === "recruiter" && "text-[#06A9EF]"
                            }`}
                        >
                          {" "}
                          {plan?.name}
                        </span>

                        {plan.type === "recruiter" && <span> Plan</span>}
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
                        {plan.isFree ? (
                          <p className="text-[26px] font-[700] ">Free</p>
                        ) : (
                          <div className={`flex flex-row  gap-2  `}>
                            <p className={` font-[700] text-[26px] `}>{icon}</p>
                            <p className={` font-[700] text-[26px]`}>
                              {Math.ceil(plan?.amount * exchangeRate)}
                            </p>
                          </div>
                        )}
                      </div>


                      {/* {plan.index === 1 &&
                    <div className="flex flex-row gap-2 w-full items-center justify-center">

                      <p className="text-[2.5vw] font-[700]">
                        Free
                      </p>
                    </div>
                  } */}

                      <p
                        className="text-[14px] font-[500] xl:text-[14px]"
                        style={{ textTransform: "capitalize" }}
                      >
                        {plan?.description}
                      </p>
                      <div className="flex gap-1 text-[12px] font-medium items-center">

                        <div
                          style={{
                            backgroundColor: "#4C43CD",
                            backgroundImage: `
      radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)
    `,
                          }}
                          className="relative py-[6px] px-2 text-[12px] font-[600] rounded-[30px] flex justify-center items-center leading-tight  gap-[4px] text-white  "
                        >
                          <svg
                            width="11"
                            height="10"
                            viewBox="0 0 11 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.93291 2.29406C5.26133 3.80704 6.1156 4.71906 7.51333 5.0809C7.53093 5.08513 7.5407 5.10418 7.53679 5.12111C7.53484 5.1338 7.52506 5.14438 7.51333 5.1465C6.10388 5.49565 5.26329 6.42883 4.93096 7.94392C4.92705 7.96296 4.90946 7.97354 4.89186 7.96931C4.88013 7.9672 4.87036 7.95662 4.8684 7.94392C4.54585 6.41825 3.69158 5.50623 2.28994 5.14227C2.27235 5.13803 2.26257 5.11899 2.26648 5.09995C2.26844 5.08725 2.27821 5.07667 2.28994 5.07455C3.69158 4.7254 4.53803 3.80492 4.87231 2.29194C4.87622 2.2729 4.89382 2.26232 4.91141 2.26655C4.92118 2.27502 4.93096 2.28348 4.93291 2.29406Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M8.23025 0.0407713C8.40423 0.836407 8.8519 1.31675 9.58693 1.5072C9.5967 1.50931 9.60061 1.51989 9.59865 1.52836C9.5967 1.5347 9.59279 1.54105 9.58693 1.54105C8.84603 1.72515 8.40228 2.21607 8.2283 3.01171C8.22634 3.02229 8.21657 3.02652 8.20875 3.02441C8.20288 3.02229 8.19702 3.01806 8.19702 3.01171C8.02694 2.20973 7.57733 1.72938 6.84034 1.53682C6.83057 1.5347 6.82666 1.52412 6.82861 1.51566C6.83057 1.50931 6.83448 1.50296 6.84034 1.50296C7.57733 1.31887 8.02303 0.836407 8.19897 0.0386553C8.20093 0.0280751 8.20875 0.0217269 8.21852 0.0238429C8.22439 0.025959 8.2283 0.0323071 8.23025 0.0407713Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M1.40994 1.37472C1.58197 2.17035 2.03158 2.6507 2.76661 2.84114C2.77639 2.84326 2.7803 2.85384 2.77834 2.8623C2.77639 2.86865 2.77248 2.875 2.76661 2.875C2.02572 3.05909 1.58197 3.55002 1.40798 4.34565C1.40603 4.35623 1.39625 4.36047 1.38843 4.35835C1.38257 4.35623 1.37671 4.352 1.37671 4.34565C1.20663 3.54367 0.757014 3.06333 0.0200304 2.87077C0.0102561 2.86865 0.00634635 2.85807 0.00830122 2.8496C0.0102561 2.84326 0.0141658 2.83691 0.0200304 2.83691C0.757014 2.65281 1.20272 2.17035 1.37866 1.3726C1.38061 1.36202 1.39039 1.35779 1.39821 1.3599C1.40407 1.36414 1.40994 1.36837 1.40994 1.37472Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M8.53494 7.01733C8.70892 7.81297 9.15658 8.29331 9.89161 8.48376C9.90139 8.48587 9.9053 8.49645 9.90334 8.50492C9.90139 8.51127 9.89748 8.51762 9.89161 8.51762C9.15072 8.70171 8.70697 9.19264 8.53298 9.98827C8.53103 9.99885 8.52125 10.0031 8.51343 10.001C8.50757 9.99885 8.50171 9.99462 8.50171 9.98827C8.33163 9.18629 7.88201 8.70594 7.14503 8.51338C7.13526 8.51127 7.13135 8.50069 7.1333 8.49222C7.13526 8.48587 7.13917 8.47953 7.14503 8.47953C7.88201 8.29543 8.32772 7.81297 8.50366 7.01522C8.50561 7.00464 8.51539 6.99829 8.52321 7.00041C8.52907 7.00675 8.53494 7.01099 8.53494 7.01733Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M9.14583 4.56582C9.2553 5.06732 9.53876 5.37203 10.0021 5.49265C10.0079 5.49477 10.0099 5.50111 10.0079 5.50746C10.006 5.50958 10.004 5.51169 10.0021 5.51381C9.53289 5.63019 9.25335 5.93914 9.14387 6.44276C9.14192 6.44911 9.13605 6.45334 9.13019 6.45122C9.12628 6.45122 9.12237 6.44699 9.12237 6.44276C9.01485 5.9349 8.7314 5.63231 8.26614 5.51169C8.26028 5.50958 8.25637 5.50323 8.25832 5.49688C8.25832 5.49265 8.26223 5.48842 8.26614 5.48842C8.7314 5.37203 9.0129 5.06732 9.12433 4.5637C9.12628 4.55735 9.13214 4.55312 9.13801 4.55524C9.14192 4.55735 9.14583 4.56159 9.14583 4.56582Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M2.41927 7.67308C2.52874 8.17458 2.81219 8.47929 3.2755 8.59991C3.28136 8.60202 3.28527 8.60837 3.28332 8.61472C3.28332 8.61895 3.27941 8.62318 3.2755 8.62318C2.80828 8.73957 2.52874 9.05063 2.41731 9.55213C2.41536 9.55848 2.40949 9.56271 2.40363 9.5606C2.39972 9.55848 2.39776 9.55636 2.39581 9.55213C2.28829 9.04428 2.00484 8.74168 1.53958 8.62107C1.53371 8.61895 1.5298 8.6126 1.53176 8.60626C1.53176 8.60202 1.53567 8.59779 1.53958 8.59779C2.00484 8.48141 2.28634 8.1767 2.39776 7.67308C2.39972 7.66673 2.40558 7.6625 2.41145 7.66461C2.41731 7.66673 2.41927 7.66884 2.41927 7.67308Z"
                              fill="#FFDA1D"
                            />
                            <path
                              d="M3.59492 0.00902704C3.68485 0.423773 3.91943 0.675584 4.30454 0.775038C4.30845 0.777154 4.31236 0.781386 4.3104 0.785618C4.3104 0.78985 4.30649 0.791966 4.30454 0.791966C3.91748 0.887189 3.68485 1.14535 3.59297 1.56221C3.59101 1.56644 3.5871 1.57067 3.58124 1.56856C3.57733 1.56856 3.57537 1.56433 3.57537 1.56221C3.48741 1.14323 3.25087 0.891421 2.86576 0.791966C2.86185 0.78985 2.85794 0.785618 2.85989 0.77927C2.85989 0.775038 2.8638 0.772922 2.86576 0.772922C3.25087 0.6777 3.4835 0.423773 3.57733 0.00691098C3.57928 0.00267888 3.58319 -0.00155321 3.58906 0.000562842C3.59101 0.00267889 3.59492 0.00479494 3.59492 0.00902704Z"
                              fill="#FFDA1D"
                            />
                          </svg>

                          {plan?.limits?.aiHits?.monthly} AI Hits
                        </div>
                      </div>
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
                          <p className="text-[12px] font-[500] xl:text-[12px]">
                            {feature.includes("(") ? (
                              <>
                                {feature.split("(")[0]}
                                <br />({feature.split("(")[1]}
                              </>
                            ) : (
                              feature
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                    {isFree && plan.isFree ? (
                      <button
                        disabled={true}
                        className="px-[36px] py-[12px] bg-[#06A9EF] text-white rounded-[12px] text-[16px] font-semibold w-full  transition-all cursor-not-allowed opacity-50 xl:text-[18px]  "
                      >
                        Your Current Plan
                      </button>
                    ) : (
                      <button

                        className="px-6 py-3 bg-[#06A9EF] xl:text-[16px] text-white rounded-[12px] text-[16px] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
                      >
                        Purchase Plan
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Add the Enterprise Plan as a separate SwiperSlide */}
            <SwiperSlide
              style={{ display: "flex" }}
              className="justify-center pt-6 gap-4 h-full"
            >
              <div
                className={`group relative mt-[40px] p-4 z-20 bg-white  flex flex-col gap-4 items-center justify-between rounded-[16px] purchase-plan-card min-w-[310px] h-[470.5px] ${isUser ? "max-w-[20vw]" : "max-w-[20vw] "
                  } `}
                style={{ boxShadow: "0px 0px 4.9px 0px #00000040" }}
              >
                <div className="flex text-center flex-col gap-6 text-[#333333] items-center  justify-between">
                  <p className="text-[16px] font-[600] xl:text-[20px]">
                    <span className="text-[#06A9EF]">Enterprise </span> Plan
                  </p>
                  <p className="text-[16px] font-[500]  px-2">
                    Tailored Solutions for {isUser ? "Candidates" : "Organizations"}
                  </p>
                  <div className="bg-[#DEDEDE] h-[2px] w-[90%]" />
                </div>
                <div className="flex gap-3 flex-col text-center items-center w-[168px]">
                  <img
                    src="/images/support_agent.png"
                    className="h-[100px] max-w-[100px]"
                    alt=""
                  />
                  <span className="text-[16px] font-[500] text-center xl:text-[16px]">
                    Contact Us for Custom Plan as per your needs
                  </span>
                </div>
                <button
                  // disabled={true}
                  onClick={() => router.push("/purchase/enterprise")}
                  className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] xl:text-[16px] text-[16px] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
                // style={{ opacity: 0.6 }}
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
