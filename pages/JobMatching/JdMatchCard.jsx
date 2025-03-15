import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/mini-loader";
import { useSelector } from "react-redux";
import axios from "axios";
import Tesseract from "tesseract.js";
import PizZip from "pizzip";
import { pdfjs } from "react-pdf";
import Docxtemplater from "docxtemplater";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function JdMatchCard({
  resumeList,
  extratctedData,
  setTab,
  setUserDetails,
  addApplicant,
  hiringLoading,
  jobData,
  jdApplicantFileNames,
  fromSkilotechCollection
}) {
  const router = useRouter();
  const[parentId,setParentId] = useState()
  console.log(parentId)
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const downloadResume = (resumeUrl) => {
    if (resumeUrl) {
      const link = document.createElement("a");
      link.href = resumeUrl; // URL of the resume
      link.download = "Resume.pdf"; // Default name of the downloaded file
      document.body.appendChild(link); // Append the link to the document body
      link.click(); // Trigger the click event
      document.body.removeChild(link); // Clean up by removing the link
    } else {
      toast.error("Resume URL is not available.");
    }
  };

 
 const fetchFolder = async () => {
  try {
    const response = await axios.get(`https://dev.api.skilotech.com/api/getSkilotechFolder/${userDataGlobal?._id}`);
    setParentId(response?.data?._id);
  } catch (error) {
    console.error("Error fetching folder:", error);
    throw error;
  }
};
useEffect(()=>{

  fetchFolder()

},[resumeList])

const fetchPDFFromURL = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob', 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw new Error("Failed to fetch the PDF file.");
  }
};
 const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }
const parseData = (file) => {
  

  return new Promise((resolve, reject) => {
    if (file.type === "application/pdf") {
      const textDataPromises = [];
      const promise = fileToText(file, 1).then((text) => {
        return { text };
      });

      textDataPromises.push(promise);

      Promise.all(textDataPromises)
        .then((results) => {
          resolve(results.filter((result) => result.text.length > 0));
        })
        .catch(reject);
    } else {
      reject(new Error("The provided file is not a PDF."));
    }
  });
};


const parsePDFFileFromURL = async (url) => {
  try {
    const file = await fetchPDFFromURL(url);
    const fileObject = new Blob([file], { type: 'application/pdf' });

    const data = await parseData(fileObject);
    console.log("Extracted Text:", data);

    return data[0].text; 
  } catch (error) {
    console.error("Error processing the PDF:", error);
    return null; 
  }
};


const addData = async (file) => {
  const extractedText = await parsePDFFileFromURL(file.file);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const payload = {
          fileName: file?.fileName,
          type: "file",
          userId: userDataGlobal?._id,
          text: extractedText,
          file: file?.file,
          job: jobData || "",
        };

        const response = await axios.post(
          "https://dev.api.skilotech.com/api/folder/addFileToSkilotechCollection",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.message === "This file is already Saved") {
          toast.info("This file is already Saved");
        } else {
          toast.success("Successfully Saved to Skilotech Collection");
        }

        resolve(response.data);
      } catch (e) {
        console.error("Error adding file:", e);
        toast.error("Failed to save file");
        reject(e);
      }
    }, 200);
  });
};




  return (
    <div className="w-full flex flex-col gap-[16px] border border-[#06A9EF] rounded-[16px] scr390:px-4 scr390:py-4 px-2 py-4 bg-white ">
      <div className="text-[18px] font-[500]">
        {resumeList.length} results found for {extratctedData?.jobTitle}
      </div>

      {resumeList &&
        resumeList?.map((user, index) => (
          <div
            key={index}
            className="  justify-between scr390:p-4  p-3 rounded-[16px] gap-4 bg-white flex scr1024:flex-row flex-col items-start "
            style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
          >
            <div className="flex flex-col gap-4 scr1300:w-[380px]">
              <div className="flex items-start gap-[22px]">
                <img
                  className="max-w-[96px] max-h-[96px] rounded-full  p-1 object-cover"
                  src={"/images/profile/profileNew.png"}
                  alt=""
                />

                <div className="h-[96px] min-w-[124px] flex flex-col gap-[12px] justify-center">
                  <div className="text-[16px] font-[600]">{user?.name}</div>
                  <div className="text-[14px] font-[400]">
                    {user?.designation}
                  </div>
                  {/* {user?.rating &&
                                    <div className="flex items-center  gap-[8px]">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="min-w-[20px]"
                                        >
                                            <path
                                                d="M19.2831 7.27657L13.3323 6.41173L10.6722 1.01876C10.5995 0.871102 10.48 0.751571 10.3323 0.678915C9.96199 0.496102 9.51199 0.648446 9.32684 1.01876L6.66668 6.41173L0.715901 7.27657C0.551838 7.30001 0.401838 7.37735 0.286995 7.49454C0.148155 7.63724 0.0716479 7.82923 0.0742847 8.02831C0.0769216 8.22739 0.158487 8.41728 0.301057 8.55626L4.60653 12.7539L3.58934 18.6813C3.56549 18.8191 3.58074 18.961 3.63338 19.0906C3.68602 19.2203 3.77394 19.3326 3.88716 19.4148C4.00038 19.497 4.13437 19.5459 4.27395 19.5558C4.41352 19.5658 4.5531 19.5364 4.67684 19.4711L9.99949 16.6727L15.3222 19.4711C15.4675 19.5484 15.6362 19.5742 15.7979 19.5461C16.2057 19.4758 16.48 19.0891 16.4097 18.6813L15.3925 12.7539L19.6979 8.55626C19.8151 8.44142 19.8925 8.29142 19.9159 8.12735C19.9792 7.7172 19.6932 7.33751 19.2831 7.27657Z"
                                                fill="#FFB836"
                                            />
                                        </svg>

                                        <div className="text-[16px] font-[400] flex items-center">
                                            {user?.rating}
                                        </div>
                                    </div>
                                } */}
                </div>
              </div>
              <div className="flex flex-col  gap-[8px] scr1300:w-[380px]">
                <div className="text-[16px] font-[600]">Contact</div>
                {user?.email && (
                  <div className="flex items-center gap-[8px]">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_95549)">
                        <path
                          d="M4.97176 19.5C4.46663 19.5 4.03906 19.325 3.68906 18.975C3.33906 18.625 3.16406 18.1974 3.16406 17.6923V6.3077C3.16406 5.80257 3.33906 5.375 3.68906 5.025C4.03906 4.675 4.46663 4.5 4.97176 4.5H20.3563C20.8614 4.5 21.289 4.675 21.639 5.025C21.989 5.375 22.164 5.80257 22.164 6.3077V17.6923C22.164 18.1974 21.989 18.625 21.639 18.975C21.289 19.325 20.8614 19.5 20.3563 19.5H4.97176ZM12.664 12.5576L4.66404 7.44225V17.6923C4.66404 17.782 4.69289 17.8557 4.75059 17.9134C4.80829 17.9711 4.88201 18 4.97176 18H20.3563C20.4461 18 20.5198 17.9711 20.5775 17.9134C20.6352 17.8557 20.664 17.782 20.664 17.6923V7.44225L12.664 12.5576ZM12.664 11L20.5102 5.99998H4.81789L12.664 11ZM4.66404 7.44225V5.99998V17.6923C4.66404 17.782 4.69289 17.8557 4.75059 17.9134C4.80829 17.9711 4.88201 18 4.97176 18H4.66404V7.44225Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <div className="text-[14px] font-[400]">{user?.email}</div>
                  </div>
                )}
                {user?.Mobile && (
                  <div className="flex items-center gap-[8px]">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_95554)">
                        <path
                          d="M20.1044 20.5C18.2198 20.5 16.3265 20.0618 14.4246 19.1855C12.5227 18.3092 10.7753 17.073 9.18234 15.4769C7.58939 13.8807 6.35477 12.1333 5.47849 10.2346C4.6022 8.33588 4.16406 6.44423 4.16406 4.55963C4.16406 4.25688 4.26406 4.00458 4.46406 3.80275C4.66406 3.60092 4.91406 3.5 5.21406 3.5H8.47556C8.72813 3.5 8.95089 3.58238 9.14384 3.74713C9.33679 3.91188 9.45954 4.1154 9.51209 4.3577L10.0852 7.29998C10.1249 7.57306 10.1166 7.80768 10.0602 8.00383C10.0038 8.19998 9.90248 8.36472 9.75631 8.49805L7.44671 10.7461C7.81851 11.4269 8.2432 12.0708 8.72076 12.6779C9.19833 13.2849 9.71531 13.8647 10.2717 14.4173C10.8204 14.966 11.4038 15.4756 12.0217 15.9462C12.6397 16.4167 13.307 16.8545 14.0237 17.2596L16.2679 14.9962C16.4243 14.8333 16.6137 14.7192 16.8362 14.6539C17.0586 14.5885 17.2897 14.5724 17.5294 14.6058L20.3063 15.1712C20.5589 15.2378 20.765 15.3667 20.9246 15.5577C21.0842 15.7487 21.164 15.9654 21.164 16.2077V19.45C21.164 19.75 21.0631 20 20.8613 20.2C20.6594 20.4 20.4071 20.5 20.1044 20.5ZM6.73711 9.32693L8.52174 7.61923C8.55379 7.59358 8.57462 7.55832 8.58424 7.51345C8.59385 7.46857 8.59225 7.4269 8.57944 7.38845L8.14481 5.15383C8.132 5.10254 8.10956 5.06408 8.07751 5.03845C8.04546 5.0128 8.0038 4.99998 7.95251 4.99998H5.81404C5.77559 4.99998 5.74354 5.0128 5.71789 5.03845C5.69224 5.06408 5.67941 5.09613 5.67941 5.1346C5.7307 5.81793 5.84255 6.51217 6.01499 7.2173C6.18744 7.92243 6.42815 8.62564 6.73711 9.32693ZM15.4371 17.9692C16.0999 18.2782 16.7913 18.5144 17.5111 18.6779C18.231 18.8413 18.9038 18.9384 19.5294 18.9692C19.5679 18.9692 19.5999 18.9564 19.6256 18.9308C19.6512 18.9051 19.664 18.873 19.664 18.8346V16.7308C19.664 16.6795 19.6512 16.6378 19.6256 16.6057C19.5999 16.5737 19.5615 16.5512 19.5102 16.5384L17.4102 16.1115C17.3717 16.0987 17.3381 16.0971 17.3092 16.1067C17.2804 16.1163 17.2499 16.1372 17.2179 16.1692L15.4371 17.9692Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <div className="text-[14px] font-[400]">{user?.Mobile}</div>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-[8px]">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_95559)">
                        <path
                          d="M12.6669 11.8654C13.1645 11.8654 13.5899 11.6882 13.9431 11.3339C14.2963 10.9795 14.4729 10.5536 14.4729 10.056C14.4729 9.55839 14.2957 9.133 13.9414 8.7798C13.5871 8.4266 13.1611 8.25 12.6635 8.25C12.166 8.25 11.7406 8.42717 11.3874 8.7815C11.0342 9.13583 10.8576 9.56179 10.8576 10.0594C10.8576 10.557 11.0347 10.9824 11.3891 11.3356C11.7434 11.6888 12.1694 11.8654 12.6669 11.8654ZM12.6652 19.5135C14.6216 17.7622 16.1188 16.0824 17.1566 14.474C18.1944 12.8657 18.7133 11.457 18.7133 10.2481C18.7133 8.42498 18.1341 6.92627 16.9758 5.7519C15.8175 4.57753 14.3806 3.99035 12.6652 3.99035C10.9499 3.99035 9.513 4.57753 8.35466 5.7519C7.19633 6.92627 6.61716 8.42498 6.61716 10.2481C6.61716 11.457 7.13607 12.8657 8.17389 14.474C9.21172 16.0824 10.7088 17.7622 12.6652 19.5135ZM12.6652 21.5096C10.1486 19.3288 8.26141 17.2993 7.00371 15.4211C5.74603 13.5429 5.11719 11.8186 5.11719 10.2481C5.11719 7.94038 5.86366 6.07213 7.35661 4.64328C8.84955 3.21443 10.6191 2.5 12.6652 2.5C14.7114 2.5 16.4809 3.21443 17.9739 4.64328C19.4668 6.07213 20.2133 7.94038 20.2133 10.2481C20.2133 11.8186 19.5844 13.5429 18.3268 15.4211C17.0691 17.2993 15.1819 19.3288 12.6652 21.5096Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <div className="text-[14px] font-[400]">
                      {user?.location}
                    </div>
                  </div>
                )}
                {user?.totalExperience && (
                  <div className="flex items-center gap-[8px]">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_95569)">
                        <path
                          d="M4.97176 20.4999C4.46663 20.4999 4.03906 20.3249 3.68906 19.9749C3.33906 19.6249 3.16406 19.1973 3.16406 18.6922V8.30765C3.16406 7.80252 3.33906 7.37495 3.68906 7.02495C4.03906 6.67495 4.46663 6.49995 4.97176 6.49995H9.16406V4.80768C9.16406 4.30256 9.33906 3.875 9.68906 3.525C10.0391 3.175 10.4666 3 10.9718 3H14.3563C14.8614 3 15.289 3.175 15.639 3.525C15.989 3.875 16.164 4.30256 16.164 4.80768V6.49995H20.3563C20.8614 6.49995 21.289 6.67495 21.639 7.02495C21.989 7.37495 22.164 7.80252 22.164 8.30765V18.6922C22.164 19.1973 21.989 19.6249 21.639 19.9749C21.289 20.3249 20.8614 20.4999 20.3563 20.4999H4.97176ZM10.664 6.49995H14.664V4.80768C14.664 4.73074 14.632 4.66023 14.5679 4.59613C14.5038 4.53201 14.4332 4.49995 14.3563 4.49995H10.9718C10.8948 4.49995 10.8243 4.53201 10.7602 4.59613C10.6961 4.66023 10.664 4.73074 10.664 4.80768V6.49995ZM20.664 14.7499H15.164V16.4999H10.1641V14.7499H4.66404V18.6922C4.66404 18.7691 4.69609 18.8397 4.76019 18.9038C4.8243 18.9679 4.89483 18.9999 4.97176 18.9999H20.3563C20.4332 18.9999 20.5038 18.9679 20.5679 18.9038C20.632 18.8397 20.664 18.7691 20.664 18.6922V14.7499ZM11.664 14.9999H13.664V12.9999H11.664V14.9999ZM4.66404 13.25H10.1641V11.5H15.164V13.25H20.664V8.30765C20.664 8.23072 20.632 8.16019 20.5679 8.09608C20.5038 8.03198 20.4332 7.99993 20.3563 7.99993H4.97176C4.89483 7.99993 4.8243 8.03198 4.76019 8.09608C4.69609 8.16019 4.66404 8.23072 4.66404 8.30765V13.25Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>

                    <div className="text-[14px] font-[400]">
                      {user?.totalExperience}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {user?.matching_parameters?.length > 0 && (
              <div className="flex flex-col gap-[8px] min-h-[157px] justify-top relative w-full ">
                <span className="text-[#333333] text-[16px] font-semibold ">
                  Matching Parameters
                </span>
                <div className="flex flex-col gap-[8px] ">
                  {user?.matching_parameters?.slice(0, 5)?.map((item, i) => (
                    <div
                      key={i}
                      className="text-[#333333]  flex  items-start gap-[8px] text-[14px] font-[400]"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-[6px] min-w-[10px]"
                      >
                        <circle cx="5" cy="5" r="5" fill="#D9D9D9" />
                      </svg>
                      {item.title}{" "}
                      {item.matching_points == "N/A"
                        ? null
                        : ": " + item.matching_points}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[20px] scr1300:min-w-[386px] scr390:min-w-[300px] ">
              {fromSkilotechCollection && 
                <p onClick={()=>addData(user)} className=" cursor-pointer w-full text-center text-blue text-[14px] font-[600]">Save to My Collection</p>
              }
              <div className=" flex items-center h-[70px] justify-center border-[1px] border-[#06A9EF] rounded-[12px] gap-[24px] px-2">
                <div className="text-[18px] font-[500] justify-center">
                  Profile Match Score
                </div>
                <div className="text-[26px] font-[500]">
                  {user.matching_percentage}
                </div>
              </div>
              <div
                onClick={() => downloadResume(user?.file)}
                className=" h-[66px] rounded-[12px] w-full flex  "
              >
                <div className="w-[51px] flex h-[66px] rounded-tl-[12px] rounded-bl-[12px] bg-[#C00000] items-center justify-center">
                  <span className="flex items-center justify-center text-[14px] font-[600] text-[#FFFFFF]">
                    PDF
                  </span>
                </div>
                <div className="scr1300:w-[334px]  justify-center flex flex-col border border-[#DEDEDE] rounded-r-[12px] w-full">
                  <div className="px-[16px]  flex flex-col ">
                    <div className="text-[14px] font-[500]">
                     
                      {user?.fileName?.length > 20 ? user?.fileName?.slice(0, 20) + "..." : user?.fileName}
                      <br />
                      (Default)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex scr390:flex-row flex-col gap-[16px] items-center">
                <div
                  onClick={() => {
                    setTab(1);
                    setUserDetails(user);
                  }}
                  className="flex justify-center scr1300:w-[190.8px] w-full scr1300:min-w-[190px] min-w-[140px] cursor-pointer py-[12px] scr1300:px-[36px] px-3 border-[1px] border-[#06A9EF] rounded-[30px]"
                >
                  <button className="text-[14px] font-[600] ">
                    See Application
                  </button>
                </div>
                <div className="  w-full ">
                  {jobData?.applications?.some(
                    (item) => item?.fileName === user?.fileName
                  ) || jdApplicantFileNames?.includes(user?.fileName) ? (
                    <p className="text-[14px] font-semibold text-[#0C8A0A]">
                      Moved to Hiring
                    </p>
                  ) : (
                    // hiringLoading ? (
                    //     <div className="text-[14px] font-[600] text-white py-[12px] px-[36px] bg-[#06A9EF] rounded-[30px] flex justify-center items-center w-[177.8px]"
                    //     >
                    //         <MiniLoader />
                    //     </div>
                    // ) :
                    <button
                      onClick={() => addApplicant(user)}
                      disabled={hiringLoading}
                      className="text-[14px] font-[600] text-white py-[12px] scr1300:px-[36px] px-4 bg-[#06A9EF] rounded-[30px] flex justify-center items-center scr1300:w-[177.8px] scr390:w-[140px] w-full"
                    >
                      Move to Hiring
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default JdMatchCard;
