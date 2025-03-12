import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import required modules
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/pagination";
function Testimonials() {
  const categories = [
    {
      label:
        "Skillotech helped me craft a professional resume that got me shortlisted for multiple companies. I landed my dream job in just a month!",
      //   img: "/images/withoutLogin/Frame1.png",
      img: "/images/withoutLogin/Frame4.png",

      name: "Amit Sharma",
      designation: "Software Developer",
    },
    {
      label:
        "I was struggling to switch careers, but Skillotech provided expert resume writing and interview tips. Now, I’m working in my desired field!",
      //   img: "/images/withoutLogin/Frame2.png",
      img: "/images/withoutLogin/Frame3.png",
      name: "Priya Iyer",
      designation: "Business Analyst",
    },
    {
      label:
        "The resume format and LinkedIn optimization tips from Skillotech were a game-changer. I secured a job at a top MNC within weeks!",
      img: "/images/withoutLogin/Frame4.png",
      name: "Rajesh Verma",
      designation: "Data Scientist",
    },
    {
      label:
        "Thanks to Skillotech, my resume stood out from the competition. I got hired for a senior role with a 50% salary hike!",

      img: "/images/withoutLogin/Frame3.png",
      name: "Neha Joshi",
      designation: "HR Manager",
    },
    {
      label:
        "I wasn’t getting interview calls despite having good experience. Skillotech revamped my resume, and within two weeks, I had multiple offers!",
      //   img: "/images/withoutLogin/Frame5.png",
      img: "/images/withoutLogin/Frame4.png",
      name: "Arjun Menon",
      designation: "UI/UX Designer",
    },
  ];

  return (
    <div className="flex flex-col gap-[42px]  ">
      <div className="flex flex-col gap-3 customMargins">
        <p className="scr460:text-[30px] text-[18px] font-[600] text-center leading-tight">
          What Our Happy Users Say
        </p>
        <p className="scr460:text-[14px] text-[12px] font-[400] text-center leading-tight">
          Discover how professionals like you secured their dream jobs with our
          AI-powered resume builder and career tools
        </p>
      </div>

      <div className="relative overflow-hidden ml:block hidden ">
        <Swiper
          slidesPerView={3}
          spaceBetween={15}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="custom-swiper scr1250:max-h-[280px] max-h-[320px]  max-w-[1440px] "
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="swiper-slide-card ">
              <div className="flex flex-col gap-[26px] p-5 bg-[#F5FCFF] justify-center items-center">
                <p className="ml:text-[16px] text-[14px] font-[600] text-center">{`"${category.label}"`}</p>
                <div className="flex flex-col gap-4 justify-center items-center">
                  <img
                    src={category.img}
                    alt={`Frame-${index}`}
                    className="max-h-[50px] max-w-[50px] rounded-[50px]"
                  />
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <p className="text-[10px] font-[500]">-{category.name}</p>
                    <p className="text-[8px] font-[400]">
                      {category.designation}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="  w-full flex justify-center px-4  ml:hidden">
        <div className="relative  flex justify-center scr470:w-[470px] scr420:w-[400px]  scr390:w-[360px] w-[320px] ">
          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            className=" custom-swiper scr1250:max-h-[280px] max-h-[280px] flex justify-center"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className=" swiper-slide-card1">
                <div className="flex flex-col gap-[26px] p-5 bg-[#F5FCFF] justify-center items-center">
                  <p className="ml:text-[16px] text-[14px] font-[600] text-center">{`"${category.label}"`}</p>
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <img
                      src={category.img}
                      alt={`Frame-${index}`}
                      className="max-h-[50px] max-w-[50px] rounded-[50px]"
                    />
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <p className="text-[10px] font-[500]">-{category.name}</p>
                      <p className="text-[8px] font-[400]">
                        {category.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
