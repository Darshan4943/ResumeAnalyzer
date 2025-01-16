import React from 'react';
import { useSelector } from 'react-redux';
import { camelCase } from '../../../utils/middleware';

function TopSection() {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  console.log("response", userDataGlobal)
  return (
    <div className={`lg:flex flex lg:flex-row flex-col flex-wrap items-start ${userDataGlobal.role == "employer" ? "lg:justify-between" : "justify-start"} gap-3`}>
      <div
        className="flex flex-col gap-6 p-4 rounded-[16px] w-full lg:w-[32%] scr1067:w-[24%] "
        style={{
          background:
            "linear-gradient(31.62deg, #06A9EF 14.94%, #A2E3FF 99.61%)",
        }}
      >
        <div className="flex gap-4 items-center">
          <img
            src="/images/resumeBuilder/Illustration.png"
            alt=""
            className="w-[35.33%] max-w-[106px] h-[98px]"
          />
          <div className="flex w-[62.67%] flex-col gap-3">
            <div
              className="text-[18px] font-semibold p-2 rounded-l-[6px] leading-tight text-[#06A9EF] w-full mr-[-16px]"
              style={{
                background:
                  "linear-gradient(89.03deg, #FFFFFF 0.83%, rgba(255, 254, 254, 0) 98.41%)",
              }}
            >
              Hello,
            </div>
            {userDataGlobal?.firstName && (
              <div className="text-[18px] flex scr540:gap-2 flex-col scr540:flex-row lg:flex-col lg:gap-0 text-[#FFFFFF] font-semibold leading-tight break-all">
                <p> {camelCase(userDataGlobal?.firstName)}</p>
                <p> {camelCase(userDataGlobal?.lastName)}!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start w-[100%] lg:w-[32%] scr1067:w-[24%] gap-[6px]  ml:gap-4 h-[130px]"
        style={{
          borderRadius: "12px",
          borderLeft: "4px solid #57697B",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex items-center justify-between self-stretch">
          <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px]  font-semibold leading-normal">
            77
          </p>
          <div className="w-[69%]">
            <p className=" text-[16px] leading-4 font-medium font-montserrat ">
              New candidates to review
            </p>
          </div>
          <img
            src="/images/afterLoginHome/arrow_forward_ios.png"
            className="h-[24px] w-[24px]"
            alt=""
          />
        </div>
        <div className="flex items-center gap-[3px]">
          <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md bg-[#FFD6D6]">
            <svg
              xlgns="http://www.w3.org/2000/svg"
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
            >
              <path
                d="M1.3267 0.751982L0 2.09319L7.01254 9.23033L10.8031 5.39831L15.7308 10.332H13.267V12.248H18.9528V6.50001H17.0575V8.99083L10.8031 2.66799L7.01254 6.50001L1.3267 0.751982Z"
                fill="#C00000"
              />
            </svg>
          </div>
          <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
            {" "}
            <span className="text-[12px] font-Montserrat font-normal text-[#C00000]">
              {" "}
              0.6%
            </span>{" "}
            from last Week
          </p>
        </div>
      </div>

      {userDataGlobal.role == "employer" ? <div
        className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[32%] scr1067:w-[24%] w-[100%] gap-[6px]  ml:gap-4 h-[130px]"
        style={{
          borderRadius: "12px",
          borderLeft: "4px solid #FFDA1D",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex items-center justify-between self-stretch">
          <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] font-semibold leading-normal">
            03
          </p>
          <div className="w-[69%]">
            <p className="text-[16px] leading-4 font-medium font-montserrat ">
              Interview Schedule for today
            </p>
          </div>
          <img
            src="/images/afterLoginHome/arrow_forward_ios.png"
            className="h-[24px] w-[24px]"
            alt=""
          />
        </div>
        <div className="flex items-center gap-[3px]">
          <div
            className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
            style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}
          >
            <svg
              xlgns="http://www.w3.org/2000/svg"
              width="20"
              height="13"
              viewBox="0 0 20 13"
              fill="none"
            >
              <path
                d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                fill="#00AF12"
              />
            </svg>
          </div>
          <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
            {" "}
            <span className="text-[12px] font-Montserrat font-normal text-[#00AF12]">
              {" "}
              0.5%
            </span>{" "}
            from last Week
          </p>
        </div>
      </div> : ""}

      {userDataGlobal.role == "employer" ? <div
        className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[32%] scr1067:w-[24%] w-[100%] gap-[6px]  ml:gap-4 h-[130px]"
        style={{
          borderRadius: "12px",
          borderLeft: "4px solid #06A9EF",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex items-center justify-between self-stretch">
          <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px]  font-semibold leading-normal">
            04
          </p>
          <div className="w-[69%]">
            <p className=" text-[16px] leading-4 font-medium font-montserrat ">
              In Preboarding process
            </p>
          </div>
          <img
            src="/images/afterLoginHome/arrow_forward_ios.png"
            className="h-[24px] w-[24px]"
            alt=""
          />
        </div>
        <div className="flex items-center gap-[3px]">
          <div
            className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
            style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}
          >
            <svg
              xlgns="http://www.w3.org/2000/svg"
              width="20"
              height="13"
              viewBox="0 0 20 13"
              fill="none"
            >
              <path
                d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                fill="#00AF12"
              />
            </svg>
          </div>
          <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
            {" "}
            <span className="text-[12px] font-Montserrat font-normal text-[#00AF12]">
              {" "}
              1.6%
            </span>{" "}
            from last Week
          </p>
        </div>
      </div> : ""}

    </div>

  );
}

export default TopSection;
