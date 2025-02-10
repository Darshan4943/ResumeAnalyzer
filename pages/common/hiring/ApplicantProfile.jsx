import React from 'react'

function ApplicantProfile({ jobDetails }) {

  return (
    <div className="flex flex-col gap-4 text-[16px] font-normal px-6 h-[calc(100vh-300px)] overflow-y-auto">
      <p className="font-semibold">Personal Info</p>
      <div className="flex gap-6">
        <div className="flex flex-col gap-4 w-[50%]">
          <div>
            <p className="text-[14px]  font-medium">Full Name</p>
            <p className="text-[12px] font-normal">

              {jobDetails?.details?.personal?.firstName}  {jobDetails?.details?.personal?.lastName}

            </p>
          </div>
          <div>
            <p className=" text-[14px] font-medium">Address</p>
            <p className="text-[12px] font-normal">
              {jobDetails?.details?.personal?.currentLocation}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[50%] ">
          {jobDetails?.details?.personal?.gender &&
            <div>
              <p className="text-[14px]  font-medium">Gender</p>
              <p className="text-[12px] font-normal">{jobDetails?.details?.personal?.gender}</p>
            </div>
          }
          {/* <div>
          <p className="text-[14px]  font-medium">Language</p>
          <p className="text-[12px] font-normal">English, French, Bahasa</p>
        </div> */}
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D6DDEB]"></div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Professional Info</p>
        <div className="flex flex-col gap-2 ml:w-[80%] w-[100%]">
          <p className=" font-medium text-[14px] ">About Me</p>
          <div className="flex flex-col gap-4 text-[12px] font-normal">
            <p>
              {jobDetails?.details?.professional?.aboutme}
            </p>

          </div>
        </div>
        <div className="flex ml:flex-row gap-4 flex-col justify-between">
          <div className="flex flex-col gap-4 ml:w-[30%] w-[100%]">
            <div>
              <p className=" text-[14px]  font-medium">Current Job</p>
              <p className="text-[12px] font-normal">{jobDetails?.details?.professional?.currentJob}</p>
            </div>
            <div>
              <p className=" text-[14px]  font-medium">
                Highest Qualification
              </p>
              <p className="text-[12px] font-normal">{jobDetails?.details?.professional?.hightestQul}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ml:w-[70%] w-[100%]">
            <div>
              <p className="text-[14px]  font-medium">Experience in Years</p>
              <p className="text-[12px] font-normal">{jobDetails?.details?.professional?.totalExperience}</p>
            </div>
            {jobDetails?.details?.professional?.skills &&
              <div className="flex flex-col gap-2">
                <p className=" font-medium">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {jobDetails?.details?.professional?.skills?.slice(0, 5)?.map((item, index) => (
                    <div key={index} className="flex gap-2 font-medium flex-wrap">
                      <p className="border text-[12px] font-medium border-[#06A9EF] min-w-[160px] rounded-[24px] px-4 py-3">
                        {item}
                      </p>

                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantProfile