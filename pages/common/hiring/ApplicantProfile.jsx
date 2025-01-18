import React from 'react'

function ApplicantProfile({jobDetails}) {
  return (
    <div className="flex flex-col gap-4 text-[16px] font-normal px-6 overflow-y-auto">
    <p className="font-semibold">Personal Info</p>
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <p className=" font-medium">Full Name</p>
          <p>
            {" "}
            {jobDetails?.details?.personal?.firstName +
              " " +
              jobDetails?.details?.personal?.lastName}
          </p>
        </div>
        <div>
          <p className=" font-medium">Address</p>
          <p>
            {jobDetails?.details?.personal?.currentLocation}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[50%]">
        <div>
          <p className=" font-medium">Gender</p>
          <p>{jobDetails?.details?.personal?.gender}</p>
        </div>
        <div>
          <p className=" font-medium">Language</p>
          <p>English, French, Bahasa</p>
        </div>
      </div>
    </div>
    <div className="h-[1px] w-full bg-[#D6DDEB]"></div>
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Professional Info</p>
      <div className="flex flex-col gap-2 ml:w-[80%] w-[100%]">
        <p className=" font-medium">About Me</p>
        <div className="flex flex-col gap-4">
          <p>
            I’m a product designer + filmmaker currently working
            remotely at Twitter from beautiful Manchester,
            United Kingdom. I’m passionate about designing
            digital products that have a positive impact on the
            world.
          </p>
          <p>
            For 10 years, I’ve specialised in interface,
            experience & interaction design as well as working
            in user research and product strategy for product
            agencies, big tech companies & start-ups.
          </p>
        </div>
      </div>
      <div className="flex ml:flex-row gap-4 flex-col justify-between">
        <div className="flex flex-col gap-4 ml:w-[30%] w-[100%]">
          <div>
            <p className=" font-medium">Current Job</p>
            <p>Product Designer</p>
          </div>
          <div>
            <p className=" font-medium">
              Highest Qualification
            </p>
            <p>Bachelors in Engineering</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 ml:w-[70%] w-[100%]">
          <div>
            <p className=" font-medium">Experience in Years</p>
            <p>4 Years</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-medium">Skills</p>
            <div className="flex gap-2 font-medium flex-wrap">
              <p className="border border-[#06A9EF] min-w-[160px] rounded-[24px] px-4 py-3">
                Product Design
              </p>
              <p className="border border-[#06A9EF] min-w-[160px] rounded-[24px] px-4 py-3">
                User Research
              </p>
              <p className="border border-[#06A9EF] min-w-[160px] rounded-[24px] px-4 py-3">
                Wireframing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ApplicantProfile