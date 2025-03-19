import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import MiniLoader from "../../../components/common/miniLoader";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl, loadingg, setLoadingg }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setTimeout(() => {
      setLoadingg(false);
    }, 2000);
  };

  return (
    <div
      style={{ boxShadow: "0px 2px 10px 1px #00000040" }}
      className={`w-[132px] scr460:w-[234px] h-[200px] scr460:h-[330px] rounded-lg overflow-hidden `}
    >
      {loadingg && (
        <div className="skeleton-loader">
          <div className="skeleton-image"></div>
          <div className="skeleton-text">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line shorter"></div>
          </div>
        </div>
      )}
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
const Index = () => {
  const router = useRouter();
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const [loadingg, setLoadingg] = useState(true);
  const [selectedIndexes, setSelectedIndexes] = useState();
  const [selectedResumeUrl, setSelectedResumeUrl] = useState();
  const [selectedResumeName, setSelectedResumeName] = useState();
  const [selectedLink, setSelectedLink] = useState();
  const [copy, setCopy] = useState(false);
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    if (userDataGlobal?._id) {
      axios
        .get(`https://dev.api.skilotech.com/api/resume/${userDataGlobal?._id}`)
        .then((res) => {
          setResumeList(res.data.data);

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userDataGlobal]);

  const toggleSelect = (item) => {
    setSelectedIndexes(item._id);
    setSelectedResumeName(item.fileName);
    setSelectedResumeUrl(item.resumeUrl);
    setSelectedLink("");
    window.scroll(0, 0);
  };

  const generateToken = async () => {
    if (!userDataGlobal?.firstName) {
      setEditProfilePopUp(true);
    } else {
      if (selectedIndexes) {
        try {
          const response = await axios.put(
            `https://dev.api.skilotech.com/api/candidate/selectResume`,
            {
              selectedIndexes,
              selectedResumeUrl,
              _id: userDataGlobal?._id,
              resumeName: selectedResumeName,
            }
          );

          if (response.status === 200) {
          
            const updatedCandidate = response.data;
            toast.success("Link Generated successfully");
            // setSelectedLink(`www.skilotech.com/${userDataGlobal.firstName}/${selectedResumeName}`)
            setSelectedLink(
              `http://192.168.1.161:3000/${userDataGlobal.id}/${userDataGlobal.firstName}`
            );
          } else {
            console.error("Error Generating Link:", response.data.message);
            toast.error("Failed to select resume.");
          }
        } catch (error) {
          console.error("Error Generating Link:", error.message);
          toast.error("Error occurred while generating link.");
        }
      } else {
        toast.error("Select resume first");
      }
    }
  };
  const copyToClipboard = (text) => {
    setCopy(true);
    // toast.success("Link Copied successfully");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // alert('Link copied to clipboard');
         toast.success("Link Copied successfully");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      {editProfilePopUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute ms:w-[30%] w-[60%] flex flex-col gap-6  justify-between items-center text-center rounded-[24px] bg-white p-6  text-[24px] font-medium">
              First edit your profile to update the name !
              <button
                onClick={() => {
                  setEditProfilePopUp(false);
                  router.push("/auth/recruiter-signup?isUpdate=true");
                }}
                style={{ borderColor: "#06a9ef" }}
                className={`w-[200px] px-4 py-[12px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] text-[20px] text-white font-[500] bg-blue hover:bg-[#06a9ef] 
             
            } hover:text-[#fff] transition-all duration-200`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}
      {loading ? (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <MiniLoader />
        </div>
      ) : (
        <div className="customMargins py-6 ">
          {resumeList.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex ml:flex-row flex-col justify-between gap-2">
                <div className="text-2xl font-semibold text-gray-800">
                  My Resumes
                </div>
                <div className="flex gap-4 text-[16px] font-medium ms:items-center items-end justify-end ms:flex-row flex-col-reverse">
                  {selectedLink && (
                    <button
                      onClick={() => copyToClipboard(selectedLink)}
                      className="bg-blue text-[14px] px-4 py-2 gap-[6px] justify-center items-center flex text-white rounded-lg font-medium"
                    >
                      Copy Link{" "}
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >

                        <g mask="url(#mask0_4820_45573)">
                          <path
                            d="M6.37383 12.7512C6.0232 12.7512 5.72305 12.6263 5.47336 12.3766C5.22367 12.127 5.09883 11.8268 5.09883 11.4762V2.97617C5.09883 2.62555 5.22367 2.32539 5.47336 2.0757C5.72305 1.82602 6.0232 1.70117 6.37383 1.70117H13.1738C13.5245 1.70117 13.8246 1.82602 14.0743 2.0757C14.324 2.32539 14.4488 2.62555 14.4488 2.97617V11.4762C14.4488 11.8268 14.324 12.127 14.0743 12.3766C13.8246 12.6263 13.5245 12.7512 13.1738 12.7512H6.37383ZM6.37383 11.4762H13.1738V2.97617H6.37383V11.4762ZM3.82383 15.3012C3.4732 15.3012 3.17305 15.1763 2.92336 14.9266C2.67367 14.677 2.54883 14.3768 2.54883 14.0262V4.88867C2.54883 4.70805 2.60957 4.55664 2.73105 4.43445C2.85253 4.31227 3.00305 4.25117 3.18261 4.25117C3.36217 4.25117 3.51393 4.31227 3.63789 4.43445C3.76185 4.55664 3.82383 4.70805 3.82383 4.88867V14.0262H11.2613C11.442 14.0262 11.5934 14.0869 11.7155 14.2084C11.8377 14.3299 11.8988 14.4804 11.8988 14.66C11.8988 14.8395 11.8377 14.9913 11.7155 15.1152C11.5934 15.2392 11.442 15.3012 11.2613 15.3012H3.82383Z"
                            fill="#fff"
                          />
                        </g>
                      </svg>
                    </button>
                  )}

                  <div className="flex gap-2 justify-end">
                    <div
                      className=" cursor-pointer break-all"
                      onClick={() => openInNewTab(`${selectedLink}`)}
                    >
                      {selectedLink}
                    </div>
                  </div>
                  <button
                    style={{ backgroundColor: selectedLink ? "#DEDEDE" : '#06A9EF' }}
                    onClick={generateToken}
                    disabled={selectedLink ? true : false}
                    className=" text-[14px] px-4 py-2 text-white rounded-lg cursor-pointer font-medium"
                  >
                    Generate Link
                  </button>
                </div>
              </div>

              <div style={{ columnGap: "10px" }} className="flex flex-wrap gap-9 p-6  rounded-lg">
                {resumeList.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => toggleSelect(item)}
                    className="flex flex-col h-[230px] scr460:h-[360px] items-center justify-between group relative cursor-pointer resumes"
                  >
                    <div
                      className={`${item._id === selectedIndexes
                          ? "border-4 border-blue rounded-[12px] "
                          : " border-4 border-[#F3F4F5]"
                        }  `}
                    >
                      <PdfViewer
                        pdfUrl={item.resumeUrl}
                        loadingg={loadingg}
                        setLoadingg={setLoadingg}
                      />
                    </div>
                    {!loadingg && (
                      <div className="text-sm text-gray-800 font-medium">
                        {item?.fileName?.length > 17
                          ? `${item?.fileName?.slice(0, 16)}...`
                          : item?.fileName}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-[24px] font-medium gap-4">
              <img
                className="w-[400px] h-[340px] "
                src="/images/noFile.png"
                alt=""
              />
              <div className="flex flex-col gap-8 items-center scr420:text-[18px] text-[14px]">
                No resumes available
                <button
                  onClick={() => router.push("/createResume/BuildResume")}
                  className="bg-blue  px-4 py-2 text-white rounded-lg font-medium text-[16px] w-[180px] bg_Button "
                >
                  Create Resume
                </button>
              </div>{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
