import React, { useState } from "react";
import { inputData } from "~/utils/data";
const InputBox = ({ item }) => {
  const { title, child, img } = item;

  return (
    <>
      <div className="rounded-md bg-white shadow-md flex  justify-center items-center group relative ">
        <div className="text-[#333] justify-center items-center text-[14px] flex font-medium w-auto px-4 py-3 gap-1">
          <div class="">
            <div class="bg-blue-500 transition-transform transform  flex items-center justify-center gap-1">
              {title}
              <img src={img} className=" h-[20px] w-[20px]  object-cover" />
            </div>
            <div class="  hidden dropdown bg-[#fff] p-4 group-hover:block   dropdown-hover:block absolute bottom-100 left-[1px] w-[340px] gap-[10px] top-[46px]">

              <div className="flex flex-col gap-5 items-start">
                <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                  <div className="w-[24px] h-[24px]">
                    <img src="./images/jobs/ser.png" alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="search"
                    className="font-montserrat font-normal text-[14px] text-black "
                  />
                </div>

                <div className="flex  gap-2 self-stretch flex-col items-start ">
                  {child.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <p className="font-montserrat font-medium text-[12px] text-black flex flex-col">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-start w-full gap-2">
                  <button className="rounded-[8px] border border-blue w-[49%] text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-black ">
                      clear
                    </p>
                  </button>
                  <button className="rounded-[8px] border border-blue bg-blue w-[49%]  text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-white  ">
                      Apply
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function Jobs() {
  const [toggle, setToggle] = useState(false)
  
  const toggleChange= ()=>{
    setToggle(!toggle)

  }

  return (
    <>
      <div style={{ backgroundColor: "#E0F6FF" }}>
        <div>
          <div className="candidate_searchbox customMargins py-4 ">
            <div className="flex flex-row justify-center items-center w-1128 p-[10px]  pl-[16px] pr-[16px] md:w-full  rounded-lg  bg-white shadow-md">
              <div className="flex items-center gap-0  p-0  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8%"
                  height="8%"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M27.125 27.125L33.25 33.25L27.125 27.125ZM8.75 19.25C8.75 20.6289 9.02159 21.9943 9.54926 23.2682C10.0769 24.5421 10.8504 25.6996 11.8254 26.6746C12.8004 27.6496 13.9579 28.4231 15.2318 28.9507C16.5057 29.4784 17.8711 29.75 19.25 29.75C20.6289 29.75 21.9943 29.4784 23.2682 28.9507C24.5421 28.4231 25.6996 27.6496 26.6746 26.6746C27.6496 25.6996 28.4231 24.5421 28.9507 23.2682C29.4784 21.9943 29.75 20.6289 29.75 19.25C29.75 16.4652 28.6438 13.7945 26.6746 11.8254C24.7055 9.85625 22.0348 8.75 19.25 8.75C16.4652 8.75 13.7945 9.85625 11.8254 11.8254C9.85625 13.7945 8.75 16.4652 8.75 19.25V19.25Z"
                    stroke="#333333"
                    stroke-width="3.1544"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div>
                  <input
                    type="text"
                    className="text-gray font-small text-[16px] max-scr1400:text-[14px] max-scr1350:text-[13px] max-scr1300:text-[14px] max-scr1250:text-[12px] max-scr1200:text-[11px] max-scr1150:text-[13px] max-scr1100:text-[13px]  max-scr1050:text-[13px]  placeholder-center text-center"
                    placeholder="Job title or keyword"
                  />
                </div>
              </div>

              <img
                className="w-[3.154px] "
                src="./images/jobs/searchBarLine.png"
                alt=""
              />
              <div className="flex items-center gap-3 max-scr1100:gap-2 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6%"
                  height="6%"
                  viewBox="0 0 35 34"
                  fill="none"
                >
                  <path
                    d="M28.3919 14.1666C28.3919 20.4255 17.0586 31.1666 17.0586 31.1666C17.0586 31.1666 5.72522 20.4255 5.72522 14.1666C5.72522 11.1609 6.91926 8.27818 9.04468 6.15277C11.1701 4.02736 14.0528 2.83331 17.0586 2.83331C20.0643 2.83331 22.947 4.02736 25.0724 6.15277C27.1978 8.27818 28.3919 11.1609 28.3919 14.1666V14.1666Z"
                    stroke="#333333"
                    stroke-width="3.1544"
                  />
                  <path
                    d="M17.0588 15.5833C17.4345 15.5833 17.7948 15.4341 18.0605 15.1684C18.3262 14.9027 18.4754 14.5424 18.4754 14.1667C18.4754 13.7909 18.3262 13.4306 18.0605 13.1649C17.7948 12.8993 17.4345 12.75 17.0588 12.75C16.683 12.75 16.3227 12.8993 16.057 13.1649C15.7913 13.4306 15.6421 13.7909 15.6421 14.1667C15.6421 14.5424 15.7913 14.9027 16.057 15.1684C16.3227 15.4341 16.683 15.5833 17.0588 15.5833Z"
                    fill="white"
                    stroke="#333333"
                    stroke-width="3.1544"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-gray font-small text-[16px] max-scr1400:text-[14px]  max-scr1350:text-[13px] max-scr1100:text-[12px]">
                  Colney, United Kingdom
                </p>
              </div>
              <button className="flex items-center justify-center p-2 px-9 border border-primary bg-blue text-white rounded-[12px] max-scr1200:px-6 max-scr1100:px-">
                Search
              </button>
            </div>
          </div>


          <div style={{ backgroundColor: "#BCECFF" }} className="">
            <div className="customMargins">
              <div className="flex items-center py-5 justify-between">
                {inputData.map((item, index) => (
                  <InputBox
                    item={item}
                    className="text-[14px] font-medium flex items-center w-auto "
                  />
                ))}
                <button onClick={toggleChange} className="px-4 py-3  rounded-[6px] bg-[#FFF] ">
                  <img className="h-[24px] w-[24px]" src="./images/jobs/fil.png" alt="" />

                </button>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#E0F6FF" }}>
            <div className=" customMargins  ">
              <div className="flex  items-start gap-[10px] py-[8px]">
                <p className="text-[18px] text-black">Internal Jobs</p>
                <p className="text-[18px] text-black">External Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F9F9F9]">
        <div className=" customMargins ">
          <div className="grid grid-cols-12 py-[24px] gap-[24px] ">

            {/* FIRST SECTION   */}

            {toggle &&
              <div className="flex flex-col col-span-3 rounded-md bg-white shadow-md ">
                <div className="flex justify-between  p-4 bg-white shadow-md  items-start gap-4 ">
                  <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                    All Filters
                  </p>
                  <button className="text-primary font-montserrat text-sm font-medium text-blue">
                    Reset all
                  </button>
                </div>

                <div className="flex flex-col items-start justify-center p-4 gap-2">
                  <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                    <p className="font-montserrat font-medium text-[16px] text-black">
                      By Location
                    </p>
                  </div>
                  <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                    <div className="w-[24px] h-[24px]">
                      <img src="./images/jobs/ser.png" alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="search"
                      className="font-montserrat font-normal text-[14px] text-black "
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Bengaluru / Banglore
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray w-full h-[10px]"></div>

                  <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                    <p className="font-montserrat font-medium text-[16px] text-black">
                      By Industry
                    </p>
                  </div>
                  <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                    <div className="w-[24px] h-[24px]">
                      <img src="./images/jobs/ser.png" alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="search"
                      className="font-montserrat font-normal text-[14px] text-black "
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Others
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        IT/ Computers - Software
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Banking/ Accounting/Financial Services
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Internet/ E-commerce
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Education/ Training
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray w-full h-[10px]"></div>
                  <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                    <p className="font-montserrat font-medium text-[16px] text-black">
                      By Location
                    </p>
                  </div>
                  <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                    <div className="w-[24px] h-[24px]">
                      <img src="./images/jobs/ser.png" alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="search"
                      className="font-montserrat font-normal text-[14px] text-black "
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Bengaluru / Banglore
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray w-full h-[10px]"></div>
                  <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                    <p className="font-montserrat font-medium text-[16px] text-black">
                      By Location
                    </p>
                  </div>
                  <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                    <div className="w-[24px] h-[24px]">
                      <img src="./images/jobs/ser.png" alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="search"
                      className="font-montserrat font-normal text-[14px] text-black "
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Bengaluru / Banglore
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                      />

                      <p className="font-montserrat font-medium text-[12px] text-black">
                        Chennai
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-gray w-full h-[10px]"></div>
                </div>
              </div>

            }
            {/* SECOND SECTION   */}
            <div className={`flex flex-col p-3 ${toggle ? 'col-span-4' : 'col-span-5'} rounded-md border-primary bg-white shadow-md`}>
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  style={{
                    borderBottom: "1px solid #bebebe",
                    // border-right: '4px solid var(--primary, #06A9EF)',
                    paddingBottom: "10px",
                    // borderRight:"4px solid var(--primary, #06A9EF)"
                  }}
                >
                  <p className="text-[#333] text-[20px] font-medium">
                    UX Designer
                  </p>
                  <div className="flex items-center justify-between h-[16px]">
                    <div className="flex font-medium ">
                      <span className="text-[12px] text-black flex font-[500px]">
                        TechGenius Innovations
                      </span>
                      <img
                        src="./images/jobs/str.png"
                        alt=""
                        className="w-[12px] h-[12px]"
                      />
                      <p className="text-[10px] text-black pl-[4px]">3.7</p>
                    </div>
                    <div className="">
                      <img
                        src="./images/jobs/ux.png"
                        alt=""
                        className=" w-[56px] h-[56px] right-0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-[11px] mt-[16px]">
                    <div className="flex items-center gap-[4px] ">
                      <img
                        src="./images/jobs/work.png"
                        alt=""
                        className="h-[14px] "
                      />
                      <p className="text-[12px] font-[400px] h-[15px] text-black">
                        1-2 yrs
                      </p>
                    </div>

                    <div className="h-[12px] w-[1px] bg-custom-black"></div>
                    <div className="sec_h flex items-center gap-[4px]">
                      <img
                        src="./images/jobs/tm.png"
                        alt=""
                        className="h-[14px] "
                      />
                      <p className="text-[10px] font-[400px] h-[15px] text-black">
                        Part Time
                      </p>
                    </div>

                    <div className="h-[12px] w-[1px] bg-custom-black"></div>
                    <div className=" flex items-center gap-[4px]">
                      <img
                        src="./images/jobs/lo.png"
                        alt=""
                        className="h-[14px] "
                      />
                      <p className="text-[10px] font-[400px] h-[15px] text-black">
                        Mumbai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-[16px] gap-[4px] ">
                    <img
                      src="./images/jobs/desc.png"
                      alt=""
                      className="h-[13px] w-[14px] "
                    />

                    <p className="text-[12px] md:text-[10px]  text-ui-c  flex-wrap  font-normal">
                      TechGenius Innovations is seeking a talented and
                      experienced <br /> UX Designer to join our team. As a
                      UX....
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-[4px]">
                    <p className="text-[12px] font-[500px] text-ui-c2">
                      Posted 3 Days Ago
                    </p>
                    <img
                      src="./images/jobs/bk.png"
                      alt=""
                      className="h-[24px] w-[24px] "
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* LAST SECTION   */}
            <div className={`flex ${toggle  ? 'col-span-5' : 'col-span-7'} flex-col border border-primary rounded-md bg-white shadow-md  border-[#06A9EF] `}>
              <div
                className="flex flex-col items-start gap-16 "
              //  style={{
              //     borderBottom: "1px solid #bebebe",
              //     // paddingBottom: "1px",
              //   }}
              >
                <div className="flex flex-col items-start gap-[16px] ">
                  <div className="flex flex-col items-start gap-[4px] px-4 py-2">
                    <p className="text-[#333] text-[18px] font-medium">
                      UX Designer
                    </p>
                    <p className="text-[10px] text-black flex font-normal">
                      TechGenius Innovations
                    </p>
                    <div className=" flex items-center gap-[4px]">
                      <img
                        src="./images/jobs/lo.png"
                        alt=""
                        className="h-[14px] "
                      />
                      <p className="text-[11px] font-[400px] h-[15px] text-black">
                        Mumbai
                      </p>
                    </div>
                    <div className=" bg-[#06A9EF] rounded-[30px] ">
                      <button className=" text-white font-medium font-montserrat text-[14px] px-[10px] py-[4px] ">
                        {" "}
                        Apply Now{" "}
                      </button>
                    </div>
                  </div>

                  {/* JOB DETAILS / */}

                  <div class="flex flex-col items-start gap-9 ">
                    <div class="flex flex-col items-start gap-[4px] px-4  ">
                      <p className="text-[#333] text-[18px] font-medium">
                        Job Details
                      </p>
                      <div className=" flex items-center gap-[4px]">
                        <img
                          src="./images/jobs/work.png"
                          alt=""
                          className="h-[14px] "
                        />
                        <p className="text-[11px] font-[400px] h-[15px] text-black">
                          Part Time
                        </p>
                      </div>
                      <div className=" flex items-center gap-[4px]">
                        <img
                          src="./images/jobs/tm.png"
                          alt=""
                          className="h-[14px] "
                        />
                        <p className="text-[11px] font-[400px] h-[15px] text-black">
                          Permanent
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-8 ">
                    <div className="flex flex-col items-start gap-[5px] px-4 ">
                      <div className="">
                        <p className="text-[#333] text-[18px] font-medium">
                          Qualifications
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-[400px] h-[15px] text-black ">
                          B.e (computer science)
                        </p>
                        <p className="text-[11px] font-[400px] h-[15px] text-black">
                          Total Work Experience 2 Years (Required)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start ">
                    <div className="flex flex-col items-start gap-[5px] px-4 ">
                      <div className="">
                        <p className="text-[#333] text-[18px] font-medium">
                          Full job Description
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[11px] font-[400px]  text-black">
                          The ideal person would have <br /> Experience working
                          on the user interface of websites <br />
                          Know how to create mockups, understand feedback and
                          present their work <br />
                          Have experience building sitemaps, wireframes and
                          prototypes as per the project brief <br /> Have strong
                          design and creative skills <br /> In-depth experience
                          using Adobe Illustrator, Figma <br />
                          <br />
                          <span className="text-[12px] font-medium  text-black">
                            {" "}
                            Responsibilities :
                          </span>{" "}
                          Develop design solutions for various platforms <br />{" "}
                          Establish consistent brand and creative designs <br />
                          Communicate ideas with project managers using mock-ups
                          and look books
                          <br /> Build sitemaps, wireframes and prototypes to
                          outline the structure
                          <br />
                          <br />
                          <span className="text-[12px] font-medium  text-black">
                            {" "}
                            Qualifications :
                          </span>{" "}
                          Bachelor's degree in user experience, design or
                          related field 2+ years of experience with UI design
                          Strong communication, design and creative thinking
                          skills Experience with Adobe Pro, Illustrator and
                          Photoshop, Figma, InVision.
                          <br />
                          <br />
                          <span className="text-[12px] leading-[24px] font-medium  text-black">
                            Job Type: Full-time <br /> Salary: ₹8,086.00 -
                            ₹50,000.00 per month <br /> Schedule: Day shift
                            <br /> Education: Bachelor's (Preferred) <br />{" "}
                            Experience: total work: 2 years (Required)
                          </span>
                          {/*    */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;