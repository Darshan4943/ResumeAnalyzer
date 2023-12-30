import React from "react";
import { Parallax } from "react-scroll-parallax";

function Employer_why_skilotech_sec2() {
  const arr = [
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_1st.png",
      title: "Post Jobs for Free",
      content:
        "Create job postings on Skilotech to find candidates both domestically and abroad. All you have to do to make an account is signup.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/mmmm.svg",
      title: "Broad Spectrum",
      content:
        "Find qualified workers in a variety of industries around the world who are looking for opportunities from hundreds of profiles on our site.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_3rd.png",
      title: "Rapid Hiring",
      content:
        "Hire individuals based on their skills and abilities, which are displayed through our skill tests, job qualification and strict standards!",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_4rt.png",
      title: "Hire based on skills",
      content:
        "By selecting individuals based on their talents and abilities, which are demonstrated through our skills tests.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_5th.png",
      title: "Top-NotchCandidates",
      content:
        "With the demands of busy businesses, our platform makes it simple to post jobs, and locate the ideal fit for your business.",
    },
    {
      img: "/images/employer/Employer_why_skilotech_2nd/Employer_why_skilotech_6th.png",
      title: "Simple To Use",
      content:
        "A simple job portal streamlines job searching with easy navigation, quick applications, and clear job listings.",
    },
  ];  
  const yPathSeter = (index) => {
    return index === 0 || index === 2 || index === 3 || index === 5
      ? 10
      : 8;
  };
  return (
    <div className="customMargins">
      <div className="grid grid-cols-3 gap-y-[10%] justify-center items-center mt-[5%] mb-[10%] w-[100%]">
        {arr.map((item,index) => (
          // <Parallax speed={yPathSeter(index)}>
            <div className="flex flex-col w-[234px] p-[8px] text-[14px] font-medium flex-shrink-0 items-center mx-auto my-0px rounded-lg border border-[#CDCDCD] bg-white transition-all duration-500 Employer_why_skilotech_sec2_cart">
              <div className="flex flex-col p-3 items-center gap-2 self-stretch rounded-md bg-[#d2e7f0] h-32 transition-all duration-500 Employer_why_skilotech_sec2_cart_1st">
                <img
                  src={item.img}
                  alt=""
                  className="h-[75px] w-[75px] Employer_why_skilotech_sec2_cart_1st_img"
                />
                <div className="text-black text-center font-montserrat text-base font-medium">
                  {item.title}
                </div>
              </div>
              <div className="h-full w-full">{item.content}</div>
            </div>
          // </Parallax>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Employer_why_skilotech_sec2;
