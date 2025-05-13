import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";
import axios from "axios";
import MiniLoader from "../../../common/miniLoader";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../../Redux/slices/loadingSlice";

const TopCompanies = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setLoadingTrue())
  //   const timer = setTimeout(() => {
  //     dispatch(setLoadingFalse())
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [])

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
    <>
    
    <div
      className={`bg-white rounded-[16px] p-3 sm:p-6 gap-[20px] ${
        company?.length === 0 ? "hidden" : ""
      }`}
    >
       {/* {loading && (
          <div className="flex justify-center ite h-0 ">
           <div className="flex gap-4 flex-col w-full ml:max-w-[548px]">
            <div className='flex gap-4 '>
              <div className="skeleton-subtitle h-[40px] w-[176px]"></div>
              <div className="skeleton-subtitle h-[40px] w-[170px]"></div>
            </div>

            <div className="h-[169px] w-full  bg-white rounded-[12px] p-4 flex  justify-between items-center gap-1">
              <div className='flex flex-col gap-1 w-full justify-between'>
                <div className="skeleton-line h-[20px]  max-w-[80%]"></div>
                <div className="skeleton-line h-[40px] max-w-[70%]"></div>

                <div className="skeleton-image h-[40px] max-w-[140px] rounded-[30px]"></div>
              </div>
              <div className="skeleton-image h-[100px] w-[100px] mr-4 "></div>


            </div>
            <div className='  ml:flex hidden bg-white flex-col gap-4 p-6 rounded-[12px] mt-4 '>
              <div className='flex justify-between gap-4 w-full'>
                <div className="skeleton-line h-[20px] max-w-[50%]"></div>
                <div className="skeleton-line h-[20px] max-w-[20%]"></div>
              </div>
              <div className="skeleton-line h-[20px] max-w-[60%] mt-[-12px]"></div>
              <div className="flex gap-2  w-full  mt-[-8px]">
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="flex gap-2  w-full">
                    <div className="h-[169px] w-full  bg-white rounded-[12px]  flex flex-col gap-1">
                      <div className="skeleton-image h-[152px] w-[152px]  "></div>
                    </div>
                  </div>

                ))}
              </div>
              <div className="flex gap-4 justify-center w-full">
                {[1, 2].map((item, index) => (
                  <div key={index} className="flex gap-4  justify-center ">

                    <div className="skeleton-image h-[40px] w-[40px] rounded-full  "></div>

                  </div>

                ))}
              </div>
            </div>


          </div>
          </div>
        )} */}
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
                        <div className="flex flex-col items-center justify-between gap-2 pt-1 h-full ">
                          <img
                            src={job.companyLogo}
                            className="  max-w-[76px]  max-h-[40px] "
                            style={{ objectFit:"contain"}}
                            alt={`${job.name} Icon`}
                          />

                          <div className="flex flex-col items-center">
                            <div className="sm:text-[16px] text-[12px] font-[600]">
                              {job.name.length > 12
                                ? job.name.slice(0, 12) + "..."
                                : job.name}
                            </div>

                            <div className="flex items-center  gap-[5px]">
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
                              router.push(
                                `/jobs/candidate/aboutcompanies?id=${job._id}&role=employer`
                              );
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
    </>
  );
};

export default TopCompanies;
