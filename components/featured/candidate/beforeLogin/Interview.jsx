import React from "react";
import { useRouter } from "next/router";
const Interview = () => {
  const router = useRouter();
  return (
    <div className="">
      <div className="customMargins">
        <div className="flex items-center">
          <div className="w-[576px] object-contain ">
            <img src="./images/candidate/interview.png" alt="" className="" />
          </div>
          <div className="flex flex-col w-[552px] items-start gap-6 font-Montserrat leading-normal">

            <p className="text-5xl font-bold text-black ">Commonly asked interview questions</p>
            <p className="text-2xl font-medium text-black">Free access to commonly asked interview questions after registration.</p>
            <p className="text-1xl font-medium text-black"> These questions can serve as a starting point for your interview preparation, be ready to showcase your qualifications, and demonstrate your enthusiasm for the role.</p>
            <button 
            onClick={() => {
              router.push("/Auth/Sign_up/");
            }}
             className="flex px-10 py-4 justify-center font-medium text-white items-center rounded-[12px]  border-blue bg-blue shadow-md">Register Now</button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Interview;
