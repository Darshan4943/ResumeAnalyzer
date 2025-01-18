import { useRouter } from "next/router";
import React from "react";

function JobDetails({ jobDetails }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div
      className="grid md:grid-cols-2 grid-cols-1items-start justify-center mb-[10px] gap-5 rounded-2xl bg-[#fff] md:p-6 p-4 mt-4"
      style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {jobDetails && (
        <>
          <div className="flex flex-col items-start gap-4 self-stretch ">
            <div className="flex flex-col items-start gap-4  self-stretch">
              <div className="flex flex-col md:gap-2 gap-1 self-stretch">
                <p className="text-[#333] md:text-[20px] text-[18px] font-medium">
                  {jobDetails?.jobTitle}
                </p>
                <p className="text-[#333] font-Montserrat  text-[12px] font-[400px]">
                  {jobDetails?.companyName}
                </p>
                <div className="flex items-center gap-1">
                  {jobDetails?.location ? <img
                    src="/images/jobs/lo.png"
                    alt=""
                    className="w-[14px] h-[14px]"
                  /> : ""}
                  <p className="text-[#333] font-Montserrat text-[14px] font-[400px]">
                    {jobDetails?.location?.join(", ")}
                  </p>
                </div>
              </div>
              <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
            </div>

            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-start md:gap-2 gap-1 self-stretch">
                <p className="text-[#333] text-[20px] font-medium font-Montserrat">
                  Job Details
                </p>
                <div className="flex gap-1 items-center">
                  {jobDetails.jobType ? <img
                    src="/images/jobs/work.png"
                    className="w-[15px] h-[14px]"
                    alt=""
                  /> : ""}
                  <p className="text-[#333] font-Montserrat text-[14px] font-medium leading-normal">
                    {jobDetails.jobType}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  {jobDetails.jobMode ? <img
                    src="/images/jobs/work.png"
                    className="w-[15px] h-[14px]"
                    alt=""
                  /> : ""}
                  <p className="text-[#333] font-Montserrat text-[14px] font-medium">
                    {jobDetails.jobMode}
                  </p>
                </div>
                <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4  self-stretch">
              <div className="flex flex-col md:gap-2 gap-2 self-stretch">
                <p className="text-[#333] md:text-[20px] text-[18px] font-medium">
                  Qualifications
                </p>
                <p className="text-[#333] font-Montserrat  text-[14px] font-medium">
                  {jobDetails?.qualificationType?.[0] ||
                    "No qualification available"}
                  <br />
                  Total Work Experience {jobDetails.experience} (Required)
                </p>
              </div>
              <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="text-[20px] font-[500px]">
                Full job Description
              </div>
              <div className="text-[12px] text-[400] gap-[8px] flex flex-col">
                {jobDetails.description}
                <span className="text-[12px] font-[500px] text-[#333] ">
                  Responsibilities :
                </span>
                Develop design solutions for various platforms Establish
                consistent brand and creative designs Communicate ideas with
                project managers using mock-ups and look books Build sitemaps,
                wireframes and prototypes to outline the structure{" "}
                <span className="text-[12px] font-[500px] text-[#333]">
                  Qualifications :
                </span>{" "}
                Bachelors degree in user experience, design or related field 2+
                years of experience with UI design Strong communication, design
                and creative thinking skills Experience with Adobe Pro,
                Illustrator and Photoshop, Figma, InVision.
                <span className="text-[14px] font-[500]">
                  {" "}
                  Job Type:{jobDetails.jobType}
                </span>{" "}
                <span className="text-[12px] font-[500px] text-[#333]">
                  Salary: ₹{jobDetails.minSalary} - ₹{jobDetails.maxSalary}
                </span>{" "}
                <span className="text-[12px] font-[500] text-[#333]">
                  Schedule: Day shift{" "}
                </span>{" "}
                <span className="text-[12px] font-[500] text-[#333]">
                  Education: {jobDetails.qualificationType} (Preferred){" "}
                </span>{" "}
                <span className="text-[12px] font-[500] text-[#333]">
                  Experience: total work:{jobDetails.experience} (Required)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-start gap-6 w-[100%]">
              <div className="flex flex-col items-start gap-4 self-stretch">
                <p className="text-[#333] font-medium text-[24px] font-Montserrat">
                  About this role
                </p>
                <div className="flex flex-col p-4 gap-2 self-stretch items-start bg-[#F8F8FD]">
                  <p className="text-[16px] font-semibold font-Montserrat text-[#333]">
                    {jobDetails.applications?.length} applied{" "}
                    <span className="text-[16px] font-medium font-Montserrat text-[#646464]">
                      of 10 capacity
                    </span>
                  </p>
                  <div className="w-[100%] bg-[#D6DDEB] ">
                    <div
                      className="bg-[#56CDAD] h-[8px]"
                      style={{
                        width: `${Math.min(
                          ((jobDetails.applications?.length || 0) / 10) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-start self-stretch">
                  <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                    Apply Before
                  </p>
                  <p className="text-[16px] text-[#333] font-semibold font-Montserrat">
                    {new Date(jobDetails.deadLine).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-start self-stretch">
                  <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                    Job Posted On
                  </p>
                  <p className="text-[16px] text-[#333] font-semibold font-Montserrat">
                    {new Date(jobDetails.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-start self-stretch">
                  <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                    Job Type
                  </p>
                  <p className="text-[16px] text-[#333] font-semibold font-Montserrat">
                    {jobDetails.jobType}
                  </p>
                </div>
                <div className="flex justify-between items-start self-stretch">
                  <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                    Salary
                  </p>
                  <p className="text-[16px] text-[#333] font-semibold font-Montserrat">
                    {jobDetails.minSalary} - {jobDetails.maxSalary}
                  </p>
                </div>
                <div className="w-full bg-[#9F9F9F] h-[1px]"></div>
                <div className="flex flex-col items-start gap-4">
                  <p className="text-[24px] text-[#333] font-medium font-Montserrat">
                    Categories
                  </p>
                  <div className="flex items-start gap-2">
                    <button
                      className="flex px-[10px] py-[6px] items-center rounded-[80px] text-[14px] font-semibold font-Montserrat text-[#FFB836]"
                      style={{ backgroundColor: "rgba(235, 133, 51, 0.10)" }}
                    >
                      Marketing
                    </button>
                    <button
                      className="flex px-[10px] py-[6px] items-center rounded-[80px] text-[14px] font-semibold font-Montserrat text-[#56CDAD]"
                      style={{ backgroundColor: "rgba(86, 205, 173, 0.10)" }}
                    >
                      Design
                    </button>
                  </div>
                </div>
                <div className="w-full bg-[#9F9F9F] h-[1px]"></div>
                <div className="flex flex-col g-4 items-start w-full">
                  <p className="text-[24px] text-[#333] font-medium font-Montserrat">
                    Required Skills
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {jobDetails.mustSkills.map((skill, index) => (
                        <button
                          key={index}
                          className="flex items-center px-4 py-3 rounded-[25px] font-medium text-[#333] text-[12px] md:text-[14px] bg-[#fff]"
                          style={{
                            border: "1px solid var(--primary, #06A9EF)",
                            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default JobDetails;
