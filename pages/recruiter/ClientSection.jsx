import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ClientSection() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);
  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      router.push("/myClients");
    } else {
      router.push("/auth?signin=true&role=recruiter")
    }
  };

  return (
    <div className="flex ml:flex-row flex-col ml:gap-[80px] gap-4 w-[100%] items-center  ml:pb-12 pb-6 ">
      
        <img
          className="ml:h-[45vw] ml:w-[45vw] h-[75vw] w-[75vw]  object-contain "
          src="/images/recruiter/ResumeSection.png"
          alt=""
        />
   
      <div className="flex flex-col ml:gap-6 gap-4 ml:w-[40%] w-[95%] ml:items-start items-center">
        <div className="flex flex-col gap-2 ml:text-start text-center">
          <p className="ml:text-[3vw] text-[28px] font-bold leading-tight">
            With <span className="text-[#06A9EF]">My Collection,</span> <br/>Resume
            Management Made easy
          </p>
        </div>
        <div className="ml:text-[1.2vw] text-[14px] font-medium ml:text-start text-center ">
        My Collection is your <span className="text-[#06A9EF]">personal space on Skilotech where you can save and organize potential candidates.</span> As you review resumes and interview candidates, simply add them to your collection for easy access later.<span className="text-[#06A9EF]">You can create custom folders to categorize candidates</span>  by role, industry, or other criteria, making it easier to find the perfect fit for your team. <span className="text-[#06A9EF]">With My Collection, you can streamline your hiring process</span> and always have a pool of qualified candidates at your fingertips.
        </div>
        <button
          onClick={clickHandler}
          className="bg-[#06A9EF] btn_hover_effect text-white flex gap-2  px-6  ml:py-3 py-2 ml:w-[174px] ml:rounded-[12px] rounded-[8px] justify-center items-center"
        >
          <p className="ml:text-[16px] text-[14px] font-semibold">Get Started</p>
        </button>
      </div>
    </div>
  );
}

export default ClientSection;
