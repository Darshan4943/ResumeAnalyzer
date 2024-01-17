import React from 'react'

function AppliedDescription() {
  return (
    <div
    className={`flex  flex-col  `}
  >
    <div
      className="p-[16px]   border-[1px] border-[#06A9EF] bg-[#fff] rounded-[8px] flex flex-col gap-[16px]"
      style={{
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #D6DDEB",
        }}
      >
        <div className="flex flex-row justify-between pb-[16px]">
          <div className="flex flex-col gap-[4px]">
            <div className="text-[20px] font-medium">
              UX Designer
            </div>
            <div className="flex items-center justify-center gap-[4px]">
              <div className="text-[12px] font-medium">
                TechGenius Innovations
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M5.73242 0.809018L6.84174 4.22315L6.89787 4.3959H7.07951H10.6693L7.7651 6.50595L7.61816 6.61271L7.67428 6.78546L8.7836 10.1996L5.87937 8.08954L5.73242 7.98278L5.58548 8.08954L2.68124 10.1996L3.79056 6.78546L3.84669 6.61271L3.69974 6.50595L0.795504 4.3959H4.38534H4.56697L4.6231 4.22315L5.73242 0.809018Z"
                  fill="#FFDA1D"
                  stroke="#FFCC7E"
                  stroke-width="0.5"
                />
              </svg>
              <div className="text-[#262626] text-[10px] font-[400]">
                3.7
              </div>
            </div>
          </div>
          <div className="flex flex-row  items-end">
            <div className="flex flex-row gap-[4px]">
              <div className="flex justify-center items-center">

              </div>

            </div>
          </div>
          <img className="w-[56px] h-[56px]" src="/images/afterLoginHome/ux_black.png" alt="" />
        </div>
      </div>

      <div
        className="flex flex-col gap-[10px] pb-[6px] ">
        <div className="text-[20px] font-[500]">Application Status</div>
        <div className="flex items-center w-[100%] pt-[17px] pr-[36px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            <circle cx="12" cy="12" r="8" fill="#06A9EF" />
          </svg>
          <div className="w-[30%] h-[2px] bg-[#06A9EF]"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            <circle cx="12" cy="12" r="8" fill="#06A9EF" />
          </svg>
          <div className="w-[30%] h-[2px] bg-[#06A9EF]"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#C7C7C7" />
            <circle cx="12" cy="12" r="8" fill="#06A9EF" />
          </svg>
          <div className="w-[30%] h-[2px] bg-[#C7C7C7]"></div>
        </div>

        <div className="w-[100%] items-start flex gap-[15%] mt-[20px]">
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <p className="text-[14px] font-[600] text-[#333]">Applied</p>
            <p className="text-[12px] font-[500] text-[#333]">29 oct</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <p className="text-[14px] font-[600] text-[#333]">Application sent</p>
            <p className="text-[12px] font-[500] text-[#333]">29 oct</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <p className="text-[14px] font-[600] text-[#333]">Application sent</p>
            <p className="text-[12px] font-[500] text-[#333]">29 oct</p>
          </div>
        </div>

        <div className="flex justify-between mt-[20px]">
          <div className="flex gap-[8px] items-center justify-center">
            <p className="font-[600] text-[14px] text-[#333]">Activity on this job</p>
            <p className="font-[500] text-[12px] text-[#646464]">29 Applications</p>
          </div>
          <div className="flex gap-[8px]">
            <p className="font-[600] text-[14px] text-[#333]">Set Alert Notification</p>
            <img className="w-[24px] h-[24px]" src="/images/afterLoginHome/notifications.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex  p-[24px] my-[24px] items-start gap-[16px] rounded-[16px] bg-[#fff]" style={{
      boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.25)'
    }}>
      <div className="flex items-center gap-[16px] ">
        <img className="w-[60px] rounded-[50%] h-[60px]" src="/images/afterLoginHome/michael.png" alt="" />
      </div>
      <div className="flex flex-col items-start ">
        <p className="text-[18px] font-[600] leading-[160%] text-[#333]">Johan Smith HR</p>
        <p className="text-[14px] font-[500] leading-[160%] text-[#333]">Company Recruiter at Pure Tech Codex Private Limited</p>
        <p className="text-[12px] font-[500] leading-[160%] text-[#646464]">Company Recruiter at Pure Tech Codex Private Limited</p>
      </div>
    </div>
    <div className="flex flex-col p-[24px] items-start gap-[16px] rounded-[16px] bg-[#fff]" style={{
      boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.25)'
    }}>
      <div className="flex flex-col gap-[8px]">
        <div className="text-[20px] font-[500]">
          job Description
        </div>
        <div className="text-[12px] text-[400] gap-[8px] flex flex-col">
          The ideal person would have Experience working on the user
          interface of websites Know how to create mockups, understand
          feedback and present their work Have experience building
          sitemaps, wireframes and prototypes as per the project brief
          Have strong design and creative skills In-depth experience
          using Adobe Illustrator, Figma{" "}
          <span className="text-[12px] font-[500] text-[#333] ">
            Responsibilities :
          </span>
          Develop design solutions for various platforms Establish
          consistent brand and creative designs Communicate ideas with
          project managers using mock-ups and look books Build
          sitemaps, wireframes and prototypes to outline the structure{" "}
          <span className="text-[12px] font-[500] text-[#333]">
            Qualifications :
          </span>{" "}
          Bachelor's degree in user experience, design or related
          field 2+ years of experience with UI design Strong
          communication, design and creative thinking skills
          Experience with Adobe Pro, Illustrator and Photoshop, Figma,
          InVision.
          <span className="text-[14px] font-[500]">
            {" "}
            Job Type:Full-time
          </span>{" "}
          <span className="text-[12px] font-[500] text-[#333]">
            Salary: ₹8,086.00 - ₹50,000.00 per month{" "}
          </span>{" "}
          <span className="text-[12px] font-[500] text-[#333]">
            Schedule: Day shift{" "}
          </span>{" "}
          <span className="text-[12px] font-[500] text-[#333]">
            Education: Bachelor's (Preferred){" "}
          </span>{" "}
          <span className="text-[12px] font-[500] text-[#333]">
            Experience: total work: 2 years (Required)
          </span>
        </div>
      </div>

    </div>
  </div>
  )
}

export default AppliedDescription
