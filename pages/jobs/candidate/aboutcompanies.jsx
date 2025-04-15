import React, { useEffect, useState } from "react";
import NormalJobCard from "../../../components/featured/candidate/jobs/NormalJobCard";
import axios from "axios";
import JobsForYou from "../../../components/featured/candidate/jobs/JobsForYou";
import { useRouter } from "next/router";
import { camelCase } from "../../../utils/middleware";
import MiniLoader from "../../../components/common/miniLoader";
import CustomPagination from "../../../components/common/CustomPagination";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import NoJobs from "../../../components/featured/candidate/jobs/noJobs";

function Aboutcompanies() {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [miniLoading, setMiniloading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { companyName, createdBy, role, id, isRec } = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [showPopup, setShowPopup] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalRatingCount, setTotalRatingCount] = useState(0);
  const [userReviews, setUserReviews] = useState();

  const [reviewData, setReviewData] = useState({
    companyId: id ? id : company?._id,
  });
  useEffect(() => {
    if (role === "recruiter") {
      setReviewData({ ...reviewData, companyId: company?._id })
    }

  }, [company])

  const fetchCompanyDetailsByRecId = async () => {
    try {
      setMiniloading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerCompaniesByRecId/${createdBy}`
      );
      setCompany(response.data);
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        setMiniloading(false);
      }, 500);
    }
  };

  const fetchJobsById = async () => {
    try {
      setMiniloading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getJobsById/${id ? id : createdBy
        }?page=${page}&limit=${limit}&role=${role}`
      );
      const { jobs, totalCount, totalPages } = response.data;

      setJobs(jobs);
      setTotalCount(totalCount);
      setTotalpages(totalPages);
      setError("");
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setTimeout(() => setMiniloading(false), 500);
    }
  };

  useEffect(() => {
    if (createdBy && role === "recruiter" && isRec) {
      fetchCompanyDetailsByRecId();
      fetchJobsById();
    }
  }, [createdBy]);

  const fetchCompanyDetails = async () => {
    try {
      setMiniloading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerCompanies/${id}`
      );
      setCompany(response.data);
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        setMiniloading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompanyDetails();
      fetchJobsById();
    } else if (companyName) {
      fetchEmployerJobs();
    }
  }, [id]);

  const fetchEmployerJobs = async () => {
    try {
      setMiniloading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerJobs?companyName=${encodeURIComponent(
          companyName
        )}&page=${page}&limit=${limit}&createdBy=${createdBy}`
      );

      const { jobs, totalCount, totalPages } = response.data;
      setJobs(jobs);
      setTotalCount(totalCount);
      setTotalpages(totalPages);
      setError("");
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
      setError(err.response?.data?.message || "Failed to fetch jobs.");
    } finally {
      setTimeout(() => setMiniloading(false), 500);
    }
  };

  // useEffect(() => {
  //   if (companyName && role === "recruiter") {
  //     fetchEmployerJobs();
  //   }
  // }, [companyName, page, limit]);

  // useEffect(() => {
  //   if (createdBy || role === "employer") {
  //     fetchJobsById();
  //   }
  // }, [createdBy, page, limit, role]);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleRating = (index) => {
    setReviewData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleInputChange = (e) => {
    setReviewData((prev) => ({ ...prev, review: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2000/api/createOrUpdateReview",
        { ...reviewData, userId: userDataGlobal?._id }
      );

      toast.success(response.data.message);
      setShowPopup(false);
      fetchReviews();
    } catch (error) {
      console.error("Failed to submit review:", error.response?.data?.message);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const fetchReviews = async () => {
    const idd = role === "recruiter" ? company?._id : id

    try {
      const response = await axios.get(
        `http://localhost:2000/api/getreview/${idd}`
      );
      const { averageRating, totalReviews, totalRatingCount } = response.data;

      setAverageRating(averageRating);
      setTotalReviews(totalReviews);
      setTotalRatingCount(totalRatingCount);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };
  useEffect(() => {

    fetchReviews();

  }, [id, company]);


  const fetchReviewss = async () => {

    const idd = role === "recruiter" ? company?._id : id
   
    try {
      const response = await axios.get(
        `http://localhost:2000/api/getReviewByUser/${idd}/${userDataGlobal?._id}`
      );
      const review = response.data.reviews[0];

      setReviewData({
        ...reviewData,
        review: review.review,
        rating: review.rating,
      });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };
  useEffect(() => {
    if (showPopup) {
      fetchReviewss();
    }
  }, [showPopup]);

  return (
    <div className="customMargins">
      {miniLoading ? (
        <MiniLoader />
      ) : (
        <>
          <div className="customMargins py-[24px] flex flex-col gap-6 ">
            <div className="flex md:flex-row flex-col md:justify-between gap-2 md:items-center items-start ">
              {isRec || id ? (
                <div className="flex items-center gap-4 ">
                  <div className="w-[98px] h-[54px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center">
                    {role === "recruiter" ? (
                      company?.profilePicture ? (
                        <img
                          src={company?.profilePicture}
                          className=" object-contain  h-[40px]"
                          alt="Profile"
                        />
                      ) : (
                        <svg
                          width="98"
                          height="40"
                          viewBox="0 0 74 74"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_9091_108707)">
                            <path
                              d="M37 0C29.6821 0 22.5285 2.17001 16.4439 6.23562C10.3593 10.3012 5.61692 16.0798 2.81647 22.8407C0.0160314 29.6016 -0.716692 37.041 0.710961 44.2183C2.13861 51.3956 5.66252 57.9884 10.8371 63.163C16.0116 68.3375 22.6044 71.8614 29.7817 73.2891C36.959 74.7167 44.3984 73.984 51.1593 71.1835C57.9202 68.3831 63.6988 63.6407 67.7644 57.5561C71.83 51.4715 74 44.3179 74 37C73.987 27.191 70.0847 17.7874 63.1486 10.8514C56.2126 3.91534 46.809 0.0129712 37 0ZM37 17.3438C39.2869 17.3438 41.5224 18.0219 43.4238 19.2924C45.3252 20.5629 46.8072 22.3687 47.6824 24.4815C48.5575 26.5942 48.7865 28.9191 48.3403 31.162C47.8942 33.4049 46.793 35.4651 45.1759 37.0822C43.5589 38.6992 41.4987 39.8004 39.2558 40.2466C37.0128 40.6927 34.688 40.4637 32.5752 39.5886C30.4625 38.7135 28.6567 37.2315 27.3862 35.33C26.1156 33.4286 25.4375 31.1931 25.4375 28.9062C25.4386 25.84 26.6572 22.8997 28.8253 20.7315C30.9935 18.5634 33.9338 17.3449 37 17.3438ZM55.5 56.6562C55.1955 56.6593 54.8934 56.6015 54.6115 56.4864C54.3296 56.3713 54.0734 56.201 53.8581 55.9857C53.6427 55.7703 53.4725 55.5142 53.3574 55.2323C53.2422 54.9503 53.1845 54.6483 53.1875 54.3438C53.1887 53.4324 53.0101 52.5297 52.6619 51.6874C52.3137 50.8452 51.8027 50.0799 51.1583 49.4355C50.5138 48.791 49.7486 48.2801 48.9063 47.9319C48.0641 47.5836 47.1614 47.405 46.25 47.4062H27.75C26.8386 47.405 25.936 47.5836 25.0937 47.9319C24.2515 48.2801 23.4862 48.791 22.8417 49.4355C22.1973 50.0799 21.6863 50.8452 21.3381 51.6874C20.9899 52.5297 20.8113 53.4324 20.8125 54.3438C20.8125 54.9571 20.5689 55.5453 20.1352 55.9789C19.7015 56.4126 19.1133 56.6562 18.5 56.6562C17.8867 56.6562 17.2985 56.4126 16.8648 55.9789C16.4312 55.5453 16.1875 54.9571 16.1875 54.3438C16.1886 51.2775 17.4072 48.3372 19.5753 46.169C21.7435 44.0009 24.6838 42.7824 27.75 42.7812H46.25C49.3162 42.7824 52.2566 44.0009 54.4247 46.169C56.5929 48.3372 57.8114 51.2775 57.8125 54.3438C57.8155 54.6483 57.7578 54.9503 57.6427 55.2323C57.5275 55.5142 57.3573 55.7703 57.142 55.9857C56.9266 56.201 56.6705 56.3713 56.3885 56.4864C56.1066 56.6015 55.8045 56.6593 55.5 56.6562Z"
                              fill="#B8B8B8"
                            />
                            <path
                              d="M37 35.8438C40.8315 35.8438 43.9375 32.7377 43.9375 28.9062C43.9375 25.0748 40.8315 21.9688 37 21.9688C33.1685 21.9688 30.0625 25.0748 30.0625 28.9062C30.0625 32.7377 33.1685 35.8438 37 35.8438Z"
                              fill="#B8B8B8"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_9091_108707">
                              <rect width="74" height="74" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )
                    ) : company?.companyLogo ? (
                      <img
                        src={company?.companyLogo}
                        className="rounded-lg w-[76px] h-[40px] object-contain"
                        alt="Company Logo"
                      />
                    ) : (
                      <img
                        className="w-[76px] h-[40px] object-contain"
                        src="/images/jobs/logo.png"
                        alt="logo"
                      />
                    )}
                  </div>

                  <div className="items-start justify-start">
                    <h2 className="text-[14px] font-[600]">
                      {camelCase(company?.name)}
                    </h2>
                    {(role !== "recruiter" || company?.about) && (
                      <div className="items-start justify-start">
                        <h2 className="text-[14px] font-[600]">
                          {companyName}
                        </h2>

                        <div className="flex items-center gap-1 text-sm mt-1">
                          ⭐{" "}
                          <span className="text-[12px] font-[500]">
                            {averageRating}
                          </span>
                          <span className="text-[12px] font-[500]">
                            | {totalReviews}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>



                </div>

              ) : (
                <div className="flex items-center gap-4 ">
                  {jobs[0]?.logo ? (
                    <div className="w-[98px] h-[54px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center">
                      <img
                        src={jobs[0]?.logo}
                        className="rounded-lg w-[76px] h-[40px] object-contain"
                        alt="Job Logo"
                      />
                    </div>
                  ) : (
                    <div className="w-[98px] h-[54px] bg-white rounded-xl border-[1px] border-[#DEDEDE] flex items-center justify-center">
                      <img
                        className="w-[76px]  h-[40px] object-contain"
                        src="/images/jobs/logo.png"
                        alt="logo"
                      />
                    </div>
                  )}

                  <div className="items-start justify-start">
                    <h2 className="text-[14px] font-[600]">{companyName}</h2>

                    {/* <div className="flex items-center gap-1 text-sm mt-1">
                      ⭐{" "}
                      <span className="text-[12px] font-[500]">
                        {averageRating}
                      </span>
                      <span className="text-[12px] font-[500]">
                        | {totalReviews}
                      </span>
                    </div> */}
                  </div>
                </div>
              )}
              {(id || company?.about) && userDataGlobal &&  (
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className="bg-[#06A9EF]   md:px-6  px-[16px] text-white md:text-[14px] text-[12px] font-[600] bg_Button h-[38px] rounded-[30px]"
                >
                  Give Us Your Feedback
                </button>
              )}
            </div>

            {companyName && jobs[0]?.aboutOrganization && (
              <div className="bg-[#FFFFFF] p-[12px] flex flex-col rounded-[6px] gap-[10px]">
                <div className="sm:text-[16px] text-[12px] font-[600]">
                  About Company
                </div>
                {/* <div className="sm:text-[14px] text-[10px]  font-[400]">
                  {jobs[0]?.aboutOrganization}
                </div> */}
                <div
                  className="sm:text-[14px] text-[10px]  font-[400]"
                  dangerouslySetInnerHTML={{
                    __html: jobs[0]?.aboutOrganization,
                  }}
                />
              </div>
            )}
            {(id || company?.about) && (
              <div className="bg-[#FFFFFF] p-[12px] flex flex-col rounded-[6px] gap-[10px]">
                <div className="sm:text-[16px] text-[12px] font-[600]">
                  About Company
                </div>

                <div
                  className="sm:text-[14px] text-[10px]  font-[400]"
                  dangerouslySetInnerHTML={{
                    __html: company?.about,
                  }}
                />
              </div>
            )}
            <div
              className={`flex flex-col gap-6 ${role === "recruiter" ? "pt-0" : "pt-6"
                }`}
            >
              {jobs.length > 0 ? (
                <div className="flex flex-wrap justify-between gap-4">
                  <div className="flex-1 min-w-[300px]">
                    <h2 className="sm:text-[16px] text-[14px] font-semibold mb-2">
                      Explore {jobs.length} Open Positions at {companyName}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {jobs.length > 0 ? (
                        jobs.map((item, index) => (
                          <NormalJobCard key={item.id || index} item={item} />
                        ))
                      ) : (
                        <NoJobs />
                      )}
                    </div>
                  </div>

                  <div className="w-[357px] flex flex-col">
                    <h2 className="sm:text-[16px] text-[14px]  font-semibold mb-2 ">
                      Relevant Job Opportunities
                    </h2>
                    <div className=" bg-white rounded-[12px] mb-6  p-[8px]">
                      <JobsForYou isRelevant={true} />
                    </div>
                  </div>
                </div>
              ) : (
                <NoJobs />
              )}
            </div>
          </div>
          {showPopup && (
            <>
              <div
                onClick={() => setShowPopup(false)}
                className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"
              ></div>

              <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                <div className="w-full max-w-[250px] h-[330px] bg-white p-6 rounded-[4px] shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[16px] font-[600]">
                      Rate and Review Us
                    </h2>
                    <button
                      onClick={() => setShowPopup(false)}
                      aria-label="Close"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0028 10.886L7.29759 13.591C7.1769 13.7118 7.03058 13.7708 6.85864 13.768C6.68655 13.7654 6.54016 13.7037 6.41947 13.583C6.29877 13.4624 6.23843 13.3146 6.23843 13.1399C6.23843 12.9652 6.29877 12.8175 6.41947 12.6968L9.11655 9.99971L6.41155 7.31534C6.29072 7.19465 6.23169 7.04694 6.23447 6.87221C6.23711 6.69763 6.29877 6.54999 6.41947 6.4293C6.54016 6.30846 6.68787 6.24805 6.86259 6.24805C7.03732 6.24805 7.18502 6.30846 7.30572 6.4293L10.0028 9.1343L12.6872 6.4293C12.8079 6.30846 12.9542 6.24805 13.1261 6.24805C13.2982 6.24805 13.4446 6.30846 13.5653 6.4293C13.6946 6.55846 13.7593 6.70826 13.7593 6.87867C13.7593 7.04909 13.6946 7.19465 13.5653 7.31534L10.8682 9.99971L13.5732 12.7049C13.6941 12.8256 13.7545 12.9719 13.7545 13.1439C13.7545 13.316 13.6941 13.4624 13.5732 13.583C13.4441 13.7124 13.2943 13.777 13.1238 13.777C12.9534 13.777 12.8079 13.7124 12.6872 13.583L10.0028 10.886Z"
                          fill="#333"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="text-[12px] font-[500]">Rating</label>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill={
                            index < reviewData.rating ? "#FFD700" : "#D9D9D9"
                          }
                          onClick={() => handleRating(index)}
                          className="cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 0L14.85 8.25H24L16.65 13.5L19.5 21.75L12 16.5L4.5 21.75L7.35 13.5L0 8.25H9.15L12 0Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-[12px] font-[500]">
                      Give Us Review About Company
                    </label>
                    <textarea
                      className="w-full p-3 mt-1 text-[12px] font-[500] bg-[#F3F4F5] rounded-lg focus:outline-none placeholder:text-[10px] "
                      rows="4"
                      placeholder="Enter Review About Company"
                      value={reviewData.review}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="text-sm font-semibold py-2 px-6 text-white bg-[#06A9EF] rounded-full hover:bg-[#0597d3] transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {totalCount > 10 && (
        <CustomPagination
          setMiniloading={setMiniloading}
          miniLoading={miniLoading}
          setPage={setPage}
          title={"Jobs"}
          setLimit={setLimit}
          defaultLimit={10}
          totalPages={totalPages}
          limit={limit}
          page={page}
        />
      )}
    </div>
  );
}

export default Aboutcompanies;
