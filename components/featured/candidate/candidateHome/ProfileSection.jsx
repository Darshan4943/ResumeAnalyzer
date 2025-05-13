import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CountPostingDays } from "../../../../utils/data";

function ProfileSection() {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 52);
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 52);

  const latestEducation = [...(profileData?.education || [])].sort((a, b) => {
    const aDate = a?.duration?.endDate;
    const bDate = b?.duration?.endDate;

    if (aDate?.years !== bDate?.years) {
      return bDate?.years - aDate?.years;
    }
    return bDate?.months - aDate?.months;
  })[0];
  const latestExperience = [...(profileData?.workExperiance || [])].sort((a, b) => {
    const aDate = a?.duration?.endDate;
    const bDate = b?.duration?.endDate;

    if (aDate?.years !== bDate?.years) {
      return bDate?.years - aDate?.years;
    }
    return bDate?.months - aDate?.months;
  })[0];


  return (
    <div className="min-w-[262px] bg-[#FFFFFF] rounded-[16px] px-4 py-7 flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 text-center">
        <div className="flex  flex-col gap-[6px] items-center">
          <div className="flex items-center justify-center">
            <svg className="transform rotate-270 w-[116px] h-[116px]">
              <circle
                cx="58"
                cy="58"
                r="52"
                stroke="#DEDEDE"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="58"
                cy="58"
                r="52"
                stroke="#06A9EF"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={dashOffset}
              />
            </svg>

            <img
              src={
                profileData?.profilePicture?.img
                  ? profileData?.profilePicture?.img
                  : "/images/profile/john_doe.png"
              }
              alt=""
              className="w-[104px] h-[104px] object-cover absolute rounded-full"
            />
          </div>
          {/* <div className="bg-[#D4F2FF] px-1 py-[2px] rounded-[4px]  h-[19px] flex items-center justify-center text-center  w-[40px] text-[12px] text-[#06A9EF] font-medium leading-tight">
            100%
          </div> */}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-[16px] font-semibold">
            {profileData?.basics?.firstName} {profileData?.basics?.lastName}
          </p>
          {profileData.workExperiance.length > 0 ? (
            <div className="flex flex-col gap-1 items-center">
               {latestExperience?.jobTitle && (
                <p className="text-[12px] font-medium">
                {latestExperience?.jobTitle}
                </p>
              )}
              <p className="text-[12px] font-medium">
                @ {latestExperience?.companyName}
              </p>
             
            </div>
          ) : (
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[12px] font-medium">
                {latestEducation?.education}
              </p>
              {latestEducation?.university && (
                <p className="text-[12px] font-medium">
                  @ {latestEducation?.university}
                </p>
              )}
            </div>
          )}
          <p className="text-[12px] font-normal text-[#646464]">
            Last updated {CountPostingDays(profileData?.updatedAt)}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ProfileSection;
