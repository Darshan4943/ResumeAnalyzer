import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import EducationDetails from "../../components/featured/candidate/registration/education_details";
import ProfessionalDetails from "../../components/featured/candidate/registration/professional_details";
import { reCallUserData } from "../../Redux/actions/user";
import { SkillList } from "../../utils/data";
import { camelCase } from "../../utils/middleware";
import PersonalDetails from "../../components/featured/candidate/registration/personal_details";
import CandidateAiPower from "../../components/featured/candidate/registration/candidate_ai_power";
import Stepper from "../../components/featured/candidate/registration/stepper";
function Candidate_register() {
  const [tabindex, setTabIndex] = useState(1);
  const router = useRouter();
  const { isResume } = router.query;
  useEffect(() => {
    if (isResume) {
      setTabIndex(2);
    }
  }, [isResume]);
  const [file, setfile] = useState();
  const [skills, setSkills] = useState([...SkillList]);
  const [certificate, setCertificate] = useState();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    dob: "",
    gender: "male",
    currentLocation: "",
    stream: "",
    university: "",
    institute: "",
    dateOfComplition: "",
    workExperiance: "",
    companyName: "",
    jobTitle: "",
    jobLocation: "",
    dateOfJoining: "",
    keySkills: "",
    currentCTC: "",
    noticePeriod: "15 days or less",
    employmentStatus: "employed",
  });

  console.log(148, data);

  const [error, setError] = useState({
    firstName: { message: "Please Enter Valid First Name", view: null },
    lastName: null,
  });

  return (
    <>
      <div className=" relative !important">
        <div className="register_head sticky ml:top-[90px] top-[3.5rem] w-[100%] z-50 pb-4 bg-white">
          <div className="register_cadidate overflow-hidden">
            <div className="register_text_parent">
              <div className="register_heding">
                <p className="text-[30px] font-semibold text-white">
                  Enter Details to Build your Professional Resume
                </p>
                <p className="register_heding_desc">
                  Create your Resume with Skilotech
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
          // register_cadidate={register_cadidate}
          // setCertificate={setCertificate}
          // certificate={certificate}
        />
      </div>
    </>
  );
}

export default Candidate_register;
