import React, { useState } from "react";
import { motion } from "framer-motion";
import ALink from "@/components/alink";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import PersonalDetails from "@/components/featured/candidate/registration/personal_details";
import EducationDetails from "@/components/featured/candidate/registration/education_details";
import ProfessionalDetails from "@/components/featured/candidate/registration/professional_details";
import Stepper from "@/components/featured/candidate/registration/stepper";
import CandidateAiPower from "@/components/featured/candidate/registration/candidate_ai_power";
import { SkillList } from "@/utils/data";
import { camelCase } from "@/utils/middleware";
import axios from "axios";
import { useDispatch } from "react-redux";
import { reCallUserData } from "../../Redux/actions/user";
function Candidate_register() {
  const [tabindex, setTabIndex] = useState(1);
  const router = useRouter();
  const [file, setfile] = useState();
  const [skills, setSkills] = useState([...SkillList]);
  const [certificate, setCertificate] = useState();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: null,
    email: "",
    password: "",
    dob: "",
    gender: "male",
    currentLocation: "",
    workStatus: "experianced",
    cv: "",
    education: "10th or below",
    stream: "",
    university: "",
    institute: "",
    dateOfComplition: "",
    courses: "",
    awards: "",
    workExperiance: "",
    companyName: "",
    jobTitle: "",
    jobLocation: "",
    dateOfJoining: "",
    keySkills: "",
    currentCTC: null,
    noticePeriod: "15 days or less",
    employmentStatus: "",
    summary: "",
    isCurrentlyWorking: true,
  });
  const [error, setError] = useState({
    firstName: {message:"Please Enter Valid First Name",view:null},
    lastName: null,
  });

  const register_cadidate = () => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("mobileNo", data.mobileNo);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("currentLocation", data.currentLocation);
    formData.append("workStatus", data.workStatus);
    formData.append("education", data.education);
    formData.append("stream", data.stream);
    formData.append("university", data.university);
    formData.append("institute", data.institute);
    formData.append("dateOfComplition", data.dateOfComplition);
    formData.append("courses", data.courses);
    formData.append("awards", data.awards);
    formData.append("workExperiance", JSON.stringify(data.workExperiance));
    formData.append("companyName", data.companyName);
    formData.append("jobTitle", data.jobTitle);
    formData.append("jobLocation", data.jobLocation);
    formData.append("dateOfJoining", data.dateOfJoining);
    formData.append("keySkills", JSON.stringify(data.keySkills));
    formData.append("currentCTC", data.currentCTC);
    formData.append("noticePeriod", data.noticePeriod);
    formData.append("employmentStatus", data.employmentStatus);
    formData.append("summary", data.summary);
    formData.append("resume", file);
    formData.append("certificate", certificate);
    formData.append("isCurrentlyWorking", data.isCurrentlyWorking);
    axios
      .post("https://freedygoservices.in/api/candidate/register", formData)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          localStorage.setItem("authToken", response.token);
          toast.success("Registration Complete");
          dispatch(reCallUserData());
          router.push("/candidate/afterLogin/home/candidateHome");
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className=" relative !important">
        <div className="register_head sticky ml:top-[0] top-[3.5rem] w-[100%] z-[900]  pb-4 bg-white">
          <div className="register_cadidate overflow-hidden">
            <div className="register_text_parent">
              <div className="register_heding">
                <p className="register_heding_text">Register as candidate</p>
                <p className="register_heding_desc">
                  Start your career with Skilotech
                </p>
              </div>
            </div>
          </div>
          {tabindex == 1 ? null : <Stepper tabindex={tabindex} data={data} />}
        </div>
        <CandidateAiPower
          setTabIndex={setTabIndex}
          tabindex={tabindex}
          setfile={setfile}
          file={file}
          setData={setData}
          data={data}
        />
        <PersonalDetails
          data={data}
          setData={setData}
          setTabIndex={setTabIndex}
          tabindex={tabindex}
          setfile={setfile}
          file={file}
          setError={setError}
          error={error}
        />
        <EducationDetails
          data={data}
          setData={setData}
          setTabIndex={setTabIndex}
          tabindex={tabindex}
        />
        <ProfessionalDetails
          data={data}
          setData={setData}
          setTabIndex={setTabIndex}
          tabindex={tabindex}
          skills={skills.map((item) => ({
            value: item,
            label: camelCase(item),
          }))}
          register_cadidate={register_cadidate}
          setCertificate={setCertificate}
          certificate={certificate}
        />
      </div>
    </>
  );
}

export default Candidate_register;
