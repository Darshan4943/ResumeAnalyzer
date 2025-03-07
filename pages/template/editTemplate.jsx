import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditTemplate() {
  const router = useRouter();
  const [isShortlist, setIsShortlist] = useState(null);
  const [isReject, setIsReject] = useState(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const { userDataGlobal } = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (router.isReady) {
      setIsShortlist(router.query.isShortlist === "true");
      setIsReject(router.query.isReject === "true");
    }
  }, [router.isReady, router.query]);

   const [shortlistSubject, setShortlistSubject] = useState(
     "Congratulations! You Have Been Shortlisted for the Next Round"
   );
   const [shortlistContent, setShortlistContent] = useState(`
     <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; ">
       <p style="display: block; ">Dear Candidate,</p>
       <div style="display: block; ">
         <p style="display: block; ">
           We are pleased to inform you that after a thorough review of your profile, you have been shortlisted for the next round of the selection process for 
           <strong>the position</strong> at 
           <strong>[Company Name]</strong>.
         </p>
         <p style="display: block; ">
           Your skills and experience align well with the requirements of the role, and we are excited to proceed further with your application.
           Please confirm your availability by responding to this email at your earliest convenience.
           Should you have any questions, feel free to reach out. We look forward to connecting with you soon.
         </p>
       </div>
       <p style="display: block;">Best Regards,</p>
       <p style="display: block; ">Team Skilotech</p>
       <p style="display: block; ">
         <a href="https://skilotech.com" style="color: #007bff; text-decoration: none;">Skilotech.com</a>
       </p>
     </div>
   `);
 
   const [rejectedSubject, setRejectedSubject] = useState(
     `Update on Your Application - "Job Position"`
   );
   const [rejectedContent, setRejectedContent] = useState(`
     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.8;">
       <p style="display: block; ">Dear Candidate,</p>
       <p style="display: block; ">
         Thank you for taking the time to apply for the 
         <strong>position</strong> at 
         <strong>[Company Name]</strong>. 
         We appreciate your interest and the effort you put into the process.
       </p>
       <p style="display: block; ">
         After careful consideration, we regret to inform you that we have decided to move forward with other candidates at this time. 
         This decision was not an easy one, as we received a large number of strong applications, including yours.
         We sincerely appreciate your time and effort, and we encourage you to stay connected with us for future opportunities that may be a great fit for your skills and experience.
         We wish you success in your career endeavors and hope to cross paths again in the future.
       </p>
       <p style="display: block; ">Best Regards,</p>
       <p style="display: block; ">Team Skilotech</p>
       <p style="display: block; ">
         <a href="https://skilotech.com" style="color: #007bff; text-decoration: none;">Skilotech.com</a>
       </p>
     </div>
   `);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/getTemplates/${userDataGlobal._id}`
      );
      const result = await response.json();
  
      if (response.ok) {
        if (result.templates.length === 0) {
          setSubject(rejectedSubject);
          setContent(rejectedContent);
        } else {
          result.templates.forEach((template) => {
            if (template.templateType === "shortlist") {
              setShortlistSubject(template?.tempData?.subject || shortlistSubject);
              setShortlistContent(template?.tempData?.content || shortlistContent);
            } else if (template.templateType === "reject") {
              setRejectedSubject(template?.tempData?.subject || rejectedSubject);
              setRejectedContent(template?.tempData?.content || rejectedContent);
            }
          });
        }
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };
  
  useEffect(() => {
    if (userDataGlobal._id) {
      fetchTemplates();
    }
  }, [userDataGlobal._id]);
  
  useEffect(() => {
    if (router.isReady) {
      const isShortlist = router.query.isShortlist === "true";
      const isReject = router.query.isReject === "true";
  
      if (isShortlist) {
        setSubject(shortlistSubject);
        setContent(shortlistContent);
      } else if (isReject) {
        setSubject(rejectedSubject);
        setContent(rejectedContent);
      }
    }
  }, [router.isReady, router.query, shortlistSubject, shortlistContent, rejectedSubject, rejectedContent]);
  
  const handleContentChange = (newContent) => setContent(newContent);
  const handleSubjectChange = (event) => setSubject(event.target.value);
  
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/createTemplate/${userDataGlobal._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            content,
            templateType: subject === shortlistSubject ? "shortlist" : "reject",
          }),
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  useEffect(() => {
    if (isShortlist !== null && isReject !== null) {
      if (isShortlist) {
        setSubject(shortlistSubject);
        setContent(shortlistContent);
      } else if (isReject) {
        setSubject(rejectedSubject);
        setContent(rejectedContent);
      }
    }
  }, [isShortlist, isReject]);



  const renderHeader = () => (
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

  const header = renderHeader();

  if (isShortlist === null || isReject === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-[18px] font-[600]">Edit Template</div>
      <div className="pt-[16px] flex gap-[24px]">
        <div className="flex flex-col gap-[16px] ">
          <div className="bg-[#FFFFFF] rounded-[16px] w-[562px] p-[26px] flex flex-col gap-[28px] ">
            <div className="flex flex-col gap-[6px]">
              <div className="text-[16px] font-[600]">Subject</div>
              <input
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                className="border-[1px] border-[#DEDEDE] rounded-[8px] text-[14px] font-[400] p-[12px] w-full"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="text-[16px] font-[600]">Content</div>
              <Editor
                headerTemplate={header}
                value={content}
                onTextChange={(e) => handleContentChange(e.htmlValue)}
                className="editor-container h-[416px]"
                style={{
                  fontSize: "16px",
                  color: "#333",
                  padding: "10px",
                  minHeight: "340px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className=" px-6 h-[38px] rounded-[30px] bg_Button font-[600]"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="w-[668px] rounded-lg">
          <div className="w-[500px] bg-gray p-6 rounded-lg shadow-lg">
            <div className="bg-white p-6 rounded-lg">
              <p className="text-sm font-medium text-gray-800">
                <span className="text-base font-semibold">Subject:</span>{" "}
                {subject}
              </p>
              <hr className="my-4 border-gray-300" />
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTemplate;
