import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MiniLoader from "../../../components/common/mini-loader";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";

function RandomMail({
  shortlist,
  jobData,
  setPopupVisible,
  id,
  setStatusChange,
  statusChange,
  applicantIds,
  submitDetails,
  isByEmployer,
  newHiringStage,
}) {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [tags, setTags] = useState([]);
  const [to, setTo] = useState();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("Shortlisted Candidates for Review & Selection");



  const formatCandidateNames = () => {
    if (!shortlist || shortlist.length === 0) return "[Candidate's Name]";
    return shortlist
      .map(
        (item) =>
          `${item?.details?.personal?.firstName} ${item?.details?.personal?.lastName}`
      )
      .join(", ");
  };

  const [content, setContent] = useState(
    `<div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; padding: 20px;">
  
    <p style="display: block; margin-bottom: 20px;">Dear,</p>

    <p style="display: block; margin-bottom: 20px;">Greetings from ${userDataGlobal?.firstName} ${userDataGlobal?.lastName}  .</p>
  
    <div style="display: block; margin-bottom: 20px;">
      <p style="display: block; margin-bottom: 20px;">
       As part of our recruitment partnership, we are pleased to submit a list of shortlisted candidates for the open positions currently available at your organization. These candidates have been carefully screened and selected through Skilotech.com, ensuring alignment with the job requirements shared.
      </p>
  
      <p style="display: block; margin-bottom: 20px;">
       To review the shortlisted candidates and proceed with the selection process, please click the link below:
       ${`https://www.skilotech.com/common/hiring/JobPost?id=${id}&clientView=${true}`}

      </p>
      <p style="display: block; margin-bottom: 20px;">
       Thank you for choosing us as your recruitment partner. We look forward to assisting you in building the right team.

      </p>
    </div>
     <p style="display: block; margin-bottom: 20px;"></p>
    <p style="display: block; margin-bottom: 20px;">Best Regards,</p>
  
    <p style="display: block; margin-bottom: 10px;">${userDataGlobal?.firstName} ${userDataGlobal?.lastName}</p>
  
    <p style="display: block; margin-bottom: 10px;">
     ${userDataGlobal?.mobileNo}
    </p>
  
  </div>`
  );




  const [subjectError, setSubjectError] = useState("");
  const [contentError, setContentError] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (inputValue) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      return;
    }

    let isValid = true;

    if (
     !subject?.trim()
        
    ) {
      setSubjectError("Subject is required.");
      isValid = false;
    } else {
      setSubjectError("");
    }

    if (
    !content?.trim()
       
    ) {
      setContentError("Content is required.");
      isValid = false;
    } else {
      setContentError("");
    }

    if (!isValid) return;

    setLoading(true);
    const emailDetails = {
      to: to || "",
      cc: tags,
      subject:subject,
      content:content,
      applicantId: shortlist?.map((item) => item?.applicantId),
      jobId: id,

    };

    try {
      const response = await axios.post(
        "https://api.skilotech.com/api/hiring/clientMail",
        emailDetails
      );

      toast.success("Email sent successfully!");
      setLoading(false);
     
    } catch (error) {
      setLoading(false);
      console.log(
        "Error sending email details:",
        error.response?.data?.message
      );
      if (error.response?.data?.message === "No applicants need updating") {
        toast.error("Already ShortListed");
      } else {
        toast.error("Failed to send email details. Please try again.");
      }
    } finally {
      setLoading(false);
      setPopupVisible(false);
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
        <button className="ql-align" aria-label="Align Left"></button>
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
  console.log(shortlist);

  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-20"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
        <div className="bg-white p-4 scr500:p-8 rounded-lg  max-w-[1100px] scr1250:w-[1100px] h-[80vh] overflow-y-auto max-h-[560px]">
          <div className="mb-4 flex items-center">
            <div className="flex w-full flex-col">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupVisible(false);
                }}
                className="flex w-full justify-end cursor-pointer"
              >
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99735 11.1232L3.50485 17.6152C3.21518 17.9052 2.86402 18.0469 2.45135 18.0402C2.03835 18.0339 1.68702 17.8859 1.39735 17.5962C1.10768 17.3065 0.96285 16.952 0.96285 16.5327C0.96285 16.1134 1.10768 15.7589 1.39735 15.4692L7.87035 8.99619L1.37835 2.55369C1.08835 2.26402 0.946683 1.90952 0.95335 1.49019C0.959683 1.07119 1.10768 0.716855 1.39735 0.427188C1.68702 0.137188 2.04152 -0.0078125 2.46085 -0.0078125C2.88018 -0.0078125 3.23468 0.137188 3.52435 0.427188L9.99735 6.91919L16.4398 0.427188C16.7295 0.137188 17.0807 -0.0078125 17.4933 -0.0078125C17.9063 -0.0078125 18.2577 0.137188 18.5473 0.427188C18.8577 0.737188 19.0128 1.09669 19.0128 1.50569C19.0128 1.91469 18.8577 2.26402 18.5473 2.55369L12.0743 8.99619L18.5663 15.4887C18.8563 15.7784 19.0013 16.1295 19.0013 16.5422C19.0013 16.9552 18.8563 17.3065 18.5663 17.5962C18.2563 17.9065 17.8968 18.0617 17.4878 18.0617C17.0788 18.0617 16.7295 17.9065 16.4398 17.5962L9.99735 11.1232Z"
                    fill="#333333"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="w-[100%] gap-[20px] flex flex-col">
                  <div className="flex items-center gap-[20px] flex-wrap ">
                    <div className="text-[16px] font-[600]">To</div>
                    <div

                      className=" py-[6px] px-3 rounded-[26px] flex gap-[10px] flex-wrap items-center  leading-tight"
                    >
                      <div className="group relative">
                        <input
                          type="text"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                           placeholder="Enter Email"
                          className="text-[14px] font-[600] outline-none bg-transparent placeholder:text-[16px] placeholder:font-medium min-w-[300px]"
                        />
                      </div>
                    </div>

                  </div>
                  <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                </div>

                <div className="max-w-[1100px] gap-[20px] flex flex-col">
                  <div className="flex w-full items-center gap-[20px]">
                    <div className="text-[16px] font-[600]">CC</div>
                    <div className="p-[4px] w-full flex flex-wrap ml:flex-nowrap  rounded-[26px] gap-[10px] items-start">
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-[10px]">
                          {tags.map((tag, index) => (
                            <div
                              key={index}
                              className="flex items-center border-[1px] border-[#D6DDEB] p-[6px] px-2 rounded-[26px]"
                            >
                              <span className="text-[14px] font-[600] mr-[8px]">
                                {tag}
                              </span>
                              <div
                                onClick={() => removeTag(index)}
                                className="cursor-pointer"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.0655 11.9987L16.3115 8.75242C16.4565 8.60759 16.5273 8.43201 16.524 8.22567C16.5208 8.01917 16.4468 7.84351 16.302 7.69867C16.1572 7.55384 15.9799 7.48142 15.7703 7.48142C15.5606 7.48142 15.3833 7.55384 15.2385 7.69867L12.002 10.9352L8.78075 7.68917C8.63592 7.54417 8.45867 7.47334 8.249 7.47667C8.0395 7.47984 7.86233 7.55384 7.7175 7.69867C7.5725 7.84351 7.5 8.02076 7.5 8.23042C7.5 8.44009 7.5725 8.61734 7.7175 8.76218L10.9635 11.9987L7.7175 15.2199C7.5725 15.3648 7.5 15.5403 7.5 15.7467C7.5 15.9532 7.5725 16.1288 7.7175 16.2737C7.8725 16.4288 8.05225 16.5064 8.25675 16.5064C8.46125 16.5064 8.63592 16.4288 8.78075 16.2737L12.002 13.0372L15.2483 16.2832C15.3931 16.4282 15.5687 16.5007 15.775 16.5007C15.9815 16.5007 16.1572 16.4282 16.302 16.2832C16.4572 16.1282 16.5348 15.9484 16.5348 15.7439C16.5348 15.5394 16.4572 15.3648 16.302 15.2199L13.0655 11.9987Z"
                                    fill="#333333"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center ml:min-w-[500px] gap-[10px]">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="p-[4px] rounded-[26px] w-full"
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                </div>

                <div className="flex items-center ml:min-w-[500px] gap-[10px] pb-3">
                  <div className="text-[16px] font-[600]">Subject</div>
                  <input
                    type="text"
                    value={
                      subject
                    }
                    // onChange={(e) => {
                    //   setSubject(e.target.value);
                    //   setSubjectError("");
                    // }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSubject(value);


                      setSubjectError("");
                    }}
                    className=" p-[4px] w-full"
                    placeholder="Enter Subject"
                  />
                </div>

                <div className="border-[1px] border-[#D4D4D480] w-full"></div>
                {subjectError && (
                  <p className="text-red text-sm mt-1">{subjectError}</p>
                )}
                <div className="flex flex-col mt-[20px]">
                  <div className="text-[16px] font-[600] mb-[8px]">Content</div>
                  <Editor
                    style={{ minHeight: "120px", overflow: "auto" }}
                    value={
                      content
                    }
                    headerTemplate={header}
                    // onTextChange={(e) => {
                    //   setContent(e.htmlValue);
                    //   setContentError("");
                    // }}
                    onTextChange={(e) => {
                      setContent(e.htmlValue);

                      setContentError("");
                    }}
                  />
                  {contentError && (
                    <p className="text-red text-sm mt-1">{contentError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            {loading ? (
              <div className="bg-blue flex gap-1 justify-center items-center w-[120px] text-white py-2 px-4 rounded-[30px] hover:bg-blue-600 text-[14px] font-semibold">
                <MiniLoader />
              </div>
            ) : (
              <button
                onClick={handleSend}
                className="bg-blue flex gap-1 justify-center items-center w-[120px] text-white py-2 px-4 rounded-[30px] hover:bg-blue-600 text-[14px] font-semibold"
              >
                Send
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_7942_77032)">
                    <path
                      d="M14.85 9.69513L3.3 14.5701C3.05 14.6701 2.8125 14.6483 2.5875 14.5045C2.3625 14.3608 2.25 14.1514 2.25 13.8764V4.12638C2.25 3.85138 2.3625 3.64201 2.5875 3.49826C2.8125 3.35451 3.05 3.33263 3.3 3.43263L14.85 8.30763C15.1625 8.44513 15.3188 8.67638 15.3188 9.00138C15.3188 9.32638 15.1625 9.55763 14.85 9.69513ZM3.75 12.7514L12.6375 9.00138L3.75 5.25138V7.87638L8.25 9.00138L3.75 10.1264V12.7514Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomMail;
