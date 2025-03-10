import React from "react";
import { useSelector } from "react-redux";
import { camelCase } from "../../../utils/middleware";
import CountUp from "react-countup";
import { useRouter } from "next/router";

function TopSection({
  statistics,
  scrollToPendingJobs,
  scrollToInterviewJobs,
}) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const router = useRouter();
  const calculatePercentageChange = (statistics) => {};
  const applicantChange = calculatePercentageChange(statistics);

const jobStats =
  userDataGlobal?.role === "employer"
    ? [
        {
          title: "Total Jobs Posted",
          count: statistics.totalJobs,
          color: "#57697B",
          svg: "svg1",
        },
        {
          title: "Total Applications",
          count: statistics.totalApplications,
          color: "#57697B",
          svg: "svg2",
        },
        {
          title: "Hired",
          count: statistics.hired,
          color: "#57697B",
          svg: "svg3",
        },
        {
          title: "Rejected",
          count: statistics.rejected,
          color: "#57697B",
          svg: "svg4",
        },
      ]
    : [
        {
          title: "Total Jobs Posted",
          count: statistics.totalJobs,
          color: "#57697B",
          svg: "svg1",
        },
        {
          title: "Total Applications",
          count: statistics.totalApplications,
          color: "#57697B",
          svg: "svg2",
        },
        {
          title: "Shortlisted",
          count: statistics.shortlisted,
          color: "#57697B",
          svg: "svg3",
        },
        {
          title: "Rejected",
          count: statistics.rejected,
          color: "#57697B",
          svg: "svg4",
        },
      ];


  const SVGs = {
    svg1: (
      <svg width="220" height="63" viewBox="0 0 380 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63C0 63 11.3298 34.153 32.1282 28.0957C52.9266 22.0384 62.9333 20.5508 62.9333 20.5508C62.9333 20.5508 77.699 20.5508 89.1777 20.5508C100.656 20.5508 97.8869 3.53485 106.06 3.53485C114.233 3.53485 114.217 31.9728 121.78 31.9728C129.343 31.9728 139.264 18.03 150.831 20.5508C162.398 23.0716 183.825 31.9728 190.761 31.9728C197.697 31.9728 203.296 3.53485 211.07 3.53485C218.844 3.53485 235.653 33.7771 241.234 31.9728C246.814 30.1684 255.8 0 263.19 0C269.075 0 281.1 28.057 283.678 28.0957C291.762 28.2172 297.192 12.9284 302.423 12.9284C309.323 12.9284 320.377 5.24375 332.553 3.53485C344.729 1.82594 345.218 22.07 360.639 20.5508C364.875 20.1335 369.95 22.2017 373.437 27.1008C376.446 31.3274 378.054 37.4325 379.521 44.647C380.479 49.3642 379.521 63 379.521 63" fill="url(#paint0_linear_8916_109982)"/>
      <defs>
      <linearGradient id="paint0_linear_8916_109982" x1="0" y1="0" x2="0" y2="63" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00B4D8"/>
      <stop offset="1" stop-color="#E0ECFF" stop-opacity="0.103775"/>
      </linearGradient>
      </defs>
      </svg>
      
    ),
    svg2: (
      <svg width="220" height="63" viewBox="0 0 380 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63C0 63 11.3298 34.153 32.1282 28.0957C52.9266 22.0384 62.9333 20.5508 62.9333 20.5508C62.9333 20.5508 77.699 20.5508 89.1777 20.5508C100.656 20.5508 97.8869 3.53485 106.06 3.53485C114.233 3.53485 114.217 31.9728 121.78 31.9728C129.343 31.9728 139.264 18.03 150.831 20.5508C162.398 23.0716 183.825 31.9728 190.761 31.9728C197.697 31.9728 203.296 3.53485 211.07 3.53485C218.844 3.53485 235.653 33.7771 241.234 31.9728C246.814 30.1684 255.8 0 263.19 0C269.075 0 281.1 28.057 283.678 28.0957C291.762 28.2172 297.192 12.9284 302.423 12.9284C309.323 12.9284 320.377 5.24375 332.553 3.53485C344.729 1.82594 345.218 22.07 360.639 20.5508C364.875 20.1335 369.95 22.2017 373.437 27.1008C376.446 31.3274 378.054 37.4325 379.521 44.647C380.479 49.3642 379.521 63 379.521 63" fill="url(#paint0_linear_8916_109985)"/>
      <defs>
      <linearGradient id="paint0_linear_8916_109985" x1="0" y1="0" x2="0" y2="63" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4800D8"/>
      <stop offset="1" stop-color="#E0ECFF" stop-opacity="0.103775"/>
      </linearGradient>
      </defs>
      </svg>
      
    ),
    svg3: (
      <svg width="220" height="63" viewBox="0 0 380 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63C0 63 11.3298 34.153 32.1282 28.0957C52.9266 22.0384 62.9333 20.5508 62.9333 20.5508C62.9333 20.5508 77.699 20.5508 89.1777 20.5508C100.656 20.5508 97.8869 3.53485 106.06 3.53485C114.233 3.53485 114.217 31.9728 121.78 31.9728C129.343 31.9728 139.264 18.03 150.831 20.5508C162.398 23.0716 183.825 31.9728 190.761 31.9728C197.697 31.9728 203.296 3.53485 211.07 3.53485C218.844 3.53485 235.653 33.7771 241.234 31.9728C246.814 30.1684 255.8 0 263.19 0C269.075 0 281.1 28.057 283.678 28.0957C291.762 28.2172 297.192 12.9284 302.423 12.9284C309.323 12.9284 320.377 5.24375 332.553 3.53485C344.729 1.82594 345.218 22.07 360.639 20.5508C364.875 20.1335 369.95 22.2017 373.437 27.1008C376.446 31.3274 378.054 37.4325 379.521 44.647C380.479 49.3642 379.521 63 379.521 63" fill="url(#paint0_linear_8916_109982)"/>
      <defs>
      <linearGradient id="paint0_linear_8916_109982" x1="0" y1="0" x2="0" y2="63" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00B4D8"/>
      <stop offset="1" stop-color="#E0ECFF" stop-opacity="0.103775"/>
      </linearGradient>
      </defs>
      </svg>
      
    ),
    svg4: (
      <svg width="220" height="63" viewBox="0 0 380 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 63C0 63 11.3298 34.153 32.1282 28.0957C52.9266 22.0384 62.9333 20.5508 62.9333 20.5508C62.9333 20.5508 77.699 20.5508 89.1777 20.5508C100.656 20.5508 97.8869 3.53485 106.06 3.53485C114.233 3.53485 114.217 31.9728 121.78 31.9728C129.343 31.9728 139.264 18.03 150.831 20.5508C162.398 23.0716 183.825 31.9728 190.761 31.9728C197.697 31.9728 203.296 3.53485 211.07 3.53485C218.844 3.53485 235.653 33.7771 241.234 31.9728C246.814 30.1684 255.8 0 263.19 0C269.075 0 281.1 28.057 283.678 28.0957C291.762 28.2172 297.192 12.9284 302.423 12.9284C309.323 12.9284 320.377 5.24375 332.553 3.53485C344.729 1.82594 345.218 22.07 360.639 20.5508C364.875 20.1335 369.95 22.2017 373.437 27.1008C376.446 31.3274 378.054 37.4325 379.521 44.647C380.479 49.3642 379.521 63 379.521 63" fill="url(#paint0_linear_8916_109985)"/>
      <defs>
      <linearGradient id="paint0_linear_8916_109985" x1="0" y1="0" x2="0" y2="63" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4800D8"/>
      <stop offset="1" stop-color="#E0ECFF" stop-opacity="0.103775"/>
      </linearGradient>
      </defs>
      </svg>
    ),
  };

  return (
    <div
      className={`lg:flex flex lg:flex-row flex-col flex-wrap items-start ${
        userDataGlobal?.role === "employer"
          ? "lg:justify-start  gap-3"
          : "justify-start gap-3"
      } `}
    >
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
      <div className="flex flex-wrap gap-4">
        {jobStats.map((stat, index) => (
          <div
            key={index}
            style={{
              borderRadius: "12px",
              borderLeft: `4px solid ${stat.color}`,
              backgroundColor: "#fff",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
            className="w-[242px] h-[130px] bg-white shadow-md rounded-lg p-4 relative"
          >
            <div className="text-gray-700 font-medium text-lg">
              {stat.title}
            </div>
            <div className="text-3xl font-semibold text-gray-900 mt-1">
              {stat.count}
            </div>

            <div className="absolute bottom-0 left-0 w-[60px] h-[60px]">
              {SVGs[stat.svg]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSection;
