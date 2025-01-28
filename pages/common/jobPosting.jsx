import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MiniLoader from "../../components/common/miniLoader";
import JobCard from "./hiring/jobCard";
import { useSelector } from "react-redux";

function JobPosting() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:2000/api/company/getCompaniesById/${userDataGlobal?._id}`,
          {
            params: { page: 1, limit: 100 },
          }
        );
        setCompanyData(response.data.companies);
        console.log(2929, response.data.companies);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Error fetching company data.");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchCompanyData();
  }, []);

  const handleCompanyChange = (event) => {
    const selectedId = event.target.value;

    router.push(`/common/jobPosting/CreateNewJob?companyId=${selectedId}`);
  };

  return (
    <>
      {loading ? (
        <div className="w-full justify-center">
          <MiniLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 flex-col  md:flex-row">
              <div className="flex flex-col bg-white rounded-[16px] p-4">
                <p className="text-[16px] font-medium">
                  Select an existing company <br />
                  from your list.
                </p>
                <div className="flex gap-2 items-end">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <select
                      onChange={handleCompanyChange}
                      className="border border-[#DEDEDE] rounded-[8px] p-2 text-[12px]  font-normal w-[204px]"
                    >
                      <option value="">Select a company</option>
                      {companyData?.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                  )}
                  <img
                    className="max-w-[92px] max-h-[78px] object-cover"
                    src={"/images/company.png"}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col bg-white rounded-[16px] p-4">
                <p className="text-[16px] font-medium">
                  Add detailed job descriptions <br />
                  and requirements.
                </p>
                <div className="flex gap-2 items-end">
                  <button
                    onClick={() =>
                      router.push(`/common/jobPosting/CreateNewJob`)
                    }
                    className="w-[212px] rounded-[30px] flex text-[14px] font-semibold bg-blue text-white h-[42px] items-center justify-center"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_94226)">
                        <path
                          d="M8.25 9.75H4.5C4.2875 9.75 4.10938 9.67812 3.96562 9.53438C3.82187 9.39062 3.75 9.2125 3.75 9C3.75 8.7875 3.82187 8.60938 3.96562 8.46562C4.10938 8.32188 4.2875 8.25 4.5 8.25H8.25V4.5C8.25 4.2875 8.32188 4.10938 8.46562 3.96562C8.60938 3.82187 8.7875 3.75 9 3.75C9.2125 3.75 9.39062 3.82187 9.53438 3.96562C9.67812 4.10938 9.75 4.2875 9.75 4.5V8.25H13.5C13.7125 8.25 13.8906 8.32188 14.0344 8.46562C14.1781 8.60938 14.25 8.7875 14.25 9C14.25 9.2125 14.1781 9.39062 14.0344 9.53438C13.8906 9.67812 13.7125 9.75 13.5 9.75H9.75V13.5C9.75 13.7125 9.67812 13.8906 9.53438 14.0344C9.39062 14.1781 9.2125 14.25 9 14.25C8.7875 14.25 8.60938 14.1781 8.46562 14.0344C8.32188 13.8906 8.25 13.7125 8.25 13.5V9.75Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    Manual Job Post
                  </button>
                  <img
                    className="max-w-[84px] max-h-[78px] object-cover"
                    src={"/images/manualPost.png"}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <JobCard />
        </div>
      )}
    </>
  );
}

export default JobPosting;
