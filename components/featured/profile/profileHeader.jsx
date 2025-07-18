
import React, { useState } from "react";

import { timeAgo } from "../../../utils/middleware";

import ChangeProfile from "./changeProfile";
import EditProfile from "./editProfile";
import {
  User,
  Briefcase,
  BookOpen,
  GraduationCap,
  FileText,
  Layers,
  Award,
  Image as ImageIcon,
  Globe,
  Info,
  Star
} from "lucide-react";
import { calculateProfileCompletion } from "../../../utils/data";
const ProfileHeader = ({ userData }) => {

  const latestEducation = [...(userData?.education || [])].sort((a, b) => {
    const aDate = a?.duration?.endDate;
    const bDate = b?.duration?.endDate;

    if (aDate?.years !== bDate?.years) {
      return bDate?.years - aDate?.years;
    }
    return bDate?.months - aDate?.months;
  })[0];

  const [editProfile, setEditProfile] = useState(false);

  const [ischangeProfile, setIsChangeProfile] = useState(false);
  //   const imageSeter = () => {
  //     if (userData.profilePicture.img) {
  //       return userData?.profilePicture?.img;
  //     } else {
  //       return "/images/profile/john_doe.png";
  //     }
  //   };

  const getMissingProfileDetails = (candidate) => {
    const missingDetails = {
      personalDetails: [],
      profilePicture: [],
      experience: [],
      education: [],
      skills: [],
      resume: [],
      projects: [],
      certifications: [],
      socialLinks: [],
      jobPreferences: [],
      summary: [],
      achievements: [],
    };

    const basics = candidate.basics || {};
    const perBasicFieldScore = +(15 / 8).toFixed(2);
    const perJobPrefFieldScore = +(10 / 8).toFixed(2);

    if (!basics.firstName) missingDetails.personalDetails.push({ name: "First Name", score: perBasicFieldScore });
    if (!basics.lastName) missingDetails.personalDetails.push({ name: "Last Name", score: perBasicFieldScore });
    if (!basics.email) missingDetails.personalDetails.push({ name: "Email", score: perBasicFieldScore });
    if (!basics.mobileNo) missingDetails.personalDetails.push({ name: "Mobile Number", score: perBasicFieldScore });
    if (!basics.dob) missingDetails.personalDetails.push({ name: "Date of Birth", score: perBasicFieldScore });
    if (!basics.gender) missingDetails.personalDetails.push({ name: "Gender", score: perBasicFieldScore });
    if (!basics.currentLocation) missingDetails.personalDetails.push({ name: "Current Location", score: perBasicFieldScore });
    if (!basics.maritalStatus) missingDetails.personalDetails.push({ name: "Marital Status", score: perBasicFieldScore });

    const jp = candidate.jobPrefrences || {};
    if (!jp.industry) missingDetails.jobPreferences.push({ name: "Preferred Industry", score: perJobPrefFieldScore });
    if (!jp.department) missingDetails.jobPreferences.push({ name: "Preferred Department", score: perJobPrefFieldScore });
    if (!jp.jobRole) missingDetails.jobPreferences.push({ name: "Preferred Job Role", score: perJobPrefFieldScore });
    if (!jp.jobType) missingDetails.jobPreferences.push({ name: "Preferred Job Type", score: perJobPrefFieldScore });
    if (!jp.jobMode) missingDetails.jobPreferences.push({ name: "Preferred Job Mode", score: perJobPrefFieldScore });
    if (!jp.shift) missingDetails.jobPreferences.push({ name: "Preferred Shift", score: perJobPrefFieldScore });
    if (!jp.expectedSalary) missingDetails.jobPreferences.push({ name: "Expected Salary", score: perJobPrefFieldScore });
    if (!jp.preferedLocation || jp.preferedLocation.length === 0) {
      missingDetails.jobPreferences.push({ name: "Preferred Location", score: perJobPrefFieldScore });
    }

    if (!candidate.education || candidate.education.length === 0) {
      missingDetails.education.push({ name: "Education", score: 10 });
    }

    if (!candidate.workExperiance || candidate.workExperiance.length === 0) {
      missingDetails.experience.push({ name: "Work Experience", score: 15 });
    }

    if (!candidate.resumeUrl) {
      missingDetails.resume.push({ name: "Resume", score: 10 });
    }

    if (!candidate.skills || candidate.skills.length === 0) {
      missingDetails.skills.push({ name: "Skills", score: 10 });
    }

    if (!candidate.projects || candidate.projects.length === 0) {
      missingDetails.projects.push({ name: "Projects", score: 5 });
    }

    if (!candidate.profilePicture?.img) {
      missingDetails.profilePicture.push({ name: "Profile Picture", score: 5 });
    }

    if (
      (!candidate.courses || candidate.courses.length === 0)
    ) {
      missingDetails.certifications.push({ name: "Certifications", score: 5 });
    }

    if (!candidate.socialLinks || candidate.socialLinks.length === 0) {
      missingDetails.socialLinks.push({ name: "Social Links", score: 5 });
    }

    if (!candidate.summary) {
      missingDetails.summary.push({ name: "Summary", score: 5 });
    }

    if (!candidate.awards || candidate.awards.length === 0) {
      missingDetails.achievements.push({ name: "Achievements", score: 5 });
    }

    return missingDetails;
  };

  const missingDetails = getMissingProfileDetails(userData);

  const categoryIcons = {
    personalDetails: <User size={18} className="m-auto text-[#474D6A]" />,
    jobPreferences: <Briefcase size={18} className="m-auto text-[#474D6A]" />,
    experience: <BookOpen size={18} className="m-auto text-[#474D6A]" />,
    education: <GraduationCap size={18} className="m-auto text-[#474D6A]" />,
    resume: <FileText size={18} className="m-auto text-[#474D6A]" />,
    skills: <Layers size={18} className="m-auto text-[#474D6A]" />,
    awards: <Award size={18} className="m-auto text-[#474D6A]" />,
    projects: <FileText size={18} className="m-auto text-[#474D6A]" />,
    profilePicture: <ImageIcon size={18} className="m-auto text-[#474D6A]" />,
    CoursesoOrAwards: <Award size={18} className="m-auto text-[#474D6A]" />,
    socialLinks: <Globe size={18} className="m-auto text-[#474D6A]" />,
    summary: <Info size={18} className="m-auto text-[#474D6A]" />
  };

  const percentage = calculateProfileCompletion(userData)?.toFixed(0);
  const getProgressColor = (percentage) => {
    if (percentage < 40) return "#C00000";
    if (percentage <= 75) return "#0275A7";
    return "#127C29";
  };

  const progressColor = getProgressColor(percentage);

  const containerStyle = {
    background: `conic-gradient(${progressColor} ${percentage * 3.6}deg, #f0f0f0 0deg)`,

  };
 
   const multiplier = percentage < 60 ? 3.6 : 3.4;
 
  return (
    <>
      <div className="bg-[#E0F6FF] py-[24px]">
        <div className="customMargins flex gap-4">
          <div class="grid grid-cols-1 w-full ">
            <div class="flex flex-row w-full pt-[8px] pb-[18px] md:px-[16px] px-[8px]  gap-5 rounded-lg bg-white shadow-md items-center">
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
                    transform: 'rotate(180deg)',
                }}
              >
                <div style={{ transform: 'rotate(180deg)',}} className="bg-white rounded-full w-[108px] h-[108px] flex items-center justify-center ">

                  <img
                    className="max-w-[100px] max-h-[100px] rounded-full   object-cover"
                    onClick={() => setIsChangeProfile(true)}
                    src={
                      userData?.profilePicture?.img
                        ? userData?.profilePicture?.img
                        : "/images/profile/profileNew.png"
                    }
                    alt=""
                  />
                </div>
                  <p style={{ transform: 'rotate(180deg)',}} className="absolute -top-1 z-10 text-center rounded-[30px] py-1 px-3 shadow-md leading-tight bg-white text-[12px] font-semibold text-[#127C29] w-fit">
                  {calculateProfileCompletion(userData)?.toFixed(0)}%
                </p>
              </div>
            
              <div class="flex flex-col items-start gap-2 flex-1 ">
                <div class="flex pb-2 items-start gap-2 self-stretch ml:border-b ml:border-gray-400">
                  <div class="flex items-baseline gap-[8px]">
                    <div class="flex flex-col items-start">
                      <p class="text-[#333]  font-montserrat font-medium text-[20px] md:text-2xl">
                        {userData?.basics?.firstName}{" "}
                        {userData?.basics?.lastName}
                      </p>
                      <p class="text-[#646464] font-montserrat text-xs font-normal">
                        Last updated {timeAgo(new Date(userData?.updatedAt))}
                      </p>
                      <div className="mobile mt-[5px]">
                        {userData?.basics?.mobileNo && (
                          <div class="flex items-center gap-[5px]">
                            <img
                              class="w-[20px] h-[20px]"
                              src="/images/profile/call.png"
                              alt=""
                            />
                            <p class="text-[#333] font-montserrat text-[14px] font-normal">
                              {userData?.basics?.mobileNo}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => setEditProfile(true)}
                      class="w-[24px]"
                    >
                      <img
                        className="w-[24px] h-[24px]"
                        src="/images/profile/edit.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between w-full heroBlock">
                  <div class="flex flex-col  gap-[10px] flex-grow w-0">
                    {userData?.basics?.currentLocation && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/location_on_john.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {userData?.basics?.currentLocation}
                        </p>
                      </div>
                    )}
                    {userData?.totalExperience && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/business_center.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {userData?.totalExperience?.years} Years
                        </p>
                      </div>
                    )}
                    {userData?.basics?.mobileNo && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/call.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {userData?.basics?.mobileNo}
                        </p>
                      </div>
                    )}
                  </div>
                  <div class="flex px-[16px] py-[0px] flex-col justify-start items-start gap-[10px] flex-1 self-stretch border-l  border-[#646464]">
                    {(latestEducation?.specialization || (latestEducation?.stream && latestEducation?.stream > 0)) && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/school.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {latestEducation?.specialization} {latestEducation?.stream}

                        </p>
                      </div>
                    )}

                    <div class="flex items-center gap-[5px]">
                      <img
                        class="w-[20px] h-[20px]"
                        src="/images/profile/mail_john.png"
                        alt=""
                      />
                      <p class="text-[#333] font-montserrat text-[14px] font-normal">
                        {userData?.basics?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col w-full mt-[-10px] pb-[8px] pl-[16px] pr-[16px] items-start gap-2 rounded-lg bg-white shadow-md unblockRecruiter">
              <div className="bg-[#868383] h-[1px] w-[95%]"></div>
              <div class="flex px-[16px] py-[0px] flex-col justify-center items-start gap-[10px] flex-1 self-stretch ">
                {userData?.education?.length > 0 && (
                  <div class="flex items-center gap-[5px]">
                    <img
                      class="w-[20px] h-[20px]"
                      src="/images/profile/school.png"
                      alt=""
                    />
                    <p class="text-[#333] font-montserrat text-[14px] font-normal">
                      {latestEducation?.specialization} {latestEducation?.stream}
                    </p>
                  </div>
                )}

                <div class="flex items-center gap-[5px]">
                  <img
                    class="w-[20px] h-[20px]"
                    src="/images/profile/mail_john.png"
                    alt=""
                  />
                  <p class="text-[#333] font-montserrat text-[14px] font-normal">
                    {userData?.basics?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {Object.values(missingDetails).filter(fields => fields.length > 0).length > 0 &&
            <div className=" bg-[#FFF2E3] rounded-[10px] p-5 flex flex-col gap-4">
              <p className="text-[#F05537] font-semibold text-[14px]">
                {Object.values(missingDetails).filter(fields => fields.length > 0).length}
                {Object.values(missingDetails).filter(fields => fields.length > 0).length > 2 ? '+' : ''} missing details
              </p>
              <div className="flex flex-col gap-2">
                {Object.entries(missingDetails)
                  .filter(([_, fields]) => fields.length > 0)
                  .slice(0, 2)
                  .map(([category, fields]) => {
                    const score = fields[0]?.score || 0;
                    const categoryTitle = category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, str => str.toUpperCase());

                    return (
                      <div key={category} className="flex gap-4 items-center">
                        <div className="h-[36px] w-[36px] min-w-[36px] bg-white rounded-full flex items-center justify-center shadow-sm">
                          {categoryIcons[category] || <Star size={18} className="text-[#474D6A]" />}
                        </div>
                        <p className="font-semibold text-[14px] text-[#474D6A] w-fit min-w-[140px]">{categoryTitle}</p>
                        <div className="text-[14px] font-medium text-[#47B749] rounded-[16px] px-2 py-1 bg-white flex items-center leading-tight">
                          <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="#47B749">
                            <path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z" />
                          </svg>
                          {score}
                          <p>%</p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* <div className="flex justify-center items-center w-full">
              <button className=" bg-[#F05537] h-[38px] px-4 rounded-[30px] text-white font-semibold text-[14px]">
                Add {Object.values(missingDetails).filter(fields => fields.length > 0).length} missing details

              </button>

            </div> */}
            </div>
          }
        </div>
      </div>

      {ischangeProfile && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full top-[100px]">
              <ChangeProfile setIsChangeProfile={setIsChangeProfile} userData={userData} />
            </div>
          </div>
        </>
      )}

      {editProfile && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full top-[100px]">
              <EditProfile setEditProfile={setEditProfile} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
