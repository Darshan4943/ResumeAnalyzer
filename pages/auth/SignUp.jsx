import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminDetails from "./adminDetails";
import CompanyDetails from "./CompanyDetails";
import DocumentDetails from "./DocumentDetails";
const SignUp = () => {
  const router = useRouter();
  const { role } = router.query;
  const [tog, setTog] = useState(1);
  const [visiblePass, setVisiblePass] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({
    certificate: null,
    idProof: null,
    companyLogo: null,
  });

  const [progress, setProgress] = useState(0);
  const [progress1, setProgress1] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleted1, setIsCompleted1] = useState(false);
  const [recOptions, setRecOptions] = useState("firm")

  function updateTog(id) {
    setTog(id);
  }
  const selectRecruiterFirm = () => {
    setRecOptions("firm");
    setTog(1)
  }
  const selectRecruiterIndividual = () => {
   
    setRecOptions("individual");
    setTog(2)
    // setIsCompleted(true)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="w-full relative flex items-center flex-col gap-[18px] pb-[62px]">
      <div className="sticky z-[100] w-full top-[37px] bg-[#F3F4F5] pt-[10px] md:pt-[24px]">
        {role === "recruiter" ?
          <div className="w-full bg-blue flex items-center flex-col gap-2 py-[6px] ">
            <span className="text-[24px] md:text-[30px] font-[600] text-white">
              Register as Recruiter
            </span>
            <span className="text-[12px] md:text-[16px] font-[500] text-white">
              Start Recruiting with Skilotech
            </span>
          </div>
          :
          <div className="w-full bg-[#FFDA1D] flex items-center flex-col gap-2 py-[6px] ">
            <span className="text-[24px] md:text-[30px] font-[600] text-[#333333]">
              Register as Employer
            </span>
            <span className="text-[12px] md:text-[16px] font-[500] text-[#333333]">
              Start your Search with Skilotech
            </span>
          </div>
        }
      </div>
      {(role==="employer" || recOptions==="firm")&&
      <div className="flex w-full items-center flex-col gap-1 pb-[18px]">
        <div className="flex w-full px-[44px] justify-center items-center">
          <svg
            className="min-w-[16px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11.5"
              fill="transparent"
              stroke="#C7C7C7"
            />
            <circle cx="12" cy="12" r="8" fill={role === "recruiter" ? "#06A9EF" : "#FFDA1D"} />
          </svg>
          <div className="relative h-[2px] w-full md:w-[312px]">
            <div className=" w-full h-full bg-[#C7C7C7] "></div>
            <div
              style={{
                width: `${progress}%`,
                transition: "width 2s ease-in-out",
              }}
              className={`absolute top-0 h-full ${role === "recruiter" ? "bg-blue" : "bg-[#FFDA1D]"} `}
            ></div>
          </div>
          <svg
            className="min-w-[16px]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11.5"
              fill="transparent"
              stroke="#C7C7C7"
            />
            {isCompleted && <circle cx="12" cy="12" r="8" fill={role === "recruiter" ? "#06A9EF" : "#FFDA1D"} />}
          </svg>
          
        </div>
        <div className="flex w-full items-center justify-between md:justify-center  md:gap-[188px] px-1">
          <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">
            Company Details
          </span>
          <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">
            Admin Details
          </span>
         
        </div>
      </div>
      }
      <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className={`p-6 flex flex-col gap-4 bg-white w-[95%] lg:w-[75%] scr1024:w-[65%] scr1400:w-[45%]  rounded-[8px] md:rounded-[16px] ${(role==="recruiter" && recOptions==="individual") && "mt-6"}`}>
        {role === "recruiter" && tog !== 3 &&
          <div className="flex flex-col gap-2">
            <p className="text-[16px] font-medium  ">  Employment Status</p>
            <div className="flex gap-4">
              <button onClick={selectRecruiterFirm} style={{ boxShadow: "0px 1px 3px 1px #00000026", boxShadow: "0px 1px 2px 0px #0000004D" }} className={`rounded-[30px] px-4 h-[32px] w-[137px] ${recOptions === "firm" ? "bg-blue text-white font-[500] hover:bg-[#0275A7]" : "bg-white text-[#333333] hover:bg-[#0275A7] hover:text-white text-[500]"} text-[14px]  `}>
                Recruiter Firm
              </button>
              <button onClick={selectRecruiterIndividual} style={{ boxShadow: "0px 1px 3px 1px #00000026", boxShadow: "0px 1px 2px 0px #0000004D" }} className={`rounded-[30px] px-4 h-[32px] w-[180px] ${recOptions === "individual" ? "bg-blue text-white font-[500] hover:bg-[#0275A7]" : "bg-white text-[#333333] hover:bg-[#0275A7] hover:text-white text-[500]"} text-[14px] `}>
                Individual Recruiter
              </button>

            </div>
          </div>
        }


        {tog === 1 &&
          <CompanyDetails
            formData={formData}
            setFormData={setFormData}
            tog={tog}
            fileData={fileData}
            setProgress={setProgress}
            setIsCompleted={setIsCompleted}
            updateTog={updateTog}
            setIsCompleted1={setIsCompleted1}
            setProgress1={setProgress1}
          />
        }
        {tog === 2 &&
          <AdminDetails
            formData={formData}
            setFormData={setFormData}
            tog={tog}
            setProgress={setProgress}
            setIsCompleted={setIsCompleted}
            updateTog={updateTog}
            setIsCompleted1={setIsCompleted1}
            setProgress1={setProgress1}
            role={role}
            recOptions={recOptions}
          />
        }
        {tog === 3 &&
          <DocumentDetails
            setFileData={setFileData}
            fileData={fileData}
            formData={formData}
            setFormData={setFormData}
            tog={tog}
            setProgress={setProgress}
            setIsCompleted={setIsCompleted}
            updateTog={updateTog}
            setIsCompleted1={setIsCompleted1}
            setProgress1={setProgress1}
            role={role}
          />
        }

      </div>




      <div className="text-[14px] font-[500] text-[#646464]">
        Already have an account?{" "}
        <span
          onClick={() => router.push(role === "recruiter" ? "/auth/Sign_in?role=recruiter " : "/auth/Sign_in?role=employer")}
          className="text-[#06A9EF] cursor-pointer"
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default SignUp;
