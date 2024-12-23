import { useMediaQuery } from "@react-hook/media-query";
import React from "react";
import { Parallax } from "react-scroll-parallax";

function Employer_why_skilotech_sec2() {
  const isViewportBelow400 = useMediaQuery("(max-width:400px)");
  const arr = [
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_3rd.svg",
      title: "Post Jobs for Free",
      content:
        "Create job postings on Skilotech to find candidates both domestically and abroad. All you have to do to make an account is signup.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_2nd.svg",
      title: "Broad Spectrum",
      content:
        "Find qualified workers in a variety of industries around the world who are looking for opportunities from hundreds of profiles on our site.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_1st.svg",
      title: "Rapid Hiring",
      content:
        "Hire individuals based on their skills and abilities, which are displayed through our skill tests, job qualification and strict standards!",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_4rt.svg",
      title: "Hire based on skills",
      content:
        "By selecting individuals based on their talents and abilities, which are demonstrated through our skills tests.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_5th.svg",
      title: "Top-Notch Candidates",
      content:
        "With the demands of busy businesses, our platform makes it simple to post jobs, and locate the ideal fit for your business.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_6th.svg",
      title: "Simple To Use",
      content:
        "A simple job portal streamlines job searching with easy navigation, quick applications, and clear job listings.",
    },
  ];
  const yPathSeter = (index) => {
    return index === 0 || index === 2 || index === 3 || index === 5 ? 10 : 8;
  };
  return (
    <div className="customMargins  flex items-center justify-center">
      <div className=  " flex  gap-8 justify-center items-center m-[2rem] flex-wrap lg:w-[936px]  ">
        {arr.map((item, index) => (
          // <Parallax speed={yPathSeter(index)}>
          <div className="employer_card flex flex-col w-[168px] ml:w-[234px] h-[222px] ml:h-[272px] text-[14px] font-medium flex-shrink-0 items-center mx-auto my-0px rounded-lg border border-[#CDCDCD] bg-white transition-all duration-500 Employer_why_skilotech_sec2_cart">
            <div className="flex h-[122px] flex-col p-[0.6rem] items-center gap-2 self-stretch rounded-md bg-[#d2e7f0]  w-full transition-all duration-500 Employer_why_skilotech_sec2_cart_1st">
              <div className="employer_card_svg bg-[#fff] flex items-center justify-center h-[68px] w-[80px] p-[8px] ">
                <img
                  src={item.img}
                  alt=""
                  className="h-[44px] ml:h-[48px] w-[52px] ml:w-[48px] Employer_why_skilotech_sec2_cart_1st_img"
                />
              </div>
              <div className="text-black text-center font-montserrat text-[13px] ml:text-base font-medium">
                {item.title}
              </div>
            </div>
            <div className="h-full w-full text-[11px] ml:text-[14px]">
              {item.content}
            </div>
          </div>
          // </Parallax>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Employer_why_skilotech_sec2;
