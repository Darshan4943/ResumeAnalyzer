import React from "react";

function Analytics() {
  const data = [
    { status: "In Review", count: 10 },
    { status: "Shortlisted", count: 8 },
    { status: "Interview", count: 11 },
    { status: "Hired", count: 4 },
    { status: "Declined", count: 12 },
  ];

  const getCardShadow = (index) => {
    const shadows = [
      "0px 4px 0px 0px #FFB836 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      "0px 4px 0px 0px #4640DE inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      " 0px 4px 0px 0px #26A4FF inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      " 0px 4px 0px 0px #56CDAD inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      " 0px 4px 0px 0px #FF6550 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
    ];

    return shadows[index % shadows.length];
  };

  return (
    <>
    

      <div className="flex ml:flex-row flex-col gap-6 items-start w-[100%]">
        <div className=" flex flex-col items-start gap-4 self-stretch ml:w-[32%] w-[100%]">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex px-6 py-8 justify-between items-center self-stretch bg-[#fff]`}
              style={{
                borderRadius: "16px",
                boxShadow: getCardShadow(index),
              }}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="5" fill="#FFB836" />
                  </svg>
                  <p className="text-[#333] text-[20px] font-semibold font-Montserrat">
                    {item.status}
                  </p>
                </div>
                <div className="flex text-[#333] text-[20px] font-semibold font-Montserrat p-1 justify-center items-center rounded-md bg-[#E9EBFD]">
                  {item.count}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-6 self-stretch ml:w-[68%] w-full">
          <div className="flex  items-start gap-4 w-[100%]  ">
          
            <div
              className="flex ml:p-4 p-2 flex-col items-start gap-4 bg-[#fff] self-stretch w-full h-fit"
              style={{
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "16px",
              }}
            >
              <div className="flex justify-between items-center self-stretch">
                <p className="text-[#333] font-Montserrat text-[14px] ml:text-[20px] font-medium">
                  Total Views
                </p>
                <div className="flex p-[6px] rounded-[32px] bg-[#26A4FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g mask="url(#mask0_6622_122128)">
                      <path
                        d="M10 13.5C10.9722 13.5 11.7986 13.1597 12.4792 12.4792C13.1597 11.7986 13.5 10.9722 13.5 10C13.5 9.02778 13.1597 8.20139 12.4792 7.52083C11.7986 6.84028 10.9722 6.5 10 6.5C9.02778 6.5 8.20139 6.84028 7.52083 7.52083C6.84028 8.20139 6.5 9.02778 6.5 10C6.5 10.9722 6.84028 11.7986 7.52083 12.4792C8.20139 13.1597 9.02778 13.5 10 13.5ZM10 12C9.44444 12 8.97222 11.8056 8.58333 11.4167C8.19444 11.0278 8 10.5556 8 10C8 9.44444 8.19444 8.97222 8.58333 8.58333C8.97222 8.19444 9.44444 8 10 8C10.5556 8 11.0278 8.19444 11.4167 8.58333C11.8056 8.97222 12 9.44444 12 10C12 10.5556 11.8056 11.0278 11.4167 11.4167C11.0278 11.8056 10.5556 12 10 12ZM10 16C8.0195 16 6.21535 15.4549 4.58754 14.3646C2.95974 13.2743 1.76389 11.8194 1 10C1.76389 8.18056 2.95974 6.72569 4.58754 5.63542C6.21535 4.54514 8.0195 4 10 4C11.9805 4 13.7847 4.54514 15.4125 5.63542C17.0403 6.72569 18.2361 8.18056 19 10C18.2361 11.8194 17.0403 13.2743 15.4125 14.3646C13.7847 15.4549 11.9805 16 10 16ZM10 14.5C11.5556 14.5 12.9931 14.0972 14.3125 13.2917C15.6319 12.4861 16.6458 11.3889 17.3542 10C16.6458 8.61111 15.6319 7.51389 14.3125 6.70833C12.9931 5.90278 11.5556 5.5 10 5.5C8.44444 5.5 7.00694 5.90278 5.6875 6.70833C4.36806 7.51389 3.35417 8.61111 2.64583 10C3.35417 11.3889 4.36806 12.4861 5.6875 13.2917C7.00694 14.0972 8.44444 14.5 10 14.5Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex gap-2 items-center">
                  <p className="  text-[#333] flex items font-Montserrat font-semibold text-[26px] ml:text-[36px]">
                    23,564
                  </p>
                  <div className="flex text-center">
                    <p className="text-[#56CDAD] items-center text-[18px] font-medium">
                      0.4%
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_122136)">
                        <path
                          d="M15 13L10 8L5 13H15Z"
                          fill="#56CDAD"
                          stroke="#56CDAD"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_122136">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#646464] font-Montserrat font-Medium ">
                  From last day
                </p>
              </div>
            </div>
            <div
              className="flex ml:p-4 p-2 flex-col items-start gap-4 bg-[#fff] self-stretch w-full h-fit"
              style={{
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "16px",
              }}
            >
              <div className="flex justify-between items-center self-stretch">
                <p className="text-[#333] font-Montserrat text-[14px] ml:text-[20px] font-medium">
                  Total Views
                </p>
                <div className="flex p-[6px] rounded-[32px] bg-[#7B61FF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g mask="url(#mask0_6622_122142)">
                      <path
                        d="M2.5 19C2.0875 19 1.73438 18.8531 1.44063 18.5594C1.14688 18.2656 1 17.9125 1 17.5V8H2.5V17.5H16V19H2.5ZM5.5 16C5.0875 16 4.73438 15.8531 4.44062 15.5594C4.14687 15.2656 4 14.9125 4 14.5V5H8V3.5C8 3.0875 8.14688 2.73438 8.44063 2.44063C8.73438 2.14688 9.0875 2 9.5 2H13.5C13.9125 2 14.2656 2.14688 14.5594 2.44063C14.8531 2.73438 15 3.0875 15 3.5V5H19V14.5C19 14.9125 18.8531 15.2656 18.5594 15.5594C18.2656 15.8531 17.9125 16 17.5 16H5.5ZM5.5 14.5H17.5V6.5H5.5V14.5ZM9.5 5H13.5V3.5H9.5V5Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex gap-2 items-center">
                  <p className="  text-[#333] flex items font-Montserrat font-semibold text-[26px] ml:text-[36px]">
                    132
                  </p>
                  <div className="flex text-center">
                    <p className="text-[#FF6550] items-center text-[18px] font-medium">
                      0.4%
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6622_122150)">
                        <path
                          d="M5 8L10 13L15 8L5 8Z"
                          fill="#FF6550"
                          stroke="#FF6550"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6622_122150">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <p className="text-[#646464] font-Montserrat font-Medium ">
                  From last day
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 self-stretch rounded-[16px] bg-[#fff]"
          style={{boxShadow:' 0px 1px 2px 0px rgba(0, 0, 0, 0.25)'}}
          >
           <div className="flex justify-between items-center self-stretch ml:px-6 ml:pt-4 px-3 pt-3">
            <p className="text-[#333] ml:text-[20px] text-[14px] font-semibold font-Montserrat">Job Listing View stats</p>
           <div className="flex py-3 px-4 gap-2 justify-center items-center bg-[#fff]"
           style={{border:'1px solid var(--Neutrals-20, #D6DDEB)'}}
           >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
  <path d="M15 1.5L8 8.5L1 1.5" stroke="#646464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<p className="text-[#646464] font-Montserrat text-[12px] ml:text-[16px] font-medium">Last 7 days</p>

           </div>
           </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
