import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index() {
  const router = useRouter();
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
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/api/getTemplates/${userDataGlobal._id}`
      );
      const result = await response.json();

      if (response.ok) {
        result.templates.forEach((template) => {
          if (template.templateType === "shortlist") {
            console.log("Shortlist Template Found:", template);
            setShortlistSubject(template?.tempData?.subject || "No Subject");
            setShortlistContent(template?.tempData?.content || "No Content");
          } else if (template.templateType === "reject") {
            console.log("Reject Template Found:", template);
            setRejectedSubject(template?.tempData?.subject || "No Subject");
            setRejectedContent(template?.tempData?.content || "No Content");
          }
        });
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

  return (
    <div>
      <div className="text-[18px] font-[600]">Template</div>
      <div className="flex gap-[36px] pt-[16px]">
        <div className="flex flex-col gap-[8px] ">
          <div className="flex gap-[6px]">
            <div className="flex h-[256px] w-[192px]  rounded-[6px] flex-col p-3 gap-1 bg-[#FFFFFF] ">
              <p className=" break-words text-[6px]">{shortlistSubject}</p>
              <div className="w-full max-h-[0.2px] min-h-[0.2px]  bg-[#DEDEDE]"></div>
              <div
                className=" break-words text-[7px]"
                dangerouslySetInnerHTML={{
                  __html: shortlistContent,
                }}
              />
            </div>
            <div
              className="flex h-[26px] w-[26px] justify-center items-center bg-[#FFFFFF] rounded-[4px] cursor-pointer "
              onClick={() => {
                router.push(`/template/editTemplate?isShortlist=true`);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 12.25H2.81875L10.15 4.91875L9.08125 3.85L1.75 11.1812V12.25ZM0.25 13.75V10.5625L10.15 0.68125C10.3 0.54375 10.4656 0.4375 10.6469 0.3625C10.8281 0.2875 11.0188 0.25 11.2188 0.25C11.4187 0.25 11.6125 0.2875 11.8 0.3625C11.9875 0.4375 12.15 0.55 12.2875 0.7L13.3188 1.75C13.4688 1.8875 13.5781 2.05 13.6469 2.2375C13.7156 2.425 13.75 2.6125 13.75 2.8C13.75 3 13.7156 3.19062 13.6469 3.37187C13.5781 3.55312 13.4688 3.71875 13.3188 3.86875L3.4375 13.75H0.25ZM9.60625 4.39375L9.08125 3.85L10.15 4.91875L9.60625 4.39375Z"
                  fill="#646464"
                />
              </svg>
            </div>
          </div>
          <div className="text-[14px] font-[500] flex pl-[46px]">
            Shortlisted
          </div>
        </div>
        <div className="flex flex-col gap-[8px] ">
          <div className="flex gap-[6px]">
            <div className="flex h-[256px] w-[192px] overflow-auto scrollbar-hide   rounded-[6px] flex-col p-3 gap-1 bg-[#FFFFFF] ">
              <p className=" break-words text-[6px]">{rejectedSubject}</p>
              <div className="w-full max-h-[0.2px] min-h-[0.2px]  bg-[#DEDEDE]"></div>
              <div
                className=" break-words text-[7px]"
                dangerouslySetInnerHTML={{
                  __html: rejectedContent,
                }}
              />
            </div>{" "}
            <div
              className="flex h-[26px] w-[26px] justify-center items-center bg-[#FFFFFF] rounded-[4px] cursor-pointer "
              onClick={() => {
                router.push(`/template/editTemplate?isReject=true`);
              }}
            >
              <svg
                width="14"
                height="14"
                f
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 12.25H2.81875L10.15 4.91875L9.08125 3.85L1.75 11.1812V12.25ZM0.25 13.75V10.5625L10.15 0.68125C10.3 0.54375 10.4656 0.4375 10.6469 0.3625C10.8281 0.2875 11.0188 0.25 11.2188 0.25C11.4187 0.25 11.6125 0.2875 11.8 0.3625C11.9875 0.4375 12.15 0.55 12.2875 0.7L13.3188 1.75C13.4688 1.8875 13.5781 2.05 13.6469 2.2375C13.7156 2.425 13.75 2.6125 13.75 2.8C13.75 3 13.7156 3.19062 13.6469 3.37187C13.5781 3.55312 13.4688 3.71875 13.3188 3.86875L3.4375 13.75H0.25ZM9.60625 4.39375L9.08125 3.85L10.15 4.91875L9.60625 4.39375Z"
                  fill="#646464"
                />
              </svg>
            </div>
          </div>
          <div className="text-[14px] font-[500] flex pl-[46px]">Rejected</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
