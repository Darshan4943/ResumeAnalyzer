import React from 'react'

function Profile1() {
  return (
    <div className="bg-[#E0F6FF] py-[24px]">
        <div className="customMargins">
          <div class="grid grid-cols-1 ">
            <div class="flex flex-row w-full pt-[8px] pb-[8px] pl-[16px] pr-[16px] items-start gap-2 rounded-lg bg-white shadow-md">
              <div class="relative flex p-2 md:p-4 items-center gap-5 md:gap-20 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="59.2905"
                    stroke="#646464"
                    stroke-width="1.419"
                  />
                </svg>
                <div class="absolute left-[24px] bottom-[23px] w-[105px] h-[105px] rounded-full">
                  <img src="./images/profile/john_doe.png" alt="" />
                </div>
              </div>

              <div class="flex flex-col items-start gap-2 flex-1">
                <div class="flex pb-2 items-start gap-2 self-stretch border-b border-gray-400">
                  <div class="flex items-start gap-[8px]">
                    <div class="flex flex-col items-start">
                      <p class="text-[#333]  font-montserrat font-medium text-2xl">
                        John Doe
                      </p>
                      <p class="text-[#646464] font-montserrat text-xs font-normal">
                        Last updated 1 m ago
                      </p>
                    </div>
                    <div class="w-[24px]">
                      <img src="./images/profile/edit.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between w-full">
                  <div class="flex flex-col  gap-[10px] flex-grow w-0">
                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="./images/profile/location_on_john.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        Pune, Maharashtra, India
                      </p>
                    </div>
                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="./images/profile/business_center.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        4 Years
                      </p>
                    </div>
                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="./images/profile/call.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        87661234567
                      </p>
                    </div>
                  </div>
                  <div class="flex px-[16px] py-[0px] flex-col justify-center items-start gap-[10px] flex-1 self-stretch border-l  border-[#646464]">
                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="./images/profile/school.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        BSc Computer Science
                      </p>
                    </div>
                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="./images/profile/mail_john.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        kshitijwaghmare111@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile1