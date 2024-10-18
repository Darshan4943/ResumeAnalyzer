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

  const [formError, setFormError] = useState({});

  const [data, setData] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    workFrom: "",
    location: [],
    country: [],
    aboutOrganization: "",
    description: "",
    salaryType: "",
    minSalary: 0,
    maxSalary: 0,
    currency: "",
    requiredQualification: "",
    requiredSkills: "",
    deadLine: "",
    experience: "",
    revalentExp: "",
    mustSkills: [],
    goodSkills: [],
    status:"Live"
  });

  const getData = () => {
    setLoading(true);
    axios
      .get("https://api.shindedarshan.com/api/job/getByJobId/" + id)
      .then((res) => {
        setLoading(false);
        const formattedDeadLine = res.data.deadLine
          ? new Date(res.data.deadLine).toISOString().split("T")[0]
          : "";
     
        const {
          companyName,
          jobTitle,
          jobType,
          jobMode,
          location,
          country,
          description,
          salaryType,
          minSalary,
          maxSalary,
          requiredQualification,
          requiredSkills,
          // deadLine,
          experience,
          mustSkills,
          goodSkills,
          currency,
          revalentExp,
          status
        } = res.data;
        setData({
          ...data,
          companyName,
          jobTitle,
          jobType,
          workFrom: jobMode,
          country,
          location,
          description,
          salaryType,
          minSalary,
          maxSalary,
          requiredQualification,
          requiredSkills,
          deadLine :formattedDeadLine,
          experience,
          mustSkills,
          goodSkills,
          currency,
          revalentExp,
          status
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

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "companyName":
        if (!value.trim()) {
          errors.companyName = "Company Name is required";
        } else if (!isNaN(value)) {
          errors.companyName = "Company Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.companyName = "Company Name cannot contain numbers";
        } else {
          delete errors.companyName;
        }
        break;

      case "jobTitle":
        if (!value || value.length === 0) {
          errors.jobTitle = "Job Title is required";
        } else {
          delete errors.jobTitle;
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };

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
              Post a Job
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
              validateInput={validateInput}
              formError={formError}
              setFormError={setFormError}
            />
            <Rightform
              setData={setData}
              data={data}
              file={file}
              croppedImage={croppedImage}
              isEditable={id ? true : false}
              id={id}
              validateInput={validateInput}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
