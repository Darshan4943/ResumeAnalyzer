import React from "react";
 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
 
const TopCompanies = () => {
  const jobData = [
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/jobs/new.png",
      ratingIcon: "/images/jobs/new2.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/jobs/new.png",
      ratingIcon: "/images/jobs/new2.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/jobs/new.png",
      ratingIcon: "/images/jobs/new2.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/jobs/new.png",
      ratingIcon: "/images/jobs/new2.png",
    },
    {
      companyName: "Aven",
      rating: 3.6,
      reviews: 786,
      icon: "/images/jobs/new.png",
      ratingIcon: "/images/jobs/new2.png",
    },
  ];
 
  return (
    <div className="bg-white rounded-[16px] p-6  gap-[20px] ">
      <div className="gap-[20px] flex flex-col">
        <div className="flex justify-between item-center w-[500px]">
          <div className="flex flex-col gap-[6px] w-[436px]">
            <div className="text-[16px] font-[600]">Top Companies Hiring</div>
            <div className="text-[14px] font-[500]">Find Your Dream Job</div>
          </div>
          <div className="text-[14px] font-[600] text-[#06A9EF]">View All</div>
        </div>
 
      
          <div >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3},
              }}
            className=" swiper-wrapper "
            >
              {jobData.map((job) => (
                <SwiperSlide key={job.id} >
                  <div className="w-[175px] h-[150px] border-[1px] border-[#CBCBCB] rounded-[10px] gap-[16px] ">
                    <div className="flex flex-col items-center pt-[16px] gap-[6px] pb-[6px]">
                      <div className="w-[40px] h-[32px]">
                        <div className="h-[9px] w-[30px]">
                          <img src={job.icon} alt={`${job.companyName} Icon`} />
                        </div>
                      </div>
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
 
