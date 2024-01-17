import React from "react";
import { useRouter } from "next/router";
import ImageContainer from "@/components/common/image";
const Interview = () => {
  const router = useRouter();
  return (
    <div className="w-screen bg-[#FEFCF2] ">
      <div className="customMargins lg:h-[580px]  md:pb-3 ">
        {/* <div className="flex items-center">
          <div className="w-[576px] object-contain ">
            <ImageContainer
              src="/images/candidate/interview.png"
              alt=""
              className="w-[100%] "
            />
          </div>
          <div className="flex flex-col w-[552px] items-start gap-6 font-Montserrat leading-normal">
            <p className="text-5xl font-bold text-black ">
              Commonly asked interview questions
            </p>
            <p className="text-2xl font-medium text-black">
              Free access to commonly asked interview questions once you
              register.
            </p>
            <p className="text-1xl font-medium text-black">
              {" "}
              Get ready for an exciting journey of Interview Preparation! These
              questions will help you showcase your exceptional skills and
              create enthusiasm for the role. <br />
              <br />
               It's your time to shine!
            </p>
            <button
              onClick={() => {
                router.push("/auth/Sign_up/");
              }}
              className="flex px-10 py-4 justify-center font-medium text-white items-center rounded-[12px]  border-blue bg-blue shadow-md"
            >
              Register Now
            </button>
          </div>
        </div> */}
        <div className=" md:flex xxsm:flex xxsm:flex-col xxsm:items-center md:flex-row  ">
        <div className=" sm:flex sm:items-center sm:justify-center md:w-[951px] lg:w-[500px]">
            <ImageContainer
              src="/images/candidate/interview.png"
              alt=""
              className="w-[320px] lg:w-[480px] lg:h-[480px]  "
            />
          </div>
          <div className="flex pb-[16px] flex-col items-start justify-center gap-4 self-stretch  lg:h-[552px] lg:w-[552px]  ">
  <p className="text-[#333] font-Montserrat text-[24px] xsm:text-[28px] md:text-[30px] lg:text-[48px]  font-bold">Commonly asked interview questions</p>
  <p className="text-[#333] font-Montserrat text-[16px] xsm:text-[18px] ml:text-[26px] font-medium">Free access to commonly asked interview questions after registration.</p>
  <p className="text-[#333] font-Montserrat text-[12px] xsm:text-[14px] ml:text-[17px] font-medium">These questions can serve as a starting point for your interview preparation, be ready to showcase your qualifications, and demonstrate your enthusiasm for the role.</p>
  <button
              onClick={() => {
                router.push("/auth/Sign_up/");
              }}  
              className="flex px-4 ml:text-[18px] text-[14px] py-2 justify-center font-medium text-white items-center rounded-[12px]  border-blue bg-blue shadow-md"
            >
              Register Now
            </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Interview;
