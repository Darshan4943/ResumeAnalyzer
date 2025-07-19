import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateProfileCompletion, CountPostingDays } from "../../../../utils/data";
import { useRouter } from "next/router";
import axios from "axios";

function ProfileSection() {
  const router = useRouter()
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [circumference, setCircumference] = useState(2 * Math.PI * 52);
  const [dashOffset, setDashOffset] = useState(2 * Math.PI * 52);
  const [searchAppearance, setSearchAppearance] = useState()
  const [recruiterAction, seRecruiterAction] = useState()

  const getCandidateMetrics = async (userId) => {
    try {
      const response = await axios.get(`https://api.skilotech.com/api/candidate/metrics/${userId}`);
      setSearchAppearance(response.data.searchAppearance);
      seRecruiterAction(response.data.recruiterAction);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch metrics:", error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getCandidateMetrics(userDataGlobal?._id)
  }, []);


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

  const percentage = calculateProfileCompletion(profileData)?.toFixed(0);

  const getProgressColor = (percentage) => {
    if (percentage < 40) return "#06A9EF";
    if (percentage <= 75) return "#06A9EF";
    return "#06A9EF";
  };

  const progressColor = getProgressColor(percentage);

  const containerStyle = {
    border: `conic-gradient(${progressColor} ${percentage * 3.6}deg, #f0f0f0 0deg)`,

  };
  const multiplier = percentage < 60 ? 3.6 : 3.4;
  return (
    <div className="min-w-[262px] bg-[#FFFFFF] rounded-[16px] px-4 py-7 flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 text-center items-center">
        <div className="flex  flex-col gap-[6px] items-center justify-center">
          <div className="flex items-center justify-center relative gap-1">
            <div className="text-center flex flex-col items-center justify-center gap-2">

              <div
                className="relative"
                style={{
                  background: `conic-gradient(${progressColor} ${percentage * multiplier}deg, #f0f0f0 0deg)`,
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(180deg)'
                }}
              >

                <div style={{ transform: 'rotate(180deg)', }} className="bg-white rounded-full w-[108px] h-[108px] flex items-center justify-center">

                  <img
                    src={
                      profileData?.profilePicture?.img
                        ? profileData.profilePicture.img
                        : "/images/profile/john_doe.png"
                    }
                    alt="Profile"
                    className="w-[100px] h-[100px] object-cover rounded-full"
                  />
                </div>
                <p style={{ transform: 'rotate(180deg)', }} className=" leading-tight absolute -top-1 z-10 text-center rounded-[30px] py-1 px-3 shadow-md bg-white text-[12px] font-semibold text-[#06A9EF] w-fit">
                  {calculateProfileCompletion(profileData)?.toFixed(0)}%
                </p>

              </div>


            </div>
          </div>


          {/* <div className="bg-[#D4F2FF] px-1 py-[2px] rounded-[4px]  h-[19px] flex items-center justify-center text-center  w-[40px] text-[12px] text-[#06A9EF] font-medium leading-tight">
            100%
          </div> */}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-[16px] font-semibold">
            {profileData?.basics?.firstName} {profileData?.basics?.lastName}
          </p>
          {profileData?.workExperiance?.length > 0 ? (
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
        {percentage < 100 &&
          <button onClick={() => router.push("/profile")} className="bg_Button h-[40px] px-4 rounded-[30px] w-fit ">Complete Profile</button>
        }
      </div>
      {(searchAppearance > 0 || recruiterAction > 0) &&
        <div className="flex flex-col gap-3 px-2">
          <div className="flex justify-between text-[14px] font-semibold">
            Profile Performance
          </div>
          {searchAppearance > 0 &&
            <div className="flex justify-between text-[14px] font-medium">
              Search Appearance
              <p className="text-[#06A9EF]">{searchAppearance}</p>
            </div>
          }
          {recruiterAction > 0 &&
            <div className="flex justify-between text-[14px] font-medium">
              Recruiter Action
              <p className="text-[#06A9EF]">{recruiterAction}</p>
            </div>
          }
        </div>
      }

    </div>
  );
}

export default ProfileSection;
