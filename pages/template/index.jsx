import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index() {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const handlePreview = (content) => {
    setPreviewContent(content);
    setIsPreviewOpen(true);
  };

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
        `https://jamblix.com/api/getTemplates/${userDataGlobal?._id}`
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
    if (userDataGlobal?._id) {
      fetchTemplates();
    }
  }, [userDataGlobal?._id]);

  return (
    <div>
      <div className="text-[18px] font-[600]">Template</div>
      <div className="flex gap-[36px] pt-[16px] sm:flex-row flex-col sm:items-start items-center">
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[6px]">
            <div className="relative flex h-[256px] w-[192px] rounded-[6px] flex-col p-3 gap-1 bg-[#FFFFFF] overflow-hidden group">
              <p className="break-words text-[6px]">{shortlistSubject}</p>
              <div className="w-full max-h-[0.2px] min-h-[0.2px] bg-[#DEDEDE]"></div>
              <div
                className="break-words text-[7px]"
                dangerouslySetInnerHTML={{
                  __html: shortlistContent,
                }}
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center justify-center gap-2 bg-[#333333] rounded-[16px]">
                  <button
                    onClick={() => handlePreview(shortlistContent)}
                    className="flex flex-col items-center justify-center p-2 gap-2 w-[80px]"
                  >
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0028 11.5769C12.1359 11.5769 13.0983 11.1803 13.89 10.3871C14.6816 9.59394 15.0775 8.6308 15.0775 7.4977C15.0775 6.36462 14.6809 5.40224 13.8877 4.61058C13.0945 3.81891 12.1314 3.42308 10.9983 3.42308C9.8652 3.42308 8.90283 3.81966 8.11116 4.61283C7.3195 5.40601 6.92366 6.36915 6.92366 7.50225C6.92366 8.63533 7.32025 9.59771 8.11341 10.3894C8.9066 11.181 9.86974 11.5769 11.0028 11.5769ZM11.0006 10.2C10.2506 10.2 9.61306 9.93748 9.08806 9.41248C8.56306 8.88748 8.30056 8.24998 8.30056 7.49998C8.30056 6.74998 8.56306 6.11248 9.08806 5.58748C9.61306 5.06248 10.2506 4.79998 11.0006 4.79998C11.7506 4.79998 12.3881 5.06248 12.9131 5.58748C13.4381 6.11248 13.7006 6.74998 13.7006 7.49998C13.7006 8.24998 13.4381 8.88748 12.9131 9.41248C12.3881 9.93748 11.7506 10.2 11.0006 10.2ZM11.0019 14.5C8.70232 14.5 6.60699 13.8657 4.71596 12.5971C2.82495 11.3285 1.43265 9.62946 0.539062 7.49998C1.43265 5.37049 2.8245 3.67146 4.71461 2.40288C6.60471 1.13429 8.69957 0.5 10.9992 0.5C13.2988 0.5 15.3941 1.13429 17.2852 2.40288C19.1762 3.67146 20.5685 5.37049 21.4621 7.49998C20.5685 9.62946 19.1766 11.3285 17.2865 12.5971C15.3964 13.8657 13.3016 14.5 11.0019 14.5ZM11.0006 13C12.8839 13 14.6131 12.5041 16.1881 11.5125C17.7631 10.5208 18.9672 9.18331 19.8006 7.49998C18.9672 5.81664 17.7631 4.47914 16.1881 3.48748C14.6131 2.49581 12.8839 1.99998 11.0006 1.99998C9.11723 1.99998 7.38806 2.49581 5.81306 3.48748C4.23806 4.47914 3.0339 5.81664 2.20056 7.49998C3.0339 9.18331 4.23806 10.5208 5.81306 11.5125C7.38806 12.5041 9.11723 13 11.0006 13Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-[12px] font-[600] text-[white]">
                      Preview
                    </span>
                  </button>
                  <div className=" border-[1px] border-[#FFFFFF80] w-[50px]"></div>
                  <button
                    onClick={() => {
                      router.push(`/template/editTemplate?isShortlist=true`);
                    }}
                    className="flex flex-col items-center justify-center p-2 gap-2 text-black w-[80px]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_9618_112303)">
                        <path
                          d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z"
                          fill="white"
                        />
                      </g>
                    </svg>

                    <span className="text-[12px] font-[600] text-[white]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-[500] flex pl-[46px]">
            Shortlisted
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[6px]">
            <div className="relative flex h-[256px] w-[192px] rounded-[6px] flex-col p-3 gap-1 bg-[#FFFFFF] overflow-hidden group">
              <p className="break-words text-[6px]">{rejectedSubject}</p>
              <div className="w-full max-h-[0.2px] min-h-[0.2px] bg-[#DEDEDE]"></div>
              <div
                className="break-words text-[7px]"
                dangerouslySetInnerHTML={{
                  __html: rejectedContent,
                }}
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center justify-center gap-2 bg-[#333333] rounded-[16px]">
                  <button
                    onClick={() => handlePreview(rejectedContent)}
                    className="flex flex-col items-center justify-center p-2 gap-2 w-[80px]"
                  >
                    <svg
                      width="22"
                      height="15"
                      viewBox="0 0 22 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0028 11.5769C12.1359 11.5769 13.0983 11.1803 13.89 10.3871C14.6816 9.59394 15.0775 8.6308 15.0775 7.4977C15.0775 6.36462 14.6809 5.40224 13.8877 4.61058C13.0945 3.81891 12.1314 3.42308 10.9983 3.42308C9.8652 3.42308 8.90283 3.81966 8.11116 4.61283C7.3195 5.40601 6.92366 6.36915 6.92366 7.50225C6.92366 8.63533 7.32025 9.59771 8.11341 10.3894C8.9066 11.181 9.86974 11.5769 11.0028 11.5769ZM11.0006 10.2C10.2506 10.2 9.61306 9.93748 9.08806 9.41248C8.56306 8.88748 8.30056 8.24998 8.30056 7.49998C8.30056 6.74998 8.56306 6.11248 9.08806 5.58748C9.61306 5.06248 10.2506 4.79998 11.0006 4.79998C11.7506 4.79998 12.3881 5.06248 12.9131 5.58748C13.4381 6.11248 13.7006 6.74998 13.7006 7.49998C13.7006 8.24998 13.4381 8.88748 12.9131 9.41248C12.3881 9.93748 11.7506 10.2 11.0006 10.2ZM11.0019 14.5C8.70232 14.5 6.60699 13.8657 4.71596 12.5971C2.82495 11.3285 1.43265 9.62946 0.539062 7.49998C1.43265 5.37049 2.8245 3.67146 4.71461 2.40288C6.60471 1.13429 8.69957 0.5 10.9992 0.5C13.2988 0.5 15.3941 1.13429 17.2852 2.40288C19.1762 3.67146 20.5685 5.37049 21.4621 7.49998C20.5685 9.62946 19.1766 11.3285 17.2865 12.5971C15.3964 13.8657 13.3016 14.5 11.0019 14.5ZM11.0006 13C12.8839 13 14.6131 12.5041 16.1881 11.5125C17.7631 10.5208 18.9672 9.18331 19.8006 7.49998C18.9672 5.81664 17.7631 4.47914 16.1881 3.48748C14.6131 2.49581 12.8839 1.99998 11.0006 1.99998C9.11723 1.99998 7.38806 2.49581 5.81306 3.48748C4.23806 4.47914 3.0339 5.81664 2.20056 7.49998C3.0339 9.18331 4.23806 10.5208 5.81306 11.5125C7.38806 12.5041 9.11723 13 11.0006 13Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-[12px] font-[600] text-[white]">
                      Preview
                    </span>
                  </button>
                  <div className=" border-[1px] border-[#FFFFFF80] w-[50px]"></div>
                  <button
                    onClick={() => {
                      router.push(`/template/editTemplate?isReject=true`);
                    }}
                    className="flex flex-col items-center justify-center p-2 gap-2 text-black w-[80px]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_9618_112303)">
                        <path
                          d="M4.99997 19H6.2615L16.4981 8.7634L15.2366 7.50188L4.99997 17.7385V19ZM3.5 20.5V17.1154L16.6904 3.93078C16.8416 3.79343 17.0086 3.68729 17.1913 3.61237C17.374 3.53746 17.5656 3.5 17.7661 3.5C17.9666 3.5 18.1608 3.53558 18.3488 3.60675C18.5368 3.6779 18.7032 3.79103 18.848 3.94615L20.0692 5.18268C20.2243 5.32754 20.3349 5.49424 20.4009 5.68278C20.4669 5.87129 20.5 6.05981 20.5 6.24833C20.5 6.44941 20.4656 6.64131 20.3969 6.82403C20.3283 7.00676 20.219 7.17373 20.0692 7.32495L6.88458 20.5H3.5ZM15.8563 8.1437L15.2366 7.50188L16.4981 8.7634L15.8563 8.1437Z"
                          fill="white"
                        />
                      </g>
                    </svg>

                    <span className="text-[12px] font-[600] text-[white]">
                      Edit
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-[500] flex pl-[46px]">Rejected</div>
        </div>
      </div>
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-[450px] h-[450px] relative animate-fadeIn">
            <div className="text-[20px] font-semibold text-gray-800 mb-4"></div>

            <div
              className="text-[14px] break-words text-gray-600 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            />

            <button
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 transition duration-200"
              onClick={() => setIsPreviewOpen(false)}
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99735 11.1271L3.50485 17.6191C3.21518 17.9091 2.86402 18.0508 2.45135 18.0441C2.03835 18.0378 1.68702 17.8898 1.39735 17.6001C1.10768 17.3104 0.96285 16.9559 0.96285 16.5366C0.96285 16.1173 1.10768 15.7628 1.39735 15.4731L7.87035 9.0001L1.37835 2.5576C1.08835 2.26793 0.946683 1.91343 0.95335 1.4941C0.959683 1.0751 1.10768 0.720761 1.39735 0.431094C1.68702 0.141094 2.04152 -0.00390625 2.46085 -0.00390625C2.88018 -0.00390625 3.23468 0.141094 3.52435 0.431094L9.99735 6.9231L16.4398 0.431094C16.7295 0.141094 17.0807 -0.00390625 17.4933 -0.00390625C17.9063 -0.00390625 18.2577 0.141094 18.5473 0.431094C18.8577 0.741095 19.0128 1.10059 19.0128 1.5096C19.0128 1.9186 18.8577 2.26793 18.5473 2.5576L12.0743 9.0001L18.5663 15.4926C18.8563 15.7823 19.0013 16.1334 19.0013 16.5461C19.0013 16.9591 18.8563 17.3104 18.5663 17.6001C18.2563 17.9104 17.8968 18.0656 17.4878 18.0656C17.0788 18.0656 16.7295 17.9104 16.4398 17.6001L9.99735 11.1271Z"
                  fill="#333333"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
