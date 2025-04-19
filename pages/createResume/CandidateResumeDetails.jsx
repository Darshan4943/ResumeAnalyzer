import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { SkillList, telCode } from "../../utils/data";
import { camelCase } from "../../utils/middleware";
import Stepper from "../../components/featured/candidate/registration/stepper";
import CandidateAiPower from "../../components/featured/candidate/registration/candidate_ai_power";
import PersonalDetails from "../../components/featured/candidate/registration/personal_details";
import EducationDetails from "../../components/featured/candidate/registration/education_details";
import ProfessionalDetails from "../../components/featured/candidate/registration/professional_details";


function CandidateResumeDetails() {
  const router = useRouter();
  const clientId = router.query.clientId;
  const [tabindex, setTabIndex] = useState(2);
  const [selectedItem, setSelectedItem] = useState();
  const { isResume } = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (isResume) {
      console.log("object");
      setTabIndex(1);
    }
  }, [isResume]);

  const [file, setfile] = useState();
  const [skills, setSkills] = useState([...SkillList]);
  const [certificate, setCertificate] = useState();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile.profileData);

  const [data, setData] = useState({
    firstName: profileData?.basics?.firstName || "",
    lastName: profileData?.basics?.lastName || "",
    dial_code:profileData?.basics?.dial_code|| "",
    mobileNo: profileData?.basics?.mobileNo || "",
    email: profileData?.basics?.email || "",
    dob: profileData?.basics?.dob || "",
    gender: profileData?.basics?.gender || "male",
    country:profileData?.basics?.country || "",
    currentLocation: profileData?.basics?.currentLocation || "",
    stream: profileData?.education?.[0]?.stream || "",
    university: profileData?.education?.[0]?.university || "",
    institute: profileData?.education?.[0]?.institute || "",
    educationDuration: profileData?.education?.[0]?.duration || "",
    workStatus: "Experienced",
    workExperiance: profileData?.totalExperience?.years || 0,
    companyName: profileData?.workExperiance?.[0]?.companyName || "",
    jobTitle: profileData?.workExperiance?.[0]?.jobTitle || "",
    jobLocation: profileData?.workExperiance?.[0]?.jobLocation || "",
    jobDuration: profileData?.workExperiance?.[0]?.jobDuration || "",
    keySkills: profileData?.skills || [],
    currentCTC: profileData?.workExperiance?.[0]?.currentCTC || "",
    noticePeriod: profileData?.workExperiance?.[0]?.noticePeriod || "15 days or less",
    employmentStatus: "employed",
    clientId: clientId,
  });

  useEffect(() => {

    const selectedItem = telCode.find((item) => item.dial_code === profileData?.basics?.dial_code);

    if (selectedItem) {
      setSelectedItem(selectedItem);
    }

  }, []);
  const [error, setError] = useState({
    firstName: { message: "Please Enter Valid First Name", view: null },
    lastName: null,
  });

  return (
    <>
      <div className=" relative !important ">
      
        <div className="register_head  w-[100%] z-50   gap-12">
          {/* {tabindex !== 1 && */}
          {userDataGlobal?.role === "user" &&
          <div className="register_cadidate py-3 px-2 overflow-hidden sticky  top-[70px] ">
            <div className="register_text_parent">
              <div className="register_heding text-center">
                <p className="ml:text-[30px] scr420:text-[24px] text-[20px] font-semibold text-white">
                  Enter Details to Build your Professional Resume
                </p>
                <p className="register_heding_desc">
                  Create your Resume with Skilotech
                </p>
              </div>
            </div>
          </div>
        }
          {/* } */}
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
          isResume={isResume}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
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
          clientId={clientId}
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

export default CandidateResumeDetails;
