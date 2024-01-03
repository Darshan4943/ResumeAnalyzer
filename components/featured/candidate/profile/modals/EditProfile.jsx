import React from 'react'

function EditProfile({setEditProfile}) {
  return (
   <>
       <div
        className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px]"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 justify-between">
            <p className="text-[#25324B] text-[24px] font-[500] leading-[160%]">
              Edit Profile Details
            </p>

            <div className="h-[1px] bg-[#DEDEDE] flex items-center w-[60%]"></div>
            <svg
              onClick={() => setEditProfile(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_5716_140784)">
                <path
                  d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                  fill="#646464"
                />
              </g>
            </svg>
          </div>
          
          
        </div>
        </div>
   </>
  )
}

export default EditProfile