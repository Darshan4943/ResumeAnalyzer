import React, { useEffect, useState } from "react";
import NormalJobCard from "../../../components/featured/candidate/jobs/NormalJobCard";
import axios from "axios";
import JobsForYou from "../../../components/featured/candidate/jobs/JobsForYou";
import { useRouter } from "next/router";
import { camelCase } from "../../../utils/middleware";

function Aboutcompanies() {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const { companyName, createdBy ,role} = router.query;
  console.log(888,company)

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerCompanies/${createdBy}`
      );
      setCompany(response.data);
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (createdBy) {
      fetchCompanyDetails();
    }
  }, [createdBy]);

  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerJobs?companyName=${encodeURIComponent(
          companyName
        )}`
      );

      setJobs(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyName) {
      fetchEmployerJobs();
    }
  }, [companyName]);

  const fetchJobsById = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getJobsById/${createdBy}`
      );
      setJobs(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (createdBy) {
      fetchJobsById();
    }
  }, [createdBy]);

  return (
    <>
      <div className="customMargins py-[24px]">
        {createdBy ? (
          <div className=" flex items-center gap-4  ">
            <div className="w-[98px] h-[98px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center ">
              <img
                src={role ==="recruiter" ?company?.profilePicture :company?.companyLogo}
                className="rounded-lg  w-[76px] h-[26px] object-contain"
              />
            </div>

            <div className=" items-start justify-start">
              <h2 className="text-[14px] font-[600]">{camelCase(company?.name)}</h2>
              <div className="text-[12px] font-[400]">{camelCase(role ==="recruiter" ? company?.role: company?.about)}</div>

              {/* <div className="flex items-center gap-1 text-sm mt-1">
  ⭐ <span className="text-[12px] font-[500]">3.6</span>
  <span className="text-[12px] font-[500]">| 786 Reviews</span>
</div> */}
            </div>
          </div>
        ) : (
          <div className=" flex items-center gap-4  ">
            {jobs[0]?.logo &&
            <div className="w-[98px] h-[98px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center ">
              <img
                src={jobs[0]?.logo}
                className="rounded-lg  w-[76px] h-[26px] object-contain border-none"
              />
            </div>
}

            <div className=" items-start justify-start">
              <h2 className="text-[14px] font-[600]">{companyName}</h2>
              <div className="text-[12px] font-[400]">
                {jobs[0]?.aboutOrganization}
              </div>

              {/* <div className="flex items-center gap-1 text-sm mt-1">
              ⭐ <span className="text-[12px] font-[500]">3.6</span>
              <span className="text-[12px] font-[500]">| 786 Reviews</span>
            </div> */}
            </div>
          </div>
        )}
        {/* <div className="bg-[#FFFFFF] p-[12px] flex flex-col rounded-[6px] gap-[10px]">
          <div className="sm:text-[16px] text-[12px] font-[600]">
            About Company
          </div>
          <div className="sm:text-[14px] text-[10px]  font-[400]">
            {jobs[0]?.aboutOrganization}
          </div>
        </div> */}

        <div className="flex flex-col gap-6 pt-6 ">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1 min-w-[300px]">
              <h2 className="sm:text-[18px] text-[14px] font-semibold mb-2">
                Explore {jobs.length} Open Positions at {companyName}
              </h2>
              <div className="flex flex-col gap-4">
                {jobs.length > 0 ? (
                  jobs.map((item, index) => (
                    <NormalJobCard key={item.id || index} item={item} />
                  ))
                ) : (
                  <p>No jobs found for this company.</p>
                )}
              </div>
            </div>

            <div className="w-[357px] flex flex-col">
              <h2 className="sm:text-[18px] text-[14px]  font-semibold mb-2 ">
                Relevant Job Opportunities
              </h2>
              <div className=" bg-white rounded-[12px] mb-6  p-[8px]">
                <JobsForYou isRelevant={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutcompanies;
