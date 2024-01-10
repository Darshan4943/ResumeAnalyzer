import React from "react";
import { useRouter } from "next/router";
import ImageContainer from "@/components/common/image";
const Interview = () => {
  const router = useRouter();
  return (
    <div className="w-screen">
      <div className="customMargins">
        <div className="flex items-center">
          <div className="w-[576px] object-contain ">
            <ImageContainer
              src="/images/candidate/interview.png"
              alt=""
              className="w-[100%]"
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
        </div>
      </div>
    </div>
  );
};

export default Interview;
