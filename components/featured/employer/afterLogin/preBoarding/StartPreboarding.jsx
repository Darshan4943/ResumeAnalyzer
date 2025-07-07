import axios from "axios";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DocumentMail from "./documentMail";
import { setRecallData } from "../../../../../Redux/slices/recallSlice";
function StartPreboarding({ setStartPreboarding, applicant, isUpdate, setIsUpdate }) {
  const [loading, setLoading] = useState();
  const [id, setId] = useState("");
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [showEditor, setShowEditor] = useState(false);
  const [formError, setFormError] = useState("");
  const [sendMail, setSendMail] = useState(false);
  const {recallData } = useSelector((state) => state.recall);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDataGlobal && userDataGlobal?._id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  const [data, setData] = useState({
    employerEmail: "",
    applicantId: "",
    applicantEmail: "",
    isDocumentCollecting: true,
    isPhotoId: false,
    isAddress: false,
    isPayroll: false,
    isAcademic: false,
    isDegrees: false,
    isCertifications: false,
    isExperience: false,
    note: "",

  });





  useEffect(() => {
    if (id) {
      setData((prevData) => ({
        ...prevData,
        employerEmail: userDataGlobal?.email,
      }));
    }
  }, [id]);

  useEffect(() => {
    if (applicant?.applicantId) {
      setData((prevState) => ({
        ...prevState,
        applicantId: applicant.applicantId, jobId: applicant.jobId, applicantEmail: applicant.details.personal.email, applicantFirstName: applicant.details.personal.firstName, applicantLastName: applicant.details.personal.lastName
      }));
    }
  }, [applicant]);



  const handleChange1 = useCallback(
    debounce((value) => {
      const plainText = value?.replace(/<[^>]*>/g, "");
      setData((prevData) => ({
        ...prevData,
        note: plainText,
      }));
    }, 500),
    []
  );

  const handleNoteChange = useCallback(
    debounce((value) => {
      const plainText = value.replace(/<[^>]*>/g, "");
      setData((prevData) => ({
        ...prevData,
        note: plainText,
      }));
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "note") {
      handleNoteChange(value);
    }
  };

  const handleRadioChange = (value) => {
    setData((prevData) => ({
      ...prevData,
      createdBy: prevData.createdBy,
      applicantId: prevData.applicantId,
      isDocumentCollecting: value,
      ...(value === false && {
        isPhotoId: false,
        isAddress: false,
        isPayroll: false,
        isAcademic: false,
        isDegrees: false,
        isCertifications: false,
        isExperience: false,
        note: "",
      }),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.skilotech.com/api/preboarding",
        data
      );

      setStartPreboarding(false);
      toast.success("Preboarding created successfully.");
      setIsUpdate(!isUpdate)
      dispatch(setRecallData(!recallData));
    } catch (error) {
      toast.error(
        `Error creating Preboarding: ${error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike"></button>
        <button
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          className="ql-list"
          value="bullet"
          aria-label="Unordered List"
        ></button>
        <button
          className="ql-align"
          value=""
          aria-label="Align Left"
        ></button>
        <button
          className="ql-align"
          value="center"
          aria-label="Align Center"
        ></button>
        <button
          className="ql-align"
          value="right"
          aria-label="Align Right"
        ></button>
      </span>
    );
  };

  const header = renderHeader();
  return (
    <>

      {sendMail &&
        <DocumentMail data={data} handleSubmit={handleSubmit} setData={setData} setSendMail={setSendMail} loading={loading} setLoading={setLoading} />
      }

      <div
        className="flex flex-col items-center gap-3 p-3 ml:p-6 bg-white ml:w-[70%] w-full rounded-[16px] h-[80vh]   overflow-y-auto"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex  justify-between items-start self-stretch gap-4">
          <div>
            <p className="text-[18px] ml:text-[24px] font-Montserrat font-medium text-[#333]">
              Start Preboarding Process for{" "}
              <span className="font-[700]">
                {`${applicant?.details?.personal?.firstName} ${applicant?.details?.personal?.lastName}`}{" "}
              </span>
            </p>
          </div>
          <svg
            onClick={() => setStartPreboarding(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g mask="url(#mask0_7804_54441)">
              <path
                d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                fill="#333333"
              />
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-3 self-stretch items-start">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <p className="text-[16px] ml:text-[20px] font-Montserrat font-medium text-[#333]">
              Start Documentation by
            </p>
            <div className="flex ml:flex-row flex-col items-start gap-2 self-stretch">
              <div
                className={`flex p-3 gap-3 flex-col self-stretch rounded-xl ${data.isDocumentCollecting ? "bg-[#BCEBFF]" : "bg-white"
                  }`}
                style={{ border: "1px solid var(--primary, #06A9EF)" }}
              >
                <div className="flex items-start gap-1 self-stretch leading-[20px]">
                  <input
                    type="radio"
                    name="isDocumentCollecting"
                    className="h-[20px] w-[20px] custom-radio cursor-pointer"
                    checked={data.isDocumentCollecting === true}
                    onChange={() => handleRadioChange(true)}
                  />

                  <div className="flex flex-col justify-center items-start gap-1">
                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-medium text-[#333]">
                      Start by collecting documents
                    </p>
                    <p className="text-[12px] font-Montserrat font-medium text-[#333]">
                      Candidate can submit documents through candidate portal
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`flex p-3 gap-3 flex-col self-stretch rounded-xl ${!data.isDocumentCollecting ? "bg-[#BCEBFF]" : "bg-white"
                  }`}
                style={{ border: "1px solid var(--primary, #06A9EF)" }}
              >
                <div className="flex items-start gap-1 self-stretch leading-[20px]">
                  <input
                    type="radio"
                    name="isDocumentCollecting"
                    className="h-[20px] w-[20px] custom-radio cursor-pointer"
                    checked={data.isDocumentCollecting === false}
                    onChange={() => handleRadioChange(false)}
                  />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <p className="text-[14px] ml:text-[16px] font-Montserrat font-medium text-[#333]">
                      Start without collecting Documents
                    </p>
                    <p className="text-[12px] font-Montserrat font-medium text-[#333]">
                      Start generating offer letter for the candidate directly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 self-stretch ">
            <p className="text-[16px] ml:text-[20px] font-Montserrat font-medium text-[#333]">
              Documents
            </p>
            <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
              Select the documents you want to collect from the list below
            </p>
          </div>
          <div className="flex flex-col gap-4 self-stretch items-start">
            <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
              Personal ID Proof
            </p>
            <div className="flex items-start gap-2 self-stretch">
              <input
                type="checkbox"
                name="isPhotoId"
                checked={data.isPhotoId}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isPhotoId")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                  Photo ID
                </p>
                <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                  Aadhar card, Driving License, Pan Card, Passport, Voter ID Card
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 self-stretch">
              <input
                type="checkbox"
                name="isAddress"
                checked={data.isAddress}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isAddress")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                  Address Proof
                </p>
                <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                  Aadhar card, Driving License, Passport, Voter ID Card
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 self-stretch">
              <input
                type="checkbox"
                name="isPayroll"
                disabled={!data.isDocumentCollecting}
                checked={data.isPayroll}
                onChange={(e) => handleChange(e, "isPayroll")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <div className="flex flex-col items-start gap-1 self-stretch justify-center leading-[14px]">
                <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                  Payroll
                </p>
                <p className="text-[12px] font-Montserrat font-medium text-[#646464]">
                  Pan Card, Bank statement
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 self-stretch">
            <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
              Degrees & Certificates
            </p>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                name="isAcademic"
                checked={data.isAcademic}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isAcademic")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                Academic Certificate
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                name="isDegrees"
                checked={data.isDegrees}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isDegrees")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                Degrees & Certificates
              </p>
            </div>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                name="isCertifications"
                checked={data.isCertifications}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isCertifications")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                Other Certifications
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 self-stretch">
            <p className="text-[14px] ml:text-[16px] font-Montserrat font-semibold text-[#333]">
              Previous Work Experience
            </p>
            <div className="flex items-center gap-2 self-stretch">
              <input
                type="checkbox"
                name="isExperience"
                checked={data.isExperience}
                disabled={!data.isDocumentCollecting}
                onChange={(e) => handleChange(e, "isExperience")}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #06A9EF",
                  backgroundColor: "white",
                  height: "20px",
                  width: "20px",
                }}
              />
              <p className="text-[14px] font-Montserrat font-medium text-[#333]">
                Experience & Appreciation Letters
              </p>
            </div>
          </div>
          <div
            onClick={() => {
              setShowEditor(true);
            }}
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_7804_65968)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p className="text-[12px] ml:text-[14px] font-Montserrat font-semibold text-[#06A9EF]">
              Add Note for Candidate
            </p>
          </div>
          {showEditor && (
            <Editor
            headerTemplate={header}
              value={data.note}
              onTextChange={(e) => handleChange1(e.htmlValue)}
              style={{
                border: formError.description
                  ? "2px solid red"
                  : "0px solid #dedede",
                fontSize: "16px",
                color: "#333",
                padding: "10px",
                minHeight: "196px",
              }}
            />
          )}
          <div
            className={`flex justify-end gap-4 self-stretch items-start ${showEditor && "pt-[32px]"
              }`}
          >
            <button
              onClick={() => setStartPreboarding(false)}
              className="text-[16px] py-2 px-4 justify-center items-center rounded-[30px] bg-white font-Montserrat font-medium text-[#333]"
              style={{ border: "1px solid var(--primary, #06A9EF)" }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => { data?.isDocumentCollecting ? setSendMail(true) : handleSubmit(e) }}
              className="text-[16px]  py-2  w-[92px] justify-center items-center rounded-[30px] bg-[#06A9EF] font-Montserrat font-medium text-[#fff]"
              style={{ border: "1px solid var(--primary, #06A9EF)" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartPreboarding;
