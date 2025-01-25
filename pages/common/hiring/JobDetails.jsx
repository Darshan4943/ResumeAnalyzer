import { useRouter } from "next/router";
import React from "react";
import { currenciesWithIcons } from "../../../utils/data";

function JobDetails({ jobDetails, totalCount }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(jobDetails);
  return (
    <div
      className="grid md:grid-cols-2 grid-cols-1items-start justify-center mb-[10px] gap-5 rounded-2xl bg-[#fff] md:p-6 p-4 mt-4"
      style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
    >
      {jobDetails?.data?.jobDetails && (
        <>
          <div className="flex flex-col items-start gap-4 self-stretch ">
            <div className="flex flex-col items-start gap-4  self-stretch">
              <div className="flex flex-col md:gap-2 gap-1 self-stretch">
                <p className="text-[#333]  text-[16px] font-[600]">
                  {jobDetails?.data?.jobDetails?.jobTitle}
                </p>
                <p className="text-[#333] font-Montserrat  text-[12px] font-[400px]">
                  {jobDetails?.data?.jobDetails?.companyName}
                </p>
                <div className="flex items-center gap-1 text-[14px] font-[400px]">
                  {jobDetails?.data?.jobDetails?.location ? (
                    <img
                      src="/images/jobs/lo.png"
                      alt=""
                      className="w-[14px] h-[14px]"
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-[#333] font-Montserrat text-[14px] font-[400px]">
                    {jobDetails?.data?.jobDetails?.location?.join(", ")}
                  </p>
                </div>
              </div>
              <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
            </div>

            <div className="flex flex-col items-start gap-3 self-stretch">
              <div className="flex flex-col items-start md:gap-2 gap-1 self-stretch">
                <p className="text-[#333] text-[16px] font-[600] font-Montserrat">
                  Job Details
                </p>
                <div className="flex gap-1 items-center">
                  {jobDetails?.data?.jobDetails?.jobType ? (
                    <img
                      src="/images/jobs/work.png"
                      className="w-[15px] h-[14px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-[#333] font-Montserrat text-[14px] font-medium leading-normal">
                    {jobDetails?.data?.jobDetails?.jobType}
                  </p>
                </div>
                <div className="flex gap-1 items-center text-[14px] font-medium">
                  {jobDetails?.data?.jobDetails?.jobMode ? (
                    <img
                      src="/images/jobs/work.png"
                      className="w-[15px] h-[14px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-[#333] font-Montserrat text-[14px] font-medium">
                    {jobDetails?.data?.jobDetails?.jobMode}
                  </p>
                </div>
                <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4  self-stretch">
              <div className="flex flex-col md:gap-2 gap-2 self-stretch">
                <p className="text-[#333]   text-[16px] font-semibold">
                  Qualifications
                </p>
                <p className="text-[#333] font-Montserrat  text-[14px] font-medium">
                  {jobDetails?.data?.jobDetails?.requiredQualification ||
                    "No qualification available"}
                  <br />
                  Total Work Experience{" "}
                  {jobDetails?.data?.jobDetails?.experience} (Required)
                </p>
              </div>
              <div className="bg-[#9f9f9f] h-[1px] w-full"></div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="text-[16px] font-[500]">
                Full job Description
              </div>
              <div className="text-[14px] text-[400] gap-[8px] flex flex-col">
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetails?.data?.jobDetails?.description,
                  }}
                />

                <span className="text-[14px] font-[500] text-[#333]">
                  {" "}
                  Job Type : {jobDetails?.data?.jobDetails?.jobType}
                </span>{" "}
                
                {(jobDetails?.data?.jobDetails?.minSalary > 0 ||
                  jobDetails?.data?.jobDetails?.maxSalary > 0) && (
                    <div className="text-[14px] font-[500] flex text-[#333]">
                      Salary :
                      {(() => {
                        const icon = currenciesWithIcons?.find(
                          (item) =>
                            item?.icon?.toLowerCase() ===
                            jobDetails?.data?.jobDetails?.currency?.toLowerCase()
                        );

                        return (
                          <div className="text-[14px] font-[500] text-[#333]">
                            {icon ? icon.symbol : jobDetails?.data?.jobDetails?.currency}{" "}
                            {jobDetails?.data?.jobDetails.minSalary}{" "}
                            {jobDetails?.data?.jobDetails.minSalary &&
                              jobDetails?.data?.jobDetails.maxSalary &&
                              "-"}{" "}
                            {icon ? icon.symbol : jobDetails?.data?.jobDetails?.currency}{" "}
                            {jobDetails?.data?.jobDetails.maxSalary}{" "}
                            {jobDetails?.data?.jobDetails.salaryType === "Annual"
                              ? "per annum"
                              : "per month"}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                {/* <span className="text-[14px] font-[500] text-[#333]">
                  Schedule : Day shift{" "}
                </span>{" "} */}
                <span className="text-[14px] font-[500] text-[#333]">
                  Education : {jobDetails?.data?.jobDetails?.requiredQualification}{" "}
                  (Preferred){" "}
                </span>{" "}
                <span className="text-[14px] font-[500] text-[#333]">
                  Experience : {jobDetails?.data?.jobDetails?.experience} (Required)
                </span>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="flex flex-col items-start gap-6 w-[100%]">
              <div className="flex flex-col items-start gap-4 self-stretch">
                <p className="text-[#333] font-medium text-[18px] font-Montserrat">
                  About this role
                </p>
                <div className="flex flex-col p-4 gap-2 self-stretch items-start bg-[#F8F8FD]">
                  <p className="text-[16px] font-semibold font-Montserrat text-[#333]">
                    {totalCount} applied{" "}
                    <span className="text-[16px] font-medium font-Montserrat text-[#646464]">
                      of {jobDetails?.data?.jobDetails?.openPositions} capacity
                    </span>
                  </p>
                  <div className="w-[100%] bg-[#D6DDEB] rounded-[6px] ">
                    <div
                      className="bg-[#56CDAD] h-[8px] rounded-[6px]"
                      style={{
                        width: `${Math.min(
                          ((totalCount || 0) / jobDetails?.data?.jobDetails?.openPositions) * 100,
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
                    {new Date(
                      jobDetails?.data?.jobDetails?.deadLine
                    ).toLocaleDateString("en-US", {
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
                    {new Date(
                      jobDetails?.data?.jobDetails?.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {jobDetails?.data?.jobDetails?.jobType &&
                  <div className="flex justify-between items-start self-stretch">
                    <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                      Job Type
                    </p>
                    <p className="text-[16px] text-[#333] font-semibold font-Montserrat">
                      {jobDetails?.data?.jobDetails?.jobType}
                    </p>
                  </div>
                }
                {jobDetails?.data?.jobDetails?.minSalary &&
                  <div className="flex justify-between items-start self-stretch">
                    <p className="text-[16px] text-[#646464] font-medium font-Montserrat">
                      Salary
                    </p>
                    {(jobDetails?.data?.jobDetails?.minSalary > 0 ||
                  jobDetails?.data?.jobDetails?.maxSalary > 0) && (
                    <div className="text-[16px] font-[600] flex text-[#333]">
                    
                      {(() => {
                        const icon = currenciesWithIcons?.find(
                          (item) =>
                            item?.icon?.toLowerCase() ===
                            jobDetails?.data?.jobDetails?.currency?.toLowerCase()
                        );

                        return (
                          <div className="text-[16px] font-[600] text-[#333]">
                            {icon ? icon.symbol : jobDetails?.data?.jobDetails?.currency}{" "}
                            {jobDetails?.data?.jobDetails.minSalary}{" "}
                            {jobDetails?.data?.jobDetails.minSalary &&
                              jobDetails?.data?.jobDetails.maxSalary &&
                              "-"}{" "}
                            {icon ? icon.symbol : jobDetails?.data?.jobDetails?.currency}{" "}
                            {jobDetails?.data?.jobDetails.maxSalary}{" "}
                            {jobDetails?.data?.jobDetails.salaryType === "Annual"
                              ? "per annum"
                              : "per month"}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  </div>
                }

                <div className="w-full bg-[#9F9F9F] h-[1px]"></div>
                <div className="flex flex-col gap-4 items-start w-full">
                  <p className="text-[18px] text-[#333] font-[500] font-Montserrat">
                    Required Skills
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      {jobDetails?.data?.jobDetails?.mustSkills?.map(
                        (skill, index) => (
                          <button
                            key={index}
                            className="flex items-center px-4 py-2 rounded-[25px] font-medium text-[#333] text-[14px]  bg-[#fff]"
                            style={{
                              border: "1px solid var(--primary, #06A9EF)",
                              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            {skill}
                          </button>
                        )
                      )}
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
