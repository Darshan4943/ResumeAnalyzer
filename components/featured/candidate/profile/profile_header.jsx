import { timeAgo } from "@/utils/middleware";
import React, { useState } from "react";
import ChangeProfile from "./modals/ChangeProfile";
import EditProfile from "./modals/EditProfile";

const ProfileHeader = ({ userData }) => {
  const [editProfile, setEditProfile] = useState(false);

  const [ischangeProfile, setIsChangeProfile] = useState(false);
  const imageSeter = () => {
    if (userData.profilePicture.img) {
      return userData?.profilePicture?.img;
    } else {
      return "/images/profile/john_doe.png";
    }
  };
  return (
    <>
      <div className="bg-[#E0F6FF] py-[24px]">
        <div className="customMargins">
          <div class="grid grid-cols-1 ">
            <div class="flex flex-row w-full pt-[8px] pb-[8px] md:px-[16px] px-[8px] items-start gap-2 rounded-lg bg-white shadow-md">
              <div class="relative flex p-1 md:p-4 items-center gap-5 md:gap-20 rounded-md">
               
                <div className="w-[120px] h-[120px] border-[2px]  border-[#646464] rounded-full object-contain overflow-hidden gap-2">
                      <img
                        className="rounded-full p-1"
                        onClick={() => setIsChangeProfile(true)}
                        src={
                          userData?.profilePicture?.img
                            ? userData?.profilePicture?.img
                            : "/images/profile/john_doe.png"
                        }
                        alt=""
                      />
                    </div>
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
                    <div className="flex items-center" onClick={() => setEditProfile(true)} class="w-[24px]">
                      <img className="w-[24px] h-[24px]" src="/images/profile/edit.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="flex justify-between w-full heroBlock">
                  <div class="flex flex-col  gap-[10px] flex-grow w-0">
                    {userData?.basics?.address && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/location_on_john.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {userData?.basics?.address}
                        </p>
                      </div>
                    )}
                    {userData?.workExperiance?.workExperiance && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/business_center.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          4 Years
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
                  <div class="flex px-[16px] py-[0px] flex-col justify-center items-start gap-[10px] flex-1 self-stretch border-l  border-[#646464]">
                    {userData?.education && (
                      <div class="flex items-center gap-[5px]">
                        <img
                          class="w-[20px] h-[20px]"
                          src="/images/profile/school.png"
                          alt=""
                        />
                        <p class="text-[#333] font-montserrat text-[14px] font-normal">
                          {userData?.education[0]?.stream} <br />{" "}
                          {userData?.education[0]?.institute}
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
                {userData?.education && (
                  <div class="flex items-center gap-[5px]">
                    <img
                      class="w-[20px] h-[20px]"
                      src="/images/profile/school.png"
                      alt=""
                    />
                    <p class="text-[#333] font-montserrat text-[14px] font-normal">
                      {userData?.education[0]?.stream} <br />{" "}
                      {userData?.education[0]?.institute}
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
      </div>

      {ischangeProfile && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <ChangeProfile setIsChangeProfile={setIsChangeProfile} />
            </div>
          </div>
        </>
      )}

      {editProfile && (
        <>
          <div className="opacity-25 fixed inset-0 z-[120] bg-black"></div>

          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[130] outline-none focus:outline-none">
            <div className="absolute max-w-[800px] w-full">
              <EditProfile setEditProfile={setEditProfile} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
