import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import MiniLoader from "../../../components/common/mini-loader";
import MiniLoader1 from "../../../components/common/miniLoader";
import moment from "moment";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import mammoth from "mammoth";
import { pdf } from "@react-pdf/renderer";
import { telCode } from "../../../utils/data";
import PersonalDetails from "../../../components/featured/candidate/jobs/personalDetails";
import ProfessionalDetails from "../../../components/featured/candidate/jobs/professionalDetails";
import { fetchAppliedJob } from "../../../Redux/slices/jobSlice";
function ApplyForm() {
  const [formError, setFormError] = useState({});
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingg, setLoadingg] = useState(true);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [resumeIdd, setResumeIdd] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const [professionalSec, setProfessionalSec] = useState({
    education: "",
    skills: [],
    aboutMe: "",
  });
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      currentLocation: "",
      dob: "",
      gender: "",
    },
    professional: {
      totalExperience: "",
      relevantExperience: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      currencyExpectedCTC: "",
      currencyCurrentCTC: "",
    },
  });

  const router = useRouter();
  const { id } = router.query;
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/job/getByJobId/${id}`)
      .then((res) => {
        setJobDetails(res.data);

        setFormData((prevData) => ({
          ...prevData,
          professional: {
            ...prevData.professional,
            currencyExpectedCTC:
              res.data?.currency ||
              prevData.professional.currencyExpectedCTC ||
              "",
            currencyCurrentCTC:
              res.data?.currency ||
              prevData.professional.currencyCurrentCTC ||
              "",
          },
        }));
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:2000/api/userJobDetails/getUserJobDetailsById/${userDataGlobal?._id}`
      )
      .then((res) => {
        const { personal, professional } = res.data.data;
        const formattedDob = personal.dob
          ? new Date(personal.dob).toISOString().split("T")[0]
          : "";

        setFormData((prevData) => ({
          ...prevData,
          personal: {
            ...prevData.personal,
            firstName: personal.firstName || prevData.personal.firstName || "",
            lastName: personal.lastName || prevData.personal.lastName || "",
            email: personal.email || prevData.personal.email || "",
            mobileNo: personal.mobileNo || prevData.personal.mobileNo || "",

            dob: formattedDob || prevData.personal.dob || "",
            gender: personal.gender || prevData.personal.gender || "",
          },

          professional: {
            ...prevData.professional,
            totalExperience:
              professional.totalExperience ||
              prevData.professional.totalExperience ||
              "",
            relevantExperience:
              professional.relevantExperience ||
              prevData.professional.relevantExperience ||
              "",
            currentCTC:
              professional.currentCTC || prevData.professional.currentCTC || "",
            expectedCTC:
              professional.expectedCTC ||
              prevData.professional.expectedCTC ||
              "",
            noticePeriod:
              professional.noticePeriod ||
              prevData.professional.noticePeriod ||
              "",
            comfortableWithLocation:
              professional.comfortableWithLocation ||
              prevData.professional.comfortableWithLocation ||
              "",
          },
          dial_code: personal.dial_code || prevData.dial_code || "",
        }));
        const selectedItem = telCode.find(
          (item) => item.dial_code === personal.dial_code
        );

        if (selectedItem) {
          setSelectedItem(selectedItem);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/resume/${userDataGlobal?._id}`)
      .then((res) => {
        setResumes(res.data.data);
        setLoadingg(false);
      })
      .catch((err) => console.error(err));
  }, [userDataGlobal]);

  const handleInputChange = (section, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [fieldName]: value,
      },
    }));
    setFormError((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  const validateInput = () => {
    const errors = {};
    const personal = formData.personal;
    const professional = formData.professional;

    // Required fields
    if (!personal?.firstName) errors.firstName = "First name is required";
    if (!personal?.lastName) errors.lastName = "Last name is required";
    if (!personal?.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
      errors.email = "Email is invalid";
    }
    // if (!personal?.dob) errors.dob = "Date of birth is required";
    if (!personal?.gender) errors.gender = "Gender is required";
    if (!personal?.mobileNo) errors.mobileNo = "Mobile Number is required";

    // if (!professional?.totalExperience)
    //   errors.totalExperience = "Total experience is required";
    // if (!professional?.relevantExperience)
    //   errors.relevantExperience = "Relevant experience is required";
    // if (!professional?.currentCTC)
    //   errors.currentCTC = "Current CTC is required";
    // if (!professional?.expectedCTC)
    //   errors.expectedCTC = "Expected CTC is required";
    // if (!professional?.noticePeriod)
    //   errors.noticePeriod = "Notice period is required";

    // Check if a resume is selected or uploaded
    if (!selectedResume && !uploadedResume) {
      errors.resume = "Please select or upload a resume";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };
  const updateApplyCount = () => {
    axios
      .put(
        `http://localhost:2000/api/subscription/updateApplyLimit/${userDataGlobal?._id}`
      )
      .then((res) => {})
      .catch((err) => console.error(err));
  };

  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          try {
            pdf.getPage(pageNumber).then(function (page) {
              page.getTextContent().then(function (textContent) {
                const textItems = textContent.items.map((item) => item.str);
                resolve(textItems.join(" "));
              });
            });
          } catch (err) {
            reject(err);
            return;
          }
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const extractResumeSections = (text) => {
    const sections = {
      aboutMe: "",
      skills: [],
      highestQualification: "",
    };

    // Extract "About Me" section
    const aboutMeMatch = text.match(
      /(?:about\sme|summary|profile)\s*:\s*(.*)/i
    );
    if (aboutMeMatch) {
      sections.aboutMe = aboutMeMatch[1].trim();
    }

    // Extract "Skills" section (look for keywords like 'skills')
    const skillsMatch = text.match(/skills\s*:\s*(.*)/i);
    if (skillsMatch) {
      sections.skills = skillsMatch[1]
        .split(/,|\n/)
        .map((skill) => skill.trim());
    }

    // Extract "Highest Qualification" (look for education-related terms)
    const qualificationMatch = text.match(
      /(B\.Tech|M\.Tech|MBA|PhD|Bachelor|Master)[^,]*\s*in\s*([^,\n]*)/i
    );
    if (qualificationMatch) {
      sections.highestQualification = `${qualificationMatch[1]} in ${qualificationMatch[2]}`;
    }

    return sections;
  };

  const parseData = (file, setText) => {
    return new Promise((resolve, reject) => {
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        setFileType("doc");
        reader.onload = (e) => {
          const content = e.target.result;
          const doc = new Docxtemplater(new PizZip(content), {
            delimiters: {
              start: "12op1j2po1j2poj1po",
              end: "op21j4po21jp4oj1op24j",
            },
          });
          const text = doc.getFullText();
          setText(text);
          resolve(text);
        };
        reader.readAsBinaryString(file);
      } else if (file.type === "application/msword") {
        setFileType("doc"); // Set file type as DOC
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          // Use Mammoth to extract text from .doc files
          mammoth
            .extractRawText({ arrayBuffer })
            .then((result) => {
              const text = result.value; // Extracted text
              setText(text); // Set extracted text
              resolve(text);
            })
            .catch((error) => {
              reject(`Error parsing DOC file: ${error.message}`);
            });
        };
        reader.readAsArrayBuffer(file); // Read as ArrayBuffer for mammoth
      } else if (file.type === "application/pdf") {
        setFileType("pdf");
        const pdfTextPromises = [];
        for (let i = 1; i <= 1; i++) {
          pdfTextPromises.push(fileToText(file, i));
        }
        Promise.all(pdfTextPromises)
          .then((texts) => {
            const fullText = texts.join("");
            // Extract specific sections

            resolve(fullText);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        setText("");
        resolve("");
      }
    });
  };

  useEffect(() => {
    const extractedSections = extractResumeSections(text);

    setProfessionalSec({
      education: extractedSections.highestQualification,
      skills: extractedSections.skills,
      aboutMe: extractedSections.aboutMe,
    });
  }, [text]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseData(file, setText)
        .then((extractedText) => {
          setText(extractedText);
          const extractedSections = extractResumeSections(extractedText);
          setProfessionalSec({
            education: extractedSections.highestQualification,
            skills: extractedSections.skills,
            aboutMe: extractedSections.aboutMe,
          });

          setUploadedResume(file);
          setSelectedResume(null);
          setIsUploaded(true);
          setFormError((prevErrors) => ({
            ...prevErrors,
            resume: "",
          }));
        })
        .catch((error) => {
          console.error("Error extracting text:", error);
        });
    }
  };

  const getHighestQualification = (educationArray) => {
    if (!educationArray || educationArray.length === 0) return null;

    const levels = [
      "Class 10",
      "Class 12",
      "Diploma",
      "Bachelor",
      "Master",
      "PhD",
    ];

    // Find the highest qualification directly by comparing their level indexes
    const highestQualification = educationArray.reduce((highest, current) => {
      // Compare the indexes of the qualifications in the levels array
      return levels.indexOf(current.qualification) >
        levels.indexOf(highest.qualification)
        ? current
        : highest;
    });

    return highestQualification;
  };

  const handleResumeSelection = (item) => {
    const highestQualification = getHighestQualification(item.education);
    setProfessionalSec({
      experience: highestQualification
        ? highestQualification.qualification
        : "No qualification",
      skills: item.skills ? item.skills.map((skill) => skill.skill) : [],
      aboutMe: item.summery || "",
    });

    setResumeIdd(item._id);
    setSelectedResume(item?.resumeUrl);
    setUploadedResume(null);
    setIsUploaded(false);
    // Clear the resume error
    setFormError((prevErrors) => ({
      ...prevErrors,
      resume: "",
    }));
  };

  const applyForJob = () => {
    if (!validateInput()) return;
    const totalExperience =
      parseInt(formData.professional?.totalExperience) || 0;
    const relevantExperience =
      parseInt(formData.professional?.relevantExperience) || 0;

    if (relevantExperience > totalExperience) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        relevantExperience:
          "Relevant experience cannot be greater than Total experience.",
      }));
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("userId", userDataGlobal?._id);
    formDataToSend.append("resumeUrl", isUploaded ? null : selectedResume);
    formDataToSend.append("resumeId", resumeIdd);
    formDataToSend.append("percentage", "");
    formDataToSend.append("extractedText", text);
    formDataToSend.append("fileName", fileName);

    if (isUploaded && uploadedResume) {
      formDataToSend.append("uploadedResume", uploadedResume);
    } else if (!selectedResume && !uploadedResume) {
      setLoading(false);
      return;
    }

    formDataToSend.append(
      "formData",
      JSON.stringify({
        personal: {
          firstName: formData.personal?.firstName,
          lastName: formData.personal?.lastName,
          email: formData.personal?.email,
          dial_code: formData?.dial_code,
          mobileNo: formData.personal?.mobileNo,
          currentLocation: formData.personal?.currentLocation,
          // dob: formData.personal?.dob,
          gender: formData.personal?.gender,
        },
        professional: {
          totalExperience: formData.professional?.totalExperience,
          relevantExperience: formData.professional?.relevantExperience,
          currentCTC: formData.professional?.currentCTC,
          expectedCTC: formData.professional?.expectedCTC,
          noticePeriod: formData.professional?.noticePeriod,
          currencyCurrentCTC: formData.professional?.currencyCurrentCTC,
          currencyExpectedCTC: formData.professional?.currencyExpectedCTC,
          comfortableWithLocation:
            formData.professional?.comfortableWithLocation,
          aboutme: professionalSec?.aboutMe || "",
          skills: professionalSec?.skills || [],
          hightestQul: professionalSec?.experience || "",
        },
      })
    );

    axios
      .post(`http://localhost:2000/api/job/apply/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Application Sent Successfully");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // updateApplyCount();
        dispatch(fetchAppliedJob(userDataGlobal?._id));
        router.push("/jobs/candidate/AppliedJobs");
      })
      .catch((err) => {
        console.error(err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .finally(() => {
        axios
          .post(
            "http://localhost:2000/api/userJobDetails/createOrUpdateUserJobDetails",
            {
              userId: userDataGlobal?._id,
              ...formData,
            }
          )
          .then((res) => {
            console.log("User job details posted successfully", res.data);
          })
          .catch((err) => {
            console.error("Error posting user job details", err);
          });
      });
  };

  //   const handleResumeSelection = (resumeUrl) => {
  //     console.log("resumeUrl", resumeUrl)
  //     setSelectedResume(resumeUrl);
  //     setUploadedResume(null);
  //     setIsUploaded(false);
  //     // Clear the resume error
  //     setFormError((prevErrors) => ({
  //       ...prevErrors,
  //       resume: "",
  //     }));
  //   };

  const getLastUpdatedText = (updatedAt) => {
    const now = moment();
    const updatedDate = moment(updatedAt);
    const diffInHours = now.diff(updatedDate, "hours");
    const diffInDays = now.diff(updatedDate, "days");

    if (diffInHours < 24) {
      return `Last updated at ${diffInHours} ${
        diffInHours === 1 ? "hour" : "hours"
      } ago`;
    } else {
      return `Last updated at ${diffInDays} ${
        diffInDays === 1 ? "day" : "days"
      } ago`;
    }
  };

  const handleDownload = (resumeUrl, fileName) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = { fileName };
    link.click();
  };

  return (
    <>
      <div className="customMargins wl:w-[100%] w-[100%]">
        <div
          className="rounded-[16px] my-6 bg-[#FFFFFF] sm:p-6 p-3 flex flex-col gap-4"
          style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <svg
              className="cursor-pointer"
              onClick={() => router.back()}
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_5716_128816)">
                <path
                  d="M9.12656 15.665L15.6599 22.1984L13.9974 23.8317L4.66406 14.4984L13.9974 5.16504L15.6599 6.79837L9.12656 13.3317H23.3307V15.665H9.12656Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>

            <p className="text-[#06A9EF] text-[16px] sm:text-[18px] font-medium">
              Apply to{" "}
              <span className="text-[#333333]">{jobDetails?.jobTitle}</span>
            </p>

            <div className="hidden xxlg:block bg-[#DEDEDE] w-[2px] h-[28px]"></div>

            <p className="text-[14px] sm:text-[16px] font-medium">
              {jobDetails?.companyName}
            </p>

            <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_5716_128824)">
                  <path
                    d="M9.91082 10.5023C10.3681 10.5023 10.7595 10.3391 11.0851 10.0127C11.4108 9.68631 11.5736 9.29395 11.5736 8.83561C11.5736 8.37728 11.4108 7.98492 11.0851 7.65853C10.7595 7.33214 10.3681 7.16895 9.91082 7.16895C9.45356 7.16895 9.06212 7.33214 8.73649 7.65853C8.41087 7.98492 8.24806 8.37728 8.24806 8.83561C8.24806 9.29395 8.41087 9.68631 8.73649 10.0127C9.06212 10.3391 9.45356 10.5023 9.91082 10.5023ZM9.91082 16.6273C11.6013 15.0717 12.8553 13.6585 13.6728 12.3877C14.4903 11.1169 14.8991 9.98839 14.8991 9.00228C14.8991 7.48839 14.4176 6.24881 13.4546 5.28353C12.4916 4.31825 11.3103 3.83561 9.91082 3.83561C8.51133 3.83561 7.33007 4.31825 6.36705 5.28353C5.40404 6.24881 4.92253 7.48839 4.92253 9.00228C4.92253 9.98839 5.33129 11.1169 6.14882 12.3877C6.96634 13.6585 8.22034 15.0717 9.91082 16.6273ZM9.91082 18.8356C7.67994 16.9328 6.01372 15.1655 4.91214 13.5335C3.81056 11.9016 3.25977 10.3912 3.25977 9.00228C3.25977 6.91895 3.92834 5.25922 5.26547 4.02311C6.60261 2.787 8.15106 2.16895 9.91082 2.16895C11.6706 2.16895 13.219 2.787 14.5562 4.02311C15.8933 5.25922 16.5619 6.91895 16.5619 9.00228C16.5619 10.3912 16.0111 11.9016 14.9095 13.5335C13.8079 15.1655 12.1417 16.9328 9.91082 18.8356Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
              {jobDetails?.country?.join(", ")} |{" "}
              {jobDetails?.location?.join(", ")}
            </div>
          </div>

          <PersonalDetails
            data={formData.personal}
            setFormData={setFormData}
            handleInputChange={(fieldName, value) =>
              handleInputChange("personal", fieldName, value)
            }
            formError={formError}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <h2 className=" text-[18px]  font-semibold  min-w-[160px]">
                Upload Resume
              </h2>
              <div className="h-[1px] w-full bg-[#DEDEDE]"></div>
            </div>

            {!loadingg ? (
              <>
                {resumes?.length > 0 && (
                  <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto overflow-x-hidden sm:pr-4 pr-2">
                    {resumes?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row border border-[#DEDEDE] rounded-[12px]"
                      >
                        <div className="px-[10px] text-center flex sm:text-[16px] text-[13px] flex-row items-center bg-[#C00000] text-white rounded-l-[12px]">
                          PDF
                        </div>
                        <div className="flex flex-row justify-between items-center sm:p-4 p-2 w-full">
                          <div className="flex flex-col gap-1">
                            <p className="text-[#333333] font-medium text-[14px]">
                              {item.fileName}
                            </p>
                            <p className="text-[#646464] font-[400] text-[12px]">
                              {getLastUpdatedText(item.updatedAt)}
                            </p>
                          </div>

                          <div className="flex flex-row sm:gap-4 gap-2 h-[40px] py-1 items-center">
                            <div
                              onClick={() =>
                                handleDownload(item.resumeUrl, item.fileName)
                              }
                              className="px-[10px] py-1 border border-[#06A9EF] rounded-[8px] cursor-pointer"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g mask="url(#mask0_5716_128902)">
                                  <path
                                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                                    fill="#646464"
                                  />
                                </g>
                              </svg>
                            </div>
                            <input
                              name="resume"
                              type="radio"
                              value={item.resumeUrl}
                              checked={
                                selectedResume === item.resumeUrl && !isUploaded
                              }
                              onChange={() => handleResumeSelection(item)}
                              className="custom-radio h-4 w-4 border-[#DEDEDE] cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <MiniLoader1 />
            )}

            <div className="flex sm:flex-row flex-col gap-4 justify-between w-[100%]">
              {formError.resume && (
                <p className="text-red font-medium  text-[14px]">
                  {formError.resume}
                </p>
              )}
              {uploadedResume ? (
                <div className="flex flex-row border border-[#DEDEDE] rounded-[12px] sm:w-[70%] w-[100%]">
                  {fileType === "pdf" ? (
                    <div className="px-[10px] text-center flex sm:text-[16px] text-[13px] flex-row items-center bg-[#C00000] text-white rounded-l-[12px]">
                      PDF
                    </div>
                  ) : (
                    <div className="px-[10px] text-center flex sm:text-[16px] text-[13px] flex-row items-center bg-[#048AC4] text-white rounded-l-[12px]">
                      DOC
                    </div>
                  )}
                  <div className="flex flex-row justify-between items-center px-4 py-1 w-full">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#333333] font-medium text-[14px]">
                        {uploadedResume.name}
                      </p>
                    </div>
                    <div className="flex flex-row gap-4 h-[30px] py-1 items-center">
                      <input
                        name="resume"
                        type="radio"
                        checked={isUploaded}
                        onChange={() => setIsUploaded(true)}
                        className="custom-radio h-4 w-4 border-[#DEDEDE] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] font-medium text-[#646464]">
                  DOC, DOCX, PDF (2 MB)
                </p>
              )}
              <label className="sm:px-6 px-3 sm:py-[10px] py-[6px] min-w-[140px] max-w-[140px] sm:max-w-full border border-[#06A9EF] rounded-[30px]  scr460:text-[14px] text-[12px] font-semibold text-[#333333] flex  justify-center cursor-pointer">
                Upload Resume
                <input
                  type="file"
                  name="resume"
                  accept=".doc,.docx,.pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <ProfessionalDetails
            setFormError={setFormError}
            data={formData.professional}
            setFormData={setFormData}
            handleInputChange={(fieldName, value) =>
              handleInputChange("professional", fieldName, value)
            }
            formError={formError}
            jobDetails={jobDetails}
          />

          <div className="flex justify-end flex-row gap-4 pt-8">
            <button
              className="px-[36px] py-2 rounded-[30px] text-[14px] font-semibold border border-[#06A9EF]"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className="bg-[#06A9EF] px-[36px] py-2 text-[#FFFFFF] text-[14px] font-semibold rounded-[30px]"
              onClick={() => validateInput() && applyForJob()}
            >
              {loading ? <MiniLoader /> : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyForm;
