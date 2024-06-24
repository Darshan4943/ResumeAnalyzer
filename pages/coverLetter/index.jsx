import React, { useEffect, useState } from "react";
import CoverForm from "../../components/featured/candidate/coverLetter/coverForm";
import CoverPreview from "../../components/featured/candidate/coverLetter/coverPreview";
import { useRouter } from "next/router";
import axios from "axios";

function Index() {
  const router = useRouter();
  const { EditData, isCoverEdit } = router.query;
 
  // const userDataGlobal = useSelector((state) => state.userData);
  const [selectedFont, setSelectedFont] = useState("Roboto");
  const [selectedCoverIndex, setSelectedCoverIndex] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isFormat, setIsFormat] = useState("standard");
  const [contentSituation, setContentSituation] = useState("Experienced");

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
    type: "",
  };

  const [data, setData] = useState(defaultState);
  // useEffect(() => {
  //   console.log("id", id);
  //   if (id) {
  //     axios
  //       .get(`https://jamblix.com/api/cover/getById/${id}`)
  //       .then((res) => {
  //         setResumeList(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   }
  // }, [isCoverEdit, id]);
  useEffect(() => {
    if (EditData) {
      const parsedData = JSON.parse(EditData);
      let parsedPassages = [];

      if (parsedData.passages && parsedData.passages.length > 0) {
        try {
          const passagesArray = JSON.parse(parsedData.passages[0]);
          parsedPassages = passagesArray.map((passage) => passage.split(',"'));
        } catch (error) {
          console.error("Error parsing passages:", error);
        }
      }
      setData({
        ...parsedData,
        passages: parsedPassages,
      });

      if (isCoverEdit) {
        setIsFormat(parsedData?.type);
        setContentSituation(parsedData?.contentType);
      }
    }
  }, [EditData, isCoverEdit]);

  useEffect(() => {
    if (isFormat && !isCoverEdit) {
      setData((prevData) => ({
        ...prevData,
        type: isFormat,
      }));
    }
  }, [isFormat, isCoverEdit]);

  useEffect(() => {
    if (contentSituation && !isCoverEdit) {
      setData((prevData) => ({
        ...prevData,
        contentType: contentSituation,
      }));
    }
  }, [contentSituation, isCoverEdit]);

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
          isCoverEdit={isCoverEdit}
          isFormat={isFormat}
          setIsFormat={setIsFormat}
          contentSituation={contentSituation}
          setContentSituation={setContentSituation}
        />
      </div>
      <div className=" ml:hidden w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
      <div className="ml:w-[59%] scr1024:min-w-[508px] min-w-[400px] md:w-[100%] xsm:min-w-[300px]:min-w-[400px]  xxsm:min-w-[300px] scr420:min-w-[400px]">
        <CoverPreview
          data={data}
          clientId={clientId}
          selectedCoverIndex={selectedCoverIndex}
          isCoverEdit={isCoverEdit}
        />
      </div>
    </div>
  );
}

export default Index;
