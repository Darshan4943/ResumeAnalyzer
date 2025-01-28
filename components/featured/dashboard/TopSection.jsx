import React from 'react';
import { useSelector } from 'react-redux';
import { camelCase } from '../../../utils/middleware';
import CountUp from 'react-countup';

function TopSection({ statistics,scrollToPendingJobs}) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  console.log(statistics);
  const calculatePercentageChange = (statistics) => {

  }

  const applicantChange = calculatePercentageChange(statistics);

  return (
    <div className={`lg:flex flex lg:flex-row flex-col flex-wrap items-start ${userDataGlobal?.role == "employer" ? "lg:justify-between" : "justify-start"} gap-3`}>
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
      onClick={()=>scrollToPendingJobs()}
        className=" cursor-pointer flex py-2 px-4 ml:p-4 flex-col justify-center items-start w-[100%] lg:w-[32%] scr1067:w-[24%] gap-[6px]  ml:gap-4 h-[130px]"
        style={{
          borderRadius: "12px",
          borderLeft: "4px solid #57697B",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex items-center justify-between self-stretch">
          <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px]  font-semibold leading-normal">
            <CountUp end={statistics.pending} />
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
        <div className='w-full flex justify-end '>
          <svg width="220" height="44" viewBox="0 0 382 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 64C1 64 12.3298 35.153 33.1282 29.0957C53.9266 23.0384 63.9333 21.5508 63.9333 21.5508C63.9333 21.5508 78.699 21.5508 90.1777 21.5508C101.656 21.5508 98.8869 4.53485 107.06 4.53485C115.233 4.53485 115.217 32.9728 122.78 32.9728C130.343 32.9728 140.264 19.03 151.831 21.5508C163.398 24.0716 184.825 32.9728 191.761 32.9728C198.697 32.9728 204.296 4.53485 212.07 4.53485C219.844 4.53485 236.653 34.7771 242.234 32.9728C247.814 31.1684 256.8 1 264.19 1C270.075 1 282.1 29.057 284.678 29.0957C292.762 29.2172 298.192 13.9284 303.423 13.9284C310.323 13.9284 321.377 6.24375 333.553 4.53485C345.729 2.82594 346.218 23.07 361.639 21.5508C365.875 21.1335 370.95 23.2017 374.437 28.1008C377.446 32.3274 379.054 38.4325 380.521 45.647C381.479 50.3642 380.521 64 380.521 64" fill="url(#paint0_linear_0_116)" />
            <path d="M1 62.0769C1 62.0769 13.3041 34.6691 34.0195 28.756C54.7349 22.8429 64.6632 21.9723 64.6632 21.9723C64.6632 21.9723 78.0327 21.9723 89.4656 21.9723C100.898 21.9723 98.4151 5.28236 106.556 5.28236C114.696 5.28236 115.693 33.1332 123.226 33.1332C130.759 33.1332 140.07 19.5115 151.591 21.9723C163.113 24.433 184.092 33.1332 191 33.1332C197.908 33.1332 203.274 5.28236 211.017 5.28236C218.76 5.28236 235.832 34.8946 241.39 33.1332C246.948 31.3718 255.923 1.5 263.284 1.5C269.145 1.5 281.204 28.7182 283.772 28.756C291.823 28.8746 297.2 14.0802 302.411 14.0802C309.283 14.0802 319.425 6.95057 331.552 5.28236C343.68 3.61415 344.91 23.4553 360.27 21.9723C375.629 20.4892 381 47.605 381 47.605" stroke="#FFB836" stroke-width="2" />
            <defs>
              <linearGradient id="paint0_linear_0_116" x1="1" y1="1" x2="1" y2="64" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F0993B" />
                <stop offset="1" stop-color="#E0ECFF" stop-opacity="0.103775" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

      {userDataGlobal?.role == "employer" ?
        <div
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

      {userDataGlobal?.role == "employer" ? <div
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
