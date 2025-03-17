import React, { useEffect, useRef, useState } from "react";
import HiringProgress from "../../components/featured/employer/HiringProgress";
import { useRouter } from "next/router";

import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import MiniLoader from "../../components/common/mini-loader";
import MiniLoaderr from "../../components/common/miniLoader";
import InlineSVG from "../../components/common/InlineSvg";

function ApplicantDetails({ setTogglee, userDetails, setTab, jobData, addApplicant, hiringLoading, jdApplicantFileNames, collection }) {
  const [toggle, setToggle] = useState("ApplicantProfile");
  const [activeOption, setActiveOption] = useState("ApplicantProfile");
  console.log(111,collection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loadingg, setLoadingg] = useState(true);
  const fileExtension = userDetails?.file?.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
  const isPDF = fileExtension === "pdf";
  const isDoc = ["doc", "docx"].includes(fileExtension);


  // useEffect(() => {
  //   console.log("Fetching applicant details...");
  //   if (id && applicantId) {
  //     const fetchApplicantDetails = async () => {
  //       try {
  //         setLoading(true);
  //         console.log(
  //           "Requesting applicant details with id:",
  //           id,
  //           "applicantId:",
  //           applicantId
  //         );

  //         const response = await axios.get(
  //           "http://localhost:2000/api/applicantdetails",
  //           {
  //             params: { id, applicantId },
  //           }
  //         );

  //         console.log("API Response:", response.data.data);

  //         if (response.data) {
  //           setJobDetails(response.data.data);
  //         } else {
  //           setError("Applicant not found");
  //         }
  //       } catch (err) {
  //         console.log("Error occurred:", err);
  //         setError(err.response?.data?.message || err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchApplicantDetails();
  //   } else {
  //     console.log("Invalid id or applicantId:", id, applicantId);
  //   }
  // }, [id, applicantId]);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setToggle(option);
    setLoadingg(true)
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
    const [numPages, setNumPages] = useState(null);
    console.log(loadingg);
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
      setTimeout(() => {
        setLoadingg(false);
      }, 1000);
    };

    return (
      <div style={{
        // width: "168px",
        // height: "192px",
        border: "1px solid #06A9EF",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        overflow: "scroll",
        width: "600px",
        minHeight: "700px"
      }}
      >
        {loadingg && (
          <div className="skeleton-loader1  ">
            <div className="skeleton-image1"></div>
            <div className="skeleton-text1">
              <div className="skeleton-title1"></div>
              <div className="skeleton-subtitle1"></div>
              <div className="skeleton-line1"></div>
              <div className="skeleton-line1 short"></div>
              <div className="skeleton-line1 shorter"></div>
            </div>
          </div>
        )}

        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {!loadingg &&
            Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
      </div>
    );
  };
  const DocumentViewer = ({ fileUrl }) => {
    const [loading, setLoading] = useState(true);


    return (
      <div className="relative w-full">
        {loading && (
          <div className=" inset-0 flex items-center justify-center bg-gray-100 h-[300px]">
            <MiniLoaderr />
          </div>
        )}
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
          className="w-full h-[800px]"
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  };



  return (
    <div>

      <div className="flex flex-col gap-6 relative ">
        <div className=" flex w-full gap-3 justify-between rounded-[16px] items-center">
          <img
            onClick={() => setTab(0)}
            className="w-[24px] cursor-pointer"
            src="/images/employer/Icon_left.png"
            alt=""
          />
          <p className="text-[18px]  w-[100%] text-start flex justify-start font font-semibold  ">
            Applicant Details
          </p>
        </div>
        <div className="flex ml:flex-row flex-col gap-5   mb-4 ">
          <div className=" rounded-[16px] py-2 flex flex-col  scr1024:w-[32.26%] ml:w-[40%] w-[100%] bg-white ">
            {userDetails && (
              <div className="flex flex-col gap-6 scr420:px-6 px-3 scr420:py-4 py-3">

                <div className=" flex  gap-6">
                  <img
                    className="max-w-[96px] max-h-[96px] rounded-full  p-1 object-cover"

                    src={

                      "/images/profile/profileNew.png"
                    }
                    alt=""
                  />
                  <div className="w-[65%] flex flex-col gap-1 justify-center">
                    <p className="text-[16px]   text-start font-semibold  ">
                      {userDetails?.name}{" "}
                    </p>
                    <p className="text-[14px]   text-start text-[#646464]   font-normal  ">
                      {userDetails?.designation}
                    </p>
                    {/* <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21.2831 8.27584L15.3323 7.411L12.6722 2.01803C12.5995 1.87037 12.48 1.75084 12.3323 1.67818C11.962 1.49537 11.512 1.64771 11.3268 2.01803L8.66668 7.411L2.7159 8.27584C2.55184 8.29928 2.40184 8.37662 2.28699 8.49381C2.14815 8.63651 2.07165 8.8285 2.07428 9.02758C2.07692 9.22666 2.15849 9.41655 2.30106 9.55553L6.60653 13.7532L5.58934 19.6805C5.56549 19.8184 5.58074 19.9602 5.63338 20.0899C5.68602 20.2195 5.77394 20.3318 5.88716 20.4141C6.00038 20.4963 6.13437 20.5452 6.27395 20.5551C6.41352 20.5651 6.5531 20.5357 6.67684 20.4704L11.9995 17.6719L17.3222 20.4704C17.4675 20.5477 17.6362 20.5735 17.7979 20.5454C18.2057 20.4751 18.48 20.0883 18.4097 19.6805L17.3925 13.7532L21.6979 9.55553C21.8151 9.44068 21.8925 9.29068 21.9159 9.12662C21.9792 8.71646 21.6932 8.33678 21.2831 8.27584Z"
                          fill="#FFB836"
                        />
                      </svg>
                      <p className="text-[16px]    font-normal ">{userDetails?.totalExperience}</p>
                    </div> */}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="border border-[#06A9EF] rounded-[12px] scr420:px-9 px-4 py-3 gap-2 flex justify-center items-center">
                    <p className=" text-[16px] font-medium">  Profile Match Score</p>


                    <p className="text-[20px] font-medium">  {userDetails?.matching_percentage}</p>
                  </div>
                  {collection === "MyCollection" &&
                    <div className=" flex justify-center  ">
                      {
                        (jobData?.applications?.some((item) => item?.fileName === userDetails?.fileName) || jdApplicantFileNames?.includes(userDetails?.fileName)) ? (
                          <p className='text-[14px] font-semibold text-[#0C8A0A]'>Moved to Hiring</p>

                        ) : (
                          hiringLoading ? (
                            <div className="text-[14px] font-[600] text-white py-[12px] px-[36px] bg-[#06A9EF] rounded-[30px] text-center flex justify-center items-center w-full"
                            >
                              <MiniLoader />
                            </div>
                          ) :
                            <button
                              onClick={() => addApplicant(userDetails)}
                              className="text-[14px] font-[600] text-white py-[12px] px-[36px] bg-[#06A9EF] rounded-[30px] flex justify-center items-center w-full"
                            >
                              Move to Hiring
                            </button>
                        )
                      }

                    </div>
                  }
                </div>
                
                <div className="min-h-[1px] bg-[#D6DDEB]"></div>
                <div className="flex flex-col  gap-[8px] w-[380px]">
                  <div className="text-[16px] font-[600]">Contact</div>
                  {userDetails?.email &&
                    <div className="flex items-center gap-[8px]">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g mask="url(#mask0_6706_95549)">
                          <path d="M4.97176 19.5C4.46663 19.5 4.03906 19.325 3.68906 18.975C3.33906 18.625 3.16406 18.1974 3.16406 17.6923V6.3077C3.16406 5.80257 3.33906 5.375 3.68906 5.025C4.03906 4.675 4.46663 4.5 4.97176 4.5H20.3563C20.8614 4.5 21.289 4.675 21.639 5.025C21.989 5.375 22.164 5.80257 22.164 6.3077V17.6923C22.164 18.1974 21.989 18.625 21.639 18.975C21.289 19.325 20.8614 19.5 20.3563 19.5H4.97176ZM12.664 12.5576L4.66404 7.44225V17.6923C4.66404 17.782 4.69289 17.8557 4.75059 17.9134C4.80829 17.9711 4.88201 18 4.97176 18H20.3563C20.4461 18 20.5198 17.9711 20.5775 17.9134C20.6352 17.8557 20.664 17.782 20.664 17.6923V7.44225L12.664 12.5576ZM12.664 11L20.5102 5.99998H4.81789L12.664 11ZM4.66404 7.44225V5.99998V17.6923C4.66404 17.782 4.69289 17.8557 4.75059 17.9134C4.80829 17.9711 4.88201 18 4.97176 18H4.66404V7.44225Z" fill="#333333" />
                        </g>
                      </svg>


                      <div className="text-[14px] font-[400]">
                        {userDetails?.email}
                      </div>
                    </div>
                  }
                  {userDetails?.Mobile &&
                    <div className="flex items-center gap-[8px]">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g mask="url(#mask0_6706_95554)">
                          <path d="M20.1044 20.5C18.2198 20.5 16.3265 20.0618 14.4246 19.1855C12.5227 18.3092 10.7753 17.073 9.18234 15.4769C7.58939 13.8807 6.35477 12.1333 5.47849 10.2346C4.6022 8.33588 4.16406 6.44423 4.16406 4.55963C4.16406 4.25688 4.26406 4.00458 4.46406 3.80275C4.66406 3.60092 4.91406 3.5 5.21406 3.5H8.47556C8.72813 3.5 8.95089 3.58238 9.14384 3.74713C9.33679 3.91188 9.45954 4.1154 9.51209 4.3577L10.0852 7.29998C10.1249 7.57306 10.1166 7.80768 10.0602 8.00383C10.0038 8.19998 9.90248 8.36472 9.75631 8.49805L7.44671 10.7461C7.81851 11.4269 8.2432 12.0708 8.72076 12.6779C9.19833 13.2849 9.71531 13.8647 10.2717 14.4173C10.8204 14.966 11.4038 15.4756 12.0217 15.9462C12.6397 16.4167 13.307 16.8545 14.0237 17.2596L16.2679 14.9962C16.4243 14.8333 16.6137 14.7192 16.8362 14.6539C17.0586 14.5885 17.2897 14.5724 17.5294 14.6058L20.3063 15.1712C20.5589 15.2378 20.765 15.3667 20.9246 15.5577C21.0842 15.7487 21.164 15.9654 21.164 16.2077V19.45C21.164 19.75 21.0631 20 20.8613 20.2C20.6594 20.4 20.4071 20.5 20.1044 20.5ZM6.73711 9.32693L8.52174 7.61923C8.55379 7.59358 8.57462 7.55832 8.58424 7.51345C8.59385 7.46857 8.59225 7.4269 8.57944 7.38845L8.14481 5.15383C8.132 5.10254 8.10956 5.06408 8.07751 5.03845C8.04546 5.0128 8.0038 4.99998 7.95251 4.99998H5.81404C5.77559 4.99998 5.74354 5.0128 5.71789 5.03845C5.69224 5.06408 5.67941 5.09613 5.67941 5.1346C5.7307 5.81793 5.84255 6.51217 6.01499 7.2173C6.18744 7.92243 6.42815 8.62564 6.73711 9.32693ZM15.4371 17.9692C16.0999 18.2782 16.7913 18.5144 17.5111 18.6779C18.231 18.8413 18.9038 18.9384 19.5294 18.9692C19.5679 18.9692 19.5999 18.9564 19.6256 18.9308C19.6512 18.9051 19.664 18.873 19.664 18.8346V16.7308C19.664 16.6795 19.6512 16.6378 19.6256 16.6057C19.5999 16.5737 19.5615 16.5512 19.5102 16.5384L17.4102 16.1115C17.3717 16.0987 17.3381 16.0971 17.3092 16.1067C17.2804 16.1163 17.2499 16.1372 17.2179 16.1692L15.4371 17.9692Z" fill="#333333" />
                        </g>
                      </svg>

                      <div className="text-[14px] font-[400]">{userDetails?.Mobile}</div>
                    </div>
                  }
                  {userDetails?.location &&
                    <div className="flex items-center gap-[8px]">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g mask="url(#mask0_6706_95559)">
                          <path d="M12.6669 11.8654C13.1645 11.8654 13.5899 11.6882 13.9431 11.3339C14.2963 10.9795 14.4729 10.5536 14.4729 10.056C14.4729 9.55839 14.2957 9.133 13.9414 8.7798C13.5871 8.4266 13.1611 8.25 12.6635 8.25C12.166 8.25 11.7406 8.42717 11.3874 8.7815C11.0342 9.13583 10.8576 9.56179 10.8576 10.0594C10.8576 10.557 11.0347 10.9824 11.3891 11.3356C11.7434 11.6888 12.1694 11.8654 12.6669 11.8654ZM12.6652 19.5135C14.6216 17.7622 16.1188 16.0824 17.1566 14.474C18.1944 12.8657 18.7133 11.457 18.7133 10.2481C18.7133 8.42498 18.1341 6.92627 16.9758 5.7519C15.8175 4.57753 14.3806 3.99035 12.6652 3.99035C10.9499 3.99035 9.513 4.57753 8.35466 5.7519C7.19633 6.92627 6.61716 8.42498 6.61716 10.2481C6.61716 11.457 7.13607 12.8657 8.17389 14.474C9.21172 16.0824 10.7088 17.7622 12.6652 19.5135ZM12.6652 21.5096C10.1486 19.3288 8.26141 17.2993 7.00371 15.4211C5.74603 13.5429 5.11719 11.8186 5.11719 10.2481C5.11719 7.94038 5.86366 6.07213 7.35661 4.64328C8.84955 3.21443 10.6191 2.5 12.6652 2.5C14.7114 2.5 16.4809 3.21443 17.9739 4.64328C19.4668 6.07213 20.2133 7.94038 20.2133 10.2481C20.2133 11.8186 19.5844 13.5429 18.3268 15.4211C17.0691 17.2993 15.1819 19.3288 12.6652 21.5096Z" fill="#333333" />
                        </g>
                      </svg>

                      {userDetails?.location &&
                        <div className="text-[14px] font-[400]">
                          {userDetails?.location}
                        </div>
                      }
                    </div>
                  }
                  {userDetails?.totalExperience &&
                    <div className="flex items-center gap-[8px]">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g mask="url(#mask0_6706_95569)">
                          <path d="M4.97176 20.4999C4.46663 20.4999 4.03906 20.3249 3.68906 19.9749C3.33906 19.6249 3.16406 19.1973 3.16406 18.6922V8.30765C3.16406 7.80252 3.33906 7.37495 3.68906 7.02495C4.03906 6.67495 4.46663 6.49995 4.97176 6.49995H9.16406V4.80768C9.16406 4.30256 9.33906 3.875 9.68906 3.525C10.0391 3.175 10.4666 3 10.9718 3H14.3563C14.8614 3 15.289 3.175 15.639 3.525C15.989 3.875 16.164 4.30256 16.164 4.80768V6.49995H20.3563C20.8614 6.49995 21.289 6.67495 21.639 7.02495C21.989 7.37495 22.164 7.80252 22.164 8.30765V18.6922C22.164 19.1973 21.989 19.6249 21.639 19.9749C21.289 20.3249 20.8614 20.4999 20.3563 20.4999H4.97176ZM10.664 6.49995H14.664V4.80768C14.664 4.73074 14.632 4.66023 14.5679 4.59613C14.5038 4.53201 14.4332 4.49995 14.3563 4.49995H10.9718C10.8948 4.49995 10.8243 4.53201 10.7602 4.59613C10.6961 4.66023 10.664 4.73074 10.664 4.80768V6.49995ZM20.664 14.7499H15.164V16.4999H10.1641V14.7499H4.66404V18.6922C4.66404 18.7691 4.69609 18.8397 4.76019 18.9038C4.8243 18.9679 4.89483 18.9999 4.97176 18.9999H20.3563C20.4332 18.9999 20.5038 18.9679 20.5679 18.9038C20.632 18.8397 20.664 18.7691 20.664 18.6922V14.7499ZM11.664 14.9999H13.664V12.9999H11.664V14.9999ZM4.66404 13.25H10.1641V11.5H15.164V13.25H20.664V8.30765C20.664 8.23072 20.632 8.16019 20.5679 8.09608C20.5038 8.03198 20.4332 7.99993 20.3563 7.99993H4.97176C4.89483 7.99993 4.8243 8.03198 4.76019 8.09608C4.69609 8.16019 4.66404 8.23072 4.66404 8.30765V13.25Z" fill="#333333" />
                        </g>
                      </svg>

                      <div className="text-[14px] font-[400]">{userDetails?.totalExperience}</div>
                    </div>
                  }
                </div>
              </div>
            )}
          </div>
          {userDetails && (
            <div className=" rounded-[16px] py-2 flex flex-col  scr1024:w-[66.17%] ml:w-[60%] w-[100%] bg-white pb-6">
              <div className="flex flex-col  gap-4 scr1024:px-6 px-2 py-4">
                <div className="flex flex-col ">
                  <div
                    className={`flex justify-start ml:text-[16px] sm:text-[14px] text-[12px] gap-12  font-semibold`}
                  >
                    <div>
                      <p
                        className={`${activeOption === "ApplicantProfile"
                          ? "text-[#333]"
                          : "text-[#646464]"
                          } cursor-pointer`}
                        onClick={() => handleOptionClick("ApplicantProfile")}
                      >
                        Applicant Profile
                      </p>
                      <svg
                        className=" ml:w-[138px] sm:w-[120px] w-[100px]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="4"
                        viewBox="0 0 138 4"
                        fill="none"
                      >
                        <path
                          d="M0 4C0 1.79086 1.79086 0 4 0H134C136.209 0 138 1.79086 138 4H0Z"
                          fill={
                            activeOption === "ApplicantProfile"
                              ? "#06A9EF"
                              : "white"
                          }
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className={`${activeOption === "Resume"
                          ? "text-[#333]"
                          : "text-[#646464]"
                          } cursor-pointer`}
                        onClick={() => handleOptionClick("Resume")}
                      >
                        Resume
                      </p>
                      <svg
                        className=" ml:w-[69px] sm:w-[60px] w-[50px]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="4"
                        viewBox="0 0 69 4"
                        fill="none"
                      >
                        <path
                          d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H64.5C66.7091 0 68.5 1.79086 68.5 4H0.5Z"
                          fill={
                            activeOption === "Resume" ? "#06A9EF" : "white"
                          }
                        />
                      </svg>
                    </div>

                  </div>
                  <div className="h-[1px] bg-[#D6DDEB]"></div>
                </div>
              </div>
              {toggle === "ApplicantProfile" && (
                <div className="flex flex-col gap-4 text-[16px] font-normal px-6 overflow-y-auto">
                  <p className="font-semibold">Personal Info</p>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-4 w-[50%]">
                      <div>
                        <p className="text-[14px]  font-medium">Full Name</p>
                        <p className="text-[12px] font-normal">
                          {" "}
                          {userDetails?.name}

                        </p>
                      </div>
                      <div>
                        <p className=" text-[14px] font-medium">Address</p>
                        <p className="text-[12px] font-normal">
                          {userDetails?.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%] ">
                      {userDetails?.gender &&
                        <div>
                          <p className="text-[14px]  font-medium">Gender</p>
                          <p className="text-[12px] font-normal">{userDetails?.gender}</p>
                        </div>
                      }
                      {/* <div>
                        <p className="text-[14px]  font-medium">Language</p>
                        <p className="text-[12px] font-normal">English, French, Bahasa</p>
                      </div> */}
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-[#D6DDEB]"></div>
                  <div className="flex flex-col gap-4">
                    <p className="font-semibold">Professional Info</p>
                    {userDetails?.about &&
                      <div className="flex flex-col gap-2 ml:w-[80%] w-[100%]">
                        <p className=" font-medium text-[14px] ">About Me</p>
                        <div className="flex flex-col gap-4 text-[12px] font-normal">
                          <p>
                            {userDetails?.about}
                          </p>

                        </div>
                      </div>
                    }
                    <div className="flex ml:flex-row gap-4 flex-col justify-between">
                      {(userDetails?.highestQualification || userDetails?.currentJob) &&
                        <div className="flex flex-col gap-4 ml:w-[30%] w-[100%]">
                          {userDetails?.currentJob &&
                            <div>
                              <p className=" text-[14px]  font-medium">Current Job</p>
                              <p className="text-[12px] font-normal">{userDetails?.currentJob}</p>
                            </div>
                          }
                          {userDetails?.highestQualification &&
                            <div>
                              <p className=" text-[14px]  font-medium">
                                Highest Qualification
                              </p>
                              <p className="text-[12px] font-normal">{userDetails?.highestQualification}</p>
                            </div>
                          }
                        </div>
                      }
                      <div className="flex flex-col gap-4 ml:w-[70%] w-[100%]">
                        {userDetails?.totalExperience &&
                          <div>
                            <p className="text-[14px]  font-medium">Experience in Years</p>
                            <p className="text-[12px] font-normal">{userDetails?.totalExperience}</p>
                          </div>
                        }
                        {userDetails?.skills &&
                          <div className="flex flex-col gap-2">
                            <p className=" font-medium">Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {userDetails?.skills?.slice(0, 5)?.map((item, index) => (
                                <div key={index} className="flex gap-2 font-medium flex-wrap">
                                  <p className="border text-[12px] font-medium border-[#06A9EF] min-w-[160px] rounded-[24px] px-4 py-3">
                                    {item}
                                  </p>

                                </div>
                              ))}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {toggle === "Resume" && (

                <div className=" flex items-center justify-center py-[16px] px-2 resumes2 ">


                  {isImage ? (
                    <img
                      src={userDetails?.file}
                      alt="Uploaded Document"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : isPDF ? (
                    <div className="w-full h-full resumes2">
                      <PdfViewer
                        pdfUrl={userDetails?.file}
                        loadingg={loadingg}
                        setLoadingg={setLoadingg}
                      />
                    </div>
                  ) : isDoc ? (
                    <DocumentViewer fileUrl={userDetails?.file} />


                  ) : (
                    <InlineSVG imageUrl={userDetails?.file} />
                  )}
                </div>

              )}

            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default ApplicantDetails;
