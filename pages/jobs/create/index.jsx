import React, { useEffect, useRef, useState } from "react";
import { LeftArow } from "../../../utils/svg";
import Rightform from "./right-form";
import Leftform from "./left-form";
import { useRouter } from "next/router";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";

const Index = () => {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [jobPost, setJobPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    companyName: "",
    jobTitle: "",
    location: [],
    aboutOrganization: "",
    description: "Enter Job Description here",
    salaryType: "",
    minSalary: 0,
    maxSalary: 0,
    requiredQualification: "",
    requiredSkills: "",
    deadLine: "",
    experiance: "",
    skills: [],
  });
  
  const getData = () => {
    setLoading(true);
    axios
      .get("https://freedygoservices.in/api/job/getById/" + id)
      .then((res) => {
        setLoading(false);
        const {
          companyName,
          jobTitle,
          location,
          description,
          salaryType,
          minSalary,
          maxSalary,
          requiredQualification,
          requiredSkills,
          deadLine,
          experiance,
          skills,
        } = res.data.data;
        setData({
          ...data,
          companyName,
          jobTitle,
          location,
          description,
          salaryType,
          minSalary,
          maxSalary,
          requiredQualification,
          requiredSkills,
          deadLine,
          experiance,
          skills,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      getData();
    } else {
      setLoading(false);
    }
  }, [id]);
  return (
    <div className="min-h-[90vh] pt-[16px] customMargins flex flex-col gap-[16px] post-job pb-[4rem]">
      {loading ? (
        <div className="w-full flex items-center justify-center h-[80vh]">
          <MiniLoader />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-[8px] ">
            <div className=" cursor-pointer" onClick={() => router.back()}>
              <LeftArow />
            </div>
            <div className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-[50%] min-w-[270px]">
              Job Listings
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between ">
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
              isEditable={id ? true : false}
              id={id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
