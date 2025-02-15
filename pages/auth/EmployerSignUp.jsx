import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminDetails from "./adminDetails";
import CompanyDetails from "./CompanyDetails";
import DocumentDetails from "./DocumentDetails";
const EmployerSignUp = () => {
    const router = useRouter();
    const [tog, setTog] = useState(3);
    const [visiblePass, setVisiblePass] = useState(false);
    const [formData, setFormData] = useState({});
    const [fileData, setFileData] = useState({
        certificate: null,
        panFile: null,
        companyLogo: null,
    });
    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompleted1, setIsCompleted1] = useState(false);


    function updateTog(id) {
        setTog(id);
    }




    return (
        <div className="w-full relative flex items-center flex-col gap-[18px] pb-[62px]">
            <div className="sticky z-[100] w-full top-[47px] bg-[#F3F4F5] pt-[10px] md:pt-[24px]">
                <div className="w-full bg-[#FFDA1D] flex items-center flex-col gap-2 py-[6px] ">
                    <span className="text-[24px] md:text-[30px] font-[600] text-[#333333]">Register as Employer</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333]">Start your Search with Skilotech</span>
                </div>
            </div>
            <div className="flex w-full items-center flex-col gap-1 pb-[18px]">
                <div className="flex w-full px-[44px] justify-center items-center">
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        <circle cx="12" cy="12" r="8" fill="#FFDA1D" />
                    </svg>
                    <div className="relative h-[2px] w-full md:w-[312px]">
                        <div className=" w-full h-full bg-[#C7C7C7] "></div>
                        <div style={{ width: `${progress}%`, transition: "width 2s ease-in-out" }} className="absolute top-0 h-full bg-[#FFDA1D] "></div>
                    </div>
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        {isCompleted && <circle cx="12" cy="12" r="8" fill="#FFDA1D" />}
                    </svg>
                    <div className="relative h-[2px] w-full md:w-[312px]">
                        <div className=" w-full h-full bg-[#C7C7C7] "></div>
                        <div style={{ width: `${progress1}%`, transition: "width 2s ease-in-out" }} className="absolute top-0 h-full bg-[#FFDA1D] "></div>
                    </div>
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        {isCompleted1 && <circle cx="12" cy="12" r="8" fill="#FFDA1D" />}
                    </svg>
                </div>
                <div className="flex w-full items-center justify-between md:justify-center  md:gap-[188px] px-1">
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Company Details</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Admin Details</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Upload Documents</span>
                </div>
            </div>



            <CompanyDetails formData={formData} setFormData={setFormData} tog={tog} setProgress={setProgress} setIsCompleted={setIsCompleted} updateTog={updateTog} setIsCompleted1={setIsCompleted1} setProgress1={setProgress1} />


            <AdminDetails formData={formData} setFormData={setFormData} tog={tog} setProgress={setProgress} setIsCompleted={setIsCompleted} updateTog={updateTog} setIsCompleted1={setIsCompleted1} setProgress1={setProgress1} />
            <DocumentDetails setFileData={setFileData} fileData={fileData} formData={formData} setFormData={setFormData} tog={tog} setProgress={setProgress} setIsCompleted={setIsCompleted} updateTog={updateTog} setIsCompleted1={setIsCompleted1} setProgress1={setProgress1} />

            <div className="text-[14px] font-[500] text-[#646464]">Already have an account? <span onClick={() => router.push("/auth/Sign_in?role=employer")} className="text-[#06A9EF] cursor-pointer">Sign In</span></div>
        </div >
    );
};

export default EmployerSignUp;