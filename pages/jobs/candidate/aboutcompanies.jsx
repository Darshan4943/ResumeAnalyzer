import React, { useEffect, useState } from "react";
import NormalJobCard from "../../../components/featured/candidate/jobs/NormalJobCard";
import axios from "axios";
import JobsForYou from "../../../components/featured/candidate/jobs/JobsForYou";

function aboutcompanies() {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const id = "67b42338ecdf4a7cfbccc23e";

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerCompanies/${id}`
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
    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  const fetchEmployerJobs = async () => {
    if (!id) {
      setError("Company ID is required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerJobs/${id}`
      );
      setJobs(response.data);
      console.log(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, [id]);

  return (
    <>
      <div className="customMargins pt-[24px]">
        <div className=" pb-6 flex items-center gap-4 shadow-sm ">
          <div className="w-[98px] h-[98px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center ">
            <img
              src={company?.companyLogo}
              className="rounded-lg  w-[76px] h-[26px] object-contain"
            />
          </div>

          <div className=" items-start justify-start">
            <h2 className="text-[14px] font-[600]">{company?.name}</h2>
            <div className="flex items-center gap-1 text-sm mt-1">
              ⭐ <span className="text-[12px] font-[500]">3.6</span>
              <span className="text-[12px] font-[500]">| 786 Reviews</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-[12px] flex flex-col rounded-[6px] gap-[10px]">
          <div className="sm:text-[16px] text-[12px] font-[600]">About Company</div>
          <div className="sm:text-[14px] text-[10px]  font-[400]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 ">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1 min-w-[300px]">
              <h2 className="sm:text-[18px] text-[14px] font-semibold mb-2">
                Explore 412 Open Positions at Info Edge
              </h2>
              <div className="flex flex-col gap-4">
                {jobs.length > 0 ? (
                  jobs.map((item) => <NormalJobCard item={item} />)
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

export default aboutcompanies;
