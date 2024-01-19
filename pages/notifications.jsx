import React, { useState } from "react";

function Notifications() {
  const notification = [
    "Today (3)",
    "2 days Ago",
    "Application Status (2)",
    "Offer (1)",
    "Views on profile",
  ];

  const card = [
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="w-[50px] h-[50px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="6" fill="#06A9EF" />
      </svg>
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="w-[50px] h-[50px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="6" fill="#06A9EF" />
      </svg>
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: ''
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "Complete Profile",
      time: 'Just Now',
      online: ''
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="6" fill="#06A9EF" />
      </svg>
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: ''
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "Complete Profile",
      time: 'Just Now',
      online: ''
    },
    {
      img: <img src="/images/icons/doc_icon.png" alt="" className="ms:w-[50px] ms:h-[50px] w-[35px] h-[35px] rounded-[8px] " />,
      description: 'HR xyz from XYZ COMPANY has viewed your profile.',
      profile: "",
      time: 'Just Now',
      online: ''
    }

  ]

  return (
    <div className="flex flex-col w-[100%] items-center gap-4 customMargins overflow-hidden">
      <div
        className="flex p-4 w-[100%] flex-col gap-4 items-start bg-[#fff]"
        style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <p className="text-[20px] text-[#333] leading-normal font-[500] ">
          My Notifications
        </p>

        <div className=" pb-[5px] flex items-start gap-[12px]  overflow-x-scroll w-full">
          {notification.map((e) => (
            <button
              className='py-[10px] px-[16px] flex items-center   rounded-[25px] border border-solid border-[#DEDEDE] ms:text-[16px] text-[12px] text-[#333] font-[600]'
              style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",whiteSpace: "nowrap", }}
            >
              {e}
            </button>
          ))}
        </div>


        <div className=" w-[100%] flex justify-end items-end">
          <p className="ms:text-[18px] text-[14px] font-[600] text-[#06A9EF] leading-normal">
            Mark all as read
          </p>
        </div>
      </div>

      <div
        className="w-[100%] scr700:px-[20%] flex sm:p-[12px] flex-col items-start gap-[12px] rounded-[16px] bg-[#fff] "
        style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
      >

        {
          card.map((e) => (<div className="flex w-[100%] p-[8px] gap-[24px] items-center rouded-[12px] bg-[#E0F6FF]">
            <div className="flex gap-2 w-[85%]">
              {e.img}
              <div className="flex flex-col">
                <p className="sm:text-[16px] text-[14px] text-[#333] leading-[160%] font-[500]">{e.description}</p>
                <p className="sm:text-[16px] text-[14px] text-[#06A9EF] leading-[160%] font-[600]">{e.profile}</p>
                <p className="text-[#646464] flex justify-end ms:text-[14px] text-[12px] font-[400] items-right leading-[160%]">{e.time}</p>
              </div>
            </div>

            <div className="w-[15%] items-center justify-center flex ">

              {e.online}

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g mask="url(#mask0_5716_137722)">
                  <path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="#646464" />
                </g>
              </svg>
            </div>
          </div>

          ))}
      </div>
    </div>
  );
}

export default Notifications;
