import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import required modules
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/pagination"
function Testimonials() {

    const categories = [
        { label: "I was struggling to find a new job, but Skillotech helped me create a killer resume and land my dream job in just a few weeks.", img: "/images/withoutLogin/Frame1.png", name: "John Doe", designation: "Developer" },
        { label: "I was struggling to find a new job, but Skillotech helped me create a killer resume and land my dream job in just a few weeks.", img: "/images/withoutLogin/Frame2.png", name: "John Doe", designation: "Developer" },
        { label: "I was struggling to find a new job, but Skillotech helped me create a killer resume and land my dream job in just a few weeks.", img: "/images/withoutLogin/Frame2.png", name: "John Doe", designation: "Developer" },
        { label: "I was struggling to find a new job, but Skillotech helped me create a killer resume and land my dream job in just a few weeks.", img: "/images/withoutLogin/Frame4.png", name: "John Doe", designation: "Developer" },
        { label: "I was struggling to find a new job, but Skillotech helped me create a killer resume and land my dream job in just a few weeks.", img: "/images/withoutLogin/Frame2.png", name: "John Doe", designation: "Developer" },
    ];

    return (
        <div className='flex flex-col gap-[42px]  '>
            <div className='flex flex-col gap-3 customMargins'>
                <p className='scr460:text-[30px] text-[18px] font-[600] text-center leading-tight'>
                    Testimonials From Our Customers
                </p>
                <p className='scr460:text-[14px] text-[12px] font-[400] text-center leading-tight'>See how our users have landed their dream jobs with the help of our platform.</p>
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
                        <SwiperSlide
                            key={index}
                            className="swiper-slide-card "
                        >
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
                                        <p className="text-[8px] font-[400]">{category.designation}</p>
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
                            <SwiperSlide
                                key={index}
                           
                                className=" swiper-slide-card1"
                            >
                                <div  className="flex flex-col gap-[26px] p-5 bg-[#F5FCFF] justify-center items-center">
                                    <p className="ml:text-[16px] text-[14px] font-[600] text-center">{`"${category.label}"`}</p>
                                    <div className="flex flex-col gap-4 justify-center items-center">
                                        <img
                                            src={category.img}
                                            alt={`Frame-${index}`}
                                            className="max-h-[50px] max-w-[50px] rounded-[50px]"
                                        />
                                        <div className="flex flex-col gap-1 justify-center items-center">
                                            <p className="text-[10px] font-[500]">-{category.name}</p>
                                            <p className="text-[8px] font-[400]">{category.designation}</p>
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
