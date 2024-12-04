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
        <div className='flex flex-col gap-[42px] '>
            <div className='flex flex-col gap-3'>
                <p className='text-[30px] font-[600] text-center leading-tight'>
                    Testimonials From Our Customers
                </p>
                <p className='text-[14px] font-[400] text-center leading-tight'>See how our users have landed their dream jobs with the help of our platform.</p>
            </div>

            <div className="relative overflow-hidden">
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
                    className="custom-swiper max-h-[280px] max-w-[1440px] "
                >
                    {categories.map((category, index) => (
                        <SwiperSlide
                            key={index}
                            className="swiper-slide-card "
                        >
                            <div className="flex flex-col gap-[26px] p-5 bg-[#F5FCFF] justify-center items-center">
                                <p className="text-[16px] font-[600] text-center">"{category.label}"</p>
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
    );
}

export default Testimonials;
