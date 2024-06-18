import React, { useState } from "react";
import CoverForm from "../../components/featured/candidate/coverLetter/coverForm";
import CoverPreview from "../../components/featured/candidate/coverLetter/coverPreview";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedCoverIndex, setSelectedCoverIndex] = useState();
  const [selectedColor, setSelectedColor] = useState();

  const { clientId } = router.query;
  const defaultState = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    dial_code: "",
    address: "",
    employerName: "",
    employerOrganizationName: "",
    employerAddress: "",
    employerCityState: "",
    employerCountry: "",
    jobTitle: "",
    organization: "",
    industry: "",
    designation: "",
    experience: "",
    location: "",
    roleResponsibilities: "",
    requiredSkills: [],
    projectName: "",
    description: "",
    achievements: "",
    responsibilities: "",
    relevantSkills: [],
    fresherJobTitle: "",
    sector: "",
    course: "",
    specialization: "",
    university: "",
    letterDate: "",
    passages: "",
  };

  const [data, setData] = useState(defaultState);

  return (
    <div className="flex scr800:flex-row flex-col gap-4 py-6 customMargins overflow-hidden relative">
      <div className="ml:w-[41%] scr1024:min-w-[508px]  md:w-[100%] xxsm:min-w-[300px] scr420:min-w-[400px] ">
        <CoverForm
          selectedCoverIndex={selectedCoverIndex}
          setSelectedCoverIndex={setSelectedCoverIndex}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          setSelectedFont={setSelectedFont}
          selectedFont={selectedFont}
          data={data}
          setData={setData}
        />
      </div>
      <div className=" ml:hidden w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
      <div className="ml:w-[59%] scr1024:min-w-[508px] min-w-[400px] md:w-[100%] xsm:min-w-[300px]:min-w-[400px]  xxsm:min-w-[300px] scr420:min-w-[400px]">
        <CoverPreview
          data={data}
          clientId={clientId}
          selectedCoverIndex={selectedCoverIndex}
        />
      </div>
    </div>
  );
}

export default Index;
