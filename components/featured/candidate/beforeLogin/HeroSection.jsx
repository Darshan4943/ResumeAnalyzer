import ImageContainer from "@/components/common/image";
import { SkillList } from "@/utils/data";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";


function CandidateHero() {
  // const isInSouthAfrica = localStorage.getItem("isInSouthAfrica") == "true";

  // const router = useRouter();
  const isInSouthAfrica = localStorage.getItem("isInSouthAfrica") == "true";
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [skills, setSkills] = useState([...SkillList]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSearchInput(job);
    setJobSuggestions([]);
  };
  const jobData = [
    { id: 1, title: "Software Developer" },
    { id: 2, title: "Web Developer" },
    { id: 3, title: "Data Scientist" },
    { id: 4, title: "Database Administrator" },
    { id: 5, title: "Network Engineer" },
    { id: 6, title: "System Administrator" },
    { id: 7, title: "UX/UI Designer" },
    { id: 8, title: "Cybersecurity Analyst" },
    { id: 9, title: "IT Support Specialist" },
  ];

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setSearchInput(searchText);

    const filteredJobs = skills.filter((job) =>
      job.toLowerCase().includes(searchText.toLowerCase())
    );

    setJobSuggestions(filteredJobs);

  };
  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setJobSuggestions([]);
      setLocationSuggestions([])
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocSelect = (loc) => {
    setSelectedLocation(loc);
    setLocationInput(loc.name);
    setLocationSuggestions([]);
  };

  const handleLocationInputChange = (e) => {
    const searchText = e.target.value;
    setLocationInput(searchText);

    const googleGeocodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchText}&key=AIzaSyC18Xg49QgJj0NYpDikCbDwaWS00tKUpnM`;

    axios
      .get(googleGeocodeAPI)
      .then((response) => {
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const suggestions = data.results.map((result) => ({
            id: result.place_id,
            name: result.formatted_address,
          }));
          setLocationSuggestions(suggestions);
        }
      })
      .catch((error) => {
        console.error("Error fetching location suggestions:", error);
      });
  };
  return (
    <>
      {/* <div className="xmd:min-h-[320px] min-h-[100px] ml:min-h-[560px] bg-cover bg-no-repeat pt-[81px] overflow-hidden bg-vector ">
        <div className="customMargins">
          <div className="flex flex-row justify-between gap-4 max-w-1128">
            <div className="mr-0 p-0">
              <div className=" lg:leading-[105px] mtl:leading-[70px] leading-[50px]">
                <p className="font-Montserrat lg:text-[86px] xmd:text-[28px] mtl:text-[50px]  text-[30px] text-black font-bold ">
                  <span className=" text-[#06A9EF]">Create</span> your <br />
                  future with us
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-5 max-w-[485px] mtl:leading-[44px] leading-[22px] ">
                <div className="">
                  <p className="font-Montserrat text-[16px] lg:text-[36px] xmd:text-[28px] mtl:text-[20px] text-black font-bold">
                    Find your next{" "}
                    <span className=" text-[#06A9EF]">dream job.</span>
                  </p>
                </div>
                <div className="bg-black  h-[1px] "></div>
                <div>
                  <p className="font-Montserrat text-[18px] leading-[22px] text-black font-medium">
                    Explore the leading companies hiring now!
                  </p>
                </div>
              </div>
              <div className="candidate_searchbox display_n  ">
                <div
                  class="ml:none  mt-8 flex justify-between z-10 gap-5 px-6 py-4 items-center rounded-[16px] bg-white shadow-xl min-h-[93.33px] relative mb-11 max-scr1100:gap-2 max-scr1024:gap-1 max-scr1024:max-w-[600px] 
                                        xl:min-w-[840px] scr1400:max-w-[840px]   scr1350:max-w-[800px]  scr1300:max-w-[770px]  scr1250:max-w-[770px]   scr1200:max-w-[735px] scr1150:max-w-[700px] scr1100:max-w-[680px] scr1024:max-w-[600px] "
                >
                  <div className="flex items-center justify-between ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18%"
                      height="18%"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <path
                        d="M27.125 27.125L33.25 33.25L27.125 27.125ZM8.75 19.25C8.75 20.6289 9.02159 21.9943 9.54926 23.2682C10.0769 24.5421 10.8504 25.6996 11.8254 26.6746C12.8004 27.6496 13.9579 28.4231 15.2318 28.9507C16.5057 29.4784 17.8711 29.75 19.25 29.75C20.6289 29.75 21.9943 29.4784 23.2682 28.9507C24.5421 28.4231 25.6996 27.6496 26.6746 26.6746C27.6496 25.6996 28.4231 24.5421 28.9507 23.2682C29.4784 21.9943 29.75 20.6289 29.75 19.25C29.75 16.4652 28.6438 13.7945 26.6746 11.8254C24.7055 9.85625 22.0348 8.75 19.25 8.75C16.4652 8.75 13.7945 9.85625 11.8254 11.8254C9.85625 13.7945 8.75 16.4652 8.75 19.25V19.25Z"
                        stroke="#333333"
                        strokeWidth="3.1544"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div>
                      <input
                        type="text"
                        className="text-gray font-small text-[20px] max-scr1400:text-[18px] max-scr1350:text-[17px] max-scr1300:text-[16px] max-scr1250:text-[15px] max-scr1200:text-[15px] max-scr1150:text-[15px] max-scr1100:text-[15px]  max-scr1050:text-[15px]  placeholder-center text-center"
                        placeholder="Job title or keyword"
                      />
                    </div>
                  </div>
                  <ImageContainer
                    className="w-[3.154px] "
                    src="/images/home/searcgBarLine.png"
                    alt=""
                  />

                  <div className="flex items-center gap-4 max-scr1100:gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12%"
                      height="12%"
                      viewBox="0 0 35 34"
                      fill="none"
                    >
                      <path
                        d="M28.3919 14.1666C28.3919 20.4255 17.0586 31.1666 17.0586 31.1666C17.0586 31.1666 5.72522 20.4255 5.72522 14.1666C5.72522 11.1609 6.91926 8.27818 9.04468 6.15277C11.1701 4.02736 14.0528 2.83331 17.0586 2.83331C20.0643 2.83331 22.947 4.02736 25.0724 6.15277C27.1978 8.27818 28.3919 11.1609 28.3919 14.1666V14.1666Z"
                        stroke="#333333"
                        strokeWidth="3.1544"
                      />
                      <path
                        d="M17.0588 15.5833C17.4345 15.5833 17.7948 15.4341 18.0605 15.1684C18.3262 14.9027 18.4754 14.5424 18.4754 14.1667C18.4754 13.7909 18.3262 13.4306 18.0605 13.1649C17.7948 12.8993 17.4345 12.75 17.0588 12.75C16.683 12.75 16.3227 12.8993 16.057 13.1649C15.7913 13.4306 15.6421 13.7909 15.6421 14.1667C15.6421 14.5424 15.7913 14.9027 16.057 15.1684C16.3227 15.4341 16.683 15.5833 17.0588 15.5833Z"
                        fill="white"
                        stroke="#333333"
                        strokeWidth="3.1544"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray font-small text-[18px] max-scr1400:text-[16px]  max-scr1350:text-[15px] max-scr1100:text-[14px]">
                      Colney, United Kingdom
                    </p>
                  </div>
                  <button className="flex items-center justify-center py-4 px-12  bg-blue text-white rounded-[12px] max-scr1200:px-8 max-scr1100:px-6">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <img
              className="lg:h-[559px]  mtl:h-[330px] xmd:min-h-[300px] h-[100px] xsm:-h[200px]  absolute right-[14px] -mt-[61px] xl:relative xl:right-32"
              src={`/images/candidate/candidate_hero_img_${
                isInSouthAfrica ? 2 : 1
              }.png`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col mt-[1rem] rounded-[8px] py-2 mx-2 display_b"
        style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex gap-2 border-b border-[#DFDFDF] p-2 items-center display_b">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g mask="url(#mask0_5925_101153)">
              <path
                d="M16.2846 17.1477L11.0506 11.9137C10.634 12.2577 10.1548 12.5269 9.61315 12.7214C9.07148 12.9158 8.51112 13.0131 7.93206 13.0131C6.50776 13.0131 5.30233 12.5199 4.31577 11.5336C3.32922 10.5473 2.83594 9.34217 2.83594 7.91824C2.83594 6.49429 3.32909 5.28873 4.3154 4.30155C5.3017 3.31438 6.50683 2.8208 7.93077 2.8208C9.3547 2.8208 10.5603 3.31408 11.5474 4.30064C12.5346 5.28719 13.0282 6.49262 13.0282 7.91693C13.0282 8.51201 12.9283 9.08038 12.7285 9.62205C12.5287 10.1637 12.2622 10.6349 11.9288 11.0355L17.1628 16.2695L16.2846 17.1477ZM7.93206 11.7631C9.00579 11.7631 9.91524 11.3905 10.6604 10.6453C11.4056 9.90011 11.7782 8.99065 11.7782 7.91693C11.7782 6.8432 11.4056 5.93375 10.6604 5.18855C9.91524 4.44336 9.00579 4.07076 7.93206 4.07076C6.85834 4.07076 5.94888 4.44336 5.20369 5.18855C4.45851 5.93375 4.08592 6.8432 4.08592 7.91693C4.08592 8.99065 4.45851 9.90011 5.20369 10.6453C5.94888 11.3905 6.85834 11.7631 7.93206 11.7631Z"
                fill="#333333"
              />
            </g>
          </svg>
          <input
            type="text"
            className="  placeholder-start text-start"
            placeholder="Job title or keyword"
            value={searchInput}
            onChange={handleInputChange}
          />

          {jobSuggestions.length > 0 && (
            <div
              ref={taskRef}
              className="absolute bg-[#FFF] w-[295px] h-[216px] bottom-16  rounded-t-[8px] overflow-y-auto p-2"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
            >
              {jobSuggestions.map((job) => (
                <div
                  key={job.id}
                  className=""
                  onClick={() => handleJobSelect(job)}
                >
                  <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">
                    {job.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex  gap-2 border-b border-[#DFDFDF] p-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g mask="url(#mask0_5925_101159)">
              <path
                d="M10.0024 9.88795C10.417 9.88795 10.7715 9.74032 11.0659 9.44504C11.3602 9.14976 11.5074 8.7948 11.5074 8.38014C11.5074 7.96549 11.3597 7.611 11.0645 7.31666C10.7692 7.02233 10.4142 6.87516 9.99956 6.87516C9.58491 6.87516 9.23042 7.0228 8.93608 7.31808C8.64175 7.61336 8.49458 7.96832 8.49458 8.38298C8.49458 8.79763 8.64222 9.15212 8.9375 9.44646C9.23278 9.74079 9.58774 9.88795 10.0024 9.88795ZM10.001 16.2614C11.6313 14.802 12.8789 13.4021 13.7438 12.0619C14.6086 10.7216 15.041 9.54769 15.041 8.5402C15.041 7.02098 14.5584 5.77205 13.5931 4.79341C12.6278 3.81477 11.4305 3.32545 10.001 3.32545C8.57149 3.32545 7.37411 3.81477 6.40883 4.79341C5.44356 5.77205 4.96092 7.02098 4.96092 8.5402C4.96092 9.54769 5.39334 10.7216 6.25819 12.0619C7.12305 13.4021 8.37065 14.802 10.001 16.2614ZM10.001 17.9248C7.90377 16.1075 6.33113 14.4163 5.28304 12.8511C4.23497 11.2859 3.71094 9.84897 3.71094 8.5402C3.71094 6.61715 4.333 5.06027 5.57712 3.86956C6.82124 2.67885 8.29585 2.0835 10.001 2.0835C11.7061 2.0835 13.1807 2.67885 14.4248 3.86956C15.669 5.06027 16.291 6.61715 16.291 8.5402C16.291 9.84897 15.767 11.2859 14.7189 12.8511C13.6708 14.4163 12.0982 16.1075 10.001 17.9248Z"
                fill="#333333"
              />
            </g>
          </svg>
          <input
            type="text"
            className=" placeholder-start text-start w-full"
            placeholder="Colney, United Kingdom"
            value={locationInput}
            onChange={handleLocationInputChange}
          />

          {locationSuggestions.length > 0 && (
            <div
              ref={taskRef}
              className="  absolute bg-[#FFF] w-[295px] h-[216px]   bottom-[4%] rounded-t-[8px] overflow-y-auto p-2"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
            >
              {locationSuggestions.map((loc) => (
                <div
                  key={loc.id}
                  className=""
                  onClick={() => handleLocSelect(loc)}
                >
                  <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">
                    {loc.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-2">
          <button className="text-[14px] font-medium border border-[#06A9EF] rounded-[8px] w-full py-2">
            Search
          </button>
        </div>
      </div> */}
      <div className="w-full min-h-[100px] xxlg:h-[460px]  xlg:h-[300px] ml:h-[390px] ms:py-0 xxsm:py-4 bg-cover bg-no-repeat  bg-vector ">
        <div className="customMargins relative">
          <div className="flex flex-row justify-between gap-4">
            <div className="mr-0 p-0">
              <div className=" xlg:leading-normal w-[267px] ml:w-[350px] xxlg:w-[500px]   ">
                <p className="font-Montserrat  text-[24px] xlg:text-[36px] ml:text-[46px] text-black font-bold xxlg:text-[66px] ">
                  <span className=" text-[#06A9EF]">Create</span> your
                  future with us
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-1 xxlg:mt-1 xlg:mt-8 xlg:w-[455px] xlg:leading-[22px] ">
                <div className="w-[214px] leading-normal xlg:w-[355px] xxlg:w-[430px]">
                  <p className="font-Montserrat text-[20px] xlg:text-[26px] xxlg:text-[30px] text-black font-bold">
                    Find your next{" "}
                    <span className=" text-[#06A9EF]">dream job.</span>
                  </p>
                </div>
                <div className="bg-black  h-[1px] w-[200px] xlg:w-[355px]  xxlg:w-[430px] "></div>
                <div className="w-[254px]  xlg:w-[355px] ">
                  <p className="font-Montserrat text-[10px] xlg:text-[16px]  text-black font-medium">
                    Explore the leading companies hiring now!
                  </p>
                </div>
              </div>
              <div className="candidate_searchbox display_n  ">
                <div
                  class="ml:none  mt-8 flex justify-between z-10 gap-5 px-6 py-4 items-center rounded-[16px] bg-white shadow-xl min-h-[93.33px] relative mb-11 max-scr1100:gap-2 max-scr1024:gap-1 max-scr1024:max-w-[600px] 
                                        xl:min-w-[840px] scr1400:max-w-[840px]   scr1350:max-w-[800px]  scr1300:max-w-[770px]  scr1250:max-w-[770px]   scr1200:max-w-[735px] scr1150:max-w-[700px] scr1100:max-w-[680px] scr1024:max-w-[600px] "
                >
                  <div className="flex items-center justify-between ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18%"
                      height="18%"
                      viewBox="0 0 42 42"
                      fill="none"
                    >
                      <path
                        d="M27.125 27.125L33.25 33.25L27.125 27.125ZM8.75 19.25C8.75 20.6289 9.02159 21.9943 9.54926 23.2682C10.0769 24.5421 10.8504 25.6996 11.8254 26.6746C12.8004 27.6496 13.9579 28.4231 15.2318 28.9507C16.5057 29.4784 17.8711 29.75 19.25 29.75C20.6289 29.75 21.9943 29.4784 23.2682 28.9507C24.5421 28.4231 25.6996 27.6496 26.6746 26.6746C27.6496 25.6996 28.4231 24.5421 28.9507 23.2682C29.4784 21.9943 29.75 20.6289 29.75 19.25C29.75 16.4652 28.6438 13.7945 26.6746 11.8254C24.7055 9.85625 22.0348 8.75 19.25 8.75C16.4652 8.75 13.7945 9.85625 11.8254 11.8254C9.85625 13.7945 8.75 16.4652 8.75 19.25V19.25Z"
                        stroke="#333333"
                        strokeWidth="3.1544"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div>
                      <input
                        type="text"
                        className="  placeholder-start text-start"
                        placeholder="Job title or keyword"
                        value={searchInput}
                        onChange={handleInputChange}
                      />

                      {jobSuggestions.length > 0 && (
                        <div ref={taskRef} onWheel={(e) => e.stopPropagation()} className="absolute bg-[#FFF] w-[295px] h-[216px] top-20 left-10 rounded-t-[8px] overflow-y-auto p-2 z-[20000]" style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}>
                          {jobSuggestions.map((job) => (
                            <div key={job.id} className="" onClick={() => handleJobSelect(job)}>
                              <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">{job}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <ImageContainer
                    className="w-[3.154px] "
                    src="/images/home/searcgBarLine.png"
                    alt=""
                  />

                  <div className="flex items-center gap-4 max-scr1100:gap-2 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12%"
                      height="12%"
                      viewBox="0 0 35 34"
                      fill="none"
                    >
                      <path
                        d="M28.3919 14.1666C28.3919 20.4255 17.0586 31.1666 17.0586 31.1666C17.0586 31.1666 5.72522 20.4255 5.72522 14.1666C5.72522 11.1609 6.91926 8.27818 9.04468 6.15277C11.1701 4.02736 14.0528 2.83331 17.0586 2.83331C20.0643 2.83331 22.947 4.02736 25.0724 6.15277C27.1978 8.27818 28.3919 11.1609 28.3919 14.1666V14.1666Z"
                        stroke="#333333"
                        strokeWidth="3.1544"
                      />
                      <path
                        d="M17.0588 15.5833C17.4345 15.5833 17.7948 15.4341 18.0605 15.1684C18.3262 14.9027 18.4754 14.5424 18.4754 14.1667C18.4754 13.7909 18.3262 13.4306 18.0605 13.1649C17.7948 12.8993 17.4345 12.75 17.0588 12.75C16.683 12.75 16.3227 12.8993 16.057 13.1649C15.7913 13.4306 15.6421 13.7909 15.6421 14.1667C15.6421 14.5424 15.7913 14.9027 16.057 15.1684C16.3227 15.4341 16.683 15.5833 17.0588 15.5833Z"
                        fill="white"
                        stroke="#333333"
                        strokeWidth="3.1544"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="text"
                      className=" placeholder-start text-start w-full"
                      placeholder="Colney, United Kingdom"
                      value={locationInput}
                      onChange={handleLocationInputChange}
                    />

                    {locationSuggestions.length > 0 && (
                      <div
                        ref={taskRef} onWheel={(e) => e.stopPropagation()}
                        className="  absolute bg-[#FFF] w-[295px] h-[216px]   top-14 rounded-t-[8px] overflow-y-auto p-2"
                        style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                      >
                        {locationSuggestions.map((loc) => (
                          <div
                            key={loc.id}
                            className=""
                            onClick={() => handleLocSelect(loc)}
                          >
                            <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">
                              {loc.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => router.push("/candidate/afterLogin/jobs/dummyJobCards")} className="flex items-center justify-center py-4 px-12  bg-blue text-white rounded-[12px] max-scr1200:px-8 max-scr1100:px-6">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <img
              className="h-[184px] w-[185px] xxlg:h-[460px] xxlg:w-[480px]  xlg:w-[320px] xlg:h-[300px] ml:h-[390px] ml:w-[390px]  absolute right-0 "
              src={`/images/candidate/candidate_hero_img_${isInSouthAfrica ? 2 : 2
                }.png`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col mt-[1rem] rounded-[8px] py-2 mx-2 display_b"
        style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex gap-2 border-b border-[#DFDFDF] p-2 items-center display_b relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g mask="url(#mask0_5925_101153)">
              <path
                d="M16.2846 17.1477L11.0506 11.9137C10.634 12.2577 10.1548 12.5269 9.61315 12.7214C9.07148 12.9158 8.51112 13.0131 7.93206 13.0131C6.50776 13.0131 5.30233 12.5199 4.31577 11.5336C3.32922 10.5473 2.83594 9.34217 2.83594 7.91824C2.83594 6.49429 3.32909 5.28873 4.3154 4.30155C5.3017 3.31438 6.50683 2.8208 7.93077 2.8208C9.3547 2.8208 10.5603 3.31408 11.5474 4.30064C12.5346 5.28719 13.0282 6.49262 13.0282 7.91693C13.0282 8.51201 12.9283 9.08038 12.7285 9.62205C12.5287 10.1637 12.2622 10.6349 11.9288 11.0355L17.1628 16.2695L16.2846 17.1477ZM7.93206 11.7631C9.00579 11.7631 9.91524 11.3905 10.6604 10.6453C11.4056 9.90011 11.7782 8.99065 11.7782 7.91693C11.7782 6.8432 11.4056 5.93375 10.6604 5.18855C9.91524 4.44336 9.00579 4.07076 7.93206 4.07076C6.85834 4.07076 5.94888 4.44336 5.20369 5.18855C4.45851 5.93375 4.08592 6.8432 4.08592 7.91693C4.08592 8.99065 4.45851 9.90011 5.20369 10.6453C5.94888 11.3905 6.85834 11.7631 7.93206 11.7631Z"
                fill="#333333"
              />
            </g>
          </svg>
          {/* <input
            type="text"
            className="  placeholder-start text-start"
            placeholder="Job title or keyword"
            value={searchInput}
            onChange={handleInputChange}
          />

          {jobSuggestions.length > 0 && (
            <div ref={taskRef}     onWheel={(e) => e.stopPropagation()} className="absolute bg-[#FFF] w-[295px] h-[216px] top-20 left-10 rounded-t-[8px] overflow-y-auto p-2 z-[20000]" style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}>
              {jobSuggestions.map((job) => (
                <div key={job.id} className=""
                 onClick={() => handleJobSelect(job)}>
                  <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">{job}</p>
                </div>
              ))}
            </div>
          )} */}
        </div>

        <div className="flex  gap-2 border-b border-[#DFDFDF] p-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g mask="url(#mask0_5925_101159)">
              <path
                d="M10.0024 9.88795C10.417 9.88795 10.7715 9.74032 11.0659 9.44504C11.3602 9.14976 11.5074 8.7948 11.5074 8.38014C11.5074 7.96549 11.3597 7.611 11.0645 7.31666C10.7692 7.02233 10.4142 6.87516 9.99956 6.87516C9.58491 6.87516 9.23042 7.0228 8.93608 7.31808C8.64175 7.61336 8.49458 7.96832 8.49458 8.38298C8.49458 8.79763 8.64222 9.15212 8.9375 9.44646C9.23278 9.74079 9.58774 9.88795 10.0024 9.88795ZM10.001 16.2614C11.6313 14.802 12.8789 13.4021 13.7438 12.0619C14.6086 10.7216 15.041 9.54769 15.041 8.5402C15.041 7.02098 14.5584 5.77205 13.5931 4.79341C12.6278 3.81477 11.4305 3.32545 10.001 3.32545C8.57149 3.32545 7.37411 3.81477 6.40883 4.79341C5.44356 5.77205 4.96092 7.02098 4.96092 8.5402C4.96092 9.54769 5.39334 10.7216 6.25819 12.0619C7.12305 13.4021 8.37065 14.802 10.001 16.2614ZM10.001 17.9248C7.90377 16.1075 6.33113 14.4163 5.28304 12.8511C4.23497 11.2859 3.71094 9.84897 3.71094 8.5402C3.71094 6.61715 4.333 5.06027 5.57712 3.86956C6.82124 2.67885 8.29585 2.0835 10.001 2.0835C11.7061 2.0835 13.1807 2.67885 14.4248 3.86956C15.669 5.06027 16.291 6.61715 16.291 8.5402C16.291 9.84897 15.767 11.2859 14.7189 12.8511C13.6708 14.4163 12.0982 16.1075 10.001 17.9248Z"
                fill="#333333"
              />
            </g>
          </svg>
          {/* <input
            type="text"
            className=" placeholder-start text-start w-full"
            placeholder="Colney, United Kingdom"
            value={locationInput}
            onChange={handleLocationInputChange}
          />

          {locationSuggestions.length > 0 && (
            <div
              ref={taskRef}     onWheel={(e) => e.stopPropagation()}
              className="  absolute bg-[#FFF] w-[295px] h-[216px]   bottom-[4%] rounded-t-[8px] overflow-y-auto p-2"
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
            >
              {locationSuggestions.map((loc) => (
                <div
                  key={loc.id}
                  className=""
                  onClick={() => handleLocSelect(loc)}
                >
                  <p className="flex flex-col p-2 text-[#333] text-[16px] font-normal cursor-pointer">
                    {loc.name}
                  </p>
                </div>
              ))}
            </div>
          )} */}
        </div>
        <div className="p-2">
          <button onClick={() => router.push("/candidate/afterLogin/jobs/dummyJobCards")} className="text-[14px] font-medium border border-[#06A9EF] rounded-[8px] w-full py-2">
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default CandidateHero;
