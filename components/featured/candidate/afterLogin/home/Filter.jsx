import React from 'react'

function Filter() {
  return (
    <div className="flex flex-col col-span-3 rounded-[8px] h-[70vh] bg-white shadow-md ">
                <div className="flex justify-between  p-4 bg-white shadow-md  items-start rounded-t-[8px] ">
                  <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                    All Filters
                  </p>
                  <button className="text-primary font-montserrat text-sm font-medium text-blue">
                    Reset all
                  </button>
                </div>

                <div className="h-[996px] overflow-hidden overflow-y-scroll ">
                  <div className="flex flex-col items-start justify-center p-4 gap-2 ">
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Location
                      </p>
                    </div>
                    <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                      <div className="w-[24px] h-[24px]">
                        <img src="/images/jobs/ser.png" alt="" />
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
                        <img src="/images/jobs/ser.png" alt="" />
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
                        By Salary
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          $ 0-2 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          More than $ 8 LPA
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Not Specified
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black"></p>
                    </div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Experience
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          0-1 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          1-2 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          2-5 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          5-7 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          7-10 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          10-15 Years
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          15-* Years
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>

                    {/* SCROLL  */}
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Education
                      </p>
                    </div>
                    <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                      <div className="w-[24px] h-[24px]">
                        <img src="/images/jobs/ser.png" alt="" />
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
                          Bachelor Of Technology (B.Tech/B.E)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor Of Computer Application (B.C.A)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor of Design (B.Des.)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Master of Science (MS/M.Sc)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Masters in Technology (M.Tech/M.E)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Bachelor of Arts (B.A)
                        </p>
                      </div>
                      <div className="border-b border-gray w-full h-[10px]"></div>
                    </div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Job type
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Full-time Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Contract Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Part-time Jobs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md  h-[20px] w-[20px] border-[1px] border-[#06A9EF] bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Internships
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Job mode
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          On-site
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Remote
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Hybrid
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          International
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Work From Home
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Jobs for Women
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                    <div className="flex justify-center items-start font-montserrat font-medium text-[16px] text-black">
                      <p className="font-montserrat font-medium text-[16px] text-black">
                        By Date posted
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover "
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Anytime
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past month
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch">
                        <input
                          type="checkbox"
                          className="rounded-md border h-[20px] w-[20px] border-blue bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past week
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-blue">
                        <input
                          type="checkbox"
                          className="rounded-md  h-[20px] w-[20px] border-[1px] border-[#06A9EF] bg-white  object-cover"
                        />

                        <p className="font-montserrat font-medium text-[12px] text-black">
                          Past 24 hrs
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray w-full h-[10px]"></div>
                  </div>
                </div>
              </div>
  )
}

export default Filter
