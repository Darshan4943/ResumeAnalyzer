import React from "react";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../utils/middleware";
import { useRouter } from "next/router";



const Profile = () => {
  const router = useRouter();

  const userDataGlobal = useSelector((state) => state.userData);
  const data = userDataGlobal;
  

  return (
    <div className=" py-6 w-[100%] customMargins">
      <div className="w-[100%] gap-4 flex flex-col">
        <div className="text-[24px] font-Montserrat font-semibold text-[#333]">
          My Profile
        </div>
        <div className="w-[100%] ml:flex ml:flex-row  flex scr500:flex-col gap-4 flex-col-reverse  ">
          <div
            className="flex ml:flex-row flex-col items-center justify-start w-[100%] ml:w-[100%] p-6 gap-[34px] rounded-2xl bg-[#fff] "
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {
              <img
                src={data?.profilePicture ? data.profilePicture : "/images/profile/john_doe.png"}
                alt=""
                className="object-contain h-[180px] w-[180px] flex justify-center rounded-full overflow-hidden "
              />
            }

            <div className="flex flex-col w-[100%] lg:w-[80%] gap-4">
              <div className="flex flex-col w-[100%]">
                {/* <p className="text-[18px] font-Montserrat font-medium text-[#333]">
                  {data?.firstName && data?.lastName
                    ? `${data.firstName} ${data.lastName}`
                    : null}
                </p> */}

                <div className="w-[100%] flex gap-[6px]">
                  {data.role === "recruiter" ? (
                    <>
                      <img
                        src="/images/profile/check.png"
                        className="w-[20px] h-[20px] object-contain"
                        alt=""
                      />
                      <div className="text-[14px] font-Montserrat font-medium">
                        Verified Recruiter
                      </div>
                    </>
                  ) : (

                    null
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col gap-6">
                <div className="text-[18px] font-Montserrat font-semibold text-[#333]">
                  Account Details
                </div>
                <div className="flex scr540:flex-row flex-col scr1024:gap-[46px] gap-[20px]">
                  <div className="scr540:w-[60%] ml:w-[40%] w-[100%] gap-6 flex flex-col ">
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        User Name <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {/* {data?.name ? data.name : '-'} */}
                        <div className="break-all sm:text-[14px] text-[12px]   font-Montserrat font-medium text-[#333]">
                          {data?.firstName && data?.lastName
                            ? `${data.firstName} ${data.lastName}`
                            : null}
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-[100%] flex gap-4 items-center">
                      <div className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        User ID <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] text-[14px] font-Montserrat font-medium text-[#333]">
                        {data.id}
                      </div>
                    </div> */}
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Activated on <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] sm:text-[12px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {dateFormatter(data.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="h-[1px] scr540:w-[1px] w-[100%] ml:h-[170px] scr1024:h-[102px] scr540:h-[180px] bg-[#DEDEDE]">
                    {" "}
                  </div>
                  <div className=" ml:w-[60%] w-[100%] gap-6 flex flex-col ">
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Email ID <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] break-all sm:text-[14px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {data.email}
                      </div>
                    </div>
                    <div className="w-[100%] flex gap-4 items-center">
                      <div className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Contact Number <span>:</span>{" "}
                      </div>
                      <div className="w-[50%] text-[14px] font-Montserrat font-medium text-[#333]">
                        {data?.mobileNo ? data.mobileNo : '-'}
                      </div>
                    </div>
                    {/* <div className="w-[100%] flex gap-4 items-center">
                      <p className="w-[50%] text-[14px] font-Montserrat font-bold text-[#333] flex justify-between">
                        Date of Renewal <span>:</span>{" "}
                      </p>
                      <p className="w-[50%] sm:text-[12px] text-[12px] font-Montserrat font-medium text-[#333]">
                        {dateFormatter(data.updatedAt)}
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" bg-[#fff] ml:W-[5%] w-[48px] h-[5%] p-3 rounded-xl cursor-pointer"
            onClick={()=>router.push(`/auth/recruiter-signup?isUpdate=true` )}
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img
              src="/images/profile/edit.png"
              className="w-[24px] h-[24px] object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
