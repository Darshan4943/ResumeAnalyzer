import React, { useRef, useState } from "react";
import { LeftArow } from "../../../utils/svg";
import Rightform from "./right-form";
import Leftform from "./left-form";
import { useRouter } from "next/router";

const Index = () => {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter()
  const [data, setData] = useState({
    companyName: "",
    jobTitle: "",
    location: [],
    aboutOrganization: "",
    description: "",
    salaryType: "",
    minSalary: 0,
    maxSalary: 0,
    requiredQualification: "",
    requiredSkills: "",
    deadLine: "",
    experiance: "",
    skills: [],
  });
  return (
    <div className="min-h-[90vh] pt-[16px] customMargins flex flex-col gap-[16px] post-job pb-[4rem]">
      <div className="flex items-center gap-[8px] ">
        <div onClick={()=>router.back()}>
        <LeftArow />
        </div>
        <div className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-[50%]">
          Job Listings
        </div>
      </div>
      <div className="flex flex-row justify-between ">
        <Leftform
          setFile={setFile}
          file={file}
          setData={setData}
          data={data}
          setCroppedImage={setCroppedImage}
          croppedImage={croppedImage}
        />
        <Rightform
          setData={setData}
          data={data}
          file={file}
          croppedImage={croppedImage}
        />
      </div>
    </div>
  );
};

export default Index;
