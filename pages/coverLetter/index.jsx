import React, { useEffect, useState } from "react";
import CoverForm from "../../components/featured/candidate/coverLetter/coverForm";
import CoverPreview from "../../components/featured/candidate/coverLetter/coverPreview";
import { useRouter } from "next/router";


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

  const prefilledState = {
    firstName: "prathmeshKumar",
    lastName: "williamsRutherford",
    mobileNumber: "+1234567890",
    email: "prathamaeshkumarjadhav@gmail.com",
    dial_code: "+1",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    employerName: "Tech Solutions Inc.",
    employerOrganizationName: "Tech Solutions",
    employerAddress: "456 Elm St, San Francisco, CA 94101",
    employerCityState: "San Francisco, CA",
    employerCountry: "USA",
    jobTitle: "Senior Software Engineer",
    organization: "Development Team",
    industry: "Technology",
    designation: "Lead Developer",
    experience: "5 years",
    location: "Remote",
    roleResponsibilities:
      "Leading the development team, designing software solutions, and ensuring project delivery on time.",
    requiredSkills: ["JavaScript", "React", "Node.js", "AWS"],
    projectName: "Website Redesign",
    description:
      "Led a team of developers to redesign the company's main website, improving performance and user experience.",
    achievements:
      "Increased website speed by 40%, improved user engagement by 30%, and reduced bounce rate by 25%.",
    responsibilities:
      "Code review, project management, client meetings, and mentoring junior developers.",
    relevantSkills: [
      "Team Leadership",
      "Project Management",
      "Client Communication",
    ],
    fresherJobTitle: "Junior Developer",
    sector: "Software Development",
    course: "Bachelor of Science in Computer Science",
    specialization: "Web Development",
    university: "University of California, Berkeley",
    letterDate: "June 27, 2024",
    passages: "",
    type: "Cover Letter",
  };

  const [data, setData] = useState(defaultState);
  // useEffect(() => {
  //   console.log("id", id);
  //   if (id) {
  //     axios
  //       .get(`http://localhost:2000/api/cover/getById/${id}`)
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
          let passagesArray = JSON.parse(parsedData.passages[0]);
          // console.log("parsed", passagesArray);
          // parsedPassages = passagesArray.map((passage) => passage.split(',"'));
          // console.log("parsedPassages", parsedPassages);
          if (passagesArray) {
            setData({
              ...parsedData,
              passages: passagesArray,
            });
          }
        } catch (error) {
          console.error("Error parsing passages:", error);
        }
      }

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
      <div className="ml:w-[41%] scr1024:min-w-[486px]  md:w-[100%] xxsm:min-w-[300px] scr420:min-w-[400px]  ">
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
