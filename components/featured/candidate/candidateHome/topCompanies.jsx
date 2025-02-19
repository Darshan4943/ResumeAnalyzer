import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/router";

const TopCompanies = () => {
  const router = useRouter()
  const jobData = [
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/withoutLogin/trusted3.png",
      ratingIcon: "/images/withoutLogin/Star.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/withoutLogin/trusted3.png",
      ratingIcon: "/images/withoutLogin/Star.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/withoutLogin/trusted3.png",
      ratingIcon: "/images/withoutLogin/Star.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/withoutLogin/trusted3.png",
      ratingIcon: "/images/withoutLogin/Star.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/withoutLogin/trusted3.png",
      ratingIcon: "/images/withoutLogin/Star.png",
    },
  ];

  return (
    <div className="bg-white rounded-[16px] p-3 sm:p-6  gap-[20px] ">
      <div className="gap-[20px] flex flex-col">
        <div className="flex justify-between item-center ">
          <div className="flex flex-col gap-[6px]">
            <div className="text-[16px] font-[600]">Top Companies Hiring</div>
            <div className="text-[14px] font-[500]">Find Your Dream Job</div>
          </div>
          <div onClick={() => router.push("/candidate/topCompanies")} className="text-[14px] font-[600] text-[#06A9EF] cursor-pointer">View All</div>
        </div>
        <div >
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
            {jobData.map((job) => (
              <SwiperSlide key={job.id} >
                <div className="w-full border-[1px] flex flex-col items-center justify-between py-1 border-[#CBCBCB] rounded-[10px] gap-[12px]">
                  <div className="flex flex-col items-center gap-4">
                    <img src={job.icon} className="h-[32px] max-w-[60px]" alt={`${job.companyName} Icon`} />
                    <div className="flex flex-col items-center">
                      <div className="text-[16px] font-[600]">
                        {job.companyName}
                      </div>
                      <div className="flex gap-[5px]">
                        <div className="flex gap-[4px]">
                          <div className="w-[14px] h-[14px]">
                            <img src={job.ratingIcon} alt="Rating Icon" />
                          </div>
                          <div className="text-[12px] font-[400]">
                            {job.rating}
                          </div>
                        </div>
                        <div className="border-[1px] border-[#C5C5C5]"></div>
                        <div className="text-[12px] font-[400]">
                          {job.reviews} Reviews
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[#06A9EF] text-[14px] font-[600] flex justify-center">
                    View Job
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;

