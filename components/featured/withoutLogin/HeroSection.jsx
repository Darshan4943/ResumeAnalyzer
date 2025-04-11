import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HeroSection() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

    const [experinceData, setExperinceData] = useState([]);
    useEffect(() => {
        axios
            .get("https://jamblix.com/api/jobs/getJobAttributes")
            .then((res) => {
                const { experiences } = res.data;
                setExperinceData(experiences);

            })
            .catch((err) => console.error(err));
    }, []);

  const sortedExperiences = (experinceData || [])
    .filter(Boolean)
    .sort((a, b) => {
      const getYearsRange = (str) => {
        const match = str?.match(/\d+/g);
        return match
          ? [parseInt(match[0]), parseInt(match[1] || Infinity)]
          : [Infinity, Infinity];
      };

      const [aStart, aEnd] = getYearsRange(a);
      const [bStart, bEnd] = getYearsRange(b);

      if (aStart !== bStart) return aStart - bStart;

      return aEnd - bEnd;
    });

  return (
    <div className="bg-[#EBF9FF] py-[30px] relative ms:h-[calc(100vh-60.8px)] flex items-center">
      <div className="  flex gap-[33px] items-center customMargins justify-between">
        <div className="flex flex-col gap-6  ml:items-start items-center ml:w-[50%] w-full">
          <div className="font-bold scr1024:text-[36px] scr460:text-[30px] text-[20px] leading-tight ml:text-start text-start ">
            Empowering <span className="text-[#06A9EF]"> Job Seekers,</span>
            <p>
              Connecting <span className="text-[#FFDA1D]"> Top Employers</span>
            </p>
          </div>
          <text className="scr1024:text-[14px] scr460:text-[14px] text-[12px] font-[400] ml:text-start text-center">
            Find Your Dream Job
            <p>Search, Apply & Unlock Endless Career Opportunities!</p>
          </text>
          <div className="scr1024:gap-4  gap-1 flex justify-end  items-center ml:w-[117%]   w-full max-w-[643px] ">
            <div className="flex ms:flex-row flex-col justify-between scr1100:h-[62px] ms:h-[48px] ms:items-center  lg:gap-2 ms:gap-1 gap-2 items-start    scr1100:px-3 ms:px-2 px-4 scr1100:py-[10px] ms:py-2 py-4 border border-[#E1E3E3] ms:rounded-[30px] rounded-[12px] bg-white w-[100%]   ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[24px] ms:block hidden"
              >
                <g mask="url(#mask0_5959_68073)">
                  <path
                    d="M9.51955 15.6133C7.81188 15.6133 6.36571 15.0211 5.18105 13.8366C3.99655 12.6519 3.4043 11.2057 3.4043 9.49806C3.4043 7.7904 3.99655 6.34423 5.18105 5.15956C6.36571 3.97506 7.81188 3.38281 9.51955 3.38281C11.2272 3.38281 12.6734 3.97506 13.858 5.15956C15.0425 6.34423 15.6348 7.7904 15.6348 9.49806C15.6348 10.2122 15.515 10.8943 15.2753 11.5443C15.0355 12.1943 14.7155 12.7596 14.3155 13.2403L20.0695 18.9943C20.208 19.1326 20.2789 19.3066 20.282 19.5163C20.2852 19.726 20.2144 19.9032 20.0695 20.0481C19.9247 20.1929 19.749 20.2653 19.5425 20.2653C19.3362 20.2653 19.1606 20.1929 19.0158 20.0481L13.2618 14.2941C12.7618 14.7069 12.1868 15.03 11.5368 15.2633C10.8868 15.4966 10.2144 15.6133 9.51955 15.6133ZM9.51955 14.1136C10.808 14.1136 11.8994 13.6664 12.7935 12.7721C13.6879 11.8779 14.135 10.7866 14.135 9.49806C14.135 8.20956 13.6879 7.11823 12.7935 6.22406C11.8994 5.32973 10.808 4.88256 9.51955 4.88256C8.23105 4.88256 7.13971 5.32973 6.24555 6.22406C5.35121 7.11823 4.90405 8.20956 4.90405 9.49806C4.90405 10.7866 5.35121 11.8779 6.24555 12.7721C7.13971 13.6664 8.23105 14.1136 9.51955 14.1136Z"
                    fill="#333333"
                    fill-opacity="0.5"
                  />
                </g>
              </svg>

              <input
                type="text"
                placeholder="Enter Skill / Designation"
                className="scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px]  font-[500] font-Montserrat scr1100:max-w-[176px] ms:max-w-[148px] placeholder:text-[#889FBA]"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />

              <div className=" bg-[#E0E0E0] ms:w-[2px] ms:h-[22px] h-[1px] w-full"></div>
              <select
                className={`scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px] font-[500] w-full font-Montserrat border-none outline-none appearance-none max-w-[148px] scr900:p-2 min-w-[80px] ${
                  experience ? "text-[#333333]" : "text-[#889FBA]"
                }`}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" disabled className="text-[#889FBA]">
                  Select Experience
                </option>
                {sortedExperiences
                  .filter((exp) => exp)
                  .map((exp, index) => (
                    <option key={index} value={exp} className="text-[#333333]">
                      {exp}
                    </option>
                  ))}
              </select>

              <div className=" bg-[#E0E0E0] ms:w-[2px] ms:h-[22px] h-[1px] w-full"></div>
              <input
                type="text"
                placeholder="Enter Location"
                className="scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px]   font-[500]  font-Montserrat scr1100:max-w-[105px] ms:max-w-[90px] placeholder:text-[#889FBA]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className=" bg-[#E0E0E0]  h-[1px] w-full ms:hidden"></div>
              <div className=" flex items-center ms:justify-end justify-center scr1100:w-[102px] ms:w-[76px] w-full">
                <button
                  onClick={() => {
                    router.push(
                      `/jobs/candidate?search=${true}&loc=${location}&exp=${experience}&jobTit=${jobTitle}`
                    );
                  }}
                  className="ms:block hidden relative z-[10] scr1100:text-[14px] text-[12px]  font-[600]  h-[38px] scr1100:w-[100px] w-[76px] px-6  bg_Button rounded-[30px]"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    router.push(
                      `/jobs/candidate?search=${true}&loc=${location}&jobTit=${jobTitle}`
                    );
                  }}
                  className="ms:hidden text-[14px] font-[600] border border-blue rounded-[12px] w-full h-[36px]"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:h-[463px] xl:w-[541px] w-[37.5vw] h-[32.1vw] xl:hidden ml:block hidden"></div>
        <img
          src="/images/withoutLogin/hero1.png"
          alt=""
          className="xl:h-[463px] xl:w-[541px] w-[37.5vw] h-[32.1vw] xl:relative  absolute right-[24px]  object-cover xl:pl-[196px] xl:overflow-visible ml:block hidden   "
        />
      </div>
    </div>
  );
}

export default HeroSection;
