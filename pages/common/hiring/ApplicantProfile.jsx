import React from "react";

function ApplicantProfile({ applicantDetails }) {
  return (
    <div className="flex flex-col gap-4 text-[16px] font-normal px-2 scr500:px-6  overflow-y-auto">
      <p className="font-semibold">Personal Info</p>
      <div className="flex gap-6">
        <div className="flex  gap-12 w-[1000%]">
          <div>
            <p className="text-[14px]  font-medium">Full Name</p>
            <p className="text-[12px] font-normal">
              {applicantDetails?.details?.personal?.firstName} {""}
              {applicantDetails?.details?.personal?.lastName}
            </p>
           
          </div>
          <div>
            <p className="text-[14px]  font-medium">Email</p>
            <p className="text-[12px] font-normal">
              {applicantDetails?.details?.personal?.email}
            </p>
           
          </div>
          <div>
            <p className="text-[14px]  font-medium">Mobile Number</p>
            <p className="text-[12px] font-normal">
            {applicantDetails?.details?.personal?.dial_code} {applicantDetails?.details?.personal?.mobileNo}
            </p>
           
          </div>
          {applicantDetails?.details?.personal?.currentLocation && (
            <div>
              <p className=" text-[14px] font-medium">Address</p>
              <p className="text-[12px] font-normal">
                {applicantDetails?.details?.personal?.currentLocation}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 w-[50%] ">
          {applicantDetails?.details?.personal?.gender && (
            <div>
              <p className="text-[14px]  font-medium">Gender</p>
              <p className="text-[12px] font-normal">
                {applicantDetails?.details?.personal?.gender}
              </p>
            </div>
          )}
          {/* <div>
          <p className="text-[14px]  font-medium">Language</p>
          <p className="text-[12px] font-normal">English, French, Bahasa</p>
        </div> */}
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D6DDEB]"></div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Professional Info</p>
        {applicantDetails?.details?.professional?.aboutme && (
          <div className="flex flex-col gap-2 ml:w-[80%] w-[100%]">
            <p className=" font-medium text-[14px] ">About Me</p>
            <div className="flex flex-col gap-4 text-[12px] font-normal">
              <p>{applicantDetails?.details?.professional?.aboutme}</p>
            </div>
          </div>
        )}
        <div className="flex ml:flex-row gap-4 flex-col justify-between">
          {applicantDetails?.details?.professional?.currentJob?.company  ||
          applicantDetails?.details?.professional?.hightestQul?.length > 0 ? (
            <div className="flex flex-col gap-4 ml:w-[30%] w-[100%]">
              {applicantDetails?.details?.professional?.currentJob && (
                <div>
                  <p className="text-[14px] font-medium">Current Job</p>
                  <p className="text-[12px] font-normal">
                    {applicantDetails?.details?.professional?.currentJob?.company}
                  </p>
                  <p className="text-[12px] font-normal">
                    {applicantDetails?.details?.professional?.currentJob?.title}
                  </p>
                </div>
              )}
              {applicantDetails?.details?.professional?.hightestQul && (
                <div>
                  <p className="text-[14px] font-medium">
                    Highest Qualification
                  </p>
                  <p className="text-[12px] font-normal">
                    {applicantDetails?.details?.professional?.hightestQul}
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div className="flex flex-col gap-4 ml:w-[70%] w-[100%]">
            {applicantDetails?.details?.professional?.totalExperience && (
              <div>
                <p className="text-[14px]  font-medium">Experience in Years</p>
                <p className="text-[12px] font-normal">
                  {applicantDetails?.details?.professional?.totalExperience}
                </p>
              </div>
            )}
            {applicantDetails?.details?.professional?.skills.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className=" font-medium">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {applicantDetails?.details?.professional?.skills?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex gap-2 font-medium flex-wrap"
                      >
                        <p className="border text-[12px] font-medium border-[#06A9EF] rounded-[24px] px-4 py-2">
                          {typeof item === "object" && item !== null
                            ? item.skill
                            : item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantProfile;
