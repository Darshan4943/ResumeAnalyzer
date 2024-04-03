import React, { useRef, useState } from "react";
import { LeftArow } from "../../../utils/svg";
import Rightform from "./right-form";
import Leftform from "./left-form";

const Index = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    companyName: null,
    jobTitle: null,
    location: [],
    "about-organization": "",
    description: "",
    salaryType: "",
    minSalary: 0,
    maxSalary: 0,
    requiredQualification: "",
    requiredSkills: "",
    deadLine: null,
    experiance: null,
  });

  return (
    <div className="min-h-[90vh] pt-[16px] customMargins flex flex-col gap-[16px] post-job pb-[4rem]">
      <div className="flex items-center gap-[8px] ">
        <LeftArow />
        <div className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-[50%]">
          Job Listings
        </div>
      </div>
      <div className="flex flex-row justify-between ">
        <Leftform setFile={setFile} file={file} setData={setData} data={data} />
        <Rightform setData={setData} data={data} />
      </div>
    </div>
  );
};

export default Index;
