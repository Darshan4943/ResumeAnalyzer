import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";
import axios from "axios";

const TopCompanies = () => {
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const topCompam = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://jamblix.com/api/getTopcompanies"
      );
      const data = response.data;

      if (Array.isArray(data)) {
        setCompany(data);
      } else {
        setCompany([]);
      }
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    topCompam();
  }, []);


  return (
    <div className={`bg-white rounded-[16px] p-3 sm:p-6 gap-[20px] ${company?.length === 0 ? "hidden" : ""
      }`}>
      <div className="gap-[20px] flex flex-col">
        <div className="flex justify-between item-center ">
          <div className="flex flex-col gap-[6px]">
            <div className="text-[16px] font-[600]">Top Companies Hiring</div>
            <div className="text-[14px] font-[500]">Find Your Dream Job</div>
          </div>
          <div
            onClick={() => router.push("/candidate/topCompanies")}
            className="text-[14px] font-[600] text-[#06A9EF] cursor-pointer"
          >
            View All
          </div>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className=" swiper-wrapper topCompaniesSlide "
          >
            <>
              {!loading && !error && company?.length > 0
                ? company.map((job) => (
                  <SwiperSlide key={job._id}>
                    <div className="w-full border-[1px] h-[136.6px] flex flex-col items-center justify-between py-1 border-[#CBCBCB] rounded-[10px] gap-[12px]">
                      <div className="flex flex-col items-center justify-between gap-2 pt-1 h-full">

                        <img
                          src={job.companyLogo}
                          className="  max-w-[76px]  max-h-[40px] object-cover"
                          alt={`${job.name} Icon`}
                        />


                        <div className="flex flex-col items-center">
                          <div className="sm:text-[16px] text-[12px] font-[600]">
                            {job.name.length > 12
                              ? job.name.slice(0, 12) + "..."
                              : job.name}
                          </div>

                          <div className="flex items-center xsm:flex-col scr420:flex-row gap-[5px]">
                            <div className="flex gap-[4px]">
                              <div className="w-[14px] h-[14px]">
                                <img
                                  src="/images/withoutLogin/Star.png"
                                  alt="Rating Icon"
                                />
                              </div>
                              <div className="text-[12px] font-[400]">
                                {job.averageRating}
                              </div>
                            </div>
                            <div className="border-[1px] border-[#C5C5C5]"></div>
                            <div className="text-[10px] scr420:text-[12px] font-[400]">
                              {job.totalReviews} Reviews
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/jobs/candidate/aboutcompanies?id=${job._id}&role=employer`)

                          }}
                          className="text-[#06A9EF] text-[14px] font-[600] flex justify-center cursor-pointer"
                        >
                          View Job
                        </div>
                      </div>

                    </div>
                  </SwiperSlide>
                ))
                : !loading && <p>No companies found.</p>}
            </>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
